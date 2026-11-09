// FEEN · la sede — i traguardi a sorpresa (28/10/2026, richiesta dell'utente dopo la prova sull'iPhone: «raggrupperei
// i traguardi e farei tipo i traguardi di FIFA», con l'esempio del Gaming finito senza errori: «cosa nascondi sotto?»).
// Next to the diary of the Tu, a set of trophies with a name and a line of their own, as in a football game: some you
// can see from the start with what earns them, three stay secret until you find them. No counters, no percentages, no
// dates, nothing lost if you stop. The names never say «he» or «she» about whoever plays (CLAUDE.md §8): the user's
// «Il baro» becomes «Asso nella manica», with the user's line.
import { FLOORS } from './world.js';
import { inkOn } from './kit.js';

const tint = (n) => FLOORS[n - 1].color;
export const TROPHIES = [
  { id: 'asso', name: 'Asso nella manica', color: tint(3), how: 'Finisci il Gaming senza un errore.', line: 'Il Gaming senza sbagliare niente. Cosa nascondi lì sotto?' },
  { id: 'pin', name: 'PIN di ferro', color: tint(2), how: 'Finisci la Tesoreria senza un errore.', line: 'La Tesoreria senza un errore: il codice non lo dai nemmeno a te.' },
  { id: 'scudo', name: 'Scudo anti-sconto', color: tint(4), how: 'Finisci il Marketing senza un errore.', line: 'Il Marketing senza un errore: con te il «-70%» non attacca.' },
  { id: 'riprovi', name: 'Capita anche ai migliori', how: 'Sbaglia una risposta e rifalla giusta al «Ci riprovi».', line: 'Hai sbagliato e al «Ci riprovi» l’hai fatta giusta. Il mentore l’aveva detto.' },
  { id: 'ripasso', name: 'Seconda occhiata', how: 'Ripassa una tappa già fatta.', line: 'Hai ripassato una tappa già fatta. Chi ripassa, ricorda.' },
  { id: 'visita', name: 'Visita guidata', how: 'Apri le schede dei tre oggetti di un piano.', line: 'Hai guardato da vicino tutti e tre gli oggetti di un piano.' },
  { id: 'lente', name: 'Lente d’ingrandimento', how: 'Ingrandisci una stanza fino in fondo, con due dita.', line: 'Fino all’ultimo dettaglio. Come si leggono le commissioni.' },
  { id: 'luci', name: 'Luci accese', how: 'Finisci una tappa di sera, con la sede illuminata.', line: 'Una tappa finita con le luci della sede accese.' },
  { id: 'ficcanaso', name: 'Ficcanaso', how: 'Tocca una sorpresa nel giardino del Percorso.', line: 'Hai toccato quello che nessuno tocca. Il giardino ha altri segreti.' },
  { id: 'giardino', name: 'Pollice verde', how: 'Trova la sorpresa del giardino di ogni piano.', line: 'Le sorprese di tutti e dodici i piani: il giardino non ha più segreti.' },
  { id: 'sei', secret: true, name: 'Sei!', line: 'Dal dado del Gaming è uscito 6. Non vuol dire niente: il prossimo tiro non lo sa.' },
  { id: 'mentore', secret: true, name: 'Un passo avanti', line: 'Hai cercato il mentore nel Percorso. Ti aspettava già.' },
  { id: 'telo', secret: true, name: 'Bel tentativo', line: 'Hai provato a sbirciare sotto il telo. Il prodotto resta un segreto.' },
];

// the emblem of each trophy, in the 24-unit box of the interface icons
const ICON = {
  asso: '<rect x="6" y="3" width="12" height="18" rx="2"/><path d="M9.5 15.5L12 8l2.5 7.5M10.3 13h3.4"/>',
  pin: '<rect x="5" y="10.5" width="14" height="10" rx="1.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/><circle cx="12" cy="15.5" r="1" fill="currentColor"/>',
  scudo: '<path d="M12 3l8 3v5.5c0 6.5-8 9.5-8 9.5s-8-3-8-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  riprovi: '<path d="M19 12a7 7 0 1 1-2.05-4.95"/><path d="M19 4v4h-4"/>',
  ripasso: '<path d="M12 6.5v13.5M12 6.5C9 4.5 6 4.5 2.5 5.5V19c3.5-1 6.5-1 9.5 1M12 6.5c3-2 6-2 9.5-1V19c-3.5-1-6.5-1-9.5 1"/>',
  visita: '<path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z"/><circle cx="12" cy="12" r="3"/>',
  lente: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
  luci: '<path d="M9.5 18h5M10.5 21h3M12 3a6 6 0 0 0-3.5 10.9V16h7v-2.1A6 6 0 0 0 12 3z"/>',
  ficcanaso: '<path d="M12 21v-5"/><path d="M12 3l6 7.5h-2.8L19 16H5l3.8-5.5H6z"/>',
  giardino: '<path d="M12 21V11"/><path d="M12 11c0-4 3-6 7-6 0 4-3 6-7 6zM12 13.5c0-3-2.5-5-6-5 0 3 2.5 5 6 5z"/>',
  sei: '<rect x="4" y="4" width="16" height="16" rx="3"/><g fill="currentColor" stroke="none"><circle cx="9" cy="8.5" r="1.3"/><circle cx="15" cy="8.5" r="1.3"/><circle cx="9" cy="12" r="1.3"/><circle cx="15" cy="12" r="1.3"/><circle cx="9" cy="15.5" r="1.3"/><circle cx="15" cy="15.5" r="1.3"/></g>',
  mentore: '<circle cx="12" cy="7" r="3"/><path d="M7 21h10M9 21l1.5-9h3L15 21"/>',
  telo: '<path d="M12 4l6.5 14h-13z"/><path d="M4 21h16"/>',
  segreto: '<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5v.7"/><circle cx="12" cy="16.8" r="1" fill="currentColor" stroke="none"/>',
};
export const emblem = (id) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICON[id]}</svg>`;

/** What has been earned, and the little banner that says so. Kept on the phone with the progress (salva.js, D1):
 *  `restore` puts back what was earned before, without the banner. */
export function makeTrophies({ sfx, onChange }) {
  const got = new Set();
  const pop = document.getElementById('trophy-pop');
  const queue = [];
  let showing = false;
  function next() {
    const t = queue.shift();
    if (!t) return (showing = false);
    showing = true;
    pop.style.setProperty('--c', t.color ?? 'var(--achievement)');
    pop.style.setProperty('--on-c', t.color ? inkOn(t.color) : '#ffffff'); // the icon reads on the light floors too
    pop.innerHTML = `<span class="trophy-emblem">${emblem(t.id)}</span><span><span class="trophy-pop-tag">Traguardo</span><b>${t.name}</b></span>`;
    pop.hidden = false;
    pop.classList.remove('in');
    void pop.offsetWidth;
    pop.classList.add('in');
    sfx.reward();
    setTimeout(() => {
      pop.classList.remove('in');
      setTimeout(() => {
        pop.hidden = true;
        next();
      }, 300);
    }, 2800);
  }
  function earn(id) {
    const t = TROPHIES.find((x) => x.id === id);
    if (!t || got.has(id)) return;
    got.add(id);
    queue.push(t);
    if (!showing) next();
    onChange?.();
  }
  return {
    earn,
    has: (id) => got.has(id),
    reset: () => got.clear(),
    list: () => [...got],
    restore: (ids = []) => ids.forEach((id) => TROPHIES.some((t) => t.id === id) && got.add(id)),
  };
}
