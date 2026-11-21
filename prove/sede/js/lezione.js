// FEEN · la sede — the lesson (compiti B2–B6, 07/11/2026; CLAUDE.md §6): full screen, the X and the bar at the top,
// no timer and no lives. Each exercise: «IDEA NUOVA» when a concept arrives, the mentor asks, you answer,
// «Verifica», the feedback rises from the bottom (right or wrong, never «almost»), «Spiegami» after every answer.
// The theory card comes only after the first mistake on a new idea, inside «Spiegami» (11/11/2026: less text after a
// mistake); the hard words are underlined, once on a screen, and touched for their definition; the bar celebrates five
// right in a row, a mistake stops the party without taking anything away.
// At the end the mentor brings back the exercises gone wrong, once, as «Ci riprovi»: wrong again, the right answer
// shows and the lesson goes on. The bar never goes back.
// The exercises come from the approved cards (lessons-data.js, made by mobile/scripts/lezioni.mjs).
// An exercise stands in one screen, without scrolling (17/11/2026, the user: «non voglio scorrere le domande, deve
// essere fisso come Duolingo»): fit() makes it as tight as the phone needs.
// Before the questions, one screen says what they are about (19/11/2026, from a tester: «farei prima lezioni e poi
// quiz»; the user: «fai te»): the partner says the idea of the lesson, and under it the first lines of the lesson's
// own explanation. Not in a review, where nothing is new.
// «Metti in colonna» (19/11/2026, from a tester: «facciamolo a due colonne dove trascinare gli item piuttosto che la
// scelta della lista»): the items wait in a tray and go into their column. One is always lit: a touch on a column
// sends it there and lights the next, so an item costs one touch; or it is dragged there.
// The partner's face is small, on a line with the name above what is said, and what is said takes the whole width of
// the page, without a bubble (21/11/2026, from a tester: «sposta la sua faccia in alto o più piccolina e metti la
// domanda sotto full width», «per dare più importanza al contenuto»). The sums are set as sums (conti.js).
import { PEOPLE } from './people.js';
import { askLeave, stay } from './esci.js';
import { sums, formula, figures } from './conti.js';

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
const TYPE_ASK = { vf: 'Vero o falso?', abbina: 'Tocca una voce a sinistra, poi la sua a destra.', ordina: 'Tocca le voci nell’ordine giusto.', completa: 'Scegli la parola che manca.', gruppi: 'Una voce è scelta: tocca la colonna dove va. Per sceglierne un’altra, toccala.' };
const COUNT = ['', 'quella', 'le due', 'le tre', 'le quattro', 'le cinque', 'le sei', 'le sette'];
const STREAK = 5;
// how tight an exercise can get to stand in one screen (style.css, #lezione[data-fit]): as it is, then 1 the air,
// 2 the sizes a step down, 3 another step; then the text smaller, K_STEP
// at a time down to K_MIN (an answer stays over 13 px); after that the page scrolls, as it used to
const FIT = ['', '1', '2', '3'];
const K_MIN = 0.88;
const K_STEP = 0.03;
// the idea of a lesson longer than this is a sentence more than a title: set a size down, so it is not a wall of bold
const LONG_TITLE = 84;

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
      ${hot ? `<span class="lz-streak">${streak} di fila</span>` : ''}`;
  }
  function frame(body, { foot = true } = {}) {
    defWord = null;
    sheetRoom?.disconnect();
    sheetRoom = null;
    delete root.dataset.fit;
    root.style.removeProperty('--lz-k');
    root.innerHTML = `<div class="lz-top">
        <button class="lz-x" data-act="x" aria-label="Esci dalla lezione"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button>
        <div class="lz-barbox">${bar()}</div>
      </div>
      <div class="lz-body">${body}</div>
      ${foot ? '<div class="lz-foot"><button class="pill pill-dark wide" data-act="check" disabled>Verifica</button></div>' : ''}
      <div class="lz-sheet" id="lz-sheet" hidden></div>
      <div class="lz-defs" id="lz-defs" aria-live="polite"></div>
      <p class="sr-only" id="lz-said" aria-live="polite"></p>
      <div class="lz-ask" id="lz-ask" hidden></div>`;
    root.querySelector('.lz-q, .lz-say')?.focus({ preventScroll: true });
  }

  // ---------- one screen, no scrolling ----------
  /** The exercise stands between the bar and «Verifica», and the page cannot be dragged (17/11/2026, the user: «tutto
   *  nella stessa pagina, non devo muovermi, devo solamente cliccare la risposta giusta»). The page as it is; if it is
   *  too tall, the next of FIT, then the text a step smaller at a time; if not even K_MIN is enough (a small phone
   *  with very large text) it scrolls as it used to. `keep`: during an exercise (a step put in order, a word in the
   *  sentence) the page only gets tighter, never looser under the finger. Measured, not guessed: it holds for any
   *  phone, any text size and any lesson that comes from the team. */
  function fit(keep = false) {
    const body = root.querySelector('.lz-body');
    if (!body || root.hidden || checked) return;
    if (keep && root.dataset.fit === 'scroll') return;
    const tall = () => body.scrollHeight > body.clientHeight + 1;
    let at = keep ? Math.max(0, FIT.indexOf(root.dataset.fit ?? '')) : 0;
    if (!keep) root.style.removeProperty('--lz-k');
    for (; at < FIT.length; at++) {
      if (FIT[at]) root.dataset.fit = FIT[at];
      else delete root.dataset.fit;
      if (!tall()) return;
    }
    let k = (keep && Number(root.style.getPropertyValue('--lz-k'))) || 1;
    while (k - K_STEP > K_MIN - 0.001) {
      k -= K_STEP;
      root.style.setProperty('--lz-k', k.toFixed(2));
      if (!tall()) return;
    }
    root.dataset.fit = 'scroll';
  }
  /** After «Verifica» the sheet rises over the bottom of the page: if it covers an answer marked right or wrong, the
   *  page gets tighter, a level at a time, until they are in sight above it (the text is not made smaller for this).
   *  What is still covered then, makeRoom brings into sight by moving the page itself: nobody has to scroll. */
  function settle() {
    const sheet = root.querySelector('#lz-sheet');
    const marked = [...root.querySelectorAll('.lz-body .right, .lz-body .wrong')];
    if (!sheet || sheet.hidden || !marked.length || root.dataset.fit === 'scroll') return;
    const covered = () => marked[marked.length - 1].getBoundingClientRect().bottom > root.getBoundingClientRect().top + sheet.offsetTop - 12;
    for (let at = FIT.indexOf(root.dataset.fit ?? '') + 1; at < FIT.length && covered(); at++) root.dataset.fit = FIT[at];
  }
  // the phone turns, the window or the text size changes, the typeface arrives after the first exercise
  window.addEventListener('resize', () => fit());
  document.fonts?.ready?.then(() => fit());

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
    const fitsBelow = para.bottom + 10 + h <= H - 12;
    // Never over what has to be touched, when the other side is free (11/11/2026): under the sentence of «completa la
    // frase» the bubble lay on the three words to choose from, the very thing the definition is read for. Over the
    // text then, if it fits under the bar and covers no answer there.
    const bar = root.querySelector('.lz-top')?.getBoundingClientRect().bottom ?? 8;
    const fitsAbove = para.top - 10 - h >= bar;
    const answers = [...root.querySelectorAll('.lz-answers button:not(.lz-word)')].map((x) => x.getBoundingClientRect());
    const covers = (top) => answers.some((a) => a.bottom > top && a.top < top + h && a.right > left && a.left < left + width);
    const below = fitsBelow && !(fitsAbove && covers(para.bottom + 10) && !covers(para.top - 10 - h));
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

  /** Said aloud by the screen reader, never seen: what a touch did when only the look of the screen tells it (a pair
   *  made, a step put in its place). Emptied first, so the same words are read again. Inside the lesson, because a
   *  screen reader does not listen outside a modal dialog (10/11/2026, the check with the screen reader's tree). */
  function said(text) {
    const s = root.querySelector('#lz-said');
    if (!s) return;
    s.textContent = '';
    requestAnimationFrame(() => (s.textContent = text));
  }

  function face() {
    const who = api.who();
    return who ? `<span class="lz-face"><img src="${PEOPLE[who.partner]}" alt="" /></span>` : '<span class="lz-face lz-face-none"></span>';
  }
  const mentorName = () => api.who()?.partner ?? 'Il mentore';
  /** Who speaks: the face and the name on one line; `tags` at its end («Idea nuova», «Ci riprovi»). */
  const who = (tags = '') => `<p class="lz-who">${face()}<b>${esc(mentorName())}</b>${tags}</p>`;
  const IDEA = '<span class="lz-idea">Idea nuova</span>';
  /** A text of the lesson that is not searched for hard words: safe for the page, with its sums set. */
  const txt = (t) => sums(esc(t));

  /** The hard words of the exercise, underlined in a text: touching one says its definition. `seen`: the words already
   *  underlined on this screen, which are not underlined again (11/11/2026: «entrata» was underlined three times on
   *  one screen, in the question, in the explanation and in the theory). */
  function words(text, e, seen) {
    let html = esc(text);
    for (const [w] of e.words ?? []) {
      if (seen?.has(w)) continue;
      // an elided article before the word («un'entrata», «dell'IBAN») stays on its line with it (partita 09/11/2026)
      const re = new RegExp(`(^|[^\\p{L}'’])(\\p{L}*['’])?(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})(?![\\p{L}])`, 'iu');
      html = html.replace(re, (_, pre, elided, found) => {
        seen?.add(w);
        const button = `<button class="lz-word" data-word="${esc(w)}" aria-expanded="false">${found}</button>`;
        return `${pre}${elided ? `<span class="lz-nowrap">${elided}${button}</span>` : button}`;
      });
    }
    return sums(html);
  }

  /** What the mentor says, in two voices (11/11/2026): what comes before the question (the rule, the numbers, the
   *  situation of a mini-scenario) plain, the question strong, so the eye finds what is asked. Before, rule, numbers
   *  and question were one block of bold, and the situation of a scenario came after its question. The question is
   *  the last sentence, when it ends with «?»; a line without a question stays whole, strong, as it was. */
  function voices(text) {
    const t = text.trim();
    if (!t.endsWith('?')) return ['', t];
    let at = -1;
    for (const m of t.matchAll(/[.!?…]\s+(?=[\p{Lu}«“])/gu)) at = m.index + m[0].length;
    return at < 0 ? ['', t] : [t.slice(0, at).trim(), t.slice(at)];
  }
  function mentorLine(e, idea = false) {
    // «Vero o falso?» over the statement only when the help line under it does not say it already
    const vf = e.type === 'vf' && !(e.help && !retry);
    const seen = new Set();
    const tags = `${idea ? IDEA : ''}${retry ? '<span class="lz-again">Ci riprovi</span>' : ''}`;
    // the figures of the question as a table (sorgente.mjs, figures): the sentences that are not lists stay sentences,
    // the lists that follow one another share a card. The screen reader hears the question as the team wrote it.
    if (e.table) {
      const blocks = [];
      for (const p of e.table.parts) {
        if (p.rows && Array.isArray(blocks.at(-1))) blocks.at(-1).push(p);
        else blocks.push(p.rows ? [p] : p);
      }
      const shown = blocks.map((b) => (Array.isArray(b) ? figures(b) : `<p class="lz-lead">${words(b.text, e, seen)}</p>`)).join('');
      return `<div class="lz-mentor">${who(tags)}
        <div class="lz-shown" aria-hidden="true">${shown}</div>
        <h2 class="lz-q" tabindex="-1"><span class="sr-only">${esc(e.mentor.slice(0, e.mentor.length - e.table.ask.length))}</span>${words(e.table.ask, e, seen)}</h2></div>`;
    }
    const [lead, ask] = voices(e.mentor);
    // all inside the title, so that a screen reader starting from it hears the situation before the question
    const before = [e.type === 'scenario' ? e.situation : '', lead].filter(Boolean).map((t) => `<span class="lz-lead">${words(t, e, seen)}</span>`).join('');
    return `<div class="lz-mentor">${who(tags)}
      ${vf ? `<span class="lz-vf">${TYPE_ASK.vf}</span>` : ''}
      <h2 class="lz-q" tabindex="-1">${before}${words(ask, e, seen)}</h2></div>`;
  }

  // ---------- before the questions: the idea of the lesson ----------
  /** One screen, to read and go on from with «Inizia»: it is not an exercise, so the bar does not move and nothing is
   *  right or wrong. It stands in one screen like the exercises (fit). */
  function intro() {
    const t = lesson.intro;
    // the idea in two voices, as a question is: its first clause is the title, what follows is said plainly; a
    // formula the lesson says in words is also shown as a formula; under them the lines of the lesson's explanation,
    // as a short text and no longer as a list of points (21/11/2026: a block of bold and three bullets read as made
    // by a machine)
    const line = (x) => (x.formula ? formula(x.formula) : `<p>${txt(x)}</p>`);
    frame(
      `<div class="lz-mentor lz-opening">${who(IDEA)}
        <h2 class="lz-q${t.say.length > LONG_TITLE ? ' lz-q-long' : ''}" tabindex="-1">${txt(t.say)}</h2>
        ${t.formula ? formula(t.formula) : ''}
        ${t.sub ? `<p class="lz-sub">${txt(t.sub)}</p>` : ''}</div>
      ${t.lines.length ? `<div class="lz-brief">${t.lines.map(line).join('')}</div>` : ''}`,
      { foot: false },
    );
    root.querySelector('.lz-body').insertAdjacentHTML('afterend', '<div class="lz-foot"><button class="pill pill-dark wide" data-act="start">Inizia</button></div>');
    fit();
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
      const opts = ex.options.map((o, i) => `<button class="lz-opt" data-opt="${i}" aria-pressed="false">${txt(o.text)}</button>`).join('');
      if (e.type === 'completa') answers = `<p class="lz-sentence" aria-live="polite">${sentence(e, null)}</p><div class="lz-chips">${opts}</div>`;
      else answers = `<div class="lz-opts${e.type === 'vf' ? ' lz-two' : ''}">${opts}</div>`;
    }
    if (e.type === 'abbina') {
      ex.left = e.pairs.map((p) => p.left);
      ex.right = mix(e.pairs.map((p) => p.right));
      ex.match = {}; // left → right
      ex.sel = null;
      // for the screen reader: the two columns have a name, a picked item says so, a paired one says with what
      answers = `<div class="lz-match">
        <div role="group" aria-label="Voci a sinistra">${ex.left.map((t, i) => `<button class="lz-cell" data-left="${i}" aria-pressed="false">${txt(t)}</button>`).join('')}</div>
        <div role="group" aria-label="Voci a destra">${ex.right.map((t, i) => `<button class="lz-cell" data-right="${i}" aria-pressed="false">${txt(t)}</button>`).join('')}</div>
      </div>`;
    }
    if (e.type === 'ordina') {
      ex.items = mix(e.order);
      ex.seq = [];
      answers = `<ol class="lz-seq" aria-label="Il tuo ordine"></ol><div class="lz-pool" role="group" aria-label="Voci da ordinare"></div>`;
    }
    if (e.type === 'gruppi') {
      ex.items = mix(e.items.map((_, i) => i)); // the order in the tray, which stays as it is
      ex.where = {}; // item → column
      ex.placed = []; // the items in a column, in the order they got there
      ex.sel = ex.items[0]; // one is always lit, so the columns always have something to take
      answers = `<div class="lz-tray" role="group" aria-label="Voci da mettere in colonna"></div>
        <div class="lz-cols${e.groups.length > 2 ? ' lz-cols-3' : ''}" style="--n:${e.groups.length}">${e.groups
          .map((g, k) => `<div class="lz-col" data-col="${k}" role="group" aria-label="${esc(g)}"><button class="lz-col-head" data-col="${k}" aria-label="${esc(g)}: metti qui la voce scelta">${esc(g)}</button><div class="lz-col-items"></div></div>`)
          .join('')}</div>`;
    }
    if (e.type === 'slider') {
      const s = e.slider;
      // the thumb starts at the bottom end, never on the answer (the middle often is the answer); at the top end
      // when the bottom one is right
      ex.value = e.range[0] <= s.min ? s.max : s.min;
      answers = `<div class="lz-slider">
        <output class="lz-value" id="lz-value" aria-live="off">${fmt(ex.value, s.unit)}</output>
        <input type="range" id="lz-range" min="${s.min}" max="${s.max}" step="${s.step}" value="${ex.value}" aria-label="La tua stima" aria-valuetext="${esc(fmt(ex.value, s.unit))}" />
        <div class="lz-ends"><span>${fmt(s.min, s.unit)}</span><span>${fmt(s.max, s.unit)}</span></div>
      </div>`;
    }
    // the help line of a new type: the first time only, not in «Ci riprovi»
    const help = e.help && !retry ? `<p class="lz-help"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.5a6 6 0 0 1 3.5 10.9V17h-7v-2.6A6 6 0 0 1 12 3.5zM9.5 20.5h5"/></svg>${esc(e.help)}</p>` : '';
    // one instruction on a screen, not two or three (11/11/2026, Davide: less text): what to do is said by the mentor's
    // line and by the screen itself (two columns, a gap in the sentence, the place of the first step). How to touch
    // stays for the screen reader, which does not see the screen.
    const hint = TYPE_ASK[e.type] && e.type !== 'vf' && !help ? `<p class="sr-only">${TYPE_ASK[e.type]}</p>` : '';
    // the idea is new on the screen before the questions, when the lesson has one: not said twice
    frame(`${mentorLine(e, e.idea != null && !retry && !(lesson.intro && !lesson.review))}
      ${e.source ? `<p class="lz-source">Fonte: ${esc(e.source)}</p>` : ''}
      ${help}${hint}
      <div class="lz-answers">${answers}</div>`);
    if (e.type === 'ordina') drawOrder();
    if (e.type === 'gruppi') drawGroups();
    if (e.type === 'slider') {
      const r = root.querySelector('#lz-range');
      // the part of the track behind the thumb fills with the blue (style.css, .lz-slider input: --p)
      const fill = () => r.style.setProperty('--p', `${((Number(r.value) - Number(r.min)) / (Number(r.max) - Number(r.min))) * 100}%`);
      fill();
      const moved = () => {
        fill();
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
    fit();
  }

  const fmt = (v, unit) => `${String(v).replace('.', ',')}${unit ? ` ${unit}` : ''}`;
  function sentence(e, word, state = '') {
    const [a, b] = e.sentence.split('___');
    // empty, the gap is said («parola mancante»): a screen reader skipped it and the sentence had no hole
    return `${words(a, e)}<span class="lz-gap ${state}">${word ? esc(word) : '<span class="sr-only">parola mancante</span>&nbsp;'}</span>${words(b ?? '', e)}`;
  }

  function drawOrder() {
    const seq = root.querySelector('.lz-seq');
    const pool = root.querySelector('.lz-pool');
    seq.innerHTML = ex.seq.length
      ? ex.seq
          .map((t, i) => `<li><button class="lz-cell on" data-unseq="${i}" aria-label="Passo ${i + 1}: ${esc(t)}. Toglilo${i < ex.seq.length - 1 ? ' con i successivi' : ''}."><b>${i + 1}</b>${esc(t)}</button></li>`)
          .join('')
      : '<li class="lz-empty">Il primo passo che tocchi va qui</li>';
    pool.innerHTML = ex.items.map((t, i) => (ex.seq.includes(t) ? '' : `<button class="lz-cell" data-seq="${i}">${txt(t)}</button>`)).join('');
    ex.pick = ex.seq.length === ex.items.length || null;
  }

  /** After a touch that redraws the steps, the focus stays in the list: on the step now at place i, or on «Verifica»
   *  when none is left (the screen reader does not fall back to the top of the page). */
  function keepFocus(i) {
    const left = root.querySelectorAll('.lz-pool .lz-cell');
    (left[Math.min(Math.max(i, 0), left.length - 1)] ?? root.querySelector('[data-act="check"]'))?.focus({ preventScroll: true });
  }

  // ---------- put in columns ----------
  /** The tray holds the items still waiting, and gets shorter as they go: the columns take the height it leaves, so
   *  the page stays in one screen (with the places of the items gone kept empty, as tried first, it did not on any
   *  phone once a column was full). A column lists its items in the order they came. While an item is lit, every
   *  column offers itself. */
  function drawGroups() {
    const e = lesson.exercises[queue[0]];
    const chip = (i, inside) => {
      const t = esc(e.items[i].text);
      if (inside) return `<button class="lz-chip in" data-item="${i}" aria-label="${t}, in ${esc(e.groups[ex.where[i]])}. Toglila.">${t}</button>`;
      return `<button class="lz-chip${ex.sel === i ? ' sel' : ''}" data-item="${i}" aria-pressed="${ex.sel === i}">${t}</button>`;
    };
    const tray = root.querySelector('.lz-tray');
    tray.innerHTML = ex.items
      .filter((i) => ex.where[i] == null)
      .map((i) => chip(i, false))
      .join('');
    tray.hidden = ex.placed.length === e.items.length;
    root.querySelectorAll('.lz-col').forEach((col, k) => {
      col.classList.toggle('ask', ex.sel != null);
      col.classList.remove('over');
      col.querySelector('.lz-col-items').innerHTML = ex.placed
        .filter((i) => ex.where[i] === k)
        .map((i) => chip(i, true))
        .join('');
    });
    ex.pick = ex.placed.length === e.items.length || null;
  }
  /** Item i into column k, or back into the tray (k null). */
  function groupPut(i, k) {
    const e = lesson.exercises[queue[0]];
    ex.placed = ex.placed.filter((x) => x !== i);
    if (k == null) {
      // back in the tray it is the lit one: it was taken out to be sent somewhere else
      delete ex.where[i];
      ex.sel = i;
    } else {
      ex.where[i] = k;
      ex.placed.push(i);
      ex.sel = ex.items.find((x) => ex.where[x] == null) ?? null; // the next one waiting lights up
      // the line that explains how it works has been understood: its room goes to the columns
      root.querySelector('.lz-help')?.remove();
    }
    drawGroups();
    ready();
    said(k == null ? `Tolta: ${e.items[i].text}.` : `${e.items[i].text} in ${e.groups[k]}.`);
  }
  /** A touch on an item or on a column. An item of the tray becomes the lit one. While one is lit, a column takes it
   *  wherever the finger lands in it, on the items it holds too: who aims at a column does not aim between its items
   *  (tried the other way first: a touch meant for the column kept pulling an item back out). With the tray empty, a
   *  touch on an item takes it back, lit, to be sent somewhere else; before that, it is dragged.
   *  `keys`: the touch came from the keyboard or a screen reader, which act on the very thing they are on: an item
   *  in a column always goes back, the name of a column takes the lit one; and the focus must not be lost. */
  function groupTap(el, keys = false) {
    const col = el.closest('.lz-col');
    const item = el.dataset.item !== undefined ? Number(el.dataset.item) : null;
    if (item != null && !col) {
      ex.sel = item;
      drawGroups();
    } else if (item != null && (keys || ex.sel == null)) groupPut(item, null);
    else if (col && ex.sel != null) groupPut(ex.sel, Number(col.dataset.col));
    else return;
    if (!keys) return;
    // on the lit item when it was picked or taken back; on the columns' side when it was sent; on «Verifica» at the end
    const lit = item != null ? root.querySelector(`.lz-tray [data-item="${ex.sel}"]`) : ex.sel != null ? col.querySelector('.lz-col-head') : root.querySelector('[data-act="check"]');
    lit?.focus({ preventScroll: true });
  }

  function ready() {
    // the first answer of a list is number 0: «nothing picked» is null, not 0
    root.querySelector('[data-act="check"]').disabled = ex.pick == null;
    // a step gone up in the list, the word in the sentence: still in one screen
    fit(true);
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
      // `pairs`: the ones gone wrong, to show one on a line; `answer` stays whole for whoever needs it in a sentence
      // each pair gone wrong says why, once: the pairs of a lesson from the Excel share one explanation
      return { ok: !bad.length, why: [...new Set(bad.map((p) => p.why))].join(' '), answer: e.pairs.map((p) => `${p.left} → ${p.right}`).join(' · '), pairs: bad.map((p) => [p.left, p.right]) };
    }
    if (e.type === 'ordina') {
      const ok = ex.seq.every((t, i) => t === e.order[i]);
      return { ok, why: ok ? '' : e.why, answer: e.order.join(' → '), steps: e.order };
    }
    if (e.type === 'gruppi') {
      const bad = e.items.filter((it, i) => ex.where[i] !== it.group);
      const whole = e.groups.map((g, k) => `${g}: ${e.items.filter((it) => it.group === k).map((it) => it.text).join(', ')}`).join(' · ');
      // as for the pairs: under «Non è così» only the items gone into the wrong column, one on a line
      return { ok: !bad.length, why: bad.length ? e.why : '', answer: whole, pairs: bad.map((it) => [it.text, e.groups[it.group]]) };
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
      if (streak === STREAK && before < STREAK) {
        api.sfx.fanfare?.();
        said(`${streak} di fila.`);
      }
    } else if (!v.ok) still.push(i);
    paint(e, v.ok);
    if (v.ok && streak !== STREAK) api.sfx.reward();
    if (!v.ok) (api.sfx.wrong ?? api.sfx.tap)();
    api.buzz(v.ok ? 18 : [30, 60, 30]);
    // the theory card: only after the first mistake on a new idea, once for each idea (CLAUDE.md §6)
    const idea = e.idea || `#${e.n}`;
    const theory = !v.ok && e.idea != null && !theorySeen.has(idea);
    if (theory) theorySeen.add(idea);
    // the answers stay on screen, but can no longer be changed
    root.querySelector('.lz-answers').inert = true;
    root.querySelector('.lz-foot').hidden = true;
    const sheet = root.querySelector('#lz-sheet');
    // a hard word already underlined in the question is not underlined again down here
    const seen = new Set((e.words ?? []).map(([w]) => w).filter((w) => [...root.querySelectorAll('.lz-body .lz-word')].some((b) => b.dataset.word === w)));
    // the right answer in words only where the screen does not show it: among options it is the green one, in sight
    // above the sheet (makeRoom); pairs, steps and a number need to be said. The screen reader hears it always.
    const shownAbove = ['scelta', 'vf', 'completa', 'scenario'].includes(e.type);
    // a line that is one sum and nothing else («95 − (25 + 58) = 95 − 83 = +12 €.») is set larger, as the sum it is
    const why = v.why ? words(v.why, e, seen) : '';
    const whySum = /^<span class="sum">.*<\/span>\.?$/s.test(why) && why.split('class="sum"').length === 2;
    sheet.className = `lz-sheet ${v.ok ? 'ok' : 'no'}`;
    sheet.innerHTML = `<div class="lz-verdict">
        <span class="lz-mark" aria-hidden="true">${v.ok ? '<svg viewBox="0 0 24 24"><path d="M5.5 12.5l4.2 4.2 8.8-9.4"/></svg>' : '<svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17"/></svg>'}</span>
        <h3 tabindex="-1">${v.ok ? 'Giusto' : 'Non è così'}</h3>
      </div>
      ${v.ok ? '' : rightAnswer(v, shownAbove)}
      ${why ? `<p class="lz-why${whySum ? ' lz-why-sum' : ''}">${whySum ? why.replace(/\.$/, '') : why}</p>` : ''}
      <div class="lz-more" id="lz-explain" tabindex="-1" hidden>
        ${theory ? `<div class="lz-theory"><span>Idea nuova${e.idea ? ` · ${esc(e.idea)}` : ''}</span><p>${words(e.theory ?? e.explain, e, seen)}</p></div>` : ''}
        ${theory && !e.theory ? '' : `<p class="lz-explain">${words(e.explain, e, seen)}</p>`}
      </div>
      <div class="lz-sheet-acts">
        <button class="pill pill-light" data-act="explain" aria-expanded="false" aria-controls="lz-explain">Spiegami</button>
        <button class="pill pill-dark" data-act="next">Continua</button>
      </div>`;
    sheet.hidden = false;
    settle();
    sheet.querySelector('h3').focus({ preventScroll: true });
    // the sheet rises over the answers: room for them above it, and the right one in sight (10/11/2026, the album:
    // «Non è così» covered the right answer, and with «Spiegami» open every answer but the wrong one)
    sheetRoom?.disconnect();
    sheetRoom = new ResizeObserver(makeRoom);
    sheetRoom.observe(sheet);
  }

  /** The right answer under «Non è così». The steps of an order one on a line with their number, the pairs gone
   *  wrong one on a line: before (11/11/2026) they were one sentence in bold with arrows, three lines long, to be
   *  read like a paragraph. A number or an option stays a line. */
  function rightAnswer(v, shownAbove) {
    if (v.steps) return `<div class="lz-right"><span>La risposta giusta:</span><ol class="lz-right-list">${v.steps.map((t) => `<li>${txt(t)}</li>`).join('')}</ol></div>`;
    if (v.pairs?.length)
      return `<div class="lz-right"><span>La risposta giusta:</span><ul class="lz-right-list">${v.pairs.map(([l, r]) => `<li><b>${txt(l)}</b> → ${txt(r)}</li>`).join('')}</ul></div>`;
    return `<p class="lz-right${shownAbove ? ' sr-only' : ''}">La risposta giusta: <b>${txt(v.answer)}</b></p>`;
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
    if (e.type === 'gruppi') {
      root.querySelectorAll('.lz-col').forEach((c) => c.classList.remove('ask', 'over'));
      root.querySelectorAll('.lz-col .lz-chip').forEach((b) => {
        const i = Number(b.dataset.item);
        b.classList.add(ex.where[i] === e.items[i].group ? 'right' : 'wrong');
      });
    }
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
        <div class="lz-mentor">${who()}<p class="lz-say" tabindex="-1">${line}</p></div>
      </div>`,
      { foot: false },
    );
    root.querySelector('.lz-body').insertAdjacentHTML('afterend', '<div class="lz-foot"><button class="pill pill-dark wide" data-act="again">Ci riprovo</button></div>');
    fit();
  }

  // ---------- leaving: «La lezione riparte dall'inizio. L'ufficio resta com'è» ----------
  const ask = () => askLeave(root, root.querySelector('#lz-ask'), 'lz-ask-t', 'La lezione riparte dall’inizio. L’ufficio resta com’è.');

  // what lies under the lesson is out of reach of the finger, the keyboard and the screen reader
  const BEHIND = ['.top', '#a11y', '#btn-back', '.bottom', '#path', '#me', '#avvio'];
  const reach = (on) => BEHIND.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.inert = !on;
  });

  function finish(done) {
    root.hidden = true;
    root.innerHTML = '';
    delete root.dataset.fit;
    root.style.removeProperty('--lz-k');
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
    // the items and the columns of «metti in colonna»: the finger and the mouse are followed by the pointer (a touch
    // or a drag, see below); a click that comes from the keyboard or a screen reader (detail 0) does the same touch
    const piece = lesson?.exercises[queue[0]]?.type === 'gruppi' ? ev.target.closest('.lz-chip, .lz-col') : null;
    if (piece) {
      if (ev.detail !== 0 || checked || b?.disabled) return;
      api.sfx.tap();
      return groupTap(ev.target.closest('.lz-chip') ?? piece, true);
    }
    if (!b || b.disabled) return;
    const e = lesson.exercises[queue[0]];
    const act = b.dataset.act;
    if (b.dataset.word) {
      const [w, def] = e.words.find(([x]) => x === b.dataset.word);
      return define(b, w, def);
    }
    api.sfx.tap();
    if (act === 'x') return ask();
    if (act === 'stay') return stay(root.querySelector('#lz-ask'));
    if (act === 'leave') return finish(false);
    if (act === 'check') return check();
    if (act === 'next') return next();
    if (act === 'again' || act === 'start') return show();
    if (act === 'explain') {
      const p = root.querySelector('#lz-explain');
      p.hidden = !p.hidden;
      b.setAttribute('aria-expanded', String(!p.hidden));
      // the text opens above the button: the focus goes on it, so a screen reader reads it and goes on to «Continua»
      // (before, it stayed on «Spiegami» with the new text behind it)
      if (!p.hidden) p.focus({ preventScroll: true });
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
      let tell = `Passo ${ex.seq.length}: ${ex.seq.at(-1)}.`;
      // the last one left has one place only: it goes there by itself, without a touch that decides nothing (11/11/2026)
      const left = ex.items.filter((t) => !ex.seq.includes(t));
      if (left.length === 1) {
        ex.seq.push(left[0]);
        tell += ` Passo ${ex.seq.length}: ${left[0]}.`;
      }
      drawOrder();
      ready();
      said(tell);
      return keepFocus(at);
    }
    if (b.dataset.unseq !== undefined) {
      // taking a step back out takes the ones after it too
      const from = Number(b.dataset.unseq);
      said(from === ex.seq.length - 1 ? `Tolto il passo ${from + 1}.` : `Tolti i passi dal ${from + 1} in poi.`);
      ex.seq = ex.seq.slice(0, from);
      drawOrder();
      ready();
      return keepFocus(0);
    }
  });

  // ---------- «metti in colonna» under the finger: a touch picks and sends, a drag carries ----------
  // Followed by the pointer and not by the click: an item and its column can be a finger apart, and two quick touches
  // that close are taken for a double tap and dropped (app.js); and a drag is not a click at all.
  let held = null; // { chip, col, id, x, y, ghost, over }
  const cols = () => root.querySelectorAll('.lz-col');
  root.addEventListener('pointerdown', (ev) => {
    if (checked || !lesson || lesson.exercises[queue[0]]?.type !== 'gruppi' || ev.button > 0) return;
    // one finger at a time; but a finger whose end never came (it left the screen) does not lock the exercise
    if (held && performance.now() - held.at < 4000) return;
    if (held?.ghost) {
      held.ghost.remove();
      drawGroups();
    }
    held = null;
    const chip = ev.target.closest('.lz-chip');
    const col = ev.target.closest('.lz-col');
    if (!chip && !col) return;
    held = { chip, col, id: ev.pointerId, x: ev.clientX, y: ev.clientY, ghost: null, over: null, at: performance.now() };
    chip?.setPointerCapture?.(ev.pointerId);
  });
  root.addEventListener('pointermove', (ev) => {
    if (!held?.chip || ev.pointerId !== held.id) return;
    const dx = ev.clientX - held.x;
    const dy = ev.clientY - held.y;
    if (!held.ghost) {
      if (Math.hypot(dx, dy) < 10) return; // a finger that trembles is still a touch
      const r = held.chip.getBoundingClientRect();
      const g = held.chip.cloneNode(true);
      g.className = 'lz-chip lz-ghost';
      g.removeAttribute('data-item');
      g.setAttribute('aria-hidden', 'true');
      Object.assign(g.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
      root.appendChild(g);
      held.ghost = g;
      held.chip.classList.add('lifted');
    }
    held.ghost.style.transform = `translate(${dx}px, ${dy}px) rotate(-2deg)`;
    const under = document.elementFromPoint(ev.clientX, ev.clientY);
    held.over = under?.closest?.('.lz-col') ?? (under?.closest?.('.lz-tray') ? 'tray' : null);
    cols().forEach((c) => c.classList.toggle('over', c === held.over));
  });
  const letGo = (ev, done) => {
    if (!held || ev.pointerId !== held.id) return;
    const h = held;
    held = null;
    h.ghost?.remove();
    if (!done || checked) return h.ghost && drawGroups();
    const item = h.chip ? Number(h.chip.dataset.item) : null;
    if (h.ghost) {
      // carried: into the column it was let go on; an item of a column let go on the tray goes back; anywhere else
      // it returns where it was
      const from = h.chip.closest('.lz-col');
      if (h.over && h.over !== 'tray' && h.over !== from) {
        api.sfx.tap();
        api.buzz?.(12);
        return groupPut(item, Number(h.over.dataset.col));
      }
      if (h.over === 'tray' && from) return groupPut(item, null);
      return drawGroups();
    }
    // a touch: the finger went up where it came down
    const now = performance.now();
    if (item != null && item === lastTouched.item && now - lastTouched.at < 250) return; // a double tap on an item is one
    lastTouched = { item, at: now };
    api.sfx.tap();
    groupTap(h.chip ?? h.col);
  };
  let lastTouched = { item: null, at: 0 };
  root.addEventListener('pointerup', (ev) => letGo(ev, true));
  root.addEventListener('pointercancel', (ev) => letGo(ev, false));

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
    let tell = '';
    if (pairOf !== undefined && !ex.sel) {
      if (side === 'left') delete ex.match[i];
      else delete ex.match[pairOf];
      tell = `Coppia sciolta: ${b.textContent}.`;
    } else if (!ex.sel || ex.sel.side === side) {
      ex.sel = ex.sel?.side === side && ex.sel.i === i ? null : { side, i };
    } else {
      const l = side === 'left' ? i : ex.sel.i;
      const r = side === 'right' ? i : ex.sel.i;
      for (const key of Object.keys(ex.match)) if (ex.match[key] === r) delete ex.match[key];
      ex.match[l] = r;
      ex.sel = null;
      tell = `${ex.left[l]} con ${ex.right[r]}.`;
    }
    // the pairs share a number, so they read without colour too
    const order = Object.keys(ex.match).map(Number).sort((a, c) => a - c);
    root.querySelectorAll('[data-left],[data-right]').forEach((c) => {
      c.classList.remove('sel');
      c.removeAttribute('data-pair');
      c.removeAttribute('aria-label');
      c.setAttribute('aria-pressed', 'false');
    });
    order.forEach((l, n) => {
      const left = root.querySelector(`[data-left="${l}"]`);
      const right = root.querySelector(`[data-right="${ex.match[l]}"]`);
      left.dataset.pair = right.dataset.pair = n + 1;
      // the number is for the eye; for the screen reader each one says what it is paired with
      left.setAttribute('aria-label', `${ex.left[l]}, in coppia con ${ex.right[ex.match[l]]}`);
      right.setAttribute('aria-label', `${ex.right[ex.match[l]]}, in coppia con ${ex.left[l]}`);
    });
    if (ex.sel) {
      const picked = root.querySelector(`[data-${ex.sel.side}="${ex.sel.i}"]`);
      picked.classList.add('sel');
      picked.setAttribute('aria-pressed', 'true');
    }
    if (tell) said(tell);
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
      checked = false;
      root.hidden = false;
      document.body.classList.add('in-lesson');
      reach(false);
      if (l.intro && !l.review) intro();
      else show();
      return new Promise((r) => (resolve = r));
    },
  };
}
