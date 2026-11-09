// FEEN · la sede — the reminders (cubotto 9.4, 09/11/2026; CLAUDE.md §8). The page knows what to remind and when;
// the app around it (src/screens/sede/sede-screen.tsx) asks the phone's permission and schedules the notifications.
// The rules: one a day at most, at the time chosen; none on a day when a stage is already done; the permission asked
// only after the first lesson (the first start's «Attiva i promemoria», or the switch in the Tu turned on); checked and
// scheduled again at every opening, because the phone's backup brings back the page but not the notifications.
// In the browser there is no app around the page: nothing is sent, and everything else works as before.

// provisional, written by Claude on 09/11/2026: the text of the reminders is the user's to write (CLAUDE.md §8)
const TEXT = { title: 'FEEN', body: 'Tre minuti per la prossima tappa, quando ti va.' };

const app = () => window.ReactNativeWebView;
/** True inside the app, where the phone can really remind. */
export const canRemind = () => !!app();

/** Today on the phone's calendar, as 2026-11-09. */
export function todayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// what is kept with the progress (main.js, persist and restore): the time chosen and the day of the last stage done
const kept = { ora: '18:00', day: null };
export const reminders = {
  save: () => ({ ...kept }),
  load(d) {
    if (/^\d{2}:\d{2}$/.test(d?.ora ?? '')) kept.ora = d.ora;
    kept.day = typeof d?.day === 'string' ? d.day : null;
  },
  get time() {
    return kept.ora;
  },
  set time(t) {
    if (/^\d{2}:\d{2}$/.test(t)) kept.ora = t;
  },
  /** A stage was done today: today's reminder does not come. */
  stageDone() {
    kept.day = todayKey();
  },
};

let sent = ''; // the last plan sent, so that saving the progress again and again sends nothing new
let lastOn; // the switch as it was at the last sync: turned on from off, the phone asks its permission
let answer = null; // waiting for the phone's answer to a permission request

/** Tells the app what to schedule. `ask` (or the switch just turned on) lets the phone ask its permission.
 *  Resolves with { granted, canAskAgain } after a permission request, null otherwise (and always in the browser). */
export function syncReminders(on, { ask = false, force = false } = {}) {
  on = !!on;
  ask = on && (ask || lastOn === false);
  lastOn = on;
  if (!app()) return Promise.resolve(null);
  const plan = { on, time: kept.ora, skipToday: kept.day === todayKey(), ...TEXT };
  const key = JSON.stringify({ ...plan, today: todayKey() });
  if (!ask && !force && key === sent) return Promise.resolve(null);
  sent = key;
  app().postMessage(JSON.stringify({ avvisi: { ...plan, ask } }));
  if (!ask) return Promise.resolve(null);
  answer?.(null);
  return new Promise((resolve) => (answer = resolve));
}

// the app answers here after asking the permission, and calls feenAvvisiSync when FEEN comes back to the front
window.feenAvvisiRisposta = (r) => {
  const a = answer;
  answer = null;
  a?.(r && typeof r === 'object' ? { granted: !!r.granted, canAskAgain: r.canAskAgain !== false } : null);
};
