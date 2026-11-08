/**
 * One floor of the building, open at the front like a dollhouse. Local coordinates:
 * y = 0 is the bottom of the floor slab. The layout follows the browser prova of
 * 24/10/2026: shelf with 3 objects, the Case on the wall, 2 objects on the desk,
 * 1 on the window sill, the Field test in the middle of the floor.
 */

import { DoubleSide } from 'three';

import { FLOOR_LABEL, FLOOR_OBJECTS, PEOPLE, SLOT_EMPTY } from './assets';
import { Picture, RBox, WallSign } from './parts';
import type { FloorView } from '@/domain/building';

export const FLOOR = { width: 4.8, depth: 2.8, height: 2.7, slab: 0.26 };

/** Each floor takes its pastel when it is complete (§7); until then the room is a warm neutral. */
const PASTEL: readonly { wall: string; side: string }[] = [
  { wall: '#FFD6BE', side: '#F2B89A' },
  { wall: '#CDE3F8', side: '#A9C9EC' },
  { wall: '#E2D8F6', side: '#C6B8EA' },
  { wall: '#FFD3E2', side: '#F0B0C7' },
  { wall: '#CFEAD8', side: '#A9D6B8' },
  { wall: '#FBE7A6', side: '#EDD27A' },
  { wall: '#CDECEF', side: '#A6D7DC' },
  { wall: '#F1DDC2', side: '#DDC09C' },
  { wall: '#D6DCF7', side: '#B4BDEB' },
  { wall: '#E3F0C0', side: '#C6DD93' },
  { wall: '#F6CFC6', side: '#E7AA9E' },
  { wall: '#C9E7DD', side: '#A2D2C2' },
];
const NEUTRAL = { wall: '#EFE8DE', side: '#DCD2C4' };

/** Where the 8 objects stand: x, y above the slab, z, size. */
const SLOTS: readonly [number, number, number, number][] = [
  [-1.9, 1.46, -0.98, 0.46],
  [-1.35, 1.46, -0.98, 0.46],
  [-0.8, 1.46, -0.98, 0.46],
  [1.6, 1.49, -1.15, 0.62],
  [0.75, 0.81, -0.2, 0.42],
  [1.85, 0.81, -0.2, 0.42],
  [0.55, 0.9, -0.95, 0.36],
  [-0.4, 0.32, 0.45, 0.85],
];

export function FloorRoom({ floor, y }: { floor: FloorView; y: number }) {
  const { width: W, depth: D, height: H, slab: S } = FLOOR;
  const colors = floor.status === 'complete' ? PASTEL[floor.number - 1] : NEUTRAL;
  const wallH = H - S;
  const objects = FLOOR_OBJECTS[floor.number] ?? [];
  const label = FLOOR_LABEL[floor.number];

  return (
    <group position={[0, y, 0]}>
      <RBox size={[W + 0.3, S, D + 0.2]} position={[0, S / 2, 0]} color="#F5ECDF" radius={0.08} />
      <RBox size={[W, wallH, 0.2]} position={[0, S + wallH / 2, -D / 2 + 0.1]} color={colors.wall} radius={0.05} />
      <RBox size={[0.24, wallH, D]} position={[-W / 2 + 0.12, S + wallH / 2, 0]} color={colors.side} radius={0.06} />
      <RBox size={[0.24, wallH, D]} position={[W / 2 - 0.12, S + wallH / 2, 0]} color={colors.side} radius={0.06} />
      <RBox size={[W - 0.5, 0.05, D - 0.2]} position={[0, S + 0.02, 0.05]} color="#D9A16F" radius={0.02} />

      {/* window and sill */}
      <RBox size={[1.2, 1.05, 0.1]} position={[0.25, S + 1.5, -D / 2 + 0.22]} color="#FFFFFF" radius={0.06} />
      <RBox size={[1.0, 0.85, 0.06]} position={[0.25, S + 1.5, -D / 2 + 0.26]} color="#9CD3F4" radius={0.03} emissive="#7FBFEA" emissiveIntensity={0.35} />
      <RBox size={[1.35, 0.08, 0.28]} position={[0.25, S + 0.95, -D / 2 + 0.3]} color="#FFFFFF" radius={0.03} />

      {/* shelf and desk */}
      <RBox size={[1.75, 0.09, 0.42]} position={[-1.35, S + 1.42, -D / 2 + 0.36]} color="#C38B5A" radius={0.03} />
      <RBox size={[1.6, 0.11, 0.8]} position={[1.3, S + 0.8, -0.35]} color="#D7A06B" radius={0.04} />
      <RBox size={[1.45, 0.66, 0.66]} position={[1.3, S + 0.38, -0.4]} color="#BE8552" radius={0.04} />

      {/* hanging lamp */}
      <RBox size={[0.03, 0.4, 0.03]} position={[-0.45, S + wallH - 0.2, -0.3]} color="#3A3530" radius={0.01} />
      <mesh position={[-0.45, S + wallH - 0.46, -0.3]}>
        <coneGeometry args={[0.26, 0.22, 24, 1, true]} />
        <meshStandardMaterial color="#3A3530" roughness={0.85} side={DoubleSide} />
      </mesh>
      <mesh position={[-0.45, S + wallH - 0.58, -0.3]}>
        <sphereGeometry args={[0.08, 16, 12]} />
        <meshStandardMaterial color="#FFE9A8" emissive="#FFD873" emissiveIntensity={1.5} />
      </mesh>
      <pointLight position={[-0.45, S + wallH - 0.75, -0.2]} color="#FFD9A0" intensity={2} distance={4} decay={1.6} />

      {label && <WallSign source={label.source} aspect={label.aspect} width={1.4} position={[-1.45, S + 2.02, -D / 2 + 0.23]} />}

      {floor.slots.map((slot, i) => {
        const [x, sy, z, size] = SLOTS[i];
        const source = slot.earned ? objects[i] : undefined;
        return source !== undefined ? (
          <Picture key={i} source={source} position={[x, S + sy, z]} size={size} />
        ) : (
          <Picture key={i} source={SLOT_EMPTY} position={[x, S + sy, z]} size={size * 0.9} />
        );
      })}

      {/* you at your desk and the mentor in front of it, on the first floor (§9 ter punto 2) */}
      {floor.number === 1 && (
        <>
          <Picture source={PEOPLE.you} position={[1.3, S + 1.2, -0.75]} size={1.0} />
          <Picture source={PEOPLE.mentor} position={[-1.6, S + 0.78, -0.15]} size={1.05} />
        </>
      )}
    </group>
  );
}
