/**
 * The icon of the app, as data (22/11/2026, the user: white until the test, then the face of the character you chose,
 * «tipo Duolingo»). The change itself is in app-icon.ts; the page's side is prove/sede/js/icona.js; the icons are in
 * assets/feen/icona/ and listed in app.json (plugin expo-alternate-app-icons), made by 3. STRUMENTI/icona/1-icone.py.
 */

/** The 8 characters of the test (CLAUDE.md §4): each has an icon with its face, named as in app.json. */
export const FACES = ['Elizabeth', 'Leopold', 'Cathie', 'Jordan', 'Christine', 'Bill', 'Jane', 'Warren'] as const;
export type Face = (typeof FACES)[number];

/**
 * What the page asked for, checked: a face, null for the white icon, undefined when the message is not about the icon
 * (or names an icon the app does not have).
 */
export function readIcon(msg: unknown): Face | null | undefined {
  if (!msg || typeof msg !== 'object' || !('icona' in msg)) return undefined;
  const v = (msg as { icona: unknown }).icona;
  if (v === null) return null;
  return FACES.includes(v as Face) ? (v as Face) : undefined;
}

/** The icon the phone says it has, as the page knows it: a face, or null for the white one (or anything unknown). */
export const asFace = (name: string | null | undefined): Face | null => (FACES.includes(name as Face) ? (name as Face) : null);

/** The lines that tell the page, before it loads, whether the phone can change its icon and which one it has. */
export const iconScript = (can: boolean, now: Face | null) =>
  `window.FEEN_ICON_OK = ${can}; window.FEEN_ICON = ${JSON.stringify(now)};`;

/** The line that tells the page which icon the phone has after a change (js/icona.js, window.feenIcona). */
export const iconAnswer = (now: Face | null) => `window.feenIcona && window.feenIcona(${JSON.stringify(now)}); true;`;
