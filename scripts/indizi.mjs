// Finds the multiple-choice questions whose right answer gives itself away, so that a quick player passes a lesson
// without reading it (review of 27/11/2026: the right answer was the only longest in 52% of the 468 questions, where
// chance says 25%, and often the only one with a reason in it). It reads the lessons the app plays
// (prove/sede/js/lessons-data.js) and, when the team's source is on this Mac (1. LAVORO/lezioni/sorgente/sorgente.json),
// takes from it the code each review variant has in the Excel, so that what it finds is found again at the source.
//
//   node scripts/indizi.mjs                         → the numbers and the questions to rewrite, on screen
//   node scripts/indizi.mjs --md out.md --csv out.csv   → the same as files, for whoever writes the lessons
//   node scripts/indizi.mjs --ripassi               → the review variants too (they share the lesson's answers' style)
//   npm run indizi                                  → the first one
//
// The tells, each measured against the wrong answers of the same question:
//   lunga   the right one is the only longest, by at least 25% and 12 characters
//   spiega  the right one carries its own reason («…: è la leva più realistica», «perché…») and no wrong one does
//   sfuma   the right one hedges («dipende», «di solito», «spesso») and no wrong one does
//   netta   every wrong one is absolute («sempre», «mai», «solo») and the right one is not
// A right answer that is the only longest by less than that is «da guardare», not «da riscrivere». Answers that are
// figures («70 €», «1.200 €») are not measured for length: there the length says nothing.
// The script stops nothing and changes nothing: the lessons are fixed in the Excel, then «npm run lezioni».

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const opt = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? resolve(argv[i + 1]) : null;
};
const MD = opt('--md');
const CSV = opt('--csv');
const WITH_VARIANTS = argv.includes('--ripassi');

const dataFile = join(root, 'prove', 'sede', 'js', 'lessons-data.js');
// imported from its text: the file is an ES module in a package that does not say so
const { LESSONS } = await import('data:text/javascript;base64,' + readFileSync(dataFile).toString('base64'));
const sourceFile = join(root, '..', '1. LAVORO', 'lezioni', 'sorgente', 'sorgente.json');
const source = existsSync(sourceFile) ? JSON.parse(readFileSync(sourceFile, 'utf8')) : null;

const FLOORS = ['', 'Direzione', 'Tesoreria', 'Gaming', 'Marketing', 'Pianificazione', 'Personale', 'Formazione', 'Finanza', 'Credito', 'Soci', 'Palinsesto', 'Esteri'];
const TYPE_NAMES = { scelta: 'scelta multipla', vf: 'vero/falso', abbina: 'abbina le coppie', ordina: 'ordina i passaggi', completa: 'completa la frase', slider: 'cursore', scenario: 'mini-scenario', documento: 'leggi il documento', gruppi: 'metti in colonna' };

// ---------- the tells ----------

const chars = (t) => [...String(t).trim()].length;
// a figure, with at most a short unit: «70 €», «1.200 €», «12%», «6», «Circa 531 €»
const isFigure = (t) => /\d/.test(t) && t.replace(/[\d\s.,€%+\-−–×x÷=()/]/g, '').length <= 6;
const REASON = /:\s|;\s|\s[—–]\s|\bperché\b|\bquindi\b|\bcioè\b|\bovvero\b|\bcosì da\b|\bin modo da\b/i;
const HEDGE = /\bdipende\b|\bdi solito\b|\bdi norma\b|\bspesso\b|\bin genere\b|\bin parte\b|\bnon sempre\b|\bnon c['’]è (una )?risposta unica\b|\bpuò\b|\bpossono\b/i;
const ABSOLUTE = /\bsempre\b|\bmai\b|\bsolo\b|\bsoltanto\b|\btutt[ie]\b|\bnessun[oa]?\b|\bsicuramente\b|\bgarantit[oaie]\b|\bin ogni caso\b|\bqualsiasi\b/i;

/** The tells of one question: { tells: [...], verdict: 'riscrivi' | 'guarda' | null, right, longestWrong }. */
function tellsOf(options) {
  const right = options.find((o) => o.right);
  const wrong = options.filter((o) => !o.right);
  if (!right || !wrong.length) return null;
  const r = chars(right.text);
  const w = wrong.map((o) => chars(o.text));
  const longest = Math.max(...w);
  const longestWrong = wrong[w.indexOf(longest)].text;
  const tells = [];
  let verdict = null;
  const figures = options.every((o) => isFigure(o.text));
  const onlyLongest = !figures && r > longest;
  if (onlyLongest && r >= longest * 1.25 && r - longest >= 12) tells.push('lunga');
  if (REASON.test(right.text) && !wrong.some((o) => REASON.test(o.text))) tells.push('spiega');
  if (HEDGE.test(right.text) && !wrong.some((o) => HEDGE.test(o.text))) tells.push('sfuma');
  if (!ABSOLUTE.test(right.text) && wrong.length >= 2 && wrong.every((o) => ABSOLUTE.test(o.text))) tells.push('netta');
  if (tells.length) verdict = 'riscrivi';
  else if (onlyLongest) verdict = 'guarda';
  // the plain count, figures included, as the review counted it: the one number to bring down to about 25%
  return { tells, verdict, right: right.text, longestWrong, r, longest, onlyLongest, rawLongest: r > longest, rawTied: r === longest };
}

// the code of a review variant in the Excel, found by its text (the app only tidies it: «95€» → «95 €»)
const bare = (t) => String(t ?? '').replace(/[\s’'«»"“”]/g, '').toLowerCase();
function variantCode(lesson, mentor) {
  const src = source?.lessons.find((x) => x.id === lesson.source);
  return src?.variants.find((v) => bare(v.text) === bare(mentor) || bare(mentor).startsWith(bare(v.text).slice(0, 40)))?.unit ?? null;
}

// ---------- every question ----------

const rows = [];
const types = {};
const perFloor = {};
for (const l of Object.values(LESSONS)) {
  const base = l.source ?? l.id;
  const f = (perFloor[l.floor] ??= { lessons: 0, scelta: 0, other: 0, onlyChoice: [] });
  f.lessons++;
  let other = 0;
  for (const e of l.exercises ?? []) {
    types[e.type] = (types[e.type] ?? 0) + 1;
    if (e.type === 'scelta') f.scelta++;
    else (f.other++, other++);
    const ask = (x, code, variant) => {
      if ((x.type ?? e.type) !== 'scelta' || !x.options) return;
      const t = tellsOf(x.options);
      if (t) rows.push({ code, floor: l.floor, lesson: `${l.code} · ${l.title}`, n: e.n, variant, question: x.mentor, ...t });
    };
    ask(e, `${base}-Q${e.n}`, false);
    if (WITH_VARIANTS) (e.variants ?? []).forEach((v, k) => ask(v, `${base}-${variantCode(l, v.mentor) ?? `R?${k + 1}`}`, true));
  }
  if (!other && l.source) f.onlyChoice.push(`${base} (${l.code})`);
}

// ---------- the numbers ----------

const main = rows.filter((x) => !x.variant);
const pct = (a, b) => (b ? ((100 * a) / b).toFixed(1).replace('.', ',') : '0') + '%';
const count = (list, tell) => list.filter((x) => x.tells.includes(tell)).length;
const fix = main.filter((x) => x.verdict === 'riscrivi');
const look = main.filter((x) => x.verdict === 'guarda');
const allEx = Object.values(types).reduce((a, b) => a + b, 0);
const summary = [
  `Domande a scelta multipla: ${main.length} (su ${allEx} esercizi, il ${pct(types.scelta ?? 0, allEx)}).`,
  `La giusta è l'unica più lunga: ${main.filter((x) => x.rawLongest).length} (${pct(main.filter((x) => x.rawLongest).length, main.length)}). Tirando a caso: 25%. Obiettivo: non oltre il 30%.`,
  `La giusta è la più lunga o pari merito: ${main.filter((x) => x.rawLongest || x.rawTied).length} (${pct(main.filter((x) => x.rawLongest || x.rawTied).length, main.length)}).`,
  `Da riscrivere: ${fix.length} (lunga ${count(fix, 'lunga')}, spiega ${count(fix, 'spiega')}, sfuma ${count(fix, 'sfuma')}, netta ${count(fix, 'netta')}; una domanda può averne più d'uno). Da guardare: ${look.length}.`,
  `Tipi di esercizio: ${Object.entries(types).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${TYPE_NAMES[k] ?? k} ${v}`).join(', ')}.`,
];
if (WITH_VARIANTS) {
  const v = rows.filter((x) => x.variant);
  summary.push(`Varianti del ripasso: ${v.length}; la giusta è l'unica più lunga in ${pct(v.filter((x) => x.onlyLongest).length, v.length)}, da riscrivere ${v.filter((x) => x.verdict === 'riscrivi').length}.`);
}

const HOW = {
  lunga: 'accorcia la giusta (il perché va nella riga di «Spiegami») o allunga due sbagliate con un motivo che suoni bene',
  spiega: 'solo la giusta si spiega: togli la spiegazione, o danne una che sembri buona anche alle sbagliate',
  sfuma: 'solo la giusta è prudente («dipende», «di solito»): rendi prudente anche una sbagliata',
  netta: 'tutte le sbagliate sono assolute («sempre», «mai», «solo»): togli l\'assoluto ad almeno una',
};

console.log('FEEN · le risposte che si indovinano senza leggere la lezione\n');
console.log(summary.join('\n'));
console.log(`\nLezioni con sole domande a scelta multipla: ${Object.values(perFloor).flatMap((f) => f.onlyChoice).length} su ${Object.values(perFloor).reduce((a, f) => a + f.lessons, 0)}.`);
if (!MD && !CSV) {
  console.log('\nDa riscrivere (codice dell\'Excel · segnali):');
  for (const x of fix) console.log(`  ${x.code.padEnd(14)} ${x.tells.join(', ').padEnd(20)} ✔ ${x.right.slice(0, 70)}${x.right.length > 70 ? '…' : ''}`);
  console.log('\nCon --md e --csv le stesse liste diventano file, con le sbagliate a confronto.');
}

// ---------- the files ----------

if (MD) {
  const cell = (t) => String(t).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  const lines = [
    '# Le risposte che si indovinano',
    '',
    `_Fatto da \`mobile/scripts/indizi.mjs\` il ${new Date().toLocaleDateString('it-IT')}, sulle lezioni che l'app gioca oggi (\`prove/sede/js/lessons-data.js\`). Si rifà con \`npm run indizi -- --md <file>\` dopo ogni Excel nuovo._`,
    '',
    '## I numeri',
    '',
    ...summary.map((s) => `- ${s}`),
    '',
    '## Come si legge',
    '',
    'Ogni riga è una domanda, col codice che ha nell\'Excel del team. I segnali dicono perché la giusta si riconosce senza aver letto la lezione, e come si corregge:',
    '',
    ...Object.entries(HOW).map(([k, v]) => `- **${k}**: ${v}.`),
    '',
    'Una domanda «da guardare» ha la giusta più lunga di poco: da sola non basta a indovinarla, ma se in una lezione sono tutte così, il ragazzo impara il trucco. La regola per chi scrive: **la giusta è la più lunga in una domanda su quattro, non di più, e il perché sta in «Spiegami», non nella risposta.**',
    '',
  ];
  for (const fl of Object.keys(perFloor).map(Number).sort((a, b) => a - b)) {
    const list = rows.filter((x) => x.floor === fl && x.verdict);
    if (!list.length) continue;
    lines.push(`## Livello ${fl}${FLOORS[fl] ? ` · ${FLOORS[fl]}` : ''}`, '');
    lines.push('| Codice | Esito | Segnali | Giusta (caratteri) | Sbagliata più lunga (caratteri) |', '|---|---|---|---|---|');
    for (const x of list) lines.push(`| ${x.code} | ${x.verdict === 'riscrivi' ? 'da riscrivere' : 'da guardare'} | ${x.tells.join(', ') || 'lunga di poco'} | ${cell(x.right)} (${x.r}) | ${cell(x.longestWrong)} (${x.longest}) |`);
    lines.push('');
  }
  lines.push('## I tipi di esercizio, livello per livello', '', 'Le domande a scelta multipla sono quasi tutte; abbina, ordina, metti in colonna e il cursore sono pochi, e sono quelli che si giocano di più.', '');
  lines.push('| Livello | Lezioni | Scelta multipla | Altri tipi | Lezioni con sola scelta multipla |', '|---|---|---|---|---|');
  for (const [fl, f] of Object.entries(perFloor).sort((a, b) => a[0] - b[0])) lines.push(`| ${fl}${FLOORS[fl] ? ` · ${FLOORS[fl]}` : ''} | ${f.lessons} | ${f.scelta} | ${f.other} | ${f.onlyChoice.length ? f.onlyChoice.join(', ') : '—'} |`);
  lines.push('');
  writeFileSync(MD, lines.join('\n'));
  console.log(`\nScritto ${MD}`);
}
if (CSV) {
  const q = (t) => `"${String(t ?? '').replace(/"/g, '""')}"`;
  const head = ['codice', 'livello', 'lezione', 'variante', 'esito', 'segnali', 'domanda', 'giusta', 'caratteri giusta', 'sbagliata più lunga', 'caratteri sbagliata'];
  const body = rows.filter((x) => x.verdict).map((x) => [x.code, x.floor, x.lesson, x.variant ? 'sì' : 'no', x.verdict === 'riscrivi' ? 'da riscrivere' : 'da guardare', x.tells.join(', ') || 'lunga di poco', x.question, x.right, x.r, x.longestWrong, x.longest].map(q).join(';'));
  // with the BOM and «;» Excel on an Italian Mac opens it in columns, accents included
  writeFileSync(CSV, '﻿' + [head.map(q).join(';'), ...body].join('\n'));
  console.log(`Scritto ${CSV}`);
}
