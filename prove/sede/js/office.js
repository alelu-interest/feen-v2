// Inside a floor: the room of its department, the 3 objects of the floor (stage 1, the
// Case, the Field test), their stands while they wait, and the walls that take the
// floor's colour one stage at a time. Every floor is a different room (25/10/2026):
// the Direzione is your office with your desk, the Tesoreria a bank counter.
// The furniture is square-edged like the building (25/10/2026, strada A): only what is round by
// nature stays round (the vault door, the clock, the wheel, the telescope, the studio lights) and
// the objects of the floors are untouched.

import * as THREE from 'three';
import { C, mat, goldMat, rbox, box as sharpBox, cyl, sphere, canvasTexture, roundRect, strokeText, inkOn, mixHex } from './kit.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { B, FLOORS, LEAVES, TRUNK, leafBall, leafMat } from './world.js';

// ---------- a hairline chamfer on every box of the rooms ----------
// Davide, 10/11/2026: «il setup dell'ufficio a livello macro è molto bello ma a livello micro vanno alzate la qualità
// degli oggetti». Every box in a room keeps its square edges (the rule of the elements), cut by a flat 45° chamfer
// a few millimetres wide: from the room's view it is under a pixel, close up each edge catches a thin line of light,
// as a real piece of furniture does. The building and the city outside stay sharp (they use kit.js's box).
const chamferCache = new Map();
function chamferGeometry(w, h, d, c) {
  const key = [w, h, d, c].map((v) => v.toFixed(5)).join();
  if (chamferCache.has(key)) return chamferCache.get(key);
  const half = [w / 2, h / 2, d / 2];
  // every corner of the box becomes three points, one on each of its three faces
  const pt = (axis, s) => new THREE.Vector3(...half.map((v, i) => s[i] * (i === axis ? v : v - c)));
  const polys = [];
  const S = [1, -1];
  for (let a = 0; a < 3; a++) {
    const [b, e] = [(a + 1) % 3, (a + 2) % 3];
    for (const sa of S) {
      // the face itself
      const ring = [[1, 1], [1, -1], [-1, -1], [-1, 1]].map(([sb, se]) => {
        const s = [];
        s[a] = sa;
        s[b] = sb;
        s[e] = se;
        return pt(a, s);
      });
      polys.push({ ring });
      // the strip between this face and the next axis's face, along the third axis
      for (const sb of S) {
        const s1 = [];
        s1[a] = sa;
        s1[b] = sb;
        s1[e] = 1;
        const s2 = [...s1];
        s2[e] = -1;
        polys.push({ ring: [pt(a, s1), pt(b, s1), pt(b, s2), pt(a, s2)] });
      }
    }
  }
  // the small triangle at each corner
  for (const sx of S) for (const sy of S) for (const sz of S) polys.push({ ring: [0, 1, 2].map((ax) => pt(ax, [sx, sy, sz])) });
  const pos = [];
  const nor = [];
  const uvs = [];
  const n = new THREE.Vector3();
  const mid = new THREE.Vector3();
  for (const { ring } of polys) {
    mid.set(0, 0, 0);
    ring.forEach((p) => mid.add(p));
    n.subVectors(ring[1], ring[0]).cross(new THREE.Vector3().subVectors(ring[2], ring[0])).normalize();
    const out = n.dot(mid) >= 0;
    const pts = out ? ring : [...ring].reverse();
    if (!out) n.negate();
    for (let i = 1; i < pts.length - 1; i++) {
      for (const p of [pts[0], pts[i], pts[i + 1]]) {
        pos.push(p.x, p.y, p.z);
        nor.push(n.x, n.y, n.z);
        uvs.push(0.5, 0.5);
      }
    }
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  chamferCache.set(key, geo);
  return geo;
}
/** kit.js's box, chamfered: same size, same placing. Thin sheets (under 4 mm), boxes with a material per face and
 *  boxes wearing a picture stay sharp. */
function box(w, h, d, material, opts = {}) {
  const c = Math.min(0.008, Math.min(w, h, d) * 0.12);
  if (c < 0.0005 || Array.isArray(material) || material?.map) return sharpBox(w, h, d, material, opts);
  const m = sharpBox(w, h, d, material, opts);
  m.geometry.dispose();
  m.geometry = chamferGeometry(w, h, d, c);
  return m;
}

const K = 1.3; // furniture scale
const DESK_TOP = 0.38 * K * 1.25;
const COUNTER_TOP = 0.66;
// piano 9: the archive of the titles by the core, with a wide niche at eye height, and the lectern in the middle
const ARCHIVE = { x: 1.12, z: B.inB + 0.18, cols: 5, rows: 4, cell: 0.31, rowH: 0.335, board: 0.025, d: 0.34, plinth: 0.06, niche: 2 };
ARCHIVE.nicheX = 0; // the niche spans the three middle columns
ARCHIVE.nicheY = ARCHIVE.plinth + ARCHIVE.niche * ARCHIVE.rowH + ARCHIVE.board;
const LECTERN = { x: -0.3, z: -0.15, h: 0.86 };
// piano 10: the showcase by the core, closed below and open above, and the low table between the two armchairs
const VITRINE = { x: 1.42, z: B.inB + 0.2, w: 0.8, d: 0.36, h: 1.4, base: 0.55, shelf: 0.92, board: 0.025 };
const COFFEE = { x: -0.42, z: 0.05, h: 0.4 };
// piano 11: the control desk in front of the wall of screens, and the low equipment rack by the core
const CONSOLE = { x: 0.3, z: -0.62, w: 1.4, d: 0.5 };
const RACK = { x: 1.6, z: B.inB + 0.24, w: 0.72, d: 0.4, h: 0.56 };
// piano 12: the low wide chest of the maps along the back wall, and the globe on its stand on the left
const MAPCHEST = { x: 0.78, z: B.inB + 0.27, w: 1.5, d: 0.5, h: 0.6 };
const GLOBE = { x: -1.05, z: -0.15, r: 0.27, y: 0.98 };

// What each floor holds: its 8 stages (`1. LAVORO/i-12-piani.md` §6), its furniture, and
// its 3 objects with their place in that room (`at` is the base of the place, or its centre
// on a wall; `size` the box the object is fitted to) and the pose each takes in the card.
// Only stage 1, the Case and the Field test bring an object; the other stages colour the
// room. The key ideas are placeholder lines.
export const ROOMS = {
  1: {
    stages: [
      { tag: 'Lezione 1', title: 'Dove sono finiti?', object: 'Il portacarte vuoto', idea: 'Entrate e uscite: da dove arrivano i tuoi soldi e dove vanno.' },
      { tag: 'Lezione 2', title: 'Perché una banconota vale', idea: 'Il denaro funziona perché ci fidiamo tutti. E cambia da Paese a Paese.' },
      { tag: 'Lezione 3', title: 'Ogni sì è un no', idea: 'Ogni scelta ha un costo: quello a cui rinunci.' },
      { tag: 'Caso', title: 'Il primo budget dell’azienda', object: 'La lavagna del budget', idea: 'Tre reparti, soldi per due: decidere vuol dire scegliere.' },
      { tag: 'Lezione 4', title: 'La regola 50/30/20', idea: 'Bisogni, desideri, da mettere da parte: 50, 30, 20.' },
      { tag: 'Lezione 5', title: 'Quanto costa davvero', idea: 'Il prezzo vero si guarda al chilo e al litro.' },
      { tag: 'Lezione 6', title: '«Risparmio quello che avanza»', idea: 'Prima metti da parte, poi spendi.' },
      { tag: 'Prova sul campo', title: 'Un mese di paghetta', object: 'Il salvadanaio del mese', idea: 'Quattro settimane di imprevisti: hai messo insieme tutto il piano.' },
    ],
    furnish: furnishDirezione,
    objects: [
      // on the desk, on the wall behind, on the desk
      { stage: 0, make: () => cardHolder(), at: [0.02, DESK_TOP, 0.22], size: [0.48, 0.25, 0.34], pose: [0.38, 0] },
      { stage: 3, make: () => whiteboard(), at: [-1.05, 0.9, B.inB + 0.02], size: [1.25, 0.72], wall: true, pose: [0.1, -0.4] },
      { stage: 7, make: () => piggyBank(), at: [0.72, DESK_TOP, 0.16], size: [0.34, 0.33, 0.34], pose: [0.12, -0.3] },
    ],
  },
  2: {
    hire: 'il primo collega',
    stages: [
      { tag: 'Lezione 1', title: 'I soldi che escono da soli', object: 'La carta che perde monete', idea: 'Abbonamenti e prove gratuite: i soldi digitali escono anche quando non li vedi.' },
      { tag: 'Lezione 2', title: 'Cosa fa una banca', idea: 'Conto e IBAN: dove stanno i tuoi soldi e chi li custodisce.' },
      { tag: 'Lezione 3', title: 'Debito, credito, prepagata', idea: 'Tre carte, tre modi di pagare: chi incassa e quanto costa.' },
      { tag: 'Caso', title: 'Gli abbonamenti dell’azienda', object: 'La ciabatta degli abbonamenti', idea: 'Sei abbonamenti, soldi per quattro: tenere vuol dire scegliere.' },
      { tag: 'Lezione 4', title: 'Soldi dentro i giochi', idea: 'Gemme e crediti hanno un prezzo in euro: guardalo sempre.' },
      { tag: 'Lezione 5', title: 'La banca che non è la banca', idea: 'Il codice non si dà mai, a nessuno.' },
      { tag: 'Lezione 6', title: '«Ti presto il conto, che vuoi che sia»', idea: 'Il tuo conto è solo tuo: prestarlo può metterti nei guai.' },
      { tag: 'Prova sul campo', title: 'Un giorno in Tesoreria', object: 'La cassaforte', idea: 'Disdici, controlla, blocca: hai messo insieme tutto il piano.' },
    ],
    furnish: furnishTesoreria,
    objects: [
      // on the counter in front of the window, on the back wall, on the cabinet behind the counter
      { stage: 0, make: () => leakingCard(), at: [-0.3, COUNTER_TOP, 0.03], size: [0.56, 0.26, 0.2], pose: [0.3, -0.3] },
      { stage: 3, make: () => powerStrip(), at: [-1.35, 1.06, B.inB + 0.02], size: [1.2, 0.7], wall: true, pose: [0.1, -0.4] },
      { stage: 7, make: () => safe(), at: [1.66, 0.625, -0.92], size: [0.46, 0.42, 0.6], pose: [0.14, 0.35] },
    ],
  },
  3: {
    stages: [
      { tag: 'Lezione 1', title: 'Solo 5 euro', object: 'Il gratta e vinci grattato', idea: 'Gratta e vinci e schedine sono azzardo: vietati ai minori, eppure 6 su 10 ci hanno già giocato.' },
      { tag: 'Lezione 2', title: 'Quante possibilità hai davvero', idea: 'Le probabilità si contano: moneta, dado, biglietto.' },
      { tag: 'Lezione 3', title: 'Il banco vince sempre', idea: 'Su 100 € giocati, in media ne tornano meno: chi organizza non perde mai.' },
      { tag: 'Caso', title: 'La cassa misteriosa', object: 'La ruota delle probabilità', idea: 'La cassa a premi vista da dentro: il premio raro è una fetta sottilissima.' },
      { tag: 'Lezione 4', title: 'Casse e pacchetti', idea: 'Prima di aprire una cassa guarda le probabilità. Il «quasi vinto» è fatto apposta.' },
      { tag: 'Lezione 5', title: 'Il sistema che non perde mai', idea: 'Nessun metodo batte la media: raddoppiare fa solo perdere di più.' },
      { tag: 'Lezione 6', title: '«Stavolta tocca a me»', idea: 'Il dado non si ricorda niente: le perdite non si rincorrono.' },
      { tag: 'Prova sul campo', title: 'Smonta il gioco', object: 'La console smontata', idea: 'Probabilità, prezzo in euro, pubblicità: hai smontato il gioco e visto cosa c’è dentro.' },
    ],
    furnish: furnishGaming,
    objects: [
      // on the side table, on the back wall, on the low table in front of the screen
      { stage: 0, make: () => scratchCard(), at: [-1.15, 0.455, 0.35], size: [0.38, 0.38, 0.26], pose: [0.2, -0.35] },
      { stage: 3, make: () => probabilityWheel(), at: [-1.3, 1.05, B.inB + 0.02], size: [0.85, 0.85], wall: true, pose: [0.05, -0.35] },
      { stage: 7, make: () => openConsole(), at: [0.6, 0.31, 0.0], size: [0.8, 0.38, 0.5], pose: [0.45, -0.3] },
    ],
  },
  4: {
    share: true, // the end of the first colleague's stretch: the first card to share
    stages: [
      { tag: 'Lezione 1', title: 'Ce l’hanno tutti', object: 'La scarpa con il cuore', idea: 'Amici e social decidono quello che compri più di quanto pensi.' },
      { tag: 'Lezione 2', title: 'Come ti convincono', idea: '«Ne restano solo 2», il timer, il -50%: prima chiediti rispetto a cosa.' },
      { tag: 'Lezione 3', title: 'Ti conoscono benissimo', idea: 'I tuoi dati scelgono le pubblicità che vedi. E la pubblicità va dichiarata.' },
      { tag: 'Caso', title: 'La campagna dell’azienda', object: 'Il manifesto onesto', idea: 'La campagna giusta dice di essere pubblicità: niente timer finti, niente influencer nascosti.' },
      { tag: 'Lezione 4', title: 'Il guru che ti fa ricco', idea: 'Nessuno può garantire un guadagno. Il consulente vero è autorizzato e dice quanto prende.' },
      { tag: 'Lezione 5', title: 'I tuoi diritti quando compri', idea: 'Due anni di garanzia, 14 giorni per ripensarci online, e lo scontrino si tiene.' },
      { tag: 'Lezione 6', title: '«Lo dice uno famoso»', idea: 'La fama non è una prova, la foglia verde nemmeno. E sai a chi rivolgerti.' },
      { tag: 'Prova sul campo', title: 'Un giorno al Marketing', object: 'Il timbro del Marketing', idea: 'Dieci pubblicità da approvare o bloccare: decidi tu cosa passa.' },
    ],
    furnish: furnishMarketing,
    objects: [
      // on the pedestal of the set, on the back wall, on the cart by the set
      { stage: 0, make: () => sneaker(), at: [0.95, 0.46, -0.55], size: [0.52, 0.4, 0.34], pose: [0.2, -0.55] },
      { stage: 3, make: () => honestPoster(), at: [-1.45, 1.02, B.inB + 0.02], size: [0.7, 0.9], wall: true, pose: [0.05, -0.3] },
      { stage: 7, make: () => stamp(), at: [-0.72, 0.615, 0.35], size: [0.6, 0.34, 0.4], pose: [0.45, -0.35] },
    ],
  },
  5: {
    hire: 'il secondo collega',
    stages: [
      { tag: 'Lezione 1', title: 'Il telefono tra otto mesi', object: 'La foto dell’obiettivo', idea: 'Si risparmia per un obiettivo, non con quello che avanza.' },
      { tag: 'Lezione 2', title: 'Interessi sugli interessi', idea: 'Gli interessi fanno altri interessi. All’inizio sembra niente.' },
      { tag: 'Lezione 3', title: 'Il tempo lavora per te', idea: 'Chi comincia prima, anche con poco, arriva più lontano.' },
      { tag: 'Caso', title: 'Il piano per il lancio', object: 'Le due salite di monete', idea: 'Poco ogni mese da subito batte tanto più avanti.' },
      { tag: 'Lezione 4', title: 'Dove metti i risparmi', idea: 'Salvadanaio, conto, conto deposito. E un fondo per gli imprevisti.' },
      { tag: 'Lezione 5', title: 'E se succede qualcosa?', idea: 'L’assicurazione passa il rischio ad altri: guarda premio, franchigia e massimale.' },
      { tag: 'Lezione 6', title: '«Lo farò da grande»', idea: 'Rimandare costa. E il fondo imprevisti non è per gli sfizi.' },
      { tag: 'Prova sul campo', title: 'Un anno in Pianificazione', object: 'La clessidra con le monete', idea: 'Obiettivo, versamenti, interessi, un imprevisto: il tempo ha lavorato per te.' },
    ],
    furnish: furnishPianificazione,
    objects: [
      // on the low bookcase, on the back wall above it, on the round table by the armchair
      { stage: 0, make: () => goalFrame(), at: [-1.5, 0.47, -1.0], size: [0.34, 0.32, 0.22], pose: [0.2, -0.35] },
      { stage: 3, make: () => twoClimbs(), at: [-1.3, 1.17, B.inB + 0.02], size: [0.9, 0.62], wall: true, pose: [0.05, -0.35] },
      { stage: 7, make: () => coinHourglass(), at: [0.4, 0.44, 0.35], size: [0.38, 0.56, 0.38], pose: [0.15, -0.3] },
    ],
  },
  6: {
    stages: [
      { tag: 'Lezione 1', title: 'Il primo lavoretto', object: 'Il grembiule estivo', idea: 'Con il contratto hai contributi e assicurazione. In nero, niente.' },
      { tag: 'Lezione 2', title: 'Lordo e netto', idea: 'Dal lordo tolgono contributi e IRPEF: quello che arriva è il netto.' },
      { tag: 'Lezione 3', title: 'Le tasse: chi paga cosa', idea: 'Superare uno scaglione tassa di più solo la parte sopra.' },
      { tag: 'Caso', title: 'Il primo stipendio del team', object: 'Il cedolino in cornice', idea: 'Un collega costa all’azienda più di quello che gli arriva: in mezzo, contributi e tasse.' },
      { tag: 'Lezione 4', title: 'I soldi che il lavoro mette da parte', idea: 'TFR e contributi sono soldi tuoi, messi da parte per dopo.' },
      { tag: 'Lezione 5', title: 'Lavorare per conto tuo', idea: 'Svuotare l’armadio non è reddito. Comprare per rivendere sì.' },
      { tag: 'Lezione 6', title: '«Quello che si paga da vecchi»', idea: 'Il nero di oggi è il buco nella pensione di domani.' },
      { tag: 'Prova sul campo', title: 'Un mese all’ufficio Personale', object: 'Lo schedario del Personale', idea: 'Tre buste paga, tre storie: hai messo insieme tutto il piano.' },
    ],
    furnish: furnishPersonale,
    objects: [
      // on a peg on the back wall right, framed on the back wall over the desk, on the desk between the two seats
      { stage: 0, make: () => apron(), at: [1.05, 1.05, B.inB + 0.02], size: [0.42, 0.62], wall: true, pose: [0.1, -0.35] },
      { stage: 3, make: () => payslipFrame(), at: [-0.1, 1.18, B.inB + 0.02], size: [0.9, 0.62], wall: true, pose: [0.1, -0.4] },
      { stage: 7, make: () => deskFileBox(), at: [-0.15, DESK_TOP, 0.1], size: [0.36, 0.3, 0.3], pose: [0.15, -0.3] },
    ],
  },
  7: {
    share: true, // the end of the second colleague's stretch: the second card to share
    stages: [
      { tag: 'Lezione 1', title: 'Dopo il diploma', object: 'Il diploma col nastro', idea: 'Università, fuori sede, ITS o lavoro: ogni strada ha il suo costo, e conviene saperlo prima.' },
      { tag: 'Lezione 2', title: 'Studiare è un investimento', idea: 'Studiare costa oggi e rende domani. Anche gli anni senza stipendio sono un costo.' },
      { tag: 'Lezione 3', title: 'L’ISEE, spiegato', idea: 'L’ISEE non è il reddito: conta tutta la famiglia e quello che possiede.' },
      { tag: 'Caso', title: 'Il corso per il team', object: 'Il calendario del corso', idea: 'Un corso costa soldi e settimane di lavoro: conviene se poi rende di più.' },
      { tag: 'Lezione 4', title: 'Borse, aiuti, lavori', idea: 'Borse, esonero dalle tasse, Erasmus: ci sono, ma hanno requisiti e scadenze.' },
      { tag: 'Lezione 5', title: 'Il debito per studiare', idea: 'Un prestito per studiare ha senso se sai già come restituirlo.' },
      { tag: 'Lezione 6', title: '«Faccio quello che fanno gli altri»', idea: 'Informarsi prima: una scadenza persa non torna.' },
      { tag: 'Prova sul campo', title: 'Un giorno all’ufficio Formazione', object: 'La bacheca dei percorsi', idea: 'Tre strade, nessuna giusta per tutti: costi, aiuti e scadenze li hai guardati tu.' },
    ],
    furnish: furnishFormazione,
    objects: [
      // on the teacher's desk, on the back wall left of it, on its easel right of it
      { stage: 0, make: () => diploma(), at: [-0.1, DESK_TOP, -0.8], size: [0.42, 0.2, 0.2], pose: [0.2, -0.35] },
      { stage: 3, make: () => courseCalendar(), at: [-1.5, 1.12, B.inB + 0.02], size: [0.62, 0.78], wall: true, pose: [0.05, -0.35] },
      { stage: 7, make: () => pathsBoard(), at: [1.05, 0, -0.6], size: [0.8, 1.2, 0.45], pose: [0.2, -0.25] },
    ],
  },
  8: {
    hire: 'il terzo collega',
    stages: [
      { tag: 'Lezione 1', title: 'Con 10 euro compravi di più', object: 'Il cestino della spesa', idea: 'Con l’inflazione la stessa spesa costa di più: i soldi fermi valgono meno.' },
      { tag: 'Lezione 2', title: 'Il prezzo dei soldi', idea: 'Chi presta vuole essere pagato: il TAEG dice quanto costa davvero un prestito.' },
      { tag: 'Lezione 3', title: 'Compra ora, paga dopo', idea: 'Rate e pagamenti divisi sono debito, anche quando non sembra.' },
      { tag: 'Caso', title: 'L’attrezzatura dell’azienda', object: 'Il cartellino del TAEG', idea: 'Il «tasso zero» si controlla: il TAEG dice quanto paghi in tutto.' },
      { tag: 'Lezione 4', title: 'La prima casa fuori sede', idea: 'Affitto, caparra e bollette: un mese da soli costa più dell’affitto.' },
      { tag: 'Lezione 5', title: 'Comprare casa a rate', idea: 'Con il mutuo conta quanto paghi in tutto, non solo la rata.' },
      { tag: 'Lezione 6', title: '«Una rata in più non si nota»', idea: 'Le rate si sommano. E prestare a un amico non è regalare: dite quando si restituisce.' },
      { tag: 'Prova sul campo', title: 'Un anno da fuori sede', object: 'La casetta con le bollette', idea: 'Caparra, bollette, rate e un prestito: un anno da soli, e i conti li hai tenuti tu.' },
    ],
    furnish: furnishFinanza,
    objects: [
      // on the low cabinet, on the back wall left, in the middle of the table
      { stage: 0, make: () => shoppingBasket(), at: [1.28, 0.49, -1.0], size: [0.38, 0.36, 0.28], pose: [0.2, -0.35] },
      { stage: 3, make: () => rateTag(), at: [-1.4, 1.18, B.inB + 0.02], size: [0.5, 0.72], wall: true, pose: [0.05, -0.35] },
      { stage: 7, make: () => billsHouse(), at: [-0.1, DESK_TOP, 0.0], size: [0.44, 0.42, 0.42], pose: [0.35, -0.3] },
    ],
  },
  9: {
    share: true, // the end of the third colleague's stretch: the third card to share
    stages: [
      { tag: 'Lezione 1', title: 'I soldi fermi perdono', object: 'Il titolo con le cedole', idea: 'Investire può rendere e può perdere: più rendimento vuol dire più rischio.' },
      { tag: 'Lezione 2', title: 'Cos’è un’obbligazione', idea: 'Un’obbligazione è un prestito: ricevi le cedole e, alla scadenza, quello che hai prestato.' },
      { tag: 'Lezione 3', title: 'Di chi ti fidi?', idea: 'Chi rischia di non restituire deve offrire un interesse più alto.' },
      { tag: 'Caso', title: 'L’azienda presta i suoi risparmi', object: 'Il termometro del rischio', idea: 'Il 9% non è un regalo: è il prezzo del rischio di non riavere i soldi.' },
      { tag: 'Lezione 4', title: 'I titoli dello Stato', idea: 'Sui titoli di Stato le tasse sono al 12,5%, sugli altri al 26%: conta quello che resta.' },
      { tag: 'Lezione 5', title: 'Se i tassi salgono', idea: 'Se i tassi salgono il prezzo scende; se aspetti la scadenza riavrai quello che hai prestato.' },
      { tag: 'Lezione 6', title: '«Sicuro come un BTP»', idea: 'Anche un’obbligazione ha i suoi rischi: un rendimento troppo alto è un campanello.' },
      { tag: 'Prova sul campo', title: 'Un giorno al Credito', object: 'Il registro dei prestiti', idea: 'Quattro prestiti, due anni, un imprevisto: chi presta, chi paga e quanto costa l’hai deciso tu.' },
    ],
    furnish: furnishCredito,
    objects: [
      // in the wide niche of the archive, on the back wall left, on the lectern in the middle
      { stage: 0, make: () => bondCertificate(), at: [ARCHIVE.x + ARCHIVE.nicheX, ARCHIVE.nicheY, ARCHIVE.z + 0.02], size: [0.34, 0.27, 0.16], pose: [0.15, -0.3] },
      { stage: 3, make: () => riskThermometer(), at: [-1.3, 1.02, B.inB + 0.02], size: [0.34, 0.95], wall: true, pose: [0.05, -0.35] },
      { stage: 7, make: () => loanLedger(), at: [LECTERN.x, LECTERN.h, LECTERN.z], size: [0.5, 0.3, 0.36], pose: [0.3, -0.3] },
    ],
  },
  10: {
    hire: 'il quarto collega',
    stages: [
      { tag: 'Lezione 1', title: 'Un pezzo di azienda', object: 'Il blocco delle quote', idea: 'Un’azione è un pezzo di un’azienda: chi la compra ne diventa socio.' },
      { tag: 'Lezione 2', title: 'Come guadagna un socio', idea: 'Con i dividendi, o vendendo a più di quanto hai pagato. Sul guadagno, tasse al 26%.' },
      { tag: 'Lezione 3', title: 'La Borsa', idea: 'Il prezzo lo fanno chi compra e chi vende, e contiene già quello che si aspettano.' },
      { tag: 'Caso', title: 'Un nuovo socio bussa alla porta', object: 'Le chiavi dell’azienda', idea: 'Chi mette soldi nell’azienda ne prende un pezzo, e con quel pezzo una parte delle decisioni.' },
      { tag: 'Lezione 4', title: 'Su e giù', idea: 'Le Borse crollano e risalgono, a volte dopo anni. Nessuno sa prevedere quando.' },
      { tag: 'Lezione 5', title: 'Un’azienda sola', idea: 'Anche le grandi aziende falliscono: tutto su una sola vuol dire rischiare tutto.' },
      { tag: 'Lezione 6', title: 'Compra quando sale, vendi quando scende', idea: 'Comprare per paura di restare fuori e vendere nel panico: il modo più sicuro di perdere.' },
      { tag: 'Prova sul campo', title: 'La riunione dei soci', object: 'La campanella', idea: 'Cinque anni, tre aziende, un crollo e una moda: quando tenere e quando vendere l’hai deciso tu.' },
    ],
    furnish: furnishSoci,
    objects: [
      // on the open shelf of the showcase, on the back wall above the armchairs, on the low table between them
      { stage: 0, make: () => shareBlock(), at: [VITRINE.x - 0.05, VITRINE.shelf + VITRINE.board, VITRINE.z + 0.03], size: [0.46, 0.34, 0.32], pose: [0.25, -0.2] },
      { stage: 3, make: () => companyKeys(), at: [COFFEE.x, 1.2, B.inB + 0.02], size: [0.78, 0.48], wall: true, pose: [0.05, -0.35] },
      { stage: 7, make: () => meetingBell(), at: [COFFEE.x, COFFEE.h, COFFEE.z], size: [0.26, 0.3, 0.26], pose: [0.3, -0.3] },
    ],
  },
  11: {
    stages: [
      { tag: 'Lezione 1', title: 'Un programma solo', object: 'Il televisore a un canale', idea: 'Se tutto dipende da un programma solo, quando va male quello va male tutto.' },
      { tag: 'Lezione 2', title: 'Cos’è un fondo', idea: 'Tanti risparmiatori mettono insieme i soldi, qualcuno li gestisce, ognuno ha la sua quota.' },
      { tag: 'Lezione 3', title: 'L’indice e l’ETF', idea: 'Un indice è un cesto di aziende; un ETF lo copia, con costi bassi.' },
      { tag: 'Caso', title: 'La stagione nuova', object: 'Le uova nei cestini', idea: 'Il programma di punta può andare male: con un mix, gli altri reggono la stagione.' },
      { tag: 'Lezione 4', title: 'Quanto costa un fondo', idea: 'Le spese di ogni anno sembrano poche, ma in vent’anni si mangiano una fetta dei guadagni.' },
      { tag: 'Lezione 5', title: 'Verde davvero?', idea: 'Un fondo sostenibile si controlla: guarda che aziende ci sono dentro.' },
      { tag: 'Lezione 6', title: 'Diversificato per finta', idea: 'Tre fondi con dentro le stesse aziende sono un fondo solo. E il fondo di moda costa già caro.' },
      { tag: 'Prova sul campo', title: 'Il palinsesto dei risparmi', object: 'Il mixer a quattro canali', idea: 'Dieci anni, quattro fondi, una crisi e una moda: il tuo mix l’hai deciso tu.' },
    ],
    furnish: furnishPalinsesto,
    objects: [
      // on the equipment rack by the core, on the back wall left of the screens, on the flat right end of the console
      { stage: 0, make: () => oneChannelTv(), at: [RACK.x, RACK.h + 0.03, RACK.z + 0.02], size: [0.4, 0.36, 0.32], pose: [0.2, -0.35] },
      { stage: 3, make: () => eggBaskets(), at: [-1.3, 1.12, B.inB + 0.02], size: [0.74, 0.4], wall: true, pose: [0.15, -0.35] },
      { stage: 7, make: () => fourChannelMixer(), at: [CONSOLE.x + 0.43, DESK_TOP, CONSOLE.z + 0.04], size: [0.4, 0.2, 0.32], pose: [0.35, -0.3] },
    ],
  },
  12: {
    stages: [
      { tag: 'Lezione 1', title: 'Il prezzo che arriva da lontano', object: 'La tanica di benzina', idea: 'Il pieno costa di più per cose che succedono lontano: cambi e materie prime ti toccano anche se non investi.' },
      { tag: 'Lezione 2', title: 'Il cambio', idea: 'Se l’euro si indebolisce, quello che arriva dall’estero costa di più; se si rafforza, costa meno.' },
      { tag: 'Lezione 3', title: 'Petrolio, grano, oro', idea: 'Guerre, clima e domanda fanno salire e scendere le materie prime. Anche l’oro.' },
      { tag: 'Caso', title: 'Il contratto in dollari', object: 'Il cambio bloccato', idea: 'Fissare il cambio oggi costa un po’, ma toglie la sorpresa tra sei mesi.' },
      { tag: 'Lezione 4', title: 'Proteggersi o scommettere', idea: 'Lo stesso strumento protegge o scommette. Con la leva 30, un calo del 3,3% azzera tutto.' },
      { tag: 'Lezione 5', title: 'Monete che non lo sono', idea: 'Una cripto non ha nessuno che la garantisca: può perdere metà del valore in una settimana.' },
      { tag: 'Lezione 6', title: '«Questa volta è diverso»', idea: 'Piccoli guadagni regolari, poi con la leva in tre giorni si perde tutto.' },
      { tag: 'Prova sul campo', title: 'Un anno agli Esteri', object: 'La valigia con le etichette', idea: 'Dollari, energia, un’app con la leva, un collega con le cripto: un anno nel mondo, e hai scelto tu.' },
    ],
    furnish: furnishEsteri,
    objects: [
      // on the right end of the map chest, on the back wall above it, in the middle of the chest
      { stage: 0, make: () => jerryCan(), at: [MAPCHEST.x + 0.5, MAPCHEST.h, MAPCHEST.z + 0.02], size: [0.28, 0.36, 0.2], pose: [0.2, -0.4] },
      { stage: 3, make: () => lockedRate(), at: [MAPCHEST.x - 0.1, 1.2, B.inB + 0.02], size: [0.66, 0.38], wall: true, pose: [0.05, -0.35] },
      { stage: 7, make: () => travelSuitcase(), at: [MAPCHEST.x - 0.12, MAPCHEST.h, MAPCHEST.z + 0.02], size: [0.5, 0.38, 0.22], pose: [0.2, -0.35] },
    ],
  },
};

// The floors' colours come from their palette in world.js (30/10/2026): the base, and a step of it towards the
// palette's light (k > 0) or deep (k < 0) for the pieces of an object that need a second tone.
const tone = (n, k = 0) => {
  const f = FLOORS[n - 1];
  return mixHex(f.color, k < 0 ? f.deep : f.light, Math.abs(k));
};

const ORANGE = tone(1);
const ORANGE_SOFT = tone(1, 0.5);

const SKY = tone(2);

const LILAC = tone(3);

const PINK = tone(4);

const MEADOW = tone(5);

const TEAL = tone(6);
const TEAL_DARK = tone(6, -0.4);
const TEAL_LIGHT = tone(6, 0.5);

const MUSTARD = tone(7);
const MUSTARD_DARK = tone(7, -0.4);

const INDIGO = tone(8);
const INDIGO_DARK = tone(8, -0.4);

const RUBY = tone(9);
const RUBY_DARK = tone(9, -0.4);
const RUBY_LIGHT = tone(9, 0.5);

const PLUM = tone(10);
const PLUM_DARK = tone(10, -0.4);

const CYAN = tone(11);
const CYAN_DARK = tone(11, -0.4);
const CYAN_LIGHT = tone(11, 0.5);

const NIGHT_BLUE = tone(12);
const NIGHT_BLUE_DARK = tone(12, -0.4);
const NIGHT_BLUE_LIGHT = tone(12, 0.5);

// ---------- textures ----------
/** The stage number on a stand: grey, or on the floor's colour for the next stage. It fills the face, so it reads from the room's view. */
function standTexture(n, next, color) {
  // 512 px a side since 10/11/2026 (Davide: «i numeri sono sfocati»): at 256 the figure went soft on a phone up close
  return canvasTexture(512, 512, (g, w, h) => {
    if (next) {
      g.fillStyle = color;
      roundRect(g, 8, 8, w - 16, h - 16, 8);
      g.fill();
    }
    strokeText(g, String(n), w / 2, h / 2 + 28, 400, { fill: next ? inkOn(color) : '#867F75' });
  }, { aniso: 16 });
}

/** A square-edged frame standing proud of what it surrounds: the contract's, the board's, the wall stands'. */
function squareRim(w, h, rim, depth, material) {
  const g = new THREE.Group();
  for (const [x, y, bw, bh] of [
    [0, h / 2 - rim / 2, w, rim],
    [0, -h / 2 + rim / 2, w, rim],
    [-w / 2 + rim / 2, 0, rim, h - 2 * rim],
    [w / 2 - rim / 2, 0, rim, h - 2 * rim],
  ])
    g.add(box(bw, bh, depth, material, { center: true, at: [x, y, depth / 2] }));
  return g;
}

/** The white face of a board: its title, and the lines between columns if it has them. */
function boardTexture(title, columns, { size = 30, y = 34, bg = '#FFFFFF' } = {}) {
  // drawn on 512 × 320 at twice that (10/11/2026: close up the title was soft)
  return canvasTexture(1024, 640, (g) => {
    g.scale(2, 2);
    const [w, h] = [512, 320];
    g.fillStyle = bg;
    g.fillRect(0, 0, w, h);
    strokeText(g, title, w / 2, y, size, { fill: C.navy });
    if (!columns) return;
    g.fillStyle = '#E6E0D6';
    for (const x of [w / 3, (2 * w) / 3]) {
      roundRect(g, x - 2, 66, 4, h - 96, 2);
      g.fill();
    }
  });
}

/** The signed contract: its title, a few lines of text, your signature in ink and the Direzione's seal. */
function contractTexture() {
  // drawn on 400 × 512 at twice that (10/11/2026: close up the lines were soft)
  return canvasTexture(800, 1024, (g) => {
    g.scale(2, 2);
    const [w, h] = [400, 512];
    g.fillStyle = '#FFFDF8';
    g.fillRect(0, 0, w, h);
    strokeText(g, 'Contratto', w / 2, 64, 50, { fill: C.ink });
    g.fillStyle = '#D6CEC1';
    for (let i = 0; i < 7; i++) {
      roundRect(g, 48, 118 + i * 34, w - 96 - (i % 3) * 40, 12, 6);
      g.fill();
    }
    g.fillRect(48, 452, 220, 4);
    g.strokeStyle = C.navy;
    g.lineWidth = 7;
    g.lineCap = 'round';
    g.beginPath();
    g.moveTo(62, 436);
    g.bezierCurveTo(95, 372, 128, 468, 162, 408);
    g.bezierCurveTo(186, 368, 214, 458, 252, 414);
    g.stroke();
    g.fillStyle = ORANGE;
    g.beginPath();
    g.arc(w - 84, h - 84, 40, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = ORANGE_SOFT;
    g.lineWidth = 5;
    g.beginPath();
    g.arc(w - 84, h - 84, 27, 0, Math.PI * 2);
    g.stroke();
  });
}

// ---------- shared pieces ----------
function roundedRectPath(p, x, y, w, h, r) {
  p.moveTo(x + r, y);
  p.lineTo(x + w - r, y);
  p.quadraticCurveTo(x + w, y, x + w, y + r);
  p.lineTo(x + w, y + h - r);
  p.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  p.lineTo(x + r, y + h);
  p.quadraticCurveTo(x, y + h, x, y + h - r);
  p.lineTo(x, y + r);
  p.quadraticCurveTo(x, y, x + r, y);
  return p;
}

/** A flat plate facing you, centred, with round corners however thin it is (a card, a door). */
function plate(w, h, t, r, material) {
  const b = Math.min(t * 0.3, r * 0.5);
  const shape = roundedRectPath(new THREE.Shape(), -w / 2 + b, -h / 2 + b, w - 2 * b, h - 2 * b, r - b);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: t - 2 * b, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 2, curveSegments: 10 });
  geo.translate(0, 0, -(t - 2 * b) / 2);
  return new THREE.Mesh(geo, typeof material === 'string' ? mat(material) : material);
}

/** A disc facing you. */
function disc(r, t, material, at = [0, 0, 0]) {
  const d = cyl(r, r, t, material, { seg: 32, center: true, at });
  d.rotation.x = Math.PI / 2;
  return d;
}

/** A gold coin lying flat, its face up. Its edge is rounded and catches the light (10/11/2026, Davide's «micro»:
 *  before, a plain cylinder). */
const coinCache = new Map();
function coinBody(r, t) {
  const key = `${r}:${t}`;
  if (!coinCache.has(key)) {
    const profile = [
      [0, -0.5],
      [0.9, -0.5],
      [0.975, -0.43],
      [1, -0.26],
      [1, 0.26],
      [0.975, 0.43],
      [0.9, 0.5],
      [0, 0.5],
    ].map(([x, y]) => new THREE.Vector2(x * r, y * t));
    coinCache.set(key, new THREE.LatheGeometry(profile, 36));
  }
  const m = new THREE.Mesh(coinCache.get(key), goldMat());
  m.castShadow = m.receiveShadow = true;
  return m;
}
function coin(r, t) {
  const g = new THREE.Group();
  g.add(coinBody(r, t));
  g.add(cyl(r * 0.7, r * 0.7, t * 0.25, mat(C.goldDark, { metalness: 0.4, roughness: 0.35 }), { seg: 32, center: true, at: [0, t * 0.6, 0] }));
  return g;
}

/** A gold coin standing on its edge, its face towards you, leaning to the right by `lean`. */
function standingCoin(r, t, lean = 0) {
  const g = new THREE.Group();
  const c = coin(r, t);
  c.rotation.x = Math.PI / 2;
  c.position.y = r;
  g.add(c);
  g.rotation.z = -lean;
  return g;
}

/** A coin stack, flat coins slightly out of line. */
function coinStack(n, r, t) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const c = coin(r, t);
    c.position.set(Math.sin(i * 2.3) * r * 0.06, t / 2 + i * t * 1.05, Math.cos(i * 1.7) * r * 0.06);
    c.rotation.y = i;
    g.add(c);
  }
  return g;
}

/** A prepaid card in the Tesoreria's blue, upright, facing you: a gold chip and the number as four short bars. */
function creditCard() {
  const g = new THREE.Group();
  const W = 0.17;
  const H = 0.108;
  const T = 0.006;
  g.add(plate(W, H, T, 0.012, mat(SKY, { roughness: 0.4 })));
  g.add(rbox(0.028, 0.021, 0.004, goldMat(), { center: true, r: 0.004, at: [-0.05, 0.012, T / 2] }));
  const digits = mat(tone(2, 0.55), { roughness: 0.5 });
  for (let i = 0; i < 4; i++) g.add(rbox(0.026, 0.007, 0.003, digits, { center: true, r: 0.0015, at: [-0.055 + i * 0.034, -0.024, T / 2] }));
  return g;
}

// ---------- the objects of piano 1 · Direzione ----------
/** A pale, fine grain that the leather's colour tints: one tile covers 2 cm of the object. */
let grainTexture = null;
function leatherGrain() {
  if (!grainTexture) {
    grainTexture = canvasTexture(
      256,
      256,
      (c, w, h) => {
        const img = c.createImageData(w, h);
        let k = 11;
        for (let i = 0; i < w * h; i++) {
          k = (k * 16807) % 2147483647;
          const v = 238 + (k % 18);
          img.data.set([v, v, v, 255], i * 4);
        }
        c.putImageData(img, 0, 0);
      },
      { repeat: [50, 50], aniso: 8 },
    );
  }
  return grainTexture;
}

/** A row of stitches along `points` (x, y, z), one short dash every `step`: one mesh for the whole seam. */
function seam(points, material, { step = 0.0042, w = 0.0011, t = 0.0007 } = {}) {
  const parts = [];
  for (let i = 0; i < points.length - 1; i++) {
    const [a, b] = [points[i], points[i + 1]];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    for (let s = 0; s + step * 0.6 <= len; s += step) {
      const k = (s + step * 0.3) / len;
      const geo = new THREE.BoxGeometry(step * 0.6, w, t);
      geo.rotateZ(Math.atan2(b.y - a.y, b.x - a.x));
      geo.translate(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, a.z + (b.z - a.z) * k);
      parts.push(geo);
    }
  }
  const m = new THREE.Mesh(mergeGeometries(parts), material);
  parts.forEach((p) => p.dispose());
  return m;
}

/** Stage 1: the empty card holder (28/10/2026, from the meeting: a thin, elegant card case instead of a fat wallet
 *  spilling coins). Redone close up on 10/11/2026 (Davide: «a livello micro vanno alzate la qualità degli oggetti»;
 *  before, a square slab with three flat strips, it read as a crate): leather a deeper peach than the walls, with its
 *  grain and a pale stitched seam all round; three pockets in steps, each with the thumb's curve cut in its top, as
 *  on a real card case; all three empty, and out of the middle one sticks only a receipt with a torn edge: that is
 *  where the money went. It stands in the slot of a small wooden base, so it reads from the room. */
function cardHolder() {
  const g = new THREE.Group();
  const grain = leatherGrain();
  const leather = new THREE.MeshStandardMaterial({ color: tone(1, -0.25), roughness: 0.55, map: grain });
  const pocketLeather = new THREE.MeshStandardMaterial({ color: tone(1, -0.05), roughness: 0.6, map: grain });
  const thread = mat('#F6E7D6', { roughness: 0.7 });
  const [W, H, T, R] = [0.11, 0.078, 0.005, 0.008];
  const holder = new THREE.Group();
  // the back of the case
  const back = new THREE.Mesh(
    new THREE.ExtrudeGeometry(roundedRectPath(new THREE.Shape(), -W / 2, -H / 2, W, H, R), { depth: T, bevelEnabled: true, bevelThickness: 0.0008, bevelSize: 0.0008, bevelSegments: 2, curveSegments: 10 }),
    leather,
  );
  back.position.z = -T / 2;
  holder.add(back);
  // three pockets, the front one lowest: the outline of the case at the bottom, the thumb's curve at the top
  const PT = 0.0012;
  const pocketZ = (i) => T / 2 + 0.0008 + (2 - i) * 0.0022;
  const heights = [0.032, 0.045, 0.058];
  heights.forEach((h, i) => {
    const s = new THREE.Shape();
    const [x0, x1, y0, y1] = [-W / 2, W / 2, -H / 2, -H / 2 + h];
    s.moveTo(x0 + R, y0);
    s.lineTo(x1 - R, y0);
    s.quadraticCurveTo(x1, y0, x1, y0 + R);
    s.lineTo(x1, y1);
    s.lineTo(W * 0.22, y1);
    s.quadraticCurveTo(0, y1 - 0.016, -W * 0.22, y1);
    s.lineTo(x0, y1);
    s.lineTo(x0, y0 + R);
    s.quadraticCurveTo(x0, y0, x0 + R, y0);
    const geo = new THREE.ExtrudeGeometry(s, { depth: PT, bevelEnabled: true, bevelThickness: 0.0003, bevelSize: 0.0003, bevelSegments: 1, curveSegments: 12 });
    const p = new THREE.Mesh(geo, pocketLeather);
    p.position.z = pocketZ(i);
    holder.add(p);
  });
  // the seam all round, a little inside the edge, on whichever layer is in front there
  const inset = 0.0045;
  const ring = roundedRectPath(new THREE.Shape(), -W / 2 + inset, -H / 2 + inset, W - 2 * inset, H - 2 * inset, R - inset * 0.6).getSpacedPoints(90);
  const front = (y) => {
    for (let i = 0; i < 3; i++) if (y < -H / 2 + heights[i] - 0.004) return pocketZ(i) + PT + 0.0003;
    return T / 2 + 0.0008 + 0.0003;
  };
  holder.add(seam(ring.map((p) => new THREE.Vector3(p.x, p.y, front(p.y))), thread));
  // the receipt, out of the middle pocket: thermal paper with a torn top, its lines printed, the total in the floor's colour
  const receipt = cutout(0.038, 0.07, 3600, (c, W2, H2) => {
    c.scale(W2 / 68, H2 / 126); // drawn on 68 × 126, at twice that
    const [w, h] = [68, 126];
    c.fillStyle = '#FCFAF6';
    c.beginPath();
    c.moveTo(0, h);
    c.lineTo(0, 10);
    const teeth = 9;
    for (let i = 0; i <= teeth; i++) c.lineTo((i / teeth) * w, i % 2 ? 2 : 12);
    c.lineTo(w, h);
    c.closePath();
    c.fill();
    c.fillStyle = '#B9B0A3';
    for (let i = 0; i < 5; i++) {
      const y = 26 + i * 15;
      c.fillRect(8, y, i === 4 ? 22 : 30, 4);
      c.fillRect(w - 20, y, 12, 4);
    }
    c.fillStyle = ORANGE;
    c.fillRect(8, 104, w - 16, 7);
  });
  receipt.position.set(0.01, -H / 2 + heights[1] - 0.012 + 0.035, (pocketZ(2) + PT + pocketZ(1)) / 2);
  receipt.rotation.z = -0.1;
  holder.add(receipt);
  holder.position.set(0, 0.009 + H / 2, 0);
  holder.rotation.x = -0.06;
  g.add(holder);
  // the small wooden base, with a slot held by two lips
  g.add(box(0.126, 0.011, 0.036, C.wood, { at: [0, 0, -0.002] }));
  for (const z of [-T / 2 - 0.0028, pocketZ(0) + PT + 0.0028]) g.add(box(0.122, 0.006, 0.0035, C.woodDark, { at: [0, 0.011, z] }));
  g.rotation.y = -0.3;
  return g;
}

/** The Case: three departments, money for two. Two coins on the board, the third place empty.
 *  Square-edged like the furniture (25/10/2026): a warm white panel inside a warm grey frame that stands proud
 *  of it, so the board keeps its outline against the wall, and a real ledge for the marker. */
function whiteboard() {
  const g = new THREE.Group();
  const ink = mat(C.navy, { roughness: 0.6 });
  const frame = mat(C.frame, { roughness: 0.45 });
  const white = '#FCFAF6';
  const [W, H, rim, depth] = [1.0, 0.64, 0.03, 0.045];
  g.add(box(W - 0.01, H - 0.01, 0.03, white, { center: true, at: [0, 0, 0.015] })); // a hair inside the frame, so their sides never flicker
  g.add(squareRim(W, H, rim, depth, frame));
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(W - 2 * rim, H - 2 * rim),
    new THREE.MeshStandardMaterial({ map: boardTexture('Budget', true, { size: 44, y: 40, bg: white }), roughness: 0.35 }),
  );
  face.position.z = 0.031;
  g.add(face);
  const Z = 0.034; // the front of the board, where things stick
  const cols = [-0.32, 0, 0.32];
  const signY = 0.1;

  // the three departments, as small raised signs (10/11/2026, Davide's «micro»: before, a cylinder for the
  // megaphone, eight little blocks round a disc for the gear; now each is one clean shape with soft edges)
  const raised = (shape, depth = 0.022) => {
    const geo = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.0035, bevelSegments: 3, curveSegments: 24 });
    geo.translate(0, 0, -depth / 2);
    return new THREE.Mesh(geo, ink);
  };
  // the megaphone: a horn that opens into a bell, the mouthpiece and the grip under it
  const megaphone = new THREE.Group();
  const horn = new THREE.Mesh(
    new THREE.LatheGeometry(
      [
        [0, -0.05],
        [0.017, -0.05],
        [0.021, -0.035],
        [0.034, 0.0],
        [0.054, 0.034],
        [0.064, 0.048],
        [0.062, 0.054],
        [0, 0.054],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
      32,
    ),
    ink,
  );
  horn.rotation.z = -Math.PI / 2;
  megaphone.add(horn);
  const mouth = cyl(0.011, 0.013, 0.022, ink, { seg: 20, center: true, at: [-0.06, 0, 0] });
  mouth.rotation.z = Math.PI / 2;
  megaphone.add(mouth, rbox(0.022, 0.05, 0.022, ink, { center: true, r: 0.008, at: [-0.025, -0.045, 0] }));
  megaphone.position.x = 0.01;
  // the gear: eight teeth with sloping sides and a round hole
  const gearShape = new THREE.Shape();
  const [tip, root, teeth] = [0.07, 0.054, 8];
  for (let i = 0; i < teeth; i++) {
    const a = (i / teeth) * Math.PI * 2;
    const step = (Math.PI * 2) / teeth;
    const at = (r, t) => [Math.cos(a + t * step) * r, Math.sin(a + t * step) * r];
    const pts = [at(root, 0), at(root, 0.08), at(tip, 0.2), at(tip, 0.44), at(root, 0.56), at(root, 0.78)];
    pts.forEach(([x, y], k) => (i === 0 && k === 0 ? gearShape.moveTo(x, y) : gearShape.lineTo(x, y)));
  }
  gearShape.closePath();
  gearShape.holes.push(new THREE.Path().absarc(0, 0, 0.02, 0, Math.PI * 2, true));
  const gear = new THREE.Group();
  gear.add(raised(gearShape));
  gear.rotation.z = 0.2;
  // the person: a round head over round shoulders
  const bust = new THREE.Shape();
  bust.moveTo(-0.052, -0.06);
  bust.lineTo(0.052, -0.06);
  bust.lineTo(0.052, -0.03);
  bust.quadraticCurveTo(0.052, 0.006, 0.012, 0.006);
  bust.lineTo(-0.012, 0.006);
  bust.quadraticCurveTo(-0.052, 0.006, -0.052, -0.03);
  bust.closePath();
  const person = new THREE.Group();
  person.add(raised(bust), sphere(0.03, ink, [0, 0.046, 0], 28));
  [megaphone, gear, person].forEach((sign, i) => {
    sign.position.set(cols[i], signY, Z + 0.015);
    g.add(sign);
  });

  // two coins on the board, the third place only a ring
  for (const i of [0, 1]) {
    const c = coin(0.075, 0.022);
    c.rotation.x = Math.PI / 2;
    c.position.set(cols[i], -0.12, Z + 0.011);
    g.add(c);
  }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.009, 12, 64), frame);
  ring.position.set(cols[2], -0.12, Z);
  g.add(ring);

  // the ledge under the board, with one marker lying on it
  g.add(box(0.62, 0.025, 0.08, frame, { at: [0, -H / 2 - 0.025, 0.04] }));
  // a marker with its cap and its tip
  const marker = new THREE.Group();
  marker.add(cyl(0.012, 0.012, 0.075, mat('#FBF8F3', { roughness: 0.5 }), { seg: 20, center: true, at: [0, -0.005, 0] }));
  marker.add(cyl(0.0125, 0.0125, 0.04, ORANGE, { seg: 20, center: true, at: [0, 0.05, 0] }));
  marker.add(cyl(0.004, 0.008, 0.012, mat(C.ink, { roughness: 0.6 }), { seg: 12, center: true, at: [0, -0.048, 0] }));
  marker.rotation.z = Math.PI / 2;
  marker.position.set(-0.12, -H / 2 + 0.012, 0.055);
  g.add(marker);
  return g;
}

/** The Field test: the month's piggy bank (28/10/2026, from the meeting: a classic piggy bank, see-through so the
 *  money shows). A clear body a third full of coins, snout, ears, legs and tail in the floor's peach, a coin halfway
 *  into the slot on its back. The inside of the glass a touch cloudier than the outside, as for every glass here, so
 *  its outline holds against the wall. Close up (10/11/2026, Davide's «micro»): two eyes, round soft ears instead of
 *  three-sided cones, a rim on the snout with oval nostrils, a dark slot under the coin, rounder feet. */
function piggyBank() {
  const g = new THREE.Group();
  const peach = mat(ORANGE, { roughness: 0.5 });
  const [RX, RY, RZ] = [0.155, 0.115, 0.11]; // the body, round and a little long
  const cy = 0.008 + RY; // the short legs lift it a little
  // the coins inside, in the lower third, loose
  let k = 0;
  const rnd = () => {
    k += 1;
    const x = Math.sin(k * 91.7) * 43758.5;
    return x - Math.floor(x);
  };
  for (let layer = 0; layer < 3; layer++) {
    const n = [6, 5, 3][layer];
    for (let i = 0; i < n; i++) {
      const c = coin(0.032, 0.01);
      const a = (i / n) * Math.PI * 2 + layer * 0.6;
      const r = [0.065, 0.055, 0.03][layer];
      c.position.set(Math.cos(a) * r * 1.2, cy - RY * 0.7 + layer * 0.022, Math.sin(a) * r * 0.8);
      c.rotation.set((rnd() - 0.5) * 0.8, rnd() * 3, (rnd() - 0.5) * 0.8);
      g.add(c);
    }
  }
  // the clear body, a hint of pink so it reads as a piggy bank: the inside a touch cloudier, then the outside
  const shell = (r, material) => {
    const m = new THREE.Mesh(new THREE.SphereGeometry(r, 40, 24), material);
    m.scale.set(RX / RY, 1, RZ / RY);
    m.position.y = cy;
    return m;
  };
  const inner = shell(RY - 0.003, new THREE.MeshStandardMaterial({ color: tone(1, 0.75), transparent: true, opacity: 0.3, roughness: 0.1, side: THREE.BackSide, depthWrite: false }));
  inner.renderOrder = 1;
  const body = shell(RY, new THREE.MeshStandardMaterial({ color: tone(1, 0.9), transparent: true, opacity: 0.38, roughness: 0.08, depthWrite: false }));
  body.renderOrder = 2;
  g.add(inner, body);
  const shine = rbox(0.01, 0.08, 0.004, mat('#FFFFFF', { transparent: true, opacity: 0.6, roughness: 0.1 }), { at: [-0.045, cy - 0.005, RZ * 0.93], r: 0.002 });
  shine.rotation.set(0, -0.3, -0.5);
  shine.renderOrder = 3;
  g.add(shine);
  const deep = mat(tone(1, -0.5), { roughness: 0.6 });
  // the snout at the front (+x): a short round disc with a soft rim, two oval nostrils pressed into it
  const snout = new THREE.Mesh(
    new THREE.LatheGeometry(
      [
        [0, 0.013],
        [0.027, 0.013],
        [0.033, 0.0105],
        [0.0355, 0.006],
        [0.036, -0.012],
      ].map(([x, y]) => new THREE.Vector2(x, y)),
      36,
    ),
    peach,
  );
  snout.rotation.z = -Math.PI / 2;
  snout.position.set(RX - 0.001, cy - 0.01, 0);
  g.add(snout);
  for (const z of [-0.011, 0.011]) {
    const n = sphere(0.0062, deep, [RX + 0.0115, cy - 0.01, z], 16);
    n.scale.set(0.35, 1.25, 0.85);
    g.add(n);
  }
  // two eyes above the snout, painted on the glass: dark and glossy, a dot of light in each
  const eye = mat(C.ink, { roughness: 0.25 });
  for (const side of [-1, 1]) {
    // a point on the round body, and the way out of it there
    const d = new THREE.Vector3(0.74, 0.42, side * 0.5).normalize();
    const on = new THREE.Vector3(d.x * RX, cy + d.y * RY, d.z * RZ);
    const out = new THREE.Vector3(on.x / RX ** 2, (on.y - cy) / RY ** 2, on.z / RZ ** 2).normalize();
    const e = sphere(0.0085, eye, on.clone().addScaledVector(out, 0.0012).toArray(), 20);
    e.scale.set(1, 1.15, 0.42); // flat along the way out, a little tall
    e.lookAt(on.clone().addScaledVector(out, 1));
    g.add(e);
    const glint = sphere(0.0024, mat('#FFFFFF', { roughness: 0.2 }), on.clone().addScaledVector(out, 0.0042).add(new THREE.Vector3(0.002, 0.0035, 0)).toArray(), 10);
    g.add(glint);
  }
  // two soft ears on top, towards the front, folded a little forward: rounded, flattened cones
  for (const z of [-0.047, 0.047]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.028, 0.03, 24), peach);
    ear.scale.set(1, 1, 0.36);
    ear.position.set(RX * 0.38, cy + RY * 0.9, z);
    ear.rotation.set(Math.sign(z) * 0.22, Math.PI / 2, -0.85);
    g.add(ear);
  }
  // four short, stout legs under the belly, just touching it (through the glass a long leg would show whole), each
  // with a round foot
  for (const x of [-0.065, 0.065]) {
    for (const z of [-0.04, 0.04]) {
      const belly = cy - RY * Math.sqrt(1 - (x / RX) ** 2 - (z / RZ) ** 2); // where the round belly is, above this leg
      g.add(cyl(0.016, 0.0185, belly + 0.008 - 0.004, peach, { seg: 24, at: [x, 0.004, z] }));
      const foot = new THREE.Mesh(new THREE.TorusGeometry(0.0145, 0.004, 8, 24), peach);
      foot.rotation.x = Math.PI / 2;
      foot.position.set(x, 0.004, z);
      g.add(foot, cyl(0.0145, 0.0145, 0.004, peach, { seg: 24, at: [x, 0, z] }));
    }
  }
  // a curly tail at the back
  const tail = new THREE.Mesh(new THREE.TorusGeometry(0.014, 0.005, 10, 24, Math.PI * 1.5), peach);
  tail.position.set(-RX - 0.004, cy + 0.02, 0);
  tail.rotation.y = Math.PI / 2;
  g.add(tail);
  // the slot on its back, a dark line in a peach rim, and a coin halfway in
  g.add(box(0.06, 0.008, 0.016, peach, { at: [-0.015, cy + RY - 0.007, 0] }));
  g.add(box(0.046, 0.0012, 0.0045, deep, { at: [-0.015, cy + RY + 0.001, 0] }));
  const last = coin(0.026, 0.008);
  last.position.set(-0.015, cy + RY + 0.004, 0);
  last.rotation.x = Math.PI / 2;
  g.add(last);
  g.rotation.y = -0.55;
  return g;
}

// ---------- the objects of piano 2 · Tesoreria ----------
/** Stage 1: the prepaid card standing in its holder, and three coins rolling away from it by themselves. */
function leakingCard() {
  const g = new THREE.Group();
  // a thin base keeps the card and its coins together as one object
  const baseTop = 0.012;
  g.add(rbox(0.46, baseTop, 0.15, C.white, { at: [0.05, 0, 0], r: 0.006 }));
  g.add(rbox(0.11, 0.026, 0.05, C.navy, { at: [-0.11, baseTop, -0.02], r: 0.012 }));
  const card = creditCard();
  card.position.set(-0.11, baseTop + 0.014 + 0.054, -0.02);
  card.rotation.x = -0.08;
  g.add(card);
  // the coins: the first has just slipped out, the last is about to fall off the edge
  for (const [x, z, lean] of [
    [0.0, 0.03, 0.05],
    [0.1, 0.035, 0.22],
    [0.2, 0.03, 0.45],
  ]) {
    const c = standingCoin(0.03, 0.009, lean);
    c.position.set(x, baseTop, z);
    g.add(c);
  }
  return g;
}

// The six subscriptions, as small raised signs facing you, about 0.1 across.
const ICONS = {
  music(ink) {
    const g = new THREE.Group();
    const head = disc(0.022, 0.018, ink, [-0.014, -0.034, 0]);
    head.scale.x = 1.25;
    g.add(head, rbox(0.009, 0.074, 0.018, ink, { center: true, r: 0.003, at: [0.009, 0.0, 0] }));
    const flag = rbox(0.038, 0.012, 0.018, ink, { center: true, r: 0.005, at: [0.024, 0.026, 0] });
    flag.rotation.z = -0.6;
    g.add(flag);
    return g;
  },
  play(ink) {
    const s = new THREE.Shape();
    s.moveTo(-0.026, -0.036);
    s.lineTo(0.04, 0);
    s.lineTo(-0.026, 0.036);
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.01, bevelEnabled: true, bevelThickness: 0.004, bevelSize: 0.006, bevelSegments: 2 });
    geo.translate(-0.004, 0, -0.005);
    return new THREE.Mesh(geo, ink);
  },
  cloud(ink) {
    const g = new THREE.Group();
    g.add(disc(0.022, 0.018, ink, [-0.028, -0.006, 0]), disc(0.03, 0.018, ink, [0.002, 0.01, 0]), disc(0.022, 0.018, ink, [0.03, -0.006, 0]));
    g.add(rbox(0.09, 0.03, 0.018, ink, { center: true, r: 0.009, at: [0, -0.016, 0] }));
    return g;
  },
  gamepad(ink) {
    const g = new THREE.Group();
    const white = mat('#FFFFFF');
    g.add(rbox(0.1, 0.05, 0.018, ink, { center: true, r: 0.009 }));
    g.add(disc(0.016, 0.018, ink, [-0.04, -0.016, 0]), disc(0.016, 0.018, ink, [0.04, -0.016, 0]));
    g.add(rbox(0.022, 0.006, 0.004, white, { center: true, r: 0.002, at: [-0.025, 0.004, 0.01] }));
    g.add(rbox(0.006, 0.022, 0.004, white, { center: true, r: 0.002, at: [-0.025, 0.004, 0.01] }));
    g.add(disc(0.005, 0.004, white, [0.022, 0.0, 0.01]), disc(0.005, 0.004, white, [0.032, 0.01, 0.01]));
    return g;
  },
  paper(ink) {
    const g = new THREE.Group();
    const white = mat('#FFFFFF');
    g.add(rbox(0.072, 0.088, 0.016, ink, { center: true, r: 0.007 }));
    g.add(rbox(0.05, 0.016, 0.004, white, { center: true, r: 0.002, at: [0, 0.024, 0.008] }));
    for (let i = 0; i < 3; i++) g.add(rbox(0.05 - (i % 2) * 0.014, 0.006, 0.004, white, { center: true, r: 0.002, at: [-(i % 2) * 0.007, -0.002 - i * 0.014, 0.008] }));
    return g;
  },
  dumbbell(ink) {
    const g = new THREE.Group();
    const bar = rbox(0.08, 0.01, 0.01, ink, { center: true, r: 0.004 });
    g.add(bar);
    for (const s of [-1, 1]) {
      g.add(rbox(0.016, 0.056, 0.022, ink, { center: true, r: 0.006, at: [s * 0.026, 0, 0] }));
      g.add(rbox(0.012, 0.036, 0.018, ink, { center: true, r: 0.005, at: [s * 0.042, 0, 0] }));
    }
    return g;
  },
};

/** The Case: six subscriptions, money for four (28/10/2026, from the meeting: the board said nothing; the user chose
 *  the power strip). A white strip on the wall with six sockets: four blue plugs in it, each with its service's
 *  icon, their light cables running down into a white cable channel; the two let go lie unplugged on the channel,
 *  their icons grey, their sockets empty. To pull the plug is to cancel. */
function powerStrip() {
  const g = new THREE.Group();
  const ink = mat(C.navy, { roughness: 0.6 });
  const off = mat('#C9C2B6', { roughness: 0.7 });
  const blue = mat(SKY, { roughness: 0.5 });
  const cable = mat(tone(2, 0.9), { roughness: 0.6 });
  const [W, H, D] = [0.96, 0.15, 0.06]; // the strip
  const y0 = 0.13; // its middle, above the channel
  const trayY = -0.1; // the bottom of the cable channel, close under the strip so the glow stays tight
  const trayTop = trayY + 0.06;
  g.add(box(W, H, D, C.white, { center: true, at: [0, y0, D / 2] }));
  g.add(box(W, 0.06, 0.07, C.white, { at: [0, trayY, 0.035] }));
  const kinds = ['music', 'play', 'cloud', 'gamepad', 'paper', 'dumbbell'];
  const kept = [true, true, false, true, false, true];
  kinds.forEach((kind, i) => {
    const x = -W / 2 + 0.08 + i * ((W - 0.16) / 5);
    // the socket, a light disc with its two holes
    g.add(disc(0.045, 0.006, mat('#E8E2D8', { roughness: 0.7 }), [x, y0, D + 0.003]));
    if (kept[i]) {
      g.add(box(0.1, 0.1, 0.06, blue, { center: true, at: [x, y0, D + 0.03] }));
      const icon = ICONS[kind](ink);
      icon.scale.set(0.8, 0.8, 0.5);
      icon.position.set(x, y0, D + 0.065);
      g.add(icon);
      const len = y0 - 0.05 - trayTop;
      g.add(cyl(0.011, 0.011, len, cable, { seg: 12, at: [x, trayTop, D + 0.03] }));
    } else {
      for (const dx of [-0.014, 0.014]) g.add(disc(0.006, 0.008, ink, [x + dx, y0, D + 0.005]));
      // let go: lying on the channel, tipped back so its grey icon still shows
      const plug = new THREE.Group();
      plug.add(box(0.1, 0.1, 0.06, mat(tone(2, 0.8), { roughness: 0.6 }), { center: true }));
      const icon = ICONS[kind](off);
      icon.scale.set(0.8, 0.8, 0.5);
      icon.position.z = 0.035;
      plug.add(icon);
      plug.position.set(x, trayTop + 0.045, 0.075);
      plug.rotation.set(-0.9, 0, i === 2 ? 0.12 : -0.1);
      g.add(plug);
    }
  });
  return g;
}

/** The Field test: a small safe, its door open wide, the coins and the card back inside. */
function safe() {
  const g = new THREE.Group();
  const W = 0.26;
  const H = 0.25;
  const D = 0.22;
  const T = 0.026;
  const foot = 0.02;
  const body = mat(SKY, { roughness: 0.45 });
  const ink = mat(C.navy, { roughness: 0.5 });
  // the body: a rounded frame open at the front, closed by a lighter back
  const b = 0.008;
  const outer = roundedRectPath(new THREE.Shape(), -W / 2 + b, -H / 2 + b, W - 2 * b, H - 2 * b, 0.03);
  outer.holes.push(roundedRectPath(new THREE.Path(), -W / 2 + T, -H / 2 + T, W - 2 * T, H - 2 * T, 0.012));
  const frameGeo = new THREE.ExtrudeGeometry(outer, { depth: D - 2 * b, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 2, curveSegments: 10 });
  frameGeo.translate(0, 0, -(D - 2 * b) / 2);
  const frame = new THREE.Mesh(frameGeo, body);
  frame.position.y = foot + H / 2;
  g.add(frame);
  const back = plate(W - 0.01, H - 0.01, 0.02, 0.028, body);
  back.position.set(0, foot + H / 2, -D / 2 + 0.01);
  g.add(back);
  g.add(rbox(W - 2 * T + 0.002, H - 2 * T + 0.002, 0.004, mat(tone(2, 0.9), { roughness: 0.8 }), { center: true, r: 0.002, at: [0, foot + H / 2, -D / 2 + 0.022] }));
  for (const [x, z] of [
    [-1, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
  ])
    g.add(cyl(0.016, 0.018, foot, ink, { seg: 16, at: [x * (W / 2 - 0.035), 0, z * (D / 2 - 0.035)] }));

  // inside: the card leaning on the back, two stacks of coins in front of it
  const floorIn = foot + T;
  const card = creditCard();
  card.scale.setScalar(0.95);
  card.position.set(0.0, floorIn + 0.052, -D / 2 + 0.05);
  card.rotation.x = -0.14;
  g.add(card);
  const s1 = coinStack(5, 0.034, 0.011);
  s1.position.set(0.045, floorIn, 0.03);
  const s2 = coinStack(3, 0.034, 0.011);
  s2.position.set(-0.04, floorIn, 0.045);
  g.add(s1, s2);

  // the door, hinged on the left and open wide towards you
  const door = new THREE.Group();
  door.position.set(-W / 2, foot + H / 2, D / 2);
  door.rotation.y = -1.9;
  g.add(door);
  const DW = W - 0.012;
  const leaf = plate(DW, H - 0.012, 0.03, 0.026, body);
  leaf.position.set(DW / 2, 0, 0.015);
  door.add(leaf);
  const panel = plate(DW - 0.05, H - 0.062, 0.006, 0.014, mat(tone(2, 0.3), { roughness: 0.5 }));
  panel.position.set(DW / 2, 0, 0.031);
  door.add(panel);
  // the dial with its marks, and the handle
  const dialX = DW / 2 + 0.02;
  door.add(disc(0.046, 0.016, ink, [dialX, 0.012, 0.04]));
  door.add(disc(0.03, 0.01, mat(C.white), [dialX, 0.012, 0.05]));
  door.add(disc(0.01, 0.008, ink, [dialX, 0.012, 0.056]));
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    door.add(rbox(0.004, 0.009, 0.004, ink, { center: true, r: 0.0015, at: [dialX + Math.cos(a) * 0.022, 0.012 + Math.sin(a) * 0.022, 0.055] }));
  }
  door.add(rbox(0.014, 0.07, 0.014, ink, { center: true, r: 0.006, at: [DW / 2 - 0.06, 0.0, 0.045] }));
  // two hinges
  for (const y of [-H / 2 + 0.05, H / 2 - 0.05]) door.add(cyl(0.01, 0.01, 0.04, ink, { seg: 12, center: true, at: [0, y, 0.0] }));
  return g;
}

// ---------- the objects of piano 3 · Gaming ----------
function drawStar(g, cx, cy, r, color) {
  g.fillStyle = color;
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const rr = i % 2 ? r * 0.45 : r;
    g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
  }
  g.closePath();
  g.fill();
}

/** An invented scratch card: a lilac header, three boxes scratched off (two stars and something else), the small print. */
function ticketTexture() {
  return canvasTexture(256, 352, (g, w, h) => {
    g.fillStyle = '#FFFDF7';
    g.fillRect(0, 0, w, h);
    g.fillStyle = LILAC;
    roundRect(g, 14, 14, w - 28, 92, 14);
    g.fill();
    drawStar(g, w / 2, 60, 30, '#FFFFFF');
    let k = 0;
    const rnd = () => {
      k += 1;
      const x = Math.sin(k * 78.233) * 43758.5;
      return x - Math.floor(x);
    };
    [0, 1, 2].forEach((i) => {
      const x = 22 + i * 74;
      const y = 136;
      const s = 64;
      // the silver film, scratched away from the middle
      g.fillStyle = '#C3C8D0';
      roundRect(g, x, y, s, s, 8);
      g.fill();
      g.fillStyle = '#FFFDF7';
      for (let j = 0; j < 14; j++) {
        g.beginPath();
        g.arc(x + 14 + rnd() * (s - 28), y + 14 + rnd() * (s - 28), 11 + rnd() * 7, 0, Math.PI * 2);
        g.fill();
      }
      if (i < 2) drawStar(g, x + s / 2, y + s / 2 + 2, 22, C.gold);
      else {
        g.fillStyle = C.navy;
        g.beginPath();
        g.arc(x + s / 2, y + s / 2, 15, 0, Math.PI * 2);
        g.fill();
      }
    });
    g.fillStyle = '#D9D3C8';
    for (let i = 0; i < 5; i++) {
      roundRect(g, 26, 236 + i * 18, w - 52 - (i % 2) * 40, 6, 3);
      g.fill();
    }
  });
}

/** Stage 1: a scratch card already scratched, standing in its holder, the coin that scratched it beside. */
function scratchCard() {
  const g = new THREE.Group();
  const W = 0.16;
  const H = 0.22;
  const T = 0.006;
  g.add(rbox(0.11, 0.024, 0.05, C.navy, { at: [0, 0, 0], r: 0.012 }));
  const ticket = new THREE.Group();
  ticket.add(rbox(W, H, T, '#FFFDF7', { center: true, r: 0.0029 }));
  const face = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.004, H - 0.004), new THREE.MeshStandardMaterial({ map: ticketTexture(), roughness: 0.6 }));
  face.position.z = T / 2 + 0.0006;
  ticket.add(face);
  ticket.position.set(0, 0.014 + H / 2, 0);
  ticket.rotation.x = -0.1;
  g.add(ticket);
  const c = standingCoin(0.03, 0.009, 0.4);
  c.position.set(0.12, 0, 0.035);
  g.add(c);
  return g;
}

/** The wheel's slices: lilac and grey-blue, ten of them, with thin white lines between. */
function wheelTexture() {
  return canvasTexture(512, 512, (g, w, h) => {
    const n = 10;
    for (let i = 0; i < n; i++) {
      g.fillStyle = i % 2 ? '#9AA3BC' : tone(3, 0.5);
      g.beginPath();
      g.moveTo(w / 2, h / 2);
      g.arc(w / 2, h / 2, w / 2, (i / n) * Math.PI * 2, ((i + 1) / n) * Math.PI * 2);
      g.closePath();
      g.fill();
    }
    g.strokeStyle = '#FFFFFF';
    g.lineWidth = 5;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      g.beginPath();
      g.moveTo(w / 2, h / 2);
      g.lineTo(w / 2 + Math.cos(a) * w, h / 2 + Math.sin(a) * h);
      g.stroke();
    }
  });
}

/** The Case: the prize box seen from inside, as a wheel of chances. The rare prize is a thin gold slice. */
function probabilityWheel() {
  const g = new THREE.Group();
  const R = 0.4;
  g.add(disc(R + 0.035, 0.05, C.wood, [0, 0, 0.025]));
  const face = new THREE.Mesh(new THREE.CircleGeometry(R, 72), new THREE.MeshStandardMaterial({ map: wheelTexture(), roughness: 0.5 }));
  face.position.z = 0.0505;
  g.add(face);
  // about one chance in a hundred, raised so it catches the light
  const a0 = Math.PI * 0.32;
  const da = Math.PI * 2 * 0.012;
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.absarc(0, 0, R * 0.98, a0, a0 + da, false);
  s.lineTo(0, 0);
  const slice = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 0.014, bevelEnabled: false, curveSegments: 4 }), goldMat());
  slice.position.z = 0.051;
  g.add(slice);
  g.add(disc(0.055, 0.035, C.woodDark, [0, 0, 0.068]));
  g.add(disc(0.022, 0.01, mat(C.white), [0, 0, 0.088]));
  return g;
}

/** The Field test: a handheld console taken apart. The back half stands open towards you, a coin in the middle of
 *  its board; the front half lies in front, face up; a small screwdriver beside it. */
function openConsole() {
  const g = new THREE.Group();
  const lilac = mat(tone(3, 0.15), { roughness: 0.45 });
  const lilacDark = mat(tone(3, -0.12), { roughness: 0.5 });
  const ink = mat(C.navy, { roughness: 0.5 });
  const W = 0.3;
  const H = 0.14;
  const r = 0.06;

  // the back half: the shell's rim, its floor, the board, the battery, a coin
  const back = new THREE.Group();
  const b = 0.004;
  const rimShape = roundedRectPath(new THREE.Shape(), -W / 2 + b, -H / 2 + b, W - 2 * b, H - 2 * b, r - b);
  rimShape.holes.push(roundedRectPath(new THREE.Path(), -W / 2 + 0.016, -H / 2 + 0.016, W - 0.032, H - 0.032, r - 0.016));
  back.add(new THREE.Mesh(new THREE.ExtrudeGeometry(rimShape, { depth: 0.03, bevelEnabled: true, bevelThickness: b, bevelSize: b, bevelSegments: 2, curveSegments: 10 }), lilac));
  const floor = plate(W - 0.012, H - 0.012, 0.008, r - 0.006, lilacDark);
  floor.position.z = 0.004;
  back.add(floor);
  back.add(rbox(W - 0.1, H - 0.05, 0.006, ink, { center: true, r: 0.004, at: [0.018, 0, 0.011] }));
  const chip = mat('#59647A', { roughness: 0.5 });
  back.add(rbox(0.03, 0.024, 0.006, chip, { center: true, r: 0.002, at: [0.08, 0.02, 0.016] }));
  back.add(rbox(0.022, 0.016, 0.006, chip, { center: true, r: 0.002, at: [0.075, -0.024, 0.016] }));
  back.add(rbox(0.05, 0.085, 0.018, mat('#ECE9E3', { roughness: 0.6 }), { center: true, r: 0.005, at: [-0.095, 0, 0.018] }));
  back.add(rbox(0.012, 0.012, 0.004, ink, { center: true, r: 0.002, at: [-0.095, 0.03, 0.028] }));
  const c = coin(0.028, 0.009);
  c.rotation.x = Math.PI / 2;
  c.position.set(0.012, 0, 0.022);
  back.add(c);
  back.position.set(-0.12, 0.022 + H / 2, -0.05);
  back.rotation.x = -0.12;
  g.add(back);
  g.add(rbox(0.13, 0.022, 0.05, ink, { at: [-0.12, 0, -0.045], r: 0.01 }));

  // the front half, lying face up and a little raised towards you: screen, cross, two buttons
  const front = new THREE.Group();
  front.add(plate(W, H, 0.022, r, lilac));
  front.add(rbox(0.13, 0.085, 0.004, mat('#2B3245', { roughness: 0.3 }), { center: true, r: 0.004, at: [0, 0.004, 0.012] }));
  front.add(rbox(0.04, 0.012, 0.006, ink, { center: true, r: 0.003, at: [-0.105, 0, 0.012] }));
  front.add(rbox(0.012, 0.04, 0.006, ink, { center: true, r: 0.003, at: [-0.105, 0, 0.012] }));
  front.add(disc(0.012, 0.008, ink, [0.095, 0.014, 0.012]), disc(0.012, 0.008, ink, [0.118, -0.008, 0.012]));
  front.rotation.x = -Math.PI / 2 + 0.35;
  front.position.set(0.17, 0.036, 0.04);
  front.rotation.z = 0.12;
  g.add(front);

  // the screwdriver that opened it
  const sd = new THREE.Group();
  const handle = cyl(0.011, 0.011, 0.055, lilacDark, { seg: 12, center: true });
  const shaft = cyl(0.0035, 0.0035, 0.05, mat('#C3C8D0', { metalness: 0.4, roughness: 0.35 }), { seg: 8, center: true, at: [0, 0.052, 0] });
  sd.add(handle, shaft);
  sd.rotation.z = Math.PI / 2;
  sd.rotation.y = 0.5;
  sd.position.set(-0.13, 0.011, 0.09);
  g.add(sd);
  return g;
}

// ---------- the objects of piano 4 · Marketing ----------
function heartShape(s) {
  const h = new THREE.Shape();
  h.moveTo(0, -0.5 * s);
  h.bezierCurveTo(-0.15 * s, -0.35 * s, -0.55 * s, -0.12 * s, -0.5 * s, 0.18 * s);
  h.bezierCurveTo(-0.45 * s, 0.48 * s, -0.08 * s, 0.52 * s, 0, 0.24 * s);
  h.bezierCurveTo(0.08 * s, 0.52 * s, 0.45 * s, 0.48 * s, 0.5 * s, 0.18 * s);
  h.bezierCurveTo(0.55 * s, -0.12 * s, 0.15 * s, -0.35 * s, 0, -0.5 * s);
  return h;
}

/** Stage 1: the sneaker everybody has, invented and without marks, a heart-shaped tag (the likes) hanging from its laces. */
function sneaker() {
  const g = new THREE.Group();
  const pink = mat(PINK, { roughness: 0.55 });
  const white = mat('#FFFFFF', { roughness: 0.6 });
  const ink = mat(C.navy, { roughness: 0.6 });
  // the upper, from its side profile: heel, collar, tongue, laces sloping down to a round toe
  const p = new THREE.Shape();
  p.moveTo(-0.15, 0);
  p.lineTo(0.12, 0);
  p.quadraticCurveTo(0.165, 0, 0.16, 0.03);
  p.quadraticCurveTo(0.15, 0.058, 0.1, 0.066);
  p.lineTo(0.0, 0.088);
  p.lineTo(-0.04, 0.112);
  p.lineTo(-0.066, 0.1);
  p.quadraticCurveTo(-0.1, 0.082, -0.13, 0.104);
  p.quadraticCurveTo(-0.162, 0.11, -0.158, 0.075);
  p.lineTo(-0.15, 0);
  const upper = new THREE.Mesh(new THREE.ExtrudeGeometry(p, { depth: 0.07, bevelEnabled: true, bevelThickness: 0.016, bevelSize: 0.012, bevelSegments: 3, curveSegments: 10 }), pink);
  upper.position.set(0, 0.03, -0.035);
  g.add(upper);
  // the white sole
  g.add(rbox(0.34, 0.034, 0.116, white, { at: [0.005, 0, 0], r: 0.016 }));
  // the opening of the collar, the tongue, three laces down the slope
  const opening = cyl(0.034, 0.034, 0.01, ink, { seg: 24, center: true, at: [-0.1, 0.03 + 0.098, 0] });
  opening.scale.x = 1.3;
  g.add(opening);
  const tongue = rbox(0.03, 0.04, 0.05, white, { center: true, r: 0.01, at: [-0.042, 0.03 + 0.118, 0] });
  tongue.rotation.z = 0.6;
  g.add(tongue);
  for (let i = 0; i < 3; i++) {
    const x = -0.012 + i * 0.03;
    const lace = rbox(0.012, 0.007, 0.078, white, { center: true, r: 0.003, at: [x, 0.03 + 0.088 - 0.25 * x + 0.014, 0] });
    lace.rotation.z = -0.25;
    g.add(lace);
  }
  // the tag: a white round label with a pink heart, hanging on a short string from the laces
  const tag = new THREE.Group();
  tag.add(disc(0.032, 0.006, white));
  const heart = new THREE.Mesh(new THREE.ExtrudeGeometry(heartShape(0.04), { depth: 0.004, bevelEnabled: true, bevelThickness: 0.002, bevelSize: 0.002, bevelSegments: 2 }), pink);
  heart.position.z = 0.003;
  tag.add(heart);
  tag.position.set(0.03, 0.075, 0.07);
  tag.rotation.y = 0.2;
  g.add(tag);
  const string = cyl(0.0015, 0.0015, 0.05, ink, { seg: 6, center: true, at: [0.022, 0.118, 0.055] });
  string.rotation.x = 0.7;
  g.add(string);
  return g;
}

/** The face of the honest poster: warm white and two lines of text. */
function posterTexture(bg) {
  return canvasTexture(384, 512, (g, w, h) => {
    g.fillStyle = bg;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#D6CEC1';
    for (const [y, lw] of [
      [380, 250],
      [414, 180],
    ]) {
      roundRect(g, (w - lw) / 2, y, lw, 16, 3);
      g.fill();
    }
  });
}

/** The Case: the honest campaign for the company's channel (27/10/2026; before, a play sign that recalled YouTube).
 *  The Marketing's megaphone, the same sign as on the Direzione's board, stands out from a warm white poster in a
 *  warm grey frame; the «ADV» label says it is an ad, and the fake timer that came off it lies on the ledge below. */
function honestPoster() {
  const g = new THREE.Group();
  const W = 0.6;
  const H = 0.8;
  const white = '#FCFAF6';
  const frame = mat(C.frame, { roughness: 0.45 });
  const pink = mat(PINK, { roughness: 0.5 });
  const pinkDark = mat(tone(4, -0.2), { roughness: 0.55 });
  g.add(box(W - 0.01, H - 0.01, 0.03, white, { center: true, at: [0, 0, 0.015] })); // a hair inside the frame, so their sides never flicker
  g.add(squareRim(W, H, 0.03, 0.045, frame));
  const face = new THREE.Mesh(new THREE.PlaneGeometry(W - 0.06, H - 0.06), new THREE.MeshStandardMaterial({ map: posterTexture(white), roughness: 0.5 }));
  face.position.z = 0.031;
  g.add(face);

  // the megaphone in relief, its mouth to the right: a flattened cone, the mouthpiece and the handle
  const mega = new THREE.Group();
  const horn = cyl(0.11, 0.045, 0.2, pink, { seg: 28, center: true });
  horn.rotation.z = -Math.PI / 2;
  mega.add(horn);
  mega.add(box(0.05, 0.075, 0.06, pink, { center: true, at: [-0.125, 0, 0] }));
  mega.add(box(0.036, 0.085, 0.04, pinkDark, { center: true, at: [-0.06, -0.075, 0] }));
  mega.scale.z = 0.35;
  mega.position.set(-0.04, 0.05, 0.05);
  g.add(mega);
  // three short sound lines in front of the mouth
  for (const [y, a] of [
    [0.115, 0.45],
    [0.05, 0],
    [-0.015, -0.45],
  ]) {
    const line = box(0.065, 0.02, 0.016, pink, { center: true, at: [0.15, y, 0.042] });
    line.rotation.z = a;
    g.add(line);
  }

  // the «ADV» label in the top right corner
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 0.065),
    new THREE.MeshStandardMaterial({
      map: canvasTexture(240, 104, (c, w, h) => {
        c.fillStyle = PINK;
        roundRect(c, 0, 0, w, h, 6);
        c.fill();
        strokeText(c, 'ADV', w / 2, h / 2 + 3, 60, { fill: white });
      }),
      transparent: true,
      roughness: 0.6,
    }),
  );
  label.position.set(W / 2 - 0.12, H / 2 - 0.08, 0.034);
  g.add(label);

  // the ledge under the poster, and on it the fake timer that came off, leaning back
  g.add(box(0.5, 0.025, 0.08, frame, { at: [0, -H / 2 - 0.025, 0.04] }));
  const timer = new THREE.Group();
  timer.add(box(0.22, 0.11, 0.008, white, { center: true }));
  const digits = new THREE.Mesh(
    new THREE.PlaneGeometry(0.21, 0.1),
    new THREE.MeshStandardMaterial({
      map: canvasTexture(256, 120, (c, w, h) => {
        c.fillStyle = white;
        c.fillRect(0, 0, w, h);
        strokeText(c, '0:59', w / 2, h / 2 + 4, 84, { fill: '#867F75' });
      }),
      roughness: 0.6,
    }),
  );
  digits.position.z = 0.0045;
  timer.add(digits);
  timer.rotation.x = -0.18;
  timer.position.set(0.12, -H / 2 + 0.055, 0.055);
  g.add(timer);
  return g;
}

/** A printed ad on the pile, with the round mark of the stamp. */
function printTexture() {
  return canvasTexture(256, 192, (g, w, h) => {
    g.fillStyle = '#FFFFFF';
    g.fillRect(0, 0, w, h);
    g.fillStyle = tone(4, 0.6);
    roundRect(g, 16, 16, 120, 80, 10);
    g.fill();
    g.fillStyle = '#D9D3C8';
    for (let i = 0; i < 4; i++) {
      roundRect(g, 16, 112 + i * 16, 120 - (i % 2) * 30, 7, 3);
      g.fill();
    }
    g.strokeStyle = PINK;
    g.lineWidth = 9;
    g.beginPath();
    g.arc(190, 120, 44, 0, Math.PI * 2);
    g.stroke();
    drawStar(g, 190, 122, 24, PINK);
  });
}

/** The Field test: the department's big stamp on its ink pad, beside the pile of printed ads; the top one has its mark. */
function stamp() {
  const g = new THREE.Group();
  const pink = mat(PINK, { roughness: 0.5 });
  const ink = mat(C.navy, { roughness: 0.55 });
  // the ink pad
  g.add(rbox(0.2, 0.03, 0.14, ink, { at: [-0.1, 0, 0], r: 0.01 }));
  g.add(rbox(0.17, 0.006, 0.11, mat(tone(4, -0.35), { roughness: 0.9 }), { at: [-0.1, 0.028, 0], r: 0.003 }));
  // the stamp standing on it: rubber, wooden block, neck, knob
  g.add(rbox(0.13, 0.012, 0.09, ink, { at: [-0.1, 0.034, 0], r: 0.004 }));
  g.add(rbox(0.14, 0.045, 0.1, C.wood, { at: [-0.1, 0.046, 0], r: 0.012 }));
  g.add(cyl(0.022, 0.03, 0.07, pink, { seg: 24, at: [-0.1, 0.09, 0] }));
  g.add(sphere(0.05, pink, [-0.1, 0.19, 0], 28));
  // the pile of printed ads
  const paper = mat('#FBF8F3', { roughness: 0.8 });
  for (let i = 0; i < 4; i++) {
    const sheet = rbox(0.17, 0.004, 0.125, paper, { at: [0.11 + Math.sin(i * 2.1) * 0.006, i * 0.0045, 0.01], r: 0.0015 });
    sheet.rotation.y = Math.sin(i * 1.3) * 0.08;
    g.add(sheet);
  }
  const top = new THREE.Mesh(new THREE.PlaneGeometry(0.165, 0.12), new THREE.MeshStandardMaterial({ map: printTexture(), roughness: 0.8 }));
  top.rotation.x = -Math.PI / 2;
  top.position.set(0.11, 0.0185, 0.01);
  g.add(top);
  return g;
}

// ---------- the objects of piano 5 · Pianificazione ----------
/** The picture in the goal's frame: an invented phone on a soft mint background. */
function goalTexture() {
  return canvasTexture(200, 256, (g, w, h) => {
    g.fillStyle = tone(5, 0.9);
    g.fillRect(0, 0, w, h);
    g.fillStyle = C.navy;
    roundRect(g, 62, 34, 76, 150, 16);
    g.fill();
    const screen = g.createLinearGradient(0, 46, 0, 172);
    screen.addColorStop(0, tone(5, 0.45));
    screen.addColorStop(1, MEADOW);
    g.fillStyle = screen;
    roundRect(g, 70, 46, 60, 126, 9);
    g.fill();
    drawStar(g, 100, 108, 16, '#FFFFFF');
    g.fillStyle = tone(5, 0.55);
    roundRect(g, 48, 206, 104, 10, 5);
    g.fill();
  });
}

/** Stage 1: the goal in a standing frame, and in front of it eight months; the first three already have their coin. */
function goalFrame() {
  const g = new THREE.Group();
  g.add(rbox(0.32, 0.012, 0.07, C.white, { at: [0, 0, 0.05], r: 0.005 }));
  for (let i = 0; i < 8; i++) {
    const x = -0.119 + i * 0.034;
    const slot = new THREE.Mesh(new THREE.TorusGeometry(0.0125, 0.0025, 6, 24), mat(C.stoneDark));
    slot.rotation.x = Math.PI / 2;
    slot.position.set(x, 0.013, 0.05);
    g.add(slot);
    if (i < 3) {
      const c = coin(0.013, 0.006);
      c.position.set(x, 0.016, 0.05);
      g.add(c);
    }
  }
  // the frame, leaning back on its leg
  const frame = new THREE.Group();
  frame.add(box(0.2, 0.25, 0.016, C.frame, { center: true }));
  const pic = new THREE.Mesh(new THREE.PlaneGeometry(0.17, 0.22), new THREE.MeshStandardMaterial({ map: goalTexture(), roughness: 0.7 }));
  pic.position.z = 0.0085;
  frame.add(pic);
  frame.position.set(0, 0.125, -0.01);
  frame.rotation.x = -0.14;
  g.add(frame);
  const leg = box(0.03, 0.2, 0.01, C.frame, { center: true, at: [0, 0.1, -0.06] });
  leg.rotation.x = 0.35;
  g.add(leg);
  return g;
}

/** The Case: two climbs of coin stacks on a wall panel, month by month. Above, a little every month from the start:
 *  the stacks grow and end high. Below, starting late: they begin from nothing and end lower. */
function twoClimbs() {
  const g = new THREE.Group();
  // a frame of warm grey, square-edged like the building's other frames
  g.add(box(0.94, 0.64, 0.03, C.frame, { center: true, at: [0, 0, 0.015] }));
  g.add(box(0.9, 0.6, 0.012, '#FFFFFF', { center: true, at: [0, 0, 0.034] }));
  const rows = [
    { y: 0.03, stacks: [1, 2, 3, 4, 5, 7, 8, 10] }, // from the start
    { y: -0.26, stacks: [0, 0, 0, 0, 2, 4, 6, 7] }, // starting late
  ];
  const ledge = mat(C.stoneDark, { roughness: 0.6 });
  for (const row of rows) {
    g.add(rbox(0.82, 0.012, 0.07, ledge, { at: [0, row.y - 0.012, 0.075], r: 0.004 }));
    row.stacks.forEach((n, i) => {
      const x = -0.35 + i * 0.1;
      for (let k = 0; k < n; k++) {
        const c = coin(0.032, 0.012);
        c.position.set(x + Math.sin(k * 2.7 + i) * 0.002, row.y + 0.006 + k * 0.0128, 0.075);
        c.rotation.y = k;
        g.add(c);
      }
    });
  }
  // a small mint mark at the start of the upper climb: it starts now
  const flag = new THREE.Group();
  flag.add(cyl(0.004, 0.004, 0.08, C.navy, { seg: 6, at: [0, 0, 0] }));
  flag.add(rbox(0.045, 0.03, 0.006, mat(MEADOW, { roughness: 0.5 }), { at: [0.024, 0.05, 0], r: 0.003 }));
  flag.position.set(-0.405, rows[0].y, 0.075);
  g.add(flag);
  return g;
}

/** The Field test: an hourglass in a wooden frame where coins fall instead of sand. A few left above, one in the neck,
 *  a tall pile below: time worked for you. */
function coinHourglass() {
  const g = new THREE.Group();
  const wood = mat(C.wood, { roughness: 0.55 });
  const H = 0.4;
  g.add(cyl(0.125, 0.125, 0.025, wood, { seg: 40, at: [0, 0, 0] }));
  g.add(cyl(0.125, 0.125, 0.025, wood, { seg: 40, at: [0, H - 0.025, 0] }));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    g.add(cyl(0.009, 0.009, H - 0.05, wood, { seg: 10, at: [Math.cos(a) * 0.112, 0.025, Math.sin(a) * 0.112] }));
  }
  // the glass, turned on a lathe: two bulbs and a narrow neck
  const prof = [
    [0.0, 0.026],
    [0.07, 0.028],
    [0.095, 0.05],
    [0.098, 0.1],
    [0.075, 0.15],
    [0.022, 0.195],
    [0.022, 0.205],
    [0.075, 0.25],
    [0.098, 0.3],
    [0.095, 0.35],
    [0.07, 0.372],
    [0.0, 0.374],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const glass = new THREE.Mesh(new THREE.LatheGeometry(prof, 48), new THREE.MeshStandardMaterial({ color: tone(5, 0.9), transparent: true, opacity: 0.26, roughness: 0.06, side: THREE.DoubleSide, depthWrite: false }));
  glass.renderOrder = 2;
  g.add(glass);
  // the coins: a tall pile below, one falling through the neck, a few waiting above
  const pile = coinStack(9, 0.05, 0.011);
  pile.position.y = 0.03;
  g.add(pile);
  const falling = coin(0.016, 0.006);
  falling.rotation.x = Math.PI / 2;
  falling.position.y = 0.2;
  g.add(falling);
  for (const [x, z, y, rx] of [
    [-0.025, 0.01, 0.235, 0.5],
    [0.028, -0.008, 0.24, -0.6],
  ]) {
    const c = coin(0.026, 0.008);
    c.position.set(x, y, z);
    c.rotation.set(rx, 0, rx * 0.6);
    g.add(c);
  }
  return g;
}

// ---------- the objects of piano 6 · Personale ----------
/** Stage 1: the apron of the summer job, hanging from a wooden peg by its neck strap: a bib with the name tag pinned
 *  on, the ties loose at the waist, a wider skirt with one deep pocket. */
function apron() {
  const g = new THREE.Group();
  const teal = mat(TEAL, { roughness: 0.75 });
  const strap = mat(TEAL_LIGHT, { roughness: 0.75 });
  const T = 0.02;
  // the peg on the wall and the neck strap coming down from it to the bib's corners
  g.add(box(0.06, 0.04, 0.08, C.wood, { center: true, at: [0, 0.37, 0.04] }));
  for (const side of [-1, 1]) {
    const s = box(0.018, 0.13, 0.01, strap, { center: true, at: [side * 0.055, 0.31, 0.03] });
    s.rotation.z = side * 0.42;
    g.add(s);
  }
  // the bib, with the name tag
  g.add(box(0.2, 0.17, T, teal, { center: true, at: [0, 0.165, 0.03] }));
  g.add(box(0.085, 0.045, 0.006, C.white, { center: true, at: [0.035, 0.19, 0.043] }));
  g.add(box(0.06, 0.008, 0.002, TEAL_DARK, { center: true, at: [0.035, 0.19, 0.047] }));
  // the ties at the waist, hanging loose outwards
  for (const side of [-1, 1]) {
    const tie = box(0.15, 0.022, 0.01, strap, { center: true, at: [side * 0.2, 0.04, 0.03] });
    tie.rotation.z = side * -0.55;
    g.add(tie);
  }
  // the skirt, a little wider at the hem
  const skirt = new THREE.Shape();
  skirt.moveTo(-0.13, 0.08);
  skirt.lineTo(0.13, 0.08);
  skirt.lineTo(0.16, -0.27);
  skirt.lineTo(-0.16, -0.27);
  skirt.closePath();
  const skirtMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(skirt, { depth: T, bevelEnabled: false }), teal);
  skirtMesh.position.z = 0.02;
  g.add(skirtMesh);
  // one deep pocket across the front, split in two by a seam
  g.add(box(0.22, 0.1, 0.008, mat(TEAL_DARK, { roughness: 0.75 }), { center: true, at: [0, -0.1, 0.044] }));
  g.add(box(0.008, 0.1, 0.002, strap, { center: true, at: [0, -0.1, 0.049] }));
  return g;
}

/** The Case: the first colleague's payslip, framed like the Direzione's board. The long bar is what a month of
 *  the colleague costs the company: the net pay, then contributions, then taxes. The short bar under it is what
 *  reaches the colleague: the net pay alone, and the coins of it. */
function payslipFrame() {
  const g = new THREE.Group();
  const frame = mat(C.frame, { roughness: 0.45 });
  const white = '#FCFAF6';
  const [W, H, rim, depth] = [0.9, 0.62, 0.03, 0.045];
  g.add(box(W - 0.01, H - 0.01, 0.03, white, { center: true, at: [0, 0, 0.015] })); // a hair inside the frame, so their sides never flicker
  g.add(squareRim(W, H, rim, depth, frame));
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(W - 2 * rim, H - 2 * rim),
    new THREE.MeshStandardMaterial({ map: boardTexture('Busta paga', false, { size: 44, y: 40, bg: white }), roughness: 0.35 }),
  );
  face.position.z = 0.031;
  g.add(face);
  const Z = 0.04;
  const x0 = -0.36;
  const net = 0.38;
  // what the company pays: net, contributions, taxes
  let x = x0;
  for (const [w, color] of [
    [net, TEAL],
    [0.17, TEAL_LIGHT],
    [0.15, '#D6CEC1'],
  ]) {
    g.add(box(w - 0.008, 0.075, 0.02, mat(color, { roughness: 0.5 }), { center: true, at: [x + w / 2, 0.05, Z] }));
    x += w;
  }
  // what reaches the colleague: the net alone, and two coins of it
  g.add(box(net - 0.008, 0.075, 0.02, mat(TEAL, { roughness: 0.5 }), { center: true, at: [x0 + net / 2, -0.13, Z] }));
  for (const cx of [x0 + net + 0.07, x0 + net + 0.17]) {
    const c = coin(0.042, 0.016);
    c.rotation.x = Math.PI / 2;
    c.position.set(cx, -0.13, Z - 0.002);
    g.add(c);
  }
  return g;
}

/** The Field test: a small card file on the desk, the Personale's teal, with three cards standing up in it, one for
 *  each case of the month (the summer job, the creator, the part-time colleague), their tabs staggered. */
function deskFileBox() {
  const g = new THREE.Group();
  const teal = mat(TEAL, { roughness: 0.55 });
  const [w, d, h, t] = [0.3, 0.22, 0.13, 0.014];
  g.add(box(w, t, d, teal));
  g.add(box(w, h, t, teal, { at: [0, 0, d / 2 - t / 2] }));
  g.add(box(w, h * 0.8, t, teal, { at: [0, 0, -d / 2 + t / 2] }));
  for (const side of [-1, 1]) g.add(box(t, h, d, teal, { at: [side * (w / 2 - t / 2), 0, 0] }));
  // a wooden label holder on the front
  g.add(box(0.1, 0.04, 0.008, C.wood, { center: true, at: [0, h * 0.55, d / 2 + 0.004] }));
  // the three cards, leaning back a little, each with its tab
  const card = mat(C.white, { roughness: 0.8 });
  const tab = mat(TEAL_LIGHT, { roughness: 0.6 });
  [-0.05, 0, 0.05].forEach((z, i) => {
    const c = new THREE.Group();
    c.add(box(w - 0.04, 0.17, 0.006, card, { center: true, at: [0, 0.085, 0] }));
    c.add(box(0.07, 0.035, 0.006, tab, { center: true, at: [-0.08 + i * 0.08, 0.185, 0] }));
    c.position.set(0, t, z);
    c.rotation.x = -0.12;
    g.add(c);
  });
  return g;
}

/** Stage 1: the diploma, rolled up and tied with a ribbon in the Formazione's laurel green, lying on a small wooden
 *  cradle. Every road after school starts from it, so it picks none of them. */
function diploma() {
  const g = new THREE.Group();
  const paper = mat('#FCFAF6', { roughness: 0.85 });
  const ribbon = mat(MUSTARD, { roughness: 0.6 });
  // the cradle: a wooden base and two blocks the roll rests on
  g.add(box(0.36, 0.025, 0.12, C.wood));
  for (const x of [-0.12, 0.12]) g.add(box(0.05, 0.035, 0.12, C.wood, { at: [x, 0.025, 0] }));
  // the roll lying across it, with its edges a shade darker
  const y = 0.025 + 0.035 + 0.05;
  const roll = cyl(0.055, 0.055, 0.42, paper, { seg: 28, center: true, at: [0, y, 0] });
  roll.rotation.z = Math.PI / 2;
  g.add(roll);
  for (const side of [-1, 1]) {
    const edge = cyl(0.056, 0.056, 0.012, '#EFE8DC', { seg: 28, center: true, at: [side * 0.205, y, 0] });
    edge.rotation.z = Math.PI / 2;
    g.add(edge);
  }
  // the ribbon round the middle, a bow and two tails hanging in front
  const band = cyl(0.06, 0.06, 0.04, ribbon, { seg: 28, center: true, at: [0, y, 0] });
  band.rotation.z = Math.PI / 2;
  g.add(band);
  for (const side of [-1, 1]) {
    const loop = box(0.075, 0.045, 0.02, ribbon, { center: true, at: [side * 0.042, y + 0.035, 0.05] });
    loop.rotation.z = side * 0.45;
    g.add(loop);
    const tail = box(0.024, 0.09, 0.01, ribbon, { center: true, at: [side * 0.024, y - 0.035, 0.062] });
    tail.rotation.z = side * 0.25;
    g.add(tail);
  }
  g.add(box(0.032, 0.032, 0.028, MUSTARD_DARK, { center: true, at: [0, y + 0.03, 0.058] }));
  return g;
}

/** The Case: the course calendar on the wall. A white sheet hanging from a laurel-green bar, a month of days in four
 *  rows, and a run of eight days in the laurel green standing out of it: the weeks the colleague spends on the course
 *  instead of working. They cost now and pay later. */
function courseCalendar() {
  const g = new THREE.Group();
  const [W, H] = [0.62, 0.78];
  const white = '#FCFAF6';
  g.add(box(W, H, 0.02, white, { center: true, at: [0, 0, 0.01] }));
  g.add(box(W + 0.04, 0.07, 0.04, MUSTARD_DARK, { center: true, at: [0, H / 2 - 0.02, 0.02] }));
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H),
    new THREE.MeshStandardMaterial({
      map: canvasTexture(320, 400, (c, w) => {
        c.fillStyle = white;
        c.fillRect(0, 0, w, 400);
        strokeText(c, 'Corso', w / 2, 78, 46, { fill: MUSTARD_DARK });
      }),
      roughness: 0.6,
    }),
  );
  face.position.z = 0.021;
  g.add(face);
  // the days: grey and flat, the course days in the laurel green and raised
  const [cols, rows, cell, gap] = [5, 4, 0.09, 0.02];
  const [x0, y0] = [-(cols * cell + (cols - 1) * gap) / 2 + cell / 2, 0.17];
  const day = mat('#E6E0D6', { roughness: 0.7 });
  const course = mat(MUSTARD, { roughness: 0.55 });
  for (let k = 0; k < cols * rows; k++) {
    const [i, j] = [k % cols, Math.floor(k / cols)];
    const on = k >= 6 && k < 14;
    const d = on ? 0.02 : 0.004;
    g.add(box(cell, cell, d, on ? course : day, { center: true, at: [x0 + i * (cell + gap), y0 - j * (cell + gap), 0.021 + d / 2] }));
  }
  return g;
}

/** The face of one card on the board of the roads: a simple sign and the road's name, in the laurel green. */
function roadTexture(kind, label) {
  return canvasTexture(256, 232, (c, w) => {
    c.fillStyle = '#FFFFFF';
    c.fillRect(0, 0, w, 232);
    c.fillStyle = MUSTARD_DARK;
    const [cx, cy] = [w / 2, 88];
    if (kind === 'uni') {
      // a front with columns
      c.beginPath();
      c.moveTo(cx - 62, cy - 22);
      c.lineTo(cx, cy - 56);
      c.lineTo(cx + 62, cy - 22);
      c.closePath();
      c.fill();
      for (const dx of [-44, -15, 14, 43]) c.fillRect(cx + dx - 7, cy - 16, 14, 56);
      c.fillRect(cx - 64, cy + 44, 128, 12);
    } else if (kind === 'its') {
      // a cog
      for (let a = 0; a < 8; a++) {
        c.save();
        c.translate(cx, cy);
        c.rotate((a * Math.PI) / 4);
        c.fillRect(-10, -58, 20, 24);
        c.restore();
      }
      c.beginPath();
      c.arc(cx, cy, 42, 0, Math.PI * 2);
      c.arc(cx, cy, 16, 0, Math.PI * 2, true);
      c.fill();
    } else {
      // a briefcase
      roundRect(c, cx - 60, cy - 30, 120, 82, 10);
      c.fill();
      c.lineWidth = 11;
      c.strokeStyle = MUSTARD_DARK;
      roundRect(c, cx - 26, cy - 54, 52, 32, 8);
      c.stroke();
      c.fillStyle = '#FFFFFF';
      c.fillRect(cx - 60, cy + 4, 120, 6);
    }
    strokeText(c, label, cx, 192, 40, { fill: MUSTARD_DARK });
  });
}

/** The Field test: the board of the roads on a wooden easel. From one laurel-green pin at the bottom three threads
 *  run up to three cards of the same size, side by side: university, ITS, a job. None is bigger, none comes first. */
function pathsBoard() {
  const g = new THREE.Group();
  const wood = mat(C.wood, { roughness: 0.6 });
  const laurel = mat(MUSTARD, { roughness: 0.55 });
  const [W, H, Y] = [0.8, 0.58, 0.68]; // the board, and the height of its centre
  // the easel: two front legs with their feet apart, a back leg, the ledge the board stands on
  for (const side of [-1, 1]) {
    const leg = box(0.045, 1.22, 0.045, wood, { center: true, at: [side * 0.27, 0.6, 0.02] });
    leg.rotation.z = side * -0.08;
    g.add(leg);
  }
  const back = box(0.045, 1.1, 0.045, wood, { center: true, at: [0, 0.53, -0.2] });
  back.rotation.x = -0.3;
  g.add(back);
  g.add(box(W + 0.08, 0.035, 0.1, wood, { center: true, at: [0, Y - H / 2 - 0.02, 0.07] }));
  // the board: cream inside a wooden rim
  g.add(box(W - 0.01, H - 0.01, 0.03, C.cream, { center: true, at: [0, Y, 0.06] }));
  const rim = squareRim(W, H, 0.03, 0.045, wood);
  rim.position.set(0, Y, 0.045);
  g.add(rim);
  const Z = 0.076;
  // the three cards, the same size and in one row
  const [cw, ch, cy] = [0.2, 0.18, Y + 0.12];
  const cards = [['uni', 'Università'], ['its', 'ITS'], ['job', 'Lavoro']];
  cards.forEach(([kind, label], i) => {
    const x = (i - 1) * 0.25;
    const card = new THREE.Mesh(new THREE.BoxGeometry(cw, ch, 0.008), [
      ...Array(4).fill(mat('#FFFFFF')),
      new THREE.MeshStandardMaterial({ map: roadTexture(kind, label), roughness: 0.8 }),
      mat('#FFFFFF'),
    ]);
    card.position.set(x, cy, Z + 0.004);
    g.add(card);
  });
  // the pin at the bottom and the three threads from it to the foot of each card
  const pin = [0, Y - 0.19];
  g.add(disc(0.03, 0.02, laurel, [pin[0], pin[1], Z + 0.012]));
  cards.forEach((_, i) => {
    const [dx, dy] = [(i - 1) * 0.25 - pin[0], cy - ch / 2 - pin[1]];
    const thread = box(0.012, Math.hypot(dx, dy), 0.006, laurel, { center: true, at: [pin[0] + dx / 2, pin[1] + dy / 2, Z + 0.004] });
    thread.rotation.z = -Math.atan2(dx, dy);
    g.add(thread);
  });
  return g;
}

/** Stage 1: a shopping basket in the Finanza's indigo with three things in it, and on its handle the price tag:
 *  last year's price struck through, this year's higher one under it. The same shopping costs more. */
function shoppingBasket() {
  const g = new THREE.Group();
  const indigo = mat(INDIGO, { roughness: 0.55 });
  const [w, h, d, t] = [0.34, 0.15, 0.24, 0.016];
  g.add(box(w, t, d, indigo));
  g.add(box(w, h, t, indigo, { at: [0, 0, d / 2 - t / 2] }));
  g.add(box(w, h, t, indigo, { at: [0, 0, -d / 2 + t / 2] }));
  for (const side of [-1, 1]) g.add(box(t, h, d, indigo, { at: [side * (w / 2 - t / 2), 0, 0] }));
  // three slots cut in the front, a little darker
  for (const x of [-0.09, 0, 0.09]) g.add(box(0.05, 0.05, 0.004, INDIGO_DARK, { center: true, at: [x, h * 0.55, d / 2 + 0.002] }));
  // the shopping: a carton of milk, a box, a jar
  g.add(box(0.07, 0.19, 0.07, '#FFFFFF', { at: [-0.09, t, -0.03] }));
  g.add(box(0.07, 0.03, 0.07, '#EADFCF', { at: [-0.09, t + 0.19, -0.03] }));
  const pack = box(0.11, 0.15, 0.05, C.wood, { at: [0.03, t, -0.05] });
  pack.rotation.z = -0.12;
  g.add(pack);
  g.add(box(0.07, 0.11, 0.07, '#EADFCF', { at: [0.1, t, 0.04] }));
  // the handle across the top: two posts and a bar
  for (const side of [-1, 1]) g.add(box(0.025, 0.16, 0.025, INDIGO_DARK, { at: [side * 0.1, h, 0] }));
  g.add(box(0.225, 0.03, 0.035, INDIGO_DARK, { at: [0, h + 0.16, 0] }));
  // the price tag hanging from the handle, turned to you
  const tag = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 0.09, 0.006),
    [
      ...Array(4).fill(mat('#FFFFFF')),
      new THREE.MeshStandardMaterial({
        map: canvasTexture(240, 180, (c, cw) => {
          c.fillStyle = '#FFFFFF';
          c.fillRect(0, 0, cw, 180);
          strokeText(c, '2,49', cw / 2, 52, 56, { fill: '#9C968C' });
          c.fillStyle = '#9C968C';
          c.fillRect(48, 48, cw - 96, 7);
          strokeText(c, '2,99', cw / 2, 128, 64, { fill: INDIGO_DARK });
        }),
        roughness: 0.8,
      }),
      mat('#FFFFFF'),
    ],
  );
  tag.position.set(0.16, h + 0.08, d / 2 + 0.03);
  tag.rotation.z = -0.15;
  g.add(tag);
  g.add(box(0.008, 0.07, 0.006, '#EADFCF', { center: true, at: [0.135, h + 0.15, d / 2 + 0.02] }));
  return g;
}

/** The Case: a big price tag in the Finanza's indigo hanging on the wall by its cord, «TAEG» and the per cent sign
 *  on it. Money has a price too, and you look at it before you sign. */
function rateTag() {
  const g = new THREE.Group();
  const [W, H, T] = [0.42, 0.56, 0.03];
  // the tag: a card with its top corners cut, pointing up to the hole
  const s = new THREE.Shape();
  s.moveTo(-W / 2, -H / 2);
  s.lineTo(W / 2, -H / 2);
  s.lineTo(W / 2, H / 2 - 0.13);
  s.lineTo(0.09, H / 2);
  s.lineTo(-0.09, H / 2);
  s.lineTo(-W / 2, H / 2 - 0.13);
  s.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, H / 2 - 0.07, 0.03, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const card = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: T, bevelEnabled: false }), mat(INDIGO, { roughness: 0.55 }));
  g.add(card);
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(W - 0.06, 0.36),
    new THREE.MeshStandardMaterial({
      transparent: true,
      roughness: 0.6,
      map: canvasTexture(360, 360, (c, cw) => {
        strokeText(c, 'TAEG', cw / 2, 92, 92, { fill: '#FFFFFF' });
        strokeText(c, '%', cw / 2, 250, 170, { fill: '#FFFFFF' });
      }),
    }),
  );
  face.position.set(0, -0.07, T + 0.001);
  g.add(face);
  // the cord through the hole, up to a nail
  const cord = mat('#EADFCF', { roughness: 0.8 });
  for (const side of [-1, 1]) {
    const c = box(0.012, 0.17, 0.008, cord, { center: true, at: [side * 0.022, H / 2 + 0.01, T / 2] });
    c.rotation.z = side * 0.28;
    g.add(c);
  }
  g.add(box(0.04, 0.04, 0.05, C.wood, { center: true, at: [0, H / 2 + 0.1, 0.01] }));
  return g;
}

/** The Field test: a model house on the table, white with an indigo roof, and three bills slipped under its door:
 *  a year away from home, the rent and the bills together. */
function billsHouse() {
  const g = new THREE.Group();
  const [w, h, d] = [0.3, 0.2, 0.26];
  g.add(box(w, h, d, '#FCFAF6'));
  // the roof: a prism along the depth, overhanging a little
  const r = new THREE.Shape();
  r.moveTo(-w / 2 - 0.03, 0);
  r.lineTo(w / 2 + 0.03, 0);
  r.lineTo(0, 0.14);
  r.closePath();
  const roof = new THREE.Mesh(new THREE.ExtrudeGeometry(r, { depth: d + 0.04, bevelEnabled: false }), mat(INDIGO, { roughness: 0.55 }));
  roof.position.set(0, h, -d / 2 - 0.02);
  g.add(roof);
  g.add(box(0.04, 0.09, 0.04, '#FCFAF6', { at: [0.08, h + 0.04, -0.04] })); // the chimney
  // the door and a window
  const front = d / 2 + 0.003;
  g.add(box(0.07, 0.12, 0.008, C.wood, { at: [-0.06, 0, front] }));
  g.add(box(0.07, 0.06, 0.008, INDIGO_DARK, { center: true, at: [0.07, 0.11, front] }));
  // three envelopes fanned out on the table in front of the door, each with its indigo stamp
  [-0.05, 0.01, 0.07].forEach((x, i) => {
    const env = new THREE.Group();
    env.add(box(0.12, 0.008, 0.08, '#FFFFFF'));
    env.add(box(0.022, 0.003, 0.022, INDIGO, { at: [0.035, 0.008, -0.02] }));
    env.position.set(x - 0.04, i * 0.009, front + 0.06 + i * 0.012);
    env.rotation.y = (i - 1) * 0.35;
    g.add(env);
  });
  return g;
}

/** Stage 1 of the Credito: a bond as it was once printed, standing in a wooden foot. A cream sheet with a wine border,
 *  what was lent and its coupon, and a strip of coupons along the bottom: the last one is torn off and lies in front,
 *  with the gold coin it was worth. Lend, and you are paid for it. */
function bondCertificate() {
  const g = new THREE.Group();
  const [W, H, T] = [0.3, 0.38, 0.008];
  const [cut, strip] = [0.075, 0.085]; // the coupon torn off, bottom right, and the height of the strip
  const s = new THREE.Shape();
  s.moveTo(-W / 2, 0);
  s.lineTo(W / 2 - cut, 0);
  s.lineTo(W / 2 - cut, strip);
  s.lineTo(W / 2, strip);
  s.lineTo(W / 2, H);
  s.lineTo(-W / 2, H);
  s.closePath();
  const sheet = new THREE.Group();
  sheet.add(new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: T, bevelEnabled: false }), mat('#FCFAF6', { roughness: 0.85 })));
  const px = 1000; // canvas pixels per metre
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H),
    new THREE.MeshStandardMaterial({
      roughness: 0.8,
      alphaTest: 0.5,
      map: canvasTexture(W * px, H * px, (c, cw, ch) => {
        c.fillStyle = '#FCFAF6';
        c.fillRect(0, 0, cw, ch);
        const sy = ch - strip * px;
        c.strokeStyle = RUBY;
        c.lineWidth = 10;
        c.strokeRect(14, 14, cw - 28, sy - 24);
        strokeText(c, 'Obbligazione', cw / 2, 70, 30, { fill: RUBY_DARK });
        strokeText(c, '1.000 €', cw / 2, 150, 62, { fill: RUBY_DARK });
        strokeText(c, 'cedola 3%', cw / 2, 225, 28, { fill: '#9C968C' });
        // the coupons: a dashed line to tear along, three left, a number on each
        c.setLineDash([10, 8]);
        c.lineWidth = 4;
        c.strokeStyle = '#9C968C';
        c.beginPath();
        c.moveTo(0, sy);
        c.lineTo(cw - cut * px, sy);
        for (const k of [1, 2, 3]) {
          c.moveTo(k * 75, sy);
          c.lineTo(k * 75, ch);
        }
        c.stroke();
        c.setLineDash([]);
        for (const k of [0, 1, 2]) strokeText(c, String(k + 1), k * 75 + 37, sy + 52, 34, { fill: RUBY });
        c.clearRect(cw - cut * px, sy, cut * px, ch - sy);
      }),
    }),
  );
  face.position.set(0, H / 2, T + 0.001);
  sheet.add(face);
  // standing in its slot, leaning back a little so it reads from the room
  sheet.position.set(0, 0.035, -T / 2);
  sheet.rotation.x = -0.1;
  g.add(box(0.36, 0.035, 0.13, C.wood));
  g.add(sheet);
  // the coupon torn off, flat on the foot, and its coin
  const coupon = new THREE.Group();
  coupon.add(box(0.075, 0.004, 0.085, '#FCFAF6'));
  coupon.add(box(0.024, 0.003, 0.024, RUBY, { at: [-0.018, 0.004, 0.02] }));
  const c = coin(0.022, 0.007);
  c.position.set(0.012, 0.0075, -0.012);
  coupon.add(c);
  coupon.position.set(0.12, 0.035, 0.03);
  coupon.rotation.y = -0.3;
  g.add(coupon);
  return g;
}

/** The Case: a tall square thermometer on the wall. Down at the bottom, where it is cool, AAA and «3%»: a solid State
 *  pays little. Up at the top, where it is hot, BB and «9%»: a risky company pays more, because you may not get your
 *  money back. The column is light wine low down and full wine high up. */
function riskThermometer() {
  const g = new THREE.Group();
  const [W, H] = [0.3, 0.92];
  g.add(box(W, H, 0.025, '#FCFAF6', { center: true, at: [0, 0, 0.0125] }));
  g.add(squareRim(W, H, 0.025, 0.035, mat(C.frame, { roughness: 0.45 })));
  const tx = 0.02;
  const [bottom, top] = [-H / 2 + 0.17, H / 2 - 0.07];
  const len = top - bottom;
  // the tube, the column in two shades and the square bulb
  g.add(box(0.075, len + 0.03, 0.01, '#EDE6DA', { center: true, at: [tx, (top + bottom) / 2 + 0.015, 0.03] }));
  const mid = bottom + len * 0.45;
  const level = bottom + len * 0.9;
  g.add(box(0.04, mid - bottom, 0.022, RUBY_LIGHT, { at: [tx, bottom, 0.04] }));
  g.add(box(0.04, level - mid, 0.022, RUBY, { at: [tx, mid, 0.04] }));
  g.add(box(0.11, 0.11, 0.05, RUBY_LIGHT, { center: true, at: [tx, bottom - 0.05, 0.05] }));
  // the scale on the left: from AAA at the bottom to BB at the top
  const scale = new THREE.Mesh(
    new THREE.PlaneGeometry(0.1, len),
    new THREE.MeshStandardMaterial({
      roughness: 0.7,
      map: canvasTexture(100, Math.round(len * 1000), (c, cw, ch) => {
        c.fillStyle = '#FCFAF6';
        c.fillRect(0, 0, cw, ch);
        ['BB', 'BBB', 'A', 'AAA'].forEach((t, i) => {
          const y = 40 + (i * (ch - 80)) / 3;
          strokeText(c, t, cw / 2 - 8, y, 30, { fill: i === 0 ? RUBY_DARK : '#9C968C' });
          c.fillStyle = '#C9C2B6';
          c.fillRect(cw - 16, y - 2, 16, 4);
        });
      }),
    }),
  );
  scale.position.set(-W / 2 + 0.085, (top + bottom) / 2, 0.026);
  g.add(scale);
  // the two rates on the right, each on a little tag pointing at the column
  const rate = (text, y, full) => {
    const tag = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.05, 0.02),
      [
        ...Array(4).fill(mat(full ? RUBY : '#FFFFFF')),
        new THREE.MeshStandardMaterial({
          roughness: 0.7,
          map: canvasTexture(170, 110, (c, cw, ch) => {
            c.fillStyle = full ? RUBY : '#FFFFFF';
            c.fillRect(0, 0, cw, ch);
            strokeText(c, text, cw / 2, ch / 2 + 2, 58, { fill: full ? '#FFFFFF' : RUBY_DARK });
          }),
        }),
        mat(full ? RUBY : '#FFFFFF'),
      ],
    );
    // clear of the column, inside the frame, joined to the column by a short arm
    tag.position.set(0.088, y, 0.045);
    g.add(tag);
    g.add(box(0.016, 0.012, 0.012, full ? RUBY : RUBY_LIGHT, { center: true, at: [0.046, y, 0.045] }));
  };
  rate('9%', bottom + len * 0.86, true);
  rate('3%', bottom + len * 0.14, false);
  return g;
}

/** The Field test: the register of the loans, open on a wooden book rest. Wine covers, two pages of loans written in
 *  rows, the wine ribbon hanging over the edge and a gold coin on the right page: who you lent to, for how long, at
 *  how much. */
function loanLedger() {
  const g = new THREE.Group();
  // the book rest: a wooden wedge, low in front
  const D = 0.32;
  const w = new THREE.Shape();
  w.moveTo(-D / 2, 0);
  w.lineTo(D / 2, 0);
  w.lineTo(D / 2, 0.025);
  w.lineTo(-D / 2, 0.16);
  w.closePath();
  const wedge = new THREE.Mesh(new THREE.ExtrudeGeometry(w, { depth: 0.46, bevelEnabled: false }), mat(C.wood, { roughness: 0.6 }));
  wedge.rotation.y = -Math.PI / 2;
  wedge.position.x = 0.23;
  g.add(wedge);
  // the open book, lying on the slope
  const book = new THREE.Group();
  const [pw, pd] = [0.2, 0.28];
  const cover = mat(RUBY, { roughness: 0.6 });
  const paper = mat('#FCFAF6', { roughness: 0.85 });
  const page = (left) =>
    canvasTexture(200, 280, (c, cw) => {
      c.fillStyle = '#FCFAF6';
      c.fillRect(0, 0, cw, 280);
      if (left) strokeText(c, 'Prestiti', cw / 2, 42, 30, { fill: RUBY_DARK });
      for (let i = 0; i < 6; i++) {
        const y = (left ? 80 : 40) + i * 32;
        c.fillStyle = '#E6E0D6';
        c.fillRect(18, y, cw - 36, 3);
        c.fillStyle = '#C9C2B6';
        c.fillRect(22, y - 16, left ? 90 : 60, 10);
        if (!left && i < 4) {
          c.fillStyle = RUBY;
          c.fillRect(cw - 56, y - 18, 32, 14);
        }
      }
    });
  for (const side of [-1, 1]) {
    const half = new THREE.Group();
    half.add(box(pw + 0.015, 0.01, pd + 0.03, cover, { at: [(side * (pw + 0.015)) / 2, 0, 0] }));
    // the pages stop 4 mm short of the spine, so their side never lies on the cover's
    half.add(box(pw - 0.004, 0.016, pd, paper, { at: [side * (pw / 2 + 0.002), 0.01, 0] }));
    const face = new THREE.Mesh(new THREE.PlaneGeometry(pw - 0.02, pd - 0.02), new THREE.MeshStandardMaterial({ map: page(side < 0), roughness: 0.85 }));
    face.rotation.x = -Math.PI / 2;
    face.position.set((side * pw) / 2, 0.0265, 0);
    half.add(face);
    half.rotation.z = side * 0.07;
    book.add(half);
  }
  book.add(box(0.02, 0.02, pd + 0.03, RUBY_DARK, { at: [0, -0.004, 0] }));
  // the ribbon from the spine over the front edge
  book.add(box(0.018, 0.004, pd / 2, RUBY_DARK, { at: [0.01, 0.028, pd / 4] }));
  book.add(box(0.018, 0.09, 0.004, RUBY_DARK, { at: [0.01, -0.06, pd / 2 + 0.01] }));
  const c = coin(0.03, 0.008);
  c.position.set(0.11, 0.035, 0.07);
  book.add(c);
  book.rotation.x = Math.atan2(0.135, D);
  book.position.set(0, 0.105, 0);
  g.add(book);
  return g;
}

/** Lesson 1: the block of the shares. A square block of ten wooden boards, two tones of wood one over the other, and one
 *  board drawn out halfway in plum: the company in equal pieces, and one piece is yours. */
function shareBlock() {
  const g = new THREE.Group();
  const [W, D, t, gap] = [0.3, 0.3, 0.028, 0.002];
  const tones = [mat(C.wood, { roughness: 0.6 }), mat('#E6C49C', { roughness: 0.6 })];
  for (let i = 0; i < 10; i++) {
    const out = i === 6;
    // the plum board comes out sideways and towards the room, so its end shows from the room's view
    g.add(box(W, t, D, out ? mat(PLUM, { roughness: 0.5 }) : tones[i % 2], { at: [out ? W * 0.45 : 0, i * (t + gap), out ? 0.05 : 0] }));
  }
  return g;
}

/** A wooden key with a round bow, for the key board of the Case. With `tag`, a plum tag hangs from its bow. */
function key(material, tag) {
  const g = new THREE.Group();
  const bow = new THREE.Shape();
  bow.absarc(0, 0, 0.03, 0, Math.PI * 2, false);
  const hole = new THREE.Path();
  hole.absarc(0, 0, 0.013, 0, Math.PI * 2, true);
  bow.holes.push(hole);
  const ring = new THREE.Mesh(new THREE.ExtrudeGeometry(bow, { depth: 0.012, bevelEnabled: false, curveSegments: 24 }), material);
  ring.position.z = -0.006;
  g.add(ring);
  g.add(box(0.016, 0.15, 0.012, material, { at: [0, -0.18, 0], center: false }));
  g.add(box(0.03, 0.018, 0.012, material, { at: [0.022, -0.18, 0] }));
  g.add(box(0.022, 0.016, 0.012, material, { at: [0.018, -0.145, 0] }));
  if (tag) {
    const t = box(0.05, 0.06, 0.01, mat(PLUM, { roughness: 0.5 }), { center: true, at: [-0.04, -0.03, 0.006] });
    t.rotation.z = 0.35;
    g.add(t);
  }
  return g;
}

/** The Case: the keys of the company on the back wall. A cream board with a wooden strip on top and ten wooden pegs;
 *  eight keys hang on them, two pegs are empty, and those two keys lie on the shelf below with their plum tags: a
 *  share given to the new partner is a share of the decisions. */
function companyKeys() {
  const g = new THREE.Group();
  const [W, H] = [0.74, 0.34];
  const wood = mat(C.wood, { roughness: 0.6 });
  const keyWood = mat(C.woodDark, { roughness: 0.55 });
  g.add(box(W, H, 0.025, '#F4EFE7', { center: true, at: [0, 0, 0.0125] }));
  g.add(box(W + 0.03, 0.04, 0.045, wood, { center: true, at: [0, H / 2 + 0.02, 0.0225] }));
  const pegY = H / 2 - 0.06;
  for (let i = 0; i < 10; i++) {
    const x = -0.288 + i * 0.064;
    g.add(box(0.016, 0.016, 0.05, wood, { center: true, at: [x, pegY, 0.05] }));
    if (i === 7 || i === 8) continue;
    const k = key(keyWood, false);
    k.position.set(x, pegY, 0.045);
    g.add(k);
  }
  // the shelf under the board, and the two keys given away lying on it
  const shelfY = -H / 2 - 0.02;
  g.add(box(W, 0.022, 0.1, wood, { at: [0, shelfY, 0.05] }));
  // lying on their side, the bow on the right and the tag up, leaning back on the board
  [0.06, 0.29].forEach((x) => {
    const k = key(keyWood, true);
    k.rotation.set(-0.15, 0, -Math.PI / 2);
    k.position.set(x, shelfY + 0.022 + 0.032, 0.045);
    g.add(k);
  });
  return g;
}

/** The Field test: the bell that opens the meeting of the partners (and the trading day at the Stock Exchange). A plum
 *  hand bell with a wooden handle, standing on a square wooden base. */
function meetingBell() {
  const g = new THREE.Group();
  g.add(box(0.16, 0.015, 0.16, C.woodDark));
  g.add(box(0.21, 0.03, 0.21, C.wood, { at: [0, 0.015, 0] }));
  const y0 = 0.045;
  const profile = [
    [0.088, 0],
    [0.084, 0.012],
    [0.068, 0.04],
    [0.058, 0.08],
    [0.05, 0.108],
    [0.032, 0.126],
    [0, 0.132],
  ].map(([r, y]) => new THREE.Vector2(r, y));
  const bell = new THREE.Mesh(new THREE.LatheGeometry(profile, 40), mat(PLUM, { roughness: 0.35, metalness: 0.15, side: THREE.DoubleSide }));
  bell.position.y = y0;
  g.add(bell);
  g.add(cyl(0.09, 0.09, 0.012, mat(PLUM_DARK, { roughness: 0.4 }), { seg: 40, at: [0, y0, 0] }));
  g.add(cyl(0.016, 0.02, 0.09, mat(C.wood, { roughness: 0.55 }), { seg: 16, at: [0, y0 + 0.125, 0] }));
  g.add(sphere(0.028, mat(C.wood, { roughness: 0.55 }), [0, y0 + 0.235, 0]));
  return g;
}

/** Lesson 1: the television with one channel. A small square set in a wooden case on short feet, a cream screen showing
 *  one programme only (a cyan square with «1»), and one big cyan knob, set on 1: if that programme goes badly, all goes
 *  badly. */
function oneChannelTv() {
  const g = new THREE.Group();
  const [W, H, D] = [0.36, 0.27, 0.26];
  const wood = mat(C.wood, { roughness: 0.6 });
  for (const x of [-W / 2 + 0.04, W / 2 - 0.04]) for (const z of [-D / 2 + 0.04, D / 2 - 0.04]) g.add(box(0.03, 0.03, 0.03, C.woodDark, { at: [x, 0, z] }));
  g.add(box(W, H, D, wood, { at: [0, 0.03, 0] }));
  const front = D / 2;
  // the screen, set in a cream bezel on the left, and the panel with the knob on the right
  g.add(box(0.24, 0.2, 0.012, '#F4EFE7', { center: true, at: [-0.04, 0.03 + H / 2, front + 0.006] }));
  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.2, 0.16),
    new THREE.MeshStandardMaterial({
      roughness: 0.5,
      map: canvasTexture(250, 200, (c, cw, ch) => {
        c.fillStyle = '#EEF7F9';
        c.fillRect(0, 0, cw, ch);
        c.fillStyle = CYAN;
        c.fillRect(cw / 2 - 60, ch / 2 - 60, 120, 120);
        strokeText(c, '1', cw / 2, ch / 2 + 4, 96, { fill: '#FFFFFF' });
      }),
    }),
  );
  screen.position.set(-0.04, 0.03 + H / 2, front + 0.016);
  g.add(screen);
  const knob = cyl(0.04, 0.04, 0.03, mat(CYAN, { roughness: 0.45 }), { seg: 32, center: true, at: [0.125, 0.03 + H * 0.62, front + 0.015] });
  knob.rotation.x = Math.PI / 2;
  g.add(knob);
  g.add(box(0.012, 0.05, 0.01, '#FFFFFF', { center: true, at: [0.125, 0.03 + H * 0.62 + 0.012, front + 0.032] }));
  g.add(box(0.07, 0.012, 0.006, '#F4EFE7', { center: true, at: [0.125, 0.03 + H * 0.25, front + 0.003] }));
  g.add(box(0.07, 0.012, 0.006, '#F4EFE7', { center: true, at: [0.125, 0.03 + H * 0.17, front + 0.003] }));
  return g;
}

/** The Case: the eggs in the baskets. A wooden shelf on two brackets with four square cyan baskets, one egg in each:
 *  never all the eggs in the same basket, the mix of the new season. */
function eggBaskets() {
  const g = new THREE.Group();
  const wood = mat(C.wood, { roughness: 0.6 });
  const W = 0.72;
  g.add(box(W, 0.025, 0.16, wood, { at: [0, 0, 0.08] }));
  for (const x of [-W / 2 + 0.1, W / 2 - 0.1]) g.add(box(0.03, 0.09, 0.025, wood, { at: [x, -0.09, 0.0125] }));
  const basket = mat(CYAN_LIGHT, { roughness: 0.7 });
  const rim = mat(CYAN, { roughness: 0.6 });
  const egg = mat('#FBF5EA', { roughness: 0.6 });
  const [bw, bh, bd, t] = [0.14, 0.05, 0.12, 0.012]; // low baskets, so the eggs stand out above them
  [-0.255, -0.085, 0.085, 0.255].forEach((x) => {
    const b = new THREE.Group();
    b.add(box(bw, t, bd, basket));
    for (const s of [-1, 1]) {
      b.add(box(t, bh, bd, basket, { at: [s * (bw / 2 - t / 2), 0, 0] }));
      b.add(box(bw, bh, t, basket, { at: [0, 0, s * (bd / 2 - t / 2)] }));
    }
    b.add(box(bw + 0.008, 0.02, t + 0.01, rim, { at: [0, bh - 0.016, bd / 2 - t / 2] }));
    const e = sphere(0.042, egg, [0, t + 0.05, 0], 24);
    e.scale.set(1, 1.3, 1);
    b.add(e);
    b.position.set(x, 0.025, 0.08);
    g.add(b);
  });
  return g;
}

/** The Field test: the mixer with four channels. A wooden box with a cream top, four long grooves and four big cyan
 *  faders each at its own level, four little meters behind them: the four funds of the test, dosed together. */
function fourChannelMixer() {
  const g = new THREE.Group();
  const [W, D] = [0.36, 0.28];
  g.add(box(W, 0.05, D, mat(C.wood, { roughness: 0.6 })));
  const top = new THREE.Group();
  top.position.set(0, 0.05, 0);
  g.add(top);
  top.add(box(W - 0.02, 0.012, D - 0.02, '#F4EFE7'));
  const levels = [0.35, 0.7, 0.5, 0.2];
  levels.forEach((k, i) => {
    const x = -0.12 + i * 0.08;
    top.add(box(0.014, 0.004, 0.17, C.stoneDark, { at: [x, 0.012, 0.03] }));
    top.add(box(0.05, 0.03, 0.032, mat(CYAN, { roughness: 0.45 }), { at: [x, 0.016, 0.03 + 0.07 - k * 0.14] }));
    // the meter behind each fader, as high as its level
    top.add(box(0.03, 0.02 + k * 0.08, 0.02, mat(CYAN_LIGHT, { roughness: 0.6 }), { at: [x, 0.012, -0.095] }));
  });
  return g;
}

/** The wall of screens of the control room: nine small screens in three rows, each with a different programme drawn
 *  in flat calm shapes, in warm grey bezels. Many channels together. */
function screenWall() {
  const g = new THREE.Group();
  const [sw, sh, gap] = [0.3, 0.2, 0.035];
  const bezel = mat(C.frame, { roughness: 0.5 });
  const programme = (k) =>
    canvasTexture(300, 200, (c, cw, ch) => {
      const bgs = ['#F4EFE7', '#EEF7F9', '#F3EDE4'];
      c.fillStyle = bgs[k % 3];
      c.fillRect(0, 0, cw, ch);
      const soft = ['#E6C49C', CYAN_LIGHT, '#C9C2B6', C.wood, '#DCD3C4'];
      const a = soft[k % 5];
      const b = soft[(k + 2) % 5];
      c.fillStyle = a;
      switch (k % 6) {
        case 0: // a sun over a hill
          c.beginPath();
          c.arc(200, 70, 34, 0, Math.PI * 2);
          c.fill();
          c.fillStyle = b;
          c.fillRect(0, 130, cw, 70);
          break;
        case 1: // bars
          [60, 110, 80, 140].forEach((h, i) => c.fillRect(40 + i * 60, ch - 20 - h, 40, h));
          break;
        case 2: // a big square and two lines
          c.fillRect(30, 40, 110, 120);
          c.fillStyle = b;
          c.fillRect(160, 60, 110, 16);
          c.fillRect(160, 100, 80, 16);
          break;
        case 3: // waves
          c.fillRect(0, 120, cw, 80);
          c.fillStyle = b;
          c.fillRect(0, 150, cw, 50);
          break;
        case 4: // dots
          for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
            c.beginPath();
            c.arc(70 + i * 80, 65 + j * 70, 22, 0, Math.PI * 2);
            c.fill();
          }
          break;
        default: // a desk and a person, like a news programme
          c.fillRect(60, 130, 180, 50);
          c.fillStyle = b;
          c.beginPath();
          c.arc(150, 70, 28, 0, Math.PI * 2);
          c.fill();
          c.fillRect(115, 100, 70, 40);
      }
    });
  for (let r = 0; r < 3; r++) {
    for (let col = 0; col < 3; col++) {
      const x = (col - 1) * (sw + gap);
      const y = (1 - r) * (sh + gap);
      g.add(box(sw, sh, 0.035, bezel, { center: true, at: [x, y, 0.0175] }));
      const s = new THREE.Mesh(new THREE.PlaneGeometry(sw - 0.03, sh - 0.03), new THREE.MeshStandardMaterial({ roughness: 0.5, map: programme(r * 3 + col) }));
      s.position.set(x, y, 0.039);
      g.add(s);
    }
  }
  return g;
}

/** A flat sign drawn on a canvas with a clear background: only what is drawn shows (alphaTest, not transparency, so
 *  the even room light still reaches it). */
function cutout(w, h, px, draw) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshStandardMaterial({ roughness: 0.6, alphaTest: 0.5, map: canvasTexture(Math.round(w * px), Math.round(h * px), draw) }),
  );
}

/** Lesson 1: the jerrycan. A square night-blue can with the cross pressed into its side, a wooden handle and cap, and
 *  a cream price tag hanging from the handle: the tank costs more for something that happens far away. */
function jerryCan() {
  const g = new THREE.Group();
  const [W, H, D] = [0.22, 0.28, 0.13];
  const blue = mat(NIGHT_BLUE, { roughness: 0.5 });
  const wood = mat(C.wood, { roughness: 0.6 });
  g.add(box(W, H, D, blue));
  // the cross pressed into the side, a little lighter
  for (const s of [-1, 1]) {
    const r = box(0.24, 0.022, 0.008, mat(NIGHT_BLUE_LIGHT, { roughness: 0.5 }), { center: true, at: [0, H * 0.45, D / 2 + 0.004] });
    r.rotation.z = s * 0.9;
    g.add(r);
  }
  // the handle on top towards the back, and the cap at the front corner
  for (const x of [-0.06, 0.06]) g.add(box(0.025, 0.05, 0.03, blue, { at: [x - 0.02, H, -0.025] }));
  g.add(box(0.16, 0.028, 0.034, wood, { at: [-0.02, H + 0.05, -0.025] }));
  g.add(cyl(0.022, 0.022, 0.035, wood, { seg: 20, at: [W / 2 - 0.035, H, D / 2 - 0.035] }));
  // the price tag, hanging from the handle on the front
  const tag = new THREE.Group();
  tag.add(box(0.008, 0.06, 0.008, '#F4EFE7', { at: [0, -0.06, 0] }));
  tag.add(box(0.1, 0.055, 0.006, '#FCFAF6', { center: true, at: [0, -0.09, 0] }));
  const price = cutout(0.092, 0.05, 1200, (c, cw, ch) => strokeText(c, '2,15 €', cw / 2, ch / 2 + 2, 30, { fill: NIGHT_BLUE_DARK }));
  price.position.set(0, -0.09, 0.0075);
  tag.add(price);
  tag.position.set(0.04, H + 0.05, D / 2 + 0.01);
  tag.rotation.z = -0.12;
  g.add(tag);
  return g;
}

/** A gold coin standing up, facing the room, with its sign on the face. */
function faceCoin(r, sign) {
  const g = new THREE.Group();
  const disc = cyl(r, r, 0.018, goldMat(), { seg: 40, center: true });
  disc.rotation.x = Math.PI / 2;
  g.add(disc);
  const ring = cyl(r * 0.8, r * 0.8, 0.004, mat(C.goldDark, { metalness: 0.4, roughness: 0.35 }), { seg: 40, center: true, at: [0, 0, 0.011] });
  ring.rotation.x = Math.PI / 2;
  g.add(ring);
  const face = cutout(r * 1.4, r * 1.4, 900, (c, cw, ch) => strokeText(c, sign, cw / 2, ch / 2 + 4, cw * 0.7, { fill: '#8A5A12' }));
  face.position.z = 0.017;
  g.add(face);
  return g;
}

/** The Case: the exchange rate locked. On a night-blue board, the euro and the dollar side by side, joined by a wooden
 *  bar with a light padlock over the joint: the rate fixed today, which will not move in six months. */
function lockedRate() {
  const g = new THREE.Group();
  const [W, H] = [0.62, 0.34];
  g.add(box(W, H, 0.025, mat(NIGHT_BLUE, { roughness: 0.6 }), { center: true, at: [0, 0, 0.0125] }));
  g.add(box(0.26, 0.035, 0.03, mat(C.wood, { roughness: 0.6 }), { center: true, at: [0, 0, 0.04] }));
  for (const [x, s] of [[-0.17, '€'], [0.17, '$']]) {
    const c = faceCoin(0.095, s);
    c.position.set(x, 0, 0.045);
    g.add(c);
  }
  // the padlock: a cream body with a little night-blue keyhole, and its shackle around the bar
  const light = mat('#F4EFE7', { roughness: 0.5 });
  g.add(box(0.085, 0.075, 0.04, light, { center: true, at: [0, -0.045, 0.07] }));
  g.add(box(0.014, 0.024, 0.004, NIGHT_BLUE_DARK, { center: true, at: [0, -0.05, 0.092] }));
  const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.009, 10, 24, Math.PI), mat(C.wood, { roughness: 0.5 }));
  shackle.position.set(0, -0.008, 0.07);
  g.add(shackle);
  return g;
}

/** The Field test: the suitcase back from a year abroad. A square cream case with wooden corners and handle, two
 *  night-blue straps, and three travel labels: the euro, the dollar and a drop of oil. */
function travelSuitcase() {
  const g = new THREE.Group();
  const [W, H, D] = [0.46, 0.34, 0.17];
  const wood = mat(C.wood, { roughness: 0.6 });
  g.add(box(W, H, D, mat('#F4EFE7', { roughness: 0.65 }), { at: [0, 0.004, 0] }));
  // wooden corners, the bottom ones a little lower: the case stands on them
  for (const x of [-W / 2 + 0.018, W / 2 - 0.018]) for (const y of [0, H - 0.027]) g.add(box(0.044, 0.035, D + 0.008, wood, { at: [x, y, 0] }));
  // the straps, round the case from the front over the top
  const strap = mat(NIGHT_BLUE, { roughness: 0.6 });
  for (const x of [-0.13, 0.13]) {
    g.add(box(0.036, H + 0.004, 0.006, strap, { at: [x, 0.002, D / 2 + 0.003] }));
    g.add(box(0.036, 0.006, D + 0.012, strap, { at: [x, H + 0.004, 0] }));
  }
  // the handle
  for (const x of [-0.055, 0.055]) g.add(box(0.02, 0.035, 0.03, wood, { at: [x, H + 0.004, 0] }));
  g.add(box(0.13, 0.022, 0.034, wood, { at: [0, H + 0.037, 0] }));
  // three labels between the straps
  const label = (bg, ink, draw, x, y, rot) => {
    const l = new THREE.Group();
    l.add(box(0.085, 0.085, 0.004, bg, { center: true }));
    const face = cutout(0.08, 0.08, 1000, (c, cw, ch) => draw(c, cw, ch, ink));
    face.position.z = 0.0045;
    l.add(face);
    l.position.set(x, y, D / 2 + 0.004);
    l.rotation.z = rot;
    g.add(l);
  };
  label(NIGHT_BLUE, '#FFFFFF', (c, cw, ch, ink) => strokeText(c, '€', cw / 2, ch / 2 + 3, 58, { fill: ink }), -0.04, 0.24, 0.12);
  label('#FCFAF6', NIGHT_BLUE, (c, cw, ch, ink) => strokeText(c, '$', cw / 2, ch / 2 + 3, 58, { fill: ink }), 0.05, 0.15, -0.1);
  label(NIGHT_BLUE_LIGHT, NIGHT_BLUE_DARK, (c, cw, ch, ink) => {
    c.fillStyle = ink;
    c.beginPath();
    c.moveTo(cw / 2, 12);
    c.quadraticCurveTo(cw / 2 + 28, 44, cw / 2 + 22, 54);
    c.arc(cw / 2, 52, 22, 0.1, Math.PI - 0.1);
    c.quadraticCurveTo(cw / 2 - 28, 44, cw / 2, 12);
    c.fill();
  }, -0.05, 0.08, -0.05);
  return g;
}

// ---------- the room ----------
/** The signed contract in a light wooden frame with a white mount, hanging on the wall. */
function contractFrame() {
  const g = new THREE.Group();
  const [w, h, t, rim] = [0.44, 0.56, 0.035, 0.03];
  g.add(box(w, h, 0.012, C.wood, { center: true, at: [0, 0, 0.006] }));
  g.add(squareRim(w, h, rim, t, mat(C.wood)));
  const mount = new THREE.Mesh(new THREE.PlaneGeometry(w - 2 * rim, h - 2 * rim), mat(C.white, { roughness: 0.9 }));
  mount.position.z = 0.014;
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.384), new THREE.MeshStandardMaterial({ map: contractTexture(), roughness: 0.85 }));
  paper.position.z = 0.016;
  g.add(mount, paper);
  return g;
}

/** Scales an object to fill its place: on a surface it stands on its base, on a wall it hangs centred. */
function fitInPlace(inner, [maxW, maxH, maxD = Infinity], wall) {
  const size = new THREE.Box3().setFromObject(inner).getSize(new THREE.Vector3());
  inner.scale.multiplyScalar(Math.min(maxW / size.x, maxH / size.y, maxD / size.z));
  const box = new THREE.Box3().setFromObject(inner);
  inner.position.x -= (box.min.x + box.max.x) / 2;
  if (wall) {
    inner.position.y -= (box.min.y + box.max.y) / 2;
    inner.position.z -= box.min.z;
  } else {
    inner.position.y -= box.min.y;
    inner.position.z -= (box.min.z + box.max.z) / 2;
  }
}

/** A shade open at top and bottom: four thin sides around a square. */
function squareShade(w, h, material) {
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(w, h), material);
    const a = (i * Math.PI) / 2;
    side.position.set(Math.sin(a) * (w / 2), h / 2, Math.cos(a) * (w / 2));
    side.rotation.y = a;
    g.add(side);
  }
  return g;
}

function pendant(x, z, lampMats) {
  const g = new THREE.Group();
  g.add(box(0.012, 0.36, 0.012, C.navy, { at: [0, -0.36, 0] }));
  g.add(box(0.3, 0.012, 0.3, C.navy, { at: [0, -0.43, 0] }));
  const shade = squareShade(0.3, 0.12, mat(C.navy, { side: THREE.DoubleSide }));
  shade.position.y = -0.55;
  g.add(shade);
  const bulbMat = mat('#FFF4C9', { emissive: '#FFD27A', emissiveIntensity: 0.6 });
  lampMats.push(bulbMat);
  g.add(box(0.12, 0.03, 0.12, bulbMat, { at: [0, -0.58, 0] }));
  g.position.set(x, B.ih, z);
  return g;
}

/** The floor's colour on the walls, rising one stage at a time from the floor up. */
function wallPaint(room, color) {
  const W = B.xR - 0.1 - B.inL;
  const D = B.zF - B.corner - B.inB; // the left wall stops at the glass corner
  const paint = mat(color, { roughness: 0.8 });
  const trim = mat(new THREE.Color(color).multiplyScalar(0.93).getStyle(), { roughness: 0.8 });
  const parts = [];
  const add = (w, rotY, x, z) => {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.rotation.y = rotY;
    const panel = new THREE.Mesh(new THREE.PlaneGeometry(w, 1), paint);
    panel.position.y = 0.5;
    const band = new THREE.Mesh(new THREE.PlaneGeometry(w, 0.03), trim);
    band.position.z = 0.001;
    g.add(panel, band);
    room.add(g);
    parts.push({ g, panel, band });
  };
  add(W, 0, (B.inL + B.xR - 0.1) / 2, B.inB + 0.005);
  add(D, Math.PI / 2, B.inL + 0.005, B.inB + D / 2);
  let level = 0;
  const set = (k) => {
    level = k;
    const h = Math.max(0.0001, k * B.ih);
    for (const p of parts) {
      p.panel.scale.y = h;
      p.panel.position.y = h / 2;
      p.band.position.y = h - 0.015;
      p.g.visible = k > 0;
    }
  };
  return { set, get: () => level };
}

/** Piano 1: your office. Your desk in the middle, a low cabinet with a plant, the signed contract on the wall. */
function furnishDirezione(room, world) {
  // your desk in the middle
  const desk = squareDesk();
  desk.position.set(0.35, 0, 0);
  room.add(desk);
  const chair = squareChair();
  chair.position.set(0.35, 0, -0.62);
  room.add(chair);
  // nothing else on the desk: it holds the floor's objects (the laptop is gone, 25/10/2026: seen from behind it was a grey panel)
  room.add(barPendant(0.35, 0.02, world.roomLampMats));

  // a low sideboard on the right of the back wall, plants, the signed contract
  const board = sideboard();
  board.position.set(1.35, 0, -0.99);
  room.add(board);
  // the plants are made like the trees outside (25/10/2026): a small bush on the cabinet, a slim tree in the back corner
  const bush = pottedBush();
  bush.position.set(1.62, 0.49, -1.0);
  room.add(bush);
  const tree = pottedTree();
  tree.position.set(-1.92, 0, -0.98);
  room.add(tree);
  // the contract hangs over the sideboard, facing you (25/10/2026: on the left wall it was seen edge-on and cut off)
  const contract = contractFrame();
  contract.position.set(1.3, 1.12, B.inB + 0.01);
  room.add(contract);
}

/** The low sideboard: a wooden top that juts out at both ends like the desk's, a cream body with three doors and
 *  the desk's wooden pulls, on a plinth set back so it seems to float. Its top stays at the same height as before. */
function sideboard() {
  const g = new THREE.Group();
  const [w, d, plinth, top] = [1.1, 0.4, 0.05, 0.035];
  const bodyH = 0.49 - plinth - top;
  g.add(box(w - 0.12, plinth, d - 0.1, '#D9CFC0', { at: [0, 0, -0.02] }));
  g.add(box(w, bodyH, d, '#F4EFE7', { at: [0, plinth, 0] }));
  g.add(box(w + 0.12, top, d + 0.04, C.wood, { at: [0, plinth + bodyH, 0.01] }));
  const front = d / 2 + 0.003;
  for (const x of [-w / 6, w / 6]) g.add(box(0.01, bodyH - 0.04, 0.006, C.stoneDark, { at: [x, plinth + 0.02, front] }));
  for (const x of [-w / 3, 0, w / 3]) g.add(box(0.13, 0.024, 0.024, C.woodDark, { center: true, at: [x, plinth + bodyH - 0.07, front + 0.012] }));
  return g;
}

/** A smooth crown like the trees outside (10/11/2026: they turned smooth on 30/10, the plants inside had stayed
 *  faceted, and close up the facets looked cheap). */
function crown(r, at, stretch = 1, leaf = LEAVES[0]) {
  return leafBall(r, at, leafMat(Math.max(0, LEAVES.indexOf(leaf))), [1, stretch, 1]);
}

/** A square white pot with its soil showing. */
function squarePot(w, h) {
  const g = new THREE.Group();
  g.add(box(w, h, w, C.white));
  g.add(box(w - 0.03, 0.01, w - 0.03, '#8A6A50', { at: [0, h - 0.006, 0] }));
  return g;
}

/** A small bush in its pot: three crowns of different greens spilling over the rim. */
function pottedBush() {
  const g = squarePot(0.17, 0.15);
  g.add(crown(0.1, [0, 0.15 + 0.1, 0]));
  g.add(crown(0.075, [-0.085, 0.15 + 0.05, 0.03], 1, LEAVES[1]));
  g.add(crown(0.07, [0.09, 0.15 + 0.045, -0.02], 1, LEAVES[2]));
  g.rotation.y = 0.5;
  return g;
}

/** A slim tree in its pot: a thin round trunk and a tall smooth crown, like the column trees in front of the building. */
function pottedTree() {
  const g = squarePot(0.26, 0.28);
  g.add(cyl(0.022, 0.028, 0.4, TRUNK, { seg: 16, at: [0, 0.27, 0] }));
  g.add(crown(0.2, [0, 0.28 + 0.34 + 0.26, 0], 1.55, LEAVES[1]));
  g.rotation.y = 0.35;
  return g;
}

/** Your desk: a thick wooden top that turns down into a wooden side on the right, one L like the floors coming out
 *  of the core; on the left it rests on a cream drawer block set in, so the top juts out past it. A panel set back
 *  in between. Same size as before, so the objects keep their places on it. */
function squareDesk() {
  const g = new THREE.Group();
  const [w, d, t] = [1.2, 0.64, 0.07];
  const legH = DESK_TOP - t;
  g.add(box(w, t, d, C.wood, { at: [0, legH, 0] }));
  g.add(box(0.07, legH, d - 0.06, C.wood, { at: [w / 2 - 0.1, 0, 0] }));
  // two drawers, a groove between them and a wooden pull on each
  const [bx, bw, bd] = [-w / 2 + 0.3, 0.38, d - 0.1];
  g.add(box(bw, legH, bd, '#F4EFE7', { at: [bx, 0, 0] }));
  const front = bd / 2 + 0.003;
  g.add(box(bw - 0.03, 0.01, 0.006, C.stoneDark, { at: [bx, legH * 0.5, front] }));
  for (const y of [legH * 0.75, legH * 0.25]) g.add(box(0.13, 0.024, 0.024, C.woodDark, { center: true, at: [bx, y, front + 0.012] }));
  const [left, right] = [bx + bw / 2, w / 2 - 0.135];
  g.add(box(right - left, 0.3, 0.025, '#EAE2D5', { at: [(left + right) / 2, legH - 0.3, -0.06] }));
  return g;
}

/** Your chair, behind the desk and turned towards you. Above the desk only its back shows: until 10/11/2026 two tall
 *  posts and a wooden rail framed a cream panel, and from the room it read as a picture frame (Davide's «micro»).
 *  Now the back is one thick upholstered cushion, square-edged, with two stitched seams across it, held from behind
 *  by two short wooden posts that the cushion hides, in a wooden shell that outlines it; the legs stop under the seat. */
function squareChair() {
  const g = new THREE.Group();
  const cushion = mat('#EADFCF', { roughness: 0.85 });
  const seamMat = mat('#D9CBB6', { roughness: 0.9 });
  for (const x of [-0.19, 0.19]) {
    for (const z of [0.17, -0.17]) g.add(box(0.045, 0.36, 0.045, C.woodDark, { at: [x, 0, z] }));
    g.add(box(0.04, 0.4, 0.04, C.woodDark, { at: [x * 0.7, 0.42, -0.23] })); // behind the back, out of sight
  }
  g.add(box(0.46, 0.035, 0.44, C.wood, { at: [0, 0.36, 0] }));
  g.add(box(0.44, 0.07, 0.42, cushion, { at: [0, 0.395, 0] }));
  // the back: a wooden shell a little wider than the cushion in front of it, so a band of wood outlines the cushion
  // against the wall; the cushion leans back a little, its two seams on the side facing you
  const back = new THREE.Group();
  back.add(box(0.48, 0.42, 0.04, C.wood, { center: true, at: [0, 0, -0.03] }));
  back.add(box(0.43, 0.37, 0.07, cushion, { center: true, at: [0, -0.01, 0.02] }));
  for (const y of [-0.07, 0.05]) back.add(box(0.38, 0.008, 0.004, seamMat, { center: true, at: [0, y, 0.0565] }));
  back.position.set(0, 0.72, -0.19);
  back.rotation.x = -0.08;
  g.add(back);
  return g;
}

/** A long lamp over your desk: a wooden bar with a warm strip of light along its lower half, on two pale cables. */
function barPendant(x, z, lampMats) {
  const g = new THREE.Group();
  const drop = 0.4;
  for (const dx of [-0.3, 0.3]) g.add(box(0.008, drop, 0.008, C.frame, { at: [dx, -drop, 0] }));
  g.add(box(0.84, 0.035, 0.12, C.wood, { at: [0, -drop - 0.035, 0] }));
  const glow = mat('#FFF4D6', { emissive: '#FFD27A', emissiveIntensity: 0.6 });
  lampMats.push(glow);
  g.add(box(0.8, 0.035, 0.1, glow, { at: [0, -drop - 0.07, 0] }));
  g.position.set(x, B.ih, z);
  return g;
}

/** A snake plant in a square white pot: pointed blades in the three greens of the trees outside, nearly upright, so
 *  it stays narrow and never leaves the room's view. */
function snakePlant() {
  const pot = 0.26;
  const g = squarePot(0.24, pot);
  // [turn, lean, height, green, x, z]
  const blades = [
    [0.2, 0.04, 0.78, 1, 0, 0],
    [1.4, -0.1, 0.62, 0, -0.045, 0.03],
    [2.5, 0.12, 0.7, 2, 0.05, -0.02],
    [-0.9, 0.14, 0.52, 0, 0.03, 0.05],
    [3.6, -0.14, 0.46, 1, -0.04, -0.05],
    [0.9, 0.2, 0.4, 2, 0.06, 0.04],
  ];
  for (const [turn, lean, h, k, x, z] of blades) {
    const w = 0.075;
    const s = new THREE.Shape();
    s.moveTo(-w / 2, 0);
    s.lineTo(w / 2, 0);
    s.lineTo(w * 0.32, h * 0.72);
    s.lineTo(0, h);
    s.lineTo(-w * 0.32, h * 0.72);
    s.closePath();
    const geo = new THREE.ExtrudeGeometry(s, { depth: 0.014, bevelEnabled: false });
    geo.translate(0, 0, -0.007);
    const blade = new THREE.Mesh(geo, mat(LEAVES[k], { roughness: 0.85, flatShading: true }));
    blade.position.set(x, pot - 0.01, z);
    blade.rotation.set(lean, turn, 0, 'YXZ');
    blade.castShadow = true;
    g.add(blade);
  }
  return g;
}

/** A tall plant in the front left corner, by the glass: the same on every floor, a rhythm along the corner. Far
 *  enough in that the room's view shows it whole (at -1.9 half of it fell off the left edge of the phone). */
function cornerPlant() {
  const plant = snakePlant();
  plant.position.set(-1.66, 0, 1.12);
  return plant;
}

/** Piano 2: a bank counter. A long counter crosses the room with a glass window in the
 *  middle; behind it the round door of the vault, closed, and a low cabinet by the passage. */
function furnishTesoreria(room, world) {
  const blue = mat(SKY, { roughness: 0.45 });
  // the counter, from the left wall to the passage on the right
  const x0 = B.inL;
  const x1 = 1.3;
  const z = -0.1;
  const d = 0.42;
  const cx = (x0 + x1) / 2;
  room.add(box(x1 - x0, COUNTER_TOP - 0.035, d, '#F4EFE7', { at: [cx, 0, z] }));
  room.add(box(x1 - x0 + 0.03, 0.035, d + 0.06, C.wood, { at: [cx, COUNTER_TOP - 0.035, z + 0.02] }));
  room.add(box(x1 - x0 - 0.04, 0.03, 0.012, blue, { at: [cx, COUNTER_TOP * 0.66, z + d / 2 + 0.004] }));
  room.add(box(x1 - x0 - 0.06, 0.05, 0.02, C.stoneDark, { at: [cx, 0, z + d / 2 - 0.03] }));

  // the glass window over the middle of the counter, with the slot where money passes
  const glass = new THREE.MeshStandardMaterial({ color: C.glass, transparent: true, opacity: 0.22, roughness: 0.05, metalness: 0.2, depthWrite: false });
  const frame = mat(C.frame, { roughness: 0.55 });
  const g0 = -0.95;
  const g1 = 0.35;
  const w0 = -0.47; // the slot, under the middle pane
  const w1 = -0.13;
  const gh = 0.44;
  const slotH = 0.09;
  const pane = (a, b, y0, y1) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(b - a, y1 - y0), glass);
    m.position.set((a + b) / 2, COUNTER_TOP + (y0 + y1) / 2, z);
    m.renderOrder = 2;
    room.add(m);
  };
  pane(g0, w0, 0, gh);
  pane(w1, g1, 0, gh);
  pane(w0, w1, slotH, gh);
  for (const x of [g0, w0, w1, g1]) room.add(box(0.03, gh, 0.03, frame, { at: [x, COUNTER_TOP, z] }));
  room.add(box(g1 - g0 + 0.03, 0.03, 0.04, frame, { at: [(g0 + g1) / 2, COUNTER_TOP + gh - 0.015, z] }));
  room.add(box(w1 - w0, 0.02, 0.035, frame, { at: [(w0 + w1) / 2, COUNTER_TOP + slotH - 0.01, z] }));

  // the vault door on the back wall, closed
  const vault = vaultDoor(blue);
  vault.position.set(0.5, 0.9, B.inB);
  room.add(vault);

  // the low cabinet by the passage, where the safe will stand
  room.add(box(0.7, 0.6, 0.5, '#F4EFE7', { at: [1.66, 0, -0.95] }));
  room.add(box(0.73, 0.025, 0.53, C.wood, { at: [1.66, 0.6, -0.95] }));

  room.add(pendant(-0.3, 0.05, world.roomLampMats));
  room.add(cornerPlant());
}

/** The round door of a vault, set in the wall: light steel, bolts around the edge, the wheel in the floor's blue. */
function vaultDoor(blue) {
  const g = new THREE.Group();
  const R = 0.56;
  const steel = mat('#E6E2DB', { roughness: 0.42, metalness: 0.15 });
  const steelDark = mat('#CFC9BF', { roughness: 0.5, metalness: 0.15 });
  g.add(disc(R + 0.07, 0.04, steelDark, [0, 0, 0.02]));
  g.add(disc(R, 0.08, steel, [0, 0, 0.06]));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(R * 0.76, 0.014, 10, 64), steelDark);
  ring.position.z = 0.1;
  g.add(ring);
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    g.add(disc(0.022, 0.02, steelDark, [Math.cos(a) * R * 0.89, Math.sin(a) * R * 0.89, 0.105]));
  }
  // the wheel: a hub, three spokes with round grips, a rim
  g.add(disc(0.07, 0.04, blue, [0, 0, 0.12]));
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI;
    const spoke = rbox(0.024, 0.4, 0.024, blue, { center: true, r: 0.01, at: [0, 0, 0.15] });
    spoke.rotation.z = a;
    g.add(spoke);
    for (const s of [-1, 1]) g.add(sphere(0.03, blue, [-Math.sin(a) * 0.2 * s, Math.cos(a) * 0.2 * s, 0.15], 16));
  }
  const rim = new THREE.Mesh(new THREE.TorusGeometry(0.17, 0.014, 10, 48), blue);
  rim.position.z = 0.15;
  g.add(rim);
  // the hinge on the right
  g.add(rbox(0.1, 0.36, 0.08, steelDark, { center: true, r: 0.03, at: [R + 0.03, 0, 0.06] }));
  return g;
}

/** The title screen of an invented game, in warm neutrals (the lilac stays on the floor's objects): a cream sky, a
 *  pale sun, wooden hills, three platforms and a star. */
function screenTexture() {
  return canvasTexture(512, 288, (g, w, h) => {
    const sky = g.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#E9E1D3');
    sky.addColorStop(1, '#FAF7F1');
    g.fillStyle = sky;
    g.fillRect(0, 0, w, h);
    g.fillStyle = '#FFFBF3';
    g.beginPath();
    g.arc(400, 72, 34, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = '#DDC4A2';
    g.beginPath();
    g.ellipse(120, h + 40, 220, 120, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = C.wood;
    g.beginPath();
    g.ellipse(420, h + 60, 240, 120, 0, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = C.woodDark;
    for (const [x, y, pw] of [
      [70, 170, 90],
      [210, 130, 110],
      [370, 168, 80],
    ]) {
      g.fillRect(x, y, pw, 14);
    }
    drawStar(g, 265, 104, 18, C.woodDark);
  });
}

/** The glow of an earned object (28/10/2026): a soft halo in the floor's colour around it, so you see what you can
 *  touch. A flat sheet just in front of the wall behind a hanging object; behind an object standing on something, a
 *  sheet that rises from its foot and glows on the sides and above. Its strength is set from main.js, every frame. */
const GLOW = { soft: 0.16, lift: 0.004 };
/** The floor's colour, but a dark one (indigo, wine, plum, night blue) lightened: a dark halo reads as a shadow. */
function glowColor(color) {
  const c = new THREE.Color(color);
  const hsl = c.getHSL({});
  return c.setHSL(hsl.h, hsl.s, Math.max(hsl.l, 0.58));
}
function makeGlow(s, room, color) {
  const box = new THREE.Box3().setFromObject(s.obj);
  const lo = room.worldToLocal(box.min.clone());
  const hi = room.worldToLocal(box.max.clone());
  const [w, h] = [hi.x - lo.x, hi.y - lo.y];
  const m = GLOW.soft;
  const wall = s.place.wall;
  // standing: the glow starts at the surface it stands on, so nothing shines from under the furniture
  const [y0, y1] = wall ? [lo.y - m, hi.y + m] : [lo.y, hi.y + m];
  // standing: just in front of the first thing behind it (the wall, the back of a niche or of a cabinet)
  let z = lo.z + GLOW.lift;
  if (!wall) {
    const from = new THREE.Vector3((box.min.x + box.max.x) / 2, (box.min.y + box.max.y) / 2, box.min.z);
    const behind = room.children.filter((o) => o !== s.holder && !o.isLight);
    const hit = new THREE.Raycaster(from, new THREE.Vector3(0, 0, -1), 0, 2).intersectObjects(behind, true)[0];
    const back = hit ? room.worldToLocal(hit.point.clone()).z : B.inB;
    z = Math.max(lo.z - 0.02, back + GLOW.lift);
  }
  const size = new THREE.Vector2(w + 2 * m, y1 - y0);
  // the shape that glows: the object's outline, rounded; standing, it goes on under the surface
  const inner = wall ? [0, 0, w / 2, h / 2] : [0, (lo.y - m + hi.y) / 2 - (y0 + y1) / 2, w / 2, (h + m) / 2];
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: glowColor(color) },
      uOpacity: { value: 0 },
      uSize: { value: size },
      uBox: { value: new THREE.Vector4(...inner) },
      uSoft: { value: m },
    },
    vertexShader: 'varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
    fragmentShader: `
      uniform vec3 uColor; uniform float uOpacity; uniform vec2 uSize; uniform vec4 uBox; uniform float uSoft; varying vec2 vUv;
      void main() {
        vec2 p = (vUv - 0.5) * uSize - uBox.xy;
        float r = min(min(uBox.z, uBox.w), uSoft);
        vec2 q = abs(p) - uBox.zw + r;
        float d = length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
        float a = 1.0 - smoothstep(0.0, uSoft, d);
        gl_FragColor = vec4(uColor, uOpacity * a * (0.4 + 0.6 * a));
        #include <colorspace_fragment>
      }`,
    transparent: true,
    depthWrite: false,
  });
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(size.x, size.y), material);
  glow.position.set((lo.x + hi.x) / 2, (y0 + y1) / 2, z);
  glow.raycast = () => {}; // the touch goes to the object, never to its glow
  glow.renderOrder = 1; // after the wall's paint, also see-through, or the paint may cover it
  glow.visible = false;
  return glow;
}

/** A low cube seat: a wooden plinth set back underneath, the fabric block, a cushion on top a shade lighter. The plinth
 *  and the cushion make it a seat, not a box. */
function pouf(x, z, color, cushion) {
  const p = new THREE.Group();
  p.add(box(0.42, 0.04, 0.42, C.wood));
  p.add(box(0.5, 0.24, 0.5, mat(color, { roughness: 0.85 }), { at: [0, 0.04, 0] }));
  p.add(box(0.46, 0.07, 0.46, mat(cushion, { roughness: 0.9 }), { at: [0, 0.28, 0] }));
  p.position.set(x, 0, z);
  p.rotation.y = x * 0.15;
  return p;
}

/** Piano 3: the play-test room, where the department tries its games. A big screen on the back wall over a low
 *  cabinet, two poufs and a low table in front of it, a small round table on the left. */
function furnishGaming(room, world) {
  // the screen, lit by the game's title
  const map = screenTexture();
  const tv = new THREE.Group();
  tv.add(box(1.56, 0.9, 0.05, C.frame, { center: true }));
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.48, 0.82), new THREE.MeshStandardMaterial({ map, emissive: '#FFFFFF', emissiveMap: map, emissiveIntensity: 0.55, roughness: 0.3 }));
  screen.position.z = 0.026;
  tv.add(screen);
  tv.position.set(0.6, 1.02, B.inB + 0.03);
  room.add(tv);
  // the low cabinet under it, with one controller
  room.add(box(1.7, 0.28, 0.36, '#F4EFE7', { at: [0.6, 0, -1.02] }));
  room.add(box(1.73, 0.025, 0.39, C.wood, { at: [0.6, 0.28, -1.02] }));
  const pad = new THREE.Group();
  const ink = mat(C.navy, { roughness: 0.5 });
  pad.add(rbox(0.14, 0.03, 0.07, ink, { r: 0.014 }));
  for (const s of [-1, 1]) pad.add(sphere(0.03, ink, [s * 0.06, 0.012, 0.025], 14));
  pad.position.set(1.2, 0.305, -0.98);
  pad.rotation.y = -0.4;
  room.add(pad);
  // the low table in front of the screen, between two poufs
  room.add(box(0.7, 0.26, 0.34, '#F4EFE7', { at: [0.6, 0, 0.0] }));
  room.add(box(0.92, 0.05, 0.52, C.wood, { at: [0.6, 0.26, 0.0] }));
  room.add(pouf(-0.35, 0.32, '#E6D9C4', '#F4EDE2'), pouf(1.6, 0.3, '#D6C3A3', '#E8DCC6'));
  // the small table on the left: a wooden top standing proud of a narrower cream pedestal, at the scratch card's height
  room.add(box(0.24, 0.385, 0.24, '#F4EFE7', { at: [-1.15, 0, 0.35] }));
  room.add(box(0.42, 0.035, 0.42, C.wood, { at: [-1.15, 0.385, 0.35] }));
  room.add(cornerPlant());
}

/** A photographer's backdrop: a white sheet that comes down the wall and curves into the floor, `width` wide. */
function backdrop(width) {
  // the profile from the side: down the wall, a quarter circle, along the floor (u towards you, v up)
  const R = 0.38;
  const top = 1.5;
  const run = 0.6;
  const pts = [];
  for (let i = 0; i <= 6; i++) pts.push([0, top - ((top - R) * i) / 6]);
  for (let i = 1; i <= 12; i++) {
    const a = Math.PI - (i / 12) * (Math.PI / 2);
    pts.push([R + Math.cos(a) * R, R - Math.sin(a) * R]);
  }
  for (let i = 1; i <= 4; i++) pts.push([R + (run * i) / 4, 0]);
  // the sheet's thickness, laid along the inner normal of the profile
  const t = 0.02;
  const inner = pts.map((p, i) => {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(pts.length - 1, i + 1)];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    return [p[0] - ((b[1] - a[1]) / len) * t, p[1] + ((b[0] - a[0]) / len) * t];
  });
  const s = new THREE.Shape();
  pts.forEach(([u, v], i) => (i ? s.lineTo(u, v) : s.moveTo(u, v)));
  for (let i = inner.length - 1; i >= 0; i--) s.lineTo(...inner[i]);
  const geo = new THREE.ExtrudeGeometry(s, { depth: width, bevelEnabled: false, curveSegments: 4 });
  const m = new THREE.Mesh(geo, mat('#FFFFFF', { roughness: 0.75, emissive: '#FFFFFF', emissiveIntensity: 0.12 }));
  m.rotation.y = -Math.PI / 2; // the profile's u runs towards you, the width runs to the left
  return m;
}

/** A studio light: a tripod and a pole of light wood, a white umbrella turned towards the set. Only the lamp's
 *  small back stays dark: thin lines are light (rule 3 of the elements). */
function studioLight(x, z, lampMats) {
  const g = new THREE.Group();
  const ink = mat(C.navy, { roughness: 0.5 });
  const wood = mat(C.wood, { roughness: 0.7 });
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const leg = cyl(0.013, 0.013, 0.42, wood, { seg: 6, center: true, at: [Math.cos(a) * 0.1, 0.19, Math.sin(a) * 0.1] });
    leg.rotation.set(Math.sin(a) * 0.45, 0, -Math.cos(a) * 0.45);
    g.add(leg);
  }
  g.add(cyl(0.016, 0.016, 1.0, wood, { seg: 8, at: [0, 0.35, 0] })); // a white pole vanished on the white backdrop
  const head = new THREE.Group();
  head.position.y = 1.32;
  g.add(head);
  const umbrella = cyl(0.03, 0.26, 0.16, mat('#FFFFFF', { side: THREE.DoubleSide, roughness: 0.8 }), { seg: 24, center: true, open: true });
  umbrella.rotation.x = -Math.PI / 2;
  umbrella.position.z = 0.05;
  head.add(umbrella);
  const bulb = mat('#FFF6E0', { emissive: '#FFE2A8', emissiveIntensity: 0.6 });
  lampMats.push(bulb);
  head.add(sphere(0.035, bulb, [0, 0, 0.0], 12));
  head.add(box(0.06, 0.06, 0.08, ink, { center: true, at: [0, 0, -0.05] }));
  g.position.set(x, 0, z);
  return { g, head };
}

/** Piano 4: the photo studio, where ads are made to look perfect. A white backdrop on the right with a pedestal,
 *  two lights and a camera turned on it; the campaign poster on the left of the back wall; a cart by the set. */
function furnishMarketing(room, world) {
  const ink = mat(C.navy, { roughness: 0.5 });
  const sweep = backdrop(1.9);
  sweep.position.set(1.9, 0.016, B.inB + 0.01); // just above the boards
  room.add(sweep);
  const target = new THREE.Vector3(0.95, 0.62, -0.55);
  room.add(box(0.4, 0.44, 0.4, mat('#FFFFFF', { roughness: 0.7 }), { at: [0.95, 0.02, -0.55] }));
  // two lights turned on the pedestal
  for (const [x, z] of [
    [-0.15, -0.05],
    [2.0, 0.05],
  ]) {
    const l = studioLight(x, z, world.roomLampMats);
    room.add(l.g);
    // the open side of the umbrella (+z) faces the pedestal
    l.head.rotation.set(Math.atan2(1.32 - target.y, Math.hypot(target.x - x, target.z - z)), Math.atan2(target.x - x, target.z - z), 0, 'YXZ');
  }
  // the camera on its tripod of light wood, to the side, turned on the set; the camera itself is small, it stays dark
  const wood = mat(C.wood, { roughness: 0.7 });
  const cam = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.5;
    const leg = cyl(0.013, 0.013, 0.82, wood, { seg: 6, center: true, at: [Math.cos(a) * 0.12, 0.4, Math.sin(a) * 0.12] });
    leg.rotation.set(Math.sin(a) * 0.15, 0, -Math.cos(a) * 0.15);
    cam.add(leg);
  }
  const body = new THREE.Group();
  body.position.y = 0.86;
  body.add(box(0.17, 0.11, 0.09, ink, { center: true }));
  body.add(box(0.05, 0.03, 0.05, ink, { center: true, at: [-0.04, 0.065, 0] }));
  const lens = cyl(0.04, 0.045, 0.09, mat('#2B3245', { roughness: 0.3 }), { seg: 24, center: true, at: [0.02, 0, -0.08] });
  lens.rotation.x = Math.PI / 2;
  body.add(lens);
  body.add(disc(0.03, 0.004, mat(C.glass, { roughness: 0.1 }), [0.02, 0, -0.126]));
  cam.add(body);
  cam.position.set(1.62, 0, 0.55);
  cam.rotation.y = Math.atan2(-(target.x - 1.62), -(target.z - 0.55)); // the lens (-z) looks at the set
  room.add(cam);
  // the cart by the set: two white shelves on posts of light wood, small dark wheels
  const cart = new THREE.Group();
  for (const [x, z] of [
    [-0.28, -0.18],
    [0.28, -0.18],
    [-0.28, 0.18],
    [0.28, 0.18],
  ]) {
    cart.add(box(0.03, 0.56, 0.03, wood, { at: [x, 0.05, z] }));
    const wheel = cyl(0.03, 0.03, 0.02, ink, { seg: 16, center: true, at: [x, 0.03, z] });
    wheel.rotation.z = Math.PI / 2;
    cart.add(wheel);
  }
  cart.add(box(0.62, 0.025, 0.42, '#FBF8F3', { at: [0, 0.59, 0] }));
  cart.add(box(0.62, 0.025, 0.42, '#FBF8F3', { at: [0, 0.2, 0] }));
  cart.position.set(-0.72, 0, 0.35);
  room.add(cart);
  room.add(cornerPlant());
}

/** A big round wall clock: white face, dark rim and marks, the hands at ten past ten, a mint centre. */
function wallClock() {
  const g = new THREE.Group();
  const ink = mat(C.navy, { roughness: 0.5 });
  g.add(disc(0.4, 0.05, C.wood, [0, 0, 0.025])); // the rim is big: wood, not dark; the small marks and hands stay dark
  g.add(disc(0.36, 0.01, mat('#FFFFFF', { roughness: 0.5 }), [0, 0, 0.052]));
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const big = i % 3 === 0;
    const mark = rbox(big ? 0.022 : 0.012, big ? 0.06 : 0.035, 0.008, ink, { center: true, r: 0.004, at: [Math.sin(a) * 0.3, Math.cos(a) * 0.3, 0.06] });
    mark.rotation.z = -a;
    g.add(mark);
  }
  for (const [len, w, a] of [
    [0.17, 0.026, (-60 * Math.PI) / 180],
    [0.26, 0.018, (60 * Math.PI) / 180],
  ]) {
    const hand = new THREE.Group();
    hand.add(rbox(w, len, 0.008, ink, { center: true, r: w / 2 - 0.001, at: [0, len / 2 - 0.03, 0] }));
    hand.position.z = 0.066;
    hand.rotation.z = -a;
    g.add(hand);
  }
  g.add(disc(0.025, 0.012, mat(MEADOW, { roughness: 0.5 }), [0, 0, 0.076]));
  return g;
}

/** A telescope on its tripod of light wood, pointed out of the glass wall and up: the department that looks far
 *  ahead. The mount and the eyepiece are small: they stay dark. */
function telescope() {
  const g = new THREE.Group();
  const ink = mat(C.navy, { roughness: 0.5 });
  const wood = mat(C.wood, { roughness: 0.7 });
  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2 + 0.3;
    const leg = cyl(0.015, 0.015, 0.92, wood, { seg: 8, center: true, at: [Math.cos(a) * 0.15, 0.44, Math.sin(a) * 0.15] });
    leg.rotation.set(Math.sin(a) * 0.32, 0, -Math.cos(a) * 0.32);
    g.add(leg);
  }
  g.add(rbox(0.08, 0.07, 0.08, ink, { center: true, r: 0.02, at: [0, 0.9, 0] }));
  const tube = new THREE.Group();
  tube.position.y = 0.97;
  tube.rotation.z = 0.42;
  g.add(tube);
  const along = (m) => {
    m.rotation.z = -Math.PI / 2; // the cylinder's axis runs along +x
    return m;
  };
  tube.add(along(cyl(0.07, 0.07, 0.72, mat('#FFFFFF', { roughness: 0.45 }), { seg: 32, center: true })));
  tube.add(along(cyl(0.082, 0.082, 0.1, mat(MEADOW, { roughness: 0.5 }), { seg: 32, center: true, at: [0.32, 0, 0] })));
  tube.add(along(cyl(0.077, 0.077, 0.012, ink, { seg: 32, center: true, at: [0.372, 0, 0] })));
  tube.add(along(cyl(0.024, 0.03, 0.12, ink, { seg: 16, center: true, at: [-0.41, 0, 0] })));
  tube.add(along(cyl(0.018, 0.018, 0.18, ink, { seg: 12, center: true, at: [0.02, 0.095, 0] })));
  tube.add(rbox(0.04, 0.03, 0.03, ink, { center: true, r: 0.008, at: [0.02, 0.075, 0] }));
  return g;
}

/** A square armchair: a block seat, solid block arms, a straight back, on short square wooden legs. */
function armchair(color) {
  const g = new THREE.Group();
  const fabric = mat(color, { roughness: 0.85 });
  g.add(box(0.64, 0.2, 0.58, fabric, { at: [0, 0.1, 0] }));
  g.add(box(0.64, 0.46, 0.17, fabric, { at: [0, 0.24, -0.23] }));
  for (const s of [-1, 1]) g.add(box(0.15, 0.28, 0.58, fabric, { at: [s * 0.25, 0.2, 0] }));
  g.add(box(0.36, 0.08, 0.42, mat('#F4EDE2', { roughness: 0.9 }), { at: [0, 0.29, 0.05] }));
  for (const [x, z] of [
    [-0.26, -0.23],
    [0.26, -0.23],
    [-0.26, 0.23],
    [0.26, 0.23],
  ])
    g.add(box(0.035, 0.1, 0.035, C.wood, { at: [x, 0, z] }));
  return g;
}

/** A floor lamp with a square shade, its base and pole of light wood. */
function floorLamp(lampMats) {
  const g = new THREE.Group();
  const wood = mat(C.wood, { roughness: 0.7 });
  g.add(box(0.24, 0.03, 0.24, wood));
  g.add(box(0.03, 1.1, 0.03, wood, { at: [0, 0.03, 0] }));
  const shade = squareShade(0.3, 0.2, mat('#E8D6B4', { side: THREE.DoubleSide, roughness: 0.8, emissive: '#FFE7BD', emissiveIntensity: 0.12 }));
  shade.position.y = 1.06;
  g.add(shade);
  const bulb = mat('#FFF4C9', { emissive: '#FFD27A', emissiveIntensity: 0.6 });
  lampMats.push(bulb);
  g.add(box(0.08, 0.08, 0.08, bulb, { at: [0, 1.09, 0] }));
  return g;
}

/** Piano 5: the observatory, where the department looks far ahead. A telescope pointed out of the glass, a big clock
 *  on the back wall, an armchair with a floor lamp and a round table, a low bookcase under the Case's panel. */
function furnishPianificazione(room, world) {
  const clock = wallClock();
  clock.position.set(0.6, 1.05, B.inB);
  room.add(clock);
  const scope = telescope();
  scope.position.set(1.6, 0, 0.0);
  room.add(scope);
  const chair = armchair('#D6C3A3');
  chair.position.set(-0.35, 0, 0.2);
  chair.rotation.y = 0.45;
  room.add(chair);
  const lamp = floorLamp(world.roomLampMats);
  lamp.position.set(-0.3, 0, -0.62); // behind the armchair, between the panel and the clock
  room.add(lamp);
  // the square table by the armchair, where the hourglass will stand: a wooden top on four square legs of light wood
  const wood = mat(C.wood, { roughness: 0.7 });
  for (const [dx, dz] of [
    [-0.19, -0.19],
    [0.19, -0.19],
    [-0.19, 0.19],
    [0.19, 0.19],
  ])
    room.add(box(0.04, 0.405, 0.04, wood, { at: [0.4 + dx, 0, 0.35 + dz] }));
  room.add(box(0.48, 0.035, 0.48, C.wood, { at: [0.4, 0.405, 0.35] }));
  // the low bookcase under the panel, a few books standing on its right (the mint stays on the floor's objects)
  room.add(box(1.05, 0.44, 0.32, '#F4EFE7', { at: [-1.3, 0, -1.03] }));
  room.add(box(1.08, 0.03, 0.35, C.wood, { at: [-1.3, 0.44, -1.03] }));
  const spines = [C.cream, C.navy, '#FFFFFF', C.wood, C.navy];
  spines.forEach((c, i) => {
    const h = 0.18 + ((i * 37) % 5) / 100;
    const book = box(0.04, h, 0.17, mat(c, { roughness: 0.7 }), { at: [-1.05 + i * 0.045, 0.47, -1.03] });
    if (i === 4) {
      book.rotation.z = -0.35;
      book.position.x += 0.03;
    }
    room.add(book);
  });
  room.add(cornerPlant());
}

/** The long desk of the payroll office: a wooden top on two cream drawer blocks set in from the ends, the drawer
 *  pulls of the Direzione, and a panel set back between the blocks. Same height as your desk. */
function longDesk(w) {
  const g = new THREE.Group();
  const [d, t, bw] = [0.6, 0.07, 0.36];
  const legH = DESK_TOP - t;
  g.add(box(w, t, d, C.wood, { at: [0, legH, 0] }));
  for (const side of [-1, 1]) {
    const bx = side * (w / 2 - bw / 2 - 0.06);
    g.add(box(bw, legH, d - 0.1, '#F4EFE7', { at: [bx, 0, 0] }));
    const front = (d - 0.1) / 2 + 0.003;
    g.add(box(bw - 0.03, 0.01, 0.006, C.stoneDark, { at: [bx, legH * 0.5, front] }));
    for (const y of [legH * 0.75, legH * 0.25]) g.add(box(0.13, 0.024, 0.024, C.woodDark, { center: true, at: [bx, y, front + 0.012] }));
  }
  g.add(box(w - 2 * (bw + 0.06), 0.3, 0.025, '#EAE2D5', { at: [0, legH - 0.3, -0.06] }));
  return g;
}

/** The pigeonholes for the payslips: a cream cabinet with two doors, and on it a wooden grid of nine cubbies,
 *  most with an envelope standing in them. */
function pigeonholes() {
  const g = new THREE.Group();
  const [w, d, baseH] = [0.8, 0.32, 0.5];
  const [cols, rows, cell, board] = [3, 3, 0.29, 0.025];
  // the cabinet, its doors and pulls
  g.add(box(w, baseH - 0.03, d, '#F4EFE7'));
  g.add(box(w + 0.04, 0.03, d + 0.03, C.wood, { at: [0, baseH - 0.03, 0.005] }));
  const front = d / 2 + 0.003;
  g.add(box(0.01, baseH - 0.07, 0.006, C.stoneDark, { at: [0, 0.02, front] }));
  for (const x of [-0.08, 0.08]) g.add(box(0.024, 0.11, 0.024, C.woodDark, { center: true, at: [x, baseH * 0.55, front + 0.012] }));
  // the grid: a back panel, the boards between the cubbies
  const top = baseH + rows * cell + board;
  const wood = mat(C.wood, { roughness: 0.6 });
  g.add(box(w, top - baseH, 0.02, C.stoneDark, { at: [0, baseH, -d / 2 + 0.01] }));
  for (let i = 0; i <= cols; i++) g.add(box(board, top - baseH, d - 0.04, wood, { at: [-w / 2 + board / 2 + i * ((w - board) / cols), baseH, 0] }));
  for (let j = 1; j <= rows; j++) g.add(box(w, board, d - 0.04, wood, { at: [0, baseH + j * cell, 0] }));
  // envelopes standing in most cubbies, a little out of line, at the front so they catch the light; each with its window
  const paper = mat('#FFFFFF', { roughness: 0.85 });
  const pane = mat('#E6E0D6', { roughness: 0.6 });
  const cw = (w - board) / cols;
  [0, 1, 2, 3, 5, 6, 7].forEach((k) => {
    const [i, j] = [k % cols, Math.floor(k / cols)];
    const env = new THREE.Group();
    env.add(box(cw * 0.78, 0.19, 0.02, paper, { center: true }));
    env.add(box(cw * 0.4, 0.05, 0.004, pane, { center: true, at: [-cw * 0.08, -0.02, 0.012] }));
    env.position.set(-w / 2 + board + cw * (i + 0.5) - board / 2, baseH + board + j * cell + 0.1, 0.05 + (k % 2) * 0.03);
    env.rotation.z = ((k * 7) % 5) * 0.02 - 0.04;
    g.add(env);
  });
  return g;
}

/** A tall filing cabinet: four drawers with the wooden pulls. */
function filingCabinet() {
  const g = new THREE.Group();
  const [w, h, d] = [0.34, 1.1, 0.5];
  g.add(box(w, h, d, '#F4EFE7'));
  const front = d / 2 + 0.003;
  for (let i = 1; i < 4; i++) g.add(box(w - 0.03, 0.01, 0.006, C.stoneDark, { at: [0, (h * i) / 4, front] }));
  for (let i = 0; i < 4; i++) g.add(box(0.13, 0.024, 0.024, C.woodDark, { center: true, at: [0, (h * (i + 0.7)) / 4, front + 0.012] }));
  return g;
}

/** The time clock on the wall, with its small display and the card of the day sticking out of the top. */
function timeClock() {
  const g = new THREE.Group();
  g.add(box(0.22, 0.26, 0.1, '#F4EFE7', { center: true, at: [0, 0, 0.05] }));
  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(0.15, 0.07),
    new THREE.MeshStandardMaterial({
      map: canvasTexture(200, 96, (c, w, h) => {
        c.fillStyle = C.navy;
        roundRect(c, 0, 0, w, h, 6);
        c.fill();
        strokeText(c, '08:00', w / 2, h / 2 + 4, 56, { fill: C.cream });
      }),
      roughness: 0.5,
    }),
  );
  display.position.set(0, 0.05, 0.101);
  g.add(display);
  g.add(box(0.12, 0.012, 0.006, C.stoneDark, { center: true, at: [0, -0.07, 0.101] }));
  g.add(box(0.1, 0.09, 0.006, C.white, { at: [0, 0.13, 0.05] }));
  return g;
}

/** Piano 6: the payroll office. A long desk with two seats across the room; behind it the framed payslip of the
 *  Case; on the left the pigeonholes with the payslips; on the right two tall filing cabinets with the time clock
 *  on the wall over the first, and the apron on its peg beside them. No lamp over the desk: it would cross the
 *  payslip, which hangs right behind it. */
function furnishPersonale(room) {
  const desk = longDesk(2.0);
  desk.position.set(-0.1, 0, 0.05);
  room.add(desk);
  for (const x of [-0.75, 0.55]) {
    const chair = squareChair();
    chair.position.set(x, 0, -0.55);
    room.add(chair);
  }
  const holes = pigeonholes();
  holes.position.set(-1.55, 0, B.inB + 0.17);
  room.add(holes);
  for (const x of [1.65, 2.02]) {
    const cab = filingCabinet();
    cab.position.set(x, 0, B.inB + 0.26);
    room.add(cab);
  }
  const clock = timeClock();
  clock.position.set(1.65, 1.38, B.inB);
  room.add(clock);
}

/** A school desk turned to the front of the room: a wooden top on two cream sides, a shelf under the top and a
 *  cream panel on the side that faces the teacher's desk. */
function schoolDesk() {
  const g = new THREE.Group();
  const [w, d, h, t] = [0.56, 0.4, 0.46, 0.035];
  const cream = '#F4EFE7';
  g.add(box(w, t, d, C.wood, { at: [0, h - t, 0] }));
  for (const side of [-1, 1]) g.add(box(0.035, h - t, d - 0.04, cream, { at: [side * (w / 2 - 0.05), 0, 0] }));
  g.add(box(w - 0.135, 0.02, d - 0.08, cream, { at: [0, h - t - 0.1, 0] }));
  g.add(box(w - 0.135, 0.16, 0.02, cream, { at: [0, h - t - 0.16, -d / 2 + 0.04] }));
  return g;
}

/** The teacher's desk at the back, facing the room: a wooden top on wooden sides, and a cream front that hides the
 *  legs, with a groove across it. Same height as your desk, so the diploma stands where the hand rests. */
function teacherDesk() {
  const g = new THREE.Group();
  const [w, d, t] = [1.2, 0.55, 0.07];
  const legH = DESK_TOP - t;
  g.add(box(w, t, d, C.wood, { at: [0, legH, 0] }));
  for (const side of [-1, 1]) g.add(box(0.07, legH, d - 0.06, C.wood, { at: [side * (w / 2 - 0.08), 0, 0] }));
  g.add(box(w - 0.24, legH - 0.06, 0.03, '#F4EFE7', { at: [0, 0.06, d / 2 - 0.08] }));
  g.add(box(w - 0.3, 0.01, 0.006, C.stoneDark, { at: [0, legH * 0.55, d / 2 - 0.08 + 0.018] }));
  return g;
}

/** A tall narrow bookcase: wooden sides and shelves on a stone back, the course books standing on three shelves. */
function narrowBookcase() {
  const g = new THREE.Group();
  const [w, h, d, t] = [0.42, 1.3, 0.3, 0.025];
  const wood = mat(C.wood, { roughness: 0.6 });
  g.add(box(w, h, 0.02, C.stoneDark, { at: [0, 0, -d / 2 + 0.01] }));
  for (const side of [-1, 1]) g.add(box(t, h, d, wood, { at: [side * (w / 2 - t / 2), 0, 0] }));
  const shelves = [0, 0.33, 0.65, 0.97, h - t];
  for (const y of shelves) g.add(box(w, t, d, wood, { at: [0, y, 0] }));
  const spines = ['#FFFFFF', '#EADFCF', C.navy, '#FFFFFF', '#EADFCF'];
  [0, 1, 2].forEach((s) => {
    const count = 4 - (s % 2);
    for (let i = 0; i < count; i++) {
      const bh = 0.2 + (((s * 3 + i) * 37) % 5) / 100;
      const book = box(0.045, bh, 0.2, mat(spines[(s + i) % spines.length], { roughness: 0.7 }), { at: [-w / 2 + t + 0.04 + i * 0.05, shelves[s] + t, 0.02] });
      if (i === count - 1) {
        book.rotation.z = -0.3;
        book.position.x += 0.035;
      }
      g.add(book);
    }
  });
  return g;
}

/** Piano 7: the course room, where the company trains its team. Two rows of three school desks with their chairs,
 *  turned to the teacher's desk at the back, where the diploma will lie; the course calendar on the back wall to
 *  the left, the board of the roads on its easel to the right, and a narrow bookcase by the core. No board on the
 *  wall: the Direzione has the one of the budget. */
function furnishFormazione(room, world) {
  const desk = teacherDesk();
  desk.position.set(-0.35, 0, -0.8);
  room.add(desk);
  for (const z of [0.05, 0.72]) {
    for (const x of [-1.35, -0.5, 0.35]) {
      const d = schoolDesk();
      d.position.set(x, 0, z);
      room.add(d);
      const chair = squareChair();
      chair.scale.setScalar(0.75);
      chair.rotation.y = Math.PI;
      chair.position.set(x, 0, z + 0.3);
      room.add(chair);
    }
  }
  const books = narrowBookcase();
  books.position.set(1.92, 0, B.inB + 0.16);
  room.add(books);
  // the chairs show you their backs: a second light near the glass, or they turn dark
  const front = new THREE.PointLight('#FFE7C7', 2.2, 7, 1);
  front.position.set(-0.4, 1.3, 1.35);
  room.add(front);
  world.roomLights.push(front);
}

/** The negotiating table: a thick wooden top jutting out over a cream block set well in, on a wooden foot, like the
 *  floors coming out of the core. Same height as your desk. */
function negotiationTable() {
  const g = new THREE.Group();
  const [w, d, t] = [1.3, 0.8, 0.07];
  const legH = DESK_TOP - t;
  g.add(box(0.8, 0.03, 0.46, C.woodDark));
  g.add(box(0.62, legH - 0.03, 0.34, '#F4EFE7', { at: [0, 0.03, 0] }));
  g.add(box(w, t, d, C.wood, { at: [0, legH, 0] }));
  return g;
}

/** A meeting chair: like yours but with a low back, so seen from the side it stays under what hangs on the wall. */
function meetingChair() {
  const g = new THREE.Group();
  const cushion = mat('#EADFCF', { roughness: 0.85 });
  for (const x of [-0.2, 0.2]) {
    g.add(box(0.045, 0.4, 0.045, C.woodDark, { at: [x, 0, 0.17] }));
    g.add(box(0.045, 0.72, 0.045, C.woodDark, { at: [x, 0, -0.18] }));
  }
  g.add(box(0.44, 0.09, 0.42, cushion, { at: [0, 0.38, 0] }));
  g.add(box(0.36, 0.2, 0.07, cushion, { at: [0, 0.49, -0.18] }));
  g.add(box(0.44, 0.05, 0.07, C.wood, { at: [0, 0.69, -0.18] }));
  return g;
}

/** A low cabinet with two doors on a plinth set back, wooden top, the pulls standing upright; the contract binders
 *  stand at its right end. */
function lowCabinet() {
  const g = new THREE.Group();
  const [w, d, plinth, top] = [1.0, 0.38, 0.05, 0.035];
  const bodyH = 0.49 - plinth - top;
  g.add(box(w - 0.1, plinth, d - 0.08, '#D9CFC0', { at: [0, 0, -0.02] }));
  g.add(box(w, bodyH, d, '#F4EFE7', { at: [0, plinth, 0] }));
  g.add(box(w + 0.04, top, d + 0.03, C.wood, { at: [0, plinth + bodyH, 0.005] }));
  const front = d / 2 + 0.003;
  g.add(box(0.01, bodyH - 0.04, 0.006, C.stoneDark, { at: [0, plinth + 0.02, front] }));
  for (const x of [-0.06, 0.06]) g.add(box(0.024, 0.13, 0.024, C.woodDark, { center: true, at: [x, plinth + bodyH * 0.55, front + 0.012] }));
  const spines = ['#FFFFFF', C.navy, '#EADFCF', '#FFFFFF'];
  spines.forEach((c, i) => {
    const b = box(0.06, 0.27, 0.22, mat(c, { roughness: 0.7 }), { at: [w / 2 - 0.27 + i * 0.065, 0.49, -0.02] });
    if (i === 3) {
      b.rotation.z = -0.28;
      b.position.x += 0.04;
    }
    g.add(b);
  });
  return g;
}

/** Piano 8: the negotiating room, where the company decides how to pay for things. A square table in the middle
 *  with two chairs facing each other across it, seen from the side (who asks for the money and who lends it); the
 *  house of the Field test will stand between them. The price of money hangs on the back wall to the left, the low
 *  cabinet with the basket and the binders on the right. No lamp over the table: it would cross the tag. */
function furnishFinanza(room) {
  const table = negotiationTable();
  table.position.set(-0.1, 0, 0);
  room.add(table);
  for (const side of [-1, 1]) {
    const chair = meetingChair();
    chair.rotation.y = side * -Math.PI / 2;
    chair.position.set(-0.1 + side * 0.95, 0, 0);
    room.add(chair);
  }
  const cabinet = lowCabinet();
  cabinet.position.set(1.5, 0, B.inB + 0.2);
  room.add(cabinet);
  room.add(cornerPlant());
}

/** The archive of the titles: a tall wooden wall of square cubbies on a plinth set back, the titles lent rolled up and
 *  seen end on (circles, not the envelopes of the Personale), a few tied bundles lying flat, and a wide niche at eye
 *  height across the three middle columns, where the first title will stand. */
function titleArchive() {
  const g = new THREE.Group();
  const { cols, rows, cell, rowH, board, d, plinth, niche } = ARCHIVE;
  const w = cols * cell + board;
  const top = plinth + rows * rowH + board;
  const wood = mat(C.wood, { roughness: 0.6 });
  g.add(box(w - 0.06, plinth, d - 0.06, C.woodDark, { at: [0, 0, -0.01] }));
  g.add(box(w, top - plinth, 0.02, C.stoneDark, { at: [0, plinth, -d / 2 + 0.01] }));
  for (let j = 0; j <= rows; j++) g.add(box(w, board, d, wood, { at: [0, plinth + j * rowH, 0] }));
  const inNiche = (i, j) => j === niche && i >= 1 && i <= 3;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i <= cols; i++) {
      if (j === niche && i >= 2 && i <= 3) continue; // no boards inside the niche
      g.add(box(board, rowH - board, d, wood, { at: [-w / 2 + board / 2 + i * cell, plinth + j * rowH + board, 0] }));
    }
  }
  // what each cubby holds: rolled titles in a little pile, or tied bundles lying flat
  const paper = mat('#FCFAF6', { roughness: 0.85 });
  const end = mat('#E6DDD0', { roughness: 0.85 });
  const tie = mat('#D9CFC0', { roughness: 0.8 });
  const r = 0.045;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      if (inNiche(i, j)) continue;
      const k = j * cols + i;
      const [x, y] = [-w / 2 + board / 2 + cell * (i + 0.5), plinth + j * rowH + board];
      if (k % 4 === 3) {
        for (let b = 0; b < 3; b++) {
          g.add(box(0.22, 0.05, 0.24, paper, { at: [x + (b % 2) * 0.012, y + b * 0.052, 0.01] }));
          g.add(box(0.03, 0.052, 0.245, tie, { at: [x + (b % 2) * 0.012, y + b * 0.052, 0.01] }));
        }
        continue;
      }
      const spots = k % 3 === 1 ? [[-0.05, 0], [0.05, 0]] : [[-0.05, 0], [0.05, 0], [0, 0.078]];
      for (const [dx, dy] of spots) {
        const roll = cyl(r, r, d - 0.06, paper, { seg: 20, center: true, at: [x + dx, y + r + dy, 0.01] });
        roll.rotation.x = Math.PI / 2;
        g.add(roll);
        const face = cyl(r * 0.55, r * 0.55, 0.006, end, { seg: 20, center: true, at: [x + dx, y + r + dy, 0.01 + (d - 0.06) / 2 + 0.003] });
        face.rotation.x = Math.PI / 2;
        g.add(face);
      }
    }
  }
  return g;
}

/** A library ladder in light wood, leaning on the archive. */
function libraryLadder(h) {
  const g = new THREE.Group();
  const wood = mat(C.wood, { roughness: 0.6 });
  for (const x of [-0.15, 0.15]) g.add(box(0.035, h, 0.04, wood, { at: [x, 0, 0] }));
  for (let y = 0.28; y < h - 0.1; y += 0.3) g.add(box(0.3, 0.025, 0.035, wood, { at: [0, y, 0] }));
  g.rotation.x = -0.17;
  return g;
}

/** The reading lectern in the middle: a wooden foot, a cream column and a wide wooden top, high enough to stand at. */
function readingLectern() {
  const g = new THREE.Group();
  const H = LECTERN.h;
  g.add(box(0.4, 0.03, 0.32, C.woodDark));
  g.add(box(0.14, H - 0.065, 0.14, '#F4EFE7', { at: [0, 0.03, 0] }));
  g.add(box(0.56, 0.035, 0.42, C.wood, { at: [0, H - 0.035, 0] }));
  return g;
}

/** A square wooden stool. */
function squareStool() {
  const g = new THREE.Group();
  for (const x of [-0.12, 0.12]) for (const z of [-0.12, 0.12]) g.add(box(0.035, 0.42, 0.035, C.wood, { at: [x, 0, z] }));
  g.add(box(0.3, 0.04, 0.3, C.wood, { at: [0, 0.42, 0] }));
  g.add(box(0.26, 0.02, 0.26, '#EADFCF', { at: [0, 0.46, 0] }));
  return g;
}

/** Piano 9: the archive of the titles, where the company keeps track of the money it lends. The tall archive by the
 *  core, with the ladder leaning on it and the first title in its niche; the reading lectern in the middle, with its
 *  stool, where the register of the loans will lie; the thermometer of the risk on the back wall to the left. */
function furnishCredito(room) {
  const archive = titleArchive();
  archive.position.set(ARCHIVE.x, 0, ARCHIVE.z);
  room.add(archive);
  const ladder = libraryLadder(1.55);
  ladder.position.set(ARCHIVE.x + 0.62, 0, ARCHIVE.z + ARCHIVE.d / 2 + 0.28);
  room.add(ladder);
  const lectern = readingLectern();
  lectern.position.set(LECTERN.x, 0, LECTERN.z);
  room.add(lectern);
  const stool = squareStool();
  stool.position.set(LECTERN.x - 0.6, 0, LECTERN.z + 0.35);
  room.add(stool);
  room.add(cornerPlant());
}

/** An armchair with its wooden frame in sight: square legs, flat wooden arms, a tall back frame, and two soft cushions
 *  set on it, not one upholstered block like the observatory's. */
function frameArmchair(cushion) {
  const g = new THREE.Group();
  const wood = mat(C.wood, { roughness: 0.6 });
  const soft = mat(cushion, { roughness: 0.9 });
  for (const s of [-1, 1]) {
    const x = s * 0.3;
    g.add(box(0.045, 0.52, 0.045, wood, { at: [x, 0, 0.26] }));
    g.add(box(0.045, 0.8, 0.045, wood, { at: [x, 0, -0.27] }));
    g.add(box(0.09, 0.03, 0.62, wood, { at: [x, 0.52, 0.0] }));
    g.add(box(0.04, 0.04, 0.5, wood, { at: [x, 0.12, 0] }));
  }
  g.add(box(0.6, 0.05, 0.04, wood, { at: [0, 0.18, 0.26] }));
  g.add(box(0.6, 0.05, 0.04, wood, { at: [0, 0.18, -0.27] }));
  g.add(box(0.6, 0.04, 0.04, wood, { at: [0, 0.74, -0.27] }));
  g.add(box(0.53, 0.12, 0.5, soft, { at: [0, 0.23, 0.02] }));
  const back = box(0.53, 0.4, 0.1, soft, { at: [0, 0.34, -0.2] });
  back.rotation.x = -0.12;
  g.add(back);
  return g;
}

/** The low table between the armchairs: a thick wooden top jutting out over a cream block set well in. */
function coffeeTable() {
  const g = new THREE.Group();
  const h = COFFEE.h;
  g.add(box(0.46, 0.03, 0.46, C.woodDark));
  g.add(box(0.34, h - 0.07, 0.34, '#F4EFE7', { at: [0, 0.03, 0] }));
  g.add(box(0.62, 0.04, 0.62, C.wood, { at: [0, h - 0.04, 0] }));
  return g;
}

/** The showcase by the core: a cream cabinet with two doors below, open above between wooden sides, with a shelf at
 *  eye height for the block of the shares, a few books underneath and a small lamp on top. */
function vitrine(lampMats) {
  const g = new THREE.Group();
  const { w, d, h, base, shelf, board } = VITRINE;
  const wood = mat(C.wood, { roughness: 0.6 });
  g.add(box(w - 0.08, 0.05, d - 0.08, '#D9CFC0', { at: [0, 0, -0.02] }));
  g.add(box(w, base - 0.05, d, '#F4EFE7', { at: [0, 0.05, 0] }));
  const front = d / 2 + 0.003;
  g.add(box(0.01, base - 0.1, 0.006, C.stoneDark, { at: [0, 0.075, front] }));
  for (const x of [-0.06, 0.06]) g.add(box(0.024, 0.13, 0.024, C.woodDark, { center: true, at: [x, 0.05 + (base - 0.05) * 0.6, front + 0.012] }));
  g.add(box(w + 0.02, board, d + 0.02, wood, { at: [0, base, 0] }));
  for (const s of [-1, 1]) g.add(box(board, h - base - board, d, wood, { at: [s * (w / 2 - board / 2), base + board, 0] }));
  g.add(box(w - 2 * board, h - base - board, 0.02, '#F4EFE7', { at: [0, base + board, -d / 2 + 0.01] }));
  g.add(box(w - 2 * board, board, d - 0.02, wood, { at: [0, shelf, 0.01] }));
  g.add(box(w + 0.03, 0.03, d + 0.03, wood, { at: [0, h, 0] }));
  // books on the lower shelf: two lying, three standing
  const y = base + board;
  g.add(box(0.26, 0.035, 0.2, mat('#FFFFFF', { roughness: 0.7 }), { at: [-0.2, y, 0.02] }));
  g.add(box(0.24, 0.035, 0.19, mat('#EADFCF', { roughness: 0.7 }), { at: [-0.2, y + 0.035, 0.02] }));
  ['#FFFFFF', C.navy, '#EADFCF'].forEach((c, i) => {
    const b = box(0.04, 0.24 - i * 0.02, 0.2, mat(c, { roughness: 0.7 }), { at: [0.12 + i * 0.045, y, 0.0] });
    if (i === 2) {
      b.rotation.z = -0.3;
      b.position.x += 0.035;
    }
    g.add(b);
  });
  // the small lamp on top, by the core: a wooden block and a square cream shade
  const lamp = new THREE.Group();
  lamp.add(box(0.07, 0.05, 0.07, wood));
  lamp.add(box(0.016, 0.05, 0.016, C.woodDark, { at: [0, 0.05, 0] }));
  const shade = squareShade(0.15, 0.09, mat('#E8D6B4', { side: THREE.DoubleSide, roughness: 0.8, emissive: '#FFE7BD', emissiveIntensity: 0.12 }));
  shade.position.y = 0.08;
  lamp.add(shade);
  const bulb = mat('#FFF4C9', { emissive: '#FFD27A', emissiveIntensity: 0.6 });
  lampMats.push(bulb);
  lamp.add(box(0.05, 0.05, 0.05, bulb, { at: [0, 0.09, 0] }));
  lamp.position.set(w / 2 - 0.16, h + 0.03, 0);
  g.add(lamp);
  return g;
}

/** Piano 10: the partners' lounge, where the partners sit and talk about the company. Two framed armchairs turned
 *  towards each other and the viewer, the low table between them where the bell will stand, the keys of the company on
 *  the back wall above, and the showcase by the core with the block of the shares. No floor lamp: the observatory has
 *  one with its armchair. */
function furnishSoci(room, world) {
  const show = vitrine(world.roomLampMats);
  show.position.set(VITRINE.x, 0, VITRINE.z);
  room.add(show);
  const table = coffeeTable();
  table.position.set(COFFEE.x, 0, COFFEE.z);
  room.add(table);
  for (const s of [-1, 1]) {
    const chair = frameArmchair(tone(10, 0.7));
    chair.position.set(COFFEE.x + s * 0.8, 0, COFFEE.z - 0.25);
    chair.rotation.y = -s * 0.85;
    room.add(chair);
  }
  room.add(cornerPlant());
}

/** The control desk: a cream block on a plinth set back, a wooden top at desk height, and on its left two thirds a
 *  sloping panel with rows of light keys and sliders. The right end stays flat for the mixer of the Field test. */
function controlDesk() {
  const g = new THREE.Group();
  const { w, d } = CONSOLE;
  const top = 0.035;
  g.add(box(w - 0.1, 0.04, d - 0.1, C.woodDark, { at: [0, 0, -0.02] }));
  g.add(box(w - 0.04, DESK_TOP - top - 0.04, d - 0.06, '#F4EFE7', { at: [0, 0.04, -0.02] }));
  g.add(box(w, top, d, C.wood, { at: [0, DESK_TOP - top, 0] }));
  // the sloping panel: a wedge rising towards the screens
  const pw = w * 0.6;
  const px = -w / 2 + pw / 2 + 0.04;
  const s = new THREE.Shape();
  s.moveTo(-d / 2 + 0.04, 0);
  s.lineTo(d / 2 - 0.04, 0);
  s.lineTo(d / 2 - 0.04, 0.02);
  s.lineTo(-d / 2 + 0.04, 0.14);
  s.closePath();
  const wedge = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: pw, bevelEnabled: false }), mat('#F4EFE7', { roughness: 0.7 }));
  wedge.rotation.y = -Math.PI / 2;
  wedge.position.set(px + pw / 2, DESK_TOP, 0);
  g.add(wedge);
  // keys and sliders on the slope, all light
  const slope = new THREE.Group();
  slope.position.set(px, DESK_TOP + 0.08, 0);
  slope.rotation.x = Math.atan2(0.12, d - 0.08);
  g.add(slope);
  const key = mat('#FFFFFF', { roughness: 0.5 });
  const groove = mat(C.stoneDark, { roughness: 0.7 });
  for (let i = 0; i < 8; i++) {
    const x = -pw / 2 + 0.07 + i * ((pw - 0.14) / 7);
    slope.add(box(0.012, 0.004, 0.16, groove, { at: [x, 0.002, 0.06] }));
    slope.add(box(0.034, 0.018, 0.024, key, { at: [x, 0.004, 0.06 + (((i * 37) % 5) - 2) * 0.025] }));
    for (const z of [-0.1, -0.15]) slope.add(box(0.03, 0.012, 0.03, mat(i % 3 === 1 ? '#E6C49C' : '#FFFFFF', { roughness: 0.5 }), { at: [x, 0.004, z] }));
  }
  return g;
}

/** A swivel chair: a square seat and a straight back in cream, on one wooden column and a square wooden foot. */
function swivelChair() {
  const g = new THREE.Group();
  const cushion = mat('#EADFCF', { roughness: 0.85 });
  g.add(box(0.36, 0.03, 0.36, C.woodDark));
  g.add(box(0.05, 0.36, 0.05, C.wood, { at: [0, 0.03, 0] }));
  g.add(box(0.44, 0.08, 0.42, cushion, { at: [0, 0.39, 0] }));
  // a low back, so from behind it leaves the keys of the desk in sight
  g.add(box(0.4, 0.22, 0.07, cushion, { at: [0, 0.54, -0.19] }));
  g.add(box(0.05, 0.1, 0.05, C.wood, { at: [0, 0.44, -0.19] }));
  return g;
}

/** The equipment rack by the core: a low wooden frame open in front, three white units with light knobs stacked in
 *  it, on a plinth set back. The television of lesson 1 stands on top. */
function equipmentRack() {
  const g = new THREE.Group();
  const { w, d, h } = RACK;
  const wood = mat(C.wood, { roughness: 0.6 });
  const t = 0.025;
  g.add(box(w - 0.08, 0.04, d - 0.08, '#D9CFC0', { at: [0, 0, -0.02] }));
  g.add(box(w, t, d, wood, { at: [0, 0.04, 0] }));
  g.add(box(w + 0.02, 0.03, d + 0.02, wood, { at: [0, h, 0] }));
  for (const s of [-1, 1]) g.add(box(t, h - 0.04 - t, d, wood, { at: [s * (w / 2 - t / 2), 0.04 + t, 0] }));
  g.add(box(w - 2 * t, h - 0.04 - t, 0.02, '#F4EFE7', { at: [0, 0.04 + t, -d / 2 + 0.01] }));
  const unit = mat('#FFFFFF', { roughness: 0.55 });
  const knob = mat('#DCD3C4', { roughness: 0.5 });
  const uh = (h - 0.04 - t - 0.04) / 3;
  for (let i = 0; i < 3; i++) {
    const y = 0.04 + t + 0.01 + i * (uh + 0.005);
    g.add(box(w - 2 * t - 0.03, uh - 0.01, d - 0.08, unit, { at: [0, y, 0.0] }));
    for (let k = 0; k < 3; k++) {
      const kn = cyl(0.018, 0.018, 0.016, knob, { seg: 20, center: true, at: [-0.18 + k * 0.07, y + uh / 2, (d - 0.08) / 2 + 0.008] });
      kn.rotation.x = Math.PI / 2;
      g.add(kn);
    }
    g.add(box(0.14, 0.02, 0.006, '#F4EFE7', { center: true, at: [0.17, y + uh / 2, (d - 0.08) / 2 + 0.003] }));
  }
  return g;
}

/** Piano 11: the control room, where the company decides what goes on air. The wall of nine small screens on the
 *  back wall, the control desk in front of it with the swivel chair seen from behind, the low equipment rack by the
 *  core with the television on top, and the shelf with the baskets on the back wall to the left. */
function furnishPalinsesto(room) {
  const wall = screenWall();
  wall.position.set(CONSOLE.x, 1.13, B.inB + 0.005);
  room.add(wall);
  const desk = controlDesk();
  desk.position.set(CONSOLE.x, 0, CONSOLE.z);
  room.add(desk);
  const chair = swivelChair();
  chair.rotation.y = Math.PI;
  chair.position.set(CONSOLE.x - 0.15, 0, CONSOLE.z + 0.62);
  room.add(chair);
  const rack = equipmentRack();
  rack.position.set(RACK.x, 0, RACK.z);
  room.add(rack);
  room.add(cornerPlant());
}

/** The chest of the maps: low and wide, a cream body with four wide shallow drawers and long wooden pulls, on a plinth
 *  set back, with a wooden top where the jerrycan and the suitcase will stand. */
function mapChest() {
  const g = new THREE.Group();
  const { w, d, h } = MAPCHEST;
  const top = 0.035;
  g.add(box(w - 0.1, 0.05, d - 0.08, '#D9CFC0', { at: [0, 0, -0.02] }));
  const bodyH = h - 0.05 - top;
  g.add(box(w, bodyH, d, '#F4EFE7', { at: [0, 0.05, 0] }));
  g.add(box(w + 0.03, top, d + 0.03, C.wood, { at: [0, h - top, 0.005] }));
  const front = d / 2 + 0.003;
  const dh = bodyH / 4;
  for (let i = 0; i < 4; i++) {
    const y = 0.05 + i * dh;
    if (i > 0) g.add(box(w - 0.04, 0.006, 0.006, C.stoneDark, { at: [0, y - 0.003, front] }));
    for (const x of [-w / 4, w / 4]) g.add(box(0.2, 0.02, 0.022, C.woodDark, { center: true, at: [x, y + dh / 2, front + 0.011] }));
  }
  return g;
}

/** The world drawn for the globe: pale sea, sand-coloured continents, simplified. */
function globeTexture() {
  return canvasTexture(1024, 512, (c, cw, ch) => {
    c.fillStyle = '#E4EAF0';
    c.fillRect(0, 0, cw, ch);
    c.fillStyle = '#D9BC92';
    const P = (lon, lat) => [((lon + 180) / 360) * cw, ((90 - lat) / 180) * ch];
    const lands = [
      [[-165, 65], [-140, 70], [-95, 72], [-75, 62], [-60, 50], [-80, 30], [-97, 18], [-105, 22], [-118, 33], [-125, 48], [-150, 60]],
      [[-80, 10], [-60, 8], [-35, -7], [-40, -22], [-58, -38], [-70, -55], [-75, -40], [-80, -5]],
      [[-10, 36], [0, 44], [-5, 48], [5, 52], [10, 58], [25, 70], [40, 67], [45, 55], [40, 45], [28, 40], [20, 38], [10, 44]],
      [[-17, 20], [-5, 35], [10, 37], [32, 31], [43, 12], [51, 11], [40, -15], [32, -30], [20, -35], [12, -18], [9, 4], [-8, 5], [-17, 14]],
      [[45, 55], [40, 67], [70, 75], [110, 77], [140, 72], [170, 66], [160, 58], [140, 45], [122, 30], [110, 20], [100, 10], [80, 8], [72, 20], [60, 25], [48, 30], [40, 40]],
      [[114, -22], [130, -12], [145, -12], [153, -28], [145, -38], [130, -32], [115, -34]],
      [[-55, 60], [-45, 60], [-20, 72], [-30, 82], [-60, 80]],
    ];
    for (const land of lands) {
      c.beginPath();
      land.forEach(([lon, lat], i) => (i ? c.lineTo(...P(lon, lat)) : c.moveTo(...P(lon, lat))));
      c.closePath();
      c.fill();
    }
  });
}

/** The globe on its stand: a cross of wood on the floor, a square wooden column, the half ring of the meridian, and
 *  the world tilted on its axis. Round by nature, like the telescope. */
function globeStand() {
  const g = new THREE.Group();
  const wood = mat(C.wood, { roughness: 0.6 });
  const { r, y } = GLOBE;
  g.add(box(0.5, 0.04, 0.08, C.woodDark));
  g.add(box(0.08, 0.04, 0.5, C.woodDark));
  g.add(box(0.06, y - r - 0.07, 0.06, wood, { at: [0, 0.04, 0] }));
  g.add(box(0.1, 0.03, 0.1, wood, { at: [0, y - r - 0.06, 0] }));
  // the world tilted on its axis inside an upright half ring
  const world = new THREE.Mesh(new THREE.SphereGeometry(r, 48, 32), new THREE.MeshStandardMaterial({ map: globeTexture(), roughness: 0.6 }));
  world.rotation.set(0, -1.9, 0.41, 'YZX'); // Europe and Africa towards the room
  world.position.y = y;
  g.add(world);
  const meridian = new THREE.Mesh(new THREE.TorusGeometry(r + 0.03, 0.012, 10, 48, Math.PI), wood);
  meridian.rotation.z = Math.PI / 2;
  meridian.position.y = y;
  g.add(meridian);
  g.add(box(0.03, 0.03, 0.03, wood, { center: true, at: [0, y + r + 0.03, 0] }));
  return g;
}

/** A tall narrow stool: a square wooden foot, one column, a footrest and a square cream seat. */
function tallStool() {
  const g = new THREE.Group();
  g.add(box(0.32, 0.03, 0.32, C.woodDark));
  g.add(box(0.05, 0.6, 0.05, C.wood, { at: [0, 0.03, 0] }));
  g.add(box(0.26, 0.025, 0.04, C.wood, { at: [0, 0.24, 0.06] }));
  g.add(box(0.34, 0.04, 0.34, C.wood, { at: [0, 0.63, 0] }));
  g.add(box(0.3, 0.035, 0.3, '#EADFCF', { at: [0, 0.67, 0] }));
  return g;
}

/** Piano 12: the room of the routes, where the company looks at the world. The globe on its stand on the left, the low
 *  wide chest of the maps along the back wall with the jerrycan and the suitcase on it, the locked rate on the wall
 *  above, a tall stool between the globe and the chest. */
function furnishEsteri(room) {
  const chest = mapChest();
  chest.position.set(MAPCHEST.x, 0, MAPCHEST.z);
  room.add(chest);
  const globe = globeStand();
  globe.position.set(GLOBE.x, 0, GLOBE.z);
  room.add(globe);
  const stool = tallStool();
  stool.position.set(-0.4, 0, 0.05);
  stool.rotation.y = 0.3;
  room.add(stool);
  room.add(cornerPlant());
}

/** Inside the rooms a little light comes from every side, so whatever turns its back to the room lamp (a chair seen
 *  from behind, the side of a drawer, an object in the card) never goes dark, on any floor, without a
 *  lamp of its own. Each material gets a copy that glows faintly in its own colour; main.js sets how much
 *  (`world.roomFill`). Lamps, gold and glass keep their own light. */
const evenLit = new Map();
function lightEvenly(m, world) {
  world.roomFillMats ??= [];
  const even = (x) => {
    if (!x.isMeshStandardMaterial || x.transparent || x.emissive.getHex() !== 0) return x;
    if (!evenLit.has(x)) {
      const y = x.clone();
      y.emissive.copy(x.color);
      y.emissiveMap = x.map;
      y.emissiveIntensity = world.roomFill ?? 0;
      evenLit.set(x, y);
      world.roomFillMats.push(y);
    }
    return evenLit.get(x);
  };
  m.material = Array.isArray(m.material) ? m.material.map(even) : even(m.material);
}

/** Builds the room of a floor into its group and returns its 3 places and the wall paint. */
export function furnishRoom(floorGroup, info, world) {
  const data = ROOMS[info.n];
  const room = new THREE.Group();
  floorGroup.add(room);
  data.furnish(room, world);

  const roomLight = new THREE.PointLight('#FFE7C7', 2.2, 7, 1);
  roomLight.position.set(0, 1.3, 0.4);
  room.add(roomLight);
  world.roomLights.push(roomLight);

  const paint = wallPaint(room, info.paint);

  // ---------- the 3 places ----------
  /** Where an object not earned yet will go, with the stage number (25/10/2026, the same on every floor): on a wall
   *  an empty square frame like the boards that will hang there, on a surface a clean white plinth on a base set
   *  back, like the Direzione's sideboard. */
  function makeStand(n, wall) {
    const g = new THREE.Group();
    const textures = [standTexture(n, false, info.color), standTexture(n, true, info.color)];
    const label = new THREE.MeshBasicMaterial({ map: textures[0], transparent: true, depthWrite: false });
    if (wall) {
      const s = 0.34;
      g.add(box(s - 0.006, s - 0.006, 0.02, C.white, { center: true, at: [0, 0, 0.01] }));
      g.add(squareRim(s, s, 0.025, 0.035, mat(C.frame, { roughness: 0.45 })));
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.27, 0.27), label);
      face.position.z = 0.021;
      g.add(face);
    } else {
      g.add(box(0.24, 0.02, 0.16, '#D9CFC0'));
      g.add(box(0.28, 0.2, 0.2, C.white, { at: [0, 0.02, 0] }));
      const face = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.18), label);
      face.position.set(0, 0.12, 0.102);
      g.add(face);
    }
    g.userData.setNext = (next) => (label.map = textures[next ? 1 : 0]);
    return g;
  }

  const slots = data.objects.map((place) => {
    const holder = new THREE.Group();
    holder.userData.pick = { type: 'slot', n: info.n, i: place.stage };
    room.add(holder);
    const inner = place.make(world);
    const obj = new THREE.Group();
    obj.add(inner);
    fitInPlace(inner, place.size, place.wall);
    obj.position.set(...place.at);
    holder.add(obj);
    const stand = makeStand(place.stage + 1, place.wall);
    stand.position.set(...place.at);
    holder.add(stand);
    return { stage: place.stage, holder, obj, stand, place, home: obj.position.clone() };
  });

  // no shadows inside the building: furniture and objects are lit evenly
  room.traverse((m) => {
    if (m.isMesh) {
      m.castShadow = false;
      m.receiveShadow = false;
      lightEvenly(m, world);
    }
  });

  // the glow behind every object, beside the room and not in it (the check of the shadows looks at the room only)
  const glows = new THREE.Group();
  floorGroup.add(glows);
  room.updateWorldMatrix(true, true); // from the building down: the floor may have just been raised to its height
  for (const s of slots) {
    s.glow = makeGlow(s, room, info.color);
    glows.add(s.glow);
  }

  return {
    n: info.n,
    stages: data.stages,
    slots,
    room,
    paint,
    /** The place of a stage, or null if that stage brings no object. */
    slotOf: (stage) => slots.find((s) => s.stage === stage) ?? null,
    setEarned(n) {
      for (const s of slots) {
        s.obj.visible = s.stage < n;
        s.stand.visible = s.stage >= n;
        s.stand.scale.setScalar(1);
        s.obj.position.copy(s.home);
        s.obj.scale.setScalar(1);
        s.obj.rotation.set(0, 0, 0);
      }
      paint.set(n / 8);
      this.markNext(n);
    },
    /** The stand of the next object to earn shows its number in the floor's colour. */
    markNext(n) {
      const next = slots.find((s) => s.stage >= n);
      for (const s of slots) s.stand.userData.setNext(s === next);
    },
    worldPos(stage) {
      const s = slots.find((x) => x.stage === stage);
      const v = s.home.clone();
      if (!s.place.wall) v.y += s.place.size[1] / 2;
      return room.localToWorld(v);
    },
  };
}
