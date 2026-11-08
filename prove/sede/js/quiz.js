// Copied as it is from Dorigo's work (1. LAVORO/test/originale/quiz.js, 07/11/2026): change it there first. In the
// prova it drives the test of the first start (avvio.js) and the character of the Tu (me.js).
// FEEN · il test dei personaggi (03/11/2026): the 12 statements of the Tu, how they are scored, the point on the
// map and the four types with their pregio and trappola. Statements in the style of 16personalities: one per screen,
// seven circles from «D’accordo» (+3) to «In disaccordo» (−3). Six statements per axis, three keyed each way, so
// whoever agrees with everything lands in the middle, not in a quadrant. The words never say «he» or «she» about
// whoever plays (CLAUDE.md §8): no adjective about the player is ever gendered.
// The statements never talk about money (Davide, 03/11/2026: «domande che sembrano distanti… rivelare»): everyday
// life, one area each, and the result reveals the type with money. Rischio: thrills, stakes, margins of safety,
// guessing. Tradizione: rituals, routines, re-watching versus new food, new music, new versions of an app.

// the two axes of the map (CLAUDE.md §4): `rischio` up = more risk, `tradizione` right = traditional, left = innovative
// `sign`: +1 when «D’accordo» moves towards rischio alto or tradizionale, −1 when it moves the other way
export const QUESTIONS = [
  { id: 'montagne-russe', axis: 'rischio', sign: 1, text: 'Al luna park, le montagne russe più alte sono la prima cosa che cerchi.' },
  { id: 'feste', axis: 'tradizione', sign: 1, text: 'A Natale e ai compleanni ti piace che si facciano le cose di sempre, nello stesso modo.' },
  { id: 'crocette', axis: 'rischio', sign: -1, text: 'In una verifica a crocette dove le risposte sbagliate tolgono punti, quelle in dubbio le lasci in bianco.' },
  { id: 'piatto', axis: 'tradizione', sign: -1, text: 'Al ristorante scegli volentieri un piatto che non hai mai assaggiato.' },
  { id: 'vacanza', axis: 'rischio', sign: 1, text: 'In vacanza preferisci decidere giorno per giorno, anche a costo di non trovare posto.' },
  { id: 'serie', axis: 'tradizione', sign: 1, text: 'Rivedi volentieri una serie che conosci già, piuttosto che iniziarne una nuova.' },
  { id: 'batteria', axis: 'rischio', sign: -1, text: 'Quando la batteria del telefono scende sotto il 50%, cerchi già un caricatore.' },
  { id: 'app', axis: 'tradizione', sign: -1, text: 'Quando un’app che usi cambia aspetto, la nuova versione ti piace subito.' },
  { id: 'rigori', axis: 'rischio', sign: 1, text: 'Se una partita finisce ai rigori, ti offri per tirare.' },
  { id: 'strada', axis: 'tradizione', sign: 1, text: 'Per andare a scuola fai sempre la stessa strada, anche quando potresti cambiarla.' },
  { id: 'risiko', axis: 'rischio', sign: -1, text: 'A giochi come Risiko o Monopoly preferisci difenderti che attaccare.' },
  { id: 'canzoni', axis: 'tradizione', sign: -1, text: 'Le canzoni che ascolti le scopri prima che diventino famose.' },
];

// the seven circles, left to right
export const SCALE = { left: 'D’accordo', right: 'In disaccordo', values: [3, 2, 1, 0, -1, -2, -3] };

// asked only when an axis ends exactly at 0: two cards, no middle, still about everyday life
export const TIEBREAKS = {
  rischio: { text: 'Ultimo giro al luna park. Dove sali?', options: [{ text: 'Sulla ruota panoramica', side: -1 }, { text: 'Sulle montagne russe', side: 1 }] },
  tradizione: { text: 'Stasera si mangia fuori. Cosa scegli?', options: [{ text: 'Una cucina che non hai mai provato', side: -1 }, { text: 'Il tuo posto di sempre', side: 1 }] },
};

// each axis runs from −18 to +18; within NEAR of 0 the result says you are close to the next quadrant
const MAX = 18;
const NEAR = 1;

// the four types (CLAUDE.md §4), keyed by quadrant, with the two versions to choose from and the floors where the
// app explains the trappola (world.js FLOORS, office.js ROOMS)
export const PROFILES = {
  'alto-innovativo': {
    names: ['Elizabeth', 'Leopold'],
    what: 'rischio alto · innovativo',
    motto: 'Vedi il futuro e ci punti.',
    portrait: 'Le idee nuove ti attirano e non ti spaventa non sapere come andrà. Se una cosa può cambiare le regole, vuoi esserci dall’inizio.',
    pregio: 'Vedi prima degli altri le occasioni che stanno nascendo, e hai il coraggio di provarci.',
    trappola: 'Scambiare ogni novità per un’occasione. Quello che promette tanto e in fretta a volte è solo una moda, a volte una truffa.',
    floors: [{ n: 4, lesson: 'Il guru che ti fa ricco' }, { n: 12, lesson: 'Monete che non lo sono' }],
  },
  'alto-tradizionale': {
    names: ['Cathie', 'Jordan'],
    what: 'rischio alto · tradizionale',
    motto: 'Punti in grande, su un terreno che conosci.',
    portrait: 'Ti fidi di quello che è collaudato, ma quando ci credi vai fino in fondo. Decidi in fretta e non ti tiri indietro.',
    pregio: 'Quando scegli, ti impegni davvero: la paura di sbagliare non ti blocca.',
    trappola: 'Mettere tutte le uova nello stesso cesto. Conoscere bene una cosa fa venire voglia di puntare tutto lì, e di rifarsi subito quando va male.',
    floors: [{ n: 10, lesson: 'Un’azienda sola' }, { n: 3, lesson: '«Stavolta tocca a me»' }],
  },
  'basso-innovativo': {
    names: ['Christine', 'Bill'],
    what: 'rischio basso · innovativo',
    motto: 'Testa nel futuro, piedi per terra.',
    portrait: 'Ti piace capire come funzionano le cose nuove e usarle per fare meglio. Ma prima di muoverti vuoi vederci chiaro.',
    pregio: 'Usi app, strumenti e idee nuove per organizzarti meglio, senza farti prendere dalla fretta.',
    trappola: 'Studiare tutto e non partire mai. A forza di confrontare e aspettare il momento perfetto, passa il tempo che poteva lavorare per te.',
    floors: [{ n: 5, lesson: 'Il tempo lavora per te' }, { n: 5, lesson: '«Lo farò da grande»' }],
  },
  'basso-tradizionale': {
    names: ['Jane', 'Warren'],
    what: 'rischio basso · tradizionale',
    motto: 'Chi va piano va sano e va lontano.',
    portrait: 'Ti fidi di quello che ha già dimostrato di funzionare e preferisci crescere piano, ma senza scossoni. Le mode passano, tu resti.',
    pregio: 'Pazienza e costanza: non ti fai trascinare dalle mode e i tuoi soldi non spariscono in una sera.',
    trappola: 'Tenere tutto fermo. Anche i soldi nel salvadanaio perdono valore: con gli anni, con 10 euro compri meno.',
    floors: [{ n: 8, lesson: 'Con 10 euro compravi di più' }, { n: 9, lesson: 'I soldi fermi perdono' }],
  },
};

/**
 * The result of the test. `answers`: the 12 values from SCALE.values, in the order of QUESTIONS. `tiebreak`: the
 * side (−1 or +1) picked on TIEBREAKS for an axis that ended at 0. Returns the two sums, the point on the map
 * (x right = tradizionale, y up = rischio alto, both from −1 to 1), the axes still to break (`ask`), the quadrant
 * once both are decided, and which axes are near the line.
 */
export function score(answers, tiebreak = {}) {
  if (answers.length !== QUESTIONS.length) throw new Error(`il test ha ${QUESTIONS.length} risposte`);
  const sum = { rischio: 0, tradizione: 0 };
  QUESTIONS.forEach((q, i) => (sum[q.axis] += q.sign * answers[i]));
  const side = (axis) => Math.sign(sum[axis]) || tiebreak[axis] || 0;
  const ask = ['rischio', 'tradizione'].filter((axis) => !side(axis));
  // a tie broken by the cards sits just inside the quadrant it chose, so the point never lies on a line
  const at = (axis) => (sum[axis] || side(axis) * 0.5) / MAX;
  const quadrant = ask.length ? null : `${side('rischio') > 0 ? 'alto' : 'basso'}-${side('tradizione') > 0 ? 'tradizionale' : 'innovativo'}`;
  return {
    rischio: sum.rischio,
    tradizione: sum.tradizione,
    x: at('tradizione'),
    y: at('rischio'),
    ask,
    quadrant,
    near: { rischio: Math.abs(sum.rischio) <= NEAR, tradizione: Math.abs(sum.tradizione) <= NEAR },
  };
}
