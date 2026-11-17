// The «casa sorgente» → the lessons the app plays (17/11/2026: «questi file sono l'attuale verità… monta l'app su
// questi tre file»). The team keeps the contents of FEEN in one Excel, 12 floors × 6 lessons, each with its text, 7
// questions with four answers and 3 variants, and the Casi as playable pages, two per floor.
// 3. STRUMENTI/sorgente/estrai.py copies them as they are into 1. LAVORO/lezioni/sorgente/ (sorgente.json, casi/);
// this file decides how a lesson of the Excel becomes a lesson of the app. scripts/lezioni.mjs calls it, so
// «npm run lezioni» is still the one command: when a new Excel comes, run estrai.py and then that.
//
// What a lesson of the Excel becomes:
//  - its 7 questions are the 7 exercises, in their order. A «vero/falso» with four answers («Vero: …», «Falso, se …»)
//    becomes the Vero/Falso of the app, with the reason of the right answer as the line after a mistake; every other
//    question is a «scelta multipla» with its four answers.
//  - the Excel has one explanation per question: it is the line after a mistake, for every wrong answer. When it only
//    names the answer («streaming.») or is a note for who writes the game («il feedback mostra…»), the line is the
//    key concept of the lesson.
//  - «Spiegami» is the sentence of the lesson's own text that is closest to the question, a different one for each
//    exercise: nothing is written here, everything the player reads is the team's.
//  - the key concept is the theory card of exercise 1, the one with «Idea nuova».
//  - the 3 variants say of which exercise they are a variant («variante di L1 es.3»): they are that exercise's other
//    version in a review (CLAUDE.md §7, «nei ripassi i conti cambiano numeri»).
// A card written by hand and approved (1. LAVORO/lezioni/piano-N/Lx-scheda.md) takes the place of the lesson with the
// same number: that is how one lesson is fixed without touching the Excel.

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

// ---------- the text, as FEEN writes it ----------
const tidy = (t) =>
  String(t ?? '')
    .replace(/\s+/g, ' ')
    .replace(/(\d)\s?€/g, '$1 €')
    .replace(/(\p{L})'(\p{L})/gu, '$1’$2')
    .replace(/(\p{L})'(?=\s|$)/gu, '$1’')
    .replace(/\.\.\./g, '…')
    .trim();
/** A whole sentence: a capital letter first, a full stop last. */
function sentence(t) {
  let s = tidy(t);
  if (!s) return '';
  s = s[0].toUpperCase() + s.slice(1);
  return /[.!?…]$/.test(s) ? s : `${s}.`;
}
const sentences = (t) =>
  tidy(t)
    .split(/(?<=[.!?…])\s+(?=[\p{Lu}«“])/u)
    .map((s) => s.trim())
    .filter(Boolean);

// the words that say what a text is about: no short or common ones, the last vowel off («entrata», «entrate»)
const COMMON = new Set('della delle dello degli dalla dalle nella nelle sulla sulle questo questa questi queste quello quella quelli quelle come anche dove quando quanto quanta quanti perché oppure però mentre sono essere viene fare fatto ogni tutto tutti tutta tutte molto poco meno solo sempre ancora dopo prima senza verso così cosa cose quale quali ciò cioè puoi deve devi serve hanno abbia stesso stessa altro altra altri altre'.split(' '));
const stems = (t) =>
  new Set(
    tidy(t)
      .toLowerCase()
      .split(/[^\p{L}\d]+/u)
      .filter((w) => w.length > 3 && !COMMON.has(w))
      .map((w) => w.replace(/[aeiouàèéìòù]$/u, '')),
  );
/** How much of what `a` says is in `b` already, from 0 to 1. */
function share(a, b) {
  const A = stems(a);
  const B = stems(b);
  if (!A.size) return 1;
  let n = 0;
  for (const w of A) if (B.has(w)) n++;
  return n / A.size;
}

// an explanation that does not explain: it is empty, it only names the answer («streaming.», «a-1, b-2.»), or it is
// a note for who builds the game («nessuna giusta; il feedback mostra…»). A sum worked out («9 × 12 = 108 €.») does
// explain, however short.
const NOTE = /feedback|^(dipende|nessuna|non c.è (una )?risposta)/i;
const plain = (t) =>
  tidy(t)
    .toLowerCase()
    .replace(/[^\p{L}\d]+/gu, ' ')
    .trim();
function explains(why, right) {
  const t = tidy(why);
  if (!t || NOTE.test(t)) return false;
  if (/[=×÷→]/.test(t)) return true;
  const a = plain(t);
  const b = plain(right);
  if (!a || b.includes(a) || (a.includes(b) && a.length <= b.length + 12)) return false;
  return t.length >= 20;
}
// a sentence of the lesson's text that is not for the player
const INSIDE = /\butente\b|da verificare|da reperire|materiali di partenza/i;

/** The sentences of the lesson's own text, in the order they are read: the explanation, then the typical mistake. */
function pool(lesson) {
  const c = lesson.content;
  return [...sentences(c.SPI), ...sentences(c.ERR)].filter((s) => s.length >= 40 && !INSIDE.test(s));
}

/** «Spiegami» for a question: the sentence of the lesson closest to it, not said yet in this lesson, and not the
 *  line the player has just read. A short one takes the sentence after it too. */
function explainFor(about, list, used, avoid) {
  let best = -1;
  let score = -1;
  list.forEach((s, i) => {
    if (used.has(i) || avoid.some((a) => a && share(s, a) >= 0.7)) return;
    const k = share(about, s) + share(s, about) * 0.5;
    if (k > score) {
      score = k;
      best = i;
    }
  });
  if (best < 0) return null;
  used.add(best);
  let out = list[best];
  const next = list[best + 1];
  if (out.length < 110 && next && !used.has(best + 1) && out.length + next.length <= 260 && !avoid.some((a) => a && share(next, a) >= 0.7)) {
    used.add(best + 1);
    out += ` ${next}`;
  }
  return out;
}

const VF = /^(Vero|Falso)\b[:,]?\s*/;
const MOMENT = [
  [/^Capire/, 'capire'],
  [/^Calcolare/, 'calcolare'],
  [/^Decidere/, 'decidere'],
  [/^Ripasso/, 'ripasso'],
];

/** One question of the Excel as an exercise of the app. `ctx`: the lesson's concept, its sentences, the ones used. */
function exercise(q, n, ctx, notes, where) {
  const right = tidy(q.options[q.right]);
  const said = explains(q.why, right) ? sentence(q.why) : null;
  const text = tidy(q.text);
  const moment = MOMENT.find(([re]) => re.test(q.kind))?.[1] ?? 'capire';
  let e;
  const quoted = text.match(/^«(.+)»$/);
  if (/vero\/falso/i.test(q.kind) && quoted && q.options.every((o) => VF.test(o))) {
    // «Vero: …», «Falso, se …» → Vero or Falso; why it is so is the line after the mistake
    const isTrue = right.startsWith('Vero');
    const reason = sentence(right.replace(VF, ''));
    const why = reason.length >= 20 ? reason : said ?? ctx.concept;
    e = {
      n,
      type: 'vf',
      label: q.kind,
      moment,
      idea: null,
      mentor: quoted[1],
      options: [
        { text: 'Vero', right: isTrue, ...(isTrue ? {} : { why }) },
        { text: 'Falso', right: !isTrue, ...(isTrue ? { why } : {}) },
      ],
    };
    e.line = why;
  } else {
    const why = said ?? ctx.concept;
    const options = q.options.map((o, i) => ({ text: tidy(o), right: i === q.right, ...(i === q.right ? {} : { why }) }));
    const seen = new Set();
    for (const o of options) {
      const k = o.text.toLowerCase();
      if (seen.has(k)) throw new Error(`${where}: la risposta «${o.text}» c'è due volte`);
      seen.add(k);
    }
    e = { n, type: 'scelta', label: q.kind, moment, idea: null, mentor: text, options };
    e.line = why;
    if (!said) notes.plain.push(where);
    if (/^Decidere/.test(q.kind) && NOTE.test(tidy(q.why))) notes.opinion.push(where);
  }
  return e;
}

/** A lesson of the Excel as the app plays it. */
function lessonFrom(src, notes) {
  const id = `p${src.floor}-l${src.n}`;
  const concept = sentence(src.content.CON || src.concept);
  const list = pool(src);
  const used = new Set();
  const ctx = { concept: sentences(concept)[0] ?? concept };
  if (src.questions.length !== 7) throw new Error(`${src.id}: le domande devono essere 7, ne ho trovate ${src.questions.length}`);
  const exercises = src.questions.map((q, k) => {
    const e = exercise(q, k + 1, ctx, notes, `${src.id}-Q${k + 1}`);
    if (k === 0) {
      // «la regola»: the idea of the lesson is new here, and its card is the key concept
      e.idea = tidy(src.title.split(':')[0]);
      e.theory = concept;
    }
    const about = `${e.mentor} ${q.options[q.right]} ${q.why}`;
    e.explain = explainFor(about, list, used, [e.line, e.theory]) ?? explainFor(about, list, new Set(), [e.line, e.theory]) ?? concept;
    return e;
  });
  // the variants: «Nuovo (variante di L1 es.3)» is the other version of exercise 3 in a review
  src.variants.forEach((v, k) => {
    const n = Number(v.note.match(/es\.\s*(\d)/)?.[1]) || k + 3;
    const base = exercises[n - 1];
    if (!base) return;
    const x = exercise(v, n, ctx, notes, `${src.id}-${v.unit}`);
    const about = `${x.mentor} ${v.options[v.right]} ${v.why}`;
    // «Spiegami» of the variant: the base's, when it is about the same thing; else the closest sentence
    const explain = share(about, base.explain) >= 0.25 ? base.explain : explainFor(about, list, new Set(), [x.line]) ?? base.explain;
    delete x.line;
    (base.variants ??= []).push({ type: x.type, mentor: x.mentor, options: x.options, explain });
  });
  for (const e of exercises) delete e.line;
  if (!src.data_checked) notes.unchecked.push(src.id);
  return { id, code: `L${src.n}`, floor: src.floor, title: tidy(src.title), exercises, source: src.id };
}

/** What a stage says of itself in the Percorso and on its card: the title and one line (CLAUDE.md §7). */
const one = (t) => sentences(sentence(t))[0] ?? '';

/**
 * The «casa sorgente» in `dir` (1. LAVORO/lezioni/sorgente), or null when it is not there.
 * → lessons: the 72 lessons by id («p3-l2»); stages: for every floor its 8 stages, { title, idea }, lesson 1–3, the
 * first Caso, lesson 4–6, the second Caso; sims: the playable page of the Casi of a floor; notes: what to look at.
 */
export async function fromSource(dir) {
  let raw;
  try {
    raw = JSON.parse(await readFile(join(dir, 'sorgente.json'), 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
  const notes = { opinion: [], plain: [], unchecked: [] };
  const lessons = {};
  const stages = {};
  for (const src of raw.lessons) {
    const l = lessonFrom(src, notes);
    lessons[l.id] = l;
    (stages[src.floor] ??= [])[src.n <= 3 ? src.n - 1 : src.n] = { title: l.title, idea: one(src.content.CON || src.concept) };
  }
  for (const c of raw.cases) (stages[c.floor] ??= [])[c.n === 1 ? 3 : 7] = { title: tidy(c.title), idea: one(c.what) };
  const sims = {};
  let pages = [];
  try {
    pages = await readdir(join(dir, 'casi'));
  } catch {
    // no Casi yet
  }
  for (const name of pages) {
    const m = name.match(/^piano-(\d+)\.html$/);
    if (m) sims[Number(m[1])] = await readFile(join(dir, 'casi', name), 'utf8');
  }
  return { file: raw.file, lessons, stages, sims, notes };
}
