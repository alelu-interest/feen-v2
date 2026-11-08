/**
 * What the building looks like for a given progress. The path is linear, so the
 * number of stages done says everything: nothing here is stored.
 *
 * - Only built floors exist: the finished ones and the one in progress.
 *   Future floors are never shown (§9 bis, §9 ter punto 10).
 * - When the last floor is finished, the roof of the launch is built (§9 ter punto 6).
 */

import { FLOORS, STAGES, STAGES_PER_FLOOR, TOTAL_STAGES, type Floor, type Stage } from '@/content/floors';

export type FloorStatus = 'complete' | 'current';

export type SlotView = Stage & { earned: boolean };

export type FloorView = Floor & {
  status: FloorStatus;
  slots: SlotView[];
  earnedCount: number;
};

export type BuildingView = {
  /** Bottom to top. */
  floors: FloorView[];
  roofBuilt: boolean;
};

export function deriveBuilding(stagesDone: number): BuildingView {
  const done = Math.max(0, Math.min(TOTAL_STAGES, Math.floor(stagesDone)));
  const roofBuilt = done === TOTAL_STAGES;
  // The floor in progress is the one holding the next stage; with everything done, the last one.
  const builtCount = roofBuilt ? FLOORS.length : Math.floor(done / STAGES_PER_FLOOR) + 1;

  const floors = FLOORS.slice(0, builtCount).map((floor, index) => {
    const earnedCount = Math.min(STAGES_PER_FLOOR, done - index * STAGES_PER_FLOOR);
    const slots = STAGES.map((stage, i) => ({ ...stage, earned: i < earnedCount }));
    const status: FloorStatus = earnedCount === STAGES_PER_FLOOR ? 'complete' : 'current';
    return { ...floor, status, slots, earnedCount };
  });

  return { floors, roofBuilt };
}
