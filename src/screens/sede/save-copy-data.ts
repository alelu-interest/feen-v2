/**
 * The copy of the page's save, as data (cubotto 9.3, 10/11/2026): what is kept and how it is checked. The file itself
 * is in save-copy.ts; the page's side is prove/sede/js/copia.js, which also says when the copy is used.
 */

/** The two entries of the page's storage that are kept: the progress (js/salva.js) and the first start (js/avvio.js). */
export const KEYS = ['feen-progressi', 'feen-avvio'] as const;
export type SaveCopy = Partial<Record<(typeof KEYS)[number], string>>;

// far above a real save (a few KB with the signature): only so that nothing absurd is written or handed to the page
const MAX = 512 * 1024;

/** What came from the page or from the file, checked: only the two known entries, only text. Null when nothing is left. */
export function readCopy(x: unknown): SaveCopy | null {
  if (!x || typeof x !== 'object') return null;
  const out: SaveCopy = {};
  for (const k of KEYS) {
    const v = (x as Record<string, unknown>)[k];
    if (typeof v === 'string' && v.length <= MAX) out[k] = v;
  }
  return Object.keys(out).length ? out : null;
}

/** The line that hands the copy to the page, for the script that runs before it. */
export const copyScript = (copy: SaveCopy | null) => `window.FEEN_COPIA = ${copy ? JSON.stringify(copy) : 'null'};`;
