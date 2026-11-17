// FEEN · la sede — the Casi of the team, played inside the app (17/11/2026: «questi file sono l'attuale verità… monta
// l'app su questi tre file»). The team writes the two Casi of a floor as one playable page, or at floor 1 as a page
// each (1. LAVORO/lezioni/sorgente/casi/, carried by sims-data.js): the first comes after lesson 3, where the Caso is,
// the second after lesson 6, where the Prova sul campo is. Each is a small simulation of its own (choices, a chart, two questions, «Completa»), so it is
// not rewritten here: the page runs as it is inside a frame, under FEEN's own bar with the X, and tells the app when
// the Caso is completed. What changes from the page of the team is only what is around the Caso: the tabs between the
// two Casi and «Ricomincia il caso» are hidden (the X starts it again, as for a lesson), the colours and the typefaces
// are FEEN's, the foot does not say «Prototipo».
// A Caso always starts from its beginning (CLAUDE.md §6: left with the X, it starts again), so what the page keeps of
// an earlier play is cleared first.

import { askLeave, stay } from './esci.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

// FEEN's colours on the names the pages use (style.css, :root), and the two typefaces
const THEME = `:root{--bg:#f4f8fd;--ink:#14213d;--muted:#4e5d78;--line:#dce5f0;--blue:#0f70e0;--blue-soft:#eaf4fe;--blue-dark:#0a57b3}
html,body{font-family:'Hanken Grotesk',system-ui,sans-serif}
h1,h2,h3,.btn{font-family:'Bricolage Grotesque','Hanken Grotesk',system-ui,sans-serif}
.cases,.c-reset,.top .kicker{display:none!important}
.wrap{padding-top:6px;padding-bottom:calc(28px + env(safe-area-inset-bottom,0px))}`;

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
function page(html, floor, which) {
  const add = `<style>${THEME}${typefaces()}</style>
<script>(function () {
  var foot = 'Importi e nomi sono inventati.';
  try {
    if (typeof apriCaso === 'function') { COMUNI.notaPiede = foot; apriCaso(${which}, true); }
    else { TESTI.notaPiede = foot; render(); }
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
      frame.srcdoc = page(html, floor, which);
      root.hidden = false;
      document.body.classList.add('in-lesson');
      reach(false);
      return new Promise((r) => (resolve = r));
    },
  };
}
