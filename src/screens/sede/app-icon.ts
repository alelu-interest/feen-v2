/**
 * The icon of the app on the phone (22/11/2026): the page asks (prove/sede/js/icona.js), this changes it with
 * expo-alternate-app-icons. Checks and lines for the page are in app-icon-data.ts.
 *
 * iOS: the change is the system's own (UIApplication.setAlternateIconName); iOS says it in a box of its own, «Hai
 * cambiato l'icona di "FEEN"», and that box cannot be taken away. Apple wants every change to come from a touch of the
 * player and a way back to the first icon in the settings (App Store Review Guidelines 4.6): the choice of the character
 * and the switch in the Tu.
 * Android: there is no such call; the library turns on one of nine entries of the app (activity-alias), and on some
 * phones turning them over while FEEN is open closes it for a moment or makes the icon jump on the home screen. So
 * on Android the change waits until FEEN goes to the background.
 */

import { Platform } from 'react-native';

import { asFace, type Face } from './app-icon-data';

// The library asks for its native part as soon as it is loaded, and throws where that part is missing (Expo Go,
// which the iPhone still uses through the tunnel, CLAUDE.md §10): there FEEN opens all the same, with its icon as it is.
type Icons = typeof import('expo-alternate-app-icons');
let lib: Icons | null = null;
try {
  lib = require('expo-alternate-app-icons') as Icons;
} catch {
  lib = null;
}

/** True when the phone can change the icon. */
export const canChangeIcon = () => !!lib?.supportsAlternateIcons;

/** The icon the phone has now: a face, or null for the white one. */
export function iconNow(): Face | null {
  try {
    return asFace(lib?.getAppIconName());
  } catch {
    return null;
  }
}

// Android: the icon asked for, waiting for FEEN to go to the background (undefined: nothing waiting)
let waiting: Face | null | undefined;

/** Changes the icon (Android: from the background) and says the one the phone has, or will have. */
export async function changeIcon(name: Face | null): Promise<Face | null> {
  if (!lib || !canChangeIcon()) return iconNow();
  if (Platform.OS === 'android') {
    waiting = name === iconNow() ? undefined : name;
    return name;
  }
  try {
    return asFace(await lib.setAlternateAppIcon(name));
  } catch {
    return iconNow();
  }
}

/** FEEN went to the background: the icon waiting on Android goes on now. */
export function changeIconWaiting() {
  if (waiting === undefined || !lib) return;
  const name = waiting;
  waiting = undefined;
  lib.setAlternateAppIcon(name).catch(() => {});
}

/** The icon the page should see on Android while one is waiting: the one asked for, not the one still on. */
export const iconForPage = (): Face | null => (waiting === undefined ? iconNow() : waiting);
