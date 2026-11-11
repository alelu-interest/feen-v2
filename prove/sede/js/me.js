// FEEN · la sede — Tu (28/10/2026): your character, the contract you signed, the milestones as a diary, the
// settings (CLAUDE.md §7). Since 07/11/2026 the character is the one of the test of the first start (avvio.js).
import { ROOMS } from './office.js';
import { FLOORS } from './world.js';
import { inkOn, motion, buzz } from './kit.js';
import { TROPHIES, emblem } from './trophies.js';
import { PEOPLE } from './people.js';
import { FIGURES } from './figures.js';
import { miniMap, signSvg } from './avvio.js';
import { IN_APP } from './app.js';
import { reminders } from './avvisi.js';

const cap = (t) => t[0].toUpperCase() + t.slice(1);
const ofFloor = (f) => f.the.replace(/^la /, 'della ').replace(/^il /, 'del '); // «della Tesoreria», «del piano dei Soci»

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
  let privacyOpen = false;
  let mapOpen = false;

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

  /** Your character, from the test of the first start (07/11/2026, CLAUDE.md §7). Since 10/11/2026 (Davide: «la pagina tu
   *  è troppo lunga… il personaggio diamogli aria in png non in quadrato»): the whole figure, free, beside its name and
   *  motto; the pregio and the trappola in a line each; the map opens from the type, under it; the partner in a line. */
  function yours(who) {
    const p = who.profile;
    // the two lessons can be on the same floor (Christine and Bill: both at Pianificazione): its name once
    const where = [...new Set(p.floors.map((f) => FLOORS[f.n - 1].name))].join(' e ');
    return `<section class="me-card me-who">
      <div class="who-hero">
        <span class="who-figure"><img src="${FIGURES[who.me]}" alt="" /></span>
        <div class="who-name">
          <h2>${who.me}</h2>
          <p class="who-motto">${p.motto}</p>
          <button class="who-chip" data-act="map" aria-expanded="${mapOpen}" aria-controls="who-map"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M12 4v16M4 12h16"/></svg><span>${p.what.split(' · ').map((w, i, a) => `<span class="nw">${w}${i < a.length - 1 ? ' ·' : ''}</span>`).join(' ')}</span></button>
        </div>
      </div>
      <div class="who-map" id="who-map"${mapOpen ? '' : ' hidden'}>${miniMap(who)}</div>
      <dl class="who-traits">
        <div class="good"><dt>Pregio</dt><dd>${p.pregio}</dd></div>
        <div class="trap"><dt>Trappola</dt><dd>${p.trappola} <span>Ne parliamo a ${where}.</span></dd></div>
      </dl>
      <div class="who-partner">
        <span class="who-face"><img src="${PEOPLE[who.partner]}" alt="" /></span>
        <div><b>${who.partner}</b><span>${cap(who.partnerWord)}</span></div>
      </div>
    </section>`;
  }

  function contract() {
    const who = api.who();
    // signed with one touch (avvio.js, sign-alt): «Firmato» written, as on the contract, not a squiggle you never drew
    const typed = '<svg class="contract-name" viewBox="0 0 120 40"><text x="60" y="28" text-anchor="middle">Firmato</text></svg>';
    const drawn = who?.sign?.length ? signSvg(who.sign, 'contract-sign') : who ? typed : '<svg viewBox="0 0 120 40"><path d="M6 28c10-16 18-18 20-8s8 10 14-2 12-12 14 0 10 8 18-4 14-8 18 2 10 6 22-2"/></svg>';
    // «l’11 novembre», «l’1 marzo», «l’8 aprile»: the article is elided before a day that starts with a vowel sound
    const when = who?.signed ? `${/^(1|8|11)\b/.test(who.signed) ? 'l’' : 'il '}${who.signed}` : 'al primo avvio';
    return `<section class="me-card contract">
      <div class="contract-paper" aria-hidden="true">
        <i></i><i></i><i style="width:70%"></i>
        ${drawn}
        ${who ? '<b class="contract-stamp">FEEN</b>' : ''}
      </div>
      <div>
        <h2>Contratto tra soci</h2>
        <p class="me-note">${who ? `Con ${who.partner}, firmato ${when}.` : `Firmato ${when}.`}</p>
      </div>
    </section>`;
  }

  /** The Traguardi, in two groups (28/10/2026, the user: «raggrupperei i traguardi… tipo i traguardi di FIFA»): the
   *  trophies, with a name and a line of their own, and under them the diary of what happened. No counters. */
  function milestones() {
    // a grid of emblems with their names (10/11/2026, Davide: the Tu too long): a touch tells what it is (toast)
    const cards = TROPHIES.map((t) => {
      const on = api.trophies.has(t.id);
      const name = on || !t.secret ? t.name : 'Segreto';
      const style = on && t.color ? ` style="--c:${t.color};--on-c:${inkOn(t.color)}"` : '';
      return `<li><button class="trophy${on ? ' on' : ''}" data-trophy="${t.id}"${style} aria-label="${name}${on ? ', preso' : ''}"><span class="trophy-emblem">${emblem(on || !t.secret ? t.id : 'segreto')}</span><b>${name.replace(/(\S+-\S+)/g, '<span class="nw">$1</span>')}</b></button></li>`;
    }).join('');
    return `<section class="me-card"><h2>Traguardi</h2>
      <ul class="trophies">${cards}</ul>
      ${diary()}
    </section>`;
  }

  /** The diary of what happened, in the order it happened. */
  function diary() {
    const rows = [['Hai firmato il contratto tra soci', 'Il primo giorno nell’azienda', null]];
    for (let n = 1; n <= api.state.floor; n++) {
      // the floors by name, «Livello 2» as its level: no «Piano 2» (Davide, 10/11/2026)
      if (HIRED[n]) rows.push([`Hai assunto ${HIRED[n]}`, `Il colloquio ${ofFloor(FLOORS[n - 1])}`, null]);
      if (api.earnedOn(n) === 8) rows.push([FLOORS[n - 1].ready, `Livello ${n}`, ROOMS[n].share ? n : null, FLOORS[n - 1].color]);
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
        <li class="time-row"${settings.avvisi ? '' : ' hidden'}><label class="set-time"><span>Ora del promemoria</span><input type="time" id="set-ora" value="${reminders.time}" step="900" /></label></li>
        ${row('suoni', 'Suoni', api.sound.on)}
        ${row('vibrazione', 'Vibrazione', settings.vibrazione)}
        ${row('movimento', 'Movimento ridotto', motion.calm, 'Meno animazioni e voli più brevi')}
        <li class="privacy-row"><button class="link" data-act="privacy" aria-expanded="${privacyOpen}" aria-controls="privacy">Informazioni e privacy<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>${privacy()}</li>
        <li class="wipe-row"><button class="link danger" data-act="wipe" aria-expanded="false" aria-controls="wipe-ask">Ricomincia da capo</button>
          <div class="wipe-ask" id="wipe-ask" role="group" aria-labelledby="wipe-q" hidden>
            <p id="wipe-q">Cancelli l’azienda, il personaggio, la firma e i traguardi, e riparti dal test. Non si torna indietro.</p>
            <button class="pill pill-light wide" data-act="wipe-no">Annulla</button>
            <button class="pill pill-danger wide" data-act="wipe-yes">Cancella tutto</button>
          </div></li>
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
    // the floor you are on by its name, no number on a square (10/11/2026, Davide)
    const top = FLOORS[api.state.floor - 1];
    document.getElementById('me-sub').innerHTML = `<span class="me-dot" style="background:${top.color}"></span>${top.name}`;
  }

  // the time of the reminders, chosen again from here (10/11/2026, Luca: after the first start it stayed at 18:00 for
  // good, while «l'orario lo sceglie il ragazzo», CLAUDE.md §5)
  body.addEventListener('change', (e) => {
    if (e.target.id !== 'set-ora' || !e.target.value) return;
    reminders.time = e.target.value;
    const note = body.querySelector('#set-avvisi');
    if (note) note.textContent = `Uno al giorno al massimo, alle ${reminders.time}`;
    api.persist();
    api.toast(`Promemoria alle ${reminders.time}.`);
  });

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
      if (key === 'avvisi') {
        body.querySelector('.time-row').hidden = !on;
        api.toast(on ? `Avvisi accesi: alle ${reminders.time}, mai se oggi hai già fatto una lezione.` : 'Avvisi spenti. Si riaccendono da qui.');
      }
      return;
    }
    if (t.dataset.trophy) {
      const tr = TROPHIES.find((x) => x.id === t.dataset.trophy);
      const on = api.trophies.has(tr.id);
      return api.toast(on ? tr.line : tr.secret ? 'Si scopre giocando.' : tr.how);
    }
    if (t.dataset.act === 'map') {
      mapOpen = !mapOpen;
      t.setAttribute('aria-expanded', String(mapOpen));
      body.querySelector('#who-map').hidden = !mapOpen;
      return;
    }
    if (t.dataset.act === 'privacy') {
      privacyOpen = !privacyOpen;
      t.setAttribute('aria-expanded', String(privacyOpen));
      body.querySelector('#privacy').hidden = !privacyOpen;
      return;
    }
    // «Ricomincia da capo» (10/11/2026, the ten testers): the second touch used to confirm in the same spot as the
    // first, so a double tap wiped the whole company, and the question went away by itself after 4 s with no way to
    // say no. Now the first touch opens a question under the row that waits for an answer: «Annulla» where the finger
    // already is, «Cancella tutto» under it, and the tap guard of app.js between them.
    const ask = body.querySelector('#wipe-ask');
    const wipeBtn = body.querySelector('[data-act="wipe"]');
    if (t.dataset.act === 'wipe' || t.dataset.act === 'wipe-no') {
      const open = t.dataset.act === 'wipe' && ask.hidden;
      ask.hidden = !open;
      wipeBtn.setAttribute('aria-expanded', String(open));
      if (open) ask.querySelector('[data-act="wipe-no"]').focus({ preventScroll: true });
      else wipeBtn.focus({ preventScroll: true });
      if (open) ask.scrollIntoView({ block: 'nearest', behavior: motion.calm ? 'auto' : 'smooth' });
      return;
    }
    // as in the app: everything goes, back to the welcome, the test and the choice of the character
    if (t.dataset.act === 'wipe-yes') api.wipe();
  });

  return { render };
}
