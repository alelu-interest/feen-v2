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
        "mentor": "Da dove arrivano più spesso i soldi di chi ha 15 anni?",
        "options": [
          {
            "text": "Regali di parenti e amici",
            "right": true
          },
          {
            "text": "Paghetta senza fare niente",
            "right": false,
            "why": "Tanti, il 59%. Ma i regali arrivano a quasi tutti: l'87%."
          },
          {
            "text": "Vendere cose online",
            "right": false,
            "why": "Lo fa una minoranza. I regali arrivano a quasi tutti: l'87%."
          }
        ],
        "explain": "Ogni soldo che ti arriva è un'entrata, anche quello del compleanno.",
        "theory": "Un'entrata è ogni soldo che ti arriva: paghetta, regali, un lavoretto. Contarle tutte è il primo passo per sapere quanto hai davvero.",
        "source": "OCSE, PISA 2022 · Italia",
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
        "mentor": "2 € al giorno sono meno di 50 € al mese.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "In 30 giorni fanno 60 €: più dei 50 € del compleanno."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Le spese piccole si sommano: moltiplica sempre per i giorni."
      },
      {
        "n": 3,
        "type": "abbina",
        "label": "già noto",
        "moment": "l'errore tipico",
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
        "explain": "Entrate meno uscite fa il saldo: è il numero che conta.",
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
        "mentor": "Completa la regola di oggi.",
        "sentence": "Conta quanto ___, non quanto entra.",
        "options": [
          {
            "text": "resta",
            "right": true
          },
          {
            "text": "costa",
            "right": false,
            "why": "Quanto costa una cosa sola dice poco: conta quello che ti rimane."
          },
          {
            "text": "spendi",
            "right": false,
            "why": "Quasi: ma quello che spendi ha senso solo accanto a quello che entra. Il numero è quanto resta."
          }
        ],
        "explain": "Il saldo è la misura giusta: dice se a fine mese ci arrivi."
      },
      {
        "n": 5,
        "type": "slider",
        "label": "già noto",
        "moment": "la situazione vera",
        "idea": null,
        "mentor": "Una merenda da 2 € ogni giorno, per 30 giorni. Quanto fa?",
        "slider": {
          "min": 0,
          "max": 120,
          "step": 5,
          "unit": ""
        },
        "range": [
          60,
          60
        ],
        "explain": "Prezzo per volte: 2 × 30 = 60.",
        "low": "Di più: 2 € per 30 giorni fanno 60 €.",
        "high": "Di meno: 2 € per 30 giorni fanno 60 €."
      },
      {
        "n": 6,
        "type": "ordina",
        "label": "già noto",
        "moment": "un passo in più",
        "idea": null,
        "mentor": "Vuoi scoprire dove sono finiti i soldi. In che ordine fai le cose?",
        "order": [
          "Scrivi quanto avevi",
          "Segna ogni spesa",
          "Somma le spese",
          "Togli il totale da quanto avevi"
        ],
        "explain": "Partenza, spese, somma, differenza: così il conto torna sempre.",
        "why": "Prima il punto di partenza, poi le spese una per una, poi la somma, e solo alla fine la sottrazione."
      },
      {
        "n": 7,
        "type": "scenario",
        "label": "già noto",
        "moment": "rivedi la scelta",
        "idea": null,
        "mentor": "Ultima. Cosa fai?",
        "situation": "Hai 50 € del compleanno. Il primo giorno vedi una felpa da 45 €.",
        "options": [
          {
            "text": "Ti fai il conto del mese prima di comprarla",
            "right": true
          },
          {
            "text": "La compri subito",
            "right": false,
            "why": "Ti restano 5 € per tutto il mese: le merende da 2 € finiscono al terzo giorno."
          }
        ],
        "ifRight": "Col conto davanti sai cosa ti resta: se la compri, sai anche a cosa rinunci.",
        "explain": "Prima il conto, poi la scelta: così il saldo non ti sorprende."
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
        "text": "Lunedì mattina. Sulla scrivania c'è la prima busta dell'azienda: 200 € da uno sponsor del quartiere."
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
            "scene": "Un mese dopo. La busta è più leggera e nessuno sa dire dove siano finiti 40 €."
          }
        ]
      },
      {
        "kind": "mentore",
        "text": "Bene. Il conto dice: 200 € entrano, 120 € escono già di sicuro."
      },
      {
        "kind": "scena",
        "text": "Qualcuno propone il caffè per tutti, ogni mattina: 1,50 € a testa, per 20 giorni, per due persone."
      },
      {
        "kind": "scelta",
        "text": "Quanto ci costa in un mese?",
        "uses": "L1",
        "options": [
          {
            "text": "60 €",
            "right": true
          },
          {
            "text": "3 €",
            "right": false,
            "scene": "Un mese dopo. Il conto del bar arriva: 60 €. Il caffè costava poco, ma ogni giorno."
          },
          {
            "text": "30 €",
            "right": false,
            "scene": "Un mese dopo. Il conto del bar arriva: 60 €. Ci eravamo dimenticati di contare anche te."
          }
        ]
      },
      {
        "kind": "mentore",
        "text": "Ecco. Le spese piccole si sommano. Ne restano 20."
      },
      {
        "kind": "scelta",
        "text": "Cosa facciamo con quei 20 €?",
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
        "text": "Un mese dopo. Si rompe il cavalletto della telecamera. Lo ricompriamo con i 20 € tenuti da parte, e i video escono puntuali."
      },
      {
        "kind": "gancio",
        "text": "E se ogni mese decidessimo prima quanto mettere da parte, invece di vedere cosa avanza?"
      }
    ],
    "test": true
  }
};
