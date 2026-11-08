/**
 * The Office: the company's building in 3D (CLAUDE.md §10, decided 24/10/2026).
 * Step 1: only the first floor, still.
 */

import { Suspense, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { deriveBuilding } from '@/domain/building';
import { Canvas } from '@/office3d/canvas';
import { OfficeScene } from '@/office3d/office-scene';

// Until the save exists: the first floor halfway, 5 objects out of 8.
const DEMO_STAGES_DONE = 5;

export function OfficeScreen() {
  const floors = useMemo(() => deriveBuilding(DEMO_STAGES_DONE).floors.slice(0, 1), []);
  return (
    <View style={styles.screen}>
      <Canvas shadows camera={{ fov: 26, near: 0.1, far: 300 }}>
        <Suspense fallback={null}>
          <OfficeScene floors={floors} />
        </Suspense>
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#8FCBF0',
  },
});
