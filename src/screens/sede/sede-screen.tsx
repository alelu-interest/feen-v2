/**
 * The sede prova inside the app (CLAUDE.md §10, 28/10/2026): the web page of prove/sede/,
 * built into one file by scripts/build-sede.mjs, full screen and offline, for TestFlight.
 */

import { Asset } from 'expo-asset';
import * as Haptics from 'expo-haptics';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { StyleSheet, View, useColorScheme } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

const page = require('../../../assets/sede/sede.html');

// the page's own background (style.css), so nothing flashes white while it opens
const BG = { light: '#F4EFE7', dark: '#121110' };

// iOS has no navigator.vibrate: the page asks, the phone vibrates
const bridge = `
  navigator.vibrate = (ms) => {
    const total = [].concat(ms).reduce((a, b) => a + b, 0);
    window.ReactNativeWebView.postMessage(JSON.stringify({ buzz: total }));
    return true;
  };
  true;
`;

function buzz(ms: number) {
  if (ms < 15) Haptics.selectionAsync();
  else if (ms < 35) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

function onMessage(e: WebViewMessageEvent) {
  try {
    const msg = JSON.parse(e.nativeEvent.data);
    if (typeof msg.buzz === 'number') buzz(msg.buzz);
  } catch {}
}

export function SedeScreen() {
  const bg = useColorScheme() === 'dark' ? BG.dark : BG.light;
  const [uri, setUri] = useState<string | null>(null);

  useEffect(() => {
    Asset.fromModule(page)
      .downloadAsync()
      .then((a) => setUri(a.localUri ?? a.uri));
    // if the page never says it has loaded, the splash still goes away
    const fallback = setTimeout(() => SplashScreen.hideAsync(), 6000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <View style={[styles.screen, { backgroundColor: bg }]}>
      {uri && (
        <WebView
          source={{ uri }}
          originWhitelist={['*']}
          allowFileAccess
          allowingReadAccessToURL={uri}
          injectedJavaScriptBeforeContentLoaded={bridge}
          onMessage={onMessage}
          onLoadEnd={() => SplashScreen.hideAsync()}
          style={{ backgroundColor: bg }}
          // the page moves, zooms and scrolls by itself: the web view stays still
          scrollEnabled={false}
          bounces={false}
          overScrollMode="never"
          contentInsetAdjustmentBehavior="never"
          automaticallyAdjustContentInsets={false}
          allowsLinkPreview={false}
          textInteractionEnabled={false}
          setSupportMultipleWindows={false}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
