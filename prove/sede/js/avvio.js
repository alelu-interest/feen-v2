// FEEN · la sede — the first start (07/11/2026, CLAUDE.md §5): test → your type with the map → the choice of the
// character → the empty company with the partner → the contract → the first lesson → the reminders → Percorso.
// 10/11/2026, the lead review (its word is law): no welcome screens, the test explains itself; no icons on the statements, the
// statement up top and the circles in the middle; your type and the map on one screen, the map rising under it; no
// «gioco, non diagnosi»; the two characters standing free, their names under them, nothing written to say «choose»
// (until 17/11/2026: the user, in front of the screen, found «soltanto loro due», and one question went back over them).
// And everywhere less text: the screen says it, not a sentence. 10/11/2026, the user: before the first statement an
// animated opening, «Che investitore sei?» over the eight shadows (apertura; not a welcome: nothing is explained).
// The test is the team's (quiz.js); the user's choices of 07/11/2026: a touch on a circle moves on by itself, there is
// no way back to the question before, no «Rifai il test». 09/11/2026, the user: no «Salta» on the welcome, and no
// trappola screen in the reveal (it stays in the Tu and in the mentor's line of the Caso). Every step is kept
// on the phone: closing the app brings you back to the step you reached. Welcome, partner and contract texts are
// Claude's, provisional.
import { QUESTIONS, SCALE, TIEBREAKS, PROFILES, score } from './quiz.js';
import { PEOPLE } from './people.js';
import { FIGURES } from './figures.js';
import { FLOORS } from './world.js';
import { IN_APP } from './app.js';
import { inkOn } from './kit.js';
import { TEXT as REMIND } from './avvisi.js';
import { copySoon } from './copia.js';
import { ICONS, setIcon } from './icona.js';

const KEY = 'feen-avvio';
const ORDER = ['alto-innovativo', 'alto-tradizionale', 'basso-innovativo', 'basso-tradizionale'];
// the women first in every pair (CLAUDE.md §4): the partner is «la socia» or «il socio»
const WOMEN = new Set(ORDER.map((k) => PROFILES[k].names[0]));
// which side «D’accordo» is on: true, the right (21/11/2026); false, the left, as it was
const AGREE_RIGHT = true;
const LABELS = ['Molto d’accordo', 'D’accordo', 'Un po’ d’accordo', 'Né d’accordo né in disaccordo', 'Un po’ in disaccordo', 'In disaccordo', 'Per niente d’accordo'];
// what the partner says in the empty company, one line per touch: two lines since 09/11/2026 (revisione UX, stanza 4),
// the partner and the launch, then the contract. Provisional, Claude's: the product of the launch is never said.
// The player is never called by the character's name (10/11/2026, six testers out of ten: «Eccoti, Jordan!» and «Io,
// Jordan, fondo…» made them play someone else's game; Claude's choice on the user's «fai tutto»): the name stays
// with the character, the face you play with; the texts say «tu».
const PARTNER = [
  (w) => `Eccoti! Sono ${w.partner}, ${w.partnerWord}. Lavoriamo a un grande lancio. Cosa lanciamo? Segreto tra soci.`,
  () => 'Prima però una firma.',
];
// the contract (09/11/2026): today's date as it is written on paper, and the partner's signature, already there
const today = () => new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
// from «Firmo» to the first lesson: the stamp lands (style.css, «partita 09/11 · B») and stays in sight (09/11/2026)
const STAMP_PAUSE = 2000;
const PARTNER_SIGN = '<svg viewBox="0 0 120 40" aria-hidden="true"><path d="M6 28c10-16 18-18 20-8s8 10 14-2 12-12 14 0 10 8 18-4 14-8 18 2 10 6 22-2"/></svg>';

// The opening (10/11/2026, the user: «una schermata animata all'apertura con almeno un "che investitore sei"», sketch A
// of 1. LAVORO/apertura/): the eight characters as shadows, in their four pairs where the map puts them, the title,
// a light passing over them; then the first statement comes by itself. About 3 s and no button: a touch goes on at
// once. Only before the first answer. At the choice the two shadows of your type take their colours (scelta).
const OPEN_TIME = 2900;
const fresh = () => ({ step: 'domande', i: 0, answers: Array(QUESTIONS.length).fill(null), tie: {}, pick: null, line: 0, sign: null, avvisi: null });
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if (!(s && Array.isArray(s.answers) && s.answers.length === QUESTIONS.length)) return null;
    // a phone saved on the welcome (until 10/11/2026) starts from the test
    if (s.step === 'benvenuto' || s.step === 'prima') Object.assign(s, { step: 'domande', i: 0 });
    return s;
  } catch {
    return null;
  }
}
const cap = (t) => t[0].toUpperCase() + t.slice(1);
// «rischio basso · tradizionale»: the «·» stays with the word before it, so a line never starts with it
const keep = (t) => t.replace(/ · /g, '\u00a0· ');

/** The result of the test as the rest of the prova needs it, or null before the choice of the character. */
export function whoOf(s) {
  if (!s?.pick) return null;
  const r = score(s.answers, s.tie);
  const p = PROFILES[r.quadrant];
  const partner = p.names.find((n) => n !== s.pick);
  return { ...r, profile: p, me: s.pick, partner, partnerWord: WOMEN.has(partner) ? 'la tua socia' : 'il tuo socio', sign: s.sign, signed: s.signed };
}

/** The little map of the four types with your point. Not used since 22/11/2026, when the Tu took the map of the reveal
 *  (stage, below; D7 of the bots): kept so that the Tu can have it back with one line (me.js, `stage(who)` →
 *  `miniMap(who)`). */
export function miniMap(who, { label = true, names = true } = {}) {
  // The names sit on the outer edge of each quadrant; your point lives in the free field of your quadrant, between
  // its names and the middle, so at any text size it never covers them (09/11/2026: at the far corners it used to
  // sit on the description). Still in proportion: the further from the middle on the map, the further from the
  // middle in the field; near the middle (an axis broken by the tie cards) it keeps a little way inside its quadrant,
  // never on the crossing (revisione UX 09/11/2026, problema 7). quiz.js stays as the team wrote it.
  const sx = who.quadrant.endsWith('tradizionale') ? 1 : -1;
  const sy = who.quadrant.startsWith('alto') ? 1 : -1;
  // the distance from the middle line, as a share of the field (style.css keeps the point whole inside it)
  const far = (v) => 12 + Math.min(1, Math.abs(v)) * 76;
  const left = sx > 0 ? far(who.x) : 100 - far(who.x);
  const top = sy > 0 ? 100 - far(who.y) : far(who.y);
  // «Tu» beside the point, on the side of the quadrant with more room
  const side = left > 50 ? ' to-left' : '';
  const you = `<i class="mm-field"><i class="mm-you${side}" style="--x:${left.toFixed(1)}%;--y:${top.toFixed(1)}%">${label ? '<span>Tu</span>' : ''}</i></i>`;
  // only the names in the quadrants: the axes around already say what each one is (10/11/2026, review: less text);
  // in the reveal not even the names (10/11/2026, the user: «elimina i nomi degli 8 personaggi qua»): your quadrant
  // and your point, the two characters come on the next screen
  const cells = ORDER.map((k) => `<div class="mm-q${k === who.quadrant ? ' me' : ''}">${names ? `<b>${keep(PROFILES[k].names.join(' · '))}</b>` : ''}${k === who.quadrant ? you : ''}</div>`).join('');
  return `<div class="mm" role="img" aria-label="La mappa dei quattro tipi: il tuo punto è nel quadrante ${who.profile.what}">
    <span class="mm-axis n">Rischio alto</span><span class="mm-axis s">Rischio basso</span>
    <span class="mm-axis w">Innovativo</span><span class="mm-axis e">Tradizionale</span>
    <div class="mm-grid">${cells}</div>
  </div>`;
}

/** The map of the reveal (17/11/2026, the user: «questa pagina va drasticamente migliorata»): the eight shadows of
 *  the opening, each pair in its quadrant, instead of four empty boxes. They come back whole, six step back and the two
 *  of your type stay, lit, with «Tu» over their heads; the two ends of the axes that are yours turn blue (they say what
 *  the small label under the motto said). No names here (10/11/2026) and no point: how far from the middle you are
 *  is not said any more (until 22/11/2026 the Tu had it, on miniMap). At the choice these two shadows walk into the two
 *  figures and take their colours. Since 22/11/2026 the Tu shows this map too, still (me.js; the user, D7 of the bots:
 *  the same idea had two looks): without .av-tada nothing moves, and the six are already back. */
export function stage(who) {
  const [risk, style] = who.quadrant.split('-');
  // the hidden picture gives each shadow its size, as in the opening
  const shadow = (n) => `<i class="av-sil" style="--m:url('${FIGURES[n]}')"><img src="${FIGURES[n]}" alt="" /></i>`;
  // --c is the column: the shadows step back from left to right
  const pairs = ORDER.map((q, i) => {
    const me = q === who.quadrant;
    return `<div class="st-pair${me ? ' me' : ''}" style="--c:${i % 2}">${PROFILES[q].names.map(shadow).join('')}${me ? '<b class="st-you">Tu</b>' : ''}</div>`;
  }).join('');
  const axis = (side, text, on) => `<span class="st-axis ${side}${on ? ' on' : ''}">${text}</span>`;
  // data-me: your row, the upper or the lower one, is the one with the room for «Tu» (style.css, --st-shift)
  return `<div class="av-stage" data-me="${risk === 'alto' ? 'n' : 's'}" role="img" aria-label="La mappa dei quattro tipi: il tuo è ${who.profile.what}">
    ${axis('n', 'Rischio alto', risk === 'alto')}${axis('s', 'Rischio basso', risk === 'basso')}
    ${axis('w', 'Innovativo', style === 'innovativo')}${axis('e', 'Tradizionale', style === 'tradizionale')}
    <div class="st-grid">${pairs}</div>
  </div>`;
}
// when the six step back (style.css, st-back): the sound and the buzz of the reward land there
const PICK_AT = 1400;
// the two shadows of your type, from the map to the figures of the choice
const FLY = 560;

/** The signature as drawn, in a box of 0..1: the Tu shows it under the contract. */
export function signSvg(sign, cls = '') {
  if (!sign?.length) return '';
  // the same curves as the pad draws (avvio.js, pad)
  const pt = ([x, y]) => `${(x * 300).toFixed(1)} ${(y * 100).toFixed(1)}`;
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  const d = sign
    .map((st) => `M${pt(st[0])}` + st.slice(1, -1).map((q, k) => `Q${pt(q)} ${pt(mid(q, st[k + 2]))}`).join('') + (st.length > 1 ? `L${pt(st[st.length - 1])}` : ''))
    .join('');
  return `<svg class="${cls}" viewBox="0 0 300 100" aria-hidden="true"><path d="${d}"/></svg>`;
}

export function makeAvvio(api) {
  const root = document.getElementById('avvio');
  let s = load();
  let lock = false;
  let opened = false; // the opening played (or was skipped) in this session
  let openT = 0;
  let smoothF = 0;
  let pickT = 0; // the reward of the reveal, when your pair stays lit
  let flight = null; // where the two shadows of your type stood on the map, for the choice that follows
  const calm = () => document.documentElement.hasAttribute('data-calm');

  /** Calls back when the screen moves smoothly (four frames in a row under 40 ms), or after 6 s of frames: on a slow
   *  phone still busy building the sede the opening waits to be seen instead of running out its clock (10/11/2026 sera;
   *  on the Mac the screen is free after about 0.2 s, so there it starts at once). */
  const whenSmooth = (cb) => {
    cancelAnimationFrame(smoothF);
    let t0 = 0;
    let last = 0;
    let calm = 0;
    const step = (now) => {
      if (!t0) t0 = last = now;
      calm = now - last < 40 ? calm + 1 : 0;
      last = now;
      if (calm >= 4 || now - t0 > 6000) return cb();
      smoothF = requestAnimationFrame(step);
    };
    smoothF = requestAnimationFrame(step);
  };

  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
      copySoon(); // the app's file follows (copia.js)
    } catch {
      /* private window: the first start still works, it is only not kept */
    }
  };
  const go = (step, extra = {}) => {
    Object.assign(s, { step }, extra);
    save();
    show();
  };

  function screen(cls, html) {
    clearTimeout(openT);
    clearTimeout(pickT);
    cancelAnimationFrame(smoothF);
    root.className = `avvio ${cls}`;
    root.innerHTML = html;
    root.scrollTop = 0;
    const h = root.querySelector('h1, h2');
    h?.setAttribute('tabindex', '-1');
    h?.focus({ preventScroll: true });
  }

  // ---------- the screens ----------
  /** «Che investitore sei?» over the eight shadows, then the first statement (OPEN_TIME). */
  function apertura() {
    // the hidden picture gives each shadow its size; the shadow is the same picture as a mask, in the ink of the app
    const shadow = (n, k, col) => `<i class="av-sil" style="--m:url('${FIGURES[n]}');--k:${k};--c:${col}"><img src="${FIGURES[n]}" alt="" /></i>`;
    // high risk on top, innovative on the left; --c is the column, for the light that passes from left to right
    const pairs = ORDER.map((q, i) => `<div class="av-pair">${PROFILES[q].names.map((n, j) => shadow(n, i * 2 + j, (i % 2) * 2 + j)).join('')}</div>`).join('');
    screen('av-open', `<h1>Che investitore sei?</h1><div class="av-shadows" aria-hidden="true">${pairs}</div>`);
    // the shadows, the title and the clock start together, once the phone can show them (av-go)
    whenSmooth(() => {
      if (!root.classList.contains('av-open')) return;
      root.classList.add('av-go');
      openT = setTimeout(() => {
        root.classList.add('av-open-out');
        openT = setTimeout(endOpen, 230);
      }, OPEN_TIME);
    });
  }
  function endOpen() {
    clearTimeout(openT);
    opened = true;
    question();
  }

  // One statement back (19/11/2026, from a tester: «non si può tornare indietro, quindi anche per un misclick te lo
  // accolli»; the user: «fai te»). A touch on a circle goes on by itself, so a touch gone wrong could not be put
  // right, and the type is only done again with «Ricomincia da capo». One quiet word under the circles, from the
  // second statement on: the statement before comes back with its answer still lit. No «Avanti»: going on is what a
  // touch on a circle does. It hangs under the circles without taking room, so they stay where they are. Until
  // 19/11/2026 there was no way back (the user's choice of 07/11/2026).
  const BACK = '<button class="av-back" data-act="back"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6l-6 6 6 6"/></svg>Indietro</button>';
  const canBack = () => !root.hidden && !lock && ((s?.step === 'domande' && s.i > 0) || s?.step === 'spareggio');
  function stepBack() {
    if (!canBack()) return false;
    // from the extra question, back to the last statement: answered again, it decides again whether one is needed
    if (s.step === 'spareggio') go('domande', { i: QUESTIONS.length - 1, tie: {} });
    else go('domande', { i: s.i - 1 });
    return true;
  }

  function question() {
    if (!opened && s.i === 0 && s.answers.every((a) => a === null)) return apertura();
    const q = QUESTIONS[s.i];
    const pips = QUESTIONS.map((_, k) => `<i class="${k < s.i ? 'on' : k === s.i ? 'now' : ''}"></i>`).join('');
    // «In disaccordo» on the left, «D’accordo» on the right (21/11/2026, from a tester: «dovrebbero essere invertite
    // accordo e disaccordo»): the scale reads like a cursor, from less to more, and no longer has the order of the
    // test FEEN took the method from. Each circle keeps its value, its size and its colour: only the side changes.
    const order = SCALE.values.map((v, k) => [v, k]);
    if (AGREE_RIGHT) order.reverse();
    const dots = order
      .map(([v, k]) => `<button class="av-dot d${k}" data-val="${v}" aria-label="${LABELS[k]}" aria-pressed="${s.answers[s.i] === v}"></button>`)
      .join('');
    const ends = [`<span class="yes">${SCALE.left}</span>`, `<span class="no">${SCALE.right}</span>`];
    if (AGREE_RIGHT) ends.reverse();
    // the statement up top, the circles in the middle of the screen (10/11/2026, review)
    screen(
      'av-page av-test',
      `<div class="av-progress" aria-hidden="true"><div class="av-pips">${pips}</div><span>${s.i + 1} / ${QUESTIONS.length}</span></div>
      <h2 class="av-q" aria-label="Domanda ${s.i + 1} di ${QUESTIONS.length}. ${q.text}">${q.text}</h2>
      <div class="av-mid">
        <div class="av-scale" role="group" aria-label="Quanto sei d’accordo">
          <div class="av-dots">${dots}</div>
          <div class="av-ends" aria-hidden="true">${ends.join('')}</div>
          ${s.i > 0 ? BACK : ''}
        </div>
      </div>`,
    );
    questionRoom(root.querySelector('.av-q'));
  }

  /** Every statement keeps the room of the tallest of the twelve, so the circles stay where they are from the first
   *  to the last (11/11/2026: they sat under the text, and went up and down by 31 px with its lines, under a finger
   *  that answers in rhythm). Measured on this phone, at its width and its text size, and again when either changes. */
  let roomKey = '';
  let roomH = 0;
  function questionRoom(h2) {
    if (!h2) return;
    const key = `${h2.clientWidth}|${getComputedStyle(h2).fontSize}|${document.fonts?.status ?? ''}`;
    if (key !== roomKey) {
      const probe = h2.cloneNode(false);
      probe.removeAttribute('aria-label');
      probe.setAttribute('aria-hidden', 'true');
      Object.assign(probe.style, { position: 'absolute', visibility: 'hidden', pointerEvents: 'none', minHeight: '0', width: `${h2.clientWidth}px` });
      h2.parentNode.appendChild(probe);
      roomH = 0;
      for (const q of QUESTIONS) {
        probe.innerHTML = q.text;
        roomH = Math.max(roomH, probe.offsetHeight);
      }
      probe.remove();
      roomKey = key;
    }
    h2.style.minHeight = `${roomH}px`;
  }
  // the first statement can come before the app's typeface, or before the phone's text size (app.js, setFontScale,
  // which says «resize»): measured again once they are there, and when the phone turns
  document.fonts?.ready?.then(() => questionRoom(root.querySelector('.av-q')));
  window.addEventListener('resize', () => questionRoom(root.querySelector('.av-q')));

  /** One more question when an axis ends in the middle. In the frame of the twelve statements (11/11/2026): the bar
   *  stays, full, with «Ancora una» where the count was; the question stands where the statements stood; the two
   *  answers sit where the circles were, under the thumb that has just answered. Before, the bar went, the question
   *  came 18 px higher and the answers stood at the top of the screen. */
  function tie() {
    const axis = score(s.answers, s.tie).ask[0];
    // closed between the answer and the next screen (the answer is saved at the touch): nothing left to ask
    if (!axis) return go('pregio');
    const t = TIEBREAKS[axis];
    const pips = QUESTIONS.map(() => '<i class="on"></i>').join('');
    screen(
      'av-page av-test av-tie',
      `<div class="av-progress" aria-hidden="true"><div class="av-pips">${pips}</div><span>Ancora una</span></div>
      <h2 class="av-q" aria-label="Ancora una. ${t.text}">${t.text}</h2>
      <div class="av-mid">
        <div class="av-choice-box"><div class="av-choice">${t.options.map((o) => `<button data-axis="${axis}" data-side="${o.side}" aria-pressed="false">${o.text}</button>`).join('')}</div>${BACK}</div>
      </div>`,
    );
    questionRoom(root.querySelector('.av-q'));
  }

  /** Your type and, rising under it, the map (10/11/2026, review: «molto più lean», the map «sotto come pop-up»).
   *  Since 17/11/2026 the map is the eight shadows of the opening (stage): the opening asked, here two of them answer. */
  function pregio() {
    const who = whoOf({ ...s, pick: '-' });
    const p = who.profile;
    screen(
      'av-page av-reveal av-tada',
      // the opening asked «Che investitore sei?»: the answer says what it is the type of (11/11/2026)
      `<p class="av-eyebrow">Il tuo tipo di investitore</p>
      <h1>${p.motto}</h1>
      <p class="av-good">${p.pregio}</p>
      ${stage(who)}
      <button class="pill pill-dark wide" data-act="next">Avanti</button>`,
    );
    // the reveal is a moment, not a page: it comes in a piece at a time, and the sound and the buzz of a reward land
    // when six shadows step back and yours stay (with reduced motion the map is just there, and so are they)
    pickT = setTimeout(
      () => {
        api.sfx.reward?.();
        api.buzz(25);
      },
      calm() ? 0 : PICK_AT,
    );
  }

  /** The two versions of your type, standing free: a touch brings one forward, the button says who you play with.
   *  Over them one question, in the user's words (17/11/2026: «non c'è più scegli chi dei due ti rappresenta, ci sono
   *  soltanto loro due»; from 10/11 to then nothing was written here, on the review's word: the screen alone did not say it). */
  function scelta() {
    const p = whoOf({ ...s, pick: '-' }).profile;
    // coming from the map, the two shadows walk from where they stood into the figures (17/11/2026)
    const from = flight;
    flight = null;
    const cards = p.names
      .map(
        (n) =>
          `<button class="av-person" data-pick="${n}" aria-pressed="${s.pick === n}" aria-label="${s.pick && s.pick !== n ? `${n}, il tuo socio` : n}"><span class="av-figure"><img src="${FIGURES[n]}" alt="" /><i class="av-unveil" style="--m:url('${FIGURES[n]}')"></i></span><b>${n}</b><small class="av-role" aria-hidden="true">il tuo socio</small></button>`,
      )
      .join('');
    screen(
      `av-page av-pick${s.pick ? ' picked' : ''}${from ? ' av-flown' : ''}`,
      `<h1>Chi dei due ti rappresenta?</h1>
      <div class="av-people">${cards}</div>
      <button class="pill pill-dark wide" data-act="pick">${s.pick ? `Gioco con ${s.pick}` : ''}</button>`,
    );
    // the two shadows of the opening take their colours: each shadow lies exactly on its figure (the layout box,
    // without the breathing, which the shadow does too); if the picture never decodes, the figures are simply there
    root.querySelectorAll('.av-figure').forEach((f, k) => {
      const img = f.querySelector('img');
      const sh = f.querySelector('.av-unveil');
      img
        .decode()
        .catch(() => {})
        .then(() => {
          if (!img.offsetHeight) return;
          Object.assign(sh.style, { left: `${img.offsetLeft}px`, top: `${img.offsetTop}px`, width: `${img.offsetWidth}px`, height: `${img.offsetHeight}px` });
          sh.classList.add('placed');
          // from the map: the shadow starts where it stood there, as small as it was, and grows into its figure from
          // its feet (the shadow turns around the middle of its feet, style.css). Under it the figure waits (av-flown).
          const a = from?.[k];
          if (!a?.width || !sh.animate) return;
          const box = f.getBoundingClientRect();
          const x = box.left + img.offsetLeft + img.offsetWidth / 2;
          const y = box.top + img.offsetTop + img.offsetHeight;
          sh.animate(
            [
              { transform: `translate(${a.left + a.width / 2 - x}px, ${a.bottom - y}px) scale(${a.width / img.offsetWidth}, ${a.height / img.offsetHeight})` },
              { transform: 'none' },
            ],
            { duration: FLY, easing: 'cubic-bezier(0.3, 0, 0.1, 1)' },
          );
        });
    });
  }

  function azienda() {
    const who = whoOf(s);
    // a phone saved on a line of the old four keeps going from the last one
    const line = Math.min(s.line, PARTNER.length - 1);
    const last = line === PARTNER.length - 1;
    screen(
      'av-scene',
      `<div class="av-talk">
        <span class="av-face"><img src="${PEOPLE[who.partner]}" alt="" /></span>
        <div class="av-talk-body">
          <b>${who.partner}</b>
          <p class="av-talk-line" tabindex="-1">${PARTNER[line](who)}</p>
        </div>
        <button class="pill pill-dark wide" data-act="line">${last ? 'Vediamo il contratto' : 'Avanti'}</button>
      </div>`,
    );
    // no title on this screen: the screen reader starts from the partner's line, at every line
    root.querySelector('.av-talk-line').focus({ preventScroll: true });
  }

  function contratto() {
    const who = whoOf(s);
    screen(
      'av-page av-contract',
      `<div class="av-paper">
        <h1>Contratto tra soci</h1>
        <ol class="av-articles">
          <li><b>Art. 1</b> Io fondo questa azienda con ${who.partner}.</li>
          <li><b>Art. 2</b> Imparo come funzionano i soldi, una lezione alla volta.</li>
          <li><b>Art. 3</b> Niente scadenze: se mi fermo, l’azienda mi aspetta.</li>
        </ol>
        <p class="av-date">${today()}</p>
        <div class="av-partner-sign">${PARTNER_SIGN}<span><b>${who.partner}</b></span></div>
        <div class="av-sign"><canvas id="av-pad" aria-hidden="true"></canvas><span class="av-sign-hint">Firma qui col dito</span></div>
        <div class="av-sign-line"><span>La tua firma</span><button class="av-redo" data-act="redo">Rifai</button></div>
        <div class="av-stamp" aria-hidden="true"><b>FEEN</b><small>Soci<br />fondatori</small></div>
      </div>
      ${IN_APP ? '' : '<p class="av-note av-prov">Testo provvisorio.</p>'}
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="sign" disabled>Firmo</button>
      <button class="av-alt" data-act="sign-alt">Firmo con un tocco</button>`,
    );
    pad();
  }

  function avvisi() {
    screen(
      'av-page av-remind',
      // the reminder as it will arrive (revisione della grafica, 10/11/2026 notte): FEEN's notification, in place of a
      // bell on a white card. The notification comes with the app's icon, which since the choice is your character's
      // face (icona.js, 22/11/2026). Since 22/11/2026 without the big clock over it (the user, D9 of the bots: it looked
      // like the button to choose the time, which is the line below): the only 18:00 is the one to touch
      `<div class="av-lock" aria-hidden="true">
        <div class="av-notif">
          <img class="av-notif-icon" src="${ICONS[s.pick] ?? ICONS.Jane}" alt="" />
          <div><p class="av-notif-head"><b>${REMIND.title}</b><span class="av-notif-when">ora</span></p><p class="av-notif-body">${REMIND.body}</p></div>
        </div>
      </div>
      <h1>Vuoi un promemoria?</h1>
      <p class="av-lead">Uno al giorno al massimo, mai se hai già fatto lezione.</p>
      <label class="av-time"><span>Ogni giorno alle</span><input type="time" id="av-time" value="18:00" step="900" /></label>
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="remind">Attiva i promemoria</button>
      <button class="pill pill-light wide" data-act="no-remind">Non ora</button>`,
    );
  }

  // ---------- the signature pad: a stroke really drawn, «Firmo» lights up once it is long enough ----------
  function pad() {
    const cv = document.getElementById('av-pad');
    const btn = root.querySelector('[data-act="sign"]');
    const ctx = cv.getContext('2d');
    let strokes = [];
    let length = 0;
    let cur = null;
    const fit = () => {
      const r = cv.getBoundingClientRect();
      const k = Math.min(3, window.devicePixelRatio || 1);
      cv.width = r.width * k;
      cv.height = r.height * k;
      ctx.setTransform(k, 0, 0, k, 0, 0);
      draw();
    };
    const draw = () => {
      const r = cv.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      ctx.strokeStyle = '#0f70e0'; // the app's blue, like a pen (as the contract in the Tu)
      ctx.lineWidth = 2.6;
      ctx.lineCap = ctx.lineJoin = 'round';
      // curves through the midpoints, like a pen, not straight segments (10/11/2026, a tester: «spezzati come un grafico»)
      for (const st of strokes) {
        const p = st.map(([x, y]) => [x * r.width, y * r.height]);
        ctx.beginPath();
        ctx.moveTo(...p[0]);
        for (let k = 1; k < p.length - 1; k++) ctx.quadraticCurveTo(p[k][0], p[k][1], (p[k][0] + p[k + 1][0]) / 2, (p[k][1] + p[k + 1][1]) / 2);
        if (p.length > 1) ctx.lineTo(...p[p.length - 1]);
        ctx.stroke();
      }
    };
    const at = (e) => {
      const r = cv.getBoundingClientRect();
      return [Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))];
    };
    cv.addEventListener('pointerdown', (e) => {
      cv.setPointerCapture(e.pointerId);
      cur = [at(e)];
      strokes.push(cur);
      root.querySelector('.av-sign').classList.add('drawn');
      root.classList.add('av-inked'); // you are drawing: «Firmo con un tocco» steps aside (16/11/2026)
    });
    cv.addEventListener('pointermove', (e) => {
      if (!cur) return;
      const p = at(e);
      const q = cur[cur.length - 1];
      const r = cv.getBoundingClientRect();
      const d = Math.hypot((p[0] - q[0]) * r.width, (p[1] - q[1]) * r.height);
      if (d < 2) return;
      length += d;
      cur.push(p);
      draw();
      btn.disabled = length < 140;
    });
    const end = () => (cur = null);
    cv.addEventListener('pointerup', end);
    cv.addEventListener('pointercancel', end);
    root.querySelector('[data-act="redo"]').onclick = () => {
      api.sfx.tap();
      strokes = [];
      length = 0;
      btn.disabled = true;
      root.querySelector('.av-sign').classList.remove('drawn');
      root.classList.remove('av-inked');
      draw();
    };
    pad.take = () => strokes.filter((st) => st.length > 1).map((st) => st.map(([x, y]) => [Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]));
    requestAnimationFrame(fit);
  }

  // ---------- the steps that happen in the sede ----------
  async function lezione() {
    screen('av-off', '');
    // left with the X: the lesson starts again from the beginning when you want (CLAUDE.md §6), and meanwhile the
    // sede is under the finger
    if ((await api.firstLesson()) === false) return looking();
    go('avvisi');
  }
  /** Leaving the first lesson with the X (17/11/2026, a review: «non posso uscire dalle domande e vedere la mia
   *  azienda»): until the first lesson is done there is no bar and no Ufficio, so whoever left it could only start it
   *  again. Here the sede is under the finger as in the Ufficio (scroll, zoom, into the floor, the stands say what
   *  arrives), and of the first start only the button that starts the lesson stays, at the bottom. Since 22/11/2026
   *  the X comes straight here: the page in between («Ti aspetta quando vuoi», with «Guarda la tua azienda») is gone,
   *  because it was almost empty and on the iPhone there was no way back to it from the sede (D5 and D10 of the bots;
   *  «Vuoi uscire?» already says that the lesson starts again). Not a step: the app closed here opens again on the
   *  lesson. */
  function looking() {
    api.toSede();
    screen('av-look', `<h2 class="sr-only">La tua azienda</h2><button class="pill pill-dark wide" data-act="lesson-again">Inizia la lezione · 3 min</button>`);
  }

  // what lies under the screens is out of reach of the finger, the keyboard and the screen reader
  const BEHIND = ['.top', '#a11y', '#btn-back', '.bottom', '#path', '#me'];
  const reach = (on) => BEHIND.forEach((sel) => (document.querySelector(sel).inert = !on));

  function show() {
    document.body.dataset.avvio = s.step;
    root.hidden = false;
    reach(s.step === 'lezione');
    lock = false;
    if (s.step === 'azienda') api.toSede();
    // a phone saved on the old trappola or map screens (until 10/11/2026) goes on from your type, which has the map
    const f = { domande: question, spareggio: tie, pregio, trappola: pregio, mappa: pregio, scelta, azienda, contratto, lezione, avvisi }[s.step];
    if (f) return f();
    finish();
  }

  function finish() {
    root.hidden = true;
    root.innerHTML = '';
    delete document.body.dataset.avvio;
    reach(true);
    api.done();
  }

  // ---------- touches ----------
  root.addEventListener('click', (e) => {
    // a touch during the opening: the first statement, at once
    if (root.classList.contains('av-open')) return endOpen();
    const b = e.target.closest('button');
    if (!b || b.disabled || lock) return;
    const act = b.dataset.act;
    if (b.dataset.val !== undefined) {
      // a touch on a circle is the answer: it shows, and the next statement comes by itself
      lock = true;
      api.sfx.tap();
      api.buzz(10);
      s.answers[s.i] = Number(b.dataset.val);
      for (const d of root.querySelectorAll('.av-dot')) d.setAttribute('aria-pressed', String(d === b));
      save();
      // the circle taken stays in sight a moment before the next statement (10/11/2026, a tester: at 260 ms they could
      // not see which one they had touched)
      setTimeout(() => {
        if (s.i < QUESTIONS.length - 1) return go('domande', { i: s.i + 1 });
        go(score(s.answers).ask.length ? 'spareggio' : 'pregio', { tie: {} });
      }, 420);
      return;
    }
    api.sfx.tap();
    if (act === 'back') return stepBack();
    if (b.dataset.side) {
      // the answer taken shows a moment, as a circle of the test does, and meanwhile a second touch does nothing
      // (11/11/2026: the screen changed at once, and when two of these come in a row their answers stand in the same
      // place, so a double touch answered both)
      lock = true;
      api.buzz(10);
      b.setAttribute('aria-pressed', 'true');
      s.tie[b.dataset.axis] = Number(b.dataset.side);
      save();
      setTimeout(() => go(score(s.answers, s.tie).ask.length ? 'spareggio' : 'pregio'), 420);
      return;
    }
    if (b.dataset.pick) {
      // the one touched steps forward, the other steps back, the button comes up with the name (no re-render: the
      // figures keep their place and their breathing)
      s.pick = b.dataset.pick;
      save();
      for (const x of root.querySelectorAll('.av-person')) {
        x.setAttribute('aria-pressed', String(x === b));
        // who is not picked becomes the partner, and says so under the name (the user, 22/11/2026, D3 of the bots:
        // whoever did not read thought the choice had gone wrong when the other one came on as the partner)
        x.setAttribute('aria-label', x === b ? x.dataset.pick : `${x.dataset.pick}, il tuo socio`);
      }
      root.classList.add('picked');
      root.querySelector('[data-act="pick"]').textContent = `Gioco con ${s.pick}`;
      return;
    }
    if (act === 'lesson-again') return show();
    if (act === 'next') {
      // where the two shadows of your type stand on the map: the choice starts them from there (scelta)
      flight = calm() ? null : [...root.querySelectorAll('.st-pair.me .av-sil')].map((el) => el.getBoundingClientRect());
      return go('scelta');
    }
    if (act === 'pick') {
      if (!s.pick) return;
      // the app's icon becomes this face (22/11/2026, the user): the touch that chooses is the touch Apple asks for,
      // and iOS says it in its own box while the partner comes on
      setIcon(s.pick);
      return go('azienda', { line: 0 });
    }
    if (act === 'line') {
      if (s.line < PARTNER.length - 1) return go('azienda', { line: s.line + 1 });
      return go('contratto');
    }
    if (act === 'sign' || act === 'sign-alt') {
      // the stamp lands on the paper, then the first lesson (09/11/2026, the user: «migliora il contratto»)
      const sign = act === 'sign' ? pad.take() : null;
      if (act === 'sign-alt') {
        // signed with one touch: «Firmato» goes on the line, written, instead of an empty pad under the stamp
        const box = root.querySelector('.av-sign');
        box?.classList.add('drawn', 'typed');
        box?.insertAdjacentHTML('beforeend', '<span class="av-sign-typed">Firmato</span>');
      }
      root.querySelector('.av-paper')?.classList.add('stamped');
      root.classList.add('av-signed'); // «Rifai» and «Firmo con un tocco» go: the contract is signed
      // and the button says so, instead of looking switched off as if something had gone wrong (10/11/2026, a tester)
      const done = root.querySelector('[data-act="sign"]');
      if (done) done.textContent = 'Firmato';
      root.querySelectorAll('[data-act]').forEach((x) => (x.disabled = true));
      // the stamp in sight, even when the page had scrolled down to «Firmo» (a short phone, large text)
      const calm = document.documentElement.hasAttribute('data-calm');
      root.querySelector('.av-stamp')?.scrollIntoView({ block: 'nearest', behavior: calm ? 'auto' : 'smooth' });
      api.sfx.reward?.();
      api.buzz(25);
      // signed is signed: the step is saved now, not when the stamp has finished (10/11/2026, a tester's game: closing the
      // app during the 2 s of the stamp meant signing again). The stamp is the show.
      Object.assign(s, { step: 'lezione', sign, signed: today() });
      save();
      // the moment you become partners stays on screen long enough to read the stamp (partita 09/11/2026, punto 7:
      // with 0.9 s in all it hardly showed); with reduced motion the stamp is just there, the pause is the same
      return setTimeout(show, STAMP_PAUSE);
    }
    if (act === 'remind' || act === 'no-remind') {
      const time = root.querySelector('#av-time')?.value || '18:00';
      // the phone asks its permission here, after the first lesson; the app schedules (main.js remind, avvisi.js)
      api.remind(act === 'remind' ? time : false);
      return go('fatto', { avvisi: act === 'remind' ? time : false });
    }
  });

  return {
    /** True once the first start is over: the prova opens on the Percorso. */
    done: () => s?.step === 'fatto',
    /** Back to the step reached, or to the test on a phone that never opened FEEN. */
    resume() {
      if (!s) s = fresh();
      // a lesson cut in half starts again from the beginning (CLAUDE.md §6)
      show();
    },
    /** «Ricomincia da capo» and DEMO: everything goes, the test comes back. */
    restart() {
      s = fresh();
      setIcon(null); // back to the test, back to the white icon (icona.js)
      opened = false; // starting again from the test starts again from the opening
      save();
      show();
    },
    who: () => whoOf(s),
    /** The back key in the test (main.js back): one statement back; false when there is none to go back to. */
    back: stepBack,
    /** True while the sede is under the finger after leaving the first lesson: there the back key works (main.js back). */
    looking: () => !root.hidden && root.classList.contains('av-look'),
  };
}
