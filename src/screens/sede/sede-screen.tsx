/**
 * The sede prova inside the app (CLAUDE.md §10, 28/10/2026): the web page of prove/sede/,
 * built into one file by scripts/build-sede.mjs, full screen and offline, for TestFlight.
 * The built file knows it is the app (no Demo, js/app.js); this screen gives it the phone's vibration and the size
 * of the text chosen in the phone (09/11/2026), and turns its reminders into the phone's notifications (reminders.ts).
 */

import { Asset } from 'expo-asset';
import * as Haptics from 'expo-haptics';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { AppState, StyleSheet, View, useColorScheme, useWindowDimensions } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { planReminders, readPlan } from './reminders';

const page = require('../../../assets/sede/sede.html');

// the page's own background (--page in style.css), the same as the splash in app.json: nothing flashes while it opens
const BG = { light: '#F4F8FD', dark: '#0D1529' };

/** Runs before the page: the size of the text, and the vibration iOS does not give to a web page. */
function bridge(fontScale: number) {
  return `
  window.FEEN_FONT_SCALE = ${JSON.stringify(fontScale)};
  navigator.vibrate = (ms) => {
    const total = [].concat(ms).reduce((a, b) => a + b, 0);
    window.ReactNativeWebView.postMessage(JSON.stringify({ buzz: total }));
    return true;
  };
  true;
`;
}

function buzz(ms: number) {
  if (ms < 15) Haptics.selectionAsync();
  else if (ms < 35) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
}

function onMessage(e: WebViewMessageEvent, page: WebView<object> | null) {
  try {
    const msg = JSON.parse(e.nativeEvent.data);
    if (typeof msg.buzz === 'number') buzz(msg.buzz);
    const plan = readPlan(msg.avvisi);
    if (plan) {
      // the phone's answer to a permission request goes back to the page (js/avvisi.js)
      planReminders(plan).then((answer) => {
        if (answer) page?.injectJavaScript(`window.feenAvvisiRisposta && window.feenAvvisiRisposta(${JSON.stringify(answer)}); true;`);
      });
    }
  } catch {}
}

export function SedeScreen() {
  const bg = useColorScheme() === 'dark' ? BG.dark : BG.light;
  // iOS Dynamic Type, Android font size: the page grows its text with it, up to its own maximum (js/app.js)
  const { fontScale } = useWindowDimensions();
  const [uri, setUri] = useState<string | null>(null);
  // WebView<object>: the library's default type argument (undefined) would leave no props at all once there is a ref
  const web = useRef<WebView<object>>(null);
  // the script before the page is read once: the size of the text when the app opened
  const [before] = useState(() => bridge(fontScale));

  useEffect(() => {
    Asset.fromModule(page)
      .downloadAsync()
      .then((a) => setUri(a.localUri ?? a.uri));
    // if the page never says it has loaded, the splash still goes away
    const fallback = setTimeout(() => SplashScreen.hideAsync(), 6000);
    return () => clearTimeout(fallback);
  }, []);

  // FEEN back to the front: the reminders are planned again (a day may have passed, the permission may have changed)
  useEffect(() => {
    const sub = AppState.addEventListener('change', (st) => {
      if (st === 'active') web.current?.injectJavaScript('window.feenAvvisiSync && window.feenAvvisiSync(); true;');
    });
    return () => sub.remove();
  }, []);

  // the size changed in the phone's settings while FEEN was open: the page follows at once
  useEffect(() => {
    web.current?.injectJavaScript(`window.feenFontScale && window.feenFontScale(${JSON.stringify(fontScale)}); true;`);
  }, [fontScale]);

  return (
    <View style={[styles.screen, { backgroundColor: bg }]}>
      {uri && (
        <WebView
          ref={web}
          source={{ uri }}
          originWhitelist={['*']}
          allowFileAccess
          allowingReadAccessToURL={uri}
          injectedJavaScriptBeforeContentLoaded={before}
          onMessage={(e) => onMessage(e, web.current)}
          onLoadEnd={() => SplashScreen.hideAsync()}
          style={{ backgroundColor: bg }}
          // Android would scale the text by itself on top of the page's own scale: the page does it, once
          textZoom={100}
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
