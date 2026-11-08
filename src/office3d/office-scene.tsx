/**
 * The 3D scene of the Office: sky, ground, light and the floors. Step 1 (24/10/2026):
 * only the first floor, still; the other floors, scrolling and touch come next.
 */

import { useThree } from '@react-three/fiber';
import { useLayoutEffect, useMemo } from 'react';
import * as THREE from 'three';

import { FLOOR, FloorRoom } from './floor-room';
import { RBox } from './parts';
import type { FloorView } from '@/domain/building';

const BASE = 0.12;
const SKY_TOP = '#8FCBF0';
const SKY_BOTTOM = '#FBE3C8';

/** Frames the floor so it fills the width on a phone and the height on a wide screen. */
function CameraRig({ centerY }: { centerY: number }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  useLayoutEffect(() => {
    const aspect = size.width / size.height;
    const tanV = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const d = Math.max(3.2 / tanV, 3.3 / (tanV * aspect));
    camera.position.set(d * 0.13, centerY + d * 0.05, d);
    camera.lookAt(0.25, centerY, 0);
    camera.updateProjectionMatrix();
  }, [camera, size, centerY]);
  return null;
}

/** A wide plane far behind everything, from sky blue at the top to warm at the horizon. */
function Sky() {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(320, 60, 1, 16);
    const top = new THREE.Color(SKY_TOP);
    const bottom = new THREE.Color(SKY_BOTTOM);
    const pos = g.attributes.position;
    const colors: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const t = (pos.getY(i) + 30) / 60;
      const c = bottom.clone().lerp(top, Math.pow(t, 0.8));
      colors.push(c.r, c.g, c.b);
    }
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return g;
  }, []);
  return (
    <mesh geometry={geometry} position={[0, 6, -60]}>
      <meshBasicMaterial vertexColors toneMapped={false} />
    </mesh>
  );
}

const TREES: readonly [number, number][] = [[-4.2, 1.4], [4.4, -0.4], [-5.4, -2.6], [5.6, -3.2]];

export function OfficeScene({ floors }: { floors: FloorView[] }) {
  const top = BASE + floors.length * FLOOR.height;
  return (
    <>
      <color attach="background" args={[SKY_TOP]} />
      <CameraRig centerY={BASE + FLOOR.height * 0.55} />
      <Sky />

      <hemisphereLight args={['#FFF6EA', '#CFB79C', 1.35]} />
      <directionalLight
        position={[-7, 12, 10]}
        color="#FFE0BD"
        intensity={2.6}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={10}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0006}
      />

      {/* ground: grass, the pavement around the building, a few trees */}
      <RBox size={[160, 0.4, 100]} position={[0, -0.2, 0]} color="#A6D884" radius={0.1} />
      <RBox size={[FLOOR.width + 2.2, 0.12, FLOOR.depth + 2.4]} position={[0, 0.06, 0.4]} color="#ECE4D6" radius={0.05} />
      {TREES.map(([x, z]) => (
        <group key={`${x},${z}`} position={[x, 0, z]}>
          <RBox size={[0.22, 0.9, 0.22]} position={[0, 0.55, 0]} color="#9C6B43" radius={0.05} />
          <mesh position={[0, 1.55, 0]} castShadow>
            <icosahedronGeometry args={[0.85, 1]} />
            <meshStandardMaterial color="#6DBB5A" roughness={0.85} flatShading />
          </mesh>
        </group>
      ))}

      {floors.map((floor, i) => (
        <FloorRoom key={floor.number} floor={floor} y={BASE + i * FLOOR.height} />
      ))}

      {/* the roof over the last floor; the building site with the crane comes in step 2 */}
      <RBox size={[FLOOR.width + 0.3, FLOOR.slab, FLOOR.depth + 0.2]} position={[0, top + FLOOR.slab / 2, 0]} color="#F5ECDF" radius={0.08} />
    </>
  );
}
