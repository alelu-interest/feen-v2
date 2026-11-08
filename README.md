# FEEN

Il Duolingo dell'educazione finanziaria: un'app per iPhone e Android, in verticale, per ragazzi di 14–19 anni. Sei il fondatore di una media company: ogni lezione fa crescere la tua sede, un palazzo di 12 piani che sale verso un grande lancio. Nessun account, nessun dato che esce dal telefono, niente pubblicità, niente XP, streak, vite o classifiche.

*The Duolingo of financial literacy for teenagers: a no-account, no-tracking mobile app built with Expo, with a 3D headquarters in three.js.*

> Stato: prototipo, in sviluppo da ottobre 2026. Molti testi sono ancora provvisori.

## Com'è fatto

L'app è una pagina web in 3D (three.js) che l'app Expo apre a schermo intero in una WebView, senza internet: React Native fa solo le cose del telefono, come la vibrazione.

```
prove/sede/          la sede: il palazzo, il Percorso, il Tu, il primo avvio con il test, le lezioni, il Caso, il salvataggio
  js/world.js        la sede e la città
  js/office.js       le stanze dei 12 piani e i loro oggetti
  js/main.js         inquadratura, tocchi e flusso
  js/path.js         il Percorso
  js/avvio.js        il primo avvio e il test
  js/lezione.js      il motore delle lezioni
  js/caso.js         il Caso
  js/salva.js        il salvataggio sul telefono
scripts/build-sede.mjs  fa di prove/sede/ un file solo, assets/sede/sede.html, con i caratteri dentro
scripts/lezioni.mjs     trasforma le schede delle lezioni in prove/sede/js/lessons-data.js
src/screens/sede/    l'app: apre assets/sede/sede.html nella WebView
src/office3d/        un primo Ufficio in React Native, oggi non usato
```

## Avvio

```bash
npm install
node scripts/build-sede.mjs   # ricostruisce assets/sede/sede.html da prove/sede/
npx expo start                # l'app, da aprire con Expo Go
npm run typecheck && npm test
```

La sede si può guardare anche nel browser, servendo la cartella `prove/sede/` con un server qualsiasi. Le schede delle lezioni da cui nasce `lessons-data.js` non sono in questo repository: `npm run build:sede` e `npm run lezioni` le cercano accanto alla cartella dell'app.

## Licenza

Il codice è MIT (`LICENSE`). Testi, test, disegni dei personaggi e icona sono CC BY-SA 4.0 (`LICENSE-CONTENUTI.md`), dove trovi anche le licenze di three.js, Fluent Emoji e dei due caratteri.
