// FEEN · la sede — Tu (28/10/2026): your character, the contract you signed, the milestones as a diary, the
// settings (CLAUDE.md §7). Since 07/11/2026 the character is the one of the test of the first start (avvio.js).
import { ROOMS } from './office.js';
import { FLOORS } from './world.js';
import { inkOn, motion, buzz } from './kit.js';
import { TROPHIES, emblem } from './trophies.js';
import { PEOPLE } from './people.js';
import { miniMap, trapFloors, signSvg } from './avvio.js';
import { IN_APP } from './app.js';
import { reminders } from './avvisi.js';

const cap = (t) => t[0].toUpperCase() + t.slice(1);

// the four quadrants (CLAUDE.md §4): risk up, innovative on the left
const TYPES = [
  ['Elizabeth', 'Leopold', 'rischio alto · innovativo'],
  ['Cathie', 'Jordan', 'rischio alto · tradizionale'],
  ['Christine', 'Bill', 'rischio basso · innovativo'],
  ['Jane', 'Warren', 'rischio basso · tradizionale'],
];
// who joins the team, and when (CLAUDE.md §4)
const HIRED = { 2: 'il primo collega', 5: 'il secondo collega', 8: 'il terzo collega', 10: 'il quarto collega' };

export function makeMe(api) {
  const body = document.getElementById('me-body');
  // the settings live in main.js, saved with the progress (salva.js, 07/11/2026)
  const settings = api.settings;
  let wipeArmed = null;
  let privacyOpen = false;

  function character() {
    const who = api.who();
    if (who) return yours(who);
    // before the first start is over (never, in the prova): the two versions of each type side by side
    const cells = TYPES.map(
      ([a, b, what]) => `<div class="quad">
        <div class="quad-people" aria-hidden="true"><img src="${PEOPLE[a]}" alt="" /><img src="${PEOPLE[b]}" alt="" /></div>
        <b>${a} · ${b}</b><span>${what}</span>
      </div>`,
    ).join('');
    return `<section class="me-card">
      <h2>Il tuo personaggio</h2>
      <p class="me-note">Il tuo personaggio arriva con il test del primo avvio: il tipo, il pregio, la trappola e il punto sulla mappa.</p>
      <div class="map" aria-label="La mappa dei quattro tipi: in alto chi rischia di più, a sinistra chi innova">
        <span class="axis axis-y">più rischio →</span>
        <span class="axis axis-x">← innovativo · tradizionale →</span>
        <div class="quads">${cells}</div>
      </div>
    </section>`;
  }

  /** Your character, from the test of the first start (07/11/2026, CLAUDE.md §7): pregio, trappola, the point on
   *  the map, and the version you did not choose, who is your partner. */
  function yours(who) {
    const p = who.profile;
    return `<section class="me-card me-who">
      <div class="who-hero">
        <span class="who-bust"><img src="${PEOPLE[who.me]}" alt="" /></span>
        <div class="who-name">
          <span class="who-chip">${p.what}</span>
          <h2>${who.me}</h2>
          <p class="who-motto">${p.motto}</p>
        </div>
      </div>
      <p class="me-note">${p.portrait}</p>
      <div class="av-trait good"><b>Il tuo pregio</b>${p.pregio}</div>
      <div class="av-trait trap"><b>La tua trappola</b>${p.trappola}</div>
      <ul class="av-floors">${trapFloors(p)}</ul>
      ${miniMap(who)}
      <div class="who-partner">
        <span class="who-face"><img src="${PEOPLE[who.partner]}" alt="" /></span>
        <div><b>${who.partner}</b><span>${cap(who.partnerWord)}: stesso tipo, stessa trappola</span></div>
      </div>
    </section>`;
  }

  function contract() {
    const who = api.who();
    // signed with one touch (avvio.js, sign-alt): the name written, as on the contract, not a squiggle you never drew
    const typed = `<svg class="contract-name" viewBox="0 0 120 40"><text x="60" y="28" text-anchor="middle"${who?.me?.length > 6 ? ' textLength="112" lengthAdjust="spacingAndGlyphs"' : ''}>${who?.me ?? ''}</text></svg>`;
    const drawn = who?.sign?.length ? signSvg(who.sign, 'contract-sign') : who ? typed : '<svg viewBox="0 0 120 40"><path d="M6 28c10-16 18-18 20-8s8 10 14-2 12-12 14 0 10 8 18-4 14-8 18 2 10 6 22-2"/></svg>';
    const when = who?.signed ? `firmato il ${who.signed}` : 'firmato al primo avvio';
    const between = who ? `Tra ${who.me} e ${who.partner}, ${when}` : `F${when.slice(1)}`;
    return `<section class="me-card contract">
      <div class="contract-paper" aria-hidden="true">
        <i></i><i></i><i style="width:70%"></i><i></i><i style="width:55%"></i>
        ${drawn}
      </div>
      <div>
        <h2>Il contratto tra soci</h2>
        <p class="me-note">${between}: ti impegni solo a imparare. Nessun obiettivo, nessuna conseguenza se ti fermi.</p>
      </div>
    </section>`;
  }

  /** The Traguardi, in two groups (28/10/2026, the user: «raggrupperei i traguardi… tipo i traguardi di FIFA»): the
   *  trophies, with a name and a line of their own, and under them the diary of what happened. No counters. */
  function milestones() {
    const cards = TROPHIES.map((t) => {
      const on = api.trophies.has(t.id);
      const name = on || !t.secret ? t.name : 'Segreto';
      const text = on ? t.line : t.secret ? 'Si scopre giocando.' : t.how;
      const style = on && t.color ? ` style="--c:${t.color};--on-c:${inkOn(t.color)}"` : '';
      return `<li class="trophy${on ? ' on' : ''}"${style}><span class="trophy-emblem">${emblem(on || !t.secret ? t.id : 'segreto')}</span><b>${name}</b><span>${text}</span></li>`;
    }).join('');
    return `<section class="me-card"><h2>Traguardi</h2>
      <h3 class="me-sub-h">Sorprese</h3>
      <ul class="trophies">${cards}</ul>
      <h3 class="me-sub-h">Il diario</h3>
      ${diary()}
    </section>`;
  }

  /** The diary of what happened, in the order it happened. */
  function diary() {
    const rows = [['Hai firmato il contratto tra soci', 'Il primo giorno nell’azienda', null]];
    for (let n = 1; n <= api.state.floor; n++) {
      if (HIRED[n]) rows.push([`Hai assunto ${HIRED[n]}`, `Il colloquio del piano ${n}`, null]);
      if (api.earnedOn(n) === 8) rows.push([FLOORS[n - 1].ready, `Piano ${n} · ${FLOORS[n - 1].name}`, ROOMS[n].share ? n : null, FLOORS[n - 1].color]);
    }
    if (api.state.floor === FLOORS.length && api.earnedOn(FLOORS.length) === 8) rows.push(['Il grande lancio', 'Sul tetto, con tutto il team', 'lancio']);
    const items = rows
      .reverse()
      .map(([title, sub, share, color]) => {
        const dot = color ? `<i style="background:${color}"></i>` : '<i></i>';
        // in the app «Condividi» waits for the card (cubotto 9.14, after the MVP; the first is at floor 4)
        const btn = share && !IN_APP ? `<button class="share" data-share="${share}">Condividi</button>` : '';
        return `<li>${dot}<div><b>${title}</b><span>${sub}</span></div>${btn}</li>`;
      })
      .join('');
    return `<ol class="diary">${items}</ol>`;
  }

  function settingsCard() {
    // the whole row is the switch, at least 52 px high (09/11/2026, revisione UX, stanza 10: the switch alone was 30)
    const row = (key, label, on, note = '') =>
      `<li><button class="set-row" role="switch" aria-checked="${on}" data-set="${key}" aria-label="${label}"${note ? ` aria-describedby="set-${key}"` : ''}><span class="set-text"><b>${label}</b>${note ? `<span id="set-${key}">${note}</span>` : ''}</span><span class="switch" aria-hidden="true"><i></i></span></button></li>`;
    return `<section class="me-card">
      <h2>Impostazioni</h2>
      <ul class="settings">
        ${row('avvisi', 'Avvisi', settings.avvisi, `Uno al giorno al massimo, alle ${reminders.time}`)}
        ${row('suoni', 'Suoni', api.sound.on)}
        ${row('vibrazione', 'Vibrazione', settings.vibrazione)}
        ${row('movimento', 'Movimento ridotto', motion.calm, 'Meno animazioni e voli più brevi')}
        <li class="privacy-row"><button class="link" data-act="privacy" aria-expanded="${privacyOpen}" aria-controls="privacy">Informazioni e privacy<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>${privacy()}</li>
        <li><button class="link danger" data-act="wipe">Ricomincia da capo</button></li>
      </ul>
    </section>`;
  }

  /** What FEEN keeps and what it does not (cubotto 9.8, 09/11/2026; CLAUDE.md §1 and §8): open under its row. */
  function privacy() {
    return `<div class="privacy" id="privacy"${privacyOpen ? '' : ' hidden'}>
      <p><b>Niente account.</b> FEEN non ti chiede nome, email, età o password.</p>
      <p><b>Tutto resta qui.</b> Progressi, personaggio e firma stanno su questo telefono. Nessun dato esce: FEEN non ha un server e non raccoglie statistiche su chi gioca.</p>
      <p><b>Il backup.</b> La tua azienda vive su questo telefono, e nel suo backup se è acceso. Il backup va al tuo iCloud o al tuo account Google, mai a FEEN.</p>
      <p><b>Niente pubblicità né acquisti.</b> Nell’app non si compra niente e nessuno ti mostra annunci.</p>
      <p><b>Open source.</b> Il codice è libero (licenza MIT); lezioni, testi e disegni sono in CC BY-SA 4.0; i caratteri in SIL OFL 1.1. Si trova su GitHub: alelu-interest/feen-v2.</p>
      <p>«Ricomincia da capo», qui sotto, cancella tutto quello che FEEN ha salvato.</p>
    </div>`;
  }

  function render() {
    body.innerHTML = character() + contract() + milestones() + settingsCard();
    const top = FLOORS[api.state.floor - 1];
    document.getElementById('me-sub').innerHTML = `<span class="me-dot" style="background:${top.color};color:${inkOn(top.color)}">${top.n}</span> Piano ${top.n} · ${top.name}`;
  }

  body.addEventListener('click', (e) => {
    const t = e.target.closest('button');
    if (!t) return;
    api.sfx.tap();
    if (t.dataset.share) return api.toast('Qui nell’app parte la card «Condividi»: il palazzo com’è adesso, una frase sul traguardo, il personaggio e FEEN. Niente nome né dati.');
    if (t.dataset.set) {
      const key = t.dataset.set;
      if (key === 'suoni') api.toggleSound();
      // reduced motion starts from the phone's (settings.movimento null): the first touch turns over what you see
      else if (key === 'movimento') settings.movimento = !motion.calm;
      else settings[key] = !settings[key];
      // vibration and motion act at once (main.js applySettings → kit.js)
      api.applySettings();
      const on = key === 'suoni' ? api.sound.on : key === 'movimento' ? motion.calm : settings[key];
      t.setAttribute('aria-checked', String(on));
      api.persist();
      if (key === 'vibrazione' && on) buzz(15);
      if (key === 'avvisi') api.toast(on ? `Avvisi accesi: alle ${reminders.time}, mai se oggi hai già fatto una lezione.` : 'Avvisi spenti. Si riaccendono da qui.');
      return;
    }
    if (t.dataset.act === 'privacy') {
      privacyOpen = !privacyOpen;
      t.setAttribute('aria-expanded', String(privacyOpen));
      body.querySelector('#privacy').hidden = !privacyOpen;
      return;
    }
    if (t.dataset.act === 'wipe') {
      // a double confirmation: the first touch only arms the button
      if (!wipeArmed) {
        t.textContent = 'Cancella tutto: tocca di nuovo per confermare';
        wipeArmed = setTimeout(() => {
          wipeArmed = null;
          t.textContent = 'Ricomincia da capo';
        }, 4000);
        return;
      }
      clearTimeout(wipeArmed);
      wipeArmed = null;
      // as in the app: everything goes, back to the welcome, the test and the choice of the character
      api.wipe();
    }
  });

  return { render };
}
