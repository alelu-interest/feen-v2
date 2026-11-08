// Turns the web prova of the sede (prove/sede/) into one HTML file the app carries inside:
// the JS modules and three.js bundled into one inline script, the CSS inline, the two
// typefaces inline. The phone then needs no internet and no file server to open it.
//
//   node scripts/build-sede.mjs           → assets/sede/sede.html
//   node scripts/build-sede.mjs --fonts   → first downloads the typefaces from Google Fonts
//                                           into assets/sede/fonts/ (latin and latin-ext only)
//
// Run it again after every change to prove/sede/, before a build for the phone.

import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'prove/sede');
const out = join(root, 'assets/sede');
const fontsDir = join(out, 'fonts');

const FONTS_URL =
  'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Hanken+Grotesk:wght@400;500;600;700&display=swap';
// Google answers with woff2 only to a browser it knows
const UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1';

async function fetchFonts() {
  await mkdir(fontsDir, { recursive: true });
  const css = await (await fetch(FONTS_URL, { headers: { 'User-Agent': UA } })).text();
  // keep the blocks for latin and latin-ext: Italian, € included, needs nothing else
  const blocks = [...css.matchAll(/\/\* ([a-z-]+) \*\/\s*(@font-face \{[^}]+\})/g)].filter(([, subset]) =>
    ['latin', 'latin-ext'].includes(subset),
  );
  // Google repeats the same variable file once per weight: one file, one block with the whole range
  const byUrl = new Map();
  for (const [, subset, block] of blocks) {
    const url = block.match(/url\((https:[^)]+)\)/)[1];
    const weights = block.match(/font-weight: ([^;]+);/)[1].split(' ').map(Number);
    const seen = byUrl.get(url);
    if (seen) seen.weights.push(...weights);
    else byUrl.set(url, { subset, block, weights });
  }
  let local = '';
  for (const [url, { subset, block, weights }] of byUrl) {
    const family = block.match(/font-family: '([^']+)'/)[1];
    const range = [Math.min(...weights), Math.max(...weights)];
    const weight = range[0] === range[1] ? `${range[0]}` : range.join(' ');
    const name = `${family.replace(/ /g, '')}-${weight.replace(/ /g, '-')}-${subset}.woff2`;
    await writeFile(join(fontsDir, name), Buffer.from(await (await fetch(url)).arrayBuffer()));
    local += block.replace(url, name).replace(/font-weight: [^;]+;/, `font-weight: ${weight};`) + '\n';
  }
  await writeFile(join(fontsDir, 'fonts.css'), local);
  console.log(`typefaces: ${byUrl.size} files in assets/sede/fonts/`);
}

async function fontsInline() {
  let css = await readFile(join(fontsDir, 'fonts.css'), 'utf8');
  for (const file of (await readdir(fontsDir)).filter((f) => f.endsWith('.woff2'))) {
    const data = (await readFile(join(fontsDir, file))).toString('base64');
    css = css.replace(`url(${file})`, `url(data:font/woff2;base64,${data})`);
  }
  if (/url\((?!data:)/.test(css)) throw new Error('a typeface in fonts.css has no file next to it');
  return css;
}

// "three" and "three/addons/…" are the import map of index.html: here they point to the same files
const threeFromVendor = {
  name: 'three-from-vendor',
  setup(b) {
    b.onResolve({ filter: /^three(\/.*)?$/ }, ({ path }) => ({
      path:
        path === 'three'
          ? join(src, 'vendor/three/build/three.module.js')
          : join(src, 'vendor/three', path.slice('three/'.length)),
    }));
  },
};

async function bundle() {
  const result = await build({
    entryPoints: [join(src, 'js/main.js')],
    bundle: true,
    format: 'esm',
    target: 'safari16',
    minify: true,
    legalComments: 'none',
    write: false,
    plugins: [threeFromVendor],
    logLevel: 'warning',
  });
  // inside an inline <script> the text "</script" would close it
  return result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');
}

function swap(html, find, replacement) {
  if (!html.includes(find)) throw new Error(`index.html changed, not found: ${find.slice(0, 80)}`);
  return html.replace(find, () => replacement);
}

if (process.argv.includes('--fonts')) await fetchFonts();

let html = await readFile(join(src, 'index.html'), 'utf8');
const css = await readFile(join(src, 'style.css'), 'utf8');
const [js, fonts] = await Promise.all([bundle(), fontsInline()]);

// what the page took from the web or from files next to it: in the app it is inside, or not needed
html = html.replace(/\s*<link rel="preconnect"[^>]*>/g, '');
html = html.replace(/\s*<link href="https:\/\/fonts\.googleapis\.com[^>]*>/, '');
html = html.replace(/\s*<link rel="(apple-touch-icon|icon|manifest)"[^>]*>/g, '');
html = html.replace(/\s*<script type="importmap">[\s\S]*?<\/script>/, '');
// the check looks at the page only: the scripts may build src="${…}" for images they carry inline (js/people.js)
const shell = html
  .replace('<link rel="stylesheet" href="style.css" />', '')
  .replace('<script type="module" src="js/main.js"></script>', '');
if (/(src|href)="(?!#|data:)/.test(shell)) throw new Error('index.html still points to a file outside');
html = swap(html, '<link rel="stylesheet" href="style.css" />', `<style>\n${fonts}\n${css}\n</style>`);
html = swap(html, '<script type="module" src="js/main.js"></script>', `<script type="module">${js}</script>`);

await mkdir(out, { recursive: true });
await writeFile(join(out, 'sede.html'), html);
const hash = createHash('sha256').update(html).digest('hex').slice(0, 12);
console.log(`assets/sede/sede.html: ${(html.length / 1024 / 1024).toFixed(2)} MB, sha256 ${hash}`);
