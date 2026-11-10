// The campus around the company, kept quiet: sky, lawn, plaza, a few trees, the
// pool, a bench and two lamp posts; and the shell of each floor.
// 25/10/2026, after Davide's note («più squadrato, quasi seguendo le leggi di Wright»): the building is
// a trunk and its branches. A stone core on the right rises the whole height and every floor comes out of
// it as a thin plate, with no columns in front; edges are sharp, the garden is squared like the building.
// 30/10/2026, Nello's idea and the user's choice (strada A of three sketches, `1. LAVORO/citta/`): the campus is a
// green block in a city, with streets round it and low buildings beyond. Always by day: FEEN is never set at night
// (the user, 10/11/2026); the evening, its lit windows, lamp pools and glowing plates are gone.

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { C, mat, box, cyl, canvasTexture, roundRect, strokeText, shadows, inkOn, mixHex } from './kit.js';

// Building measures (one unit ≈ the height of a character).
export const B = {
  xL: -2.3,
  xR: 2.3,
  zB: -1.4,
  zF: 1.4,
  wall: 0.18,
  plinth: 0.34, // floor top of piano 1
  ih: 1.7, // inside height
  slab: 0.34,
};
B.inL = B.xL + B.wall;
B.inB = B.zB + B.wall;
// the stone core on the right, out of which every floor comes
B.xC = B.xR - 0.06; // where the room meets the core
B.coreW = 0.8;
B.zCore = B.zF + 0.3; // the core's front face; the floor plates stop just behind it
B.lip = 0.3; // how far the plates jut out on the left
B.corner = 0.4; // the glass corner at the front of the left wall
B.floorH = B.ih + B.slab;
export const floorY = (n) => B.plinth + (n - 1) * B.floorH; // top of the floor of piano n

// The 12 floors, with the three colours of the palette (30/10/2026, `1. LAVORO/palette/`): `light`, `color` (the
// base, the floor's accent) and `deep`. `room` is the colour of the walls of a finished floor, `paint` the one rising
// on them stage by stage: both a step from the light towards the base, so a new palette repaints the rooms by itself.
export const FLOORS = [
  { n: 1, name: 'Direzione', the: 'la Direzione', ready: 'La Direzione è pronta', light: '#FAEAE1', color: '#E97F4F', deep: '#944219' },
  { n: 2, name: 'Tesoreria', the: 'la Tesoreria', ready: 'La Tesoreria è pronta', light: '#E2F0F9', color: '#61ACE2', deep: '#205985' },
  { n: 3, name: 'Gaming', the: 'il Gaming', ready: 'Il Gaming è pronto', light: '#F0ECFC', color: '#A18AF1', deep: '#5F43B2' },
  { n: 4, name: 'Marketing', the: 'il Marketing', ready: 'Il Marketing è pronto', light: '#FBE8EF', color: '#EE78A5', deep: '#962C58' },
  { n: 5, name: 'Pianificazione', the: 'la Pianificazione', ready: 'La Pianificazione è pronta', light: '#E5F4E6', color: '#57B65C', deep: '#266D2C' },
  { n: 6, name: 'Personale', the: 'il Personale', ready: 'Il Personale è pronto', light: '#DCF2ED', color: '#2A9885', deep: '#135D4F' },
  { n: 7, name: 'Formazione', the: 'la Formazione', ready: 'La Formazione è pronta', light: '#F8EFD9', color: '#D19A33', deep: '#6B4B0A' },
  { n: 8, name: 'Finanza', the: 'la Finanza', ready: 'La Finanza è pronta', light: '#E9EAFB', color: '#6166DF', deep: '#373C9F' },
  { n: 9, name: 'Credito', the: 'il Credito', ready: 'Il Credito è pronto', light: '#F7E4E8', color: '#C3405E', deep: '#7F2038' },
  { n: 10, name: 'Soci', the: 'il piano dei Soci', ready: 'Il piano dei Soci è pronto', light: '#F4E8F8', color: '#A855C4', deep: '#682A80' },
  { n: 11, name: 'Palinsesto', the: 'il Palinsesto', ready: 'Il Palinsesto è pronto', light: '#DDF2F6', color: '#28A3BD', deep: '#14677A' },
  { n: 12, name: 'Esteri', the: 'il piano degli Esteri', ready: 'Gli Esteri sono pronti', light: '#E3E9F6', color: '#3A58A1', deep: '#1C3166' },
].map((f) => ({ room: mixHex(f.light, f.color, 0.25), paint: mixHex(f.light, f.color, 0.21), ...f }));

// ---------- sky ----------
export function makeSky() {
  const uniforms = {
    top: { value: new THREE.Color('#2E9BEA') },
    mid: { value: new THREE.Color('#7FCBFA') },
    bottom: { value: new THREE.Color('#D8F1FF') },
  };
  const m = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    vertexShader: `varying vec3 vPos; void main(){ vPos = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `uniform vec3 top; uniform vec3 mid; uniform vec3 bottom; varying vec3 vPos;
      void main(){ float h = vPos.y; vec3 c = h > 0.12 ? mix(mid, top, smoothstep(0.12, 0.6, h)) : mix(bottom, mid, smoothstep(-0.05, 0.12, h)); gl_FragColor = vec4(c,1.0); }`,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(110, 32, 16), m);
  sky.userData.uniforms = uniforms;
  return sky;
}

// ---------- textures ----------
function grassTexture() {
  return canvasTexture(
    256,
    256,
    (g, w, h) => {
      g.fillStyle = C.grassA;
      g.fillRect(0, 0, w, h);
      g.fillStyle = C.grassB;
      g.fillRect(0, 0, w / 2, h);
      for (let i = 0; i < 120; i++) {
        g.fillStyle = Math.random() < 0.5 ? 'rgba(70,110,50,0.07)' : 'rgba(255,255,240,0.08)';
        g.fillRect(Math.random() * w, Math.random() * h, 3 + Math.random() * 4, 2 + Math.random() * 3);
      }
    },
    { repeat: [55, 55] },
  );
}

/** Long pavers laid like bricks, square-edged. */
function tileTexture(rx, ry) {
  return canvasTexture(
    512,
    512,
    (g, w, h) => {
      g.fillStyle = '#E2DACB';
      g.fillRect(0, 0, w, h);
      const pw = w / 4;
      const ph = h / 8;
      for (let j = 0; j < 8; j++)
        for (let i = -1; i < 4; i++) {
          g.fillStyle = `hsl(38, 30%, ${90 + Math.random() * 3}%)`;
          g.fillRect(i * pw + (j % 2) * (pw / 2) + 2, j * ph + 2, pw - 4, ph - 4);
        }
    },
    { repeat: [rx, ry] },
  );
}

// Stone laid in long horizontal courses; one tile is half a floor high, so the courses run on from floor to floor.
const STONE = B.floorH / 2;
// Light and calm: long thin stones, deep horizontal joints, vertical joints barely there.
const stoneTex = canvasTexture(512, 256, (g, w, h) => {
  g.fillStyle = '#CFC5B4';
  g.fillRect(0, 0, w, h);
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  let y = 0;
  for (const rh of [36, 28, 40, 32, 38, 30, 52]) {
    const o = rnd() * 160;
    for (let x = o; x < o + w; ) {
      const bw = Math.min(150 + rnd() * 220, o + w - x);
      g.fillStyle = `hsl(${36 + rnd() * 4}, ${16 + rnd() * 6}%, ${82 + rnd() * 5}%)`;
      for (const dx of [0, -w]) g.fillRect(x + dx + 1, y + 3, bw - 1, rh - 3);
      x += bw;
    }
    y += rh;
  }
});
const stoneCache = new Map();
/** One material per face of a stone box, each with the courses at the same scale. */
function stoneMats(w, h, d) {
  const key = [w, h, d].join();
  if (!stoneCache.has(key)) {
    const face = (u, v) => {
      const t = stoneTex.clone();
      t.wrapS = t.wrapT = THREE.RepeatWrapping;
      t.repeat.set(u / (2 * STONE), v / STONE);
      t.needsUpdate = true;
      return new THREE.MeshStandardMaterial({ map: t, roughness: 0.92 });
    };
    const side = face(d, h);
    const front = face(w, h);
    const top = mat(C.stoneDark, { roughness: 0.9 });
    stoneCache.set(key, [side, side, top, top, front, front]);
  }
  return stoneCache.get(key);
}

/** The floor's name plate: a dark square-cornered plate, the number on a square in the floor's colour. */
export function signTexture(info) {
  // the floor's name on the dark plate, after a band in the floor's colour: no number on a square, which looked like
  // a bingo card (10/11/2026, Davide). Twice the old size, so it stays sharp close up on a phone.
  return canvasTexture(1024, 224, (g, w, h) => {
    g.fillStyle = C.ink;
    roundRect(g, 0, 0, w, h, 20);
    g.fill();
    g.fillStyle = info.color;
    roundRect(g, 26, 34, 18, h - 68, 9);
    g.fill();
    strokeText(g, info.name, 72, h / 2 + 6, info.name.length > 13 ? 96 : 112, { fill: '#FFFFFF', align: 'left', weight: 700 });
  });
}

// ---------- pieces of the campus ----------
function lampPost(x, z, lampMats) {
  const g = new THREE.Group();
  g.add(box(0.16, 0.08, 0.16, C.navy));
  g.add(box(0.06, 1.66, 0.06, C.navy, { at: [0, 0.06, 0] }));
  const head = box(0.26, 0.14, 0.26, mat('#FFF6DE', { emissive: '#FFD58A', emissiveIntensity: 0.15 }), { at: [0, 1.72, 0] });
  lampMats.push(head.material);
  g.add(head, box(0.38, 0.04, 0.38, C.navy, { at: [0, 1.86, 0] }));
  g.position.set(x, 0.06, z);
  return g;
}

export function bench(x, z, rot) {
  const g = new THREE.Group();
  g.add(box(1.0, 0.08, 0.36, C.wood, { at: [0, 0.32, 0] }));
  g.add(box(1.0, 0.24, 0.07, C.wood, { at: [0, 0.42, -0.16] }));
  for (const sx of [-0.4, 0.4]) g.add(box(0.07, 0.32, 0.32, C.navy, { at: [sx, 0, 0] }));
  g.position.set(x, 0.06, z);
  g.rotation.y = rot;
  return g;
}

export function planter(x, z, w, d) {
  const g = new THREE.Group();
  g.add(box(w, 0.32, d, C.white));
  g.add(box(w - 0.1, 0.06, d - 0.1, '#8A6A50', { at: [0, 0.29, 0] }));
  // smooth bushes in the three greens of the trees, along the long side; no flowers
  const long = Math.max(w, d);
  const n = Math.max(2, Math.round(long / 0.3));
  for (let i = 0; i < n; i++) {
    const t = -long / 2 + 0.2 + (i * (long - 0.4)) / Math.max(1, n - 1);
    const across = (i % 2 ? 0.05 : -0.05) * (Math.min(w, d) > 0.4 ? 1 : 0.4);
    const r = 0.13 + (i % 3) * 0.025;
    g.add(leafBall(r, [w >= d ? t : across, 0.33 + r * 0.55, w >= d ? across : t], leafMat(i), [1, 0.8, 1]));
  }
  g.position.set(x, 0.06, z);
  return g;
}

/** A long, low pool of still water, in place of the round fountain. */
function pool(x, z, w, d) {
  const g = new THREE.Group();
  g.add(box(w, 0.14, d, C.white));
  const water = box(w - 0.12, 0.04, d - 0.12, mat('#9FD3F2', { emissive: '#6FB7E6', emissiveIntensity: 0.18, roughness: 0.12, metalness: 0.1 }), { at: [0, 0.14, 0] });
  water.castShadow = false;
  g.add(water);
  for (const s of [-1, 1]) {
    g.add(box(w, 0.08, 0.06, C.white, { at: [0, 0.14, s * (d / 2 - 0.03)] }));
    g.add(box(0.06, 0.08, d - 0.12, C.white, { at: [s * (w / 2 - 0.03), 0.14, 0] }));
  }
  g.position.set(x, 0.06, z);
  return g;
}

// Trees are like the ones in an architect's model (the user's choice, 30/10/2026, sketch A «sfere», after Nello's
// «magari lo sfondo e gli alberi»): smooth crowns on a thin round trunk of light wood. Before, faceted crowns on a
// square trunk. Their greens are deeper than the lawn, so they never melt into it.
export const LEAVES = ['#86BF73', '#79B56C', '#93C780'];
export const TRUNK = '#B08C6C'; // the potted plants in the rooms
const STEM = '#C8A684';
const BALL = new THREE.SphereGeometry(1, 32, 18);
export function leafMat(i) {
  return mat(LEAVES[i % 3], { roughness: 0.8 });
}
/** A smooth ball of leaves of radius `r`, stretched by `scale`: the trees, the bushes, the sapling of the Percorso. */
export function leafBall(r, at, m, scale = [1, 1, 1]) {
  const o = new THREE.Mesh(BALL, m);
  o.position.set(...at);
  o.scale.set(r * scale[0], r * scale[1], r * scale[2]);
  o.castShadow = true;
  return o;
}

export function tree(x, z, s, shape = 0) {
  const g = new THREE.Group();
  const leaf = leafMat(shape);
  const trunk = (h) => g.add(cyl(0.038, 0.045, h, STEM, { seg: 16 }));
  if (shape % 3 === 1) {
    // a slim column
    trunk(0.5);
    g.add(leafBall(0.42, [0, 1.25, 0], leaf, [0.85, 2.0, 0.85]));
  } else if (shape % 3 === 2) {
    // a big crown with a small one beside it
    trunk(0.8);
    g.add(leafBall(0.6, [0, 1.25, 0], leaf, [1, 1.1, 1]), leafBall(0.38, [0.45, 0.95, 0.2], leafMat(0)));
  } else {
    trunk(0.85);
    g.add(leafBall(0.64, [0, 1.35, 0], leaf, [1, 1.12, 1]));
  }
  shadows(g, true, false);
  g.position.set(x, 0, z);
  g.rotation.y = x * 0.7;
  g.scale.setScalar(s);
  return g;
}

/** A low clipped hedge. */
export function hedge(x, z, w, d) {
  return box(w, 0.42, d, mat(LEAVES[1], { roughness: 0.9 }), { at: [x, 0, z] });
}

/** The crane on the core while the building grows: warm white, its small parts and the cable of light wood (no thin
 *  dark lines), a wooden beam on the hook, and a small warm lamp on top. */
function crane(lampMats) {
  const g = new THREE.Group();
  const white = mat('#F7F4EE', { roughness: 0.5 });
  const wood = mat(C.wood, { roughness: 0.6 });
  const mast = 2.0;
  g.add(box(0.46, 0.1, 0.46, wood));
  g.add(box(0.16, mast, 0.16, white, { at: [0, 0.1, 0] }));
  const top = new THREE.Group();
  top.position.y = mast + 0.1;
  g.add(top);
  top.add(box(0.32, 0.26, 0.32, white));
  top.add(box(0.22, 0.16, 0.24, mat(C.glass, { emissive: '#6FB7E6', emissiveIntensity: 0.15 }), { at: [0.1, 0.05, 0.08] }));
  top.add(box(3.4, 0.12, 0.12, white, { at: [-1.5, 0.3, 0] }));
  top.add(box(1.0, 0.12, 0.12, white, { at: [0.6, 0.3, 0] }));
  top.add(box(0.32, 0.3, 0.28, wood, { at: [1.0, 0.12, 0] }));
  const lamp = mat('#FFF4D6', { emissive: '#FFD27A', emissiveIntensity: 0 });
  lampMats.push(lamp);
  top.add(box(0.18, 0.18, 0.18, lamp, { at: [0, 0.42, 0] }));
  const trolley = new THREE.Group();
  trolley.position.set(-2.35, 0.3, 0);
  top.add(trolley);
  trolley.add(box(0.16, 0.06, 0.18, wood, { at: [0, -0.06, 0] }));
  trolley.add(cyl(0.014, 0.014, 0.8, wood, { at: [0, -0.86, 0], seg: 6 }));
  const load = new THREE.Group();
  load.position.y = -0.86;
  trolley.add(load);
  load.add(box(0.06, 0.08, 0.06, wood, { at: [0, -0.08, 0] }));
  load.add(box(0.9, 0.12, 0.16, C.wood, { at: [0, -0.22, 0] }));
  top.rotation.y = 0.25;
  g.userData.top = top;
  return g;
}

/** The stone core: one piece for each floor, so it grows with the building. */
function coreBlock(h) {
  const d = B.zCore - B.zB;
  return box(B.coreW, h, d, stoneMats(B.coreW, h, d), { at: [B.xC + B.coreW / 2, 0, (B.zB + B.zCore) / 2] });
}

/** What stands on the roof while the next floor waits: the top of the core with the crane, the air conditioning. */
export function makeRoofSite(world) {
  const g = new THREE.Group();
  // a low rim along the edges of the last floor's plate
  const pm = mat('#EFEBE4');
  const [x0, x1, z0, z1] = [B.xL - B.lip, B.xC, B.zB, B.zCore - 0.02];
  g.add(box(x1 - x0, 0.12, 0.06, pm, { at: [(x0 + x1) / 2, 0, z1 - 0.03] }));
  g.add(box(x1 - x0, 0.12, 0.06, pm, { at: [(x0 + x1) / 2, 0, z0 + 0.03] }));
  g.add(box(0.06, 0.12, z1 - z0, pm, { at: [x0 + 0.03, 0, (z0 + z1) / 2] }));
  // the core rises above the roof: the next floor will come out of it
  const top = B.floorH / 2;
  g.add(coreBlock(top));
  g.add(box(B.coreW + 0.08, 0.06, B.zCore - B.zB + 0.08, C.white, { at: [B.xC + B.coreW / 2, top, (B.zB + B.zCore) / 2] }));
  // air conditioning units; they make room for the stage when the building is finished (main.js)
  const units = new THREE.Group();
  g.add(units);
  g.userData.units = units;
  for (const x of [-1.6, -0.95]) {
    units.add(box(0.5, 0.3, 0.4, '#E3E1DC', { at: [x, 0, -0.85] }));
    units.add(box(0.3, 0.02, 0.24, C.steel, { at: [x, 0.3, -0.85] }));
  }
  const stage = launchStage(world);
  stage.visible = false;
  g.add(stage);
  g.userData.stage = stage;
  // while the building grows the crane alone says it: no crates or beams on the roof (crates are the sign of the
  // floors still to build; the user's choice, 27/10/2026)
  const cr = crane(world.lampMats);
  cr.scale.setScalar(0.6);
  cr.position.set(B.xC + B.coreW / 2, top + 0.06, -0.5);
  g.add(cr);
  g.userData.crane = cr;
  return g;
}

/** The roof of the finished building, where the launch happens (27/10/2026, road A chosen by the user): a low white
 *  stage at the back with the 12 colours of the floors along its front, a wooden backdrop, two spotlights, the product
 *  on a plinth under a cloth, two benches waiting for the audience, a glass parapet. The product is never shown. */
function launchStage(world) {
  const g = new THREE.Group();
  const SX = -0.45; // the middle of the stage
  const PZ = -0.82; // where the product stands
  // the stage
  const stageH = 0.22;
  g.add(box(3.0, stageH, 1.05, C.white, { at: [SX, 0, -0.8] }));
  // the backdrop: a wooden frame round a warm white panel, standing at the back of the stage; along its top every
  // floor's colour, because each department brought something to the launch (on the edge of the stage the benches hid it)
  g.add(box(3.2, 1.4, 0.1, C.wood, { at: [SX, stageH, -1.27] }));
  g.add(box(2.98, 1.12, 0.03, C.white, { at: [SX, stageH + 0.09, -1.21] }));
  const bw = 2.98 / FLOORS.length;
  FLOORS.forEach((f, i) => g.add(box(bw, 0.1, 0.03, mat(f.color), { at: [SX - 1.49 + bw * (i + 0.5), stageH + 1.21, -1.21] })));
  // the product, covered: a plinth and a cloth falling straight to a hem
  g.add(box(0.6, 0.34, 0.6, C.white, { at: [SX, stageH, PZ] }));
  const clothMat = mat('#EFE4D2', { roughness: 0.92 });
  const square = (rTop, rBottom, h, y) => {
    const c = cyl(rTop, rBottom, h, clothMat, { seg: 4, at: [SX, y, PZ] });
    c.rotation.y = Math.PI / 4;
    g.add(c);
  };
  const clothY = stageH + 0.34;
  square(0.33, 0.35, 0.04, clothY); // the hem
  square(0.29, 0.33, 0.44, clothY + 0.04);
  square(0.25, 0.29, 0.06, clothY + 0.48);
  // two spotlights on light stands, turned towards the product
  for (const x of [SX - 1.4, SX + 1.4]) {
    g.add(box(0.08, 0.95, 0.08, C.frame, { at: [x, stageH, -0.45] }));
    const head = box(0.2, 0.17, 0.24, C.navy, { at: [x, stageH + 0.95, -0.45] });
    head.rotation.y = Math.atan2(SX - x, PZ + 0.45) + Math.PI;
    g.add(head);
  }
  // the audience waits on two long wooden benches
  for (const z of [0.4, 1.0]) {
    g.add(box(2.4, 0.08, 0.3, C.wood, { at: [SX, 0.26, z] }));
    for (const x of [SX - 0.95, SX + 0.95]) g.add(box(0.22, 0.26, 0.26, C.cream, { at: [x, 0, z] }));
  }
  // a low glass parapet with a white rail along the front edge
  const x0 = B.xL - B.lip;
  const glass = new THREE.MeshStandardMaterial({ color: C.glass, transparent: true, opacity: 0.3, roughness: 0.08 });
  g.add(box(B.xC - x0, 0.36, 0.03, glass, { at: [(x0 + B.xC) / 2, 0.12, B.zCore - 0.08] }));
  g.add(box(B.xC - x0, 0.04, 0.06, C.white, { at: [(x0 + B.xC) / 2, 0.48, B.zCore - 0.08] }));
  shadows(g, true, true);
  return g;
}

/** One floor of the building, open at the front like a doll's house: a thin plate coming out of the stone core. */
export function makeFloorShell(info, world) {
  const g = new THREE.Group();
  g.position.y = floorY(info.n);
  const wallMat = new THREE.MeshStandardMaterial({ color: C.cream, roughness: 0.75 });
  g.userData.wallMat = wallMat;
  const W = B.xR - B.xL;
  const D = B.zF - B.zB;
  // floor: warm wooden boards
  const boards = canvasTexture(
    256,
    256,
    (c, w, h) => {
      for (let i = 0; i < 8; i++) {
        c.fillStyle = `hsl(30, 45%, ${70 + (i % 3) * 2 + Math.random() * 2}%)`;
        c.fillRect(0, (i * h) / 8, w, h / 8);
        c.fillStyle = 'rgba(110,70,40,0.18)';
        c.fillRect(0, (i * h) / 8, w, 2);
        c.fillRect(((i * 97) % 200) + 20, (i * h) / 8, 2, h / 8);
      }
    },
    { repeat: [2, 1.6] },
  );
  // the boards sit 1.5 cm above the plinth (piano 1) or the slab below (other floors): never on the same plane
  const floor = box(W - 0.2, 0.05, D - 0.12, new THREE.MeshStandardMaterial({ map: boards, roughness: 0.7 }), { at: [0, -0.035, 0.02] });
  g.add(floor);
  // back wall up to the core, left wall up to the glass corner, baseboards
  const leftD = D - B.corner;
  const inside = [
    floor,
    box(B.xC - B.xL, B.ih, B.wall, wallMat, { at: [(B.xL + B.xC) / 2, 0, B.zB + B.wall / 2] }),
    box(B.wall, B.ih, leftD, wallMat, { at: [B.xL + B.wall / 2, 0, B.zB + leftD / 2] }),
    box(B.xC - B.inL, 0.08, 0.03, C.stoneDark, { at: [(B.inL + B.xC) / 2, 0, B.inB + 0.015] }),
    box(0.03, 0.08, B.zF - B.corner - B.inB, C.stoneDark, { at: [B.inL + 0.015, 0, (B.inB + B.zF - B.corner) / 2] }),
  ];
  g.add(...inside);
  // the front corner on the left is glass, with no post
  const glass = new THREE.MeshStandardMaterial({ color: C.glass, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0.2, depthWrite: false });
  g.userData.glassMat = glass;
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(B.corner, B.ih), glass);
  pane.rotation.y = Math.PI / 2;
  pane.position.set(B.xL + B.wall / 2, B.ih / 2, B.zF - B.corner / 2);
  pane.renderOrder = 2;
  g.add(pane);
  // this floor's piece of the stone core
  g.add(coreBlock(B.floorH));
  // ceiling: a recessed band in the department colour under a thin white plate that juts out in front and on the left
  const band = mat(info.color, { roughness: 0.5 });
  g.userData.bandMat = band;
  g.add(box(B.xC - B.xL, 0.16, D + 0.04, band, { at: [(B.xL + B.xC) / 2, B.ih, (B.zB + B.zF + 0.04) / 2] }));
  const plateD = B.zCore - 0.02 - B.zB;
  g.add(box(B.xC - B.xL + B.lip, B.slab - 0.16, plateD, C.white, { at: [(B.xL - B.lip + B.xC) / 2, B.ih + 0.16, B.zB + plateD / 2] }));
  // the floor's name: anchored on its left edge, so from outside it grows to the right and reads (main.js showSigns)
  const signGeo = new THREE.PlaneGeometry(1.5, 1.5 * (224 / 1024));
  signGeo.translate(0.75, 0, 0);
  const sign = new THREE.Mesh(signGeo, new THREE.MeshStandardMaterial({ map: signTexture(info), transparent: true, roughness: 0.6 }));
  // far enough from the left edge that, close to a floor, the name stays inside the phone's screen
  sign.position.set(-1.55, B.ih + B.slab / 2, B.zB + plateD + 0.006);
  g.add(sign);

  // main.js sizes it by the view
  g.userData.signName = sign;
  // the ceiling seen from inside, slightly warm
  const under = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.2, D - 0.2), mat('#FFF8EC', { side: THREE.DoubleSide, emissive: '#FFF3E2', emissiveIntensity: 0.55 }));
  under.rotation.x = Math.PI / 2;
  under.position.set(0, B.ih - 0.005, 0);
  g.add(under);
  inside.push(under);
  shadows(g);
  // inside the building there are no shadows: the room is evenly lit
  for (const m of inside) m.receiveShadow = false;
  return g;
}

/** Everything that is not the building. */
// ---------- the city round the block ----------
// The sede's block: wide enough that the city starts well behind it. With one floor only, nearer buildings towered
// over the sede: the camera is low and close, and what stands behind looks tall (sketches of 30/10/2026).
const LOT = { x0: -10.5, x1: 11, z0: -12, z1: 6.4 };
const WALK = 1.3; // the pavement round a block
const STREET = 3.4;
const ASPHALT = '#C8C2B8';
// The city's buildings: square-edged blocks, low (the sede, as it grows, rises over them all), in the warm neutrals of
// the world, so the colour stays with the floors of the sede. A window is BAY wide, a floor STOREY high: smaller than
// a floor of the sede, whose floors are rooms seen in section. The facade texture is CELLS windows by CELLS floors.
const BAY = 1.1;
const STOREY = 1.25;
const CELLS = 8;
// light stone, warm white, warm grey, sand, each with the glass of its windows
const FACADES = [
  ['#EEE7DB', '#B7C4CA'],
  ['#F5F2EC', '#AEBFC8'],
  ['#DDD8CF', '#A9B8C0'],
  ['#E7DAC6', '#B3C0C3'],
];
const windowRect = (g, i, j, c) => g.fillRect(i * c + c * 0.22, j * c + c * 0.24, c * 0.56, c * 0.5);

/** The facades, one material per colour. */
function facadeMats() {
  return FACADES.map(([wall, glass]) => {
    const map = canvasTexture(
      512,
      512,
      (g, w) => {
        const c = w / CELLS;
        g.fillStyle = wall;
        g.fillRect(0, 0, w, w);
        g.fillStyle = glass;
        for (let i = 0; i < CELLS; i++) for (let j = 0; j < CELLS; j++) windowRect(g, i, j, c);
        // a ledge under every floor, a little lighter than the wall
        g.fillStyle = 'rgba(255,255,255,0.35)';
        for (let j = 0; j < CELLS; j++) g.fillRect(0, j * c + c - 4, w, 4);
      },
      { repeat: [1, 1] },
    );
    return new THREE.MeshStandardMaterial({ map, roughness: 0.85 });
  });
}

/** A box with the windows on its four sides, the facade texture starting at window `ou`, floor `ov`. */
function facadeBox(w, h, depth, ou, ov) {
  const geo = new THREE.BoxGeometry(w, h, depth);
  const uv = geo.attributes.uv;
  const span = [depth, depth, w, w, w, depth]; // px, nx, py, ny, pz, nz
  for (let face = 0; face < 6; face++)
    for (let v = 0; v < 4; v++) {
      const i = face * 4 + v;
      // the roof and the floor take one spot of plain wall, between the windows
      if (face === 2 || face === 3) uv.setXY(i, 0.1 / CELLS, 1 - 0.1 / CELLS);
      else uv.setXY(i, (uv.getX(i) * span[face]) / BAY / CELLS + ou / CELLS, (uv.getY(i) * h) / STOREY / CELLS + ov / CELLS);
    }
  return geo;
}

// The towers (Nello: «farei magari anche qualche grattacielo altrimenti quando sali è così»; the user's choice,
// 30/10/2026, sketch B «ai lati» with remedy 2 «da in alto», `1. LAVORO/grattacieli/`): two groups, left and right,
// behind the sede, the sky behind it left free. With floor 1 the camera is low and close and they would fill the
// sky, so they come up in the haze as the camera climbs (`fadeTowers` in main.js). Each one steps in once near the
// top and has a white slab on its roof. The camera looks at the sede a little from the right, with a strong
// perspective: "left" and "right" are on the screen, beside the slabs and beside the core (measured at floor 12).
// [x, z, bays wide, depth, floors, facade]
const TOWERS = [
  [-12, -26, 4, 4, 20, 1], [-14.5, -36, 5, 4.4, 15, 0], [-17, -46, 4, 4, 24, 2], [-11, -40, 4, 4, 26, 3],
  [0.5, -26, 4, 4, 18, 2], [-1.5, -36, 4, 4.4, 14, 3], [-2.5, -44, 5, 4.4, 22, 1],
];

/** The towers, in their own materials (clones of the facades that can fade): `world.towers`, `world.towerMats`. */
function makeTowers(world, facades) {
  const mats = facades.map((m) => Object.assign(m.clone(), { transparent: true }));
  const cap = mat('#F7F4EE', { roughness: 0.8, transparent: true });
  const parts = mats.map(() => []);
  const caps = [];
  TOWERS.forEach(([x, z, bays, depth, floors, fac], k) => {
    const low = floors - 3;
    // the base goes 5 cm into the ground: on it, it would sit face to face with the bottom of a low building
    const geo = facadeBox(bays * BAY, low * STOREY + 0.05, depth, k % CELLS, (k * 3) % CELLS);
    geo.translate(x, (low * STOREY) / 2 - 0.025, z);
    const top = facadeBox((bays - 1) * BAY, 3 * STOREY, depth - 1.1, (k + 2) % CELLS, k % CELLS);
    top.translate(x, low * STOREY + 1.5 * STOREY, z);
    parts[fac].push(geo, top);
    const c = new THREE.BoxGeometry((bays - 1) * BAY + 0.2, 0.18, depth - 0.9);
    c.translate(x, floors * STOREY + 0.09, z);
    caps.push(c);
  });
  const g = new THREE.Group();
  parts.forEach((geos, k) => geos.length && g.add(new THREE.Mesh(mergeGeometries(geos), mats[k])));
  g.add(new THREE.Mesh(mergeGeometries(caps), cap));
  world.towers = g;
  world.towerMats = [...mats, cap];
  return g;
}

/** The city outside the sede's block: streets with their markings and a zebra crossing in front, a pavement with
 *  trees along the side streets and two lamps in front, and the blocks of buildings around, none in front (they
 *  would stand between you and the sede). The buildings are merged into one piece per facade, for the phone. */
function makeCity(world) {
  const g = new THREE.Group();
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const mats = facadeMats();
  const walls = mats.map(() => []);
  const machines = [];
  const slabs = new Map(); // material → geometries of the flat pieces on the ground

  const slab = (x0, x1, z0, z1, h, m) => {
    const geo = new THREE.BoxGeometry(x1 - x0, h, z1 - z0);
    geo.translate((x0 + x1) / 2, h / 2, (z0 + z1) / 2);
    if (!slabs.has(m)) slabs.set(m, []);
    slabs.get(m).push(geo);
  };
  const walk = mat('#E8E1D5', { roughness: 0.9 });
  const paint = mat('#F7F4EE', { roughness: 0.8 });
  const pit = mat('#8A6A50', { roughness: 0.95 });

  /** A building: windows on its four sides, the roof the colour of its wall, now and then a small box on top. */
  const building = (x, z, bays, depth, floors) => {
    const w = bays * BAY;
    const h = floors * STOREY;
    const ou = Math.floor(rnd() * CELLS);
    const ov = Math.floor(rnd() * CELLS);
    const geo = facadeBox(w, h, depth, ou, ov);
    geo.translate(x, h / 2, z);
    walls[Math.floor(rnd() * FACADES.length)].push(geo);
    if (floors >= 3 && rnd() < 0.6) {
      const b = new THREE.BoxGeometry(w * 0.3, 0.4, depth * 0.3);
      b.translate(x + (rnd() - 0.5) * w * 0.3, h + 0.2, z + (rnd() - 0.5) * depth * 0.3);
      machines.push(b);
    }
  };
  /** Buildings side by side from a to b along x (dir 'x') or z, their fronts on the line `at`, facing +1 or -1. */
  const row = (dir, a, b, at, depth, lo, hi, facing) => {
    let t = a;
    while (t < b - 1.5) {
      const bays = Math.min(Math.round((b - t) / BAY), 2 + Math.floor(rnd() * 3));
      const w = bays * BAY;
      const floors = lo + Math.floor(rnd() * (hi - lo + 1));
      const d = depth - rnd() * 1.2;
      const off = at - (facing * d) / 2;
      if (dir === 'x') building(t + w / 2, off, bays, d, floors);
      else building(off, t + w / 2, bays, d, floors);
      t += w + 0.04;
    }
  };
  /** A block: a pavement all round and buildings along its four sides; the row on the street in front stays low. */
  const block = (x0, x1, z0, z1, lo, hi, frontHi) => {
    slab(x0, x1, z0, z1, 0.07, walk);
    const p = 1.2;
    const d = 4.6;
    row('x', x0 + p, x1 - p, z1 - p, d, Math.min(lo, frontHi), frontHi, 1);
    row('x', x0 + p, x1 - p, z0 + p, d, lo, hi, -1);
    row('z', z0 + p + d, z1 - p - d, x0 + p, d, lo, hi, -1);
    row('z', z0 + p + d, z1 - p - d, x1 - p, d, lo, hi, 1);
  };

  // the pavement round the sede's block
  const L = LOT;
  slab(L.x0 - WALK, L.x1 + WALK, L.z1, L.z1 + WALK, 0.07, walk);
  slab(L.x0 - WALK, L.x1 + WALK, L.z0 - WALK, L.z0, 0.07, walk);
  slab(L.x0 - WALK, L.x0, L.z0, L.z1, 0.07, walk);
  slab(L.x1, L.x1 + WALK, L.z0, L.z1, 0.07, walk);
  // the dashes down the middle of the streets, the zebra crossing in front of the sede
  const mid = STREET / 2 + WALK;
  for (let t = -40; t < 40; t += 1.6) slab(t, t + 0.8, L.z1 + mid - 0.05, L.z1 + mid + 0.05, 0.012, paint);
  for (const x of [L.x0 - mid, L.x1 + mid]) for (let t = -60; t < L.z1 + WALK; t += 1.6) slab(x - 0.05, x + 0.05, t, t + 0.8, 0.012, paint);
  for (let k = -3; k <= 3; k++) slab(-0.3 + k * 0.36 - 0.12, -0.3 + k * 0.36 + 0.12, L.z1 + WALK + 0.1, L.z1 + WALK + STREET - 0.1, 0.012, paint);
  // the blocks around: low all round, so the sky stays
  const W = L.x1 - L.x0 + 2 * WALK;
  const D = L.z1 - L.z0 + 2 * WALK;
  for (let bx = -2; bx <= 2; bx++)
    for (let bz = -3; bz <= 0; bz++) {
      if (bx === 0 && bz === 0) continue;
      const x0 = L.x0 - WALK + bx * (W + STREET);
      const z0 = L.z0 - WALK + bz * (D + STREET);
      block(x0, x0 + W, z0, z0 + D, 2, 3, 2);
    }
  // trees along the side streets, in their square pits (in front they hid the steps)
  const trees = [];
  for (let z = L.z0 + 1; z < L.z1 - 1; z += 2.8)
    for (const x of [L.x0 - WALK / 2, L.x1 + WALK / 2]) {
      slab(x - 0.3, x + 0.3, z - 0.3, z + 0.3, 0.075, pit);
      trees.push(tree(x, z, 0.72, Math.floor(rnd() * 3) === 1 ? 0 : Math.floor(rnd() * 3)));
    }
  // two street lamps in warm white in front of the sede
  const lampHead = mat('#FFF6DE', { emissive: '#FFD58A', emissiveIntensity: 0.15 });
  world.lampMats.push(lampHead);
  for (const x of [-4.6, 4.4]) {
    const l = new THREE.Group();
    l.add(box(0.07, 1.9, 0.07, '#F2EDE4'), box(0.5, 0.06, 0.16, '#F2EDE4', { at: [0.2, 1.86, 0] }), box(0.26, 0.08, 0.14, lampHead, { at: [0.36, 1.78, 0] }));
    l.position.set(x, 0.07, L.z1 + WALK / 2);
    g.add(l);
  }

  for (const [m, geos] of slabs) {
    const s = new THREE.Mesh(mergeGeometries(geos), m);
    s.receiveShadow = true;
    g.add(s);
  }
  walls.forEach((geos, k) => {
    if (!geos.length) return;
    const b = new THREE.Mesh(mergeGeometries(geos), mats[k]);
    b.receiveShadow = true;
    g.add(b);
  });
  if (machines.length) g.add(new THREE.Mesh(mergeGeometries(machines), mat('#ECE6DC', { roughness: 0.8 })));
  g.add(makeTowers(world, mats));
  g.add(...trees);
  g.traverse((o) => (o.raycast = () => {})); // a touch on the city is a touch on nothing: back outside
  return g;
}

export function makeCampus(world) {
  const g = new THREE.Group();
  world.frontProps = [];
  world.lampMats = [];
  // the street is the ground; the lawn is the sede's block, a little higher; the plaza (6 cm) stands on it
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), mat(ASPHALT, { roughness: 0.95 }));
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  g.add(ground);
  const lawn = new THREE.MeshStandardMaterial({ map: grassTexture(), roughness: 0.95 });
  lawn.map.repeat.set(((LOT.x1 - LOT.x0) * 55) / 130, ((LOT.z1 - LOT.z0) * 55) / 130);
  g.add(box(LOT.x1 - LOT.x0, 0.02, LOT.z1 - LOT.z0, lawn, { at: [(LOT.x0 + LOT.x1) / 2, 0, (LOT.z0 + LOT.z1) / 2] }));
  g.add(makeCity(world));

  // plaza around the front and right of the building
  g.add(box(9.4, 0.06, 6.4, new THREE.MeshStandardMaterial({ map: tileTexture(4.7, 3.2), roughness: 0.85 }), { at: [0, 0, 1.9] }));
  g.add(box(9.6, 0.04, 6.6, C.stoneDark, { at: [0, 0, 1.9] }));
  // plinth under the building and its core, long low steps in front
  g.add(box(6.0, B.plinth - 0.01, 3.5, C.stone, { at: [0.25, 0, 0.12] }));
  g.add(box(3.6, 0.22, 0.32, C.stone, { at: [-0.3, 0, 2.03] }));
  g.add(box(3.6, 0.11, 0.3, C.stone, { at: [-0.3, 0, 2.34] }));
  // the way in is through the stone core, under a thin canopy
  const coreX = B.xC + B.coreW / 2;
  g.add(box(0.44, 1.25, 0.02, mat(C.navy, { roughness: 0.35, metalness: 0.2 }), { at: [coreX, B.plinth, B.zCore + 0.01] }));
  g.add(box(1.0, 0.05, 0.6, C.white, { at: [coreX, B.plinth + 1.42, B.zCore + 0.3] }));

  // a few trees around, a quiet row behind
  // small enough to stay whole beside the building on a phone
  for (const [x, z, sc, shape] of [
    [-3.4, -2.3, 0.95, 0],
    [-2.9, -3.8, 1.05, 1],
    [4.0, -2.6, 1.05, 1],
    [3.85, -1.35, 0.85, 2],
    [0.9, -4.9, 1.2, 0],
  ])
    g.add(tree(x, z, sc, shape));
  // the row behind is the edge of the garden, inside the block
  for (let i = 4; i < 8; i++) {
    const x = -24 + i * 4.3 + Math.sin(i * 12.9) * 0.8;
    const z = -10 + Math.cos(i * 4.1) * 1.2;
    g.add(tree(x, z, 1.3 + ((i * 37) % 10) / 20, i));
  }
  g.add(hedge(-3.2, -1.9, 1.3, 0.5), hedge(3.7, -2.1, 1.0, 0.45), hedge(3.95, 0.6, 0.5, 1.4));

  // plaza furniture; what stands in front of the building hides when you look inside
  const front = (o) => {
    world.frontProps.push(o);
    return o;
  };
  // the pool stands at the side, so it never covers the room
  g.add(front(pool(-3.4, 3.4, 2.0, 0.9)));
  g.add(front(bench(-2.1, 3.4, -Math.PI / 2)));
  g.add(front(planter(-2.7, 2.3, 0.9, 0.42)));
  g.add(front(planter(3.6, 2.2, 0.42, 1.0)));
  for (const [x, z] of [
    [-3.6, 4.7],
    [4.3, 4.7],
  ])
    g.add(front(lampPost(x, z, world.lampMats)));
  return g;
}
