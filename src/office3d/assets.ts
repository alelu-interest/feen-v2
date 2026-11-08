/**
 * Pictures used inside the 3D building. Objects and people are placeholders
 * (Fluent Emoji 3D by Microsoft, MIT, assets/office/LICENSE-fluentui-emoji.txt) until
 * someone draws the real ones (CLAUDE.md §9 quinquies); which object each lesson
 * brings is not decided yet (§10).
 */

import { Asset } from 'expo-asset';
import { Platform } from 'react-native';

/** The 8 objects of each floor, in the order of its stages. Only floor 1 so far. */
export const FLOOR_OBJECTS: Record<number, readonly number[]> = {
  1: [
    require('../../assets/office/coin.png'),
    require('../../assets/office/purse.png'),
    require('../../assets/office/receipt.png'),
    require('../../assets/office/framed-picture.png'),
    require('../../assets/office/balance-scale.png'),
    require('../../assets/office/money-bag.png'),
    require('../../assets/office/light-bulb.png'),
    require('../../assets/office/trophy.png'),
  ],
};

/** The sign with number and department on the back wall. Only floor 1 so far. */
export const FLOOR_LABEL: Record<number, { source: number; aspect: number }> = {
  1: { source: require('../../assets/office/label-floor-1.png'), aspect: 696 / 170 },
};

export const SLOT_EMPTY: number = require('../../assets/office/slot-empty.png');

export const PEOPLE = {
  you: require('../../assets/office/man-office-worker.png') as number,
  mentor: require('../../assets/office/woman-tipping-hand.png') as number,
};

/**
 * What the texture loader needs: on the phone the R3F polyfill loads an asset module
 * by itself, on the web it needs the file's URL.
 */
export function textureSource(source: number): string {
  return Platform.OS === 'web' ? Asset.fromModule(source).uri : (source as unknown as string);
}
