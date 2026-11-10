// FEEN · la sede — where the page runs, and the size of the text (09/11/2026, revisione UX, stanza 0).
//
// The app: the one file that scripts/build-sede.mjs makes for the phone is marked <html data-app>. There the page is
// the app a player sees: no Demo, no pretend pill, no line about «the prova». The same file opened in the browser
// (http://localhost:4321/_app/sede.html) shows exactly what the phone shows. The prova of prove/sede/ keeps its Demo.
//   ?app   the prova of prove/sede/ as the app shows it, without a build
//   ?demo  the app's file with the Demo back (for the checks that need it)
//
// The text follows the size chosen in the phone (CLAUDE.md §8, «fino a un massimo che non rompe le schermate»):
// the app passes it in (sede-screen.tsx: window.FEEN_FONT_SCALE before the page loads, window.feenFontScale(x) when it
// changes); in the browser ?fs=1.3 tries it. It grows up to FS_MAX and never shrinks under the sizes of style.css,
// which never go under 12 px. style.css uses it as --fs (text) and --fs-l (titles, which grow half as much, as on iOS).
// The page itself never zooms: two fingers stay the zoom of the building.

const q = new URLSearchParams(location.search);
const root = document.documentElement;

export const IN_APP = !q.has('demo') && (root.hasAttribute('data-app') || q.has('app'));
root.toggleAttribute('data-app', IN_APP);

/** The largest text the screens hold without breaking: iOS «extra extra extra large», the last size before the
 *  accessibility sizes. Larger sizes are capped here (what is left: 1. LAVORO/revisione-ux/stanze.md, stanza 0). */
export const FS_MAX = 1.35;

function setFontScale(x) {
  const k = Math.min(FS_MAX, Math.max(1, Number(x) || 1));
  if (root.style.getPropertyValue('--fs') === String(k)) return;
  root.style.setProperty('--fs', String(k));
  // the views that place text by measuring it (the Percorso's bubbles, the toasts) lay out again
  window.dispatchEvent(new Event('resize'));
}
window.feenFontScale = setFontScale;
setFontScale(q.get('fs') ?? window.FEEN_FONT_SCALE ?? 1);

// One tap, one action (10/11/2026, the ten testers of 1. LAVORO/revisione-ux/tester-2026-11-09/SINTESI.md). A tap that
// changes the screen often leaves the next screen's button right under the finger: «Avanti» → «Inizia il test»,
// «Verifica» → «Continua», «Vediamo il contratto» → «Firmo con un tocco», «Continua» → «Non ora». A quick second tap
// then pressed a button nobody had read: it skipped the feedback of a wrong answer, signed the contract, refused the
// reminders for good. The cure is here, once for every screen present and future, instead of a fix per button: after
// a tap is taken, the taps of the next TAP_GAP ms are dropped before any handler sees them. Fields stay out (the
// slider, the time of the reminders: dragging and then tapping «Verifica» is not a double tap), and so do clicks
// that come from the keyboard or a screen reader (detail 0), which never double.
const TAP_GAP = 450;
let lastTap = -Infinity;
addEventListener('click', (e) => {
  if (e.detail === 0 || e.target.closest?.('input, select, textarea, label')) return;
  const now = performance.now();
  if (now - lastTap < TAP_GAP) {
    e.stopImmediatePropagation();
    e.preventDefault();
    return;
  }
  lastTap = now;
}, true);
