// Small shared tools for the prova: materials, rounded boxes, canvas textures,
// model loading, tweens and sounds.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { clone as cloneSkinned } from 'three/addons/utils/SkeletonUtils.js';

// ---------- palette: warm neutrals, one dark for structures; the floors' colours are in world.js ----------
export const C = {
  ink: '#14213D', // the text colour of the app's palette (30/10/2026)
  muted: '#6E6A65',
  navy: '#3A4458',
  steel: '#59647A',
  frame: '#B5AEA3',
  white: '#FBF8F3',
  cream: '#F4EDE2',
  stone: '#EDE6DA',
  stoneDark: '#DCD3C4',
  gold: '#FFC93C', // the coins' yellow of the app's palette: gold is only for coins
  goldDark: '#E0A82A',
  green: '#7BBF6A',
  greenDark: '#5E9F52',
  grassA: '#B3D59A',
  grassB: '#BAD9A2',
  sky: '#9CCFF0',
  glass: '#B9DEF2',
  wood: '#D8A774',
  woodDark: '#B07C4E',
  red: '#E8735A',
  yellow: '#FFC93C',
};

/** A colour a step of the way from `a` to `b` (0 = a, 1 = b): a floor's lighter and darker tones come from its palette. */
export function mixHex(a, b, t) {
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const [x, y] = [rgb(a), rgb(b)];
  return `#${x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('').toUpperCase()}`;
}

/** The ink that reads on a floor's colour: near-black on the light ones, white on the dark ones, whichever has more
 *  contrast. Every number on a floor's colour takes it, so a new colour can never be unreadable. */
export function inkOn(color) {
  const lum = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const L = lum(color);
  return (L + 0.05) / (lum(C.ink) + 0.05) >= 1.05 / (L + 0.05) ? C.ink : '#FFFFFF';
}

const matCache = new Map();
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) {
    matCache.set(key, new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0, ...opts }));
  }
  return matCache.get(key);
}
export const goldMat = () => mat(C.gold, { metalness: 0.45, roughness: 0.32, emissive: '#7A4A00', emissiveIntensity: 0.25 });

export function shadows(obj, cast = true, receive = true) {
  obj.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = cast;
      o.receiveShadow = receive;
    }
  });
  return obj;
}

/** A rounded box, positioned by the centre of its base unless `center` is true. */
export function rbox(w, h, d, material, { r = 0.04, seg = 3, at = [0, 0, 0], center = false } = {}) {
  const geo = new RoundedBoxGeometry(w, h, d, seg, Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4));
  const m = new THREE.Mesh(geo, typeof material === 'string' ? mat(material) : material);
  m.position.set(at[0], at[1] + (center ? 0 : h / 2), at[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** A box with sharp edges, positioned like `rbox`; `material` may be one per face. */
export function box(w, h, d, material, { at = [0, 0, 0], center = false } = {}) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), typeof material === 'string' ? mat(material) : material);
  m.position.set(at[0], at[1] + (center ? 0 : h / 2), at[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function cyl(rTop, rBottom, h, material, { seg = 24, at = [0, 0, 0], center = false, open = false } = {}) {
  const m = new THREE.Mesh(
    new THREE.CylinderGeometry(rTop, rBottom, h, seg, 1, open),
    typeof material === 'string' ? mat(material) : material,
  );
  m.position.set(at[0], at[1] + (center ? 0 : h / 2), at[2]);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function sphere(r, material, at = [0, 0, 0], seg = 20) {
  const m = new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75)), typeof material === 'string' ? mat(material) : material);
  m.position.set(...at);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// ---------- canvas textures ----------
export function canvasTexture(w, h, draw, { repeat = null, srgb = true } = {}) {
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  draw(cv.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(cv);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  if (repeat) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
  }
  return t;
}

export function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Lettering for textures: the titles' typeface, optionally outlined. */
export function strokeText(ctx, text, x, y, size, { fill = C.ink, stroke = C.ink, line = 0, font = 'Bricolage Grotesque', weight = 800, align = 'center' } = {}) {
  ctx.font = `${weight} ${size}px "${font}", system-ui, sans-serif`;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  if (line > 0) {
    ctx.lineJoin = 'round';
    ctx.lineWidth = line;
    ctx.strokeStyle = stroke;
    ctx.strokeText(text, x, y);
  }
  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);
}

// ---------- models ----------
export const manager = new THREE.LoadingManager();
const loader = new GLTFLoader(manager);
const modelCache = new Map();

export function loadModels(paths) {
  return Promise.all(
    paths.map(
      (p) =>
        new Promise((resolve, reject) => {
          loader.load(
            p,
            (g) => {
              modelCache.set(p, g);
              resolve(g);
            },
            undefined,
            reject,
          );
        }),
    ),
  );
}

/** A fresh copy of a loaded model, recoloured and sized. Pivot: centre of the base. */
export function model(path, { scale = 1, recolor = null, center = true } = {}) {
  const g = modelCache.get(path);
  if (!g) throw new Error('model not loaded: ' + path);
  const root = cloneSkinned(g.scene);
  root.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
      if (recolor) {
        const swap = (m) => {
          const c = recolor[m.name];
          if (!c) return m;
          const n = m.clone();
          n.color = new THREE.Color(c);
          return n;
        };
        o.material = Array.isArray(o.material) ? o.material.map(swap) : swap(o.material);
      }
    }
  });
  const holder = new THREE.Group();
  root.scale.setScalar(scale);
  holder.add(root);
  if (center) {
    const box = new THREE.Box3().setFromObject(root);
    root.position.x -= (box.min.x + box.max.x) / 2;
    root.position.z -= (box.min.z + box.max.z) / 2;
    root.position.y -= box.min.y;
  }
  holder.userData.animations = g.animations;
  holder.userData.root = root;
  return holder;
}

// ---------- tweens ----------
const tweens = [];
export const ease = {
  linear: (k) => k,
  out: (k) => 1 - Math.pow(1 - k, 3),
  inOut: (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
  back: (k) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2);
  },
  bounce: (k) => {
    const n = 7.5625;
    const d = 2.75;
    if (k < 1 / d) return n * k * k;
    if (k < 2 / d) return n * (k -= 1.5 / d) * k + 0.75;
    if (k < 2.5 / d) return n * (k -= 2.25 / d) * k + 0.9375;
    return n * (k -= 2.625 / d) * k + 0.984375;
  },
};

export function tween(dur, update, { easing = ease.inOut, delay = 0 } = {}) {
  return new Promise((resolve) => {
    tweens.push({ t: -delay, dur, update, easing, resolve });
  });
}
export const wait = (s) => tween(s, () => {});

export function updateTweens(dt) {
  for (let i = tweens.length - 1; i >= 0; i--) {
    const tw = tweens[i];
    tw.t += dt;
    if (tw.t < 0) continue;
    const k = Math.min(1, tw.t / tw.dur);
    tw.update(tw.easing(k), k);
    if (k >= 1) {
      tweens.splice(i, 1);
      tw.resolve();
    }
  }
}

// ---------- sounds (made on the fly, no files) ----------
let audio = null;
export const sound = { on: true };
function ctx() {
  if (!audio) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audio = new AC();
  }
  if (audio.state === 'suspended') audio.resume();
  return audio;
}
function tone(freq, start, dur, { type = 'triangle', gain = 0.18, slide = 0 } = {}) {
  const a = ctx();
  if (!a || !sound.on) return;
  const t0 = a.currentTime + start;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(freq * slide, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(a.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}
export const sfx = {
  tap: () => tone(520, 0, 0.09, { type: 'sine', gain: 0.12, slide: 1.4 }),
  whoosh: () => tone(220, 0, 0.35, { type: 'sine', gain: 0.08, slide: 3 }),
  land: () => {
    tone(140, 0, 0.18, { type: 'sine', gain: 0.3, slide: 0.6 });
    tone(880, 0.05, 0.12, { type: 'triangle', gain: 0.1 });
  },
  reward: () => [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.02 + i * 0.09, 0.32, { gain: 0.14 })),
  fanfare: () => [392, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, i * 0.11, 0.4, { gain: 0.13 })),
  build: () => [0, 0.18, 0.36, 0.54].forEach((s) => tone(180 + s * 200, s, 0.12, { type: 'square', gain: 0.05 })),
};
export const buzz = (ms = 15) => {
  // browsers refuse vibration before the first tap
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
  navigator.vibrate?.(ms);
};
