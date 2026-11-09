// FEEN · la sede — the first start (07/11/2026, CLAUDE.md §5): welcome → test → pregio → map → the choice
// of the character → the empty company with the partner → the contract → the first lesson → the reminders → Percorso.
// The test is Dorigo's (quiz.js); the user's choices of 07/11/2026: a touch on a circle moves on by itself, there is
// no way back to the question before, no «Rifai il test». 09/11/2026, the user: no «Salta» on the welcome, and no
// trappola screen in the reveal (it stays in the Tu and in the mentor's line of the Caso). Every step is kept
// on the phone: closing the app brings you back to the step you reached. Welcome, partner and contract texts are
// Claude's, provisional.
import { QUESTIONS, SCALE, TIEBREAKS, PROFILES, score } from './quiz.js';
import { PEOPLE } from './people.js';
import { FLOORS } from './world.js';
import { IN_APP } from './app.js';
import { inkOn } from './kit.js';

const KEY = 'feen-avvio';
const ORDER = ['alto-innovativo', 'alto-tradizionale', 'basso-innovativo', 'basso-tradizionale'];
// the women first in every pair (CLAUDE.md §4): the partner is «la socia» or «il socio»
const WOMEN = new Set(ORDER.map((k) => PROFILES[k].names[0]));
const LABELS = ['Molto d’accordo', 'D’accordo', 'Un po’ d’accordo', 'Né d’accordo né in disaccordo', 'Un po’ in disaccordo', 'In disaccordo', 'Per niente d’accordo'];
// line icons of the twelve statements, from Dorigo's page (24-unit box)
const ICONS = {
  'montagne-russe': '<path d="M2 16c3 0 4-10 8-10s4 9 7 9 3-4 5-4"/><path d="M6 12.5V21M10 6v15M17 15v6M2 21h20"/>',
  feste: '<rect x="3.5" y="9" width="17" height="11.5" rx="1.5"/><path d="M12 9v11.5M3.5 13h17"/><path d="M12 9c-1.5-3.5-5.5-4-5.5-1.5S10 9 12 9c2 0 5.5 1 5.5-1.5S13.5 5.5 12 9z"/>',
  crocette: '<rect x="4" y="3" width="16" height="18" rx="2"/><rect x="7" y="7" width="3.5" height="3.5" rx=".6"/><rect x="7" y="13.5" width="3.5" height="3.5" rx=".6"/><path d="M13.5 8.75h3.5M13.5 15.25h3.5M7.6 7.6l2.3 2.3M9.9 7.6 7.6 9.9"/>',
  piatto: '<circle cx="13.5" cy="12" r="7"/><circle cx="13.5" cy="12" r="3.5"/><path d="M3 4v5.5c0 1 .7 1.7 1.5 1.7S6 10.5 6 9.5V4M4.5 11.2V20"/>',
  vacanza: '<rect x="3.5" y="7.5" width="17" height="12.5" rx="2"/><path d="M9 7.5V4.5h6v3M8 7.5V20M16 7.5V20"/>',
  serie: '<rect x="2.5" y="5.5" width="19" height="13" rx="2"/><path d="M8 21.5h8M10.5 9.5v5l4.2-2.5z"/>',
  batteria: '<rect x="2.5" y="7.5" width="17" height="9" rx="2"/><path d="M22 10.5v3"/><rect x="5" y="10" width="6" height="4" rx=".6" fill="currentColor" stroke="none"/>',
  app: '<rect x="6.5" y="2.5" width="11" height="19" rx="2.2"/><path d="M10.5 18.5h3"/><path d="M9.5 7.5h5v5h-5z"/>',
  rigori: '<path d="M2.5 19V5.5h19V19"/><path d="M2.5 9.5h19" opacity=".45"/><circle cx="12" cy="16" r="3"/>',
  strada: '<path d="M6.5 21.5 10 2.5M17.5 21.5 14 2.5"/><path d="M12 19v-2.5M12 13v-2.5M12 7V5"/>',
  risiko: '<path d="M12 3l8 3v5.5c0 6.5-8 9.5-8 9.5s-8-3-8-9.5V6z"/>',
  canzoni: '<path d="M9 18V5.5l11-2V16"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
};
// what the partner says in the empty company, one line per touch: two lines since 09/11/2026 (revisione UX, stanza 4),
// the partner and the launch, then the contract. Provisional, Claude's: the product of the launch is never said.
const PARTNER = [
  (w) => `Eccoti, ${w.me}! Sono ${w.partner}, ${w.partnerWord}. Ogni lezione fa crescere l’azienda, fino al grande lancio. Cosa lanciamo? Segreto tra soci.`,
  () => 'Prima però una firma. Niente paura: nessuna clausola scritta in piccolo.',
];
// under the first line, while the room is on screen: what the numbers on the empty stands mean (Claude's, to confirm)
const STANDS = 'Sui posti vuoti c’è il numero della tappa che porta l’oggetto.';
// the contract (09/11/2026): today's date as it is written on paper, and the partner's signature, already there
const today = () => new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
// from «Firmo» to the first lesson: the stamp lands (style.css, «partita 09/11 · B») and stays in sight (09/11/2026)
const STAMP_PAUSE = 2000;
const PARTNER_SIGN = '<svg viewBox="0 0 120 40" aria-hidden="true"><path d="M6 28c10-16 18-18 20-8s8 10 14-2 12-12 14 0 10 8 18-4 14-8 18 2 10 6 22-2"/></svg>';

const fresh = () => ({ step: 'benvenuto', i: 0, answers: Array(QUESTIONS.length).fill(null), tie: {}, pick: null, line: 0, sign: null, avvisi: null });
function load() {
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    return s && Array.isArray(s.answers) && s.answers.length === QUESTIONS.length ? s : null;
  } catch {
    return null;
  }
}
const cap = (t) => t[0].toUpperCase() + t.slice(1);
// «rischio basso · tradizionale»: the «·» stays with the word before it, so a line never starts with it
const keep = (t) => t.replace(/ · /g, '\u00a0· ');
const icon = (id) => `<svg class="av-icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[id]}</svg>`;

/** The result of the test as the rest of the prova needs it, or null before the choice of the character. */
export function whoOf(s) {
  if (!s?.pick) return null;
  const r = score(s.answers, s.tie);
  const p = PROFILES[r.quadrant];
  const partner = p.names.find((n) => n !== s.pick);
  return { ...r, profile: p, me: s.pick, partner, partnerWord: WOMEN.has(partner) ? 'la tua socia' : 'il tuo socio', sign: s.sign, signed: s.signed };
}

/** The little map of the four types with your point (reveal and Tu). */
export function miniMap(who, { label = true } = {}) {
  // The names sit on the outer edge of each quadrant; your point lives in the free field of your quadrant, between
  // its names and the middle, so at any text size it never covers them (09/11/2026: at the far corners it used to
  // sit on the description). Still in proportion: the further from the middle on the map, the further from the
  // middle in the field; near the middle (an axis broken by the tie cards) it keeps a little way inside its quadrant,
  // never on the crossing (revisione UX 09/11/2026, problema 7). quiz.js stays Dorigo's.
  const sx = who.quadrant.endsWith('tradizionale') ? 1 : -1;
  const sy = who.quadrant.startsWith('alto') ? 1 : -1;
  // the distance from the middle line, as a share of the field (style.css keeps the point whole inside it)
  const far = (v) => 12 + Math.min(1, Math.abs(v)) * 76;
  const left = sx > 0 ? far(who.x) : 100 - far(who.x);
  const top = sy > 0 ? 100 - far(who.y) : far(who.y);
  // «Tu» beside the point, on the side of the quadrant with more room
  const side = left > 50 ? ' to-left' : '';
  const you = `<i class="mm-field"><i class="mm-you${side}" style="--x:${left.toFixed(1)}%;--y:${top.toFixed(1)}%">${label ? '<span>Tu</span>' : ''}</i></i>`;
  const cells = ORDER.map((k) => `<div class="mm-q${k === who.quadrant ? ' me' : ''}"><b>${keep(PROFILES[k].names.join(' · '))}</b><span>${keep(PROFILES[k].what)}</span>${k === who.quadrant ? you : ''}</div>`).join('');
  return `<div class="mm" role="img" aria-label="La mappa dei quattro tipi: il tuo punto è nel quadrante ${who.profile.what}">
    <span class="mm-axis n">Rischio alto</span><span class="mm-axis s">Rischio basso</span>
    <span class="mm-axis w">Innovativo</span><span class="mm-axis e">Tradizionale</span>
    <div class="mm-grid">${cells}</div>
  </div>`;
}

/** The two lessons where the trappola comes back. */
export function trapFloors(p) {
  return p.floors
    .map((f) => {
      const fl = FLOORS[f.n - 1];
      return `<li class="av-floor"><i style="background:${fl.color};color:${inkOn(fl.color)}">${f.n}</i><span>Al piano ${f.n} · ${fl.name}: «${f.lesson.replace(/[«»]/g, '')}»</span></li>`;
    })
    .join('');
}

/** The signature as drawn, in a box of 0..1: the Tu shows it under the contract. */
export function signSvg(sign, cls = '') {
  if (!sign?.length) return '';
  const d = sign.map((st) => st.map(([x, y], k) => `${k ? 'L' : 'M'}${(x * 300).toFixed(1)} ${(y * 100).toFixed(1)}`).join('')).join('');
  return `<svg class="${cls}" viewBox="0 0 300 100" aria-hidden="true"><path d="${d}"/></svg>`;
}

export function makeAvvio(api) {
  const root = document.getElementById('avvio');
  let s = load();
  let lock = false;

  const save = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify(s));
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
    root.className = `avvio ${cls}`;
    root.innerHTML = html;
    root.scrollTop = 0;
    const h = root.querySelector('h1, h2');
    h?.setAttribute('tabindex', '-1');
    h?.focus({ preventScroll: true });
  }

  // ---------- the screens ----------
  function benvenuto() {
    const c = FLOORS[0].color;
    screen(
      'av-page av-welcome',
      `<div class="av-head"><span class="av-brand">FEEN</span></div>
      <div class="av-art" aria-hidden="true">
        <svg viewBox="0 0 220 200">
          <path class="g" d="M8 186h204"/>
          <rect class="core" x="138" y="22" width="34" height="164" rx="2"/>
          <path class="core-l" d="M138 52h34M138 82h34M138 112h34M138 142h34"/>
          <path class="crane" d="M155 22V6M118 8h62M124 8v14"/>
          ${[0, 1, 2, 3].map((k) => `<rect class="slot" x="34" y="${126 - k * 30}" width="104" height="26" rx="2"/>`).join('')}
          <rect class="slab" x="30" y="152" width="112" height="7" rx="1.5"/>
          <rect x="34" y="159" width="104" height="27" fill="${c}" rx="1"/>
          <path class="star" d="M84 2l3.2 7.8 7.8 3.2-7.8 3.2L84 24l-3.2-7.8L73 13l7.8-3.2z"/>
        </svg>
      </div>
      <h1>Impari i soldi facendo crescere la tua azienda</h1>
      <p class="av-lead">Ogni lezione aggiunge un pezzo. Piano dopo piano, verso un grande lancio.</p>
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="next">Avanti</button>`,
    );
  }

  function prima() {
    screen(
      'av-page av-welcome',
      `<div class="av-head"><span class="av-brand">FEEN</span></div>
      <div class="av-art av-art-chips" aria-hidden="true">
        <span>${icon('montagne-russe')}</span><span>${icon('serie')}</span><span>${icon('rigori')}</span><span>${icon('canzoni')}</span>
      </div>
      <h1>Prima scopri che tipo sei</h1>
      <p class="av-lead">12 domande sulla tua vita di tutti i giorni, circa 3 minuti. Nessuna parla di soldi: alla fine ti diciamo cosa rivelano.</p>
      <p class="av-note">Non ci sono risposte giuste: rispondi come fai davvero.</p>
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="start">Inizia il test</button>`,
    );
  }

  function question() {
    const q = QUESTIONS[s.i];
    const pips = QUESTIONS.map((_, k) => `<i class="${k < s.i ? 'on' : k === s.i ? 'now' : ''}"></i>`).join('');
    const dots = SCALE.values
      .map((v, k) => `<button class="av-dot d${k}" data-val="${v}" aria-label="${LABELS[k]}" aria-pressed="${s.answers[s.i] === v}"></button>`)
      .join('');
    screen(
      'av-page av-test',
      `<div class="av-progress" aria-hidden="true"><div class="av-pips">${pips}</div><span>${s.i + 1} / ${QUESTIONS.length}</span></div>
      <div class="av-q">${icon(q.id)}<h2 aria-label="Domanda ${s.i + 1} di ${QUESTIONS.length}. ${q.text}">${q.text}</h2></div>
      <div class="av-scale" role="group" aria-label="Quanto sei d’accordo">
        <div class="av-dots">${dots}</div>
        <div class="av-ends" aria-hidden="true"><span>${SCALE.left}</span><span>${SCALE.right}</span></div>
      </div>`,
    );
  }

  function tie() {
    const axis = score(s.answers, s.tie).ask[0];
    const t = TIEBREAKS[axis];
    screen(
      'av-page av-test',
      `<p class="av-note av-tie-note">Sei proprio a metà strada. Ancora una:</p>
      <h2 class="av-tie-q">${t.text}</h2>
      <div class="av-choice">${t.options.map((o) => `<button data-axis="${axis}" data-side="${o.side}">${o.text}</button>`).join('')}</div>`,
    );
  }

  function pregio() {
    const p = whoOf({ ...s, pick: '-' }).profile;
    screen(
      'av-page av-reveal',
      `<p class="av-eyebrow">Il tuo tipo</p>
      <h1>${p.motto}</h1>
      <p class="av-axes"><span>${keep(p.what)}</span></p>
      <p class="av-lead">${p.portrait}</p>
      <div class="av-trait good"><b>Il tuo pregio</b>${p.pregio}</div>
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="next">Avanti</button>`,
    );
  }

  function mappa() {
    const who = whoOf({ ...s, pick: '-' });
    screen(
      'av-page av-reveal',
      `<p class="av-eyebrow">La mappa</p>
      <h1>Ecco dove sei</h1>
      ${miniMap(who)}
      <p class="av-note">È un gioco, non una diagnosi: dice da che parte tendi oggi, non chi sei.</p>
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="next">Scegli il tuo personaggio</button>`,
    );
  }

  function scelta() {
    const p = whoOf({ ...s, pick: '-' }).profile;
    const cards = p.names
      .map((n) => `<button class="av-person" data-pick="${n}" aria-pressed="${s.pick === n}"><span class="av-bust"><img src="${PEOPLE[n]}" alt="" /></span><b>${n}</b></button>`)
      .join('');
    screen(
      'av-page av-reveal',
      `<p class="av-eyebrow">${keep(cap(p.what))}</p>
      <h1>Chi ti somiglia di più?</h1>
      <p class="av-lead">Sono le due versioni del tuo tipo. Chi scegli è il tuo personaggio; l’altra versione fonda l’azienda con te.</p>
      <div class="av-people">${cards}</div>
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="pick" ${s.pick ? '' : 'disabled'}>${s.pick ? `Sono ${s.pick}` : 'Tocca chi ti somiglia'}</button>`,
    );
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
          ${line === 0 ? `<p class="av-talk-note">${STANDS}</p>` : ''}
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
          <li><b>Art. 1</b> Io, ${who.me}, fondo questa azienda con ${who.partner}. Insieme prepariamo un grande lancio.</li>
          <li><b>Art. 2</b> Mi impegno a una cosa sola: capire come funzionano i soldi, una lezione alla volta.</li>
          <li><b>Art. 3</b> Niente scadenze, niente punteggi. Se mi fermo, l’azienda mi aspetta com’è.</li>
        </ol>
        <p class="av-date">${today()}</p>
        <div class="av-partner-sign">${PARTNER_SIGN}<span><b>${who.partner}</b> ha già firmato</span></div>
        <div class="av-sign"><canvas id="av-pad" aria-hidden="true"></canvas><span class="av-sign-hint">Firma qui col dito</span></div>
        <div class="av-sign-line"><span>${who.me}</span><button class="av-redo" data-act="redo">Rifai</button></div>
        <div class="av-stamp" aria-hidden="true"><b>FEEN</b><small>Soci<br />fondatori</small></div>
      </div>
      ${IN_APP ? '' : '<p class="av-note av-prov">Testo provvisorio.</p>'}
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="sign" disabled>Firmo</button>
      <button class="av-alt" data-act="sign-alt">Firmo con un tocco, senza disegnare</button>`,
    );
    pad();
  }

  function avvisi() {
    screen(
      'av-page av-remind',
      `<div class="av-art av-art-bell" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg></div>
      <h1>Un promemoria, ogni tanto?</h1>
      <p class="av-lead">Al massimo uno al giorno, mai se quel giorno hai già fatto una lezione. L’ora la scegli tu.</p>
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
      for (const st of strokes) {
        ctx.beginPath();
        st.forEach(([x, y], k) => (k ? ctx.lineTo(x * r.width, y * r.height) : ctx.moveTo(x * r.width, y * r.height)));
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
      draw();
    };
    pad.take = () => strokes.filter((st) => st.length > 1).map((st) => st.map(([x, y]) => [Math.round(x * 1000) / 1000, Math.round(y * 1000) / 1000]));
    requestAnimationFrame(fit);
  }

  // ---------- the steps that happen in the sede ----------
  async function lezione() {
    screen('av-off', '');
    // left with the X: the lesson starts again from the beginning when you want (CLAUDE.md §6)
    if ((await api.firstLesson()) === false) return waiting();
    go('avvisi');
  }
  function waiting() {
    const who = whoOf(s);
    screen(
      'av-page av-reveal',
      `<p class="av-eyebrow">La prima lezione</p>
      <h1>Ti aspetta quando vuoi</h1>
      <p class="av-lead">${who ? `${who.partner} tiene il posto.` : ''} Si riparte dall’inizio: circa 3 minuti.</p>
      <div class="av-fill"></div>
      <button class="pill pill-dark wide" data-act="lesson-again">Inizia la lezione</button>`,
    );
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
    // a phone saved on the old trappola screen (until 09/11/2026) goes on from the map
    const f = { benvenuto, prima, domande: question, spareggio: tie, pregio, trappola: mappa, mappa, scelta, azienda, contratto, lezione, avvisi }[s.step];
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
      setTimeout(() => {
        if (s.i < QUESTIONS.length - 1) return go('domande', { i: s.i + 1 });
        go(score(s.answers).ask.length ? 'spareggio' : 'pregio', { tie: {} });
      }, 260);
      return;
    }
    api.sfx.tap();
    if (b.dataset.side) {
      s.tie[b.dataset.axis] = Number(b.dataset.side);
      return go(score(s.answers, s.tie).ask.length ? 'spareggio' : 'pregio');
    }
    if (b.dataset.pick) {
      s.pick = b.dataset.pick;
      save();
      return scelta();
    }
    if (act === 'lesson-again') return show();
    if (act === 'start') return go('domande', { i: 0 });
    if (act === 'next') {
      const after = { benvenuto: 'prima', pregio: 'mappa', trappola: 'scelta', mappa: 'scelta' }[s.step];
      return go(after);
    }
    if (act === 'pick') return go('azienda', { line: 0 });
    if (act === 'line') {
      if (s.line < PARTNER.length - 1) return go('azienda', { line: s.line + 1 });
      return go('contratto');
    }
    if (act === 'sign' || act === 'sign-alt') {
      // the stamp lands on the paper, then the first lesson (09/11/2026, the user: «migliora il contratto»)
      const sign = act === 'sign' ? pad.take() : null;
      if (act === 'sign-alt') {
        // signed with one touch: your name goes on the line, written, instead of an empty pad under the stamp
        const box = root.querySelector('.av-sign');
        box?.classList.add('drawn', 'typed');
        box?.insertAdjacentHTML('beforeend', `<span class="av-sign-typed">${s.pick}</span>`);
      }
      root.querySelector('.av-paper')?.classList.add('stamped');
      root.querySelectorAll('[data-act]').forEach((x) => (x.disabled = true));
      // the stamp in sight, even when the page had scrolled down to «Firmo» (a short phone, large text)
      const calm = document.documentElement.hasAttribute('data-calm');
      root.querySelector('.av-stamp')?.scrollIntoView({ block: 'nearest', behavior: calm ? 'auto' : 'smooth' });
      api.sfx.reward?.();
      api.buzz(25);
      // the moment you become partners stays on screen long enough to read the stamp (partita 09/11/2026, punto 7:
      // with 0.9 s in all it hardly showed); with reduced motion the stamp is just there, the pause is the same
      return setTimeout(() => go('lezione', { sign, signed: today() }), STAMP_PAUSE);
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
    /** Back to the step reached, or to the welcome on a phone that never opened FEEN. */
    resume() {
      if (!s) s = fresh();
      // a lesson cut in half starts again from the beginning (CLAUDE.md §6)
      show();
    },
    /** «Ricomincia da capo» and DEMO: everything goes, the welcome comes back. */
    restart() {
      s = fresh();
      save();
      show();
    },
    who: () => whoOf(s),
  };
}
