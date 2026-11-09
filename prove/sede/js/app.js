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
