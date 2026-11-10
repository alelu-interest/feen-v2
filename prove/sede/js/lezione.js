// FEEN · la sede — the lesson (compiti B2–B6, 07/11/2026; CLAUDE.md §6): full screen, the X and the bar at the top,
// no timer and no lives. Each exercise: «IDEA NUOVA» when a concept arrives, the mentor asks, you answer,
// «Verifica», the feedback rises from the bottom (right or wrong, never «almost»), «Spiegami» after every answer.
// The theory card comes only after the first mistake on a new idea; the hard words are underlined and touched for
// their definition; the bar celebrates five right in a row, a mistake stops the party without taking anything away.
// At the end the mentor brings back the exercises gone wrong, once, as «Ci riprovi»: wrong again, the right answer
// shows and the lesson goes on. The bar never goes back.
// The exercises come from the approved cards (lessons-data.js, made by mobile/scripts/lezioni.mjs).
import { PEOPLE } from './people.js';

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const shuffle = (a) => {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};
// a shuffle that never leaves the list as it was (the right order must not show by chance)
const mix = (a) => {
  if (a.length < 2) return [...a];
  let b;
  do b = shuffle(a);
  while (b.every((x, i) => x === a[i]));
  return b;
};
const TYPE_ASK = { vf: 'Vero o falso?', abbina: 'Tocca una voce a sinistra, poi la sua a destra.', ordina: 'Tocca le voci nell’ordine giusto.', completa: 'Scegli la parola che manca.' };
const COUNT = ['', 'quella', 'le due', 'le tre', 'le quattro', 'le cinque', 'le sei', 'le sette'];
const STREAK = 5;

export function makeLesson(api) {
  const root = document.getElementById('lezione');
  let resolve = null;
  let lesson = null;
  let queue = []; // the exercises still to play, as indexes
  let retry = false; // true while the mistakes come back at the end
  let ex = null; // the exercise on screen: what you picked, how it is laid out
  let checked = false;
  let wrong = []; // exercises wrong at the first go
  let still = []; // wrong again at «Ci riprovi»
  let streak = 0;
  let theorySeen = new Set(); // the new ideas whose theory card has come already (once per idea)
  let doneCount = 0; // for the bar, which never goes back

  // ---------- the frame: X, the bar, the exercise, the button ----------
  function bar() {
    const total = lesson.exercises.length;
    const hot = streak >= STREAK;
    return `<div class="lz-bar${hot ? ' hot' : ''}" role="progressbar" aria-label="Avanzamento" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${doneCount}"><i style="transform:scaleX(${doneCount / total})"></i></div>
      ${hot ? `<span class="lz-streak" aria-live="polite">${streak} di fila</span>` : ''}`;
  }
  function frame(body, { foot = true } = {}) {
    defWord = null;
    sheetRoom?.disconnect();
    sheetRoom = null;
    root.innerHTML = `<div class="lz-top">
        <button class="lz-x" data-act="x" aria-label="Esci dalla lezione"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg></button>
        <div class="lz-barbox">${bar()}</div>
      </div>
      <div class="lz-body">${body}</div>
      ${foot ? '<div class="lz-foot"><button class="pill pill-dark wide" data-act="check" disabled>Verifica</button></div>' : ''}
      <div class="lz-sheet" id="lz-sheet" hidden></div>
      <div class="lz-defs" id="lz-defs" aria-live="polite"></div>
      <div class="lz-ask" id="lz-ask" hidden></div>`;
    root.querySelector('.lz-q, .lz-say')?.focus({ preventScroll: true });
  }

  // ---------- a hard word: its definition in a small bubble right under the word (over it when there is no room) ----------
  let defWord = null;
  function define(b, w, def) {
    const box = root.querySelector('#lz-defs');
    const same = defWord === b;
    undefine();
    if (same) return; // a second touch on the same word closes it
    defWord = b;
    b.setAttribute('aria-expanded', 'true');
    box.innerHTML = `<p class="lz-def"><b>${esc(w[0].toUpperCase() + w.slice(1))}:</b> ${esc(def)}.</p>`;
    const tip = box.firstElementChild;
    // the text of the word, not its touch area (which is taller than the line)
    const range = document.createRange();
    range.selectNodeContents(b);
    const r = range.getBoundingClientRect();
    const W = root.clientWidth;
    const H = root.clientHeight;
    const width = Math.min(W - 32, 320);
    tip.style.width = `${width}px`;
    const left = Math.min(Math.max(16, r.left + r.width / 2 - width / 2), W - 16 - width);
    tip.style.left = `${left}px`;
    tip.style.setProperty('--x', `${Math.min(Math.max(18, r.left + r.width / 2 - left), width - 18)}px`);
    // under the whole text the word is in, not under the word: right under the word it covered the next lines of the
    // question, often the numbers it is about (10/11/2026, Kevin and the album, A-002). Over the text when there is
    // no room below. The arrow still points at the word.
    const para = (b.closest('p, li, .lz-q, .lz-say, .lz-opt, .lz-sentence') ?? b).getBoundingClientRect();
    const h = tip.offsetHeight;
    const below = para.bottom + 10 + h <= H - 12;
    tip.classList.toggle('up', !below);
    tip.style.top = `${below ? para.bottom + 10 : Math.max(8, para.top - 10 - h)}px`;
  }
  function undefine() {
    defWord?.setAttribute('aria-expanded', 'false');
    defWord = null;
    const box = root.querySelector('#lz-defs');
    if (box) box.innerHTML = '';
  }
  const redrawBar = () => (root.querySelector('.lz-barbox').innerHTML = bar());

  function face() {
    const who = api.who();
    return who ? `<span class="lz-face"><img src="${PEOPLE[who.partner]}" alt="" /></span>` : '<span class="lz-face lz-face-none"></span>';
  }
  const mentorName = () => api.who()?.partner ?? 'Il mentore';

  /** The hard words of the exercise, underlined in a text: touching one says its definition. */
  function words(text, e) {
    let html = esc(text);
    for (const [w] of e.words ?? []) {
      // an elided article before the word («un'entrata», «dell'IBAN») stays on its line with it (partita 09/11/2026)
      const re = new RegExp(`(^|[^\\p{L}'’])(\\p{L}*['’])?(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\p{L}])`, 'iu');
      html = html.replace(re, (_, pre, elided, found) => {
        const button = `<button class="lz-word" data-word="${esc(w)}" aria-expanded="false">${found}</button>`;
        return `${pre}${elided ? `<span class="lz-nowrap">${elided}${button}</span>` : button}`;
      });
    }
    return html;
  }

  function mentorLine(e) {
    // «Vero o falso?» in the bubble only when the help line under it does not say it already
    const vf = e.type === 'vf' && !(e.help && !retry);
    return `<div class="lz-mentor">${face()}<div class="lz-bubble"><b>${esc(mentorName())}</b>
      ${retry ? '<span class="lz-again">Ci riprovi</span>' : ''}
      ${vf ? `<span class="lz-vf">${TYPE_ASK.vf}</span>` : ''}
      <h2 class="lz-q" tabindex="-1">${words(e.mentor, e)}</h2></div></div>`;
  }

  // ---------- one exercise ----------
  function show() {
    const e = lesson.exercises[queue[0]];
    checked = false;
    ex = { pick: null };
    let answers = '';
    if (['scelta', 'vf', 'completa', 'scenario'].includes(e.type)) {
      // Vero and Falso keep their place; every other list is shuffled (in «Ci riprovi» too)
      ex.options = e.type === 'vf' ? e.options : shuffle(e.options);
      const opts = ex.options.map((o, i) => `<button class="lz-opt" data-opt="${i}" aria-pressed="false">${esc(o.text)}</button>`).join('');
      if (e.type === 'completa') answers = `<p class="lz-sentence" aria-live="polite">${sentence(e, null)}</p><div class="lz-chips">${opts}</div>`;
      else if (e.type === 'scenario') answers = `<p class="lz-situation">${words(e.situation, e)}</p><div class="lz-opts">${opts}</div>`;
      else answers = `<div class="lz-opts${e.type === 'vf' ? ' lz-two' : ''}">${opts}</div>`;
    }
    if (e.type === 'abbina') {
      ex.left = e.pairs.map((p) => p.left);
      ex.right = mix(e.pairs.map((p) => p.right));
      ex.match = {}; // left → right
      ex.sel = null;
      answers = `<div class="lz-match">
        <div>${ex.left.map((t, i) => `<button class="lz-cell" data-left="${i}">${esc(t)}</button>`).join('')}</div>
        <div>${ex.right.map((t, i) => `<button class="lz-cell" data-right="${i}">${esc(t)}</button>`).join('')}</div>
      </div>`;
    }
    if (e.type === 'ordina') {
      ex.items = mix(e.order);
      ex.seq = [];
      answers = `<ol class="lz-seq" aria-label="Il tuo ordine"></ol><div class="lz-pool"></div>`;
    }
    if (e.type === 'slider') {
      const s = e.slider;
      // the thumb starts at the bottom end, never on the answer (the middle often is the answer); at the top end
      // when the bottom one is right
      ex.value = e.range[0] <= s.min ? s.max : s.min;
      answers = `<div class="lz-slider">
        <output class="lz-value" id="lz-value">${fmt(ex.value, s.unit)}</output>
        <input type="range" id="lz-range" min="${s.min}" max="${s.max}" step="${s.step}" value="${ex.value}" aria-label="La tua stima" aria-valuetext="${esc(fmt(ex.value, s.unit))}" />
        <div class="lz-ends"><span>${fmt(s.min, s.unit)}</span><span>${fmt(s.max, s.unit)}</span></div>
      </div>`;
    }
    // the help line of a new type: the first time only, not in «Ci riprovi»
    const help = e.help && !retry ? `<p class="lz-help"><svg viewBox="0 0 24 24"><path d="M12 3.5a6 6 0 0 1 3.5 10.9V17h-7v-2.6A6 6 0 0 1 12 3.5zM9.5 20.5h5"/></svg>${esc(e.help)}</p>` : '';
    const hint = TYPE_ASK[e.type] && e.type !== 'vf' && !help ? `<p class="lz-hint">${TYPE_ASK[e.type]}</p>` : '';
    frame(`${e.idea != null && !retry ? '<span class="lz-idea">Idea nuova</span>' : ''}
      ${mentorLine(e)}
      ${e.source ? `<p class="lz-source">Fonte: ${esc(e.source)}</p>` : ''}
      ${help}${hint}
      <div class="lz-answers">${answers}</div>`);
    if (e.type === 'ordina') drawOrder();
    if (e.type === 'slider') {
      const r = root.querySelector('#lz-range');
      const moved = () => {
        if (checked) return;
        ex.value = Number(r.value);
        ex.pick = true;
        root.querySelector('#lz-value').textContent = fmt(ex.value, e.slider.unit);
        r.setAttribute('aria-valuetext', fmt(ex.value, e.slider.unit));
        ready();
      };
      r.addEventListener('input', moved);
      // a touch on the thumb that leaves it where it was is an answer too
      r.addEventListener('pointerup', moved);
      // and so is Home or End on the end the thumb already sits on (keyboard and screen readers, no input event)
      r.addEventListener('keyup', (ev) => /^(Home|End|Arrow|Page)/.test(ev.key) && moved());
    }
  }

  const fmt = (v, unit) => `${String(v).replace('.', ',')}${unit ? ` ${unit}` : ''}`;
  function sentence(e, word, state = '') {
    const [a, b] = e.sentence.split('___');
    return `${words(a, e)}<span class="lz-gap ${state}">${word ? esc(word) : '&nbsp;'}</span>${words(b ?? '', e)}`;
  }

  function drawOrder() {
    const seq = root.querySelector('.lz-seq');
    const pool = root.querySelector('.lz-pool');
    seq.innerHTML = ex.seq.length
      ? ex.seq.map((t, i) => `<li><button class="lz-cell on" data-unseq="${i}"><b>${i + 1}</b>${esc(t)}</button></li>`).join('')
      : '<li class="lz-empty">Il primo passo che tocchi va qui</li>';
    pool.innerHTML = ex.items.map((t, i) => (ex.seq.includes(t) ? '' : `<button class="lz-cell" data-seq="${i}">${esc(t)}</button>`)).join('');
    ex.pick = ex.seq.length === ex.items.length || null;
  }

  /** After a touch that redraws the steps, the focus stays in the list: on the step now at place i, or on «Verifica»
   *  when none is left (the screen reader does not fall back to the top of the page). */
  function keepFocus(i) {
    const left = root.querySelectorAll('.lz-pool .lz-cell');
    (left[Math.min(Math.max(i, 0), left.length - 1)] ?? root.querySelector('[data-act="check"]'))?.focus({ preventScroll: true });
  }

  function ready() {
    // the first answer of a list is number 0: «nothing picked» is null, not 0
    root.querySelector('[data-act="check"]').disabled = ex.pick == null;
  }

  // ---------- Verifica ----------
  function verdict(e) {
    if (['scelta', 'vf', 'completa', 'scenario'].includes(e.type)) {
      const o = ex.options[ex.pick];
      const right = e.options.find((x) => x.right);
      return { ok: o.right, why: o.right ? e.ifRight : o.why, answer: right.text };
    }
    if (e.type === 'abbina') {
      const bad = e.pairs.filter((p, i) => ex.right[ex.match[i]] !== p.right);
      return { ok: !bad.length, why: bad.map((p) => p.why).join(' '), answer: e.pairs.map((p) => `${p.left} → ${p.right}`).join(' · ') };
    }
    if (e.type === 'ordina') {
      const ok = ex.seq.every((t, i) => t === e.order[i]);
      return { ok, why: ok ? '' : e.why, answer: e.order.join(' → ') };
    }
    if (e.type === 'slider') {
      const [lo, hi] = e.range;
      const ok = ex.value >= lo && ex.value <= hi;
      const answer = lo === hi ? fmt(lo, e.slider.unit) : `fra ${fmt(lo, e.slider.unit)} e ${fmt(hi, e.slider.unit)}`;
      return { ok, why: ok ? '' : ex.value < lo ? e.low : e.high, answer };
    }
  }

  function check() {
    const i = queue[0];
    const e = lesson.exercises[i];
    checked = true;
    const v = verdict(e);
    if (!retry) {
      if (!v.ok) wrong.push(i);
      doneCount++;
      const before = streak;
      streak = v.ok ? streak + 1 : 0;
      redrawBar();
      if (streak === STREAK && before < STREAK) api.sfx.fanfare?.();
    } else if (!v.ok) still.push(i);
    paint(e, v.ok);
    if (v.ok && streak !== STREAK) api.sfx.reward();
    if (!v.ok) api.sfx.tap();
    api.buzz(v.ok ? 18 : [30, 60, 30]);
    // the theory card: only after the first mistake on a new idea, once for each idea (CLAUDE.md §6)
    const idea = e.idea || `#${e.n}`;
    const theory = !v.ok && e.idea != null && !theorySeen.has(idea);
    if (theory) theorySeen.add(idea);
    // the answers stay on screen, but can no longer be changed
    root.querySelector('.lz-answers').inert = true;
    root.querySelector('.lz-foot').hidden = true;
    const sheet = root.querySelector('#lz-sheet');
    sheet.className = `lz-sheet ${v.ok ? 'ok' : 'no'}`;
    sheet.innerHTML = `<div class="lz-verdict">
        <span class="lz-mark" aria-hidden="true">${v.ok ? '<svg viewBox="0 0 24 24"><path d="M5.5 12.5l4.2 4.2 8.8-9.4"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>'}</span>
        <h3 tabindex="-1">${v.ok ? 'Giusto' : 'Non è così'}</h3>
      </div>
      ${v.ok ? '' : `<p class="lz-right">La risposta giusta: <b>${esc(v.answer)}</b></p>`}
      ${v.why ? `<p class="lz-why">${words(v.why, e)}</p>` : ''}
      ${theory ? `<div class="lz-theory"><span>Idea nuova${e.idea ? ` · ${esc(e.idea)}` : ''}</span><p>${words(e.theory ?? e.explain, e)}</p></div>` : ''}
      <p class="lz-explain" id="lz-explain" hidden>${words(e.explain, e)}</p>
      <div class="lz-sheet-acts">
        <button class="pill pill-light" data-act="explain" aria-expanded="false" aria-controls="lz-explain">Spiegami</button>
        <button class="pill pill-dark" data-act="next">Continua</button>
      </div>`;
    sheet.hidden = false;
    sheet.querySelector('h3').focus({ preventScroll: true });
    // the sheet rises over the answers: room for them above it, and the right one in sight (10/11/2026, the album:
    // «Non è così» covered the right answer, and with «Spiegami» open every answer but the wrong one)
    sheetRoom?.disconnect();
    sheetRoom = new ResizeObserver(makeRoom);
    sheetRoom.observe(sheet);
  }

  let sheetRoom = null;
  function makeRoom() {
    const body = root.querySelector('.lz-body');
    const sheet = root.querySelector('#lz-sheet');
    if (!body || !sheet || sheet.hidden) return;
    // where the sheet will stand, not where its rising animation has it now (offsetTop ignores the transform)
    const top = root.getBoundingClientRect().top + sheet.offsetTop;
    const covered = body.getBoundingClientRect().bottom - top;
    body.style.paddingBottom = `${Math.max(20, covered + 20)}px`;
    // what to see: the answers marked right and wrong (or the sentence, the slider)
    const marked = [...root.querySelectorAll('.lz-body .right, .lz-body .wrong')];
    if (!marked.length) return;
    const first = marked[0].getBoundingClientRect();
    const last = marked[marked.length - 1].getBoundingClientRect();
    const roomTop = body.getBoundingClientRect().top + 8;
    const roomBottom = top - 12;
    let dy = last.bottom - roomBottom; // down far enough to see the last one
    dy = Math.min(dy, first.top - roomTop); // never so far that the first one goes under the bar
    if (dy > 0) body.scrollBy({ top: dy, behavior: document.documentElement.hasAttribute('data-calm') ? 'auto' : 'smooth' });
  }

  /** What was right and what was not, on the answers themselves. */
  function paint(e, ok) {
    if (['scelta', 'vf', 'scenario'].includes(e.type)) {
      root.querySelectorAll('.lz-opt').forEach((b, i) => {
        if (ex.options[i].right) b.classList.add('right');
        else if (i === ex.pick) b.classList.add('wrong');
      });
    }
    if (e.type === 'completa') {
      root.querySelector('.lz-sentence').innerHTML = sentence(e, ex.options[ex.pick].text, ok ? 'right' : 'wrong');
      root.querySelectorAll('.lz-opt').forEach((b, i) => ex.options[i].right && b.classList.add('right'));
    }
    if (e.type === 'abbina') {
      Object.entries(ex.match).forEach(([l, r]) => {
        const good = ex.right[r] === e.pairs[l].right;
        root.querySelector(`[data-left="${l}"]`).classList.add(good ? 'right' : 'wrong');
        root.querySelector(`[data-right="${r}"]`).classList.add(good ? 'right' : 'wrong');
      });
    }
    if (e.type === 'ordina') root.querySelectorAll('.lz-seq .lz-cell').forEach((b, i) => b.classList.add(ex.seq[i] === e.order[i] ? 'right' : 'wrong'));
    if (e.type === 'slider') root.querySelector('.lz-slider').classList.add(ok ? 'right' : 'wrong');
  }

  function next() {
    queue.shift();
    if (queue.length) return show();
    // the end of the first round: the mistakes come back once, introduced by the mentor
    if (!retry && wrong.length) return intermezzo();
    finish(true);
  }

  function intermezzo() {
    retry = true;
    queue = [...wrong];
    const n = wrong.length;
    const line = n === 1 ? 'Riprendiamo quella che non tornava.' : `Riprendiamo ${COUNT[n] ?? `le ${n}`} che non tornavano.`;
    frame(
      `<div class="lz-pause">
        <div class="lz-mentor">${face()}<div class="lz-bubble"><b>${esc(mentorName())}</b><p class="lz-say" tabindex="-1">${line}</p></div></div>
      </div>`,
      { foot: false },
    );
    root.querySelector('.lz-body').insertAdjacentHTML('afterend', '<div class="lz-foot"><button class="pill pill-dark wide" data-act="again">Ci riprovo</button></div>');
  }

  // ---------- leaving: «La lezione riparte dall'inizio. L'ufficio resta com'è» ----------
  function ask() {
    const a = root.querySelector('#lz-ask');
    a.innerHTML = `<div class="lz-ask-card" role="alertdialog" aria-modal="true" aria-labelledby="lz-ask-t">
      <h3 id="lz-ask-t" tabindex="-1">Vuoi uscire?</h3>
      <p>La lezione riparte dall’inizio. L’ufficio resta com’è.</p>
      <div class="lz-sheet-acts"><button class="pill pill-light" data-act="stay">Resto</button><button class="pill pill-light" data-act="leave">Esco</button></div>
    </div>`;
    a.hidden = false;
    a.querySelector('h3').focus({ preventScroll: true });
  }

  // what lies under the lesson is out of reach of the finger, the keyboard and the screen reader
  const BEHIND = ['.top', '#a11y', '#btn-back', '.bottom', '#path', '#me', '#avvio'];
  const reach = (on) => BEHIND.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.inert = !on;
  });

  function finish(done) {
    root.hidden = true;
    root.innerHTML = '';
    document.body.classList.remove('in-lesson');
    reach(true);
    const r = resolve;
    resolve = null;
    // how it went, for the line at the end: 0 all right at the first go, 1 all right with «Ci riprovi», 2 some to see again
    const outcome = !wrong.length ? 0 : !still.length ? 1 : 2;
    r?.({ done, outcome, wrong: wrong.map((i) => lesson.exercises[i].n), fixed: wrong.length - still.length });
  }

  // ---------- touches ----------
  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    // any other touch closes the definition of a word, and goes on doing what it does
    if (defWord && !b?.dataset.word) undefine();
    if (!b || b.disabled) return;
    const e = lesson.exercises[queue[0]];
    const act = b.dataset.act;
    if (b.dataset.word) {
      const [w, def] = e.words.find(([x]) => x === b.dataset.word);
      return define(b, w, def);
    }
    api.sfx.tap();
    if (act === 'x') return ask();
    if (act === 'stay') return (root.querySelector('#lz-ask').hidden = true);
    if (act === 'leave') return finish(false);
    if (act === 'check') return check();
    if (act === 'next') return next();
    if (act === 'again') return show();
    if (act === 'explain') {
      const p = root.querySelector('#lz-explain');
      p.hidden = !p.hidden;
      b.setAttribute('aria-expanded', String(!p.hidden));
      return;
    }
    if (checked || !e) return;
    if (b.dataset.opt !== undefined) {
      ex.pick = Number(b.dataset.opt);
      root.querySelectorAll('.lz-opt').forEach((o) => o.setAttribute('aria-pressed', String(o === b)));
      if (e.type === 'completa') root.querySelector('.lz-sentence').innerHTML = sentence(e, ex.options[ex.pick].text, 'filled');
      return ready();
    }
    if (b.dataset.left !== undefined || b.dataset.right !== undefined) return matchTap(b);
    if (b.dataset.seq !== undefined) {
      const at = [...root.querySelectorAll('.lz-pool .lz-cell')].indexOf(b);
      ex.seq.push(ex.items[Number(b.dataset.seq)]);
      drawOrder();
      ready();
      return keepFocus(at);
    }
    if (b.dataset.unseq !== undefined) {
      // taking a step back out takes the ones after it too
      ex.seq = ex.seq.slice(0, Number(b.dataset.unseq));
      drawOrder();
      ready();
      return keepFocus(0);
    }
  });

  // the definition stays by its word: when the word moves (scrolling, a turned phone) or on Esc, it goes away
  root.addEventListener('scroll', () => defWord && undefine(), true);
  window.addEventListener('resize', () => defWord && undefine());
  root.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Escape' || !defWord) return;
    undefine();
    ev.preventDefault(); // Esc closed the definition: it does not also ask «Vuoi uscire?» (main.js back)
  });

  /** Pairs: a left item, then a right one (or the other way round); touching a paired item undoes its pair. */
  function matchTap(b) {
    const side = b.dataset.left !== undefined ? 'left' : 'right';
    const i = Number(b.dataset[side]);
    const pairOf = side === 'left' ? ex.match[i] : Object.keys(ex.match).find((l) => ex.match[l] === i);
    if (pairOf !== undefined && !ex.sel) {
      if (side === 'left') delete ex.match[i];
      else delete ex.match[pairOf];
    } else if (!ex.sel || ex.sel.side === side) {
      ex.sel = ex.sel?.side === side && ex.sel.i === i ? null : { side, i };
    } else {
      const l = side === 'left' ? i : ex.sel.i;
      const r = side === 'right' ? i : ex.sel.i;
      for (const key of Object.keys(ex.match)) if (ex.match[key] === r) delete ex.match[key];
      ex.match[l] = r;
      ex.sel = null;
    }
    // the pairs share a number, so they read without colour too
    const order = Object.keys(ex.match).map(Number).sort((a, c) => a - c);
    root.querySelectorAll('[data-left],[data-right]').forEach((c) => {
      c.classList.remove('sel');
      c.removeAttribute('data-pair');
    });
    order.forEach((l, n) => {
      root.querySelector(`[data-left="${l}"]`).dataset.pair = n + 1;
      root.querySelector(`[data-right="${ex.match[l]}"]`).dataset.pair = n + 1;
    });
    if (ex.sel) root.querySelector(`[data-${ex.sel.side}="${ex.sel.i}"]`).classList.add('sel');
    ex.pick = Object.keys(ex.match).length === ex.left.length || null;
    ready();
  }

  return {
    /** Plays a lesson; resolves with { done, outcome, wrong, fixed } when it ends or you leave. */
    play(l) {
      lesson = l;
      queue = l.exercises.map((_, i) => i);
      retry = false;
      wrong = [];
      still = [];
      streak = 0;
      theorySeen = new Set();
      doneCount = 0;
      root.hidden = false;
      document.body.classList.add('in-lesson');
      reach(false);
      show();
      return new Promise((r) => (resolve = r));
    },
  };
}
