// FEEN · la sede — the Prova sul campo (09/11/2026; CLAUDE.md §6, Claude's proposal of 09/11/2026): the last stage of
// a floor, a month played in four weeks, one choice a week. It is played in the same dialogue as the Caso (caso.js and
// its styles: the room still at the top, the chat, the choices at the bottom, the X and the bar), but nothing rewinds:
// every answer has what it costs and what happens after, and the month goes on. The balance of the month stays in
// sight on the photo of the room; the choices move it and it passes to the next week. It may go under zero: the
// mentor says so once, honestly, and the end of the month says how it closes, never as a punishment. At the end the
// two key moments come back and you find the best alternative, without a mark; then the line on the trap and the
// mentor's last line. The months come from the approved cards (Prova-scheda.md, read by scripts/lezioni.mjs).
import { PEOPLE } from './people.js';
import { motion } from './kit.js';
import { shuffled, hold, held, HOLD } from './caso.js';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
// the engine's own lines, the same on every floor (provisional, Claude's, 09/11/2026: to approve with the cards)
const SAY = {
  back: 'Prima di chiudere il mese, torniamo a due momenti.',
  ask: (t) => `Avevi scelto «${t}». Qual era la migliore?`,
  again: (left) => `Capita anche ai migliori. ${left === 1 ? 'Ne resta una.' : 'Guardiamo le altre.'}`,
  was: (t) => `Avevi scelto «${t}»: era proprio l’alternativa migliore.`,
  found: 'Sì, questa.',
  more: (e) => `Con questa, a fine mese avresti avuto ${e} in più.`,
  below: 'Siamo sotto zero. Succede, e il mese non è finito.',
  // said with the line above, the card's or this one: under zero the money is not free, someone advances it (partita
  // 09/11/2026: until the end of the month it was not said with what money one spends)
  owe: 'Intanto i soldi che mancano te li anticipa qualcuno, e poi vanno restituiti.',
  tally: 'Saldo di fine mese',
};

/** Cents as euros, the Italian way: 35 €, 36,50 €, −4,50 €; with `sign`, +5 € too. */
export function euro(c, sign = false) {
  const a = Math.abs(c);
  const n = a % 100 ? (a / 100).toFixed(2).replace('.', ',') : String(a / 100);
  return `${c < 0 ? '−' : sign && c > 0 ? '+' : ''}${n} €`;
}

export function makeField(api) {
  const root = document.getElementById('campo');
  let resolve = null;
  // a step put off after an answer runs only while its game is still on: leaving with the X ends it (partita 09/11/2026)
  let run = 0;
  const later = (fn, ms) => {
    const r = run;
    return setTimeout(() => r === run && fn(), ms);
  };
  let month = null;
  let at = 0; // the next beat of the month
  let balance = 0; // in cents
  let shown = 0; // what the purse shows, while it counts towards the balance
  let wentBelow = false;
  let picks = new Map(); // the index of a choice in the story → the answer you gave
  let review = null; // the key moments at the end: { list, k, cur }
  let weeks = 0;
  let orders = new Map(); // a choice of the month → the order its answers show in, the same in the key moments
  let fresh = false; // the foot holds choices, or held them last: the button that comes next is held back too

  function shell(room, floorName) {
    weeks = month.story.filter((b) => b.kind === 'settimana').length;
    root.innerHTML = `<div class="lz-top">
        <button class="lz-x" data-act="x" aria-label="Esci dalla Prova sul campo"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg></button>
        <div class="cs-bar" role="progressbar" aria-label="Settimane del mese" aria-valuemin="0" aria-valuemax="${weeks}" aria-valuenow="0">${'<i></i>'.repeat(weeks)}</div>
      </div>
      <div class="cs-room">${room ? `<img src="${room}" alt="" />` : ''}<span class="cs-tag">Prova sul campo · ${esc(floorName)}</span>
        <div class="pv-purse"><small>Saldo del mese</small><b class="pv-amount"></b><i class="pv-delta" aria-hidden="true"></i></div>
      </div>
      <div class="cs-chat" aria-live="polite"></div>
      <div class="cs-foot"></div>
      <div class="lz-ask" id="pv-ask" hidden></div>`;
    paintPurse(balance);
  }
  const chat = () => root.querySelector('.cs-chat');
  const foot = () => root.querySelector('.cs-foot');

  /** The purse on the photo: the amount, read as one sentence by VoiceOver. */
  function paintPurse(c) {
    const purse = root.querySelector('.pv-purse');
    purse.querySelector('.pv-amount').textContent = euro(c);
    purse.classList.toggle('below', c < 0);
    purse.setAttribute('aria-label', `Saldo del mese: ${euro(c)}`);
  }
  /** The balance moves by `c`: the purse counts to the new amount and shows the change for a moment. */
  function move(c) {
    const from = balance;
    balance += c;
    if (!c) return;
    const delta = root.querySelector('.pv-delta');
    delta.textContent = euro(c, true);
    delta.classList.remove('on');
    void delta.offsetWidth;
    delta.classList.add('on');
    clearTimeout(delta.off);
    delta.off = setTimeout(() => delta.classList.remove('on'), 1800);
    if (motion.calm) return paintPurse((shown = balance));
    const t0 = performance.now();
    const to = balance;
    const tick = (now) => {
      if (!month) return;
      const k = Math.min(1, (now - t0) / 650);
      // whole euros while it counts, the exact amount at the end
      shown = Math.round((from + (to - from) * (1 - (1 - k) ** 3)) / 100) * 100;
      paintPurse(k < 1 ? shown : to);
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function face(who) {
    const name = who === 'mentore' ? api.who()?.partner : null;
    return name ? `<span class="cs-face"><img src="${PEOPLE[name]}" alt="" /></span>` : '<span class="cs-face cs-face-none"></span>';
  }
  const nameOf = (who) => (who === 'mentore' ? api.who()?.partner ?? 'Il mentore' : 'Il collega');

  /** One message more in the chat: the older ones step back (style.css, .cs-msg.past), the newest is read aloud. */
  function say(html, cls) {
    const c = chat();
    c.querySelectorAll('.cs-msg').forEach((m) => m.classList.add('past'));
    c.insertAdjacentHTML('beforeend', `<div class="cs-msg ${cls}">${html}</div>`);
    c.scrollTo({ top: c.scrollHeight, behavior: motion.calm ? 'auto' : 'smooth' });
  }
  const line = (who, text, cls = '') => say(`${face(who)}<div class="cs-bubble"><b>${esc(nameOf(who))}</b><p>${esc(text)}</p></div>`, `cs-line ${cls}`);
  const scene = (text, cls = '') => say(`<p>${esc(text)}</p>`, `cs-scene ${cls}`);
  const mine = (text) => say(`<p>${esc(text)}</p>`, 'cs-mine');
  /** What an answer did: what it cost, in front, then what happened. */
  const then = (o, cls = '') => say(`<p><span class="pv-cost">${o.cents ? euro(o.cents, true) : '0 €'}</span> ${esc(o.then)}</p>`, `cs-scene ${cls}`);
  /** A divider in the chat: «Settimana 2», «I momenti chiave». */
  const divider = (text) => say(`<span>${esc(text)}</span>`, 'pv-week');

  /** As in the Caso: the choices take room from the chat, and when they leave too little for the question, the room
   *  above steps back. */
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
    // as in the Caso (caso.js, hold): where the choices were, the button fades in and waits a moment
    const after = fresh;
    fresh = false;
    foot().innerHTML = `<button class="pill pill-dark wide${after ? ' cs-in cs-in-short' : ''}" data-act="${act}">${label}</button>`;
    if (after) hold(foot(), HOLD.button);
    foot().querySelector('button').focus({ preventScroll: true });
    settle();
  }
  /** The answers of a choice, mixed once per moment of choice and in the same order when it comes back among the key
   *  moments; data-opt and `off` keep the indices of the card. In the key moments the ones already out (yours, named
   *  by the mentor, and the ones tried) are not there: the chat tells them, and on a small phone the question keeps
   *  its room. Like the Caso's, they fade in and for a moment take no touch (caso.js, hold). */
  function choices(b, off = new Set()) {
    if (!orders.has(b)) orders.set(b, shuffled(b.options.length));
    foot().innerHTML = `<div class="cs-opts cs-in" role="group" aria-label="${esc(b.text)}">${orders
      .get(b)
      .map((i) => (off.has(i) ? '' : `<button class="lz-opt" data-opt="${i}">${esc(b.options[i].text)}</button>`))
      .join('')}</div>`;
    fresh = true;
    hold(foot(), HOLD.opts);
    foot().querySelector('button:not([disabled])')?.focus({ preventScroll: true });
    settle();
  }

  /** The month goes on beat by beat, at your touch; a choice waits for you. */
  function step() {
    if (review) return reviewStep();
    const b = month.story[at];
    if (!b) return button('Continua', 'end');
    at++;
    if (b.kind === 'settimana') {
      divider(`Settimana ${b.n}`);
      return step();
    }
    if (b.kind === 'scena') scene(b.text);
    if (b.kind === 'mentore' || b.kind === 'collega') line(b.kind, b.text);
    if (b.kind === 'gancio') line('mentore', b.text);
    if (b.kind === 'trappola') {
      // the line for your type, from the approved lezioni/piano-N/trappole.md (main.js, TRAPS): without one, skipped
      const t = api.trapLine?.(month.floor);
      if (!t) return step();
      line('mentore', t);
    }
    if (b.kind === 'finale') {
      // how the month closes, and the balance it closes on: under zero the card's honest ending, never a red alarm
      const text = balance < 0 && b.textNeg ? b.textNeg : b.text;
      say(`<p>${esc(text)}</p><p class="pv-tally">${SAY.tally}: <b>${euro(balance)}</b></p>`, 'cs-scene cs-end');
      review = { list: month.story.map((x, k) => [x, k]).filter(([x]) => x.kind === 'scelta' && x.key), k: -1, cur: null };
      return button('Avanti', 'next');
    }
    if (b.kind === 'scelta') {
      line('mentore', b.text, 'cs-ask');
      return choices(b);
    }
    if (at >= month.story.length) return button('Continua', 'end');
    button('Avanti', 'next');
  }

  /** A choice of the month: it costs what it costs, the story goes on. No answer is turned off, nothing rewinds. */
  function choose(i) {
    const k = at - 1;
    const b = month.story[k];
    const o = b.options[i];
    picks.set(k, i);
    mine(o.text);
    foot().innerHTML = '';
    const bar = root.querySelector('.cs-bar');
    bar.querySelectorAll('i')[b.week - 1]?.classList.add('on');
    bar.setAttribute('aria-valuenow', String(b.week));
    api.buzz(14);
    later(() => {
      move(o.cents);
      then(o);
      if (balance < 0 && !wentBelow) {
        wentBelow = true;
        line('mentore', `${month.below ?? SAY.below} ${SAY.owe}`);
      }
      button('Avanti', 'next');
    }, 450);
  }

  /** The key moments, one after the other: the scene again, what you chose, and the best alternative to find. */
  function reviewStep() {
    if (review.k === -1) {
      review.k = 0;
      divider('I momenti chiave');
      line('mentore', SAY.back);
      return button('Avanti', 'next');
    }
    const item = review.list[review.k++];
    if (!item) {
      review = null;
      return step(); // back to the month: the line on the trap, the mentor's last line
    }
    const [b, k] = item;
    const was = picks.get(k);
    divider(`Settimana ${b.week}`);
    if (b.recap) scene(b.recap);
    if (b.options[was].right) {
      line('mentore', `${SAY.was(b.options[was].text)} ${b.best}`);
      return button('Avanti', 'next');
    }
    review.cur = { b, was, off: new Set([was]) };
    line('mentore', SAY.ask(b.options[was].text), 'cs-ask');
    choices(b, review.cur.off);
  }

  function find(i) {
    const { b, was, off } = review.cur;
    const o = b.options[i];
    mine(o.text);
    foot().innerHTML = '';
    if (o.right) {
      review.cur = null;
      api.sfx.reward();
      api.buzz(18);
      const more = o.cents - b.options[was].cents;
      return later(() => {
        line('mentore', `${SAY.found} ${b.best}${more > 0 ? ` ${SAY.more(euro(more))}` : ''}`);
        button('Avanti', 'next');
      }, 450);
    }
    // another answer that was not the best: what it would have done, then the same question without it
    off.add(i);
    api.buzz([30, 60, 30]);
    later(() => {
      then(o, 'cs-what');
      later(() => {
        line('mentore', SAY.again(b.options.length - off.size), 'cs-ask');
        choices(b, off);
      }, 700);
    }, 450);
  }

  // what lies under the Prova is out of reach of the finger, the keyboard and the screen reader
  const BEHIND = ['.top', '#a11y', '#btn-back', '.bottom', '#path', '#me', '#avvio'];
  const reach = (on) => BEHIND.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.inert = !on;
  });

  function ask() {
    const a = root.querySelector('#pv-ask');
    a.innerHTML = `<div class="lz-ask-card" role="alertdialog" aria-modal="true" aria-labelledby="pv-ask-t">
      <h3 id="pv-ask-t" tabindex="-1">Vuoi uscire?</h3>
      <p>La Prova sul campo riparte dall’inizio. L’ufficio resta com’è.</p>
      <div class="lz-sheet-acts"><button class="pill pill-light" data-act="stay">Resto</button><button class="pill pill-light" data-act="leave">Esco</button></div>
    </div>`;
    a.hidden = false;
    a.querySelector('h3').focus({ preventScroll: true });
  }

  function finish(done) {
    run++;
    // 0: both key moments on the best alternative during the month; 1: the best found at the end (the line in the Ufficio)
    const keysRight = month.story.every((b, k) => !(b.kind === 'scelta' && b.key) || b.options[picks.get(k)]?.right);
    const end = { done, outcome: keysRight ? 0 : 1, fixed: false, balance };
    month = null;
    root.hidden = true;
    root.innerHTML = '';
    document.body.classList.remove('in-lesson');
    reach(true);
    const r = resolve;
    resolve = null;
    r?.(end);
  }

  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b || b.disabled || !month) return;
    // what just came in the foot does not take the tap meant for what was there before
    if (b.closest('.cs-foot') && held(foot())) return;
    api.sfx.tap();
    const act = b.dataset.act;
    if (act === 'x') return ask();
    if (act === 'stay') return (root.querySelector('#pv-ask').hidden = true);
    if (act === 'leave') return finish(false);
    if (act === 'next') return step();
    if (act === 'end') return finish(true);
    if (b.dataset.opt !== undefined) return review?.cur ? find(Number(b.dataset.opt)) : choose(Number(b.dataset.opt));
  });

  return {
    /** Plays a Prova sul campo over the photo `room` of its floor; resolves with { done, outcome, fixed, balance }. */
    play(m, { room = null, floorName = '' } = {}) {
      month = m;
      at = 0;
      balance = shown = m.start;
      wentBelow = false;
      picks = new Map();
      review = null;
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
