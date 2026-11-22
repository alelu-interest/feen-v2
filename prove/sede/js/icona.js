// FEEN · la sede — the icon of the app (22/11/2026, the user: «il logo dell'app … flat white, tutto bianco. E … a
// seguito del test … diventa una delle 8 facce di chi scegli. Tipo Duolingo»). White until the test; with «Gioco con
// …» it becomes the face of that character (avvio.js); «Ricomincia da capo» brings the white one back (avvio.js
// restart); the Tu has the switch (me.js).
//
// Only the app can change it: the page asks, the phone does it (sede-screen.tsx, app-icon.ts, the plugin
// expo-alternate-app-icons in app.json). The phone is also the one that remembers it: the app tells the page which
// icon it has before the page loads (window.FEEN_ICON), so nothing about the icon is saved here, and after a backup
// on a new phone the switch shows the white icon the phone really has. In the browser and on Vercel nothing changes.
// Apple's rule (App Store Review Guidelines 4.6): every change comes from a touch of the player, and the app has a way
// back to the first icon. iOS says each change itself, in its own box («Hai cambiato l'icona di "FEEN"»).
import { ICONS } from './icone-data.js';

export { ICONS };

const app = () => window.ReactNativeWebView;

/** True when this page is inside the app and the phone can change its icon. */
export const canIcon = () => !!app() && window.FEEN_ICON_OK === true;

let now = (typeof window !== 'undefined' && window.FEEN_ICON) || null;
let heard = null;

/** The icon the phone has: null for the white one, or the name of a character. */
export const iconNow = () => now;

/** Asks the phone for the face of `name` (a character of the test), or for the white icon with null. */
export function setIcon(name) {
  const want = name && ICONS[name] ? name : null;
  if (!canIcon() || want === now) return;
  now = want;
  app().postMessage(JSON.stringify({ icona: want }));
}

/** Called with the icon the phone ends up with (the Tu's switch follows it). */
export const onIcon = (fn) => (heard = fn);

// the app answers once it has tried: the icon it has, or will have on Android when FEEN goes to the background
window.feenIcona = (name) => {
  now = name || null;
  heard?.(now);
};
