import { deriveBuilding } from './building';

describe('deriveBuilding', () => {
  it('starts with only the first floor, empty and in progress', () => {
    const { floors, roofBuilt } = deriveBuilding(0);
    expect(floors).toHaveLength(1);
    expect(floors[0].department).toBe('Direzione');
    expect(floors[0].status).toBe('current');
    expect(floors[0].earnedCount).toBe(0);
    expect(roofBuilt).toBe(false);
  });

  it('fills the slots of the floor in progress in order', () => {
    const { floors } = deriveBuilding(3);
    expect(floors[0].slots.map((s) => s.earned)).toEqual([
      true, true, true, false, false, false, false, false,
    ]);
  });

  it('opens the next floor as soon as a floor is finished', () => {
    const { floors } = deriveBuilding(8);
    expect(floors).toHaveLength(2);
    expect(floors[0].status).toBe('complete');
    expect(floors[1].department).toBe('Tesoreria');
    expect(floors[1].status).toBe('current');
    expect(floors[1].earnedCount).toBe(0);
  });

  it('never shows a future floor', () => {
    expect(deriveBuilding(30).floors).toHaveLength(4);
  });

  it('builds the roof only when all 96 stages are done', () => {
    expect(deriveBuilding(95).roofBuilt).toBe(false);
    const end = deriveBuilding(96);
    expect(end.roofBuilt).toBe(true);
    expect(end.floors).toHaveLength(12);
    expect(end.floors.every((f) => f.status === 'complete')).toBe(true);
  });

  it('clamps progress outside the range', () => {
    expect(deriveBuilding(-4).floors[0].earnedCount).toBe(0);
    expect(deriveBuilding(500).roofBuilt).toBe(true);
  });

  it('puts the Case fourth and the Field test last', () => {
    const kinds = deriveBuilding(0).floors[0].slots.map((s) => s.kind);
    expect(kinds[3]).toBe('case');
    expect(kinds[7]).toBe('field');
  });
});
