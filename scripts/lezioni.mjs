// Turns the lesson cards (1. LAVORO/lezioni/…/Lx-scheda.md) into the data the app plays
// (prove/sede/js/lessons-data.js), so that an approved card goes into the app as it is,
// without being written twice (CLAUDE.md §8; compito B1, 07/11/2026).
//
//   node scripts/lezioni.mjs        → prove/sede/js/lessons-data.js
//
// Only cards with «Stato: approvata» go in, plus the test lesson in lezioni/prova/. The script
// stops, saying file and line, when a card breaks the rules of lezioni/piano-1/LEGGIMI.md
// («Come si scrivono, perché l'app le legga»): a wrong answer without its explanation, no
// right answer, a range outside the slider; from 09/11/2026 also «quasi» as a verdict, a «Spiegami» that says the
// «Teoria» again, the wrong number of exercises, a first exercise without its «IDEA NUOVA», the same answer twice.
// Run it after every card, before build:sede.

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

// ---------- the checks of 09/11/2026 (LEGGIMI, «I controlli del 09/11/2026») ----------

// Right or wrong, never «almost» (CLAUDE.md §6: no «quasi giusto», no «ci sei quasi»). «Quasi tutti» or «quasi la metà»
// are facts, not a verdict, and pass: only «quasi» as a verdict stops the script.
const ALMOST = [
  /(^|[.!?…]\s+)quasi\s*([:!,;.…—–]|\s+ma\b|$)/iu, // «Quasi:», «Quasi!», «Quasi, ma…» at the start of a sentence
  /\bquasi\s+((giust|esatt|corrett|perfett|indovinat)\p{L}*|ci\s+sei|ci\s+siamo|c['’]eri|ci\s+eri)/iu, // «quasi giusto»
  /\b(ci\s+sei|ci\s+siamo|ci\s+siete|c['’]eri|ci\s+eri|eri)\s+(proprio\s+|davvero\s+)?quasi\b/iu, // «ci sei quasi»
];
function almost(text) {
  for (const re of ALMOST) {
    const m = text.match(re);
    if (m) return m[0].replace(/^[.!?…\s]+/, '').trim();
  }
  return null;
}
/** said(), for a text the player reads at line i of a card: it stops the script on «quasi» as a verdict. */
const sayer = (fail) => (v, i) => {
  const t = said(v);
  const bad = almost(t);
  if (bad) fail(i, `«${bad}»: niente «quasi», la risposta è giusta o sbagliata (CLAUDE.md §6)`);
  return t;
};

// «Spiegami» has to add something (the why), not say the theory card again. The measure: the content words of
// «Spiegami» (no short or common words, the last vowel off so «entrata» and «entrate» are the same) that are in the
// «Teoria» too. From 70% on it is the theory said again.
const COMMON = new Set(
  ('che chi cui non per con tra fra del dello della dei degli delle dal dallo dalla dai dagli dalle nel nello nella ' +
    'nei negli nelle sul sullo sulla sui sugli sulle allo alla agli alle una uno gli lei lui loro tuo tua tuoi tue suo ' +
    'sua suoi sue mio mia miei mie nostro nostra nostri nostre quel quello quella quelli quelle questo questa questi ' +
    'queste come anche più meno molto poco tanto tanti quanto quanta quanti quante ogni tutto tutta tutti tutte sono ' +
    'sei siamo siete era erano essere hai hanno abbiamo avete avere fai fa fare già solo poi così ancora sempre mai ' +
    'dove quando perché però cosa niente nulla senza fuori dentro qui lì')
    .split(' '),
);
const stems = (text) =>
  new Set(
    text
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((w) => w && !COMMON.has(w) && (w.length >= 3 || /\d/.test(w)))
      .map((w) => (/\d/.test(w) ? w : w.replace(/[aeiouàèéìòù]$/u, ''))),
  );
const REPEAT = 0.7;
function repeats(explain, theory) {
  const a = stems(explain);
  if (a.size < 3) return null; // too short to say
  const b = stems(theory);
  const same = [...a].filter((w) => b.has(w)).length;
  return same / a.size >= REPEAT ? `${same} parole su ${a.size}` : null;
}

/** The same answer twice in one list. */
function twice(list) {
  const seen = new Set();
  for (const t of list) {
    const k = t.trim().toLowerCase();
    if (seen.has(k)) return t;
    seen.add(k);
  }
  return null;
}

function parseCard(text, file) {
  const lines = text.split('\n');
  const fail = (i, msg) => {
    throw new CardError(`${file}:${i + 1} — ${msg}`);
  };
  const say = sayer(fail);
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
      const want = lesson.exercises.length + 1;
      if (Number(h[1]) !== want) fail(i, `qui ci va l'esercizio ${want}, non il ${h[1]}: si numerano 1, 2, 3… in ordine`);
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
          ex.mentor = say(v, i);
          break;
        case 'aiuto':
          ex.help = say(v, i);
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
          ex.sentence = say(v, i);
          break;
        case 'situazione':
          ex.situation = say(v, i);
          break;
        case 'slider': {
          // the step ends on a digit: «passo 5, unità €» must not swallow the comma, or the unit is lost
          const m = v.match(/da\s+(-?[\d.,]+)\s+a\s+(-?[\d.,]+),\s*passo\s+([\d.,]*\d)(?:,\s*unità\s+(.+))?/);
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
          if (v) ex.wrong['*'] = say(v, i);
          break;
        case 'se giusta':
          ex.ifRight = say(v, i);
          break;
        case 'spiegami':
          ex.explain = say(v, i);
          ex.explainLine = i;
          break;
        case 'teoria':
          ex.theory = say(v, i);
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
    if (sub && key === 'se sbagli') ex.wrong[sub[1].trim()] = say(sub[2], i);
  });
  close();
  if (!lesson.exercises.length) fail(0, 'nessun esercizio («### 1 · Tipo · …»)');
  // how many exercises (CLAUDE.md §6: 6–8; at floor 1, 7 in every lesson)
  const n = lesson.exercises.length;
  if (floor === 1 ? n !== 7 : n < 6 || n > 8) fail(0, `gli esercizi devono essere ${floor === 1 ? '7 (al piano 1, CLAUDE.md §6)' : 'da 6 a 8'}: ne ho trovati ${n}`);
  return lesson;

  function check(e, f) {
    const at = (msg) => {
      throw new CardError(`${f}:${e.line + 1} — esercizio ${e.n}: ${msg}`);
    };
    if (!e.mentor) at('manca «- Il mentore:»');
    if (!e.explain) at('manca «- Spiegami:»');
    // the first exercise is «la regola», with its «IDEA NUOVA» (LEGGIMI, «I 7 posti»)
    if (!lesson.exercises.length && e.idea == null) at('il primo esercizio è «la regola»: serve «- IDEA NUOVA: sì (il concetto)»');
    const same = e.theory && repeats(e.explain, e.theory);
    if (same)
      throw new CardError(`${f}:${e.explainLine + 1} — esercizio ${e.n}: «Spiegami» ripete la «Teoria» (${same} sono già lì): deve aggiungere il perché, non ridirla`);
    const dup = twice([...(e.options ?? []).map((o) => o.text), ...(e.order ?? [])]) ?? twice((e.pairs ?? []).map(([a]) => a)) ?? twice((e.pairs ?? []).map(([, b]) => b));
    if (dup) at(`«${dup}» c'è due volte`);
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
    delete e.explainLine;
    return e;
  }
}

/** A Caso card (Caso-scheda.md): one line per beat of the story, in the order it is seen (compito C1). */
function parseCase(text, file) {
  const lines = text.split('\n');
  const fail = (i, msg) => {
    throw new CardError(`${file}:${i + 1} — ${msg}`);
  };
  const say = sayer(fail);
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
    const dup = twice(choice.options.map((o) => o.text));
    if (dup) fail(choice.line, `la risposta «${dup}» c'è due volte`);
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
        choice = { kind, text: say(ask, i), uses: uses?.trim() ?? null, options: [], line: i };
        story.push(choice);
      } else story.push({ kind, text: say(rest, i) });
      return;
    }
    const opt = line.match(/^\s{2,}- (.+)$/);
    if (opt && choice) {
      const v = opt[1].trim();
      if (v.startsWith('✓')) return choice.options.push({ text: v.replace(/^✓\s*/, ''), right: true });
      const [text, scene] = v.split(/\s+→\s+/);
      if (!scene) fail(i, `la risposta sbagliata «${text}» non ha la sua scena dopo «→»`);
      choice.options.push({ text: text.trim(), right: false, scene: say(scene, i) });
    }
  });
  closeChoice();
  const count = (k) => story.filter((b) => b.kind === k).length;
  if (count('scelta') !== 3) fail(0, `le scelte devono essere tre (ne ho trovate ${count('scelta')})`);
  if (count('finale') !== 1) fail(0, 'serve una riga «finale · «…»»');
  if (count('gancio') !== 1) fail(0, 'serve una riga «gancio · «…»»');
  return { id: `p${floor}-caso`, floor, title: head[1].trim(), stato, story };
}

/** An amount of the Prova sul campo, «−7,50 €» or «0 €», in cents (so the sums stay exact); null if it is not one. */
function cents(v) {
  const m = v.trim().match(/^([+−-]?)\s*(\d+)(?:[.,](\d{1,2}))?\s*€$/);
  if (!m) return null;
  const c = Number(m[2]) * 100 + Number((m[3] ?? '0').padEnd(2, '0'));
  return m[1] === '−' || m[1] === '-' ? -c : c;
}

/** A Prova sul campo card (Prova-scheda.md, 09/11/2026; CLAUDE.md §6): a month in four weeks, one choice a week, the
 *  balance always in sight. Nothing rewinds: every answer has what it costs and what happens after. Two of the four
 *  choices are «chiave»: at the end they come back, and the best answer (✓) is found, with the line «migliore». */
function parseField(text, file) {
  const lines = text.split('\n');
  const fail = (i, msg) => {
    throw new CardError(`${file}:${i + 1} — ${msg}`);
  };
  const say = sayer(fail);
  const head = lines[0].match(/^#\s+Prova\s+·\s+(.+)$/);
  if (!head) fail(0, 'la prima riga deve essere «# Prova · Titolo»');
  const floor = Number(lines[1]?.match(/^Piano (\d+)/)?.[1]);
  if (!floor) fail(1, 'la seconda riga deve cominciare con «Piano N»');
  const stato = lines.find((l) => l.startsWith('Stato:'))?.slice(6).trim() ?? '';
  let start = null;
  let below = null; // the mentor's line the first time the balance goes under zero
  const story = [];
  let choice = null; // the choice whose answers are being read
  let week = 0;
  let scene = null; // the last scene of the week: it comes back with its key moment at the end
  const perWeek = [];
  const closeChoice = () => {
    if (!choice) return;
    const right = choice.options.filter((o) => o.right);
    if (right.length !== 1) fail(choice.line, `la scelta deve avere una e una sola risposta con ✓ (ne ho trovate ${right.length})`);
    if (choice.options.length < 2) fail(choice.line, 'la scelta deve avere almeno due risposte');
    const dup = twice(choice.options.map((o) => o.text));
    if (dup) fail(choice.line, `la risposta «${dup}» c'è due volte`);
    choice = null;
  };
  lines.forEach((line, i) => {
    const t = line.trim();
    const beat = line.match(/^(saldo|sottozero|scena|mentore|collega|scelta|migliore|finale sotto zero|finale|gancio)\s+·\s+(.+)$/);
    if (beat || t === 'trappola' || t === 'settimana') closeChoice();
    if (t === 'settimana') {
      week++;
      scene = null;
      return story.push({ kind: 'settimana', n: week });
    }
    if (t === 'trappola') return story.push({ kind: 'trappola' });
    if (beat) {
      const [, kind, rest] = beat;
      if (kind === 'saldo') {
        if (start !== null) fail(i, 'c\'è già una riga «saldo»');
        start = cents(rest);
        if (start === null) fail(i, 'il saldo si scrive «saldo · 50 €»');
        return;
      }
      if (kind === 'sottozero') return (below = say(rest, i));
      if (kind === 'migliore') {
        const last = story.at(-1);
        if (last?.kind !== 'scelta') fail(i, 'la riga «migliore» va subito sotto le risposte di un momento chiave');
        if (!last.key) fail(i, 'la riga «migliore» serve solo ai momenti chiave («scelta · «…» · chiave»)');
        return (last.best = say(rest, i));
      }
      if (kind === 'finale sotto zero') {
        const end = story.find((b) => b.kind === 'finale');
        if (!end) fail(i, 'la riga «finale sotto zero» va sotto la riga «finale»');
        return (end.textNeg = say(rest, i));
      }
      if (kind === 'scelta') {
        if (!week) fail(i, 'la scelta va dentro una settimana: prima una riga «settimana»');
        const [ask, ...flags] = rest.split(/\s+·\s+/);
        const key = flags.some((f) => f.trim() === 'chiave');
        const uses = flags.find((f) => f.trim().startsWith('usa:'))?.replace(/^\s*usa:\s*/, '').trim() ?? null;
        choice = { kind, text: say(ask, i), week, key, uses, recap: scene, options: [], line: i };
        perWeek[week] = (perWeek[week] ?? 0) + 1;
        story.push(choice);
        return;
      }
      if (kind === 'scena') scene = say(rest, i);
      return story.push({ kind, text: say(rest, i) });
    }
    const opt = line.match(/^\s{2,}- (.+)$/);
    if (opt && choice) {
      const v = opt[1].trim();
      const right = v.startsWith('✓');
      const [left, after] = v.replace(/^✓\s*/, '').split(/\s+→\s+/);
      if (!after) fail(i, `la risposta «${left}» non ha dopo «→» cosa succede`);
      const m = left.match(/^(.+)\s+·\s+([^·]+)$/);
      const c = m ? cents(m[2]) : null;
      if (c === null) fail(i, `la risposta «${left}» deve finire con quanto cambia il saldo, per esempio « · −12 €» o « · 0 €»`);
      choice.options.push({ text: m[1].trim(), right, cents: c, then: say(after, i) });
    }
  });
  closeChoice();
  if (start === null) fail(0, 'manca il saldo d\'inizio mese: «saldo · 50 €»');
  if (week !== 4) fail(0, `le settimane devono essere quattro (ne ho trovate ${week})`);
  for (let w = 1; w <= 4; w++) if (perWeek[w] !== 1) fail(0, `la settimana ${w} deve avere una e una sola scelta (ne ho trovate ${perWeek[w] ?? 0})`);
  const choices = story.filter((b) => b.kind === 'scelta');
  const keys = choices.filter((b) => b.key);
  if (keys.length !== 2) fail(0, `i momenti chiave devono essere due (ne ho trovati ${keys.length}): «scelta · «…» · chiave»`);
  for (const k of keys) if (!k.best) fail(k.line, 'il momento chiave non ha la sua riga «migliore · «perché la ✓ è la migliore»»');
  // at the end the answer given in the month is off: with three answers or more there is still something to find
  for (const k of keys) if (k.options.length < 3) fail(k.line, 'un momento chiave deve avere almeno tre risposte, perché alla fine resti qualcosa da trovare');
  const count = (k) => story.filter((b) => b.kind === k).length;
  if (count('finale') !== 1) fail(0, 'serve una riga «finale · «…»»');
  if (count('gancio') !== 1) fail(0, 'serve una riga «gancio · «…»»');
  if (count('trappola') > 1) fail(0, 'la riga «trappola» va messa una volta sola');
  // how low the balance can go, choosing the costliest answer every week: under zero it has to be said, honestly
  let low = start;
  let run = start;
  for (const c of choices) {
    run += Math.min(...c.options.map((o) => o.cents));
    low = Math.min(low, run);
  }
  const eur = (c) => `${c < 0 ? '−' : ''}${(Math.abs(c) / 100).toFixed(2).replace('.', ',')} €`;
  if (low < 0 && !below) fail(0, `il saldo può andare sotto zero (fino a ${eur(low)}): serve «sottozero · «la battuta del mentore»»`);
  if (run < 0 && !story.find((b) => b.kind === 'finale')?.textNeg) fail(0, `il mese può finire sotto zero (fino a ${eur(run)}): serve «finale sotto zero · «…»»`);
  for (const c of choices) delete c.line;
  return { id: `p${floor}-campo`, floor, title: head[1].trim(), stato, start, below, story };
}

async function cardFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await cardFiles(p)));
    else if (/^(L\d+|Caso|Prova)-scheda\.md$/.test(entry.name)) found.push(p);
  }
  return found.sort();
}

const lessons = {};
const cases = {};
const fields = {}; // the Prove sul campo
const skipped = [];
try {
  for (const file of await cardFiles(cards)) {
    const name = relative(project, file);
    const isCase = file.endsWith('Caso-scheda.md');
    const isField = file.endsWith('Prova-scheda.md');
    const card = (isCase ? parseCase : isField ? parseField : parseCard)(await readFile(file, 'utf8'), name);
    // the test cards: lezioni/prova/ (and, when the script checks itself, a folder called prova)
    const test = /(^|[\\/])prova[\\/]/.test(relative(cards, file));
    if (!test && card.stato.toLowerCase() !== 'approvata') {
      skipped.push(`${name} (Stato: ${card.stato || '—'})`);
      continue;
    }
    card.test = test;
    delete card.stato;
    (isCase ? cases : isField ? fields : lessons)[test ? 'prova' : card.id] = card;
  }
} catch (err) {
  if (!(err instanceof CardError)) throw err;
  console.error(`Scheda da sistemare: ${err.message}`);
  process.exit(1);
}

// The lines on the trap (CLAUDE.md §4: one per type and per floor, said by the mentor right after the Caso's third
// choice and in the Prova sul campo; cubotto 5.5, 09/11/2026): lezioni/piano-N/trappole.md, with a first line
// «# Le righe sulla trappola · piano N» and one line per type, «basso-tradizionale · «…»». Only «Stato: approvata».
const QUADRANTS = ['alto-innovativo', 'alto-tradizionale', 'basso-innovativo', 'basso-tradizionale'];
function parseTraps(text, file) {
  const lines = text.split('\n');
  const fail = (i, msg) => {
    throw new CardError(`${file}:${i + 1} — ${msg}`);
  };
  const head = lines[0].match(/^#\s+Le righe sulla trappola\s+·\s+piano\s+(\d+)\s*$/i);
  if (!head) fail(0, 'la prima riga deve essere «# Le righe sulla trappola · piano N»');
  const stato = lines.find((l) => l.startsWith('Stato:'))?.slice(6).trim() ?? '';
  const by = {};
  lines.forEach((l, i) => {
    const m = l.match(/^(alto|basso)-(innovativo|tradizionale)\s+·\s+(.+)$/);
    if (!m) return;
    const k = `${m[1]}-${m[2]}`;
    if (by[k]) fail(i, `c'è già una riga per ${k}`);
    by[k] = said(m[3]);
    if (!by[k]) fail(i, `la riga di ${k} è vuota`);
  });
  const missing = QUADRANTS.filter((k) => !by[k]);
  if (missing.length) fail(0, `manca la riga di: ${missing.join(', ')}`);
  return { floor: Number(head[1]), stato, by };
}
async function trapFiles(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await trapFiles(p)));
    else if (entry.name === 'trappole.md') found.push(p);
  }
  return found.sort();
}
const traps = {};
try {
  for (const file of await trapFiles(cards)) {
    const name = relative(project, file);
    const t = parseTraps(await readFile(file, 'utf8'), name);
    if (t.stato.toLowerCase() !== 'approvata') {
      skipped.push(`${name} (Stato: ${t.stato || '—'})`);
      continue;
    }
    traps[t.floor] = t.by;
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
export const TRAPS = ${JSON.stringify(traps, null, 2)};
export const FIELDS = ${JSON.stringify(fields, null, 2)};
`;
// a number never leaves its «€» on the line below: «2 €» gets a no-break space (partita 09/11/2026)
await writeFile(out, body.replace(/(\d) €/g, '$1 €'));
const list = [
  ...Object.values(lessons).map((l) => `${l.test ? 'prova' : l.id} (${l.exercises.length} esercizi)`),
  ...Object.values(cases).map((c) => `${c.test ? 'Caso di prova' : c.id} (${c.story.length} battute)`),
  ...Object.values(fields).map((p) => `${p.test ? 'Prova sul campo di prova' : p.id} (${p.story.filter((b) => b.kind === 'scelta').length} settimane)`),
];
console.log(`${relative(root, out)}: ${list.join(', ') || 'nessuna lezione'}`);
if (skipped.length) console.log(`Non ancora approvate, lasciate fuori: ${skipped.join(', ')}`);
