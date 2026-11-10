// FEEN · la sede — il Percorso, rifatto da capo il 10/11/2026 (l'utente: «la parte del percorso fa schifo… ripartiamo
// da capo, ignora tutto quello che sai, copiamola da Duolingo e Finanz»). Before it was a garden in 3D (28/10 – 10/11/2026,
// in the git of mobile/ until commit 258d96b).
// From Duolingo the method, all of it (2. FONTI/duolingo/ux-ui.md §5.1): a plain page on the colour of the app, that
// the finger scrolls like any page; for every floor a band across the top in the floor's colour, which stays up while
// its stages pass under it and is pushed away by the next floor's; the stages are round buttons with a thick lower edge,
// one under the other in a gentle zigzag; the one to do now has «Inizia» bobbing over it and a ring around; the ones
// still closed are grey; a touch opens a card in the floor's colour under the stage, with what it is and one button;
// the people wait in the room the zigzag leaves free, grey until you get there; the prizes stand on the way, bigger than
// the stages. From Finanz the short pill: every stage says its minutes («Inizia · 3 min»).
// From neither the look (CLAUDE.md §2): the colours are the palette of FEEN, the type is FEEN's, the icons are the
// lessons' own, the prizes are the real objects of the Ufficio, photographed from the 3D, the people are FEEN's.
// Up the page, as the building and as before (the user, 10/11/2026: «teniamola come prima dal basso verso l'alto»):
// floor 1 at the bottom, the floor in progress above it, and in every floor the stages climb from the first to the
// eighth; you scroll up towards the launch. Only the floor in progress and the floors done are shown (CLAUDE.md §7).
import * as THREE from 'three';
import { roundRect, inkOn, sfx } from './kit.js';
import { EGGS } from './eggs.js';
import { FLOORS } from './world.js';
import { ROOMS } from './office.js';
import { FIGURES } from './figures.js';

const DEG = Math.PI / 180;
const HIRES = { 2: ['Samir', 'Irene'], 5: ['Teo', 'Giada'], 8: ['Leo', 'Marta'], 10: ['Dario', 'Sofia'] };
// until the characters are drawn (the candidates, and the mentor before the choice): a pawn in their clothes and hair
const LOOKS = {
  Elizabeth: ['#34363D', '#E2C27A'],
  Leopold: ['#34363D', '#B88A55'],
  Cathie: ['#3B414E', '#6B3F2A'],
  Jordan: ['#3B414E', '#3A2A22'],
  Christine: ['#EFE7D6', '#E2E2E6'],
  Bill: ['#EFE7D6', '#8C8C8C'],
  Jane: ['#5A6236', '#5C3A28'],
  Warren: ['#5A6236', '#ECECEC'],
};
// What the partner says when touched, beside the Case (CLAUDE.md §4: «toccandolo dice frasi sul lancio, senza mai dire
// cos'è il prodotto»). The first line says where you meet, or that the Case is done; then the lines on the launch, one
// at each touch, round and round. All provisional, Claude's, to approve: 1. LAVORO/testi/frasi-del-socio.md
// (10/11/2026 notte; before, one line only, about the partner and not said by the partner).
const LAUNCH = [
  'Il lancio? Ci stiamo lavorando. Per ora resta tra soci.',
  'Dodici piani, poi il tetto. Il lancio si fa lassù.',
  'Ogni piano che chiudi è un pezzo del lancio. Questo posso dirtelo.',
  'Cosa lanciamo? Bella domanda. La risposta è sul tetto.',
];
let touches = 0; // how many times the partner was touched since FEEN opened: the lines go on from where they were
const mentorSays = (name, n, done) => () => {
  const first = done ? 'Il Caso è fatto. Il lancio si prepara un piano alla volta.' : `Ci vediamo al Caso: si decide ${n > 1 ? 'in tre' : 'insieme'}.`;
  const lines = [first, ...LAUNCH];
  return `${name ?? 'Il mentore'}: «${lines[touches++ % lines.length]}»`;
};

// ---------- the icons of the lessons (28/10/2026, after the user's try on the iPhone: «le icone vanno migliorate») ----
// Every lesson shows the icon of what it is about, on a small plate standing on its stand, instead of a painted number:
// the way says at a glance what comes, and no two stretches look the same. Drawn in a 24-unit box, like the icons of
// the interface: bold lines, no detail under the size of a finger's glance.
const line = (g, ...p) => {
  g.beginPath();
  g.moveTo(p[0], p[1]);
  for (let k = 2; k < p.length; k += 2) g.lineTo(p[k], p[k + 1]);
  g.stroke();
};
const ring = (g, x, y, r) => {
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.stroke();
};
const dot = (g, x, y, r = 1.3) => {
  g.beginPath();
  g.arc(x, y, r, 0, Math.PI * 2);
  g.fill();
};
const rrect = (g, x, y, w, h, r) => {
  roundRect(g, x, y, w, h, r);
  g.stroke();
};
const glyph = (g, t, x, y, size) => {
  g.font = `800 ${size}px "Bricolage Grotesque"`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(t, x, y);
};
const axes = (g) => line(g, 4, 3.5, 4, 20, 20.5, 20);
const ICONS = {
  banconota: (g) => (rrect(g, 2.5, 6.5, 19, 11, 1.5), ring(g, 12, 12, 3)),
  bivio: (g) => (line(g, 12, 21, 12, 13, 6, 5), line(g, 12, 13, 18, 5), line(g, 6, 9.5, 6, 5, 10.5, 5), line(g, 18, 9.5, 18, 5, 13.5, 5)),
  torta: (g) => (ring(g, 12, 12, 8.5), line(g, 12, 3.5, 12, 20.5), line(g, 12, 12, 3.9, 9.4)),
  bilancia: (g) => {
    line(g, 12, 4, 12, 20);
    line(g, 7, 20, 17, 20);
    line(g, 4, 7, 20, 7);
    for (const x of [4, 20]) {
      line(g, x - 2.5, 13, x, 7, x + 2.5, 13);
      g.beginPath();
      g.moveTo(x - 3, 13);
      g.quadraticCurveTo(x, 17, x + 3, 13);
      g.closePath();
      g.stroke();
    }
  },
  deposito: (g) => (line(g, 4, 14.5, 4, 20, 20, 20, 20, 14.5), line(g, 12, 3, 12, 15), line(g, 8, 11, 12, 15, 16, 11)),
  banca: (g) => (line(g, 3, 9, 12, 3.5, 21, 9, 3, 9), line(g, 6.5, 11.5, 6.5, 17), line(g, 12, 11.5, 12, 17), line(g, 17.5, 11.5, 17.5, 17), line(g, 3, 20, 21, 20)),
  carta: (g) => (rrect(g, 2.5, 5.5, 19, 13, 2), line(g, 2.5, 9.5, 21.5, 9.5), line(g, 5.5, 15, 10, 15)),
  gemma: (g) => (line(g, 7, 4.5, 17, 4.5, 21, 9.5, 12, 20.5, 3, 9.5, 7, 4.5), line(g, 3, 9.5, 21, 9.5), line(g, 9, 9.5, 12, 20.5, 15, 9.5)),
  telefono: (g) => (rrect(g, 6.5, 2.5, 11, 19, 2.2), line(g, 12, 6.5, 12, 11.5), dot(g, 12, 15, 1.4)),
  lucchetto: (g) => {
    rrect(g, 5, 10.5, 14, 10, 1.5);
    g.beginPath();
    g.moveTo(8, 10.5);
    g.lineTo(8, 7.5);
    g.arc(12, 7.5, 4, Math.PI, 0);
    g.lineTo(16, 10.5);
    g.stroke();
    dot(g, 12, 15.5, 1.5);
  },
  dado: (g) => (rrect(g, 4, 4, 16, 16, 3), dot(g, 8.5, 8.5, 1.6), dot(g, 12, 12, 1.6), dot(g, 15.5, 15.5, 1.6)),
  percento: (g) => (line(g, 18, 4.5, 6, 19.5), ring(g, 7.5, 7, 2.6), ring(g, 16.5, 17, 2.6)),
  cassa: (g) => (rrect(g, 3.5, 10, 17, 10.5, 1), line(g, 3, 10, 5, 5.5, 19, 5.5, 21, 10), rrect(g, 10.5, 8.5, 3, 3.5, 0.6)),
  raddoppio: (g) => glyph(g, '×2', 12, 13, 15),
  moneta: (g) => (ring(g, 12, 12, 8.5), glyph(g, '€', 12, 12.5, 11)),
  clessidra: (g) => (line(g, 6, 3.5, 18, 3.5), line(g, 6, 20.5, 18, 20.5), line(g, 7.5, 3.5, 7.5, 6, 12, 12, 7.5, 18, 7.5, 20.5), line(g, 16.5, 3.5, 16.5, 6, 12, 12, 16.5, 18, 16.5, 20.5)),
  occhio: (g) => {
    g.beginPath();
    g.moveTo(2.5, 12);
    g.quadraticCurveTo(12, 3, 21.5, 12);
    g.quadraticCurveTo(12, 21, 2.5, 12);
    g.stroke();
    ring(g, 12, 12, 3.2);
  },
  megafono: (g) => (line(g, 3.5, 9.5, 8, 9.5, 17, 4.5, 17, 19.5, 8, 14.5, 3.5, 14.5, 3.5, 9.5), line(g, 8, 9.5, 8, 14.5), line(g, 9, 14.5, 10.5, 19.5), line(g, 20, 9.5, 21.5, 8.5), line(g, 20, 14.5, 21.5, 15.5)),
  scudo: (g) => {
    g.beginPath();
    g.moveTo(12, 3);
    g.lineTo(20, 6);
    g.lineTo(20, 11.5);
    g.quadraticCurveTo(20, 18, 12, 21);
    g.quadraticCurveTo(4, 18, 4, 11.5);
    g.lineTo(4, 6);
    g.closePath();
    g.stroke();
    line(g, 8.5, 12, 11, 14.5, 15.5, 9.5);
  },
  foglia: (g) => {
    g.beginPath();
    g.moveTo(4.5, 19.5);
    g.quadraticCurveTo(4.5, 4.5, 20, 4);
    g.quadraticCurveTo(19.5, 19.5, 4.5, 19.5);
    g.stroke();
    line(g, 4.5, 19.5, 14, 10);
  },
  curva: (g) => {
    axes(g);
    g.beginPath();
    g.moveTo(5.5, 18);
    g.quadraticCurveTo(15.5, 17.5, 19.5, 4.5);
    g.stroke();
  },
  orologio: (g) => (ring(g, 12, 12, 8.5), line(g, 12, 6.5, 12, 12, 16, 14.5)),
  cassaforte: (g) => (rrect(g, 3.5, 4, 17, 15, 1.5), ring(g, 12, 11.5, 3.6), line(g, 12, 11.5, 14.2, 9.3), line(g, 6.5, 19, 6.5, 21), line(g, 17.5, 19, 17.5, 21)),
  ombrello: (g) => {
    g.beginPath();
    g.moveTo(2.5, 12);
    g.quadraticCurveTo(12, 0, 21.5, 12);
    g.closePath();
    g.stroke();
    g.beginPath();
    g.moveTo(12, 12);
    g.lineTo(12, 18.5);
    g.arc(10, 18.5, 2, 0, Math.PI);
    g.stroke();
  },
  calendario: (g) => (rrect(g, 3.5, 5, 17, 15.5, 1.5), line(g, 3.5, 9.5, 20.5, 9.5), line(g, 8, 3, 8, 7), line(g, 16, 3, 16, 7), dot(g, 8, 13.5), dot(g, 12, 13.5), dot(g, 16, 13.5), dot(g, 8, 17)),
  foglio: (g) => (line(g, 5.5, 2.5, 14, 2.5, 18.5, 7, 18.5, 21.5, 5.5, 21.5, 5.5, 2.5), line(g, 14, 2.5, 14, 7, 18.5, 7), line(g, 8.5, 11.5, 15.5, 11.5), line(g, 8.5, 15, 15.5, 15), line(g, 8.5, 18.5, 12.5, 18.5)),
  scalini: (g) => line(g, 3, 20.5, 8, 20.5, 8, 15.5, 13, 15.5, 13, 10.5, 18, 10.5, 18, 5.5, 21.5, 5.5),
  valigetta: (g) => (rrect(g, 3, 8, 18, 12.5, 1.5), line(g, 9, 8, 9, 5, 15, 5, 15, 8), line(g, 3, 13, 21, 13)),
  libro: (g) => {
    line(g, 12, 6, 12, 20);
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(12, 6);
      g.quadraticCurveTo(12 + s * 5, 3.5, 12 + s * 9.5, 5);
      g.lineTo(12 + s * 9.5, 18.5);
      g.quadraticCurveTo(12 + s * 5, 17, 12, 20);
      g.stroke();
    }
  },
  persone: (g) => {
    ring(g, 8.5, 8, 3);
    ring(g, 16.5, 9.5, 2.5);
    g.beginPath();
    g.moveTo(3, 20);
    g.quadraticCurveTo(3, 13, 8.5, 13);
    g.quadraticCurveTo(14, 13, 14, 20);
    g.moveTo(15.5, 14);
    g.quadraticCurveTo(21, 13.5, 21, 20);
    g.stroke();
  },
  aereo: (g) => (line(g, 2.5, 11.5, 21.5, 3.5, 15, 20.5, 11, 13.5, 2.5, 11.5), line(g, 11, 13.5, 21.5, 3.5)),
  tocco: (g) => {
    line(g, 2, 9, 12, 4.5, 22, 9, 12, 13.5, 2, 9);
    g.beginPath();
    g.moveTo(6.5, 11);
    g.lineTo(6.5, 16);
    g.quadraticCurveTo(12, 19.5, 17.5, 16);
    g.lineTo(17.5, 11);
    g.stroke();
    line(g, 21.5, 9, 21.5, 14.5);
  },
  carrello: (g) => (line(g, 2, 4, 5, 4, 7.5, 15, 19, 15, 21, 7.5, 6, 7.5), ring(g, 9, 19, 1.7), ring(g, 17, 19, 1.7)),
  chiave: (g) => (ring(g, 7.5, 12, 4.5), line(g, 12, 12, 21.5, 12), line(g, 17.5, 12, 17.5, 15.5), line(g, 20.5, 12, 20.5, 14.5)),
  casa: (g) => (line(g, 3, 11, 12, 3.5, 21, 11), line(g, 5.5, 9, 5.5, 20.5, 18.5, 20.5, 18.5, 9), line(g, 10, 20.5, 10, 14.5, 14, 14.5, 14, 20.5)),
  pila: (g) => (rrect(g, 4.5, 15.5, 14, 5, 2.4), rrect(g, 6, 10.2, 14, 5, 2.4), rrect(g, 5, 4.9, 14, 5, 2.4)),
  altalena: (g) => (line(g, 2.5, 8.5, 21.5, 15), line(g, 12, 12, 8.5, 20, 15.5, 20, 12, 12), line(g, 4, 3.5, 4, 6), line(g, 20, 18, 20, 20.5)),
  grafico: (g) => (axes(g), line(g, 6.5, 16, 10.5, 11.5, 14, 14, 19.5, 6.5), line(g, 15.5, 6.5, 19.5, 6.5, 19.5, 10.5)),
  zigzag: (g) => (axes(g), line(g, 6, 14, 9.5, 7.5, 13, 15, 16.5, 6, 20.5, 12)),
  cesto: (g) => {
    line(g, 2.5, 10, 21.5, 10);
    line(g, 4, 10, 6, 20, 18, 20, 20, 10);
    g.beginPath();
    g.moveTo(7, 10);
    g.quadraticCurveTo(12, 1.5, 17, 10);
    g.stroke();
    line(g, 9.5, 10, 10.3, 20);
    line(g, 14.5, 10, 13.7, 20);
  },
  frecce: (g) => (line(g, 8, 20.5, 8, 4), line(g, 4, 8, 8, 4, 12, 8), line(g, 16, 3.5, 16, 20), line(g, 12, 16, 16, 20, 20, 16)),
  sacco: (g) => {
    g.beginPath();
    g.moveTo(8.5, 4.5);
    g.lineTo(15.5, 4.5);
    g.lineTo(13.5, 8.5);
    g.quadraticCurveTo(21, 12, 20, 17.5);
    g.quadraticCurveTo(19, 21, 12, 21);
    g.quadraticCurveTo(5, 21, 4, 17.5);
    g.quadraticCurveTo(3, 12, 10.5, 8.5);
    g.closePath();
    g.stroke();
    glyph(g, '€', 12, 15.5, 8);
  },
  cartellino: (g) => (line(g, 2.5, 12, 9.5, 4.5, 21, 4.5, 21, 19.5, 9.5, 19.5, 2.5, 12), ring(g, 9, 12, 1.7)),
  cerchi: (g) => (ring(g, 8.8, 9.5, 5.5), ring(g, 15.2, 9.5, 5.5), ring(g, 12, 15, 5.5)),
  cambio: (g) => (line(g, 4, 8.5, 19.5, 8.5), line(g, 16, 5, 19.5, 8.5, 16, 12), line(g, 20, 15.5, 4.5, 15.5), line(g, 8, 12, 4.5, 15.5, 8, 19)),
  goccia: (g) => {
    g.beginPath();
    g.moveTo(12, 2.5);
    g.bezierCurveTo(16, 9, 19, 12, 19, 15);
    g.bezierCurveTo(19, 19, 15.5, 21.5, 12, 21.5);
    g.bezierCurveTo(8.5, 21.5, 5, 19, 5, 15);
    g.bezierCurveTo(5, 12, 8, 9, 12, 2.5);
    g.stroke();
  },
  esagono: (g) => {
    for (const r of [9, 4.5]) {
      g.beginPath();
      for (let k = 0; k <= 6; k++) {
        const a = -Math.PI / 2 + (k * Math.PI) / 3;
        g[k ? 'lineTo' : 'moveTo'](12 + r * Math.cos(a), 12 + r * Math.sin(a));
      }
      g.stroke();
    }
  },
  crollo: (g) => (axes(g), line(g, 6.5, 13, 10, 9, 13, 11, 15.5, 6, 19.5, 17.5), line(g, 19.5, 13.5, 19.5, 17.5, 15.5, 17.5)),
};
// the icon of each lesson without an object, floor by floor: lessons 2, 3, 4, 5, 6 (lesson 1 carries its object)
const LESSON_ICONS = {
  1: ['banconota', 'bivio', 'torta', 'bilancia', 'deposito'],
  2: ['banca', 'carta', 'gemma', 'telefono', 'lucchetto'],
  3: ['dado', 'percento', 'cassa', 'raddoppio', 'moneta'],
  4: ['clessidra', 'occhio', 'megafono', 'scudo', 'foglia'],
  5: ['curva', 'orologio', 'cassaforte', 'ombrello', 'calendario'],
  6: ['foglio', 'scalini', 'deposito', 'valigetta', 'clessidra'],
  7: ['libro', 'persone', 'aereo', 'tocco', 'calendario'],
  8: ['percento', 'carrello', 'chiave', 'casa', 'pila'],
  9: ['foglio', 'bilancia', 'banca', 'altalena', 'scudo'],
  10: ['moneta', 'grafico', 'zigzag', 'cesto', 'frecce'],
  11: ['sacco', 'cesto', 'cartellino', 'foglia', 'cerchi'],
  12: ['cambio', 'goccia', 'altalena', 'esagono', 'crollo'],
};
const iconOf = (n, lesson) => LESSON_ICONS[n]?.[lesson - 2] ?? 'foglio';

// ---------- the measures of the way (on a 390 px phone; the zigzag follows the width) ----------
const NODE = 70; // a stage: a round button, and under it its edge
const PRIZE = 84; // a stage that brings an object: bigger, as the prizes on a way you scroll
const EDGE = 7;
const PITCH = 94; // from one stage to the next
const ROOM_NEXT = 38; // more room over the stage to do now, for «Inizia»
const TOP = 34; // from the floor's band to its first stage
const BOTTOM = 40;
const fontScale = () => Number(document.documentElement.style.getPropertyValue('--fs')) || 1;

// the icons, drawn once in black and used as masks: the page gives them their colour (light and dark theme)
const maskCache = new Map();
function iconMask(name) {
  if (!maskCache.has(name)) {
    const c = document.createElement('canvas');
    c.width = c.height = 96;
    const g = c.getContext('2d');
    g.scale(96 / 32, 96 / 32);
    g.translate(4, 4);
    g.strokeStyle = g.fillStyle = '#000';
    g.lineWidth = 2.6;
    g.lineJoin = 'round';
    g.lineCap = 'round';
    (ICONS[name] ?? MORE[name] ?? ICONS.foglio)(g);
    maskCache.set(name, c.toDataURL());
  }
  return maskCache.get(name);
}
// two more, for the stages that are not lessons when they bring no object, and for the launch
const MORE = {
  dialogo: (g) => {
    roundRect(g, 2.5, 4, 13, 9.5, 3);
    g.stroke();
    roundRect(g, 8.5, 10.5, 13, 9.5, 3);
    g.stroke();
  },
  bandiera: (g) => (line(g, 6, 21, 6, 3.5), line(g, 6, 4.5, 18.5, 4.5, 15.5, 8.5, 18.5, 12.5, 6, 12.5)),
  telo: (g) => (line(g, 12, 3.5, 19.5, 18.5, 4.5, 18.5, 12, 3.5), line(g, 3, 20.5, 21, 20.5)),
};

/** The pawn of a person not drawn yet, in their clothes and hair. */
const pawn = (suit, hair) =>
  `<svg viewBox="0 0 60 96" aria-hidden="true"><ellipse cx="30" cy="90" rx="20" ry="4.5" fill="rgba(20,33,61,.12)"/><path d="M17 88c0-22 5-40 13-40s13 18 13 40z" fill="${suit}"/><circle cx="30" cy="34" r="12" fill="#E7C6A5"/><path d="M18 33a12 12 0 0 1 24 0c-4-5-9-7-12-7s-8 2-12 7z" fill="${hair}"/></svg>`;

export function makePath(api) {
  const { renderer, state, earnedOn, built, LIGHT } = api;
  const root = document.getElementById('path');
  const layer = document.getElementById('path-list');
  const sub = document.getElementById('path-sub');

  // ---------- the photos of the prizes: the real objects of the Ufficio, taken once from the 3D ----------
  const shots = new Map();
  const shotScene = new THREE.Scene();
  shotScene.add(new THREE.HemisphereLight(LIGHT.hemiSky, LIGHT.hemiGround, LIGHT.hemi * 1.1));
  const key = new THREE.DirectionalLight(LIGHT.sunCol, LIGHT.sun * 0.9);
  key.position.set(-3, 6, 7);
  const rim = new THREE.DirectionalLight('#BFD9FF', LIGHT.fill);
  rim.position.set(5, 3, 2);
  shotScene.add(key, rim);
  const shotCam = new THREE.PerspectiveCamera(24, 1, 0.05, 200);
  const SHOT = 224;
  /** A photo of `obj` on a clear ground, as a picture for the page; null if the phone cannot take it. */
  function photo(id, obj, [tilt, turn] = [0, 0]) {
    if (shots.has(id)) return shots.get(id);
    let url = null;
    try {
      const o = obj.clone(true);
      o.position.set(0, 0, 0);
      o.rotation.set(tilt, turn, 0);
      o.scale.set(1, 1, 1);
      o.traverse((m) => (m.visible = true));
      shotScene.add(o);
      o.updateMatrixWorld(true);
      const bb = new THREE.Box3().setFromObject(o);
      const sphere = bb.getBoundingSphere(new THREE.Sphere());
      const c = sphere.center;
      const dist = (sphere.radius / Math.sin((shotCam.fov / 2) * DEG)) * 0.98;
      const el = 14 * DEG;
      shotCam.position.set(c.x, c.y + Math.sin(el) * dist, c.z + Math.cos(el) * dist);
      shotCam.lookAt(c);
      shotCam.updateProjectionMatrix();
      const rt = new THREE.WebGLRenderTarget(SHOT, SHOT, { samples: 4 });
      rt.texture.colorSpace = THREE.SRGBColorSpace;
      const was = { target: renderer.getRenderTarget(), color: renderer.getClearColor(new THREE.Color()), alpha: renderer.getClearAlpha() };
      renderer.setRenderTarget(rt);
      renderer.setClearColor(0x000000, 0);
      renderer.clear();
      renderer.render(shotScene, shotCam);
      const px = new Uint8Array(SHOT * SHOT * 4);
      renderer.readRenderTargetPixels(rt, 0, 0, SHOT, SHOT, px);
      renderer.setRenderTarget(was.target);
      renderer.setClearColor(was.color, was.alpha);
      rt.dispose();
      shotScene.remove(o);
      // upside down, and with the colours of the edges multiplied by their cover: turned the right way, and back
      const cv = document.createElement('canvas');
      cv.width = cv.height = SHOT;
      const g = cv.getContext('2d');
      const img = g.createImageData(SHOT, SHOT);
      for (let y = 0; y < SHOT; y++) {
        for (let x = 0; x < SHOT; x++) {
          const s = ((SHOT - 1 - y) * SHOT + x) * 4;
          const d = (y * SHOT + x) * 4;
          const a = px[s + 3];
          const k = a > 0 && a < 255 ? 255 / a : 1;
          img.data[d] = Math.min(255, px[s] * k);
          img.data[d + 1] = Math.min(255, px[s + 1] * k);
          img.data[d + 2] = Math.min(255, px[s + 2] * k);
          img.data[d + 3] = a;
        }
      }
      g.putImageData(img, 0, 0);
      url = cv.toDataURL('image/png');
    } catch {
      url = null;
    }
    shots.set(id, url);
    return url;
  }
  const eggs = new Map(); // the surprise of each floor, made once: its answer comes from it
  const eggOf = (n) => {
    if (!eggs.has(n) && EGGS[n]) eggs.set(n, EGGS[n].make(FLOORS[n - 1].color));
    return eggs.get(n) ?? null;
  };

  // ---------- the state of the game ----------
  const stateOf = (n, i) => {
    const e = earnedOn(n);
    return i < e ? 'done' : i === e && n === state.floor ? 'next' : 'locked';
  };
  const launched = () => state.floor === FLOORS.length && earnedOn(state.floor) === 8;
  // the way is built again when a stage is done, and when the partner changes («Ricomincia da capo», a new choice)
  const signature = () => `${state.floor}:${earnedOn(state.floor)}:${api.who?.()?.partner ?? ''}:${launched()}`;
  let builtFor = '';
  let last = null; // floor and stage of the last build: the stage just opened arrives with a little jump

  const el = (tag, cls, html = '') => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html) e.innerHTML = html;
    return e;
  };
  const setColours = (e, color, deep, light) => {
    e.style.setProperty('--c', color);
    e.style.setProperty('--c-deep', deep);
    e.style.setProperty('--c-light', light);
    e.style.setProperty('--on-c', inkOn(color));
  };

  // the card under a stage, one at a time
  const pop = el('div', 'pop');
  pop.hidden = true;
  let popFor = null;

  function build() {
    closePop();
    layer.replaceChildren();
    const top = state.floor;
    const fresh = last && last.n === top && last.e + 1 === earnedOn(top);
    const count = launched() ? FLOORS.length + 1 : top;
    const parts = [];
    for (let n = 1; n <= count; n++) parts.push(n <= FLOORS.length ? floor(n, fresh) : launchFloor());
    // in the app, the floor after the one just finished may not be in the app yet (main.js, comingSoon; cubotto 7.8):
    // over the finished floor a grey card says so, honest and without a date. Floor 1 stays there to review.
    if (top < FLOORS.length && earnedOn(top) === 8 && api.soon?.(top + 1)) {
      const info = FLOORS[top];
      const card = el('div', 'pf-soon', `<span class="pf-soon-lock" aria-hidden="true"></span><span class="pf-soon-name">${info.name}</span><span class="pf-soon-note">In costruzione: la gru ci lavora, apre con il prossimo aggiornamento di FEEN.</span>`);
      card.setAttribute('role', 'note');
      setColours(card, info.color, info.deep, info.light);
      parts.push(card);
    }
    // from the bottom up: the page is read from its end, floor 1 last
    layer.append(...parts.reverse());
    last = { n: top, e: earnedOn(top) };
    builtFor = signature();
  }

  /** A floor: its band, then its eight stages in a zigzag, the people and the surprise in the room it leaves. */
  function floor(n, fresh) {
    const info = FLOORS[n - 1];
    const list = ROOMS[n].stages;
    const e = earnedOn(n);
    const sec = el('section', 'pf');
    sec.setAttribute('aria-label', info.name);
    setColours(sec, info.color, info.deep, info.light);
    const head = el(
      'header',
      'pf-head',
      `<span class="pf-label">Livello ${n}</span><span class="pf-name">${info.name}</span><span class="pf-pips" aria-label="${e} tappe fatte su 8">${[...Array(8)]
        .map((_, k) => `<i class="${k < e ? 'on' : ''}"></i>`)
        .join('')}</span>`,
    );
    sec.append(head);
    const track = el('div', 'pf-track');
    sec.append(track);
    // the zigzag: a wave across the middle, one stage in eight back in the middle; the floor above carries it on.
    // Laid out from the top of the page down, so from the eighth stage to the first: the first is at the bottom
    // wider since the evening of 10/11/2026 (the user: «dai più sinuosità alle curve del percorso»): about 100 px each side
    const swing = Math.min(112, Math.max(60, (Math.min(root.clientWidth || window.innerWidth, 560) - 32) * 0.29));
    let y = TOP;
    const at = [];
    for (const i of [7, 6, 5, 4, 3, 2, 1, 0]) {
      const st = stateOf(n, i);
      if (st === 'next') y += ROOM_NEXT * fontScale(); // «Inizia» grows with the phone's text size
      const x = -Math.sin((i * Math.PI) / 4) * swing;
      const s = list[i];
      const slot = built.get(n)?.office?.slotOf(i);
      const prize = slot ? photo(`${n}:${i}`, slot.obj, slot.place.pose) : null;
      const size = prize ? PRIZE : NODE;
      const b = el('button', `pn pn--${st}${prize ? ' pn--prize' : ''}`);
      b.style.left = `calc(50% + ${x}px)`;
      b.style.top = `${y}px`;
      b.style.setProperty('--size', `${size}px`);
      // the number of the stage, from 1 on and never back to 1: floor 1 is 1–8, floor 2 is 9–16… (the user,
      // 10/11/2026 sera: «leva le icone nelle palle e metti i numeri da 1 a infinito»); a prize keeps its object, with
      // the number in a small round badge
      const num = (n - 1) * 8 + i + 1;
      const face = el('span', 'pn-face');
      if (prize) {
        const img = el('img', 'pn-obj');
        img.src = prize;
        img.alt = '';
        img.draggable = false;
        face.append(img, el('span', 'pn-badge', String(num)));
      } else face.append(el('span', `pn-num${num > 99 ? ' long' : ''}`, String(num)));
      b.append(face);
      const soon = api.soon?.(n);
      const what = st === 'done' ? 'fatta' : st === 'next' ? (soon ? 'in arrivo con il prossimo aggiornamento' : 'da fare adesso') : 'non ancora aperta';
      b.setAttribute('aria-label', `Tappa ${num}, ${s.tag}: ${s.title}, ${what}${s.object ? `. Porta ${s.object.toLowerCase()}` : ''}`);
      b.setAttribute('aria-expanded', 'false');
      const below = y + size + EDGE; // read now: `y` goes on growing with the stages after this one
      b.onclick = (ev) => {
        ev.stopPropagation();
        tapStage(b, n, i, st, x, below);
      };
      if (fresh && n === state.floor) {
        if (st === 'next') b.classList.add('arrive');
        if (i === earnedOn(n) - 1) b.classList.add('won');
      }
      track.append(b);
      // «Inizia» over the stage to do now: it starts it at once (a touch on the stage opens its card)
      if (st === 'next') {
        const go = el('button', 'pn-start', soon ? 'In arrivo' : 'Inizia');
        go.style.left = `calc(50% + ${x}px)`;
        go.style.top = `${y - 12}px`;
        go.setAttribute('aria-label', `${s.tag}: ${s.title}. ${soon ? 'In arrivo con il prossimo aggiornamento' : 'Inizia, 3 minuti'}`);
        go.onclick = (ev) => {
          ev.stopPropagation();
          start(n);
        };
        track.append(go);
      }
      at[i] = { x, y, size };
      y += PITCH + (size - NODE);
    }
    track.style.height = `${y - PITCH + NODE + EDGE + BOTTOM}px`;

    // the partner waits beside the Case, on the side the zigzag leaves free (CLAUDE.md §7), grey until you get there
    const caso = at[3];
    const who = api.who?.();
    const partner = who?.partner ?? null;
    const reached = e >= 3;
    const says = mentorSays(partner, n, e > 3);
    const fig = person(partner, reached, says, who?.partnerWord ?? 'il mentore', true);
    fig.style.left = `calc(50% + ${swing * 0.92}px)`;
    fig.style.top = `${caso.y + caso.size + EDGE}px`;
    track.append(fig);
    // the two candidates of an interview, beside the first stage of their floor
    const hire = HIRES[n];
    if (hire) {
      const say = `Il colloquio: prima della prima lezione scegli tra ${hire[0]} e ${hire[1]}.`;
      hire.forEach((name, k) => {
        const p = person(name, true, say, `il colloquio, ${info.name}`, false, info.color, k ? '#C9A06A' : '#3B2A22');
        p.classList.add('pfig--small');
        p.style.left = `calc(50% + ${swing * (0.78 + k * 0.5)}px)`;
        p.style.top = `${at[0].y + at[0].size + EDGE - 6}px`;
        track.append(p);
      });
    }
    // the floor's surprise, on the other side (eggs.js): it answers when touched
    const egg = eggOf(n);
    const pic = egg ? photo(`egg${n}`, egg.g, [0, 0.45]) : null;
    if (egg && pic) {
      const b = el('button', `pegg${e >= 5 ? '' : ' off'}`);
      const img = el('img');
      img.src = pic;
      img.alt = '';
      img.draggable = false;
      b.append(img);
      b.style.left = `calc(50% - ${swing * 0.95}px)`;
      b.style.top = `${(at[5].y + at[6].y) / 2 + NODE + EDGE}px`;
      b.setAttribute('aria-label', 'Una sorpresa');
      b.onclick = (ev) => {
        ev.stopPropagation();
        tapEgg(b, n, egg);
      };
      track.append(b);
    }
    return sec;
  }

  /** After the last floor: the launch, on the roof. The product stays covered (CLAUDE.md §3). */
  function launchFloor() {
    const sec = el('section', 'pf pf--launch');
    setColours(sec, '#FFC93C', '#654A00', '#FFF5DC');
    sec.append(el('header', 'pf-head', '<span class="pf-label">Il tetto</span><span class="pf-name">Il lancio</span>'));
    const track = el('div', 'pf-track');
    const b = el('button', 'pn pn--done pn--launch');
    b.style.left = '50%';
    b.style.top = `${TOP}px`;
    b.style.setProperty('--size', `${PRIZE}px`);
    const face = el('span', 'pn-face');
    const m = el('span', 'pn-icon');
    m.style.setProperty('--icon', `url(${iconMask('telo')})`);
    face.append(m);
    b.append(face);
    b.setAttribute('aria-label', 'Il lancio, sul tetto');
    b.onclick = (ev) => {
      ev.stopPropagation();
      sfx.tap();
      api.trophy?.('telo');
      api.toast(api.roofSays);
    };
    track.append(b);
    track.style.height = `${TOP + PRIZE + EDGE + BOTTOM}px`;
    sec.append(track);
    return sec;
  }

  /** A person beside the way: drawn if there is a drawing, a pawn if not; grey until you get there. */
  function person(name, reached, say, role, mentor, suit, hair) {
    const b = el('button', `pfig${reached ? '' : ' off'}`);
    if (name && FIGURES[name]) {
      const img = el('img');
      img.src = FIGURES[name];
      img.alt = '';
      img.draggable = false;
      b.append(img);
    } else {
      const [s, h] = suit ? [suit, hair] : (LOOKS[name] ?? ['#2F3A4A', '#5A3A2A']);
      b.innerHTML = pawn(s, h);
    }
    b.setAttribute('aria-label', `${name ?? 'Il mentore'}, ${role}`);
    b.onclick = (ev) => {
      ev.stopPropagation();
      if (state.busy) return;
      sfx.tap();
      if (mentor) api.trophy?.('mentore');
      api.toast(typeof say === 'function' ? say() : say); // the partner has more than one line (mentorSays)
    };
    return b;
  }

  // ---------- the touches ----------
  function start(n) {
    if (state.busy) return;
    closePop();
    if (api.soon?.(n)) return api.toast(`Questo piano è in costruzione: apre con il prossimo aggiornamento di FEEN.`);
    api.play();
  }

  /** A stage: its card opens under it, in the floor's colour, with one button (a second touch closes it). */
  function tapStage(b, n, i, st, x, below) {
    if (state.busy) return;
    sfx.tap();
    if (popFor === b) return closePop();
    closePop();
    const s = ROOMS[n].stages[i];
    const list = ROOMS[n].stages;
    pop.className = `pop pop--${st}`;
    pop.style.top = `${below + 14}px`;
    pop.style.setProperty('--tip', `${x}px`);
    pop.innerHTML = `<span class="pop-tag">${s.tag}</span><span class="pop-title">${s.title}</span>`;
    if (st === 'locked') {
      const before = list[i - 1]?.title;
      pop.append(el('span', 'pop-note', before ? `Si apre dopo «${before}».`.replace('««', '«').replace('»»', '»') : 'Si apre con il piano.'));
    } else {
      const go = el('button', 'pop-go');
      if (st === 'next') {
        go.textContent = api.soon?.(n) ? 'In arrivo' : 'Inizia · 3 min';
        go.onclick = (ev) => {
          ev.stopPropagation();
          start(n);
        };
      } else {
        const again = api.canReview?.(n, i);
        go.textContent = again ? 'Ripassa · 2 min' : 'Guarda la scheda';
        go.onclick = (ev) => {
          ev.stopPropagation();
          if (state.busy) return;
          closePop();
          if (again) api.review(n, i);
          else api.openStage(n, i);
        };
      }
      pop.append(go);
    }
    pop.hidden = false;
    b.closest('.pf-track').append(pop);
    b.setAttribute('aria-expanded', 'true');
    popFor = b;
    // the card stays whole on the screen: if it falls under the bar, the page moves up to show it
    requestAnimationFrame(() => {
      const r = pop.getBoundingClientRect();
      const bar = document.querySelector('.tabs')?.getBoundingClientRect().top || window.innerHeight;
      const over = r.bottom + 16 - bar;
      if (over > 0) root.scrollBy({ top: over, behavior: calm() ? 'auto' : 'smooth' });
      pop.querySelector('button')?.focus({ preventScroll: true });
    });
  }
  function closePop() {
    if (!popFor) return;
    popFor.setAttribute('aria-expanded', 'false');
    popFor = null;
    pop.hidden = true;
    pop.remove();
  }
  root.addEventListener('click', (ev) => {
    if (!ev.target.closest('.pop')) closePop();
  });

  function tapEgg(b, n, egg) {
    if (state.busy || b.classList.contains('shake')) return;
    const r = egg.react();
    sfx.tap();
    if (r.roll || r.plink) setTimeout(() => sfx.land(), (r.plink ?? 0.85) * 1000);
    b.classList.add('shake');
    setTimeout(() => b.classList.remove('shake'), 700);
    api.toast(r.say);
    api.trophy?.('egg', n);
    if (r.roll === 6) setTimeout(() => api.trophy?.('sei'), 1000);
  }
  const calm = () => document.documentElement.hasAttribute('data-calm') || matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- what main.js calls ----------
  function render() {
    if (signature() !== builtFor) build();
    const info = FLOORS[state.floor - 1];
    sub.textContent = `${info.name} · ${earnedOn(state.floor)} di 8`;
  }
  /** The stage to do now, a little over the middle of the screen; at the end of the way, its last stage. */
  function scrollToNext() {
    const b = layer.querySelector('.pn--next') ?? [...layer.querySelectorAll('.pn')].pop();
    if (!b) return;
    const r = b.getBoundingClientRect();
    const box = root.getBoundingClientRect();
    root.scrollTop += r.top - box.top - root.clientHeight * 0.46;
  }
  window.addEventListener('resize', () => {
    builtFor = '';
    if (!root.hidden) render();
  });
  return { render, scrollToNext, step: () => {}, rebuild: () => (builtFor = '') };
}
