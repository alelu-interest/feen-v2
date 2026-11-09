// Made by mobile/scripts/lezioni.mjs from the lesson cards in 1. LAVORO/lezioni/: do not edit here,
// change the card and run «npm run lezioni» again.
export const LESSONS = {
  "prova": {
    "id": "p1-l0",
    "code": "L0",
    "floor": 1,
    "title": "Lezione di prova",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "già noto, facile",
        "moment": "la regola",
        "idea": "le entrate",
        "mentor": "Un'entrata è ogni soldo che ti arriva. Questo mese: 20 € di paghetta e 50 € dal compleanno. Quanto ti è entrato?",
        "options": [
          {
            "text": "70 €",
            "right": true
          },
          {
            "text": "20 €",
            "right": false,
            "why": "Hai contato solo la paghetta. Anche il regalo è un'entrata: 20 + 50 = 70 €."
          },
          {
            "text": "50 €",
            "right": false,
            "why": "Hai contato solo il regalo. Anche la paghetta è un'entrata: 20 + 50 = 70 €."
          }
        ],
        "explain": "I regali sono l'entrata più diffusa: in Italia li riceve l'87% dei quindicenni, la paghetta senza fare niente il 59% (OCSE, PISA 2022). Lasciarli fuori vuol dire sbagliare il conto dall'inizio.",
        "theory": "Un'entrata è ogni soldo che ti arriva: paghetta, regali, un lavoretto, una cosa venduta. Contarle tutte è il primo passo per sapere quanto hai davvero.",
        "words": [
          [
            "entrata",
            "i soldi che ti arrivano"
          ]
        ]
      },
      {
        "n": 2,
        "type": "vf",
        "label": "nuovo, con aiuto",
        "moment": "la provi subito",
        "idea": null,
        "help": "Vero o falso: leggi la frase e dimmi se regge.",
        "mentor": "Se vendi online un videogioco che non usi più, i 15 € non contano come entrata.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Contano: sono 15 € che ti arrivano. Regalo, paghetta o vendita, ogni soldo che arriva è un'entrata."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Il conto del mese è giusto solo se dentro c'è tutto: basta un'entrata dimenticata e non sai più quanto avevi davvero."
      },
      {
        "n": 3,
        "type": "abbina",
        "label": "già noto",
        "moment": "le parole del conto",
        "idea": "uscite e saldo",
        "mentor": "Metti ogni parola accanto a quello che vuol dire.",
        "pairs": [
          {
            "left": "Entrata",
            "right": "i soldi che ti arrivano",
            "why": "L'entrata è quello che arriva: il regalo, la paghetta."
          },
          {
            "left": "Uscita",
            "right": "i soldi che spendi",
            "why": "L'uscita è quello che esce: la merenda, la ricarica."
          },
          {
            "left": "Saldo",
            "right": "quello che resta",
            "why": "Il saldo è la differenza: entrate meno uscite."
          }
        ],
        "explain": "Con queste tre parole si fa ogni conto, dalla tua paghetta ai conti della nostra azienda: cambiano solo i numeri.",
        "theory": "Le uscite sono i soldi che spendi. Il saldo è quello che resta: entrate meno uscite. Se il saldo scende sotto zero, hai speso più di quanto avevi.",
        "words": [
          [
            "saldo",
            "quello che resta, entrate meno uscite"
          ]
        ]
      },
      {
        "n": 4,
        "type": "completa",
        "label": "già noto",
        "moment": "la provi di nuovo",
        "idea": null,
        "mentor": "Completa il conto.",
        "sentence": "Entrano 50 €, escono 50 €: il saldo è ___.",
        "options": [
          {
            "text": "zero",
            "right": true
          },
          {
            "text": "50 €",
            "right": false,
            "why": "50 € sono quelli entrati. Ne sono usciti altrettanti: 50 − 50 = 0."
          },
          {
            "text": "100 €",
            "right": false,
            "why": "Entrate e uscite non si sommano: il saldo è la differenza, 50 − 50 = 0."
          }
        ],
        "explain": "Ecco perché conta quanto resta, non quanto entra: 50 € entrati e 50 spesi ti lasciano come se non fosse arrivato niente.",
        "words": [
          [
            "saldo",
            "quello che resta, entrate meno uscite"
          ]
        ]
      },
      {
        "n": 5,
        "type": "slider",
        "label": "già noto",
        "moment": "la situazione vera",
        "idea": null,
        "mentor": "Una merenda da 2 € ogni giorno, per 30 giorni. Quanto fa?",
        "slider": {
          "min": 0,
          "max": 120,
          "step": 5,
          "unit": "€"
        },
        "range": [
          60,
          60
        ],
        "explain": "Una spesa piccola fatta ogni giorno diventa grande senza farsi notare: nessuno scontrino dice 60 €, ma il mese sì.",
        "low": "Di più: 2 € per 30 giorni fanno 60 €.",
        "high": "Di meno: 2 € per 30 giorni fanno 60 €."
      },
      {
        "n": 6,
        "type": "ordina",
        "label": "già noto",
        "moment": "un passo in più",
        "idea": null,
        "mentor": "Vuoi scoprire dove sono finiti i soldi del mese. In che ordine fai le cose?",
        "order": [
          "Segna ogni spesa",
          "Somma le spese",
          "Togli la somma dalle entrate",
          "Guarda se il saldo è sopra o sotto zero"
        ],
        "explain": "Le spese segnate una per una rispondono anche a \"dove sono finiti?\": il saldo dice quanto manca, l'elenco dice dove.",
        "why": "Ogni passo usa quello prima: senza le spese segnate non c'è niente da sommare, senza la somma non c'è niente da togliere, e il saldo arriva per ultimo."
      },
      {
        "n": 7,
        "type": "scenario",
        "label": "già noto",
        "moment": "rivedi la scelta",
        "idea": null,
        "mentor": "Ultima. Vuoi la felpa e la merenda ogni giorno, senza finire sotto zero. Come fai?",
        "situation": "Questo mese hai 70 €. Le merende al bar, 2 € al giorno, fanno 60 €. In vetrina c'è una felpa da 45 €.",
        "options": [
          {
            "text": "La compro, e la merenda la porto da casa",
            "right": true
          },
          {
            "text": "La compro, e la merenda la prendo al bar",
            "right": false,
            "why": "Dopo la felpa restano 25 €: le merende al bar bastano per dodici giorni su trenta."
          },
          {
            "text": "Aspetto e la compro con quello che avanza a fine mese",
            "right": false,
            "why": "Tolte le merende avanzano 10 €, e la felpa ne costa 45: questo mese non ci arrivi."
          }
        ],
        "ifRight": "Felpa presa, merenda ogni giorno, e a fine mese restano 25 €.",
        "explain": "Il conto non serve solo a dire di no: ti fa vedere cosa cambiare perché una spesa ci stia."
      }
    ],
    "test": true
  }
};
export const CASES = {
  "prova": {
    "id": "p1-caso",
    "floor": 1,
    "title": "Il Caso di prova",
    "story": [
      {
        "kind": "scena",
        "text": "Lunedì mattina. Sulla scrivania c'è la prima busta dell'azienda: 200 € da uno sponsor del quartiere."
      },
      {
        "kind": "mentore",
        "text": "Il nostro primo incasso. Prima di festeggiare, facciamo le cose per bene."
      },
      {
        "kind": "scelta",
        "text": "Da dove cominciamo?",
        "uses": "L1",
        "options": [
          {
            "text": "Scriviamo quanto entra e quanto esce questo mese",
            "right": true
          },
          {
            "text": "Compriamo subito la luce nuova per i video",
            "right": false,
            "scene": "Un mese dopo. La luce è bellissima, ma a metà mese mancano i soldi per l'abbonamento al programma di montaggio."
          },
          {
            "text": "Li lasciamo nella busta, poi vediamo",
            "right": false,
            "scene": "Un mese dopo. La busta è più leggera e nessuno sa dire dove siano finiti 40 €."
          }
        ]
      },
      {
        "kind": "mentore",
        "text": "Bene. Il conto dice: 200 € entrano, 120 € escono già di sicuro."
      },
      {
        "kind": "scena",
        "text": "Qualcuno propone il caffè per tutti, ogni mattina: 1,50 € a testa, per 20 giorni, per due persone."
      },
      {
        "kind": "scelta",
        "text": "Quanto ci costa in un mese?",
        "uses": "L1",
        "options": [
          {
            "text": "60 €",
            "right": true
          },
          {
            "text": "3 €",
            "right": false,
            "scene": "Un mese dopo. Il conto del bar arriva: 60 €. Il caffè costava poco, ma ogni giorno."
          },
          {
            "text": "30 €",
            "right": false,
            "scene": "Un mese dopo. Il conto del bar arriva: 60 €. Ci eravamo dimenticati di contare anche te."
          }
        ]
      },
      {
        "kind": "mentore",
        "text": "Ecco. Le spese piccole si sommano. Ne restano 20, e lo sponsor il mese prossimo non è sicuro."
      },
      {
        "kind": "scelta",
        "text": "Cosa facciamo con quei 20 €?",
        "uses": "L1",
        "options": [
          {
            "text": "Li teniamo da parte per un imprevisto",
            "right": true
          },
          {
            "text": "Li spendiamo, il mese prossimo arriva altro",
            "right": false,
            "scene": "Un mese dopo. Si rompe il cavalletto della telecamera, e in cassa non c'è niente per sostituirlo."
          }
        ]
      },
      {
        "kind": "trappola"
      },
      {
        "kind": "finale",
        "text": "Un mese dopo. Si rompe il cavalletto della telecamera. Lo ricompriamo con i 20 € tenuti da parte, e i video escono puntuali."
      },
      {
        "kind": "gancio",
        "text": "E se ogni mese decidessimo prima quanto mettere da parte, invece di vedere cosa avanza?"
      }
    ],
    "test": true
  }
};
export const TRAPS = {
  "1": {
    "alto-innovativo": "Lo so, la cosa nuova e luccicante chiama sempre per prima. Chiama anche me. Per questo prima il budget, poi vediamo se è davvero un'occasione.",
    "alto-tradizionale": "Lo so, viene voglia di puntare tutto su quello che conosci meglio. Viene anche a me. Per questo il budget divide i soldi prima dell'entusiasmo.",
    "basso-innovativo": "Lo so, avresti fatto ancora un confronto, e poi un altro. Anch'io. Ma un budget fatto oggi vale più di quello perfetto del mese prossimo.",
    "basso-tradizionale": "Lo so, tenere i soldi fermi sembra la scelta più tranquilla. Sembra anche a me. Ma fermi non decidono niente: il budget dà a ognuno un compito."
  }
};
export const FIELDS = {
  "prova": {
    "id": "p1-campo",
    "floor": 1,
    "title": "Un mese di paghetta",
    "start": 5000,
    "below": "Siamo sotto zero. Succede, e il mese non è finito: adesso sappiamo dove guardare.",
    "story": [
      {
        "kind": "scena",
        "text": "Il primo del mese arrivano 50 €: la paghetta di tutto il mese."
      },
      {
        "kind": "mentore",
        "text": "Quattro settimane, una scelta a settimana. I soldi sono finti, le scelte no: il saldo lo vedi sempre in alto."
      },
      {
        "kind": "settimana",
        "n": 1
      },
      {
        "kind": "scena",
        "text": "Sabato, al centro commerciale. Le cuffie che volevi sono in offerta: \"−30%, solo oggi\", 35 €. Sul telefono le trovi online allo stesso prezzo, senza scadenza. Le tue, intanto, funzionano ancora."
      },
      {
        "kind": "scelta",
        "text": "Le prendi?",
        "week": 1,
        "key": true,
        "uses": "L5",
        "recap": "Sabato, al centro commerciale. Le cuffie che volevi sono in offerta: \"−30%, solo oggi\", 35 €. Sul telefono le trovi online allo stesso prezzo, senza scadenza. Le tue, intanto, funzionano ancora.",
        "options": [
          {
            "text": "Ci penso una settimana",
            "right": true,
            "cents": 0,
            "then": "Passa la settimana: le cuffie costano sempre 35 €, qui e online. Le tue funzionano, e i soldi sono ancora lì."
          },
          {
            "text": "Le prendo subito: è un'occasione",
            "right": false,
            "cents": -3500,
            "then": "Suonano benissimo. Ma era il prezzo di sempre, e più di metà del mese se n'è andata al primo sabato."
          },
          {
            "text": "Prendo quelle da 20 € lì accanto",
            "right": false,
            "cents": -2000,
            "then": "Costano meno, ma non sono quelle che volevi, e le tue funzionavano ancora: 20 € per delle cuffie che non servivano."
          }
        ],
        "best": "Le tue funzionavano e online costavano uguale, senza \"solo oggi\": aspettare non faceva perdere niente. Quella scritta serve solo a farti decidere in fretta."
      },
      {
        "kind": "settimana",
        "n": 2
      },
      {
        "kind": "scena",
        "text": "All'intervallo c'è il distributore: 1,50 € a merendina, ogni giorno."
      },
      {
        "kind": "scelta",
        "text": "E questa settimana?",
        "week": 2,
        "key": false,
        "uses": "L1",
        "recap": "All'intervallo c'è il distributore: 1,50 € a merendina, ogni giorno.",
        "options": [
          {
            "text": "Merenda da casa, e il venerdì il distributore con gli altri",
            "right": true,
            "cents": -150,
            "then": "Quattro giorni di panino da casa, il venerdì la merendina in compagnia."
          },
          {
            "text": "Il distributore tutti i giorni",
            "right": false,
            "cents": -750,
            "then": "Sembrava poco. Cinque merendine fanno 7,50 €: in un mese sarebbero 30."
          }
        ]
      },
      {
        "kind": "settimana",
        "n": 3
      },
      {
        "kind": "scena",
        "text": "Mercoledì il caricatore del telefono smette di funzionare. Senza, il telefono si spegne: ne serve uno nuovo."
      },
      {
        "kind": "scelta",
        "text": "Quale prendi?",
        "week": 3,
        "key": true,
        "uses": "L5",
        "recap": "Mercoledì il caricatore del telefono smette di funzionare. Senza, il telefono si spegne: ne serve uno nuovo.",
        "options": [
          {
            "text": "Quello compatibile da 12 €, con la garanzia",
            "right": true,
            "cents": -1200,
            "then": "Funziona, e se si rompe lo cambiano."
          },
          {
            "text": "Quello della marca del telefono, da 25 €",
            "right": false,
            "cents": -2500,
            "then": "Funziona come quello da 12 €. Il nome sulla scatola costa 13 € in più."
          },
          {
            "text": "Quello da 4 € della bancarella",
            "right": false,
            "cents": -1600,
            "then": "Dopo una settimana scalda e si ferma. Ne compri uno da 12 €: in tutto 16 €."
          }
        ],
        "best": "Un imprevisto non si sceglie, ma come pagarlo sì: quello che fa il suo lavoro e ha la garanzia. Il più economico, alla fine, costava 16 €."
      },
      {
        "kind": "settimana",
        "n": 4
      },
      {
        "kind": "scena",
        "text": "Venerdì arriva un'email: \"La tua prova gratuita di MusicaPiù finisce domani. Poi 9,99 € al mese.\""
      },
      {
        "kind": "scelta",
        "text": "Cosa fai?",
        "week": 4,
        "key": false,
        "uses": "L1",
        "recap": "Venerdì arriva un'email: \"La tua prova gratuita di MusicaPiù finisce domani. Poi 9,99 € al mese.\"",
        "options": [
          {
            "text": "La disdico oggi: la musica gratis con la pubblicità mi basta",
            "right": true,
            "cents": 0,
            "then": "Domani nessun addebito. La musica c'è ancora, con qualche pubblicità in mezzo."
          },
          {
            "text": "La lascio, ci penso il mese prossimo",
            "right": false,
            "cents": -999,
            "then": "Sabato arriva l'addebito: 9,99 €. E il mese prossimo arriva di nuovo."
          }
        ]
      },
      {
        "kind": "finale",
        "text": "Fine mese. Quello che resta va nel salvadanaio.",
        "textNeg": "Fine mese. I soldi che mancano li ha anticipati tua sorella: il mese prossimo si parte restituendoli."
      },
      {
        "kind": "trappola"
      },
      {
        "kind": "gancio",
        "text": "Il salvadanaio è sulla scrivania. Ma i soldi non stanno solo lì dentro: conti, carte, abbonamenti come quello di venerdì. Al piano di sopra ci pensa la Tesoreria."
      }
    ],
    "test": true
  }
};
