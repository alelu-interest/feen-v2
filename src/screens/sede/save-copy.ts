/**
 * The copy of the page's save in a file of the app (cubotto 9.3, 10/11/2026). The page keeps its progress in the web
 * view's storage, which the phone may clear and the backup may not carry; this file is in the app's documents, where
 * the phone's backup takes it (iCloud, Google). The page decides when the copy is used (prove/sede/js/copia.js): only
 * when its own storage comes back empty.
 */

import { File, Paths } from 'expo-file-system';

import { readCopy, type SaveCopy } from './save-copy-data';

const NAME = 'feen-salvataggio.json';

/** The copy kept in the file: null on a phone that never saved, or when the file cannot be read. */
export function loadCopy(): SaveCopy | null {
  try {
    const file = new File(Paths.document, NAME);
    return file.exists ? readCopy(JSON.parse(file.textSync())) : null;
  } catch {
    return null;
  }
}

/** Writes the copy beside the old one and then moves it over, so a write cut in half never leaves half a file. */
export function saveCopy(copy: SaveCopy) {
  const text = JSON.stringify(copy);
  try {
    const next = new File(Paths.document, `${NAME}.nuovo`);
    if (next.exists) next.delete();
    next.create();
    next.writeSync(text);
    next.moveSync(new File(Paths.document, NAME), { overwrite: true });
  } catch {
    // the move did not work on this phone: straight into the file
    try {
      const file = new File(Paths.document, NAME);
      if (!file.exists) file.create();
      file.writeSync(text);
    } catch {
      // the copy is a second safety: the page's own storage still holds the save
    }
  }
}
