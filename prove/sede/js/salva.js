// FEEN · la sede — the progress kept on the phone (compiti D1–D2, 07/11/2026; CLAUDE.md §8): the floor and the stages
// done, how each stage went, the exercises got wrong (for the review, C5), the surprises found, the objects looked
// at, the trophies, the settings. Nothing leaves the phone: it lives in the page's storage, and with it in the
// phone's backup. The first start keeps its own key (avvio.js, «feen-avvio»). Inside the app a copy of both is kept in
// a file of the app as well (copia.js, cubotto 9.3, 10/11/2026).
import { copySoon } from './copia.js';

const KEY = 'feen-progressi';
const VERSION = 1;

/** What is saved: null on a phone that never saved, { broken: true } when it cannot be read. */
export function loadProgress() {
  let raw = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return null; // no storage at all (a private window): the prova works, it only does not remember
  }
  if (raw == null) return null;
  try {
    const d = JSON.parse(raw);
    const fine = d && d.v === VERSION && Number.isInteger(d.floor) && d.floor >= 1 && Number.isInteger(d.earned) && d.earned >= 0 && d.earned <= 8;
    return fine ? d : { broken: true };
  } catch {
    return { broken: true };
  }
}

export function saveProgress(d) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ v: VERSION, ...d }));
    copySoon(); // the app's file follows (copia.js)
    return true;
  } catch {
    return false;
  }
}

/** «Riparti da capo» after a broken save: the broken copy is set aside, never thrown away without a trace. */
export function dropProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw != null) localStorage.setItem(`${KEY}-rotto`, raw);
    localStorage.removeItem(KEY);
    copySoon();
  } catch {
    /* nothing to drop */
  }
}

/** The dialog of a save that cannot be read (D2): first «Riprova», then «Riparti da capo» with an honest confirm. */
export function askBroken() {
  return new Promise((resolve) => {
    const box = document.getElementById('rotto');
    const draw = (sure) => {
      box.innerHTML = `<div class="lz-ask-card" role="alertdialog" aria-modal="true" aria-labelledby="rotto-t">
        <h3 id="rotto-t" tabindex="-1">${sure ? 'Ripartire da capo?' : 'Non riesco a leggere i tuoi progressi'}</h3>
        <p>${
          sure
            ? 'Il palazzo torna al piano 1, con le tappe, gli oggetti e i traguardi da rifare. Il tuo personaggio e il contrattino restano.'
            : 'Può capitare dopo un aggiornamento o se il telefono era pieno. Riprova: spesso basta.'
        }</p>
        <div class="lz-sheet-acts">${
          sure
            ? '<button class="pill pill-light" data-r="back">Torna indietro</button><button class="pill pill-light" data-r="wipe">Riparti da capo</button>'
            : '<button class="pill pill-light" data-r="sure">Riparti da capo</button><button class="pill pill-dark" data-r="retry">Riprova</button>'
        }</div>
      </div>`;
      box.hidden = false;
      box.querySelector('h3').focus({ preventScroll: true });
    };
    box.onclick = (e) => {
      const r = e.target.closest('[data-r]')?.dataset.r;
      if (r === 'sure') draw(true);
      if (r === 'back') draw(false);
      if (r === 'retry') location.reload();
      if (r === 'wipe') {
        dropProgress();
        box.hidden = true;
        box.innerHTML = '';
        resolve();
      }
    };
    draw(false);
  });
}
