// FEEN · la sede — le sorprese del giardino (28/10/2026, richiesta dell'utente dopo la prova sull'iPhone: «aggiungi
// easter egg, perché sennò man mano diventa un po' monotono»). One small thing per floor, on the side of its stretch of
// the Percorso, that answers when touched: it moves, and says one line about the floor's subject. Nothing to win and
// nothing to collect in the game: only a surprise. Made in code with the rules of the elements (light wood, cream and
// warm white, the floor's colour as the only accent, gold only for coins, sharp edges, no thin dark lines).
import * as THREE from 'three';
import { C, mat, box, cyl, canvasTexture, strokeText } from './kit.js';
import { leafBall, leafMat } from './world.js';

const WHITE = '#F7F4EE';
const TAU = Math.PI * 2;
const bump = (k) => Math.sin(Math.PI * Math.min(1, Math.max(0, k))); // 0 → 1 → 0
const settle = (k) => 1 - Math.pow(1 - Math.min(1, k), 3);

/** A flat sheet with a few words on it, for the signs. */
function words(lines, w, h, ink, bg = WHITE, size = 0.34) {
  const tex = canvasTexture(256, Math.round((256 * h) / w), (g, cw, ch) => {
    g.fillStyle = bg;
    g.fillRect(0, 0, cw, ch);
    const step = ch / (lines.length + 1);
    lines.forEach((t, k) => strokeText(g, t, cw / 2, step * (k + 1) + (ch * size) / 3, ch * size * (k === 0 ? 1 : 0.62), { fill: ink }));
  });
  return new THREE.MeshStandardMaterial({ map: tex, roughness: 0.7 });
}

// ---------- 1 · Direzione: the letterbox ----------
function letterbox(color) {
  const g = new THREE.Group();
  g.add(box(0.12, 0.62, 0.12, C.wood));
  g.add(box(0.4, 0.3, 0.52, WHITE, { at: [0, 0.62, 0] }));
  g.add(box(0.44, 0.04, 0.56, color, { at: [0, 0.92, 0] }));
  g.add(box(0.26, 0.04, 0.02, C.stoneDark, { at: [0, 0.8, 0.265] }));
  // the flag on its side: down while there is no post, up when you look
  const flag = new THREE.Group();
  flag.position.set(0.22, 0.72, -0.12);
  flag.add(box(0.03, 0.03, 0.26, color, { at: [0, 0, -0.13], center: true }));
  flag.add(box(0.03, 0.14, 0.1, color, { at: [0, -0.06, -0.24] }));
  g.add(flag);
  return {
    g,
    react: () => ({
      say: 'Nella cassetta c’è solo un volantino: «Ricco in tre giorni». Dritto nel cestino.',
      dur: 2.2,
      step: (t) => (flag.rotation.x = (Math.PI / 2) * bump(t / 2.2) * 1.0),
    }),
  };
}

// ---------- 2 · Tesoreria: the cash machine ----------
function cashMachine(color) {
  const g = new THREE.Group();
  g.add(box(0.56, 1.12, 0.36, WHITE));
  g.add(box(0.6, 0.06, 0.4, C.wood, { at: [0, 1.12, 0] }));
  const glow = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.15, roughness: 0.4 });
  g.add(box(0.36, 0.24, 0.02, glow, { at: [0, 0.74, 0.18] }));
  const keys = box(0.34, 0.05, 0.16, C.cream, { at: [0, 0.5, 0.24] });
  keys.rotation.x = 0.35;
  g.add(keys);
  for (let k = 0; k < 9; k++) g.add(box(0.06, 0.02, 0.035, C.stoneDark, { at: [-0.09 + (k % 3) * 0.09, 0.53 + Math.floor(k / 3) * 0.018, 0.21 + Math.floor(k / 3) * 0.045] }));
  g.add(box(0.2, 0.02, 0.03, C.navy, { at: [0, 0.62, 0.19] }));
  return {
    g,
    react: () => ({
      say: 'Lo sportello chiede il PIN. Copri sempre la tastiera con la mano, anche se a guardarti c’è solo un albero.',
      dur: 1.6,
      step: (t) => (glow.emissiveIntensity = 0.15 + 0.9 * Math.abs(Math.sin(t * 9)) * (1 - t / 1.6)),
    }),
  };
}

// ---------- 3 · Gaming: the big die ----------
// faces: +y 1, -y 6, +z 2, -z 5, +x 3, -x 4; the turn that brings each face on top
const FACE_UP = { 1: [0, 0], 2: [-Math.PI / 2, 0], 3: [0, Math.PI / 2], 4: [0, -Math.PI / 2], 5: [Math.PI / 2, 0], 6: [Math.PI, 0] };
function die(color) {
  const g = new THREE.Group();
  const cube = new THREE.Group();
  cube.rotation.order = 'YXZ';
  const S = 0.5;
  cube.add(box(S, S, S, WHITE, { center: true }));
  const pip = mat(color, { roughness: 0.5 });
  const spots = { 1: [[0, 0]], 2: [[-1, -1], [1, 1]], 3: [[-1, -1], [0, 0], [1, 1]], 4: [[-1, -1], [1, -1], [-1, 1], [1, 1]], 5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]], 6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]] };
  const faces = { 1: ['y', 1], 6: ['y', -1], 2: ['z', 1], 5: ['z', -1], 3: ['x', 1], 4: ['x', -1] };
  for (const [v, [axis, sgn]] of Object.entries(faces)) {
    for (const [a, b] of spots[v]) {
      const d = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.012, 16), pip);
      const p = [a * 0.13, b * 0.13];
      if (axis === 'y') d.position.set(p[0], sgn * (S / 2 + 0.003), p[1]);
      if (axis === 'z') {
        d.position.set(p[0], p[1], sgn * (S / 2 + 0.003));
        d.rotation.x = Math.PI / 2;
      }
      if (axis === 'x') {
        d.position.set(sgn * (S / 2 + 0.003), p[0], p[1]);
        d.rotation.z = Math.PI / 2;
      }
      cube.add(d);
    }
  }
  cube.position.y = S / 2;
  const tilt = (v) => {
    const [x, z] = FACE_UP[v];
    return { x, z };
  };
  Object.assign(cube.rotation, tilt(5), { y: 0.5 });
  g.add(cube);
  return {
    g,
    react: () => {
      const v = 1 + Math.floor(Math.random() * 6);
      const from = { x: cube.rotation.x, y: cube.rotation.y, z: cube.rotation.z };
      const to = tilt(v);
      to.y = from.y + (Math.floor(Math.random() * 4) * Math.PI) / 2 + Math.PI / 2;
      // whole turns on the way, so it tumbles; it lands with the drawn face on top
      to.x += TAU * 2;
      to.z += TAU;
      return {
        say: `È uscito il ${v}. Il dado non si ricorda i tiri di prima: la prossima volta è ancora 1 su 6.`,
        roll: v,
        dur: 0.9,
        step: (t) => {
          const k = settle(t / 0.9);
          cube.rotation.x = from.x + (to.x - from.x) * k;
          cube.rotation.y = from.y + (to.y - from.y) * k;
          cube.rotation.z = from.z + (to.z - from.z) * k;
          cube.position.y = S / 2 + 0.7 * bump(t / 0.75);
          if (t >= 0.9) {
            cube.rotation.x = to.x % TAU;
            cube.rotation.z = to.z % TAU;
          }
        },
      };
    },
  };
}

// ---------- 4 · Marketing: the sale sign ----------
function saleSign(color) {
  const g = new THREE.Group();
  for (const s of [-1, 1]) g.add(box(0.06, 0.92, 0.06, C.wood, { at: [s * 0.27, 0, -0.08] }));
  g.add(box(0.6, 0.06, 0.06, C.wood, { at: [0, 0.86, -0.08] }));
  // the board turns on its pivot: «-70%» in front, the truth behind
  const board = new THREE.Group();
  board.position.set(0, 0.56, -0.02);
  const front = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.02), [mat(WHITE), mat(WHITE), mat(WHITE), mat(WHITE), words(['-70%'], 0.5, 0.4, color, WHITE, 0.42), mat(WHITE)]);
  front.position.z = 0.011;
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.02), [mat(WHITE), mat(WHITE), mat(WHITE), mat(WHITE), words(['IERI', 'STESSO PREZZO'], 0.5, 0.4, C.navy, '#FBEFF1', 0.3), mat(WHITE)]);
  back.position.z = -0.011;
  back.rotation.y = Math.PI;
  for (const m of [front, back]) m.castShadow = true;
  board.add(front, back);
  g.add(board);
  let shown = 0;
  return {
    g,
    react: () => {
      const from = board.rotation.y;
      shown = 1 - shown;
      return {
        say: shown ? 'Dietro il cartello: «Ieri, stesso prezzo». Lo sconto era tutto nel cartello.' : 'Di nuovo «-70%». Quando uno sconto è così grande, guarda prima il prezzo di ieri.',
        dur: 0.8,
        step: (t) => (board.rotation.y = from + Math.PI * settle(t / 0.8)),
      };
    },
  };
}

// ---------- 5 · Pianificazione: the sapling ----------
function sapling(color) {
  const g = new THREE.Group();
  g.add(box(0.4, 0.32, 0.4, WHITE));
  g.add(box(0.34, 0.03, 0.34, '#8A6A50', { at: [0, 0.3, 0] }));
  g.add(box(0.42, 0.05, 0.42, color, { at: [0, 0.27, 0] }));
  const plant = new THREE.Group();
  plant.position.y = 0.32;
  plant.add(box(0.04, 0.42, 0.04, C.wood));
  [[0, 0.5, 0, 0.16], [0.1, 0.36, 0.04, 0.11], [-0.09, 0.3, -0.03, 0.1]].forEach(([x, y, z, r], k) => {
    plant.add(leafBall(r, [x, y, z], leafMat(k)));
  });
  g.add(plant);
  return {
    g,
    react: () => ({
      say: 'Una piantina. Oggi sta in un vaso, tra vent’anni farà ombra: come gli interessi sugli interessi.',
      dur: 1.6,
      step: (t) => plant.scale.setScalar(1 + 0.45 * bump(t / 1.6)),
    }),
  };
}

// ---------- 6 · Personale: the coffee machine ----------
function coffeeMachine(color) {
  const g = new THREE.Group();
  g.add(box(0.56, 1.2, 0.4, WHITE));
  g.add(box(0.56, 0.2, 0.41, color, { at: [0, 0.95, 0] }));
  g.add(box(0.3, 0.36, 0.02, mat('#E3EEF0', { roughness: 0.3 }), { at: [-0.06, 0.5, 0.2] }));
  for (let k = 0; k < 3; k++) g.add(box(0.08, 0.05, 0.03, C.cream, { at: [0.19, 0.74 - k * 0.09, 0.2] }));
  g.add(box(0.26, 0.2, 0.06, C.stoneDark, { at: [0, 0.12, 0.18] }));
  const cup = cyl(0.04, 0.032, 0.08, WHITE, { at: [0, 0.14, 0.2] });
  cup.visible = false;
  g.add(cup);
  return {
    g,
    react: () => ({
      say: 'Un caffè alla macchinetta: 1,20 €. Uno al giorno, in un anno fanno più di 400 €.',
      dur: 2.4,
      step: (t) => {
        cup.visible = t > 0.4 && t < 2.3;
        cup.position.y = 0.14 + 0.05 * (1 - settle((t - 0.4) / 0.3));
      },
    }),
  };
}

// ---------- 7 · Formazione: the books and the cap ----------
function booksAndCap(color) {
  const g = new THREE.Group();
  const books = [[0.6, 0.12, 0.42, C.cream, 0], [0.54, 0.1, 0.38, color, 0.12], [0.5, 0.11, 0.36, C.wood, 0.22]];
  for (const [w, h, d, c, y] of books) {
    const b = box(w, h, d, c, { at: [0, y, 0] });
    b.rotation.y = y * 1.4;
    g.add(b);
  }
  const cap = new THREE.Group();
  cap.position.y = 0.33;
  cap.add(box(0.2, 0.07, 0.2, C.navy));
  const top = box(0.34, 0.02, 0.34, C.navy, { at: [0, 0.07, 0] });
  top.rotation.y = Math.PI / 4;
  cap.add(top, box(0.03, 0.12, 0.03, color, { at: [0.12, -0.03, 0] }));
  g.add(cap);
  return {
    g,
    react: () => ({
      say: 'Il tocco vola: alla laurea si lancia così. Il prestito per arrivarci, invece, non vola via: si restituisce.',
      dur: 1.2,
      step: (t) => {
        cap.position.y = 0.33 + 1.1 * bump(t / 1.2);
        cap.rotation.y = TAU * 1.5 * settle(t / 1.2);
      },
    }),
  };
}

// ---------- 8 · Finanza: the «affittasi» sign ----------
function letSign(color) {
  const g = new THREE.Group();
  g.add(box(0.1, 1.2, 0.1, C.wood));
  g.add(box(0.56, 0.06, 0.08, C.wood, { at: [0.24, 1.08, 0] }));
  const sign = new THREE.Group();
  sign.position.set(0.32, 1.08, 0);
  const board = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.32, 0.03), [mat(WHITE), mat(WHITE), mat(WHITE), mat(WHITE), words(['AFFITTASI', '450 € AL MESE'], 0.52, 0.32, color, WHITE, 0.3), mat(WHITE)]);
  board.position.y = -0.24;
  board.castShadow = true;
  sign.add(board);
  for (const s of [-1, 1]) sign.add(box(0.02, 0.08, 0.02, C.wood, { at: [s * 0.18, -0.08, 0] }));
  g.add(sign);
  return {
    g,
    react: () => ({
      say: '«Affittasi, 450 € al mese». Poi ci sono caparra, bollette e spese: il conto vero è più lungo.',
      dur: 2.4,
      step: (t) => (sign.rotation.x = 0.5 * Math.sin(t * 7) * Math.exp(-t * 1.8)),
    }),
  };
}

// ---------- 9 · Credito: the wishing well ----------
function well(color) {
  const g = new THREE.Group();
  const stone = mat(C.stone, { roughness: 0.85 });
  g.add(box(0.7, 0.34, 0.1, stone, { at: [0, 0, 0.3] }), box(0.7, 0.34, 0.1, stone, { at: [0, 0, -0.3] }));
  g.add(box(0.1, 0.34, 0.5, stone, { at: [0.3, 0, 0] }), box(0.1, 0.34, 0.5, stone, { at: [-0.3, 0, 0] }));
  // its own water: it lights up when the coin falls in, and the pool of the sede must not
  const water = box(0.5, 0.02, 0.5, new THREE.MeshStandardMaterial({ color: '#9FD3F2', emissive: '#6FB7E6', emissiveIntensity: 0.18, roughness: 0.12 }), { at: [0, 0.24, 0] });
  water.castShadow = false;
  g.add(water);
  for (const s of [-1, 1]) g.add(box(0.07, 0.62, 0.07, C.wood, { at: [s * 0.3, 0.34, 0] }));
  const roof = box(0.84, 0.06, 0.5, color, { at: [0, 0.96, 0] });
  g.add(roof, box(0.6, 0.04, 0.04, C.wood, { at: [0, 0.78, 0] }));
  const coin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.015, 20), mat(C.gold, { metalness: 0.45, roughness: 0.32, emissive: '#7A4A00', emissiveIntensity: 0.25 }));
  coin.visible = false;
  coin.castShadow = true;
  g.add(coin);
  return {
    g,
    react: () => ({
      say: 'Una moneta nel pozzo: esprimi un desiderio. Interessi, però, nessuno.',
      dur: 1.1,
      plink: 0.75,
      step: (t) => {
        coin.visible = t < 0.8;
        coin.position.set(0.05, 1.3 - 1.05 * Math.min(1, (t / 0.8) ** 2), 0.05);
        coin.rotation.x = t * 14;
        water.material.emissiveIntensity = 0.18 + 0.5 * bump((t - 0.75) / 0.35);
      },
    }),
  };
}

// ---------- 10 · Soci: the cake in eight slices ----------
function cake(color) {
  const g = new THREE.Group();
  g.add(box(0.8, 0.06, 0.6, C.wood, { at: [0, 0.42, 0] }));
  for (const [x, z] of [[-0.32, -0.22], [0.32, -0.22], [-0.32, 0.22], [0.32, 0.22]]) g.add(box(0.06, 0.42, 0.06, C.wood, { at: [x, 0, z] }));
  g.add(cyl(0.3, 0.3, 0.025, WHITE, { at: [0, 0.48, 0], seg: 32 }));
  const slices = [];
  for (let k = 0; k < 8; k++) {
    const s = new THREE.Group();
    const a = (k * TAU) / 8;
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.13, 6, 1, false, a + 0.02, TAU / 8 - 0.04), mat(C.cream, { roughness: 0.8 }));
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 6, 1, false, a + 0.02, TAU / 8 - 0.04), mat(color, { roughness: 0.6 }));
    body.position.y = 0.065;
    top.position.y = 0.145;
    body.castShadow = top.castShadow = true;
    s.add(body, top);
    s.position.y = 0.505;
    g.add(s);
    slices.push({ s, a: a + TAU / 16 });
  }
  return {
    g,
    react: () => {
      // the slice that faces you comes out
      const { s, a } = slices[2];
      return {
        say: 'Una torta in otto fette: chi ne ha una è socio. Chi ne ha due, decide un po’ di più.',
        dur: 1.8,
        step: (t) => {
          const k = bump(t / 1.8);
          s.position.set(Math.sin(a) * 0.14 * k, 0.505 + 0.16 * k, Math.cos(a) * 0.14 * k);
        },
      };
    },
  };
}

// ---------- 11 · Palinsesto: the pinwheel ----------
function pinwheel(color) {
  const g = new THREE.Group();
  g.add(box(0.05, 1.05, 0.05, C.wood));
  const wheel = new THREE.Group();
  wheel.position.set(0, 1.05, 0.05);
  for (let k = 0; k < 4; k++) {
    const blade = new THREE.Mesh(new THREE.BufferGeometry(), mat(k % 2 ? C.cream : color, { roughness: 0.6, side: THREE.DoubleSide }));
    blade.geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0.3, 0.02, 0, 0.3, 0.3, 0.06, 0, 0, 0, 0.3, 0.3, 0.06, 0.02, 0.3, 0], 3));
    blade.geometry.computeVertexNormals();
    blade.rotation.z = (k * Math.PI) / 2;
    blade.castShadow = true;
    wheel.add(blade);
  }
  wheel.add(box(0.06, 0.06, 0.04, C.wood, { center: true }));
  g.add(wheel);
  let spin = 0;
  return {
    g,
    react: () => ({
      say: 'Quattro pale e un vento solo: se una si piega, la girandola gira lo stesso. Diversificare è così.',
      dur: 3,
      step: (t, dt) => {
        spin = 22 * Math.exp(-t * 1.4);
        wheel.rotation.z -= spin * dt;
      },
    }),
  };
}

// ---------- 12 · Esteri: the signpost ----------
function signpost(color) {
  const g = new THREE.Group();
  g.add(box(0.1, 1.3, 0.1, C.wood));
  g.add(box(0.14, 0.05, 0.14, C.wood, { at: [0, 1.3, 0] }));
  const arrows = [];
  ['TOKYO', 'NEW YORK', 'LONDRA'].forEach((city, k) => {
    const arm = new THREE.Group();
    arm.position.y = 1.12 - k * 0.24;
    const w = 0.62;
    const shape = new THREE.Shape([new THREE.Vector2(0, -0.08), new THREE.Vector2(w - 0.1, -0.08), new THREE.Vector2(w, 0), new THREE.Vector2(w - 0.1, 0.08), new THREE.Vector2(0, 0.08)]);
    const plate = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: false }), mat(k === 1 ? color : WHITE, { roughness: 0.6 }));
    plate.position.set(0.04, 0, -0.015);
    plate.castShadow = true;
    const label = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.12), words([city], 0.46, 0.12, k === 1 ? '#FFFFFF' : color, k === 1 ? color : WHITE, 0.62));
    label.position.set(0.3, 0, 0.0175);
    arm.add(plate, label);
    // all three turned towards you, each a little its own way: an arrow seen from behind or edge-on says nothing
    arm.rotation.y = [-0.45, 0.25, -0.1][k];
    g.add(arm);
    arrows.push(arm);
  });
  return {
    g,
    react: () => {
      const from = arrows.map((a) => a.rotation.y);
      // a whole turn each, the middle one the other way: they come back facing you
      const turn = arrows.map((_, k) => (k % 2 ? -TAU : TAU));
      return {
        say: 'Yen, dollaro, sterlina: ogni freccia è una valuta. Il cambio decide quanto costa arrivarci.',
        dur: 1.4,
        step: (t) => arrows.forEach((a, k) => (a.rotation.y = from[k] + turn[k] * settle(t / 1.4))),
      };
    },
  };
}

/** The surprise of each floor, and where it stands in its stretch of garden: `x` across, `s` from the floor's wall;
 *  `scale` for the small ones, so that from above they read as well as the others. */
export const EGGS = {
  1: { make: letterbox, x: -2.4, s: 11 },
  2: { make: cashMachine, x: -2.4, s: 16.6 },
  3: { make: die, x: -2.35, s: 11 },
  4: { make: saleSign, x: -2.4, s: 16.6, scale: 1.15 },
  5: { make: sapling, x: -2.35, s: 11, scale: 1.15 },
  6: { make: coffeeMachine, x: -2.45, s: 16.6 },
  7: { make: booksAndCap, x: -2.35, s: 11, scale: 1.35 },
  8: { make: letSign, x: -2.6, s: 16.6, scale: 1.25 },
  9: { make: well, x: -2.35, s: 11 },
  10: { make: cake, x: -2.4, s: 16.6, scale: 1.15 },
  11: { make: pinwheel, x: -2.35, s: 11, scale: 1.3 },
  12: { make: signpost, x: -2.55, s: 16.6, scale: 1.25 },
};
