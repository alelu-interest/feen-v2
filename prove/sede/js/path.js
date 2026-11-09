// FEEN · la sede — il Percorso, il giardino della sede (28/10/2026, strada A scelta dall'utente fra tre schizzi,
// `1. LAVORO/percorso/schizzi/`; prima era un sentiero piatto a tasselli, bocciato lo stesso giorno).
// The path climbs through the garden of the sede, in 3D like the Ufficio and seen from above at a fixed angle: every
// floor is a terrace of lawn, one step higher than the one before, with the white slab and the band in the floor's
// colour on its front, like the floors of the building, and the floor's plate on it. The 8 stages are the white stands
// of the Ufficio, square-edged and turned like diamonds, their number painted on top; the stages done take the floor's
// colour, the one to do now stands taller on a soft light. The three stages that bring an object carry the real
// object, grey until it is yours. The mentor waits beside the Case, the two candidates of an interview beside the first
// stage of their floor. Trees, hedges, lamps and benches of the sede line the way. Only the floor in progress and the
// floors done are built (CLAUDE.md §7); above them the lawn simply goes on, with no veil (30/10/2026). The finger
// drags the garden up and down.
import * as THREE from 'three';
import { C, mat, box, canvasTexture, roundRect, inkOn, sfx } from './kit.js';
import { EGGS } from './eggs.js';
import { FLOORS, signTexture, lightPool, tree, hedge, bench } from './world.js';
import { ROOMS } from './office.js';

const DEG = Math.PI / 180;
const EL = 35 * DEG; // the camera looks down at 35°, from the front
const L = 22; // a floor's stretch of garden, from its wall to the next
const H = 0.7; // how much higher each terrace is than the one before
const FIRST = 2.2; // from a floor's wall to its first stage
const GAP = 2.5; // from one stage to the next
const X = [-1.15, 0.7, 1.65, 0.2, -1.4, -0.2, 1.45, 0]; // where each stage stands across the garden
const SIDE = 0.9; // the stand's side
const TALL = 0.34;
const NEXT_TALL = 0.5;
const PAWN_H = 0.92; // the top of a pawn's head, where its name stands
// the interviews (CLAUDE.md §4): the two candidates, beside the first stage of these floors
const HIRES = { 2: ['Samir', 'Irene'], 5: ['Teo', 'Giada'], 8: ['Leo', 'Marta'], 10: ['Dario', 'Sofia'] };
// the mentor is the version of your type you did not choose (CLAUDE.md §4): the pawn takes their name and their
// clothes and hair (1. LAVORO/personaggi/: the two versions of a type wear the same clothes); before the choice, a
// plain pawn. On floor 1 there is no colleague yet: only you and the mentor.
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
// once the Case is done the mentor no longer waits for it (provisional lines, Claude's: the mentor's lines are the
// user's to write, CLAUDE.md §11)
const mentorSays = (name, n, done) =>
  done
    ? `${name ?? 'Il mentore'}: il Caso è fatto. Il lancio si prepara un piano alla volta.`
    : `${name ?? 'Il mentore'} ti aspetta al Caso: si decide insieme${n > 1 ? ', con il collega del piano' : ''}.`;

const wallZ = (n) => -(n - 1) * L; // the front of terrace n
const ground = (n) => n * H; // the lawn of terrace n
const stageS = (n, i) => (n - 1) * L + FIRST + i * GAP;
const camY = (s) => H * (1 + s / L); // the height the camera follows: smooth, while the terraces step

// ---------- textures ----------
/** Mown lawn: long bands across the garden, in the two greens of the sede's lawn. */
const lawnTex = canvasTexture(
  64,
  256,
  (g, w, h) => {
    g.fillStyle = C.grassB;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#B6D79E';
    g.fillRect(0, 0, w, h / 2);
    for (let i = 0; i < 40; i++) {
      g.fillStyle = i % 2 ? 'rgba(70,110,50,0.06)' : 'rgba(255,255,240,0.07)';
      g.fillRect(Math.random() * w, Math.random() * h, 3 + Math.random() * 4, 2 + Math.random() * 3);
    }
  },
  { repeat: [6, 90] },
);
const lawnFront = lawnTex.clone();
lawnFront.repeat.set(6, 13.5);
lawnFront.needsUpdate = true;
const signCache = new Map();
const sign = (info) => {
  if (!signCache.has(info.n)) signCache.set(info.n, signTexture(info));
  return signCache.get(info.n);
};
/** A soft round light, for the stage to do now. */
const haloTex = canvasTexture(128, 128, (g, w, h) => {
  const r = g.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
  r.addColorStop(0, 'rgba(255,255,255,0.95)');
  r.addColorStop(0.45, 'rgba(255,255,255,0.4)');
  r.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = r;
  g.fillRect(0, 0, w, h);
});
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
const plateCache = new Map();
/** The face of a lesson's plate: its icon in `ink` on `bg`. */
function plateTex(icon, bg, ink) {
  const key = icon + bg + ink;
  if (!plateCache.has(key)) {
    plateCache.set(
      key,
      canvasTexture(256, 256, (g, w) => {
        g.fillStyle = bg;
        g.fillRect(0, 0, w, w);
        g.scale(w / 32, w / 32);
        g.translate(4, 4);
        g.strokeStyle = g.fillStyle = ink;
        g.lineWidth = 2.4;
        g.lineJoin = 'round';
        g.lineCap = 'round';
        ICONS[icon](g);
      }),
    );
  }
  return plateCache.get(key);
}
const plateMats = new Set(); // the faces of the plates, lit in the evening
const PLATE = 0.54; // the side of a lesson's plate
const LEAN = 0.5; // it leans back, so its face looks up at the camera
/** A lesson's plate, standing on its stand and leaning back: square-edged like the stands, its icon on the front,
 *  drawn in the deep colour of the floor's palette, the one made for lines on a light ground. */
function iconPlate(icon, st, deep) {
  const bg = st === 'locked' ? '#EFE9DF' : '#FBF8F3';
  const ink = st === 'locked' ? '#B5AEA3' : deep;
  const side = mat(st === 'locked' ? '#E4DDD2' : '#EFE8DD', { roughness: 0.7 });
  // in the evening the face glows a little, like the stands, so that the icon always reads
  const tex = plateTex(icon, bg, ink);
  const face = new THREE.MeshStandardMaterial({ map: tex, emissive: '#ffffff', emissiveMap: tex, emissiveIntensity: 0, roughness: 0.7 });
  plateMats.add(face);
  const s = st === 'next' ? PLATE * 1.12 : PLATE;
  const m = new THREE.Mesh(new THREE.BoxGeometry(s, s, 0.06), [side, side, side, side, face, side]);
  m.position.set(0, s / 2, 0);
  m.castShadow = true;
  const g = new THREE.Group();
  g.add(m);
  g.rotation.x = -LEAN;
  g.userData.height = s * Math.cos(LEAN);
  return g;
}

// ---------- the pieces of the garden ----------
const greyCache = new Map();
/** Grey, until it is yours: the same object, its colours turned to a light warm grey. */
function grey(m) {
  if (!greyCache.has(m.uuid)) {
    const c = m.color ? m.color.clone() : new THREE.Color('#cccccc');
    const l = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
    const g = new THREE.Color('#E4DED4').multiplyScalar(0.72 + 0.32 * Math.min(1, l * 1.4));
    greyCache.set(m.uuid, new THREE.MeshStandardMaterial({ color: g, roughness: 0.8, transparent: m.transparent, opacity: m.opacity }));
  }
  return greyCache.get(m.uuid);
}

// the stands have materials of their own, which glow a little in the evening: the stages always read
const standMats = new Map();
const standMat = (color) => {
  if (!standMats.has(color)) standMats.set(color, new THREE.MeshStandardMaterial({ color, roughness: 0.62, emissive: color, emissiveIntensity: 0 }));
  return standMats.get(color);
};
/** The white stand of the Ufficio, on its stone foot, turned like a diamond. */
function stand(color, tall) {
  const g = new THREE.Group();
  const foot = box(SIDE * 0.86, 0.08, SIDE * 0.86, '#D9CFC0');
  const body = box(SIDE, tall, SIDE, standMat(color), { at: [0, 0.08, 0] });
  foot.rotation.y = body.rotation.y = Math.PI / 4;
  g.add(foot, body);
  return g;
}

/** A person of the path, until the characters are drawn: a pawn of a board game, its body in the colour of their
 *  clothes, a head and a cap of hair. Grey until you reach them. */
function person(suit, hair, reached) {
  const g = new THREE.Group();
  const m = (c) => (reached ? mat(c, { roughness: 0.7 }) : mat('#D5CEC3', { roughness: 0.85 }));
  const part = (geo, c, y) => {
    const o = new THREE.Mesh(geo, m(c));
    o.position.y = y;
    o.castShadow = true;
    g.add(o);
    return o;
  };
  part(new THREE.CylinderGeometry(0.24, 0.27, 0.08, 28), suit, 0.04);
  part(new THREE.CylinderGeometry(0.11, 0.21, 0.5, 28), suit, 0.33);
  part(new THREE.SphereGeometry(0.15, 24, 16), '#E7C6A5', 0.72);
  const cap = part(new THREE.SphereGeometry(0.155, 24, 12, 0, Math.PI * 2, 0, Math.PI * 0.45), hair, 0.735);
  cap.rotation.x = -0.25;
  return g;
}

/** A lamp of the garden: a white post, a warm head that lights up in the evening (no thin dark lines). */
function lamp(lampMats) {
  const g = new THREE.Group();
  g.add(box(0.16, 0.06, 0.16, C.stoneDark));
  g.add(box(0.07, 1.5, 0.07, '#F7F4EE', { at: [0, 0.06, 0] }));
  const head = box(0.22, 0.13, 0.22, mat('#FFF6DE', { emissive: '#FFD58A', emissiveIntensity: 0.15 }), { at: [0, 1.56, 0] });
  lampMats.push(head.material);
  g.add(head, box(0.3, 0.04, 0.3, '#F7F4EE', { at: [0, 1.69, 0] }));
  return g;
}

/** A tiny repeatable random, so that every floor keeps the same garden. */
function rand(seed) {
  let s = seed * 9301 + 49297;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export function makePath(api) {
  const { renderer, state, earnedOn, built, DAY, NIGHT } = api;
  const root = document.getElementById('path');
  const layer = document.getElementById('path-list');
  const sub = document.getElementById('path-sub');

  // ---------- the scene ----------
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -60, 120);
  const hemi = new THREE.HemisphereLight(DAY.hemiSky, DAY.hemiGround, DAY.hemi);
  const sun = new THREE.DirectionalLight(DAY.sunCol, DAY.sun);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -15, right: 15, top: 15, bottom: -15, near: 0.5, far: 80 });
  sun.shadow.bias = -0.0003;
  sun.shadow.normalBias = 0.02;
  sun.shadow.radius = 4;
  const fill = new THREE.DirectionalLight('#BFD9FF', DAY.fill);
  scene.add(hemi, sun, sun.target, fill);
  let garden = null;
  let built3d = ''; // what the garden was built for
  let lampMats = [];
  let pools = [];
  let glowMats = []; // the mentor's clothes, lit a little in the evening (their own copies: mat() is shared)
  let halo = null;
  let picks = []; // what a tap can touch
  let anims = []; // the surprises of the garden while they move
  let eggs = []; // the surprises built, for the keyboard and the screen reader
  let people = []; // the people of the garden, for the keyboard and the screen reader
  let marks = []; // what the overlay follows: the bubble's stage, the names of the people
  let stages = []; // every stage built, in order from the bottom
  let dayK = 0;
  let dirty = true;

  // ---------- the view: one number, how far up the garden the camera is ----------
  let ppu = 54; // pixels per unit
  let W = 1;
  let Hs = 1;
  const view = { off: 0, vel: 0, goal: null };
  const perOff = () => Math.sin(EL) + (Math.cos(EL) * H) / L; // screen units per unit of `off`
  /** The `off` that shows the point (x, y, s) at `f` of the screen's height from the top. */
  const offFor = (y, s, f) => {
    const U = ((0.5 - f) * Hs) / ppu;
    return (s * Math.sin(EL) + (y - H) * Math.cos(EL) - U) / perOff();
  };
  let lo = 0;
  let hi = 0;
  function frame() {
    W = window.innerWidth;
    Hs = window.innerHeight;
    ppu = THREE.MathUtils.clamp(W / 7.2, 44, 64);
    Object.assign(camera, { left: -W / 2 / ppu, right: W / 2 / ppu, top: Hs / 2 / ppu, bottom: -Hs / 2 / ppu });
    camera.updateProjectionMatrix();
    dirty = true;
  }
  function placeCamera() {
    const t = new THREE.Vector3(0, camY(view.off), -view.off);
    camera.position.set(0, t.y + Math.sin(EL) * 30, t.z + Math.cos(EL) * 30);
    camera.lookAt(t);
    sun.position.set(t.x - 9, t.y + 22, t.z + 14);
    sun.target.position.copy(t);
    fill.position.set(t.x + 8, t.y + 6, t.z + 8);
  }

  // ---------- building the garden for the state of the game ----------
  const stateOf = (n, i) => {
    const e = earnedOn(n);
    return i < e ? 'done' : i === e && n === state.floor ? 'next' : 'locked';
  };
  const lessonNumber = (list, i) => list.slice(0, i + 1).filter((s) => s.tag.startsWith('Lezione')).length;
  const launched = () => state.floor === FLOORS.length && earnedOn(state.floor) === 8;

  function dispose(group) {
    group.traverse((o) => {
      if (o.userData.shared) return;
      if (o.isMesh && !o.userData.keepGeo) o.geometry.dispose();
    });
  }

  function build() {
    if (garden) {
      scene.remove(garden);
      dispose(garden);
    }
    garden = new THREE.Group();
    scene.add(garden);
    lampMats = [];
    pools = [];
    for (const m of glowMats) m.dispose();
    glowMats = [];
    picks = [];
    anims = [];
    plateMats.clear();
    eggs = [];
    people = [];
    for (const m of marks) m.el?.remove();
    marks = [];
    stages = [];
    const top = state.floor;

    // the lawn in front of the first terrace, where the way starts from the plaza of the sede
    const front = new THREE.Mesh(new THREE.PlaneGeometry(40, 30), new THREE.MeshStandardMaterial({ map: lawnFront, roughness: 0.95 }));
    front.rotation.x = -Math.PI / 2;
    front.position.set(0, 0, 15);
    front.receiveShadow = true;
    garden.add(front);
    garden.add(box(3.2, 0.06, 2.2, '#E2DACB', { at: [-0.6, 0, 1.6] }));
    garden.add(box(3.3, 0.04, 2.3, C.stoneDark, { at: [-0.6, 0, 1.6] }));

    const last = launched() ? FLOORS.length + 1 : top;
    for (let n = 1; n <= last; n++) {
      const info = FLOORS[n - 1] ?? { n, color: C.gold, name: 'Il lancio' };
      const z0 = wallZ(n);
      const y = ground(n);
      // the terrace: lawn on top, stone in front; it runs far back, and the next one rises from it
      const lawn = new THREE.MeshStandardMaterial({ map: lawnTex, roughness: 0.95 });
      const stone = mat('#E4DCCE', { roughness: 0.85 });
      const terrace = new THREE.Mesh(new THREE.BoxGeometry(40, y + 1, 200), [stone, stone, lawn, stone, stone, stone]);
      terrace.position.set(0, (y - 1) / 2, z0 - 100);
      terrace.receiveShadow = true;
      garden.add(terrace);
      // its front, like a floor of the building: the white slab on top, the band in the floor's colour under it
      garden.add(box(40, 0.1, 0.16, C.white, { at: [0, y - 0.1, z0 + 0.04] }));
      garden.add(box(40, 0.24, 0.02, mat(info.color, { roughness: 0.6 }), { at: [0, y - 0.34, z0 + 0.01] }));
      // the steps where the way comes up, from the last stage of the floor below
      const sx = n === 1 ? -0.6 : (X[7] + X[0]) / 2;
      for (let k = 0; k < 3; k++) {
        const h = (H * (k + 1)) / 3 - 0.004;
        garden.add(box(1.2, h, 0.32, C.stone, { at: [sx, y - H, z0 + 0.32 * (3 - k) - 0.16] }));
      }
      // the floor's plate on its front, on the right of the steps
      if (n <= FLOORS.length) {
        const plate = new THREE.Mesh(new THREE.PlaneGeometry(1.75, 0.38), new THREE.MeshStandardMaterial({ map: sign(info), roughness: 0.6 }));
        plate.position.set(sx + 1.75, y - H / 2 - 0.08, z0 + 0.03);
        garden.add(plate);
      }

      if (n > FLOORS.length) {
        paving(X[7], -stageS(n - 1, 7), sx, z0 + 1.2, ground(n - 1), 2, true);
        paving(sx, z0 - 0.45, 0, z0 - 1.25, y, 1, true);
        launch(y, z0);
        continue;
      }
      // the paving up to the first stage: from the plaza, or from the last stage of the floor below, up the steps
      const fromX = n === 1 ? -0.6 : X[7];
      const fromZ = n === 1 ? 2.2 : -stageS(n - 1, 7);
      paving(fromX, fromZ, sx, z0 + 1.2, ground(n - 1), 2, n === 1 || earnedOn(n - 1) === 8);
      paving(sx, z0 - 0.45, X[0], -stageS(n, 0), y, 1, earnedOn(n) > 0);
      for (let i = 0; i < 7; i++) paving(X[i], -stageS(n, i), X[i + 1], -stageS(n, i + 1), y, 3, earnedOn(n) > i);
      // the stages
      const list = ROOMS[n].stages;
      for (let i = 0; i < 8; i++) {
        const st = stateOf(n, i);
        const kind = list[i].tag === 'Caso' ? 'caso' : list[i].tag === 'Prova sul campo' ? 'prova' : 'lezione';
        const color = st === 'locked' ? C.white : info.color;
        const tall = st === 'next' ? NEXT_TALL : TALL;
        const slot = built.get(n)?.office?.slotOf(i);
        const g = stand(color, tall);
        const z = -stageS(n, i);
        g.position.set(X[i], y, z);
        g.userData.pick = { type: 'stage', n, i, st };
        garden.add(g);
        picks.push(g);
        const s = { n, i, st, x: X[i], y, z, top: y + 0.08 + tall, tall, info, tag: list[i].tag, title: list[i].title };
        stages.push(s);
        // the room the stand takes in the garden, and below what it carries: the bubble keeps off them (placeBubble)
        s.body = new THREE.Box3().setFromObject(g);
        // a lesson without an object shows its icon on a plate
        if (!slot) {
          const p = iconPlate(kind === 'lezione' ? iconOf(n, lessonNumber(list, i)) : 'foglio', st, info.deep);
          p.position.y = 0.08 + tall;
          g.add(p);
          s.top += p.userData.height;
        }
        if (st === 'next') {
          halo = new THREE.Mesh(
            new THREE.PlaneGeometry(2.6, 2.6),
            new THREE.MeshBasicMaterial({ map: haloTex, color: info.color, transparent: true, opacity: 0.6, depthWrite: false }),
          );
          halo.rotation.x = -Math.PI / 2;
          halo.position.set(X[i], y + 0.012, z);
          halo.renderOrder = 1;
          halo.raycast = () => {};
          garden.add(halo);
          marks.push({ kind: 'bubble', s });
        }
        // the object it brings, the real one from the Ufficio, standing on top
        let holder = null;
        if (slot) {
          const o = slot.obj.clone(true);
          o.position.set(0, 0, 0);
          // turned towards you as in its card: what lies flat on a desk in the room stands up a little
          const [tilt, turn] = slot.place.pose ?? [0, 0];
          o.rotation.set(tilt, turn, 0);
          o.scale.set(1, 1, 1);
          const mine = st === 'done';
          o.traverse((m) => {
            m.visible = true;
            m.userData.shared = true;
            if (m.isMesh) {
              m.castShadow = true;
              m.receiveShadow = false;
              if (!mine) m.material = Array.isArray(m.material) ? m.material.map(grey) : grey(m.material);
            }
          });
          holder = new THREE.Group();
          holder.add(o);
          const bb = new THREE.Box3().setFromObject(o);
          const size = bb.getSize(new THREE.Vector3());
          const k = Math.min(1.15 / size.x, 1.0 / size.y, 0.9 / size.z, 3);
          o.scale.setScalar(k);
          const c = bb.getCenter(new THREE.Vector3()).multiplyScalar(k);
          o.position.set(-c.x, -bb.min.y * k, -c.z);
          holder.position.set(X[i], s.top, z);
          holder.userData.pick = { type: 'stage', n, i, st };
          garden.add(holder);
          picks.push(holder);
          s.top += size.y * k;
        }
        s.head = new THREE.Box3().setFromObject(holder ?? g.children[g.children.length - 1]);
      }
      // the mentor waits beside the Case, with your partner's name and clothes
      const caso = stages.find((s) => s.n === n && s.i === 3);
      const partner = api.who?.()?.partner ?? null;
      const [suit, hair] = LOOKS[partner] ?? ['#2F3A4A', '#5A3A2A'];
      const reached = caso.st !== 'locked' || earnedOn(n) >= 3;
      const mx = caso.x + 1.65;
      const mz = caso.z + 0.15;
      const mentor = addPerson(partner ?? 'Il mentore', suit, hair, reached, mx, y, mz, mentorSays(partner, n, earnedOn(n) > 3), api.who?.()?.partnerWord ?? 'il mentore');
      mentor.userData.pick.mentor = true;
      if (reached) {
        // in the evening the pawn stands in a pool of light and its clothes glow a little: on the dark lawn a navy or
        // black pawn disappeared (revisione UX 09/11, problem 11)
        mentor.traverse((o) => {
          if (!o.isMesh) return;
          o.material = o.material.clone();
          o.material.emissive.copy(o.material.color);
          glowMats.push(o.material);
        });
        const pool = lightPool(mx, mz, 1.9, { pools: [] });
        pool.position.y = y + 0.015;
        pools.push(pool);
      }
      // the two candidates beside the first stage of a floor with an interview
      const hire = HIRES[n];
      if (hire) {
        const say = `Il colloquio: prima della prima lezione scegli tra ${hire[0]} e ${hire[1]}.`;
        const z = -stageS(n, 0) + 0.7;
        addPerson(hire[0], info.color, '#3B2A22', true, 0.4, y, z, say, `il colloquio del piano ${n}`);
        addPerson(hire[1], info.color, '#C9A06A', true, 1.4, y, z - 0.1, say, `il colloquio del piano ${n}`);
      }
      dress(n, y, z0);
      addEgg(n, y, z0);
    }
    // in the app, the floor after the one just finished may not be in the app yet (main.js, comingSoon; cubotto 7.8):
    // above the finished floor an honest card says so, where its terrace will rise. Floor 1 stays there to review.
    if (top < FLOORS.length && earnedOn(top) === 8 && api.soon?.(top + 1)) {
      const n = top + 1;
      const info = FLOORS[n - 1];
      const card = document.createElement('div');
      card.className = 'bubble soon';
      card.style.setProperty('--c', info.color);
      card.style.setProperty('--c-deep', info.deep);
      card.innerHTML = `<span class="bubble-tag">Piano ${n} · ${info.name}</span><span class="bubble-title">In costruzione</span><span class="bubble-note">Arriva con il prossimo aggiornamento dell’app.</span>`;
      card.setAttribute('role', 'note');
      card.setAttribute('aria-label', `Il piano ${n} è in costruzione. Arriva con il prossimo aggiornamento dell’app.`);
      layer.append(card);
      // anchored a little past the wall of the floor to come, so the card stands above the last stage and its object
      // instead of covering them (with large text the card grows upwards, never down onto the stage)
      const s = { n, i: 0, st: 'soon', x: 0, y: ground(top), z: wallZ(n) - 0.8, top: ground(top) + 0.1 };
      stages.push(s);
      marks.push({ kind: 'soon', el: card, s });
    }
    for (const p of pools) garden.add(p);
    applyDay(dayK);
    limits();
    built3d = signature();
    dirty = true;
  }

  /** `count` stone slabs between two points, turned like the stands; the way you have walked is warmer. */
  function paving(ax, az, bx, bz, y, count, walked) {
    for (let k = 1; k <= count; k++) {
      const t = k / (count + 1);
      const sl = box(0.44, 0.04, 0.44, walked ? '#F2E6D8' : '#ECE5DA', { at: [ax + (bx - ax) * t, y, az + (bz - az) * t] });
      sl.rotation.y = Math.PI / 4;
      sl.castShadow = false;
      garden.add(sl);
    }
  }

  /** The floor's surprise, on the side of its stretch (eggs.js): it answers when touched. */
  function addEgg(n, y, z0) {
    const egg = EGGS[n];
    if (!egg) return;
    const e = egg.make(FLOORS[n - 1].color);
    e.g.position.set(egg.x, y, z0 - egg.s);
    e.g.rotation.y = egg.x < 0 ? 0.45 : -0.45;
    e.g.scale.setScalar(egg.scale ?? 1);
    e.g.traverse((o) => o.isMesh && (o.castShadow = true));
    e.g.userData.pick = { type: 'egg', n, react: e.react };
    garden.add(e.g);
    picks.push(e.g);
    eggs.push({ n, pick: e.g.userData.pick, y, z: z0 - egg.s, box: new THREE.Box3().setFromObject(e.g) });
  }

  /** `role`: who they are, for the screen reader («il tuo socio», «il colloquio del piano 2»). */
  function addPerson(name, suit, hair, reached, x, y, z, say, role) {
    const p = person(suit, hair, reached);
    p.position.set(x, y, z);
    p.rotation.y = -0.35;
    p.userData.pick = { type: 'person', name, say };
    garden.add(p);
    picks.push(p);
    // the name stands over the head: at the feet it fell on the stage in front and hid its icon (09/11/2026)
    marks.push(nameMark(name, x, y + PAWN_H, z, true, true));
    people.push({ name, role, pick: p.userData.pick, x, y, z, box: new THREE.Box3().setFromObject(p) });
    return p;
  }
  /** `over`: the name sits above the point (a person's head) instead of under it (the stage of the launch).
   *  `person`: the name of someone in the garden, which the bubble never covers. */
  function nameMark(name, x, y, z, over = false, person = false) {
    const el = document.createElement('span');
    el.className = 'path-name';
    el.textContent = name;
    el.setAttribute('aria-hidden', 'true');
    layer.append(el);
    return { kind: 'name', el, x, y, z, over, person };
  }

  /** Trees, hedges, lamps and a bench along the sides of a floor's stretch, always the same for the same floor. */
  function dress(n, y, z0) {
    const r = rand(n * 7 + 3);
    for (let k = 0; k < 6; k++) {
      const left = k % 2 === 0;
      const s = 1.2 + k * 3.4 + r() * 1.2;
      const x = (left ? -1 : 1) * (2.85 + r() * 0.5);
      // keep clear of the mentor, on the right of the Case, and of the floor's surprise
      if (!left && Math.abs(s - (FIRST + 3 * GAP)) < 1.6) continue;
      if (EGGS[n] && Math.sign(x) === Math.sign(EGGS[n].x) && Math.abs(s - EGGS[n].s) < 1.5) continue;
      const t = tree(x, z0 - s, 0.62 + r() * 0.18, Math.floor(r() * 3));
      t.position.y = y;
      garden.add(t);
    }
    const hl = n % 2 ? -1 : 1;
    // long across the garden: seen from above, a hedge running away from you looks like a pillar
    const hd = hedge(hl * 2.75, z0 - (n % 2 ? 9.5 : 14), 1.5, 0.42);
    hd.position.y += y;
    garden.add(hd);
    for (const [x, s] of [
      [-2.25, FIRST + 1 * GAP + 0.6],
      [2.35, FIRST + 5 * GAP + 0.6],
    ]) {
      const l = lamp(lampMats);
      l.position.set(x, y, z0 - s);
      garden.add(l);
      const p = lightPool(x, z0 - s, 2.4, { pools: [] });
      p.position.y = y + 0.015;
      pools.push(p);
    }
    // on the side the way leaves free: right of the 4th stage, left of the 3rd
    const b = n % 2 ? bench(2.6, z0 - (FIRST + 4 * GAP), -0.5) : bench(-2.6, z0 - (FIRST + 2 * GAP), 0.5);
    b.position.y += y;
    garden.add(b);
  }

  /** After the last floor: the stage of the launch, the product under its cloth, never uncovered (CLAUDE.md §3). */
  function launch(y, z0) {
    const g = new THREE.Group();
    g.add(box(3.2, 0.16, 2.2, C.white));
    // the backdrop of the roof: a wooden frame, a warm white panel, the 12 colours of the floors along its top
    g.add(box(2.9, 1.25, 0.12, C.wood, { at: [0, 0.16, -0.95] }));
    g.add(box(2.7, 1.05, 0.04, '#FBF6EC', { at: [0, 0.26, -0.87] }));
    FLOORS.forEach((f, k) => g.add(box(0.2, 0.12, 0.03, f.color, { at: [-1.21 + k * 0.22, 1.13, -0.84] })));
    g.add(box(0.7, 0.5, 0.7, '#F7F4EE', { at: [0, 0.16, 0] }));
    const cloth = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.62, 6), mat(C.cream, { roughness: 0.9, flatShading: true }));
    cloth.position.y = 0.66 + 0.31;
    cloth.castShadow = true;
    g.add(cloth);
    g.position.set(0, y, z0 - 2.4);
    g.userData.pick = { type: 'launch' };
    garden.add(g);
    picks.push(g);
    stages.push({ n: FLOORS.length + 1, i: 0, st: 'launch', x: 0, y, z: z0 - 2.4, top: y + 1.3 });
    marks.push(nameMark('Il lancio', 0, y, z0 - 1.4));
  }

  // the garden is built again when a stage is done, and when the partner changes («Ricomincia da capo», a new choice)
  const signature = () => `${state.floor}:${earnedOn(state.floor)}:${api.who?.()?.partner ?? ''}`;

  // ---------- day and evening, with the sede ----------
  function applyDay(k) {
    dayK = k;
    const mix = (a, b) => new THREE.Color(a).lerp(new THREE.Color(b), k);
    // the evening of the garden is lighter than the sede's: the way, the stages and the objects must read
    hemi.color.copy(mix(DAY.hemiSky, '#8C98C8'));
    hemi.groundColor.copy(mix(DAY.hemiGround, '#3B4152'));
    hemi.intensity = THREE.MathUtils.lerp(DAY.hemi * 1.05, 1.35, k);
    for (const m of standMats.values()) m.emissiveIntensity = 0.26 * k;
    for (const m of plateMats) m.emissiveIntensity = 0.55 * k;
    sun.intensity = THREE.MathUtils.lerp(DAY.sun, NIGHT.sun, k);
    sun.color.copy(mix(DAY.sunCol, NIGHT.sunCol));
    fill.intensity = THREE.MathUtils.lerp(DAY.fill, NIGHT.fill, k);
    for (const m of lampMats) m.emissiveIntensity = THREE.MathUtils.lerp(DAY.lamps, NIGHT.lamps, k);
    for (const m of glowMats) m.emissiveIntensity = 0.45 * k;
    for (const p of pools) p.material.opacity = k * 0.85;
    if (halo) halo.material.opacity = THREE.MathUtils.lerp(0.55, 0.95, k);
    scene.background = mix('#CDE3B8', '#232A3D');
    root.classList.toggle('evening', k > 0.5);
    dirty = true;
  }

  // ---------- the overlay: the bubble beside the stage to do now, the names of the people ----------
  const bubble = document.createElement('button');
  bubble.className = 'bubble placed';
  bubble.hidden = true;
  const plate = document.createElement('div');
  plate.className = 'path-plate';
  plate.setAttribute('aria-hidden', 'true');
  const a11y = document.createElement('div'); // the stages without the finger: one button each, read aloud
  a11y.className = 'path-a11y';
  layer.replaceChildren(plate, bubble, a11y);
  const v = new THREE.Vector3();
  const toScreen = (x, y, z) => {
    v.set(x, y, z).project(camera);
    return [((v.x + 1) / 2) * W, ((1 - v.y) / 2) * Hs];
  };
  let plateFloor = 0;
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const overlapArea = (a, b) =>
    Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) * Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
  /** The screen rectangle of a box of the garden: its eight corners, projected. */
  const corner = new THREE.Vector3();
  function rectOf(box) {
    const r = { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity };
    for (let k = 0; k < 8; k++) {
      corner.set(k & 1 ? box.max.x : box.min.x, k & 2 ? box.max.y : box.min.y, k & 4 ? box.max.z : box.min.z).project(camera);
      const x = ((corner.x + 1) / 2) * W;
      const y = ((1 - corner.y) / 2) * Hs;
      r.left = Math.min(r.left, x);
      r.right = Math.max(r.right, x);
      r.top = Math.min(r.top, y);
      r.bottom = Math.max(r.bottom, y);
    }
    return r;
  }

  // ---------- where the bubble goes (partita 09/11/2026, punto 11) ----------
  // The stages are 2.5 apart, about 80 px on the phone, and the bubble is taller than that: drawn always over its stage,
  // it covered the next stage and the partner's pawn (at lesson 2 only the name showed, at lesson 3 not even that).
  // Now, every frame, the bubble tries the four sides of its stage (above, right, left, below), four forms (as it is,
  // narrow, wide, and a short one without the title, for where the way is crowded) and several points along its edge
  // for the tip, which always points at the stand. It takes the place that stays on screen, clear of the plate, the
  // round buttons and the bar, and covers the least: the next stage, the people and their names count most, by far;
  // the other stages less, the surprises of the garden least. The garden moves all in one piece, so while it scrolls
  // the choice stays the same, until the place it had leaves the screen; then it moves to the next best, like a
  // tooltip near the edge of the screen.
  const FITS = ['', 'narrow', 'wide', 'mini'];
  const FIT_COST = [0, 260, 160, 2400]; // the short one only when the others would cover a good part of a stage
  const SIDES = { above: 0, right: 320, left: 320, below: 900 };
  const KEEP = 80; // a covered pixel of the next stage, of a person or a name: only when nothing else is left
  const HEAD = 6; // of the icon or the object of another stage, what says what the stage is
  const BODY = 1; // of the stand of another stage
  const EGG = 0.6; // of a surprise of the garden
  const TIP_GAP = 13; // from the edge of the bubble to the stand (the tip is 10 px long)
  const TIP_IN = 24; // the tip keeps this far from the corners of the bubble (its radius is 18)
  const STEPS = 8; // points along the edge for the tip
  let sizes = null; // the bubble's [width, height] for each of FITS
  let sizeKey = '';
  let lastPlace = null; // the place of the last frame: kept while it fits, so the bubble does not jump
  /** The bubble's size in each width; measured again only when its words, the screen or the text size change. */
  function measure() {
    const key = `${bubble.textContent}|${W}|${document.documentElement.style.getPropertyValue('--fs')}|${document.fonts?.status}`;
    if (sizes && key === sizeKey) return sizes;
    sizeKey = key;
    sizes = FITS.map((f) => {
      bubble.dataset.fit = f;
      return [bubble.offsetWidth, bubble.offsetHeight];
    });
    return sizes;
  }
  /** The free part of the screen: under the plate and the round buttons, above the bar, with a margin. */
  function band() {
    const tr = document.querySelector('.top-right')?.getBoundingClientRect();
    const top = Math.max(plate.getBoundingClientRect().bottom, tr?.bottom ?? 0) + 8;
    const bar = document.querySelector('.tabs')?.getBoundingClientRect().top || Hs - 96;
    return { left: 12, right: W - 12, top, bottom: bar - 8 };
  }
  /** What the bubble keeps off, and how much each covered pixel weighs: only what stands near its stage, so that
   *  with twelve floors built the work of a frame stays small. */
  function blockers(s) {
    const list = [];
    const at = stages.indexOf(s);
    const near = (z) => Math.abs(z - s.z) < 14; // a little more than the bubble can reach, at the largest text
    stages.forEach((o, k) => {
      if (o === s || !o.body || !near(o.z)) return;
      list.push({ r: rectOf(o.body), w: k === at + 1 ? KEEP : BODY });
      list.push({ r: rectOf(o.head), w: k === at + 1 ? KEEP : HEAD });
    });
    for (const p of people) if (near(p.z)) list.push({ r: rectOf(p.box), w: KEEP });
    for (const e of eggs) if (near(e.z)) list.push({ r: rectOf(e.box), w: EGG });
    for (const m of marks) if (m.kind === 'name' && near(m.z) && !m.el.hidden && m.rect) list.push({ r: m.rect, w: m.person ? KEEP : EGG });
    return list;
  }
  function placeBubble(s, bounds) {
    const [cx, topY] = toScreen(s.x, s.top, s.z);
    const [, footY] = toScreen(s.x, s.y, s.z + SIDE * 0.72);
    const [, midY] = toScreen(s.x, s.y + 0.08 + s.tall, s.z);
    const [leftX] = toScreen(s.x - SIDE * 0.72, s.y, s.z);
    const [rightX] = toScreen(s.x + SIDE * 0.72, s.y, s.z);
    // the stage itself off the free part of the screen: no bubble pointing at nothing
    if (cx < 0 || cx > W || midY < bounds.top || midY > bounds.bottom) {
      bubble.hidden = true;
      lastPlace = null;
      return;
    }
    bubble.hidden = false;
    const sz = measure();
    const list = blockers(s);
    let best = null;
    let kept = null;
    sz.forEach(([w, h], fit) => {
      for (const side in SIDES) {
        const flat = side === 'above' || side === 'below';
        const along = flat ? w : h;
        if (along < 2 * TIP_IN) continue;
        // the tip slides along the edge: evenly spaced, and also where the bubble meets the edge of the screen or
        // just clears something in the way
        const from = flat ? cx : midY;
        const ts = [];
        for (let k = 0; k <= STEPS; k++) ts.push(TIP_IN + ((along - 2 * TIP_IN) * k) / STEPS);
        const lo0 = flat ? bounds.left : bounds.top;
        const hi0 = flat ? bounds.right : bounds.bottom;
        ts.push(from - lo0, from - (hi0 - along));
        for (const b of list) {
          const [a0, a1] = flat ? [b.r.left, b.r.right] : [b.r.top, b.r.bottom];
          ts.push(from - (a1 + 2), from - (a0 - 2 - along));
        }
        for (const t0 of ts) {
          if (t0 < TIP_IN || t0 > along - TIP_IN) continue;
          const t = Math.round(t0); // where the tip is, along the edge
          const x = flat ? cx - t : side === 'left' ? leftX - TIP_GAP - w : rightX + TIP_GAP;
          const y = side === 'above' ? topY - TIP_GAP - h : side === 'below' ? footY + TIP_GAP : midY - t;
          const r = { left: x, top: y, right: x + w, bottom: y + h };
          if (r.left < bounds.left - 0.5 || r.right > bounds.right + 0.5 || r.top < bounds.top - 0.5 || r.bottom > bounds.bottom + 0.5) continue;
          let cost = SIDES[side] + FIT_COST[fit] + Math.abs(t - along / 2) * 0.4;
          for (const b of list) cost += b.w * overlapArea(r, b.r);
          const c = { side, fit, t, x, y, cost, r };
          if (!best || cost < best.cost) best = c;
          if (lastPlace && lastPlace.side === side && lastPlace.fit === fit && Math.abs(lastPlace.t - t) < 1) kept = c;
        }
      }
    });
    if (kept && kept.cost <= best.cost + 400) best = kept;
    if (!best) {
      bubble.hidden = true;
      lastPlace = null;
      return;
    }
    lastPlace = best;
    bubble.dataset.fit = FITS[best.fit];
    bubble.dataset.side = best.side;
    bubble.style.left = `${Math.round(best.x)}px`;
    bubble.style.top = `${Math.round(best.y)}px`;
    bubble.style.setProperty('--tip-at', `${Math.round(best.t)}px`);
  }

  function overlay() {
    bubble.hidden = true;
    const cards = [plate];
    const bounds = band();
    const bar = bounds.bottom + 8;
    // the names first, where they stand: the bubble keeps off them; under a card they hide (below)
    for (const m of marks) {
      if (m.kind !== 'name') continue;
      const [x, y] = toScreen(m.x, m.y, m.over ? m.z : m.z + 0.25);
      m.el.hidden = false;
      m.el.style.transform = m.over ? `translate(${x}px, ${y - 4}px) translate(-50%, -100%)` : `translate(${x}px, ${y + 4}px) translateX(-50%)`;
      m.rect = m.el.getBoundingClientRect();
      m.el.hidden = m.rect.bottom < 0 || m.rect.top > Hs;
    }
    for (const m of marks) {
      if (m.kind === 'bubble') {
        placeBubble(m.s, bounds);
        if (!bubble.hidden) cards.push(bubble);
      } else if (m.kind === 'soon') {
        const [x, y] = toScreen(m.s.x, m.s.top, m.s.z);
        m.el.hidden = y < -40 || y > Hs + 200;
        const half = Math.min(118, W / 2 - 16);
        m.el.style.left = `${THREE.MathUtils.clamp(x, half + 16, W - half - 16)}px`;
        m.el.style.top = `${y}px`;
        if (!m.el.hidden) cards.push(m.el);
      }
    }
    // a name that would sit under the bubble, a card, the plate or the bar at the bottom is hidden, so it never covers
    // them nor peeks out from under them (09/11/2026)
    const blocks = cards.map((el) => el.getBoundingClientRect());
    for (const m of marks) {
      if (m.kind !== 'name') continue;
      const r = m.rect;
      m.el.hidden = r.top < 0 || r.bottom > bar - 4 || blocks.some((b) => overlaps(r, b));
    }
    // the plate follows the floor in the middle of the screen
    const mid = stages.filter((s) => s.n <= FLOORS.length && s.st !== 'soon').reduce((best, s) => {
      const d = Math.abs(toScreen(s.x, s.y, s.z)[1] - Hs * 0.5);
      return !best || d < best.d ? { d, n: s.n } : best;
    }, null);
    const n = mid?.n ?? state.floor;
    if (n !== plateFloor) {
      plateFloor = n;
      const info = FLOORS[n - 1];
      const e = earnedOn(n);
      plate.innerHTML = `<span class="path-plate-num" style="background:${info.color};color:${inkOn(info.color)};--c-deep:${info.deep}">${n}</span><span><span class="path-plate-name">${info.name}</span><span class="path-plate-pips">${[...Array(8)].map((_, k) => `<i class="${k < e ? 'on' : ''}" style="--c:${info.color}"></i>`).join('')}</span></span>`;
    }
  }

  function renderBubble() {
    lastPlace = null;
    const m = marks.find((x) => x.kind === 'bubble');
    if (!m) return;
    const s = m.s;
    bubble.style.setProperty('--c', s.info.color);
    bubble.style.setProperty('--c-deep', s.info.deep);
    bubble.style.setProperty('--on-c', inkOn(s.info.color));
    // a floor whose lessons are not in the app yet (main.js, comingSoon): the bubble says so, the tap explains
    const soon = api.soon?.(s.n);
    bubble.innerHTML = `<span class="bubble-tag">${s.tag}</span><span class="bubble-title">${s.title}</span><span class="bubble-go">${soon ? 'In arrivo' : 'Inizia · 3 min'}</span>`;
    bubble.setAttribute('aria-label', `${s.tag}: ${s.title}. ${soon ? 'In arrivo con il prossimo aggiornamento' : 'Inizia, 3 minuti'}`);
    bubble.onclick = () => tap({ type: 'stage', n: s.n, i: s.i, st: 'next' });
  }

  function renderA11y() {
    a11y.replaceChildren();
    for (const s of stages) {
      if (s.st === 'soon') continue; // the card reads by itself
      const b = document.createElement('button');
      b.className = 'sr-only';
      if (s.st === 'launch') {
        b.textContent = 'Il lancio, sul tetto';
        b.onclick = () => tap({ type: 'launch' });
      } else {
        const what = s.st === 'done' ? 'fatta' : s.st !== 'next' ? 'non ancora aperta' : api.soon?.(s.n) ? 'in arrivo con il prossimo aggiornamento' : 'da fare adesso';
        const obj = ROOMS[s.n].stages[s.i].object;
        b.textContent = `Piano ${s.n}, ${s.tag}: ${s.title}, ${what}${obj ? `. Porta ${obj.toLowerCase()}` : ''}`;
        b.onclick = () => tap({ type: 'stage', n: s.n, i: s.i, st: s.st });
      }
      b.onfocus = () => show(s, 0.5);
      a11y.append(b);
    }
    for (const e of eggs) {
      const b = document.createElement('button');
      b.className = 'sr-only';
      b.textContent = `Piano ${e.n}: una sorpresa nel giardino`;
      b.onclick = () => tap(e.pick);
      b.onfocus = () => show(e, 0.5);
      a11y.append(b);
    }
    // the people of the garden answer the keyboard and the screen reader too, as they answer the finger
    for (const p of people) {
      const b = document.createElement('button');
      b.className = 'sr-only';
      b.textContent = `${p.name}, ${p.role}`;
      b.onclick = () => tap(p.pick);
      b.onfocus = () => show(p, 0.5);
      a11y.append(b);
    }
  }

  // ---------- the finger, the wheel ----------
  function limits() {
    const first = stages[0];
    const lastStage = stages[stages.length - 1];
    lo = offFor(first.y, -first.z, 0.74);
    // the card of a floor still to come grows upwards from its point: lower on screen, so it clears the plate; so does
    // the last stage when it is the one to do, so that its bubble fits above it whole, title too, on the smallest
    // phones (partita 09/11/2026: at 34% of an iPhone SE only the short bubble fitted)
    hi = Math.max(lo, offFor(lastStage.y, -lastStage.z, lastStage.st === 'soon' ? 0.45 : lastStage.st === 'next' ? 0.42 : 0.34));
  }
  const clampOff = (o) => THREE.MathUtils.clamp(o, lo, hi);
  function show(s, f, instant = true) {
    const o = clampOff(offFor(s.y, -s.z, f));
    if (instant) {
      view.off = o;
      view.vel = 0;
      view.goal = null;
    } else view.goal = o;
    dirty = true;
  }
  let drag = null;
  const SLOP = 8;
  root.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    drag = { id: e.pointerId, y: e.clientY, start: e.clientY, raw: view.off, t: performance.now(), moved: false, onButton: !!e.target.closest('button') };
    view.vel = 0;
    view.goal = null;
  });
  root.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dy = e.clientY - drag.y;
    if (!drag.moved && Math.abs(e.clientY - drag.start) < SLOP) return;
    if (!drag.moved) {
      drag.moved = true;
      try {
        root.setPointerCapture(e.pointerId);
      } catch {
        // a pointer the page no longer tracks: the drag goes on without it
      }
    }
    const now = performance.now();
    const d = dy / (ppu * perOff());
    // past the ends it gives a little, and never more than a stage
    drag.raw += d;
    const past = drag.raw > hi ? drag.raw - hi : drag.raw < lo ? drag.raw - lo : 0;
    view.off = clampOff(drag.raw) + Math.sign(past) * Math.min(Math.abs(past) * 0.35, 1.5);
    view.vel = d / Math.max(0.008, (now - drag.t) / 1000);
    drag.y = e.clientY;
    drag.t = now;
    dirty = true;
  });
  const endDrag = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const d = drag;
    drag = null;
    if (performance.now() - d.t > 80) view.vel = 0;
    if (!d.moved && !d.onButton && e.type === 'pointerup') pick(e.clientX, e.clientY);
  };
  root.addEventListener('pointerup', endDrag);
  root.addEventListener('pointercancel', endDrag);
  root.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault();
      view.goal = null;
      view.off = clampOff(view.off - e.deltaY / (ppu * perOff()));
      view.vel = 0;
      dirty = true;
    },
    { passive: false },
  );

  const ray = new THREE.Raycaster();
  function pick(cx, cy) {
    ray.setFromCamera(new THREE.Vector2((cx / W) * 2 - 1, -(cy / Hs) * 2 + 1), camera);
    const hit = ray.intersectObjects(picks, true)[0];
    if (!hit) return;
    let o = hit.object;
    while (o && !o.userData.pick) o = o.parent;
    if (o) tap(o.userData.pick);
  }

  function tap(p) {
    if (state.busy) return;
    if (p.type === 'person') {
      sfx.tap();
      if (p.mentor) api.trophy?.('mentore');
      return api.toast(p.say);
    }
    if (p.type === 'egg') {
      // one answer at a time: a touch while it moves is not counted
      if (anims.some((a) => a.n === p.n)) return;
      const r = p.react();
      sfx.tap();
      if (r.roll || r.plink) setTimeout(() => sfx.land(), (r.plink ?? 0.85) * 1000);
      anims.push({ n: p.n, t: 0, ...r });
      api.toast(r.say);
      api.trophy?.('egg', p.n);
      if (r.roll === 6) setTimeout(() => api.trophy?.('sei'), 1000);
      return;
    }
    if (p.type === 'launch') {
      sfx.tap();
      api.trophy?.('telo');
      return api.toast(api.roofSays);
    }
    const list = ROOMS[p.n].stages;
    if (p.st === 'done') return api.openStage(p.n, p.i);
    if (p.st === 'next') return api.play();
    sfx.tap();
    api.toast(`Si apre dopo «${list[p.i - 1]?.title ?? ''}».`.replace('««', '«').replace('»»', '»'));
  }

  // ---------- every frame, while the Percorso is on screen ----------
  function step(dt, force = false) {
    if (!drag) {
      if (view.goal !== null) {
        const d = view.goal - view.off;
        view.off += d * Math.min(1, dt * 8);
        if (Math.abs(d) < 0.002) {
          view.off = view.goal;
          view.goal = null;
        }
        dirty = true;
      } else if (Math.abs(view.vel) > 0.01) {
        view.off += view.vel * dt;
        view.vel *= Math.exp(-dt * 3.2);
        if (view.off < lo || view.off > hi) view.vel *= Math.exp(-dt * 12);
        dirty = true;
      } else view.vel = 0;
      // back inside the ends, springing
      if (Math.abs(view.vel) < 0.5 && (view.off < lo || view.off > hi)) {
        const target = clampOff(view.off);
        view.off += (target - view.off) * Math.min(1, dt * 10);
        if (Math.abs(target - view.off) < 0.002) view.off = target;
        dirty = true;
      }
    }
    // the surprises that are moving
    for (const a of anims) {
      a.t = Math.min(a.dur, a.t + dt);
      a.step(a.t, dt);
      dirty = true;
    }
    anims = anims.filter((a) => a.t < a.dur);
    if (!dirty && !force) return;
    dirty = false;
    placeCamera();
    renderer.render(scene, camera);
    overlay();
  }

  // ---------- what main.js calls ----------
  function render() {
    if (signature() !== built3d) build();
    renderBubble();
    renderA11y();
    plateFloor = 0;
    const info = FLOORS[state.floor - 1];
    sub.textContent = `Piano ${state.floor} · ${info.name} · ${earnedOn(state.floor)} di 8`;
    dirty = true;
  }
  /** The stage to do now, a little under the middle of the screen. */
  function scrollToNext() {
    const s = stages.find((x) => x.st === 'next') ?? stages[stages.length - 1];
    if (s) show(s, 0.58);
  }
  frame();
  window.addEventListener('resize', () => {
    frame();
    if (garden) limits();
  });
  return { render, scrollToNext, step, applyDay, rebuild: () => (built3d = '') };
}
