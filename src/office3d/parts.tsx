/**
 * The building blocks of the toy look (CLAUDE.md §10: «3D giocattolo, morbido e
 * luminoso»): rounded boxes that cast soft shadows, and flat pictures that always
 * face the camera.
 */

import { useLoader } from '@react-three/fiber';
import { useMemo } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

import { textureSource } from './assets';

type Vec3 = [number, number, number];

type RBoxProps = {
  size: Vec3;
  position: Vec3;
  color: string;
  radius?: number;
  emissive?: string;
  emissiveIntensity?: number;
};

export function RBox({ size, position, color, radius = 0.07, emissive, emissiveIntensity = 0 }: RBoxProps) {
  const [w, h, d] = size;
  const geometry = useMemo(
    () => new RoundedBoxGeometry(w, h, d, 4, Math.min(radius, w / 2, h / 2, d / 2)),
    [w, h, d, radius],
  );
  return (
    <mesh geometry={geometry} position={position} castShadow receiveShadow>
      <meshStandardMaterial
        color={color}
        roughness={0.85}
        emissive={emissive ?? '#000000'}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  );
}

function useColorTexture(source: number): THREE.Texture {
  const texture = useLoader(THREE.TextureLoader, textureSource(source));
  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);
  return texture;
}

/** A picture standing in the room and always facing the camera: objects, people. */
export function Picture({ source, position, size }: { source: number; position: Vec3; size: number }) {
  const map = useColorTexture(source);
  return (
    <sprite position={position} scale={[size, size, 1]}>
      <spriteMaterial map={map} alphaTest={0.2} />
    </sprite>
  );
}

/** A picture flat on a wall, like the sign with the department's name. */
export function WallSign({ source, position, width, aspect }: { source: number; position: Vec3; width: number; aspect: number }) {
  const map = useColorTexture(source);
  return (
    <mesh position={position}>
      <planeGeometry args={[width, width / aspect]} />
      <meshBasicMaterial map={map} transparent toneMapped={false} />
    </mesh>
  );
}
