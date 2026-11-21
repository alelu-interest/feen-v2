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
//  - a question that asks to put things in columns («Metti in colonna bisogno o desiderio…: mezzi, console, pranzo»),
//    with its answers written as the columns filled in («Bisogni: mezzi e pranzo · Desideri: console»), becomes the
//    columns of the app, where each thing is touched or dragged into its own (19/11/2026, from a tester: «Domanda:
//    Metti in colonna | Risposta: multiple choice»). Only when every thing named in the right answer is found, once, in
//    the question: if not, it stays a «scelta multipla» as the team wrote it.
//  - the same for a question that asks to match («Collega: a) …; b) …», with the answers written «a) recesso; b)
//    garanzia legale») and for one that asks to put in order («Ordina i passi: …», «Metti in ordine, dal più al
//    meno probabile: a) …»): they become «abbina le coppie» and «ordina i passaggi», which the app already had. A
//    question that cannot be read with certainty stays as the team wrote it.
//  - the Excel has one explanation per question: it is the line after a mistake, for every wrong answer. When it only
//    names the answer («streaming.») or is a note for who writes the game («il feedback mostra…»), the line is the
//    key concept of the lesson.
//  - «Spiegami» is the sentence of the lesson's own text that is closest to the question, a different one for each
//    exercise: nothing is written here, everything the player reads is the team's.
//  - the key concept is the theory card of exercise 1, the one with «Idea nuova».
//  - before the questions, one screen says what they are about (19/11/2026, from a tester: «farei prima lezioni e poi
//    quiz»; the user: «fai te»): the key concept, said by the partner, and the first lines of the lesson's own
//    explanation, where the words of the questions are defined. The Excel is written as a text and then its questions:
//    with the questions alone, the first one asked for something nobody had said.
//  - the 3 variants say of which exercise they are a variant («variante di L1 es.3»): they are that exercise's other
//    version in a review (CLAUDE.md §7, «nei ripassi i conti cambiano numeri»).
//  - the figures of a question that lists them («Entrate 95 €, spese fisse 25 €, spese variabili 58 €. Qual è il
//    saldo?») are also given as a small table, and a formula said in words («il saldo è entrate meno uscite») as a
//    formula (21/11/2026, from a tester: «modi migliori per la syntax matematica»): see «the sums, set as sums».
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

// ---------- «metti in colonna» ----------
/** «Bisogni: mezzi e pranzo · Desideri: console e pizzeria» → [{ label, items }], or null when it is not written so. */
function columnsOf(option) {
  const parts = tidy(option).split(' · ');
  if (parts.length < 2) return null;
  const out = [];
  for (const p of parts) {
    const m = p.match(/^([\p{L} ]{2,24}):\s*(.+)$/u);
    if (!m) return null;
    const items = m[2].split(/,\s*|\s+e\s+/).map((x) => x.trim()).filter(Boolean);
    if (!items.length) return null;
    out.push({ label: m[1].trim(), items });
  }
  return out;
}
const cap = (t) => t[0].toUpperCase() + t.slice(1);
/** A question to put in columns, as the app plays it, or null when it has to stay as the team wrote it. The things
 *  are the list after the colon of the question, with their whole names; the right answer says them short («mezzi»
 *  for «abbonamento ai mezzi»), so each short name must be found in one thing only, and every thing once. The name of
 *  a column is the longest the answers give it («Variabili», not the «Variabile» of the answer where it holds one
 *  thing: the name would say how many go there). */
function columns(q) {
  if (!/classifica/i.test(q.kind)) return null;
  const right = columnsOf(q.options[q.right]);
  const text = tidy(q.text).replace(/[.]$/, '');
  const at = text.indexOf(':');
  if (!right || at < 0) return null;
  const things = text.slice(at + 1).split(/,\s*/).map((x) => x.trim()).filter(Boolean);
  if (things.length < 2 || things.length > 6) return null;
  const group = new Array(things.length).fill(null);
  for (const [k, col] of right.entries()) {
    for (const short of col.items) {
      const found = things.map((t, i) => (t.toLowerCase().includes(short.toLowerCase()) ? i : -1)).filter((i) => i >= 0);
      if (found.length !== 1 || group[found[0]] != null) return null;
      group[found[0]] = k;
    }
  }
  if (group.some((g) => g == null)) return null;
  // the name as an answer writes it where the column holds more than one thing, when the right answer holds one there
  const others = q.options.map(columnsOf).filter((o) => o && o.length === right.length);
  const stem = (t) => t.toLowerCase().slice(0, 5);
  const groups = right.map((col, k) => (col.items.length > 1 ? col.label : others.find((o) => o[k].items.length > 1 && stem(o[k].label) === stem(col.label))?.[k].label ?? col.label));
  // «Accredito o addebito: paghetta, caffè…» asks which of the two: without its list it ends with a question mark
  const lead = text.slice(0, at).trim();
  const ask = / o /.test(lead) && lead.split(' ').length <= 4 ? `${cap(lead)}?` : sentence(lead);
  return { ask, groups, items: things.map((t, i) => ({ text: cap(t), group: group[i] })) };
}

// ---------- «collega» and «metti in ordine» ----------
/** «Collega: a) …; b) …; c) …» or «b) testa (50%), c) due teste di fila (25%), a) un 6» → the text before the first
 *  letter, the texts by letter and the letters in the order they come; null when there are no two letters, or one
 *  comes twice. A letter counts only at the start or after «: », «; », «, », never inside a word («(testa) e»). */
function lettered(t) {
  const text = tidy(t);
  const marks = [...text.matchAll(/(^|[;,:]\s+)([a-f])\)\s+/g)];
  if (marks.length < 2) return null;
  const items = {};
  for (const [k, m] of marks.entries()) {
    const to = k + 1 < marks.length ? marks[k + 1].index : text.length;
    const said = text.slice(m.index + m[0].length, to).replace(/[.;,]\s*$/, '').trim();
    if (!said || items[m[2]] != null) return null;
    items[m[2]] = said;
  }
  return { stem: text.slice(0, marks[0].index).replace(/[:.]\s*$/, '').trim(), items, order: marks.map((m) => m[2]) };
}
const sameLetters = (a, b) => a.order.length === b.order.length && a.order.every((l) => b.items[l] != null);
/** A question to match, as «abbina le coppie», or null. */
function pairsOf(q) {
  if (!/^Collega\b/i.test(tidy(q.text))) return null;
  const asked = lettered(q.text);
  const right = lettered(q.options[q.right]);
  if (!asked || !right || right.stem || !sameLetters(asked, right) || asked.order.length > 5) return null;
  const pairs = asked.order.map((l) => ({ left: cap(asked.items[l]), right: cap(right.items[l]) }));
  if (new Set(pairs.map((p) => p.right.toLowerCase())).size !== pairs.length) return null;
  return { ask: sentence(asked.stem), pairs };
}
/** A question to put in order, as «ordina i passaggi», or null. The things are lettered in the question and the right
 *  answer gives the letters in order; or they are a plain list, and each thing of the right answer is found, by its
 *  first word, in one thing only of the question. */
function orderOf(q) {
  const text = tidy(q.text).replace(/[.]$/, '');
  if (!/^(Ordina|Metti in ordine)\b/i.test(text)) return null;
  const asked = lettered(text);
  if (asked) {
    const right = lettered(q.options[q.right]);
    if (!right || right.stem || !sameLetters(asked, right)) return null;
    return { ask: sentence(asked.stem), order: right.order.map((l) => cap(asked.items[l])) };
  }
  const at = text.indexOf(':');
  if (at < 0) return null;
  const list = text.slice(at + 1);
  const things = list.split(list.includes(';') ? /;\s+/ : /,\s+/).map((x) => x.trim()).filter(Boolean);
  const right = tidy(q.options[q.right]).replace(/[.]$/, '').split(/,\s+/).map((x) => x.trim()).filter(Boolean);
  if (things.length < 3 || things.length > 6 || right.length !== things.length) return null;
  const used = new Set();
  const order = [];
  for (const r of right) {
    const low = r.toLowerCase();
    const first = low.split(/\s+/)[0];
    const exact = things.findIndex((t) => t.toLowerCase() === low);
    const found = exact >= 0 ? [exact] : things.map((t, i) => (t.toLowerCase().split(/[^\p{L}\d]+/u).includes(first) ? i : -1)).filter((i) => i >= 0);
    if (found.length !== 1 || used.has(found[0])) return null;
    used.add(found[0]);
    order.push(cap(things[found[0]]));
  }
  return { ask: sentence(text.slice(0, at)), order };
}

const VF = /^(Vero|Falso)\b[:,]?\s*/;
const MOMENT = [
  [/^Capire/, 'capire'],
  [/^Calcolare/, 'calcolare'],
  [/^Decidere/, 'decidere'],
  [/^Ripasso/, 'ripasso'],
];

// ---------- the sums, set as sums ----------
// (21/11/2026, from a tester: «trova forse anche modi migliori per la syntax matematica».) The team writes the numbers
// of a question inside a sentence: «Entrate 95 € (60 € di paghetta e 35 € di un lavoretto), spese fisse 25 €, spese
// variabili 58 €. Qual è il saldo?». On a phone it is a line of figures to keep in mind. Here such a list becomes a
// small table, a name and its amount on a line, like a bank statement; and a formula said in words («il saldo del
// mese è entrate meno uscite») is also shown as a formula. Nothing is rewritten: names, amounts and their order are
// the team's. Only what reads as a list or a formula with certainty: anything else stays the sentence it was.
const AMOUNT = String.raw`(?:circa )?[+−]?\d+(?:[.,]\d+)*\s?(?:€|%)(?:\/\p{Ll}+)?`;
const NAME = String.raw`[\p{L}«»’][\p{L}«»’/ -]*?`;
const ROW_NAME_FIRST = new RegExp(`^(${NAME})\\s(?:(?:di|del|della|da|dal|al|pari a)\\s)?(${AMOUNT})(?:\\s\\(([^)]*)\\))?$`, 'u');
const ROW_AMOUNT_FIRST = new RegExp(`^(${AMOUNT})\\s(?:(?:di|del|della|dal|dalla|da|per)\\s|d’)?(${NAME})$`, 'u');
// with one of these a name is a sentence, not the name of an amount («Hai comprato a», «Un gioco costa»)
const NOT_A_NAME =
  /(^|\s)(hai|ho|ha|hanno|è|sono|era|costa|costano|paga|paghi|pagano|versi|compri|comprato|perdi|perde|torna|scende|sale|resta|restano|restituisce|rimborsa|rimborsano|vanno|va|rende|raddoppia|guadagni|spendi|ti|si|ci|che|se|con|il|lo|la|i|gli|le|un|uno|una|ogni|entrambi|circa|media|non|ma|poi|su|tra|fra)(\s|$)|(^|\s)(l|un)’/i;
/** The items of a list, split at the commas that are not inside brackets. */
function commas(t) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < t.length; i++) {
    if (t[i] === '(') depth++;
    if (t[i] === ')') depth--;
    if (!depth && t[i] === ',' && t[i + 1] === ' ') {
      out.push(cur);
      cur = '';
      i++;
    } else cur += t[i];
  }
  return [...out, cur].map((x) => x.trim());
}
/** A sentence that is a list of amounts («Uscite: 250 € di affitto, 60 € di abbonamenti e 90 € di spese varie.»), as
 *  its rows, with what it says before the colon as their title; null when it is not one. */
function listOf(text) {
  let t = text.replace(/[.]$/, '');
  let head = '';
  const colon = t.indexOf(': ');
  if (colon > 0 && !/\d/.test(t.slice(0, colon)) && t.slice(0, colon).split(' ').length <= 4) {
    head = t.slice(0, colon);
    t = t.slice(colon + 2);
  }
  const named = (name) => !NOT_A_NAME.test(name) && name.split(/\s+/).length <= 5;
  const row = (x) => {
    let r = x.match(ROW_NAME_FIRST);
    if (r && named(r[1])) return { name: cap(r[1]), amount: r[2], ...(r[3] ? { note: cap(r[3]) } : {}) };
    r = x.match(ROW_AMOUNT_FIRST);
    return r && named(r[2]) ? { name: cap(r[2]), amount: r[1] } : null;
  };
  let items = commas(t);
  const last = items.at(-1);
  const and = last.lastIndexOf(' e ');
  if (!row(last) && and > 0) items = [...items.slice(0, -1), last.slice(0, and), last.slice(and + 3)];
  const rows = items.map(row);
  return rows.every(Boolean) ? { head, rows } : null;
}
/** The figures of a question as a table: { parts, ask }, where a part is a sentence ({ text }) or a list ({ head,
 *  rows }) and `ask` is the question itself. null when the question has no list of at least two amounts. */
function figures(text) {
  const t = tidy(text);
  const tries = [];
  // as the lesson reads it: what comes before the last sentence, when that one asks
  let at = -1;
  if (t.endsWith('?')) for (const m of t.matchAll(/[.!?…]\s+(?=[\p{Lu}«“])/gu)) at = m.index + m[0].length;
  if (at > 0) tries.push([t.slice(0, at).trim(), t.slice(at)]);
  // «Ricavi 500.000 €, costi 450.000 €: utile?»
  const colon = t.lastIndexOf(': ');
  if (colon > 0) tries.push([t.slice(0, colon), cap(t.slice(colon + 2))]);
  for (const [lead, ask] of tries) {
    const parts = [];
    for (const one of sentences(lead)) {
      const list = listOf(one);
      if (list) parts.push(list);
      else if (parts.at(-1)?.text != null) parts.at(-1).text += ` ${one}`;
      else parts.push({ text: sentence(one) });
    }
    if (parts.some((p) => p.rows?.length >= 2)) return { parts, ask };
  }
  return null;
}

const ARTICLE = String.raw`(?:il |lo |la |l’|i |gli |le |un |una |un’)?`;
const TERM = String.raw`[\p{L}/][\p{L}/’ ]*?`;
// «Il saldo del mese è entrate meno uscite» · «L’utile è la differenza: ricavi meno costi» · «Il margine è l’utile
// diviso per i ricavi». Not «più»: «il modo più economico» is not a sum.
const SAID = new RegExp(`^${ARTICLE}(${TERM})(?: \\([^)]*\\))? (?:è|sono)(?: la differenza:)? ${ARTICLE}(${TERM}) (meno|divis[oa] per|divis[oa]) ${ARTICLE}(${TERM})$`, 'iu');
const NOT_A_TERM = /(^|\s)(che|se|non|ma|si|ti|ci|quanto|quello|ciò|come|quando|dove|è|sono|ha|hai|più|meno|molto|poco|sempre|mai|già|anche|solo)(\s|$)/i;
/** A formula written with its signs («capitale × (1 + tasso)^anni») as its pieces: names, numbers and brackets kept
 *  whole, the signs between them on their own. */
function pieces(raw) {
  const out = [];
  let depth = 0;
  let cur = '';
  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];
    if (c === '(') depth++;
    if (c === ')') depth--;
    if (!depth && '=×÷−+'.includes(c) && raw[i - 1] === ' ' && raw[i + 1] === ' ') {
      out.push(cur.trim(), c);
      cur = '';
    } else cur += c;
  }
  out.push(cur.trim());
  // a name takes a capital letter, as in the formulas said in words; a letter alone («i», «n») is a variable
  const named = (x) => (/^\p{Ll}{2}/u.test(x) ? cap(x) : x);
  for (let i = 0; i < out.length; i += 2) out[i] = named(out[i]);
  // «Importo mensile = costo ÷ numero di mesi»: one division, as a fraction
  if (out.length === 5 && out[1] === '=' && out[3] === '÷' && !/[()]/.test(raw)) return [out[0], '=', { num: named(out[2]), den: named(out[4]) }];
  return out;
}
/** The formula a sentence says, if it says one: { tokens, whole }. `tokens`: names and signs in their order, a
 *  division as { num, den }; `whole`: the sentence says nothing else, so the formula can stand in its place. */
function formulaIn(text) {
  const t = text.replace(/[.]$/, '');
  const clauses = [t];
  for (const cut of [': ', ', ']) if (t.includes(cut) && !/la differenza: /.test(t.slice(0, t.indexOf(cut) + 2))) clauses.push(t.slice(0, t.indexOf(cut)));
  for (const c of clauses) {
    const r = c.match(SAID);
    if (!r || [r[1], r[2], r[4]].some((x) => NOT_A_TERM.test(x) || x.split(/\s+/).length > 6)) continue;
    const [, left, a, op, b] = r;
    return { tokens: /meno/i.test(op) ? [cap(left), '=', cap(a), '−', cap(b)] : [cap(left), '=', { num: cap(a), den: cap(b) }], whole: c === t };
  }
  // with its signs already: «Importo mensile = costo ÷ numero di mesi», «…la formula è capitale × (1 + tasso)^anni»,
  // «…a tuo carico (danno − franchigia = rimborso)». A sum with its numbers is not a formula.
  const begins = /^\p{L}[\p{L} ’/]* = /u.test(t);
  const inside = t.match(/la formula (?:è )?(.+)$/i) ?? t.match(/\(([^()]* = [^()]*)\)$/);
  const raw = begins ? t : inside?.[1].split(', dove ')[0];
  if (!raw || /\d\s?[€%]/.test(raw) || !/ [=×÷−+] /.test(raw)) return null;
  return { tokens: pieces(raw), whole: begins };
}

// ---------- before the questions ----------
// what the kid cannot follow: «(L2)», «(Cap. 11 L3)», «Come visto in L1» point at pages of the team's document
const POINTERS = /\s*\((?:vedi |cfr\.? )?(?:L\d|Cap\.|Piano \d)[^)]*\)|\s+in L\d\b/gi;
const BRIEF_MAX = 380; // the lines under the idea: about eight on a phone
const SAY_MAX = 230;
/** What the screen before the questions says: `say`, the key concept (its first sentence when it is long), and
 *  `lines`, the first sentences of the lesson's explanation, in their order and without a gap, as long as they fit.
 *  They stop at the first sentence that is not for the player (a note of who writes: «da verificare»), because the
 *  one after it would not follow; a list («Primo: … Secondo: …») comes whole or not at all; a last line that only
 *  announces what does not come («Il calcolo ha due passi.») goes. No lines at all is fine: the idea stands alone. */
function introOf(src, concept) {
  const clean = (t) => tidy(String(t ?? '').replace(POINTERS, ''));
  const parts = sentences(clean(concept));
  let say = clean(concept);
  if (say.length > SAY_MAX && parts.length > 1) say = parts[0];
  const all = sentences(clean(src.content.SPI));
  const listed = (x) => /^(Primo|Secondo|Terzo|Quarto|Quinto|Sesto|\d[.)])\b/.test(x);
  const lines = [];
  let size = 0;
  let cut = false; // stopped before something that the last line may be announcing
  for (let i = 0; i < all.length; i++) {
    const take = [all[i]];
    if (listed(all[i])) while (i + take.length < all.length && listed(all[i + take.length])) take.push(all[i + take.length]);
    if (take.some((x) => INSIDE.test(x))) {
      if (!lines.length && take.length === 1) continue; // a note at the very start: the text begins after it
      cut = true;
      break;
    }
    const more = take.reduce((n, x) => n + x.length, 0);
    if (lines.length && size + more > BRIEF_MAX) {
      cut = take.length > 1;
      break;
    }
    lines.push(...take);
    size += more;
    i += take.length - 1;
  }
  const announces = (x) => /:$/.test(x) || /^(Attenzione|Ecco|Vediamo|Esempio)\b.{0,40}$/.test(x) || (cut && x.length <= 45);
  while (lines.length && announces(lines.at(-1))) lines.pop();
  // the idea is not said twice
  const kept = lines.filter((x) => !(share(x, say) >= 0.8 && share(say, x) >= 0.6));
  // (21/11/2026, from a tester: the screen was «molto slopped», a block of bold and three bullets.) The idea in two
  // voices, as a question is: its first clause is the title of the screen, what follows it is said plainly under it.
  const [title, sub] = headline(say);
  const said = formulaIn(sentences(say)[0] ?? say);
  let room = said ? 1 : 2; // two formulas on a screen at most
  const out = [];
  for (const x of kept) {
    // «Il saldo mensile è la differenza.» under «Saldo del mese = Entrate − Uscite» says it a third time
    if (said && /(^|\s)è la differenza\.?$/i.test(x) && x.length < 50) continue;
    const f = room ? formulaIn(x) : null;
    if (!f) {
      out.push(x);
      continue;
    }
    room--;
    if (!f.whole) out.push(x);
    out.push({ formula: f.tokens });
  }
  return { say: title, ...(sub ? { sub } : {}), ...(said ? { formula: said.tokens } : {}), lines: out };
}
const HEAD_MIN = 20;
const HEAD_MAX = 120;
/** The key concept as a title and what follows it: cut at the first colon, semicolon or full stop that leaves a title
 *  neither too short nor too long. No such place: the whole concept is the title. */
function headline(concept) {
  const cuts = [...concept.matchAll(/: |; |(?<=[.!?…])\s+(?=[\p{Lu}«“])/gu)].filter((m) => m.index >= HEAD_MIN);
  // the first place that leaves a short title; when the first sentence is long, its end
  const m = cuts.find((x) => x.index <= HEAD_MAX) ?? cuts[0];
  if (!m) return [concept.replace(/[.]$/, ''), ''];
  return [concept.slice(0, m.index).replace(/[.]$/, ''), sentence(concept.slice(m.index + m[0].length))];
}

/** One question of the Excel as an exercise of the app. `ctx`: the lesson's concept, its sentences, the ones used. */
function exercise(q, n, ctx, notes, where) {
  const right = tidy(q.options[q.right]);
  const said = explains(q.why, right) ? sentence(q.why) : null;
  const text = tidy(q.text);
  const moment = MOMENT.find(([re]) => re.test(q.kind))?.[1] ?? 'capire';
  let e;
  const quoted = text.match(/^«(.+)»$/);
  const cols = columns(q);
  const match = cols ? null : pairsOf(q);
  const steps = cols || match ? null : orderOf(q);
  if (match || steps) {
    const why = said ?? ctx.concept;
    e = match
      ? { n, type: 'abbina', label: q.kind, moment, idea: null, mentor: match.ask, pairs: match.pairs.map((p) => ({ ...p, why })) }
      : { n, type: 'ordina', label: q.kind, moment, idea: null, mentor: steps.ask, order: steps.order, why };
    e.line = why;
    notes[match ? 'pairs' : 'orders'].push(where);
    if (!said) notes.plain.push(where);
  } else if (cols) {
    const why = said ?? ctx.concept;
    e = { n, type: 'gruppi', label: q.kind, moment, idea: null, mentor: cols.ask, groups: cols.groups, items: cols.items, why };
    e.line = why;
    notes.columns.push(where);
    if (!said) notes.plain.push(where);
  } else if (/vero\/falso/i.test(q.kind) && quoted && q.options.every((o) => VF.test(o))) {
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
    const table = figures(text);
    if (table) {
      e.table = table;
      notes.tables.push(where);
    }
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
    (base.variants ??= []).push({ type: x.type, mentor: x.mentor, table: x.table ?? null, options: x.options, groups: x.groups, items: x.items, pairs: x.pairs, order: x.order, why: x.why, explain });
  });
  for (const e of exercises) delete e.line;
  if (!src.data_checked) notes.unchecked.push(src.id);
  return { id, code: `L${src.n}`, floor: src.floor, title: tidy(src.title), intro: introOf(src, concept), exercises, source: src.id };
}

// ---------- the few words changed in the pages of the Casi ----------
// The pages come in as the team wrote them. What is changed here is listed word by word, with why, and each must be
// found exactly as many times as written: when a new page comes and a change no longer fits, the build says so and
// leaves that page as it is. Each one is also in 1. LAVORO/lezioni/sorgente/LEGGIMI.md, to be put right at the source.
const TOUCHES = {
  'piano-1-caso-2.html': [
    // 19/11/2026, from a tester: «categorie troppo facile»: the name of a payment said the category it goes into
    // («Abbonamento aggiuntivo» → Abbonamenti, «Materiali per l'ufficio» → Materiali). Now it says what was bought,
    // as a line of a statement does, in the words the two Casi already use for it
    ['nome: "Abbonamento aggiuntivo"', 'nome: "Modelli per documenti e presentazioni"', 1],
    ['nome: "Materiali per l’ufficio"', 'nome: "Carta, penne e toner"', 1],
  ],
};
function touched(name, html, notes) {
  let out = html;
  for (const [from, to, times] of TOUCHES[name] ?? []) {
    const found = out.split(from).length - 1;
    if (found !== times) {
      notes.touches.push(`${name}: «${from}» c'è ${found} volte, non ${times}`);
      return html;
    }
    out = out.split(from).join(to);
  }
  return out;
}

/** What a stage says of itself in the Percorso and on its card: the title and one line (CLAUDE.md §7). */
const one = (t) => sentences(sentence(t))[0] ?? '';

/**
 * The «casa sorgente» in `dir` (1. LAVORO/lezioni/sorgente), or null when it is not there.
 * → lessons: the 72 lessons by id («p3-l2»); stages: for every floor its 8 stages, { title, idea }, lesson 1–3, the
 * first Caso, lesson 4–6, the second Caso; sims: the playable Casi of a floor, one page with both or { 1, 2 }, a page
 * each; notes: what to look at.
 */
export async function fromSource(dir) {
  let raw;
  try {
    raw = JSON.parse(await readFile(join(dir, 'sorgente.json'), 'utf8'));
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
  const notes = { opinion: [], plain: [], unchecked: [], columns: [], pairs: [], orders: [], touches: [], tables: [], formulas: [] };
  const lessons = {};
  const stages = {};
  // a new kind of exercise is explained in one line the first time it is met, in the whole course (CLAUDE.md §6)
  const HELP = {
    gruppi: 'Tocca la colonna dove va la voce accesa. Puoi anche trascinarla.',
    abbina: 'Tocca una voce a sinistra, poi la sua a destra.',
    ordina: 'Tocca le voci nell’ordine giusto.',
  };
  const met = new Set();
  for (const src of [...raw.lessons].sort((a, b) => a.floor - b.floor || a.n - b.n)) {
    const l = lessonFrom(src, notes);
    if (l.intro.formula || l.intro.lines.some((x) => x.formula)) notes.formulas.push(src.id);
    for (const e of l.exercises) {
      if (HELP[e.type] && !met.has(e.type)) e.help = HELP[e.type];
      met.add(e.type);
    }
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
  // a floor's Casi come as one page with both («piano-2.html») or as a page each («piano-1-caso-1.html»): one page is
  // kept as it is, a page each as { 1: …, 2: … }; when a floor has both, the page of one Caso wins for that Caso
  const each = {};
  for (const name of pages.sort()) {
    const m = name.match(/^piano-(\d+)(?:-caso-(\d))?\.html$/);
    if (!m) continue;
    const html = touched(name, await readFile(join(dir, 'casi', name), 'utf8'), notes);
    if (m[2]) (each[Number(m[1])] ??= {})[Number(m[2])] = html;
    else sims[Number(m[1])] = html;
  }
  for (const [floor, byCase] of Object.entries(each)) sims[floor] = sims[floor] ? { all: sims[floor], ...byCase } : byCase;
  return { file: raw.file, lessons, stages, sims, notes };
}
