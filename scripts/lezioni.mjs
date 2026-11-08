// Turns the lesson cards (1. LAVORO/lezioni/…/Lx-scheda.md) into the data the app plays
// (prove/sede/js/lessons-data.js), so that an approved card goes into the app as it is,
// without being written twice (CLAUDE.md §8; compito B1, 07/11/2026).
//
//   node scripts/lezioni.mjs        → prove/sede/js/lessons-data.js
//
// Only cards with «Stato: approvata» go in, plus the test lesson in lezioni/prova/. The script
// stops, saying file and line, when a card breaks the rules of lezioni/piano-1/LEGGIMI.md
// («Come si scrivono, perché l'app le legga»): a wrong answer without its explanation, no
// right answer, a range outside the slider. Run it after every card, before build:sede.

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const project = join(root, '..');
// for checking the script itself: another folder of cards and another output
const cards = process.argv[2] ? resolve(process.argv[2]) : join(project, '1. LAVORO', 'lezioni');
const out = process.argv[3] ? resolve(process.argv[3]) : join(root, 'prove', 'sede', 'js', 'lessons-data.js');

// the type in the title of an exercise → the name the app uses
const TYPES = {
  'scelta multipla': 'scelta',
  'vero/falso': 'vf',
  'abbina le coppie': 'abbina',
  'ordina i passaggi': 'ordina',
  'completa la frase': 'completa',
  slider: 'slider',
  'mini-scenario': 'scenario',
  'leggi il documento': 'documento',
};

class CardError extends Error {}

/** The text of a value: what stands between « and », without the marks «to approve». */
function said(v) {
  const clean = v.replace(/✏️\s*\*?(da approvare)?\*?/g, '').trim();
  const a = clean.indexOf('«');
  const b = clean.lastIndexOf('»');
  return a >= 0 && b > a ? clean.slice(a + 1, b).trim() : clean;
}
const items = (v) => v.split(' · ').map((s) => s.trim()).filter(Boolean);

function parseCard(text, file) {
  const lines = text.split('\n');
  const fail = (i, msg) => {
    throw new CardError(`${file}:${i + 1} — ${msg}`);
  };
  const head = lines[0].match(/^#\s+(L\d+)\s+·\s+(.+)$/);
  if (!head) fail(0, 'la prima riga deve essere «# Lx · Titolo»');
  const floor = Number(lines[1]?.match(/^Piano (\d+)/)?.[1]);
  if (!floor) fail(1, 'la seconda riga deve cominciare con «Piano N»');
  const stato = lines.find((l) => l.startsWith('Stato:'))?.slice(6).trim() ?? '';
  const lesson = { id: `p${floor}-${head[1].toLowerCase()}`, code: head[1], floor, title: head[2].trim(), stato, exercises: [] };

  let ex = null;
  let key = null; // the last «- Key:» line, for the sub-points under it
  const close = () => ex && lesson.exercises.push(check(ex, file));
  lines.forEach((line, i) => {
    const h = line.match(/^###\s+(\d+)\s+·\s+([^·]+?)\s+·\s+(.+)$/);
    if (h) {
      close();
      const type = TYPES[h[2].trim().toLowerCase()];
      if (!type) fail(i, `tipo sconosciuto «${h[2].trim()}»`);
      ex = { n: Number(h[1]), type, label: h[3].trim(), line: i, wrong: {} };
      key = null;
      return;
    }
    if (!ex) return;
    const top = line.match(/^- ([^:]+):\s*(.*)$/);
    if (top) {
      key = top[1].trim().toLowerCase();
      const v = top[2].trim();
      switch (key) {
        case 'momento':
          ex.moment = v;
          break;
        case 'idea nuova':
          ex.idea = /^sì/i.test(v) ? v.match(/\((.+)\)/)?.[1] ?? '' : null;
          break;
        case 'il mentore':
          ex.mentor = said(v);
          break;
        case 'aiuto':
          ex.help = said(v);
          break;
        case 'risposte':
          ex.options = items(v).map((t) => ({ text: t.replace(/^✓\s*/, ''), right: t.startsWith('✓') }));
          break;
        case 'coppie':
          ex.pairs = items(v).map((p) => {
            const [a, b] = p.split(' = ').map((s) => s.trim());
            if (!a || !b) fail(i, `coppia senza «=»: «${p}»`);
            return [a, b];
          });
          break;
        case 'ordine':
          ex.order = items(v);
          break;
        case 'frase':
          ex.sentence = said(v);
          break;
        case 'situazione':
          ex.situation = said(v);
          break;
        case 'slider': {
          const m = v.match(/da\s+(-?[\d.,]+)\s+a\s+(-?[\d.,]+),\s*passo\s+([\d.,]+)(?:,\s*unità\s+(.+))?/);
          if (!m) fail(i, 'lo slider si scrive «da 0 a 100, passo 5, unità €»');
          const n = (s) => Number(s.replace(',', '.'));
          ex.slider = { min: n(m[1]), max: n(m[2]), step: n(m[3]), unit: m[4]?.trim() ?? '' };
          break;
        }
        case 'giusto': {
          const m = v.match(/da\s+(-?[\d.,]+)\s+a\s+(-?[\d.,]+)/);
          if (!m) fail(i, 'l\'intervallo giusto si scrive «da 55 a 65»');
          ex.range = [Number(m[1].replace(',', '.')), Number(m[2].replace(',', '.'))];
          break;
        }
        case 'se sbagli':
          if (v) ex.wrong['*'] = said(v);
          break;
        case 'se giusta':
          ex.ifRight = said(v);
          break;
        case 'spiegami':
          ex.explain = said(v);
          break;
        case 'teoria':
          ex.theory = said(v);
          break;
        case 'fonte':
          ex.source = v;
          break;
        case 'parole da toccare':
          ex.words = items(v).map((w) => {
            const [word, def] = w.split(' — ').map((s) => s.trim());
            if (!def) fail(i, `parola senza definizione: «${w}» (si scrive «parola — definizione»)`);
            return [word, def];
          });
          break;
        default:
          fail(i, `riga sconosciuta «- ${top[1]}:»`);
      }
      return;
    }
    const sub = line.match(/^\s{2,}- ([^:]+):\s*(.+)$/);
    if (sub && key === 'se sbagli') ex.wrong[sub[1].trim()] = said(sub[2]);
  });
  close();
  if (!lesson.exercises.length) fail(0, 'nessun esercizio («### 1 · Tipo · …»)');
  return lesson;

  function check(e, f) {
    const at = (msg) => {
      throw new CardError(`${f}:${e.line + 1} — esercizio ${e.n}: ${msg}`);
    };
    if (!e.mentor) at('manca «- Il mentore:»');
    if (!e.explain) at('manca «- Spiegami:»');
    const whyFor = (label) => e.wrong[label] ?? e.wrong['*'];
    if (['scelta', 'vf', 'completa', 'scenario'].includes(e.type)) {
      if (!e.options?.length) at('mancano le «- Risposte:»');
      const right = e.options.filter((o) => o.right);
      if (right.length !== 1) at(`serve una e una sola risposta con ✓ (ne ho trovate ${right.length})`);
      for (const o of e.options) if (!o.right && !whyFor(o.text)) at(`la risposta sbagliata «${o.text}» non ha la sua riga in «Se sbagli»`);
      for (const o of e.options) if (!o.right) o.why = whyFor(o.text);
      if (e.type === 'completa' && !e.sentence?.includes('___')) at('la frase da completare deve avere «___» al posto del buco');
      if (e.type === 'scenario' && !e.situation) at('manca «- Situazione:»');
      if (e.type === 'scenario' && !e.ifRight) at('manca «- Se giusta:» (cosa succede con la scelta giusta)');
    }
    if (e.type === 'abbina') {
      if (!e.pairs || e.pairs.length < 3 || e.pairs.length > 4) at('le coppie devono essere 3 o 4');
      e.pairs = e.pairs.map(([a, b]) => ({ left: a, right: b, why: whyFor(a) ?? at(`la voce «${a}» non ha la sua riga in «Se sbagli»`) }));
    }
    if (e.type === 'ordina') {
      if (!e.order || e.order.length < 3 || e.order.length > 5) at('l\'ordine deve avere da 3 a 5 voci');
      e.why = e.wrong['*'] ?? at('manca «- Se sbagli: «…»»');
    }
    if (e.type === 'slider') {
      if (!e.slider) at('manca «- Slider:»');
      if (!e.range) at('manca «- Giusto:»');
      const [lo, hi] = e.range;
      if (lo > hi || lo < e.slider.min || hi > e.slider.max) at('l\'intervallo giusto deve stare dentro lo slider');
      e.low = whyFor('troppo basso') ?? (lo > e.slider.min ? at('manca «troppo basso» in «Se sbagli»') : null);
      e.high = whyFor('troppo alto') ?? (hi < e.slider.max ? at('manca «troppo alto» in «Se sbagli»') : null);
    }
    if (e.type === 'documento') at('«Leggi il documento» arriva dal piano 2: va ancora deciso come si scrive');
    delete e.wrong;
    delete e.line;
    return e;
  }
}

/** A Caso card (Caso-scheda.md): one line per beat of the story, in the order it is seen (compito C1). */
function parseCase(text, file) {
  const lines = text.split('\n');
  const fail = (i, msg) => {
    throw new CardError(`${file}:${i + 1} — ${msg}`);
  };
  const head = lines[0].match(/^#\s+Caso\s+·\s+(.+)$/);
  if (!head) fail(0, 'la prima riga deve essere «# Caso · Titolo»');
  const floor = Number(lines[1]?.match(/^Piano (\d+)/)?.[1]);
  if (!floor) fail(1, 'la seconda riga deve cominciare con «Piano N»');
  const stato = lines.find((l) => l.startsWith('Stato:'))?.slice(6).trim() ?? '';
  const story = [];
  let choice = null;
  const closeChoice = () => {
    if (!choice) return;
    const right = choice.options.filter((o) => o.right);
    if (right.length !== 1) fail(choice.line, `la scelta deve avere una e una sola risposta con ✓ (ne ho trovate ${right.length})`);
    if (choice.options.length < 2) fail(choice.line, 'la scelta deve avere almeno due risposte');
    delete choice.line;
    choice = null;
  };
  lines.forEach((line, i) => {
    const beat = line.match(/^(scena|mentore|collega|scelta|finale|gancio)\s+·\s+(.+)$/);
    if (beat || line.trim() === 'trappola') closeChoice();
    if (line.trim() === 'trappola') return story.push({ kind: 'trappola' });
    if (beat) {
      const [, kind, rest] = beat;
      if (kind === 'scelta') {
        const [ask, uses] = rest.split(/\s+·\s+usa:\s*/);
        choice = { kind, text: said(ask), uses: uses?.trim() ?? null, options: [], line: i };
        story.push(choice);
      } else story.push({ kind, text: said(rest) });
      return;
    }
    const opt = line.match(/^\s{2,}- (.+)$/);
    if (opt && choice) {
      const v = opt[1].trim();
      if (v.startsWith('✓')) return choice.options.push({ text: v.replace(/^✓\s*/, ''), right: true });
      const [text, scene] = v.split(/\s+→\s+/);
      if (!scene) fail(i, `la risposta sbagliata «${text}» non ha la sua scena dopo «→»`);
      choice.options.push({ text: text.trim(), right: false, scene: said(scene) });
    }
  });
  closeChoice();
  const count = (k) => story.filter((b) => b.kind === k).length;
  if (count('scelta') !== 3) fail(0, `le scelte devono essere tre (ne ho trovate ${count('scelta')})`);
  if (count('finale') !== 1) fail(0, 'serve una riga «finale · «…»»');
  if (count('gancio') !== 1) fail(0, 'serve una riga «gancio · «…»»');
  return { id: `p${floor}-caso`, floor, title: head[1].trim(), stato, story };
}

async function cardFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await cardFiles(p)));
    else if (/^(L\d+|Caso)-scheda\.md$/.test(entry.name)) found.push(p);
  }
  return found.sort();
}

const lessons = {};
const cases = {};
const skipped = [];
try {
  for (const file of await cardFiles(cards)) {
    const name = relative(project, file);
    const isCase = file.endsWith('Caso-scheda.md');
    const card = (isCase ? parseCase : parseCard)(await readFile(file, 'utf8'), name);
    // the test cards: lezioni/prova/ (and, when the script checks itself, a folder called prova)
    const test = /(^|[\\/])prova[\\/]/.test(relative(cards, file));
    if (!test && card.stato.toLowerCase() !== 'approvata') {
      skipped.push(`${name} (Stato: ${card.stato || '—'})`);
      continue;
    }
    card.test = test;
    delete card.stato;
    (isCase ? cases : lessons)[test ? 'prova' : card.id] = card;
  }
} catch (err) {
  if (!(err instanceof CardError)) throw err;
  console.error(`Scheda da sistemare: ${err.message}`);
  process.exit(1);
}

const body = `// Made by mobile/scripts/lezioni.mjs from the lesson cards in 1. LAVORO/lezioni/: do not edit here,
// change the card and run «npm run lezioni» again.
export const LESSONS = ${JSON.stringify(lessons, null, 2)};
export const CASES = ${JSON.stringify(cases, null, 2)};
`;
await writeFile(out, body);
const list = [
  ...Object.values(lessons).map((l) => `${l.test ? 'prova' : l.id} (${l.exercises.length} esercizi)`),
  ...Object.values(cases).map((c) => `${c.test ? 'Caso di prova' : c.id} (${c.story.length} battute)`),
];
console.log(`${relative(root, out)}: ${list.join(', ') || 'nessuna lezione'}`);
if (skipped.length) console.log(`Non ancora approvate, lasciate fuori: ${skipped.join(', ')}`);
