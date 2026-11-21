// FEEN · la sede — the sums: how numbers, operations and formulas are set wherever a lesson shows them (21/11/2026,
// from a tester: «trova forse anche modi migliori per la syntax matematica»). Before, a sum was a sentence like any
// other: «95 − (25 + 58) = 95 − 83 = +12 €.» in the plain voice, broken wherever the line ended, and the figures of a
// question came in a row inside a sentence. Three things, all on the text the team wrote, none of it rewritten:
//  - sums(html): in a text, a sum is set as a sum (figures of one width, a line breaks before a sign and never
//    between a sign and its number, the result in bold), a number stays with its unit («25 €» never ends a line on
//    «25»), and «(1 + tasso)^anni» gets its exponent raised;
//  - formula(tokens): a formula on a card of its own, names and signs, a division as a fraction (the tokens are made
//    by mobile/scripts/sorgente.mjs from what the lesson says in words: «il saldo del mese è entrate meno uscite»);
//  - figures(lists): the amounts a question lists, a name and its amount on a line, like a bank statement (the lists
//    are made by sorgente.mjs, only from a sentence that is a list with certainty).

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const NB = ' ';
const SP = '[ \\u00a0]';
// a number: its sign, its unit, a fraction («1/3»); it may open or close a bracket, and carry what it counts when a
// sign follows («4 settimane = 80 €»)
const NUM = `[+−]?\\d+(?:[.,]\\d+)*(?:${SP}?(?:€|%|\\$))?(?:\\/\\d+)?`;
const COUNTED = `(?:(?:${SP}\\p{Ll}+){1,3}(?=${SP}?[×÷=≈→]|${SP}[+−]${SP}))?`;
const TERM = `\\(*${NUM}\\)*${COUNTED}`;
// «+» and «−» are signs between two numbers only with a space on each side: «+12» is a number
const SIGN = `(?:${SP}?[×÷=≈→]${SP}?|${SP}[+−]${SP})`;
const SUM = new RegExp(`${TERM}(?:${SIGN}${TERM})+`, 'gu');
const STEP_MAX = 26; // a step longer than this may break, before one of its signs

const withUnit = (t) => t.replace(/(\d) (?=(?:€|%|\$)(?!\p{L}))/gu, `$1${NB}`);
const raised = (t) => t.replace(/\^([−+]?[\p{L}\d]+)/gu, '<sup>$1</sup>');

/** One sum: its steps (what begins with «=», «≈» or «→») each on one line when they are short, the last result bold. */
function setSum(run) {
  const steps = run.split(/\s*(?=[=≈→])/u);
  const html = steps.map((step, i) => {
    let body = withUnit(step).replace(/([×÷=≈→+−]) /gu, `$1${NB}`);
    if (i && i === steps.length - 1 && /^[=≈]/.test(step)) body = body.replace(/^(. ?)(.+)$/su, '$1<b>$2</b>');
    return step.length <= STEP_MAX ? `<span class="sum-step">${body}</span>` : body;
  });
  return `<span class="sum">${html.join(' ')}</span>`;
}

/** A text already made safe for the page (it may hold tags: the hard words are buttons), with its sums set. */
export function sums(html) {
  return String(html)
    .split(/(<[^>]*>)/)
    .map((part, i) => (i % 2 ? part : withUnit(raised(part).replace(SUM, setSum))))
    .join('');
}

const SAID = { '=': 'uguale', '×': 'per', '÷': 'diviso', '−': 'meno', '+': 'più' };
/** A formula on its own card. `tokens`: names and signs in their order; a division is { num, den }, set as a
 *  fraction. A screen reader hears it as a sentence. */
export function formula(tokens) {
  const piece = (x) => {
    if (typeof x !== 'string') return `<span class="fx-frac"><span>${esc(x.num)}</span><span>${esc(x.den)}</span></span>`;
    return SAID[x] ? `<span class="fx-sign">${x}</span>` : `<span class="fx-name">${raised(esc(x))}</span>`;
  };
  const aloud = tokens.map((x) => (typeof x === 'string' ? (SAID[x] ?? x.replace(/\^/g, ' alla ')) : `${x.num} diviso ${x.den}`)).join(' ');
  return `<p class="fx" role="img" aria-label="${esc(aloud)}">${tokens.map(piece).join('')}</p>`;
}

/** The amounts a question lists, on one card: each list with its title, when it has one («Entrate», «Uscite»), a
 *  name and its amount on a line, what the team adds in brackets under its line. */
export function figures(lists) {
  const row = (r) => `<li><span>${esc(r.name)}</span><b>${withUnit(esc(r.amount))}</b>${r.note ? `<small>${sums(esc(r.note))}</small>` : ''}</li>`;
  return `<div class="figs">${lists.map((l) => `${l.head ? `<p class="figs-head">${esc(l.head)}</p>` : ''}<ul>${l.rows.map(row).join('')}</ul>`).join('')}</div>`;
}
