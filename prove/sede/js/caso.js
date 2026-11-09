// FEEN · la sede — the Caso (compito C1, 07/11/2026; CLAUDE.md §6, strada B of 1. LAVORO/caso/schizzi/): a short
// story with the mentor, told as a dialogue. At the top the room of the floor, still and without people; under it the
// lines of the mentor one at a time with the face, the scenes in italics, the old messages faded; the choices at the
// bottom; the X and the bar of the three choices at the top, as in the lessons. One story that rewinds: a wrong
// choice shows in a short scene what would have happened, the mentor covers you («Capita anche ai migliori.
// Riprendiamola») and you choose again, with that answer turned off; the story always reaches the same end, told
// as «Un mese dopo», then the line that opens the next lesson. The stories come from the approved cards.
import { PEOPLE } from './people.js';
import { motion } from './kit.js';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const COVER = 'Capita anche ai migliori. Riprendiamola.';

/** The indices 0…n−1 in a fair random order, the lessons' shuffle (lezione.js): the answers of a choice are mixed once
 *  per moment of choice, so the right one is not always where the card wrote it (partita 09/11/2026). Shared with
 *  campo.js. */
export function shuffled(n) {
  const a = [...Array(n).keys()];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** The choices come where «Avanti» was a moment before: a second tap meant for «Avanti» took an answer unread
 *  (partita 09/11/2026). So what comes in the foot of the dialogue fades in (style.css, .cs-in; still with «Movimento
 *  ridotto») and for a moment takes no touch: the choices for `HOLD.opts`, the button that comes where the choices were
 *  for the shorter `HOLD.button`, so a double tap on an answer does not skip what it did. Shared with campo.js. */
export const HOLD = { opts: 500, button: 300 };
export function hold(foot, ms) {
  foot.readyAt = performance.now() + ms;
  foot.classList.add('cs-hold');
  clearTimeout(foot.holdTimer);
  foot.holdTimer = setTimeout(() => foot.classList.remove('cs-hold'), ms);
}
/** True while the foot still holds back the touches (a keyboard Enter too). */
export const held = (foot) => !!foot && performance.now() < (foot.readyAt ?? 0);

export function makeCase(api) {
  const root = document.getElementById('caso');
  let resolve = null;
  // a step put off after an answer runs only while its game is still on: leaving with the X ends it (partita 09/11/2026)
  let run = 0;
  const later = (fn, ms) => {
    const r = run;
    return setTimeout(() => r === run && fn(), ms);
  };
  let story = null;
  let at = 0; // the next beat of the story
  let solved = 0; // the choices got right, for the bar
  let anyWrong = false;
  let off = new Set(); // the answers already wrong at this choice (indices of the card)
  let orders = new Map(); // a choice of the story → the order its answers show in, decided once per play
  let fresh = false; // the foot holds choices, or held them last: the button that comes next is held back too

  function shell(room, floorName) {
    const n = story.story.filter((b) => b.kind === 'scelta').length;
    root.innerHTML = `<div class="lz-top">
        <button class="lz-x" data-act="x" aria-label="Esci dal Caso"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg></button>
        <div class="cs-bar" role="progressbar" aria-label="Scelte fatte" aria-valuemin="0" aria-valuemax="${n}" aria-valuenow="0">${'<i></i>'.repeat(n)}</div>
      </div>
      <div class="cs-room">${room ? `<img src="${room}" alt="" />` : ''}<span class="cs-tag">Il Caso · ${esc(floorName)}</span></div>
      <div class="cs-chat" aria-live="polite"></div>
      <div class="cs-foot"></div>
      <div class="lz-ask" id="lz-ask" hidden></div>`;
  }
  const chat = () => root.querySelector('.cs-chat');
  const foot = () => root.querySelector('.cs-foot');

  function face(who) {
    const name = who === 'mentore' ? api.who()?.partner : null;
    return name ? `<span class="cs-face"><img src="${PEOPLE[name]}" alt="" /></span>` : '<span class="cs-face cs-face-none"></span>';
  }
  const nameOf = (who) => (who === 'mentore' ? api.who()?.partner ?? 'Il mentore' : 'Il collega');

  /** One message more in the chat: the older ones step back (style.css, .cs-msg.past), the newest is read aloud. */
  function say(html, cls) {
    const c = chat();
    // every message already there becomes past: only the newest stays strong (before, the one just before it did too)
    c.querySelectorAll('.cs-msg').forEach((m) => m.classList.add('past'));
    c.insertAdjacentHTML('beforeend', `<div class="cs-msg ${cls}">${html}</div>`);
    c.scrollTo({ top: c.scrollHeight, behavior: motion.calm ? 'auto' : 'smooth' });
  }
  // `cls` cs-ask marks the line that holds the question, which has to stay in sight while the choices wait
  const line = (who, text, cls = '') => say(`${face(who)}<div class="cs-bubble"><b>${esc(nameOf(who))}</b><p>${esc(text)}</p></div>`, `cs-line ${cls}`);
  const scene = (text, cls = '') => say(`<p>${esc(text)}</p>`, `cs-scene ${cls}`);
  const mine = (text) => say(`<p>${esc(text)}</p>`, 'cs-mine');

  /** The choices or the button at the bottom take room from the chat: it goes back to the newest line. When the
   *  choices leave too little room for the question (a short phone, large text), the room above steps back
   *  (09/11/2026, revisione UX, stanza 9). */
  function settle() {
    const c = chat();
    requestAnimationFrame(() => {
      root.classList.remove('cs-tight');
      const ask = foot().querySelector('.cs-opts') && [...c.querySelectorAll('.cs-ask')].at(-1);
      if (ask && ask.offsetHeight > c.clientHeight - 12) root.classList.add('cs-tight');
      c.scrollTop = c.scrollHeight;
    });
  }
  function button(label, act) {
    // where the choices were, the button fades in and waits a moment; after another button it is just there
    const after = fresh;
    fresh = false;
    foot().innerHTML = `<button class="pill pill-dark wide${after ? ' cs-in cs-in-short' : ''}" data-act="${act}">${label}</button>`;
    if (after) hold(foot(), HOLD.button);
    foot().querySelector('button').focus({ preventScroll: true });
    settle();
  }

  /** The story goes on beat by beat; a choice waits for you, the end waits for «Continua». */
  function step() {
    const b = story.story[at];
    if (!b) return button('Continua', 'end');
    at++;
    if (b.kind === 'scena') scene(b.text);
    if (b.kind === 'mentore' || b.kind === 'collega') line(b.kind, b.text);
    if (b.kind === 'finale') scene(b.text, 'cs-end');
    if (b.kind === 'gancio') line('mentore', b.text);
    if (b.kind === 'trappola') {
      // the line for your type, from the approved lezioni/piano-N/trappole.md (main.js, TRAPS): without one, skipped
      const t = api.trapLine?.(story.floor);
      if (!t) return step();
      line('mentore', t);
    }
    if (b.kind === 'scelta') {
      off = new Set();
      line('mentore', b.text, 'cs-ask');
      return choices(b);
    }
    // the next beat by your touch, so the story goes at your pace
    if (at >= story.story.length) return button('Continua', 'end');
    button('Avanti', 'next');
  }

  function choices(b) {
    // the order is decided the first time this choice shows and kept after a rewind, so the wrong answer stays
    // crossed out in its place; data-opt and `off` keep the indices of the card
    if (!orders.has(b)) orders.set(b, shuffled(b.options.length));
    // the group carries the question, so VoiceOver says what the answers answer
    foot().innerHTML = `<div class="cs-opts cs-in" role="group" aria-label="${esc(b.text)}">${orders
      .get(b)
      .map((i) => `<button class="lz-opt" data-opt="${i}" ${off.has(i) ? 'disabled aria-disabled="true"' : ''}>${esc(b.options[i].text)}</button>`)
      .join('')}</div>`;
    fresh = true;
    hold(foot(), HOLD.opts);
    foot().querySelector('button:not([disabled])')?.focus({ preventScroll: true });
    settle();
  }

  function choose(i) {
    const b = story.story[at - 1];
    const o = b.options[i];
    mine(o.text);
    if (o.right) {
      solved++;
      const bar = root.querySelector('.cs-bar');
      bar.querySelectorAll('i')[solved - 1].classList.add('on');
      bar.setAttribute('aria-valuenow', String(solved));
      api.sfx.reward();
      api.buzz(18);
      foot().innerHTML = '';
      return later(step, 450);
    }
    // what would have happened, the mentor covers you, the same choice again without that answer. The mentor asks
    // the question again: after the scene it had left the screen (09/11/2026, revisione UX, stanza 9)
    anyWrong = true;
    off.add(i);
    api.buzz([30, 60, 30]);
    foot().innerHTML = '';
    later(() => {
      scene(o.scene, 'cs-what');
      later(() => {
        line('mentore', `${COVER} ${b.text}`, 'cs-ask');
        choices(b);
      }, 700);
    }, 450);
  }

  // what lies under the Caso is out of reach of the finger, the keyboard and the screen reader
  const BEHIND = ['.top', '#a11y', '#btn-back', '.bottom', '#path', '#me', '#avvio'];
  const reach = (on) => BEHIND.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.inert = !on;
  });

  function ask() {
    const a = root.querySelector('#lz-ask');
    a.innerHTML = `<div class="lz-ask-card" role="alertdialog" aria-modal="true" aria-labelledby="lz-ask-t">
      <h3 id="lz-ask-t" tabindex="-1">Vuoi uscire?</h3>
      <p>Il Caso riparte dall’inizio. L’ufficio resta com’è.</p>
      <div class="lz-sheet-acts"><button class="pill pill-light" data-act="stay">Resto</button><button class="pill pill-light" data-act="leave">Esco</button></div>
    </div>`;
    a.hidden = false;
    a.querySelector('h3').focus({ preventScroll: true });
  }

  function finish(done) {
    run++;
    root.hidden = true;
    root.innerHTML = '';
    document.body.classList.remove('in-lesson');
    reach(true);
    const r = resolve;
    resolve = null;
    // 0: every choice right at the first go; 1: right after a rewind (the line at the end, as for the lessons)
    r?.({ done, outcome: anyWrong ? 1 : 0, fixed: anyWrong });
  }

  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b || b.disabled) return;
    // what just came in the foot does not take the tap meant for what was there before
    if (b.closest('.cs-foot') && held(foot())) return;
    api.sfx.tap();
    const act = b.dataset.act;
    if (act === 'x') return ask();
    if (act === 'stay') return (root.querySelector('#lz-ask').hidden = true);
    if (act === 'leave') return finish(false);
    if (act === 'next') return step();
    if (act === 'end') return finish(true);
    if (b.dataset.opt !== undefined) return choose(Number(b.dataset.opt));
  });

  return {
    /** Plays a Caso over the photo `room` of its floor; resolves with { done, outcome, fixed }. */
    play(c, { room = null, floorName = '' } = {}) {
      story = c;
      at = 0;
      solved = 0;
      anyWrong = false;
      orders = new Map(); // a new play, a new order
      fresh = false;
      root.classList.remove('cs-tight');
      root.hidden = false;
      document.body.classList.add('in-lesson');
      reach(false);
      shell(room, floorName);
      step();
      return new Promise((r) => (resolve = r));
    },
  };
}
