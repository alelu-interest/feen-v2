// FEEN · la sede — «Vuoi uscire?» (CLAUDE.md §6): what the X asks in a lesson, a Caso, a Prova sul campo. One for the
// three since the check with the screen reader's tree of 10/11/2026: with the keyboard, Tab walked out of the question
// onto the screen under it, and after «Resto» the focus was lost, so a screen reader started again from the top.

/** Opens the question in `box`, a child of `root`: what is under it goes out of reach of the finger, the keyboard and
 *  the screen reader, and the focus goes on the title. `id` names the title, `line` is what leaving costs. */
export function askLeave(root, box, id, line) {
  if (!box.hidden) return;
  const from = document.activeElement;
  const under = [...root.children].filter((c) => c !== box);
  box.innerHTML = `<div class="lz-ask-card" role="alertdialog" aria-modal="true" aria-labelledby="${id}">
      <h3 id="${id}" tabindex="-1">Vuoi uscire?</h3>
      <p>${line}</p>
      <div class="lz-sheet-acts"><button class="pill pill-light" data-act="stay">Resto</button><button class="pill pill-light" data-act="leave">Esco</button></div>
    </div>`;
  for (const c of under) c.inert = true;
  box.hidden = false;
  box.querySelector('h3').focus({ preventScroll: true });
  box.stay = () => {
    box.hidden = true;
    box.innerHTML = '';
    for (const c of under) c.inert = false;
    // back where it was; if that is gone (a dialogue went on meanwhile), on what waits for a touch now
    const to = [from, root.querySelector('.cs-foot button:not([disabled])'), root.querySelector('.lz-q, .lz-say'), root.querySelector('[data-act="x"]')].find(
      (el) => el && el.isConnected && root.contains(el) && !el.disabled,
    );
    to?.focus({ preventScroll: true });
  };
}

/** «Resto»: the question goes away and the focus goes back where it was. */
export const stay = (box) => box.stay?.();
