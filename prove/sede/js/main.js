// FEEN · la sede, prova in stile «Clash of Clans corporate» (24/10/2026),
// asciugata nello stile di Bending Spoons dopo il parere di Davide (strada A).
// I piani arredati salgono uno alla volta (25/10/2026: Direzione e Tesoreria), con la sede intorno,
// da aprire sul telefono.
// 25/10/2026 pomeriggio, dopo il parere di Davide: niente zoom né giro intorno al palazzo;
// l'angolo è fisso e il dito porta su e giù nel palazzo, da fuori e da vicino.

import { IN_APP } from './app.js'; // first: the page knows at once whether it is the app (no Demo) or the prova
import * as THREE from 'three';
import { C, manager, updateTweens, tween, wait, ease, sfx, sound, buzz, haptics, motion, sphere, canvasTexture, strokeText, rbox, mat, inkOn } from './kit.js';
import { B, FLOORS, floorY, makeSky, makeCampus, makeFloorShell, makeRoofSite } from './world.js';
import { ROOMS, furnishRoom } from './office.js';
import { makePath } from './path.js';
import { makeMe } from './me.js';
import { makeAvvio } from './avvio.js';
import { makeLesson } from './lezione.js';
import { LESSONS, CASES, TRAPS, FIELDS } from './lessons-data.js';
import { makeCase } from './caso.js';
import { makeField } from './campo.js';
import { loadProgress, saveProgress, askBroken } from './salva.js';
import { reminders, syncReminders, canRemind } from './avvisi.js';
import { makeTrophies, TROPHIES, emblem } from './trophies.js';
import { PEOPLE } from './people.js';

const $ = (id) => document.getElementById(id);
const DEG = Math.PI / 180;

// ---------- renderer, scene, lights ----------
const canvas = $('scene');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog('#D9E7F3', 30, 95);
// a narrow lens: the building keeps its depth but its verticals stay straight, almost a drawing;
// nothing comes nearer than the object in the card (1.2), so the near plane can stay at 0.5: the depth is then five
// times finer than with 0.1, and on a phone two surfaces a millimetre apart no longer flicker into each other
const camera = new THREE.PerspectiveCamera(24, 1, 0.5, 240);

const hemi = new THREE.HemisphereLight('#F2F6FF', '#C4D2AE', 1.5);
scene.add(hemi);
const sun = new THREE.DirectionalLight('#FFF4E6', 2.3);
// far away along its direction, so that the top floors of a tall building still cast shadows
sun.position.set(-15, 28.5, 34);
sun.target.position.set(0, 0, 1);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -11, right: 11, top: 11, bottom: -10, near: 1, far: 90 });
sun.shadow.bias = -0.0002;
sun.shadow.normalBias = 0.02;
sun.shadow.radius = 5;
scene.add(sun, sun.target);
const fill = new THREE.DirectionalLight('#BFD9FF', 0.55);
fill.position.set(8, 5, 6);
scene.add(fill);
const world = { anim: [], mixers: [], roomLights: [], roomLampMats: [] };
window.__feen = { camera, scene, world };
// `floor` is the floor in progress (the top one built), `earned` the stages done on it
// the prova opens on floor 1 with no stage done, as for a new player (the user's choice, 28/10/2026, before
// TestFlight); «Demo» jumps to the last furnished floor, halfway
const LAST = Math.max(...Object.keys(ROOMS).map(Number));
// tab: the bar's tab on screen; the prova opens on the Percorso (riunione del 28/10/2026)
// lessons: «Lezioni» in DEMO. 'prova': the lessons of the Percorso without an approved card play the test lesson
// (07/11/2026); 'giuste' or 'errore': they are pretend, all right or with one wrong and right at «Ci riprovi»
const state = { floor: 1, earned: 0, busy: false, view: 'overview', viewFloor: 1, glow: true, tab: 'percorso', lessons: 'prova' };
const built = new Map(); // n → { shell, office }; office is null for a floor not furnished yet
let roofSite, sky;
const cur = () => built.get(state.floor)?.office ?? null;
const earnedOn = (n) => (n < state.floor ? 8 : n === state.floor ? state.earned : 0);
const cap = (t) => t[0].toUpperCase() + t.slice(1);

// ---------- camera rig: the angle is fixed; the finger takes it up and down, two fingers zoom in ----------
// `zoom` brings the camera closer than the preset; `pan` moves it along the screen while zoomed (x right, y up)
const rig = {
  cur: { target: new THREE.Vector3(), az: 12, el: 10, dist: 30, zoom: 1, pan: new THREE.Vector2() },
  goal: { target: new THREE.Vector3(), az: 12, el: 10, dist: 30, zoom: 1, pan: new THREE.Vector2() },
  preset: null,
  yRate: 4.2, // how quickly the camera reaches its height: slower while it glides after a swipe
};
window.__feen.rig = rig;
function fitDist(w, h) {
  const v = camera.fov * DEG;
  const hf = 2 * Math.atan(Math.tan(v / 2) * camera.aspect);
  return Math.max(w / 2 / Math.tan(hf / 2), h / 2 / Math.tan(v / 2));
}
const roomY = (n) => floorY(n) + 0.78; // the height the camera looks at when it is close to floor n
/** From outside the building is framed as it was up to 4 floors; taller, it keeps that size and the swipe runs along it. */
function outside() {
  const k = Math.min(state.floor, 4) - 1;
  // never narrower than the floor with the core and the crane on top: with one floor only the crane left the screen
  // (28/10/2026, now that the prova opens on floor 1)
  const dist = fitDist(Math.max(6.4, 5.0 + k * 1.2), 5.6 + k * 2.9);
  const lo = 1.0 + k * 1.2;
  const hi = lo + Math.max(0, state.floor - 4) * B.floorH;
  // at the bottom the plaza clears the stage pill and the tab bar, however short the screen
  const half = dist * Math.tan((camera.fov * DEG) / 2);
  // the pill and the tabs: away from the Ufficio (the Percorso at the start, the first start) they are not laid out, so
  // the bar is counted as it will be there; with a zero box the framing fell back to the middle of the screen
  const cta = $('cta').getBoundingClientRect();
  const tabs = document.querySelector('.tabs').getBoundingClientRect();
  const top = cta.height ? cta.top : tabs.height ? tabs.top - 74 : window.innerHeight - 150;
  const bar = ((window.innerHeight - top + 8) / window.innerHeight) * 2 * half;
  const floorOnBar = PLAZA_Y + half - bar; // the height at which the plaza sits right on the bar
  // while the building is short it rests low, with a strip of street over the bar and the sky above it, where the
  // floors to come will rise (revisione della grafica, 10/11/2026 sera: before, it sat in the middle over a third of
  // the screen of asphalt); once it is taller than that, nothing changes
  return { dist, lo: Math.min(lo, floorOnBar), hi: Math.max(hi, floorOnBar - 0.9) };
}
const PLAZA_Y = -0.9; // the height, at the building, that just clears the bar: below it lie the steps and the plaza
/** Floor n in the free space above `top` (the top of a panel at the bottom of the screen, in px), a little below its
 *  middle so the crane on the roof stays in sight; the distance is the one from outside (revisione della grafica,
 *  quarta ondata, 10/11/2026 notte: at the end of a floor the partner's words, three times taller than the tab bar on
 *  which the framing rests the building, covered the floor just finished). */
function frameAbove(n, top) {
  const { dist } = outside();
  const half = dist * Math.tan((camera.fov * DEG) / 2);
  const at = top * 0.72; // where the middle of the room goes on the screen, in px from the top
  rig.goal.target.y = floorY(n) + B.ih / 2 - ((window.innerHeight / 2 - at) / (window.innerHeight / 2)) * half;
}
const PRESETS = {
  // the building from outside, with the crane on top; `n` is the floor to keep in sight, `y` a height reached with the finger
  overview: ({ n = state.floor, y } = {}) => {
    const { dist, lo, hi } = outside();
    const at = y ?? hi - (state.floor - n) * B.floorH;
    return { target: [0.35, THREE.MathUtils.clamp(at, lo, hi), 0.4], az: 12, el: 10, dist }; // a little to the right: the core is there
  },
  interior: (n = state.floor) => ({ target: [0, roomY(n), -0.6], az: 7, el: 7, dist: fitDist(4.4, 2.4) }),
  slot: ({ n, i }) => {
    const p = built.get(n).office.worldPos(i);
    return { target: [p.x, p.y - 0.1, p.z], az: 6, el: 8, dist: fitDist(2.2, 1.7) };
  },
};
/** `keepZoom`: the same view, framed again (the screen changed size): the zoom stays, every other move resets it. */
function go(name, arg, { instant = false, keepZoom = false } = {}) {
  rig.preset = [name, arg];
  rig.yRate = 4.2;
  const p = PRESETS[name](arg);
  rig.goal.target.set(...p.target);
  Object.assign(rig.goal, { az: p.az, el: p.el, dist: p.dist });
  if (!keepZoom) {
    rig.goal.zoom = 1;
    rig.goal.pan.set(0, 0);
  }
  if (instant) {
    rig.cur.target.copy(rig.goal.target);
    Object.assign(rig.cur, { az: p.az, el: p.el, dist: p.dist, zoom: rig.goal.zoom });
    rig.cur.pan.copy(rig.goal.pan);
  }
  const view = name === 'overview' ? 'overview' : 'inside';
  if (name === 'interior') state.viewFloor = arg ?? state.floor;
  if (name === 'slot') state.viewFloor = arg.n;
  if (view !== 'overview') hideCoach();
  if (view !== state.view) showProps(view === 'overview', instant);
  state.view = view;
  if (keepZoom) settleZoom();
  showBack();
  // the plate follows the floor you look at; a floor still rising gets it once it is built
  if (plateFloor() !== platedFloor && built.has(plateFloor())) {
    renderPlate();
    renderCta();
  }
  renderA11y();
  showSigns();
}

/** Every floor shows its name (10/11/2026, Davide: no numbers like a bingo card), bigger from outside so it reads;
 *  inside a floor the plate at the top adds its level. */
function showSigns() {
  const inside = state.view !== 'overview';
  // close on an object (it lands, or floats in its card) the plate of the floor would be cut by the edge of the screen
  // or half hidden behind the object: it steps aside until the room is seen whole again (09/11/2026, rule 7)
  const close = rig.preset?.[0] === 'slot' || !!shown;
  for (const { shell } of built.values()) {
    const sign = shell.userData.signName;
    sign.visible = !(inside && close);
    sign.scale.setScalar(inside ? 1 : 1.35);
  }
  $('plate').classList.toggle('in-floor', inside);
}

/** What stands on the plaza in front of the building steps aside when you look inside. */
function showProps(show, instant) {
  for (const o of world.frontProps ?? []) {
    const base = (o.userData.baseScale ??= o.scale.x);
    if (instant) {
      o.visible = show;
      o.scale.setScalar(base);
      continue;
    }
    if (show) {
      o.visible = true;
      o.scale.setScalar(0.01);
      tween(0.45, (k) => o.scale.setScalar(Math.max(0.01, k * base)), { easing: ease.back, delay: 0.35 + Math.random() * 0.25 });
    } else {
      tween(0.25, (k) => o.scale.setScalar(Math.max(0.01, (1 - k) * base)), { easing: ease.inOut, delay: Math.random() * 0.1 }).then(() => {
        if (state.view !== 'overview') o.visible = false;
      });
    }
  }
}
function updateCamera(dt) {
  // with «Movimento ridotto» the flights are about three times shorter; the glide after a swipe keeps its pace
  const rate = motion.calm ? 14 : 4.2;
  const k = 1 - Math.exp(-dt * rate);
  const c = rig.cur;
  const g = rig.goal;
  const y = c.target.y + (g.target.y - c.target.y) * (1 - Math.exp(-dt * (rig.yRate < 4.2 ? rig.yRate : rate)));
  c.target.lerp(g.target, k);
  c.target.y = y;
  c.az += (g.az - c.az) * k;
  c.el += (g.el - c.el) * k;
  c.dist += (g.dist - c.dist) * k;
  c.zoom += (g.zoom - c.zoom) * k;
  c.pan.lerp(g.pan, k);
  const az = c.az * DEG;
  const el = c.el * DEG;
  const d = c.dist / c.zoom;
  const look = lookPoint(c);
  camera.position.set(look.x + Math.sin(az) * Math.cos(el) * d, look.y + Math.sin(el) * d, look.z + Math.cos(az) * Math.cos(el) * d);
  camera.lookAt(look);
  // the haze stays behind the building, however far the camera is
  scene.fog.near = d + 2;
  scene.fog.far = d + 50;
  fadeTowers();
}
/** The towers of the city come up in the haze as the camera climbs: none with floor 1 (camera at 6.7), barely at
 *  floor 5 (14.2), about half at floor 8 (20.4), whole near floor 12 (28.5). With the low floors the camera is level
 *  with them and they would fill the sky (30/10/2026). */
function fadeTowers() {
  if (!world.towers) return;
  const a = THREE.MathUtils.smoothstep(camera.position.y, 12, 27);
  for (const m of world.towerMats) m.opacity = a;
  world.towers.visible = a > 0.01;
}
/** Where the camera looks: the target, moved along the screen by the pan of the zoom. */
function lookPoint(r) {
  const az = r.az * DEG;
  const el = r.el * DEG;
  return r.target
    .clone()
    .addScaledVector(new THREE.Vector3(Math.cos(az), 0, -Math.sin(az)), r.pan.x)
    .addScaledVector(new THREE.Vector3(-Math.sin(az) * Math.sin(el), Math.cos(el), -Math.cos(az) * Math.sin(el)), r.pan.y);
}

/** The sun's shadows reach up to the crane, however tall the building is. */
function fitShadow() {
  sun.shadow.camera.top = Math.max(11, (floorY(state.floor + 1) + 2.5) * 0.8);
  sun.shadow.camera.updateProjectionMatrix();
}

function resize() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  // a page opened in a hidden frame has no size yet: wait for the real one
  if (!w || !h) return;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  if (rig.preset && !state.busy) go(...rig.preset, { keepZoom: true });
}
window.addEventListener('resize', resize);

// ---------- input: the finger takes you up and down the building, two fingers zoom, a touch touches ----------
// the zoom works as in Clash of Clans (the user's choice, 28/10/2026): it stays where the fingers leave it, one finger
// then moves the picture every way, and past its limits it gives a little and springs back. No turning: the building
// is always seen from the same side. One gesture at a time (the user's choice, 28/10/2026, after trying both together):
// two fingers only zoom, a finger already moving the picture ignores a second one, and after a zoom nothing moves
// until the whole hand has lifted.
const pointers = new Map();
let gesture = null;
const SLOP = 8; // below this many pixels a touch is a tap, not a swipe
const ZOOM_MAX = { overview: 3, inside: 2.5 };
const zoomMax = () => ZOOM_MAX[state.view === 'overview' ? 'overview' : 'inside'];
const isZoomed = () => rig.goal.zoom > 1.02;
const clampY = (v, [lo, hi]) => THREE.MathUtils.clamp(v, lo, hi);
const pxToY = () => (2 * (rig.cur.dist / rig.cur.zoom) * Math.tan((camera.fov * DEG) / 2)) / window.innerHeight;
/** How far the zoomed picture can move from the middle, sideways and up, without going past the frame of the view. */
function panLimit(z) {
  const h = rig.goal.dist * Math.tan((camera.fov * DEG) / 2) * (1 - 1 / Math.max(1, z));
  return [h * camera.aspect, h];
}
/** Close enough to touch the objects: inside a room, or zoomed from outside until the frame is about a room wide. */
const closeUp = () => state.view !== 'overview' || (2 * rig.cur.dist * Math.tan((camera.fov * DEG) / 2) * camera.aspect) / rig.cur.zoom < 5.5;
/** How far the camera goes: along the building from outside, from floor 1 to the last floor built from close. */
function yRange() {
  if (state.view === 'overview') {
    const { lo, hi } = outside();
    const e = panLimit(rig.cur.zoom)[1];
    return [lo - e, hi + e];
  }
  return [roomY(1), roomY(state.floor)];
}
/** Moves what the camera looks at by `rx` to the right and `uy` up, in metres: from outside up and down is the swipe
 *  along the building, from close it is the pan of the zoom. */
function moveView(rx, uy) {
  const [lx, ly] = panLimit(rig.goal.zoom);
  rig.goal.pan.x = THREE.MathUtils.clamp(rig.goal.pan.x + rx, -lx, lx);
  if (state.view === 'overview') rig.goal.target.y = rig.cur.target.y = clampY(rig.goal.target.y + uy, yRange());
  else rig.goal.pan.y = THREE.MathUtils.clamp(rig.goal.pan.y + uy, -ly, ly);
  rig.cur.pan.copy(rig.goal.pan);
}
/** Zoom to `z`, keeping still the point under the fingers (or the mouse) at `x`, `y`. */
function zoomAt(z, x, y) {
  const px0 = pxToY();
  rig.goal.zoom = rig.cur.zoom = z;
  const px1 = pxToY();
  moveView((x - window.innerWidth / 2) * (px0 - px1), -(y - window.innerHeight / 2) * (px0 - px1));
}
/** The zoom comes back within its limits; pinched well under the room's frame, the room lets you out. */
function settleZoom() {
  const g = rig.goal;
  if (state.view !== 'overview' && g.zoom < 0.82 && !state.busy) {
    sfx.whoosh();
    go('overview', { n: state.viewFloor });
    return true;
  }
  if (state.view !== 'overview' && g.zoom >= zoomMax() - 0.02) trophy('lente');
  g.zoom = THREE.MathUtils.clamp(g.zoom, 1, zoomMax());
  if (g.zoom <= 1.02) g.zoom = 1;
  const [lx, ly] = panLimit(g.zoom);
  g.pan.set(THREE.MathUtils.clamp(g.pan.x, -lx, lx), THREE.MathUtils.clamp(g.pan.y, -ly, ly));
  showBack();
  return false;
}
/** «Sede» brings you out from a room, and back to the whole building from a zoom. */
const showBack = () => ($('btn-back').hidden = state.view === 'overview' && !isZoomed());
const pinchOf = () => {
  const [a, b] = [...pointers.values()];
  return { d: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
};
const nearestFloor = (y) => THREE.MathUtils.clamp(Math.round((y - roomY(1)) / B.floorH) + 1, 1, state.floor);
// past the ends the building follows the finger reluctantly, then springs back
const band = (v, [lo, hi]) => (v < lo ? lo - (lo - v) * 0.3 : v > hi ? hi + (v - hi) * 0.3 : v);

canvas.addEventListener('pointerdown', (e) => {
  canvas.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  hideCoach();
  if (pointers.size === 1) {
    // from outside a finger down stops the glide where it is; the flight into a room goes on to its floor
    if (!state.busy && state.view === 'overview') rig.goal.target.y = rig.cur.target.y;
    // the picture the finger aimed at: a tap counts on it, even if the camera is still flying when the finger lifts
    const aim = camera.clone();
    aim.updateMatrixWorld();
    gesture = { id: e.pointerId, t: performance.now(), moved: 0, raw: rig.cur.target.y, track: [], multi: false, pinched: false, aim };
  } else if (gesture) {
    // a second finger: never a tap; on a finger still at rest the two of them zoom, on a moving one it does nothing
    const moving = gesture.moved > SLOP;
    gesture.multi = true;
    gesture.moved = SLOP + 1;
    if (pointers.size === 2 && !moving && !gesture.pinched && !state.busy) {
      gesture.pinch = pinchOf();
      gesture.pinched = true;
    }
  }
});
canvas.addEventListener('pointermove', (e) => {
  const p = pointers.get(e.pointerId);
  if (!p) return;
  const dx = e.clientX - p.x;
  const dy = e.clientY - p.y;
  p.x = e.clientX;
  p.y = e.clientY;
  if (!gesture) return;
  if (gesture.pinch) {
    if (pointers.size === 2) pinchMove();
    return;
  }
  // only the first finger moves the picture, and not after a zoom
  if (gesture.pinched || e.pointerId !== gesture.id) return;
  gesture.moved += Math.abs(dx) + Math.abs(dy);
  if (gesture.moved <= SLOP || state.busy) return;
  // zoomed, the picture follows the finger every way; from close it never changes floor
  if (isZoomed()) {
    moveView(-dx * pxToY(), state.view === 'overview' ? 0 : dy * pxToY());
    if (state.view !== 'overview') return;
  }
  // the building follows the finger: drag it up to see the floors below
  gesture.raw += dy * pxToY();
  rig.goal.target.y = rig.cur.target.y = band(gesture.raw, yRange());
  const now = performance.now();
  gesture.track.push({ t: now, y: gesture.raw });
  while (gesture.track.length > 2 && now - gesture.track[0].t > 100) gesture.track.shift();
});
/** Two fingers: the zoom follows how far apart they are, around the point where they came down; the picture does not
 *  follow them. */
function pinchMove() {
  const now = pinchOf();
  const was = gesture.pinch;
  let r = now.d / was.d;
  // past the limits the zoom gives a little, then springs back when the fingers let go
  const z = rig.goal.zoom;
  if ((z >= zoomMax() && r > 1) || (z <= 1 && r < 1)) r = 1 + (r - 1) * 0.3;
  // a little: from close, enough under the frame to let you out of the room
  zoomAt(THREE.MathUtils.clamp(z * r, state.view === 'overview' ? 0.9 : 0.7, zoomMax() * 1.15), was.x, was.y);
  gesture.pinch = { ...was, d: now.d };
}
function endPointer(e) {
  if (!pointers.has(e.pointerId)) return;
  pointers.delete(e.pointerId);
  // one finger of the pinch lifted: the zoom is over, and the other finger moves nothing
  if (gesture?.pinch && pointers.size < 2) gesture.pinch = null;
  if (pointers.size === 0 && gesture) {
    if (gesture.moved < SLOP && !gesture.multi && performance.now() - gesture.t < 400) tap(e.clientX, e.clientY, gesture.aim);
    // a swipe glides on, even if a second finger came by; a zoom just settles
    else if (!state.busy) release(gesture.pinched ? { track: [] } : gesture);
    gesture = null;
  }
}
canvas.addEventListener('pointerup', endPointer);
canvas.addEventListener('pointercancel', endPointer);

/** The finger lets go: from outside the camera glides on and stops by itself; from close it settles on a floor. */
function release(g) {
  if (settleZoom()) return;
  const [a, b] = [g.track[0], g.track.at(-1)];
  const v = a && b && b !== a && performance.now() - b.t < 80 ? THREE.MathUtils.clamp((b.y - a.y) / Math.max(0.016, (b.t - a.t) / 1000), -25, 25) : 0;
  const y = rig.cur.target.y;
  if (state.view === 'overview') {
    rig.yRate = 2.4;
    rig.goal.target.y = clampY(y + v / rig.yRate, yRange());
    rig.preset = ['overview', { y: rig.goal.target.y }];
    return;
  }
  // zoomed into a room the picture stays where the finger left it
  if (isZoomed()) return;
  // a quick flick goes at least one floor further
  let n = nearestFloor(y + v * 0.15);
  if (Math.abs(v) > 2.5 && n === state.viewFloor) n = THREE.MathUtils.clamp(n + Math.sign(v), 1, state.floor);
  if (n !== state.viewFloor) sfx.whoosh();
  go('interior', n);
}

// on a computer the wheel does what the finger does; the trackpad pinch (or ctrl + wheel) zooms
let wheelTimer = null;
canvas.addEventListener(
  'wheel',
  (e) => {
    e.preventDefault();
    if (state.busy) return;
    hideCoach();
    if (e.ctrlKey) {
      const lo = state.view === 'overview' ? 1 : 0.8;
      zoomAt(THREE.MathUtils.clamp(rig.goal.zoom * Math.exp(-e.deltaY * 0.01), lo, zoomMax()), e.clientX, e.clientY);
      clearTimeout(wheelTimer);
      wheelTimer = setTimeout(() => !state.busy && settleZoom(), 180);
      return;
    }
    if (isZoomed()) {
      moveView(e.deltaX * pxToY(), state.view === 'overview' ? 0 : -e.deltaY * pxToY());
      if (state.view !== 'overview') return;
    }
    rig.goal.target.y = clampY(rig.goal.target.y - e.deltaY * pxToY(), yRange());
    clearTimeout(wheelTimer);
    wheelTimer = setTimeout(() => {
      if (state.busy) return;
      if (state.view === 'overview') rig.preset = ['overview', { y: rig.goal.target.y }];
      else go('interior', nearestFloor(rig.goal.target.y));
    }, 180);
  },
  { passive: false },
);

const raycaster = new THREE.Raycaster();
const pickables = [];
function isShown(o) {
  for (let n = o; n; n = n.parent) if (!n.visible) return false;
  return true;
}
/** `aim`: the camera as it was when the finger went down (the flight into a room may have moved it since). */
function tap(x, y, aim = camera) {
  if (state.busy) return;
  const ndc = new THREE.Vector2((x / window.innerWidth) * 2 - 1, -(y / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, aim);
  const hits = raycaster.intersectObjects(pickables, true).filter((h) => isShown(h.object));
  // from outside the objects are small and close together: a touch always enters the floor, the objects answer
  // from close up (the user's choice, 27/10/2026)
  // zoomed in from outside they are big enough again (28/10/2026)
  const outside = !closeUp();
  let floorPick = null;
  for (const h of hits) {
    for (let n = h.object; n; n = n.parent) {
      const pick = n.userData.pick;
      if (!pick) continue;
      if (pick.type === 'slot' && !outside) return onPick(pick);
      floorPick ??= pick.type === 'slot' ? { type: 'floor', n: pick.n } : pick;
      break;
    }
  }
  // close up the places are still small on a phone: a touch near one counts as touching it
  const near = outside ? null : nearestSlot(x, y, 40, aim);
  if (near) return onPick(near);
  if (floorPick) return onPick(floorPick);
  if (state.view !== 'overview') {
    sfx.whoosh();
    go('overview', { n: state.viewFloor });
  }
}

/** The place closest to a touch, among the floor you are looking into. */
function nearestSlot(x, y, radius, aim = camera) {
  let best = null;
  let bestD = radius;
  for (const [n, { office }] of built) {
    if (!office || (state.view !== 'overview' && n !== state.viewFloor)) continue;
    for (const s of office.slots) {
      const v = office.worldPos(s.stage).project(aim);
      if (v.z > 1) continue;
      const d = Math.hypot((v.x * 0.5 + 0.5) * window.innerWidth - x, (-v.y * 0.5 + 0.5) * window.innerHeight - y);
      if (d < bestD) {
        bestD = d;
        best = { type: 'slot', n, i: s.stage };
      }
    }
  }
  return best;
}

function onPick(pick) {
  sfx.tap();
  buzz(8);
  const looking = state.view !== 'overview' && state.viewFloor === pick.n;
  if (pick.type === 'slot') {
    const { n, i } = pick;
    if (i < earnedOn(n)) {
      showcase(n, i);
      openCard(n, i, false).then(unshow);
    } else {
      if (!looking) go('interior', n);
      toast(arrives(built.get(n).office.stages[i], i));
    }
    return;
  }
  if (pick.type === 'roof') {
    toast(ROOF_SAYS, { low: true });
    trophy('telo');
    return;
  }
  if (pick.type === 'floor' && !looking) {
    sfx.whoosh();
    go('interior', pick.n);
  }
}
// provisional, Claude's (the texts of the launch are open, CLAUDE.md §11)
const ROOF_SAYS = 'Il tetto del lancio: sul palco salirete tu, il mentore e i colleghi.';
/** What a stand says: which stage brings its object. The stage's title goes in quotes, as a title. */
function arrives(st, i) {
  const by = st.tag === 'Caso' ? 'il Caso' : st.tag === 'Prova sul campo' ? 'la Prova sul campo' : 'la ' + st.tag.toLowerCase();
  const title = st.title.startsWith('«') ? st.title : `«${st.title}»`;
  return `Tappa ${i + 1} · arriva con ${by}: ${title}`;
}

// ---------- UI helpers ----------
let toastTimer = null;
/** A toast stays long enough to be read (longer for longer text) and goes away at a touch. */
/** `low`: above the pill instead of under the top bar, for a toast about something at the top of the screen (the
 *  roof): a toast never sits on what it talks about. */
function toast(text, { low = false } = {}) {
  const t = $('toast');
  t.textContent = text;
  t.classList.toggle('low', low);
  t.style.bottom = low ? `${innerHeight - $('cta').getBoundingClientRect().top + 10}px` : '';
  t.hidden = false;
  t.style.animation = 'none';
  void t.offsetWidth;
  t.style.animation = '';
  clearTimeout(toastTimer);
  // long enough to read slowly (10/11/2026: Kevin and Chiara lost «Si apre dopo…» after 3.6 s): about 75 ms a letter,
  // never under 4 s; a touch closes it earlier
  toastTimer = setTimeout(() => (t.hidden = true), Math.max(4000, 2000 + text.length * 75));
  say(text);
}
$('toast').onclick = () => {
  clearTimeout(toastTimer);
  $('toast').hidden = true;
};
/** The screen reader reads it aloud; emptied first, so the same words are read again. */
function say(text) {
  const s = $('say');
  s.textContent = '';
  setTimeout(() => (s.textContent = text), 60);
}

/** The plate tells the floor you look at: the one in progress from outside, the one you are in from close. */
const plateFloor = () => (state.view === 'overview' ? state.floor : state.viewFloor);
let platedFloor = 0;
function renderPips(newIndex = -1) {
  const n = plateFloor();
  const done = ROOMS[n] ? earnedOn(n) : 0;
  $('pips').innerHTML = Array.from({ length: 8 }, (_, i) => `<i class="${i < done ? 'on' : ''} ${i === newIndex ? 'new' : ''}"></i>`).join('');
  $('pips-count').textContent = `${done} di 8`;
  renderA11y();
}
/** A floor's three colours on an element and what is inside it: the base, the light and the deep of its palette. */
function paintFloor(el, f) {
  el.style.setProperty('--accent', f.color);
  el.style.setProperty('--accent-light', f.light);
  el.style.setProperty('--accent-deep', f.deep);
  el.style.setProperty('--on-accent', inkOn(f.color));
}
function renderPlate() {
  // the stage pill keeps the colour of the floor in progress, the plate takes the colour of the floor it tells
  paintFloor(document.documentElement, FLOORS[state.floor - 1]);
  platedFloor = plateFloor();
  const f = FLOORS[platedFloor - 1];
  paintFloor($('plate'), f);
  // the name, never a number on its own (10/11/2026, Davide: «sti numeri così mi sanno di tombola»); the level comes
  // when you go into the floor, as a building tapped in a city game tells its level (showSigns)
  $('plate-level').textContent = `Livello ${f.n}`;
  $('plate-title').textContent = f.name;
  renderPips();
}

/** The building for the keyboard and the screen reader: a button per floor, from the top down, and under the floor
 * you are in a button per object. The buttons stay the same while you move, so the focus is never lost. */
function renderA11y() {
  const nav = $('a11y');
  const roof = !!roofSite?.userData.stage.visible;
  const key = [...built.keys()].join(',') + (roof ? ',tetto' : '');
  if (nav.dataset.key !== key) {
    nav.dataset.key = key;
    nav.replaceChildren();
    if (roof) {
      const rb = document.createElement('button');
      rb.className = 'a11y-item';
      rb.dataset.roof = '1';
      rb.textContent = 'Il tetto · il lancio';
      rb.onclick = () => onPick({ type: 'roof' });
      nav.append(rb);
    }
    for (let n = state.floor; n >= 1; n--) {
      if (!built.has(n)) continue;
      const fb = document.createElement('button');
      fb.className = 'a11y-item';
      fb.dataset.n = n;
      fb.onclick = () => onPick({ type: 'floor', n });
      nav.append(fb);
      for (const s of built.get(n).office?.slots ?? []) {
        const b = document.createElement('button');
        b.className = 'a11y-item';
        b.dataset.n = n;
        b.dataset.i = s.stage;
        b.onclick = () => onPick({ type: 'slot', n, i: s.stage });
        nav.append(b);
      }
    }
  }
  for (const b of nav.children) {
    if (b.dataset.roof) continue;
    const n = +b.dataset.n;
    const done = ROOMS[n] ? earnedOn(n) : 0;
    if (b.dataset.i === undefined) {
      b.textContent = `${FLOORS[n - 1].name}, livello ${n}: ${ROOMS[n] ? `${done} tappe su 8` : 'si arreda più avanti'}`;
      b.setAttribute('aria-current', state.view !== 'overview' && state.viewFloor === n ? 'location' : 'false');
      continue;
    }
    const i = +b.dataset.i;
    const st = built.get(n).office.stages[i];
    b.textContent = i < done ? `${st.object} · ${st.tag}: apri la scheda` : arrives(st, i);
    b.hidden = state.view === 'overview' || state.viewFloor !== n;
  }
}
function renderCta() {
  path?.render();
  me?.render();
  const cta = $('cta');
  const n = state.floor;
  const room = ROOMS[n];
  cta.disabled = false;
  cta.querySelector('.cta-min').hidden = !room || state.earned >= 8;
  if (!room) {
    $('cta-tag').textContent = FLOORS[n - 1].name;
    $('cta-title').textContent = 'Si arreda al prossimo passo';
    cta.disabled = true;
  } else if (state.earned < 8) {
    const st = room.stages[state.earned];
    // the first stage of a floor with a new colleague starts with the interview;
    // looking into another floor, the pill says which floor its stage belongs to
    const hire = state.earned === 0 && room.hire;
    if (plateFloor() !== n) $('cta-tag').textContent = `${FLOORS[n - 1].name} · ${hire ? 'Colloquio' : st.tag}`;
    else $('cta-tag').textContent = hire ? `Colloquio · ${st.tag}` : st.tag;
    $('cta-title').textContent = st.title;
  } else {
    $('cta-tag').textContent = 'Piano completato';
    $('cta-title').textContent = n < FLOORS.length ? `Si apre il piano ${n + 1}…` : 'Nell’app: la scena del lancio';
    cta.disabled = true;
  }
}

// ---------- the object in the card: it rises from its place and floats, big, in front of you ----------
let shown = null;
function showcase(n, i) {
  const office = built.get(n).office;
  const s = office.slotOf(i);
  go('interior', n); // the whole room stays behind the object, calm
  const S = 1.25;
  const from = s.obj.position.clone();
  const me = (shown = { s });
  showSigns();
  sfx.whoosh();
  // turned a little and seen from above, so it reads at a glance while it stands still
  const [tilt, turn] = s.place.pose ?? [0, 0];
  // measured once, at rest in its place; placed at every frame in front of the camera as it is at that moment, so it
  // comes to the front already at its size while the camera draws back from the desk (revisione della grafica,
  // 10/11/2026 sera: placed for where the camera would end, it showed huge for a moment and then shrank)
  const m = showMeasure(s, S);
  return tween(1.0, (k) => {
    // the card closed while the object was still flying in: the way home takes over, or it would stay in mid-air
    if (shown !== me) return;
    // the object floats in the room the card leaves above it
    const to = showSpot(office, m);
    s.obj.position.lerpVectors(from, to, k);
    s.obj.scale.setScalar(1 + (S - 1) * k);
    s.obj.rotation.set(tilt * k, turn * k, 0);
  }, { easing: ease.out });
}
/** Where the object of the card floats, in the room's coordinates: between the plate (and «Sede») at the top and the
 *  card at the bottom, as big as a third of the screen when there is room, smaller on a short phone or with large text,
 *  where the card is taller (09/11/2026: at 375×667 with the text at 1.35 the card covered half of it). */
function showMeasure(s, S) {
  const box = new THREE.Box3().setFromObject(s.obj);
  const size = box.getSize(new THREE.Vector3()).multiplyScalar(S);
  // from the object's origin up to its middle: at the bottom for what stands on a desk, in the middle for what hangs
  // on a wall (taking it always as the bottom put the hanging ones half their height too low, onto the card)
  const lift = (box.getCenter(new THREE.Vector3()).y - s.obj.getWorldPosition(new THREE.Vector3()).y) * S;
  return { size, lift };
}
function showSpot(office, { size, lift }) {
  // the camera as it is now (it may still be on its way back from the desk)
  const cam = camera.position.clone();
  const ahead = camera.getWorldDirection(new THREE.Vector3());
  const tanV = Math.tan((camera.fov * DEG) / 2);
  const H = window.innerHeight;
  const top = Math.max($('plate').getBoundingClientRect().bottom, $('btn-back').hidden ? 0 : $('btn-back').getBoundingClientRect().bottom) + 12;
  const bottom = Math.max(top + 80, ($('card-wrap').hidden ? H * 0.62 : $('card').offsetTop) - 16);
  const q = Math.min(0.34, (0.8 * (bottom - top)) / H); // the object's height, as a part of the screen's
  const d = Math.max(size.y / (q * 2 * tanV), size.x / (0.72 * 2 * tanV * camera.aspect), 1.2);
  const spot = cam.clone().addScaledVector(ahead, d);
  spot.y += (0.5 - (top + bottom) / 2 / H) * 2 * d * tanV - lift;
  return office.room.worldToLocal(spot);
}
function unshow() {
  if (!shown) return Promise.resolve();
  const { s } = shown;
  shown = null;
  const from = s.obj.position.clone();
  const r0 = s.obj.rotation.clone();
  const sc = s.obj.scale.x;
  return tween(0.45, (k) => {
    if (shown?.s === s) return; // opened again on its way home: the new flight takes it
    s.obj.position.lerpVectors(from, s.home, k);
    s.obj.rotation.set(r0.x * (1 - k), r0.y * (1 - k), 0);
    s.obj.scale.setScalar(sc + (1 - sc) * k);
  }).then(showSigns); // the plate of the floor comes back with the object home
}

let cardIndex = 0;
let cardFloor = 1;
let cardResolve = null;
// The card at the end of a stage is the one thing that stays (partita 09/11/2026, punto 9): it says how the stage
// went and shows the trophy taken on the way, which before only passed in the banner and in a pop during the flight
// of the camera. Under the chips the line on the result, above the buttons the trophies (the name only: with its line
// too, two trophies and large text filled the screen and hid the object; the line stays in the Tu); neither on a card
// you open.
$('card-idea').insertAdjacentHTML(
  'beforebegin',
  '<p class="card-result" id="card-result" hidden><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.2 7.3 7.3 2.2-7.3 2.2L12 21.5l-2.2-7.3L2.5 12l7.3-2.2z" /></svg><span id="card-result-text"></span></p>',
);
$('card-idea').insertAdjacentHTML('afterend', '<ul class="card-prizes" id="card-prizes" hidden></ul>');
/** `result`: the line on how the stage went; `prizes`: the ids of the trophies just earned (fresh cards only). */
function openCard(n, i, fresh, { result = '', prizes = [] } = {}) {
  cardIndex = i;
  cardFloor = n;
  $('card-result-text').textContent = fresh ? result : '';
  $('card-result').hidden = !fresh || !result;
  const won = fresh ? prizes.map((id) => TROPHIES.find((t) => t.id === id)).filter(Boolean) : [];
  $('card-prizes').innerHTML = won
    .map((t) => {
      const c = t.color ?? 'var(--achievement)';
      const on = t.color ? inkOn(t.color) : '#ffffff';
      return `<li class="card-prize" style="--c:${c};--on-c:${on}"><span class="trophy-emblem">${emblem(t.id)}</span><span><span class="card-prize-tag">Traguardo</span><b>${t.name}</b></span></li>`;
    })
    .join('');
  $('card-prizes').hidden = !won.length;
  const s = built.get(n).office.stages[i];
  // the three objects of a floor, each opened by you (not the card that comes up by itself when it lands)
  if (!fresh && s.object) {
    if (!looked.has(n)) looked.set(n, new Set());
    looked.get(n).add(i);
    if (looked.get(n).size === 3) trophy('visita');
    else persist();
  }
  paintFloor($('card'), FLOORS[n - 1]); // the card of an object takes its floor's colours, not the floor in progress
  $('card-tag').textContent = s.tag;
  $('card-title').textContent = s.title;
  $('card-object').textContent = s.object ?? '';
  $('card-object').closest('.chips').hidden = !s.object; // a lesson without an object: no chip
  $('card-idea').textContent = s.idea;
  // «Ripassa» only where there is something to play again (the review, below): a lesson, a Caso, a Prova sul campo
  $('card-review').hidden = fresh || !canReview(n, i);
  $('card-continue').hidden = !fresh;
  $('card-review').parentElement.hidden = $('card-review').hidden && $('card-continue').hidden;
  $('card-close').hidden = fresh;
  openSheet($('card-wrap'));
  return new Promise((r) => (cardResolve = r));
}
function closeCard() {
  closeSheet($('card-wrap'));
  cardResolve?.();
  cardResolve = null;
}

// ---------- a sheet is a dialog: the focus goes in and stays in, Esc closes it, the focus comes back ----------
const BEHIND = ['.top', '#a11y', '#btn-back', '.bottom', '#path', '#me'];
let sheetFrom = null;
function openSheet(wrap) {
  if (wrap.hidden) sheetFrom = document.activeElement;
  wrap.hidden = false;
  for (const sel of BEHIND) document.querySelector(sel).inert = true;
  wrap.querySelector('h2, h3').focus({ preventScroll: true });
}
function closeSheet(wrap) {
  if (wrap.hidden) return;
  wrap.hidden = true;
  if (!$('card-wrap').hidden || !$('demo-wrap').hidden) return;
  for (const sel of BEHIND) document.querySelector(sel).inert = false;
  if (sheetFrom?.isConnected && !sheetFrom.hidden) sheetFrom.focus({ preventScroll: true });
  sheetFrom = null;
}
/** One step back: Android's back key and Esc on a computer (10/11/2026; CLAUDE.md §6: «La X (e il tasto Indietro su
 *  Android) apre "La lezione riparte dall'inizio…"»). Before, the key did nothing in the page, and in the app on
 *  Android it would have closed FEEN in the middle of a lesson. Inside a lesson, the Caso or the Prova it asks
 *  «Vuoi uscire?» (and a second press says «Resto»); then a card closes, a room goes back to the building, a tab
 *  goes back to the Percorso. False when there is nothing left to go back from: the app may close. */
function back() {
  for (const id of ['lezione', 'caso', 'campo']) {
    const r = $(id);
    if (r.hidden) continue;
    const ask = r.querySelector('.lz-ask');
    (ask && !ask.hidden ? ask.querySelector('[data-act="stay"]') : r.querySelector('[data-act="x"]'))?.click();
    return true;
  }
  if (!$('avvio').hidden) return false; // the first start has no back: every step is saved, the app may close
  if (state.busy) return true; // a flight, a landing: it ends by itself
  if (!$('card-wrap').hidden) closeCard(); // a fresh card has no X: back does what «Continua» does
  else if (!$('demo-wrap').hidden) closeSheet($('demo-wrap'));
  else if (state.tab === 'ufficio' && state.view !== 'overview') {
    sfx.whoosh();
    const n = state.viewFloor;
    go('overview', { n });
    if (document.activeElement === document.body) focusFloor(n);
  } else if (state.tab !== 'percorso') setTab('percorso');
  else return false;
  return true;
}
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape' || e.defaultPrevented) return; // a lesson's definition closes first (lezione.js)
  back();
});
// the app's back key (sede-screen.tsx): the phone asks, the page goes back one step or says there is nothing left
window.feenBack = () => {
  if (!back()) window.ReactNativeWebView?.postMessage(JSON.stringify({ exit: true }));
};
/** The button of floor n in the list: where the keyboard lands when what it was on disappears. */
const focusFloor = (n) => $('a11y').querySelector(`[data-n="${n}"]:not([data-i])`)?.focus();
$('card-close').onclick = () => {
  sfx.tap();
  closeCard();
};
$('card-continue').onclick = () => {
  sfx.tap();
  closeCard();
};
$('card-review').onclick = () => {
  sfx.tap();
  review(cardFloor, cardIndex);
};

// ---------- the review (CLAUDE.md §7 «Ripasso», cubotto 8, 09/11/2026) ----------
// Only when you want it, from the card of a stage done (Percorso) or of an object (Ufficio). A lesson comes back short:
// 5 of its exercises, the ones wrong at the first go first, with the answers in a new order (the lesson engine
// shuffles them); nothing is new any more, so no «Idea nuova», no help line, no theory card. The X and the bar are the
// lesson's. A Caso is played again from the start. No object lands and nothing changes in the Ufficio: at the end a
// line on how it went, and you are back where you were.
const REVIEW_SIZE = 5;
/** True when stage i of floor n has something to play again: a lesson, a Caso, a Prova sul campo (CLAUDE.md §6:
 *  «ripassarla vuol dire rigiocarla», 09/11/2026). */
function canReview(n, i) {
  const s = built.get(n)?.office?.stages[i];
  return !!s && !!(lessonFor(n, s) || caseFor(n, s) || fieldFor(n, s));
}
/** The short lesson of the review: the wrong ones first, then others picked at random, in the lesson's order. */
function reviewLesson(n, i, lesson) {
  const wrong = new Set(missed.get(n)?.[i] ?? []);
  const all = lesson.exercises;
  const first = all.filter((e) => wrong.has(e.n));
  const others = all.filter((e) => !wrong.has(e.n));
  for (let k = others.length - 1; k > 0; k--) {
    const j = Math.floor(Math.random() * (k + 1));
    [others[k], others[j]] = [others[j], others[k]];
  }
  const more = new Set(others.slice(0, Math.max(0, REVIEW_SIZE - first.length)));
  const pick = [...first, ...all.filter((e) => more.has(e))].slice(0, REVIEW_SIZE);
  return { ...lesson, review: true, exercises: pick.map((e) => ({ ...e, idea: null, help: null })) };
}
const REVIEW_LINE = ['Ripasso fatto: tutte giuste al primo colpo.', 'Ripasso fatto: tutte giuste, qualcuna al secondo colpo.', 'Ripasso fatto: qualcuna da rivedere con calma.'];
async function review(n, i) {
  const s = built.get(n)?.office?.stages[i];
  if (!s || state.busy || !canReview(n, i)) return;
  state.busy = true;
  closeCard();
  const lesson = lessonFor(n, s);
  let r;
  if (lesson) r = await lezione.play(reviewLesson(n, i, lesson));
  else {
    // the object of the card flies home first, or the photo would have it floating in front of the room
    await unshow();
    // the photo of the room comes from the Ufficio's camera: from the Percorso it goes there for a moment, then back
    const tab = state.tab;
    const [name, arg] = rig.preset ?? ['overview'];
    state.tab = 'ufficio';
    const room = roomPhoto(n);
    state.tab = tab;
    go(name, arg, { instant: true });
    // the Prova sul campo is played again whole, as the Caso: a new month from the start
    const field = fieldFor(n, s);
    r = field ? await campo.play(field, { room, floorName: FLOORS[n - 1].name }) : await caso.play(caseFor(n, s), { room, floorName: FLOORS[n - 1].name });
    if (field && r.done) r.field = true;
  }
  state.busy = false;
  if (!r.done) return; // left with the X: nothing changes
  if (r.field) toast(`Prova rigiocata: ${FIELD_LINE[Math.min(r.outcome, 1)].replace(/^M/, 'm')}.`);
  else toast(lesson ? REVIEW_LINE[r.outcome] : `Caso rigiocato: ${['tre scelte giuste al primo colpo', 'finale raggiunto, con qualche passo indietro'][Math.min(r.outcome, 1)]}.`);
  trophy('ripasso');
  if (r.fixed) setTimeout(() => trophy('riprovi'), 900);
}
$('card-wrap').addEventListener('click', (e) => {
  if (e.target === $('card-wrap') && !$('card-close').hidden) closeCard();
});

/** `sub` can be left out when the card that follows says it (the end of a stage): the screen reader still hears
 *  `aloud`, so it learns how the stage went at the same moment as before. */
function banner(title, sub = '', aloud = sub) {
  $('banner-title').textContent = title;
  $('banner-sub').textContent = sub;
  $('banner-sub').hidden = !sub;
  say(aloud ? `${title}. ${aloud}` : title);
  const b = $('banner');
  b.hidden = false;
  b.style.animation = 'none';
  void b.offsetWidth;
  b.style.animation = '';
  setTimeout(() => (b.hidden = true), 2150);
}

// ---------- effects ----------
const fx = [];
const starTex = canvasTexture(64, 64, (g, w, h) => {
  g.translate(w / 2, h / 2);
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const r = i % 2 ? 6 : 30;
    const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
    g.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  g.closePath();
  g.fillStyle = '#F7CF5E';
  g.fill();
});
function sparkles(pos, n = 12) {
  for (let i = 0; i < n; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: starTex, transparent: true, depthWrite: false }));
    s.position.copy(pos);
    const a = Math.random() * Math.PI * 2;
    const sp = 0.8 + Math.random() * 1.2;
    s.userData = { v: new THREE.Vector3(Math.cos(a) * sp, 1.6 + Math.random() * 1.6, Math.sin(a) * sp * 0.6), life: 0.9 + Math.random() * 0.5, age: 0, size: 0.1 + Math.random() * 0.08, g: 5 };
    s.renderOrder = 10;
    scene.add(s);
    fx.push(s);
  }
}
function ring(pos) {
  const m = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.015, 8, 40), new THREE.MeshBasicMaterial({ color: '#FFFFFF', transparent: true }));
  m.rotation.x = Math.PI / 2;
  m.position.copy(pos);
  m.userData = { ring: true, age: 0, life: 0.6 };
  scene.add(m);
  fx.push(m);
}
function confetti(center, info, n = 60) {
  if (motion.calm) return; // «Movimento ridotto»: the banner and the colour of the walls are the party
  const cols = [info.color, info.paint, C.gold, '#FFFFFF', C.cream];
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(0.09, 0.05), new THREE.MeshBasicMaterial({ color: cols[i % cols.length], side: THREE.DoubleSide, transparent: true }));
    m.position.set(center.x + (Math.random() - 0.5) * 1.2, center.y, center.z + (Math.random() - 0.5) * 0.8);
    const a = Math.random() * Math.PI * 2;
    m.userData = { v: new THREE.Vector3(Math.cos(a) * (1 + Math.random() * 2.5), 3 + Math.random() * 3, Math.sin(a) * 1.5), spin: new THREE.Vector3(Math.random() * 9, Math.random() * 9, 0), life: 3.2, age: 0, g: 4, drag: 1.6 };
    scene.add(m);
    fx.push(m);
  }
}
function puffs(y) {
  for (let i = 0; i < 16; i++) {
    const s = sphere(0.18 + Math.random() * 0.15, new THREE.MeshStandardMaterial({ color: '#FFFFFF', transparent: true, roughness: 1 }), [B.xL + Math.random() * (B.xR - B.xL), y, B.zB + Math.random() * (B.zF - B.zB) + 0.4]);
    s.castShadow = false;
    s.userData = { puff: true, v: new THREE.Vector3((Math.random() - 0.5) * 1.2, 0.5 + Math.random() * 0.6, (Math.random() - 0.5) * 1.2), life: 1.3, age: 0 };
    scene.add(s);
    fx.push(s);
  }
}
function updateFx(dt) {
  for (let i = fx.length - 1; i >= 0; i--) {
    const o = fx[i];
    const u = o.userData;
    u.age += dt;
    const k = u.age / u.life;
    if (k >= 1) {
      scene.remove(o);
      o.geometry?.dispose();
      o.material.dispose();
      fx.splice(i, 1);
      continue;
    }
    if (u.ring) {
      o.scale.setScalar(1 + k * 5);
      o.material.opacity = 1 - k;
      continue;
    }
    if (u.puff) {
      o.position.addScaledVector(u.v, dt);
      o.scale.setScalar(1 + k * 1.8);
      o.material.opacity = 0.9 * (1 - k);
      continue;
    }
    u.v.y -= (u.g ?? 4) * dt;
    if (u.drag) u.v.multiplyScalar(Math.exp(-u.drag * dt));
    o.position.addScaledVector(u.v, dt);
    if (u.spin) {
      o.rotation.x += u.spin.x * dt;
      o.rotation.y += u.spin.y * dt;
    }
    if (o.isSprite) {
      const s = u.size * (k < 0.15 ? k / 0.15 : 1);
      o.scale.set(s, s, 1);
      o.material.opacity = k > 0.7 ? (1 - k) / 0.3 : 1;
    } else {
      o.material.opacity = k > 0.8 ? (1 - k) / 0.2 : 1;
    }
  }
}

// ---------- the light: always day ----------
// FEEN is never set at night (the user, 10/11/2026: «l'app non è mai ambientata di notte»): no evening after sunset,
// no lit windows, lamp pools or glowing plates, no «Giorno / sera» in the Demo. The light/dark theme of the interface
// still follows the phone. Before, the sede lit up by itself after sunset (`isEvening`, `toggleNight`, a NIGHT preset).
// glow: how strong the halo of the earned objects is
// the sky «terso» (strada A of three sketches, the user's choice, 30/10/2026, `1. LAVORO/cielo/`): the palette's blues
// down to the horizon and a light blue haze, no more cream, so the city round the block reads clear
const LIGHT = { glow: 0.8, top: '#4E9FE6', mid: '#9ECBF0', bottom: '#E3EEF7', fog: '#D9E7F3', hemiSky: '#F2F6FF', hemiGround: '#C4D2AE', hemi: 1.6, sun: 2.3, sunCol: '#FFF4E6', fill: 0.7, lamps: 0.15, room: 2.2, bulbs: 0.7, even: 0.06 };
/** The light of the sede, set again whenever rooms are built (their lamps and lights take it). */
function applyLight() {
  const u = sky.userData.uniforms;
  u.top.value.set(LIGHT.top);
  u.mid.value.set(LIGHT.mid);
  u.bottom.value.set(LIGHT.bottom);
  scene.fog.color.set(LIGHT.fog);
  hemi.color.set(LIGHT.hemiSky);
  hemi.groundColor.set(LIGHT.hemiGround);
  hemi.intensity = LIGHT.hemi;
  sun.intensity = LIGHT.sun;
  sun.color.set(LIGHT.sunCol);
  fill.intensity = LIGHT.fill;
  for (const m of world.lampMats) m.emissiveIntensity = LIGHT.lamps;
  for (const m of world.roomLampMats) m.emissiveIntensity = LIGHT.bulbs;
  for (const l of world.roomLights) l.intensity = LIGHT.room;
  // the light that comes from every side inside the rooms (office.js, `lightEvenly`), also for floors built later
  world.roomFill = LIGHT.even;
  for (const m of world.roomFillMats ?? []) m.emissiveIntensity = world.roomFill;
}

// ---------- the flow: a stage is done, the floor is done ----------
const FINE = ['Tutte giuste al primo colpo', 'Tutte giuste, con un paio di ripassi', 'Fatta: qualcuna da rivedere con calma'];
// the Prova sul campo has no mark (CLAUDE.md §6): the month is closed either way; the line says only how the two key
// moments went (provisional, Claude's, 09/11/2026)
const FIELD_LINE = ['Mese chiuso, con le scelte migliori al primo colpo', 'Mese chiuso, e le alternative migliori le hai trovate'];
/** The lesson to play for stage s of floor n (compito B7, 07/11/2026): the approved card of that lesson, or, until the
 *  real ones arrive, the test lesson («Lezioni» in DEMO). The Caso and the Prova sul campo have their own (below). */
function lessonFor(n, s) {
  const m = s.tag.match(/^Lezione (\d+)$/);
  if (!m) return null;
  return LESSONS[`p${n}-l${m[1]}`] ?? (state.lessons === 'prova' ? LESSONS.prova : null);
}
/** After floor 1, in the app (cubotto 7.8, decided 09/11/2026): a floor without any approved card does not open; it
 *  waits for an update of the app, honestly, instead of a pretend interview and the test lesson. Floor 1 keeps the
 *  test lesson until its cards arrive; the prova with the Demo opens every floor as before. */
function comingSoon(n) {
  return IN_APP && n > 1 && !Object.keys(LESSONS).some((k) => k.startsWith(`p${n}-`));
}
// by its name, as everywhere since Davide's «sti numeri così mi sanno di tombola» (10/11/2026)
const SOON = (n) => `${cap(FLOORS[n - 1].the)} è in costruzione: la gru ci lavora, apre con il prossimo aggiornamento di FEEN.`;
/** The Caso of floor n (compito C1, 07/11/2026): its approved card or, until it arrives, the test Caso. */
function caseFor(n, s) {
  if (s.tag !== 'Caso') return null;
  return CASES[`p${n}-caso`] ?? (state.lessons === 'prova' ? CASES.prova : null);
}
/** The Prova sul campo of floor n (09/11/2026): its approved card or, until it arrives, the test month. */
function fieldFor(n, s) {
  if (s.tag !== 'Prova sul campo') return null;
  return FIELDS[`p${n}-campo`] ?? (state.lessons === 'prova' ? FIELDS.prova : null);
}
/** A still photo of the room of floor n, for the top of the Caso: the room as it is, without people. */
function roomPhoto(n) {
  go('interior', n, { instant: true });
  window.__feen.step(40);
  try {
    return renderer.domElement.toDataURL('image/jpeg', 0.85);
  } catch {
    return null;
  }
}

/** `fromPath`: started from the Percorso, so every stage ends on its card with «Continua», back to the Percorso.
 *  `real`: the lesson is played (from the Percorso and the first start); the green pill and DEMO only pretend.
 *  Returns false when you leave the lesson with the X: then nothing changes in the Ufficio. */
async function completeNext({ pretend = true, fromPath = false, real = false } = {}) {
  const office = cur();
  if (state.busy || !office || state.earned >= 8) return;
  state.busy = true;
  hideSheets();
  const n = state.floor;
  const i = state.earned;
  const s = office.stages[i];
  // how it went: 0 all right at the first go, 1 all right with «Ci riprovi», 2 some to see again (the line at the end)
  let outcome = state.lessons === 'errore' ? 1 : 0;
  let fixed = outcome === 1;
  const lesson = real && pretend ? lessonFor(n, s) : null;
  const story = real && pretend && !lesson ? caseFor(n, s) : null;
  const field = real && pretend && !lesson && !story ? fieldFor(n, s) : null;
  if (story) {
    const r = await caso.play(story, { room: roomPhoto(n), floorName: FLOORS[n - 1].name });
    if (!r.done) {
      state.busy = false;
      return false;
    }
    outcome = r.outcome;
    fixed = r.fixed;
  } else if (field) {
    // the Prova sul campo (campo.js): a month over the photo of the room; left with the X, nothing changes
    const r = await campo.play(field, { room: roomPhoto(n), floorName: FLOORS[n - 1].name });
    if (!r.done) {
      state.busy = false;
      return false;
    }
    outcome = r.outcome;
    fixed = r.fixed;
  } else if (lesson) {
    const hire = i === 0 ? ROOMS[n].hire : null;
    if (hire) {
      // the interview is not built yet (compito C7): a moment of pretend, then the lesson
      $('fake-tag').textContent = 'Colloquio';
      $('fake-title').textContent = `Scegli ${hire}`;
      $('fake-note').textContent = 'Il colloquio arriva più avanti. Facciamo finta che sia fatto…';
      $('fake-bar').style.transform = 'scaleX(0)';
      $('fake-lesson').hidden = false;
      await wait(0.05);
      $('fake-bar').style.transform = 'scaleX(1)';
      await wait(1.6);
      $('fake-lesson').hidden = true;
    }
    const r = await lezione.play(lesson);
    if (!r.done) {
      state.busy = false;
      return false;
    }
    outcome = r.outcome;
    fixed = r.fixed > 0;
    // the exercises wrong at the first go: the review starts from them (CLAUDE.md §7, compito C5)
    if (r.wrong.length) {
      if (!missed.has(n)) missed.set(n, {});
      missed.get(n)[i] = r.wrong;
    }
  } else if (pretend) {
    const hire = i === 0 ? ROOMS[n].hire : null;
    $('fake-tag').textContent = s.tag;
    $('fake-title').textContent = s.title;
    $('fake-note').textContent = hire ? `Prima il colloquio per scegliere ${hire}, poi la lezione. Facciamo finta che sia tutto fatto…` : 'Facciamo finta che tu l’abbia appena finita…';
    $('fake-bar').style.transform = 'scaleX(0)';
    $('fake-lesson').hidden = false;
    await wait(0.05);
    $('fake-bar').style.transform = 'scaleX(1)';
    await wait(hire ? 2.2 : 1.35);
    $('fake-lesson').hidden = true;
  }
  // The stage is done: it is saved now, before the flight to the office (10/11/2026, Luca's test: the save came at
  // the end of the flight, 2–3.5 s after the last «Continua», and closing the app in between lost the whole lesson).
  // The flight and the card are only the show: from here on, closing the app loses nothing that counts.
  const place = office.slotOf(i);
  // how the lesson went: played, or pretend as «Lezioni» in DEMO says
  const clean = outcome === 0;
  if (!played.has(n)) played.set(n, []);
  played.get(n)[i] = clean;
  // the trophies taken on the way: «Ci riprovi» made right, a floor without a mistake
  // (the stages skipped with «Finisci tutto il piano» count as done right)
  const perfect = { 2: 'pin', 3: 'asso', 4: 'scudo' }[n];
  const prizes = [fixed && 'riprovi', perfect && i + 1 === 8 && [...Array(8)].every((_, k) => played.get(n)[k] !== false) && perfect].filter((id) => id && !trophies.has(id));
  // a card follows (an object landed, or the stage was started from the Percorso: always so in the app): the line on
  // the result and the trophies go into it, where they stay until «Continua», and the trophies are earned without the
  // pop, which would pass during the flight. Without a card (the green pill on a stage without an object, only in the
  // prova) the banner says the line and the pop comes as before.
  const withCard = !!place || fromPath;
  if (withCard) trophies.restore(prizes);
  // no reminder today (avvisi.js)
  reminders.stageDone();
  earnedSaved = i + 1;
  persist();
  // the end of a stage is a moment of its own: the bar and «Sede» step aside until «Continua» (revisione della grafica,
  // 10/11/2026 sera); the plate stays, its pip fills
  document.body.dataset.festa = '';
  // a stage with an object: it lands in its place; every stage colours a piece of the walls
  if (place) {
    go('slot', { n, i });
    sfx.whoosh();
    await wait(1.0);
    await dropObject(office, i);
    await paintUp(office, i + 1, 0.6);
  } else {
    go('interior', n);
    await wait(0.8);
    await paintUp(office, i + 1, 1.1);
  }
  state.earned++;
  earnedSaved = null;
  office.markNext(state.earned);
  renderPips(i);
  $('plate').classList.remove('pop');
  void $('plate').offsetWidth;
  $('plate').classList.add('pop');
  // the Prova sul campo has no mark (CLAUDE.md §6): «completata» as the lessons, not «superata» (09/11/2026)
  const title = s.tag === 'Caso' ? 'Caso risolto' : s.tag === 'Prova sul campo' ? 'Prova completata' : 'Lezione completata';
  // the line on the result, never a number nor a mark; on a stage without an object, how far the colour got too
  // the Caso has its own line (provisional, Claude's): a story is not «all right», it reaches its end
  const caseLine = ['Tre scelte giuste al primo colpo', 'Finale raggiunto, con qualche passo indietro'][Math.min(outcome, 1)];
  const line = story ? caseLine : field ? FIELD_LINE[Math.min(outcome, 1)] : lesson || place ? FINE[outcome] : `${cap(FLOORS[n - 1].the)} prende colore: ${i + 1} su 8`;
  if (withCard) banner(title, '', line); // the line once, in the card; the screen reader hears it now
  else {
    banner(title, lesson ? `${FINE[outcome]} · ${i + 1} su 8` : line);
    prizes.forEach((id, k) => setTimeout(() => trophy(id), 900 + k * 300));
  }
  sfx.reward();
  buzz(25);
  await wait(1.9);
  renderCta();
  state.busy = false;
  const end = { result: line, prizes };
  if (place) {
    showcase(n, i);
    await openCard(n, i, true, end);
    await unshow();
  } else if (fromPath) await openCard(n, i, true, end);
  // the end of a floor is the bigger party: the bar stays aside until it is over (10/11/2026 notte: before, it came
  // back just for «Livello 1 completato», which then stood over the floor instead of where the bar is)
  if (state.earned === 8) await floorComplete();
  else go('interior', n);
  delete document.body.dataset.festa;
  persist();
  return true;
}

/** The floor's colour rises on the walls up to n stages out of 8. */
function paintUp(office, n, dur) {
  const from = office.paint.get();
  const to = n / 8;
  const wp = office.room.localToWorld(new THREE.Vector3(-0.6, to * B.ih, B.inB + 0.1));
  setTimeout(() => sparkles(wp, 10), dur * 800);
  return tween(dur, (k) => office.paint.set(from + (to - from) * k), { easing: ease.out });
}

/** The earned objects glow when they can be touched: in a room, or zoomed in from outside (the user's choice,
 *  28/10/2026). Only an object at rest in its place: not while it lands or floats in the card. */
function updateGlow(dt) {
  const near = state.glow && closeUp();
  const level = LIGHT.glow;
  const k = 1 - Math.exp(-dt * 6);
  for (const { office } of built.values()) {
    for (const s of office?.slots ?? []) {
      const still = s.obj.visible && s.obj.position.distanceToSquared(s.home) < 1e-6 && Math.abs(s.obj.scale.x - 1) < 0.01;
      const u = s.glow.material.uniforms.uOpacity;
      u.value += ((near && still ? level : 0) - u.value) * k;
      s.glow.visible = u.value > 0.004;
    }
  }
}

async function dropObject(office, i) {
  const s = office.slotOf(i);
  const obj = s.obj;
  const home = s.home.clone();
  obj.visible = true;
  obj.position.copy(home).add(new THREE.Vector3(0, 1.4, 0));
  obj.scale.setScalar(0.4);
  // the stand steps aside for the object
  tween(0.25, (k) => s.stand.scale.setScalar(Math.max(0.01, 1 - k)), { easing: ease.inOut }).then(() => {
    s.stand.visible = false;
    s.stand.scale.setScalar(1);
  });
  await tween(
    0.75,
    (k) => {
      obj.position.y = home.y + 1.4 * (1 - k);
      obj.scale.setScalar(0.4 + 0.6 * Math.min(1, k * 1.6));
    },
    { easing: ease.bounce },
  );
  sfx.land();
  const wp = office.worldPos(i);
  sparkles(wp, 18);
  if (!s.place.wall) ring(wp.clone().setY(wp.y - 0.1));
  await tween(0.22, (k) => obj.scale.set(1 + Math.sin(k * Math.PI) * 0.25, 1 - Math.sin(k * Math.PI) * 0.18, 1 + Math.sin(k * Math.PI) * 0.25), { easing: ease.linear });
  obj.scale.setScalar(1);
}

async function floorComplete() {
  state.busy = true;
  const n = state.floor;
  const info = FLOORS[n - 1];
  go('overview');
  await wait(0.8);
  banner(`Livello ${n} completato`, info.ready); // «Livello», as the plate and the Percorso say (Davide, 10/11/2026)
  sfx.fanfare();
  buzz(40);
  confetti(new THREE.Vector3(0, floorY(n) + B.ih + 0.6, 1.2), info);
  const wall = built.get(n).shell.userData.wallMat;
  const from = new THREE.Color(C.cream);
  const to = new THREE.Color(info.room);
  await tween(1.4, (k) => wall.color.copy(from).lerp(to, k));
  // the end of a colleague's stretch: in the app here comes «Condividi» (cubotto 9.14, after the MVP)
  if (ROOMS[n].share && !IN_APP) {
    toast('Qui nell’app compare «Condividi»: la card con il palazzo com’è adesso.');
    await wait(2.6);
  }
  await wait(0.6);
  // the partner speaks, over the finished floor, before what comes next (CLAUDE.md §4 and §7 «Fine piano»)
  await partnerSays(floorDoneLine(n));
  // after the last floor no floor rises: the crane goes and the roof of the launch is built (27/10/2026). In the app
  // «Continua» goes up there, to the scene of the launch, and then to the card «Condividi».
  if (n === FLOORS.length) {
    const crane = roofSite.userData.crane;
    const s0 = crane.scale.x;
    await tween(0.7, (k) => crane.scale.setScalar(s0 * Math.max(0.01, 1 - k)));
    roofFinished(true);
    crane.scale.setScalar(s0);
    const stage = roofSite.userData.stage;
    stage.scale.y = 0.01;
    sfx.build();
    puffs(roofSite.position.y + 0.2);
    await tween(1.3, (k) => (stage.scale.y = Math.max(0.01, k)), { easing: ease.back });
    renderPlate();
    renderCta();
    sfx.reward();
    toast(IN_APP ? 'Il tetto è pronto: il palco del lancio.' : 'Il tetto è pronto. Nell’app «Continua» porta qui, alla scena del lancio, e poi alla card «Condividi».', { low: true });
    state.busy = false;
    return;
  }
  // in the app, a floor whose lessons are not in the app yet does not open (cubotto 7.8, 09/11/2026): no pretend
  // interview, no test lesson. The crane stays on the roof; the Percorso says it above the floor just finished.
  if (comingSoon(n + 1)) {
    renderPlate();
    renderCta();
    // the partner has just said it, and the plate above the floor on the Percorso says when: no toast, which went on
    // to the Percorso and repeated the plate word for word (partita 09/11/2026, punto 14)
    state.busy = false;
    return;
  }
  // the new floor rises above, already furnished if its room is ready
  state.floor = n + 1;
  state.earned = 0;
  fitShadow();
  go('overview');
  await wait(0.6);
  const next = buildFloor(n + 1, 0);
  applyLight();
  next.shell.scale.y = 0.01;
  sfx.build();
  puffs(floorY(n + 1) + 0.2);
  const roofFrom = roofSite.position.y;
  await tween(
    1.3,
    (k) => {
      next.shell.scale.y = Math.max(0.01, k);
      roofSite.position.y = roofFrom + (floorY(n + 2) - roofFrom) * k;
    },
    { easing: ease.back },
  );
  puffs(floorY(n + 2));
  renderPlate();
  renderCta();
  sfx.reward();
  toast(`Si apre ${FLOORS[n].the}`); // by its name (Davide, 10/11/2026)
  state.busy = false;
}

// ---------- the end of a floor: the partner speaks (partita 09/11/2026, punto 14) ----------
// In the prototype the end of floor 1 is the end of the game, and the partner said nothing. Now a line in the panel
// of the empty company (avvio.js, the same look, the partner's bust), then «Continua». One line for every floor
// (provisional, Claude's): it takes the floor done, and says what is above: the next floor being built (the crane,
// when it waits for an update of the app), the next floor rising now, or after the last floor the roof. No dates,
// no guilt, never what the launch is, nothing male or female about whoever plays (CLAUDE.md §4, §8).
const toFloor = (f) => f.the.replace(/^la /, 'alla ').replace(/^il /, 'al '); // «alla Tesoreria», «al piano dei Soci»
// How far the launch is, in the words of the partner (10/11/2026: Tommaso and five more did not know how much was
// left; the floor waiting for an update said «la gru lavora già» and then the Percorso «arriva con il prossimo
// aggiornamento dell'app», two stories at once: now the partner says both, once, and the Percorso the same)
const COUNT = ['Un piano', 'Due piani', 'Tre piani', 'Quattro piani', 'Cinque piani', 'Sei piani', 'Sette piani', 'Otto piani', 'Nove piani', 'Dieci piani', 'Undici piani'];
function floorDoneLine(n) {
  if (n === FLOORS.length) return 'Dodici piani, e portano tutti la tua firma. Manca solo il tetto: ci vediamo lassù.';
  const next = FLOORS[n];
  const done = `${COUNT[n - 1]} su dodici, e ${n === 1 ? 'porta' : 'portano'} la tua firma.`;
  if (comingSoon(n + 1)) return `${done} La gru lavora già ${toFloor(next)}: apre con il prossimo aggiornamento di FEEN. Intanto qui si ripassa quando vuoi.`;
  return `${done} Guarda su: arriva ${next.the}.`;
}
const panel = document.createElement('div');
panel.className = 'fine-piano';
panel.id = 'fine-piano';
panel.hidden = true;
document.body.append(panel);
/** The partner's panel over the scene; resolves with «Continua». Without a partner yet (a phone that never finished
 *  the first start) it lets the end go on. */
function partnerSays(line) {
  const who = avvio?.who();
  if (!who) return Promise.resolve();
  panel.innerHTML = `<div class="av-talk" role="dialog" aria-modal="true" aria-labelledby="fine-who">
      <span class="av-face"><img src="${PEOPLE[who.partner]}" alt="" /></span>
      <div class="av-talk-body">
        <b id="fine-who">${who.partner}</b>
        <p class="av-talk-line" tabindex="-1">${line}</p>
      </div>
      <button class="pill pill-dark wide">Continua</button>
    </div>`;
  $('banner').hidden = true; // the banner of the floor hands over to the partner
  for (const sel of BEHIND) document.querySelector(sel).inert = true;
  document.body.dataset.fine = '';
  panel.hidden = false;
  panel.querySelector('.av-talk-line').focus({ preventScroll: true });
  // the floor just finished in sight above the words, not behind them; «Continua» gives the usual framing back
  frameAbove(state.floor, panel.querySelector('.av-talk').getBoundingClientRect().top);
  return new Promise((resolve) => {
    panel.querySelector('button').onclick = () => {
      sfx.tap();
      panel.hidden = true;
      panel.innerHTML = '';
      delete document.body.dataset.fine;
      for (const sel of BEHIND) document.querySelector(sel).inert = false;
      go('overview');
      resolve();
    };
  });
}

/** A floor with its room; a floor whose room is not ready yet holds only boxes. */
function buildFloor(n, earned) {
  const info = FLOORS[n - 1];
  const shell = makeFloorShell(info, world);
  shell.userData.pick = { type: 'floor', n };
  scene.add(shell);
  pickables.push(shell);
  let office = null;
  if (ROOMS[n]) {
    office = furnishRoom(shell, info, world);
    office.setEarned(earned);
    if (earned >= 8) shell.userData.wallMat.color.set(info.room);
  } else {
    addBoxes(shell);
    const light = new THREE.PointLight('#FFE7C7', 2.2, 7, 1);
    light.position.set(0, 1.3, 0.4);
    shell.add(light);
    world.roomLights.push(light);
  }
  noGlassTaps(shell);
  liftDecals(shell);
  const f = { shell, office };
  built.set(n, f);
  showSigns();
  return f;
}

/** The building as it is with `floor` in progress and `earned` stages done on it; the floors below are finished. */
function setup(floor, earned) {
  for (const { shell } of built.values()) {
    scene.remove(shell);
    pickables.splice(pickables.indexOf(shell), 1);
  }
  built.clear();
  world.roomLights.length = 0;
  world.roomLampMats.length = 0;
  state.floor = floor;
  state.earned = earned;
  for (let n = 1; n <= floor; n++) buildFloor(n, n < floor ? 8 : earned);
  roofSite.position.y = floorY(floor + 1);
  roofFinished(floor === FLOORS.length && earned >= 8);
  fitShadow();
  // the rooms just built take the light
  applyLight();
}

/** On the finished building the roof is the stage of the launch; until then it is a building site with the crane. */
function roofFinished(done) {
  const u = roofSite.userData;
  u.units.visible = u.crane.visible = !done;
  u.stage.visible = done;
}

/** Glass must not stop taps. */
function noGlassTaps(root) {
  root.traverse((o) => {
    if (o.material && o.material.transparent && o.material.opacity < 0.5 && !o.isSprite) o.raycast = () => {};
  });
}

/** Labels, plates and paint are flat sheets laid on a surface: drawn a hair in front of it, so from afar they never
 *  flicker into the surface below, however close to it they sit. The ground and the sky are not sheets. */
function liftDecals(root) {
  root.traverse((o) => {
    if (!o.isMesh || o.geometry.type !== 'PlaneGeometry') return;
    const { width, height } = o.geometry.parameters;
    if (width * height > 20) return;
    for (const m of [].concat(o.material)) Object.assign(m, { polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -2 });
  });
}

function addBoxes(shell) {
  const g = new THREE.Group();
  const spots = [
    [-1.2, 0, -0.6, 0.4],
    [-0.75, 0, -0.75, 0.32],
    [-1.0, 0.4, -0.65, 0.3],
    [0.9, 0, -0.5, 0.42],
    [1.4, 0, 0.3, 0.34],
  ];
  for (const [x, y, z, s] of spots) {
    const b = new THREE.Group();
    b.position.set(x, y, z);
    b.rotation.y = x * 2;
    b.add(rbox(s, s * 0.8, s, '#D9A066', { r: 0.02 }));
    b.add(rbox(s * 1.01, 0.03, s * 0.25, '#B5793E', { at: [0, s * 0.8 - 0.015, 0], r: 0.005 }));
    g.add(b);
  }
  g.traverse((m) => {
    if (m.isMesh) m.castShadow = m.receiveShadow = false;
  });
  shell.add(g);
}

function hideSheets() {
  closeSheet($('card-wrap'));
  closeSheet($('demo-wrap'));
}

async function finishFloor() {
  const office = cur();
  if (state.busy || !office) return;
  office.setEarned(7);
  state.earned = 7;
  renderPips();
  renderCta();
  await completeNext({ pretend: false });
}

/** Back to a floor in progress: from the start, floor 1 with no stage done, or a floor halfway. */
function reset(floor = 1, earned = 0) {
  if (state.busy) return;
  // from the start: the trophies and what they remember go too
  if (floor === 1 && earned === 0) {
    trophies?.reset();
    for (const m of [played, missed, eggsFound, looked]) m.clear();
  }
  hideSheets();
  shown = null;
  setup(floor, earned);
  renderPlate();
  renderCta();
  go('overview');
  persist();
  // the Percorso goes to the stage to do now
  if (state.tab === 'percorso') setTab('percorso');
}

// ---------- wiring ----------
// the pill pretends to finish the next stage: a control of the prova, like Demo; in the app it is not there
$('cta').onclick = () => {
  if (IN_APP) return;
  sfx.tap();
  completeNext();
};
$('btn-back').onclick = (e) => {
  sfx.whoosh();
  // from a zoom outside: the whole building again, at the same height
  if (state.view === 'overview') return go('overview', { y: rig.cur.target.y });
  const n = state.viewFloor;
  go('overview', { n });
  // from the keyboard the button disappears under the focus: the focus goes to the floor you left
  if (e.detail === 0) focusFloor(n);
};
$('btn-demo').onclick = () => {
  if (IN_APP) return;
  sfx.tap();
  openSheet($('demo-wrap'));
};
// the sounds are switched in the Tu's settings only (10/11/2026, Davide: «togliere il pulsante del sound»)
function toggleSound() {
  sound.on = !sound.on;
  persist();
}
for (const t of document.querySelectorAll('.tab')) {
  t.onclick = () => {
    if (state.busy || t.dataset.tab === state.tab) return;
    sfx.tap();
    setTab(t.dataset.tab);
  };
}
// the ring of the focus on the bar is for the keyboard only (style.css, .tab:focus-visible). Some browsers still show
// it after a tap that follows a key: the last way used decides (revisione UX 09/11, stanza 8)
const NAV_KEYS = new Set(['Tab', 'Enter', ' ', 'Escape', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']);
addEventListener('pointerdown', () => document.documentElement.toggleAttribute('data-pointer', true), true);
addEventListener('keydown', (e) => NAV_KEYS.has(e.key) && document.documentElement.removeAttribute('data-pointer'), true);

// ---------- the bar: Percorso · Ufficio · Tu (28/10/2026) ----------
let path = null;
let me = null;
let avvio = null; // the first start (avvio.js, 07/11/2026)
let lezione = null; // the lesson engine (lezione.js, 07/11/2026)
let caso = null; // the Caso (caso.js, 07/11/2026)
let campo = null; // the Prova sul campo (campo.js, 09/11/2026)
// the trophies of the Tu (trophies.js) and what the prova has to remember to give them: how each pretend lesson went
// («Lezioni finte» in DEMO), the surprises of the garden found, the objects looked at floor by floor
let trophies = null;
const played = new Map(); // n → [true if all right at the first go, …] for the stages done in this prova
const missed = new Map(); // n → { stage: [exercises wrong at the first go] }, for the review (compito C5)
// the settings of the Tu; `movimento` is null until the switch is touched, and meanwhile follows the phone
const settings = { avvisi: true, vibrazione: true, movimento: null };
/** Vibration and reduced motion act at once, everywhere (cubotto 9.7, 09/11/2026): kit.js reads them in buzz() and
 *  tween(), the camera in updateCamera(), style.css under html[data-calm]. */
const phoneCalm = matchMedia('(prefers-reduced-motion: reduce)');
function applySettings() {
  haptics.on = settings.vibrazione !== false;
  motion.calm = settings.movimento ?? phoneCalm.matches;
  document.documentElement.toggleAttribute('data-calm', motion.calm);
}
phoneCalm.addEventListener?.('change', applySettings);
applySettings();
const eggsFound = new Set();
const looked = new Map(); // n → the stages whose object card you opened
function trophy(id, n) {
  if (id === 'egg') {
    eggsFound.add(n);
    trophies.earn('ficcanaso');
    if (eggsFound.size === FLOORS.length) trophies.earn('giardino');
    return persist();
  }
  trophies.earn(id);
  persist();
}

/** Everything that has to survive the app being closed (compito D1, 07/11/2026): written after every change. */
// the stages done as saved: during the flight that follows a stage, the stage is already done for the save, though
// the office has not shown it yet (completeNext)
let earnedSaved = null;
function persist() {
  if (!trophies) return; // not before the start has put back what was saved
  saveProgress({
    floor: state.floor,
    earned: earnedSaved ?? state.earned,
    played: Object.fromEntries(played),
    missed: Object.fromEntries(missed),
    eggs: [...eggsFound],
    looked: Object.fromEntries([...looked].map(([n, s]) => [n, [...s]])),
    trophies: trophies.list(),
    settings: { ...settings, suoni: sound.on },
    avvisi: reminders.save(),
  });
  syncAvvisi();
}
/** Back as it was: the maps and the settings from a save (the floor and the stages go to setup()). */
function restore(d) {
  for (const [n, a] of Object.entries(d.played ?? {})) played.set(Number(n), a.map((v) => (v === null ? undefined : v)));
  for (const [n, o] of Object.entries(d.missed ?? {})) missed.set(Number(n), o);
  for (const n of d.eggs ?? []) eggsFound.add(n);
  for (const [n, a] of Object.entries(d.looked ?? {})) looked.set(Number(n), new Set(a));
  Object.assign(settings, { avvisi: d.settings?.avvisi ?? true, vibrazione: d.settings?.vibrazione ?? true, movimento: d.settings?.movimento ?? null });
  applySettings();
  if (d.settings?.suoni === false && sound.on) toggleSound();
  reminders.load(d.avvisi);
}
/** «Ricomincia da capo» (CLAUDE.md §7): everything FEEN saved goes, the settings and the time of the reminders too
 *  (before, they survived the wipe). The reminders stay off until the first start asks again, after the first lesson. */
function wipeAll() {
  if (state.busy) return;
  Object.assign(settings, { avvisi: false, vibrazione: true, movimento: null });
  applySettings();
  if (!sound.on) toggleSound();
  reminders.load({ ora: '18:00', day: null });
  reset();
  avvio.restart();
}

// ---------- the reminders (avvisi.js; cubotto 9.4, 09/11/2026) ----------
/** Sends the plan to the app. When the phone says no, the switch of the Tu goes off and the toast says why. */
function syncAvvisi(opts) {
  return syncReminders(settings.avvisi, opts).then((r) => {
    if (!r || r.granted) return r;
    // CLAUDE.md §8: refused, the app does not ask again; they come back from the Tu, or from the phone's settings
    settings.avvisi = false;
    persist();
    if (state.tab === 'tu') me?.render();
    toast(r.canAskAgain ? 'Niente promemoria. Si accendono dal Tu, nelle Impostazioni.' : 'Niente promemoria: le notifiche di FEEN sono spente nelle Impostazioni del telefono.');
    return r;
  });
}
/** The first start's choice, right after the first lesson: the phone asks its permission only now. */
async function remind(time) {
  if (time) reminders.time = time;
  settings.avvisi = !!time;
  if (!time) {
    persist();
    return toast('Niente promemoria. Si accendono dal Tu, nelle Impostazioni.');
  }
  if (!canRemind()) {
    persist();
    // in the browser there is no phone to ask (the prova says what the app does)
    return toast(IN_APP ? `Promemoria alle ${time}.` : `Promemoria alle ${time}. Nell’app qui il telefono chiede il permesso.`);
  }
  const asked = syncAvvisi({ ask: true });
  persist();
  if ((await asked)?.granted) toast(`Promemoria alle ${time}.`);
}
/** Shows one of the three tabs. Away from the Ufficio the sede is not drawn: the phone rests. */
function setTab(t) {
  state.tab = t;
  document.body.dataset.tab = t;
  for (const b of document.querySelectorAll('.tab')) {
    const on = b.dataset.tab === t;
    b.classList.toggle('active', on);
    if (on) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  }
  $('path').hidden = t !== 'percorso';
  $('me').hidden = t !== 'tu';
  if (t === 'percorso') {
    // the way is built at once, so it can open on the stage to do now in the same frame
    path.render();
    path.scrollToNext();
  }
  if (t === 'tu') {
    me.render();
    $('me').scrollTop = 0;
  }
  // no hint on the first visit any more («Scorri su e giù · Tocca un piano per entrarci»): the screen says it by
  // itself (revisione della grafica, 10/11/2026 sera, after Davide: «fare capire cose tramite l'UI anziché scriverle»)
}
/** The stage to do now, started from the Percorso: the lesson, then its end in the Ufficio, then back. */
async function play() {
  if (state.busy) return;
  if (comingSoon(state.floor)) return toast(SOON(state.floor));
  setTab('ufficio');
  hideCoach();
  await completeNext({ fromPath: true, real: true });
  setTab('percorso');
}

$('demo-wrap').addEventListener('click', (e) => {
  const act = e.target.closest('[data-act]')?.dataset.act;
  if (!act && e.target !== $('demo-wrap')) return;
  sfx.tap();
  closeSheet($('demo-wrap'));
  // from the Percorso the demo plays the stage as the Percorso would, and comes back
  if (act === 'next') state.tab === 'ufficio' ? completeNext() : play();
  if (act === 'floor') {
    const back = state.tab !== 'ufficio';
    if (back) setTab('ufficio');
    finishFloor().then(() => back && setTab('percorso'));
  }
  if (act === 'glow') {
    state.glow = !state.glow;
    e.target.closest('[data-act]').textContent = `Alone sugli oggetti: ${state.glow ? 'sì' : 'no'}`;
  }
  if (act === 'mode') {
    state.lessons = { prova: 'giuste', giuste: 'errore', errore: 'prova' }[state.lessons];
    e.target.closest('[data-act]').textContent = { prova: 'Lezioni: si gioca la lezione di prova', giuste: 'Lezioni finte: tutte giuste', errore: 'Lezioni finte: con un errore' }[state.lessons];
  }
  if (act === 'reset') reset();
  if (act === 'last') reset(LAST, 5);
  if (act === 'avvio') {
    reset();
    avvio.restart();
  }
  // the engine on the test lesson, until B7 puts the lessons in the Percorso
  if (act === 'lezione') {
    lezione.play(LESSONS.prova).then(({ done, wrong }) => {
      if (done) toast(wrong.length ? `Lezione di prova finita: da rivedere ${wrong.length === 1 ? 'l’esercizio' : 'gli esercizi'} ${wrong.join(', ')}.` : 'Lezione di prova finita: tutte giuste al primo colpo.');
    });
  }
});

// ---------- sheets close with a drag downwards ----------
function dragToClose(sheet, onClose) {
  let drag = null;
  sheet.addEventListener('pointerdown', (e) => {
    drag = { id: e.pointerId, y: e.clientY, t: performance.now(), dy: 0, on: false };
  });
  sheet.addEventListener('pointermove', (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const dy = e.clientY - drag.y;
    if (!drag.on && dy > 8) {
      drag.on = true;
      sheet.setPointerCapture(e.pointerId);
      sheet.style.transition = 'none';
    }
    if (!drag.on) return;
    drag.dy = Math.max(0, dy);
    sheet.style.transform = `translateY(${drag.dy}px)`;
  });
  const end = (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    const { on, dy, t } = drag;
    drag = null;
    if (!on) return;
    sheet.style.transition = 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)';
    if (dy > 110 || dy / (performance.now() - t) > 0.6) {
      sheet.style.transform = 'translateY(120%)';
      setTimeout(() => {
        sheet.style.transform = '';
        sheet.style.transition = '';
        onClose();
      }, 200);
    } else {
      sheet.style.transform = '';
    }
  };
  sheet.addEventListener('pointerup', end);
  sheet.addEventListener('pointercancel', end);
}
dragToClose($('card'), () => {
  sfx.tap();
  closeCard();
});
dragToClose(document.querySelector('#demo-wrap .sheet'), () => closeSheet($('demo-wrap')));

/** The hint over the sede is not shown any more (10/11/2026 sera): kept hidden, whatever asks to hide it. */
function hideCoach() {
  $('coach').hidden = true;
}

// ---------- start ----------
manager.onProgress = (_, loaded, total) => {
  $('load-bar').style.transform = `scaleX(${Math.max(0.04, loaded / total)})`;
};

async function start() {
  resize();
  await Promise.all([document.fonts.load('800 40px "Bricolage Grotesque"'), document.fonts.load('700 40px "Bricolage Grotesque"'), document.fonts.load('500 16px "Hanken Grotesk"')]).catch(() => {});
  $('load-bar').style.transform = 'scaleX(1)'; // everything is made in code: nothing else to load

  sky = makeSky();
  sky.raycast = () => {};
  scene.add(sky);
  const campus = makeCampus(world);
  scene.add(campus);
  pickables.push(campus);

  roofSite = makeRoofSite(world);
  scene.add(roofSite);
  roofSite.userData.stage.userData.pick = { type: 'roof' };
  pickables.push(roofSite.userData.stage);
  // the progress kept on the phone (D1); a save that cannot be read asks before anything is lost (D2)
  let saved = loadProgress();
  if (saved?.broken) {
    await askBroken();
    saved = null;
  }
  if (saved) {
    state.floor = Math.min(saved.floor, FLOORS.length);
    state.earned = saved.earned;
    restore(saved);
  }
  setup(state.floor, state.earned);
  noGlassTaps(scene);
  liftDecals(scene);
  document.querySelector('[data-act="last"]').textContent = `Salta al piano ${LAST}, a metà`;

  applyLight();
  renderPlate();
  renderCta();
  go('overview', undefined, { instant: true });
  rig.cur.dist *= 1.35;
  rig.cur.el += 10;

  $('loading').classList.add('out');
  setTimeout(() => ($('loading').hidden = true), 450);
  trophies = makeTrophies({ sfx, onChange: () => state.tab === 'tu' && me?.render() });
  if (saved) trophies.restore(saved.trophies);
  path = makePath({ renderer, state, earnedOn, built, LIGHT, toast, play, trophy, roofSays: ROOF_SAYS, openStage: (n, i) => openCard(n, i, false), review, canReview, who: () => avvio?.who(), soon: comingSoon });
  me = makeMe({ state, earnedOn, toast, sfx, sound, toggleSound, trophies, settings, applySettings, persist, who: () => avvio.who(), wipe: wipeAll });
  // the reminders are checked and scheduled again at every opening, and when FEEN comes back to the front
  window.feenAvvisiSync = () => syncAvvisi({ force: true });
  syncAvvisi({ force: true });
  // the first start (CLAUDE.md §5): on a phone that never finished it, the welcome; then always the Percorso
  avvio = makeAvvio({
    sfx,
    buzz,
    toast,
    toSede: () => {
      setTab('ufficio');
      go('overview');
    },
    firstLesson: async () => {
      // already done (the app was closed during its end, after it was saved): the first start goes on to the
      // reminders, instead of playing the next stage as if it were the first lesson
      if (state.floor > 1 || state.earned > 0) return true;
      setTab('ufficio');
      hideCoach();
      // false when you leave the first lesson with the X: the first start waits on it
      return completeNext({ fromPath: true, real: true });
    },
    done: () => setTab('percorso'),
    remind,
  });
  lezione = makeLesson({ sfx, buzz, toast, who: () => avvio.who() });
  // the line on the trap after the third choice: only from an approved card (lezioni/piano-N/trappole.md), by type
  caso = makeCase({ sfx, buzz, who: () => avvio.who(), trapLine: (n) => TRAPS[n]?.[avvio.who()?.quadrant] ?? null });
  // the same line on the trap, after the key moments of the Prova sul campo
  campo = makeField({ sfx, buzz, who: () => avvio.who(), trapLine: (n) => TRAPS[n]?.[avvio.who()?.quadrant] ?? null });
  if (avvio.done()) setTab(state.tab);
  else {
    // the Tu draws nothing: behind the screens of the test the phone rests
    setTab('tu');
    avvio.resume();
  }

  let last = performance.now();
  let time = 0;
  // `force`: drawn even away from the Ufficio (the checks and the photos of the prova)
  const frame = (dt, force = false) => {
    time += dt;
    for (const m of world.mixers) m.update(dt);
    for (const f of world.anim) f(time, dt);
    updateTweens(dt);
    updateFx(dt);
    updateCamera(dt);
    updateGlow(dt);
    // the Percorso and the Tu are pages: only the Ufficio is drawn (the Percorso is no longer a garden in 3D, 10/11/2026)
    if (force || state.tab === 'ufficio') renderer.render(scene, camera);
  };
  // for checking the prova from the browser tools: advance the scene by n frames
  Object.assign(window.__feen, { go, state, built, setup, completeNext, finishFloor, reset, tap, setTab, LAST, IN_APP });
  window.__feen.step = (n = 60) => {
    for (let i = 0; i < n; i++) frame(1 / 60, true);
  };
  // lighter rendering on slower phones: measure a few seconds of the Office, then adapt once. Only while the Office is
  // on screen and still, after its first second (10/11/2026, Davide: «i numeri sono sfocati»: the probe measured from
  // the start, where the loading, the first run and the Percorso count too, and a phone that could draw the Office
  // sharp dropped to 1.25 for good)
  let probe = { frames: 0, time: 0, done: false, skip: 60 };
  renderer.setAnimationLoop(() => {
    const now = performance.now();
    const raw = (now - last) / 1000;
    const dt = Math.min(0.05, raw);
    last = now;
    frame(dt);
    const measurable = state.tab === 'ufficio' && !state.busy && !document.hidden && raw < 0.5 && $('loading').hidden && $('avvio').hidden;
    if (!probe.done && measurable && probe.skip > 0) probe.skip--;
    else if (!probe.done && measurable) {
      probe.frames++;
      probe.time += raw;
      if (probe.time > 2.5) {
        probe.done = true;
        const avg = probe.time / probe.frames;
        if (avg > 0.024) {
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, avg > 0.034 ? 1.25 : 1.5));
          if (avg > 0.034) {
            sun.shadow.mapSize.set(1024, 1024);
            sun.shadow.map?.dispose();
            sun.shadow.map = null;
          }
          resize();
        }
      }
    }
  });
}

start().catch((err) => {
  console.error(err);
  $('loading').querySelector('.load-note').textContent = IN_APP ? 'Qualcosa non ha caricato. Chiudi FEEN e riaprila.' : 'Qualcosa non ha caricato. Riprova ricaricando la pagina.';
});
