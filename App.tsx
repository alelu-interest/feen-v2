import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { SedeScreen } from '@/screens/sede/sede-screen';

// the splash stays until the sede has loaded
SplashScreen.preventAutoHideAsync();

// For TestFlight the app opens the sede prova (28/10/2026); the 3D Office of step 1
// is still in src/screens/office/, not shown.
export default function App() {
  return (
    <SafeAreaProvider>
      <SedeScreen />
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
