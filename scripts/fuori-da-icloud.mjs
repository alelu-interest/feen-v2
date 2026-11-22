/**
 * Keeps the generated folders out of iCloud (17/11/2026). The Desktop of this Mac is synced with iCloud, and while
 * npm, CocoaPods or Xcode rewrite thousands of files iCloud makes conflict copies next to them («FEEN 2.xcodeproj»,
 * «react-native 2»…): CocoaPods then finds two projects and stops. iCloud skips any name ending in «.nosync», so the
 * real folder becomes ios.nosync and ios stays as a link to it, where Expo, CocoaPods and Xcode look for it.
 * node_modules stays a real folder: as a link, npm, TypeScript and jest read the packages as the project's own code. Safe to run any number of times: `node scripts/fuori-da-icloud.mjs`.
 *
 * After `expo prebuild` (which deletes ios and makes it again as a real folder) this moves the new one in place of the
 * old ios.nosync.
 */
import { existsSync, lstatSync, readlinkSync, renameSync, rmSync, symlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

for (const name of ['ios']) {
  const link = join(root, name);
  const real = join(root, `${name}.nosync`);
  const target = `${name}.nosync`;
  const st = existsSync(link) || isLink(link) ? lstatSync(link) : null;

  if (st?.isSymbolicLink()) {
    if (readlinkSync(link) === target) {
      console.log(`${name}: già fuori da iCloud`);
      continue;
    }
    rmSync(link);
  } else if (st?.isDirectory()) {
    // a fresh folder (prebuild): it replaces the old copy
    if (existsSync(real)) rmSync(real, { recursive: true, force: true });
    renameSync(link, real);
  }
  if (!existsSync(real)) {
    console.log(`${name}: non c'è ancora, niente da fare`);
    continue;
  }
  symlinkSync(target, link, 'dir');
  console.log(`${name}: ora è ${target}, fuori da iCloud`);
}

function isLink(p) {
  try {
    return lstatSync(p).isSymbolicLink();
  } catch {
    return false;
  }
}
