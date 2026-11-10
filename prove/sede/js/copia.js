// FEEN · la sede — the copy of the save in a file of the app (cubotto 9.3, 10/11/2026 notte; CLAUDE.md §8).
// The progress and the first start live in the page's storage (salva.js, avvio.js). Inside the app that storage
// belongs to the web view: the phone may clear it, and it is not sure that the phone's backup carries it. So the app
// (src/screens/sede/save-copy.ts) keeps the same two entries in a file of its own, where the backup takes it, and
// hands the file back before the page starts (window.FEEN_COPIA).
// The storage stays the one that counts: it is always written first. The copy is used only when the storage comes
// back with neither entry, and then both go back in together. One entry alone is never taken from the copy: after
// «Ricomincia da capo» an old progress would come back beside the new character.
// In the browser there is no app around the page: nothing is sent, nothing is restored.
const KEYS = ['feen-progressi', 'feen-avvio'];

/** Puts the app's copy back when the storage has neither entry. True when something went back in. */
export function restoreCopy(copy, store) {
  try {
    if (!copy || typeof copy !== 'object') return false;
    if (KEYS.some((k) => store.getItem(k) != null)) return false; // the storage is alive, and it is the newer one
    let any = false;
    for (const k of KEYS) {
      if (typeof copy[k] !== 'string') continue;
      store.setItem(k, copy[k]);
      any = true;
    }
    return any;
  } catch {
    return false; // no storage at all: the page works, it only does not remember
  }
}

let timer = null;
let last = null; // the last copy sent: saving the same thing again sends nothing
function send() {
  clearTimeout(timer);
  timer = null;
  const app = window.ReactNativeWebView;
  if (!app) return;
  const copy = {};
  try {
    for (const k of KEYS) {
      const v = localStorage.getItem(k);
      if (v != null) copy[k] = v;
    }
  } catch {
    return;
  }
  // an empty storage is never sent: it would empty the copy on the one day it is needed
  if (!Object.keys(copy).length) return;
  const text = JSON.stringify({ copia: copy });
  if (text === last) return;
  last = text;
  app.postMessage(text);
}

/** After every write to the storage: the copy follows, a moment later, so a burst of writes makes one copy. */
export function copySoon() {
  if (typeof window === 'undefined' || !window.ReactNativeWebView) return;
  clearTimeout(timer);
  timer = setTimeout(send, 250);
}

if (typeof window !== 'undefined') {
  // before anything reads the storage (salva.js and avvio.js import this file, so it runs first)
  try {
    restoreCopy(window.FEEN_COPIA, localStorage);
  } catch {
    /* no storage */
  }
  // FEEN going to the background: the copy goes now, the phone may close the app without a word
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') send();
  });
  // a phone that already played before the copy existed gets its first copy at the first opening
  copySoon();
}
