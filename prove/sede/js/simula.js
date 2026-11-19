// FEEN · la sede — the Casi of the team, played inside the app (17/11/2026: «questi file sono l'attuale verità… monta
// l'app su questi tre file»). The team writes the two Casi of a floor as one playable page, or at floor 1 as a page
// each (1. LAVORO/lezioni/sorgente/casi/, carried by sims-data.js): the first comes after lesson 3, where the Caso is,
// the second after lesson 6, where the Prova sul campo is. Each is a small simulation of its own (choices, a chart, two questions, «Completa»), so it is
// not rewritten here: the page runs as it is inside a frame, under FEEN's own bar with the X, and tells the app when
// the Caso is completed. What changes from the page of the team is only what is around the Caso: the tabs between the
// two Casi and «Ricomincia il caso» are hidden (the X starts it again, as for a lesson), the colours and the typefaces
// are FEEN's, the foot does not say «Prototipo».
// 19/11/2026, from a tester («diversi a livello grafico rispetto ai quiz/lezioni», «il Mentore magari diventa il
// socio»): who speaks in a Caso is your partner, with the name and the face of the lessons (CLAUDE.md §4: the mentor
// is the version of your character you did not choose), in the lessons' bubble; the buttons, the answers and the
// cards have the look of the lessons (the pills on their edge, the answers as cards).
// A Caso always starts from its beginning (CLAUDE.md §6: left with the X, it starts again), so what the page keeps of
// an earlier play is cleared first.

import { askLeave, stay } from './esci.js';
import { PEOPLE } from './people.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// FEEN's colours on the names the pages use (style.css, :root), and the two typefaces
const THEME = `:root{--bg:#f4f8fd;--ink:#14213d;--muted:#4e5d78;--line:#dce5f0;--blue:#0f70e0;--blue-soft:#eaf4fe;--blue-dark:#0a57b3}
html,body{font-family:'Hanken Grotesk',system-ui,sans-serif}
h1,h2,h3,.btn{font-family:'Bricolage Grotesque','Hanken Grotesk',system-ui,sans-serif}
.cases,.c-reset,.top .kicker{display:none!important}
.wrap{padding-top:6px;padding-bottom:calc(28px + env(safe-area-inset-bottom,0px))}
/* the look of the lessons (style.css): the pills on their deeper edge, sinking when pressed */
.btn{border-radius:999px;min-height:54px;padding:12px 24px;font-size:16px;box-shadow:0 4px 0 var(--blue-dark);transition:transform .12s,box-shadow .12s}
.btn:hover{background:var(--blue)}
.btn:active{transform:translateY(3px);box-shadow:0 1px 0 var(--blue-dark)}
.btn[disabled]{background:var(--line);color:var(--muted);box-shadow:none;transform:none}
.btn.ghost{color:var(--blue-dark);border:2px solid var(--line);box-shadow:0 4px 0 var(--line)}
.btn.ghost:hover{background:#fff}
.btn.ghost:active{box-shadow:0 1px 0 var(--line)}
.btn.sm{min-height:44px;padding:8px 16px;border-radius:999px;box-shadow:0 3px 0 var(--blue-dark)}
.btn.ghost.sm{box-shadow:0 3px 0 var(--line)}
.nav .btn:only-child{width:100%}
/* an answer is a card on its edge, the picked one takes the blue */
.opt{border:2px solid var(--line);border-radius:18px;padding:13px 14px;box-shadow:0 4px 0 var(--line);font-weight:600}
.opt.on{border-color:var(--blue);background:var(--blue-soft);box-shadow:0 4px 0 var(--blue-dark)}
.opt .oc{font-weight:400}
.card{border:0;border-radius:20px;box-shadow:0 4px 14px rgba(20,33,61,.08)}
.sticky{box-shadow:0 6px 18px rgba(20,33,61,.12)}
.stat,.kpis div{border-radius:14px}
/* the title of a group of choices stays inside its card (a legend sits astride the top edge of its fieldset) */
.grp legend{float:left;width:100%}
.grp legend+*{clear:both}
.progress span{height:8px;border-radius:8px;background:var(--line)}
/* who speaks: the partner, as in the lessons, a face and a bubble */
.mentor{background:none;border:0;border-radius:0;padding:0;gap:10px}
.mentor .av{width:48px;height:53px;border-radius:14px;background:#fff center bottom/auto 100% no-repeat;box-shadow:inset 0 0 0 1px rgba(20,33,61,.08);color:transparent;font-size:0}
.mentor>div:last-child{flex:1;background:#fff;border-radius:4px 20px 20px 20px;padding:10px 14px 12px;box-shadow:0 4px 14px rgba(20,33,61,.08)}
.mentor b{font-size:13px;color:var(--muted)}
.mentor p{margin:2px 0 0;font-weight:600}`;

/** The typefaces of the app, for the frame: a page inside a frame does not get the ones of the page around it. */
function typefaces() {
  let css = '';
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) if (rule instanceof CSSFontFaceRule) css += rule.cssText;
    } catch {
      // a sheet from another site (the prova takes its typefaces from the web): the frame falls back on the phone's
    }
  }
  return css;
}

/** What the page keeps of a Caso (its own key in the phone's memory, «feen-p2-c1-v1», or «feen-p1-caso1-v3» for a
 *  Caso with a page of its own): cleared, so it starts new. */
function forget(floor, which) {
  try {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k?.startsWith(`feen-p${floor}-c${which}-`) || k?.startsWith(`feen-p${floor}-caso${which}-`)) localStorage.removeItem(k);
    }
  } catch {
    // no memory: the page starts new anyway
  }
}

/** The page of the team with FEEN's look, opened on Caso `which`, and a line to the app when it is completed.
 *  A page with the two Casi of a floor has `apriCaso` and its texts in `COMUNI`; a page with one Caso (floor 1) is
 *  that Caso already, with its texts in `TESTI` and `render` to write them again. */
function page(html, floor, which, partner) {
  // the partner's face behind the «M» of the pages, and the partner's name where they write «Il mentore»
  const face = partner && PEOPLE[partner] ? `.mentor .av{background-image:url(${PEOPLE[partner]})}` : '.mentor .av{background:var(--blue);color:#fff;font-size:16px;border-radius:50%;width:34px;height:34px}';
  const name = JSON.stringify(partner ?? 'Il mentore');
  const add = `<style>${THEME}${face}${typefaces()}</style>
<script>(function () {
  var foot = 'Importi e nomi sono inventati.';
  try {
    if (typeof apriCaso === 'function') { COMUNI.notaPiede = foot; COMUNI.mentore = ${name}; apriCaso(${which}, true); }
    else { TESTI.notaPiede = foot; TESTI.mentore = ${name}; render(); }
  } catch (e) {}
  var tell = function (what) { try { parent.postMessage({ feenSim: what }, '*'); } catch (e) {} };
  document.addEventListener('click', function (ev) {
    var el = ev.target.closest && ev.target.closest('[data-act="completa"]');
    if (el && !el.disabled) setTimeout(function () { tell('done'); }, 0);
    else if (ev.target.closest && ev.target.closest('button')) tell('tap');
  }, true);
  document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && !ev.defaultPrevented) tell('back'); });
  tell('ready');
})();<\/script>`;
  return html.includes('</body>') ? html.replace('</body>', `${add}</body>`) : html + add;
}

export function makeSim(api) {
  const root = document.getElementById('simula');
  let resolve = null;
  let frame = null;

  // what lies under the Caso is out of reach of the finger, the keyboard and the screen reader
  const BEHIND = ['.top', '#a11y', '#btn-back', '.bottom', '#path', '#me', '#avvio'];
  const reach = (on) =>
    BEHIND.forEach((sel) => {
      const el = document.querySelector(sel);
      if (el) el.inert = !on;
    });

  const ask = () => askLeave(root, root.querySelector('#sim-ask'), 'sim-ask-t', 'Il Caso riparte dall’inizio. L’ufficio resta com’è.');

  function finish(done) {
    if (!resolve) return;
    root.hidden = true;
    root.innerHTML = '';
    frame = null;
    document.body.classList.remove('in-lesson');
    reach(true);
    const r = resolve;
    resolve = null;
    // a Caso of the team has no right and wrong at the first go that the app can see: it is completed, or left
    r({ done, outcome: 0, fixed: false, sim: true });
  }

  root.addEventListener('click', (ev) => {
    const b = ev.target.closest('button');
    if (!b || b.disabled) return;
    api.sfx.tap();
    const act = b.dataset.act;
    if (act === 'x') return ask();
    if (act === 'stay') return stay(root.querySelector('#sim-ask'));
    if (act === 'leave') return finish(false);
  });

  window.addEventListener('message', (ev) => {
    if (!frame || ev.source !== frame.contentWindow) return;
    const what = ev.data?.feenSim;
    if (what === 'done') {
      api.sfx.tap();
      finish(true);
    } else if (what === 'tap') api.sfx.tap();
    else if (what === 'back') ask();
  });

  return {
    /** Plays Caso `which` (1 or 2) of the page `html` of floor `floor`; resolves with { done, outcome, fixed }. */
    play({ html, floor, which }, { floorName = '', tag = 'Il Caso' } = {}) {
      forget(floor, which);
      root.setAttribute('aria-label', tag);
      root.innerHTML = `<div class="lz-top">
          <button class="lz-x" data-act="x" aria-label="Esci"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg></button>
          <span class="sim-tag">${esc(tag)} · ${esc(floorName)}</span>
        </div>
        <iframe class="sim-frame" title="${esc(tag)} · ${esc(floorName)}"></iframe>
        <div class="lz-ask" id="sim-ask" hidden></div>`;
      frame = root.querySelector('iframe');
      frame.srcdoc = page(html, floor, which, api.who?.()?.partner);
      root.hidden = false;
      document.body.classList.add('in-lesson');
      reach(false);
      return new Promise((r) => (resolve = r));
    },
  };
}
