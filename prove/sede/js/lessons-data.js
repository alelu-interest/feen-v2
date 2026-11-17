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
        "variants": [
          {
            "mentor": "Un'entrata è ogni soldo che ti arriva. Questo mese: 30 € di paghetta e 40 € dal compleanno. Quanto ti è entrato?",
            "options": [
              {
                "text": "70 €",
                "right": true
              },
              {
                "text": "30 €",
                "right": false,
                "why": "Hai contato solo la paghetta. Anche il regalo è un'entrata: 30 + 40 = 70 €."
              },
              {
                "text": "40 €",
                "right": false,
                "why": "Hai contato solo il regalo. Anche la paghetta è un'entrata: 30 + 40 = 70 €."
              }
            ]
          },
          {
            "mentor": "Un'entrata è ogni soldo che ti arriva. Questo mese: 15 € di paghetta e 60 € dal compleanno. Quanto ti è entrato?",
            "options": [
              {
                "text": "75 €",
                "right": true
              },
              {
                "text": "15 €",
                "right": false,
                "why": "Hai contato solo la paghetta. Anche il regalo è un'entrata: 15 + 60 = 75 €."
              },
              {
                "text": "60 €",
                "right": false,
                "why": "Hai contato solo il regalo. Anche la paghetta è un'entrata: 15 + 60 = 75 €."
              }
            ]
          },
          {
            "mentor": "Un'entrata è ogni soldo che ti arriva. Questo mese: 25 € di paghetta e 35 € dal compleanno. Quanto ti è entrato?",
            "options": [
              {
                "text": "60 €",
                "right": true
              },
              {
                "text": "25 €",
                "right": false,
                "why": "Hai contato solo la paghetta. Anche il regalo è un'entrata: 25 + 35 = 60 €."
              },
              {
                "text": "35 €",
                "right": false,
                "why": "Hai contato solo il regalo. Anche la paghetta è un'entrata: 25 + 35 = 60 €."
              }
            ]
          }
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
        ],
        "variants": [
          {
            "sentence": "Entrano 30 €, escono 30 €: il saldo è ___.",
            "explain": "Ecco perché conta quanto resta, non quanto entra: 30 € entrati e 30 spesi ti lasciano come se non fosse arrivato niente.",
            "options": [
              {
                "text": "zero",
                "right": true
              },
              {
                "text": "30 €",
                "right": false,
                "why": "30 € sono quelli entrati. Ne sono usciti altrettanti: 30 − 30 = 0."
              },
              {
                "text": "60 €",
                "right": false,
                "why": "Entrate e uscite non si sommano: il saldo è la differenza, 30 − 30 = 0."
              }
            ]
          },
          {
            "sentence": "Entrano 80 €, escono 80 €: il saldo è ___.",
            "explain": "Ecco perché conta quanto resta, non quanto entra: 80 € entrati e 80 spesi ti lasciano come se non fosse arrivato niente.",
            "options": [
              {
                "text": "zero",
                "right": true
              },
              {
                "text": "80 €",
                "right": false,
                "why": "80 € sono quelli entrati. Ne sono usciti altrettanti: 80 − 80 = 0."
              },
              {
                "text": "160 €",
                "right": false,
                "why": "Entrate e uscite non si sommano: il saldo è la differenza, 80 − 80 = 0."
              }
            ]
          },
          {
            "sentence": "Entrano 20 €, escono 20 €: il saldo è ___.",
            "explain": "Ecco perché conta quanto resta, non quanto entra: 20 € entrati e 20 spesi ti lasciano come se non fosse arrivato niente.",
            "options": [
              {
                "text": "zero",
                "right": true
              },
              {
                "text": "20 €",
                "right": false,
                "why": "20 € sono quelli entrati. Ne sono usciti altrettanti: 20 − 20 = 0."
              },
              {
                "text": "40 €",
                "right": false,
                "why": "Entrate e uscite non si sommano: il saldo è la differenza, 20 − 20 = 0."
              }
            ]
          }
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
          "max": 100,
          "step": 5,
          "unit": "€"
        },
        "range": [
          60,
          60
        ],
        "explain": "Una spesa piccola fatta ogni giorno diventa grande senza farsi notare: nessuno scontrino dice 60 €, ma il mese sì.",
        "low": "Di più: 2 € per 30 giorni fanno 60 €.",
        "high": "Di meno: 2 € per 30 giorni fanno 60 €.",
        "variants": [
          {
            "mentor": "Una merenda da 3 € ogni giorno, per 30 giorni. Quanto fa?",
            "explain": "Una spesa piccola fatta ogni giorno diventa grande senza farsi notare: nessuno scontrino dice 90 €, ma il mese sì.",
            "low": "Di più: 3 € per 30 giorni fanno 90 €.",
            "high": "Di meno: 3 € per 30 giorni fanno 90 €.",
            "range": [
              90,
              90
            ]
          },
          {
            "mentor": "Una merenda da 1 € ogni giorno, per 30 giorni. Quanto fa?",
            "explain": "Una spesa piccola fatta ogni giorno diventa grande senza farsi notare: nessuno scontrino dice 30 €, ma il mese sì.",
            "low": "Di più: 1 € per 30 giorni fanno 30 €.",
            "high": "Di meno: 1 € per 30 giorni fanno 30 €.",
            "range": [
              30,
              30
            ]
          },
          {
            "mentor": "Una merenda da 1,50 € ogni giorno, per 30 giorni. Quanto fa?",
            "explain": "Una spesa piccola fatta ogni giorno diventa grande senza farsi notare: nessuno scontrino dice 45 €, ma il mese sì.",
            "low": "Di più: 1,50 € per 30 giorni fanno 45 €.",
            "high": "Di meno: 1,50 € per 30 giorni fanno 45 €.",
            "range": [
              45,
              45
            ]
          }
        ]
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
        "mentor": "Vuoi la felpa e la merenda ogni giorno, senza finire sotto zero. Come fai?",
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
  },
  "p1-l1": {
    "id": "p1-l1",
    "code": "L1",
    "floor": 1,
    "title": "Entrate, uscite e saldo: dove finiscono i tuoi soldi",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Entrate, uscite e saldo",
        "mentor": "Metti in ordine di tipo: abbonamento ai mezzi, pizza con amici, regalo di compleanno ricevuto, ricarica del telefono con importo costante, paghetta.",
        "options": [
          {
            "text": "Fisse: mezzi e pizza · Variabile: ricarica · Entrate: regalo e paghetta",
            "right": false,
            "why": "Una spesa è fissa se l’importo è uguale ogni mese."
          },
          {
            "text": "Fisse: mezzi · Variabili: pizza e ricarica · Entrate: regalo e paghetta",
            "right": false,
            "why": "Una spesa è fissa se l’importo è uguale ogni mese."
          },
          {
            "text": "Fisse: mezzi, ricarica e paghetta · Variabili: pizza e regalo",
            "right": false,
            "why": "Una spesa è fissa se l’importo è uguale ogni mese."
          },
          {
            "text": "Fisse: mezzi e ricarica · Variabile: pizza · Entrate: regalo e paghetta",
            "right": true
          }
        ],
        "theory": "Il saldo del mese è entrate meno uscite: se è positivo si accumula patrimonio, se è negativo si consuma ciò che si ha o ci si fa prestare soldi.",
        "explain": "Le uscite si dividono in fisse (stesso importo ogni mese: abbonamento ai mezzi, ricarica del telefono, un abbonamento streaming) e variabili (cambiano: pizza con gli amici, vestiti, snack, giochi)."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se a fine mese ho un saldo positivo, il mio patrimonio è per forza alto.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Il saldo è un flusso del mese, il patrimonio dipende da tutti i mesi precedenti."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Puoi avere un saldo positivo di 20 € al mese e un patrimonio di 60 €, oppure un patrimonio di 300 € e un saldo negativo che lo sta erodendo."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Entrate 95 € (60 € di paghetta e 35 € di un lavoretto), spese fisse 25 €, spese variabili 58 €. Qual è il saldo?",
        "options": [
          {
            "text": "−12 €",
            "right": false,
            "why": "95 − (25 + 58) = 95 − 83 = +12 €."
          },
          {
            "text": "+37 €",
            "right": false,
            "why": "95 − (25 + 58) = 95 − 83 = +12 €."
          },
          {
            "text": "+70 €",
            "right": false,
            "why": "95 − (25 + 58) = 95 − 83 = +12 €."
          },
          {
            "text": "+12 €",
            "right": true
          }
        ],
        "explain": "Le entrate sono i soldi che ricevi: paghetta, lavoretti (ripetizioni, babysitting, aiuto in un’attività di famiglia), regali, rimborsi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 60 € a inizio mese. Ricevi 40 € di paghetta e spendi 30 € di spese fisse e 55 € di variabili. Quanto ti resta?",
            "options": [
              {
                "text": "25 €",
                "right": false,
                "why": "60 + 40 − 85 = 15 €."
              },
              {
                "text": "15 €",
                "right": true
              },
              {
                "text": "−15 €",
                "right": false,
                "why": "60 + 40 − 85 = 15 €."
              },
              {
                "text": "45 €",
                "right": false,
                "why": "60 + 40 − 85 = 15 €."
              }
            ],
            "explain": "Le uscite si dividono in fisse (stesso importo ogni mese: abbonamento ai mezzi, ricarica del telefono, un abbonamento streaming) e variabili (cambiano: pizza con gli amici, vestiti, snack, giochi)."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Sulla prepagata hai 40 € a inizio mese e il saldo del mese è −10 €. Quanto ci sarà a fine mese, e dopo quanti mesi finiscono i soldi se il saldo resta uguale?",
        "options": [
          {
            "text": "30 € a fine mese; i soldi finiscono dopo altri 4 mesi",
            "right": false,
            "why": "40 − 10 = 30 €; con −10 € al mese, 30 € durano altri 3 mesi."
          },
          {
            "text": "30 € a fine mese; i soldi finiscono dopo altri 2 mesi",
            "right": false,
            "why": "40 − 10 = 30 €; con −10 € al mese, 30 € durano altri 3 mesi."
          },
          {
            "text": "50 € a fine mese; i soldi non finiscono",
            "right": false,
            "why": "40 − 10 = 30 €; con −10 € al mese, 30 € durano altri 3 mesi."
          },
          {
            "text": "30 € a fine mese; i soldi finiscono dopo altri 3 mesi",
            "right": true
          }
        ],
        "explain": "Per questo il saldo si calcola sui movimenti reali (prepagata, app, scontrini), non a memoria. Dire «non spendo molto» senza aver sommato i movimenti: si ricordano le spese grandi e si dimenticano le piccole ricorrenti.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Entrate: 350 € dal part-time e 120 € dalla famiglia. Uscite: 250 € di affitto e bollette, 60 € di abbonamenti e 90 € di spese varie. Saldo del mese?",
            "options": [
              {
                "text": "−70 €",
                "right": false,
                "why": "470 − 400 = +70 €."
              },
              {
                "text": "+70 €",
                "right": true
              },
              {
                "text": "+160 €",
                "right": false,
                "why": "470 − 400 = +70 €."
              },
              {
                "text": "+470 €",
                "right": false,
                "why": "470 − 400 = +70 €."
              }
            ],
            "explain": "Le uscite si dividono in fisse (stesso importo ogni mese: abbonamento ai mezzi, ricarica del telefono, un abbonamento streaming) e variabili (cambiano: pizza con gli amici, vestiti, snack, giochi)."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "Marco dice: «Ho speso 60 €», ma i movimenti mostrano 60 € più 15 € in contanti prelevati e non ricordati. Quale tipo di spesa ha dimenticato?",
        "options": [
          {
            "text": "Spese invisibili (contanti)",
            "right": true
          },
          {
            "text": "Spese fisse",
            "right": false,
            "why": "Il prelievo è un’uscita anche se non ricordi cosa hai comprato."
          },
          {
            "text": "Entrate occasionali",
            "right": false,
            "why": "Il prelievo è un’uscita anche se non ricordi cosa hai comprato."
          },
          {
            "text": "Spese ricorrenti da abbonamento",
            "right": false,
            "why": "Il prelievo è un’uscita anche se non ricordi cosa hai comprato."
          }
        ],
        "explain": "Il motivo per cui molti non sanno dove vanno i soldi è che le uscite invisibili (contanti, piccoli acquisti, pagamenti con carta o telefono, acquisti dentro i giochi) non si sentono come quelle fisse.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Stipendio netto 1.200 €. Affitto condiviso 400 €, bollette 80 €, trasporti 50 €, spesa 180 €, uscite 120 €. Saldo?",
            "options": [
              {
                "text": "−370 €",
                "right": false,
                "why": "1.200 − 830 = +370 €."
              },
              {
                "text": "+370 €",
                "right": true
              },
              {
                "text": "+830 €",
                "right": false,
                "why": "1.200 − 830 = +370 €."
              },
              {
                "text": "+1.200 €",
                "right": false,
                "why": "1.200 − 830 = +370 €."
              }
            ],
            "explain": "Il saldo è un flusso: misura quanto entra ed esce in un periodo. Il patrimonio è uno stock: quanto possiedi in un dato giorno."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Sara ha saldo −26 €. Cosa fa per primo:",
        "options": [
          {
            "text": "Ridurre subito le spese fisse: si cambiano in un giorno",
            "right": false,
            "why": "Il saldo del mese è entrate meno uscite: se è positivo si accumula patrimonio, se è negativo si consuma ciò che si ha o ci si fa prestare soldi."
          },
          {
            "text": "Ridurre le spese variabili: è la leva più realistica nel breve",
            "right": true
          },
          {
            "text": "Non fare nulla: il saldo si sistema da solo",
            "right": false,
            "why": "Il saldo del mese è entrate meno uscite: se è positivo si accumula patrimonio, se è negativo si consuma ciò che si ha o ci si fa prestare soldi."
          },
          {
            "text": "Chiedere un prestito per coprire il saldo",
            "right": false,
            "why": "Il saldo del mese è entrate meno uscite: se è positivo si accumula patrimonio, se è negativo si consuma ciò che si ha o ci si fa prestare soldi."
          }
        ],
        "explain": "Il saldo è un flusso: misura quanto entra ed esce in un periodo. Il patrimonio è uno stock: quanto possiedi in un dato giorno."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso/collegamento",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Perché pagando con carta o telefono si perde il senso della spesa rispetto ai contanti?",
        "options": [
          {
            "text": "Con la carta si spende sempre di meno",
            "right": false,
            "why": "Senza un gesto fisico si sente meno la spesa; per questo conviene controllare i movimenti reali."
          },
          {
            "text": "I contanti non si possono perdere",
            "right": false,
            "why": "Senza un gesto fisico si sente meno la spesa; per questo conviene controllare i movimenti reali."
          },
          {
            "text": "Il pagamento non è «fisico»: non vedi uscire i soldi",
            "right": true
          },
          {
            "text": "La carta non lascia traccia dei movimenti",
            "right": false,
            "why": "Senza un gesto fisico si sente meno la spesa; per questo conviene controllare i movimenti reali."
          }
        ],
        "explain": "Il controllo corretto parte dai movimenti reali."
      }
    ],
    "source": "C01-L01"
  },
  "p1-l2": {
    "id": "p1-l2",
    "code": "L2",
    "floor": 1,
    "title": "Bisogni, desideri e costo-opportunità",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Bisogni, desideri e costo-opportunità",
        "mentor": "Metti in colonna bisogno o desiderio, sapendo che la scuola è in un altro paese: abbonamento ai mezzi, nuova console, pranzo, cena in pizzeria con amici.",
        "options": [
          {
            "text": "Bisogni: mezzi e pranzo · Desideri: console e pizzeria",
            "right": true
          },
          {
            "text": "Bisogni: mezzi e console · Desideri: pranzo e pizzeria",
            "right": false,
            "why": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci."
          },
          {
            "text": "Bisogni: tutti e quattro",
            "right": false,
            "why": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci."
          },
          {
            "text": "Desideri: tutti e quattro",
            "right": false,
            "why": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci."
          }
        ],
        "theory": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci.",
        "explain": "Per questo la domanda utile non è «bisogno o desiderio?», ma «quanta parte di questa spesa è bisogno e quanta desiderio?»."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Il costo di un acquisto è solo il suo prezzo.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "C’è anche il costo-opportunità, cioè ciò a cui rinunci."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Pensare che «si costa poco, non conta»: i piccoli acquisti ripetuti spostano il bilancio più di un acquisto grande una tantum (lo vediamo in L3)."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Scarpe da 120 €, guadagni 8 € netti all’ora. Quante ore di lavoro?",
        "options": [
          {
            "text": "12 ore",
            "right": false,
            "why": "120 ÷ 8 = 15 ore di lavoro."
          },
          {
            "text": "20 ore",
            "right": false,
            "why": "120 ÷ 8 = 15 ore di lavoro."
          },
          {
            "text": "960 ore",
            "right": false,
            "why": "120 ÷ 8 = 15 ore di lavoro."
          },
          {
            "text": "15 ore",
            "right": true
          }
        ],
        "explain": "Un modo concreto per sentirlo è convertire il prezzo in ore di lavoro: se guadagni 8 € netti all’ora con un lavoretto, una felpa da 120 € sono 15 ore di lavoro.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una felpa costa 60 € e guadagni 10 € a ripetizione. Quante ripetizioni servono?",
            "options": [
              {
                "text": "6",
                "right": true
              },
              {
                "text": "10",
                "right": false,
                "why": "60 ÷ 10 = 6."
              },
              {
                "text": "60",
                "right": false,
                "why": "60 ÷ 10 = 6."
              },
              {
                "text": "0,6",
                "right": false,
                "why": "60 ÷ 10 = 6."
              }
            ],
            "explain": "Un modo concreto per sentirlo è convertire il prezzo in ore di lavoro: se guadagni 8 € netti all’ora con un lavoretto, una felpa da 120 € sono 15 ore di lavoro."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una felpa costa 120 €: quante ore servono a chi guadagna 8 €/ora e a chi ne guadagna 20 €/ora?",
        "options": [
          {
            "text": "15 ore e 15 ore",
            "right": false,
            "why": "120 ÷ 8 = 15; 120 ÷ 20 = 6."
          },
          {
            "text": "6 ore e 15 ore",
            "right": false,
            "why": "120 ÷ 8 = 15; 120 ÷ 20 = 6."
          },
          {
            "text": "8 ore e 20 ore",
            "right": false,
            "why": "120 ÷ 8 = 15; 120 ÷ 20 = 6."
          },
          {
            "text": "15 ore e 6 ore",
            "right": true
          }
        ],
        "explain": "Se spendi 120 € per una felpa, il costo non è solo 120 €: è anche il viaggio, il corso o il risparmio che quei 120 € avrebbero finanziato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Prima di comprare un portatile da 600 € rinunci a un viaggio con gli amici. Che cos’è il viaggio?",
            "options": [
              {
                "text": "Il costo-opportunità",
                "right": true
              },
              {
                "text": "Una spesa fissa",
                "right": false,
                "why": "Il costo-opportunità è ciò a cui rinunci."
              },
              {
                "text": "Un’entrata",
                "right": false,
                "why": "Il costo-opportunità è ciò a cui rinunci."
              },
              {
                "text": "Un bisogno primario",
                "right": false,
                "why": "Il costo-opportunità è ciò a cui rinunci."
              }
            ],
            "explain": "Se spendi 120 € per una felpa, il costo non è solo 120 €: è anche il viaggio, il corso o il risparmio che quei 120 € avrebbero finanziato."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "«Costava solo 4 €, quindi non conta»: se lo fai 5 volte a settimana per un mese, quanto spendi?",
        "options": [
          {
            "text": "20 €",
            "right": false,
            "why": "4 × 5 × 4 settimane = 80 €: piccole spese ripetute pesano."
          },
          {
            "text": "80 €",
            "right": true
          },
          {
            "text": "40 €",
            "right": false,
            "why": "4 × 5 × 4 settimane = 80 €: piccole spese ripetute pesano."
          },
          {
            "text": "160 €",
            "right": false,
            "why": "4 × 5 × 4 settimane = 80 €: piccole spese ripetute pesano."
          }
        ],
        "explain": "La stessa spesa pesa in modo diverso a chi guadagna 20 € all’ora, o a chi la riceve dai genitori: ecco perché il confronto con gli amici non è un buon criterio.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Il telefono nuovo costa 480 € e guadagni 9 € netti all’ora. Quante ore di lavoro?",
            "options": [
              {
                "text": "48 ore",
                "right": false,
                "why": "480 ÷ 9 ≈ 53,3."
              },
              {
                "text": "Circa 4 ore",
                "right": false,
                "why": "480 ÷ 9 ≈ 53,3."
              },
              {
                "text": "Circa 53 ore",
                "right": true
              },
              {
                "text": "480 ore",
                "right": false,
                "why": "480 ÷ 9 ≈ 53,3."
              }
            ],
            "explain": "Un modo concreto per sentirlo è convertire il prezzo in ore di lavoro: se guadagni 8 € netti all’ora con un lavoretto, una felpa da 120 € sono 15 ore di lavoro."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai 120 €: cuffie da 120 € oppure due mesi di corso online da 60 € al mese. Quale scegli e a cosa rinunci?",
        "options": [
          {
            "text": "Le cuffie, perché costano di più",
            "right": false,
            "why": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci."
          },
          {
            "text": "Il corso, perché è sempre meglio studiare",
            "right": false,
            "why": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci."
          },
          {
            "text": "Dipende da cosa conta di più per te: la scelta giusta è quella in cui sai a cosa rinunci",
            "right": true
          },
          {
            "text": "Nessuna: è meglio non spendere mai",
            "right": false,
            "why": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci."
          }
        ],
        "explain": "Il costo-opportunità è ciò a cui rinunci scegliendo."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Sara ha saldo −26 €. Se riduce «pizza e uscite» da 45 € a 30 € e «vestiti» da 25 € a 10 €, qual è il nuovo saldo?",
        "options": [
          {
            "text": "−26 €",
            "right": false,
            "why": "Risparmia 15 € + 15 € = 30 €: −26 + 30 = +4 €."
          },
          {
            "text": "+19 €",
            "right": false,
            "why": "Risparmia 15 € + 15 € = 30 €: −26 + 30 = +4 €."
          },
          {
            "text": "−11 €",
            "right": false,
            "why": "Risparmia 15 € + 15 € = 30 €: −26 + 30 = +4 €."
          },
          {
            "text": "+4 €",
            "right": true
          }
        ],
        "explain": "Un bisogno è ciò senza cui non funzioni (cibo, trasporti per andare a scuola, materiale per studiare, salute)."
      }
    ],
    "source": "C01-L02"
  },
  "p1-l3": {
    "id": "p1-l3",
    "code": "L3",
    "floor": 1,
    "title": "Abbonamenti e spese ricorrenti: il costo che non senti",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (definizione)",
        "moment": "capire",
        "idea": "Abbonamenti e spese ricorrenti",
        "mentor": "Quale di queste è una spesa ricorrente: snack al bar, abbonamento streaming, biglietto del concerto?",
        "options": [
          {
            "text": "Lo snack al bar",
            "right": false,
            "why": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla."
          },
          {
            "text": "Il biglietto del concerto",
            "right": false,
            "why": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla."
          },
          {
            "text": "L’abbonamento streaming",
            "right": true
          },
          {
            "text": "Nessuna delle tre",
            "right": false,
            "why": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla."
          }
        ],
        "theory": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla.",
        "explain": "Una spesa ricorrente si addebita da sola a intervalli regolari: streaming, musica, abbonamenti ai giochi, cloud, app a pagamento."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Una prova gratuita non può costarmi nulla.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Se si rinnova automaticamente, dopo la prova si paga."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Molti servizi offrono una prova gratuita che poi si rinnova automaticamente a pagamento: il costo non parte il giorno in cui ti iscrivi, ma 7, 14 o 30 giorni dopo, quando probabilmente te ne sei dimenticato."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Streaming 9,99 €/mese: costo annuo?",
        "options": [
          {
            "text": "99,90 €",
            "right": false,
            "why": "9,99 × 12 = 119,88 €."
          },
          {
            "text": "9,99 €",
            "right": false,
            "why": "9,99 × 12 = 119,88 €."
          },
          {
            "text": "119,88 €",
            "right": true
          },
          {
            "text": "129,87 €",
            "right": false,
            "why": "9,99 × 12 = 119,88 €."
          }
        ],
        "explain": "Per capire quanto pesa, converti sempre in costo annuo: costo mensile × 12. Poi confronta con quanto lo usi: costo per utilizzo = costo annuo diviso numero di volte che lo usi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Il servizio musicale costa 10,99 € al mese. Costo annuo?",
            "options": [
              {
                "text": "109,90 €",
                "right": false,
                "why": "10,99 × 12 = 131,88 €."
              },
              {
                "text": "10,99 €",
                "right": false,
                "why": "10,99 × 12 = 131,88 €."
              },
              {
                "text": "120 €",
                "right": false,
                "why": "10,99 × 12 = 131,88 €."
              },
              {
                "text": "131,88 €",
                "right": true
              }
            ],
            "explain": "Per capire quanto pesa, converti sempre in costo annuo: costo mensile × 12. Poi confronta con quanto lo usi: costo per utilizzo = costo annuo diviso numero di volte che lo usi."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "App 4,99 €/mese oppure 49,90 €/anno: quanto risparmi all’anno con l’annuale?",
        "options": [
          {
            "text": "59,88 €",
            "right": false,
            "why": "4,99 × 12 = 59,88 €; 59,88 − 49,90 = 9,98 €."
          },
          {
            "text": "4,99 €",
            "right": false,
            "why": "4,99 × 12 = 59,88 €; 59,88 − 49,90 = 9,98 €."
          },
          {
            "text": "9,98 € (annuale 49,90 € contro 59,88 € a rate mensili)",
            "right": true
          },
          {
            "text": "49,90 €",
            "right": false,
            "why": "4,99 × 12 = 59,88 €; 59,88 − 49,90 = 9,98 €."
          }
        ],
        "explain": "Il confronto tra pagamento mensile e annuale richiede un calcolo, non un’impressione: se un servizio costa 4,99 € al mese o 49,90 € all’anno, l’annuale equivale a 4,16 € al mese, ma ti obbliga a pagare in anticipo e a ricordarti di disdire prima del rinnovo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Il cloud costa 2,99 € al mese e streaming 9,99 € al mese. Quanto spendi in un anno per i due?",
            "options": [
              {
                "text": "155,76 €",
                "right": true
              },
              {
                "text": "12,98 €",
                "right": false,
                "why": "12,98 × 12 = 155,76 €."
              },
              {
                "text": "129,87 €",
                "right": false,
                "why": "12,98 × 12 = 155,76 €."
              },
              {
                "text": "143,76 €",
                "right": false,
                "why": "12,98 × 12 = 155,76 €."
              }
            ],
            "explain": "Il confronto tra pagamento mensile e annuale richiede un calcolo, non un’impressione: se un servizio costa 4,99 € al mese o 49,90 € all’anno, l’annuale equivale a 4,16 € al mese, ma ti obbliga a pagare in anticipo e a ricordarti di disdire prima del rinnovo."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Pass giochi 12,99 €/mese, ci giochi 6 volte al mese: costo per sessione?",
        "options": [
          {
            "text": "Circa 2,17 €",
            "right": true
          },
          {
            "text": "Circa 12,99 €",
            "right": false,
            "why": "12,99 ÷ 6 ≈ 2,17 € a sessione."
          },
          {
            "text": "Circa 6,50 €",
            "right": false,
            "why": "12,99 ÷ 6 ≈ 2,17 € a sessione."
          },
          {
            "text": "Circa 0,50 €",
            "right": false,
            "why": "12,99 ÷ 6 ≈ 2,17 € a sessione."
          }
        ],
        "explain": "Se è un genitore, il costo c’è lo stesso: conviene parlarne prima di attivarlo. Pensare «disdico quando mi serve il budget»: nel frattempo si è già pagato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Che cosa fai se l’estratto conto mostra un addebito ricorrente che non riconosci?",
            "options": [
              {
                "text": "Controllo, e se non è mio disdico o contesto con la banca",
                "right": true
              },
              {
                "text": "Aspetto: sono pochi euro",
                "right": false,
                "why": "Un addebito ricorrente sconosciuto va verificato subito."
              },
              {
                "text": "Lo lascio: sarà utile",
                "right": false,
                "why": "Un addebito ricorrente sconosciuto va verificato subito."
              },
              {
                "text": "Chiudo il conto subito",
                "right": false,
                "why": "Un addebito ricorrente sconosciuto va verificato subito."
              }
            ],
            "explain": "Una spesa ricorrente si addebita da sola a intervalli regolari: streaming, musica, abbonamenti ai giochi, cloud, app a pagamento."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai cinque abbonamenti: quale disdici per primo, quello più caro o quello meno usato?",
        "options": [
          {
            "text": "Sempre il più caro, a prescindere dall’uso",
            "right": false,
            "why": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla."
          },
          {
            "text": "Nessuno: sono tutti piccoli importi",
            "right": false,
            "why": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla."
          },
          {
            "text": "Si guarda il costo per utilizzo: spesso il meno usato è quello da disdire anche se costa poco",
            "right": true
          },
          {
            "text": "Quello con il nome più lungo",
            "right": false,
            "why": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla."
          }
        ],
        "explain": "Il meccanismo è pensato per essere comodo: dai l’autorizzazione una volta e il pagamento continua finché non lo disdici."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "4,99 € al mese per un’app mai aperta: in ore di lavoro a 8 € netti/ora, quanto costa all’anno?",
        "options": [
          {
            "text": "Circa 4,99 ore",
            "right": false,
            "why": "59,88 ÷ 8 ≈ 7,5 ore di lavoro."
          },
          {
            "text": "Circa 7,5 ore",
            "right": true
          },
          {
            "text": "Circa 60 ore",
            "right": false,
            "why": "59,88 ÷ 8 ≈ 7,5 ore di lavoro."
          },
          {
            "text": "Circa 0,6 ore",
            "right": false,
            "why": "59,88 ÷ 8 ≈ 7,5 ore di lavoro."
          }
        ],
        "explain": "Un’ultima cosa: a 14–17 anni di solito paghi con una prepagata o con la carta di un genitore."
      }
    ],
    "source": "C01-L03"
  },
  "p1-l4": {
    "id": "p1-l4",
    "code": "L4",
    "floor": 1,
    "title": "Il budget 50/30/20 e come adattarlo",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Il budget 50/30/20 e come adattarlo",
        "mentor": "Cosa significa 50/30/20?",
        "options": [
          {
            "text": "50% desideri, 30% bisogni, 20% risparmio",
            "right": false,
            "why": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese."
          },
          {
            "text": "50% bisogni, 30% desideri, 20% risparmio",
            "right": true
          },
          {
            "text": "50% risparmio, 30% bisogni, 20% desideri",
            "right": false,
            "why": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese."
          },
          {
            "text": "Cinquanta euro, trenta euro, venti euro",
            "right": false,
            "why": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese."
          }
        ],
        "theory": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese.",
        "explain": "La regola 50/30/20 è un punto di partenza: 50% per i bisogni (trasporti, pranzi, telefono, materiale scolastico), 30% per i desideri, 20% per risparmio e debiti."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "La regola 50/30/20 vale per tutti allo stesso modo.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "È un punto di partenza da adattare."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Una regola applicata ciecamente è peggio di un budget su misura."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai 150 € al mese: importi per le tre voci.",
        "options": [
          {
            "text": "50 €, 30 €, 20 €",
            "right": false,
            "why": "50% di 150 = 75; 30% = 45; 20% = 30."
          },
          {
            "text": "75 €, 30 €, 45 €",
            "right": false,
            "why": "50% di 150 = 75; 30% = 45; 20% = 30."
          },
          {
            "text": "75 €, 45 €, 30 €",
            "right": true
          },
          {
            "text": "45 €, 75 €, 30 €",
            "right": false,
            "why": "50% di 150 = 75; 30% = 45; 20% = 30."
          }
        ],
        "explain": "Su 200 € al mese tra paghetta e lavoretti: 100 € bisogni, 60 € desideri, 40 € risparmio.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 80 € al mese: quanto va al risparmio con la regola 50/30/20?",
            "options": [
              {
                "text": "24 €",
                "right": false,
                "why": "20% di 80 = 16 €."
              },
              {
                "text": "40 €",
                "right": false,
                "why": "20% di 80 = 16 €."
              },
              {
                "text": "8 €",
                "right": false,
                "why": "20% di 80 = 16 €."
              },
              {
                "text": "16 €",
                "right": true
              }
            ],
            "explain": "Su 200 € al mese tra paghetta e lavoretti: 100 € bisogni, 60 € desideri, 40 € risparmio."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Bisogni 70 € su 120 €: che percentuale?",
        "options": [
          {
            "text": "50%",
            "right": false,
            "why": "70 ÷ 120 ≈ 58,3%."
          },
          {
            "text": "70%",
            "right": false,
            "why": "70 ÷ 120 ≈ 58,3%."
          },
          {
            "text": "58% (58,3%)",
            "right": true
          },
          {
            "text": "42%",
            "right": false,
            "why": "70 ÷ 120 ≈ 58,3%."
          }
        ],
        "explain": "Con entrate basse o spese fisse alte i bisogni superano il 50%: chi ha 120 € al mese e paga 25 € di mezzi, 10 € di telefono e 35 € di pranzi e merende ha già un 58% di bisogni.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Entrate 900 € netti. Quanto ai bisogni con la regola 50/30/20?",
            "options": [
              {
                "text": "270 €",
                "right": false,
                "why": "50% di 900 = 450 €."
              },
              {
                "text": "180 €",
                "right": false,
                "why": "50% di 900 = 450 €."
              },
              {
                "text": "450 €",
                "right": true
              },
              {
                "text": "90 €",
                "right": false,
                "why": "50% di 900 = 450 €."
              }
            ],
            "explain": "Con entrate basse o spese fisse alte i bisogni superano il 50%: chi ha 120 € al mese e paga 25 € di mezzi, 10 € di telefono e 35 € di pranzi e merende ha già un 58% di bisogni."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "La gita scolastica costa 120 € tra 6 mesi: quanto accantonare ogni mese?",
        "options": [
          {
            "text": "10 € al mese",
            "right": false,
            "why": "120 ÷ 6 = 20 €."
          },
          {
            "text": "12 € al mese",
            "right": false,
            "why": "120 ÷ 6 = 20 €."
          },
          {
            "text": "20 € al mese",
            "right": true
          },
          {
            "text": "120 € al mese",
            "right": false,
            "why": "120 ÷ 6 = 20 €."
          }
        ],
        "explain": "Le proporzioni si valutano sull’anno, non sul singolo mese: una spesa irregolare (gita scolastica, regalo di Natale, abbonamento annuale) va divisa per i mesi che mancano e accantonata ogni mese, altrimenti arriva come una sorpresa.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Stipendio netto 1.500 €: bisogni, desideri e risparmio con 50/30/20?",
            "options": [
              {
                "text": "450 €, 750 €, 300 €",
                "right": false,
                "why": "1.500 × 0,5 = 750; × 0,3 = 450; × 0,2 = 300."
              },
              {
                "text": "750 €, 450 €, 300 €",
                "right": true
              },
              {
                "text": "1.000 €, 300 €, 200 €",
                "right": false,
                "why": "1.500 × 0,5 = 750; × 0,3 = 450; × 0,2 = 300."
              },
              {
                "text": "750 €, 300 €, 450 €",
                "right": false,
                "why": "1.500 × 0,5 = 750; × 0,3 = 450; × 0,2 = 300."
              }
            ],
            "explain": "Su 200 € al mese tra paghetta e lavoretti: 100 € bisogni, 60 € desideri, 40 € risparmio."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Con 100 € di entrate e 60 € di bisogni, come distribuisci il resto?",
        "options": [
          {
            "text": "Si spende tutto per i desideri",
            "right": false,
            "why": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese."
          },
          {
            "text": "Non c’è risposta unica: più risparmio ora e meno desideri, o il contrario, ognuna ha un costo",
            "right": true
          },
          {
            "text": "Si mette tutto da parte e non si esce più",
            "right": false,
            "why": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese."
          },
          {
            "text": "Si restituisce ai genitori",
            "right": false,
            "why": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese."
          }
        ],
        "explain": "In quel caso si adatta: prima si fissa la quota di risparmio (anche piccola), poi si dividono i desideri."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Quale voce disdici per aumentare la quota di risparmio senza toccare i bisogni?",
        "options": [
          {
            "text": "Un abbonamento da 4,99 € al mese mai usato",
            "right": true
          },
          {
            "text": "La ricarica del telefono",
            "right": false,
            "why": "Un abbonamento da 4,99 €/mese mai usato."
          },
          {
            "text": "Il pranzo a scuola",
            "right": false,
            "why": "Un abbonamento da 4,99 €/mese mai usato."
          },
          {
            "text": "I mezzi per andare a scuola",
            "right": false,
            "why": "Un abbonamento da 4,99 €/mese mai usato."
          }
        ],
        "explain": "Fare un budget significa dare una destinazione a ogni euro in entrata prima di spenderlo."
      }
    ],
    "source": "C01-L04"
  },
  "p1-l5": {
    "id": "p1-l5",
    "code": "L5",
    "floor": 1,
    "title": "Tracciare le spese senza mollare dopo una settimana",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Tracciare le spese senza mollare dopo una settimana",
        "mentor": "A cosa serve la categoria?",
        "options": [
          {
            "text": "Raggruppare i movimenti per vedere dove va il denaro",
            "right": true
          },
          {
            "text": "Aumentare il saldo",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Ridurre automaticamente le spese",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Registrare solo le spese sopra i 50 €",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          }
        ],
        "theory": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare.",
        "explain": "Tracciare le spese vuol dire registrare ogni movimento e assegnarlo a una categoria (trasporti, cibo, uscite, abbonamenti, giochi, varie)."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "L’app della prepagata categorizza sempre correttamente.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Si può fare in tre modi: a mano (quaderno o foglio di calcolo), con l’app della prepagata (che spesso categorizza da sola, con errori da correggere), con un’app dedicata."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "7 acquisti nel gioco da 3 €: totale e costo se ne fai solo 2.",
        "options": [
          {
            "text": "21 € e 9 €; risparmio 12 €",
            "right": false,
            "why": "7 × 3 = 21; 2 × 3 = 6; 21 − 6 = 15 €."
          },
          {
            "text": "7 € e 6 €; risparmio 1 €",
            "right": false,
            "why": "7 × 3 = 21; 2 × 3 = 6; 21 − 6 = 15 €."
          },
          {
            "text": "10 € e 6 €; risparmio 4 €",
            "right": false,
            "why": "7 × 3 = 21; 2 × 3 = 6; 21 − 6 = 15 €."
          },
          {
            "text": "21 € e 6 €; risparmio 15 €",
            "right": true
          }
        ],
        "explain": "Le micro-spese (snack, bibite, acquisti dentro i giochi, piccole app) sfuggono perché ognuna è piccola. Si individuano sommando per categoria: se la categoria «varie» è la più grande del mese, significa che le categorie non sono abbastanza chiare.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Spese «varie» 20 € su 80 € di entrate. Che percentuale?",
            "options": [
              {
                "text": "20%",
                "right": false,
                "why": "20 ÷ 80 = 25%."
              },
              {
                "text": "25%",
                "right": true
              },
              {
                "text": "4%",
                "right": false,
                "why": "20 ÷ 80 = 25%."
              },
              {
                "text": "40%",
                "right": false,
                "why": "20 ÷ 80 = 25%."
              }
            ],
            "explain": "Le micro-spese (snack, bibite, acquisti dentro i giochi, piccole app) sfuggono perché ognuna è piccola. Si individuano sommando per categoria: se la categoria «varie» è la più grande del mese, significa che le categorie non sono abbastanza chiare."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Categoria «varie» 38 € su entrate 110 €: che percentuale?",
        "options": [
          {
            "text": "38%",
            "right": false,
            "why": "38 ÷ 110 ≈ 34,5%."
          },
          {
            "text": "34,5%",
            "right": true
          },
          {
            "text": "11%",
            "right": false,
            "why": "38 ÷ 110 ≈ 34,5%."
          },
          {
            "text": "3,8%",
            "right": false,
            "why": "38 ÷ 110 ≈ 34,5%."
          }
        ],
        "explain": "Ogni metodo ha un costo diverso: a mano costa tempo ma ti fa guardare ogni spesa; automatico costa poco ma rischia di diventare un riepilogo che non guardi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Spese «varie» 90 € su 600 € di entrate. Che percentuale?",
            "options": [
              {
                "text": "9%",
                "right": false,
                "why": "90 ÷ 600 = 15%."
              },
              {
                "text": "15%",
                "right": true
              },
              {
                "text": "30%",
                "right": false,
                "why": "90 ÷ 600 = 15%."
              },
              {
                "text": "6,7%",
                "right": false,
                "why": "90 ÷ 600 = 15%."
              }
            ],
            "explain": "Ogni metodo ha un costo diverso: a mano costa tempo ma ti fa guardare ogni spesa; automatico costa poco ma rischia di diventare un riepilogo che non guardi."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "Hai tracciato tutto per tre giorni con tre app diverse e poi hai smesso. Qual è l’errore?",
        "options": [
          {
            "text": "Un sistema troppo complesso per l’uso che ne fai",
            "right": true
          },
          {
            "text": "Aver tracciato tutto",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Aver iniziato di lunedì",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Aver controllato troppo poco i soldi",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          }
        ],
        "explain": "Provare a registrare tutto in modo perfetto per tre giorni e poi smettere. Meglio un sistema semplice e imperfetto, tenuto per sei mesi, che un sistema preciso lasciato dopo una settimana.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Qual è il metodo di tracciamento migliore?",
            "options": [
              {
                "text": "Quello che apri e continui a usare",
                "right": true
              },
              {
                "text": "Il più complesso",
                "right": false,
                "why": "Il metodo migliore è quello che usi davvero."
              },
              {
                "text": "Quello con più app",
                "right": false,
                "why": "Il metodo migliore è quello che usi davvero."
              },
              {
                "text": "Quello che si fa una volta all’anno",
                "right": false,
                "why": "Il metodo migliore è quello che usi davvero."
              }
            ],
            "explain": "Ogni metodo ha un costo diverso: a mano costa tempo ma ti fa guardare ogni spesa; automatico costa poco ma rischia di diventare un riepilogo che non guardi."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Preferisci aggiornare ogni sera per 2 minuti o ogni domenica per 15 minuti?",
        "options": [
          {
            "text": "Sempre ogni sera",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Sempre ogni domenica",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Dipende dalla costanza: la routine che riesci a mantenere è quella giusta",
            "right": true
          },
          {
            "text": "Non servono routine",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          }
        ],
        "explain": "La revisione periodica conta più dello strumento: un controllo di 10 minuti alla settimana e uno più lungo a fine mese."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L4)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Se «varie» scende da 38 € a 23 €, dove puoi mettere i 15 € nel budget di Luca?",
        "options": [
          {
            "text": "Verso i desideri senza limite",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Verso il risparmio",
            "right": true
          },
          {
            "text": "Verso i bisogni",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          },
          {
            "text": "Verso un nuovo abbonamento",
            "right": false,
            "why": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
          }
        ],
        "explain": "Si cerca una sola cosa: dove il budget e la realtà non coincidono."
      }
    ],
    "source": "C01-L05"
  },
  "p1-l6": {
    "id": "p1-l6",
    "code": "L6",
    "floor": 1,
    "title": "Spese fisse sotto controllo: telefono e spesa",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Spese fisse sotto controllo",
        "mentor": "Cos’è un costo di attivazione o una quota fissa?",
        "options": [
          {
            "text": "Il costo di ogni singolo utilizzo",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Uno sconto di benvenuto",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Una tassa sulla vendita",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Ciò che paghi indipendentemente da quanto usi il servizio",
            "right": true
          }
        ],
        "theory": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità.",
        "explain": "Il telefono è la prima spesa fissa che molti ragazzi scelgono davvero: una ricaricabile ha un prezzo mensile, a volte un costo di attivazione, e spesso una promozione che dura pochi mesi."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "L’offerta con il prezzo mensile più basso è sempre la più economica.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Dipende dalla durata della promozione e dai costi extra."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Guardare solo il prezzo in evidenza e ignorare durata dello sconto, rincaro e costi di attivazione. Altro errore: cambiare operatore per un bonus di benvenuto senza calcolare il costo dopo la promozione."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Offerta A: 9 € al mese per 12 mesi. Costo annuo?",
        "options": [
          {
            "text": "9 €",
            "right": false,
            "why": "9 × 12 = 108 €."
          },
          {
            "text": "12 €",
            "right": false,
            "why": "9 × 12 = 108 €."
          },
          {
            "text": "216 €",
            "right": false,
            "why": "9 × 12 = 108 €."
          },
          {
            "text": "108 €",
            "right": true
          }
        ],
        "explain": "Due offerte con lo stesso prezzo in evidenza possono costare diversamente se una sale dopo 6 mesi o ha costi nascosti.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Ricarica 8 € al mese: costo annuo?",
            "options": [
              {
                "text": "96 €",
                "right": true
              },
              {
                "text": "8 €",
                "right": false,
                "why": "8 × 12 = 96 €."
              },
              {
                "text": "80 €",
                "right": false,
                "why": "8 × 12 = 96 €."
              },
              {
                "text": "100 €",
                "right": false,
                "why": "8 × 12 = 96 €."
              }
            ],
            "explain": "Due offerte con lo stesso prezzo in evidenza possono costare diversamente se una sale dopo 6 mesi o ha costi nascosti."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Offerta B: 7 € al mese per 6 mesi, poi 12 € al mese per 6 mesi. Costo annuo e differenza con A?",
        "options": [
          {
            "text": "114 €; 6 € meno di A",
            "right": false,
            "why": "7 × 6 + 12 × 6 = 42 + 72 = 114 €; 114 − 108 = +6 €."
          },
          {
            "text": "84 €; 24 € meno di A",
            "right": false,
            "why": "7 × 6 + 12 × 6 = 42 + 72 = 114 €; 114 − 108 = +6 €."
          },
          {
            "text": "144 €; 36 € più di A",
            "right": false,
            "why": "7 × 6 + 12 × 6 = 42 + 72 = 114 €; 114 − 108 = +6 €."
          },
          {
            "text": "114 €; 6 € più di A",
            "right": true
          }
        ],
        "explain": "Per confrontare serve un periodo di riferimento (12 mesi): si sommano tutti i pagamenti, compresi attivazione e rincari dopo la promozione, e si guarda al costo totale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Offerta internet A: 25 € al mese per 12 mesi. B: 15 € per 6 mesi e 30 € per altri 6. Qual è più economica su un anno?",
            "options": [
              {
                "text": "A: 300 € contro 270 €",
                "right": false,
                "why": "B: 90 + 180 = 270 €; A: 300 €."
              },
              {
                "text": "Uguali: 300 €",
                "right": false,
                "why": "B: 90 + 180 = 270 €; A: 300 €."
              },
              {
                "text": "B: 270 € contro 300 €",
                "right": true
              },
              {
                "text": "B: 180 € contro 300 €",
                "right": false,
                "why": "B: 90 + 180 = 270 €; A: 300 €."
              }
            ],
            "explain": "Due offerte con lo stesso prezzo in evidenza possono costare diversamente se una sale dopo 6 mesi o ha costi nascosti."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Biscotti 250 g a 1,25 € e biscotti 500 g a 2,20 €: prezzo al kg e risparmio.",
        "options": [
          {
            "text": "1,25 €/kg contro 2,20 €/kg",
            "right": false,
            "why": "1,25 × 4 = 5,00; 2,20 × 2 = 4,40; differenza 0,60 €/kg."
          },
          {
            "text": "5,00 €/kg contro 4,40 €/kg; risparmio 0,60 €/kg",
            "right": true
          },
          {
            "text": "5,00 €/kg contro 5,50 €/kg",
            "right": false,
            "why": "1,25 × 4 = 5,00; 2,20 × 2 = 4,40; differenza 0,60 €/kg."
          },
          {
            "text": "4,00 €/kg contro 4,40 €/kg",
            "right": false,
            "why": "1,25 × 4 = 5,00; 2,20 × 2 = 4,40; differenza 0,60 €/kg."
          }
        ],
        "explain": "Sulle cose che compri ogni settimana, anche piccole differenze si sommano in un anno. La stessa logica vale più avanti per luce e gas, quando una casa sarà tua: quota fissa e quota variabile contano entrambe, non solo il prezzo al kWh.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un pacco da 1 kg a 3,20 € e uno da 400 g a 1,40 €. Qual è più conveniente al kg?",
            "options": [
              {
                "text": "Il pacco da 1 kg: 3,20 €/kg contro 3,50 €/kg",
                "right": true
              },
              {
                "text": "Quello da 400 g: 3,50 €/kg",
                "right": false,
                "why": "1,40 ÷ 0,4 = 3,50 €/kg contro 3,20 €/kg."
              },
              {
                "text": "Costano uguale",
                "right": false,
                "why": "1,40 ÷ 0,4 = 3,50 €/kg contro 3,20 €/kg."
              },
              {
                "text": "Quello da 400 g, perché costa meno in assoluto",
                "right": false,
                "why": "1,40 ÷ 0,4 = 3,50 €/kg contro 3,20 €/kg."
              }
            ],
            "explain": "Al supermercato lo strumento è il prezzo per unità (€/kg, €/litro), spesso scritto in piccolo sull’etichetta: la confezione più grande non è sempre la più conveniente, e la marca non è sempre sinonimo di qualità superiore."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Offerta con sconto del 20% per 6 mesi, poi prezzo pieno più alto di quella attuale: la prendi?",
        "options": [
          {
            "text": "Sì, lo sconto è il 20%",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "No, mai: le promozioni sono trucchi",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Sì, ma solo se sei in ritardo con il budget",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Dipende dal costo dopo i sei mesi: si calcola il totale a 12 mesi",
            "right": true
          }
        ],
        "explain": "Va letto anche se il prezzo è bloccato per un periodo o può cambiare, e quanto dura la promozione. Chi non ha ancora 18 anni di solito non intesta il contratto: se lo fa un genitore, il confronto va fatto insieme."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "In quale categoria del tuo tracciamento metti la ricarica del telefono?",
        "options": [
          {
            "text": "Varie",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Desideri",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Entrate",
            "right": false,
            "why": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
          },
          {
            "text": "Telefono, spesa fissa",
            "right": true
          }
        ],
        "explain": "Al supermercato lo strumento è il prezzo per unità (€/kg, €/litro), spesso scritto in piccolo sull’etichetta: la confezione più grande non è sempre la più conveniente, e la marca non è sempre sinonimo di qualità superiore."
      }
    ],
    "source": "C01-L06"
  },
  "p2-l1": {
    "id": "p2-l1",
    "code": "L1",
    "floor": 2,
    "title": "Il conto, l’IBAN e il bonifico",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Il conto, l’IBAN e il bonifico",
        "mentor": "Accredito o addebito: paghetta, caffè con la carta, bonifico della nonna, abbonamento musica.",
        "options": [
          {
            "text": "Accrediti: caffè e abbonamento · Addebiti: paghetta e nonna",
            "right": false,
            "why": "Accrediti = paghetta e nonna; addebiti = caffè e abbonamento."
          },
          {
            "text": "Accrediti: paghetta e caffè · Addebiti: nonna e abbonamento",
            "right": false,
            "why": "Accrediti = paghetta e nonna; addebiti = caffè e abbonamento."
          },
          {
            "text": "Accrediti: tutti e quattro",
            "right": false,
            "why": "Accrediti = paghetta e nonna; addebiti = caffè e abbonamento."
          },
          {
            "text": "Accrediti: paghetta e bonifico della nonna · Addebiti: caffè e abbonamento",
            "right": true
          }
        ],
        "theory": "Un conto è un registro di entrate e uscite; l’IBAN è l’indirizzo per ricevere soldi, non la chiave per prenderli.",
        "explain": "Un accredito aumenta il saldo (la paghetta, un bonifico dei nonni). Un addebito lo riduce (un pagamento con carta, un abbonamento)."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se do il mio IBAN a un amico, lui può prelevare soldi dal mio conto.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "L’IBAN serve a ricevere; per spendere servono carta, PIN e codici."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Averlo non permette a nessuno di prelevare: per spendere servono carta, PIN, codici di conferma. Questo non significa darlo a chiunque: si comunica a chi deve pagarti."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Giulia ha 40 € lunedì. Durante la settimana: +20 € di paghetta, −3,50 € caffè, −12 € cinema, +15 € bonifico della nonna, −9,99 € abbonamento musica. Quanto è il saldo contabile?",
        "options": [
          {
            "text": "41,51 €",
            "right": false,
            "why": "40 + 20 − 3,50 − 12 + 15 − 9,99 = 49,51 €."
          },
          {
            "text": "40 €",
            "right": false,
            "why": "40 + 20 − 3,50 − 12 + 15 − 9,99 = 49,51 €."
          },
          {
            "text": "49,51 €",
            "right": true
          },
          {
            "text": "59,50 €",
            "right": false,
            "why": "40 + 20 − 3,50 − 12 + 15 − 9,99 = 49,51 €."
          }
        ],
        "explain": "Se guardi solo il saldo contabile, rischi di spendere soldi che non hai più. L’IBAN identifica il conto: in Italia è una sequenza di 27 caratteri che comincia con IT.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 25 € sulla prepagata, ricevi 15 € di paghetta e paghi 9,99 € di abbonamento. Quanto resta?",
            "options": [
              {
                "text": "49,99 €",
                "right": false,
                "why": "25 + 15 − 9,99 = 30,01 €."
              },
              {
                "text": "40 €",
                "right": false,
                "why": "25 + 15 − 9,99 = 30,01 €."
              },
              {
                "text": "30,01 €",
                "right": true
              },
              {
                "text": "19,99 €",
                "right": false,
                "why": "25 + 15 − 9,99 = 30,01 €."
              }
            ],
            "explain": "Un addebito lo riduce (un pagamento con carta, un abbonamento)."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il saldo contabile di Giulia è 49,51 €, ma c’è un pagamento autorizzato da 8 € non ancora registrato. Quanto è il saldo disponibile?",
        "options": [
          {
            "text": "49,51 €",
            "right": false,
            "why": "49,51 − 8 = 41,51 €."
          },
          {
            "text": "41,51 €",
            "right": true
          },
          {
            "text": "57,51 €",
            "right": false,
            "why": "49,51 − 8 = 41,51 €."
          },
          {
            "text": "8 €",
            "right": false,
            "why": "49,51 − 8 = 41,51 €."
          }
        ],
        "explain": "Il saldo contabile è quanto risulta registrato; il saldo disponibile è quanto puoi davvero spendere adesso, perché toglie i pagamenti già autorizzati ma non ancora registrati (per esempio un acquisto con carta che si chiude il giorno dopo).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Conto con 380 €. Arriva il bonifico del part-time (+250 €) e l’addebito dell’affitto (−300 €). Nuovo saldo?",
            "options": [
              {
                "text": "550 €",
                "right": false,
                "why": "380 + 250 − 300 = 330 €."
              },
              {
                "text": "430 €",
                "right": false,
                "why": "380 + 250 − 300 = 330 €."
              },
              {
                "text": "330 €",
                "right": true
              },
              {
                "text": "−170 €",
                "right": false,
                "why": "380 + 250 − 300 = 330 €."
              }
            ],
            "explain": "Il bonifico è l’ordine di spostare soldi da un conto a un altro. Quello ordinario viene eseguito di norma entro il giorno lavorativo successivo; quello istantaneo arriva in pochi secondi anche di sera e nel weekend, di solito con una commissione."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "Un amico dice: «Ho fatto il bonifico ordinario venerdì alle 22 e i soldi arrivano subito.» Cosa non torna?",
        "options": [
          {
            "text": "Niente: il bonifico ordinario è sempre immediato",
            "right": false,
            "why": "Quello ordinario non è immediato: arriva di norma il primo giorno lavorativo utile; per l’immediato serve l’istantaneo."
          },
          {
            "text": "L’orario: dopo le 20 non si può fare nessun bonifico",
            "right": false,
            "why": "Quello ordinario non è immediato: arriva di norma il primo giorno lavorativo utile; per l’immediato serve l’istantaneo."
          },
          {
            "text": "Il venerdì: i bonifici ordinari si fanno solo il lunedì",
            "right": false,
            "why": "Quello ordinario non è immediato: arriva di norma il primo giorno lavorativo utile; per l’immediato serve l’istantaneo."
          },
          {
            "text": "L’ordinario non è immediato: arriva di norma il primo giorno lavorativo utile; per l’immediato serve l’istantaneo",
            "right": true
          }
        ],
        "explain": "Quello ordinario viene eseguito di norma entro il giorno lavorativo successivo; quello istantaneo arriva in pochi secondi anche di sera e nel weekend, di solito con una commissione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Primo stipendio 1.100 € netti su un conto con 120 €. Hai pagato in anticipo 180 € con carta, non ancora registrati. Saldo disponibile dopo l’accredito?",
            "options": [
              {
                "text": "1.220 €",
                "right": false,
                "why": "120 + 1.100 − 180 = 1.040 €."
              },
              {
                "text": "1.040 €",
                "right": true
              },
              {
                "text": "1.400 €",
                "right": false,
                "why": "120 + 1.100 − 180 = 1.040 €."
              },
              {
                "text": "860 €",
                "right": false,
                "why": "120 + 1.100 − 180 = 1.040 €."
              }
            ],
            "explain": "Il saldo contabile è quanto risulta registrato; il saldo disponibile è quanto puoi davvero spendere adesso, perché toglie i pagamenti già autorizzati ma non ancora registrati (per esempio un acquisto con carta che si chiude il giorno dopo)."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Devi mandare 25 € a un amico per il biglietto: istantaneo (0,50 €, subito) o ordinario (gratis, domani)?",
        "options": [
          {
            "text": "Istantaneo, sempre: la velocità vale qualunque costo",
            "right": false,
            "why": "Un conto è un registro di entrate e uscite; l’IBAN è l’indirizzo per ricevere soldi, non la chiave per prenderli."
          },
          {
            "text": "Dipende: se serve subito l’istantaneo vale 0,50 €; se puoi aspettare l’ordinario costa zero",
            "right": true
          },
          {
            "text": "Ordinario, sempre: i costi vanno evitati a ogni costo",
            "right": false,
            "why": "Un conto è un registro di entrate e uscite; l’IBAN è l’indirizzo per ricevere soldi, non la chiave per prenderli."
          },
          {
            "text": "Nessuno dei due: i bonifici non servono tra amici",
            "right": false,
            "why": "Un conto è un registro di entrate e uscite; l’IBAN è l’indirizzo per ricevere soldi, non la chiave per prenderli."
          }
        ],
        "explain": "Il bonifico è l’ordine di spostare soldi da un conto a un altro."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Piano 1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Tra i movimenti di Giulia (paghetta, caffè 3,50 €, cinema 12 €, bonifico della nonna, abbonamento musica 9,99 €), qual è la spesa ricorrente e quanto costa all’anno?",
        "options": [
          {
            "text": "Il caffè: 3,50 € alla settimana, 182 € l’anno",
            "right": false,
            "why": "9,99 × 12 = 119,88 € l’anno."
          },
          {
            "text": "Il cinema: 12 € al mese, 144 € l’anno",
            "right": false,
            "why": "9,99 × 12 = 119,88 € l’anno."
          },
          {
            "text": "La paghetta: 20 € alla settimana",
            "right": false,
            "why": "9,99 × 12 = 119,88 € l’anno."
          },
          {
            "text": "L’abbonamento musica da 9,99 €/mese: 119,88 € l’anno",
            "right": true
          }
        ],
        "explain": "Un conto tiene traccia dei soldi: ogni volta che ne entrano o ne escono viene registrato un movimento."
      }
    ],
    "source": "C02-L01"
  },
  "p2-l2": {
    "id": "p2-l2",
    "code": "L2",
    "floor": 2,
    "title": "I tuoi soldi sono al sicuro? La garanzia sui depositi",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "I tuoi soldi sono al sicuro? La garanzia sui depositi",
        "mentor": "A chi serve la garanzia sui depositi?",
        "options": [
          {
            "text": "A chi vuole un prestito dalla banca",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          },
          {
            "text": "A chi ha soldi su un conto: li rimborsa fino al limite se la banca fallisce",
            "right": true
          },
          {
            "text": "A chi compra azioni tramite la banca",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          },
          {
            "text": "Alla banca, per pagare meno tasse",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          }
        ],
        "theory": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto.",
        "explain": "Per questo esiste un fondo di garanzia dei depositi: se la banca entra in crisi, il fondo rimborsa i depositanti entro un limite."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se ho 2 conti nella stessa banca, ho 100.000 € di garanzia per ciascun conto.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Il limite è per persona e per banca."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Significa che conta la persona, non il numero di conti: due conti nella stessa banca si sommano. Se i soldi sono su un conto cointestato, la somma si divide tra i cointestatari: 120.000 € su un conto di due persone sono 60.000 € a testa, tutti coperti."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un conto cointestato a due persone ha 120.000 €: quanto spetta a ciascuna?",
        "options": [
          {
            "text": "60.000 € a testa, tutti coperti",
            "right": true
          },
          {
            "text": "100.000 € a testa",
            "right": false,
            "why": "120.000 ÷ 2 = 60.000 € a testa, sotto il limite di 100.000 €."
          },
          {
            "text": "120.000 € a una sola persona",
            "right": false,
            "why": "120.000 ÷ 2 = 60.000 € a testa, sotto il limite di 100.000 €."
          },
          {
            "text": "Nessuna delle due è coperta",
            "right": false,
            "why": "120.000 ÷ 2 = 60.000 € a testa, sotto il limite di 100.000 €."
          }
        ],
        "explain": "Cosa non è coperto: i titoli (azioni, obbligazioni, fondi) comprati tramite la banca, che sono beni del cliente e hanno regole diverse; le criptovalute; i soldi oltre il limite.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 500 € sul conto: sono tutti coperti dalla garanzia sui depositi?",
            "options": [
              {
                "text": "No: solo sopra 1.000 €",
                "right": false,
                "why": "Il limite di 100.000 € per persona e per banca copre 500 €."
              },
              {
                "text": "No: i giovani non sono coperti",
                "right": false,
                "why": "Il limite di 100.000 € per persona e per banca copre 500 €."
              },
              {
                "text": "Solo metà",
                "right": false,
                "why": "Il limite di 100.000 € per persona e per banca copre 500 €."
              },
              {
                "text": "Sì: sono sotto 100.000 €",
                "right": true
              }
            ],
            "explain": "Cosa non è coperto: i titoli (azioni, obbligazioni, fondi) comprati tramite la banca, che sono beni del cliente e hanno regole diverse; le criptovalute; i soldi oltre il limite."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una persona ha 130.000 € su un solo conto: quanto è coperto e quanto no?",
        "options": [
          {
            "text": "100.000 € coperti, 30.000 € no",
            "right": true
          },
          {
            "text": "130.000 € coperti",
            "right": false,
            "why": "Il limite è 100.000 €: 130.000 − 100.000 = 30.000 € scoperti."
          },
          {
            "text": "30.000 € coperti, 100.000 € no",
            "right": false,
            "why": "Il limite è 100.000 €: 130.000 − 100.000 = 30.000 € scoperti."
          },
          {
            "text": "Nessuna parte è coperta",
            "right": false,
            "why": "Il limite è 100.000 €: 130.000 − 100.000 = 30.000 € scoperti."
          }
        ],
        "explain": "Il limite è di 100.000 € per depositante e per banca.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 40.000 € nella banca X e 40.000 € nella banca Y. Quanto è coperto?",
            "options": [
              {
                "text": "40.000 €",
                "right": false,
                "why": "Il limite è per banca: entrambe le somme sono sotto i 100.000 €."
              },
              {
                "text": "100.000 €",
                "right": false,
                "why": "Il limite è per banca: entrambe le somme sono sotto i 100.000 €."
              },
              {
                "text": "0 €",
                "right": false,
                "why": "Il limite è per banca: entrambe le somme sono sotto i 100.000 €."
              },
              {
                "text": "80.000 €",
                "right": true
              }
            ],
            "explain": "Il limite è di 100.000 € per depositante e per banca."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "«Ho comprato azioni con la banca, quindi se la banca fallisce sono coperte dalla garanzia sui depositi.»",
        "options": [
          {
            "text": "Le azioni sono depositi e sono coperte",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          },
          {
            "text": "La garanzia copre tutto fino a 100.000 €, anche le azioni",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          },
          {
            "text": "La banca ha l’obbligo di rimborsare ogni investimento",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          },
          {
            "text": "Le azioni non sono depositi: non sono coperte dalla garanzia",
            "right": true
          }
        ],
        "explain": "Pensare che «la banca è sicura, quindi tutto è sicuro». Anche banche grandi falliscono, anche se è raro.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una persona ha 150.000 € in una banca. Quanto non è coperto?",
            "options": [
              {
                "text": "50.000 €",
                "right": true
              },
              {
                "text": "150.000 €",
                "right": false,
                "why": "150.000 − 100.000 = 50.000 € scoperti."
              },
              {
                "text": "100.000 €",
                "right": false,
                "why": "150.000 − 100.000 = 50.000 € scoperti."
              },
              {
                "text": "0 €",
                "right": false,
                "why": "150.000 − 100.000 = 50.000 € scoperti."
              }
            ],
            "explain": "Pensare che «la banca è sicura, quindi tutto è sicuro». Anche banche grandi falliscono, anche se è raro."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai 105.000 €: li tieni tutti nella stessa banca o ne sposti 10.000 in un’altra?",
        "options": [
          {
            "text": "Dipende: spostare costa tempo e complica la gestione, ma riduce il rischio sulla parte sopra i 100.000 €",
            "right": true
          },
          {
            "text": "Tenerli tutti: la garanzia copre sempre ogni importo",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          },
          {
            "text": "Spostare tutto in contanti",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          },
          {
            "text": "Aprire cento conti nella stessa banca",
            "right": false,
            "why": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
          }
        ],
        "explain": "Una banca usa i soldi dei clienti per fare prestiti. Se i prestiti non vengono restituiti, la banca può fallire."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Marco ha 2.300 € e paga 34,20 € di bollo l’anno solo se la giacenza media supera 5.000 €: lo paga?",
        "options": [
          {
            "text": "Sì: il bollo si paga sempre",
            "right": false,
            "why": "Il bollo di 34,20 € scatta solo sopra la soglia di giacenza media indicata."
          },
          {
            "text": "Sì: lo paga se ha più di 2.000 €",
            "right": false,
            "why": "Il bollo di 34,20 € scatta solo sopra la soglia di giacenza media indicata."
          },
          {
            "text": "No, perché il bollo è sempre 0",
            "right": false,
            "why": "Il bollo di 34,20 € scatta solo sopra la soglia di giacenza media indicata."
          },
          {
            "text": "No: la giacenza media (2.300 €) è sotto i 5.000 €",
            "right": true
          }
        ],
        "explain": "Anche il denaro su una carta prepagata o su un portafoglio digitale segue regole diverse dai depositi: di solito è protetto in altro modo, non dalla garanzia sui depositi."
      }
    ],
    "source": "C02-L02"
  },
  "p2-l3": {
    "id": "p2-l3",
    "code": "L3",
    "floor": 2,
    "title": "Carte: debito, prepagata e credito",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Carte",
        "mentor": "Metti nella colonna giusta: paga prelevando dal conto, spende solo il saldo caricato, paga dopo.",
        "options": [
          {
            "text": "Debito: paga dopo · Prepagata: preleva dal conto · Credito: saldo caricato",
            "right": false,
            "why": "Debito, prepagata, credito."
          },
          {
            "text": "Debito: paga prelevando dal conto · Prepagata: spende solo il saldo caricato · Credito: paga dopo",
            "right": true
          },
          {
            "text": "Debito: saldo caricato · Prepagata: paga dopo · Credito: preleva dal conto",
            "right": false,
            "why": "Debito, prepagata, credito."
          },
          {
            "text": "Sono tutte uguali",
            "right": false,
            "why": "Debito, prepagata, credito."
          }
        ],
        "theory": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere.",
        "explain": "La carta prepagata non è collegata a un conto: spende solo quello che ci hai caricato (il plafond), quindi la perdita massima è il saldo che c’è sopra."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Con una prepagata puoi perdere soldi che non hai caricato.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Spendi solo il plafond caricato."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "La carta di credito paga «dopo»: la banca anticipa i soldi e li addebita più avanti, e per questo richiede un contratto di credito."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Prepagata con 60 €: rischio massimo se i dati vengono rubati?",
        "options": [
          {
            "text": "900 €",
            "right": false,
            "why": "Con la prepagata si può perdere al massimo il saldo caricato: 60 €."
          },
          {
            "text": "60 €",
            "right": true
          },
          {
            "text": "0 €",
            "right": false,
            "why": "Con la prepagata si può perdere al massimo il saldo caricato: 60 €."
          },
          {
            "text": "1 €",
            "right": false,
            "why": "Con la prepagata si può perdere al massimo il saldo caricato: 60 €."
          }
        ],
        "explain": "La carta di debito è collegata a un conto e paga prelevando direttamente da lì: se un truffatore ruba i dati, il rischio arriva fino al saldo del conto e ai limiti di spesa della carta.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Che cosa può perdere al massimo chi ha una prepagata con 30 €?",
            "options": [
              {
                "text": "Tutti i soldi del genitore",
                "right": false,
                "why": "Il rischio massimo è il saldo sulla prepagata."
              },
              {
                "text": "30 €",
                "right": true
              },
              {
                "text": "300 €",
                "right": false,
                "why": "Il rischio massimo è il saldo sulla prepagata."
              },
              {
                "text": "Niente",
                "right": false,
                "why": "Il rischio massimo è il saldo sulla prepagata."
              }
            ],
            "explain": "La carta di debito è collegata a un conto e paga prelevando direttamente da lì: se un truffatore ruba i dati, il rischio arriva fino al saldo del conto e ai limiti di spesa della carta."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1 € di commissione per 12 ricariche l’anno: costo?",
        "options": [
          {
            "text": "1 €",
            "right": false,
            "why": "1 × 12 = 12 € l’anno."
          },
          {
            "text": "60 €",
            "right": false,
            "why": "1 × 12 = 12 € l’anno."
          },
          {
            "text": "12 €",
            "right": true
          },
          {
            "text": "0,12 €",
            "right": false,
            "why": "1 × 12 = 12 € l’anno."
          }
        ],
        "explain": "Per i minorenni di norma non è disponibile. Ogni carta ha limiti: un massimo di spesa giornaliero e mensile, un limite per i prelievi e, per i pagamenti contactless (con l’avvicinamento), un importo massimo oltre cui chiede il PIN.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Commissione di 2 € a ricarica, 6 ricariche all’anno: costo?",
            "options": [
              {
                "text": "2 €",
                "right": false,
                "why": "2 × 6 = 12 €."
              },
              {
                "text": "8 €",
                "right": false,
                "why": "2 × 6 = 12 €."
              },
              {
                "text": "12 €",
                "right": true
              },
              {
                "text": "6 €",
                "right": false,
                "why": "2 × 6 = 12 €."
              }
            ],
            "explain": "La carta di debito è collegata a un conto e paga prelevando direttamente da lì: se un truffatore ruba i dati, il rischio arriva fino al saldo del conto e ai limiti di spesa della carta."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "«Ho dato il codice di sicurezza al sito per verificare l’acquisto: tanto la carta è protetta.»",
        "options": [
          {
            "text": "Il codice serve ad autorizzare i pagamenti: darlo a un sito può servire a pagare",
            "right": true
          },
          {
            "text": "Niente: il codice serve solo a verificare",
            "right": false,
            "why": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere."
          },
          {
            "text": "Il sito è sempre sicuro se è bello",
            "right": false,
            "why": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere."
          },
          {
            "text": "Il codice va dato sempre due volte",
            "right": false,
            "why": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere."
          }
        ],
        "explain": "L’altro errore: dare il numero della carta e il codice di sicurezza a chi dice di dover «verificare» un acquisto.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché la carta di credito è diversa dalla carta di debito?",
            "options": [
              {
                "text": "Costa sempre meno",
                "right": false,
                "why": "Con il credito si paga in un secondo momento."
              },
              {
                "text": "Paghi dopo, non subito dal conto",
                "right": true
              },
              {
                "text": "Preleva dal conto subito",
                "right": false,
                "why": "Con il credito si paga in un secondo momento."
              },
              {
                "text": "Non può essere rubata",
                "right": false,
                "why": "Con il credito si paga in un secondo momento."
              }
            ],
            "explain": "La carta di debito è collegata a un conto e paga prelevando direttamente da lì: se un truffatore ruba i dati, il rischio arriva fino al saldo del conto e ai limiti di spesa della carta."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Scarpe da 45 € su un sito sconosciuto: prepagata (con commissione di ricarica) o carta del conto?",
        "options": [
          {
            "text": "Prepagata, sempre: nessun costo",
            "right": false,
            "why": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere."
          },
          {
            "text": "Dipende: la prepagata limita il rischio al saldo ma ha una commissione; la carta del conto è gratis ma espone di più",
            "right": true
          },
          {
            "text": "Carta del conto, sempre: costi più bassi",
            "right": false,
            "why": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere."
          },
          {
            "text": "Nessuna: non si compra mai online",
            "right": false,
            "why": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere."
          }
        ],
        "explain": "Usare la stessa carta per tutto, anche per i siti meno affidabili."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una carta di debito è collegata a un conto con 900 €: tutto il saldo è coperto dalla garanzia sui depositi se la banca fallisce?",
        "options": [
          {
            "text": "No: la carta non è coperta",
            "right": false,
            "why": "La garanzia copre i depositi fino a 100.000 € per persona e per banca."
          },
          {
            "text": "No: solo i conti sopra i 100.000 € sono coperti",
            "right": false,
            "why": "La garanzia copre i depositi fino a 100.000 € per persona e per banca."
          },
          {
            "text": "Sì, ma solo il 50%",
            "right": false,
            "why": "La garanzia copre i depositi fino a 100.000 € per persona e per banca."
          },
          {
            "text": "Sì: 900 € sono sotto il limite di 100.000 €",
            "right": true
          }
        ],
        "explain": "Una regola semplice per gli acquisti online su siti che non conosci: usa una carta con poco denaro sopra, non una collegata a un conto con tutti i soldi."
      }
    ],
    "source": "C02-L03"
  },
  "p2-l4": {
    "id": "p2-l4",
    "code": "L4",
    "floor": 2,
    "title": "Pagare dopo: rate e «paga in 3 volte»",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Pagare dopo",
        "mentor": "Cos’è il costo del credito?",
        "options": [
          {
            "text": "Il prezzo del bene",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "Quanto paghi in più rispetto al prezzo iniziale per avere il bene subito",
            "right": true
          },
          {
            "text": "La commissione della prepagata",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "Il tasso di inflazione",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          }
        ],
        "theory": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta.",
        "explain": "La differenza con il prezzo di partenza è il costo del credito. I ritardi hanno un costo: penali e, in alcuni casi, una segnalazione nelle banche dati che può rendere più difficile ottenere credito in futuro."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Paga in 3 volte non è un debito.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "È un debito, anche senza interessi."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Ci sono formule diverse: rate a tasso zero (non paghi interessi, ma possono esserci costi di gestione), paga in 3 volte (spesso senza costi se paghi in tempo) e finanziamenti con interessi."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "10 rate da 33 €: totale e costo del credito su 300 €.",
        "options": [
          {
            "text": "330 € in totale; costo del credito 330 €",
            "right": false,
            "why": "33 × 10 = 330 €; 330 − 300 = 30 €, cioè il 10%."
          },
          {
            "text": "300 € in totale; costo del credito 0 €",
            "right": false,
            "why": "33 × 10 = 330 €; 330 − 300 = 30 €, cioè il 10%."
          },
          {
            "text": "330 € in totale; costo del credito 30 € (10%)",
            "right": true
          },
          {
            "text": "300 € in totale; costo del credito 30 €",
            "right": false,
            "why": "33 × 10 = 330 €; 330 − 300 = 30 €, cioè il 10%."
          }
        ],
        "explain": "Per capire il costo vero conta il totale pagato, non la rata: totale = rata × numero di rate, a cui si sommano eventuali spese.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "6 rate da 20 € per una felpa da 100 €: costo del credito?",
            "options": [
              {
                "text": "120 €",
                "right": false,
                "why": "6 × 20 = 120 €; 120 − 100 = 20 €."
              },
              {
                "text": "100 €",
                "right": false,
                "why": "6 × 20 = 120 €; 120 − 100 = 20 €."
              },
              {
                "text": "20 €",
                "right": true
              },
              {
                "text": "6 €",
                "right": false,
                "why": "6 × 20 = 120 €; 120 − 100 = 20 €."
              }
            ],
            "explain": "Per capire il costo vero conta il totale pagato, non la rata: totale = rata × numero di rate, a cui si sommano eventuali spese."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Paghetta 40 € e rata da 33 €: che percentuale resta della paghetta?",
        "options": [
          {
            "text": "7 € (il 17,5%)",
            "right": true
          },
          {
            "text": "33 € (82,5%)",
            "right": false,
            "why": "40 − 33 = 7 €; 7 ÷ 40 = 17,5%."
          },
          {
            "text": "40 € (100%)",
            "right": false,
            "why": "40 − 33 = 7 €; 7 ÷ 40 = 17,5%."
          },
          {
            "text": "17,5 €",
            "right": false,
            "why": "40 − 33 = 7 €; 7 ÷ 40 = 17,5%."
          }
        ],
        "explain": "Guardare solo la rata e dire «costa poco al mese». L’altro errore: pensare che «senza interessi» voglia dire «senza costi», senza leggere le spese di gestione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un telefono da 400 € a 12 rate da 36 €: totale?",
            "options": [
              {
                "text": "400 €",
                "right": false,
                "why": "36 × 12 = 432 €."
              },
              {
                "text": "36 €",
                "right": false,
                "why": "36 × 12 = 432 €."
              },
              {
                "text": "412 €",
                "right": false,
                "why": "36 × 12 = 432 €."
              },
              {
                "text": "432 €",
                "right": true
              }
            ],
            "explain": "Guardare solo la rata e dire «costa poco al mese». L’altro errore: pensare che «senza interessi» voglia dire «senza costi», senza leggere le spese di gestione."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "«La rata è solo 33 €, quindi la console costa 33 €.»",
        "options": [
          {
            "text": "Il costo è 33 €",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "Il costo è il totale delle rate: 330 €",
            "right": true
          },
          {
            "text": "Il costo è 10 €",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "Il costo è la rata ma solo in alcuni mesi",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          }
        ],
        "explain": "Con un pagamento a rate comperi subito e paghi in più scadenze. È un debito: chi vende, o una società finanziaria, ti anticipa i soldi e tu li restituisci.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Rate da 85 € per 6 mesi invece del prezzo da 480 €: costo del credito?",
            "options": [
              {
                "text": "510 €",
                "right": false,
                "why": "85 × 6 = 510 €; 510 − 480 = 30 €."
              },
              {
                "text": "0 €",
                "right": false,
                "why": "85 × 6 = 510 €; 510 − 480 = 30 €."
              },
              {
                "text": "85 €",
                "right": false,
                "why": "85 × 6 = 510 €; 510 − 480 = 30 €."
              },
              {
                "text": "30 €",
                "right": true
              }
            ],
            "explain": "La differenza con il prezzo di partenza è il costo del credito. I ritardi hanno un costo: penali e, in alcuni casi, una segnalazione nelle banche dati che può rendere più difficile ottenere credito in futuro."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "10 rate da 33 € oppure risparmiare 30 € al mese per 10 mesi e comprarla?",
        "options": [
          {
            "text": "Rate, sempre: è comodo",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "Risparmiare, sempre: le rate sono illegali",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "Dipende: le rate danno il bene subito ma costano di più; risparmiare costa tempo e rinuncia",
            "right": true
          },
          {
            "text": "Nessuna: la console non serve",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          }
        ],
        "explain": "La logica è la stessa del Piano 1: una rata piccola ogni mese si somma alle altre spese ricorrenti e riduce il margine."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una rata si addebita automaticamente sulla carta del genitore: cosa succede se il saldo non basta?",
        "options": [
          {
            "text": "Niente: la banca presta il saldo senza costi",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "La rata viene cancellata",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          },
          {
            "text": "Ritardo, penale e possibile blocco del pagamento",
            "right": true
          },
          {
            "text": "Il genitore guadagna un bonus",
            "right": false,
            "why": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
          }
        ],
        "explain": "Di norma questi strumenti sono pensati per maggiorenni; chi è minorenne li incontra sulla carta o sul conto di un genitore."
      }
    ],
    "source": "C02-L04"
  },
  "p2-l5": {
    "id": "p2-l5",
    "code": "L5",
    "floor": 2,
    "title": "Phishing, smishing e vishing: il messaggio che ti mette fretta",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Phishing, smishing e vishing",
        "mentor": "Qual è la differenza tra phishing, smishing e vishing?",
        "options": [
          {
            "text": "Il costo che chiedono",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Il canale: email o chat, SMS, telefonata",
            "right": true
          },
          {
            "text": "L’età della vittima",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "La banca coinvolta",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          }
        ],
        "theory": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta.",
        "explain": "Lo smishing arriva per SMS, il vishing per telefonata. Cambia il canale, il meccanismo è lo stesso."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se il messaggio ha il nome della mia banca come mittente, è sicuramente vero.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Il nome del mittente si può falsificare."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Altro errore: fidarsi del nome del mittente o del numero, che si possono falsificare."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un SMS ha tre segnali: urgenza, link, richiesta di dati. Su quattro segnali tipici, quanti sono presenti?",
        "options": [
          {
            "text": "3 su 4",
            "right": true
          },
          {
            "text": "1 su 4",
            "right": false,
            "why": "I tre segnali presenti sono urgenza, link e richiesta di dati."
          },
          {
            "text": "4 su 4",
            "right": false,
            "why": "I tre segnali presenti sono urgenza, link e richiesta di dati."
          },
          {
            "text": "2 su 4",
            "right": false,
            "why": "I tre segnali presenti sono urgenza, link e richiesta di dati."
          }
        ],
        "explain": "Quarto, la richiesta di dati che nessuno ti chiede davvero: password, PIN, codice OTP (il codice monouso che arriva per autorizzare un pagamento).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Ti arriva un SMS «Il tuo pacco è bloccato: paga subito a questo link». Cosa fai?",
            "options": [
              {
                "text": "Pago subito",
                "right": false,
                "why": "Il messaggio ha urgenza e link: possibile smishing."
              },
              {
                "text": "Rispondo con i miei dati",
                "right": false,
                "why": "Il messaggio ha urgenza e link: possibile smishing."
              },
              {
                "text": "Non apro il link e controllo dal sito ufficiale del corriere",
                "right": true
              },
              {
                "text": "Inoltro il link agli amici",
                "right": false,
                "why": "Il messaggio ha urgenza e link: possibile smishing."
              }
            ],
            "explain": "Lo smishing arriva per SMS, il vishing per telefonata. Cambia il canale, il meccanismo è lo stesso."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il truffatore ruba i dati con un pagamento da 1,99 € e poi addebita 89,90 €: quanto perdi in totale?",
        "options": [
          {
            "text": "89,90 €",
            "right": false,
            "why": "1,99 + 89,90 = 91,89 €."
          },
          {
            "text": "91,89 €",
            "right": true
          },
          {
            "text": "1,99 €",
            "right": false,
            "why": "1,99 + 89,90 = 91,89 €."
          },
          {
            "text": "87,91 €",
            "right": false,
            "why": "1,99 + 89,90 = 91,89 €."
          }
        ],
        "explain": "Alcune truffe sono tipiche del mondo dei ragazzi: il «ciao, ho cambiato numero» che chiede soldi; il falso pacco che chiede 1,99 € per la consegna; l’account che propone un «premio» se inserisci i dati; l’acquirente di un oggetto in vendita che manda un link «errato» per ricevere il pagamento; la vendita di biglietti per un concerto a un prezzo troppo basso.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una persona ti telefona dicendo di essere la banca e chiede il codice. Cosa fai?",
            "options": [
              {
                "text": "Do il codice",
                "right": false,
                "why": "La banca non chiede mai codici."
              },
              {
                "text": "Chiudo e richiamo il numero ufficiale",
                "right": true
              },
              {
                "text": "Chiedo il suo nome e do il codice",
                "right": false,
                "why": "La banca non chiede mai codici."
              },
              {
                "text": "Do solo metà del codice",
                "right": false,
                "why": "La banca non chiede mai codici."
              }
            ],
            "explain": "Quarto, la richiesta di dati che nessuno ti chiede davvero: password, PIN, codice OTP (il codice monouso che arriva per autorizzare un pagamento)."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "«Ho risposto 'STOP’ al messaggio per non riceverne più.» Cosa non va?",
        "options": [
          {
            "text": "Niente: rispondere STOP è sempre sicuro",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Bisognava scrivere in maiuscolo",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Bisognava rispondere due volte",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Rispondere conferma che il numero è attivo",
            "right": true
          }
        ],
        "explain": "Regola semplice: non rispondere al messaggio. Apri l’app o il sito che usi di solito, o chiama il numero che già conosci, e verifica lì.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un’email dall’ufficio paghe chiede di cliccare per «confermare l’IBAN». Cosa fai?",
            "options": [
              {
                "text": "Controllo in modo indipendente prima di rispondere",
                "right": true
              },
              {
                "text": "Clicco subito",
                "right": false,
                "why": "Verifica sempre dal canale ufficiale."
              },
              {
                "text": "Rispondo con il PIN",
                "right": false,
                "why": "Verifica sempre dal canale ufficiale."
              },
              {
                "text": "Inoltro all’ufficio senza leggere",
                "right": false,
                "why": "Verifica sempre dal canale ufficiale."
              }
            ],
            "explain": "Cambia il canale, il meccanismo è lo stesso. Primo, l’urgenza: «entro un’ora», «il conto sarà bloccato»."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un amico ti scrive da un numero nuovo e ti chiede 20 €. Cosa fai prima di pagare?",
        "options": [
          {
            "text": "Chiamo il suo numero noto per verificare prima di pagare",
            "right": true
          },
          {
            "text": "Pago subito: è un amico",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Rispondo al messaggio chiedendo l’IBAN",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Mando metà della cifra",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          }
        ],
        "explain": "Secondo, un link o un numero da usare subito. Terzo, un mittente che non corrisponde (numero sconosciuto, indirizzo strano)."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Quale carta usi per un pagamento su un sito che non conosci per perdere meno?",
        "options": [
          {
            "text": "Quella con meno denaro sopra, come una prepagata",
            "right": true
          },
          {
            "text": "La carta di debito del conto principale",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Qualsiasi carta: il rischio è uguale",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          },
          {
            "text": "Nessuna carta: solo contanti online",
            "right": false,
            "why": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
          }
        ],
        "explain": "Il phishing è un messaggio (email, chat, social) che finge di arrivare da qualcuno di fidato per farti cliccare un link o dare dei dati."
      }
    ],
    "source": "C02-L05"
  },
  "p2-l6": {
    "id": "p2-l6",
    "code": "L6",
    "floor": 2,
    "title": "Quando il truffato sei tu, o ti usano come strumento",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (ordina)",
        "moment": "capire",
        "idea": "Quando il truffato sei tu, o ti usano come strumento",
        "mentor": "Ordina i passi: avvisa la banca, blocca la carta, denuncia, cambia le password.",
        "options": [
          {
            "text": "Blocca la carta, avvisa la banca, denuncia, cambia le password",
            "right": true
          },
          {
            "text": "Denuncia, blocca la carta, avvisa la banca, cambia le password",
            "right": false,
            "why": "Prima si ferma il danno, poi si avvisa la banca, poi si denuncia; password per ultime."
          },
          {
            "text": "Cambia le password, denuncia, avvisa la banca, blocca la carta",
            "right": false,
            "why": "Prima si ferma il danno, poi si avvisa la banca, poi si denuncia; password per ultime."
          },
          {
            "text": "Avvisa la banca, cambia le password, blocca la carta, denuncia",
            "right": false,
            "why": "Prima si ferma il danno, poi si avvisa la banca, poi si denuncia; password per ultime."
          }
        ],
        "theory": "Dopo una frode conta la velocità: prima si blocca, poi si avvisa la banca, poi si denuncia; e chi presta il proprio conto per «guadagni facili» rischia lui.",
        "explain": "Se ti accorgi di un pagamento che non hai fatto: blocca la carta dall’app o dal numero verde; avvisa la banca e disconosci l’operazione, conservando la prova della comunicazione; conserva le prove (messaggi, schermate) e presenta denuncia alla Polizia Postale o ad altre forze dell’ordine; cambia le password e controlla gli altri conti."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se qualcuno mi manda soldi sul conto e io li giro, io non rischio niente.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Sei un money mule e rischi conseguenze."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Il rischio è tuo: conto bloccato, indagini, conseguenze legali. Colpisce soprattutto giovani, anche minorenni."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Ricevi 500 €, ne tieni 50 e giri il resto: quanto giri?",
        "options": [
          {
            "text": "500 €",
            "right": false,
            "why": "500 − 50 = 450 €."
          },
          {
            "text": "50 €",
            "right": false,
            "why": "500 − 50 = 450 €."
          },
          {
            "text": "450 €",
            "right": true
          },
          {
            "text": "550 €",
            "right": false,
            "why": "500 − 50 = 450 €."
          }
        ],
        "explain": "Se la banca rifiuta o non risponde, c’è il reclamo e poi il ricorso all’Arbitro Bancario Finanziario (ABF). Se sei minorenne, avvisa subito un genitore o chi ha il conto con te.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un amico ti chiede di ricevere 200 € sul tuo conto e girarli, tenendone 20. Cosa fai?",
            "options": [
              {
                "text": "Accetto: sono 20 € facili",
                "right": false,
                "why": "Prestare il conto per guadagni facili è rischioso e può essere reato."
              },
              {
                "text": "Accetto una sola volta",
                "right": false,
                "why": "Prestare il conto per guadagni facili è rischioso e può essere reato."
              },
              {
                "text": "Accetto se mi paga prima",
                "right": false,
                "why": "Prestare il conto per guadagni facili è rischioso e può essere reato."
              },
              {
                "text": "Rifiuto: è un possibile money mule",
                "right": true
              }
            ],
            "explain": "C’è poi la truffa dei money mule (in italiano, «muli»): ti propongono, di solito sui social, di ricevere soldi sul tuo conto e di girarli o prelevarli, tenendo una percentuale."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "La banca deve rimborsare entro la giornata lavorativa successiva alla richiesta. Se chiedi il rimborso lunedì, entro quando?",
        "options": [
          {
            "text": "Entro martedì",
            "right": true
          },
          {
            "text": "Entro lunedì",
            "right": false,
            "why": "Il rimborso va fatto entro la giornata lavorativa successiva."
          },
          {
            "text": "Entro venerdì",
            "right": false,
            "why": "Il rimborso va fatto entro la giornata lavorativa successiva."
          },
          {
            "text": "Entro il mese successivo",
            "right": false,
            "why": "Il rimborso va fatto entro la giornata lavorativa successiva."
          }
        ],
        "explain": "Per le operazioni non autorizzate, la regola è che la banca deve di norma rimborsare entro la giornata lavorativa successiva alla richiesta.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Ricevi 600 €, tieni 60 € e giri il resto: quanto giri?",
            "options": [
              {
                "text": "540 €",
                "right": true
              },
              {
                "text": "600 €",
                "right": false,
                "why": "600 − 60 = 540 €."
              },
              {
                "text": "60 €",
                "right": false,
                "why": "600 − 60 = 540 €."
              },
              {
                "text": "660 €",
                "right": false,
                "why": "600 − 60 = 540 €."
              }
            ],
            "explain": "Se ti accorgi di un pagamento che non hai fatto: blocca la carta dall’app o dal numero verde; avvisa la banca e disconosci l’operazione, conservando la prova della comunicazione; conserva le prove (messaggi, schermate) e presenta denuncia alla Polizia Postale o ad altre forze dell’ordine; cambia le password e controlla gli altri conti."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "«Ho dato il codice OTP perché mi hanno detto che mi avrebbero rimborsato.» Cosa non va?",
        "options": [
          {
            "text": "Il codice OTP non si comunica mai: la banca può contestare il rimborso",
            "right": true
          },
          {
            "text": "Niente: se ti rimborsano va bene",
            "right": false,
            "why": "Il codice non si comunica mai: la banca può contestare il rimborso."
          },
          {
            "text": "Il codice va dato solo per telefono",
            "right": false,
            "why": "Il codice non si comunica mai: la banca può contestare il rimborso."
          },
          {
            "text": "L’OTP va dato a chi conosce il tuo nome",
            "right": false,
            "why": "Il codice non si comunica mai: la banca può contestare il rimborso."
          }
        ],
        "explain": "L’altro errore: aspettare qualche giorno per «vedere se i soldi tornano» prima di avvisare la banca.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai perso il telefono con l’app della banca. Quale è il primo passo?",
            "options": [
              {
                "text": "Bloccare l’accesso e avvisare la banca",
                "right": true
              },
              {
                "text": "Aspettare una settimana",
                "right": false,
                "why": "Prima si ferma il danno."
              },
              {
                "text": "Cambiare la foto profilo",
                "right": false,
                "why": "Prima si ferma il danno."
              },
              {
                "text": "Ordinare un telefono nuovo",
                "right": false,
                "why": "Prima si ferma il danno."
              }
            ],
            "explain": "L’altro errore: aspettare qualche giorno per «vedere se i soldi tornano» prima di avvisare la banca."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un conoscente ti propone 80 € per ricevere un bonifico: accetti?",
        "options": [
          {
            "text": "Sì: 80 € sono pochi",
            "right": false,
            "why": "Dopo una frode conta la velocità: prima si blocca, poi si avvisa la banca, poi si denuncia; e chi presta il proprio conto per «guadagni facili» rischia lui."
          },
          {
            "text": "Sì, ma solo se lo conosci",
            "right": false,
            "why": "Dopo una frode conta la velocità: prima si blocca, poi si avvisa la banca, poi si denuncia; e chi presta il proprio conto per «guadagni facili» rischia lui."
          },
          {
            "text": "No: non si accetta e si segnala",
            "right": true
          },
          {
            "text": "Sì, tenendo una parte",
            "right": false,
            "why": "Dopo una frode conta la velocità: prima si blocca, poi si avvisa la banca, poi si denuncia; e chi presta il proprio conto per «guadagni facili» rischia lui."
          }
        ],
        "explain": "C’è poi la truffa dei money mule (in italiano, «muli»): ti propongono, di solito sui social, di ricevere soldi sul tuo conto e di girarli o prelevarli, tenendo una percentuale."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un messaggio ha urgenza, link e richiesta di dati: lo apri per controllare?",
        "options": [
          {
            "text": "Sì: apro il link e poi decido",
            "right": false,
            "why": "No, verifica dall’app o dal sito."
          },
          {
            "text": "Sì: rispondo con i dati",
            "right": false,
            "why": "No, verifica dall’app o dal sito."
          },
          {
            "text": "No: verifico dall’app o dal sito, non dal link",
            "right": true
          },
          {
            "text": "Sì, ma solo da un altro telefono",
            "right": false,
            "why": "No, verifica dall’app o dal sito."
          }
        ],
        "explain": "Quei soldi arrivano da frodi: tu diventi lo strumento."
      }
    ],
    "source": "C02-L06"
  },
  "p3-l1": {
    "id": "p3-l1",
    "code": "L1",
    "floor": 3,
    "title": "Probabilità e valore atteso: la matematica del gioco",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Probabilità e valore atteso",
        "mentor": "Metti in ordine, dal più al meno probabile: a) 6 con un dado; b) testa con una moneta; c) due teste di fila con una moneta.",
        "options": [
          {
            "text": "b) testa (50%), c) due teste di fila (25%), a) un 6 (16,7%)",
            "right": true
          },
          {
            "text": "a), b), c)",
            "right": false,
            "why": "Due teste di fila = ½ × ½ = 25%, più probabile di un 6 con un dado (1/6 ≈ 16,7%)."
          },
          {
            "text": "c), b), a)",
            "right": false,
            "why": "Due teste di fila = ½ × ½ = 25%, più probabile di un 6 con un dado (1/6 ≈ 16,7%)."
          },
          {
            "text": "b), a), c)",
            "right": false,
            "why": "Due teste di fila = ½ × ½ = 25%, più probabile di un 6 con un dado (1/6 ≈ 16,7%)."
          }
        ],
        "theory": "Un gioco in cui paghi per avere una probabilità di vincere ha un valore atteso: quanto ti restituisce in media ogni volta che paghi. Se ti restituisce meno di quanto paghi, nel lungo periodo perdi, anche se ogni singola partita può andare bene.",
        "explain": "Con una moneta, testa ha probabilità 50%. Gli eventi come il lancio di un dado o di una moneta sono indipendenti: il lancio successivo non dipende da quelli passati."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se la moneta ha dato testa cinque volte, al prossimo lancio è più probabile croce.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Gli eventi sono indipendenti, la probabilità resta 50%."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Se esce testa cinque volte di fila, al sesto lancio la probabilità di testa è ancora 50%. Il valore atteso si calcola moltiplicando ogni possibile risultato per la sua probabilità e sommando."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un gioco costa 3 €: peschi una carta da un mazzo di 40 e, se è un asso (4 carte), ricevi 20 €. Qual è la probabilità di vincere e il ritorno medio?",
        "options": [
          {
            "text": "Probabilità 4%; ritorno medio 20 €; vinci 17 €",
            "right": false,
            "why": "4/40 = 10%; 20 × 0,10 = 2 €; 2 − 3 = −1 € a gioco."
          },
          {
            "text": "Probabilità 10%; ritorno medio 20 €; vinci 17 €",
            "right": false,
            "why": "4/40 = 10%; 20 × 0,10 = 2 €; 2 − 3 = −1 € a gioco."
          },
          {
            "text": "Probabilità 10%; ritorno medio 2 €; perdi 1 € a gioco",
            "right": true
          },
          {
            "text": "Probabilità 25%; ritorno medio 5 €; vinci 2 €",
            "right": false,
            "why": "4/40 = 10%; 20 × 0,10 = 2 €; 2 − 3 = −1 € a gioco."
          }
        ],
        "explain": "Se un gioco costa 2 € e con probabilità 1/6 ti dà 9 € (altrimenti niente), il ritorno medio è 9 × 1/6 = 1,50 €.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Estrai una carta da un mazzo di 40: vinci 10 € se è un asso (4 carte), pagando 2 €. Valore atteso del ritorno?",
            "options": [
              {
                "text": "10 €",
                "right": false,
                "why": "4/40 × 10 = 1 €."
              },
              {
                "text": "0,40 €",
                "right": false,
                "why": "4/40 × 10 = 1 €."
              },
              {
                "text": "4 €",
                "right": false,
                "why": "4/40 × 10 = 1 €."
              },
              {
                "text": "1 €",
                "right": true
              }
            ],
            "explain": "Una puntata di 1 € su un singolo numero paga 35 € più la puntata restituita: valore atteso = (1/37) × 36 € = 0,973 €."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un gioco costa 3 €: peschi una carta da un mazzo di 40 e, se è un asso (4 carte), ricevi 20 €. Se giochi 30 volte, quanto spendi e quanto perdi in media?",
        "options": [
          {
            "text": "Spendi 90 €, ritorno atteso 60 €, perdita attesa 30 €",
            "right": true
          },
          {
            "text": "Spendi 90 €, ritorno atteso 90 €, perdita 0 €",
            "right": false,
            "why": "30 × 3 = 90; 30 × 2 = 60; 90 − 60 = 30 €."
          },
          {
            "text": "Spendi 60 €, ritorno atteso 30 €, perdita 30 €",
            "right": false,
            "why": "30 × 3 = 90; 30 × 2 = 60; 90 − 60 = 30 €."
          },
          {
            "text": "Spendi 30 €, ritorno atteso 60 €, vinci 30 €",
            "right": false,
            "why": "30 × 3 = 90; 30 × 2 = 60; 90 − 60 = 30 €."
          }
        ],
        "explain": "Perdita media: 0,027 € per euro, circa 2,7%. Il vantaggio del banco è un fatto aritmetico, verificabile con una calcolatrice: non è un’opinione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un gioco costa 4 € e restituisce in media 3,20 €. Quanto perdi in media in 25 giocate?",
            "options": [
              {
                "text": "80 €",
                "right": false,
                "why": "25 × 0,80 = 20 €."
              },
              {
                "text": "20 €",
                "right": true
              },
              {
                "text": "100 €",
                "right": false,
                "why": "25 × 0,80 = 20 €."
              },
              {
                "text": "3,20 €",
                "right": false,
                "why": "25 × 0,80 = 20 €."
              }
            ],
            "explain": "Se un gioco costa 2 € e con probabilità 1/6 ti dà 9 € (altrimenti niente), il ritorno medio è 9 × 1/6 = 1,50 €."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un gioco restituisce in media 90 centesimi ogni euro giocato. Se giochi 5 € a settimana per un anno (52 settimane), quanto perdi in media?",
        "options": [
          {
            "text": "Spendi 260 €, ritorno atteso 260 €, perdita 0 €",
            "right": false,
            "why": "5 × 52 = 260; × 0,90 = 234; perdita 26 €."
          },
          {
            "text": "Spendi 234 €, ritorno 260 €, vinci 26 €",
            "right": false,
            "why": "5 × 52 = 260; × 0,90 = 234; perdita 26 €."
          },
          {
            "text": "Spendi 260 €, ritorno atteso 234 €, perdita attesa 26 €",
            "right": true
          },
          {
            "text": "Spendi 260 €, ritorno 90 €, perdita 170 €",
            "right": false,
            "why": "5 × 52 = 260; × 0,90 = 234; perdita 26 €."
          }
        ],
        "explain": "Hai pagato 2 € per riavere in media 1,50 €: perdi in media 0,50 € a tiro, il 25% di quello che paghi. Quella quota che resta a chi organizza il gioco è il vantaggio del banco (in inglese house edge).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un gratta e vinci da 5 € ha ritorno medio 70%. In 12 biglietti, perdita attesa?",
            "options": [
              {
                "text": "60 €",
                "right": false,
                "why": "60 × 0,30 = 18 €."
              },
              {
                "text": "18 €",
                "right": true
              },
              {
                "text": "42 €",
                "right": false,
                "why": "60 × 0,30 = 18 €."
              },
              {
                "text": "3,50 €",
                "right": false,
                "why": "60 × 0,30 = 18 €."
              }
            ],
            "explain": "Perdita media: 0,027 € per euro, circa 2,7%. Il vantaggio del banco è un fatto aritmetico, verificabile con una calcolatrice: non è un’opinione."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Gioco A: costa 2 €, probabilità 1/5 di ricevere 8 €. Gioco B: costa 2 €, probabilità 1/50 di ricevere 80 €. Hanno lo stesso valore atteso. Cosa cambia per chi gioca?",
        "options": [
          {
            "text": "A è il gioco migliore: ha un valore atteso più alto",
            "right": false,
            "why": "Entrambi hanno valore atteso 1,60 € su 2 €; cambia la variabilità: 0,8¹⁰ ≈ 10,7% di non vincere mai con A contro 0,98¹⁰ ≈ 81,7% con B."
          },
          {
            "text": "Stesso ritorno medio (1,60 €, perdita 0,40 € a gioco) ma B è più rischioso: lunghi periodi senza vincere",
            "right": true
          },
          {
            "text": "B è il gioco migliore: il premio è più alto",
            "right": false,
            "why": "Entrambi hanno valore atteso 1,60 € su 2 €; cambia la variabilità: 0,8¹⁰ ≈ 10,7% di non vincere mai con A contro 0,98¹⁰ ≈ 81,7% con B."
          },
          {
            "text": "Cambia il valore atteso: A rende di più di B",
            "right": false,
            "why": "Entrambi hanno valore atteso 1,60 € su 2 €; cambia la variabilità: 0,8¹⁰ ≈ 10,7% di non vincere mai con A contro 0,98¹⁰ ≈ 81,7% con B."
          }
        ],
        "explain": "Un investimento ha un rendimento atteso che deriva da qualcosa di produttivo (un’azienda che fa utili, un prestito che paga interessi); in un gioco a probabilità fissa il valore atteso per chi gioca è negativo per costruzione, perché deve coprire i premi, i costi e i guadagni di chi lo gestisce."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Piano 1, L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una perdita attesa di 30 € in un mese equivale a quante ore di lavoro a 8 € l’ora (per esempio una paghetta guadagnata con un lavoretto)?",
        "options": [
          {
            "text": "30 ore",
            "right": false,
            "why": "30 ÷ 8 = 3,75 ore di lavoro."
          },
          {
            "text": "3,75 ore",
            "right": true
          },
          {
            "text": "8 ore",
            "right": false,
            "why": "30 ÷ 8 = 3,75 ore di lavoro."
          },
          {
            "text": "0,27 ore",
            "right": false,
            "why": "30 ÷ 8 = 3,75 ore di lavoro."
          }
        ],
        "explain": "Una puntata di 1 € su un singolo numero paga 35 € più la puntata restituita: valore atteso = (1/37) × 36 € = 0,973 €."
      }
    ],
    "source": "C03-L01"
  },
  "p3-l2": {
    "id": "p3-l2",
    "code": "L2",
    "floor": 3,
    "title": "Trappole mentali: perché continuiamo a giocare",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Trappole mentali",
        "mentor": "Collega ogni frase alla trappola: a) «Ha dato rosso sei volte, ora esce nero»; b) «Due simboli su tre: ci sono quasi»; c) «Ho già speso 30 €, non posso fermarmi ora»; d) «Ho perso 20 €, ne gioco altri 20 per rifarmi».",
        "options": [
          {
            "text": "a) fallacia del giocatore; b) quasi-vincita; c) costo affondato; d) rincorsa delle perdite",
            "right": true
          },
          {
            "text": "a) quasi-vincita; b) fallacia del giocatore; c) rincorsa delle perdite; d) costo affondato",
            "right": false,
            "why": "Il cervello non calcola il valore atteso: reagisce a emozioni e schemi."
          },
          {
            "text": "a) costo affondato; b) rincorsa delle perdite; c) quasi-vincita; d) fallacia del giocatore",
            "right": false,
            "why": "Il cervello non calcola il valore atteso: reagisce a emozioni e schemi."
          },
          {
            "text": "Sono tutte la stessa trappola",
            "right": false,
            "why": "Il cervello non calcola il valore atteso: reagisce a emozioni e schemi."
          }
        ],
        "theory": "Il cervello non calcola il valore atteso: reagisce a emozioni e schemi. Le trappole mentali spingono a giocare anche quando i numeri dicono il contrario, e i giochi sono costruiti per farle scattare.",
        "explain": "Il costo affondato è il denaro già speso e non recuperabile: «ho già messo 30 €, non posso smettere ora». La decisione corretta si basa solo su quello che succede da adesso in poi: quanto costa il prossimo tentativo e cosa ci si può aspettare."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se in un gioco a esito casuale ottengo due simboli su tre, vuol dire che alla prossima è più probabile vincere.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Ogni tentativo è indipendente e il «quasi» non cambia la probabilità."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "La quasi-vincita (near miss) è il risultato che sembra vicinissimo alla vittoria: due simboli uguali su tre, un numero sbagliato per una cifra."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con carta rara al 2% per pacchetto, qual è la probabilità di non trovarla in 6 pacchetti? E la probabilità di trovarla al settimo?",
        "options": [
          {
            "text": "Circa 88,6% di non trovarla in 6; al settimo la probabilità sale al 14%",
            "right": false,
            "why": "0,98⁶ ≈ 88,6%; ogni pacchetto ha comunque il 2%."
          },
          {
            "text": "Circa 12% di non trovarla in 6; al settimo resta 2%",
            "right": false,
            "why": "0,98⁶ ≈ 88,6%; ogni pacchetto ha comunque il 2%."
          },
          {
            "text": "Circa 98% di non trovarla in 6; al settimo sale al 100%",
            "right": false,
            "why": "0,98⁶ ≈ 88,6%; ogni pacchetto ha comunque il 2%."
          },
          {
            "text": "Circa 88,6% di non trovarla in 6; al settimo pacchetto la probabilità resta 2%",
            "right": true
          }
        ],
        "explain": "La fallacia del giocatore è credere che un evento casuale «debba» compensare quelli passati: dopo cinque rossi, «ora tocca al nero».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai perso 10 € in un gioco e vuoi rigiocarne 10 per «rifarti». Quale trappola è?",
            "options": [
              {
                "text": "Costo affondato",
                "right": false,
                "why": "Rigiocare per recuperare è inseguire le perdite."
              },
              {
                "text": "Fallacia del giocatore",
                "right": false,
                "why": "Rigiocare per recuperare è inseguire le perdite."
              },
              {
                "text": "Rincorsa delle perdite",
                "right": true
              },
              {
                "text": "Quasi-vincita",
                "right": false,
                "why": "Rigiocare per recuperare è inseguire le perdite."
              }
            ],
            "explain": "La rincorsa delle perdite è giocare di più per «rifarsi». È il costo affondato in forma di comportamento: chi ha perso 20 € ne rigioca 20 e, se il gioco restituisce meno di quanto costa, in media perde altro denaro."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una carta rara esce con probabilità del 2% in ogni pacchetto da 2 €. Quanto costa in media ottenerla?",
        "options": [
          {
            "text": "2 pacchetti, cioè 4 € in media",
            "right": false,
            "why": "1 ÷ 0,02 = 50 pacchetti × 2 € = 100 €; in 50 pacchetti la trova solo circa il 63,6%."
          },
          {
            "text": "20 pacchetti, cioè 40 € in media",
            "right": false,
            "why": "1 ÷ 0,02 = 50 pacchetti × 2 € = 100 €; in 50 pacchetti la trova solo circa il 63,6%."
          },
          {
            "text": "50 pacchetti, cioè 100 € in media (con grande variabilità)",
            "right": true
          },
          {
            "text": "200 pacchetti, cioè 400 € in media",
            "right": false,
            "why": "1 ÷ 0,02 = 50 pacchetti × 2 € = 100 €; in 50 pacchetti la trova solo circa il 63,6%."
          }
        ],
        "explain": "È il costo affondato in forma di comportamento: chi ha perso 20 € ne rigioca 20 e, se il gioco restituisce meno di quanto costa, in media perde altro denaro.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "«Ho già pagato tre mesi di abbonamento, non lo disdico ora». Quale trappola?",
            "options": [
              {
                "text": "Quasi-vincita",
                "right": false,
                "why": "I soldi già spesi non tornano indietro."
              },
              {
                "text": "Fallacia del giocatore",
                "right": false,
                "why": "I soldi già spesi non tornano indietro."
              },
              {
                "text": "Nessuna",
                "right": false,
                "why": "I soldi già spesi non tornano indietro."
              },
              {
                "text": "Costo affondato",
                "right": true
              }
            ],
            "explain": "Il costo affondato è il denaro già speso e non recuperabile: «ho già messo 30 €, non posso smettere ora». La decisione corretta si basa solo su quello che succede da adesso in poi: quanto costa il prossimo tentativo e cosa ci si può aspettare."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai perso 20 €. Rigiochi 20 € in un gioco che restituisce in media 75 centesimi per euro. Qual è la perdita attesa totale?",
        "options": [
          {
            "text": "20 €",
            "right": false,
            "why": "La seconda puntata restituisce in media 15 €: perdi altri 5 €, totale 20 + 5 = 25 €."
          },
          {
            "text": "25 €",
            "right": true
          },
          {
            "text": "5 €",
            "right": false,
            "why": "La seconda puntata restituisce in media 15 €: perdi altri 5 €, totale 20 + 5 = 25 €."
          },
          {
            "text": "40 €",
            "right": false,
            "why": "La seconda puntata restituisce in media 15 €: perdi altri 5 €, totale 20 + 5 = 25 €."
          }
        ],
        "explain": "La rincorsa delle perdite è giocare di più per «rifarsi».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Dopo cinque rossi di fila: «ora per forza il nero». Quale trappola?",
            "options": [
              {
                "text": "Costo affondato",
                "right": false,
                "why": "Ogni giro è indipendente."
              },
              {
                "text": "Rincorsa",
                "right": false,
                "why": "Ogni giro è indipendente."
              },
              {
                "text": "Quasi-vincita",
                "right": false,
                "why": "Ogni giro è indipendente."
              },
              {
                "text": "Fallacia del giocatore",
                "right": true
              }
            ],
            "explain": "La fallacia del giocatore è credere che un evento casuale «debba» compensare quelli passati: dopo cinque rossi, «ora tocca al nero»."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai speso 12 € in pacchetti senza trovare la carta. Il prossimo costa 2 €. Scegli:",
        "options": [
          {
            "text": "Continuo, altrimenti i 12 € sono sprecati",
            "right": false,
            "why": "Il costo affondato non si recupera. Anche continuare solo fino a un limite deciso prima è accettabile, ma non per «rifarsi»."
          },
          {
            "text": "Continuo finché non esce: ormai è più probabile",
            "right": false,
            "why": "Il costo affondato non si recupera. Anche continuare solo fino a un limite deciso prima è accettabile, ma non per «rifarsi»."
          },
          {
            "text": "Mi fermo e uso i 2 € per altro: i 12 € spesi sono persi in ogni caso",
            "right": true
          },
          {
            "text": "Continuo senza limite, tanto il prossimo pacchetto è quello giusto",
            "right": false,
            "why": "Il costo affondato non si recupera. Anche continuare solo fino a un limite deciso prima è accettabile, ma non per «rifarsi»."
          }
        ],
        "explain": "Non è una vittoria, e non dice nulla sulla prossima volta, ma viene vissuta come «quasi» e fa venire voglia di riprovare."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un pacchetto da 2 € contiene la carta rara con probabilità 2%; la carta, al prezzo a cui i giocatori se la scambiano (valore fittizio), vale 30 €. Qual è il valore atteso del solo contenuto raro?",
        "options": [
          {
            "text": "30 €",
            "right": false,
            "why": "30 × 0,02 = 0,60 €."
          },
          {
            "text": "2 €",
            "right": false,
            "why": "30 × 0,02 = 0,60 €."
          },
          {
            "text": "0,60 €, contro 2 € pagati: ritorno 30% su quella parte",
            "right": true
          },
          {
            "text": "0,02 €",
            "right": false,
            "why": "30 × 0,02 = 0,60 €."
          }
        ],
        "explain": "Come visto in L1, la roulette non ricorda."
      }
    ],
    "source": "C03-L02"
  },
  "p3-l3": {
    "id": "p3-l3",
    "code": "L3",
    "floor": 3,
    "title": "Gratta e vinci, slot, scommesse e pacchetti a sorpresa: come funzionano",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Gratta e vinci, slot, scommesse e pacchetti a sorpresa",
        "mentor": "Metti in ordine dal ritorno medio più basso al più alto: scommessa con ritorno 94,6% (esempio); VLT con payout minimo 83%; AWP con payout minimo 65%.",
        "options": [
          {
            "text": "scommessa (94,6%), VLT (83%), AWP (65%)",
            "right": false,
            "why": "Un ritorno più alto significa perdita media più bassa, non assenza di perdita."
          },
          {
            "text": "VLT (83%), AWP (65%), scommessa (94,6%)",
            "right": false,
            "why": "Un ritorno più alto significa perdita media più bassa, non assenza di perdita."
          },
          {
            "text": "AWP (65%), VLT (83%), scommessa (94,6%)",
            "right": true
          },
          {
            "text": "Hanno tutte lo stesso ritorno",
            "right": false,
            "why": "Un ritorno più alto significa perdita media più bassa, non assenza di perdita."
          }
        ],
        "theory": "Ogni gioco, legale o no, ha una percentuale di ritorno (payout) decisa a monte: la parte che non torna ai giocatori finisce a chi lo organizza, allo Stato e ai punti vendita. Conoscere il payout permette di calcolare in anticipo la perdita media.",
        "explain": "Una puntata obbligatoria di 2.000 € con ritorno medio 94,6% costa in media 108 € di perdita, più del bonus di 50 €."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se una slot ha payout 65%, ogni sera su 100 € giocati ne ritorno 65.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "65% è una media su moltissime giocate, in una serata può andare molto meglio o peggio."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Significa che, su molte giocate, per ogni 100 € puntati tornano in media almeno 65 € (AWP) o 83 € (VLT): la perdita media è al massimo 35 € e 17 € ogni 100 €, ma si tratta di una media su moltissime giocate, non di quello che succede a una persona in una serata."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Biglietto da 5 € con ritorno medio 70% (dato fittizio). Quanto perdi in media comprando 10 biglietti?",
        "options": [
          {
            "text": "Spendi 50 €, ritorno atteso 50 €, perdita 0 €",
            "right": false,
            "why": "5 × 10 = 50; 50 × 0,70 = 35; perdita 15 €."
          },
          {
            "text": "Spendi 50 €, ritorno atteso 35 €, perdita attesa 15 €",
            "right": true
          },
          {
            "text": "Spendi 35 €, ritorno atteso 50 €, vinci 15 €",
            "right": false,
            "why": "5 × 10 = 50; 50 × 0,70 = 35; perdita 15 €."
          },
          {
            "text": "Spendi 50 €, ritorno atteso 15 €, perdita 35 €",
            "right": false,
            "why": "5 × 10 = 50; 50 × 0,70 = 35; perdita 15 €."
          }
        ],
        "explain": "Con quote 2,00 / 3,40 / 3,80 la somma è 105,7%: il ritorno medio è circa 94,6% (1/1,057). I bonus di benvenuto dei siti online sembrano regali ma hanno condizioni, ad esempio puntare un multiplo dell’importo prima di poter prelevare.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un pacchetto da 2 € ha il 2% di carta rara. In 10 pacchetti quanto spendi?",
            "options": [
              {
                "text": "2 €",
                "right": false,
                "why": "10 × 2 = 20 €."
              },
              {
                "text": "20 €",
                "right": true
              },
              {
                "text": "200 €",
                "right": false,
                "why": "10 × 2 = 20 €."
              },
              {
                "text": "0,20 €",
                "right": false,
                "why": "10 × 2 = 20 €."
              }
            ],
            "explain": "L’altro errore è considerare i pacchetti dei videogiochi «solo un gioco» perché l’oggetto non è denaro: il denaro per aprirli è vero."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una vincita di 1.000 € con ritenuta 20% sulla parte oltre 500 €: quanto resta? E con una vincita di 400 €?",
        "options": [
          {
            "text": "900 € per la vincita da 1.000 €; 400 € per quella da 400 € (dato da verificare)",
            "right": true
          },
          {
            "text": "800 € per la vincita da 1.000 €; 320 € per quella da 400 €",
            "right": false,
            "why": "1.000 − 20% di 500 = 900 €; sotto i 500 € nessuna ritenuta."
          },
          {
            "text": "1.000 € e 400 €: nessuna ritenuta",
            "right": false,
            "why": "1.000 − 20% di 500 = 900 €; sotto i 500 € nessuna ritenuta."
          },
          {
            "text": "900 € per entrambe",
            "right": false,
            "why": "1.000 − 20% di 500 = 900 €; sotto i 500 € nessuna ritenuta."
          }
        ],
        "explain": "Su ogni vincita sopra i 500 € lo Stato trattiene il 20% della parte eccedente: una vincita di 1.000 € diventa 900 € netti.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una slot ha payout 80% (dato fittizio). Su 200 € giocati, perdita media?",
            "options": [
              {
                "text": "40 €",
                "right": true
              },
              {
                "text": "160 €",
                "right": false,
                "why": "200 × 0,20 = 40 €."
              },
              {
                "text": "200 €",
                "right": false,
                "why": "200 × 0,20 = 40 €."
              },
              {
                "text": "80 €",
                "right": false,
                "why": "200 × 0,20 = 40 €."
              }
            ],
            "explain": "Significa che, su molte giocate, per ogni 100 € puntati tornano in media almeno 65 € (AWP) o 83 € (VLT): la perdita media è al massimo 35 € e 17 € ogni 100 €, ma si tratta di una media su moltissime giocate, non di quello che succede a una persona in una serata."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Quote 2,00 / 3,40 / 3,80: calcola la somma delle probabilità implicite e il ritorno medio.",
        "options": [
          {
            "text": "Somma 100%; ritorno 100%; margine 0%",
            "right": false,
            "why": "0,500 + 0,294 + 0,263 = 1,057; 1 ÷ 1,057 ≈ 94,6%."
          },
          {
            "text": "Somma 94,6%; ritorno 105,7%; margine −5,4%",
            "right": false,
            "why": "0,500 + 0,294 + 0,263 = 1,057; 1 ÷ 1,057 ≈ 94,6%."
          },
          {
            "text": "Somma delle probabilità implicite 105,7%; ritorno medio circa 94,6%; margine circa 5,4%",
            "right": true
          },
          {
            "text": "Somma 105,7%; ritorno 105,7%; margine 5,7%",
            "right": false,
            "why": "0,500 + 0,294 + 0,263 = 1,057; 1 ÷ 1,057 ≈ 94,6%."
          }
        ],
        "explain": "La quota 2,00 corrisponde a una probabilità implicita del 50% (1/2,00); se si sommano le probabilità implicite di tutti i risultati e si ottiene più di 100%, l’eccesso è il margine del bookmaker.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una vincita da 700 € con ritenuta 20% sulla parte oltre 500 €: quanto resta (dato da verificare)?",
            "options": [
              {
                "text": "560 €",
                "right": false,
                "why": "700 − 20% di 200 = 660 €."
              },
              {
                "text": "660 €",
                "right": true
              },
              {
                "text": "700 €",
                "right": false,
                "why": "700 − 20% di 200 = 660 €."
              },
              {
                "text": "600 €",
                "right": false,
                "why": "700 − 20% di 200 = 660 €."
              }
            ],
            "explain": "Su ogni vincita sopra i 500 € lo Stato trattiene il 20% della parte eccedente: una vincita di 1.000 € diventa 900 € netti."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un amico maggiorenne ti dice: «Su questo sito ti regalano 50 €, bisogna solo puntare 2.000 € prima di prelevare». Cosa fai?",
        "options": [
          {
            "text": "Accetto: 50 € gratis sono un guadagno",
            "right": false,
            "why": "Con ritorno medio 94,6% su 2.000 € di puntate la perdita attesa è circa 108 €, più del bonus; e il gioco online è vietato ai minorenni. Si declina e si controlla sempre la condizione di prelievo."
          },
          {
            "text": "Accetto ma punto solo 100 €",
            "right": false,
            "why": "Con ritorno medio 94,6% su 2.000 € di puntate la perdita attesa è circa 108 €, più del bonus; e il gioco online è vietato ai minorenni. Si declina e si controlla sempre la condizione di prelievo."
          },
          {
            "text": "Accetto se l’amico è maggiorenne",
            "right": false,
            "why": "Con ritorno medio 94,6% su 2.000 € di puntate la perdita attesa è circa 108 €, più del bonus; e il gioco online è vietato ai minorenni. Si declina e si controlla sempre la condizione di prelievo."
          },
          {
            "text": "Declino: perdita attesa di circa 108 € più del bonus; il gioco online è vietato ai minorenni; controllo sempre la condizione di prelievo",
            "right": true
          }
        ],
        "explain": "In Italia il gioco con vincite in denaro è vietato ai minorenni. Gli adulti possono giocare solo a giochi autorizzati dall’Agenzia delle Dogane e dei Monopoli (ADM)."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un messaggio dice «ti è mancata solo una cifra!». Quale trappola sfrutta?",
        "options": [
          {
            "text": "La fallacia del giocatore",
            "right": false,
            "why": "Ogni gioco, legale o no, ha una percentuale di ritorno (payout) decisa a monte: la parte che non torna ai giocatori finisce a chi lo organizza, allo Stato e ai punti vendita."
          },
          {
            "text": "Il costo affondato",
            "right": false,
            "why": "Ogni gioco, legale o no, ha una percentuale di ritorno (payout) decisa a monte: la parte che non torna ai giocatori finisce a chi lo organizza, allo Stato e ai punti vendita."
          },
          {
            "text": "La rincorsa delle perdite",
            "right": false,
            "why": "Ogni gioco, legale o no, ha una percentuale di ritorno (payout) decisa a monte: la parte che non torna ai giocatori finisce a chi lo organizza, allo Stato e ai punti vendita."
          },
          {
            "text": "La quasi-vincita: non cambia la probabilità del prossimo tentativo",
            "right": true
          }
        ],
        "explain": "L’autorizzazione dice che il gioco è regolare, non che restituisca più di quanto costa. L’altro errore è considerare i pacchetti dei videogiochi «solo un gioco» perché l’oggetto non è denaro: il denaro per aprirli è vero."
      }
    ],
    "source": "C03-L03"
  },
  "p3-l4": {
    "id": "p3-l4",
    "code": "L4",
    "floor": 3,
    "title": "Quando il gioco diventa un problema",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Quando il gioco diventa un problema",
        "mentor": "Quali di queste situazioni sono segnali di gioco problematico? a) Giocare ogni tanto con gli amici senza soldi; b) mentire ai genitori su dove vanno i soldi; c) prendere in prestito soldi per giocare; d) pensare sempre al prossimo pacchetto.",
        "options": [
          {
            "text": "b), c) e d)",
            "right": true
          },
          {
            "text": "Solo a)",
            "right": false,
            "why": "Il punto è il controllo: giocare ogni tanto con gli amici senza soldi non è di per sé un segnale."
          },
          {
            "text": "a) e b)",
            "right": false,
            "why": "Il punto è il controllo: giocare ogni tanto con gli amici senza soldi non è di per sé un segnale."
          },
          {
            "text": "Nessuna",
            "right": false,
            "why": "Il punto è il controllo: giocare ogni tanto con gli amici senza soldi non è di per sé un segnale."
          }
        ],
        "theory": "Il problema non sta nell’importo in sé ma nella perdita di controllo: quando il gioco prende tempo, soldi e pensieri a scapito del resto, è il momento di parlarne.",
        "explain": "Giocare con soldi (o spendere in giochi con pacchetti a sorpresa) può diventare un problema anche senza perdite enormi."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se si perdono pochi soldi non può esserci un problema di gioco.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Contano perdita di controllo, bugie, tempo sottratto al resto."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Pensare «smetto quando voglio» o «non ho un problema perché gioco poco». Il controllo si misura con i fatti: riesci a fermarti al limite che ti eri dato?"
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Marco spende 15 € a settimana: quanto in 52 settimane?",
        "options": [
          {
            "text": "15 €",
            "right": false,
            "why": "15 × 52 = 780 €."
          },
          {
            "text": "780 €",
            "right": true
          },
          {
            "text": "520 €",
            "right": false,
            "why": "15 × 52 = 780 €."
          },
          {
            "text": "390 €",
            "right": false,
            "why": "15 × 52 = 780 €."
          }
        ],
        "explain": "Una spesa piccola ma regolare diventa grande sull’anno: 15 € a settimana sono 780 € in 52 settimane: con una paghetta di 40 € al mese (480 € l’anno) non basterebbero.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un amico mente sui soldi spesi per i giochi. Che segnale è?",
            "options": [
              {
                "text": "Perdita di controllo",
                "right": true
              },
              {
                "text": "Un segnale normale",
                "right": false,
                "why": "Mentire su quanto si spende è un segnale."
              },
              {
                "text": "Un segnale di risparmio",
                "right": false,
                "why": "Mentire su quanto si spende è un segnale."
              },
              {
                "text": "Nessun segnale",
                "right": false,
                "why": "Mentire su quanto si spende è un segnale."
              }
            ],
            "explain": "Giocare con soldi (o spendere in giochi con pacchetti a sorpresa) può diventare un problema anche senza perdite enormi."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con 40 € di paghetta al mese (480 € l’anno), quanto manca per coprire la spesa?",
        "options": [
          {
            "text": "780 €",
            "right": false,
            "why": "780 − 480 = 300 €."
          },
          {
            "text": "300 €",
            "right": true
          },
          {
            "text": "480 €",
            "right": false,
            "why": "780 − 480 = 300 €."
          },
          {
            "text": "200 €",
            "right": false,
            "why": "780 − 480 = 300 €."
          }
        ],
        "explain": "Quando la spesa supera le entrate, si arriva ai debiti, ai prestiti tra amici, ai soldi presi in famiglia. Per un amico, la cosa più utile è non giudicare e proporre di parlarne con un adulto, restando accanto.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Spendi 8 € a settimana in un gioco: quanto in un anno (52 settimane)?",
            "options": [
              {
                "text": "8 €",
                "right": false,
                "why": "8 × 52 = 416 €."
              },
              {
                "text": "208 €",
                "right": false,
                "why": "8 × 52 = 416 €."
              },
              {
                "text": "416 €",
                "right": true
              },
              {
                "text": "832 €",
                "right": false,
                "why": "8 × 52 = 416 €."
              }
            ],
            "explain": "Una spesa piccola ma regolare diventa grande sull’anno: 15 € a settimana sono 780 € in 52 settimane: con una paghetta di 40 € al mese (480 € l’anno) non basterebbero."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire (trova l'errore)",
        "moment": "capire",
        "idea": null,
        "mentor": "«Per smettere basta la forza di volontà, non serve dirlo a nessuno.»",
        "options": [
          {
            "text": "Dirlo ad altri è sempre un errore",
            "right": false,
            "why": "Il problema non sta nell’importo in sé ma nella perdita di controllo: quando il gioco prende tempo, soldi e pensieri a scapito del resto, è il momento di parlarne."
          },
          {
            "text": "La forza di volontà basta sempre",
            "right": false,
            "why": "Il problema non sta nell’importo in sé ma nella perdita di controllo: quando il gioco prende tempo, soldi e pensieri a scapito del resto, è il momento di parlarne."
          },
          {
            "text": "Smettere non si può",
            "right": false,
            "why": "Il problema non sta nell’importo in sé ma nella perdita di controllo: quando il gioco prende tempo, soldi e pensieri a scapito del resto, è il momento di parlarne."
          },
          {
            "text": "Pensare di dover fare tutto da soli: parlarne con un adulto di fiducia o con un servizio specializzato aiuta",
            "right": true
          }
        ],
        "explain": "Per un amico, la cosa più utile è non giudicare e proporre di parlarne con un adulto, restando accanto. Pensare «smetto quando voglio» o «non ho un problema perché gioco poco».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Spendi 20 € a settimana. Il tuo stipendio mensile netto è 1.000 €. Quale quota va in gioco in un anno?",
            "options": [
              {
                "text": "20%",
                "right": false,
                "why": "20 × 52 = 1.040 €; 1.040 ÷ 12.000 ≈ 8,7%."
              },
              {
                "text": "2%",
                "right": false,
                "why": "20 × 52 = 1.040 €; 1.040 ÷ 12.000 ≈ 8,7%."
              },
              {
                "text": "Circa 87%",
                "right": false,
                "why": "20 × 52 = 1.040 €; 1.040 ÷ 12.000 ≈ 8,7%."
              },
              {
                "text": "Circa 8,7% (1.040 su 12.000)",
                "right": true
              }
            ],
            "explain": "Una spesa piccola ma regolare diventa grande sull’anno: 15 € a settimana sono 780 € in 52 settimane: con una paghetta di 40 € al mese (480 € l’anno) non basterebbero."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un amico ti dice che ha preso soldi dal portafoglio di sua madre per aprire pacchetti. Cosa fai?",
        "options": [
          {
            "text": "Prestargli i soldi così li rimette",
            "right": false,
            "why": "A) peggiora il problema e crea un debito; b) lascia tutto com’è."
          },
          {
            "text": "Far finta di niente",
            "right": false,
            "why": "A) peggiora il problema e crea un debito; b) lascia tutto com’è."
          },
          {
            "text": "Dirlo solo agli altri amici",
            "right": false,
            "why": "A) peggiora il problema e crea un debito; b) lascia tutto com’è."
          },
          {
            "text": "Dirgli che sei preoccupato e proporre di parlarne con un adulto di fiducia, restando con lui",
            "right": true
          }
        ],
        "explain": "Per un amico, la cosa più utile è non giudicare e proporre di parlarne con un adulto, restando accanto. Pensare «smetto quando voglio» o «non ho un problema perché gioco poco»."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Marco spende 15 € a settimana in un gioco con ritorno medio 70% (dato fittizio). Quanto perde in media in un anno?",
        "options": [
          {
            "text": "780 €",
            "right": false,
            "why": "15 × 0,30 = 4,50 € a settimana; × 52 = 234 €."
          },
          {
            "text": "234 €",
            "right": true
          },
          {
            "text": "234 € a settimana",
            "right": false,
            "why": "15 × 0,30 = 4,50 € a settimana; × 52 = 234 €."
          },
          {
            "text": "54 €",
            "right": false,
            "why": "15 × 0,30 = 4,50 € a settimana; × 52 = 234 €."
          }
        ],
        "explain": "Una spesa piccola ma regolare diventa grande sull’anno: 15 € a settimana sono 780 € in 52 settimane: con una paghetta di 40 € al mese (480 € l’anno) non basterebbero."
      }
    ],
    "source": "C03-L04"
  },
  "p3-l5": {
    "id": "p3-l5",
    "code": "L5",
    "floor": 3,
    "title": "Trading e leva: investire o scommettere?",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Trading e leva",
        "mentor": "Collega: a) compra quote di aziende e le tiene per anni; b) apre e chiude CFD nello stesso giorno con leva; c) paga 2 € per tirare un dado e vincere 9 €.",
        "options": [
          {
            "text": "a) trader con leva; b) investitore; c) scommessa/gioco",
            "right": false,
            "why": "Investire significa possedere qualcosa che nel tempo produce valore (utili, interessi) e tenere i costi bassi; fare trading con la leva significa scommettere su un movimento di prezzo in poco tempo, con un’esposizione molto più grande del capitale versato."
          },
          {
            "text": "a) scommessa; b) investitore; c) trader con leva",
            "right": false,
            "why": "Investire significa possedere qualcosa che nel tempo produce valore (utili, interessi) e tenere i costi bassi; fare trading con la leva significa scommettere su un movimento di prezzo in poco tempo, con un’esposizione molto più grande del capitale versato."
          },
          {
            "text": "a) investitore; b) trader con leva; c) scommessa/gioco",
            "right": true
          },
          {
            "text": "Sono tutti investitori",
            "right": false,
            "why": "Investire significa possedere qualcosa che nel tempo produce valore (utili, interessi) e tenere i costi bassi; fare trading con la leva significa scommettere su un movimento di prezzo in poco tempo, con un’esposizione molto più grande del capitale versato."
          }
        ],
        "theory": "Investire significa possedere qualcosa che nel tempo produce valore (utili, interessi) e tenere i costi bassi; fare trading con la leva significa scommettere su un movimento di prezzo in poco tempo, con un’esposizione molto più grande del capitale versato. La leva non cambia la probabilità di vincere: cambia quanto si vince e quanto si perde.",
        "explain": "Pensare che la leva sia un «moltiplicatore di guadagni». È un moltiplicatore di tutto, perdite comprese."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Con leva 10:1 posso guadagnare dieci volte di più, ma anche perdere dieci volte di più.",
        "options": [
          {
            "text": "Vero",
            "right": true
          },
          {
            "text": "Falso",
            "right": false,
            "why": "Rispetto al capitale versato."
          }
        ],
        "explain": "La leva finanziaria permette di controllare una posizione più grande del capitale versato."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Capitale 100 €, leva 10:1, prezzo +4%: guadagno?",
        "options": [
          {
            "text": "+4 €",
            "right": false,
            "why": "100 × 10 = 1.000; 1.000 × 4% = 40 €."
          },
          {
            "text": "+400 €",
            "right": false,
            "why": "100 × 10 = 1.000; 1.000 × 4% = 40 €."
          },
          {
            "text": "+100 €",
            "right": false,
            "why": "100 × 10 = 1.000; 1.000 × 4% = 40 €."
          },
          {
            "text": "+40 € (+40% sul capitale)",
            "right": true
          }
        ],
        "explain": "Con leva 10:1 un capitale di 100 € controlla 1.000 €: se il prezzo sale del 4%, il guadagno è 40 € (+40% sul capitale); se scende del 10%, la perdita è 100 €, cioè tutto il capitale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Leva 5:1 con 20 € di capitale e prezzo +2%: guadagno?",
            "options": [
              {
                "text": "0,40 €",
                "right": false,
                "why": "20 × 5 = 100; 100 × 2% = 2 €."
              },
              {
                "text": "10 €",
                "right": false,
                "why": "20 × 5 = 100; 100 × 2% = 2 €."
              },
              {
                "text": "20 €",
                "right": false,
                "why": "20 × 5 = 100; 100 × 2% = 2 €."
              },
              {
                "text": "2 €",
                "right": true
              }
            ],
            "explain": "Con leva 10:1 un capitale di 100 € controlla 1.000 €: se il prezzo sale del 4%, il guadagno è 40 € (+40% sul capitale); se scende del 10%, la perdita è 100 €, cioè tutto il capitale."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con capitale di 100 € e leva 10:1 (posizione da 1.000 €), il prezzo scende del 10%: quanto perdi?",
        "options": [
          {
            "text": "−10 €",
            "right": false,
            "why": "1.000 × 10% = 100 €."
          },
          {
            "text": "−1.000 €",
            "right": false,
            "why": "1.000 × 10% = 100 €."
          },
          {
            "text": "−40 €",
            "right": false,
            "why": "1.000 × 10% = 100 €."
          },
          {
            "text": "−100 €: tutto il capitale",
            "right": true
          }
        ],
        "explain": "Nel 2018 l’ESMA, l’autorità europea dei mercati, ha limitato i CFD ai clienti al dettaglio: leva massima 30:1 sulle principali valute, 20:1 su oro e principali indici, 10:1 su altre materie prime, 5:1 sulle azioni, 2:1 sulle criptovalute; chiusura automatica della posizione se il margine scende al 50% di quello richiesto; protezione contro il saldo negativo; avviso di rischio che riporta la percentuale di clienti del fornitore che perde.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Leva 10:1 con 50 € e prezzo −5%: perdita?",
            "options": [
              {
                "text": "25 €",
                "right": true
              },
              {
                "text": "2,50 €",
                "right": false,
                "why": "50 × 10 = 500; 500 × 5% = 25 €."
              },
              {
                "text": "5 €",
                "right": false,
                "why": "50 × 10 = 500; 500 × 5% = 25 €."
              },
              {
                "text": "50 €",
                "right": false,
                "why": "50 × 10 = 500; 500 × 5% = 25 €."
              }
            ],
            "explain": "Nel 2018 l’ESMA, l’autorità europea dei mercati, ha limitato i CFD ai clienti al dettaglio: leva massima 30:1 sulle principali valute, 20:1 su oro e principali indici, 10:1 su altre materie prime, 5:1 sulle azioni, 2:1 sulle criptovalute; chiusura automatica della posizione se il margine scende al 50% di quello richiesto; protezione contro il saldo negativo; avviso di rischio che riporta la percentuale di clienti del fornitore che perde."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Margine 200 €, leva 30:1 su una valuta: esposizione e perdita se il prezzo scende dell'1%?",
        "options": [
          {
            "text": "Esposizione 6.000 €; perdita 60 € (30% del capitale)",
            "right": true
          },
          {
            "text": "Esposizione 200 €; perdita 2 €",
            "right": false,
            "why": "200 × 30 = 6.000; 6.000 × 1% = 60 €; 60 ÷ 200 = 30%."
          },
          {
            "text": "Esposizione 6.000 €; perdita 6 €",
            "right": false,
            "why": "200 × 30 = 6.000; 6.000 × 1% = 60 €; 60 ÷ 200 = 30%."
          },
          {
            "text": "Esposizione 600 €; perdita 6 €",
            "right": false,
            "why": "200 × 30 = 6.000; 6.000 × 1% = 60 €; 60 ÷ 200 = 30%."
          }
        ],
        "explain": "I CFD (contratti per differenza) sono strumenti derivati con cui si scommette sulla differenza di prezzo di un’attività (valuta, oro, azione, indice, cripto) senza possederla.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Leva 20:1 con 100 € e prezzo −5%: cosa succede?",
            "options": [
              {
                "text": "Perdi tutto il capitale",
                "right": true
              },
              {
                "text": "Perdi 5 €",
                "right": false,
                "why": "2.000 × 5% = 100 €."
              },
              {
                "text": "Perdi 50 €",
                "right": false,
                "why": "2.000 × 5% = 100 €."
              },
              {
                "text": "Guadagni 5 €",
                "right": false,
                "why": "2.000 × 5% = 100 €."
              }
            ],
            "explain": "Con leva 10:1 un capitale di 100 € controlla 1.000 €: se il prezzo sale del 4%, il guadagno è 40 € (+40% sul capitale); se scende del 10%, la perdita è 100 €, cioè tutto il capitale."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un video dice: «Con 100 € ne faccio 1.000 in una settimana con la leva sull’oro». Cosa fai?",
        "options": [
          {
            "text": "Controllo chi lo dice, se ha link affiliati e quanti conti perdono",
            "right": true
          },
          {
            "text": "Provo con 100 €",
            "right": false,
            "why": "Le analisi ESMA parlano di 74–89% di conti in perdita; a) e c) si basano solo sulla promessa."
          },
          {
            "text": "Chiedo consiglio a chi lo segue",
            "right": false,
            "why": "Le analisi ESMA parlano di 74–89% di conti in perdita; a) e c) si basano solo sulla promessa."
          },
          {
            "text": "Compro subito per non perdere l’occasione",
            "right": false,
            "why": "Le analisi ESMA parlano di 74–89% di conti in perdita; a) e c) si basano solo sulla promessa."
          }
        ],
        "explain": "Per un teenager il tema è soprattutto culturale: video e canali che promettono «trading facile» mostrano i casi vincenti e quasi mai quelli in perdita, e spesso vivono di link affiliati e commissioni."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un’operazione vince 40 € con probabilità 45% e perde 50 € con probabilità 55%: valore atteso?",
        "options": [
          {
            "text": "+9,50 € a operazione",
            "right": false,
            "why": "0,45 × 40 − 0,55 × 50 = 18 − 27,50 = −9,50 €."
          },
          {
            "text": "+18 € a operazione",
            "right": false,
            "why": "0,45 × 40 − 0,55 × 50 = 18 − 27,50 = −9,50 €."
          },
          {
            "text": "−9,50 € a operazione",
            "right": true
          },
          {
            "text": "−27,50 € a operazione",
            "right": false,
            "why": "0,45 × 40 − 0,55 × 50 = 18 − 27,50 = −9,50 €."
          }
        ],
        "explain": "Si può puntare sul rialzo (long) o sul ribasso (short). Oltre al rischio di prezzo ci sono costi: spread, commissioni, costi di mantenimento per tenere aperta la posizione."
      }
    ],
    "source": "C03-L05"
  },
  "p3-l6": {
    "id": "p3-l6",
    "code": "L6",
    "floor": 3,
    "title": "Proteggersi: limiti, regole e perdita massima",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Proteggersi",
        "mentor": "Quali regole vanno decise prima di giocare? a) importo massimo mensile; b) quanto spendere «se sto perdendo»; c) nessun prestito; d) pausa di 24 ore dopo una perdita.",
        "options": [
          {
            "text": "Solo a)",
            "right": false,
            "why": "A) importo massimo, c) nessun prestito, d) pausa dopo una perdita."
          },
          {
            "text": "a), c) e d) vanno decise prima; b) è rincorsa delle perdite",
            "right": true
          },
          {
            "text": "b) e d)",
            "right": false,
            "why": "A) importo massimo, c) nessun prestito, d) pausa dopo una perdita."
          },
          {
            "text": "Tutte vanno decise dopo aver perso",
            "right": false,
            "why": "A) importo massimo, c) nessun prestito, d) pausa dopo una perdita."
          }
        ],
        "theory": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2). Il limite non si ritocca per rifarsi.",
        "explain": "La regola funziona se è scritta, semplice e senza eccezioni: un importo mensile; stop quando lo raggiungi; nessun prestito da amici o da casa; pausa di 24 ore dopo una perdita; metodi di pagamento collegati al telefono tolti o limitati; notifiche del gioco spente."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se raggiungo il limite ma ho perso, posso alzarlo per recuperare.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "È la rincorsa delle perdite."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Se il limite si alza ogni volta che si perde, non è più un limite. Il rischio di rovina dipende da quanto è grande la puntata rispetto al capitale."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Paghetta 40 € al mese, desideri 30%, limite di gioco pari alla metà dei desideri: quanto?",
        "options": [
          {
            "text": "6 €",
            "right": true
          },
          {
            "text": "12 €",
            "right": false,
            "why": "40 × 0,30 = 12 €; metà = 6 €."
          },
          {
            "text": "40 €",
            "right": false,
            "why": "40 × 0,30 = 12 €; metà = 6 €."
          },
          {
            "text": "3 €",
            "right": false,
            "why": "40 × 0,30 = 12 €; metà = 6 €."
          }
        ],
        "explain": "Con una paghetta di 40 € al mese e una quota desideri del 30%, i desideri sono 12 €; per giochi e acquisti in-game si può decidere di usarne al massimo la metà, cioè 6 €.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Paghetta 50 €, quota desideri 30%, limite di gioco pari a un terzo dei desideri: quanto?",
            "options": [
              {
                "text": "15 €",
                "right": false,
                "why": "50 × 0,30 = 15; ÷ 3 = 5 €."
              },
              {
                "text": "10 €",
                "right": false,
                "why": "50 × 0,30 = 15; ÷ 3 = 5 €."
              },
              {
                "text": "1,50 €",
                "right": false,
                "why": "50 × 0,30 = 15; ÷ 3 = 5 €."
              },
              {
                "text": "5 €",
                "right": true
              }
            ],
            "explain": "Con una paghetta di 40 € al mese e una quota desideri del 30%, i desideri sono 12 €; per giochi e acquisti in-game si può decidere di usarne al massimo la metà, cioè 6 €."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "In un gioco che vince una volta su cinque, qual è la probabilità di perdere cinque tentativi di fila?",
        "options": [
          {
            "text": "Circa 32,8%",
            "right": true
          },
          {
            "text": "20%",
            "right": false,
            "why": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2)."
          },
          {
            "text": "80%",
            "right": false,
            "why": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2)."
          },
          {
            "text": "Circa 67%",
            "right": false,
            "why": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2)."
          }
        ],
        "explain": "In un gioco che vince una volta su cinque, la probabilità di perdere 5 tentativi di fila è circa 32,8% (0,8⁵), mentre perderne 25 di fila è circa 0,4% (0,8²⁵).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai raggiunto il limite di gioco del mese. Cosa fai?",
            "options": [
              {
                "text": "Alzo il limite per recuperare",
                "right": false,
                "why": "Il limite non si ritocca per rifarsi."
              },
              {
                "text": "Mi fermo fino al mese dopo",
                "right": true
              },
              {
                "text": "Prendo in prestito",
                "right": false,
                "why": "Il limite non si ritocca per rifarsi."
              },
              {
                "text": "Gioco una sola volta ancora",
                "right": false,
                "why": "Il limite non si ritocca per rifarsi."
              }
            ],
            "explain": "Se il limite si alza ogni volta che si perde, non è più un limite. Il rischio di rovina dipende da quanto è grande la puntata rispetto al capitale."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con 50 € di capitale, quanti tentativi persi di fila per azzerarlo con puntate da 10 € e da 2 €?",
        "options": [
          {
            "text": "10 e 50; probabilità circa 2%",
            "right": false,
            "why": "50 ÷ 10 = 5; 50 ÷ 2 = 25; 0,8²⁵ ≈ 0,4%."
          },
          {
            "text": "5 e 5; probabilità circa 33%",
            "right": false,
            "why": "50 ÷ 10 = 5; 50 ÷ 2 = 25; 0,8²⁵ ≈ 0,4%."
          },
          {
            "text": "5 tentativi con puntate da 10 € e 25 con puntate da 2 €; 25 perdite di fila hanno probabilità circa 0,4%",
            "right": true
          },
          {
            "text": "25 e 5; probabilità circa 0,4%",
            "right": false,
            "why": "50 ÷ 10 = 5; 50 ÷ 2 = 25; 0,8²⁵ ≈ 0,4%."
          }
        ],
        "explain": "Con 50 € e puntate da 10 € bastano 5 perdite di fila per azzerarsi; con puntate da 2 € ne servono 25.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un gioco vince una volta su 10. Probabilità di perdere 3 tentativi di fila?",
            "options": [
              {
                "text": "30%",
                "right": false,
                "why": "0,9³ = 0,729."
              },
              {
                "text": "10%",
                "right": false,
                "why": "0,9³ = 0,729."
              },
              {
                "text": "72,9%",
                "right": true
              },
              {
                "text": "27%",
                "right": false,
                "why": "0,9³ = 0,729."
              }
            ],
            "explain": "In un gioco che vince una volta su cinque, la probabilità di perdere 5 tentativi di fila è circa 32,8% (0,8⁵), mentre perderne 25 di fila è circa 0,4% (0,8²⁵)."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un gruppo scrive: «Segui i miei segnali, +20% garantito in 7 giorni, ultimi posti, paga 50 €». Cosa fai?",
        "options": [
          {
            "text": "Pago per non perdere l’occasione",
            "right": false,
            "why": "Rendimento garantito, urgenza e richiesta di soldi anticipati sono segnali di truffa."
          },
          {
            "text": "Pago una parte e vedo come va",
            "right": false,
            "why": "Rendimento garantito, urgenza e richiesta di soldi anticipati sono segnali di truffa."
          },
          {
            "text": "Non pago, non rispondo e lo dico a un adulto",
            "right": true
          },
          {
            "text": "Rispondo chiedendo prove",
            "right": false,
            "why": "Rendimento garantito, urgenza e richiesta di soldi anticipati sono segnali di truffa."
          }
        ],
        "explain": "Le promesse di guadagno facile hanno segnali ricorrenti: certezza o rendimento garantito, urgenza («ultimi posti»), gruppi privati, richiesta di soldi prima di vedere qualcosa, nessuna menzione di rischio, bonus o codici legati a un link."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L4)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Hai detto a casa che hai speso 3 €, ma erano 12 €. Che segnale è?",
        "options": [
          {
            "text": "Un normale errore di calcolo",
            "right": false,
            "why": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2)."
          },
          {
            "text": "Mentire su quanto si spende: perdita di controllo, il momento di parlarne",
            "right": true
          },
          {
            "text": "Un segnale di buona gestione",
            "right": false,
            "why": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2)."
          },
          {
            "text": "Nessun segnale",
            "right": false,
            "why": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2)."
          }
        ],
        "explain": "La perdita massima accettabile è la cifra che puoi perdere senza che cambi nulla nella tua vita. Per un teenager si lega al budget visto nel Piano 1: la parte di «desideri» della paghetta."
      }
    ],
    "source": "C03-L06"
  },
  "p4-l1": {
    "id": "p4-l1",
    "code": "L1",
    "floor": 4,
    "title": "Come ti convince la pubblicità",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Come ti convince la pubblicità",
        "mentor": "Collega ogni frase alla tecnica: a) «Ultimi 3 pezzi»; b) «Offerta valida ancora 10 minuti»; c) «5.000 persone l’hanno già preso»; d) «Da 120 € a 79 €».",
        "options": [
          {
            "text": "a) scarsità; b) urgenza; c) prova sociale; d) ancoraggio",
            "right": true
          },
          {
            "text": "a) urgenza; b) scarsità; c) ancoraggio; d) prova sociale",
            "right": false,
            "why": "La pubblicità non ti dice solo cosa c’è da comprare: usa meccanismi ricorrenti per farti decidere in fretta."
          },
          {
            "text": "a) prova sociale; b) ancoraggio; c) scarsità; d) urgenza",
            "right": false,
            "why": "La pubblicità non ti dice solo cosa c’è da comprare: usa meccanismi ricorrenti per farti decidere in fretta."
          },
          {
            "text": "a) ancoraggio; b) prova sociale; c) urgenza; d) scarsità",
            "right": false,
            "why": "La pubblicità non ti dice solo cosa c’è da comprare: usa meccanismi ricorrenti per farti decidere in fretta."
          }
        ],
        "theory": "La pubblicità non ti dice solo cosa c’è da comprare: usa meccanismi ricorrenti per farti decidere in fretta. Conoscerli non è diffidare di tutto, è rimettere il tempo di decidere nelle tue mani.",
        "explain": "La scarsità dice che c’è poco prodotto («ultimi 3 pezzi»). L’urgenza mette un limite di tempo («solo per 15 minuti», un conto alla rovescia)."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se molte persone stanno guardando un prodotto, vuol dire che è conveniente.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "La prova sociale può essere inventata e non misura prezzo né qualità."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "La prova sociale dice che molti altri lo fanno («2.000 persone lo stanno guardando»). L’ancoraggio mostra un prezzo alto vicino a uno basso («da 120 € a 79 €»), così il secondo sembra un affare."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Prezzo barrato 120 €, prezzo in offerta 79 €: sconto dichiarato?",
        "options": [
          {
            "text": "41%",
            "right": false,
            "why": "(120 − 79) ÷ 120 = 41 ÷ 120 ≈ 34,2%."
          },
          {
            "text": "79%",
            "right": false,
            "why": "(120 − 79) ÷ 120 = 41 ÷ 120 ≈ 34,2%."
          },
          {
            "text": "65,8%",
            "right": false,
            "why": "(120 − 79) ÷ 120 = 41 ÷ 120 ≈ 34,2%."
          },
          {
            "text": "34,2%",
            "right": true
          }
        ],
        "explain": "Nessuna di queste tecniche è di per sé illegale o disonesta: un’offerta limitata può essere vera. Il problema nasce quando scarsità, urgenza o sconto sono inventati o non verificabili.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Sneakers: prezzo barrato 100 €, offerta 70 €. Sconto dichiarato?",
            "options": [
              {
                "text": "70%",
                "right": false,
                "why": "(100 − 70) ÷ 100 = 30%."
              },
              {
                "text": "3%",
                "right": false,
                "why": "(100 − 70) ÷ 100 = 30%."
              },
              {
                "text": "30%",
                "right": true
              },
              {
                "text": "43%",
                "right": false,
                "why": "(100 − 70) ÷ 100 = 30%."
              }
            ],
            "explain": "Nessuna di queste tecniche è di per sé illegale o disonesta: un’offerta limitata può essere vera. Il problema nasce quando scarsità, urgenza o sconto sono inventati o non verificabili."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un paio di scarpe ha prezzo barrato 120 € e offerta a 79 €, ma nelle ultime settimane costava in media 85 €. Qual è lo sconto reale?",
        "options": [
          {
            "text": "7,1%",
            "right": true
          },
          {
            "text": "34,2%",
            "right": false,
            "why": "(85 − 79) ÷ 85 = 6 ÷ 85 ≈ 7,1%."
          },
          {
            "text": "6%",
            "right": false,
            "why": "(85 − 79) ÷ 85 = 6 ÷ 85 ≈ 7,1%."
          },
          {
            "text": "85%",
            "right": false,
            "why": "(85 − 79) ÷ 85 = 6 ÷ 85 ≈ 7,1%."
          }
        ],
        "explain": "Questi meccanismi funzionano proprio perché non li notiamo; l’altro errore è pensare che ogni offerta sia una truffa e non confrontare mai.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Uno zaino «da 80 € a 60 €» costava in media 66 €. Sconto reale?",
            "options": [
              {
                "text": "25%",
                "right": false,
                "why": "(66 − 60) ÷ 66 ≈ 9,1%."
              },
              {
                "text": "9,1%",
                "right": true
              },
              {
                "text": "7,5%",
                "right": false,
                "why": "(66 − 60) ÷ 66 ≈ 9,1%."
              },
              {
                "text": "20%",
                "right": false,
                "why": "(66 − 60) ÷ 66 ≈ 9,1%."
              }
            ],
            "explain": "Il problema nasce quando scarsità, urgenza o sconto sono inventati o non verificabili. Un modo semplice per difendersi è fare una pausa: aspettare 24 ore, confrontare il prezzo, chiedersi se si voleva davvero quella cosa prima di vedere l’annuncio."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un oggetto costa 99 € in un’unica soluzione oppure 12 rate da 10 €. Quanto paghi in più con le rate?",
        "options": [
          {
            "text": "20 € in più",
            "right": false,
            "why": "12 × 10 = 120; 120 − 99 = 21 €; 21 ÷ 99 ≈ 21%."
          },
          {
            "text": "10 € in più",
            "right": false,
            "why": "12 × 10 = 120; 120 − 99 = 21 €; 21 ÷ 99 ≈ 21%."
          },
          {
            "text": "120 € in più",
            "right": false,
            "why": "12 × 10 = 120; 120 − 99 = 21 €; 21 ÷ 99 ≈ 21%."
          },
          {
            "text": "21 € in più (circa 21%)",
            "right": true
          }
        ],
        "explain": "La frizione ridotta toglie ostacoli al pagamento: un solo tocco, carta già salvata, pagamento a rate.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un telefono costa 480 € o 12 rate da 42 €. Quanto in più con le rate?",
            "options": [
              {
                "text": "42 €",
                "right": false,
                "why": "42 × 12 = 504; 504 − 480 = 24 €."
              },
              {
                "text": "504 €",
                "right": false,
                "why": "42 × 12 = 504; 504 − 480 = 24 €."
              },
              {
                "text": "24 €",
                "right": true
              },
              {
                "text": "0 €",
                "right": false,
                "why": "42 × 12 = 504; 504 − 480 = 24 €."
              }
            ],
            "explain": "La frizione ridotta toglie ostacoli al pagamento: un solo tocco, carta già salvata, pagamento a rate."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un banner dice: «Solo per 15 minuti, 2.000 persone stanno guardando». Scegli:",
        "options": [
          {
            "text": "Compro subito",
            "right": false,
            "why": "A) cede alla pressione; c) sposta solo il problema."
          },
          {
            "text": "Chiedo a un amico di comprare per me",
            "right": false,
            "why": "A) cede alla pressione; c) sposta solo il problema."
          },
          {
            "text": "Condivido il banner",
            "right": false,
            "why": "A) cede alla pressione; c) sposta solo il problema."
          },
          {
            "text": "Chiudo, aspetto 24 ore e confronto il prezzo",
            "right": true
          }
        ],
        "explain": "Un modo semplice per difendersi è fare una pausa: aspettare 24 ore, confrontare il prezzo, chiedersi se si voleva davvero quella cosa prima di vedere l’annuncio."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Piano 1, L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Le scarpe da 79 € equivalgono a quante ore di lavoro a 8 € l’ora?",
        "options": [
          {
            "text": "Circa 9,9 ore",
            "right": true
          },
          {
            "text": "79 ore",
            "right": false,
            "why": "79 ÷ 8 ≈ 9,9 ore di lavoro."
          },
          {
            "text": "Circa 1 ora",
            "right": false,
            "why": "79 ÷ 8 ≈ 9,9 ore di lavoro."
          },
          {
            "text": "Circa 99 ore",
            "right": false,
            "why": "79 ÷ 8 ≈ 9,9 ore di lavoro."
          }
        ],
        "explain": "Le tecniche più comuni sono poche e si ripetono."
      }
    ],
    "source": "C04-L01"
  },
  "p4-l2": {
    "id": "p4-l2",
    "code": "L2",
    "floor": 4,
    "title": "Creator e finfluencer: chi ti sta vendendo cosa?",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Creator e finfluencer",
        "mentor": "Quali sono segnali d’allarme? a) «Rendimento garantito»; b) «Ecco tutti i rischi e le mie perdite»; c) «Ti scrivo in privato per spiegarti»; d) «Link affiliato dichiarato nella descrizione».",
        "options": [
          {
            "text": "b) e d)",
            "right": false,
            "why": "A) e c). d) è trasparente: dice che c’è un interesse, ma non lo elimina."
          },
          {
            "text": "Solo a)",
            "right": false,
            "why": "A) e c). d) è trasparente: dice che c’è un interesse, ma non lo elimina."
          },
          {
            "text": "a) e c) sono segnali d’allarme; d) è trasparente ma l’interesse resta",
            "right": true
          },
          {
            "text": "Nessuno",
            "right": false,
            "why": "A) e c). d) è trasparente: dice che c’è un interesse, ma non lo elimina."
          }
        ],
        "theory": "Chi parla di soldi online spesso guadagna da ciò che racconta: link, codici, iscrizioni, sponsor. Questo non lo rende per forza disonesto, ma devi sapere da dove arrivano i suoi guadagni prima di fidarti del suo consiglio.",
        "explain": "I segnali d’allarme più frequenti sono cinque: promesse certe («garantito», «nessun rischio»); urgenza («ultimi posti»); gruppi privati dove ti scrive qualcuno («messaggio in privato»); richiesta di soldi o dati prima di mostrare qualcosa; risultati senza perdite e senza spiegare il rischio."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se un creator mostra i propri guadagni, non può avere un conflitto d’interesse.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "I guadagni possono essere selezionati e la sua commissione dipende da ciò che fai tu."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Questo è un conflitto d’interesse: il suo vantaggio può non coincidere con il tuo. La paura di perdere l’occasione (FOMO): «se non entri ora, resti fuori»."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "200 iscritti con 10 € di commissione ciascuno: quanto guadagna il creator?",
        "options": [
          {
            "text": "200 €",
            "right": false,
            "why": "200 × 10 = 2.000 €."
          },
          {
            "text": "10 €",
            "right": false,
            "why": "200 × 10 = 2.000 €."
          },
          {
            "text": "2.000 €",
            "right": true
          },
          {
            "text": "210 €",
            "right": false,
            "why": "200 × 10 = 2.000 €."
          }
        ],
        "explain": "Un finfluencer è un creator che parla di finanza e investimenti. Il suo guadagno può venire da sponsorizzazioni, da link affiliati (riceve una somma se ti iscrivi o apri un conto), da corsi o gruppi a pagamento.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un creator dice «iscriviti con il mio codice: guadagno una commissione». È trasparente?",
            "options": [
              {
                "text": "Sì, dichiara l’interesse, che però resta",
                "right": true
              },
              {
                "text": "No: non ha detto nulla",
                "right": false,
                "why": "Dichiarare è giusto ma non elimina il conflitto."
              },
              {
                "text": "Sì, quindi il consiglio è neutrale",
                "right": false,
                "why": "Dichiarare è giusto ma non elimina il conflitto."
              },
              {
                "text": "No: è una truffa",
                "right": false,
                "why": "Dichiarare è giusto ma non elimina il conflitto."
              }
            ],
            "explain": "Questo è un conflitto d’interesse: il suo vantaggio può non coincidere con il tuo. La paura di perdere l’occasione (FOMO): «se non entri ora, resti fuori»."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Su 10 operazioni, 3 vinte da +40 € e 7 perse da −30 €: saldo?",
        "options": [
          {
            "text": "+120 €",
            "right": false,
            "why": "3 × 40 = 120; 7 × 30 = 210; 120 − 210 = −90 €."
          },
          {
            "text": "+90 €",
            "right": false,
            "why": "3 × 40 = 120; 7 × 30 = 210; 120 − 210 = −90 €."
          },
          {
            "text": "−210 €",
            "right": false,
            "why": "3 × 40 = 120; 7 × 30 = 210; 120 − 210 = −90 €."
          },
          {
            "text": "−90 €",
            "right": true
          }
        ],
        "explain": "La selezione dei casi migliori (in inglese cherry-picking): si mostrano le operazioni vinte e si nascondono quelle perse, e si vedono solo i creator che hanno avuto fortuna, non quelli che hanno perso e sono spariti.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Su 5 operazioni: 2 vinte da +30 € e 3 perse da −20 €. Saldo?",
            "options": [
              {
                "text": "0 €",
                "right": true
              },
              {
                "text": "+60 €",
                "right": false,
                "why": "60 − 60 = 0 €."
              },
              {
                "text": "−60 €",
                "right": false,
                "why": "60 − 60 = 0 €."
              },
              {
                "text": "+120 €",
                "right": false,
                "why": "60 − 60 = 0 €."
              }
            ],
            "explain": "La selezione dei casi migliori (in inglese cherry-picking): si mostrano le operazioni vinte e si nascondono quelle perse, e si vedono solo i creator che hanno avuto fortuna, non quelli che hanno perso e sono spariti."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Se il creator mostra solo le 3 operazioni vinte, che cifra vede lo spettatore e qual è la differenza dal saldo vero?",
        "options": [
          {
            "text": "Vede +120 €, mentre il saldo vero è −90 €: 210 € non mostrati",
            "right": true
          },
          {
            "text": "Vede −90 €, uguale al vero",
            "right": false,
            "why": "+120 − (−90) = 210 €."
          },
          {
            "text": "Vede +90 €, differenza 0",
            "right": false,
            "why": "+120 − (−90) = 210 €."
          },
          {
            "text": "Vede +120 €, differenza 120 €",
            "right": false,
            "why": "+120 − (−90) = 210 €."
          }
        ],
        "explain": "Pensare «se mostra i risultati, è bravo». Mostrare i guadagni non prova nulla: servono tutti i risultati, i costi, il periodo, e come guadagna chi parla.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un finfluencer prende 8 € per ogni abbonato. 150 abbonati: quanto guadagna?",
            "options": [
              {
                "text": "1.200 €",
                "right": true
              },
              {
                "text": "8 €",
                "right": false,
                "why": "150 × 8 = 1.200 €."
              },
              {
                "text": "150 €",
                "right": false,
                "why": "150 × 8 = 1.200 €."
              },
              {
                "text": "158 €",
                "right": false,
                "why": "150 × 8 = 1.200 €."
              }
            ],
            "explain": "Pensare «se mostra i risultati, è bravo». Mostrare i guadagni non prova nulla: servono tutti i risultati, i costi, il periodo, e come guadagna chi parla."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un creator promette «metodo sicuro» in un gruppo privato a 29 € al mese. Cosa fai?",
        "options": [
          {
            "text": "Pago un mese per provare",
            "right": false,
            "why": "Un metodo «sicuro» non esiste: ogni investimento ha un rischio."
          },
          {
            "text": "Lo segno e ci penserò più avanti",
            "right": false,
            "why": "Un metodo «sicuro» non esiste: ogni investimento ha un rischio."
          },
          {
            "text": "Controllo come guadagna, se i risultati sono completi e verificabili, se è autorizzato, e ne parlo con un adulto",
            "right": true
          },
          {
            "text": "Invito amici per avere uno sconto",
            "right": false,
            "why": "Un metodo «sicuro» non esiste: ogni investimento ha un rischio."
          }
        ],
        "explain": "I rendimenti passati presentati come futuri: «ho fatto +40%, lo rifai anche tu»."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un video dice «ultimi posti, iscriviti oggi». Quale tecnica è?",
        "options": [
          {
            "text": "Prova sociale",
            "right": false,
            "why": "Chi parla di soldi online spesso guadagna da ciò che racconta: link, codici, iscrizioni, sponsor."
          },
          {
            "text": "Ancoraggio",
            "right": false,
            "why": "Chi parla di soldi online spesso guadagna da ciò che racconta: link, codici, iscrizioni, sponsor."
          },
          {
            "text": "Scarsità (e urgenza): il tempo per decidere è il bersaglio",
            "right": true
          },
          {
            "text": "Nessuna tecnica",
            "right": false,
            "why": "Chi parla di soldi online spesso guadagna da ciò che racconta: link, codici, iscrizioni, sponsor."
          }
        ],
        "explain": "I segnali d’allarme più frequenti sono cinque: promesse certe («garantito», «nessun rischio»); urgenza («ultimi posti»); gruppi privati dove ti scrive qualcuno («messaggio in privato»); richiesta di soldi o dati prima di mostrare qualcosa; risultati senza perdite e senza spiegare il rischio."
      }
    ],
    "source": "C04-L02"
  },
  "p4-l3": {
    "id": "p4-l3",
    "code": "L3",
    "floor": 4,
    "title": "Truffe: pump and dump, schemi Ponzi e rendimenti garantiti",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Truffe",
        "mentor": "Collega: a) paga i vecchi investitori con i soldi dei nuovi; b) un gruppo spinge un titolo poco scambiato per rivenderlo a prezzo alto; c) «5% a settimana garantito».",
        "options": [
          {
            "text": "a) pump and dump; b) schema Ponzi; c) rendimento garantito alto",
            "right": false,
            "why": "A) schema Ponzi; b) pump and dump; c) rendimento garantito alto (segnale di truffa)."
          },
          {
            "text": "a) schema Ponzi; b) pump and dump; c) rendimento garantito alto",
            "right": true
          },
          {
            "text": "a) rendimento garantito alto; b) schema Ponzi; c) pump and dump",
            "right": false,
            "why": "A) schema Ponzi; b) pump and dump; c) rendimento garantito alto (segnale di truffa)."
          },
          {
            "text": "a) pump and dump; b) rendimento garantito; c) schema Ponzi",
            "right": false,
            "why": "A) schema Ponzi; b) pump and dump; c) rendimento garantito alto (segnale di truffa)."
          }
        ],
        "theory": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna. Le truffe finanziarie hanno poche forme ricorrenti, e conoscerle è la difesa più efficace.",
        "explain": "Nello schema Ponzi i rendimenti pagati ai primi investitori vengono presi dai soldi versati dai nuovi. Finché entrano nuovi soldi lo schema regge; quando rallenta, crolla e gli ultimi perdono tutto."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Se mi hanno pagato i primi tre mesi, non può essere una truffa.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Lo schema Ponzi paga i primi con i soldi dei nuovi."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Può pagare davvero per mesi: per questo il pagamento dei primi non è una prova. Un rendimento garantito alto è un segnale a sé."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € al 10% al mese per 12 mesi (interesse composto): quanto diventano?",
        "options": [
          {
            "text": "2.200 €",
            "right": false,
            "why": "1.000 × 1,1¹² ≈ 3.138,43 €."
          },
          {
            "text": "1.120 €",
            "right": false,
            "why": "1.000 × 1,1¹² ≈ 3.138,43 €."
          },
          {
            "text": "Circa 3.138,43 € (+213,8%)",
            "right": true
          },
          {
            "text": "12.000 €",
            "right": false,
            "why": "1.000 × 1,1¹² ≈ 3.138,43 €."
          }
        ],
        "explain": "Un 10% al mese sembra poco, ma composto in 12 mesi diventa 1,1 elevato alla 12, cioè circa 3,14 volte il capitale: +213,8% in un anno.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un gruppo ti scrive «compra subito, +300% domani». Cosa è?",
            "options": [
              {
                "text": "Segnale di truffa (pump and dump)",
                "right": true
              },
              {
                "text": "Un consiglio utile",
                "right": false,
                "why": "Promesse di aumenti certi e fretta sono segnali tipici."
              },
              {
                "text": "Una notizia ufficiale",
                "right": false,
                "why": "Promesse di aumenti certi e fretta sono segnali tipici."
              },
              {
                "text": "Un diritto del consumatore",
                "right": false,
                "why": "Promesse di aumenti certi e fretta sono segnali tipici."
              }
            ],
            "explain": "Nel pump and dump (letteralmente «gonfia e scarica») un gruppo spinge via chat o social l’acquisto di un titolo di una società piccola e poco scambiata."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai comprato a 0,30 € e il titolo torna a 0,10 €: perdita in percentuale e su 300 € investiti?",
        "options": [
          {
            "text": "−33,3%; restano 200 € e perdi 100 €",
            "right": false,
            "why": "0,10 ÷ 0,30 = 1/3 → −66,7%; 300 × 1/3 = 100 €."
          },
          {
            "text": "−20%; restano 240 €",
            "right": false,
            "why": "0,10 ÷ 0,30 = 1/3 → −66,7%; 300 × 1/3 = 100 €."
          },
          {
            "text": "−100%; restano 0 €",
            "right": false,
            "why": "0,10 ÷ 0,30 = 1/3 → −66,7%; 300 × 1/3 = 100 €."
          },
          {
            "text": "−66,7%; restano 100 € e perdi 200 €",
            "right": true
          }
        ],
        "explain": "Il prezzo ricade e chi è entrato tardi perde. Le società piccole e poco scambiate (poca liquidità) sono più facili da muovere e più difficili da rivendere.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "100 € al 10% al mese per 6 mesi (composto): circa?",
            "options": [
              {
                "text": "160 €",
                "right": false,
                "why": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna."
              },
              {
                "text": "110 €",
                "right": false,
                "why": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna."
              },
              {
                "text": "600 €",
                "right": false,
                "why": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna."
              },
              {
                "text": "177,16 €",
                "right": true
              }
            ],
            "explain": "Un 10% al mese sembra poco, ma composto in 12 mesi diventa 1,1 elevato alla 12, cioè circa 3,14 volte il capitale: +213,8% in un anno."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "10 investitori versano 1.000 € ciascuno: 10.000 €. Si promette il 10% al mese a ciascuno. Quanti mesi si possono pagare senza nuovi investitori?",
        "options": [
          {
            "text": "100 mesi",
            "right": false,
            "why": "1.000 € al mese su 10.000 € = 10 mesi."
          },
          {
            "text": "12 mesi",
            "right": false,
            "why": "1.000 € al mese su 10.000 € = 10 mesi."
          },
          {
            "text": "10 mesi: poi finiscono tutti i soldi e non resta nulla investito",
            "right": true
          },
          {
            "text": "Sempre, se arrivano nuovi investitori",
            "right": false,
            "why": "1.000 € al mese su 10.000 € = 10 mesi."
          }
        ],
        "explain": "Nessuna attività seria promette garantito un rendimento così. Pensare «ho visto che i primi sono stati pagati, quindi funziona», oppure «entro in fretta, esco prima degli altri»: nel pump and dump gli ultimi a vendere sono quasi sempre quelli che si fidano.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Compri a 0,50 € e il titolo scende a 0,20 €. Perdita percentuale?",
            "options": [
              {
                "text": "−30%",
                "right": false,
                "why": "(0,50 − 0,20) ÷ 0,50 = 60%."
              },
              {
                "text": "−40%",
                "right": false,
                "why": "(0,50 − 0,20) ÷ 0,50 = 60%."
              },
              {
                "text": "−60%",
                "right": true
              },
              {
                "text": "−20%",
                "right": false,
                "why": "(0,50 − 0,20) ÷ 0,50 = 60%."
              }
            ],
            "explain": "Nel pump and dump (letteralmente «gonfia e scarica») un gruppo spinge via chat o social l’acquisto di un titolo di una società piccola e poco scambiata."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un messaggio in una chat dice: «Il titolo X salirà del 300% domani, compra con noi». Cosa fai?",
        "options": [
          {
            "text": "Compro una piccola somma",
            "right": false,
            "why": "Aumenti certi e fretta sono segnali tipici di truffa."
          },
          {
            "text": "Lo giro ai miei amici",
            "right": false,
            "why": "Aumenti certi e fretta sono segnali tipici di truffa."
          },
          {
            "text": "Compro tutto subito",
            "right": false,
            "why": "Aumenti certi e fretta sono segnali tipici di truffa."
          },
          {
            "text": "Non compro, non inoltro il messaggio, ne parlo con un adulto e posso segnalarlo",
            "right": true
          }
        ],
        "explain": "Nel pump and dump (letteralmente «gonfia e scarica») un gruppo spinge via chat o social l’acquisto di un titolo di una società piccola e poco scambiata."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un creator dichiara il link affiliato. Il suo consiglio diventa neutrale?",
        "options": [
          {
            "text": "Sì: dichiararlo rende il consiglio neutrale",
            "right": false,
            "why": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna."
          },
          {
            "text": "Sì, se è scritto in grande",
            "right": false,
            "why": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna."
          },
          {
            "text": "No: dichiararlo è trasparente, ma l’interesse resta",
            "right": true
          },
          {
            "text": "Sì, se viene ripetuto",
            "right": false,
            "why": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna."
          }
        ],
        "explain": "Chi organizza ha comprato prima, a poco; quando il prezzo sale per effetto degli acquisti di chi si fida, vende."
      }
    ],
    "source": "C04-L03"
  },
  "p4-l4": {
    "id": "p4-l4",
    "code": "L4",
    "floor": 4,
    "title": "Promesse commerciali e prodotti complessi",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Promesse commerciali e prodotti complessi",
        "mentor": "Collega: a) «rendimento fino al 6%»; b) «capitale garantito a scadenza»; c) «zero commissioni».",
        "options": [
          {
            "text": "a) rendimento certo; b) garanzia assoluta; c) nessun costo",
            "right": false,
            "why": "A) massimo possibile, non garantito; b) garanzia che dipende da chi la dà e dalla scadenza; c) i costi possono essere altrove, per esempio nel prezzo."
          },
          {
            "text": "a) massimo possibile, non garantito; b) garanzia che dipende da chi la dà e dalla scadenza; c) i costi possono essere altrove",
            "right": true
          },
          {
            "text": "a) garanzia a scadenza; b) massimo possibile; c) costi uguali a zero",
            "right": false,
            "why": "A) massimo possibile, non garantito; b) garanzia che dipende da chi la dà e dalla scadenza; c) i costi possono essere altrove, per esempio nel prezzo."
          },
          {
            "text": "a) nessun rischio; b) rischio altissimo; c) costi ridotti a zero",
            "right": false,
            "why": "A) massimo possibile, non garantito; b) garanzia che dipende da chi la dà e dalla scadenza; c) i costi possono essere altrove, per esempio nel prezzo."
          }
        ],
        "theory": "Una promessa commerciale è una frase scelta per vendere: dice poco di costi e rischi. Per decidere servono i numeri che la frase non riporta.",
        "explain": "«Zero commissioni» non vuol dire zero costi: i costi possono essere nascosti nel prezzo o in altre voci."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Un indicatore di rischio 2 su 7 significa che non si può perdere nulla.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Rischio basso non è assenza di rischio."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Un indicatore di rischio basso non significa assenza di rischio. Il KID non sostituisce il confronto con alternative semplici, ma è il primo documento da chiedere."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € per 10 anni al 4% lordo oppure al 2% netto dei costi: differenza?",
        "options": [
          {
            "text": "261,25 € (1.480,24 − 1.218,99)",
            "right": true
          },
          {
            "text": "480,24 €",
            "right": false,
            "why": "1,04¹⁰ ≈ 1,4802; 1,02¹⁰ ≈ 1,2190; differenza 261,25 €."
          },
          {
            "text": "20 €",
            "right": false,
            "why": "1,04¹⁰ ≈ 1,4802; 1,02¹⁰ ≈ 1,2190; differenza 261,25 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "1,04¹⁰ ≈ 1,4802; 1,02¹⁰ ≈ 1,2190; differenza 261,25 €."
          }
        ],
        "explain": "Tre domande da fare sempre: quanto costa in totale?",
        "variants": [
          {
            "type": "scelta",
            "mentor": "«Capitale garantito» significa che non puoi mai perdere?",
            "options": [
              {
                "text": "No: dipende da chi dà la garanzia e dalla scadenza",
                "right": true
              },
              {
                "text": "Sì, sempre",
                "right": false,
                "why": "La garanzia ha condizioni."
              },
              {
                "text": "Sì, per i minorenni",
                "right": false,
                "why": "La garanzia ha condizioni."
              },
              {
                "text": "Sì, se è scritto in grande",
                "right": false,
                "why": "La garanzia ha condizioni."
              }
            ],
            "explain": "«Capitale garantito a scadenza» dipende dalla solidità di chi lo garantisce e dall’aspettare la scadenza. «Zero commissioni» non vuol dire zero costi: i costi possono essere nascosti nel prezzo o in altre voci."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai investito 500 € in un prodotto «fino al 6%» e il rendimento effettivo è 1% in un anno: quanto guadagni rispetto al massimo?",
        "options": [
          {
            "text": "30 € contro 5 €",
            "right": false,
            "why": "1% di 500 = 5; 6% di 500 = 30."
          },
          {
            "text": "25 € contro 30 €",
            "right": false,
            "why": "1% di 500 = 5; 6% di 500 = 30."
          },
          {
            "text": "5 € contro 30 € possibili",
            "right": true
          },
          {
            "text": "1 € contro 6 €",
            "right": false,
            "why": "1% di 500 = 5; 6% di 500 = 30."
          }
        ],
        "explain": "«Fino al 6%» indica un massimo, non quanto otterrai. «Capitale garantito a scadenza» dipende dalla solidità di chi lo garantisce e dall’aspettare la scadenza.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Versi 800 € e 100 € vanno in costi iniziali: di quanto deve crescere il capitale rimasto per tornare a 800 €?",
            "options": [
              {
                "text": "+12,5%",
                "right": false,
                "why": "800 ÷ 700 ≈ 1,143."
              },
              {
                "text": "+10%",
                "right": false,
                "why": "800 ÷ 700 ≈ 1,143."
              },
              {
                "text": "+100 €",
                "right": false,
                "why": "800 ÷ 700 ≈ 1,143."
              },
              {
                "text": "Circa +14,3%",
                "right": true
              }
            ],
            "explain": "Tre domande da fare sempre: quanto costa in totale?"
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Versi 1.000 € e 150 € vanno in costi iniziali: di quanto deve crescere il capitale rimasto per tornare a 1.000 €?",
        "options": [
          {
            "text": "+15%",
            "right": false,
            "why": "1.000 ÷ 850 ≈ 1,176."
          },
          {
            "text": "+17,6% (850 → 1.000)",
            "right": true
          },
          {
            "text": "+150 €",
            "right": false,
            "why": "1.000 ÷ 850 ≈ 1,176."
          },
          {
            "text": "+10%",
            "right": false,
            "why": "1.000 ÷ 850 ≈ 1,176."
          }
        ],
        "explain": "Fermarsi al titolo: «capitale protetto», «zero commissioni», «fino a».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "2.000 € per 10 anni al 3% oppure al 1,5%: quale differenza circa?",
            "options": [
              {
                "text": "60 €",
                "right": false,
                "why": "2.000 × (1,03¹⁰ − 1,015¹⁰) ≈ 2.688 − 2.321 = 367 €."
              },
              {
                "text": "300 €",
                "right": false,
                "why": "2.000 × (1,03¹⁰ − 1,015¹⁰) ≈ 2.688 − 2.321 = 367 €."
              },
              {
                "text": "Circa 531 €",
                "right": true
              },
              {
                "text": "1.000 €",
                "right": false,
                "why": "2.000 × (1,03¹⁰ − 1,015¹⁰) ≈ 2.688 − 2.321 = 367 €."
              }
            ],
            "explain": "Le frasi più usate hanno un significato diverso da quello che sembra. «Fino al 6%» indica un massimo, non quanto otterrai."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un consulente propone un prodotto «sicuro» con costi iniziali del 15%. Cosa fai?",
        "options": [
          {
            "text": "Chiedo il KID, i costi totali, le penali di uscita e come guadagna lui",
            "right": true
          },
          {
            "text": "Firmo",
            "right": false,
            "why": "Senza costi e rischi non si può giudicare; un minorenne non firma da solo (da verificare)."
          },
          {
            "text": "Ne parlo con un’amica che ne ha uno",
            "right": false,
            "why": "Senza costi e rischi non si può giudicare; un minorenne non firma da solo (da verificare)."
          },
          {
            "text": "Firmo solo se sicuro",
            "right": false,
            "why": "Senza costi e rischi non si può giudicare; un minorenne non firma da solo (da verificare)."
          }
        ],
        "explain": "I prodotti complessi (certe polizze con parte di investimento, certi prodotti strutturati) sono più difficili da capire e possono avere costi doppi o penali di uscita."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "«Rendimento garantito alto» e «capitale protetto» sono la stessa cosa?",
        "options": [
          {
            "text": "Sì: sono sinonimi",
            "right": false,
            "why": "No: il primo è un segnale di truffa se alto e certo; il secondo, in un prodotto regolare, ha limiti e costi."
          },
          {
            "text": "Sì, ma solo per prodotti di Stato",
            "right": false,
            "why": "No: il primo è un segnale di truffa se alto e certo; il secondo, in un prodotto regolare, ha limiti e costi."
          },
          {
            "text": "No: il primo è un segnale di truffa se alto e certo; il secondo ha limiti e costi",
            "right": true
          },
          {
            "text": "No: sono entrambi sicuri",
            "right": false,
            "why": "No: il primo è un segnale di truffa se alto e certo; il secondo, in un prodotto regolare, ha limiti e costi."
          }
        ],
        "explain": "Il mis-selling è la vendita di un prodotto non adatto a chi lo compra, spesso perché il venditore guadagna di più con quello."
      }
    ],
    "source": "C04-L04"
  },
  "p4-l5": {
    "id": "p4-l5",
    "code": "L5",
    "floor": 4,
    "title": "Bonus, gratis, prova e cashback: il prezzo nascosto",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "Bonus, gratis, prova e cashback",
        "mentor": "Quali cose vanno lette prima di accettare un bonus? a) quanto devo spendere; b) per quanto tempo; c) il colore del pulsante; d) come si disdice.",
        "options": [
          {
            "text": "a), b) e d)",
            "right": true
          },
          {
            "text": "Solo c)",
            "right": false,
            "why": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo."
          },
          {
            "text": "a) e c)",
            "right": false,
            "why": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo."
          },
          {
            "text": "b) e c)",
            "right": false,
            "why": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo."
          }
        ],
        "theory": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo. Il «gratis» è quasi sempre un inizio: la spesa arriva dopo, quando l’attenzione è calata.",
        "explain": "Il bonus di benvenuto è di solito condizionato: devi spendere, depositare o restare iscritto per un certo tempo."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Con la prova gratuita non pago niente neanche se dimentico di disdire.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "Dopo la prova parte l’addebito."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "La prova gratuita con rinnovo automatico dà accesso per qualche giorno e poi addebita il prezzo pieno, ogni mese, finché non si disdice."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "9 € al mese dimenticati per 5 mesi: quanto spendi? E in un anno?",
        "options": [
          {
            "text": "9 € e 12 €",
            "right": false,
            "why": "9 × 5 = 45; 9 × 12 = 108."
          },
          {
            "text": "45 € e 45 €",
            "right": false,
            "why": "9 × 5 = 45; 9 × 12 = 108."
          },
          {
            "text": "45 € in 5 mesi; 108 € in un anno",
            "right": true
          },
          {
            "text": "60 € e 108 €",
            "right": false,
            "why": "9 × 5 = 45; 9 × 12 = 108."
          }
        ],
        "explain": "Il costo non parte il giorno dell’iscrizione ma una settimana, due o un mese dopo, quando probabilmente ci si è dimenticati.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Prova gratis, poi 5 € al mese dimenticati per 4 mesi: quanto?",
            "options": [
              {
                "text": "20 €",
                "right": true
              },
              {
                "text": "5 €",
                "right": false,
                "why": "5 × 4 = 20 €."
              },
              {
                "text": "40 €",
                "right": false,
                "why": "5 × 4 = 20 €."
              },
              {
                "text": "0 €",
                "right": false,
                "why": "5 × 4 = 20 €."
              }
            ],
            "explain": "Il costo non parte il giorno dell’iscrizione ma una settimana, due o un mese dopo, quando probabilmente ci si è dimenticati."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una carta ha un canone di 2 € al mese e un cashback dell'1% su 150 € di spesa mensile. Saldo annuo?",
        "options": [
          {
            "text": "+6 €",
            "right": false,
            "why": "1,50 × 12 = 18; 2 × 12 = 24; 18 − 24 = −6 €."
          },
          {
            "text": "−6 € (cashback 18 € contro canone 24 €)",
            "right": true
          },
          {
            "text": "+18 €",
            "right": false,
            "why": "1,50 × 12 = 18; 2 × 12 = 24; 18 − 24 = −6 €."
          },
          {
            "text": "−24 €",
            "right": false,
            "why": "1,50 × 12 = 18; 2 × 12 = 24; 18 − 24 = −6 €."
          }
        ],
        "explain": "Per confrontare due offerte con costi diversi si calcola il costo totale sul periodo in cui userai davvero il servizio, e il punto di pareggio, cioè il numero di mesi dopo i quali un’offerta costa meno dell’altra.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Offerta A: 8 € al mese. B: 6 € al mese più 12 € di attivazione. Dopo quanti mesi conviene B?",
            "options": [
              {
                "text": "Subito",
                "right": false,
                "why": "6n + 12 = 8n → n = 6: da 7 mesi in poi B costa meno."
              },
              {
                "text": "Da 7 mesi in poi",
                "right": true
              },
              {
                "text": "Da 2 mesi",
                "right": false,
                "why": "6n + 12 = 8n → n = 6: da 7 mesi in poi B costa meno."
              },
              {
                "text": "Mai",
                "right": false,
                "why": "6n + 12 = 8n → n = 6: da 7 mesi in poi B costa meno."
              }
            ],
            "explain": "Per confrontare due offerte con costi diversi si calcola il costo totale sul periodo in cui userai davvero il servizio, e il punto di pareggio, cioè il numero di mesi dopo i quali un’offerta costa meno dell’altra."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Offerta A: 7 € al mese. Offerta B: 5 € al mese più 15 € di attivazione. Dopo quanti mesi B costa meno?",
        "options": [
          {
            "text": "Da 3 mesi conviene B",
            "right": false,
            "why": "5n + 15 = 7n → n = 7,5."
          },
          {
            "text": "Da 8 mesi in poi conviene B: in 12 mesi A costa 84 € e B 75 €",
            "right": true
          },
          {
            "text": "Sempre conviene A",
            "right": false,
            "why": "5n + 15 = 7n → n = 7,5."
          },
          {
            "text": "Da 12 mesi in poi conviene B",
            "right": false,
            "why": "5n + 15 = 7n → n = 7,5."
          }
        ],
        "explain": "Conviene solo se non ti spinge a spendere di più e se i costi che comporta (per esempio un canone) sono più bassi di quanto ricevi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Canone carta 3 € al mese, cashback 1% su 200 € al mese. Saldo annuo?",
            "options": [
              {
                "text": "+12 €",
                "right": false,
                "why": "24 − 36 = −12 €."
              },
              {
                "text": "−12 €",
                "right": true
              },
              {
                "text": "−24 €",
                "right": false,
                "why": "24 − 36 = −12 €."
              },
              {
                "text": "0 €",
                "right": false,
                "why": "24 − 36 = −12 €."
              }
            ],
            "explain": "Il cashback restituisce una piccola percentuale di quanto spendi. Qualcuno lo paga: spesso una quota del prezzo o delle commissioni del negozio."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "«3 mesi gratis, poi 12 € al mese» per un servizio che userai per 2 mesi. Scegli:",
        "options": [
          {
            "text": "Mi iscrivo e non metto promemoria",
            "right": false,
            "why": "B) rischia 12 € al mese; c) è sempre valida se non ti serve davvero."
          },
          {
            "text": "è sensato se segno subito il promemoria e verifico come si disdice",
            "right": true
          },
          {
            "text": "È sempre sbagliato non iscriversi",
            "right": false,
            "why": "B) rischia 12 € al mese; c) è sempre valida se non ti serve davvero."
          },
          {
            "text": "Mi iscrivo con un secondo account",
            "right": false,
            "why": "B) rischia 12 € al mese; c) è sempre valida se non ti serve davvero."
          }
        ],
        "explain": "Pensare «la prova è gratis, quindi non rischio». L’altro errore è confrontare i prezzi mensili senza contare costi di attivazione o durata minima."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L4)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "«Zero commissioni» significa zero costi?",
        "options": [
          {
            "text": "Sì: zero commissioni vuol dire zero costi",
            "right": false,
            "why": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo."
          },
          {
            "text": "Sì, per i minorenni",
            "right": false,
            "why": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo."
          },
          {
            "text": "No: significa che costa il doppio",
            "right": false,
            "why": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo."
          },
          {
            "text": "No: i costi possono stare in altre voci, nel prezzo o nel canone",
            "right": true
          }
        ],
        "explain": "Qualcuno lo paga: spesso una quota del prezzo o delle commissioni del negozio."
      }
    ],
    "source": "C04-L05"
  },
  "p4-l6": {
    "id": "p4-l6",
    "code": "L6",
    "floor": 4,
    "title": "I tuoi diritti di consumatore e i tuoi dati",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire (classifica)",
        "moment": "capire",
        "idea": "I tuoi diritti di consumatore e i tuoi dati",
        "mentor": "Collega: a) restituire un acquisto online senza motivo entro 14 giorni; b) un difetto che compare dopo 8 mesi; c) chiedere a un’app di cancellare i dati; d) un’offerta pubblicitaria ingannevole.",
        "options": [
          {
            "text": "a) garanzia legale; b) recesso; c) segnalazione; d) cancellazione dei dati",
            "right": false,
            "why": "A) recesso; b) garanzia legale; c) diritto alla cancellazione dei dati; d) segnalazione all’autorità competente (AGCM, da verificare)."
          },
          {
            "text": "a) cancellazione; b) recesso; c) garanzia legale; d) segnalazione",
            "right": false,
            "why": "A) recesso; b) garanzia legale; c) diritto alla cancellazione dei dati; d) segnalazione all’autorità competente (AGCM, da verificare)."
          },
          {
            "text": "Sono tutti lo stesso diritto",
            "right": false,
            "why": "A) recesso; b) garanzia legale; c) diritto alla cancellazione dei dati; d) segnalazione all’autorità competente (AGCM, da verificare)."
          },
          {
            "text": "a) recesso; b) garanzia legale; c) diritto alla cancellazione; d) segnalazione all’autorità",
            "right": true
          }
        ],
        "theory": "Chi compra ha dei diritti per legge, anche se non li legge nessuno. Conoscerli trasforma «ho sbagliato io» in «posso chiedere indietro i soldi».",
        "explain": "Il diritto di recesso permette, per gli acquisti fatti online, per telefono o fuori da un negozio, di restituire il prodotto o annullare il servizio entro 14 giorni, senza dover dare un motivo."
      },
      {
        "n": 2,
        "type": "vf",
        "label": "Capire (vero/falso)",
        "moment": "capire",
        "idea": null,
        "mentor": "Il diritto di recesso vale sempre anche per gli acquisti in negozio.",
        "options": [
          {
            "text": "Vero",
            "right": false,
            "why": "È previsto per vendite a distanza o fuori dai locali; in negozio dipende dal negozio (da verificare)."
          },
          {
            "text": "Falso",
            "right": true
          }
        ],
        "explain": "Hai diritto di sapere quali dati ha, correggerli, chiedere di cancellarli e di opporti all’uso per pubblicità."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cuffie ricevute il 10 novembre: ultimo giorno utile per il recesso di 14 giorni?",
        "options": [
          {
            "text": "10 dicembre",
            "right": false,
            "why": "10 + 14 = 24 novembre."
          },
          {
            "text": "20 novembre",
            "right": false,
            "why": "10 + 14 = 24 novembre."
          },
          {
            "text": "14 novembre",
            "right": false,
            "why": "10 + 14 = 24 novembre."
          },
          {
            "text": "24 novembre (da verificare il conteggio)",
            "right": true
          }
        ],
        "explain": "Aspettare troppo (i termini passano) o non conservare le prove (ricevute, email, screenshot). L’altro errore è accettare tutte le richieste di dati senza leggerle.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Compri online il 3 marzo. Ultimo giorno per il recesso di 14 giorni?",
            "options": [
              {
                "text": "14 marzo",
                "right": false,
                "why": "3 + 14 = 17 marzo (da verificare)."
              },
              {
                "text": "17 marzo",
                "right": true
              },
              {
                "text": "3 aprile",
                "right": false,
                "why": "3 + 14 = 17 marzo (da verificare)."
              },
              {
                "text": "10 marzo",
                "right": false,
                "why": "3 + 14 = 17 marzo (da verificare)."
              }
            ],
            "explain": "Il diritto di recesso permette, per gli acquisti fatti online, per telefono o fuori da un negozio, di restituire il prodotto o annullare il servizio entro 14 giorni, senza dover dare un motivo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un difetto compare dopo 8 mesi con garanzia di 24 mesi: quanti mesi di garanzia restano?",
        "options": [
          {
            "text": "16 mesi",
            "right": true
          },
          {
            "text": "8 mesi",
            "right": false,
            "why": "24 − 8 = 16 mesi."
          },
          {
            "text": "24 mesi",
            "right": false,
            "why": "24 − 8 = 16 mesi."
          },
          {
            "text": "32 mesi",
            "right": false,
            "why": "24 − 8 = 16 mesi."
          }
        ],
        "explain": "La garanzia legale di conformità dura almeno 2 anni dalla consegna e copre i difetti che c’erano già alla consegna.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Garanzia di 24 mesi: il difetto compare dopo 10 mesi. Mesi residui?",
            "options": [
              {
                "text": "10",
                "right": false,
                "why": "24 − 10 = 14 mesi."
              },
              {
                "text": "14",
                "right": true
              },
              {
                "text": "24",
                "right": false,
                "why": "24 − 10 = 14 mesi."
              },
              {
                "text": "34",
                "right": false,
                "why": "24 − 10 = 14 mesi."
              }
            ],
            "explain": "La garanzia legale di conformità dura almeno 2 anni dalla consegna e copre i difetti che c’erano già alla consegna."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "9 € al mese addebitati per 3 mesi dopo una disdetta valida: quanto chiedi indietro?",
        "options": [
          {
            "text": "9 €",
            "right": false,
            "why": "9 × 3 = 27 €."
          },
          {
            "text": "27 €",
            "right": true
          },
          {
            "text": "3 €",
            "right": false,
            "why": "9 × 3 = 27 €."
          },
          {
            "text": "36 €",
            "right": false,
            "why": "9 × 3 = 27 €."
          }
        ],
        "explain": "In genere si chiede prima la riparazione o la sostituzione; se non sono possibili si può chiedere una riduzione del prezzo o il rimborso.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un’app chiede accesso a foto e contatti per un semplice gioco. Cosa fai?",
            "options": [
              {
                "text": "Accetto tutto",
                "right": false,
                "why": "Meno dati, meno rischi."
              },
              {
                "text": "Nego ciò che non serve e leggo l’informativa",
                "right": true
              },
              {
                "text": "Cambio telefono",
                "right": false,
                "why": "Meno dati, meno rischi."
              },
              {
                "text": "Disinstallo il sistema",
                "right": false,
                "why": "Meno dati, meno rischi."
              }
            ],
            "explain": "Un’app o un gioco devono chiedere solo i dati che servono: se ti chiedono contatti e posizione per un gioco semplice, vale la pena rifiutare."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un gioco semplice chiede l’accesso ai contatti, al microfono e alla posizione. Cosa fai?",
        "options": [
          {
            "text": "Accetto tutto",
            "right": false,
            "why": "Meno dati condivisi, meno rischi."
          },
          {
            "text": "Smetto di usare il telefono",
            "right": false,
            "why": "Meno dati condivisi, meno rischi."
          },
          {
            "text": "Nego ciò che non serve, leggo l’informativa e controllo le impostazioni",
            "right": true
          },
          {
            "text": "Do il microfono ma non la posizione",
            "right": false,
            "why": "Meno dati condivisi, meno rischi."
          }
        ],
        "explain": "Un’app o un gioco devono chiedere solo i dati che servono: se ti chiedono contatti e posizione per un gioco semplice, vale la pena rifiutare."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Hai dimenticato una prova gratuita e ti hanno addebitato 9 €. Qual è il primo passo?",
        "options": [
          {
            "text": "Aspettare che il servizio si cancelli da solo",
            "right": false,
            "why": "Chi compra ha dei diritti per legge, anche se non li legge nessuno."
          },
          {
            "text": "Cambiare password",
            "right": false,
            "why": "Chi compra ha dei diritti per legge, anche se non li legge nessuno."
          },
          {
            "text": "Ignorare l’addebito",
            "right": false,
            "why": "Chi compra ha dei diritti per legge, anche se non li legge nessuno."
          },
          {
            "text": "Disdire subito, poi scrivere al venditore e chiedere il rimborso con le prove",
            "right": true
          }
        ],
        "explain": "Sui dati personali, chi tratta i tuoi dati ha l’obbligo di dirti cosa raccoglie e perché."
      }
    ],
    "source": "C04-L06"
  },
  "p5-l1": {
    "id": "p5-l1",
    "code": "L1",
    "floor": 5,
    "title": "Obiettivi di risparmio e piano mensile",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Obiettivi di risparmio e piano mensile",
        "mentor": "Quale obiettivo è formulato bene?",
        "options": [
          {
            "text": "«Metto da parte 40 € al mese per 12 mesi per comprare un telefono da 480 €»",
            "right": true
          },
          {
            "text": "«Voglio risparmiare di più»",
            "right": false,
            "why": "Ha importo, tempo e cifra mensile: si può controllare mese per mese."
          },
          {
            "text": "«Prima o poi mi compro un telefono»",
            "right": false,
            "why": "Ha importo, tempo e cifra mensile: si può controllare mese per mese."
          },
          {
            "text": "«Risparmierò quando posso»",
            "right": false,
            "why": "Ha importo, tempo e cifra mensile: si può controllare mese per mese."
          }
        ],
        "theory": "Un obiettivo di risparmio diventa reale quando ha tre numeri: quanto costa, entro quando, e quanto metti da parte ogni mese. Senza uno dei tre è solo un desiderio.",
        "explain": "Importo mensile = costo ÷ numero di mesi. Poi si controlla se l’importo è sostenibile rispetto a quello che entra ogni mese."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Giulia vuole 480 € in 8 mesi. Quanto deve mettere da parte ogni mese?",
        "options": [
          {
            "text": "40 € al mese",
            "right": false,
            "why": "480 ÷ 8 = 60 €."
          },
          {
            "text": "8 € al mese",
            "right": false,
            "why": "480 ÷ 8 = 60 €."
          },
          {
            "text": "480 € al mese",
            "right": false,
            "why": "480 ÷ 8 = 60 €."
          },
          {
            "text": "60 € al mese",
            "right": true
          }
        ],
        "explain": "Fissare la scadenza guardando solo il desiderio (\"lo voglio per Natale\") e non quello che si riesce davvero a mettere da parte."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Se Giulia allunga il piano a 12 mesi, quanto mette da parte al mese e di quanto scende lo sforzo mensile rispetto al piano a 8 mesi?",
        "options": [
          {
            "text": "60 € al mese, uguale al piano a 8 mesi",
            "right": false,
            "why": "480 ÷ 12 = 40 €; 60 − 40 = 20 € in meno."
          },
          {
            "text": "30 € al mese, cioè 30 € in meno",
            "right": false,
            "why": "480 ÷ 12 = 40 €; 60 − 40 = 20 € in meno."
          },
          {
            "text": "40 € al mese, cioè 20 € in più",
            "right": false,
            "why": "480 ÷ 12 = 40 €; 60 − 40 = 20 € in meno."
          },
          {
            "text": "40 € al mese, cioè 20 € in meno; il costo è aspettare 4 mesi in più",
            "right": true
          }
        ],
        "explain": "Il piano si costruisce al contrario: si parte dal prezzo, si sceglie la scadenza e si divide.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Vuoi 300 € per un concerto in 6 mesi. Quanto metti da parte al mese?",
            "options": [
              {
                "text": "50 €",
                "right": true
              },
              {
                "text": "30 €",
                "right": false,
                "why": "300 ÷ 6 = 50 €."
              },
              {
                "text": "6 €",
                "right": false,
                "why": "300 ÷ 6 = 50 €."
              },
              {
                "text": "300 €",
                "right": false,
                "why": "300 ÷ 6 = 50 €."
              }
            ],
            "explain": "Importo mensile = costo ÷ numero di mesi. Poi si controlla se l’importo è sostenibile rispetto a quello che entra ogni mese."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Con 70 € di entrate al mese, quale piano sceglieresti per Giulia: 60 € per 8 mesi o 40 € per 12?",
        "options": [
          {
            "text": "Non c’è una risposta unica: il piano da 60 € lascia solo 10 € (14,3% delle entrate), quello da 40 € ne lascia 30; conta scegliere quello che si riesce a rispettare",
            "right": true
          },
          {
            "text": "Sempre il piano da 60 €: è il più veloce",
            "right": false,
            "why": "Vale la pena scegliere il piano che si riesce a rispettare, non quello più veloce sulla carta."
          },
          {
            "text": "Sempre il piano da 40 €: è sempre il più giusto",
            "right": false,
            "why": "Vale la pena scegliere il piano che si riesce a rispettare, non quello più veloce sulla carta."
          },
          {
            "text": "Nessuno dei due: meglio non risparmiare",
            "right": false,
            "why": "Vale la pena scegliere il piano che si riesce a rispettare, non quello più veloce sulla carta."
          }
        ],
        "explain": "Una regola semplice per ripartire le entrate è la 50/30/20 (50% bisogni, 30% desideri, 20% risparmio): è una convenzione didattica, non una legge, e va adattata alla propria situazione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Vuoi 1.800 € per un trasloco in 12 mesi. Quanto al mese?",
            "options": [
              {
                "text": "150 €",
                "right": true
              },
              {
                "text": "180 €",
                "right": false,
                "why": "1.800 ÷ 12 = 150 €."
              },
              {
                "text": "1.800 €",
                "right": false,
                "why": "1.800 ÷ 12 = 150 €."
              },
              {
                "text": "15 €",
                "right": false,
                "why": "1.800 ÷ 12 = 150 €."
              }
            ],
            "explain": "Importo mensile = costo ÷ numero di mesi. Poi si controlla se l’importo è sostenibile rispetto a quello che entra ogni mese."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Applica la 50/30/20 alle entrate di Giulia (70 €). Quanto va a bisogni, desideri, risparmio? Quanto accumula in 12 mesi con la sola quota risparmio?",
        "options": [
          {
            "text": "35 € bisogni, 14 € desideri, 21 € risparmio; in 12 mesi 252 €",
            "right": false,
            "why": "50%, 30% e 20% di 70 € sono 35, 21 e 14 €; 14 × 12 = 168 €."
          },
          {
            "text": "14 € bisogni, 21 € desideri, 35 € risparmio; in 12 mesi 420 €",
            "right": false,
            "why": "50%, 30% e 20% di 70 € sono 35, 21 e 14 €; 14 × 12 = 168 €."
          },
          {
            "text": "21 € bisogni, 35 € desideri, 14 € risparmio; in 12 mesi 168 €",
            "right": false,
            "why": "50%, 30% e 20% di 70 € sono 35, 21 e 14 €; 14 × 12 = 168 €."
          },
          {
            "text": "35 € bisogni, 21 € desideri, 14 € risparmio; in 12 mesi 168 €, sotto i 480 € del telefono",
            "right": true
          }
        ],
        "explain": "Per un teenager con paghetta i \"bisogni\" sono pochi, quindi la quota risparmio può essere più alta, ma non conviene arrivare al 100%: serve spazio per gli imprevisti.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Vuoi 3.000 € di anticipo per una macchina in 20 mesi. Quanto al mese?",
            "options": [
              {
                "text": "300 €",
                "right": false,
                "why": "3.000 ÷ 20 = 150 €."
              },
              {
                "text": "60 €",
                "right": false,
                "why": "3.000 ÷ 20 = 150 €."
              },
              {
                "text": "150 €",
                "right": true
              },
              {
                "text": "20 €",
                "right": false,
                "why": "3.000 ÷ 20 = 150 €."
              }
            ],
            "explain": "Importo mensile = costo ÷ numero di mesi. Poi si controlla se l’importo è sostenibile rispetto a quello che entra ogni mese."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "A metà piano Giulia spende 25 € in più del previsto per una gita di classe. Qual è la mossa più sensata?",
        "options": [
          {
            "text": "Abbandonare il piano",
            "right": false,
            "why": "Un piano serve proprio a essere ricalcolato quando cambia qualcosa."
          },
          {
            "text": "Far finta di niente",
            "right": false,
            "why": "Un piano serve proprio a essere ricalcolato quando cambia qualcosa."
          },
          {
            "text": "Ridistribuire i 25 € mancanti sui mesi restanti oppure allungare di poco la scadenza",
            "right": true
          },
          {
            "text": "Cancellare l’obiettivo e spendere il resto",
            "right": false,
            "why": "Un piano serve proprio a essere ricalcolato quando cambia qualcosa."
          }
        ],
        "explain": "Il piano si costruisce al contrario: si parte dal prezzo, si sceglie la scadenza e si divide. Importo mensile = costo ÷ numero di mesi."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Vero o falso: \"se risparmio tutto quello che entra, il piano è perfetto\".",
        "options": [
          {
            "text": "Falso: senza margine per gli imprevisti e per qualche spesa piacevole il piano è poco sostenibile",
            "right": true
          },
          {
            "text": "Vero: più risparmi, meglio è, sempre",
            "right": false,
            "why": "Falso. Un piano senza margine per gli imprevisti e per qualche spesa piacevole è poco sostenibile e di solito si interrompe."
          },
          {
            "text": "Vero, se la cifra supera 100 €",
            "right": false,
            "why": "Falso. Un piano senza margine per gli imprevisti e per qualche spesa piacevole è poco sostenibile e di solito si interrompe."
          },
          {
            "text": "Falso: il piano non serve a nulla",
            "right": false,
            "why": "Falso. Un piano senza margine per gli imprevisti e per qualche spesa piacevole è poco sostenibile e di solito si interrompe."
          }
        ],
        "explain": "Poi si controlla se l’importo è sostenibile rispetto a quello che entra ogni mese."
      }
    ],
    "source": "C05-L01"
  },
  "p5-l2": {
    "id": "p5-l2",
    "code": "L2",
    "floor": 5,
    "title": "Il fondo di emergenza",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Il fondo di emergenza",
        "mentor": "Quale di queste spese può essere pagata con il fondo di emergenza?",
        "options": [
          {
            "text": "La riparazione urgente dello zaino rotto il giorno prima di una gita",
            "right": true
          },
          {
            "text": "Una felpa in saldo",
            "right": false,
            "why": "È urgente, non prevista e non rimandabile."
          },
          {
            "text": "Un biglietto per un concerto",
            "right": false,
            "why": "È urgente, non prevista e non rimandabile."
          },
          {
            "text": "Un videogioco in promozione",
            "right": false,
            "why": "È urgente, non prevista e non rimandabile."
          }
        ],
        "theory": "Il fondo di emergenza è una somma tenuta da parte solo per gli imprevisti. Non serve a comprare cose desiderate: serve a non dover chiedere soldi in prestito (o rinunciare a qualcosa di importante) quando succede qualcosa.",
        "explain": "Il fondo va tenuto separato dai soldi \"di tutti i giorni\" ma facile da raggiungere, e va ricostituito dopo ogni uso."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Le spese essenziali di Giulia sono 45 € al mese. Quanto vale un fondo di 3 mesi? E di 6 mesi?",
        "options": [
          {
            "text": "90 € e 180 €",
            "right": false,
            "why": "45 × 3 = 135; 45 × 6 = 270."
          },
          {
            "text": "135 € e 270 €",
            "right": true
          },
          {
            "text": "45 € e 135 €",
            "right": false,
            "why": "45 × 3 = 135; 45 × 6 = 270."
          },
          {
            "text": "135 € e 540 €",
            "right": false,
            "why": "45 × 3 = 135; 45 × 6 = 270."
          }
        ],
        "explain": "Per un adulto le spese essenziali sono affitto, bollette, cibo; per un teenager sono molto meno (trasporti, ricarica, merende, materiale scolastico), quindi il fondo è più piccolo e si può costruire in pochi mesi."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Giulia ha già messo da parte 60 € per il fondo. Quanto le manca per arrivare a 3 mesi? Quanti mesi servono se ne aggiunge 15 € al mese?",
        "options": [
          {
            "text": "Mancano 75 €; servono 15 mesi",
            "right": false,
            "why": "135 − 60 = 75; 75 ÷ 15 = 5."
          },
          {
            "text": "Mancano 75 €; con 15 € al mese servono 5 mesi",
            "right": true
          },
          {
            "text": "Mancano 60 €; servono 4 mesi",
            "right": false,
            "why": "135 − 60 = 75; 75 ÷ 15 = 5."
          },
          {
            "text": "Mancano 135 €; servono 9 mesi",
            "right": false,
            "why": "135 − 60 = 75; 75 ÷ 15 = 5."
          }
        ],
        "explain": "Usare il fondo per un desiderio (\"è in offerta, tanto è solo per questa volta\"). Un imprevisto è qualcosa che non puoi rimandare e non avevi previsto: la scarpa in saldo non lo è.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Spese essenziali di 60 € al mese: quanto è un fondo di 3 mesi?",
            "options": [
              {
                "text": "60 €",
                "right": false,
                "why": "60 × 3 = 180 €."
              },
              {
                "text": "120 €",
                "right": false,
                "why": "60 × 3 = 180 €."
              },
              {
                "text": "360 €",
                "right": false,
                "why": "60 × 3 = 180 €."
              },
              {
                "text": "180 €",
                "right": true
              }
            ],
            "explain": "Usare il fondo per un desiderio (\"è in offerta, tanto è solo per questa volta\"). Un imprevisto è qualcosa che non puoi rimandare e non avevi previsto: la scarpa in saldo non lo è."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Giulia ha 70 € di entrate al mese e un obiettivo telefono da 40 € al mese. Deve anche costruire il fondo. Cosa conviene fare prima?",
        "options": [
          {
            "text": "Dedicare tutto al telefono: il fondo si farà dopo",
            "right": false,
            "why": "Senza fondo un imprevisto rischia di far saltare tutto il piano."
          },
          {
            "text": "Costruire almeno un primo cuscinetto (1–2 mesi di spese essenziali, 45–90 €) prima di accelerare sull’obiettivo",
            "right": true
          },
          {
            "text": "Spendere tutto in desideri",
            "right": false,
            "why": "Senza fondo un imprevisto rischia di far saltare tutto il piano."
          },
          {
            "text": "Non fare né fondo né obiettivo",
            "right": false,
            "why": "Senza fondo un imprevisto rischia di far saltare tutto il piano."
          }
        ],
        "explain": "La misura tipica è un multiplo delle spese essenziali mensili: spesso si parla di 3–6 mesi, ma è una regola pratica divulgativa e non una norma.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Spese essenziali di 700 € al mese: quanto è un fondo di 4 mesi?",
            "options": [
              {
                "text": "700 €",
                "right": false,
                "why": "700 × 4 = 2.800 €."
              },
              {
                "text": "1.400 €",
                "right": false,
                "why": "700 × 4 = 2.800 €."
              },
              {
                "text": "2.800 €",
                "right": true
              },
              {
                "text": "4.200 €",
                "right": false,
                "why": "700 × 4 = 2.800 €."
              }
            ],
            "explain": "La misura tipica è un multiplo delle spese essenziali mensili: spesso si parla di 3–6 mesi, ma è una regola pratica divulgativa e non una norma."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Giulia usa 90 € del fondo per la riparazione. Il fondo era a 135 €. Quanto ne resta e quanti mesi di spese copre ora?",
        "options": [
          {
            "text": "Restano 90 €: 2 mesi",
            "right": false,
            "why": "135 − 90 = 45 €; 45 ÷ 45 = 1 mese."
          },
          {
            "text": "Restano 45 €: 1 mese di spese essenziali; va ricostituito",
            "right": true
          },
          {
            "text": "Restano 225 €: 5 mesi",
            "right": false,
            "why": "135 − 90 = 45 €; 45 ÷ 45 = 1 mese."
          },
          {
            "text": "Restano 0 €",
            "right": false,
            "why": "135 − 90 = 45 €; 45 ÷ 45 = 1 mese."
          }
        ],
        "explain": "Per un adulto le spese essenziali sono affitto, bollette, cibo; per un teenager sono molto meno (trasporti, ricarica, merende, materiale scolastico), quindi il fondo è più piccolo e si può costruire in pochi mesi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Spese essenziali di 1.000 € al mese: quanto è un fondo di 6 mesi?",
            "options": [
              {
                "text": "3.000 €",
                "right": false,
                "why": "1.000 × 6 = 6.000 €."
              },
              {
                "text": "1.000 €",
                "right": false,
                "why": "1.000 × 6 = 6.000 €."
              },
              {
                "text": "6.000 €",
                "right": true
              },
              {
                "text": "12.000 €",
                "right": false,
                "why": "1.000 × 6 = 6.000 €."
              }
            ],
            "explain": "Per un adulto le spese essenziali sono affitto, bollette, cibo; per un teenager sono molto meno (trasporti, ricarica, merende, materiale scolastico), quindi il fondo è più piccolo e si può costruire in pochi mesi."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "Dove ha senso tenere il fondo di emergenza?",
        "options": [
          {
            "text": "In un investimento che può perdere valore",
            "right": false,
            "why": "La sua funzione è la sicurezza, non il rendimento."
          },
          {
            "text": "In contanti nel cassetto, senza mai guardarlo",
            "right": false,
            "why": "La sua funzione è la sicurezza, non il rendimento."
          },
          {
            "text": "In un posto separato dai soldi di tutti i giorni, raggiungibile in pochi giorni e senza rischio di perdita",
            "right": true
          },
          {
            "text": "Prestato a un amico",
            "right": false,
            "why": "La sua funzione è la sicurezza, non il rendimento."
          }
        ],
        "explain": "Il fondo va tenuto separato dai soldi \"di tutti i giorni\" ma facile da raggiungere, e va ricostituito dopo ogni uso."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Vero o falso: \"il fondo di emergenza serve per sfruttare occasioni di acquisto\".",
        "options": [
          {
            "text": "Vero: serve per approfittare dei saldi",
            "right": false,
            "why": "Il fondo di emergenza è una somma tenuta da parte solo per gli imprevisti."
          },
          {
            "text": "Vero, se sono grandi occasioni",
            "right": false,
            "why": "Il fondo di emergenza è una somma tenuta da parte solo per gli imprevisti."
          },
          {
            "text": "Falso: il fondo non esiste",
            "right": false,
            "why": "Il fondo di emergenza è una somma tenuta da parte solo per gli imprevisti."
          },
          {
            "text": "Falso: serve per spese urgenti e non previste; le occasioni si pianificano con l’obiettivo di risparmio",
            "right": true
          }
        ],
        "explain": "Per un adulto le spese essenziali sono affitto, bollette, cibo; per un teenager sono molto meno (trasporti, ricarica, merende, materiale scolastico), quindi il fondo è più piccolo e si può costruire in pochi mesi."
      }
    ],
    "source": "C05-L02"
  },
  "p5-l3": {
    "id": "p5-l3",
    "code": "L3",
    "floor": 5,
    "title": "Dove metti i risparmi: conto deposito e interesse composto",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Dove metti i risparmi",
        "mentor": "Qual è la differenza tra interesse semplice e composto?",
        "options": [
          {
            "text": "Il composto si paga solo ai maggiorenni",
            "right": false,
            "why": "Il denaro fermo può produrre interessi, ma il numero che leggi (tasso lordo) non è quello che ti entra in tasca: tasse e imposte lo riducono."
          },
          {
            "text": "Il semplice si calcola sul capitale iniziale; il composto anche sugli interessi già maturati",
            "right": true
          },
          {
            "text": "Non c’è differenza",
            "right": false,
            "why": "Il denaro fermo può produrre interessi, ma il numero che leggi (tasso lordo) non è quello che ti entra in tasca: tasse e imposte lo riducono."
          },
          {
            "text": "Il semplice è sempre più alto del composto",
            "right": false,
            "why": "Il denaro fermo può produrre interessi, ma il numero che leggi (tasso lordo) non è quello che ti entra in tasca: tasse e imposte lo riducono."
          }
        ],
        "theory": "Il denaro fermo può produrre interessi, ma il numero che leggi (tasso lordo) non è quello che ti entra in tasca: tasse e imposte lo riducono. E con il tempo l’interesse si calcola anche sugli interessi già maturati: è l’interesse composto.",
        "explain": "Interesse semplice: si calcola sempre sul capitale iniziale. Interesse composto: ogni anno si calcola sul capitale più gli interessi già maturati, quindi la formula è capitale × (1 + tasso)^anni."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "500 € al 3% lordo annuo: quanto è l’interesse lordo dopo 1 anno e quanto il netto dopo il 26% di imposta (senza bollo)?",
        "options": [
          {
            "text": "Lordo 15 €; imposta 15 €; netto 0 €",
            "right": false,
            "why": "3% di 500 = 15; 26% di 15 = 3,90; 15 − 3,90 = 11,10 €."
          },
          {
            "text": "Lordo 15 €; imposta 3,90 €; netto 11,10 €",
            "right": true
          },
          {
            "text": "Lordo 15 €; imposta 3,90 €; netto 18,90 €",
            "right": false,
            "why": "3% di 500 = 15; 26% di 15 = 3,90; 15 − 3,90 = 11,10 €."
          },
          {
            "text": "Lordo 1,50 €; imposta 0,39 €; netto 1,11 €",
            "right": false,
            "why": "3% di 500 = 15; 26% di 15 = 3,90; 15 − 3,90 = 11,10 €."
          }
        ],
        "explain": "Il tasso annuo lordo è quello pubblicizzato; per arrivare al netto si tolgono le imposte. Un conto vincolato paga di solito di più di uno libero, ma il denaro non è subito disponibile."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Aggiungi il bollo dello 0,20% su 500 €. Quanto resta in tutto e che percentuale è del capitale?",
        "options": [
          {
            "text": "Bollo 0,20 €; restano 10,90 €",
            "right": false,
            "why": "0,20% di 500 = 1 €; 11,10 − 1 = 10,10 €; 10,10 ÷ 500 = 2,02%."
          },
          {
            "text": "Bollo 1,00 €; restano 10,10 €, il 2,02% di 500 €",
            "right": true
          },
          {
            "text": "Bollo 1,00 €; restano 14 €",
            "right": false,
            "why": "0,20% di 500 = 1 €; 11,10 − 1 = 10,10 €; 10,10 ÷ 500 = 2,02%."
          },
          {
            "text": "Bollo 10 €; restano 1,10 €",
            "right": false,
            "why": "0,20% di 500 = 1 €; 11,10 − 1 = 10,10 €; 10,10 ÷ 500 = 2,02%."
          }
        ],
        "explain": "I minorenni, in genere, aprono i conti tramite un genitore o tutore: le regole variano e vanno verificate con la banca.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "200 € al 2% lordo per un anno: interesse lordo?",
            "options": [
              {
                "text": "2 €",
                "right": false,
                "why": "200 × 0,02 = 4 €."
              },
              {
                "text": "40 €",
                "right": false,
                "why": "200 × 0,02 = 4 €."
              },
              {
                "text": "4 €",
                "right": true
              },
              {
                "text": "0,40 €",
                "right": false,
                "why": "200 × 0,02 = 4 €."
              }
            ],
            "explain": "Interesse composto: ogni anno si calcola sul capitale più gli interessi già maturati, quindi la formula è capitale × (1 + tasso)^anni."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "200 € al 3% annuo composto per 3 anni (lordo, senza imposte). Quanto diventano? Quanto avresti con l’interesse semplice?",
        "options": [
          {
            "text": "Composto 218,00 €; semplice 218,55 €",
            "right": false,
            "why": "200 × 1,03³ = 218,55; 200 + 3 × 6 = 218."
          },
          {
            "text": "Composto 209 €; semplice 218 €",
            "right": false,
            "why": "200 × 1,03³ = 218,55; 200 + 3 × 6 = 218."
          },
          {
            "text": "Composto 218,55 €; semplice 218,00 €: la differenza (0,55 €) cresce con tempo e capitale",
            "right": true
          },
          {
            "text": "Composto 236 €; semplice 218 €",
            "right": false,
            "why": "200 × 1,03³ = 218,55; 200 + 3 × 6 = 218."
          }
        ],
        "explain": "Confrontare i tassi lordi tra loro senza guardare vincoli, costi e tasse; oppure scegliere il conto più \"alto\" e scoprire dopo che non puoi prelevare quando serve.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "1.000 € al 3% lordo: interesse netto dopo il 26% di imposta (senza bollo)?",
            "options": [
              {
                "text": "22,20 €",
                "right": true
              },
              {
                "text": "30 €",
                "right": false,
                "why": "30 − 26% di 30 = 22,20 €."
              },
              {
                "text": "7,80 €",
                "right": false,
                "why": "30 − 26% di 30 = 22,20 €."
              },
              {
                "text": "26 €",
                "right": false,
                "why": "30 − 26% di 30 = 22,20 €."
              }
            ],
            "explain": "Il tasso annuo lordo è quello pubblicizzato; per arrivare al netto si tolgono le imposte. Un conto vincolato paga di solito di più di uno libero, ma il denaro non è subito disponibile."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Il conto A dà il 2,5% ma blocca i soldi per 12 mesi; il conto B dà l'1,5% ed è libero. Su 500 € la differenza lorda è 5 € l’anno. Dove metteresti il fondo di emergenza e dove i soldi che sai di non toccare per un anno?",
        "options": [
          {
            "text": "Il fondo sul vincolato (A): rende di più",
            "right": false,
            "why": "Il vincolo vanifica la funzione del fondo; l’extra è di soli 5 € lordi."
          },
          {
            "text": "Tutto sul vincolato, sempre",
            "right": false,
            "why": "Il vincolo vanifica la funzione del fondo; l’extra è di soli 5 € lordi."
          },
          {
            "text": "Tutto sul libero, mai sul vincolato, anche se non servono",
            "right": false,
            "why": "Il vincolo vanifica la funzione del fondo; l’extra è di soli 5 € lordi."
          },
          {
            "text": "Il fondo di emergenza sul conto libero (B); sul vincolato solo i soldi che non servono per 12 mesi",
            "right": true
          }
        ],
        "explain": "I tassi usati qui sono cifre di esempio, non offerte reali.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "5.000 € al 2,5% lordo composto per 2 anni: valore finale?",
            "options": [
              {
                "text": "5.250 €",
                "right": false,
                "why": "5.000 × 1,025² = 5.253,13 €."
              },
              {
                "text": "5.125 €",
                "right": false,
                "why": "5.000 × 1,025² = 5.253,13 €."
              },
              {
                "text": "5.253,13 €",
                "right": true
              },
              {
                "text": "6.250 €",
                "right": false,
                "why": "5.000 × 1,025² = 5.253,13 €."
              }
            ],
            "explain": "Interesse composto: ogni anno si calcola sul capitale più gli interessi già maturati, quindi la formula è capitale × (1 + tasso)^anni."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "Se i prezzi crescono del 3% in un anno e il tuo conto rende il 2% lordo, cosa succede al tuo potere d’acquisto?",
        "options": [
          {
            "text": "Cresce, perché hai guadagnato interessi",
            "right": false,
            "why": "Con 100 € ottieni 102 €, ma ciò che costava 100 € ora costa 103 €."
          },
          {
            "text": "Resta uguale",
            "right": false,
            "why": "Con 100 € ottieni 102 €, ma ciò che costava 100 € ora costa 103 €."
          },
          {
            "text": "Raddoppia",
            "right": false,
            "why": "Con 100 € ottieni 102 €, ma ciò che costava 100 € ora costa 103 €."
          },
          {
            "text": "Scende: gli interessi crescono meno dei prezzi",
            "right": true
          }
        ],
        "explain": "Confrontare i tassi lordi tra loro senza guardare vincoli, costi e tasse; oppure scegliere il conto più \"alto\" e scoprire dopo che non puoi prelevare quando serve."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Vero o falso: \"il tasso lordo è esattamente quello che mi ritrovo in tasca a fine anno\".",
        "options": [
          {
            "text": "Vero: il lordo è ciò che si incassa",
            "right": false,
            "why": "Falso. Vanno tolte imposte e costi, come mostrato con Giulia (3% lordo → 2,02% netto)."
          },
          {
            "text": "Vero, per i conti deposito",
            "right": false,
            "why": "Falso. Vanno tolte imposte e costi, come mostrato con Giulia (3% lordo → 2,02% netto)."
          },
          {
            "text": "Falso: il netto è sempre più alto del lordo",
            "right": false,
            "why": "Falso. Vanno tolte imposte e costi, come mostrato con Giulia (3% lordo → 2,02% netto)."
          },
          {
            "text": "Falso: vanno tolte imposte e costi (3% lordo → 2,02% netto nell’esempio)",
            "right": true
          }
        ],
        "explain": "Il tasso annuo lordo è quello pubblicizzato; per arrivare al netto si tolgono le imposte. Un conto vincolato paga di solito di più di uno libero, ma il denaro non è subito disponibile."
      }
    ],
    "source": "C05-L03"
  },
  "p5-l4": {
    "id": "p5-l4",
    "code": "L4",
    "floor": 5,
    "title": "L’assicurazione: trasferire il rischio",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "L’assicurazione",
        "mentor": "Collega: a) premio; b) franchigia; c) scoperto; d) massimale. 1) tetto massimo che l’assicurazione può pagare; 2) parte fissa del danno a tuo carico; 3) prezzo della polizza; 4) quota percentuale del danno a tuo carico.",
        "options": [
          {
            "text": "a-1, b-2, c-3, d-4",
            "right": false,
            "why": "Premio = prezzo; franchigia = parte fissa a tuo carico; scoperto = quota percentuale a tuo carico; massimale = tetto."
          },
          {
            "text": "a-3, b-2, c-4, d-1",
            "right": true
          },
          {
            "text": "a-2, b-3, c-1, d-4",
            "right": false,
            "why": "Premio = prezzo; franchigia = parte fissa a tuo carico; scoperto = quota percentuale a tuo carico; massimale = tetto."
          },
          {
            "text": "a-4, b-1, c-2, d-3",
            "right": false,
            "why": "Premio = prezzo; franchigia = parte fissa a tuo carico; scoperto = quota percentuale a tuo carico; massimale = tetto."
          }
        ],
        "theory": "Con un’assicurazione paghi una somma certa e piccola (il premio) per far pagare a qualcun altro un danno grande ma poco probabile. Si assicurano i rischi che non potresti permetterti di pagare da solo, non quelli piccoli.",
        "explain": "Il massimale è il tetto massimo che l’assicurazione può pagare, anche se il danno è più alto. Un fatto onesto da dire: in media, una persona paga all’assicurazione più di quanto riceva in rimborsi, altrimenti l’assicurazione non potrebbe sostenere i costi."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Danno di 200 €, franchigia di 50 €. Quanto rimborsa l’assicurazione?",
        "options": [
          {
            "text": "200 €",
            "right": false,
            "why": "200 − 50 = 150 €."
          },
          {
            "text": "50 €",
            "right": false,
            "why": "200 − 50 = 150 €."
          },
          {
            "text": "150 €",
            "right": true
          },
          {
            "text": "250 €",
            "right": false,
            "why": "200 − 50 = 150 €."
          }
        ],
        "explain": "La franchigia è una parte fissa del danno che resta sempre a tuo carico (danno − franchigia = rimborso). Lo scoperto è una parte del danno espressa in percentuale che resta a tuo carico, spesso con un minimo in euro."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Polizza con scoperto del 10% e minimo di 30 €. Quanto resta a tuo carico se il danno è 200 €? E se è 500 €?",
        "options": [
          {
            "text": "30 € a carico (rimborso 170 €) con danno da 200 €; 50 € a carico (rimborso 450 €) con danno da 500 €",
            "right": true
          },
          {
            "text": "20 € a carico con 200 €; 50 € a carico con 500 €",
            "right": false,
            "why": "10% di 200 = 20, ma il minimo è 30; 10% di 500 = 50."
          },
          {
            "text": "30 € a carico con 200 €; 30 € a carico con 500 €",
            "right": false,
            "why": "10% di 200 = 20, ma il minimo è 30; 10% di 500 = 50."
          },
          {
            "text": "10 € a carico con 200 €; 10 € con 500 €",
            "right": false,
            "why": "10% di 200 = 20, ma il minimo è 30; 10% di 500 = 50."
          }
        ],
        "explain": "Per i danni piccoli conviene il fondo di emergenza (L2). Credere che l’assicurazione «paghi tutto».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Danno 120 €, franchigia 20 €: rimborso?",
            "options": [
              {
                "text": "120 €",
                "right": false,
                "why": "120 − 20 = 100 €."
              },
              {
                "text": "100 €",
                "right": true
              },
              {
                "text": "20 €",
                "right": false,
                "why": "120 − 20 = 100 €."
              },
              {
                "text": "140 €",
                "right": false,
                "why": "120 − 20 = 100 €."
              }
            ],
            "explain": "Per i danni piccoli conviene il fondo di emergenza (L2). Credere che l’assicurazione «paghi tutto»."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Massimale 300 €, franchigia 50 €, danno 450 €. Quanto rimborsa e quanto paghi tu?",
        "options": [
          {
            "text": "Rimborso 400 €; paghi 50 €",
            "right": false,
            "why": "450 − 50 = 400, ma il tetto è 300 €: paghi 150 €."
          },
          {
            "text": "Rimborso 450 €; paghi 0 €",
            "right": false,
            "why": "450 − 50 = 400, ma il tetto è 300 €: paghi 150 €."
          },
          {
            "text": "Rimborso 300 €; paghi 50 €",
            "right": false,
            "why": "450 − 50 = 400, ma il tetto è 300 €: paghi 150 €."
          },
          {
            "text": "Rimborso 300 €; paghi 150 €",
            "right": true
          }
        ],
        "explain": "Franchigie, scoperti, massimali ed esclusioni riducono quello che arriva davvero, e vanno letti prima di firmare.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Danno 600 €, scoperto 10% con minimo 40 €: quanto resta a carico?",
            "options": [
              {
                "text": "40 €",
                "right": false,
                "why": "10% di 600 = 60, sopra il minimo."
              },
              {
                "text": "60 €",
                "right": true
              },
              {
                "text": "10 €",
                "right": false,
                "why": "10% di 600 = 60, sopra il minimo."
              },
              {
                "text": "540 €",
                "right": false,
                "why": "10% di 600 = 60, sopra il minimo."
              }
            ],
            "explain": "Lo scoperto è una parte del danno espressa in percentuale che resta a tuo carico, spesso con un minimo in euro."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Premio 36 € l’anno. Se in un anno su cinque il telefono si rompe e il rimborso è 150 €, quanto ricevi in media ogni anno? Conviene «in media»?",
        "options": [
          {
            "text": "30 € l’anno contro 36 € di premio: in media perdi 6 €",
            "right": true
          },
          {
            "text": "36 € l’anno: pareggio",
            "right": false,
            "why": "150 ÷ 5 = 30 € l’anno; 30 − 36 = −6 €."
          },
          {
            "text": "150 € l’anno: guadagni 114 €",
            "right": false,
            "why": "150 ÷ 5 = 30 € l’anno; 30 − 36 = −6 €."
          },
          {
            "text": "7,50 € l’anno: perdi 28,50 €",
            "right": false,
            "why": "150 ÷ 5 = 30 € l’anno; 30 − 36 = −6 €."
          }
        ],
        "explain": "Il valore sta nel non dover affrontare da soli il danno grande, quando capita.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Massimale 1.000 €, franchigia 100 €, danno 1.400 €: rimborso?",
            "options": [
              {
                "text": "1.000 €",
                "right": true
              },
              {
                "text": "1.300 €",
                "right": false,
                "why": "1.400 − 100 = 1.300, ma il tetto è 1.000 €."
              },
              {
                "text": "1.400 €",
                "right": false,
                "why": "1.400 − 100 = 1.300, ma il tetto è 1.000 €."
              },
              {
                "text": "900 €",
                "right": false,
                "why": "1.400 − 100 = 1.300, ma il tetto è 1.000 €."
              }
            ],
            "explain": "La franchigia è una parte fissa del danno che resta sempre a tuo carico (danno − franchigia = rimborso). Lo scoperto è una parte del danno espressa in percentuale che resta a tuo carico, spesso con un minimo in euro."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Quale rischio ha più senso assicurare?",
        "options": [
          {
            "text": "Un danno causato ad altri che potrebbe costare migliaia di euro",
            "right": true
          },
          {
            "text": "La rottura dello schermo di un telefono da 90 €",
            "right": false,
            "why": "Se il danno è molto più grande di quello che puoi pagare, trasferire il rischio ha senso."
          },
          {
            "text": "Entrambi allo stesso modo",
            "right": false,
            "why": "Se il danno è molto più grande di quello che puoi pagare, trasferire il rischio ha senso."
          },
          {
            "text": "Nessuno dei due",
            "right": false,
            "why": "Se il danno è molto più grande di quello che puoi pagare, trasferire il rischio ha senso."
          }
        ],
        "explain": "Il massimale è il tetto massimo che l’assicurazione può pagare, anche se il danno è più alto. Un fatto onesto da dire: in media, una persona paga all’assicurazione più di quanto riceva in rimborsi, altrimenti l’assicurazione non potrebbe sostenere i costi."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Fondo di emergenza e assicurazione sono la stessa cosa?",
        "options": [
          {
            "text": "Sì: sono sinonimi",
            "right": false,
            "why": "No. Il fondo copre gli imprevisti che puoi pagare; l’assicurazione quelli troppo grandi per essere pagati con i tuoi risparmi."
          },
          {
            "text": "Sì, ma solo per gli adulti",
            "right": false,
            "why": "No. Il fondo copre gli imprevisti che puoi pagare; l’assicurazione quelli troppo grandi per essere pagati con i tuoi risparmi."
          },
          {
            "text": "No: il fondo copre gli imprevisti che puoi pagare, l’assicurazione quelli troppo grandi",
            "right": true
          },
          {
            "text": "No: l’assicurazione serve solo per le auto",
            "right": false,
            "why": "No. Il fondo copre gli imprevisti che puoi pagare; l’assicurazione quelli troppo grandi per essere pagati con i tuoi risparmi."
          }
        ],
        "explain": "Per i danni piccoli conviene il fondo di emergenza (L2). Credere che l’assicurazione «paghi tutto»."
      }
    ],
    "source": "C05-L04"
  },
  "p5-l5": {
    "id": "p5-l5",
    "code": "L5",
    "floor": 5,
    "title": "Le polizze che servono davvero a un giovane",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Le polizze che servono davvero a un giovane",
        "mentor": "Quale di queste polizze è obbligatoria per chi guida un motorino (da verificare con le norme attuali)?",
        "options": [
          {
            "text": "Polizza telefono",
            "right": false,
            "why": "Non serve una polizza per ogni rischio: serve partire da quelli che farebbero davvero male (danni causati ad altri, infortuni gravi, obblighi di legge) e ignorare quelli che si pagano con il fondo di emergenza."
          },
          {
            "text": "Polizza infortuni",
            "right": false,
            "why": "Non serve una polizza per ogni rischio: serve partire da quelli che farebbero davvero male (danni causati ad altri, infortuni gravi, obblighi di legge) e ignorare quelli che si pagano con il fondo di emergenza."
          },
          {
            "text": "Responsabilità civile veicoli",
            "right": true
          },
          {
            "text": "Polizza viaggio",
            "right": false,
            "why": "Non serve una polizza per ogni rischio: serve partire da quelli che farebbero davvero male (danni causati ad altri, infortuni gravi, obblighi di legge) e ignorare quelli che si pagano con il fondo di emergenza."
          }
        ],
        "theory": "Non serve una polizza per ogni rischio: serve partire da quelli che farebbero davvero male (danni causati ad altri, infortuni gravi, obblighi di legge) e ignorare quelli che si pagano con il fondo di emergenza. La domanda giusta è: «se succede, posso permettermi di pagare?».",
        "explain": "Altre sono facoltative: responsabilità civile verso terzi, infortuni, spese sanitarie, casa o affitto, dispositivi elettronici."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "La polizza obbligatoria costa 90 € l’anno. Quanto al mese?",
        "options": [
          {
            "text": "90 €",
            "right": false,
            "why": "90 ÷ 12 = 7,50 €."
          },
          {
            "text": "15 €",
            "right": false,
            "why": "90 ÷ 12 = 7,50 €."
          },
          {
            "text": "7,50 €",
            "right": true
          },
          {
            "text": "1,08 €",
            "right": false,
            "why": "90 ÷ 12 = 7,50 €."
          }
        ],
        "explain": "Elena, 19 anni: ha un motorino e un lavoretto estivo. Davide, 20 anni: studia fuori sede e vive in affitto con altri due coinquilini."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Elena ha 120 € di budget; polizza obbligatoria 90 €, infortuni 40 €, telefono 36 €. Di quanto si supera il budget con tutte e tre? E quanto resta dopo la sola obbligatoria?",
        "options": [
          {
            "text": "166 € in tutto: 46 € sotto il budget",
            "right": false,
            "why": "90 + 40 + 36 = 166; 166 − 120 = 46; 120 − 90 = 30."
          },
          {
            "text": "166 € in tutto: 46 € oltre il budget; con la sola obbligatoria restano 30 €",
            "right": true
          },
          {
            "text": "130 € in tutto; restano 10 €",
            "right": false,
            "why": "90 + 40 + 36 = 166; 166 − 120 = 46; 120 − 90 = 30."
          },
          {
            "text": "120 € in tutto; restano 0 €",
            "right": false,
            "why": "90 + 40 + 36 = 166; 166 − 120 = 46; 120 − 90 = 30."
          }
        ],
        "explain": "Ci sono tre domande da fare: cosa copre davvero? cosa esclude? quanto pago e quanto mi resta a carico (franchigia, scoperto, massimale)?",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Polizza a 48 € l’anno: quanto al mese?",
            "options": [
              {
                "text": "48 €",
                "right": false,
                "why": "48 ÷ 12 = 4 €."
              },
              {
                "text": "12 €",
                "right": false,
                "why": "48 ÷ 12 = 4 €."
              },
              {
                "text": "4 €",
                "right": true
              },
              {
                "text": "0,40 €",
                "right": false,
                "why": "48 ÷ 12 = 4 €."
              }
            ],
            "explain": "Elena, 19 anni: ha un motorino e un lavoretto estivo. Davide, 20 anni: studia fuori sede e vive in affitto con altri due coinquilini."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Marco, 15 anni, vive con la famiglia: cosa gli conviene verificare per prima cosa?",
        "options": [
          {
            "text": "Comprare subito una polizza per la bici da 40 €",
            "right": false,
            "why": "Prima si verifica cosa è già coperto, poi si decide se manca qualcosa."
          },
          {
            "text": "Comprare tre polizze per sicurezza",
            "right": false,
            "why": "Prima si verifica cosa è già coperto, poi si decide se manca qualcosa."
          },
          {
            "text": "Chiedere in famiglia cosa copre già la polizza della casa o altre assicurazioni e come è coperto lo sport",
            "right": true
          },
          {
            "text": "Ignorare il tema",
            "right": false,
            "why": "Prima si verifica cosa è già coperto, poi si decide se manca qualcosa."
          }
        ],
        "explain": "Marco, 15 anni: vive con la famiglia, va a scuola in bici e fa sport.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Danno a terzi di 8.000 € e massimale di 3.000 €: quanto resta a carico?",
            "options": [
              {
                "text": "5.000 €",
                "right": true
              },
              {
                "text": "8.000 €",
                "right": false,
                "why": "8.000 − 3.000 = 5.000 €."
              },
              {
                "text": "3.000 €",
                "right": false,
                "why": "8.000 − 3.000 = 5.000 €."
              },
              {
                "text": "11.000 €",
                "right": false,
                "why": "8.000 − 3.000 = 5.000 €."
              }
            ],
            "explain": "Ci sono tre domande da fare: cosa copre davvero? cosa esclude? quanto pago e quanto mi resta a carico (franchigia, scoperto, massimale)?"
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un danno a terzi costa 12.000 €. La polizza di responsabilità civile ha un massimale di 5.000 €. Quanto resta a carico del giovane?",
        "options": [
          {
            "text": "12.000 €",
            "right": false,
            "why": "12.000 − 5.000 = 7.000 €."
          },
          {
            "text": "5.000 €",
            "right": false,
            "why": "12.000 − 5.000 = 7.000 €."
          },
          {
            "text": "7.000 €",
            "right": true
          },
          {
            "text": "17.000 €",
            "right": false,
            "why": "12.000 − 5.000 = 7.000 €."
          }
        ],
        "explain": "Comprare polizze «piccole» per tanti oggetti e restare scoperti sul rischio grande, oppure firmare una polizza già coperta da un’altra.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un dipendente ha già un’assicurazione infortuni dal datore di lavoro. Cosa verifica prima di comprarne un’altra?",
            "options": [
              {
                "text": "Il colore del contratto",
                "right": false,
                "why": "Si verifica prima ciò che è già coperto."
              },
              {
                "text": "Il costo del caffè",
                "right": false,
                "why": "Si verifica prima ciò che è già coperto."
              },
              {
                "text": "Niente: si compra a prescindere",
                "right": false,
                "why": "Si verifica prima ciò che è già coperto."
              },
              {
                "text": "Cosa copre già",
                "right": true
              }
            ],
            "explain": "Prima di comprarne una conviene chiedere se il rischio è già coperto da qualcosa che c’è già (per esempio una polizza della famiglia, la scuola, lo sport o una carta): pagare due volte per lo stesso rischio non raddoppia il rimborso."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "Vero o falso: «se ho due polizze per lo stesso rischio, vengo rimborsato due volte».",
        "options": [
          {
            "text": "Falso, in generale: il rimborso copre il danno una sola volta e due polizze significano due premi",
            "right": true
          },
          {
            "text": "Vero: vieni rimborsato due volte",
            "right": false,
            "why": "Falso, in generale. Il rimborso copre il danno una volta sola; due polizze significano due premi (da verificare le regole sull’assicurazione multipla nel Codice civile)."
          },
          {
            "text": "Vero, se le polizze sono di compagnie diverse",
            "right": false,
            "why": "Falso, in generale. Il rimborso copre il danno una volta sola; due polizze significano due premi (da verificare le regole sull’assicurazione multipla nel Codice civile)."
          },
          {
            "text": "Falso: le polizze non rimborsano nulla",
            "right": false,
            "why": "Falso, in generale. Il rimborso copre il danno una volta sola; due polizze significano due premi (da verificare le regole sull’assicurazione multipla nel Codice civile)."
          }
        ],
        "explain": "Prima di comprarne una conviene chiedere se il rischio è già coperto da qualcosa che c’è già (per esempio una polizza della famiglia, la scuola, lo sport o una carta): pagare due volte per lo stesso rischio non raddoppia il rimborso."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L4)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una polizza ha franchigia di 100 € e il danno è 80 €. Quanto rimborsa?",
        "options": [
          {
            "text": "80 €",
            "right": false,
            "why": "Con franchigia 100 € e danno 80 € il rimborso è zero."
          },
          {
            "text": "20 €",
            "right": false,
            "why": "Con franchigia 100 € e danno 80 € il rimborso è zero."
          },
          {
            "text": "100 €",
            "right": false,
            "why": "Con franchigia 100 € e danno 80 € il rimborso è zero."
          },
          {
            "text": "0 €: il danno non supera la franchigia",
            "right": true
          }
        ],
        "explain": "I tre profili che seguono sono inventati e servono a ragionare, non a consigliare prodotti."
      }
    ],
    "source": "C05-L05"
  },
  "p5-l6": {
    "id": "p5-l6",
    "code": "L6",
    "floor": 5,
    "title": "Polizze-trappola e come leggere una polizza",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Polizze-trappola e come leggere una polizza",
        "mentor": "Quali sono segnali da controllare in una polizza? a) periodo di carenza; b) il colore del logo; c) durata minima e rinnovo automatico; d) esclusioni elencate in fondo.",
        "options": [
          {
            "text": "Solo b)",
            "right": false,
            "why": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende."
          },
          {
            "text": "a) Periodo di carenza; c) durata minima e rinnovo automatico; d) esclusioni elencate in fondo",
            "right": true
          },
          {
            "text": "b) e c)",
            "right": false,
            "why": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende."
          },
          {
            "text": "Nessuno",
            "right": false,
            "why": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende."
          }
        ],
        "theory": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende. Prima di firmare si leggono quattro cose: quanto costa in totale, cosa esclude, per quanto tempo vincola e come si esce.",
        "explain": "Guardare solo il premio mensile e saltare le esclusioni, la durata minima e il costo di uscita."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "ProteggiTutto: 9 € al mese per 24 mesi più 30 € di attivazione. Costo totale?",
        "options": [
          {
            "text": "216 €",
            "right": false,
            "why": "9 × 24 = 216; 216 + 30 = 246 €."
          },
          {
            "text": "30 €",
            "right": false,
            "why": "9 × 24 = 216; 216 + 30 = 246 €."
          },
          {
            "text": "270 €",
            "right": false,
            "why": "9 × 24 = 216; 216 + 30 = 246 €."
          },
          {
            "text": "246 €",
            "right": true
          }
        ],
        "explain": "«ProteggiTutto» costa 9 € al mese, 30 € di costo di attivazione, durata minima 24 mesi, carenza 60 giorni, scoperto 20%, massimale 300 €."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il massimo rimborsabile è 300 €. Il costo totale è 246 €. Che percentuale del massimo hai pagato?",
        "options": [
          {
            "text": "30%",
            "right": false,
            "why": "246 ÷ 300 = 0,82."
          },
          {
            "text": "82%",
            "right": true
          },
          {
            "text": "100%",
            "right": false,
            "why": "246 ÷ 300 = 0,82."
          },
          {
            "text": "124%",
            "right": false,
            "why": "246 ÷ 300 = 0,82."
          }
        ],
        "explain": "Il costo totale nei 24 mesi è 9 × 24 + 30 = 246 €; il massimo rimborsabile è 300 €, quindi il costo è l'82% del massimo che si può ottenere.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Polizza da 5 € al mese per 12 mesi più 20 € di attivazione: costo totale?",
            "options": [
              {
                "text": "60 €",
                "right": false,
                "why": "5 × 12 + 20 = 80 €."
              },
              {
                "text": "20 €",
                "right": false,
                "why": "5 × 12 + 20 = 80 €."
              },
              {
                "text": "100 €",
                "right": false,
                "why": "5 × 12 + 20 = 80 €."
              },
              {
                "text": "80 €",
                "right": true
              }
            ],
            "explain": "Il costo totale nei 24 mesi è 9 × 24 + 30 = 246 €; il massimo rimborsabile è 300 €, quindi il costo è l'82% del massimo che si può ottenere."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Carenza di 60 giorni: il danno avviene al giorno 45. È coperto? E al giorno 70?",
        "options": [
          {
            "text": "Al giorno 45 sì; al giorno 70 sì",
            "right": false,
            "why": "La carenza dura 60 giorni."
          },
          {
            "text": "Al giorno 45 no (dentro la carenza); al giorno 70 sì, salvo esclusioni",
            "right": true
          },
          {
            "text": "Al giorno 45 sì; al giorno 70 no",
            "right": false,
            "why": "La carenza dura 60 giorni."
          },
          {
            "text": "Né al giorno 45 né al giorno 70",
            "right": false,
            "why": "La carenza dura 60 giorni."
          }
        ],
        "explain": "Un incidente al giorno 45 non è coperto (carenza).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Che cos’è il periodo di carenza?",
            "options": [
              {
                "text": "Un periodo iniziale in cui la copertura non vale",
                "right": true
              },
              {
                "text": "Uno sconto sul premio",
                "right": false,
                "why": "Prima dell’inizio effettivo il danno non è coperto."
              },
              {
                "text": "Il massimo rimborsabile",
                "right": false,
                "why": "Prima dell’inizio effettivo il danno non è coperto."
              },
              {
                "text": "La quota a carico dell’assicurato",
                "right": false,
                "why": "Prima dell’inizio effettivo il danno non è coperto."
              }
            ],
            "explain": "Un incidente al giorno 45 non è coperto (carenza). Guardare solo il premio mensile e saltare le esclusioni, la durata minima e il costo di uscita."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Scoperto 20%, danno 400 €, massimale 300 €. Quanto rimborsa?",
        "options": [
          {
            "text": "320 €",
            "right": false,
            "why": "20% di 400 = 80; 400 − 80 = 320, ma il massimale è 300 €."
          },
          {
            "text": "400 €",
            "right": false,
            "why": "20% di 400 = 80; 400 − 80 = 320, ma il massimale è 300 €."
          },
          {
            "text": "80 €",
            "right": false,
            "why": "20% di 400 = 80; 400 − 80 = 320, ma il massimale è 300 €."
          },
          {
            "text": "300 €",
            "right": true
          }
        ],
        "explain": "Se il danno è 400 €, lo scoperto vale 80 € e il rimborso è 320 €, ma il massimale lo porta a 300 €.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Scoperto 15%, danno 800 €, massimale 600 €: rimborso?",
            "options": [
              {
                "text": "680 €",
                "right": false,
                "why": "800 − 120 = 680, ma il massimale è 600 €."
              },
              {
                "text": "600 €",
                "right": true
              },
              {
                "text": "120 €",
                "right": false,
                "why": "800 − 120 = 680, ma il massimale è 600 €."
              },
              {
                "text": "800 €",
                "right": false,
                "why": "800 − 120 = 680, ma il massimale è 600 €."
              }
            ],
            "explain": "Se il danno è 400 €, lo scoperto vale 80 € e il rimborso è 320 €, ma il massimale lo porta a 300 €."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "In un negozio ti propongono una polizza insieme a un acquisto a rate, dicendo che è «obbligatoria». Cosa fai?",
        "options": [
          {
            "text": "Chiedo se è davvero obbligatoria, quanto costa separatamente, cosa copre e come si disdice",
            "right": true
          },
          {
            "text": "Firmo per non perdere l’offerta",
            "right": false,
            "why": "Una polizza che non nasce da un tuo bisogno va verificata."
          },
          {
            "text": "Abbandono la conversazione senza chiedere nulla",
            "right": false,
            "why": "Una polizza che non nasce da un tuo bisogno va verificata."
          },
          {
            "text": "Firmo e disdico dopo un anno",
            "right": false,
            "why": "Una polizza che non nasce da un tuo bisogno va verificata."
          }
        ],
        "explain": "Le polizze-trappola non sono necessariamente illegali: sono poco chiare o poco convenienti. Si confronta il costo totale sulla durata con il massimo che si può ottenere."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Prima di comprare una polizza, qual è la prima verifica?",
        "options": [
          {
            "text": "Firmare subito se il premio è basso",
            "right": false,
            "why": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende."
          },
          {
            "text": "Confrontare il colore del logo",
            "right": false,
            "why": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende."
          },
          {
            "text": "Chiedere un secondo preventivo uguale",
            "right": false,
            "why": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende."
          },
          {
            "text": "Controllare se il rischio è già coperto da qualcos’altro",
            "right": true
          }
        ],
        "explain": "Un incidente al giorno 45 non è coperto (carenza). Guardare solo il premio mensile e saltare le esclusioni, la durata minima e il costo di uscita."
      }
    ],
    "source": "C05-L06"
  },
  "p6-l1": {
    "id": "p6-l1",
    "code": "L1",
    "floor": 6,
    "title": "Lordo, netto e costo per chi paga",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Lordo, netto e costo per chi paga",
        "mentor": "Collega: a) lordo; b) netto; c) costo per chi paga. 1) quanto arriva sul conto; 2) retribuzione prima delle trattenute; 3) lordo più contributi a carico di chi paga.",
        "options": [
          {
            "text": "a-2, b-1, c-3",
            "right": true
          },
          {
            "text": "a-1, b-2, c-3",
            "right": false,
            "why": "Lordo = prima delle trattenute; netto = quanto arriva sul conto; costo per chi paga = lordo più contributi a suo carico."
          },
          {
            "text": "a-3, b-1, c-2",
            "right": false,
            "why": "Lordo = prima delle trattenute; netto = quanto arriva sul conto; costo per chi paga = lordo più contributi a suo carico."
          },
          {
            "text": "a-2, b-3, c-1",
            "right": false,
            "why": "Lordo = prima delle trattenute; netto = quanto arriva sul conto; costo per chi paga = lordo più contributi a suo carico."
          }
        ],
        "theory": "Il compenso scritto nel contratto (lordo) non è quello che arriva sul conto (netto), e non è nemmeno quanto costa a chi paga. Sono tre numeri diversi per la stessa persona.",
        "explain": "Il lordo è la retribuzione prima delle trattenute. Dal lordo si tolgono i contributi a carico del lavoratore (che finanziano la futura pensione e altre tutele) e le imposte sul reddito: quello che resta è il netto."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Lordo 800 €, contributi del lavoratore al 9,19%. Quanto trattengono?",
        "options": [
          {
            "text": "80 €",
            "right": false,
            "why": "800 × 0,0919 = 73,52 €."
          },
          {
            "text": "73,52 €",
            "right": true
          },
          {
            "text": "9,19 €",
            "right": false,
            "why": "800 × 0,0919 = 73,52 €."
          },
          {
            "text": "726,48 €",
            "right": false,
            "why": "800 × 0,0919 = 73,52 €."
          }
        ],
        "explain": "Chi paga, in più, versa a sua volta contributi a proprio carico: lordo più contributi del datore è il costo per chi paga."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Sul lordo meno i contributi (726,48 €) l’imposta del modello è il 23%. Quanto è?",
        "options": [
          {
            "text": "184 €",
            "right": false,
            "why": "726,48 × 0,23 = 167,09 €."
          },
          {
            "text": "167,09 €",
            "right": true
          },
          {
            "text": "23 €",
            "right": false,
            "why": "726,48 × 0,23 = 167,09 €."
          },
          {
            "text": "559,39 €",
            "right": false,
            "why": "726,48 × 0,23 = 167,09 €."
          }
        ],
        "explain": "Nelle buste paga reali le detrazioni abbassano l’imposta, quindi il netto può essere più alto. Pensare che «il bar mi dà 800 €» e restare sorpresi dai 559,39 €.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Lordo 400 € e contributi del lavoratore 9,19%: quanto trattengono?",
            "options": [
              {
                "text": "40 €",
                "right": false,
                "why": "400 × 0,0919 = 36,76 €."
              },
              {
                "text": "9,19 €",
                "right": false,
                "why": "400 × 0,0919 = 36,76 €."
              },
              {
                "text": "363,24 €",
                "right": false,
                "why": "400 × 0,0919 = 36,76 €."
              },
              {
                "text": "36,76 €",
                "right": true
              }
            ],
            "explain": "Dal lordo si tolgono i contributi a carico del lavoratore (che finanziano la futura pensione e altre tutele) e le imposte sul reddito: quello che resta è il netto."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Nadia ha un lordo di 800 €: contributi 73,52 € e imposta 167,09 €. Quanto è il netto e che percentuale del lordo viene trattenuta?",
        "options": [
          {
            "text": "Netto 559,39 €; trattenuti 240,61 € (30,1% del lordo)",
            "right": true
          },
          {
            "text": "Netto 800 €; trattenuti 0 €",
            "right": false,
            "why": "800 − 73,52 − 167,09 = 559,39 €; 240,61 ÷ 800 = 30,1%."
          },
          {
            "text": "Netto 640 €; trattenuti 160 € (20%)",
            "right": false,
            "why": "800 − 73,52 − 167,09 = 559,39 €; 240,61 ÷ 800 = 30,1%."
          },
          {
            "text": "Netto 726,48 €; trattenuti 73,52 € (9,2%)",
            "right": false,
            "why": "800 − 73,52 − 167,09 = 559,39 €; 240,61 ÷ 800 = 30,1%."
          }
        ],
        "explain": "L’altro errore è credere che le trattenute siano una perdita: una parte (i contributi) è un diritto futuro.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Lordo 1.200 €, contributi 110,28 € e imposta 250 €. Netto?",
            "options": [
              {
                "text": "1.200 €",
                "right": false,
                "why": "1.200 − 110,28 − 250 = 839,72 €."
              },
              {
                "text": "1.089,72 €",
                "right": false,
                "why": "1.200 − 110,28 − 250 = 839,72 €."
              },
              {
                "text": "360,28 €",
                "right": false,
                "why": "1.200 − 110,28 − 250 = 839,72 €."
              },
              {
                "text": "839,72 €",
                "right": true
              }
            ],
            "explain": "L’altro errore è credere che le trattenute siano una perdita: una parte (i contributi) è un diritto futuro."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il bar versa contributi del 23,81% sul lordo di 800 €. Quanto costa Nadia al bar?",
        "options": [
          {
            "text": "800 €",
            "right": false,
            "why": "800 × 0,2381 = 190,48; 800 + 190,48 = 990,48 €."
          },
          {
            "text": "190,48 €",
            "right": false,
            "why": "800 × 0,2381 = 190,48; 800 + 190,48 = 990,48 €."
          },
          {
            "text": "1.600 €",
            "right": false,
            "why": "800 × 0,2381 = 190,48; 800 + 190,48 = 990,48 €."
          },
          {
            "text": "990,48 € (800 + 190,48 di contributi)",
            "right": true
          }
        ],
        "explain": "Chi paga, in più, versa a sua volta contributi a proprio carico: lordo più contributi del datore è il costo per chi paga.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Lordo 1.800 €: con contributi del datore al 23,81%, quanto costa al datore?",
            "options": [
              {
                "text": "1.800 €",
                "right": false,
                "why": "1.800 × 0,2381 = 428,58; 1.800 + 428,58 = 2.228,58 €."
              },
              {
                "text": "428,58 €",
                "right": false,
                "why": "1.800 × 0,2381 = 428,58; 1.800 + 428,58 = 2.228,58 €."
              },
              {
                "text": "1.371,42 €",
                "right": false,
                "why": "1.800 × 0,2381 = 428,58; 1.800 + 428,58 = 2.228,58 €."
              },
              {
                "text": "2.228,58 €",
                "right": true
              }
            ],
            "explain": "Chi paga, in più, versa a sua volta contributi a proprio carico: lordo più contributi del datore è il costo per chi paga."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un altro locale propone 600 € al mese in contanti, senza contratto. Il primo propone 800 € lordi, con contratto (netto del modello 559,39 €). Cosa conviene valutare?",
        "options": [
          {
            "text": "Scegliere sempre i 600 € in contanti",
            "right": false,
            "why": "600 € sembrano più di 559,39 €, ma il lavoro senza contratto è irregolare."
          },
          {
            "text": "Confrontare tutela e netto reale, non solo la cifra del mese: senza contratto mancano contributi, infortunio, malattia e prova del lavoro",
            "right": true
          },
          {
            "text": "Scegliere sempre l’offerta con contratto, a prescindere dai numeri",
            "right": false,
            "why": "600 € sembrano più di 559,39 €, ma il lavoro senza contratto è irregolare."
          },
          {
            "text": "Non lavorare in nessuno dei due locali",
            "right": false,
            "why": "600 € sembrano più di 559,39 €, ma il lavoro senza contratto è irregolare."
          }
        ],
        "explain": "Dal lordo si tolgono i contributi a carico del lavoratore (che finanziano la futura pensione e altre tutele) e le imposte sul reddito: quello che resta è il netto."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Vero o falso: «il lordo è la somma che mi arriva sul conto».",
        "options": [
          {
            "text": "Falso: sul conto arriva il netto, dopo contributi e imposte",
            "right": true
          },
          {
            "text": "Vero: il lordo è ciò che incassi",
            "right": false,
            "why": "Il compenso scritto nel contratto (lordo) non è quello che arriva sul conto (netto), e non è nemmeno quanto costa a chi paga."
          },
          {
            "text": "Vero, ma solo per i minorenni",
            "right": false,
            "why": "Il compenso scritto nel contratto (lordo) non è quello che arriva sul conto (netto), e non è nemmeno quanto costa a chi paga."
          },
          {
            "text": "Falso: sul conto arriva il costo per chi paga",
            "right": false,
            "why": "Il compenso scritto nel contratto (lordo) non è quello che arriva sul conto (netto), e non è nemmeno quanto costa a chi paga."
          }
        ],
        "explain": "Dal lordo si tolgono i contributi a carico del lavoratore (che finanziano la futura pensione e altre tutele) e le imposte sul reddito: quello che resta è il netto."
      }
    ],
    "source": "C06-L01"
  },
  "p6-l2": {
    "id": "p6-l2",
    "code": "L2",
    "floor": 6,
    "title": "Contributi e IRPEF: dove vanno i soldi trattenuti",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Contributi e IRPEF",
        "mentor": "Collega: a) contributi; b) IRPEF. 1) finanziano pensione e tutele di chi lavora; 2) imposta sul reddito che finanzia i servizi pubblici.",
        "options": [
          {
            "text": "a-1, b-2",
            "right": true
          },
          {
            "text": "a-2, b-1",
            "right": false,
            "why": "Le trattenute sono di due tipi: i contributi, che finanziano pensione e altre tutele di chi lavora, e le imposte, che finanziano i servizi pubblici."
          },
          {
            "text": "Entrambi finanziano la pensione",
            "right": false,
            "why": "Le trattenute sono di due tipi: i contributi, che finanziano pensione e altre tutele di chi lavora, e le imposte, che finanziano i servizi pubblici."
          },
          {
            "text": "Entrambi sono imposte sul reddito",
            "right": false,
            "why": "Le trattenute sono di due tipi: i contributi, che finanziano pensione e altre tutele di chi lavora, e le imposte, che finanziano i servizi pubblici."
          }
        ],
        "theory": "Le trattenute sono di due tipi: i contributi, che finanziano pensione e altre tutele di chi lavora, e le imposte, che finanziano i servizi pubblici. L’imposta sul reddito (IRPEF) è progressiva: l’aliquota più alta si applica solo alla parte di reddito che supera la soglia, non a tutto.",
        "explain": "L’IRPEF è l’imposta sul reddito delle persone: si calcola per scaglioni."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Lordo annuo 20.000 € e contributi del lavoratore al 9,19%. Quanto vengono trattenuti?",
        "options": [
          {
            "text": "1.838 €",
            "right": true
          },
          {
            "text": "1.838 € al mese",
            "right": false,
            "why": "20.000 × 0,0919 = 1.838 €."
          },
          {
            "text": "9.190 €",
            "right": false,
            "why": "20.000 × 0,0919 = 1.838 €."
          },
          {
            "text": "18.162 €",
            "right": false,
            "why": "20.000 × 0,0919 = 1.838 €."
          }
        ],
        "explain": "I contributi vanno agli enti previdenziali (in Italia soprattutto l’INPS) e servono per pensione, malattia, maternità e altre prestazioni."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Reddito dopo i contributi: 18.162 €, tutto sotto i 28.000 €. Quanta IRPEF nel modello?",
        "options": [
          {
            "text": "IRPEF 4.600 €; netto annuo 15.400 €",
            "right": false,
            "why": "18.162 × 0,23 = 4.177,26; 20.000 − 1.838 − 4.177,26 = 13.984,74 €."
          },
          {
            "text": "IRPEF 4.177,26 €; netto annuo 18.162 €",
            "right": false,
            "why": "18.162 × 0,23 = 4.177,26; 20.000 − 1.838 − 4.177,26 = 13.984,74 €."
          },
          {
            "text": "IRPEF 4.177,26 €; netto annuo 13.984,74 €",
            "right": true
          },
          {
            "text": "IRPEF 6.440 €; netto annuo 11.722 €",
            "right": false,
            "why": "18.162 × 0,23 = 4.177,26; 20.000 − 1.838 − 4.177,26 = 13.984,74 €."
          }
        ],
        "explain": "Ogni aliquota si applica solo alla parte di reddito che cade nel suo scaglione. Oltre all’IRPEF esistono detrazioni, addizionali regionali e comunali: qui le lasciamo fuori per semplicità.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Lordo annuo 10.000 € e contributi 9,19%: quanti trattenuti?",
            "options": [
              {
                "text": "9.190 €",
                "right": false,
                "why": "10.000 × 0,0919 = 919 €."
              },
              {
                "text": "919 €",
                "right": true
              },
              {
                "text": "91,90 €",
                "right": false,
                "why": "10.000 × 0,0919 = 919 €."
              },
              {
                "text": "1.000 €",
                "right": false,
                "why": "10.000 × 0,0919 = 919 €."
              }
            ],
            "explain": "I contributi vanno agli enti previdenziali (in Italia soprattutto l’INPS) e servono per pensione, malattia, maternità e altre prestazioni."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Reddito imponibile di 38.000 € con scaglioni 23% fino a 28.000 € e 33% da 28.000 a 50.000 €. Quanta imposta?",
        "options": [
          {
            "text": "9.740 € (aliquota media 25,6%)",
            "right": true
          },
          {
            "text": "12.540 €",
            "right": false,
            "why": "28.000 × 23% = 6.440; 10.000 × 33% = 3.300; totale 9.740 €."
          },
          {
            "text": "6.440 €",
            "right": false,
            "why": "28.000 × 23% = 6.440; 10.000 × 33% = 3.300; totale 9.740 €."
          },
          {
            "text": "9.500 €",
            "right": false,
            "why": "28.000 × 23% = 6.440; 10.000 × 33% = 3.300; totale 9.740 €."
          }
        ],
        "explain": "Credere che passare a un reddito più alto «faccia perdere soldi» perché si entra in uno scaglione con aliquota maggiore.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Imponibile 20.000 € con aliquota 23%: imposta?",
            "options": [
              {
                "text": "2.000 €",
                "right": false,
                "why": "20.000 × 0,23 = 4.600 €."
              },
              {
                "text": "4.600 €",
                "right": true
              },
              {
                "text": "6.440 €",
                "right": false,
                "why": "20.000 × 0,23 = 4.600 €."
              },
              {
                "text": "20.000 €",
                "right": false,
                "why": "20.000 × 0,23 = 4.600 €."
              }
            ],
            "explain": "Credere che passare a un reddito più alto «faccia perdere soldi» perché si entra in uno scaglione con aliquota maggiore."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il reddito sale da 28.000 € a 29.000 €. Di quanto aumenta l’imposta e quanto resta dell’aumento?",
        "options": [
          {
            "text": "+1.000 €: dell’aumento non resta nulla",
            "right": false,
            "why": "Solo i 1.000 € in più sono tassati al 33%: 330 €."
          },
          {
            "text": "+330 €: dell’aumento restano 670 €",
            "right": true
          },
          {
            "text": "+230 €: dell’aumento restano 770 €",
            "right": false,
            "why": "Solo i 1.000 € in più sono tassati al 33%: 330 €."
          },
          {
            "text": "+330 €: dell’aumento restano 330 €",
            "right": false,
            "why": "Solo i 1.000 € in più sono tassati al 33%: 330 €."
          }
        ],
        "explain": "Così non è: l’aliquota più alta tocca solo l’euro in più oltre la soglia.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Imponibile 30.000 € (23% fino a 28.000, 33% oltre): imposta?",
            "options": [
              {
                "text": "9.900 €",
                "right": false,
                "why": "6.440 + 2.000 × 0,33 = 7.100 €."
              },
              {
                "text": "7.100 €",
                "right": true
              },
              {
                "text": "6.440 €",
                "right": false,
                "why": "6.440 + 2.000 × 0,33 = 7.100 €."
              },
              {
                "text": "6.900 €",
                "right": false,
                "why": "6.440 + 2.000 × 0,33 = 7.100 €."
              }
            ],
            "explain": "Così non è: l’aliquota più alta tocca solo l’euro in più oltre la soglia."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un collega dice: «meglio rifiutare un aumento: finisco nello scaglione al 33% e ci rimetto». Cosa rispondi?",
        "options": [
          {
            "text": "Hai ragione: conviene rifiutare",
            "right": false,
            "why": "L’aliquota del 33% si applica solo alla parte di reddito oltre i 28.000 €. Con un aumento il netto sale sempre, anche se meno di quanto sale il lordo."
          },
          {
            "text": "Il 33% si applica a tutto il reddito",
            "right": false,
            "why": "L’aliquota del 33% si applica solo alla parte di reddito oltre i 28.000 €. Con un aumento il netto sale sempre, anche se meno di quanto sale il lordo."
          },
          {
            "text": "Il 33% si applica solo alla parte oltre i 28.000 €: con un aumento il netto sale sempre",
            "right": true
          },
          {
            "text": "Conviene rifiutare solo se l’aumento è piccolo",
            "right": false,
            "why": "L’aliquota del 33% si applica solo alla parte di reddito oltre i 28.000 €. Con un aumento il netto sale sempre, anche se meno di quanto sale il lordo."
          }
        ],
        "explain": "Credere che passare a un reddito più alto «faccia perdere soldi» perché si entra in uno scaglione con aliquota maggiore."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Dal lordo di 800 €, con contributi del lavoratore del 9,19%, quanto è l’importo dopo i contributi?",
        "options": [
          {
            "text": "800 €",
            "right": false,
            "why": "800 − 73,52 = 726,48 €."
          },
          {
            "text": "73,52 €",
            "right": false,
            "why": "800 − 73,52 = 726,48 €."
          },
          {
            "text": "726,48 €",
            "right": true
          },
          {
            "text": "559,39 €",
            "right": false,
            "why": "800 − 73,52 = 726,48 €."
          }
        ],
        "explain": "I contributi vanno agli enti previdenziali (in Italia soprattutto l’INPS) e servono per pensione, malattia, maternità e altre prestazioni."
      }
    ],
    "source": "C06-L02"
  },
  "p6-l3": {
    "id": "p6-l3",
    "code": "L3",
    "floor": 6,
    "title": "Leggere una busta paga",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Leggere una busta paga",
        "mentor": "Quali voci riducono il netto? a) contributi del lavoratore; b) accantonamento TFR; c) imposta sul reddito; d) livello di inquadramento.",
        "options": [
          {
            "text": "a) contributi del lavoratore e c) imposta sul reddito",
            "right": true
          },
          {
            "text": "b) accantonamento TFR e d) livello di inquadramento",
            "right": false,
            "why": "A) e c). Il TFR non riduce il netto, il livello è solo un’informazione."
          },
          {
            "text": "a) e b)",
            "right": false,
            "why": "A) e c). Il TFR non riduce il netto, il livello è solo un’informazione."
          },
          {
            "text": "Tutte e quattro",
            "right": false,
            "why": "A) e c). Il TFR non riduce il netto, il livello è solo un’informazione."
          }
        ],
        "theory": "La busta paga è il documento che mostra come si arriva dal lordo al netto. Si legge dall’alto verso il basso e si può controllare con due moltiplicazioni e una sottrazione.",
        "explain": "Una busta paga ha di solito quattro blocchi: i dati (chi paga, chi riceve, il mese, il livello e il contratto collettivo applicato), la retribuzione lorda con le sue voci (stipendio base, eventuali straordinari, ferie e permessi), le trattenute (contributi del lavoratore e imposte) e il netto."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Lordo 1.800 €, contributi 165,42 €. Qual è l’imponibile fiscale?",
        "options": [
          {
            "text": "1.800 €",
            "right": false,
            "why": "1.800 − 165,42 = 1.634,58 €."
          },
          {
            "text": "1.634,58 €",
            "right": true
          },
          {
            "text": "165,42 €",
            "right": false,
            "why": "1.800 − 165,42 = 1.634,58 €."
          },
          {
            "text": "1.258,63 €",
            "right": false,
            "why": "1.800 − 165,42 = 1.634,58 €."
          }
        ],
        "explain": "Il controllo di base è: lordo − contributi = imponibile fiscale; imponibile fiscale − imposta = netto. Qui usiamo il modello semplificato di L1 e L2, senza detrazioni e addizionali: in una busta reale compaiono anche queste."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con imponibile 1.634,58 € e imposta del 23% (375,95 €), quanto è il netto?",
        "options": [
          {
            "text": "1.634,58 €",
            "right": false,
            "why": "1.800 − 165,42 − 375,95 = 1.258,63 €."
          },
          {
            "text": "375,95 €",
            "right": false,
            "why": "1.800 − 165,42 − 375,95 = 1.258,63 €."
          },
          {
            "text": "1.258,63 €",
            "right": true
          },
          {
            "text": "1.800 €",
            "right": false,
            "why": "1.800 − 165,42 − 375,95 = 1.258,63 €."
          }
        ],
        "explain": "Guardare solo il netto e non controllare mai il resto: ore, giorni di ferie, contributi e livello possono contenere errori.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Quale voce non riduce il netto in busta paga?",
            "options": [
              {
                "text": "I contributi del lavoratore",
                "right": false,
                "why": "Il TFR è un accantonamento a favore del lavoratore."
              },
              {
                "text": "L’imposta sul reddito",
                "right": false,
                "why": "Il TFR è un accantonamento a favore del lavoratore."
              },
              {
                "text": "Il TFR accantonato",
                "right": true
              },
              {
                "text": "Le addizionali",
                "right": false,
                "why": "Il TFR è un accantonamento a favore del lavoratore."
              }
            ],
            "explain": "Una busta paga ha di solito quattro blocchi: i dati (chi paga, chi riceve, il mese, il livello e il contratto collettivo applicato), la retribuzione lorda con le sue voci (stipendio base, eventuali straordinari, ferie e permessi), le trattenute (contributi del lavoratore e imposte) e il netto."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il TFR accantonato è circa un tredicesimo e mezzo del lordo (da verificare). Per 1.800 €, quanto in un mese?",
        "options": [
          {
            "text": "1.800 €",
            "right": false,
            "why": "1.800 ÷ 13,5 = 133,33 €."
          },
          {
            "text": "133,33 € al mese",
            "right": true
          },
          {
            "text": "13,50 €",
            "right": false,
            "why": "1.800 ÷ 13,5 = 133,33 €."
          },
          {
            "text": "240 €",
            "right": false,
            "why": "1.800 ÷ 13,5 = 133,33 €."
          }
        ],
        "explain": "L’altro errore è pensare che il TFR sia «trattenuto»: è un accantonamento a favore del lavoratore.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Lordo 1.000 € e contributi 91,90 €: imponibile?",
            "options": [
              {
                "text": "1.000 €",
                "right": false,
                "why": "1.000 − 91,90 = 908,10 €."
              },
              {
                "text": "91,90 €",
                "right": false,
                "why": "1.000 − 91,90 = 908,10 €."
              },
              {
                "text": "908,10 €",
                "right": true
              },
              {
                "text": "1.091,90 €",
                "right": false,
                "why": "1.000 − 91,90 = 908,10 €."
              }
            ],
            "explain": "Il controllo di base è: lordo − contributi = imponibile fiscale; imponibile fiscale − imposta = netto. Qui usiamo il modello semplificato di L1 e L2, senza detrazioni e addizionali: in una busta reale compaiono anche queste."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "Una busta indica lordo 1.800 €, trattenute 165,42 € e 375,95 €, ma netto 1.290 €. È corretta?",
        "options": [
          {
            "text": "Sì: la busta è corretta",
            "right": false,
            "why": "No. Il netto atteso è 1.258,63 €: ci sono 31,37 € in più senza una voce che li spieghi. Va chiesto un chiarimento."
          },
          {
            "text": "Sì, perché il netto è più alto",
            "right": false,
            "why": "No. Il netto atteso è 1.258,63 €: ci sono 31,37 € in più senza una voce che li spieghi. Va chiesto un chiarimento."
          },
          {
            "text": "No: il netto atteso è 1.258,63 € e ci sono 31,37 € in più senza una voce che li spieghi; va chiesto un chiarimento",
            "right": true
          },
          {
            "text": "No: il netto è 1.800 €",
            "right": false,
            "why": "No. Il netto atteso è 1.258,63 €: ci sono 31,37 € in più senza una voce che li spieghi. Va chiesto un chiarimento."
          }
        ],
        "explain": "Una busta paga ha di solito quattro blocchi: i dati (chi paga, chi riceve, il mese, il livello e il contratto collettivo applicato), la retribuzione lorda con le sue voci (stipendio base, eventuali straordinari, ferie e permessi), le trattenute (contributi del lavoratore e imposte) e il netto.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Lordo 1.500 €, contributi 137,85 € e imposta 313 €: netto?",
            "options": [
              {
                "text": "1.362,15 €",
                "right": false,
                "why": "1.500 − 137,85 − 313 = 1.049,15 €."
              },
              {
                "text": "1.500 €",
                "right": false,
                "why": "1.500 − 137,85 − 313 = 1.049,15 €."
              },
              {
                "text": "1.049,15 €",
                "right": true
              },
              {
                "text": "450,85 €",
                "right": false,
                "why": "1.500 − 137,85 − 313 = 1.049,15 €."
              }
            ],
            "explain": "Una busta paga ha di solito quattro blocchi: i dati (chi paga, chi riceve, il mese, il livello e il contratto collettivo applicato), la retribuzione lorda con le sue voci (stipendio base, eventuali straordinari, ferie e permessi), le trattenute (contributi del lavoratore e imposte) e il netto."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Nella busta mancano 6 ore di lavoro che hai fatto. Cosa fai?",
        "options": [
          {
            "text": "Lascio perdere",
            "right": false,
            "why": "Una richiesta scritta lascia traccia."
          },
          {
            "text": "Chiedo per iscritto spiegazioni all’ufficio del personale, conservo busta e appunti sulle ore",
            "right": true
          },
          {
            "text": "Mi lamento solo con i colleghi",
            "right": false,
            "why": "Una richiesta scritta lascia traccia."
          },
          {
            "text": "Smetto di lavorare",
            "right": false,
            "why": "Una richiesta scritta lascia traccia."
          }
        ],
        "explain": "Qui usiamo il modello semplificato di L1 e L2, senza detrazioni e addizionali: in una busta reale compaiono anche queste."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Reddito imponibile di 20.000 € sotto i 28.000 € con aliquota 23%: quanta imposta?",
        "options": [
          {
            "text": "20.000 €",
            "right": false,
            "why": "20.000 × 0,23 = 4.600 €."
          },
          {
            "text": "5.600 €",
            "right": false,
            "why": "20.000 × 0,23 = 4.600 €."
          },
          {
            "text": "2.300 €",
            "right": false,
            "why": "20.000 × 0,23 = 4.600 €."
          },
          {
            "text": "4.600 €",
            "right": true
          }
        ],
        "explain": "Il controllo di base è: lordo − contributi = imponibile fiscale; imponibile fiscale − imposta = netto. Qui usiamo il modello semplificato di L1 e L2, senza detrazioni e addizionali: in una busta reale compaiono anche queste."
      }
    ],
    "source": "C06-L03"
  },
  "p6-l4": {
    "id": "p6-l4",
    "code": "L4",
    "floor": 6,
    "title": "Tipi di lavoro: dipendente, autonomo, occasionale",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Tipi di lavoro",
        "mentor": "Collega: a) dipendente; b) autonomo; c) occasionale. 1) emette fatture e paga imposte e contributi da sé; 2) ha orari e direttive e il datore versa i contributi; 3) lavoro episodico con ritenuta e limiti di importo.",
        "options": [
          {
            "text": "a-1, b-2, c-3",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "a-3, b-2, c-1",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "a-2, b-3, c-1",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "a-2, b-1, c-3",
            "right": true
          }
        ],
        "theory": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero.",
        "explain": "Il lavoratore dipendente lavora per un datore, con orari e direttive: il datore versa i contributi, trattiene le imposte e ci sono ferie, malattia e altre tutele."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "Quali sono segnali di falsa autonomia? a) orari decisi dall’azienda; b) un solo cliente; c) lavori per tre clienti diversi; d) usi gli strumenti dell’azienda.",
        "options": [
          {
            "text": "a), b) e d)",
            "right": true
          },
          {
            "text": "Solo c)",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "b) e c)",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "Nessuno",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          }
        ],
        "explain": "Un tirocinio non è un lavoro: è un periodo di formazione, con indennità e regole proprie."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Dipendente, lordo 1.000 €, contributi 9,19% e imposta 23% sul resto. Quanto è il netto?",
        "options": [
          {
            "text": "1.000 €",
            "right": false,
            "why": "1.000 − 91,90 − 208,86 = 699,24 €."
          },
          {
            "text": "699,24 €",
            "right": true
          },
          {
            "text": "908,10 €",
            "right": false,
            "why": "1.000 − 91,90 − 208,86 = 699,24 €."
          },
          {
            "text": "808,10 €",
            "right": false,
            "why": "1.000 − 91,90 − 208,86 = 699,24 €."
          }
        ],
        "explain": "Confrontare le offerte guardando solo la cifra: il dipendente vede il netto sul conto, l’autonomo deve ancora pagare imposte e contributi, e chi lavora senza regole non ha tutele.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Chi versa i contributi per un lavoratore dipendente?",
            "options": [
              {
                "text": "Il datore (e il lavoratore con la trattenuta)",
                "right": true
              },
              {
                "text": "Solo il lavoratore autonomo",
                "right": false,
                "why": "Il datore versa i contributi."
              },
              {
                "text": "Il Comune",
                "right": false,
                "why": "Il datore versa i contributi."
              },
              {
                "text": "Nessuno",
                "right": false,
                "why": "Il datore versa i contributi."
              }
            ],
            "explain": "Confrontare le offerte guardando solo la cifra: il dipendente vede il netto sul conto, l’autonomo deve ancora pagare imposte e contributi, e chi lavora senza regole non ha tutele."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Prestazione occasionale da 1.000 € con ritenuta del 20% (da verificare). Quanto ricevi?",
        "options": [
          {
            "text": "Ricevi 800 € (ritenuta 200 €)",
            "right": true
          },
          {
            "text": "Ricevi 1.000 €",
            "right": false,
            "why": "20% di 1.000 = 200; 1.000 − 200 = 800 €."
          },
          {
            "text": "Ricevi 200 €",
            "right": false,
            "why": "20% di 1.000 = 200; 1.000 − 200 = 800 €."
          },
          {
            "text": "Ricevi 900 €",
            "right": false,
            "why": "20% di 1.000 = 200; 1.000 − 200 = 800 €."
          }
        ],
        "explain": "Il lavoratore autonomo (per esempio con partita IVA) organizza il proprio lavoro, emette fatture e paga da sé imposte e contributi: non ha ferie o malattia retribuite.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Prestazione occasionale da 500 € con ritenuta 20%: quanto ricevi?",
            "options": [
              {
                "text": "500 €",
                "right": false,
                "why": "500 − 100 = 400 €."
              },
              {
                "text": "100 €",
                "right": false,
                "why": "500 − 100 = 400 €."
              },
              {
                "text": "400 €",
                "right": true
              },
              {
                "text": "450 €",
                "right": false,
                "why": "500 − 100 = 400 €."
              }
            ],
            "explain": "Il lavoratore dipendente lavora per un datore, con orari e direttive: il datore versa i contributi, trattiene le imposte e ci sono ferie, malattia e altre tutele."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Autonoma: fattura 1.000 €, spese 150 €, accantonamento del 25% sul resto per imposte e contributi (cifra di esempio). Quanto resta?",
        "options": [
          {
            "text": "850 €",
            "right": false,
            "why": "1.000 − 150 = 850; 25% di 850 = 212,50; 850 − 212,50 = 637,50 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "1.000 − 150 = 850; 25% di 850 = 212,50; 850 − 212,50 = 637,50 €."
          },
          {
            "text": "212,50 €",
            "right": false,
            "why": "1.000 − 150 = 850; 25% di 850 = 212,50; 850 − 212,50 = 637,50 €."
          },
          {
            "text": "637,50 €",
            "right": true
          }
        ],
        "explain": "Il lavoratore autonomo (per esempio con partita IVA) organizza il proprio lavoro, emette fatture e paga da sé imposte e contributi: non ha ferie o malattia retribuite.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Quale è un segnale di falsa partita IVA?",
            "options": [
              {
                "text": "Tre clienti diversi",
                "right": false,
                "why": "Orari decisi dall’azienda e un solo cliente."
              },
              {
                "text": "Fatture emesse a clienti diversi",
                "right": false,
                "why": "Orari decisi dall’azienda e un solo cliente."
              },
              {
                "text": "Orario libero",
                "right": false,
                "why": "Orari decisi dall’azienda e un solo cliente."
              },
              {
                "text": "Orari fissi e un solo cliente",
                "right": true
              }
            ],
            "explain": "Il lavoratore dipendente lavora per un datore, con orari e direttive: il datore versa i contributi, trattiene le imposte e ci sono ferie, malattia e altre tutele."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Ti propongono una «partita IVA»: sei in negozio ogni giorno dalle 9 alle 17, con la divisa, per un solo cliente. Cosa fai?",
        "options": [
          {
            "text": "Accetto senza chiedere",
            "right": false,
            "why": "Orari fissi e un solo cliente sono segnali di lavoro dipendente."
          },
          {
            "text": "Chiedo se in realtà si tratta di lavoro dipendente e mi informo prima di firmare",
            "right": true
          },
          {
            "text": "Accetto ma non emetto fatture",
            "right": false,
            "why": "Orari fissi e un solo cliente sono segnali di lavoro dipendente."
          },
          {
            "text": "Accetto e poi cambio idea",
            "right": false,
            "why": "Orari fissi e un solo cliente sono segnali di lavoro dipendente."
          }
        ],
        "explain": "Il lavoratore dipendente lavora per un datore, con orari e direttive: il datore versa i contributi, trattiene le imposte e ci sono ferie, malattia e altre tutele."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "In una busta paga il TFR riduce il netto?",
        "options": [
          {
            "text": "Sì: riduce il netto",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "Sì, solo per gli autonomi",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "No: è un’imposta",
            "right": false,
            "why": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
          },
          {
            "text": "No: è un accantonamento a favore del lavoratore",
            "right": true
          }
        ],
        "explain": "Il lavoratore autonomo (per esempio con partita IVA) organizza il proprio lavoro, emette fatture e paga da sé imposte e contributi: non ha ferie o malattia retribuite."
      }
    ],
    "source": "C06-L04"
  },
  "p6-l5": {
    "id": "p6-l5",
    "code": "L5",
    "floor": 6,
    "title": "Dichiarazione dei redditi, detrazioni e famiglia",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Dichiarazione dei redditi, detrazioni e famiglia",
        "mentor": "Collega: a) detrazione; b) deduzione. 1) si sottrae dal reddito prima dell’imposta; 2) si sottrae dall’imposta già calcolata.",
        "options": [
          {
            "text": "a-1, b-2",
            "right": false,
            "why": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta."
          },
          {
            "text": "Sono la stessa cosa",
            "right": false,
            "why": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta."
          },
          {
            "text": "a-2, b-1",
            "right": true
          },
          {
            "text": "Nessuna delle due esiste",
            "right": false,
            "why": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta."
          }
        ],
        "theory": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta. Anche un lavoretto estivo può avere effetti sulla famiglia, perché chi guadagna troppo non risulta più «a carico» dei genitori.",
        "explain": "Una detrazione si sottrae dall’imposta già calcolata; una deduzione si sottrae dal reddito prima di calcolare l’imposta."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Spesa sanitaria di 1.000 € con detrazione del 19% (esempio, da verificare). Di quanto scende l’imposta?",
        "options": [
          {
            "text": "1.000 €",
            "right": false,
            "why": "1.000 × 0,19 = 190 €."
          },
          {
            "text": "19 €",
            "right": false,
            "why": "1.000 × 0,19 = 190 €."
          },
          {
            "text": "810 €",
            "right": false,
            "why": "1.000 × 0,19 = 190 €."
          },
          {
            "text": "190 € (l’imposta passa da 1.000 € a 810 €)",
            "right": true
          }
        ],
        "explain": "La dichiarazione dei redditi (per esempio il modello 730 per i lavoratori dipendenti) riepiloga i redditi dell’anno, le imposte già pagate e quelle dovute: si può risultare a credito (rimborso) o a debito."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una deduzione di 1.000 € per chi ha aliquota 23%: quanta imposta si risparmia? Meglio o peggio della detrazione del 19% sulla stessa cifra?",
        "options": [
          {
            "text": "190 €, come la detrazione",
            "right": false,
            "why": "1.000 × 0,23 = 230 €."
          },
          {
            "text": "23 €",
            "right": false,
            "why": "1.000 × 0,23 = 230 €."
          },
          {
            "text": "230 €, contro 190 € della detrazione: dipende dall’aliquota",
            "right": true
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "1.000 × 0,23 = 230 €."
          }
        ],
        "explain": "Non dire in famiglia che si ha un reddito, oppure credere che la dichiarazione serva solo «se si deve pagare»: in molti casi è la dichiarazione che porta un rimborso o una detrazione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Detrazione del 19% su 500 € di spese sanitarie: di quanto scende l’imposta?",
            "options": [
              {
                "text": "500 €",
                "right": false,
                "why": "500 × 0,19 = 95 €."
              },
              {
                "text": "19 €",
                "right": false,
                "why": "500 × 0,19 = 95 €."
              },
              {
                "text": "190 €",
                "right": false,
                "why": "500 × 0,19 = 95 €."
              },
              {
                "text": "95 €",
                "right": true
              }
            ],
            "explain": "Una detrazione si sottrae dall’imposta già calcolata; una deduzione si sottrae dal reddito prima di calcolare l’imposta."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Nadia guadagna 2.400 € in un anno. Resta a carico dei genitori con una soglia di 4.000 € (da verificare)?",
        "options": [
          {
            "text": "Sì: 2.400 € sono sotto 4.000 €, con un margine di 1.600 €",
            "right": true
          },
          {
            "text": "No: 2.400 € superano la soglia",
            "right": false,
            "why": "Sì: 2.400 € è sotto 4.000 €, con un margine di 1.600 €."
          },
          {
            "text": "Sì, ma con margine 400 €",
            "right": false,
            "why": "Sì: 2.400 € è sotto 4.000 €, con un margine di 1.600 €."
          },
          {
            "text": "No, perché ha un lavoro",
            "right": false,
            "why": "Sì: 2.400 € è sotto 4.000 €, con un margine di 1.600 €."
          }
        ],
        "explain": "Superare la soglia fa perdere ai genitori le detrazioni per quel figlio: per questo conviene parlarne in famiglia prima di accettare lavori più lunghi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Soglia a carico 4.000 €, reddito 3.200 €: margine?",
            "options": [
              {
                "text": "3.200 €",
                "right": false,
                "why": "4.000 − 3.200 = 800 €."
              },
              {
                "text": "4.000 €",
                "right": false,
                "why": "4.000 − 3.200 = 800 €."
              },
              {
                "text": "800 €",
                "right": true
              },
              {
                "text": "7.200 €",
                "right": false,
                "why": "4.000 − 3.200 = 800 €."
              }
            ],
            "explain": "Superare la soglia fa perdere ai genitori le detrazioni per quel figlio: per questo conviene parlarne in famiglia prima di accettare lavori più lunghi."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Nadia è a carico dei genitori se guadagna meno di 4.000 € l’anno (soglia da verificare). Se guadagnasse 4.500 €, di quanto supererebbe la soglia e cosa cambierebbe?",
        "options": [
          {
            "text": "500 € sopra la soglia: non sarebbe più a carico (da verificare)",
            "right": true
          },
          {
            "text": "1.600 € sopra la soglia",
            "right": false,
            "why": "4.500 − 4.000 = 500 €."
          },
          {
            "text": "Resterebbe comunque a carico",
            "right": false,
            "why": "4.500 − 4.000 = 500 €."
          },
          {
            "text": "500 € sotto la soglia",
            "right": false,
            "why": "4.500 − 4.000 = 500 €."
          }
        ],
        "explain": "Conserva sempre le ricevute di spese importanti.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Quale spesa può dare diritto a una detrazione?",
            "options": [
              {
                "text": "Un videogioco",
                "right": false,
                "why": "Le spese sanitarie rientrano di norma tra le detrazioni."
              },
              {
                "text": "Un caffè",
                "right": false,
                "why": "Le spese sanitarie rientrano di norma tra le detrazioni."
              },
              {
                "text": "Una vacanza",
                "right": false,
                "why": "Le spese sanitarie rientrano di norma tra le detrazioni."
              },
              {
                "text": "Una spesa sanitaria (da verificare)",
                "right": true
              }
            ],
            "explain": "Conserva sempre le ricevute di spese importanti. Non dire in famiglia che si ha un reddito, oppure credere che la dichiarazione serva solo «se si deve pagare»: in molti casi è la dichiarazione che porta un rimborso o una detrazione."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai un lavoretto che ti farà superare la soglia. Cosa fai?",
        "options": [
          {
            "text": "Non lo dico in famiglia",
            "right": false,
            "why": "Serve saperlo per decidere con i numeri."
          },
          {
            "text": "Rifiuto sempre i lavori",
            "right": false,
            "why": "Serve saperlo per decidere con i numeri."
          },
          {
            "text": "Ne parlo con i genitori e valutiamo insieme l’impatto sulla dichiarazione",
            "right": true
          },
          {
            "text": "Aspetto che la soglia cambi",
            "right": false,
            "why": "Serve saperlo per decidere con i numeri."
          }
        ],
        "explain": "Superare la soglia fa perdere ai genitori le detrazioni per quel figlio: per questo conviene parlarne in famiglia prima di accettare lavori più lunghi."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L4)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Chi paga imposte e contributi di un lavoratore autonomo?",
        "options": [
          {
            "text": "L’autonomo stesso, di solito con versamenti periodici",
            "right": true
          },
          {
            "text": "Sempre il cliente",
            "right": false,
            "why": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta."
          },
          {
            "text": "Il Comune",
            "right": false,
            "why": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta."
          },
          {
            "text": "Nessuno",
            "right": false,
            "why": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta."
          }
        ],
        "explain": "La dichiarazione dei redditi (per esempio il modello 730 per i lavoratori dipendenti) riepiloga i redditi dell’anno, le imposte già pagate e quelle dovute: si può risultare a credito (rimborso) o a debito."
      }
    ],
    "source": "C06-L05"
  },
  "p6-l6": {
    "id": "p6-l6",
    "code": "L6",
    "floor": 6,
    "title": "I diritti di chi lavora, lavoro nero e minori",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "I diritti di chi lavora, lavoro nero e minori",
        "mentor": "Quali di queste cose sono diritti di chi lavora regolarmente? a) un contratto o comunicazione scritta; b) contributi versati; c) restare senza prova del lavoro; d) limiti di orario.",
        "options": [
          {
            "text": "Solo c)",
            "right": false,
            "why": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia."
          },
          {
            "text": "c) e d)",
            "right": false,
            "why": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia."
          },
          {
            "text": "Nessuna",
            "right": false,
            "why": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia."
          },
          {
            "text": "a), b) e d)",
            "right": true
          }
        ],
        "theory": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia. Il lavoro senza contratto (in nero) toglie quasi tutto questo e, per i minorenni, ha regole ancora più severe.",
        "explain": "Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "Secondo le fonti consultate (da verificare), a che età si può in generale iniziare a lavorare in Italia?",
        "options": [
          {
            "text": "A 16 anni, dopo l’obbligo di istruzione; a 15 anni solo con apprendistato o alternanza (da verificare)",
            "right": true
          },
          {
            "text": "A 12 anni",
            "right": false,
            "why": "A 16 anni, dopo l’obbligo di istruzione; a 15 anni solo con apprendistato per la qualifica o alternanza scuola-lavoro."
          },
          {
            "text": "A 14 anni, senza limiti",
            "right": false,
            "why": "A 16 anni, dopo l’obbligo di istruzione; a 15 anni solo con apprendistato per la qualifica o alternanza scuola-lavoro."
          },
          {
            "text": "Solo dopo i 21 anni",
            "right": false,
            "why": "A 16 anni, dopo l’obbligo di istruzione; a 15 anni solo con apprendistato per la qualifica o alternanza scuola-lavoro."
          }
        ],
        "explain": "Pensare che il lavoro in nero «conviene a tutti» perché il netto sembra più alto: il costo arriva dopo, in caso di problemi, e ricade quasi sempre sul lavoratore."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Giada guadagna 40 € a sabato. Quanti euro in un mese di 4 sabati e in 10 mesi?",
        "options": [
          {
            "text": "40 € e 400 €",
            "right": false,
            "why": "4 × 40 = 160; 160 × 10 = 1.600 €."
          },
          {
            "text": "160 € e 160 €",
            "right": false,
            "why": "4 × 40 = 160; 160 × 10 = 1.600 €."
          },
          {
            "text": "1.600 € al mese",
            "right": false,
            "why": "4 × 40 = 160; 160 × 10 = 1.600 €."
          },
          {
            "text": "160 € al mese e 1.600 € in 10 mesi, senza contributi",
            "right": true
          }
        ],
        "explain": "Orari, riposi e ferie hanno limiti di legge.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un lavoro in nero toglie quale tutela?",
            "options": [
              {
                "text": "Nessuna",
                "right": false,
                "why": "Senza contratto mancano contributi, infortunio e prova del lavoro."
              },
              {
                "text": "Solo le ferie",
                "right": false,
                "why": "Senza contratto mancano contributi, infortunio e prova del lavoro."
              },
              {
                "text": "Solo il caffè",
                "right": false,
                "why": "Senza contratto mancano contributi, infortunio e prova del lavoro."
              },
              {
                "text": "Contributi e prova del lavoro",
                "right": true
              }
            ],
            "explain": "Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Per un minorenne l’orario massimo è di 8 ore al giorno e 40 a settimana. Giada lavora 9 ore il sabato: di quanto supera il limite giornaliero?",
        "options": [
          {
            "text": "9 ore",
            "right": false,
            "why": "9 − 8 = 1 ora oltre il limite giornaliero."
          },
          {
            "text": "1 ora (9 − 8)",
            "right": true
          },
          {
            "text": "8 ore",
            "right": false,
            "why": "9 − 8 = 1 ora oltre il limite giornaliero."
          },
          {
            "text": "0 ore",
            "right": false,
            "why": "9 − 8 = 1 ora oltre il limite giornaliero."
          }
        ],
        "explain": "Orari, riposi e ferie hanno limiti di legge. Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "40 € a sabato per 6 sabati: totale?",
            "options": [
              {
                "text": "240 €",
                "right": true
              },
              {
                "text": "40 €",
                "right": false,
                "why": "40 × 6 = 240 €."
              },
              {
                "text": "120 €",
                "right": false,
                "why": "40 × 6 = 240 €."
              },
              {
                "text": "600 €",
                "right": false,
                "why": "40 × 6 = 240 €."
              }
            ],
            "explain": "Orari, riposi e ferie hanno limiti di legge. Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": null,
        "mentor": "Vero o falso: «se il lavoro in nero mi dà più soldi oggi, non ho nulla da perdere».",
        "options": [
          {
            "text": "Vero: più soldi oggi e nessuna perdita",
            "right": false,
            "why": "Falso. Senza contratto e contributi mancano tutele in caso di infortunio, prova del lavoro e pensione futura."
          },
          {
            "text": "Falso: senza contratto e contributi mancano tutele per infortunio, prova del lavoro e pensione futura",
            "right": true
          },
          {
            "text": "Vero, se il lavoro dura poco",
            "right": false,
            "why": "Falso. Senza contratto e contributi mancano tutele in caso di infortunio, prova del lavoro e pensione futura."
          },
          {
            "text": "Falso: il lavoro in nero non esiste",
            "right": false,
            "why": "Falso. Senza contratto e contributi mancano tutele in caso di infortunio, prova del lavoro e pensione futura."
          }
        ],
        "explain": "Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cosa fai se il datore rifiuta un contratto scritto?",
            "options": [
              {
                "text": "Accetto: va bene",
                "right": false,
                "why": "Il rifiuto è un segnale."
              },
              {
                "text": "Lavoro di più",
                "right": false,
                "why": "Il rifiuto è un segnale."
              },
              {
                "text": "Lo considero un segnale di lavoro irregolare e mi informo",
                "right": true
              },
              {
                "text": "Chiedo meno soldi",
                "right": false,
                "why": "Il rifiuto è un segnale."
              }
            ],
            "explain": "Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Ti offrono 40 € a giornata in contanti, senza contratto. Cosa fai?",
        "options": [
          {
            "text": "Accetto, tanto sono soldi",
            "right": false,
            "why": "Se il datore rifiuta, è un segnale che il lavoro non è regolare."
          },
          {
            "text": "Accetto ma non lo dico a nessuno",
            "right": false,
            "why": "Se il datore rifiuta, è un segnale che il lavoro non è regolare."
          },
          {
            "text": "Chiedo un contratto regolare e ne parlo con i genitori o un servizio di orientamento",
            "right": true
          },
          {
            "text": "Accetto se pagano di più",
            "right": false,
            "why": "Se il datore rifiuta, è un segnale che il lavoro non è regolare."
          }
        ],
        "explain": "Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un reddito di 2.400 € fa perdere la condizione di figlio a carico con soglia di 4.000 € (da verificare)?",
        "options": [
          {
            "text": "Sì: la supera di 1.600 €",
            "right": false,
            "why": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia."
          },
          {
            "text": "No: è sotto la soglia",
            "right": true
          },
          {
            "text": "Sì: 2.400 € superano 4.000 €",
            "right": false,
            "why": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia."
          },
          {
            "text": "Dipende dal mese",
            "right": false,
            "why": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia."
          }
        ],
        "explain": "Orari, riposi e ferie hanno limiti di legge. Il lavoro nero è un’attività senza contratto né contributi: se ti fai male non hai la copertura prevista, non maturi pensione e non hai prova del lavoro svolto."
      }
    ],
    "source": "C06-L06"
  },
  "p7-l1": {
    "id": "p7-l1",
    "code": "L1",
    "floor": 7,
    "title": "Quanto costa studiare",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Quanto costa studiare",
        "mentor": "Collega: a) tasse universitarie; b) affitto; c) libri. 1) costo di vita; 2) costo diretto di studio; 3) costo di materiali.",
        "options": [
          {
            "text": "a-1, b-2, c-3",
            "right": false,
            "why": "Le tasse sono un costo diretto di studio, l’affitto è costo di vita, i libri sono materiali."
          },
          {
            "text": "a-2, b-1, c-3",
            "right": true
          },
          {
            "text": "a-3, b-1, c-2",
            "right": false,
            "why": "Le tasse sono un costo diretto di studio, l’affitto è costo di vita, i libri sono materiali."
          },
          {
            "text": "a-2, b-3, c-1",
            "right": false,
            "why": "Le tasse sono un costo diretto di studio, l’affitto è costo di vita, i libri sono materiali."
          }
        ],
        "theory": "Il costo di un percorso di studi non è solo la tassa: ci sono i materiali, gli spostamenti e, se si studia lontano da casa, l’affitto e la vita quotidiana. Spesso le spese di vita pesano più delle tasse.",
        "explain": "Si distinguono i costi diretti (tasse e contributi, libri e materiali, trasporti) e i costi di vita (affitto, cibo, bollette, quando si vive fuori sede)."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Tasse 1.200 €, libri 300 €, trasporti 400 €: quanto costa un anno vicino a casa?",
        "options": [
          {
            "text": "1.900 €",
            "right": true
          },
          {
            "text": "1.500 €",
            "right": false,
            "why": "1.200 + 300 + 400 = 1.900 €."
          },
          {
            "text": "1.200 €",
            "right": false,
            "why": "1.200 + 300 + 400 = 1.900 €."
          },
          {
            "text": "2.300 €",
            "right": false,
            "why": "1.200 + 300 + 400 = 1.900 €."
          }
        ],
        "explain": "Per stimare il totale si calcola un costo annuo e lo si moltiplica per gli anni del percorso. Poi si controlla da dove arrivano i soldi: famiglia, lavoro, borse di studio, prestiti (L4, L5)."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un anno vicino a casa costa 1.900 € (tasse 1.200, libri 300, trasporti 400). Quanto costano tre anni?",
        "options": [
          {
            "text": "1.900 €",
            "right": false,
            "why": "1.900 × 3 = 5.700 €."
          },
          {
            "text": "5.700 €",
            "right": true
          },
          {
            "text": "3.800 €",
            "right": false,
            "why": "1.900 × 3 = 5.700 €."
          },
          {
            "text": "7.600 €",
            "right": false,
            "why": "1.900 × 3 = 5.700 €."
          }
        ],
        "explain": "Un costo meno visibile è quello opportunità: i mesi in cui non si lavora perché si studia; lo citiamo ma non lo calcoliamo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un master costa 1.500 € di tasse e 300 € di libri all’anno per due anni. Totale?",
            "options": [
              {
                "text": "3.600 €",
                "right": true
              },
              {
                "text": "1.800 €",
                "right": false,
                "why": "(1.500 + 300) × 2 = 3.600 €."
              },
              {
                "text": "3.000 €",
                "right": false,
                "why": "(1.500 + 300) × 2 = 3.600 €."
              },
              {
                "text": "900 €",
                "right": false,
                "why": "(1.500 + 300) × 2 = 3.600 €."
              }
            ],
            "explain": "Per stimare il totale si calcola un costo annuo e lo si moltiplica per gli anni del percorso. Poi si controlla da dove arrivano i soldi: famiglia, lavoro, borse di studio, prestiti (L4, L5)."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Fuori sede: affitto 350 € e spese di vita 250 € al mese per 10 mesi, più tasse 1.200 € e libri 300 €. Quanto costa un anno?",
        "options": [
          {
            "text": "6.000 € l’anno; 18.000 € in tre anni",
            "right": false,
            "why": "(350 + 250) × 10 = 6.000; 6.000 + 1.200 + 300 = 7.500 €."
          },
          {
            "text": "7.500 € l’anno; 22.500 € in tre anni",
            "right": true
          },
          {
            "text": "7.500 € l’anno; 7.500 € in tre anni",
            "right": false,
            "why": "(350 + 250) × 10 = 6.000; 6.000 + 1.200 + 300 = 7.500 €."
          },
          {
            "text": "9.000 € l’anno; 27.000 € in tre anni",
            "right": false,
            "why": "(350 + 250) × 10 = 6.000; 6.000 + 1.200 + 300 = 7.500 €."
          }
        ],
        "explain": "Guardare solo la retta e dimenticare affitto e spostamenti, oppure pensare che i costi siano fissi: cambiano molto tra città e atenei.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Affitto 380 € e vita 220 € al mese per 10 mesi, più 1.000 € di tasse. Costo dell’anno?",
            "options": [
              {
                "text": "7.000 €",
                "right": true
              },
              {
                "text": "6.000 €",
                "right": false,
                "why": "600 × 10 + 1.000 = 7.000 €."
              },
              {
                "text": "600 €",
                "right": false,
                "why": "600 × 10 + 1.000 = 7.000 €."
              },
              {
                "text": "10.000 €",
                "right": false,
                "why": "600 × 10 + 1.000 = 7.000 €."
              }
            ],
            "explain": "Guardare solo la retta e dimenticare affitto e spostamenti, oppure pensare che i costi siano fissi: cambiano molto tra città e atenei."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Vicino a casa tre anni costano 5.700 €, fuori sede 22.500 €. Quanto costa in più studiare fuori sede in tre anni e quanta parte della differenza sono spese di vita?",
        "options": [
          {
            "text": "5.700 € in più",
            "right": false,
            "why": "22.500 − 5.700 = 16.800 €."
          },
          {
            "text": "22.500 € in più",
            "right": false,
            "why": "22.500 − 5.700 = 16.800 €."
          },
          {
            "text": "6.000 € in più",
            "right": false,
            "why": "22.500 − 5.700 = 16.800 €."
          },
          {
            "text": "16.800 € in più (22.500 − 5.700): a pesare è il costo di vivere altrove",
            "right": true
          }
        ],
        "explain": "Gli importi usati qui sono ipotesi di studio, non i prezzi di un ateneo reale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Corso serale 2.400 € l’anno per 2 anni più 200 € di materiali l’anno. Totale?",
            "options": [
              {
                "text": "4.800 €",
                "right": false,
                "why": "(2.400 + 200) × 2 = 5.200 €."
              },
              {
                "text": "2.600 €",
                "right": false,
                "why": "(2.400 + 200) × 2 = 5.200 €."
              },
              {
                "text": "400 €",
                "right": false,
                "why": "(2.400 + 200) × 2 = 5.200 €."
              },
              {
                "text": "5.200 €",
                "right": true
              }
            ],
            "explain": "Per stimare il totale si calcola un costo annuo e lo si moltiplica per gli anni del percorso. Poi si controlla da dove arrivano i soldi: famiglia, lavoro, borse di studio, prestiti (L4, L5)."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Elia ha 6.000 € messi da parte e la famiglia può aiutarlo con 150 € al mese. I percorsi costano 5.700 € (vicino a casa) e 22.500 € (fuori sede) in tre anni. Quale può sostenere senza prestiti e quali strade può cercare per coprire il resto?",
        "options": [
          {
            "text": "Fuori sede: 22.500 € sono coperti da 6.000 € più 150 € al mese",
            "right": false,
            "why": "Il costo di un percorso di studi non è solo la tassa: ci sono i materiali, gli spostamenti e, se si studia lontano da casa, l’affitto e la vita quotidiana."
          },
          {
            "text": "Nessuno dei due è sostenibile",
            "right": false,
            "why": "Il costo di un percorso di studi non è solo la tassa: ci sono i materiali, gli spostamenti e, se si studia lontano da casa, l’affitto e la vita quotidiana."
          },
          {
            "text": "Entrambi senza bisogno di aiuti",
            "right": false,
            "why": "Il costo di un percorso di studi non è solo la tassa: ci sono i materiali, gli spostamenti e, se si studia lontano da casa, l’affitto e la vita quotidiana."
          },
          {
            "text": "Vicino a casa (5.700 €) è coperto dai risparmi; fuori sede (22.500 €) richiede borse, lavoro o prestiti",
            "right": true
          }
        ],
        "explain": "Poi si controlla da dove arrivano i soldi: famiglia, lavoro, borse di studio, prestiti (L4, L5). Un costo meno visibile è quello opportunità: i mesi in cui non si lavora perché si studia; lo citiamo ma non lo calcoliamo."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un piano per 5.700 € in 36 mesi richiede quanto al mese?",
        "options": [
          {
            "text": "190 € al mese",
            "right": false,
            "why": "5.700 ÷ 36 = 158,33 €."
          },
          {
            "text": "5.700 € al mese",
            "right": false,
            "why": "5.700 ÷ 36 = 158,33 €."
          },
          {
            "text": "158,33 € al mese",
            "right": true
          },
          {
            "text": "15,83 € al mese",
            "right": false,
            "why": "5.700 ÷ 36 = 158,33 €."
          }
        ],
        "explain": "Un costo meno visibile è quello opportunità: i mesi in cui non si lavora perché si studia; lo citiamo ma non lo calcoliamo."
      }
    ],
    "source": "C07-L01"
  },
  "p7-l2": {
    "id": "p7-l2",
    "code": "L2",
    "floor": 7,
    "title": "L’ISEE: come si calcola e a cosa serve",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "L’ISEE",
        "mentor": "Cosa tiene conto l’ISEE oltre al reddito? a) il patrimonio; b) il numero dei componenti; c) il voto di maturità.",
        "options": [
          {
            "text": "Solo c)",
            "right": false,
            "why": "L’ISEE è un numero che misura la situazione economica di una famiglia, non solo il reddito: tiene conto anche del patrimonio e di quante persone compongono il nucleo."
          },
          {
            "text": "b) e c)",
            "right": false,
            "why": "L’ISEE è un numero che misura la situazione economica di una famiglia, non solo il reddito: tiene conto anche del patrimonio e di quante persone compongono il nucleo."
          },
          {
            "text": "Solo a)",
            "right": false,
            "why": "L’ISEE è un numero che misura la situazione economica di una famiglia, non solo il reddito: tiene conto anche del patrimonio e di quante persone compongono il nucleo."
          },
          {
            "text": "a) e b)",
            "right": true
          }
        ],
        "theory": "L’ISEE è un numero che misura la situazione economica di una famiglia, non solo il reddito: tiene conto anche del patrimonio e di quante persone compongono il nucleo. Serve per accedere a tasse ridotte, borse di studio e altre agevolazioni.",
        "explain": "Pensare che l’ISEE sia il reddito: è un indicatore che include patrimonio e composizione del nucleo."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Reddito 30.000 € e patrimonio 20.000 €, di cui conta il 20%. Quanto è l’ISE?",
        "options": [
          {
            "text": "50.000 €",
            "right": false,
            "why": "30.000 + 20% di 20.000 = 34.000 €."
          },
          {
            "text": "34.000 €",
            "right": true
          },
          {
            "text": "30.000 €",
            "right": false,
            "why": "30.000 + 20% di 20.000 = 34.000 €."
          },
          {
            "text": "54.000 €",
            "right": false,
            "why": "30.000 + 20% di 20.000 = 34.000 €."
          }
        ],
        "explain": "Primo: l’ISE (indicatore della situazione economica) è la somma dei redditi del nucleo e del 20% del patrimonio (mobiliare e immobiliare, al netto di franchigie e detrazioni che qui trascuriamo)."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una famiglia ha ISE 34.000 € e 4 componenti (parametro 2,46). Quanto è l’ISEE?",
        "options": [
          {
            "text": "34.000 €",
            "right": false,
            "why": "34.000 ÷ 2,46 = 13.821,14 €."
          },
          {
            "text": "8.292,68 €",
            "right": false,
            "why": "34.000 ÷ 2,46 = 13.821,14 €."
          },
          {
            "text": "13.821,14 €",
            "right": true
          },
          {
            "text": "16.666,67 €",
            "right": false,
            "why": "34.000 ÷ 2,46 = 13.821,14 €."
          }
        ],
        "explain": "A parità di reddito, una famiglia più numerosa ha quindi un ISEE più basso. L’ISEE si ottiene presentando una DSU (dichiarazione sostitutiva unica) all’INPS o tramite CAF.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "L’ISEE misura soltanto il reddito?",
            "options": [
              {
                "text": "Sì: solo il reddito",
                "right": false,
                "why": "L’ISEE considera reddito, patrimonio e nucleo."
              },
              {
                "text": "Sì: solo il patrimonio",
                "right": false,
                "why": "L’ISEE considera reddito, patrimonio e nucleo."
              },
              {
                "text": "No: tiene conto anche di patrimonio e componenti",
                "right": true
              },
              {
                "text": "No: solo i voti",
                "right": false,
                "why": "L’ISEE considera reddito, patrimonio e nucleo."
              }
            ],
            "explain": "Pensare che l’ISEE sia il reddito: è un indicatore che include patrimonio e composizione del nucleo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una famiglia ha ISE 34.000 € e 3 componenti (parametro 2,04). Quanto è l’ISEE?",
        "options": [
          {
            "text": "11.929,82 €",
            "right": false,
            "why": "34.000 ÷ 2,04 = 16.666,67 €."
          },
          {
            "text": "13.821,14 €",
            "right": false,
            "why": "34.000 ÷ 2,04 = 16.666,67 €."
          },
          {
            "text": "10.000 €",
            "right": false,
            "why": "34.000 ÷ 2,04 = 16.666,67 €."
          },
          {
            "text": "16.666,67 €: meno persone, ISEE più alto",
            "right": true
          }
        ],
        "explain": "A parità di reddito, una famiglia più numerosa ha quindi un ISEE più basso. L’ISEE si ottiene presentando una DSU (dichiarazione sostitutiva unica) all’INPS o tramite CAF.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "ISE 24.000 € con parametro 2,04: ISEE?",
            "options": [
              {
                "text": "24.000 €",
                "right": false,
                "why": "24.000 ÷ 2,04 = 11.764,71 €."
              },
              {
                "text": "48.960 €",
                "right": false,
                "why": "24.000 ÷ 2,04 = 11.764,71 €."
              },
              {
                "text": "11.764,71 €",
                "right": true
              },
              {
                "text": "2,04 €",
                "right": false,
                "why": "24.000 ÷ 2,04 = 11.764,71 €."
              }
            ],
            "explain": "A parità di reddito, una famiglia più numerosa ha quindi un ISEE più basso. L’ISEE si ottiene presentando una DSU (dichiarazione sostitutiva unica) all’INPS o tramite CAF."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una famiglia ha ISE 34.000 € e 5 componenti (parametro 2,85). Quanto è l’ISEE?",
        "options": [
          {
            "text": "16.666,67 €",
            "right": false,
            "why": "34.000 ÷ 2,85 = 11.929,82 €."
          },
          {
            "text": "13.821,14 €",
            "right": false,
            "why": "34.000 ÷ 2,85 = 11.929,82 €."
          },
          {
            "text": "11.929,82 €",
            "right": true
          },
          {
            "text": "170.000 €",
            "right": false,
            "why": "34.000 ÷ 2,85 = 11.929,82 €."
          }
        ],
        "explain": "A parità di reddito, una famiglia più numerosa ha quindi un ISEE più basso. L’ISEE si ottiene presentando una DSU (dichiarazione sostitutiva unica) all’INPS o tramite CAF.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Reddito 22.000 € e patrimonio 10.000 € (conta il 20%): ISE?",
            "options": [
              {
                "text": "32.000 €",
                "right": false,
                "why": "22.000 + 2.000 = 24.000 €."
              },
              {
                "text": "22.000 €",
                "right": false,
                "why": "22.000 + 2.000 = 24.000 €."
              },
              {
                "text": "2.000 €",
                "right": false,
                "why": "22.000 + 2.000 = 24.000 €."
              },
              {
                "text": "24.000 €",
                "right": true
              }
            ],
            "explain": "A parità di reddito, una famiglia più numerosa ha quindi un ISEE più basso. L’ISEE si ottiene presentando una DSU (dichiarazione sostitutiva unica) all’INPS o tramite CAF."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Una borsa richiede ISEE fino a 15.000 €. La famiglia di 4 persone ha patrimonio 20.000 €. Fino a quale reddito resta sotto la soglia?",
        "options": [
          {
            "text": "Fino a 36.900 € di reddito",
            "right": false,
            "why": "ISE massimo = 15.000 × 2,46 = 36.900 €; il patrimonio conta 4.000 €, quindi il reddito può arrivare a 32.900 €: oltre i 2.900 € in più rispetto a oggi si esce dalla soglia. Va controllato prima di accettare un lavoro in più in famiglia, ma senza rinunciare a un aumento solo per la soglia: i numeri decidono."
          },
          {
            "text": "Fino a 15.000 € di reddito",
            "right": false,
            "why": "ISE massimo = 15.000 × 2,46 = 36.900 €; il patrimonio conta 4.000 €, quindi il reddito può arrivare a 32.900 €: oltre i 2.900 € in più rispetto a oggi si esce dalla soglia. Va controllato prima di accettare un lavoro in più in famiglia, ma senza rinunciare a un aumento solo per la soglia: i numeri decidono."
          },
          {
            "text": "Fino a 20.000 € di reddito",
            "right": false,
            "why": "ISE massimo = 15.000 × 2,46 = 36.900 €; il patrimonio conta 4.000 €, quindi il reddito può arrivare a 32.900 €: oltre i 2.900 € in più rispetto a oggi si esce dalla soglia. Va controllato prima di accettare un lavoro in più in famiglia, ma senza rinunciare a un aumento solo per la soglia: i numeri decidono."
          },
          {
            "text": "Fino a 32.900 € di reddito (ISE massimo 36.900 € meno 4.000 € di patrimonio)",
            "right": true
          }
        ],
        "explain": "A parità di reddito, una famiglia più numerosa ha quindi un ISEE più basso. L’ISEE si ottiene presentando una DSU (dichiarazione sostitutiva unica) all’INPS o tramite CAF."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un percorso costa 7.500 € l’anno per 3 anni: totale?",
        "options": [
          {
            "text": "7.500 €",
            "right": false,
            "why": "7.500 × 3 = 22.500 €."
          },
          {
            "text": "22.500 €",
            "right": true
          },
          {
            "text": "67.500 €",
            "right": false,
            "why": "7.500 × 3 = 22.500 €."
          },
          {
            "text": "10.500 €",
            "right": false,
            "why": "7.500 × 3 = 22.500 €."
          }
        ],
        "explain": "Primo: l’ISE (indicatore della situazione economica) è la somma dei redditi del nucleo e del 20% del patrimonio (mobiliare e immobiliare, al netto di franchigie e detrazioni che qui trascuriamo)."
      }
    ],
    "source": "C07-L02"
  },
  "p7-l3": {
    "id": "p7-l3",
    "code": "L3",
    "floor": 7,
    "title": "Tasse universitarie e fasce ISEE",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Tasse universitarie e fasce ISEE",
        "mentor": "Perché conviene presentare la DSU anche se si pensa di non avere diritto a una borsa?",
        "options": [
          {
            "text": "Perché la DSU è obbligatoria per tutti",
            "right": false,
            "why": "Perché l’ISEE può abbassare le tasse e dare accesso a esoneri e riduzioni; senza ISEE di solito si paga la fascia massima (da verificare sul regolamento)."
          },
          {
            "text": "Perché l’ISEE può abbassare le tasse e dare accesso a esoneri; senza ISEE di solito si paga la fascia massima (da verificare)",
            "right": true
          },
          {
            "text": "Perché fa guadagnare interessi",
            "right": false,
            "why": "Perché l’ISEE può abbassare le tasse e dare accesso a esoneri e riduzioni; senza ISEE di solito si paga la fascia massima (da verificare sul regolamento)."
          },
          {
            "text": "Non conviene mai",
            "right": false,
            "why": "Perché l’ISEE può abbassare le tasse e dare accesso a esoneri e riduzioni; senza ISEE di solito si paga la fascia massima (da verificare sul regolamento)."
          }
        ],
        "theory": "Molti atenei fanno pagare tasse diverse a seconda dell’ISEE: chi ha un ISEE basso paga meno o niente, chi ha un ISEE alto paga di più. Conoscere la propria fascia permette di stimare la spesa e di vedere quanto vale presentare la DSU in tempo.",
        "explain": "Non presentare la DSU entro i termini e pagare la tassa massima, oppure dare per scontato che esista un’agevolazione senza controllarla sul regolamento."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "ISEE 13.821,14 €. Tabella tasse annue dell’ateneo (fittizio): fino a 10.000 € → 0 €; da 10.000,01 a 20.000 € → 600 €; da 20.000,01 a 30.000 € → 1.200 €; oltre 30.000 € → 2.000 €. Quanta tassa annua si paga?",
        "options": [
          {
            "text": "1.200 €",
            "right": false,
            "why": "L’ISEE 13.821,14 € rientra nella fascia 10.000,01–20.000 €: 600 € l’anno."
          },
          {
            "text": "2.000 €",
            "right": false,
            "why": "L’ISEE 13.821,14 € rientra nella fascia 10.000,01–20.000 €: 600 € l’anno."
          },
          {
            "text": "600 €",
            "right": true
          },
          {
            "text": "0 €",
            "right": false,
            "why": "L’ISEE 13.821,14 € rientra nella fascia 10.000,01–20.000 €: 600 € l’anno."
          }
        ],
        "explain": "Tabella dell’ateneo fittizio (tassa annua). ISEE Tassa annua fino a 10.000 € 0 € da 10.000,01 a 20.000 € 600 € da 20.000,01 a 30.000 € 1.200 € oltre 30.000 € 2.000 €"
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una famiglia paga 600 € l’anno di tasse (fascia 10.000,01–20.000 €). Quanto risparmia in tre anni rispetto alla tassa massima di 2.000 € l’anno?",
        "options": [
          {
            "text": "4.200 €",
            "right": true
          },
          {
            "text": "1.400 €",
            "right": false,
            "why": "(2.000 − 600) × 3 = 4.200 €."
          },
          {
            "text": "1.800 €",
            "right": false,
            "why": "(2.000 − 600) × 3 = 4.200 €."
          },
          {
            "text": "6.000 €",
            "right": false,
            "why": "(2.000 − 600) × 3 = 4.200 €."
          }
        ],
        "explain": "Attenzione agli effetti a soglia: in una tabella a fasce, un euro di ISEE in più può far passare alla fascia successiva e cambiare la tassa di molto; molti atenei usano invece formule continue, e le regole vanno sempre lette sul regolamento del proprio ateneo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Tassa 600 € contro 2.000 €: quanto risparmi in due anni?",
            "options": [
              {
                "text": "2.800 €",
                "right": true
              },
              {
                "text": "1.400 €",
                "right": false,
                "why": "(2.000 − 600) × 2 = 2.800 €."
              },
              {
                "text": "600 €",
                "right": false,
                "why": "(2.000 − 600) × 2 = 2.800 €."
              },
              {
                "text": "4.000 €",
                "right": false,
                "why": "(2.000 − 600) × 2 = 2.800 €."
              }
            ],
            "explain": "Attenzione agli effetti a soglia: in una tabella a fasce, un euro di ISEE in più può far passare alla fascia successiva e cambiare la tassa di molto; molti atenei usano invece formule continue, e le regole vanno sempre lette sul regolamento del proprio ateneo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con ISE 34.000 € e 3 componenti l’ISEE è 16.666,67 €. Tabella tasse annue dell’ateneo (fittizio): fino a 10.000 € → 0 €; da 10.000,01 a 20.000 € → 600 €; da 20.000,01 a 30.000 € → 1.200 €; oltre 30.000 € → 2.000 €. In quale fascia rientra e quanta tassa paga?",
        "options": [
          {
            "text": "Nella stessa fascia (10.000,01–20.000 €): 600 €",
            "right": true
          },
          {
            "text": "In una fascia più alta: 1.200 €",
            "right": false,
            "why": "16.666,67 € resta tra 10.000,01 e 20.000 €."
          },
          {
            "text": "In una fascia più bassa: 0 €",
            "right": false,
            "why": "16.666,67 € resta tra 10.000,01 e 20.000 €."
          },
          {
            "text": "Nessuna fascia",
            "right": false,
            "why": "16.666,67 € resta tra 10.000,01 e 20.000 €."
          }
        ],
        "explain": "In questo capitolo usiamo una tabella di un ateneo inventato per far esercitare il calcolo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché si presenta la DSU?",
            "options": [
              {
                "text": "Per pagare di più",
                "right": false,
                "why": "L’ISEE può abbassare le tasse."
              },
              {
                "text": "Per avere un ISEE e accedere a riduzioni",
                "right": true
              },
              {
                "text": "Per perdere la borsa",
                "right": false,
                "why": "L’ISEE può abbassare le tasse."
              },
              {
                "text": "Non serve a nulla",
                "right": false,
                "why": "L’ISEE può abbassare le tasse."
              }
            ],
            "explain": "ISEE Tassa annua fino a 10.000 € 0 € da 10.000,01 a 20.000 € 600 € da 20.000,01 a 30.000 € 1.200 € oltre 30.000 € 2.000 €"
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un ISEE di 20.000 € paga 600 €; uno di 20.001 € paga 1.200 €. Di quanto aumenta la tassa per 1 € di ISEE in più?",
        "options": [
          {
            "text": "1 € in più",
            "right": false,
            "why": "1.200 − 600 = 600 €."
          },
          {
            "text": "6 € in più",
            "right": false,
            "why": "1.200 − 600 = 600 €."
          },
          {
            "text": "0 €",
            "right": false,
            "why": "1.200 − 600 = 600 €."
          },
          {
            "text": "600 € in più per 1 € di ISEE: effetto a soglia delle fasce",
            "right": true
          }
        ],
        "explain": "Per ottenere le agevolazioni di solito serve presentare la DSU e l’ISEE entro le date indicate.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "ISEE 20.001 € paga 1.200 €; 20.000 € paga 600 €. Differenza?",
            "options": [
              {
                "text": "1 €",
                "right": false,
                "why": "1.200 − 600 = 600 €."
              },
              {
                "text": "600 €",
                "right": true
              },
              {
                "text": "1.200 €",
                "right": false,
                "why": "1.200 − 600 = 600 €."
              },
              {
                "text": "0 €",
                "right": false,
                "why": "1.200 − 600 = 600 €."
              }
            ],
            "explain": "Per ottenere le agevolazioni di solito serve presentare la DSU e l’ISEE entro le date indicate."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "La tua DSU dà ISEE 20.150 €. Con la tabella dell’ateneo fittizio, fino a 20.000 € si pagano 600 € e oltre 1.200 €. Cosa fai?",
        "options": [
          {
            "text": "Tolgo un conto dalla dichiarazione per scendere sotto 20.000 €",
            "right": false,
            "why": "Omettere dati nella DSU è una dichiarazione falsa."
          },
          {
            "text": "Rinuncio all’agevolazione",
            "right": false,
            "why": "Omettere dati nella DSU è una dichiarazione falsa."
          },
          {
            "text": "Ne parlo con un amico e non faccio nulla",
            "right": false,
            "why": "Omettere dati nella DSU è una dichiarazione falsa."
          },
          {
            "text": "Controllo che i dati siano corretti e completi e verifico se c’è una variazione recente che permette di aggiornare l’ISEE",
            "right": true
          }
        ],
        "explain": "Esistono anche esoneri per motivi economici o di merito."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "ISE 34.000 € e 4 componenti (parametro 2,46): ISEE?",
        "options": [
          {
            "text": "34.000 €",
            "right": false,
            "why": "34.000 ÷ 2,46 = 13.821,14 €."
          },
          {
            "text": "8.292,68 €",
            "right": false,
            "why": "34.000 ÷ 2,46 = 13.821,14 €."
          },
          {
            "text": "16.666,67 €",
            "right": false,
            "why": "34.000 ÷ 2,46 = 13.821,14 €."
          },
          {
            "text": "13.821,14 €",
            "right": true
          }
        ],
        "explain": "ISEE Tassa annua fino a 10.000 € 0 € da 10.000,01 a 20.000 € 600 € da 20.000,01 a 30.000 € 1.200 € oltre 30.000 € 2.000 €"
      }
    ],
    "source": "C07-L03"
  },
  "p7-l4": {
    "id": "p7-l4",
    "code": "L4",
    "floor": 7,
    "title": "Borse di studio e diritto allo studio",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Borse di studio e diritto allo studio",
        "mentor": "Quali sono i due tipi di requisiti di una borsa? a) economici; b) di merito; c) di simpatia.",
        "options": [
          {
            "text": "a) e c)",
            "right": false,
            "why": "Le borse di studio non sono regali: sono aiuti a chi rispetta requisiti economici (di solito legati all’ISEE) e di merito, e vanno chiesti entro scadenze precise."
          },
          {
            "text": "a) e b)",
            "right": true
          },
          {
            "text": "b) e c)",
            "right": false,
            "why": "Le borse di studio non sono regali: sono aiuti a chi rispetta requisiti economici (di solito legati all’ISEE) e di merito, e vanno chiesti entro scadenze precise."
          },
          {
            "text": "Solo c)",
            "right": false,
            "why": "Le borse di studio non sono regali: sono aiuti a chi rispetta requisiti economici (di solito legati all’ISEE) e di merito, e vanno chiesti entro scadenze precise."
          }
        ],
        "theory": "Le borse di studio non sono regali: sono aiuti a chi rispetta requisiti economici (di solito legati all’ISEE) e di merito, e vanno chiesti entro scadenze precise. Conoscerli per tempo può cambiare molto il costo di un percorso.",
        "explain": "I requisiti sono di due tipi: economici (soglie di ISEE e a volte di patrimonio) e di merito (per esempio un numero minimo di crediti formativi, i CFU, da conseguire ogni anno)."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Borsa di 3.000 € l’anno per tre anni. Quanto in totale?",
        "options": [
          {
            "text": "3.000 €",
            "right": false,
            "why": "3.000 × 3 = 9.000 €."
          },
          {
            "text": "6.000 €",
            "right": false,
            "why": "3.000 × 3 = 9.000 €."
          },
          {
            "text": "12.000 €",
            "right": false,
            "why": "3.000 × 3 = 9.000 €."
          },
          {
            "text": "9.000 €",
            "right": true
          }
        ],
        "explain": "Elia (ISEE 13.821,14 €) la ottiene: in tre anni sono 9.000 € di borsa più 1.800 € di tasse non pagate, 10.800 € in tutto."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una borsa di 3.000 € l’anno è affiancata da un esonero dalle tasse di 600 € l’anno. Valore complessivo in tre anni?",
        "options": [
          {
            "text": "9.600 €",
            "right": false,
            "why": "9.000 + 600 × 3 = 10.800 €."
          },
          {
            "text": "1.800 €",
            "right": false,
            "why": "9.000 + 600 × 3 = 10.800 €."
          },
          {
            "text": "10.800 €",
            "right": true
          },
          {
            "text": "9.000 €",
            "right": false,
            "why": "9.000 + 600 × 3 = 10.800 €."
          }
        ],
        "explain": "Una borsa dell’ente fittizio dà 3.000 € l’anno e l’esonero dalle tasse (600 € nella fascia di L3) a chi ha ISEE fino a 15.000 € e consegue 40 CFU all’anno.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Borsa da 2.500 € l’anno per 3 anni: totale?",
            "options": [
              {
                "text": "7.500 €",
                "right": true
              },
              {
                "text": "2.500 €",
                "right": false,
                "why": "2.500 × 3 = 7.500 €."
              },
              {
                "text": "5.000 €",
                "right": false,
                "why": "2.500 × 3 = 7.500 €."
              },
              {
                "text": "10.000 €",
                "right": false,
                "why": "2.500 × 3 = 7.500 €."
              }
            ],
            "explain": "Una borsa dell’ente fittizio dà 3.000 € l’anno e l’esonero dalle tasse (600 € nella fascia di L3) a chi ha ISEE fino a 15.000 € e consegue 40 CFU all’anno."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Servono 40 CFU all’anno ed Elia ne consegue 30. Quanti ne mancano e che percentuale del richiesto?",
        "options": [
          {
            "text": "Ne mancano 30: il 75%",
            "right": false,
            "why": "40 − 30 = 10; 10 ÷ 40 = 25%."
          },
          {
            "text": "Ne mancano 10: il 25% del richiesto",
            "right": true
          },
          {
            "text": "Ne mancano 10: il 10%",
            "right": false,
            "why": "40 − 30 = 10; 10 ÷ 40 = 25%."
          },
          {
            "text": "Ne mancano 40: il 100%",
            "right": false,
            "why": "40 − 30 = 10; 10 ÷ 40 = 25%."
          }
        ],
        "explain": "Se in un anno fa solo 30 CFU, rischia di non averla più per quell’anno. Credere che la borsa sia garantita una volta ottenuta: serve il merito ogni anno.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Servono 36 CFU e ne hai 27: quanti mancano e che percentuale?",
            "options": [
              {
                "text": "9; 9%",
                "right": false,
                "why": "36 − 27 = 9; 9 ÷ 36 = 25%."
              },
              {
                "text": "9; 25%",
                "right": true
              },
              {
                "text": "27; 75%",
                "right": false,
                "why": "36 − 27 = 9; 9 ÷ 36 = 25%."
              },
              {
                "text": "36; 100%",
                "right": false,
                "why": "36 − 27 = 9; 9 ÷ 36 = 25%."
              }
            ],
            "explain": "In Italia gli aiuti per studiare sono di più tipi: borse di studio (somme di denaro), servizi (mensa, alloggio), esoneri o riduzioni delle tasse, contributi per chi studia in condizioni particolari."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un percorso fuori sede costa 22.500 € in tre anni. Con 10.800 € di borsa ed esonero, quanto resta da coprire?",
        "options": [
          {
            "text": "11.700 €",
            "right": true
          },
          {
            "text": "22.500 €",
            "right": false,
            "why": "22.500 − 10.800 = 11.700 €."
          },
          {
            "text": "10.800 €",
            "right": false,
            "why": "22.500 − 10.800 = 11.700 €."
          },
          {
            "text": "33.300 €",
            "right": false,
            "why": "22.500 − 10.800 = 11.700 €."
          }
        ],
        "explain": "In Italia gli aiuti per studiare sono di più tipi: borse di studio (somme di denaro), servizi (mensa, alloggio), esoneri o riduzioni delle tasse, contributi per chi studia in condizioni particolari.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Dove cerchi i bandi di borse di studio?",
            "options": [
              {
                "text": "Enti regionali per il diritto allo studio e atenei",
                "right": true
              },
              {
                "text": "In un sito a pagamento",
                "right": false,
                "why": "I bandi ufficiali sono pubblici e gratuiti."
              },
              {
                "text": "In una chat anonima",
                "right": false,
                "why": "I bandi ufficiali sono pubblici e gratuiti."
              },
              {
                "text": "Non esistono bandi",
                "right": false,
                "why": "I bandi ufficiali sono pubblici e gratuiti."
              }
            ],
            "explain": "Diffida di chi chiede soldi per «trovarti» una borsa: i bandi ufficiali sono gratuiti. Una borsa dell’ente fittizio dà 3.000 € l’anno e l’esonero dalle tasse (600 € nella fascia di L3) a chi ha ISEE fino a 15.000 € e consegue 40 CFU all’anno."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un sito ti propone «la ricerca personalizzata delle borse di studio» a 150 €. Cosa fai?",
        "options": [
          {
            "text": "Pago, così non perdo tempo",
            "right": false,
            "why": "I bandi ufficiali sono pubblici e gratuiti."
          },
          {
            "text": "Ignoro tutto",
            "right": false,
            "why": "I bandi ufficiali sono pubblici e gratuiti."
          },
          {
            "text": "Controllo i bandi gratuiti dell’ente regionale e del mio ateneo",
            "right": true
          },
          {
            "text": "Chiedo un prestito per pagare il sito",
            "right": false,
            "why": "I bandi ufficiali sono pubblici e gratuiti."
          }
        ],
        "explain": "Diffida di chi chiede soldi per «trovarti» una borsa: i bandi ufficiali sono gratuiti."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "ISEE 13.821,14 €. Tabella tasse annue dell’ateneo (fittizio): fino a 10.000 € → 0 €; da 10.000,01 a 20.000 € → 600 €; da 20.000,01 a 30.000 € → 1.200 €; oltre 30.000 € → 2.000 €. Quale tassa annua si paga?",
        "options": [
          {
            "text": "1.200 €",
            "right": false,
            "why": "L’ISEE 13.821,14 € paga 600 €."
          },
          {
            "text": "2.000 €",
            "right": false,
            "why": "L’ISEE 13.821,14 € paga 600 €."
          },
          {
            "text": "600 €",
            "right": true
          },
          {
            "text": "0 €",
            "right": false,
            "why": "L’ISEE 13.821,14 € paga 600 €."
          }
        ],
        "explain": "I bandi hanno scadenze: perderle significa perdere l’anno."
      }
    ],
    "source": "C07-L04"
  },
  "p7-l5": {
    "id": "p7-l5",
    "code": "L5",
    "floor": 7,
    "title": "Prestiti e debito per studiare",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Prestiti e debito per studiare",
        "mentor": "Cos’è il costo vero di un prestito?",
        "options": [
          {
            "text": "La somma ricevuta",
            "right": false,
            "why": "La somma delle rate meno la somma ricevuta, cioè gli interessi e le eventuali spese."
          },
          {
            "text": "La rata mensile",
            "right": false,
            "why": "La somma delle rate meno la somma ricevuta, cioè gli interessi e le eventuali spese."
          },
          {
            "text": "La somma delle rate meno la somma ricevuta, cioè interessi ed eventuali spese",
            "right": true
          },
          {
            "text": "Il tasso scritto in grande",
            "right": false,
            "why": "La somma delle rate meno la somma ricevuta, cioè gli interessi e le eventuali spese."
          }
        ],
        "theory": "Un prestito dà oggi soldi che si restituiscono domani con gli interessi: il costo vero è la somma delle rate meno quanto si è ricevuto. Può aiutare a completare un percorso, ma va usato dopo aver cercato borse e aiuti, e per costi davvero necessari.",
        "explain": "Scegliere la rata più bassa senza guardare il costo totale, oppure indebitarsi per spese non necessarie (un telefono nuovo, un viaggio) con la scusa che «serve per studiare»."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Prestito di 6.000 € al 4%, 5 rate annuali da 1.347,76 €. Quanto si restituisce in totale e quanti sono gli interessi?",
        "options": [
          {
            "text": "6.000 € in totale; interessi 0 €",
            "right": false,
            "why": "1.347,76 × 5 = 6.738,80; 6.738,80 − 6.000 = 738,80 €."
          },
          {
            "text": "1.347,76 € in totale; interessi 1.347,76 €",
            "right": false,
            "why": "1.347,76 × 5 = 6.738,80; 6.738,80 − 6.000 = 738,80 €."
          },
          {
            "text": "7.397,50 € in totale; interessi 1.397,50 €",
            "right": false,
            "why": "1.347,76 × 5 = 6.738,80; 6.738,80 − 6.000 = 738,80 €."
          },
          {
            "text": "6.738,80 € in totale; interessi 738,80 €",
            "right": true
          }
        ],
        "explain": "A parità di tasso, durata più lunga significa rata più bassa ma interessi totali più alti. Per calcolare una rata costante annua si usa la formula rata = capitale × tasso ÷ (1 − (1 + tasso)^−anni)."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un prestito di 6.000 € al 4% rimborsato in 10 rate annuali da 739,75 €. Totale restituito e interessi?",
        "options": [
          {
            "text": "7.397,50 € in totale; interessi 1.397,50 €, quasi il doppio",
            "right": true
          },
          {
            "text": "7.397,50 € in totale; interessi 739,75 €",
            "right": false,
            "why": "739,75 × 10 = 7.397,50; 7.397,50 − 6.000 = 1.397,50 €."
          },
          {
            "text": "6.738,80 € in totale; interessi 738,80 €",
            "right": false,
            "why": "739,75 × 10 = 7.397,50; 7.397,50 − 6.000 = 1.397,50 €."
          },
          {
            "text": "6.000 € in totale; interessi 0 €",
            "right": false,
            "why": "739,75 × 10 = 7.397,50; 7.397,50 − 6.000 = 1.397,50 €."
          }
        ],
        "explain": "Il tasso è il prezzo del prestito in percentuale annua; la rata è quanto si paga a scadenze regolari; la durata è il tempo di restituzione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Prestito di 2.000 €, rimborsi totali 2.150 €: interessi?",
            "options": [
              {
                "text": "2.000 €",
                "right": false,
                "why": "2.150 − 2.000 = 150 €."
              },
              {
                "text": "2.150 €",
                "right": false,
                "why": "2.150 − 2.000 = 150 €."
              },
              {
                "text": "150 €",
                "right": true
              },
              {
                "text": "15 €",
                "right": false,
                "why": "2.150 − 2.000 = 150 €."
              }
            ],
            "explain": "Il tasso è il prezzo del prestito in percentuale annua; la rata è quanto si paga a scadenze regolari; la durata è il tempo di restituzione."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un prestito di 6.000 € al 4% in 5 anni costa 738,80 € di interessi. Con un tasso dell'8% (rata 1.502,74 € in 5 anni) il totale è 7.513,70 €. Di quanto superano gli interessi quelli al 4%?",
        "options": [
          {
            "text": "1.513,70 € in più",
            "right": false,
            "why": "1.502,74 × 5 = 7.513,70; 7.513,70 − 6.000 = 1.513,70; − 738,80 = 774,90 €."
          },
          {
            "text": "738,80 € in più",
            "right": false,
            "why": "1.502,74 × 5 = 7.513,70; 7.513,70 − 6.000 = 1.513,70; − 738,80 = 774,90 €."
          },
          {
            "text": "774,90 € in più (1.513,70 − 738,80)",
            "right": true
          },
          {
            "text": "0 €",
            "right": false,
            "why": "1.502,74 × 5 = 7.513,70; 7.513,70 − 6.000 = 1.513,70; − 738,80 = 774,90 €."
          }
        ],
        "explain": "A parità di tasso, durata più lunga significa rata più bassa ma interessi totali più alti. Per calcolare una rata costante annua si usa la formula rata = capitale × tasso ÷ (1 − (1 + tasso)^−anni).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una rata annua di 800 € su un netto annuo di 12.000 €: che percentuale?",
            "options": [
              {
                "text": "8%",
                "right": false,
                "why": "800 ÷ 12.000 ≈ 6,7%."
              },
              {
                "text": "6,7%",
                "right": true
              },
              {
                "text": "66,7%",
                "right": false,
                "why": "800 ÷ 12.000 ≈ 6,7%."
              },
              {
                "text": "0,7%",
                "right": false,
                "why": "800 ÷ 12.000 ≈ 6,7%."
              }
            ],
            "explain": "A parità di tasso, durata più lunga significa rata più bassa ma interessi totali più alti. Per calcolare una rata costante annua si usa la formula rata = capitale × tasso ÷ (1 − (1 + tasso)^−anni)."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Luca ha un netto annuo di 13.984,74 € e una rata annua di 1.347,76 €. Che percentuale del netto è la rata?",
        "options": [
          {
            "text": "1,3%",
            "right": false,
            "why": "1.347,76 ÷ 13.984,74 ≈ 9,6%."
          },
          {
            "text": "9,6% del netto annuo",
            "right": true
          },
          {
            "text": "96%",
            "right": false,
            "why": "1.347,76 ÷ 13.984,74 ≈ 9,6%."
          },
          {
            "text": "19,2%",
            "right": false,
            "why": "1.347,76 ÷ 13.984,74 ≈ 9,6%."
          }
        ],
        "explain": "Il tasso è il prezzo del prestito in percentuale annua; la rata è quanto si paga a scadenze regolari; la durata è il tempo di restituzione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Quando ha senso un prestito per studiare?",
            "options": [
              {
                "text": "Per una spesa essenziale, dopo aver cercato aiuti e letto i costi",
                "right": true
              },
              {
                "text": "Per un viaggio",
                "right": false,
                "why": "Si valuta come spesa essenziale con costi chiari."
              },
              {
                "text": "Per un telefono",
                "right": false,
                "why": "Si valuta come spesa essenziale con costi chiari."
              },
              {
                "text": "Sempre",
                "right": false,
                "why": "Si valuta come spesa essenziale con costi chiari."
              }
            ],
            "explain": "Scegliere la rata più bassa senza guardare il costo totale, oppure indebitarsi per spese non necessarie (un telefono nuovo, un viaggio) con la scusa che «serve per studiare»."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai ottenuto una borsa ma manca ancora una parte per l’affitto. Quando ha senso chiedere un prestito?",
        "options": [
          {
            "text": "Per comprare un nuovo telefono",
            "right": false,
            "why": "Il prestito si valuta come una spesa essenziale, con tutti i costi chiari."
          },
          {
            "text": "Per pagare un intermediario che promette borse",
            "right": false,
            "why": "Il prestito si valuta come una spesa essenziale, con tutti i costi chiari."
          },
          {
            "text": "Per una vacanza dopo gli esami",
            "right": false,
            "why": "Il prestito si valuta come una spesa essenziale, con tutti i costi chiari."
          },
          {
            "text": "Per una spesa essenziale di studio, dopo aver cercato altri aiuti e letto TAEG, rata e rimborso anticipato",
            "right": true
          }
        ],
        "explain": "Scegliere la rata più bassa senza guardare il costo totale, oppure indebitarsi per spese non necessarie (un telefono nuovo, un viaggio) con la scusa che «serve per studiare»."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L4)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un percorso costa 22.500 € e hai 10.800 € di borsa ed esonero: quanto resta da coprire?",
        "options": [
          {
            "text": "22.500 €",
            "right": false,
            "why": "22.500 − 10.800 = 11.700 €."
          },
          {
            "text": "10.800 €",
            "right": false,
            "why": "22.500 − 10.800 = 11.700 €."
          },
          {
            "text": "11.700 €",
            "right": true
          },
          {
            "text": "33.300 €",
            "right": false,
            "why": "22.500 − 10.800 = 11.700 €."
          }
        ],
        "explain": "Scegliere la rata più bassa senza guardare il costo totale, oppure indebitarsi per spese non necessarie (un telefono nuovo, un viaggio) con la scusa che «serve per studiare»."
      }
    ],
    "source": "C07-L05"
  },
  "p7-l6": {
    "id": "p7-l6",
    "code": "L6",
    "floor": 7,
    "title": "Scegliere un percorso con i numeri (e le trappole)",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Scegliere un percorso con i numeri (e le trappole)",
        "mentor": "Quali sono segnali di un corso-trappola? a) «lavoro garantito»; b) programma dettagliato e riconoscimento verificabile; c) «sconto solo se firmi oggi»; d) richiesta di pagare tutto in anticipo.",
        "options": [
          {
            "text": "Solo b)",
            "right": false,
            "why": "Un percorso di formazione si sceglie guardando costo totale, riconoscimento, contenuti e tempo di recupero dell’investimento, non la promessa."
          },
          {
            "text": "b) e d)",
            "right": false,
            "why": "Un percorso di formazione si sceglie guardando costo totale, riconoscimento, contenuti e tempo di recupero dell’investimento, non la promessa."
          },
          {
            "text": "a), c) e d)",
            "right": true
          },
          {
            "text": "Nessuno",
            "right": false,
            "why": "Un percorso di formazione si sceglie guardando costo totale, riconoscimento, contenuti e tempo di recupero dell’investimento, non la promessa."
          }
        ],
        "theory": "Un percorso di formazione si sceglie guardando costo totale, riconoscimento, contenuti e tempo di recupero dell’investimento, non la promessa. Chi garantisce un lavoro o mette fretta spesso vende più di quanto promette.",
        "explain": "Segnali di corsi-trappola: «lavoro garantito», «sconto solo oggi», pagamento anticipato dell’intero importo, titolo non riconosciuto, difficoltà a ottenere il contratto scritto, pressione a decidere subito."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un corso privato costa 12 rate da 400 € più 150 € di iscrizione. Costo totale?",
        "options": [
          {
            "text": "4.800 €",
            "right": false,
            "why": "400 × 12 = 4.800; + 150 = 4.950 €."
          },
          {
            "text": "550 €",
            "right": false,
            "why": "400 × 12 = 4.800; + 150 = 4.950 €."
          },
          {
            "text": "5.200 €",
            "right": false,
            "why": "400 × 12 = 4.800; + 150 = 4.950 €."
          },
          {
            "text": "4.950 €",
            "right": true
          }
        ],
        "explain": "Il tempo di recupero è il costo diviso per l’aumento mensile atteso del reddito netto: se serve molto tempo per recuperare, o l’aumento è solo una speranza, l’investimento è debole."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un corso di un anno costa 4.950 €. Quanto costa al mese in media?",
        "options": [
          {
            "text": "412,50 €",
            "right": true
          },
          {
            "text": "400 €",
            "right": false,
            "why": "4.950 ÷ 12 = 412,50 €."
          },
          {
            "text": "550 €",
            "right": false,
            "why": "4.950 ÷ 12 = 412,50 €."
          },
          {
            "text": "350 €",
            "right": false,
            "why": "4.950 ÷ 12 = 412,50 €."
          }
        ],
        "explain": "Fidarsi di una testimonianza o di una promessa senza chiedere dati e contratto, o firmare subito per non perdere lo sconto.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Corso da 10 rate da 250 € più 90 € di iscrizione: totale?",
            "options": [
              {
                "text": "2.500 €",
                "right": false,
                "why": "2.500 + 90 = 2.590 €."
              },
              {
                "text": "2.590 €",
                "right": true
              },
              {
                "text": "340 €",
                "right": false,
                "why": "2.500 + 90 = 2.590 €."
              },
              {
                "text": "2.340 €",
                "right": false,
                "why": "2.500 + 90 = 2.590 €."
              }
            ],
            "explain": "Segnali di corsi-trappola: «lavoro garantito», «sconto solo oggi», pagamento anticipato dell’intero importo, titolo non riconosciuto, difficoltà a ottenere il contratto scritto, pressione a decidere subito."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un corso privato costa 4.950 € l’anno; il corso biennale riconosciuto costa 2.200 € l’anno. Quanto costa in più l’anno il corso privato?",
        "options": [
          {
            "text": "2.200 € l’anno in più",
            "right": false,
            "why": "4.950 − 2.200 = 2.750 €."
          },
          {
            "text": "4.950 € l’anno in più",
            "right": false,
            "why": "4.950 − 2.200 = 2.750 €."
          },
          {
            "text": "550 € l’anno in più",
            "right": false,
            "why": "4.950 − 2.200 = 2.750 €."
          },
          {
            "text": "2.750 € l’anno in più, senza conoscerne il riconoscimento",
            "right": true
          }
        ],
        "explain": "Segnali di corsi-trappola: «lavoro garantito», «sconto solo oggi», pagamento anticipato dell’intero importo, titolo non riconosciuto, difficoltà a ottenere il contratto scritto, pressione a decidere subito.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Corso da 3.000 € che fa crescere il netto di 150 € al mese: mesi per recuperarlo?",
            "options": [
              {
                "text": "15",
                "right": false,
                "why": "3.000 ÷ 150 = 20 mesi."
              },
              {
                "text": "200",
                "right": false,
                "why": "3.000 ÷ 150 = 20 mesi."
              },
              {
                "text": "20",
                "right": true
              },
              {
                "text": "30",
                "right": false,
                "why": "3.000 ÷ 150 = 20 mesi."
              }
            ],
            "explain": "Il tempo di recupero è il costo diviso per l’aumento mensile atteso del reddito netto: se serve molto tempo per recuperare, o l’aumento è solo una speranza, l’investimento è debole."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Se il corso da 4.950 € facesse crescere il netto di 100 € al mese, in quanti mesi lo recuperi?",
        "options": [
          {
            "text": "49,5 mesi, circa 4 anni e un mese",
            "right": true
          },
          {
            "text": "12 mesi",
            "right": false,
            "why": "4.950 ÷ 100 = 49,5 mesi."
          },
          {
            "text": "4,95 mesi",
            "right": false,
            "why": "4.950 ÷ 100 = 49,5 mesi."
          },
          {
            "text": "495 mesi",
            "right": false,
            "why": "4.950 ÷ 100 = 49,5 mesi."
          }
        ],
        "explain": "Il tempo di recupero è il costo diviso per l’aumento mensile atteso del reddito netto: se serve molto tempo per recuperare, o l’aumento è solo una speranza, l’investimento è debole.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una scuola promette «assunzione garantita». Cosa chiedi?",
            "options": [
              {
                "text": "Accreditamento, programma e costi per iscritto",
                "right": true
              },
              {
                "text": "Nulla: la promessa basta",
                "right": false,
                "why": "Una promessa non è un impegno scritto."
              },
              {
                "text": "Lo sconto più alto",
                "right": false,
                "why": "Una promessa non è un impegno scritto."
              },
              {
                "text": "Di firmare oggi",
                "right": false,
                "why": "Una promessa non è un impegno scritto."
              }
            ],
            "explain": "Segnali di corsi-trappola: «lavoro garantito», «sconto solo oggi», pagamento anticipato dell’intero importo, titolo non riconosciuto, difficoltà a ottenere il contratto scritto, pressione a decidere subito."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Una scuola ti promette «assunzione garantita» e uno sconto del 30% se firmi oggi. Cosa fai?",
        "options": [
          {
            "text": "Chiedo per iscritto accreditamento, programma, costo totale, condizioni di recesso e dati sugli esiti, e non firmo oggi",
            "right": true
          },
          {
            "text": "Firmo per lo sconto",
            "right": false,
            "why": "Una promessa di lavoro non è un impegno scritto e la fretta è un segnale di allarme."
          },
          {
            "text": "Pago solo l’iscrizione",
            "right": false,
            "why": "Una promessa di lavoro non è un impegno scritto e la fretta è un segnale di allarme."
          },
          {
            "text": "Firmo se mi dicono che è un’offerta limitata",
            "right": false,
            "why": "Una promessa di lavoro non è un impegno scritto e la fretta è un segnale di allarme."
          }
        ],
        "explain": "Segnali di corsi-trappola: «lavoro garantito», «sconto solo oggi», pagamento anticipato dell’intero importo, titolo non riconosciuto, difficoltà a ottenere il contratto scritto, pressione a decidere subito."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Prestito di 6.000 € al 4% in 5 rate da 1.347,76 €: interessi totali?",
        "options": [
          {
            "text": "1.347,76 €",
            "right": false,
            "why": "6.738,80 − 6.000 = 738,80 €."
          },
          {
            "text": "738,80 €",
            "right": true
          },
          {
            "text": "6.738,80 €",
            "right": false,
            "why": "6.738,80 − 6.000 = 738,80 €."
          },
          {
            "text": "6.000 €",
            "right": false,
            "why": "6.738,80 − 6.000 = 738,80 €."
          }
        ],
        "explain": "Il tempo di recupero è il costo diviso per l’aumento mensile atteso del reddito netto: se serve molto tempo per recuperare, o l’aumento è solo una speranza, l’investimento è debole."
      }
    ],
    "source": "C07-L06"
  },
  "p8-l1": {
    "id": "p8-l1",
    "code": "L1",
    "floor": 8,
    "title": "Inflazione e potere d’acquisto",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Inflazione e potere d’acquisto",
        "mentor": "Cosa significa «potere d’acquisto»?",
        "options": [
          {
            "text": "Il valore scritto sulle banconote",
            "right": false,
            "why": "Quante cose si possono comprare con una somma di denaro; scende se i prezzi salgono più in fretta dei soldi."
          },
          {
            "text": "La quantità di denaro depositata in banca",
            "right": false,
            "why": "Quante cose si possono comprare con una somma di denaro; scende se i prezzi salgono più in fretta dei soldi."
          },
          {
            "text": "Il tasso di interesse del conto",
            "right": false,
            "why": "Quante cose si possono comprare con una somma di denaro; scende se i prezzi salgono più in fretta dei soldi."
          },
          {
            "text": "La quantità di cose che si possono comprare con una somma; scende se i prezzi salgono più in fretta dei soldi",
            "right": true
          }
        ],
        "theory": "Con l’inflazione i prezzi salgono nel tempo: la stessa somma compra meno cose. Per capire se i soldi crescono davvero non basta guardare gli interessi, bisogna confrontarli con l’aumento dei prezzi.",
        "explain": "Al contrario, il potere d’acquisto di una somma futura si calcola dividendo per 1,03ⁿ: quanto vale oggi, in termini di cose che si possono comprare."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un prezzo di 100 € con inflazione al 3% annuo per 10 anni: quanto diventa?",
        "options": [
          {
            "text": "134,39 €",
            "right": true
          },
          {
            "text": "130,00 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          },
          {
            "text": "103,00 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          },
          {
            "text": "113,44 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          }
        ],
        "explain": "Se l’inflazione è il 3% all’anno, un prezzo di 100 € diventa 100 × 1,03 dopo un anno, e dopo n anni 100 × 1,03ⁿ."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "100 € tra 10 anni, con inflazione al 3%: quanto valgono in potere d’acquisto di oggi?",
        "options": [
          {
            "text": "74,41 €",
            "right": true
          },
          {
            "text": "73,74 €",
            "right": false,
            "why": "100 ÷ 1,03¹⁰ = 74,41 €."
          },
          {
            "text": "97,00 €",
            "right": false,
            "why": "100 ÷ 1,03¹⁰ = 74,41 €."
          },
          {
            "text": "134,39 €",
            "right": false,
            "why": "100 ÷ 1,03¹⁰ = 74,41 €."
          }
        ],
        "explain": "Il rendimento reale è quanto cresce il potere d’acquisto: grosso modo rendimento nominale meno inflazione. Se i soldi crescono meno dei prezzi, il rendimento reale è negativo anche se il numero sul conto sale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un prezzo di 200 € con inflazione al 2% annuo per 5 anni: quanto diventa?",
            "options": [
              {
                "text": "220,82 €",
                "right": true
              },
              {
                "text": "220,00 €",
                "right": false,
                "why": "200 × 1,02⁵ = 220,82 €."
              },
              {
                "text": "210,00 €",
                "right": false,
                "why": "200 × 1,02⁵ = 220,82 €."
              },
              {
                "text": "202,00 €",
                "right": false,
                "why": "200 × 1,02⁵ = 220,82 €."
              }
            ],
            "explain": "Il rendimento reale è quanto cresce il potere d’acquisto: grosso modo rendimento nominale meno inflazione. Se i soldi crescono meno dei prezzi, il rendimento reale è negativo anche se il numero sul conto sale."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una paghetta di 50 € resta uguale per 5 anni con inflazione al 3%. Quanto vale in potere d’acquisto di oggi?",
        "options": [
          {
            "text": "50,00 €; non serve cambiare nulla",
            "right": false,
            "why": "50 ÷ 1,03⁵ = 43,13 €. Per mantenere lo stesso potere d’acquisto dovrebbe salire a 57,96 €."
          },
          {
            "text": "43,13 €; per mantenere lo stesso potere d’acquisto dovrebbe salire a 57,96 €",
            "right": true
          },
          {
            "text": "46,25 €; dovrebbe salire a 53,75 €",
            "right": false,
            "why": "50 ÷ 1,03⁵ = 43,13 €. Per mantenere lo stesso potere d’acquisto dovrebbe salire a 57,96 €."
          },
          {
            "text": "35,00 €; dovrebbe salire a 65,00 €",
            "right": false,
            "why": "50 ÷ 1,03⁵ = 43,13 €. Per mantenere lo stesso potere d’acquisto dovrebbe salire a 57,96 €."
          }
        ],
        "explain": "L’altro errore è credere che l’inflazione sia solo un problema degli adulti: tocca la paghetta, i risparmi e gli obiettivi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una paghetta di 40 € resta ferma per 3 anni con inflazione al 3%. Quanto vale in potere d’acquisto di oggi?",
            "options": [
              {
                "text": "40,00 €",
                "right": false,
                "why": "40 ÷ 1,03³ = 36,61 €."
              },
              {
                "text": "36,61 €",
                "right": true
              },
              {
                "text": "43,64 €",
                "right": false,
                "why": "40 ÷ 1,03³ = 36,61 €."
              },
              {
                "text": "37,60 €",
                "right": false,
                "why": "40 ÷ 1,03³ = 36,61 €."
              }
            ],
            "explain": "Al contrario, il potere d’acquisto di una somma futura si calcola dividendo per 1,03ⁿ: quanto vale oggi, in termini di cose che si possono comprare."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € al 2% annuo per 5 anni diventano 1.104,08 €. Con inflazione al 3% quanto vale il risultato in potere d’acquisto di oggi?",
        "options": [
          {
            "text": "1.104,08 €: gli interessi battono l’inflazione",
            "right": false,
            "why": "1.104,08 ÷ 1,03⁵ = 952,39 €."
          },
          {
            "text": "952,39 €: il rendimento reale è negativo",
            "right": true
          },
          {
            "text": "1.020,00 €",
            "right": false,
            "why": "1.104,08 ÷ 1,03⁵ = 952,39 €."
          },
          {
            "text": "1.000,00 €",
            "right": false,
            "why": "1.104,08 ÷ 1,03⁵ = 952,39 €."
          }
        ],
        "explain": "L’inflazione è l’aumento generale dei prezzi in un periodo; si misura con indici (in Italia soprattutto quelli dell’ISTAT; i valori reali vanno reperiti con fonte e data).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "I tuoi soldi crescono dell'1% e i prezzi del 3%: cosa succede al potere d’acquisto?",
            "options": [
              {
                "text": "Sale",
                "right": false,
                "why": "I prezzi crescono più dei soldi."
              },
              {
                "text": "Scende",
                "right": true
              },
              {
                "text": "Resta uguale",
                "right": false,
                "why": "I prezzi crescono più dei soldi."
              },
              {
                "text": "Dipende solo dal conto",
                "right": false,
                "why": "I prezzi crescono più dei soldi."
              }
            ],
            "explain": "Se i soldi crescono meno dei prezzi, il rendimento reale è negativo anche se il numero sul conto sale. Pensare che «+10% di interesse» sia sempre un guadagno senza guardare l’inflazione."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un conto ti paga il 2% e l’inflazione è al 3%. Cosa ha senso fare con i soldi del fondo di emergenza?",
        "options": [
          {
            "text": "Spostarli per forza in un investimento rischioso",
            "right": false,
            "why": "B). Il fondo ha una funzione di sicurezza (Cap. 5); l’inflazione è un costo da conoscere, non un motivo per rischiare i soldi necessari a breve."
          },
          {
            "text": "Tenerli in contanti sotto il materasso",
            "right": false,
            "why": "B). Il fondo ha una funzione di sicurezza (Cap. 5); l’inflazione è un costo da conoscere, non un motivo per rischiare i soldi necessari a breve."
          },
          {
            "text": "Spenderli subito prima che perdano valore",
            "right": false,
            "why": "B). Il fondo ha una funzione di sicurezza (Cap. 5); l’inflazione è un costo da conoscere, non un motivo per rischiare i soldi necessari a breve."
          },
          {
            "text": "Tenerli disponibili e sicuri, accettando che perdano un po’ di potere d’acquisto, e investire solo i soldi che non servono a breve",
            "right": true
          }
        ],
        "explain": "Pensare che «+10% di interesse» sia sempre un guadagno senza guardare l’inflazione."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "500 € al 3% lordo per un anno: interesse lordo?",
        "options": [
          {
            "text": "150 €",
            "right": false,
            "why": "500 × 3% = 15 €."
          },
          {
            "text": "15 €",
            "right": true
          },
          {
            "text": "1,5 €",
            "right": false,
            "why": "500 × 3% = 15 €."
          },
          {
            "text": "515 €",
            "right": false,
            "why": "500 × 3% = 15 €."
          }
        ],
        "explain": "Se l’inflazione è il 3% all’anno, un prezzo di 100 € diventa 100 × 1,03 dopo un anno, e dopo n anni 100 × 1,03ⁿ."
      }
    ],
    "source": "C08-L01"
  },
  "p8-l2": {
    "id": "p8-l2",
    "code": "L2",
    "floor": 8,
    "title": "Come cresce un debito",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Come cresce un debito",
        "mentor": "Perché il costo reale di un debito al 18% TAN con interessi mensili è un po’ più alto del 18%?",
        "options": [
          {
            "text": "Perché la banca arrotonda sempre per eccesso",
            "right": false,
            "why": "Un debito cresce con gli interessi, e gli interessi si calcolano anche sugli interessi non pagati."
          },
          {
            "text": "Perché il tasso sale ogni mese",
            "right": false,
            "why": "Un debito cresce con gli interessi, e gli interessi si calcolano anche sugli interessi non pagati."
          },
          {
            "text": "Non è più alto: è sempre esattamente il 18%",
            "right": false,
            "why": "Un debito cresce con gli interessi, e gli interessi si calcolano anche sugli interessi non pagati."
          },
          {
            "text": "Perché gli interessi di ogni mese si aggiungono al debito e producono a loro volta interessi (interesse composto)",
            "right": true
          }
        ],
        "theory": "Un debito cresce con gli interessi, e gli interessi si calcolano anche sugli interessi non pagati. Più il tasso è alto e più tempo passa, più il debito pesa: pagare solo gli interessi tiene il debito fermo, non lo riduce.",
        "explain": "Il TAN (tasso annuo nominale) è il tasso dichiarato su base annua; se gli interessi vengono aggiunti al debito ogni mese, il costo reale su un anno è un po’ più alto del TAN."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Debito di 1.000 €, TAN 18%. Quanto è l’interesse del primo mese?",
        "options": [
          {
            "text": "180 €",
            "right": false,
            "why": "18% ÷ 12 = 1,5%; 1.000 × 0,015 = 15 €."
          },
          {
            "text": "1,50 €",
            "right": false,
            "why": "18% ÷ 12 = 1,5%; 1.000 × 0,015 = 15 €."
          },
          {
            "text": "15 €",
            "right": true
          },
          {
            "text": "150 €",
            "right": false,
            "why": "18% ÷ 12 = 1,5%; 1.000 × 0,015 = 15 €."
          }
        ],
        "explain": "Con un TAN del 18% il tasso mensile è 1,5%; senza pagamenti, in 12 mesi il debito diventa capitale × (1,015)¹²."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un debito di 1.000 € al TAN 18% con interessi mensili, senza pagare nulla per 12 mesi: quanto diventa?",
        "options": [
          {
            "text": "1.180,00 €; interessi 180 €",
            "right": false,
            "why": "1.000 × 1,015¹² = 1.195,62 €."
          },
          {
            "text": "1.195,62 €; interessi 195,62 €",
            "right": true
          },
          {
            "text": "1.215,62 €; interessi 215,62 €",
            "right": false,
            "why": "1.000 × 1,015¹² = 1.195,62 €."
          },
          {
            "text": "1.018,00 €; interessi 18 €",
            "right": false,
            "why": "1.000 × 1,015¹² = 1.195,62 €."
          }
        ],
        "explain": "Pagare solo l’importo minimo richiesto e pensare di «stare a posto»: se si paga solo l’interesse mensile, il capitale non scende mai.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Debito di 500 €, TAN 12%: interesse del primo mese?",
            "options": [
              {
                "text": "60 €",
                "right": false,
                "why": "12% ÷ 12 = 1%; 500 × 1% = 5 €."
              },
              {
                "text": "12 €",
                "right": false,
                "why": "12% ÷ 12 = 1%; 500 × 1% = 5 €."
              },
              {
                "text": "50 €",
                "right": false,
                "why": "12% ÷ 12 = 1%; 500 × 1% = 5 €."
              },
              {
                "text": "5 €",
                "right": true
              }
            ],
            "explain": "Pagare solo l’importo minimo richiesto e pensare di «stare a posto»: se si paga solo l’interesse mensile, il capitale non scende mai."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un debito di 1.000 € al TAN 18% per un anno: quanto è la differenza tra interesse composto (1.195,62 €) e interesse semplice?",
        "options": [
          {
            "text": "195,62 €",
            "right": false,
            "why": "195,62 − 180 = 15,62 €."
          },
          {
            "text": "15,62 €",
            "right": true
          },
          {
            "text": "180,00 €",
            "right": false,
            "why": "195,62 − 180 = 15,62 €."
          },
          {
            "text": "1,56 €",
            "right": false,
            "why": "195,62 − 180 = 15,62 €."
          }
        ],
        "explain": "Forme di debito molto care sono per esempio lo scoperto di conto e la rateizzazione di una carta ricaricabile a saldo (cifre e condizioni variano e vanno lette sul contratto).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "1.000 € al TAN 12% con interessi mensili, senza pagare per 12 mesi: debito finale?",
            "options": [
              {
                "text": "1.120,00 €",
                "right": false,
                "why": "1.000 × 1,01¹² = 1.126,83 €."
              },
              {
                "text": "1.012,00 €",
                "right": false,
                "why": "1.000 × 1,01¹² = 1.126,83 €."
              },
              {
                "text": "1.126,83 €",
                "right": true
              },
              {
                "text": "1.200,00 €",
                "right": false,
                "why": "1.000 × 1,01¹² = 1.126,83 €."
              }
            ],
            "explain": "Con un TAN del 18% il tasso mensile è 1,5%; senza pagamenti, in 12 mesi il debito diventa capitale × (1,015)¹²."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Marco paga ogni mese solo i 15 € di interessi per 12 mesi. Quanto ha pagato e quanto deve ancora?",
        "options": [
          {
            "text": "Ha pagato 180 €; il debito è sceso a 820 €",
            "right": false,
            "why": "Pagare solo gli interessi non riduce il capitale."
          },
          {
            "text": "Ha pagato 180 €; il debito è azzerato",
            "right": false,
            "why": "Pagare solo gli interessi non riduce il capitale."
          },
          {
            "text": "Ha pagato 180 €; il debito è ancora di 1.000 €",
            "right": true
          },
          {
            "text": "Ha pagato 15 €; il debito è sceso a 985 €",
            "right": false,
            "why": "Pagare solo gli interessi non riduce il capitale."
          }
        ],
        "explain": "Pagare solo l’importo minimo richiesto e pensare di «stare a posto»: se si paga solo l’interesse mensile, il capitale non scende mai.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché pagare solo gli interessi non riduce il debito?",
            "options": [
              {
                "text": "Perché gli interessi sono capitale",
                "right": false,
                "why": "Gli interessi pagano il costo, non il capitale."
              },
              {
                "text": "Perché il tasso sale",
                "right": false,
                "why": "Gli interessi pagano il costo, non il capitale."
              },
              {
                "text": "Perché la banca lo vieta",
                "right": false,
                "why": "Gli interessi pagano il costo, non il capitale."
              },
              {
                "text": "Perché il capitale resta invariato",
                "right": true
              }
            ],
            "explain": "Pagare solo l’importo minimo richiesto e pensare di «stare a posto»: se si paga solo l’interesse mensile, il capitale non scende mai."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Marco ha 300 € disponibili, un debito al 18% e un conto che rende il 2%. Cosa fa?",
        "options": [
          {
            "text": "Tiene i soldi sul conto",
            "right": false,
            "why": "B). Ridurre un debito al 18% è come ottenere un rendimento certo del 18%, molto più alto del 2% del conto; il fondo evita di tornare a indebitarsi al primo imprevisto."
          },
          {
            "text": "Ne usa una parte per ridurre il debito caro, tenendo un piccolo fondo per gli imprevisti",
            "right": true
          },
          {
            "text": "Apre un secondo debito per pagare il primo",
            "right": false,
            "why": "B). Ridurre un debito al 18% è come ottenere un rendimento certo del 18%, molto più alto del 2% del conto; il fondo evita di tornare a indebitarsi al primo imprevisto."
          },
          {
            "text": "Investe i 300 € in qualcosa di rischioso per coprire gli interessi",
            "right": false,
            "why": "B). Ridurre un debito al 18% è come ottenere un rendimento certo del 18%, molto più alto del 2% del conto; il fondo evita di tornare a indebitarsi al primo imprevisto."
          }
        ],
        "explain": "Forme di debito molto care sono per esempio lo scoperto di conto e la rateizzazione di una carta ricaricabile a saldo (cifre e condizioni variano e vanno lette sul contratto)."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L1)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "100 € con inflazione al 3% per 10 anni: quanto diventa il prezzo?",
        "options": [
          {
            "text": "130,00 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          },
          {
            "text": "103,00 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          },
          {
            "text": "134,39 €",
            "right": true
          },
          {
            "text": "143,93 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          }
        ],
        "explain": "Con un TAN del 18% il tasso mensile è 1,5%; senza pagamenti, in 12 mesi il debito diventa capitale × (1,015)¹²."
      }
    ],
    "source": "C08-L02"
  },
  "p8-l3": {
    "id": "p8-l3",
    "code": "L3",
    "floor": 8,
    "title": "Comprare a rate",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Comprare a rate",
        "mentor": "In un’offerta a «tasso zero» cosa conviene controllare ancora? a) TAEG e spese di istruttoria; b) il colore del prodotto; c) se il prezzo a rate è uguale a quello a vista.",
        "options": [
          {
            "text": "a) e c)",
            "right": true
          },
          {
            "text": "Solo a)",
            "right": false,
            "why": "Pagare a rate fa sembrare un acquisto più leggero, ma il costo totale è la somma di tutte le rate: la differenza rispetto al prezzo è il costo del credito."
          },
          {
            "text": "Solo b)",
            "right": false,
            "why": "Pagare a rate fa sembrare un acquisto più leggero, ma il costo totale è la somma di tutte le rate: la differenza rispetto al prezzo è il costo del credito."
          },
          {
            "text": "b) e c)",
            "right": false,
            "why": "Pagare a rate fa sembrare un acquisto più leggero, ma il costo totale è la somma di tutte le rate: la differenza rispetto al prezzo è il costo del credito."
          }
        ],
        "theory": "Pagare a rate fa sembrare un acquisto più leggero, ma il costo totale è la somma di tutte le rate: la differenza rispetto al prezzo è il costo del credito. Prima di accettare si confrontano prezzo, rata, numero di rate e costo totale.",
        "explain": "Con rate costanti mensili, la rata si calcola con la formula rata = capitale × i ÷ (1 − (1 + i)^−n), dove i è il tasso mensile (TAN ÷ 12) e n il numero di rate."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "600 € in 12 rate a tasso zero. Quanto è la rata?",
        "options": [
          {
            "text": "600 €",
            "right": false,
            "why": "600 ÷ 12 = 50 €."
          },
          {
            "text": "50 €",
            "right": true
          },
          {
            "text": "12 €",
            "right": false,
            "why": "600 ÷ 12 = 50 €."
          },
          {
            "text": "62 €",
            "right": false,
            "why": "600 ÷ 12 = 50 €."
          }
        ],
        "explain": "Il costo del credito è rata × n − prezzo. Pagare a rate toglie flessibilità: le rate sono impegni fissi per mesi."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un acquisto da 600 € in 12 rate: con TAN 12% la rata è circa 53,31 €. Quanto più della rata a tasso zero?",
        "options": [
          {
            "text": "53,31 € al mese",
            "right": false,
            "why": "53,31 − 50 = 3,31 €."
          },
          {
            "text": "3,31 € al mese",
            "right": true
          },
          {
            "text": "6,6 € al mese",
            "right": false,
            "why": "53,31 − 50 = 3,31 €."
          },
          {
            "text": "0 €",
            "right": false,
            "why": "53,31 − 50 = 3,31 €."
          }
        ],
        "explain": "Guardare solo la rata («poco al mese») e non il totale; oppure sommare tanti acquisti a rate fino a non avere più margine nel budget mensile.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "360 € in 12 rate a tasso zero: rata?",
            "options": [
              {
                "text": "36 €",
                "right": false,
                "why": "360 ÷ 12 = 30 €."
              },
              {
                "text": "12 €",
                "right": false,
                "why": "360 ÷ 12 = 30 €."
              },
              {
                "text": "360 €",
                "right": false,
                "why": "360 ÷ 12 = 30 €."
              },
              {
                "text": "30 €",
                "right": true
              }
            ],
            "explain": "Guardare solo la rata («poco al mese») e non il totale; oppure sommare tanti acquisti a rate fino a non avere più margine nel budget mensile."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Totale circa 639,71 € su un prezzo di 600 €: costo del credito e percentuale del prezzo?",
        "options": [
          {
            "text": "Circa 39,71 €, cioè 66% del prezzo",
            "right": false,
            "why": "639,71 − 600 = 39,71; 39,71 ÷ 600 = 6,6%."
          },
          {
            "text": "Circa 639,71 €, cioè 6,6% del prezzo",
            "right": false,
            "why": "639,71 − 600 = 39,71; 39,71 ÷ 600 = 6,6%."
          },
          {
            "text": "Circa 39,71 €, cioè 6,6% del prezzo",
            "right": true
          },
          {
            "text": "Circa 3,31 €, cioè 0,6% del prezzo",
            "right": false,
            "why": "639,71 − 600 = 39,71; 39,71 ÷ 600 = 6,6%."
          }
        ],
        "explain": "Il costo del credito è rata × n − prezzo. Pagare a rate toglie flessibilità: le rate sono impegni fissi per mesi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Totale a rate 400 € su un prezzo di 360 €: costo del credito e percentuale?",
            "options": [
              {
                "text": "40 €, 1,1%",
                "right": false,
                "why": "40 ÷ 360 = 11,1%."
              },
              {
                "text": "400 €, 11,1%",
                "right": false,
                "why": "40 ÷ 360 = 11,1%."
              },
              {
                "text": "40 €, 11,1%",
                "right": true
              },
              {
                "text": "4 €, 1,1%",
                "right": false,
                "why": "40 ÷ 360 = 11,1%."
              }
            ],
            "explain": "Il costo del credito è rata × n − prezzo. Pagare a rate toglie flessibilità: le rate sono impegni fissi per mesi."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.200 € in 24 rate al TAN 15%: rata circa 58,18 €. Totale e costo del credito?",
        "options": [
          {
            "text": "Totale circa 1.396,42 €; costo circa 1.396,42 €",
            "right": false,
            "why": "Circa 1.396,42 € in totale; costo circa 196,42 €, cioè il 16,4% del prezzo."
          },
          {
            "text": "Totale circa 1.258,18 €; costo circa 58,18 €, cioè 4,8%",
            "right": false,
            "why": "Circa 1.396,42 € in totale; costo circa 196,42 €, cioè il 16,4% del prezzo."
          },
          {
            "text": "Totale circa 1.396,42 €; costo circa 196,42 €, cioè 16,4% del prezzo",
            "right": true
          },
          {
            "text": "Totale 1.200 €; costo 0 €",
            "right": false,
            "why": "Circa 1.396,42 € in totale; costo circa 196,42 €, cioè il 16,4% del prezzo."
          }
        ],
        "explain": "Il costo del credito è rata × n − prezzo. Pagare a rate toglie flessibilità: le rate sono impegni fissi per mesi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché confrontare prezzo a rate e a vista?",
            "options": [
              {
                "text": "Perché sono sempre uguali",
                "right": false,
                "why": "La differenza è il costo del credito."
              },
              {
                "text": "Perché la rata non conta",
                "right": false,
                "why": "La differenza è il costo del credito."
              },
              {
                "text": "Per vedere quanto costa davvero il credito",
                "right": true
              },
              {
                "text": "Perché a rate costa meno",
                "right": false,
                "why": "La differenza è il costo del credito."
              }
            ],
            "explain": "Il costo del credito è rata × n − prezzo. Pagare a rate toglie flessibilità: le rate sono impegni fissi per mesi."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Vuoi un telefono da 600 € e puoi mettere da parte 50 € al mese. Cosa fai?",
        "options": [
          {
            "text": "Risparmio per 12 mesi e lo pago a vista, evitando gli interessi (se il telefono attuale funziona)",
            "right": true
          },
          {
            "text": "Lo compro subito a rate",
            "right": false,
            "why": "B), se il telefono attuale funziona. Se serve subito, un piano con meno interessi e un fondo intatto è meglio della rata più comoda."
          },
          {
            "text": "Lo compro a rate e smetto di risparmiare",
            "right": false,
            "why": "B), se il telefono attuale funziona. Se serve subito, un piano con meno interessi e un fondo intatto è meglio della rata più comoda."
          },
          {
            "text": "Lo compro a rate e uso i 50 € per altre spese",
            "right": false,
            "why": "B), se il telefono attuale funziona. Se serve subito, un piano con meno interessi e un fondo intatto è meglio della rata più comoda."
          }
        ],
        "explain": "Pagare a rate toglie flessibilità: le rate sono impegni fissi per mesi. Guardare solo la rata («poco al mese») e non il totale; oppure sommare tanti acquisti a rate fino a non avere più margine nel budget mensile."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L2)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Debito di 1.000 € al TAN 18%: quanto è l’interesse del primo mese?",
        "options": [
          {
            "text": "15 €",
            "right": true
          },
          {
            "text": "180 €",
            "right": false,
            "why": "1.000 × 1,5% = 15 €."
          },
          {
            "text": "1,50 €",
            "right": false,
            "why": "1.000 × 1,5% = 15 €."
          },
          {
            "text": "150 €",
            "right": false,
            "why": "1.000 × 1,5% = 15 €."
          }
        ],
        "explain": "Pagare a rate toglie flessibilità: le rate sono impegni fissi per mesi. Guardare solo la rata («poco al mese») e non il totale; oppure sommare tanti acquisti a rate fino a non avere più margine nel budget mensile."
      }
    ],
    "source": "C08-L03"
  },
  "p8-l4": {
    "id": "p8-l4",
    "code": "L4",
    "floor": 8,
    "title": "Affitto o acquisto: i costi della casa",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Affitto o acquisto",
        "mentor": "In una rata di mutuo, quale parte è un costo vero e quale costruisce patrimonio?",
        "options": [
          {
            "text": "Gli interessi costruiscono patrimonio; il capitale è costo",
            "right": false,
            "why": "Comprare casa non è sempre più conveniente che affittare, e affittare non è «buttare i soldi»."
          },
          {
            "text": "Entrambi sono costo vero",
            "right": false,
            "why": "Comprare casa non è sempre più conveniente che affittare, e affittare non è «buttare i soldi»."
          },
          {
            "text": "Entrambi costruiscono patrimonio",
            "right": false,
            "why": "Comprare casa non è sempre più conveniente che affittare, e affittare non è «buttare i soldi»."
          },
          {
            "text": "Gli interessi sono costo vero; la quota capitale riduce il debito e costruisce patrimonio",
            "right": true
          }
        ],
        "theory": "Comprare casa non è sempre più conveniente che affittare, e affittare non è «buttare i soldi». Si confrontano i costi veri di ogni anno, comprese le spese che non si vedono nella rata.",
        "explain": "Chi compra paga la rata del mutuo, ma solo una parte della rata è costo vero: gli interessi; la parte restante è capitale che riduce il debito e diventa patrimonio."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Affitto di 600 € al mese: quanto costa in 10 anni?",
        "options": [
          {
            "text": "72.000 €",
            "right": true
          },
          {
            "text": "7.200 €",
            "right": false,
            "why": "600 × 12 × 10 = 72.000 €."
          },
          {
            "text": "60.000 €",
            "right": false,
            "why": "600 × 12 × 10 = 72.000 €."
          },
          {
            "text": "86.400 €",
            "right": false,
            "why": "600 × 12 × 10 = 72.000 €."
          }
        ],
        "explain": "Confrontare solo la rata e l’affitto: la rata include capitale, che non è un costo perso, mentre si dimenticano manutenzione, imposte e anticipo."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Rata di 750,94 € al mese: quanto in un anno e di quanto supera l’affitto annuo di 7.200 €?",
        "options": [
          {
            "text": "9.011,28 € l’anno; supera l’affitto di 7.200 €",
            "right": false,
            "why": "750,94 × 12 = 9.011,28; 9.011,28 − 7.200 = 1.811,28 €."
          },
          {
            "text": "750,94 € l’anno; supera l’affitto di 150,94 €",
            "right": false,
            "why": "750,94 × 12 = 9.011,28; 9.011,28 − 7.200 = 1.811,28 €."
          },
          {
            "text": "9.011,28 € l’anno; supera l’affitto di 1.811,28 €",
            "right": true
          },
          {
            "text": "9.011,28 € l’anno; supera l’affitto di 2.011,28 €",
            "right": false,
            "why": "750,94 × 12 = 9.011,28; 9.011,28 − 7.200 = 1.811,28 €."
          }
        ],
        "explain": "La scelta dipende da quanto tempo si resta, dal prezzo della casa e dell’affitto, dai tassi e dalla stabilità del lavoro.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Affitto 500 € al mese: quanto in 5 anni?",
            "options": [
              {
                "text": "30.000 €",
                "right": true
              },
              {
                "text": "6.000 €",
                "right": false,
                "why": "500 × 12 × 5 = 30.000 €."
              },
              {
                "text": "25.000 €",
                "right": false,
                "why": "500 × 12 × 5 = 30.000 €."
              },
              {
                "text": "3.000 €",
                "right": false,
                "why": "500 × 12 × 5 = 30.000 €."
              }
            ],
            "explain": "La scelta dipende da quanto tempo si resta, dal prezzo della casa e dell’affitto, dai tassi e dalla stabilità del lavoro."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Primo anno di mutuo: interessi circa 5.189 € e manutenzione 2.000 €. Affitto annuo 7.200 €, costo opportunità dell’anticipo 1.000 €. Costo vero e confronto con l’affitto?",
        "options": [
          {
            "text": "7.189 €, molto meno dell’affitto",
            "right": false,
            "why": "5.189 + 2.000 = 7.189; + 1.000 = 8.189 €."
          },
          {
            "text": "5.189 €, molto meno dell’affitto",
            "right": false,
            "why": "5.189 + 2.000 = 7.189; + 1.000 = 8.189 €."
          },
          {
            "text": "9.189 €, molto più dell’affitto",
            "right": false,
            "why": "5.189 + 2.000 = 7.189; + 1.000 = 8.189 €."
          },
          {
            "text": "7.189 €, quasi uguale all’affitto; con il costo opportunità dell’anticipo sale a 8.189 €, più dell’affitto",
            "right": true
          }
        ],
        "explain": "Il costo vero di un anno di casa di proprietà è grosso modo interessi più spese (manutenzione, assicurazione, tasse) più il costo opportunità dell’anticipo, cioè quello che l’anticipo avrebbe potuto rendere altrove.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Rata 600 € al mese contro affitto annuo di 5.400 €: differenza annua?",
            "options": [
              {
                "text": "1.800 € in più la rata",
                "right": true
              },
              {
                "text": "1.800 € in meno la rata",
                "right": false,
                "why": "7.200 − 5.400 = 1.800 €."
              },
              {
                "text": "600 € in più",
                "right": false,
                "why": "7.200 − 5.400 = 1.800 €."
              },
              {
                "text": "Nessuna",
                "right": false,
                "why": "7.200 − 5.400 = 1.800 €."
              }
            ],
            "explain": "Confrontare solo la rata e l’affitto: la rata include capitale, che non è un costo perso, mentre si dimenticano manutenzione, imposte e anticipo."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Dei circa 9.011 € di rata annua di un mutuo, gli interessi del primo anno sono circa 5.189 €. Quanto è capitale rimborsato?",
        "options": [
          {
            "text": "Circa 9.011 €",
            "right": false,
            "why": "9.011 − 5.189 = 3.822 €."
          },
          {
            "text": "Circa 5.189 €",
            "right": false,
            "why": "9.011 − 5.189 = 3.822 €."
          },
          {
            "text": "Circa 750,94 €",
            "right": false,
            "why": "9.011 − 5.189 = 3.822 €."
          },
          {
            "text": "Circa 3.822 €",
            "right": true
          }
        ],
        "explain": "Chi affitta paga il canone: non costruisce un patrimonio ma ha flessibilità (si può cambiare città o casa) e pochi costi extra.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché affittare non è «buttare i soldi»?",
            "options": [
              {
                "text": "Perché l’affitto diventa proprietà",
                "right": false,
                "why": "Il costo dell’affitto compra l’uso e la flessibilità."
              },
              {
                "text": "Si paga un servizio e si mantiene flessibilità",
                "right": true
              },
              {
                "text": "Perché non ha alcun costo",
                "right": false,
                "why": "Il costo dell’affitto compra l’uso e la flessibilità."
              },
              {
                "text": "Perché è sempre più conveniente",
                "right": false,
                "why": "Il costo dell’affitto compra l’uso e la flessibilità."
              }
            ],
            "explain": "Chi affitta paga il canone: non costruisce un patrimonio ma ha flessibilità (si può cambiare città o casa) e pochi costi extra."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Lavori da due anni in una città, non sai se ci resterai e hai poco anticipo. Affitto o acquisto?",
        "options": [
          {
            "text": "Affitto, tengo un fondo e rivaluto quando lavoro e anticipo sono più stabili",
            "right": true
          },
          {
            "text": "Compro subito",
            "right": false,
            "why": "B), in genere. Comprare vincola e ha costi iniziali; senza stabilità e anticipo il rischio aumenta (L6)."
          },
          {
            "text": "Compro con un mutuo al 100%",
            "right": false,
            "why": "B), in genere. Comprare vincola e ha costi iniziali; senza stabilità e anticipo il rischio aumenta (L6)."
          },
          {
            "text": "Compro usando un anticipo preso a prestito",
            "right": false,
            "why": "B), in genere. Comprare vincola e ha costi iniziali; senza stabilità e anticipo il rischio aumenta (L6)."
          }
        ],
        "explain": "Ci sono anche costi iniziali (imposte, notaio, eventuale agenzia) e vincoli (comprare riduce la flessibilità)."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L3)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "1.200 € in 24 rate al TAN 15%: costo del credito circa?",
        "options": [
          {
            "text": "Circa 1.396,42 €",
            "right": false,
            "why": "1.396,42 − 1.200 = 196,42 €."
          },
          {
            "text": "Circa 58,18 €",
            "right": false,
            "why": "1.396,42 − 1.200 = 196,42 €."
          },
          {
            "text": "Circa 196,42 €",
            "right": true
          },
          {
            "text": "Circa 15 €",
            "right": false,
            "why": "1.396,42 − 1.200 = 196,42 €."
          }
        ],
        "explain": "Importi e tassi qui sono esempi; le imposte e le agevolazioni reali sulla prima casa vanno verificate con fonti ufficiali."
      }
    ],
    "source": "C08-L04"
  },
  "p8-l5": {
    "id": "p8-l5",
    "code": "L5",
    "floor": 8,
    "title": "Il mutuo: rata, tasso e ammortamento",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Il mutuo",
        "mentor": "Differenza tra mutuo a tasso fisso e variabile?",
        "options": [
          {
            "text": "Nel fisso la rata segue un indice; nel variabile non cambia",
            "right": false,
            "why": "Un mutuo è un prestito a lungo termine per comprare casa, restituito con rate costanti."
          },
          {
            "text": "Il fisso dura meno anni del variabile",
            "right": false,
            "why": "Un mutuo è un prestito a lungo termine per comprare casa, restituito con rate costanti."
          },
          {
            "text": "Non c’è differenza",
            "right": false,
            "why": "Un mutuo è un prestito a lungo termine per comprare casa, restituito con rate costanti."
          },
          {
            "text": "Nel fisso la rata non cambia; nel variabile segue un indice e può salire o scendere",
            "right": true
          }
        ],
        "theory": "Un mutuo è un prestito a lungo termine per comprare casa, restituito con rate costanti. All’inizio la rata è fatta soprattutto di interessi: il debito scende lentamente, e la durata e il tasso cambiano il costo totale di decine di migliaia di euro.",
        "explain": "Il tasso può essere fisso (la rata non cambia per tutta la durata) o variabile (segue un indice di mercato e la rata può salire o scendere)."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Mutuo 150.000 € al 3,5%: interessi del primo mese? E capitale rimborsato con rata di 750,94 €?",
        "options": [
          {
            "text": "Interessi 313,44 €; capitale 437,50 €",
            "right": false,
            "why": "150.000 × 0,035 ÷ 12 = 437,50; 750,94 − 437,50 = 313,44 €."
          },
          {
            "text": "Interessi 5.250 €; capitale 0 €",
            "right": false,
            "why": "150.000 × 0,035 ÷ 12 = 437,50; 750,94 − 437,50 = 313,44 €."
          },
          {
            "text": "Interessi 437,50 €; capitale 750,94 €",
            "right": false,
            "why": "150.000 × 0,035 ÷ 12 = 437,50; 750,94 − 437,50 = 313,44 €."
          },
          {
            "text": "Interessi 437,50 €; capitale circa 313,44 €",
            "right": true
          }
        ],
        "explain": "Nell’ammortamento alla francese la rata è costante e ogni mese si divide in interessi (tasso mensile × debito residuo) e capitale (il resto)."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Rata 750,94 € per 300 mesi: quanto si restituisce in totale e quanti sono gli interessi?",
        "options": [
          {
            "text": "Circa 225.280 € in totale; interessi circa 75.280 €, il 50% del capitale",
            "right": true
          },
          {
            "text": "Circa 225.280 € in totale; interessi 150.000 €",
            "right": false,
            "why": "Circa 225.280 € in totale, interessi circa 75.280 €, cioè il 50% del capitale prestato."
          },
          {
            "text": "150.000 € in totale; interessi 0 €",
            "right": false,
            "why": "Circa 225.280 € in totale, interessi circa 75.280 €, cioè il 50% del capitale prestato."
          },
          {
            "text": "Circa 225.280 € in totale; interessi circa 7.528 €, il 5%",
            "right": false,
            "why": "Circa 225.280 € in totale, interessi circa 75.280 €, cioè il 50% del capitale prestato."
          }
        ],
        "explain": "Concentrarsi solo sulla rata e non sul costo totale; oppure pensare che dopo molti anni il debito sia quasi finito, quando i primi anni rimborsano poco capitale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Mutuo 100.000 € al 3%: interessi del primo mese?",
            "options": [
              {
                "text": "3.000 €",
                "right": false,
                "why": "100.000 × 0,03 ÷ 12 = 250 €."
              },
              {
                "text": "300 €",
                "right": false,
                "why": "100.000 × 0,03 ÷ 12 = 250 €."
              },
              {
                "text": "25 €",
                "right": false,
                "why": "100.000 × 0,03 ÷ 12 = 250 €."
              },
              {
                "text": "250 €",
                "right": true
              }
            ],
            "explain": "Concentrarsi solo sulla rata e non sul costo totale; oppure pensare che dopo molti anni il debito sia quasi finito, quando i primi anni rimborsano poco capitale."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un mutuo da 150.000 € al 3,5% in 25 anni ha rata 750,94 € e interessi totali 75.280,61 €. In 20 anni la rata è circa 869,94 € (interessi 58.785,50 €). Di quanto cresce la rata e quanto si risparmia in interessi?",
        "options": [
          {
            "text": "La rata scende di circa 119 €; gli interessi salgono di 16.495 €",
            "right": false,
            "why": "869,94 − 750,94 = 119; 75.280,61 − 58.785,50 ≈ 16.495 €."
          },
          {
            "text": "La rata cresce di 869,94 €; gli interessi scendono di 58.785 €",
            "right": false,
            "why": "869,94 − 750,94 = 119; 75.280,61 − 58.785,50 ≈ 16.495 €."
          },
          {
            "text": "La rata cresce di circa 119 €; gli interessi scendono di circa 16.495 €",
            "right": true
          },
          {
            "text": "La rata cresce di circa 119 €; gli interessi scendono di 75.280 €",
            "right": false,
            "why": "869,94 − 750,94 = 119; 75.280,61 − 58.785,50 ≈ 16.495 €."
          }
        ],
        "explain": "Man mano che il debito scende, gli interessi calano e la quota capitale cresce.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Rata 500 € per 240 mesi: totale restituito?",
            "options": [
              {
                "text": "120.000 €",
                "right": true
              },
              {
                "text": "100.000 €",
                "right": false,
                "why": "500 × 240 = 120.000 €."
              },
              {
                "text": "12.000 €",
                "right": false,
                "why": "500 × 240 = 120.000 €."
              },
              {
                "text": "60.000 €",
                "right": false,
                "why": "500 × 240 = 120.000 €."
              }
            ],
            "explain": "Concentrarsi solo sulla rata e non sul costo totale; oppure pensare che dopo molti anni il debito sia quasi finito, quando i primi anni rimborsano poco capitale."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Dopo 10 anni di un mutuo a 25 anni, il debito residuo è circa 105.043 €. Quanta parte dei 150.000 € è ancora da restituire?",
        "options": [
          {
            "text": "30%",
            "right": false,
            "why": "105.043 ÷ 150.000 = 70%."
          },
          {
            "text": "70%",
            "right": true
          },
          {
            "text": "50%",
            "right": false,
            "why": "105.043 ÷ 150.000 = 70%."
          },
          {
            "text": "105%",
            "right": false,
            "why": "105.043 ÷ 150.000 = 70%."
          }
        ],
        "explain": "Un mutuo richiede un reddito stabile e un anticipo (di solito una quota del prezzo); i minorenni non possono stipularlo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché all’inizio la rata è soprattutto interessi?",
            "options": [
              {
                "text": "Perché il capitale si paga per primo",
                "right": false,
                "why": "Gli interessi si calcolano sul debito residuo."
              },
              {
                "text": "Perché il debito residuo è ancora alto",
                "right": true
              },
              {
                "text": "Perché la banca cambia il tasso",
                "right": false,
                "why": "Gli interessi si calcolano sul debito residuo."
              },
              {
                "text": "Perché gli interessi sono fissi",
                "right": false,
                "why": "Gli interessi si calcolano sul debito residuo."
              }
            ],
            "explain": "Nell’ammortamento alla francese la rata è costante e ogni mese si divide in interessi (tasso mensile × debito residuo) e capitale (il resto)."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai un budget di rata di 800 €. Scegli tra 25 anni (750,94 €) e 20 anni (869,94 €). Cosa fai?",
        "options": [
          {
            "text": "20 anni, anche se supera il budget",
            "right": false,
            "why": "B). La rata va tenuta nel budget; i vantaggi della durata breve non valgono la perdita del fondo (da verificare le regole sull’estinzione anticipata)."
          },
          {
            "text": "25 anni, restando nel budget, magari con estinzione anticipata se il reddito cresce",
            "right": true
          },
          {
            "text": "20 anni, togliendo il fondo di emergenza",
            "right": false,
            "why": "B). La rata va tenuta nel budget; i vantaggi della durata breve non valgono la perdita del fondo (da verificare le regole sull’estinzione anticipata)."
          },
          {
            "text": "40 anni per abbassare la rata il più possibile",
            "right": false,
            "why": "B). La rata va tenuta nel budget; i vantaggi della durata breve non valgono la perdita del fondo (da verificare le regole sull’estinzione anticipata)."
          }
        ],
        "explain": "Tassi e importi sono esempi, non offerte."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L4)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una rata di 750,94 € al mese vale quanto in un anno?",
        "options": [
          {
            "text": "750,94 €",
            "right": false,
            "why": "750,94 × 12 = 9.011,28 €."
          },
          {
            "text": "7.200 €",
            "right": false,
            "why": "750,94 × 12 = 9.011,28 €."
          },
          {
            "text": "8.000 €",
            "right": false,
            "why": "750,94 × 12 = 9.011,28 €."
          },
          {
            "text": "9.011,28 €",
            "right": true
          }
        ],
        "explain": "Concentrarsi solo sulla rata e non sul costo totale; oppure pensare che dopo molti anni il debito sia quasi finito, quando i primi anni rimborsano poco capitale."
      }
    ],
    "source": "C08-L05"
  },
  "p8-l6": {
    "id": "p8-l6",
    "code": "L6",
    "floor": 8,
    "title": "Un mutuo sostenibile",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Un mutuo sostenibile",
        "mentor": "Cosa misura il rapporto rata/reddito?",
        "options": [
          {
            "text": "Quanta parte del patrimonio è ipotecata",
            "right": false,
            "why": "Un mutuo è sostenibile se la rata resta pagabile anche quando le cose vanno peggio: tassi che salgono, reddito che cala, spese impreviste."
          },
          {
            "text": "Il tasso di interesse del mutuo",
            "right": false,
            "why": "Un mutuo è sostenibile se la rata resta pagabile anche quando le cose vanno peggio: tassi che salgono, reddito che cala, spese impreviste."
          },
          {
            "text": "Quanta parte del reddito netto mensile è assorbita dalla rata",
            "right": true
          },
          {
            "text": "Quanti anni durerà il mutuo",
            "right": false,
            "why": "Un mutuo è sostenibile se la rata resta pagabile anche quando le cose vanno peggio: tassi che salgono, reddito che cala, spese impreviste."
          }
        ],
        "theory": "Un mutuo è sostenibile se la rata resta pagabile anche quando le cose vanno peggio: tassi che salgono, reddito che cala, spese impreviste. Si misura il peso della rata sul reddito e si prova uno scenario sfavorevole prima di firmare.",
        "explain": "Più alto è il rapporto, più un imprevisto fa male. Un anticipo più alto riduce il debito e quindi la rata."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Rata 750,94 € e reddito netto 2.500 €: che percentuale?",
        "options": [
          {
            "text": "3,0%",
            "right": false,
            "why": "750,94 ÷ 2.500 = 30,0%."
          },
          {
            "text": "33,3%",
            "right": false,
            "why": "750,94 ÷ 2.500 = 30,0%."
          },
          {
            "text": "300%",
            "right": false,
            "why": "750,94 ÷ 2.500 = 30,0%."
          },
          {
            "text": "30,0%",
            "right": true
          }
        ],
        "explain": "Con un tasso variabile la rata può salire: si simula uno scenario con tasso più alto e si verifica se il budget regge ancora."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con reddito netto 2.500 €, se la rata sale a 876,89 € (tasso 5%), che percentuale del reddito è?",
        "options": [
          {
            "text": "35,1%",
            "right": true
          },
          {
            "text": "30,0%",
            "right": false,
            "why": "876,89 ÷ 2.500 = 35,1%."
          },
          {
            "text": "50,1%",
            "right": false,
            "why": "876,89 ÷ 2.500 = 35,1%."
          },
          {
            "text": "3,5%",
            "right": false,
            "why": "876,89 ÷ 2.500 = 35,1%."
          }
        ],
        "explain": "Calcolare la rata solo con il tasso di oggi e al massimo del budget, senza margine; oppure usare il fondo di emergenza per aumentare l’anticipo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Rata 600 € e reddito netto 2.000 €: quale percentuale?",
            "options": [
              {
                "text": "3%",
                "right": false,
                "why": "600 ÷ 2.000 = 30%."
              },
              {
                "text": "33%",
                "right": false,
                "why": "600 ÷ 2.000 = 30%."
              },
              {
                "text": "30%",
                "right": true
              },
              {
                "text": "12%",
                "right": false,
                "why": "600 ÷ 2.000 = 30%."
              }
            ],
            "explain": "Calcolare la rata solo con il tasso di oggi e al massimo del budget, senza margine; oppure usare il fondo di emergenza per aumentare l’anticipo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Mutuo variabile: rata 672,93 € al 2,5% e 876,89 € al 5%. Di quanto cresce, in euro e in percentuale?",
        "options": [
          {
            "text": "+203,96 €, cioè +30,3%",
            "right": true
          },
          {
            "text": "+203,96 €, cioè +3%",
            "right": false,
            "why": "876,89 − 672,93 = 203,96; 203,96 ÷ 672,93 = 30,3%."
          },
          {
            "text": "+30,3 €, cioè +203,96%",
            "right": false,
            "why": "876,89 − 672,93 = 203,96; 203,96 ÷ 672,93 = 30,3%."
          },
          {
            "text": "+876,89 €, cioè +30%",
            "right": false,
            "why": "876,89 − 672,93 = 203,96; 203,96 ÷ 672,93 = 30,3%."
          }
        ],
        "explain": "Prima di firmare si controlla anche che resti il fondo di emergenza (Cap. 5) e si calcolano i costi iniziali.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "La rata sale da 600 € a 720 €: aumento in euro e percentuale?",
            "options": [
              {
                "text": "+120 €, +12%",
                "right": false,
                "why": "120 ÷ 600 = 20%."
              },
              {
                "text": "+120 €, +20%",
                "right": true
              },
              {
                "text": "+20 €, +120%",
                "right": false,
                "why": "120 ÷ 600 = 20%."
              },
              {
                "text": "+720 €, +20%",
                "right": false,
                "why": "120 ÷ 600 = 20%."
              }
            ],
            "explain": "Un anticipo più alto riduce il debito e quindi la rata. Con un tasso variabile la rata può salire: si simula uno scenario con tasso più alto e si verifica se il budget regge ancora."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con anticipo di 10.000 € il mutuo è di 190.000 € e la rata circa 951,18 €. Che percentuale del reddito di 2.500 €?",
        "options": [
          {
            "text": "30,0%",
            "right": false,
            "why": "951,18 ÷ 2.500 = 38,0%."
          },
          {
            "text": "28,0%",
            "right": false,
            "why": "951,18 ÷ 2.500 = 38,0%."
          },
          {
            "text": "380%",
            "right": false,
            "why": "951,18 ÷ 2.500 = 38,0%."
          },
          {
            "text": "38,0%",
            "right": true
          }
        ],
        "explain": "Un anticipo più alto riduce il debito e quindi la rata. Con un tasso variabile la rata può salire: si simula uno scenario con tasso più alto e si verifica se il budget regge ancora.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché valutare lo scenario peggiore?",
            "options": [
              {
                "text": "Per sapere se la rata resta pagabile se le cose peggiorano",
                "right": true
              },
              {
                "text": "Perché accadrà di sicuro",
                "right": false,
                "why": "Un mutuo sostenibile regge anche agli imprevisti."
              },
              {
                "text": "Perché lo chiede il notaio",
                "right": false,
                "why": "Un mutuo sostenibile regge anche agli imprevisti."
              },
              {
                "text": "Perché fa scendere i tassi",
                "right": false,
                "why": "Un mutuo sostenibile regge anche agli imprevisti."
              }
            ],
            "explain": "Con un tasso variabile la rata può salire: si simula uno scenario con tasso più alto e si verifica se il budget regge ancora."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un mutuo variabile parte con rata bassa (672,93 €) ma potrebbe salire a 876,89 €; uno fisso ha rata di 750,94 €. Cosa fai?",
        "options": [
          {
            "text": "Scelgo il variabile perché oggi costa meno",
            "right": false,
            "why": "B). La rata iniziale non basta: conta cosa succede se i tassi salgono (da verificare i tipi di mutuo e le possibilità di surroga o rinegoziazione)."
          },
          {
            "text": "Scelgo a caso",
            "right": false,
            "why": "B). La rata iniziale non basta: conta cosa succede se i tassi salgono (da verificare i tipi di mutuo e le possibilità di surroga o rinegoziazione)."
          },
          {
            "text": "Scelgo in base a quanto reggo nello scenario peggiore e alla stabilità del mio reddito, preferendo il fisso se un rialzo mi metterebbe in difficoltà",
            "right": true
          },
          {
            "text": "Scelgo il fisso a prescindere perché è sempre migliore",
            "right": false,
            "why": "B). La rata iniziale non basta: conta cosa succede se i tassi salgono (da verificare i tipi di mutuo e le possibilità di surroga o rinegoziazione)."
          }
        ],
        "explain": "Con un tasso variabile la rata può salire: si simula uno scenario con tasso più alto e si verifica se il budget regge ancora."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (L5)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Mutuo 150.000 € al 3,5%, rata 750,94 €: quota capitale del primo mese?",
        "options": [
          {
            "text": "Circa 437,50 €",
            "right": false,
            "why": "750,94 − 437,50 = 313,44 €."
          },
          {
            "text": "Circa 750,94 €",
            "right": false,
            "why": "750,94 − 437,50 = 313,44 €."
          },
          {
            "text": "Circa 313,44 €",
            "right": true
          },
          {
            "text": "Circa 3.761 €",
            "right": false,
            "why": "750,94 − 437,50 = 313,44 €."
          }
        ],
        "explain": "Un anticipo più alto riduce il debito e quindi la rata. Con un tasso variabile la rata può salire: si simula uno scenario con tasso più alto e si verifica se il budget regge ancora."
      }
    ],
    "source": "C08-L06"
  },
  "p9-l1": {
    "id": "p9-l1",
    "code": "L1",
    "floor": 9,
    "title": "Prestare denaro: cos’è un’obbligazione",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Prestare denaro",
        "mentor": "Qual è la differenza tra valore nominale e cedola?",
        "options": [
          {
            "text": "Il nominale è la cifra restituita alla scadenza; la cedola è l’interesse periodico, in percentuale sul nominale",
            "right": true
          },
          {
            "text": "Il nominale è l’interesse periodico; la cedola è la cifra restituita alla scadenza",
            "right": false,
            "why": "Il nominale è la cifra che l’emittente restituisce alla scadenza; la cedola è l’interesse periodico, calcolato in percentuale sul nominale."
          },
          {
            "text": "Sono la stessa cosa con nomi diversi",
            "right": false,
            "why": "Il nominale è la cifra che l’emittente restituisce alla scadenza; la cedola è l’interesse periodico, calcolato in percentuale sul nominale."
          },
          {
            "text": "Il nominale è il prezzo di mercato; la cedola è la commissione",
            "right": false,
            "why": "Il nominale è la cifra che l’emittente restituisce alla scadenza; la cedola è l’interesse periodico, calcolato in percentuale sul nominale."
          }
        ],
        "theory": "Un’obbligazione è un prestito con regole scritte: tu presti soldi a uno Stato o a un’azienda, loro ti pagano un interesse a date fisse e ti restituiscono il capitale alla scadenza.",
        "explain": "Un’obbligazione fissa tutto prima: il valore nominale (la cifra che ti sarà restituita, qui 1.000 €), la cedola (l’interesse, espresso in % del nominale e pagato ogni anno o ogni sei mesi) e la scadenza (la data in cui il nominale viene rimborsato)."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un’obbligazione ha nominale 1.000 € e cedola annua 3%. Quanto paga ogni anno?",
        "options": [
          {
            "text": "30 €",
            "right": true
          },
          {
            "text": "300 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          },
          {
            "text": "3 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          },
          {
            "text": "1.030 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          }
        ],
        "explain": "L’obbligazione di esempio ha nominale 1.000 €, cedola annua 3% e scadenza a 5 anni: ogni anno paga 1.000 × 0,03 = 30 €."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un’obbligazione da 1.000 € con cedola 3% dura 5 anni. Quante cedole incassi in tutto (in euro)?",
        "options": [
          {
            "text": "30 €",
            "right": false,
            "why": "30 × 5 = 150 €."
          },
          {
            "text": "180 €",
            "right": false,
            "why": "30 × 5 = 150 €."
          },
          {
            "text": "1.150 €",
            "right": false,
            "why": "30 × 5 = 150 €."
          },
          {
            "text": "150 €",
            "right": true
          }
        ],
        "explain": "Chi emette l’obbligazione si chiama emittente: può essere uno Stato o un’azienda. Chi la compra è un creditore, non un socio: non possiede una parte dell’azienda, ha solo diritto a cedole e rimborso.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Obbligazione con nominale 500 € e cedola annua 4%: quanto paga ogni anno?",
            "options": [
              {
                "text": "200 €",
                "right": false,
                "why": "500 × 0,04 = 20 €."
              },
              {
                "text": "20 €",
                "right": true
              },
              {
                "text": "2 €",
                "right": false,
                "why": "500 × 0,04 = 20 €."
              },
              {
                "text": "504 €",
                "right": false,
                "why": "500 × 0,04 = 20 €."
              }
            ],
            "explain": "Chi emette l’obbligazione si chiama emittente: può essere uno Stato o un’azienda. Chi la compra è un creditore, non un socio: non possiede una parte dell’azienda, ha solo diritto a cedole e rimborso."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un’obbligazione da 1.000 € con cedola 3% dura 5 anni. Alla scadenza quanto hai incassato in tutto, tra cedole e rimborso?",
        "options": [
          {
            "text": "1.150 €",
            "right": true
          },
          {
            "text": "1.030 €",
            "right": false,
            "why": "150 + 1.000 = 1.150 €."
          },
          {
            "text": "150 €",
            "right": false,
            "why": "150 + 1.000 = 1.150 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "150 + 1.000 = 1.150 €."
          }
        ],
        "explain": "Pensare che un’obbligazione sia come un conto: sul conto i soldi restano tuoi e disponibili, con l’obbligazione li hai prestati fino alla scadenza.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Stessa obbligazione, durata 3 anni: quanto incassi in tutto tra cedole e rimborso?",
            "options": [
              {
                "text": "560 €",
                "right": true
              },
              {
                "text": "60 €",
                "right": false,
                "why": "20 × 3 + 500 = 560 €."
              },
              {
                "text": "520 €",
                "right": false,
                "why": "20 × 3 + 500 = 560 €."
              },
              {
                "text": "500 €",
                "right": false,
                "why": "20 × 3 + 500 = 560 €."
              }
            ],
            "explain": "L’obbligazione di esempio ha nominale 1.000 €, cedola annua 3% e scadenza a 5 anni: ogni anno paga 1.000 × 0,03 = 30 €."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un’obbligazione da 1.000 € con cedola annua 3% pagata ogni sei mesi (stessa percentuale annua): quanto ricevi ogni volta?",
        "options": [
          {
            "text": "15 € ogni sei mesi, sempre 30 € all’anno",
            "right": true
          },
          {
            "text": "30 € ogni sei mesi, cioè 60 € all’anno",
            "right": false,
            "why": "30 ÷ 2 = 15 € ogni sei mesi, sempre 30 € all’anno."
          },
          {
            "text": "15 € ogni sei mesi, cioè 15 € all’anno",
            "right": false,
            "why": "30 ÷ 2 = 15 € ogni sei mesi, sempre 30 € all’anno."
          },
          {
            "text": "60 € ogni sei mesi",
            "right": false,
            "why": "30 ÷ 2 = 15 € ogni sei mesi, sempre 30 € all’anno."
          }
        ],
        "explain": "L’altro errore è credere che «obbligazione» significhi «sicuro al 100%»: significa che c’è un impegno scritto, che però può non essere rispettato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cosa restituisce l’emittente alla scadenza?",
            "options": [
              {
                "text": "Il valore nominale",
                "right": true
              },
              {
                "text": "Solo le cedole",
                "right": false,
                "why": "Alla scadenza si rimborsa il nominale."
              },
              {
                "text": "Il prezzo che hai pagato",
                "right": false,
                "why": "Alla scadenza si rimborsa il nominale."
              },
              {
                "text": "Nulla",
                "right": false,
                "why": "Alla scadenza si rimborsa il nominale."
              }
            ],
            "explain": "Un’obbligazione fissa tutto prima: il valore nominale (la cifra che ti sarà restituita, qui 1.000 €), la cedola (l’interesse, espresso in % del nominale e pagato ogni anno o ogni sei mesi) e la scadenza (la data in cui il nominale viene rimborsato)."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un amico ti chiede 100 € in prestito «per un po'».",
        "options": [
          {
            "text": "Li presti senza dire altro",
            "right": false,
            "why": "B). Un prestito chiaro ha le stesse parti di un’obbligazione (capitale, scadenza, interesse) e evita malintesi; senza regole non sai quando e se rivedrai i soldi."
          },
          {
            "text": "Rifiuti sempre qualsiasi prestito",
            "right": false,
            "why": "B). Un prestito chiaro ha le stesse parti di un’obbligazione (capitale, scadenza, interesse) e evita malintesi; senza regole non sai quando e se rivedrai i soldi."
          },
          {
            "text": "Ti fai promettere la restituzione a voce, senza date",
            "right": false,
            "why": "B). Un prestito chiaro ha le stesse parti di un’obbligazione (capitale, scadenza, interesse) e evita malintesi; senza regole non sai quando e se rivedrai i soldi."
          },
          {
            "text": "Concordi importo, data di restituzione ed eventuale interesse, anche con un messaggio scritto",
            "right": true
          }
        ],
        "explain": "Quando presti 100 € a un amico, di solito non scrivi niente: non sai quando te li dà e se aggiunge qualcosa."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 8)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un prezzo di 100 € con inflazione al 3% per 10 anni: quanto diventa?",
        "options": [
          {
            "text": "134,39 €",
            "right": true
          },
          {
            "text": "130,00 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          },
          {
            "text": "103,00 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          },
          {
            "text": "143,93 €",
            "right": false,
            "why": "100 × 1,03¹⁰ = 134,39 €."
          }
        ],
        "explain": "L’obbligazione di esempio ha nominale 1.000 €, cedola annua 3% e scadenza a 5 anni: ogni anno paga 1.000 × 0,03 = 30 €."
      }
    ],
    "source": "C09-L01"
  },
  "p9-l2": {
    "id": "p9-l2",
    "code": "L2",
    "floor": 9,
    "title": "Cedola, scadenza e rendimento",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Cedola, scadenza e rendimento",
        "mentor": "Cosa significa che un’obbligazione è «sotto la pari»?",
        "options": [
          {
            "text": "Che il suo prezzo di mercato è superiore al nominale",
            "right": false,
            "why": "La cedola dice quanto paga l’obbligazione sul nominale, ma quello che guadagni dipende da quanto l’hai pagata: lo stesso titolo può rendere di più o di meno a seconda del prezzo di acquisto."
          },
          {
            "text": "Che non paga cedole",
            "right": false,
            "why": "La cedola dice quanto paga l’obbligazione sul nominale, ma quello che guadagni dipende da quanto l’hai pagata: lo stesso titolo può rendere di più o di meno a seconda del prezzo di acquisto."
          },
          {
            "text": "Che il suo prezzo di mercato è inferiore al valore nominale (ad esempio 950 € su 1.000 €)",
            "right": true
          },
          {
            "text": "Che l’emittente è fallito",
            "right": false,
            "why": "La cedola dice quanto paga l’obbligazione sul nominale, ma quello che guadagni dipende da quanto l’hai pagata: lo stesso titolo può rendere di più o di meno a seconda del prezzo di acquisto."
          }
        ],
        "theory": "La cedola dice quanto paga l’obbligazione sul nominale, ma quello che guadagni dipende da quanto l’hai pagata: lo stesso titolo può rendere di più o di meno a seconda del prezzo di acquisto.",
        "explain": "Il prezzo di un titolo si indica spesso come percentuale del nominale (98,5 significa 985 € su 1.000). Guardare solo la cedola: una cedola alta su un titolo pagato molto sopra la pari può rendere meno di una cedola bassa su un titolo pagato sotto la pari."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cedola 30 € l’anno, prezzo pagato 960 €: rendimento corrente?",
        "options": [
          {
            "text": "2,88%",
            "right": false,
            "why": "30 ÷ 960 = 3,12%."
          },
          {
            "text": "3,12%",
            "right": true
          },
          {
            "text": "3,00%",
            "right": false,
            "why": "30 ÷ 960 = 3,12%."
          },
          {
            "text": "4,00%",
            "right": false,
            "why": "30 ÷ 960 = 3,12%."
          }
        ],
        "explain": "Il rendimento corrente è la cedola annua divisa per il prezzo pagato: 30 ÷ 960 = 3,12%. Il guadagno complessivo, se tieni il titolo fino alla scadenza, è invece cedole più nominale meno il prezzo pagato."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un’obbligazione con cedola 30 € l’anno e prezzo pagato 1.040 €: rendimento corrente?",
        "options": [
          {
            "text": "3,12%",
            "right": false,
            "why": "30 ÷ 1.040 = 2,88%."
          },
          {
            "text": "3,00%",
            "right": false,
            "why": "30 ÷ 1.040 = 2,88%."
          },
          {
            "text": "2,88%",
            "right": true
          },
          {
            "text": "2,60%",
            "right": false,
            "why": "30 ÷ 1.040 = 2,88%."
          }
        ],
        "explain": "La cedola resta quella (30 € l’anno), ma cambia il rendimento.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cedola 20 € l’anno, prezzo pagato 980 €: rendimento corrente?",
            "options": [
              {
                "text": "2,00%",
                "right": false,
                "why": "20 ÷ 980 = 2,04%."
              },
              {
                "text": "2,04%",
                "right": true
              },
              {
                "text": "1,96%",
                "right": false,
                "why": "20 ÷ 980 = 2,04%."
              },
              {
                "text": "4,00%",
                "right": false,
                "why": "20 ÷ 980 = 2,04%."
              }
            ],
            "explain": "La cedola resta quella (30 € l’anno), ma cambia il rendimento."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Compri a 950 € un titolo da 1.000 € con cedola 3% e 3 anni residui. Se lo tieni fino alla scadenza, quanto guadagni in euro?",
        "options": [
          {
            "text": "90 €",
            "right": false,
            "why": "90 + 1.000 = 1.090; 1.090 − 950 = 140 €."
          },
          {
            "text": "50 €",
            "right": false,
            "why": "90 + 1.000 = 1.090; 1.090 − 950 = 140 €."
          },
          {
            "text": "140 €",
            "right": true
          },
          {
            "text": "190 €",
            "right": false,
            "why": "90 + 1.000 = 1.090; 1.090 − 950 = 140 €."
          }
        ],
        "explain": "Per confrontare titoli con prezzi e scadenze diverse si usa il rendimento a scadenza, un calcolo che mette insieme cedole, prezzo e tempo: per l’esempio qui sotto vale circa 4,83% l’anno, ricavato con uno script.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Compri a 920 € un titolo da 1.000 € con cedola 3% e 2 anni residui. Guadagno a scadenza?",
            "options": [
              {
                "text": "140 €",
                "right": true
              },
              {
                "text": "60 €",
                "right": false,
                "why": "60 + 1.000 − 920 = 140 €."
              },
              {
                "text": "80 €",
                "right": false,
                "why": "60 + 1.000 − 920 = 140 €."
              },
              {
                "text": "1.060 €",
                "right": false,
                "why": "60 + 1.000 − 920 = 140 €."
              }
            ],
            "explain": "Per confrontare titoli con prezzi e scadenze diverse si usa il rendimento a scadenza, un calcolo che mette insieme cedole, prezzo e tempo: per l’esempio qui sotto vale circa 4,83% l’anno, ricavato con uno script."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un titolo da 1.000 € con cedola 3% e 3 anni residui, pagato 1.050 €: quanto guadagni se lo tieni fino alla scadenza?",
        "options": [
          {
            "text": "90 €",
            "right": false,
            "why": "1.090 − 1.050 = 40 €."
          },
          {
            "text": "60 €",
            "right": false,
            "why": "1.090 − 1.050 = 40 €."
          },
          {
            "text": "40 €",
            "right": true
          },
          {
            "text": "1.090 €",
            "right": false,
            "why": "1.090 − 1.050 = 40 €."
          }
        ],
        "explain": "L’altro errore è confondere il rendimento corrente con il rendimento a scadenza.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cosa significa che un titolo è «sopra la pari»?",
            "options": [
              {
                "text": "Il prezzo è inferiore al nominale",
                "right": false,
                "why": "Sopra la pari: prezzo oltre il nominale."
              },
              {
                "text": "Il prezzo è superiore al nominale",
                "right": true
              },
              {
                "text": "Non paga cedola",
                "right": false,
                "why": "Sopra la pari: prezzo oltre il nominale."
              },
              {
                "text": "Scade tra un anno",
                "right": false,
                "why": "Sopra la pari: prezzo oltre il nominale."
              }
            ],
            "explain": "Il prezzo di un titolo si indica spesso come percentuale del nominale (98,5 significa 985 € su 1.000). Guardare solo la cedola: una cedola alta su un titolo pagato molto sopra la pari può rendere meno di una cedola bassa su un titolo pagato sotto la pari."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Due titoli da 2 anni. A: cedola 5%, prezzo 1.100 €. B: cedola 3%, prezzo 1.000 €. Entrambi rimborsano 1.000 €. Quale rende di più se li tieni fino alla fine?",
        "options": [
          {
            "text": "A, perché ha la cedola più alta",
            "right": false,
            "why": "B). A dà 50 × 2 + 1.000 = 1.100 € e costa 1.100 €: guadagno 0 €. B dà 30 × 2 + 1.000 = 1.060 € e costa 1.000 €: guadagno 60 €. La cedola da sola non basta."
          },
          {
            "text": "B: guadagno 60 €, contro 0 € di A",
            "right": true
          },
          {
            "text": "Sono uguali",
            "right": false,
            "why": "B). A dà 50 × 2 + 1.000 = 1.100 € e costa 1.100 €: guadagno 0 €. B dà 30 × 2 + 1.000 = 1.060 € e costa 1.000 €: guadagno 60 €. La cedola da sola non basta."
          },
          {
            "text": "Non si può dire",
            "right": false,
            "why": "B). A dà 50 × 2 + 1.000 = 1.100 € e costa 1.100 €: guadagno 0 €. B dà 30 × 2 + 1.000 = 1.060 € e costa 1.000 €: guadagno 60 €. La cedola da sola non basta."
          }
        ],
        "explain": "Se costa meno di 1.000 € si dice che è sotto la pari, se costa di più che è sopra la pari."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 8)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una rata di 53,31 € al mese per 12 mesi, per un acquisto da 600 €: quanto paghi in totale?",
        "options": [
          {
            "text": "Circa 600 €, cioè nessun costo in più",
            "right": false,
            "why": "53,31 × 12 = 639,72 €."
          },
          {
            "text": "Circa 639,72 €, cioè circa 39,72 € in più dei 600 €",
            "right": true
          },
          {
            "text": "Circa 53,31 € in totale",
            "right": false,
            "why": "53,31 × 12 = 639,72 €."
          },
          {
            "text": "Circa 6.397 €",
            "right": false,
            "why": "53,31 × 12 = 639,72 €."
          }
        ],
        "explain": "Le obbligazioni si possono comprare e vendere prima della scadenza, e il loro prezzo può essere diverso dal nominale."
      }
    ],
    "source": "C09-L02"
  },
  "p9-l3": {
    "id": "p9-l3",
    "code": "L3",
    "floor": 9,
    "title": "Perché il prezzo si muove",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Perché il prezzo si muove",
        "mentor": "Perché il prezzo di un’obbligazione scende quando i tassi di mercato salgono?",
        "options": [
          {
            "text": "Perché l’emittente diventa meno affidabile",
            "right": false,
            "why": "Perché i nuovi titoli pagano di più, e il vecchio titolo con cedola più bassa, per essere comprato, deve costare meno."
          },
          {
            "text": "Perché la cedola scende",
            "right": false,
            "why": "Perché i nuovi titoli pagano di più, e il vecchio titolo con cedola più bassa, per essere comprato, deve costare meno."
          },
          {
            "text": "Perché i nuovi titoli pagano di più e il vecchio, con cedola più bassa, deve costare meno per essere comprato",
            "right": true
          },
          {
            "text": "Perché il nominale si riduce",
            "right": false,
            "why": "Perché i nuovi titoli pagano di più, e il vecchio titolo con cedola più bassa, per essere comprato, deve costare meno."
          }
        ],
        "theory": "Quando i tassi salgono, il prezzo delle obbligazioni già emesse scende; quando i tassi scendono, sale. Se tieni il titolo fino alla scadenza il rimborso non cambia, ma se devi venderlo prima puoi perdere.",
        "explain": "Dopo un anno escono nuove obbligazioni che pagano il 5%: nessuno vuole più pagare 1.000 € un titolo da 3% quando ne trova uno da 5%, quindi il prezzo del vecchio titolo deve scendere finché il suo rendimento diventa competitivo."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Obbligazione da 1.000 €, cedola 3%, 4 anni residui, tassi di mercato al 5%: il prezzo è circa 929,08 €. Di quanto è sceso rispetto a 1.000 €?",
        "options": [
          {
            "text": "70,92 €, cioè −0,7%",
            "right": false,
            "why": "1.000 − 929,08 = 70,92 €."
          },
          {
            "text": "929,08 €, cioè −7,09%",
            "right": false,
            "why": "1.000 − 929,08 = 70,92 €."
          },
          {
            "text": "120 €, cioè −12%",
            "right": false,
            "why": "1.000 − 929,08 = 70,92 €."
          },
          {
            "text": "70,92 €, cioè −7,09%",
            "right": true
          }
        ],
        "explain": "Con 4 anni residui e tassi al 5% la nostra obbligazione vale circa 929,08 €; con tassi all'1% vale circa 1.078,04 €."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un’obbligazione da 1.000 € con cedola 3% e 4 anni residui, con tassi di mercato all'1%, vale circa 1.078,04 €. Di quanto è salita rispetto a 1.000 €?",
        "options": [
          {
            "text": "78,04 €, cioè +0,78%",
            "right": false,
            "why": "1.078,04 − 1.000 = 78,04 €."
          },
          {
            "text": "78,04 €, cioè +7,80%",
            "right": true
          },
          {
            "text": "1.078,04 €, cioè +7,8%",
            "right": false,
            "why": "1.078,04 − 1.000 = 78,04 €."
          },
          {
            "text": "20 €, cioè +2%",
            "right": false,
            "why": "1.078,04 − 1.000 = 78,04 €."
          }
        ],
        "explain": "Il prezzo è il valore di oggi di cedole e rimborso futuri, scontati al tasso di mercato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "I tassi di mercato scendono: cosa succede al prezzo di un’obbligazione già emessa?",
            "options": [
              {
                "text": "Scende",
                "right": false,
                "why": "Con tassi più bassi i vecchi titoli valgono di più."
              },
              {
                "text": "Resta uguale",
                "right": false,
                "why": "Con tassi più bassi i vecchi titoli valgono di più."
              },
              {
                "text": "Dipende dalla cedola scritta",
                "right": false,
                "why": "Con tassi più bassi i vecchi titoli valgono di più."
              },
              {
                "text": "Sale",
                "right": true
              }
            ],
            "explain": "Il prezzo è il valore di oggi di cedole e rimborso futuri, scontati al tasso di mercato."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con tassi di mercato al 5%, un’obbligazione da 1.000 € con cedola 3% e 10 anni residui vale circa 845,57 €. Di quanto è scesa, e quanto di più di una uguale a 4 anni (70,92 €)?",
        "options": [
          {
            "text": "154,43 € (−1,54%); 70,92 € in più",
            "right": false,
            "why": "1.000 − 845,57 = 154,43 € (−15,44%); rispetto a 70,92 € sono 83,51 € in più. Più lunga è la scadenza, più il prezzo è sensibile ai tassi."
          },
          {
            "text": "154,43 € (−15,44%); 83,51 € in più",
            "right": true
          },
          {
            "text": "845,57 € (−15,44%); 83,51 € in meno",
            "right": false,
            "why": "1.000 − 845,57 = 154,43 € (−15,44%); rispetto a 70,92 € sono 83,51 € in più. Più lunga è la scadenza, più il prezzo è sensibile ai tassi."
          },
          {
            "text": "83,51 € (−8,35%); 154,43 € in più",
            "right": false,
            "why": "1.000 − 845,57 = 154,43 € (−15,44%); rispetto a 70,92 € sono 83,51 € in più. Più lunga è la scadenza, più il prezzo è sensibile ai tassi."
          }
        ],
        "explain": "L’altro errore è pensare che il prezzo sia deciso dalla cedola: a muoverlo sono i tassi di mercato e il tempo che manca.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "A parità di altro, quale titolo è più sensibile ai tassi?",
            "options": [
              {
                "text": "Quello con scadenza più breve",
                "right": false,
                "why": "Più lunga è la scadenza, più il prezzo si muove."
              },
              {
                "text": "Sono uguali",
                "right": false,
                "why": "Più lunga è la scadenza, più il prezzo si muove."
              },
              {
                "text": "Quello con cedola più alta",
                "right": false,
                "why": "Più lunga è la scadenza, più il prezzo si muove."
              },
              {
                "text": "Quello con scadenza più lunga",
                "right": true
              }
            ],
            "explain": "L’altro errore è pensare che il prezzo sia deciso dalla cedola: a muoverlo sono i tassi di mercato e il tempo che manca."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Compri a 1.000 € un titolo con cedola 3% e 4 anni residui e lo tieni fino alla scadenza, anche se nel frattempo i tassi salgono. Quanto incassi in tutto?",
        "options": [
          {
            "text": "1.120 € (cedole 120 € più 1.000 €), se l’emittente paga",
            "right": true
          },
          {
            "text": "1.000 €: i tassi alti cancellano le cedole",
            "right": false,
            "why": "Cedole 30 × 4 = 120 € più 1.000 € di rimborso = 1.120 €, se l’emittente paga. Se non vendi, la perdita sul prezzo resta sulla carta; incassi cedole e nominale solo se l’emittente è in grado di rimborsare."
          },
          {
            "text": "929,08 €: il prezzo di mercato",
            "right": false,
            "why": "Cedole 30 × 4 = 120 € più 1.000 € di rimborso = 1.120 €, se l’emittente paga. Se non vendi, la perdita sul prezzo resta sulla carta; incassi cedole e nominale solo se l’emittente è in grado di rimborsare."
          },
          {
            "text": "1.030 €",
            "right": false,
            "why": "Cedole 30 × 4 = 120 € più 1.000 € di rimborso = 1.120 €, se l’emittente paga. Se non vendi, la perdita sul prezzo resta sulla carta; incassi cedole e nominale solo se l’emittente è in grado di rimborsare."
          }
        ],
        "explain": "Chi tiene il titolo fino alla scadenza riceve comunque cedole e nominale (se l’emittente paga), ma sa che quei soldi sono impegnati.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Compri a 970 € un titolo senza cedole che rimborsa 1.000 €. Guadagno se lo tieni fino alla scadenza?",
            "options": [
              {
                "text": "970 €",
                "right": false,
                "why": "1.000 − 970 = 30 €."
              },
              {
                "text": "1.000 €",
                "right": false,
                "why": "1.000 − 970 = 30 €."
              },
              {
                "text": "30 €",
                "right": true
              },
              {
                "text": "0 €",
                "right": false,
                "why": "1.000 − 970 = 30 €."
              }
            ],
            "explain": "Chi tiene il titolo fino alla scadenza riceve comunque cedole e nominale (se l’emittente paga), ma sa che quei soldi sono impegnati."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Ti servono 1.000 € tra 4 anni (un obiettivo preciso). Quale scelta riduce di più il rischio di tasso?",
        "options": [
          {
            "text": "Titolo a 10 anni da rivendere tra 4",
            "right": false,
            "why": "B). Se la scadenza coincide con il momento in cui ti servono i soldi, non devi vendere sul mercato e il prezzo intermedio conta meno. Con a) venderesti a un prezzo che dipende dai tassi di allora. Resta il rischio che l’emittente non paghi (L4)."
          },
          {
            "text": "Contanti",
            "right": false,
            "why": "B). Se la scadenza coincide con il momento in cui ti servono i soldi, non devi vendere sul mercato e il prezzo intermedio conta meno. Con a) venderesti a un prezzo che dipende dai tassi di allora. Resta il rischio che l’emittente non paghi (L4)."
          },
          {
            "text": "Titolo a 4 anni, da tenere fino alla fine",
            "right": true
          },
          {
            "text": "Titolo a 2 anni da rinnovare due volte",
            "right": false,
            "why": "B). Se la scadenza coincide con il momento in cui ti servono i soldi, non devi vendere sul mercato e il prezzo intermedio conta meno. Con a) venderesti a un prezzo che dipende dai tassi di allora. Resta il rischio che l’emittente non paghi (L4)."
          }
        ],
        "explain": "Se la vendi prima della scadenza a tassi più alti, il prezzo può essere sotto quello pagato."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 8)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "1.000 € di debito al 18% TAN senza pagare nulla diventano circa 1.195,62 € in 12 mesi. Quanti interessi?",
        "options": [
          {
            "text": "Circa 1.195,62 €",
            "right": false,
            "why": "1.195,62 − 1.000 = 195,62 €."
          },
          {
            "text": "Circa 180 €",
            "right": false,
            "why": "1.195,62 − 1.000 = 195,62 €."
          },
          {
            "text": "Circa 18 €",
            "right": false,
            "why": "1.195,62 − 1.000 = 195,62 €."
          },
          {
            "text": "Circa 195,62 €",
            "right": true
          }
        ],
        "explain": "Giulia compra oggi un’obbligazione con cedola 3%."
      }
    ],
    "source": "C09-L03"
  },
  "p9-l4": {
    "id": "p9-l4",
    "code": "L4",
    "floor": 9,
    "title": "Il rischio di chi presta",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Il rischio di chi presta",
        "mentor": "Perché una cedola molto alta può essere un segnale di rischio?",
        "options": [
          {
            "text": "Perché l’emittente è sicuro",
            "right": false,
            "why": "Perché chi è meno affidabile deve offrire di più per convincere qualcuno a prestargli denaro; l’interesse in più paga il rischio di non essere rimborsati."
          },
          {
            "text": "Perché le cedole alte sono sempre garantite",
            "right": false,
            "why": "Perché chi è meno affidabile deve offrire di più per convincere qualcuno a prestargli denaro; l’interesse in più paga il rischio di non essere rimborsati."
          },
          {
            "text": "Perché le tasse sono più basse",
            "right": false,
            "why": "Perché chi è meno affidabile deve offrire di più per convincere qualcuno a prestargli denaro; l’interesse in più paga il rischio di non essere rimborsati."
          },
          {
            "text": "Perché chi è meno affidabile deve offrire di più per farsi prestare denaro: l’interesse in più paga il rischio",
            "right": true
          }
        ],
        "theory": "Chi presta rischia di non essere ripagato. Una cedola più alta è il prezzo di questo rischio: più è alta, più è probabile che dietro ci sia un emittente meno affidabile.",
        "explain": "Scegliere solo la cedola più alta, senza chiedersi chi paga e perché offre tanto. L’altro errore è pensare che un nome noto garantisca il rimborso: anche emittenti grandi possono avere difficoltà."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Presti 1.000 € a un emittente che fallisce e rimborsa il 40%. Quanto perdi?",
        "options": [
          {
            "text": "Perdi 400 €",
            "right": false,
            "why": "1.000 − 400 = 600 €."
          },
          {
            "text": "Perdi 600 € (recuperi 400 €)",
            "right": true
          },
          {
            "text": "Perdi 1.000 €",
            "right": false,
            "why": "1.000 − 400 = 600 €."
          },
          {
            "text": "Perdi 40 €",
            "right": false,
            "why": "1.000 − 400 = 600 €."
          }
        ],
        "explain": "Se l’emittente fallisce, in genere si recupera solo una parte del capitale: qui supponiamo il 40%. Per questo gli emittenti più rischiosi offrono cedole più alte: la differenza con un emittente solido si chiama premio per il rischio (o spread)."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cedola 7% contro cedola 3% su 1.000 €: quanti euro in più all’anno ti paga l’emittente rischioso?",
        "options": [
          {
            "text": "40 € in più all’anno",
            "right": true
          },
          {
            "text": "4 € in più all’anno",
            "right": false,
            "why": "4% di 1.000 = 40 €."
          },
          {
            "text": "400 € in più all’anno",
            "right": false,
            "why": "4% di 1.000 = 40 €."
          },
          {
            "text": "70 € in più all’anno",
            "right": false,
            "why": "4% di 1.000 = 40 €."
          }
        ],
        "explain": "Il rischio di emittente (o rischio di credito) è la possibilità che chi ha emesso l’obbligazione non paghi le cedole o non rimborsi il nominale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Presti 2.000 € a un emittente che fallisce e rimborsa il 50%: quanto perdi?",
            "options": [
              {
                "text": "500 €",
                "right": false,
                "why": "2.000 × 0,50 = 1.000 €."
              },
              {
                "text": "2.000 €",
                "right": false,
                "why": "2.000 × 0,50 = 1.000 €."
              },
              {
                "text": "200 €",
                "right": false,
                "why": "2.000 × 0,50 = 1.000 €."
              },
              {
                "text": "1.000 €",
                "right": true
              }
            ],
            "explain": "Il rischio di emittente (o rischio di credito) è la possibilità che chi ha emesso l’obbligazione non paghi le cedole o non rimborsi il nominale."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con un emittente rischioso che paga il 7% invece del 3% (40 € in più l’anno su 1.000 €): quanti anni di quel premio servono per compensare una perdita di 600 €?",
        "options": [
          {
            "text": "6 anni",
            "right": false,
            "why": "600 ÷ 40 = 15 anni."
          },
          {
            "text": "15 anni",
            "right": true
          },
          {
            "text": "60 anni",
            "right": false,
            "why": "600 ÷ 40 = 15 anni."
          },
          {
            "text": "1,5 anni",
            "right": false,
            "why": "600 ÷ 40 = 15 anni."
          }
        ],
        "explain": "Il modo più semplice per ridurre il rischio è non mettere tutto su un solo emittente (diversificazione). Una promessa di rendimento molto alto senza documenti verificabili è un segnale d’allarme, non un’opportunità.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Dividi 2.000 € in 5 emittenti da 400 €; uno fallisce e rimborsa il 50%: quanto perdi?",
            "options": [
              {
                "text": "1.000 €",
                "right": false,
                "why": "400 × 0,50 = 200 €."
              },
              {
                "text": "200 €",
                "right": true
              },
              {
                "text": "400 €",
                "right": false,
                "why": "400 × 0,50 = 200 €."
              },
              {
                "text": "100 €",
                "right": false,
                "why": "400 × 0,50 = 200 €."
              }
            ],
            "explain": "Se l’emittente fallisce, in genere si recupera solo una parte del capitale: qui supponiamo il 40%. Per questo gli emittenti più rischiosi offrono cedole più alte: la differenza con un emittente solido si chiama premio per il rischio (o spread)."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Dividi 1.000 € in 5 emittenti da 200 €. Uno fallisce e restituisce il 40%: quanto perdi?",
        "options": [
          {
            "text": "600 €",
            "right": false,
            "why": "200 × 0,60 = 120 €."
          },
          {
            "text": "200 €",
            "right": false,
            "why": "200 × 0,60 = 120 €."
          },
          {
            "text": "80 €",
            "right": false,
            "why": "200 × 0,60 = 120 €."
          },
          {
            "text": "120 €",
            "right": true
          }
        ],
        "explain": "Esistono giudizi sull’affidabilità di Stati e aziende, i rating, espressi con lettere da parte di agenzie specializzate: sono un’indicazione, non una garanzia.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché verificare chi è l’emittente?",
            "options": [
              {
                "text": "Perché solo l’emittente può rimborsare il prestito",
                "right": true
              },
              {
                "text": "Perché non conta",
                "right": false,
                "why": "Il rischio dipende da chi ti deve ripagare."
              },
              {
                "text": "Perché le cedole sono sempre garantite",
                "right": false,
                "why": "Il rischio dipende da chi ti deve ripagare."
              },
              {
                "text": "Perché lo impone la banca",
                "right": false,
                "why": "Il rischio dipende da chi ti deve ripagare."
              }
            ],
            "explain": "Il modo più semplice per ridurre il rischio è non mettere tutto su un solo emittente (diversificazione). Una promessa di rendimento molto alto senza documenti verificabili è un segnale d’allarme, non un’opportunità."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Ti propongono un «titolo con rendimento garantito del 12% in un anno», senza documento ufficiale.",
        "options": [
          {
            "text": "Accetti subito",
            "right": false,
            "why": "B). Nessun rendimento è garantito oltre quello che l’emittente è in grado di pagare; senza documento e senza emittente verificabile non puoi valutare il rischio. Investire metà (c) lascia comunque a rischio una parte dei soldi."
          },
          {
            "text": "Investi solo metà della cifra",
            "right": false,
            "why": "B). Nessun rendimento è garantito oltre quello che l’emittente è in grado di pagare; senza documento e senza emittente verificabile non puoi valutare il rischio. Investire metà (c) lascia comunque a rischio una parte dei soldi."
          },
          {
            "text": "Chiedi il documento informativo, verifichi chi è l’emittente e non investi se non trovi nulla di verificabile",
            "right": true
          },
          {
            "text": "Chiedi a un amico se si fida",
            "right": false,
            "why": "B). Nessun rendimento è garantito oltre quello che l’emittente è in grado di pagare; senza documento e senza emittente verificabile non puoi valutare il rischio. Investire metà (c) lascia comunque a rischio una parte dei soldi."
          }
        ],
        "explain": "Una promessa di rendimento molto alto senza documenti verificabili è un segnale d’allarme, non un’opportunità."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 8)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una rata di 386,66 € per 60 mesi: circa quanto paghi in totale?",
        "options": [
          {
            "text": "Circa 386,66 €",
            "right": false,
            "why": "386,66 × 60 = 23.199,6 €."
          },
          {
            "text": "Circa 3.866 €",
            "right": false,
            "why": "386,66 × 60 = 23.199,6 €."
          },
          {
            "text": "Circa 23.200 €",
            "right": true
          },
          {
            "text": "Circa 232.000 €",
            "right": false,
            "why": "386,66 × 60 = 23.199,6 €."
          }
        ],
        "explain": "Il rischio di emittente (o rischio di credito) è la possibilità che chi ha emesso l’obbligazione non paghi le cedole o non rimborsi il nominale."
      }
    ],
    "source": "C09-L04"
  },
  "p9-l5": {
    "id": "p9-l5",
    "code": "L5",
    "floor": 9,
    "title": "Tasse, costi e inflazione",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Tasse, costi e inflazione",
        "mentor": "Che differenza c’è tra cedola lorda e netta?",
        "options": [
          {
            "text": "La lorda è quanto ricevi dopo le tasse; la netta è quella scritta sul titolo",
            "right": false,
            "why": "La lorda è quella scritta sul titolo; la netta è quanto ricevi dopo aver pagato le tasse."
          },
          {
            "text": "Sono uguali",
            "right": false,
            "why": "La lorda è quella scritta sul titolo; la netta è quanto ricevi dopo aver pagato le tasse."
          },
          {
            "text": "La lorda include i costi di custodia",
            "right": false,
            "why": "La lorda è quella scritta sul titolo; la netta è quanto ricevi dopo aver pagato le tasse."
          },
          {
            "text": "La lorda è quella scritta sul titolo; la netta è quanto ricevi dopo le tasse",
            "right": true
          }
        ],
        "theory": "La cedola scritta sul titolo è lorda. Il guadagno vero è quello che resta dopo tasse e costi, e va confrontato con l’aumento dei prezzi.",
        "explain": "Sulle cedole si pagano tasse: l’importo che ricevi è la cedola netta. Si aggiungono eventuali costi, come le commissioni di acquisto (negli esempi 1% = 10 € su 1.000 €)."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cedola lorda 30 €, aliquota 12,5%: quanto ricevi?",
        "options": [
          {
            "text": "3,75 €",
            "right": false,
            "why": "30 × 0,875 = 26,25 €."
          },
          {
            "text": "30,00 €",
            "right": false,
            "why": "30 × 0,875 = 26,25 €."
          },
          {
            "text": "22,20 €",
            "right": false,
            "why": "30 × 0,875 = 26,25 €."
          },
          {
            "text": "26,25 €",
            "right": true
          }
        ],
        "explain": "Con cedola 3% lorda, aliquota 12,5% e inflazione 3%, la cedola netta è 2,625% e il rendimento reale è negativo."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cedola lorda 30 € con aliquota 26%: quanto ricevi?",
        "options": [
          {
            "text": "7,80 €",
            "right": false,
            "why": "30 × 0,74 = 22,20 €."
          },
          {
            "text": "22,20 €",
            "right": true
          },
          {
            "text": "30,00 €",
            "right": false,
            "why": "30 × 0,74 = 22,20 €."
          },
          {
            "text": "26,25 €",
            "right": false,
            "why": "30 × 0,74 = 22,20 €."
          }
        ],
        "explain": "Confrontare titoli guardando la cedola lorda quando le tasse sono diverse. L’altro errore è ignorare le commissioni perché «sono piccole»: su un guadagno di 150 €, 10 € sono circa il 7%.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cedola lorda 50 €, aliquota 12,5%: quanto ricevi?",
            "options": [
              {
                "text": "6,25 €",
                "right": false,
                "why": "50 × 0,875 = 43,75 €."
              },
              {
                "text": "50,00 €",
                "right": false,
                "why": "50 × 0,875 = 43,75 €."
              },
              {
                "text": "43,75 €",
                "right": true
              },
              {
                "text": "37,50 €",
                "right": false,
                "why": "50 × 0,875 = 43,75 €."
              }
            ],
            "explain": "Confrontare titoli guardando la cedola lorda quando le tasse sono diverse. L’altro errore è ignorare le commissioni perché «sono piccole»: su un guadagno di 150 €, 10 € sono circa il 7%."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con aliquota 12,5% e cedola lorda 30 € l’anno, quante cedole nette ricevi in 5 anni?",
        "options": [
          {
            "text": "26,25 €",
            "right": false,
            "why": "26,25 × 5 = 131,25 €."
          },
          {
            "text": "131,25 €",
            "right": true
          },
          {
            "text": "150,00 €",
            "right": false,
            "why": "26,25 × 5 = 131,25 €."
          },
          {
            "text": "112,50 €",
            "right": false,
            "why": "26,25 × 5 = 131,25 €."
          }
        ],
        "explain": "Poi c’è l’inflazione (Cap. 8): il rendimento reale è quanto cresce il potere d’acquisto dopo tasse e costi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cedola lorda 50 €, aliquota 26%: quanto ricevi?",
            "options": [
              {
                "text": "37,00 €",
                "right": true
              },
              {
                "text": "13,00 €",
                "right": false,
                "why": "50 × 0,74 = 37,00 €."
              },
              {
                "text": "50,00 €",
                "right": false,
                "why": "50 × 0,74 = 37,00 €."
              },
              {
                "text": "43,75 €",
                "right": false,
                "why": "50 × 0,74 = 37,00 €."
              }
            ],
            "explain": "Con cedola 3% lorda, aliquota 12,5% e inflazione 3%, la cedola netta è 2,625% e il rendimento reale è negativo."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con cedole nette per 131,25 € in 5 anni e una commissione di 10 €: qual è il guadagno netto in euro?",
        "options": [
          {
            "text": "131,25 €",
            "right": false,
            "why": "131,25 − 10 = 121,25 €."
          },
          {
            "text": "141,25 €",
            "right": false,
            "why": "131,25 − 10 = 121,25 €."
          },
          {
            "text": "121,25 €",
            "right": true
          },
          {
            "text": "10,00 €",
            "right": false,
            "why": "131,25 − 10 = 121,25 €."
          }
        ],
        "explain": "Non è un motivo per non comprare obbligazioni (possono servire per sicurezza e per avere i soldi a una data precisa), ma è un conto da sapere.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cedola 3% lorda e inflazione 2%: rendimento reale prima delle tasse?",
            "options": [
              {
                "text": "Circa +0,98%",
                "right": true
              },
              {
                "text": "Circa −0,98%",
                "right": false,
                "why": "1,03 ÷ 1,02 − 1 ≈ 0,98%."
              },
              {
                "text": "5%",
                "right": false,
                "why": "1,03 ÷ 1,02 − 1 ≈ 0,98%."
              },
              {
                "text": "1,5%",
                "right": false,
                "why": "1,03 ÷ 1,02 − 1 ≈ 0,98%."
              }
            ],
            "explain": "Con cedola 3% lorda, aliquota 12,5% e inflazione 3%, la cedola netta è 2,625% e il rendimento reale è negativo."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un titolo paga cedola 3% lorda mentre l’inflazione è al 4%.",
        "options": [
          {
            "text": "È sempre un buon affare perché 3% è positivo",
            "right": false,
            "why": "B). Lo scopo del titolo conta: per un obiettivo a data fissa può andare bene, per far crescere il potere d’acquisto no."
          },
          {
            "text": "Lo vendi subito",
            "right": false,
            "why": "B). Lo scopo del titolo conta: per un obiettivo a data fissa può andare bene, per far crescere il potere d’acquisto no."
          },
          {
            "text": "Il rendimento reale è negativo: ha senso solo per sicurezza o data certa, non per far crescere i soldi",
            "right": true
          },
          {
            "text": "Lo compri anche a debito",
            "right": false,
            "why": "B). Lo scopo del titolo conta: per un obiettivo a data fissa può andare bene, per far crescere il potere d’acquisto no."
          }
        ],
        "explain": "Con cedola 3% lorda, aliquota 12,5% e inflazione 3%, la cedola netta è 2,625% e il rendimento reale è negativo."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 8)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "1.104,08 € tra 5 anni, con inflazione 3%: quanto valgono in potere d’acquisto di oggi?",
        "options": [
          {
            "text": "Circa 1.104,08 €",
            "right": false,
            "why": "1.104,08 ÷ 1,03⁵ = 952,39 €."
          },
          {
            "text": "Circa 1.020 €",
            "right": false,
            "why": "1.104,08 ÷ 1,03⁵ = 952,39 €."
          },
          {
            "text": "Circa 952,39 €",
            "right": true
          },
          {
            "text": "Circa 1.000 €",
            "right": false,
            "why": "1.104,08 ÷ 1,03⁵ = 952,39 €."
          }
        ],
        "explain": "Poi c’è l’inflazione (Cap. 8): il rendimento reale è quanto cresce il potere d’acquisto dopo tasse e costi. Con cedola 3% lorda, aliquota 12,5% e inflazione 3%, la cedola netta è 2,625% e il rendimento reale è negativo."
      }
    ],
    "source": "C09-L05"
  },
  "p9-l6": {
    "id": "p9-l6",
    "code": "L6",
    "floor": 9,
    "title": "Una scala di scadenze",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Una scala di scadenze",
        "mentor": "Perché una scala di scadenze riduce il bisogno di indovinare i tassi?",
        "options": [
          {
            "text": "Perché garantisce il tasso più alto",
            "right": false,
            "why": "Perché una parte dei soldi torna disponibile ogni anno e viene reinvestita ai tassi del momento, senza scommettere su un solo momento."
          },
          {
            "text": "Perché elimina ogni rischio",
            "right": false,
            "why": "Perché una parte dei soldi torna disponibile ogni anno e viene reinvestita ai tassi del momento, senza scommettere su un solo momento."
          },
          {
            "text": "Perché si compra un solo titolo",
            "right": false,
            "why": "Perché una parte dei soldi torna disponibile ogni anno e viene reinvestita ai tassi del momento, senza scommettere su un solo momento."
          },
          {
            "text": "Perché una parte dei soldi torna disponibile ogni anno e viene reinvestita ai tassi del momento",
            "right": true
          }
        ],
        "theory": "Invece di mettere tutto su una sola scadenza, si possono distribuire i soldi su scadenze diverse: ogni anno una parte torna disponibile e il rischio di tasso si spalma nel tempo.",
        "explain": "Così non devi indovinare quale sarà il tasso migliore e non sei costretto a vendere tutto in un momento sfavorevole."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una scala: tre titoli da 1.000 € con scadenza a 1, 2 e 3 anni e cedole 3%, 3,5% e 4%. Quanto incassi alla fine del primo anno?",
        "options": [
          {
            "text": "1.105 €",
            "right": true
          },
          {
            "text": "1.030 €",
            "right": false,
            "why": "30 + 35 + 40 + 1.000 = 1.105 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "30 + 35 + 40 + 1.000 = 1.105 €."
          },
          {
            "text": "105 €",
            "right": false,
            "why": "30 + 35 + 40 + 1.000 = 1.105 €."
          }
        ],
        "explain": "Un titolo si può tenere fino alla scadenza o vendere prima: se non hai bisogno di vendere, il prezzo intermedio conta meno (L3), a patto che l’emittente sia solido."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Nella stessa scala (cedole 3%, 3,5% e 4%), quanto incassi alla fine del secondo anno?",
        "options": [
          {
            "text": "75 €",
            "right": false,
            "why": "35 + 40 + 1.000 = 1.075 €."
          },
          {
            "text": "1.040 €",
            "right": false,
            "why": "35 + 40 + 1.000 = 1.075 €."
          },
          {
            "text": "1.075 €",
            "right": true
          },
          {
            "text": "1.105 €",
            "right": false,
            "why": "35 + 40 + 1.000 = 1.075 €."
          }
        ],
        "explain": "Una scala di scadenze (in inglese ladder) divide la cifra in più obbligazioni che scadono a date diverse: ad esempio una a 1 anno, una a 2 e una a 3.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Scala di tre titoli da 500 € con scadenze a 1, 2 e 3 anni: quanto nominale rientra ogni anno?",
            "options": [
              {
                "text": "1.500 €",
                "right": false,
                "why": "Ogni anno scade un titolo da 500 €."
              },
              {
                "text": "500 €",
                "right": true
              },
              {
                "text": "166,67 €",
                "right": false,
                "why": "Ogni anno scade un titolo da 500 €."
              },
              {
                "text": "0 €",
                "right": false,
                "why": "Ogni anno scade un titolo da 500 €."
              }
            ],
            "explain": "Una scala di scadenze (in inglese ladder) divide la cifra in più obbligazioni che scadono a date diverse: ad esempio una a 1 anno, una a 2 e una a 3."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Nella stessa scala, quanto incassi alla fine del terzo anno?",
        "options": [
          {
            "text": "40 €",
            "right": false,
            "why": "40 + 1.000 = 1.040 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "40 + 1.000 = 1.040 €."
          },
          {
            "text": "1.075 €",
            "right": false,
            "why": "40 + 1.000 = 1.040 €."
          },
          {
            "text": "1.040 €",
            "right": true
          }
        ],
        "explain": "Resta il rischio di emittente (L4): la scala non lo elimina, a meno che i titoli siano di emittenti diversi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché la scala dà liquidità periodica?",
            "options": [
              {
                "text": "Perché ogni anno scade un titolo",
                "right": true
              },
              {
                "text": "Perché rende di più",
                "right": false,
                "why": "Le scadenze sono scaglionate."
              },
              {
                "text": "Perché elimina il rischio emittente",
                "right": false,
                "why": "Le scadenze sono scaglionate."
              },
              {
                "text": "Perché evita le tasse",
                "right": false,
                "why": "Le scadenze sono scaglionate."
              }
            ],
            "explain": "Resta il rischio di emittente (L4): la scala non lo elimina, a meno che i titoli siano di emittenti diversi."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Nella stessa scala, quante cedole in tutto e quanto incassi nei 3 anni?",
        "options": [
          {
            "text": "220 € di cedole; 3.000 € in tutto",
            "right": false,
            "why": "105 + 75 + 40 = 220; 1.105 + 1.075 + 1.040 = 3.220 €."
          },
          {
            "text": "220 € di cedole; 3.220 € in tutto",
            "right": true
          },
          {
            "text": "105 € di cedole; 3.105 € in tutto",
            "right": false,
            "why": "105 + 75 + 40 = 220; 1.105 + 1.075 + 1.040 = 3.220 €."
          },
          {
            "text": "3.220 € di cedole; 220 € in tutto",
            "right": false,
            "why": "105 + 75 + 40 = 220; 1.105 + 1.075 + 1.040 = 3.220 €."
          }
        ],
        "explain": "Ogni volta che una scade, ricevi nominale e cedole e puoi decidere cosa farne: spenderli, se ti servono, o reinvestirli ai tassi di quel momento.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Con cedole 3%, 3,5% e 4% su tre titoli da 1.000 €, quante cedole incassi il primo anno?",
            "options": [
              {
                "text": "30 €",
                "right": false,
                "why": "30 + 35 + 40 = 105 €."
              },
              {
                "text": "1.105 €",
                "right": false,
                "why": "30 + 35 + 40 = 105 €."
              },
              {
                "text": "105 €",
                "right": true
              },
              {
                "text": "75 €",
                "right": false,
                "why": "30 + 35 + 40 = 105 €."
              }
            ],
            "explain": "Resta il rischio di emittente (L4): la scala non lo elimina, a meno che i titoli siano di emittenti diversi."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Dopo un anno il tuo titolo da 3 anni (cedola 3%) vale 972,25 €, meno dei 1.000 € pagati, perché i tassi sono saliti al 4%. Non ti servono i soldi prima della scadenza.",
        "options": [
          {
            "text": "Vendi per non perdere ancora",
            "right": false,
            "why": "B). Se non devi vendere, incassi cedole e nominale come promesso e la differenza di prezzo non diventa una perdita vera. Vendere (a) la rende reale; c) aumenta il rischio."
          },
          {
            "text": "Compri altri titoli con tutti i soldi che hai",
            "right": false,
            "why": "B). Se non devi vendere, incassi cedole e nominale come promesso e la differenza di prezzo non diventa una perdita vera. Vendere (a) la rende reale; c) aumenta il rischio."
          },
          {
            "text": "Lo vendi e compri un titolo a 10 anni",
            "right": false,
            "why": "B). Se non devi vendere, incassi cedole e nominale come promesso e la differenza di prezzo non diventa una perdita vera. Vendere (a) la rende reale; c) aumenta il rischio."
          },
          {
            "text": "Lo tieni fino alla scadenza, se l’emittente resta solido",
            "right": true
          }
        ],
        "explain": "L’altro errore è vendere per paura quando il prezzo scende, trasformando una perdita sulla carta in una perdita vera."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 8)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Dopo 10 anni di un mutuo da 150.000 € il debito residuo è circa 105.043 €. Quanto capitale hai restituito?",
        "options": [
          {
            "text": "Circa 105.043 €",
            "right": false,
            "why": "150.000 − 105.043 = 44.957 €."
          },
          {
            "text": "Circa 150.000 €",
            "right": false,
            "why": "150.000 − 105.043 = 44.957 €."
          },
          {
            "text": "Circa 4.496 €",
            "right": false,
            "why": "150.000 − 105.043 = 44.957 €."
          },
          {
            "text": "Circa 44.957 €",
            "right": true
          }
        ],
        "explain": "Pensare che diversificare le scadenze significhi diversificare il rischio di emittente: sono due cose diverse."
      }
    ],
    "source": "C09-L06"
  },
  "p10-l1": {
    "id": "p10-l1",
    "code": "L1",
    "floor": 10,
    "title": "Cos’è un’azione",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Cos’è un’azione",
        "mentor": "Qual è la differenza principale tra un’azione e un’obbligazione?",
        "options": [
          {
            "text": "Con l’azione hai un rimborso garantito; con l’obbligazione sei socio",
            "right": false,
            "why": "Con l’azione sei socio e partecipi ai risultati senza rimborso promesso; con l’obbligazione presti soldi e hai diritto a cedole e rimborso a scadenza (se l’emittente paga)."
          },
          {
            "text": "Sono la stessa cosa con nomi diversi",
            "right": false,
            "why": "Con l’azione sei socio e partecipi ai risultati senza rimborso promesso; con l’obbligazione presti soldi e hai diritto a cedole e rimborso a scadenza (se l’emittente paga)."
          },
          {
            "text": "Con l’azione sei socio e partecipi ai risultati senza rimborso promesso; con l’obbligazione presti soldi e hai diritto a cedole e rimborso (se l’emittente paga)",
            "right": true
          },
          {
            "text": "L’azione ha sempre una scadenza; l’obbligazione no",
            "right": false,
            "why": "Con l’azione sei socio e partecipi ai risultati senza rimborso promesso; con l’obbligazione presti soldi e hai diritto a cedole e rimborso a scadenza (se l’emittente paga)."
          }
        ],
        "theory": "Un’azione è una piccola quota di una società: chi la compra diventa socio e partecipa ai risultati, buoni o cattivi. Non ha una scadenza né un rimborso promesso.",
        "explain": "Se i conti vanno male, il prezzo può scendere e non c’è nessun obbligo di restituire i soldi: è la differenza fondamentale con l’obbligazione (Cap. 9), dove sei un creditore."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Una società vale 100.000 € e ha 1.000 azioni. Quanto vale un’azione?",
        "options": [
          {
            "text": "100 €",
            "right": true
          },
          {
            "text": "10 €",
            "right": false,
            "why": "100.000 ÷ 1.000 = 100 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "100.000 ÷ 1.000 = 100 €."
          },
          {
            "text": "1 €",
            "right": false,
            "why": "100.000 ÷ 1.000 = 100 €."
          }
        ],
        "explain": "Credere che un’azione «economica» (poche decine di euro) sia un affare e una «costosa» sia un rischio: il prezzo per azione dice poco, conta quanto vale la società nel suo insieme e quanto guadagna (L3)."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Compri 10 azioni a 100 €. Quanto spendi e che quota possiedi?",
        "options": [
          {
            "text": "Spendi 1.000 €; possiedi il 10%",
            "right": false,
            "why": "10 ÷ 1.000 = 1%."
          },
          {
            "text": "Spendi 100 €; possiedi l'1%",
            "right": false,
            "why": "10 ÷ 1.000 = 1%."
          },
          {
            "text": "Spendi 1.000 €; possiedi l'1%",
            "right": true
          },
          {
            "text": "Spendi 10 €; possiedi lo 0,1%",
            "right": false,
            "why": "10 ÷ 1.000 = 1%."
          }
        ],
        "explain": "La quota che possiedi è il numero delle tue azioni diviso per il totale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Una società vale 200.000 € e ha 2.000 azioni. Quanto vale un’azione?",
            "options": [
              {
                "text": "10 €",
                "right": false,
                "why": "200.000 ÷ 2.000 = 100 €."
              },
              {
                "text": "1.000 €",
                "right": false,
                "why": "200.000 ÷ 2.000 = 100 €."
              },
              {
                "text": "100 €",
                "right": true
              },
              {
                "text": "200 €",
                "right": false,
                "why": "200.000 ÷ 2.000 = 100 €."
              }
            ],
            "explain": "La quota che possiedi è il numero delle tue azioni diviso per il totale."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "La società (1.000 azioni, azione a 100 €) passa a valere 120.000 €. Quanto valgono le tue 10 azioni e di quanto sono salite?",
        "options": [
          {
            "text": "1.200 €: +20 €, cioè +2%",
            "right": false,
            "why": "120 × 10 = 1.200 €."
          },
          {
            "text": "120 €: +20%",
            "right": false,
            "why": "120 × 10 = 1.200 €."
          },
          {
            "text": "1.000 €: nessuna variazione",
            "right": false,
            "why": "120 × 10 = 1.200 €."
          },
          {
            "text": "1.200 €: +200 €, cioè +20%",
            "right": true
          }
        ],
        "explain": "Un negozio di quartiere può diventare una società divisa in azioni.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Compri 20 azioni a 100 € (su 2.000): quanto spendi e che quota possiedi?",
            "options": [
              {
                "text": "2.000 €; 10%",
                "right": false,
                "why": "20 ÷ 2.000 = 1%."
              },
              {
                "text": "200 €; 1%",
                "right": false,
                "why": "20 ÷ 2.000 = 1%."
              },
              {
                "text": "100 €; 0,1%",
                "right": false,
                "why": "20 ÷ 2.000 = 1%."
              },
              {
                "text": "2.000 €; 1%",
                "right": true
              }
            ],
            "explain": "La quota che possiedi è il numero delle tue azioni diviso per il totale."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "La società (1.000 azioni, azione a 100 €) scende a 70.000 €. Quanto valgono le tue 10 azioni e di quanto sono scese?",
        "options": [
          {
            "text": "700 €: −30 €, cioè −3%",
            "right": false,
            "why": "70 × 10 = 700 €."
          },
          {
            "text": "700 €: −300 €, cioè −30%",
            "right": true
          },
          {
            "text": "70 €: −30%",
            "right": false,
            "why": "70 × 10 = 700 €."
          },
          {
            "text": "300 €: −70%",
            "right": false,
            "why": "70 × 10 = 700 €."
          }
        ],
        "explain": "Il prezzo per azione è il valore della società diviso per il numero di azioni; il valore totale di mercato si chiama capitalizzazione.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cosa ottiene un azionista?",
            "options": [
              {
                "text": "Partecipa ai risultati, senza rimborso garantito",
                "right": true
              },
              {
                "text": "Un rimborso garantito",
                "right": false,
                "why": "L’azione è una quota, non un prestito."
              },
              {
                "text": "Cedole fisse",
                "right": false,
                "why": "L’azione è una quota, non un prestito."
              },
              {
                "text": "Nulla",
                "right": false,
                "why": "L’azione è una quota, non un prestito."
              }
            ],
            "explain": "La quota che possiedi è il numero delle tue azioni diviso per il totale."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un conoscente ti propone di mettere i 500 € che hai risparmiato nel suo negozio «perché raddoppieranno».",
        "options": [
          {
            "text": "Accetti, l’idea sembra buona",
            "right": false,
            "why": "B). Un’azione non ha rendimento garantito e anche una promessa scritta non è una garanzia di risultato; senza numeri verificabili non puoi valutare, e i soldi devono essere quelli che puoi permetterti di perdere."
          },
          {
            "text": "Accetti solo se promette per iscritto il raddoppio",
            "right": false,
            "why": "B). Un’azione non ha rendimento garantito e anche una promessa scritta non è una garanzia di risultato; senza numeri verificabili non puoi valutare, e i soldi devono essere quelli che puoi permetterti di perdere."
          },
          {
            "text": "Chiedi i conti del negozio e investi solo una cifra che puoi permetterti di perdere",
            "right": true
          },
          {
            "text": "Investi la metà senza chiedere nulla",
            "right": false,
            "why": "B). Un’azione non ha rendimento garantito e anche una promessa scritta non è una garanzia di risultato; senza numeri verificabili non puoi valutare, e i soldi devono essere quelli che puoi permetterti di perdere."
          }
        ],
        "explain": "Chi ne compra una è un azionista, cioè un socio: possiede una parte della società e, se i conti vanno bene, può incassare una parte degli utili (il dividendo, L4) o vedere salire il prezzo dell’azione."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 9)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Un’obbligazione da 1.000 € con cedola 3%: quanto paga ogni anno?",
        "options": [
          {
            "text": "300 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          },
          {
            "text": "30 €",
            "right": true
          },
          {
            "text": "3 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          },
          {
            "text": "1.030 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          }
        ],
        "explain": "L’altro errore è pensare che il prezzo salga sempre."
      }
    ],
    "source": "C10-L01"
  },
  "p10-l2": {
    "id": "p10-l2",
    "code": "L2",
    "floor": 10,
    "title": "Ricavi, costi e utile",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Ricavi, costi e utile",
        "mentor": "Qual è la differenza tra ricavi e utile?",
        "options": [
          {
            "text": "I ricavi sono ciò che resta dopo i costi; l’utile è ciò che si incassa",
            "right": false,
            "why": "I ricavi sono i soldi incassati dalle vendite; l’utile è quello che resta dopo aver sottratto i costi."
          },
          {
            "text": "I ricavi sono i soldi incassati dalle vendite; l’utile è quello che resta dopo i costi",
            "right": true
          },
          {
            "text": "Sono la stessa cosa",
            "right": false,
            "why": "I ricavi sono i soldi incassati dalle vendite; l’utile è quello che resta dopo aver sottratto i costi."
          },
          {
            "text": "L’utile include le tasse dei soci",
            "right": false,
            "why": "I ricavi sono i soldi incassati dalle vendite; l’utile è quello che resta dopo aver sottratto i costi."
          }
        ],
        "theory": "I ricavi dicono quanto incassa una società, l’utile quanto le resta dopo i costi. Una società può vendere di più e guadagnare di meno.",
        "explain": "Se i costi superano i ricavi c’è una perdita. Un bilancio vero ha molte voci (ammortamenti, interessi, imposte) che qui semplifichiamo in un unico numero di costi."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Ricavi 500.000 €, costi 450.000 €: utile?",
        "options": [
          {
            "text": "950.000 €",
            "right": false,
            "why": "500.000 − 450.000 = 50.000 €."
          },
          {
            "text": "5.000 €",
            "right": false,
            "why": "500.000 − 450.000 = 50.000 €."
          },
          {
            "text": "50.000 €",
            "right": true
          },
          {
            "text": "500.000 €",
            "right": false,
            "why": "500.000 − 450.000 = 50.000 €."
          }
        ],
        "explain": "L’utile è la differenza: ricavi meno costi. Il margine è l’utile diviso per i ricavi, in percentuale: dice quanti centesimi restano ogni euro incassato."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Ricavi 500.000 € e costi 450.000 € (utile 50.000 €): qual è il margine?",
        "options": [
          {
            "text": "90%",
            "right": false,
            "why": "50.000 ÷ 500.000 = 10%."
          },
          {
            "text": "1%",
            "right": false,
            "why": "50.000 ÷ 500.000 = 10%."
          },
          {
            "text": "10%",
            "right": true
          },
          {
            "text": "50%",
            "right": false,
            "why": "50.000 ÷ 500.000 = 10%."
          }
        ],
        "explain": "Guardare solo i ricavi: «vende sempre di più» non vuol dire che guadagna. L’altro errore è confondere utile e cassa: una società può avere utile sulla carta e pochi soldi disponibili, per esempio se i clienti pagano in ritardo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Ricavi 400.000 €, costi 360.000 €: utile?",
            "options": [
              {
                "text": "760.000 €",
                "right": false,
                "why": "400.000 − 360.000 = 40.000 €."
              },
              {
                "text": "4.000 €",
                "right": false,
                "why": "400.000 − 360.000 = 40.000 €."
              },
              {
                "text": "40.000 €",
                "right": true
              },
              {
                "text": "400.000 €",
                "right": false,
                "why": "400.000 − 360.000 = 40.000 €."
              }
            ],
            "explain": "Guardare solo i ricavi: «vende sempre di più» non vuol dire che guadagna. L’altro errore è confondere utile e cassa: una società può avere utile sulla carta e pochi soldi disponibili, per esempio se i clienti pagano in ritardo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Ricavi 600.000 € e costi 570.000 €: utile e margine?",
        "options": [
          {
            "text": "Utile 30.000 €; margine 50%",
            "right": false,
            "why": "Utile 30.000 €; margine 30.000 ÷ 600.000 = 5%. I ricavi sono saliti del 20% ma l’utile è sceso del 40%."
          },
          {
            "text": "Utile 570.000 €; margine 95%",
            "right": false,
            "why": "Utile 30.000 €; margine 30.000 ÷ 600.000 = 5%. I ricavi sono saliti del 20% ma l’utile è sceso del 40%."
          },
          {
            "text": "Utile 30.000 €; margine 5%",
            "right": true
          },
          {
            "text": "Utile 3.000 €; margine 0,5%",
            "right": false,
            "why": "Utile 30.000 €; margine 30.000 ÷ 600.000 = 5%. I ricavi sono saliti del 20% ma l’utile è sceso del 40%."
          }
        ],
        "explain": "I ricavi sono i soldi che la società incassa vendendo i suoi prodotti o servizi. I costi sono tutto ciò che spende per produrre e funzionare: materie prime, stipendi, affitto, tasse.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Nello stesso caso, margine?",
            "options": [
              {
                "text": "90%",
                "right": false,
                "why": "40.000 ÷ 400.000 = 10%."
              },
              {
                "text": "10%",
                "right": true
              },
              {
                "text": "1%",
                "right": false,
                "why": "40.000 ÷ 400.000 = 10%."
              },
              {
                "text": "40%",
                "right": false,
                "why": "40.000 ÷ 400.000 = 10%."
              }
            ],
            "explain": "Il margine è l’utile diviso per i ricavi, in percentuale: dice quanti centesimi restano ogni euro incassato. Se i costi superano i ricavi c’è una perdita."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Ricavi 500.000 € e costi 430.000 €: utile e margine?",
        "options": [
          {
            "text": "Utile 70.000 €; margine 86%",
            "right": false,
            "why": "500.000 − 430.000 = 70.000; 70.000 ÷ 500.000 = 14%."
          },
          {
            "text": "Utile 70.000 €; margine 14%",
            "right": true
          },
          {
            "text": "Utile 930.000 €; margine 186%",
            "right": false,
            "why": "500.000 − 430.000 = 70.000; 70.000 ÷ 500.000 = 14%."
          },
          {
            "text": "Utile 7.000 €; margine 1,4%",
            "right": false,
            "why": "500.000 − 430.000 = 70.000; 70.000 ÷ 500.000 = 14%."
          }
        ],
        "explain": "L’utile è la differenza: ricavi meno costi. Il margine è l’utile diviso per i ricavi, in percentuale: dice quanti centesimi restano ogni euro incassato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché i ricavi in crescita non bastano?",
            "options": [
              {
                "text": "Perché i ricavi non contano",
                "right": false,
                "why": "Conta quello che resta dopo i costi."
              },
              {
                "text": "I costi possono crescere di più e far calare l’utile",
                "right": true
              },
              {
                "text": "Perché l’utile è sempre garantito",
                "right": false,
                "why": "Conta quello che resta dopo i costi."
              },
              {
                "text": "Perché il margine è sempre fisso",
                "right": false,
                "why": "Conta quello che resta dopo i costi."
              }
            ],
            "explain": "L’utile è la differenza: ricavi meno costi. Il margine è l’utile diviso per i ricavi, in percentuale: dice quanti centesimi restano ogni euro incassato."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Leggi che una società ha ricavi in crescita del 20%.",
        "options": [
          {
            "text": "Guardi anche costi, utile e margine per capire se cresce anche quello che le resta",
            "right": true
          },
          {
            "text": "È sicuramente un buon segno, la compri",
            "right": false,
            "why": "B). Il caso del Forno mostra ricavi in crescita con utile in calo."
          },
          {
            "text": "Guardi solo il prezzo dell’azione",
            "right": false,
            "why": "B). Il caso del Forno mostra ricavi in crescita con utile in calo."
          },
          {
            "text": "Guardi solo se la società è famosa",
            "right": false,
            "why": "B). Il caso del Forno mostra ricavi in crescita con utile in calo."
          }
        ],
        "explain": "L’utile è la differenza: ricavi meno costi. Il margine è l’utile diviso per i ricavi, in percentuale: dice quanti centesimi restano ogni euro incassato."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 9)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Cedola lorda 30 €, aliquota 12,5%: cedola netta?",
        "options": [
          {
            "text": "26,25 €",
            "right": true
          },
          {
            "text": "3,75 €",
            "right": false,
            "why": "30 × 0,875 = 26,25 €."
          },
          {
            "text": "30,00 €",
            "right": false,
            "why": "30 × 0,875 = 26,25 €."
          },
          {
            "text": "22,20 €",
            "right": false,
            "why": "30 × 0,875 = 26,25 €."
          }
        ],
        "explain": "I ricavi sono i soldi che la società incassa vendendo i suoi prodotti o servizi. I costi sono tutto ciò che spende per produrre e funzionare: materie prime, stipendi, affitto, tasse."
      }
    ],
    "source": "C10-L02"
  },
  "p10-l3": {
    "id": "p10-l3",
    "code": "L3",
    "floor": 10,
    "title": "Utile per azione e prezzo/utili",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Utile per azione e prezzo/utili",
        "mentor": "Che cosa dice il P/E?",
        "options": [
          {
            "text": "Quanto dividendo ricevi per ogni azione",
            "right": false,
            "why": "Quanti euro paghi per ogni euro di utile annuo della società; è il prezzo diviso per l’utile per azione."
          },
          {
            "text": "Quanti soci ha la società",
            "right": false,
            "why": "Quanti euro paghi per ogni euro di utile annuo della società; è il prezzo diviso per l’utile per azione."
          },
          {
            "text": "Quanti euro paghi per ogni euro di utile annuo della società (prezzo diviso utile per azione)",
            "right": true
          },
          {
            "text": "Quanto è alta l’inflazione",
            "right": false,
            "why": "Quanti euro paghi per ogni euro di utile annuo della società; è il prezzo diviso per l’utile per azione."
          }
        ],
        "theory": "Per sapere se un’azione costa tanto o poco non basta il prezzo: serve confrontarlo con l’utile che ogni azione produce. È il rapporto prezzo/utili, in inglese P/E.",
        "explain": "L’utile per azione (in inglese EPS) è l’utile della società diviso per il numero di azioni: dice quanto utile «è di» ogni azione."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Utile 50.000 € e 10.000 azioni: utile per azione?",
        "options": [
          {
            "text": "0,20 €",
            "right": false,
            "why": "50.000 ÷ 10.000 = 5 €."
          },
          {
            "text": "50 €",
            "right": false,
            "why": "50.000 ÷ 10.000 = 5 €."
          },
          {
            "text": "500 €",
            "right": false,
            "why": "50.000 ÷ 10.000 = 5 €."
          },
          {
            "text": "5 €",
            "right": true
          }
        ],
        "explain": "Scegliere sempre l’azione con il P/E più basso, come se fosse in saldo: può essere bassa perché l’utile sta per calare."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Prezzo 100 € e utile per azione 5 €: P/E?",
        "options": [
          {
            "text": "0,05",
            "right": false,
            "why": "100 ÷ 5 = 20."
          },
          {
            "text": "5",
            "right": false,
            "why": "100 ÷ 5 = 20."
          },
          {
            "text": "105",
            "right": false,
            "why": "100 ÷ 5 = 20."
          },
          {
            "text": "20",
            "right": true
          }
        ],
        "explain": "Il rapporto prezzo/utili (P/E) è il prezzo dell’azione diviso per l’utile per azione: dice quanti euro paghi per ogni euro di utile annuo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Utile 80.000 € e 20.000 azioni: utile per azione?",
            "options": [
              {
                "text": "0,25 €",
                "right": false,
                "why": "80.000 ÷ 20.000 = 4 €."
              },
              {
                "text": "40 €",
                "right": false,
                "why": "80.000 ÷ 20.000 = 4 €."
              },
              {
                "text": "400 €",
                "right": false,
                "why": "80.000 ÷ 20.000 = 4 €."
              },
              {
                "text": "4 €",
                "right": true
              }
            ],
            "explain": "Il rapporto prezzo/utili (P/E) è il prezzo dell’azione diviso per l’utile per azione: dice quanti euro paghi per ogni euro di utile annuo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "L’utile raddoppia a 100.000 € (10.000 azioni) e il prezzo resta 100 €. Utile per azione e P/E?",
        "options": [
          {
            "text": "Utile per azione 10 €; P/E 20",
            "right": false,
            "why": "100.000 ÷ 10.000 = 10; 100 ÷ 10 = 10."
          },
          {
            "text": "Utile per azione 5 €; P/E 20",
            "right": false,
            "why": "100.000 ÷ 10.000 = 10; 100 ÷ 10 = 10."
          },
          {
            "text": "Utile per azione 10 €; P/E 10",
            "right": true
          },
          {
            "text": "Utile per azione 20 €; P/E 5",
            "right": false,
            "why": "100.000 ÷ 10.000 = 10; 100 ÷ 10 = 10."
          }
        ],
        "explain": "L’utile può essere una stima o un dato passato: non è una promessa.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Prezzo 60 € e utile per azione 4 €: P/E?",
            "options": [
              {
                "text": "0,07",
                "right": false,
                "why": "60 ÷ 4 = 15."
              },
              {
                "text": "240",
                "right": false,
                "why": "60 ÷ 4 = 15."
              },
              {
                "text": "15",
                "right": true
              },
              {
                "text": "56",
                "right": false,
                "why": "60 ÷ 4 = 15."
              }
            ],
            "explain": "L’utile può essere una stima o un dato passato: non è una promessa."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il prezzo sale a 150 €, l’utile resta 50.000 € con 10.000 azioni. Nuovo P/E?",
        "options": [
          {
            "text": "15",
            "right": false,
            "why": "150 ÷ 5 = 30."
          },
          {
            "text": "20",
            "right": false,
            "why": "150 ÷ 5 = 30."
          },
          {
            "text": "3,3",
            "right": false,
            "why": "150 ÷ 5 = 30."
          },
          {
            "text": "30",
            "right": true
          }
        ],
        "explain": "Un P/E alto può voler dire che il mercato si aspetta crescita (o che l’azione è cara); uno basso che la società è considerata poco promettente o rischiosa (o che è conveniente).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché un P/E basso non basta a dire che l’azione è conveniente?",
            "options": [
              {
                "text": "Perché il P/E basso è sempre un errore",
                "right": false,
                "why": "Va capito perché il P/E è basso."
              },
              {
                "text": "Perché il prezzo non conta",
                "right": false,
                "why": "Va capito perché il P/E è basso."
              },
              {
                "text": "Perché il P/E non esiste",
                "right": false,
                "why": "Va capito perché il P/E è basso."
              },
              {
                "text": "Potrebbe costare poco perché l’utile sta calando",
                "right": true
              }
            ],
            "explain": "Un P/E alto può voler dire che il mercato si aspetta crescita (o che l’azione è cara); uno basso che la società è considerata poco promettente o rischiosa (o che è conveniente)."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Due società dello stesso settore: A ha P/E 12 ma l’utile è in calo da tre anni; B ha P/E 20 e l’utile cresce. Cosa fai?",
        "options": [
          {
            "text": "Compri A perché ha il P/E più basso",
            "right": false,
            "why": "B). Il P/E non basta: A potrebbe costare poco perché l’utile sta calando."
          },
          {
            "text": "Consideri il P/E solo come punto di partenza e cerchi di capire perché è basso o alto",
            "right": true
          },
          {
            "text": "Compri B perché ha il P/E più alto",
            "right": false,
            "why": "B). Il P/E non basta: A potrebbe costare poco perché l’utile sta calando."
          },
          {
            "text": "Scegli a caso",
            "right": false,
            "why": "B). Il P/E non basta: A potrebbe costare poco perché l’utile sta calando."
          }
        ],
        "explain": "Un P/E di 20 significa che paghi 20 € per ogni euro che la società guadagna in un anno."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 9)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Cedola 30 €, prezzo pagato 960 €: rendimento corrente?",
        "options": [
          {
            "text": "3,12%",
            "right": true
          },
          {
            "text": "2,88%",
            "right": false,
            "why": "30 ÷ 960 = 3,12%."
          },
          {
            "text": "3,00%",
            "right": false,
            "why": "30 ÷ 960 = 3,12%."
          },
          {
            "text": "30%",
            "right": false,
            "why": "30 ÷ 960 = 3,12%."
          }
        ],
        "explain": "Non c’è un valore giusto in assoluto: si confronta con società simili e nel tempo, e si guarda sempre il perché."
      }
    ],
    "source": "C10-L03"
  },
  "p10-l4": {
    "id": "p10-l4",
    "code": "L4",
    "floor": 10,
    "title": "Il dividendo",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Il dividendo",
        "mentor": "Che differenza c’è tra dividendo e utile?",
        "options": [
          {
            "text": "L’utile è quanto guadagna la società; il dividendo è la parte che decide di distribuire ai soci, e non è garantita",
            "right": true
          },
          {
            "text": "Il dividendo è quanto guadagna la società; l’utile è la parte distribuita",
            "right": false,
            "why": "Il dividendo è la parte dell’utile che la società distribuisce ai soci."
          },
          {
            "text": "Il dividendo è garantito e uguale all’utile",
            "right": false,
            "why": "Il dividendo è la parte dell’utile che la società distribuisce ai soci."
          },
          {
            "text": "Sono la stessa cosa",
            "right": false,
            "why": "Il dividendo è la parte dell’utile che la società distribuisce ai soci."
          }
        ],
        "theory": "Il dividendo è la parte dell’utile che la società distribuisce ai soci. Non è garantito: la società può ridurlo o toglierlo, e un dividendo troppo alto rispetto all’utile non regge.",
        "explain": "Una società può reinvestire l’utile oppure distribuirne una parte come dividendo, di solito per azione. Il rendimento da dividendo è il dividendo per azione diviso per il prezzo."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Prezzo 100 €, dividendo 2 €: rendimento da dividendo?",
        "options": [
          {
            "text": "98%",
            "right": false,
            "why": "2 ÷ 100 = 2%."
          },
          {
            "text": "0,02%",
            "right": false,
            "why": "2 ÷ 100 = 2%."
          },
          {
            "text": "20%",
            "right": false,
            "why": "2 ÷ 100 = 2%."
          },
          {
            "text": "2%",
            "right": true
          }
        ],
        "explain": "Scegliere il dividendo più alto senza guardare l’utile che lo sostiene. L’altro errore è considerare il dividendo un interesse sicuro come la cedola di un’obbligazione (Cap. 9): non c’è nessun obbligo di pagarlo."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Utile per azione 5 € e dividendo 2 €: payout?",
        "options": [
          {
            "text": "250%",
            "right": false,
            "why": "2 ÷ 5 = 40%."
          },
          {
            "text": "4%",
            "right": false,
            "why": "2 ÷ 5 = 40%."
          },
          {
            "text": "40%",
            "right": true
          },
          {
            "text": "60%",
            "right": false,
            "why": "2 ÷ 5 = 40%."
          }
        ],
        "explain": "La quota di utile distribuita si chiama payout: dividendo per azione diviso utile per azione. Un payout sopra il 100% vuol dire distribuire più di quanto si guadagna: si può fare per poco usando riserve o debito, ma non a lungo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Prezzo 50 €, dividendo 1,5 €: rendimento da dividendo?",
            "options": [
              {
                "text": "30%",
                "right": false,
                "why": "1,5 ÷ 50 = 3%."
              },
              {
                "text": "0,3%",
                "right": false,
                "why": "1,5 ÷ 50 = 3%."
              },
              {
                "text": "75%",
                "right": false,
                "why": "1,5 ÷ 50 = 3%."
              },
              {
                "text": "3%",
                "right": true
              }
            ],
            "explain": "La quota di utile distribuita si chiama payout: dividendo per azione diviso utile per azione. Un payout sopra il 100% vuol dire distribuire più di quanto si guadagna: si può fare per poco usando riserve o debito, ma non a lungo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai 50 azioni e il dividendo è 2 €: quanto incassi lordo e netto (aliquota 26%, da verificare)?",
        "options": [
          {
            "text": "Lordo 100 €; netto 26 €",
            "right": false,
            "why": "50 × 2 = 100; 100 × 0,74 = 74 €."
          },
          {
            "text": "Lordo 100 €; netto 74 €",
            "right": true
          },
          {
            "text": "Lordo 100 €; netto 100 €",
            "right": false,
            "why": "50 × 2 = 100; 100 × 0,74 = 74 €."
          },
          {
            "text": "Lordo 2 €; netto 1,48 €",
            "right": false,
            "why": "50 × 2 = 100; 100 × 0,74 = 74 €."
          }
        ],
        "explain": "Una società che non paga dividendi può comunque creare valore se reinveste bene.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Utile per azione 3 € e dividendo 1,2 €: payout?",
            "options": [
              {
                "text": "40%",
                "right": true
              },
              {
                "text": "250%",
                "right": false,
                "why": "1,2 ÷ 3 = 40%."
              },
              {
                "text": "36%",
                "right": false,
                "why": "1,2 ÷ 3 = 40%."
              },
              {
                "text": "1,8%",
                "right": false,
                "why": "1,2 ÷ 3 = 40%."
              }
            ],
            "explain": "Una società che non paga dividendi può comunque creare valore se reinveste bene."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Utile per azione 5 € e dividendo 6 €: payout?",
        "options": [
          {
            "text": "83%",
            "right": false,
            "why": "6 ÷ 5 = 120%."
          },
          {
            "text": "120%",
            "right": true
          },
          {
            "text": "20%",
            "right": false,
            "why": "6 ÷ 5 = 120%."
          },
          {
            "text": "1,2%",
            "right": false,
            "why": "6 ÷ 5 = 120%."
          }
        ],
        "explain": "La quota di utile distribuita si chiama payout: dividendo per azione diviso utile per azione. Un payout sopra il 100% vuol dire distribuire più di quanto si guadagna: si può fare per poco usando riserve o debito, ma non a lungo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 200 azioni e il dividendo è 0,5 €: incasso lordo e netto (aliquota 26%)?",
            "options": [
              {
                "text": "Lordo 100 €; netto 26 €",
                "right": false,
                "why": "200 × 0,5 = 100; × 0,74 = 74 €."
              },
              {
                "text": "Lordo 100 €; netto 74 €",
                "right": true
              },
              {
                "text": "Lordo 0,5 €; netto 0,37 €",
                "right": false,
                "why": "200 × 0,5 = 100; × 0,74 = 74 €."
              },
              {
                "text": "Lordo 200 €; netto 148 €",
                "right": false,
                "why": "200 × 0,5 = 100; × 0,74 = 74 €."
              }
            ],
            "explain": "La quota di utile distribuita si chiama payout: dividendo per azione diviso utile per azione. Un payout sopra il 100% vuol dire distribuire più di quanto si guadagna: si può fare per poco usando riserve o debito, ma non a lungo."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "La società A offre un rendimento da dividendo dell'8% con payout 120% e utile in calo; la società B offre il 2% con payout 40% e utile in crescita.",
        "options": [
          {
            "text": "Scegli A, rende di più",
            "right": false,
            "why": "B). Il dividendo di A è sopra l’utile e potrebbe essere tagliato; il rendimento alto qui è un segnale di cautela."
          },
          {
            "text": "Scegli quella con il prezzo più basso",
            "right": false,
            "why": "B). Il dividendo di A è sopra l’utile e potrebbe essere tagliato; il rendimento alto qui è un segnale di cautela."
          },
          {
            "text": "Scegli A perché l'8% è garantito",
            "right": false,
            "why": "B). Il dividendo di A è sopra l’utile e potrebbe essere tagliato; il rendimento alto qui è un segnale di cautela."
          },
          {
            "text": "Consideri B più sostenibile e ti chiedi se A potrà mantenere il dividendo",
            "right": true
          }
        ],
        "explain": "Scegliere il dividendo più alto senza guardare l’utile che lo sostiene. L’altro errore è considerare il dividendo un interesse sicuro come la cedola di un’obbligazione (Cap. 9): non c’è nessun obbligo di pagarlo."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 9)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Cedola lorda 30 €, aliquota 26%: cedola netta?",
        "options": [
          {
            "text": "22,20 €",
            "right": true
          },
          {
            "text": "7,80 €",
            "right": false,
            "why": "30 × 0,74 = 22,20 €."
          },
          {
            "text": "30,00 €",
            "right": false,
            "why": "30 × 0,74 = 22,20 €."
          },
          {
            "text": "26,00 €",
            "right": false,
            "why": "30 × 0,74 = 22,20 €."
          }
        ],
        "explain": "L’altro errore è considerare il dividendo un interesse sicuro come la cedola di un’obbligazione (Cap. 9): non c’è nessun obbligo di pagarlo."
      }
    ],
    "source": "C10-L04"
  },
  "p10-l5": {
    "id": "p10-l5",
    "code": "L5",
    "floor": 10,
    "title": "Il rischio delle azioni",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Il rischio delle azioni",
        "mentor": "Qual è la differenza tra rischio specifico e rischio di mercato?",
        "options": [
          {
            "text": "Il rischio specifico riguarda tutte le società e si elimina diversificando",
            "right": false,
            "why": "Il rischio specifico riguarda una sola società e si riduce diversificando; il rischio di mercato riguarda tutte le società insieme e non si elimina."
          },
          {
            "text": "Il rischio di mercato si elimina con 5 titoli",
            "right": false,
            "why": "Il rischio specifico riguarda una sola società e si riduce diversificando; il rischio di mercato riguarda tutte le società insieme e non si elimina."
          },
          {
            "text": "Non c’è differenza",
            "right": false,
            "why": "Il rischio specifico riguarda una sola società e si riduce diversificando; il rischio di mercato riguarda tutte le società insieme e non si elimina."
          },
          {
            "text": "Il rischio specifico riguarda una sola società e si riduce diversificando; il rischio di mercato riguarda tutte insieme e non si elimina",
            "right": true
          }
        ],
        "theory": "Le azioni possono perdere valore anche a lungo, e per recuperare un calo serve un rialzo più grande del calo. Diversificare riduce il rischio di una singola società, non quello dell’intero mercato.",
        "explain": "Il rischio specifico riguarda una sola società (un’azienda sbaglia prodotto, fallisce): si riduce diversificando, cioè dividendo i soldi su molte società diverse."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai 1.000 € e perdi il 30%. Quanto ti resta e di quanto devi salire per tornare a 1.000 €?",
        "options": [
          {
            "text": "Restano 700 €; serve un rialzo del 42,86%",
            "right": true
          },
          {
            "text": "Restano 700 €; serve un rialzo del 30%",
            "right": false,
            "why": "300 ÷ 700 = 42,86%."
          },
          {
            "text": "Restano 300 €; serve un rialzo del 42,86%",
            "right": false,
            "why": "300 ÷ 700 = 42,86%."
          },
          {
            "text": "Restano 700 €; serve un rialzo del 70%",
            "right": false,
            "why": "300 ÷ 700 = 42,86%."
          }
        ],
        "explain": "Se perdi il 30% sei a 70 ogni 100 e, per tornare a 100, serve un guadagno di 30 ÷ 70 = 42,86%: i cali pesano più dei rialzi."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Perdi il 50% di 1.000 €: quanto resta e quale rialzo serve?",
        "options": [
          {
            "text": "Restano 500 €; serve +50%",
            "right": false,
            "why": "Le azioni possono perdere valore anche a lungo, e per recuperare un calo serve un rialzo più grande del calo."
          },
          {
            "text": "Restano 50 €; serve +100%",
            "right": false,
            "why": "Le azioni possono perdere valore anche a lungo, e per recuperare un calo serve un rialzo più grande del calo."
          },
          {
            "text": "Restano 1.500 €; serve +50%",
            "right": false,
            "why": "Le azioni possono perdere valore anche a lungo, e per recuperare un calo serve un rialzo più grande del calo."
          },
          {
            "text": "Restano 500 €; serve +100%",
            "right": true
          }
        ],
        "explain": "Il prezzo di un’azione cambia ogni giorno e, a differenza dell’obbligazione, non c’è una data in cui ti viene restituito un importo prefissato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 1.000 € e perdi il 20%: quanto resta e quale rialzo serve per tornare a 1.000 €?",
            "options": [
              {
                "text": "800 €; +20%",
                "right": false,
                "why": "200 ÷ 800 = 25%."
              },
              {
                "text": "800 €; +25%",
                "right": true
              },
              {
                "text": "200 €; +25%",
                "right": false,
                "why": "200 ÷ 800 = 25%."
              },
              {
                "text": "800 €; +80%",
                "right": false,
                "why": "200 ÷ 800 = 25%."
              }
            ],
            "explain": "Se perdi il 30% sei a 70 ogni 100 e, per tornare a 100, serve un guadagno di 30 ÷ 70 = 42,86%: i cali pesano più dei rialzi."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Dividi 1.000 € in 5 società da 200 €. Una perde il 50%: quanto perdi in totale e in percentuale?",
        "options": [
          {
            "text": "Perdi 100 €, cioè il 50%",
            "right": false,
            "why": "200 × 0,50 = 100 €; 100 ÷ 1.000 = 10%."
          },
          {
            "text": "Perdi 100 €, cioè il 10%",
            "right": true
          },
          {
            "text": "Perdi 500 €, cioè il 50%",
            "right": false,
            "why": "200 × 0,50 = 100 €; 100 ÷ 1.000 = 10%."
          },
          {
            "text": "Perdi 200 €, cioè il 20%",
            "right": false,
            "why": "200 × 0,50 = 100 €; 100 ÷ 1.000 = 10%."
          }
        ],
        "explain": "Credere che 5 società siano «diversificate» se sono tutte dello stesso settore o legate tra loro. L’altro errore è vendere in preda al panico dopo un calo, trasformando una perdita sulla carta in una vera.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perdi il 40% di 1.000 €: quanto resta e quale rialzo serve?",
            "options": [
              {
                "text": "600 €; +40%",
                "right": false,
                "why": "400 ÷ 600 = 66,67%."
              },
              {
                "text": "600 €; +66,67%",
                "right": true
              },
              {
                "text": "400 €; +66,67%",
                "right": false,
                "why": "400 ÷ 600 = 66,67%."
              },
              {
                "text": "600 €; +60%",
                "right": false,
                "why": "400 ÷ 600 = 66,67%."
              }
            ],
            "explain": "Se perdi il 30% sei a 70 ogni 100 e, per tornare a 100, serve un guadagno di 30 ÷ 70 = 42,86%: i cali pesano più dei rialzi."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un portafoglio da 1.000 € è diviso in 5 società da 200 €. In una crisi tutte e 5 perdono il 20%: quanto vale il portafoglio?",
        "options": [
          {
            "text": "1.000 €: la diversificazione protegge",
            "right": false,
            "why": "1.000 × 0,80 = 800 €."
          },
          {
            "text": "200 €",
            "right": false,
            "why": "1.000 × 0,80 = 800 €."
          },
          {
            "text": "600 €",
            "right": false,
            "why": "1.000 × 0,80 = 800 €."
          },
          {
            "text": "800 € (−200 €)",
            "right": true
          }
        ],
        "explain": "Il rischio di mercato riguarda tutte insieme (una crisi economica): la diversificazione non lo elimina. Per questo i soldi che ti servono entro pochi anni non vanno messi in azioni: il prezzo potrebbe essere basso proprio quando ti servono.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché diversificare non elimina il rischio di mercato?",
            "options": [
              {
                "text": "Perché diversificare non serve",
                "right": false,
                "why": "Il rischio di mercato riguarda tutte."
              },
              {
                "text": "Perché il rischio di mercato non esiste",
                "right": false,
                "why": "Il rischio di mercato riguarda tutte."
              },
              {
                "text": "Perché le società sono tutte uguali",
                "right": false,
                "why": "Il rischio di mercato riguarda tutte."
              },
              {
                "text": "Perché in una crisi calano tutte le società insieme",
                "right": true
              }
            ],
            "explain": "Il rischio di mercato riguarda tutte insieme (una crisi economica): la diversificazione non lo elimina. Per questo i soldi che ti servono entro pochi anni non vanno messi in azioni: il prezzo potrebbe essere basso proprio quando ti servono."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai 600 € che ti serviranno tra un anno per una gita scolastica.",
        "options": [
          {
            "text": "Li metti tutti in azioni, potrebbero salire",
            "right": false,
            "why": "B). I soldi con una data vicina non vanno esposti a un calo che potrebbe capitare proprio prima della scadenza."
          },
          {
            "text": "Metti metà in azioni e metà al sicuro",
            "right": false,
            "why": "B). I soldi con una data vicina non vanno esposti a un calo che potrebbe capitare proprio prima della scadenza."
          },
          {
            "text": "Li tieni in uno strumento sicuro e disponibile",
            "right": true
          },
          {
            "text": "Li presti a un amico",
            "right": false,
            "why": "B). I soldi con una data vicina non vanno esposti a un calo che potrebbe capitare proprio prima della scadenza."
          }
        ],
        "explain": "L’esperienza passata non è una garanzia per il futuro."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 9)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Cedola 7% contro 3% su 1.000 €: quanti euro in più l’anno paga l’emittente rischioso?",
        "options": [
          {
            "text": "40 €",
            "right": true
          },
          {
            "text": "4 €",
            "right": false,
            "why": "4% di 1.000 = 40 €."
          },
          {
            "text": "400 €",
            "right": false,
            "why": "4% di 1.000 = 40 €."
          },
          {
            "text": "70 €",
            "right": false,
            "why": "4% di 1.000 = 40 €."
          }
        ],
        "explain": "Per questo i soldi che ti servono entro pochi anni non vanno messi in azioni: il prezzo potrebbe essere basso proprio quando ti servono."
      }
    ],
    "source": "C10-L05"
  },
  "p10-l6": {
    "id": "p10-l6",
    "code": "L6",
    "floor": 10,
    "title": "Tempo, costi e comportamento",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Tempo, costi e comportamento",
        "mentor": "Perché un costo annuo dell'1% pesa di più su 10 anni di quanto sembri?",
        "options": [
          {
            "text": "Perché si paga una sola volta",
            "right": false,
            "why": "Nel lungo periodo contano tre cose: il tempo, i costi che paghi ogni anno e come ti comporti quando il prezzo scende."
          },
          {
            "text": "Perché fa salire il prezzo",
            "right": false,
            "why": "Nel lungo periodo contano tre cose: il tempo, i costi che paghi ogni anno e come ti comporti quando il prezzo scende."
          },
          {
            "text": "Perché viene tolto ogni anno e riduce il capitale su cui si calcola il risultato degli anni successivi",
            "right": true
          },
          {
            "text": "Perché è sempre compensato dai rendimenti",
            "right": false,
            "why": "Nel lungo periodo contano tre cose: il tempo, i costi che paghi ogni anno e come ti comporti quando il prezzo scende."
          }
        ],
        "theory": "Nel lungo periodo contano tre cose: il tempo, i costi che paghi ogni anno e come ti comporti quando il prezzo scende. Nessun rendimento è garantito.",
        "explain": "Lo stesso vale per i costi: una commissione annua dell'1% sembra piccola, ma ogni anno riduce il capitale e quindi anche il risultato degli anni dopo."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Versi 50 € al mese per 10 anni: quanto versi in tutto?",
        "options": [
          {
            "text": "600 €",
            "right": false,
            "why": "50 × 12 × 10 = 6.000 €."
          },
          {
            "text": "60.000 €",
            "right": false,
            "why": "50 × 12 × 10 = 6.000 €."
          },
          {
            "text": "6.000 €",
            "right": true
          },
          {
            "text": "500 €",
            "right": false,
            "why": "50 × 12 × 10 = 6.000 €."
          }
        ],
        "explain": "Con l’interesse composto un risultato ipotetico ogni anno si aggiunge al capitale e produce a sua volta risultato: più tempo passa, più pesa."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Versi 50 € al mese per 10 anni (6.000 €) con rendimento ipotetico del 4% annuo: il piano vale circa 7.362,49 €. Qual è il risultato sul versato?",
        "options": [
          {
            "text": "1.362,49 € (ipotetico, non garantito)",
            "right": true
          },
          {
            "text": "7.362,49 € di guadagno",
            "right": false,
            "why": "7.362,49 − 6.000 = 1.362,49 €."
          },
          {
            "text": "136,25 €",
            "right": false,
            "why": "7.362,49 − 6.000 = 1.362,49 €."
          },
          {
            "text": "0 €: i versamenti non rendono",
            "right": false,
            "why": "7.362,49 − 6.000 = 1.362,49 €."
          }
        ],
        "explain": "Un piano periodico (versare una cifra fissa ogni mese) evita di dover scegliere il momento giusto: compri di più quando i prezzi sono bassi e di meno quando sono alti.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Versi 100 € al mese per 5 anni: quanto versi in tutto?",
            "options": [
              {
                "text": "6.000 €",
                "right": true
              },
              {
                "text": "500 €",
                "right": false,
                "why": "100 × 12 × 5 = 6.000 €."
              },
              {
                "text": "60.000 €",
                "right": false,
                "why": "100 × 12 × 5 = 6.000 €."
              },
              {
                "text": "1.200 €",
                "right": false,
                "why": "100 × 12 × 5 = 6.000 €."
              }
            ],
            "explain": "Un piano periodico (versare una cifra fissa ogni mese) evita di dover scegliere il momento giusto: compri di più quando i prezzi sono bassi e di meno quando sono alti."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Lo stesso piano con costo annuo dell'1% (rendimento 3%) vale circa 6.987,07 €, contro 7.362,49 € senza costo. Quanto pesano i costi?",
        "options": [
          {
            "text": "375,42 €",
            "right": true
          },
          {
            "text": "6.987,07 €",
            "right": false,
            "why": "7.362,49 − 6.987,07 = 375,42 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "7.362,49 − 6.987,07 = 375,42 €."
          },
          {
            "text": "37,54 €",
            "right": false,
            "why": "7.362,49 − 6.987,07 = 375,42 €."
          }
        ],
        "explain": "Pensare che un costo dell'1% sia «poco» e non confrontarlo con il guadagno. L’altro errore è smettere di versare, o vendere tutto, subito dopo un calo, o all’opposto buttare tutti i risparmi in una volta sola.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché un costo annuo dell'1% pesa nel tempo?",
            "options": [
              {
                "text": "Viene tolto ogni anno e riduce il capitale degli anni successivi",
                "right": true
              },
              {
                "text": "Si paga una volta sola",
                "right": false,
                "why": "I costi si accumulano anno dopo anno."
              },
              {
                "text": "Fa salire i rendimenti",
                "right": false,
                "why": "I costi si accumulano anno dopo anno."
              },
              {
                "text": "Non pesa mai",
                "right": false,
                "why": "I costi si accumulano anno dopo anno."
              }
            ],
            "explain": "Lo stesso vale per i costi: una commissione annua dell'1% sembra piccola, ma ogni anno riduce il capitale e quindi anche il risultato degli anni dopo."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "10.000 € per 10 anni: 16.288,95 € al 5% e 14.802,44 € al 4%. Qual è la differenza?",
        "options": [
          {
            "text": "1.486,51 €",
            "right": true
          },
          {
            "text": "16.288,95 €",
            "right": false,
            "why": "16.288,95 − 14.802,44 = 1.486,51 €."
          },
          {
            "text": "14.802,44 €",
            "right": false,
            "why": "16.288,95 − 14.802,44 = 1.486,51 €."
          },
          {
            "text": "148,65 €",
            "right": false,
            "why": "16.288,95 − 14.802,44 = 1.486,51 €."
          }
        ],
        "explain": "Il comportamento fa la differenza: chi vende in preda al panico dopo un calo trasforma la perdita sulla carta in perdita vera.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Dopo un calo, i soldi non servono per 8 anni e hai il fondo di emergenza: cosa ha senso?",
            "options": [
              {
                "text": "Vendere tutto",
                "right": false,
                "why": "Vendere realizza la perdita."
              },
              {
                "text": "Versare tutti i risparmi in una volta",
                "right": false,
                "why": "Vendere realizza la perdita."
              },
              {
                "text": "Versare il doppio",
                "right": false,
                "why": "Vendere realizza la perdita."
              },
              {
                "text": "Continuare il piano come previsto",
                "right": true
              }
            ],
            "explain": "Il comportamento fa la differenza: chi vende in preda al panico dopo un calo trasforma la perdita sulla carta in perdita vera."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Dopo due anni di piano il valore scende del 20%. I soldi non ti servono prima di 8 anni e hai un fondo di emergenza.",
        "options": [
          {
            "text": "Smetti di versare e vendi",
            "right": false,
            "why": "B). Vendere realizza la perdita, e versare tutto in una volta aumenta il rischio. Se invece i soldi servissero prima, il piano andrebbe ripensato fin dall’inizio."
          },
          {
            "text": "Continui il piano come previsto",
            "right": true
          },
          {
            "text": "Versi tutti i risparmi in una volta",
            "right": false,
            "why": "B). Vendere realizza la perdita, e versare tutto in una volta aumenta il rischio. Se invece i soldi servissero prima, il piano andrebbe ripensato fin dall’inizio."
          },
          {
            "text": "Versi il doppio ogni mese",
            "right": false,
            "why": "B). Vendere realizza la perdita, e versare tutto in una volta aumenta il rischio. Se invece i soldi servissero prima, il piano andrebbe ripensato fin dall’inizio."
          }
        ],
        "explain": "I rendimenti usati qui (5%, 4%, 3%) sono ipotesi per mostrare il meccanismo, non previsioni."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 9)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Una scala di scadenze da 3.000 € con cedole 3%, 3,5% e 4%: quanto incassi nel primo anno?",
        "options": [
          {
            "text": "105 €",
            "right": false,
            "why": "105 + 1.000 = 1.105 €."
          },
          {
            "text": "1.105 €",
            "right": true
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "105 + 1.000 = 1.105 €."
          },
          {
            "text": "3.105 €",
            "right": false,
            "why": "105 + 1.000 = 1.105 €."
          }
        ],
        "explain": "Con l’interesse composto un risultato ipotetico ogni anno si aggiunge al capitale e produce a sua volta risultato: più tempo passa, più pesa."
      }
    ],
    "source": "C10-L06"
  },
  "p11-l1": {
    "id": "p11-l1",
    "code": "L1",
    "floor": 11,
    "title": "Cos’è un fondo: il paniere",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Cos’è un fondo",
        "mentor": "Che cos’è una quota di un fondo?",
        "options": [
          {
            "text": "Il prezzo pagato per entrare nel fondo",
            "right": false,
            "why": "Un fondo è un paniere in comune: tante persone mettono soldi insieme e il fondo li investe in molti titoli."
          },
          {
            "text": "Una singola azione del paniere",
            "right": false,
            "why": "Un fondo è un paniere in comune: tante persone mettono soldi insieme e il fondo li investe in molti titoli."
          },
          {
            "text": "Un prestito fatto al fondo",
            "right": false,
            "why": "Un fondo è un paniere in comune: tante persone mettono soldi insieme e il fondo li investe in molti titoli."
          },
          {
            "text": "Una parte del patrimonio del fondo; il suo valore è il patrimonio diviso per il numero di quote",
            "right": true
          }
        ],
        "theory": "Un fondo è un paniere in comune: tante persone mettono soldi insieme e il fondo li investe in molti titoli. Tu possiedi una quota del paniere, non le singole società.",
        "explain": "Un fondo funziona così: il patrimonio totale è diviso in quote, e il valore di una quota è il patrimonio diviso per il numero di quote."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Patrimonio 1.000.000 € e 100.000 quote: valore di una quota?",
        "options": [
          {
            "text": "100 €",
            "right": false,
            "why": "1.000.000 ÷ 100.000 = 10 €."
          },
          {
            "text": "10 €",
            "right": true
          },
          {
            "text": "1 €",
            "right": false,
            "why": "1.000.000 ÷ 100.000 = 10 €."
          },
          {
            "text": "0,10 €",
            "right": false,
            "why": "1.000.000 ÷ 100.000 = 10 €."
          }
        ],
        "explain": "Se i titoli nel paniere salgono, sale il valore della quota; se scendono, scende. Con una sola quota ottieni un po’ di tutto, senza dover scegliere e comprare ogni società."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Compri 50 quote a 10 €: quanto spendi?",
        "options": [
          {
            "text": "500 €",
            "right": true
          },
          {
            "text": "50 €",
            "right": false,
            "why": "50 × 10 = 500 €."
          },
          {
            "text": "5.000 €",
            "right": false,
            "why": "50 × 10 = 500 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "50 × 10 = 500 €."
          }
        ],
        "explain": "L’altro errore è pensare di possedere direttamente le società del paniere: possiedi quote del fondo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Patrimonio 500.000 € e 50.000 quote: valore di una quota?",
            "options": [
              {
                "text": "10 €",
                "right": true
              },
              {
                "text": "100 €",
                "right": false,
                "why": "500.000 ÷ 50.000 = 10 €."
              },
              {
                "text": "1 €",
                "right": false,
                "why": "500.000 ÷ 50.000 = 10 €."
              },
              {
                "text": "25 €",
                "right": false,
                "why": "500.000 ÷ 50.000 = 10 €."
              }
            ],
            "explain": "L’altro errore è pensare di possedere direttamente le società del paniere: possiedi quote del fondo."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il patrimonio del fondo (quota a 10 €, tu hai 50 quote) sale del 5%. Nuovo valore della quota e delle tue 50 quote?",
        "options": [
          {
            "text": "Quota 10,50 €; le tue 50 quote valgono 525 € (+25 €)",
            "right": true
          },
          {
            "text": "Quota 10,05 €; le tue 50 quote valgono 502,50 €",
            "right": false,
            "why": "Quota 10,50 €; 50 × 10,50 = 525 € (+25 €)."
          },
          {
            "text": "Quota 10,50 €; le tue 50 quote valgono 52,50 €",
            "right": false,
            "why": "Quota 10,50 €; 50 × 10,50 = 525 € (+25 €)."
          },
          {
            "text": "Quota 10,00 €; le tue 50 quote valgono 500 €",
            "right": false,
            "why": "Quota 10,50 €; 50 × 10,50 = 525 € (+25 €)."
          }
        ],
        "explain": "Un fondo non è per questo sicuro: il valore può scendere, e chi lo gestisce chiede dei costi (L3). Credere che un fondo sia un prodotto garantito perché «contiene tanti titoli».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 20 quote a 10 € e il valore della quota sale del 10%: quanto valgono?",
            "options": [
              {
                "text": "220 €",
                "right": true
              },
              {
                "text": "200 €",
                "right": false,
                "why": "11 × 20 = 220 €."
              },
              {
                "text": "22 €",
                "right": false,
                "why": "11 × 20 = 220 €."
              },
              {
                "text": "210 €",
                "right": false,
                "why": "11 × 20 = 220 €."
              }
            ],
            "explain": "Un fondo non è per questo sicuro: il valore può scendere, e chi lo gestisce chiede dei costi (L3). Credere che un fondo sia un prodotto garantito perché «contiene tanti titoli»."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Su 1.000 €, pesi 40%, 30%, 20%, 10% e variazioni −10%, 0%, +5%, +20%: di quanto cambia il paniere?",
        "options": [
          {
            "text": "+10 €, cioè +1%",
            "right": false,
            "why": "−40 + 0 + 10 + 20 = −10 €."
          },
          {
            "text": "−10 €, cioè −1%",
            "right": true
          },
          {
            "text": "−40 €, cioè −4%",
            "right": false,
            "why": "−40 + 0 + 10 + 20 = −10 €."
          },
          {
            "text": "+25 €, cioè +2,5%",
            "right": false,
            "why": "−40 + 0 + 10 + 20 = −10 €."
          }
        ],
        "explain": "Il paniere ha dei pesi: la parte di patrimonio investita in ogni titolo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Il paniere riduce quale rischio?",
            "options": [
              {
                "text": "Il rischio di mercato",
                "right": false,
                "why": "Non elimina il rischio che il mercato scenda."
              },
              {
                "text": "Ogni rischio",
                "right": false,
                "why": "Non elimina il rischio che il mercato scenda."
              },
              {
                "text": "Nessun rischio",
                "right": false,
                "why": "Non elimina il rischio che il mercato scenda."
              },
              {
                "text": "Quello di aver scelto la società sbagliata",
                "right": true
              }
            ],
            "explain": "Se i titoli nel paniere salgono, sale il valore della quota; se scendono, scende. Con una sola quota ottieni un po’ di tutto, senza dover scegliere e comprare ogni società."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Non sai valutare le singole società.",
        "options": [
          {
            "text": "Compri solo quella di cui parlano tutti",
            "right": false,
            "why": "B). Il paniere riduce il rischio di aver scelto la società sbagliata, ma non elimina il rischio che il mercato scenda."
          },
          {
            "text": "Scegli un paniere con molte società per non dipendere da una sola scelta",
            "right": true
          },
          {
            "text": "Aspetti di conoscerle tutte",
            "right": false,
            "why": "B). Il paniere riduce il rischio di aver scelto la società sbagliata, ma non elimina il rischio che il mercato scenda."
          },
          {
            "text": "Compri tutte quelle che costano meno",
            "right": false,
            "why": "B). Il paniere riduce il rischio di aver scelto la società sbagliata, ma non elimina il rischio che il mercato scenda."
          }
        ],
        "explain": "Immagina dieci amici che mettono 50 € ciascuno in una cassa comune per comprare insieme più cose invece di una sola: ognuno possiede una parte della cassa."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 10)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Prezzo 100 € e utile per azione 5 €: P/E?",
        "options": [
          {
            "text": "20",
            "right": true
          },
          {
            "text": "0,05",
            "right": false,
            "why": "100 ÷ 5 = 20."
          },
          {
            "text": "105",
            "right": false,
            "why": "100 ÷ 5 = 20."
          },
          {
            "text": "5",
            "right": false,
            "why": "100 ÷ 5 = 20."
          }
        ],
        "explain": "Immagina dieci amici che mettono 50 € ciascuno in una cassa comune per comprare insieme più cose invece di una sola: ognuno possiede una parte della cassa."
      }
    ],
    "source": "C11-L01"
  },
  "p11-l2": {
    "id": "p11-l2",
    "code": "L2",
    "floor": 11,
    "title": "ETF e indici",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "ETF e indici",
        "mentor": "Che cosa significa che un ETF «replica» un indice?",
        "options": [
          {
            "text": "Garantisce di battere l’indice",
            "right": false,
            "why": "Cerca di seguirne l’andamento: nell’esempio compra le stesse società con gli stessi pesi, ma altri ETF usano un campione di titoli o derivati, e il metodo si legge nel documento informativo."
          },
          {
            "text": "Cerca di seguirne l’andamento (nell’esempio compra le stesse società con gli stessi pesi); il metodo si legge nel documento informativo",
            "right": true
          },
          {
            "text": "È emesso dall’indice stesso",
            "right": false,
            "why": "Cerca di seguirne l’andamento: nell’esempio compra le stesse società con gli stessi pesi, ma altri ETF usano un campione di titoli o derivati, e il metodo si legge nel documento informativo."
          },
          {
            "text": "Non investe in società",
            "right": false,
            "why": "Cerca di seguirne l’andamento: nell’esempio compra le stesse società con gli stessi pesi, ma altri ETF usano un campione di titoli o derivati, e il metodo si legge nel documento informativo."
          }
        ],
        "theory": "Un indice è una lista di società con i loro pesi; un ETF è un fondo che copia quella lista e si compra in borsa come un’azione. Non cerca di fare meglio dell’indice: lo segue.",
        "explain": "Nel nostro esempio lo fa comprando le stesse società con gli stessi pesi (replica fisica completa), ma non tutti gli ETF funzionano così: alcuni comprano solo un campione di titoli, altri usano contratti derivati (replica sintetica)."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un indice sale da 1.000 a 1.080 punti: variazione percentuale?",
        "options": [
          {
            "text": "+80%",
            "right": false,
            "why": "80 ÷ 1.000 = +8%."
          },
          {
            "text": "+0,8%",
            "right": false,
            "why": "80 ÷ 1.000 = +8%."
          },
          {
            "text": "+1,08%",
            "right": false,
            "why": "80 ÷ 1.000 = +8%."
          },
          {
            "text": "+8%",
            "right": true
          }
        ],
        "explain": "Un ETF non garantisce nulla: sale e scende con l’indice, meno i costi (L3). Credere che «ETF» significhi «sicuro» o «diversificato» per definizione: dipende dall’indice che replica."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un ETF da 100 € replica l’indice (+8%) senza costi: nuovo valore?",
        "options": [
          {
            "text": "108 €",
            "right": true
          },
          {
            "text": "180 €",
            "right": false,
            "why": "100 × 1,08 = 108 €."
          },
          {
            "text": "100 €",
            "right": false,
            "why": "100 × 1,08 = 108 €."
          },
          {
            "text": "80 €",
            "right": false,
            "why": "100 × 1,08 = 108 €."
          }
        ],
        "explain": "Un ETF (exchange traded fund) è un fondo quotato in borsa che cerca di seguire un indice: si dice che lo replica.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un indice sale da 2.000 a 2.100 punti: variazione percentuale?",
            "options": [
              {
                "text": "+5%",
                "right": true
              },
              {
                "text": "+100%",
                "right": false,
                "why": "100 ÷ 2.000 = 5%."
              },
              {
                "text": "+0,5%",
                "right": false,
                "why": "100 ÷ 2.000 = 5%."
              },
              {
                "text": "+2,1%",
                "right": false,
                "why": "100 ÷ 2.000 = 5%."
              }
            ],
            "explain": "Un ETF non garantisce nulla: sale e scende con l’indice, meno i costi (L3). Credere che «ETF» significhi «sicuro» o «diversificato» per definizione: dipende dall’indice che replica."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "10.000 € in un ETF che replica un indice salito dell'8%, prima dei costi: quanto valgono?",
        "options": [
          {
            "text": "18.000 €",
            "right": false,
            "why": "10.000 × 1,08 = 10.800 €."
          },
          {
            "text": "10.080 €",
            "right": false,
            "why": "10.000 × 1,08 = 10.800 €."
          },
          {
            "text": "10.800 €",
            "right": true
          },
          {
            "text": "8.000 €",
            "right": false,
            "why": "10.000 × 1,08 = 10.800 €."
          }
        ],
        "explain": "Un fondo attivo (gestito) invece prova a battere l’indice scegliendo i titoli: costa di più e non è detto che ci riesca.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "5.000 € in un ETF con indice +5%, senza costi: quanto valgono?",
            "options": [
              {
                "text": "5.250 €",
                "right": true
              },
              {
                "text": "5.050 €",
                "right": false,
                "why": "5.000 × 1,05 = 5.250 €."
              },
              {
                "text": "5.500 €",
                "right": false,
                "why": "5.000 × 1,05 = 5.250 €."
              },
              {
                "text": "250 €",
                "right": false,
                "why": "5.000 × 1,05 = 5.250 €."
              }
            ],
            "explain": "Un fondo attivo (gestito) invece prova a battere l’indice scegliendo i titoli: costa di più e non è detto che ci riesca."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con un costo annuo dello 0,25% i 10.000 € dell’ETF (indice +8%) valgono circa 10.775 invece di 10.800 €. Quanto pesa il costo?",
        "options": [
          {
            "text": "Circa 250 €",
            "right": false,
            "why": "10.800 − 10.775 = 25 €."
          },
          {
            "text": "Circa 2,5 €",
            "right": false,
            "why": "10.800 − 10.775 = 25 €."
          },
          {
            "text": "Circa 25 €",
            "right": true
          },
          {
            "text": "Circa 10.775 €",
            "right": false,
            "why": "10.800 − 10.775 = 25 €."
          }
        ],
        "explain": "Un indice misura l’andamento di un gruppo di titoli: elenca le società e il peso di ciascuna, e si calcola con una regola fissa (per esempio le 4 più grandi di un settore).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Che cosa fa un ETF indicizzato?",
            "options": [
              {
                "text": "Garantisce di batterlo",
                "right": false,
                "why": "È un fondo che copia una lista."
              },
              {
                "text": "Non ha costi",
                "right": false,
                "why": "È un fondo che copia una lista."
              },
              {
                "text": "Compra una sola società",
                "right": false,
                "why": "È un fondo che copia una lista."
              },
              {
                "text": "Segue l’indice, senza cercare di batterlo",
                "right": true
              }
            ],
            "explain": "Un ETF (exchange traded fund) è un fondo quotato in borsa che cerca di seguire un indice: si dice che lo replica."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un fondo gestito costa 1,5% all’anno e promette di battere l’indice; un ETF sull’indice costa 0,2%.",
        "options": [
          {
            "text": "Scegli il gestito perché promette di più",
            "right": false,
            "why": "B). Il fondo gestito parte con un costo più alto da recuperare e non ha garanzia di battere l’indice."
          },
          {
            "text": "Confronti i costi e ricordi che nessuna promessa è una garanzia",
            "right": true
          },
          {
            "text": "Non guardi mai gli ETF",
            "right": false,
            "why": "B). Il fondo gestito parte con un costo più alto da recuperare e non ha garanzia di battere l’indice."
          },
          {
            "text": "Scegli quello che ti consiglia un amico",
            "right": false,
            "why": "B). Il fondo gestito parte con un costo più alto da recuperare e non ha garanzia di battere l’indice."
          }
        ],
        "explain": "L’altro errore è pensare che un fondo gestito dia sempre un risultato migliore perché è gestito da esperti."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 10)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Utile per azione 5 € e dividendo 2 €: payout?",
        "options": [
          {
            "text": "2,5%",
            "right": false,
            "why": "2 ÷ 5 = 40%."
          },
          {
            "text": "40%",
            "right": true
          },
          {
            "text": "60%",
            "right": false,
            "why": "2 ÷ 5 = 40%."
          },
          {
            "text": "250%",
            "right": false,
            "why": "2 ÷ 5 = 40%."
          }
        ],
        "explain": "Si compra e si vende durante il giorno come un’azione, a un prezzo che di solito segue il valore del paniere."
      }
    ],
    "source": "C11-L02"
  },
  "p11-l3": {
    "id": "p11-l3",
    "code": "L3",
    "floor": 11,
    "title": "I costi di un fondo",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "I costi di un fondo",
        "mentor": "Che cos’è il TER?",
        "options": [
          {
            "text": "Una commissione pagata una sola volta all’acquisto",
            "right": false,
            "why": "Un fondo ti costa ogni anno una percentuale del capitale, anche se il mercato scende."
          },
          {
            "text": "Il rendimento promesso dal fondo",
            "right": false,
            "why": "Un fondo ti costa ogni anno una percentuale del capitale, anche se il mercato scende."
          },
          {
            "text": "L’imposta sul guadagno",
            "right": false,
            "why": "Un fondo ti costa ogni anno una percentuale del capitale, anche se il mercato scende."
          },
          {
            "text": "La percentuale del capitale che si paga ogni anno per la gestione e le spese del fondo o dell’ETF",
            "right": true
          }
        ],
        "theory": "Un fondo ti costa ogni anno una percentuale del capitale, anche se il mercato scende. A parità di paniere, il costo è una delle poche cose che puoi controllare.",
        "explain": "Il costo annuo di un fondo o di un ETF si indica con un numero, spesso chiamato TER (total expense ratio): la percentuale del capitale che si paga ogni anno per gestione e spese."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Capitale 10.000 € e TER 0,20%: costo annuo?",
        "options": [
          {
            "text": "20 €",
            "right": true
          },
          {
            "text": "200 €",
            "right": false,
            "why": "10.000 × 0,002 = 20 €."
          },
          {
            "text": "2 €",
            "right": false,
            "why": "10.000 × 0,002 = 20 €."
          },
          {
            "text": "0,20 €",
            "right": false,
            "why": "10.000 × 0,002 = 20 €."
          }
        ],
        "explain": "Il modo più chiaro di capirlo è trasformarlo in euro: costo annuo = capitale × TER. Pensare che 1,5% e 0,2% siano «poco», senza trasformarli in euro e in anni."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Capitale 10.000 € e TER 1,50%: costo annuo?",
        "options": [
          {
            "text": "1.500 €",
            "right": false,
            "why": "10.000 × 0,015 = 150 €."
          },
          {
            "text": "150 €",
            "right": true
          },
          {
            "text": "15 €",
            "right": false,
            "why": "10.000 × 0,015 = 150 €."
          },
          {
            "text": "1,50 €",
            "right": false,
            "why": "10.000 × 0,015 = 150 €."
          }
        ],
        "explain": "Un costo in percentuale sembra piccolo, ma si calcola sul capitale, quindi più capitale hai più paghi, e si ripete ogni anno riducendo il risultato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Capitale 8.000 € e TER 0,25%: costo annuo?",
            "options": [
              {
                "text": "200 €",
                "right": false,
                "why": "8.000 × 0,0025 = 20 €."
              },
              {
                "text": "2 €",
                "right": false,
                "why": "8.000 × 0,0025 = 20 €."
              },
              {
                "text": "25 €",
                "right": false,
                "why": "8.000 × 0,0025 = 20 €."
              },
              {
                "text": "20 €",
                "right": true
              }
            ],
            "explain": "Un costo in percentuale sembra piccolo, ma si calcola sul capitale, quindi più capitale hai più paghi, e si ripete ogni anno riducendo il risultato."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Su 10.000 € paghi 20 € all’anno (TER 0,20%) oppure 150 € (TER 1,50%). Quanti euro in più all’anno con il secondo?",
        "options": [
          {
            "text": "130 €",
            "right": true
          },
          {
            "text": "170 €",
            "right": false,
            "why": "150 − 20 = 130 €."
          },
          {
            "text": "1.300 €",
            "right": false,
            "why": "150 − 20 = 130 €."
          },
          {
            "text": "13 €",
            "right": false,
            "why": "150 − 20 = 130 €."
          }
        ],
        "explain": "Si aggiungono eventuali costi una tantum, come una commissione di ingresso quando compri, e i costi di negoziazione del tuo intermediario.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Capitale 8.000 € e TER 1,2%: costo annuo?",
            "options": [
              {
                "text": "960 €",
                "right": false,
                "why": "8.000 × 0,012 = 96 €."
              },
              {
                "text": "9,6 €",
                "right": false,
                "why": "8.000 × 0,012 = 96 €."
              },
              {
                "text": "120 €",
                "right": false,
                "why": "8.000 × 0,012 = 96 €."
              },
              {
                "text": "96 €",
                "right": true
              }
            ],
            "explain": "Si aggiungono eventuali costi una tantum, come una commissione di ingresso quando compri, e i costi di negoziazione del tuo intermediario."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con rendimento ipotetico lordo 5%, 10.000 € per 10 anni diventano 15.981,33 € (TER 0,20%) o 14.105,99 € (TER 1,50%). Qual è la differenza?",
        "options": [
          {
            "text": "15.981,33 €",
            "right": false,
            "why": "15.981,33 − 14.105,99 = 1.875,34 €."
          },
          {
            "text": "14.105,99 €",
            "right": false,
            "why": "15.981,33 − 14.105,99 = 1.875,34 €."
          },
          {
            "text": "1.875,34 €",
            "right": true
          },
          {
            "text": "187,53 €",
            "right": false,
            "why": "15.981,33 − 14.105,99 = 1.875,34 €."
          }
        ],
        "explain": "L’altro errore è guardare il rendimento passato senza sottrarre i costi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché il costo conta anche quando il mercato scende?",
            "options": [
              {
                "text": "Perché si paga solo quando sale",
                "right": false,
                "why": "Il TER si paga sempre."
              },
              {
                "text": "Perché non si paga mai",
                "right": false,
                "why": "Il TER si paga sempre."
              },
              {
                "text": "Si paga ogni anno a prescindere",
                "right": true
              },
              {
                "text": "Perché è fisso e piccolo",
                "right": false,
                "why": "Il TER si paga sempre."
              }
            ],
            "explain": "Il costo annuo di un fondo o di un ETF si indica con un numero, spesso chiamato TER (total expense ratio): la percentuale del capitale che si paga ogni anno per gestione e spese."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "La banca ti propone un fondo con commissione di ingresso 2% e TER 1,5%; un ETF sullo stesso tipo di paniere non ha commissione di ingresso e ha TER 0,2%. Cosa fai?",
        "options": [
          {
            "text": "Scegli il fondo, te lo consiglia la banca",
            "right": false,
            "why": "B). Il consiglio non è un motivo se non conosci i costi: in euro il confronto è immediato."
          },
          {
            "text": "Scegli a caso",
            "right": false,
            "why": "B). Il consiglio non è un motivo se non conosci i costi: in euro il confronto è immediato."
          },
          {
            "text": "Calcoli in euro il costo del primo anno su 10.000 € e confronti: 350 € contro 20 €",
            "right": true
          },
          {
            "text": "Scegli quello con il TER più alto perché è migliore",
            "right": false,
            "why": "B). Il consiglio non è un motivo se non conosci i costi: in euro il confronto è immediato."
          }
        ],
        "explain": "Si aggiungono eventuali costi una tantum, come una commissione di ingresso quando compri, e i costi di negoziazione del tuo intermediario."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 10)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "10.000 € per 10 anni al 5% o al 4% (costo 1%): quanto pesa il costo?",
        "options": [
          {
            "text": "16.288,95 €",
            "right": false,
            "why": "16.288,95 − 14.802,44 = 1.486,51 €."
          },
          {
            "text": "148,65 €",
            "right": false,
            "why": "16.288,95 − 14.802,44 = 1.486,51 €."
          },
          {
            "text": "1.486,51 €",
            "right": true
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "16.288,95 − 14.802,44 = 1.486,51 €."
          }
        ],
        "explain": "Un costo in percentuale sembra piccolo, ma si calcola sul capitale, quindi più capitale hai più paghi, e si ripete ogni anno riducendo il risultato."
      }
    ],
    "source": "C11-L03"
  },
  "p11-l4": {
    "id": "p11-l4",
    "code": "L4",
    "floor": 11,
    "title": "Diversificazione vera e sovrapposizioni",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Diversificazione vera e sovrapposizioni",
        "mentor": "Che cos’è la sovrapposizione tra due fondi?",
        "options": [
          {
            "text": "Il numero di fondi che possiedi",
            "right": false,
            "why": "La parte del patrimonio dei due fondi che è investita nelle stesse società; più è alta, meno diversifichi aggiungendo il secondo fondo."
          },
          {
            "text": "La parte del patrimonio dei due fondi investita nelle stesse società: più è alta, meno diversifichi aggiungendo il secondo",
            "right": true
          },
          {
            "text": "La differenza di costo tra i due fondi",
            "right": false,
            "why": "La parte del patrimonio dei due fondi che è investita nelle stesse società; più è alta, meno diversifichi aggiungendo il secondo fondo."
          },
          {
            "text": "La parte del patrimonio non investita",
            "right": false,
            "why": "La parte del patrimonio dei due fondi che è investita nelle stesse società; più è alta, meno diversifichi aggiungendo il secondo fondo."
          }
        ],
        "theory": "Avere tanti fondi non vuol dire essere diversificati: conta che cosa contengono. Due ETF che contengono le stesse società ti espongono due volte allo stesso rischio.",
        "explain": "Due fondi possono avere in comune molte società: la sovrapposizione è la parte del patrimonio che è nelle stesse società."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai 10.000 € in due ETF con sovrapposizione del 70%: quanti euro sono nelle stesse società?",
        "options": [
          {
            "text": "70 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "7.000 €",
            "right": true
          },
          {
            "text": "3.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "700 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          }
        ],
        "explain": "L’altro errore è credere che un ETF su un solo settore sia diversificato perché ha molte società: se il settore va male, vanno male tutte."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Le prime tre società di un ETF pesano 30%, 20% e 10%. Quanto pesano insieme?",
        "options": [
          {
            "text": "60%",
            "right": true
          },
          {
            "text": "30%",
            "right": false,
            "why": "30 + 20 + 10 = 60%."
          },
          {
            "text": "10%",
            "right": false,
            "why": "30 + 20 + 10 = 60%."
          },
          {
            "text": "90%",
            "right": false,
            "why": "30 + 20 + 10 = 60%."
          }
        ],
        "explain": "La diversificazione funziona se i titoli non si muovono tutti insieme. Un fondo può contenere centinaia di società ma avere la maggior parte del peso in poche: la concentrazione dei pesi conta più del numero di titoli.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Hai 20.000 € in due ETF con sovrapposizione 50%: quanto è nelle stesse società?",
            "options": [
              {
                "text": "50 €",
                "right": false,
                "why": "20.000 × 0,5 = 10.000 €."
              },
              {
                "text": "10.000 €",
                "right": true
              },
              {
                "text": "1.000 €",
                "right": false,
                "why": "20.000 × 0,5 = 10.000 €."
              },
              {
                "text": "40.000 €",
                "right": false,
                "why": "20.000 × 0,5 = 10.000 €."
              }
            ],
            "explain": "La diversificazione funziona se i titoli non si muovono tutti insieme. Un fondo può contenere centinaia di società ma avere la maggior parte del peso in poche: la concentrazione dei pesi conta più del numero di titoli."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Le prime tre società di un ETF da 10.000 € pesano il 60% e perdono il 20%; le altre restano ferme. Variazione dell’ETF e perdita?",
        "options": [
          {
            "text": "12%, cioè 1.200 €",
            "right": true
          },
          {
            "text": "20%, cioè 2.000 €",
            "right": false,
            "why": "0,60 × 20% = 12%; 12% di 10.000 = 1.200 €."
          },
          {
            "text": "60%, cioè 6.000 €",
            "right": false,
            "why": "0,60 × 20% = 12%; 12% di 10.000 = 1.200 €."
          },
          {
            "text": "1,2%, cioè 120 €",
            "right": false,
            "why": "0,60 × 20% = 12%; 12% di 10.000 = 1.200 €."
          }
        ],
        "explain": "Non esiste una diversificazione che elimini il rischio di mercato (Cap. 10 L5), ma una buona riduce quello di singole società e di singoli settori.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Due società pesano 25% e 15%: quanto insieme?",
            "options": [
              {
                "text": "10%",
                "right": false,
                "why": "25 + 15 = 40%."
              },
              {
                "text": "375%",
                "right": false,
                "why": "25 + 15 = 40%."
              },
              {
                "text": "20%",
                "right": false,
                "why": "25 + 15 = 40%."
              },
              {
                "text": "40%",
                "right": true
              }
            ],
            "explain": "Non esiste una diversificazione che elimini il rischio di mercato (Cap. 10 L5), ma una buona riduce quello di singole società e di singoli settori."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un paniere ha 5 settori da 20% ciascuno e un settore perde il 30%: variazione del paniere?",
        "options": [
          {
            "text": "30%",
            "right": false,
            "why": "0,20 × 30% = 6%."
          },
          {
            "text": "20%",
            "right": false,
            "why": "0,20 × 30% = 6%."
          },
          {
            "text": "1,5%",
            "right": false,
            "why": "0,20 × 30% = 6%."
          },
          {
            "text": "6%",
            "right": true
          }
        ],
        "explain": "Un paniere di un solo settore (per esempio la tecnologia) è meno diversificato di uno che copre settori e paesi diversi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché tre ETF non bastano a dire che sei diversificato?",
            "options": [
              {
                "text": "Perché tre sono pochi",
                "right": false,
                "why": "Avere tanti fondi non vuol dire essere diversificati: conta che cosa contengono."
              },
              {
                "text": "Possono contenere le stesse società",
                "right": true
              },
              {
                "text": "Perché i fondi non diversificano",
                "right": false,
                "why": "Avere tanti fondi non vuol dire essere diversificati: conta che cosa contengono."
              },
              {
                "text": "Perché costano troppo",
                "right": false,
                "why": "Avere tanti fondi non vuol dire essere diversificati: conta che cosa contengono."
              }
            ],
            "explain": "Due fondi possono avere in comune molte società: la sovrapposizione è la parte del patrimonio che è nelle stesse società."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Hai comprato tre ETF e pensi di essere molto diversificato.",
        "options": [
          {
            "text": "Sì, tre prodotti sono tanti",
            "right": false,
            "why": "B). Conta il contenuto, non il numero di prodotti."
          },
          {
            "text": "Controlli cosa contengono: se si sovrappongono molto, non stai diversificando di più",
            "right": true
          },
          {
            "text": "Ne compri un quarto",
            "right": false,
            "why": "B). Conta il contenuto, non il numero di prodotti."
          },
          {
            "text": "Ne vendi due a caso",
            "right": false,
            "why": "B). Conta il contenuto, non il numero di prodotti."
          }
        ],
        "explain": "Contare i fondi invece di guardare cosa contengono."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 10)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Dopo un calo del 30%, di quanto devi salire per tornare pari?",
        "options": [
          {
            "text": "30%",
            "right": false,
            "why": "300 ÷ 700 = 42,86%."
          },
          {
            "text": "42,86%",
            "right": true
          },
          {
            "text": "70%",
            "right": false,
            "why": "300 ÷ 700 = 42,86%."
          },
          {
            "text": "130%",
            "right": false,
            "why": "300 ÷ 700 = 42,86%."
          }
        ],
        "explain": "La diversificazione funziona se i titoli non si muovono tutti insieme. Un fondo può contenere centinaia di società ma avere la maggior parte del peso in poche: la concentrazione dei pesi conta più del numero di titoli."
      }
    ],
    "source": "C11-L04"
  },
  "p11-l5": {
    "id": "p11-l5",
    "code": "L5",
    "floor": 11,
    "title": "Rischi e limiti degli ETF",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Rischi e limiti degli ETF",
        "mentor": "Perché un ETF su un indice ampio può comunque far perdere soldi?",
        "options": [
          {
            "text": "Perché l’ETF non è mai diversificato",
            "right": false,
            "why": "Perché segue l’indice: se tutto il mercato scende, scende anche l’ETF; la diversificazione non elimina il rischio di mercato."
          },
          {
            "text": "Perché segue l’indice: se tutto il mercato scende, scende anche l’ETF",
            "right": true
          },
          {
            "text": "Perché gli ETF sono garantiti dalla banca",
            "right": false,
            "why": "Perché segue l’indice: se tutto il mercato scende, scende anche l’ETF; la diversificazione non elimina il rischio di mercato."
          },
          {
            "text": "Non può far perdere soldi",
            "right": false,
            "why": "Perché segue l’indice: se tutto il mercato scende, scende anche l’ETF; la diversificazione non elimina il rischio di mercato."
          }
        ],
        "theory": "Un ETF ampio riduce il rischio di una singola società, ma non protegge da un calo del mercato, dalle oscillazioni del cambio o dai piccoli scostamenti dall’indice. Non è un prodotto sicuro.",
        "explain": "Il rischio di mercato resta: se l’indice scende del 30%, l’ETF scende circa del 30% (Cap. 10 L5). La differenza dall’indice (in inglese tracking difference) è lo scostamento tra il risultato dell’ETF e quello dell’indice, dovuto ai costi e a come è costruito."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "10.000 € in un ETF e l’indice perde il 30%: quanto valgono?",
        "options": [
          {
            "text": "3.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "10.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "7.000 €",
            "right": true
          },
          {
            "text": "6.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          }
        ],
        "explain": "Il rischio di cambio c’è quando l’indice è in un’altra valuta: se la valuta perde valore rispetto all’euro, il risultato in euro cala anche se l’indice sale."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Indice +8% (10.800 €) e ETF che rende circa 10.775 €: scostamento?",
        "options": [
          {
            "text": "250 €",
            "right": false,
            "why": "10.800 − 10.775 = 25 €."
          },
          {
            "text": "2,5 €",
            "right": false,
            "why": "10.800 − 10.775 = 25 €."
          },
          {
            "text": "10.775 €",
            "right": false,
            "why": "10.800 − 10.775 = 25 €."
          },
          {
            "text": "25 €",
            "right": true
          }
        ],
        "explain": "Infine, l’ETF replica l’indice che segue: se l’indice è concentrato o rischioso, lo è anche l’ETF. Credere che «ETF ampio» significhi «non perde».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "5.000 € in un ETF e l’indice perde il 20%: quanto valgono?",
            "options": [
              {
                "text": "1.000 €",
                "right": false,
                "why": "5.000 × 0,80 = 4.000 €."
              },
              {
                "text": "4.800 €",
                "right": false,
                "why": "5.000 × 0,80 = 4.000 €."
              },
              {
                "text": "4.000 €",
                "right": true
              },
              {
                "text": "5.000 €",
                "right": false,
                "why": "5.000 × 0,80 = 4.000 €."
              }
            ],
            "explain": "Infine, l’ETF replica l’indice che segue: se l’indice è concentrato o rischioso, lo è anche l’ETF. Credere che «ETF ampio» significhi «non perde»."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Indice in valuta estera +8%, valuta −10% sull’euro: valore finale e variazione di 10.000 €?",
        "options": [
          {
            "text": "10.800 €: +8%",
            "right": false,
            "why": "10.000 × 1,08 × 0,90 = 9.720 €."
          },
          {
            "text": "9.000 €: −10%",
            "right": false,
            "why": "10.000 × 1,08 × 0,90 = 9.720 €."
          },
          {
            "text": "10.280 €: +2,8%",
            "right": false,
            "why": "10.000 × 1,08 × 0,90 = 9.720 €."
          },
          {
            "text": "9.720 €: −2,8%",
            "right": true
          }
        ],
        "explain": "L’altro errore è ignorare la valuta e gli scarti perché «sono piccoli»: sommati ai costi pesano.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Indice +5% in valuta estera e valuta −5% sull’euro: valore di 10.000 €?",
            "options": [
              {
                "text": "10.000 €",
                "right": false,
                "why": "10.000 × 1,05 × 0,95 = 9.975 €."
              },
              {
                "text": "10.500 €",
                "right": false,
                "why": "10.000 × 1,05 × 0,95 = 9.975 €."
              },
              {
                "text": "9.500 €",
                "right": false,
                "why": "10.000 × 1,05 × 0,95 = 9.975 €."
              },
              {
                "text": "9.975 €",
                "right": true
              }
            ],
            "explain": "Il rischio di cambio c’è quando l’indice è in un’altra valuta: se la valuta perde valore rispetto all’euro, il risultato in euro cala anche se l’indice sale."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Compri 100 quote a 100,10 € e le rivendi subito a 99,90 €: quanto perdi per lo scarto?",
        "options": [
          {
            "text": "20 €",
            "right": true
          },
          {
            "text": "200 €",
            "right": false,
            "why": "100 × 0,20 = 20 €."
          },
          {
            "text": "0,20 €",
            "right": false,
            "why": "100 × 0,20 = 20 €."
          },
          {
            "text": "10 €",
            "right": false,
            "why": "100 × 0,20 = 20 €."
          }
        ],
        "explain": "Quando compri o vendi un ETF in borsa c’è anche uno scarto tra prezzo di acquisto e di vendita (lo spread): un costo che si paga ogni volta che si entra e si esce.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché un ETF non è adatto a soldi che ti servono tra pochi mesi?",
            "options": [
              {
                "text": "Perché non si può vendere",
                "right": false,
                "why": "Il rischio di mercato resta."
              },
              {
                "text": "Perché è garantito",
                "right": false,
                "why": "Il rischio di mercato resta."
              },
              {
                "text": "Il mercato può essere basso proprio allora",
                "right": true
              },
              {
                "text": "Perché costa troppo",
                "right": false,
                "why": "Il rischio di mercato resta."
              }
            ],
            "explain": "Il rischio di mercato resta: se l’indice scende del 30%, l’ETF scende circa del 30% (Cap. 10 L5). La differenza dall’indice (in inglese tracking difference) è lo scostamento tra il risultato dell’ETF e quello dell’indice, dovuto ai costi e a come è costruito."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Ti servono 3.000 € tra un anno.",
        "options": [
          {
            "text": "Lo metti in un ETF mondiale, perché è molto diversificato",
            "right": false,
            "why": "B). La diversificazione non elimina il rischio di mercato e l’orizzonte è breve."
          },
          {
            "text": "Scegli un ETF di un solo settore",
            "right": false,
            "why": "B). La diversificazione non elimina il rischio di mercato e l’orizzonte è breve."
          },
          {
            "text": "Non è adatto: il rischio di mercato può farti trovare un valore basso proprio quando ti servono",
            "right": true
          },
          {
            "text": "Lo compri con un prestito",
            "right": false,
            "why": "B). La diversificazione non elimina il rischio di mercato e l’orizzonte è breve."
          }
        ],
        "explain": "Il rischio di mercato resta: se l’indice scende del 30%, l’ETF scende circa del 30% (Cap. 10 L5). La differenza dall’indice (in inglese tracking difference) è lo scostamento tra il risultato dell’ETF e quello dell’indice, dovuto ai costi e a come è costruito."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 10)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Prezzo 150 € e utile per azione 5 €: P/E?",
        "options": [
          {
            "text": "0,03",
            "right": false,
            "why": "150 ÷ 5 = 30."
          },
          {
            "text": "30",
            "right": true
          },
          {
            "text": "15",
            "right": false,
            "why": "150 ÷ 5 = 30."
          },
          {
            "text": "150",
            "right": false,
            "why": "150 ÷ 5 = 30."
          }
        ],
        "explain": "Quando compri o vendi un ETF in borsa c’è anche uno scarto tra prezzo di acquisto e di vendita (lo spread): un costo che si paga ogni volta che si entra e si esce."
      }
    ],
    "source": "C11-L05"
  },
  "p11-l6": {
    "id": "p11-l6",
    "code": "L6",
    "floor": 11,
    "title": "Leggere la scheda informativa",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Leggere la scheda informativa",
        "mentor": "Che cosa dice l’indicatore di rischio da 1 a 7?",
        "options": [
          {
            "text": "Il rendimento garantito",
            "right": false,
            "why": "Prima di comprare un fondo o un ETF c’è un documento che dice cos’è, quanto costa, quanto è rischioso e per quanto tempo conviene tenerlo."
          },
          {
            "text": "Il costo annuo",
            "right": false,
            "why": "Prima di comprare un fondo o un ETF c’è un documento che dice cos’è, quanto costa, quanto è rischioso e per quanto tempo conviene tenerlo."
          },
          {
            "text": "Quanto il valore del prodotto può oscillare: più è vicino a 7, più è alta la probabilità di forti variazioni, anche in calo",
            "right": true
          },
          {
            "text": "Gli anni consigliati di detenzione",
            "right": false,
            "why": "Prima di comprare un fondo o un ETF c’è un documento che dice cos’è, quanto costa, quanto è rischioso e per quanto tempo conviene tenerlo."
          }
        ],
        "theory": "Prima di comprare un fondo o un ETF c’è un documento che dice cos’è, quanto costa, quanto è rischioso e per quanto tempo conviene tenerlo. Leggerlo è il modo più economico per evitare errori.",
        "explain": "Una scheda ben fatta contiene l’obiettivo del prodotto, un indicatore di rischio su una scala da 1 a 7 (più è alto, più il valore può oscillare), i costi (annuo e una tantum), il periodo di detenzione raccomandato e degli scenari con esiti stimati, anche sfavorevoli."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Costo annuo 0,20% su 5.000 €: quanto?",
        "options": [
          {
            "text": "100 €",
            "right": false,
            "why": "5.000 × 0,002 = 10 €."
          },
          {
            "text": "1 €",
            "right": false,
            "why": "5.000 × 0,002 = 10 €."
          },
          {
            "text": "0,10 €",
            "right": false,
            "why": "5.000 × 0,002 = 10 €."
          },
          {
            "text": "10 €",
            "right": true
          }
        ],
        "explain": "Gli scenari non sono previsioni: sono esempi di cosa potrebbe succedere. Dal documento si capisce se il prodotto è adatto: l’indicatore di rischio e il periodo raccomandato vanno confrontati con il tuo orizzonte e con quanto puoi permetterti di perdere."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Costo annuo 0,90% su 5.000 €: quanto?",
        "options": [
          {
            "text": "450 €",
            "right": false,
            "why": "5.000 × 0,009 = 45 €."
          },
          {
            "text": "4,50 €",
            "right": false,
            "why": "5.000 × 0,009 = 45 €."
          },
          {
            "text": "45 €",
            "right": true
          },
          {
            "text": "9 €",
            "right": false,
            "why": "5.000 × 0,009 = 45 €."
          }
        ],
        "explain": "Leggere solo il rendimento e non l’indicatore di rischio e lo scenario sfavorevole. L’altro errore è prendere gli scenari come previsioni.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Costo annuo 0,5% su 4.000 €: quanto?",
            "options": [
              {
                "text": "200 €",
                "right": false,
                "why": "4.000 × 0,005 = 20 €."
              },
              {
                "text": "2 €",
                "right": false,
                "why": "4.000 × 0,005 = 20 €."
              },
              {
                "text": "20 €",
                "right": true
              },
              {
                "text": "0,5 €",
                "right": false,
                "why": "4.000 × 0,005 = 20 €."
              }
            ],
            "explain": "Una scheda ben fatta contiene l’obiettivo del prodotto, un indicatore di rischio su una scala da 1 a 7 (più è alto, più il valore può oscillare), i costi (annuo e una tantum), il periodo di detenzione raccomandato e degli scenari con esiti stimati, anche sfavorevoli."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Scenario sfavorevole: 10.000 € diventano 6.500 €. Perdita in euro e in percentuale?",
        "options": [
          {
            "text": "3.500 €, cioè −35%",
            "right": true
          },
          {
            "text": "6.500 €, cioè −65%",
            "right": false,
            "why": "10.000 − 6.500 = 3.500 €."
          },
          {
            "text": "3.500 €, cioè −3,5%",
            "right": false,
            "why": "10.000 − 6.500 = 3.500 €."
          },
          {
            "text": "350 €, cioè −35%",
            "right": false,
            "why": "10.000 − 6.500 = 3.500 €."
          }
        ],
        "explain": "Leggere solo il rendimento e non l’indicatore di rischio e lo scenario sfavorevole. L’altro errore è prendere gli scenari come previsioni.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un prodotto ha indicatore 2 su 7 e un altro 6 su 7: quale oscilla di più?",
            "options": [
              {
                "text": "Quello con 6",
                "right": true
              },
              {
                "text": "Quello con 2",
                "right": false,
                "why": "Più è alto, più oscilla."
              },
              {
                "text": "Oscillano uguale",
                "right": false,
                "why": "Più è alto, più oscilla."
              },
              {
                "text": "Nessuno oscilla",
                "right": false,
                "why": "Più è alto, più oscilla."
              }
            ],
            "explain": "Leggere solo il rendimento e non l’indicatore di rischio e lo scenario sfavorevole. L’altro errore è prendere gli scenari come previsioni."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un ETF ha TER 0,20% sul capitale iniziale di 10.000 € e periodo raccomandato di 5 anni. Costo stimato in 5 anni (semplificato)?",
        "options": [
          {
            "text": "20 €",
            "right": false,
            "why": "20 × 5 = 100 €."
          },
          {
            "text": "1.000 €",
            "right": false,
            "why": "20 × 5 = 100 €."
          },
          {
            "text": "200 €",
            "right": false,
            "why": "20 × 5 = 100 €."
          },
          {
            "text": "100 € (stima semplificata)",
            "right": true
          }
        ],
        "explain": "Una scheda ben fatta contiene l’obiettivo del prodotto, un indicatore di rischio su una scala da 1 a 7 (più è alto, più il valore può oscillare), i costi (annuo e una tantum), il periodo di detenzione raccomandato e degli scenari con esiti stimati, anche sfavorevoli.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Scenario sfavorevole: 8.000 € diventano 6.000 €. Perdita in euro e percentuale?",
            "options": [
              {
                "text": "6.000 €, −75%",
                "right": false,
                "why": "2.000 ÷ 8.000 = 25%."
              },
              {
                "text": "2.000 €, −2,5%",
                "right": false,
                "why": "2.000 ÷ 8.000 = 25%."
              },
              {
                "text": "200 €, −25%",
                "right": false,
                "why": "2.000 ÷ 8.000 = 25%."
              },
              {
                "text": "2.000 €, −25%",
                "right": true
              }
            ],
            "explain": "Leggere solo il rendimento e non l’indicatore di rischio e lo scenario sfavorevole. L’altro errore è prendere gli scenari come previsioni."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un ETF ha indicatore di rischio 6 su 7 e periodo raccomandato 5 anni, ma ti serviranno i soldi tra 2 anni.",
        "options": [
          {
            "text": "Lo compri comunque, il rendimento sembra buono",
            "right": false,
            "why": "B). Il documento serve proprio a confrontare il prodotto con il tuo orizzonte e con quanto puoi permetterti di perdere."
          },
          {
            "text": "Lo compri e poi lo guardi ogni giorno",
            "right": false,
            "why": "B). Il documento serve proprio a confrontare il prodotto con il tuo orizzonte e con quanto puoi permetterti di perdere."
          },
          {
            "text": "Non è adatto: rischio alto e orizzonte più breve di quello consigliato",
            "right": true
          },
          {
            "text": "Lo compri e ignori il periodo raccomandato",
            "right": false,
            "why": "B). Il documento serve proprio a confrontare il prodotto con il tuo orizzonte e con quanto puoi permetterti di perdere."
          }
        ],
        "explain": "Dal documento si capisce se il prodotto è adatto: l’indicatore di rischio e il periodo raccomandato vanno confrontati con il tuo orizzonte e con quanto puoi permetterti di perdere."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 10)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "5.000 € con un calo del 30%: quanto valgono?",
        "options": [
          {
            "text": "1.500 €",
            "right": false,
            "why": "5.000 × 0,70 = 3.500 €."
          },
          {
            "text": "4.000 €",
            "right": false,
            "why": "5.000 × 0,70 = 3.500 €."
          },
          {
            "text": "3.500 €",
            "right": true
          },
          {
            "text": "3.000 €",
            "right": false,
            "why": "5.000 × 0,70 = 3.500 €."
          }
        ],
        "explain": "Una scheda ben fatta contiene l’obiettivo del prodotto, un indicatore di rischio su una scala da 1 a 7 (più è alto, più il valore può oscillare), i costi (annuo e una tantum), il periodo di detenzione raccomandato e degli scenari con esiti stimati, anche sfavorevoli."
      }
    ],
    "source": "C11-L06"
  },
  "p12-l1": {
    "id": "p12-l1",
    "code": "L1",
    "floor": 12,
    "title": "Le valute e il cambio",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Le valute e il cambio",
        "mentor": "Cosa significa che il cambio è 1 € = 1,10 $?",
        "options": [
          {
            "text": "Che con un dollaro si ottengono 1,10 euro",
            "right": false,
            "why": "Ogni Paese ha una sua valuta e il cambio dice quante unità di una valuta servono per averne una di un’altra."
          },
          {
            "text": "Che l’euro costa 1,10 € di commissione",
            "right": false,
            "why": "Ogni Paese ha una sua valuta e il cambio dice quante unità di una valuta servono per averne una di un’altra."
          },
          {
            "text": "Che con un euro si ottengono 1,10 dollari: è il prezzo di una valuta espresso in un’altra",
            "right": true
          },
          {
            "text": "Che il dollaro vale sempre 1,10 volte l’euro",
            "right": false,
            "why": "Ogni Paese ha una sua valuta e il cambio dice quante unità di una valuta servono per averne una di un’altra."
          }
        ],
        "theory": "Ogni Paese ha una sua valuta e il cambio dice quante unità di una valuta servono per averne una di un’altra. Per sapere quanto costa davvero una cosa in euro, devi convertirla.",
        "explain": "Il cambio è il prezzo di una valuta in un’altra. Se 1 € = 1,10 $ (cambio fittizio) significa che con un euro ottieni 1,10 dollari; per convertire dollari in euro si divide per 1,10, per convertire euro in dollari si moltiplica."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un oggetto costa 55 $ e 1 € = 1,10 $: prezzo in euro?",
        "options": [
          {
            "text": "50 €",
            "right": true
          },
          {
            "text": "60,50 €",
            "right": false,
            "why": "55 ÷ 1,10 = 50 €."
          },
          {
            "text": "55 €",
            "right": false,
            "why": "55 ÷ 1,10 = 50 €."
          },
          {
            "text": "1,10 €",
            "right": false,
            "why": "55 ÷ 1,10 = 50 €."
          }
        ],
        "explain": "L’altro errore è confrontare un prezzo in dollari con uno in euro senza convertirli."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con 1 € = 1,10 $, quanti dollari ottieni con 200 €?",
        "options": [
          {
            "text": "220 $",
            "right": true
          },
          {
            "text": "181,82 $",
            "right": false,
            "why": "200 × 1,10 = 220 $."
          },
          {
            "text": "200 $",
            "right": false,
            "why": "200 × 1,10 = 220 $."
          },
          {
            "text": "210 $",
            "right": false,
            "why": "200 × 1,10 = 220 $."
          }
        ],
        "explain": "Il cambio cambia ogni giorno: se per 1 € ottieni più dollari (per esempio 1,20), l’euro si dice più forte e le cose in dollari costano meno in euro; se ne ottieni meno (1,00) l’euro è più debole e le cose in dollari costano di più.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Con 1 € = 1,10 $, un oggetto costa 77 $: prezzo in euro?",
            "options": [
              {
                "text": "84,70 €",
                "right": false,
                "why": "77 ÷ 1,10 = 70 €."
              },
              {
                "text": "77 €",
                "right": false,
                "why": "77 ÷ 1,10 = 70 €."
              },
              {
                "text": "70 €",
                "right": true
              },
              {
                "text": "7 €",
                "right": false,
                "why": "77 ÷ 1,10 = 70 €."
              }
            ],
            "explain": "Il cambio cambia ogni giorno: se per 1 € ottieni più dollari (per esempio 1,20), l’euro si dice più forte e le cose in dollari costano meno in euro; se ne ottieni meno (1,00) l’euro è più debole e le cose in dollari costano di più."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un oggetto costa 55 $. Se il cambio sale a 1 € = 1,20 $, quanto costa in euro?",
        "options": [
          {
            "text": "45,83 €",
            "right": true
          },
          {
            "text": "66,00 €",
            "right": false,
            "why": "55 ÷ 1,20 = 45,83 €."
          },
          {
            "text": "55,00 €",
            "right": false,
            "why": "55 ÷ 1,20 = 45,83 €."
          },
          {
            "text": "50,00 €",
            "right": false,
            "why": "55 ÷ 1,20 = 45,83 €."
          }
        ],
        "explain": "Per questo un prezzo in valuta estera non è «basso» o «alto» finché non lo converti. Moltiplicare invece di dividere (o il contrario) e ritrovarsi con un prezzo sbagliato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Con 1 € = 1,10 $, quanti dollari ottieni con 300 €?",
            "options": [
              {
                "text": "272,73 $",
                "right": false,
                "why": "300 × 1,10 = 330 $."
              },
              {
                "text": "300 $",
                "right": false,
                "why": "300 × 1,10 = 330 $."
              },
              {
                "text": "310 $",
                "right": false,
                "why": "300 × 1,10 = 330 $."
              },
              {
                "text": "330 $",
                "right": true
              }
            ],
            "explain": "Se 1 € = 1,10 $ (cambio fittizio) significa che con un euro ottieni 1,10 dollari; per convertire dollari in euro si divide per 1,10, per convertire euro in dollari si moltiplica."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un oggetto costa 55 $. Se il cambio scende a 1 € = 1,00 $, quanto costa in euro?",
        "options": [
          {
            "text": "55 €",
            "right": true
          },
          {
            "text": "50 €",
            "right": false,
            "why": "55 ÷ 1,00 = 55 €."
          },
          {
            "text": "60,50 €",
            "right": false,
            "why": "55 ÷ 1,00 = 55 €."
          },
          {
            "text": "0 €",
            "right": false,
            "why": "55 ÷ 1,00 = 55 €."
          }
        ],
        "explain": "Se 1 € = 1,10 $ (cambio fittizio) significa che con un euro ottieni 1,10 dollari; per convertire dollari in euro si divide per 1,10, per convertire euro in dollari si moltiplica.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "L’euro si rafforza sul dollaro: cosa succede al prezzo in euro di un oggetto quotato in dollari?",
            "options": [
              {
                "text": "Sale",
                "right": false,
                "why": "Servono meno euro per la stessa cifra in dollari."
              },
              {
                "text": "Resta uguale",
                "right": false,
                "why": "Servono meno euro per la stessa cifra in dollari."
              },
              {
                "text": "Scende",
                "right": true
              },
              {
                "text": "Dipende dal colore",
                "right": false,
                "why": "Servono meno euro per la stessa cifra in dollari."
              }
            ],
            "explain": "L’altro errore è confrontare un prezzo in dollari con uno in euro senza convertirli."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un sito in dollari vende un oggetto a 55 $, un altro in euro lo vende a 52 €.",
        "options": [
          {
            "text": "Quello in euro costa meno perché 52 è vicino a 55",
            "right": false,
            "why": "B). Va sempre convertito, e poi vanno aggiunti i costi (L2)."
          },
          {
            "text": "Scegli quello con il numero più alto",
            "right": false,
            "why": "B). Va sempre convertito, e poi vanno aggiunti i costi (L2)."
          },
          {
            "text": "Scegli sempre il sito in euro",
            "right": false,
            "why": "B). Va sempre convertito, e poi vanno aggiunti i costi (L2)."
          },
          {
            "text": "Converti: 55 $ sono 50 € al cambio di 1,10, quindi il sito in dollari costa 2 € in meno prima di spedizione e costi di cambio",
            "right": true
          }
        ],
        "explain": "Se 1 € = 1,10 $ (cambio fittizio) significa che con un euro ottieni 1,10 dollari; per convertire dollari in euro si divide per 1,10, per convertire euro in dollari si moltiplica."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 11)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Costo annuo dello 0,20% su 5.000 €: quanto?",
        "options": [
          {
            "text": "10 €",
            "right": true
          },
          {
            "text": "100 €",
            "right": false,
            "why": "5.000 × 0,002 = 10 €."
          },
          {
            "text": "1 €",
            "right": false,
            "why": "5.000 × 0,002 = 10 €."
          },
          {
            "text": "0,10 €",
            "right": false,
            "why": "5.000 × 0,002 = 10 €."
          }
        ],
        "explain": "Il cambio è il prezzo di una valuta in un’altra. Se 1 € = 1,10 $ (cambio fittizio) significa che con un euro ottieni 1,10 dollari; per convertire dollari in euro si divide per 1,10, per convertire euro in dollari si moltiplica."
      }
    ],
    "source": "C12-L01"
  },
  "p12-l2": {
    "id": "p12-l2",
    "code": "L2",
    "floor": 12,
    "title": "Quanto costa cambiare",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Quanto costa cambiare",
        "mentor": "Che cos’è lo spread nel cambio?",
        "options": [
          {
            "text": "La commissione fissa in euro",
            "right": false,
            "why": "Cambiare valuta costa: chi cambia non usa il cambio di riferimento ma uno peggiore, e a volte aggiunge una commissione."
          },
          {
            "text": "Il cambio di riferimento della banca centrale",
            "right": false,
            "why": "Cambiare valuta costa: chi cambia non usa il cambio di riferimento ma uno peggiore, e a volte aggiunge una commissione."
          },
          {
            "text": "La differenza tra il cambio di riferimento e quello che ti viene applicato: è il guadagno di chi cambia",
            "right": true
          },
          {
            "text": "La tassa sul cambio",
            "right": false,
            "why": "Cambiare valuta costa: chi cambia non usa il cambio di riferimento ma uno peggiore, e a volte aggiunge una commissione."
          }
        ],
        "theory": "Cambiare valuta costa: chi cambia non usa il cambio di riferimento ma uno peggiore, e a volte aggiunge una commissione. Il costo vero si calcola in euro.",
        "explain": "Chi ti cambia i soldi (un’agenzia, un negozio, una carta di pagamento) applica un cambio un po’ peggiore: la differenza si chiama spread ed è il suo guadagno."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cambio applicato 1 € = 1,05 $: quanti dollari ricevi per 200 €?",
        "options": [
          {
            "text": "190,48 $",
            "right": false,
            "why": "200 × 1,05 = 210 $."
          },
          {
            "text": "210 $",
            "right": true
          },
          {
            "text": "200 $",
            "right": false,
            "why": "200 × 1,05 = 210 $."
          },
          {
            "text": "1.050 $",
            "right": false,
            "why": "200 × 1,05 = 210 $."
          }
        ],
        "explain": "Per confrontare servizi diversi non basta guardare una cifra: bisogna calcolare quanti dollari ricevi (o quanti euro spendi) alla fine."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Con il cambio di riferimento (1,10) avresti ricevuto 220 $. Quanti dollari in meno hai ricevuto?",
        "options": [
          {
            "text": "20 $",
            "right": false,
            "why": "220 − 210 = 10 $."
          },
          {
            "text": "220 $",
            "right": false,
            "why": "220 − 210 = 10 $."
          },
          {
            "text": "1 $",
            "right": false,
            "why": "220 − 210 = 10 $."
          },
          {
            "text": "10 $",
            "right": true
          }
        ],
        "explain": "Il cambio che vedi in televisione o su un sito è un cambio di riferimento.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cambio applicato 1 € = 1,04 $: quanti dollari ricevi per 250 €?",
            "options": [
              {
                "text": "240,38 $",
                "right": false,
                "why": "250 × 1,04 = 260 $."
              },
              {
                "text": "260 $",
                "right": true
              },
              {
                "text": "250 $",
                "right": false,
                "why": "250 × 1,04 = 260 $."
              },
              {
                "text": "1.040 $",
                "right": false,
                "why": "250 × 1,04 = 260 $."
              }
            ],
            "explain": "Il cambio che vedi in televisione o su un sito è un cambio di riferimento."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai ricevuto 10 $ in meno rispetto al cambio di riferimento (1 € = 1,10 $). Quanti euro sono?",
        "options": [
          {
            "text": "10,00 €",
            "right": false,
            "why": "10 ÷ 1,10 = 9,09 €."
          },
          {
            "text": "11,00 €",
            "right": false,
            "why": "10 ÷ 1,10 = 9,09 €."
          },
          {
            "text": "9,09 €",
            "right": true
          },
          {
            "text": "0,91 €",
            "right": false,
            "why": "10 ÷ 1,10 = 9,09 €."
          }
        ],
        "explain": "Pensare che «0 commissioni» significhi «gratis»: il costo può essere nascosto nel cambio. L’altro errore è confrontare solo le commissioni, senza guardare il tasso applicato.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Con il cambio di riferimento (1,10) avresti ricevuto 275 $. Quanti dollari in meno hai ricevuto (260 $)?",
            "options": [
              {
                "text": "10 $",
                "right": false,
                "why": "275 − 260 = 15 $."
              },
              {
                "text": "25 $",
                "right": false,
                "why": "275 − 260 = 15 $."
              },
              {
                "text": "1,5 $",
                "right": false,
                "why": "275 − 260 = 15 $."
              },
              {
                "text": "15 $",
                "right": true
              }
            ],
            "explain": "Il cambio che vedi in televisione o su un sito è un cambio di riferimento. Chi ti cambia i soldi (un’agenzia, un negozio, una carta di pagamento) applica un cambio un po’ peggiore: la differenza si chiama spread ed è il suo guadagno."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cambi 200 €: commissione di 3 € più 1%, e lo spread vale 9,09 €. Quanto è la commissione e quanto il costo totale (anche in percentuale di 200 €)?",
        "options": [
          {
            "text": "Commissione 5 €; costo totale 9,09 €, cioè il 4,5%",
            "right": false,
            "why": "3 + 2 = 5 € di commissione; 9,09 + 5 = 14,09 € in totale, cioè il 7,05% di 200 €."
          },
          {
            "text": "Commissione 3 €; costo totale 12,09 €, cioè il 6%",
            "right": false,
            "why": "3 + 2 = 5 € di commissione; 9,09 + 5 = 14,09 € in totale, cioè il 7,05% di 200 €."
          },
          {
            "text": "Commissione 5 €; costo totale 14,09 €, cioè il 70,5%",
            "right": false,
            "why": "3 + 2 = 5 € di commissione; 9,09 + 5 = 14,09 € in totale, cioè il 7,05% di 200 €."
          },
          {
            "text": "Commissione 5 €; costo totale 14,09 €, cioè il 7,05% di 200 €",
            "right": true
          }
        ],
        "explain": "A volte c’è anche una commissione, fissa o in percentuale.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "«Senza commissioni» vuol dire senza costi?",
            "options": [
              {
                "text": "Sì, sempre",
                "right": false,
                "why": "Lo spread è un costo anche senza commissione."
              },
              {
                "text": "No: il costo può essere nello spread",
                "right": true
              },
              {
                "text": "Sì, se il cambio è alto",
                "right": false,
                "why": "Lo spread è un costo anche senza commissione."
              },
              {
                "text": "No, ma solo per i dollari",
                "right": false,
                "why": "Lo spread è un costo anche senza commissione."
              }
            ],
            "explain": "Pensare che «0 commissioni» significhi «gratis»: il costo può essere nascosto nel cambio. L’altro errore è confrontare solo le commissioni, senza guardare il tasso applicato."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Servizio A: cambio di riferimento 1,10 e commissione 5 €. Servizio B: cambio 1,05 e nessuna commissione. Hai 200 €.",
        "options": [
          {
            "text": "Scegli B, non ha commissioni",
            "right": false,
            "why": "B). «Senza commissioni» non vuol dire senza costi: qui A conviene."
          },
          {
            "text": "Calcoli quanti dollari ricevi: A dà 214,50 $, B dà 210 $",
            "right": true
          },
          {
            "text": "Scegli quello con il cambio più alto",
            "right": false,
            "why": "B). «Senza commissioni» non vuol dire senza costi: qui A conviene."
          },
          {
            "text": "Scegli a caso",
            "right": false,
            "why": "B). «Senza commissioni» non vuol dire senza costi: qui A conviene."
          }
        ],
        "explain": "I valori reali di spread e commissioni cambiano da servizio a servizio e vanno verificati."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 11)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Costo annuo dello 0,90% su 5.000 €: quanto?",
        "options": [
          {
            "text": "450 €",
            "right": false,
            "why": "5.000 × 0,009 = 45 €."
          },
          {
            "text": "4,50 €",
            "right": false,
            "why": "5.000 × 0,009 = 45 €."
          },
          {
            "text": "45 €",
            "right": true
          },
          {
            "text": "9 €",
            "right": false,
            "why": "5.000 × 0,009 = 45 €."
          }
        ],
        "explain": "Il costo si può esprimere in valuta estera, ma conviene convertirlo in euro e in percentuale della somma cambiata."
      }
    ],
    "source": "C12-L02"
  },
  "p12-l3": {
    "id": "p12-l3",
    "code": "L3",
    "floor": 12,
    "title": "Le materie prime",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Le materie prime",
        "mentor": "Perché il prezzo di una materia prima può salire o scendere?",
        "options": [
          {
            "text": "Perché è garantito da una banca centrale",
            "right": false,
            "why": "Perché dipende da domanda e offerta: raccolti, scorte, consumo e altri fattori, e se è in dollari anche dal cambio."
          },
          {
            "text": "Perché dipende da domanda e offerta (raccolti, scorte, consumo) e, se è in dollari, anche dal cambio",
            "right": true
          },
          {
            "text": "Perché dipende solo dalle tasse",
            "right": false,
            "why": "Perché dipende da domanda e offerta: raccolti, scorte, consumo e altri fattori, e se è in dollari anche dal cambio."
          },
          {
            "text": "Perché paga una cedola che cambia",
            "right": false,
            "why": "Perché dipende da domanda e offerta: raccolti, scorte, consumo e altri fattori, e se è in dollari anche dal cambio."
          }
        ],
        "theory": "Le materie prime sono beni di base come petrolio, oro o caffè. Il loro prezzo sale e scende con la domanda e l’offerta e non producono interessi: guadagni solo se il prezzo sale, e puoi perdere se scende.",
        "explain": "Il prezzo dipende da domanda (quanta ne vuole il mondo) e offerta (quanta se ne produce): se un raccolto va male o una fonte si esaurisce, il prezzo può salire; se la domanda cala, scende."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un barile costa 80 $ e 1 € = 1,10 $: prezzo in euro?",
        "options": [
          {
            "text": "88,00 €",
            "right": false,
            "why": "80 ÷ 1,10 = 72,73 €."
          },
          {
            "text": "72,73 €",
            "right": true
          },
          {
            "text": "80,00 €",
            "right": false,
            "why": "80 ÷ 1,10 = 72,73 €."
          },
          {
            "text": "7,27 €",
            "right": false,
            "why": "80 ÷ 1,10 = 72,73 €."
          }
        ],
        "explain": "A differenza di un’obbligazione (Cap. 9) o di un’azione con dividendo (Cap. 10), un barile di petrolio o un lingotto non pagano interessi né dividendi: tenerli ha un costo (custodia, assicurazione) e il guadagno dipende solo dal prezzo di rivendita."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un barile da 80 $ scende del 25% a 60 $. Prezzo in euro con 1 € = 1,10 $?",
        "options": [
          {
            "text": "66,00 €",
            "right": false,
            "why": "60 ÷ 1,10 = 54,55 €."
          },
          {
            "text": "54,55 €",
            "right": true
          },
          {
            "text": "60,00 €",
            "right": false,
            "why": "60 ÷ 1,10 = 54,55 €."
          },
          {
            "text": "45,00 €",
            "right": false,
            "why": "60 ÷ 1,10 = 54,55 €."
          }
        ],
        "explain": "Molte si pagano in dollari, quindi il prezzo in euro dipende anche dal cambio (L1).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un barile costa 90 $ e 1 € = 1,20 $: prezzo in euro?",
            "options": [
              {
                "text": "75 €",
                "right": true
              },
              {
                "text": "108 €",
                "right": false,
                "why": "90 ÷ 1,20 = 75 €."
              },
              {
                "text": "90 €",
                "right": false,
                "why": "90 ÷ 1,20 = 75 €."
              },
              {
                "text": "7,50 €",
                "right": false,
                "why": "90 ÷ 1,20 = 75 €."
              }
            ],
            "explain": "Molte si pagano in dollari, quindi il prezzo in euro dipende anche dal cambio (L1)."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un sacco di caffè da 10 € sale del 30%: nuovo prezzo?",
        "options": [
          {
            "text": "10,30 €",
            "right": false,
            "why": "10 × 1,30 = 13 €."
          },
          {
            "text": "30 €",
            "right": false,
            "why": "10 × 1,30 = 13 €."
          },
          {
            "text": "3 €",
            "right": false,
            "why": "10 × 1,30 = 13 €."
          },
          {
            "text": "13 €",
            "right": true
          }
        ],
        "explain": "Non esiste un prezzo «giusto» prevedibile. Pensare che un bene «fisico» sia più sicuro di uno finanziario: il prezzo oscilla comunque.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Un sacco di caffè da 20 € scende del 10%: nuovo prezzo?",
            "options": [
              {
                "text": "18 €",
                "right": true
              },
              {
                "text": "22 €",
                "right": false,
                "why": "20 × 0,90 = 18 €."
              },
              {
                "text": "10 €",
                "right": false,
                "why": "20 × 0,90 = 18 €."
              },
              {
                "text": "19 €",
                "right": false,
                "why": "20 × 0,90 = 18 €."
              }
            ],
            "explain": "Il prezzo dipende da domanda (quanta ne vuole il mondo) e offerta (quanta se ne produce): se un raccolto va male o una fonte si esaurisce, il prezzo può salire; se la domanda cala, scende."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € in un bene a prezzo fermo per 10 anni contro 1.000 € al 3% annuo: differenza dopo 10 anni?",
        "options": [
          {
            "text": "343,92 € a favore del bene a prezzo fermo",
            "right": false,
            "why": "1.343,92 − 1.000 = 343,92 € a favore del titolo con interessi (ipotetico)."
          },
          {
            "text": "300 € a favore del titolo con interessi",
            "right": false,
            "why": "1.343,92 − 1.000 = 343,92 € a favore del titolo con interessi (ipotetico)."
          },
          {
            "text": "343,92 € a favore del titolo con interessi",
            "right": true
          },
          {
            "text": "Nessuna differenza",
            "right": false,
            "why": "1.343,92 − 1.000 = 343,92 € a favore del titolo con interessi (ipotetico)."
          }
        ],
        "explain": "L’altro errore è credere di poter prevedere il prezzo dalle notizie.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché le materie prime non producono interessi?",
            "options": [
              {
                "text": "Perché pagano cedole alte",
                "right": false,
                "why": "Non hanno cedola né dividendo."
              },
              {
                "text": "Perché sono garantite",
                "right": false,
                "why": "Non hanno cedola né dividendo."
              },
              {
                "text": "Si guadagna solo se il prezzo sale",
                "right": true
              },
              {
                "text": "Perché hanno sempre dividendo",
                "right": false,
                "why": "Non hanno cedola né dividendo."
              }
            ],
            "explain": "A differenza di un’obbligazione (Cap. 9) o di un’azione con dividendo (Cap. 10), un barile di petrolio o un lingotto non pagano interessi né dividendi: tenerli ha un costo (custodia, assicurazione) e il guadagno dipende solo dal prezzo di rivendita."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un conoscente ti dice: «il petrolio sale sempre, mettici i risparmi».",
        "options": [
          {
            "text": "Ci metti tutto",
            "right": false,
            "why": "B). Nessun prezzo è prevedibile e non c’è un interesse a compensare il rischio."
          },
          {
            "text": "Ricordi che il prezzo oscilla con domanda, offerta e cambio, senza garanzie, e non ci metti soldi che ti servono",
            "right": true
          },
          {
            "text": "Lo compri solo se lo dicono i giornali",
            "right": false,
            "why": "B). Nessun prezzo è prevedibile e non c’è un interesse a compensare il rischio."
          },
          {
            "text": "Ci metti metà dei risparmi",
            "right": false,
            "why": "B). Nessun prezzo è prevedibile e non c’è un interesse a compensare il rischio."
          }
        ],
        "explain": "Una materia prima è un bene che si scambia in grandi quantità e serve a produrre altro o come riserva di valore."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 11)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Costo annuo dell'1,50% su 10.000 €: quanto?",
        "options": [
          {
            "text": "150 €",
            "right": true
          },
          {
            "text": "15 €",
            "right": false,
            "why": "10.000 × 0,015 = 150 €."
          },
          {
            "text": "1.500 €",
            "right": false,
            "why": "10.000 × 0,015 = 150 €."
          },
          {
            "text": "1,50 €",
            "right": false,
            "why": "10.000 × 0,015 = 150 €."
          }
        ],
        "explain": "A differenza di un’obbligazione (Cap. 9) o di un’azione con dividendo (Cap. 10), un barile di petrolio o un lingotto non pagano interessi né dividendi: tenerli ha un costo (custodia, assicurazione) e il guadagno dipende solo dal prezzo di rivendita."
      }
    ],
    "source": "C12-L03"
  },
  "p12-l4": {
    "id": "p12-l4",
    "code": "L4",
    "floor": 12,
    "title": "Le cripto-attività: cosa sono",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Le cripto-attività",
        "mentor": "Qual è la differenza principale tra euro e una cripto-attività?",
        "options": [
          {
            "text": "Sono la stessa cosa",
            "right": false,
            "why": "L’euro è la moneta di uno Stato, emessa da una banca centrale; una cripto-attività non lo è e nessuno ne garantisce il valore, che dipende solo da domanda e offerta."
          },
          {
            "text": "Una cripto-attività è garantita dallo Stato",
            "right": false,
            "why": "L’euro è la moneta di uno Stato, emessa da una banca centrale; una cripto-attività non lo è e nessuno ne garantisce il valore, che dipende solo da domanda e offerta."
          },
          {
            "text": "L’euro è la moneta di uno Stato, emessa da una banca centrale; una cripto-attività no e nessuno ne garantisce il valore",
            "right": true
          },
          {
            "text": "L’euro non ha valore legale",
            "right": false,
            "why": "L’euro è la moneta di uno Stato, emessa da una banca centrale; una cripto-attività non lo è e nessuno ne garantisce il valore, che dipende solo da domanda e offerta."
          }
        ],
        "theory": "Una cripto-attività è un oggetto digitale registrato su un registro condiviso. Non è una moneta di Stato e non ha nessuno che ne garantisca il valore: il suo prezzo lo decidono solo compratori e venditori.",
        "explain": "Non sono euro: non sono emesse da una banca centrale e, di regola, nessuno è obbligato a ricomprarle a un prezzo fisso."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "100 gettoni Z a 2 €: valore?",
        "options": [
          {
            "text": "100 €",
            "right": false,
            "why": "100 × 2 = 200 €."
          },
          {
            "text": "200 €",
            "right": true
          },
          {
            "text": "2 €",
            "right": false,
            "why": "100 × 2 = 200 €."
          },
          {
            "text": "50 €",
            "right": false,
            "why": "100 × 2 = 200 €."
          }
        ],
        "explain": "Esistono tipi molto diversi: questo capitolo non ne raccomanda nessuno, e per gli esempi usa un «gettone Z» fittizio."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Hai 100 gettoni Z a 2 € (200 €). Il prezzo sale a 3 €: nuovo valore e variazione?",
        "options": [
          {
            "text": "300 €; +50%",
            "right": true
          },
          {
            "text": "300 €; +100%",
            "right": false,
            "why": "100 × 3 = 300; (300 − 200) ÷ 200 = +50%."
          },
          {
            "text": "300 €; +5%",
            "right": false,
            "why": "100 × 3 = 300; (300 − 200) ÷ 200 = +50%."
          },
          {
            "text": "150 €; +50%",
            "right": false,
            "why": "100 × 3 = 300; (300 − 200) ÷ 200 = +50%."
          }
        ],
        "explain": "Il loro prezzo cambia in base a quanti le vogliono comprare e vendere, spesso molto in fretta. Non pagano interessi o dividendi e non hanno un’azienda dietro che produce utili, quindi il guadagno dipende solo dal prezzo a cui rivendi.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "50 gettoni a 4 €: valore?",
            "options": [
              {
                "text": "200 €",
                "right": true
              },
              {
                "text": "54 €",
                "right": false,
                "why": "50 × 4 = 200 €."
              },
              {
                "text": "20 €",
                "right": false,
                "why": "50 × 4 = 200 €."
              },
              {
                "text": "12,50 €",
                "right": false,
                "why": "50 × 4 = 200 €."
              }
            ],
            "explain": "Esistono tipi molto diversi: questo capitolo non ne raccomanda nessuno, e per gli esempi usa un «gettone Z» fittizio."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Il gettone Z (100 gettoni) da 3 € scende a 1,50 €. Nuovo valore?",
        "options": [
          {
            "text": "150 €",
            "right": true
          },
          {
            "text": "300 €",
            "right": false,
            "why": "100 × 1,50 = 150 €."
          },
          {
            "text": "200 €",
            "right": false,
            "why": "100 × 1,50 = 150 €."
          },
          {
            "text": "50 €",
            "right": false,
            "why": "100 × 1,50 = 150 €."
          }
        ],
        "explain": "Le cripto-attività (spesso chiamate cripto) sono rappresentazioni digitali registrate su un sistema condiviso, chiamato in generale blockchain, senza un’autorità centrale come una banca.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Il prezzo sale a 6 €: nuovo valore e variazione?",
            "options": [
              {
                "text": "300 €; +150%",
                "right": false,
                "why": "50 × 6 = 300; 100 ÷ 200 = +50%."
              },
              {
                "text": "600 €; +50%",
                "right": false,
                "why": "50 × 6 = 300; 100 ÷ 200 = +50%."
              },
              {
                "text": "56 €; +50%",
                "right": false,
                "why": "50 × 6 = 300; 100 ÷ 200 = +50%."
              },
              {
                "text": "300 €; +50%",
                "right": true
              }
            ],
            "explain": "Il loro prezzo cambia in base a quanti le vogliono comprare e vendere, spesso molto in fretta. Non pagano interessi o dividendi e non hanno un’azienda dietro che produce utili, quindi il guadagno dipende solo dal prezzo a cui rivendi."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Dopo un valore di 200 € e uno di 300 €, il gettone vale 150 €. Variazione da 300 € a 150 € e da 200 € a 150 €?",
        "options": [
          {
            "text": "−25% e −50%",
            "right": false,
            "why": "(150 − 300) ÷ 300 = −50%; (150 − 200) ÷ 200 = −25%."
          },
          {
            "text": "−50% e −25%",
            "right": true
          },
          {
            "text": "−50% e −50%",
            "right": false,
            "why": "(150 − 300) ÷ 300 = −50%; (150 − 200) ÷ 200 = −25%."
          },
          {
            "text": "−150 € e −50 €",
            "right": false,
            "why": "(150 − 300) ÷ 300 = −50%; (150 − 200) ÷ 200 = −25%."
          }
        ],
        "explain": "Per conservarle servono delle chiavi: se le perdi, di norma non puoi recuperare nulla.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché «lo comprano tutti» non è un buon motivo?",
            "options": [
              {
                "text": "Perché è sempre una truffa",
                "right": false,
                "why": "La popolarità non è una garanzia."
              },
              {
                "text": "Perché i prezzi salgono sempre",
                "right": false,
                "why": "La popolarità non è una garanzia."
              },
              {
                "text": "Perché non si può vendere",
                "right": false,
                "why": "La popolarità non è una garanzia."
              },
              {
                "text": "È effetto gregge e nessuna autorità garantisce il prezzo",
                "right": true
              }
            ],
            "explain": "Non sono euro: non sono emesse da una banca centrale e, di regola, nessuno è obbligato a ricomprarle a un prezzo fisso."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un compagno ti dice di comprare un certo gettone «perché lo comprano tutti».",
        "options": [
          {
            "text": "Compri subito",
            "right": false,
            "why": "B). L’effetto gregge non è un motivo, e nessuna autorità garantisce il prezzo."
          },
          {
            "text": "Ti chiedi cos’è, chi lo emette, quali costi e rischi ha, e non compri solo perché lo fanno gli altri",
            "right": true
          },
          {
            "text": "Compri solo se sta salendo",
            "right": false,
            "why": "B). L’effetto gregge non è un motivo, e nessuna autorità garantisce il prezzo."
          },
          {
            "text": "Compri per non perdere l’occasione",
            "right": false,
            "why": "B). L’effetto gregge non è un motivo, e nessuna autorità garantisce il prezzo."
          }
        ],
        "explain": "L’altro errore è comprare perché «è salita» o «tutti la comprano»."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 10)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "10.000 € con un calo del 30%: quanto valgono?",
        "options": [
          {
            "text": "3.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "10.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "700 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "7.000 €",
            "right": true
          }
        ],
        "explain": "Regole, tassazione e tutele cambiano e vanno verificate. Pensare che una cripto-attività sia come un conto in euro in versione digitale."
      }
    ],
    "source": "C12-L04"
  },
  "p12-l5": {
    "id": "p12-l5",
    "code": "L5",
    "floor": 12,
    "title": "Il rischio delle cripto e delle promesse",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Il rischio delle cripto e delle promesse",
        "mentor": "Quali sono i segnali d’allarme di una proposta di investimento?",
        "options": [
          {
            "text": "Documenti completi, emittente verificabile, rendimento basso, tempi lunghi",
            "right": false,
            "why": "Rendimento garantito, guadagni alti e rapidi, urgenza, segretezza, pagamenti non rintracciabili, premi per chi porta altri partecipanti."
          },
          {
            "text": "Costi chiari, rischio indicato, nessuna fretta",
            "right": false,
            "why": "Rendimento garantito, guadagni alti e rapidi, urgenza, segretezza, pagamenti non rintracciabili, premi per chi porta altri partecipanti."
          },
          {
            "text": "Un nome conosciuto e un sito ben fatto",
            "right": false,
            "why": "Rendimento garantito, guadagni alti e rapidi, urgenza, segretezza, pagamenti non rintracciabili, premi per chi porta altri partecipanti."
          },
          {
            "text": "Rendimento garantito, guadagni alti e rapidi, urgenza, segretezza, pagamenti non rintracciabili, premi per chi porta altri",
            "right": true
          }
        ],
        "theory": "I prezzi delle cripto-attività possono crollare, e i cali pesano più dei rialzi. Una promessa di guadagni alti, garantiti e rapidi è il segnale più chiaro di una truffa.",
        "explain": "Le truffe di investimento hanno segnali ricorrenti: rendimento garantito (nessun investimento serio lo garantisce), guadagni alti e rapidi, urgenza («devi decidere oggi»), segretezza, pagamenti in forme difficili da rintracciare, sistemi che premiano chi porta altri partecipanti."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € perdono il 50% e poi guadagnano il 50%: quanto valgono?",
        "options": [
          {
            "text": "1.000 € (pari)",
            "right": false,
            "why": "1.000 → 500 → 750 €."
          },
          {
            "text": "750 € (−250 €)",
            "right": true
          },
          {
            "text": "500 €",
            "right": false,
            "why": "1.000 → 500 → 750 €."
          },
          {
            "text": "1.500 €",
            "right": false,
            "why": "1.000 → 500 → 750 €."
          }
        ],
        "explain": "Il rischio di prezzo è molto alto: un calo dell'80% lascia il 20% del valore, e per tornare al punto di partenza serve +400%."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € perdono l'80%: quanto restano?",
        "options": [
          {
            "text": "800 €",
            "right": false,
            "why": "1.000 × 0,20 = 200 €."
          },
          {
            "text": "100 €",
            "right": false,
            "why": "1.000 × 0,20 = 200 €."
          },
          {
            "text": "0 €",
            "right": false,
            "why": "1.000 × 0,20 = 200 €."
          },
          {
            "text": "200 €",
            "right": true
          }
        ],
        "explain": "Un calo del 50% seguito da un rialzo del 50% non ti riporta pari: lasci per strada il 25%. Oltre al prezzo ci sono rischi pratici: chiavi perse o rubate, piattaforme che chiudono senza restituire i soldi, truffe.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "2.000 € perdono il 50%: quanto resta e quale rialzo serve per tornare a 2.000 €?",
            "options": [
              {
                "text": "1.000 €; +50%",
                "right": false,
                "why": "1.000 ÷ 1.000 = +100%."
              },
              {
                "text": "500 €; +100%",
                "right": false,
                "why": "1.000 ÷ 1.000 = +100%."
              },
              {
                "text": "1.500 €; +50%",
                "right": false,
                "why": "1.000 ÷ 1.000 = +100%."
              },
              {
                "text": "1.000 €; +100%",
                "right": true
              }
            ],
            "explain": "Un calo del 50% seguito da un rialzo del 50% non ti riporta pari: lasci per strada il 25%. Oltre al prezzo ci sono rischi pratici: chiavi perse o rubate, piattaforme che chiudono senza restituire i soldi, truffe."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € perdono l'80% e restano 200 €. Quale rialzo serve per tornare a 1.000 €?",
        "options": [
          {
            "text": "+80%",
            "right": false,
            "why": "800 ÷ 200 = +400%."
          },
          {
            "text": "+100%",
            "right": false,
            "why": "800 ÷ 200 = +400%."
          },
          {
            "text": "+800%",
            "right": false,
            "why": "800 ÷ 200 = +400%."
          },
          {
            "text": "+400%",
            "right": true
          }
        ],
        "explain": "Un rendimento del 20% al mese, ripetuto per 12 mesi, farebbe diventare 1.000 € più di 8.900 €: nessuna attività reale può mantenerlo.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "500 € al 10% al mese per 6 mesi (composto): valore finale?",
            "options": [
              {
                "text": "885,78 €",
                "right": true
              },
              {
                "text": "800,00 €",
                "right": false,
                "why": "500 × 1,1⁶ = 885,78 €."
              },
              {
                "text": "560,00 €",
                "right": false,
                "why": "500 × 1,1⁶ = 885,78 €."
              },
              {
                "text": "1.000,00 €",
                "right": false,
                "why": "500 × 1,1⁶ = 885,78 €."
              }
            ],
            "explain": "Un rendimento del 20% al mese, ripetuto per 12 mesi, farebbe diventare 1.000 € più di 8.900 €: nessuna attività reale può mantenerlo."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "1.000 € al 20% al mese per 12 mesi (composto): valore finale?",
        "options": [
          {
            "text": "3.400,00 €",
            "right": false,
            "why": "1.000 × 1,2¹² = 8.916,10 €."
          },
          {
            "text": "1.200,00 €",
            "right": false,
            "why": "1.000 × 1,2¹² = 8.916,10 €."
          },
          {
            "text": "8.916,10 €",
            "right": true
          },
          {
            "text": "2.400,00 €",
            "right": false,
            "why": "1.000 × 1,2¹² = 8.916,10 €."
          }
        ],
        "explain": "I segnali vanno verificati su fonti ufficiali (Consob, Banca d’Italia). Pensare che chi propone un guadagno alto sia «un esperto che vuole aiutarti».",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché «garantito e alto» è un segnale d’allarme?",
            "options": [
              {
                "text": "Perché è sempre legale",
                "right": false,
                "why": "Rischio e rendimento vanno insieme."
              },
              {
                "text": "Nessun rendimento alto è garantito",
                "right": true
              },
              {
                "text": "Perché è consigliato dalla Consob",
                "right": false,
                "why": "Rischio e rendimento vanno insieme."
              },
              {
                "text": "Perché è poco rischioso",
                "right": false,
                "why": "Rischio e rendimento vanno insieme."
              }
            ],
            "explain": "I segnali vanno verificati su fonti ufficiali (Consob, Banca d’Italia). Pensare che chi propone un guadagno alto sia «un esperto che vuole aiutarti»."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Un messaggio sui social promette «il 20% al mese garantito, porta un amico».",
        "options": [
          {
            "text": "Provi con una cifra piccola",
            "right": false,
            "why": "B). Rendimento garantito, guadagni altissimi e bonus per chi porta altri sono segnali tipici di truffa."
          },
          {
            "text": "Coinvolgi gli amici così guadagni anche tu",
            "right": false,
            "why": "B). Rendimento garantito, guadagni altissimi e bonus per chi porta altri sono segnali tipici di truffa."
          },
          {
            "text": "Chiedi al mittente di mandarti altri dettagli e poi decidi",
            "right": false,
            "why": "B). Rendimento garantito, guadagni altissimi e bonus per chi porta altri sono segnali tipici di truffa."
          },
          {
            "text": "Non investi, non dai dati, verifichi l’offerta su fonti ufficiali e la segnali",
            "right": true
          }
        ],
        "explain": "L’altro errore è aggiungere altri soldi dopo un calo per «recuperare»."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 11)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Sovrapposizione del 70% su 10.000 €: quanti euro sono nelle stesse società?",
        "options": [
          {
            "text": "3.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "10.000 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          },
          {
            "text": "7.000 €",
            "right": true
          },
          {
            "text": "700 €",
            "right": false,
            "why": "10.000 × 0,70 = 7.000 €."
          }
        ],
        "explain": "Il rischio di prezzo è molto alto: un calo dell'80% lascia il 20% del valore, e per tornare al punto di partenza serve +400%."
      }
    ],
    "source": "C12-L05"
  },
  "p12-l6": {
    "id": "p12-l6",
    "code": "L6",
    "floor": 12,
    "title": "Quanto vale in euro? Il metodo",
    "exercises": [
      {
        "n": 1,
        "type": "scelta",
        "label": "Capire",
        "moment": "capire",
        "idea": "Quanto vale in euro? Il metodo",
        "mentor": "Quali sono i cinque punti del metodo?",
        "options": [
          {
            "text": "Cos’è e chi risponde; in che valuta e quanto vale in euro; quanto costa; il caso sfavorevole in euro; quanto puoi permetterti di perdere",
            "right": true
          },
          {
            "text": "Nome, rendimento promesso, quanti amici lo usano, parere di chi lo vende, durata",
            "right": false,
            "why": "Prima di mettere soldi in qualsiasi cosa, valuti cinque punti in euro: cos’è, quanto costa, quanto vale oggi, quanto potresti perdere e se puoi permettertelo."
          },
          {
            "text": "Rendimento, urgenza, segretezza, premio, garanzia",
            "right": false,
            "why": "Prima di mettere soldi in qualsiasi cosa, valuti cinque punti in euro: cos’è, quanto costa, quanto vale oggi, quanto potresti perdere e se puoi permettertelo."
          },
          {
            "text": "Cambio, commissione, tasse, inflazione, tasso",
            "right": false,
            "why": "Prima di mettere soldi in qualsiasi cosa, valuti cinque punti in euro: cos’è, quanto costa, quanto vale oggi, quanto potresti perdere e se puoi permettertelo."
          }
        ],
        "theory": "Prima di mettere soldi in qualsiasi cosa, valuti cinque punti in euro: cos’è, quanto costa, quanto vale oggi, quanto potresti perdere e se puoi permettertelo.",
        "explain": "Questo metodo vale per un’obbligazione, un’azione, un ETF, una valuta, una materia prima o una cripto-attività."
      },
      {
        "n": 2,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Cambio all'1,5% su 500 €: costo?",
        "options": [
          {
            "text": "75 €",
            "right": false,
            "why": "500 × 0,015 = 7,50 €."
          },
          {
            "text": "0,75 €",
            "right": false,
            "why": "500 × 0,015 = 7,50 €."
          },
          {
            "text": "7,50 €",
            "right": true
          },
          {
            "text": "15 €",
            "right": false,
            "why": "500 × 0,015 = 7,50 €."
          }
        ],
        "explain": "Terzo: quanto costa tra cambio, commissioni e costi annui (L2, Cap. 11 L3). Quarto: il caso sfavorevole in euro: se il prezzo cala e il cambio peggiora, quanto resta."
      },
      {
        "n": 3,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Prezzo −30% e dollaro −10% sull’euro, su 500 €: valore finale?",
        "options": [
          {
            "text": "350 €",
            "right": false,
            "why": "500 × 0,70 × 0,90 = 315 €."
          },
          {
            "text": "500 €",
            "right": false,
            "why": "500 × 0,70 × 0,90 = 315 €."
          },
          {
            "text": "315 €",
            "right": true
          },
          {
            "text": "285 €",
            "right": false,
            "why": "500 × 0,70 × 0,90 = 315 €."
          }
        ],
        "explain": "Secondo: in che valuta e quanto vale in euro (L1).",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Cambio al 2% su 400 €: costo?",
            "options": [
              {
                "text": "8 €",
                "right": true
              },
              {
                "text": "80 €",
                "right": false,
                "why": "400 × 0,02 = 8 €."
              },
              {
                "text": "0,80 €",
                "right": false,
                "why": "400 × 0,02 = 8 €."
              },
              {
                "text": "20 €",
                "right": false,
                "why": "400 × 0,02 = 8 €."
              }
            ],
            "explain": "Terzo: quanto costa tra cambio, commissioni e costi annui (L2, Cap. 11 L3). Quarto: il caso sfavorevole in euro: se il prezzo cala e il cambio peggiora, quanto resta."
          }
        ]
      },
      {
        "n": 4,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "Un investimento da 500 € vale 315 € nel caso sfavorevole. Quanto perdi?",
        "options": [
          {
            "text": "315 €",
            "right": false,
            "why": "500 − 315 = 185 €."
          },
          {
            "text": "200 €",
            "right": false,
            "why": "500 − 315 = 185 €."
          },
          {
            "text": "185 €",
            "right": true
          },
          {
            "text": "150 €",
            "right": false,
            "why": "500 − 315 = 185 €."
          }
        ],
        "explain": "Il caso favorevole non va dimenticato, ma conta quello sfavorevole: è l’unico che devi saper sopportare. Valutare solo il caso favorevole, o valutare in dollari senza convertire.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "10% di 2.000 € di risparmi (regola dell’esercizio)?",
            "options": [
              {
                "text": "20 €",
                "right": false,
                "why": "2.000 × 0,10 = 200 €."
              },
              {
                "text": "200 €",
                "right": true
              },
              {
                "text": "2.000 €",
                "right": false,
                "why": "2.000 × 0,10 = 200 €."
              },
              {
                "text": "1.800 €",
                "right": false,
                "why": "2.000 × 0,10 = 200 €."
              }
            ],
            "explain": "Quinto: quanto puoi permetterti di perdere: negli esempi una regola prudente del 10% dei risparmi, solo come ipotesi dell’esercizio, non una norma."
          }
        ]
      },
      {
        "n": 5,
        "type": "scelta",
        "label": "Calcolare",
        "moment": "calcolare",
        "idea": null,
        "mentor": "10% di 3.000 € di risparmi (regola dell’esercizio)?",
        "options": [
          {
            "text": "30 €",
            "right": false,
            "why": "3.000 × 0,10 = 300 €."
          },
          {
            "text": "3.000 €",
            "right": false,
            "why": "3.000 × 0,10 = 300 €."
          },
          {
            "text": "600 €",
            "right": false,
            "why": "3.000 × 0,10 = 300 €."
          },
          {
            "text": "300 €",
            "right": true
          }
        ],
        "explain": "Quinto: quanto puoi permetterti di perdere: negli esempi una regola prudente del 10% dei risparmi, solo come ipotesi dell’esercizio, non una norma.",
        "variants": [
          {
            "type": "scelta",
            "mentor": "Perché si fissa un limite alla perdita?",
            "options": [
              {
                "text": "Per non perdere più di quanto ci si può permettere",
                "right": true
              },
              {
                "text": "Per perdere meno possibile con certezza",
                "right": false,
                "why": "Il limite protegge dal caso sfavorevole."
              },
              {
                "text": "Perché lo vieta la legge",
                "right": false,
                "why": "Il limite protegge dal caso sfavorevole."
              },
              {
                "text": "Per guadagnare di più",
                "right": false,
                "why": "Il limite protegge dal caso sfavorevole."
              }
            ],
            "explain": "Il caso favorevole non va dimenticato, ma conta quello sfavorevole: è l’unico che devi saper sopportare. Valutare solo il caso favorevole, o valutare in dollari senza convertire."
          }
        ]
      },
      {
        "n": 6,
        "type": "scelta",
        "label": "Decidere",
        "moment": "decidere",
        "idea": null,
        "mentor": "Vuoi investire 500 €, ma il limite che ti sei dato è 300 €.",
        "options": [
          {
            "text": "Investi 500 €, il caso sfavorevole è solo ipotetico",
            "right": false,
            "why": "B). Il limite serve a evitare di perdere più di quanto puoi permetterti; un prestito aggiunge rischio."
          },
          {
            "text": "Prendi in prestito la differenza",
            "right": false,
            "why": "B). Il limite serve a evitare di perdere più di quanto puoi permetterti; un prestito aggiunge rischio."
          },
          {
            "text": "Riduci l’importo a 300 € o meno, oppure rinunci",
            "right": true
          },
          {
            "text": "Investi 500 € ma tieni da parte 300 € per le emergenze",
            "right": false,
            "why": "B). Il limite serve a evitare di perdere più di quanto puoi permetterti; un prestito aggiunge rischio."
          }
        ],
        "explain": "Primo: cos’è e chi risponde (chi lo emette, chi garantisce, se esiste una scheda informativa)."
      },
      {
        "n": 7,
        "type": "scelta",
        "label": "Ripasso (Cap. 9)",
        "moment": "ripasso",
        "idea": null,
        "mentor": "Obbligazione da 1.000 € con cedola 3%: quanto paga ogni anno?",
        "options": [
          {
            "text": "300 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          },
          {
            "text": "30 €",
            "right": true
          },
          {
            "text": "3 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          },
          {
            "text": "1.030 €",
            "right": false,
            "why": "1.000 × 0,03 = 30 €."
          }
        ],
        "explain": "L’altro errore è usare soldi che servono a breve (Cap. 10 L5)."
      }
    ],
    "source": "C12-L06"
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
// the title and the line of every stage, floor by floor, from the «casa sorgente» (main.js puts them on ROOMS)
export const STAGES = {
  "1": [
    {
      "title": "Entrate, uscite e saldo: dove finiscono i tuoi soldi",
      "idea": "Il saldo del mese è entrate meno uscite: se è positivo si accumula patrimonio, se è negativo si consuma ciò che si ha o ci si fa prestare soldi."
    },
    {
      "title": "Bisogni, desideri e costo-opportunità",
      "idea": "Ogni euro speso è un euro che non puoi spendere altrove: il vero costo di un acquisto è la migliore alternativa a cui rinunci."
    },
    {
      "title": "Abbonamenti e spese ricorrenti: il costo che non senti",
      "idea": "Una spesa piccola che si ripete ogni mese costa dodici volte tanto in un anno, e proprio perché si paga da sola smetti di vederla."
    },
    {
      "title": "La cassa dell’azienda nei primi 15 giorni",
      "idea": "Far reggere la cassa tra spese già impegnate e tre acquisti (computer, stampante, abbonamento), leggendo giorno per giorno il grafico a gradini."
    },
    {
      "title": "Il budget 50/30/20 e come adattarlo",
      "idea": "Un budget non è un divieto: è decidere prima dove va ogni euro, così che non lo decida il caso a fine mese."
    },
    {
      "title": "Tracciare le spese senza mollare dopo una settimana",
      "idea": "Il budget è un’ipotesi, le spese tracciate sono la prova: il metodo migliore è quello che continui a usare."
    },
    {
      "title": "Spese fisse sotto controllo: telefono e spesa",
      "idea": "Per confrontare due offerte non basta il prezzo in evidenza: servono il costo totale su un anno e il prezzo per unità."
    },
    {
      "title": "Il mese in numeri dell’azienda",
      "idea": "Classificare i movimenti del mese, calcolare la cassa finale, individuare le spese ricorrenti e costruire il budget del mese dopo per arrivare a 1.500 €."
    }
  ],
  "2": [
    {
      "title": "Il conto, l’IBAN e il bonifico",
      "idea": "Un conto è un registro di entrate e uscite; l’IBAN è l’indirizzo per ricevere soldi, non la chiave per prenderli."
    },
    {
      "title": "I tuoi soldi sono al sicuro? La garanzia sui depositi",
      "idea": "Se una banca fallisce, i depositi sono rimborsati fino a 100.000 € per persona e per banca: non tutto è un deposito e non tutto è coperto."
    },
    {
      "title": "Carte: debito, prepagata e credito",
      "idea": "La carta è un modo per autorizzare un pagamento: cambia da dove escono i soldi e quanto puoi perdere."
    },
    {
      "title": "Con cosa paghi?",
      "idea": "Scegliere lo strumento di pagamento (conto con IBAN, carta di debito, prepagata) per 5 operazioni dell’azienda."
    },
    {
      "title": "Pagare dopo: rate e «paga in 3 volte»",
      "idea": "Pagare a rate non cancella il prezzo: sposta il costo nel futuro e a volte lo aumenta."
    },
    {
      "title": "Phishing, smishing e vishing: il messaggio che ti mette fretta",
      "idea": "Chi ti truffa non ha bisogno di scoprire la tua password: gli basta convincerti a dargliela, di solito mettendoti fretta."
    },
    {
      "title": "Quando il truffato sei tu, o ti usano come strumento",
      "idea": "Dopo una frode conta la velocità: prima si blocca, poi si avvisa la banca, poi si denuncia; e chi presta il proprio conto per «guadagni facili» rischia lui."
    },
    {
      "title": "Truffe e difese",
      "idea": "Classificare messaggi «Mi fido / Non mi fido» e scegliere le difese contro le truffe di pagamento."
    }
  ],
  "3": [
    {
      "title": "Probabilità e valore atteso: la matematica del gioco",
      "idea": "Un gioco in cui paghi per avere una probabilità di vincere ha un valore atteso: quanto ti restituisce in media ogni volta che paghi."
    },
    {
      "title": "Trappole mentali: perché continuiamo a giocare",
      "idea": "Il cervello non calcola il valore atteso: reagisce a emozioni e schemi."
    },
    {
      "title": "Gratta e vinci, slot, scommesse e pacchetti a sorpresa: come funzionano",
      "idea": "Ogni gioco, legale o no, ha una percentuale di ritorno (payout) decisa a monte: la parte che non torna ai giocatori finisce a chi lo organizza, allo Stato e ai punti vendita."
    },
    {
      "title": "Il pacchetto a sorpresa",
      "idea": "Decidere quattro regole per un pacchetto a sorpresa: probabilità mostrate, prezzo, limiti, informazioni ai giocatori."
    },
    {
      "title": "Quando il gioco diventa un problema",
      "idea": "Il problema non sta nell’importo in sé ma nella perdita di controllo: quando il gioco prende tempo, soldi e pensieri a scapito del resto, è il momento di parlarne."
    },
    {
      "title": "Trading e leva: investire o scommettere?",
      "idea": "Investire significa possedere qualcosa che nel tempo produce valore (utili, interessi) e tenere i costi bassi; fare trading con la leva significa scommettere su un movimento di prezzo in poco tempo, con un’esposizione molto più grande del capitale versato."
    },
    {
      "title": "Proteggersi: limiti, regole e perdita massima",
      "idea": "La protezione migliore è una regola decisa a mente fredda, prima: durante il gioco il cervello è meno lucido (L2)."
    },
    {
      "title": "Il limite che regge",
      "idea": "Simulare giocatori che puntano sempre uguale o che rincorrono le perdite, e scegliere un limite che regga."
    }
  ],
  "4": [
    {
      "title": "Come ti convince la pubblicità",
      "idea": "La pubblicità non ti dice solo cosa c’è da comprare: usa meccanismi ricorrenti per farti decidere in fretta."
    },
    {
      "title": "Creator e finfluencer: chi ti sta vendendo cosa?",
      "idea": "Chi parla di soldi online spesso guadagna da ciò che racconta: link, codici, iscrizioni, sponsor."
    },
    {
      "title": "Truffe: pump and dump, schemi Ponzi e rendimenti garantiti",
      "idea": "Rendimento e rischio vanno insieme: se qualcuno promette molto e garantito, qualcosa non torna."
    },
    {
      "title": "La campagna che vende",
      "idea": "Decidere quattro regole per una campagna con sconto: confronto tra sconto dichiarato (62%) e reale (25%), rinnovo e condizioni."
    },
    {
      "title": "Promesse commerciali e prodotti complessi",
      "idea": "Una promessa commerciale è una frase scelta per vendere: dice poco di costi e rischi."
    },
    {
      "title": "Bonus, gratis, prova e cashback: il prezzo nascosto",
      "idea": "Un’offerta va giudicata dal costo totale nel tempo, non dal titolo."
    },
    {
      "title": "I tuoi diritti di consumatore e i tuoi dati",
      "idea": "Chi compra ha dei diritti per legge, anche se non li legge nessuno."
    },
    {
      "title": "L’offerta che si rinnova",
      "idea": "Scegliere promemoria e facilità di disdetta per mille persone in prova gratuita e leggerne gli effetti."
    }
  ],
  "5": [
    {
      "title": "Obiettivi di risparmio e piano mensile",
      "idea": "Un obiettivo di risparmio diventa reale quando ha tre numeri: quanto costa, entro quando, e quanto metti da parte ogni mese."
    },
    {
      "title": "Il fondo di emergenza",
      "idea": "Il fondo di emergenza è una somma tenuta da parte solo per gli imprevisti."
    },
    {
      "title": "Dove metti i risparmi: conto deposito e interesse composto",
      "idea": "Il denaro fermo può produrre interessi, ma il numero che leggi (tasso lordo) non è quello che ti entra in tasca: tasse e imposte lo riducono."
    },
    {
      "title": "Il fondo dell’azienda",
      "idea": "Dimensionare il fondo di emergenza dell’azienda (1, 3 o 12 mesi di spese) e gestire un imprevisto a fondo completo."
    },
    {
      "title": "L’assicurazione: trasferire il rischio",
      "idea": "Con un’assicurazione paghi una somma certa e piccola (il premio) per far pagare a qualcun altro un danno grande ma poco probabile."
    },
    {
      "title": "Le polizze che servono davvero a un giovane",
      "idea": "Non serve una polizza per ogni rischio: serve partire da quelli che farebbero davvero male (danni causati ad altri, infortuni gravi, obblighi di legge) e ignorare quelli che si pagano con il fondo di emergenza."
    },
    {
      "title": "Polizze-trappola e come leggere una polizza",
      "idea": "Una polizza è un contratto: conta quello che c’è scritto, non quello che dice chi la vende."
    },
    {
      "title": "La polizza dell’azienda",
      "idea": "Confrontare quattro rischi (probabilità, danno, premio, perdita media) e decidere quali assicurare."
    }
  ],
  "6": [
    {
      "title": "Lordo, netto e costo per chi paga",
      "idea": "Il compenso scritto nel contratto (lordo) non è quello che arriva sul conto (netto), e non è nemmeno quanto costa a chi paga."
    },
    {
      "title": "Contributi e IRPEF: dove vanno i soldi trattenuti",
      "idea": "Le trattenute sono di due tipi: i contributi, che finanziano pensione e altre tutele di chi lavora, e le imposte, che finanziano i servizi pubblici."
    },
    {
      "title": "Leggere una busta paga",
      "idea": "La busta paga è il documento che mostra come si arriva dal lordo al netto."
    },
    {
      "title": "La busta paga dell’azienda",
      "idea": "Leggere la ripartizione del costo di un collaboratore (lordo 1.800 €, costo totale 2.228,58 €) e prendere quattro decisioni."
    },
    {
      "title": "Tipi di lavoro: dipendente, autonomo, occasionale",
      "idea": "La stessa cifra può voler dire cose molto diverse a seconda del tipo di lavoro: cambiano chi versa i contributi, chi paga le imposte, quali tutele ci sono (ferie, malattia, infortunio) e quanto resta davvero."
    },
    {
      "title": "Dichiarazione dei redditi, detrazioni e famiglia",
      "idea": "Dopo l’anno di lavoro si fa i conti con il fisco: chi guadagna dichiara i propri redditi, e alcune spese o situazioni familiari riducono l’imposta."
    },
    {
      "title": "I diritti di chi lavora, lavoro nero e minori",
      "idea": "Chi lavora ha diritti anche se non li legge nessuno: un contratto, una retribuzione dovuta, regole sull’orario, la sicurezza e le tutele in caso di infortunio e malattia."
    },
    {
      "title": "Il piano del personale",
      "idea": "Scegliere il contratto adatto per quattro ruoli (tempo pieno, parziale, a termine) confrontando i costi mensili."
    }
  ],
  "7": [
    {
      "title": "Quanto costa studiare",
      "idea": "Il costo di un percorso di studi non è solo la tassa: ci sono i materiali, gli spostamenti e, se si studia lontano da casa, l’affitto e la vita quotidiana."
    },
    {
      "title": "L’ISEE: come si calcola e a cosa serve",
      "idea": "L’ISEE è un numero che misura la situazione economica di una famiglia, non solo il reddito: tiene conto anche del patrimonio e di quante persone compongono il nucleo."
    },
    {
      "title": "Tasse universitarie e fasce ISEE",
      "idea": "Molti atenei fanno pagare tasse diverse a seconda dell’ISEE: chi ha un ISEE basso paga meno o niente, chi ha un ISEE alto paga di più."
    },
    {
      "title": "La borsa di studio dell’azienda",
      "idea": "Progettare le borse di studio (fondo 12.000 €, soglia ISEE 15.000 €): criteri, numero e importo, candidata con ISE 34.000 €."
    },
    {
      "title": "Borse di studio e diritto allo studio",
      "idea": "Le borse di studio non sono regali: sono aiuti a chi rispetta requisiti economici (di solito legati all’ISEE) e di merito, e vanno chiesti entro scadenze precise."
    },
    {
      "title": "Prestiti e debito per studiare",
      "idea": "Un prestito dà oggi soldi che si restituiscono domani con gli interessi: il costo vero è la somma delle rate meno quanto si è ricevuto."
    },
    {
      "title": "Scegliere un percorso con i numeri (e le trappole)",
      "idea": "Un percorso di formazione si sceglie guardando costo totale, riconoscimento, contenuti e tempo di recupero dell’investimento, non la promessa."
    },
    {
      "title": "Il piano di formazione dell’azienda",
      "idea": "Scegliere un corso per quattro esigenze di formazione con budget di 6.000 € (ora con master e prestito)."
    }
  ],
  "8": [
    {
      "title": "Inflazione e potere d’acquisto",
      "idea": "Con l’inflazione i prezzi salgono nel tempo: la stessa somma compra meno cose."
    },
    {
      "title": "Come cresce un debito",
      "idea": "Un debito cresce con gli interessi, e gli interessi si calcolano anche sugli interessi non pagati."
    },
    {
      "title": "Comprare a rate",
      "idea": "Pagare a rate fa sembrare un acquisto più leggero, ma il costo totale è la somma di tutte le rate: la differenza rispetto al prezzo è il costo del credito."
    },
    {
      "title": "Il finanziamento dell’azienda",
      "idea": "Scegliere durata e rata del finanziamento di un macchinario da 20.000 € (TAN 6%) senza intaccare il fondo di emergenza."
    },
    {
      "title": "Affitto o acquisto: i costi della casa",
      "idea": "Comprare casa non è sempre più conveniente che affittare, e affittare non è «buttare i soldi»."
    },
    {
      "title": "Il mutuo: rata, tasso e ammortamento",
      "idea": "Un mutuo è un prestito a lungo termine per comprare casa, restituito con rate costanti."
    },
    {
      "title": "Un mutuo sostenibile",
      "idea": "Un mutuo è sostenibile se la rata resta pagabile anche quando le cose vanno peggio: tassi che salgono, reddito che cala, spese impreviste."
    },
    {
      "title": "Il mutuo della sede",
      "idea": "Scegliere durata e tasso (fisso o variabile) per un mutuo da 150.000 € restando sotto la rata massima di 900 €."
    }
  ],
  "9": [
    {
      "title": "Prestare denaro: cos’è un’obbligazione",
      "idea": "Un’obbligazione è un prestito con regole scritte: tu presti soldi a uno Stato o a un’azienda, loro ti pagano un interesse a date fisse e ti restituiscono il capitale alla scadenza."
    },
    {
      "title": "Cedola, scadenza e rendimento",
      "idea": "La cedola dice quanto paga l’obbligazione sul nominale, ma quello che guadagni dipende da quanto l’hai pagata: lo stesso titolo può rendere di più o di meno a seconda del prezzo di acquisto."
    },
    {
      "title": "Perché il prezzo si muove",
      "idea": "Quando i tassi salgono, il prezzo delle obbligazioni già emesse scende; quando i tassi scendono, sale."
    },
    {
      "title": "La liquidità dell’azienda",
      "idea": "Decidere come impiegare 30.000 € per 3 anni tra titoli a scadenze e cedole diverse."
    },
    {
      "title": "Il rischio di chi presta",
      "idea": "Chi presta rischia di non essere ripagato."
    },
    {
      "title": "Tasse, costi e inflazione",
      "idea": "La cedola scritta sul titolo è lorda."
    },
    {
      "title": "Una scala di scadenze",
      "idea": "Invece di mettere tutto su una sola scadenza, si possono distribuire i soldi su scadenze diverse: ogni anno una parte torna disponibile e il rischio di tasso si spalma nel tempo."
    },
    {
      "title": "Il BTP virtuale",
      "idea": "Costruire una scala di titoli di Stato fittizi per tre spese da 10.000 € tra 1, 2 e 3 anni."
    }
  ],
  "10": [
    {
      "title": "Cos’è un’azione",
      "idea": "Un’azione è una piccola quota di una società: chi la compra diventa socio e partecipa ai risultati, buoni o cattivi."
    },
    {
      "title": "Ricavi, costi e utile",
      "idea": "I ricavi dicono quanto incassa una società, l’utile quanto le resta dopo i costi."
    },
    {
      "title": "Utile per azione e prezzo/utili",
      "idea": "Per sapere se un’azione costa tanto o poco non basta il prezzo: serve confrontarlo con l’utile che ogni azione produce."
    },
    {
      "title": "Due società, cinque numeri",
      "idea": "Confrontare due società (Alfa e Beta) su cinque numeri: ricavi, utile, margine, P/E, dividendo."
    },
    {
      "title": "Il dividendo",
      "idea": "Il dividendo è la parte dell’utile che la società distribuisce ai soci."
    },
    {
      "title": "Il rischio delle azioni",
      "idea": "Le azioni possono perdere valore anche a lungo, e per recuperare un calo serve un rialzo più grande del calo."
    },
    {
      "title": "Tempo, costi e comportamento",
      "idea": "Nel lungo periodo contano tre cose: il tempo, i costi che paghi ogni anno e come ti comporti quando il prezzo scende."
    },
    {
      "title": "Il piano dei soci",
      "idea": "Valutare un piano da 10.000 € in azioni per 10 anni: effetto dei costi e di un calo del 30%."
    }
  ],
  "11": [
    {
      "title": "Cos’è un fondo: il paniere",
      "idea": "Un fondo è un paniere in comune: tante persone mettono soldi insieme e il fondo li investe in molti titoli."
    },
    {
      "title": "ETF e indici",
      "idea": "Un indice è una lista di società con i loro pesi; un ETF è un fondo che copia quella lista e si compra in borsa come un’azione."
    },
    {
      "title": "I costi di un fondo",
      "idea": "Un fondo ti costa ogni anno una percentuale del capitale, anche se il mercato scende."
    },
    {
      "title": "ETF o fondo gestito?",
      "idea": "Decidere come distribuire 10.000 € tra ETF (TER 0,20%) e fondo gestito (TER 1,50%) con un’ipotesi di rendimento del 5% (simulazione a cursore)."
    },
    {
      "title": "Diversificazione vera e sovrapposizioni",
      "idea": "Avere tanti fondi non vuol dire essere diversificati: conta che cosa contengono."
    },
    {
      "title": "Rischi e limiti degli ETF",
      "idea": "Un ETF ampio riduce il rischio di una singola società, ma non protegge da un calo del mercato, dalle oscillazioni del cambio o dai piccoli scostamenti dall’indice."
    },
    {
      "title": "Leggere la scheda informativa",
      "idea": "Prima di comprare un fondo o un ETF c’è un documento che dice cos’è, quanto costa, quanto è rischioso e per quanto tempo conviene tenerlo."
    },
    {
      "title": "Paniere ampio o settore?",
      "idea": "Scegliere quanto mettere in un ETF di settore e simulare un calo del settore del 30% (simulazione a cursore)."
    }
  ],
  "12": [
    {
      "title": "Le valute e il cambio",
      "idea": "Ogni Paese ha una sua valuta e il cambio dice quante unità di una valuta servono per averne una di un’altra."
    },
    {
      "title": "Quanto costa cambiare",
      "idea": "Cambiare valuta costa: chi cambia non usa il cambio di riferimento ma uno peggiore, e a volte aggiunge una commissione."
    },
    {
      "title": "Le materie prime",
      "idea": "Le materie prime sono beni di base come petrolio, oro o caffè."
    },
    {
      "title": "Il fornitore in dollari",
      "idea": "Gestire un pagamento di 55.000 $ tra 3 mesi con cambio che oscilla da 1,00 a 1,20."
    },
    {
      "title": "Le cripto-attività: cosa sono",
      "idea": "Una cripto-attività è un oggetto digitale registrato su un registro condiviso."
    },
    {
      "title": "Il rischio delle cripto e delle promesse",
      "idea": "I prezzi delle cripto-attività possono crollare, e i cali pesano più dei rialzi."
    },
    {
      "title": "Quanto vale in euro? Il metodo",
      "idea": "Prima di mettere soldi in qualsiasi cosa, valuti cinque punti in euro: cos’è, quanto costa, quanto vale oggi, quanto potresti perdere e se puoi permettertelo."
    },
    {
      "title": "Quanto vale in euro?",
      "idea": "Applicare il metodo dei cinque punti a una proposta cripto con limite di perdita del 5% del patrimonio."
    }
  ]
};
