/**
 * The sede prova inside the app (CLAUDE.md §10, 28/10/2026): the web page of prove/sede/,
 * built into one file by scripts/build-sede.mjs, full screen and offline, for TestFlight.
 * The built file knows it is the app (no Demo, js/app.js); this screen gives it the phone's vibration and the size
 * of the text chosen in the phone (09/11/2026), turns its reminders into the phone's notifications (reminders.ts), and
 * keeps a copy of its save in a file of the app, handed back when the page's own storage comes back empty
 * (save-copy.ts, 10/11/2026).
 */

import { Asset } from 'expo-asset';
import * as Haptics from 'expo-haptics';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import { AppState, BackHandler, StyleSheet, View, useWindowDimensions } from 'react-native';
import { WebView, type WebViewMessageEvent } from 'react-native-webview';

import { planReminders, readPlan } from './reminders';
import { loadCopy, saveCopy } from './save-copy';
import { copyScript, readCopy, type SaveCopy } from './save-copy-data';

const page = require('../../../assets/sede/sede.html');

// the page's own background (--page in style.css), the same as the splash in app.json: nothing flashes while it opens.
// The v1 is light only (the user, 10/11/2026): the dark one, #0D1529, waits with prove/sede/scuro.css
const BG = '#F4F8FD';

/** Runs before the page: the size of the text, the copy of the save, and the vibration iOS does not give to a web page. */
function bridge(fontScale: number, copy: SaveCopy | null) {
  return `
  window.FEEN_FONT_SCALE = ${JSON.stringify(fontScale)};
  ${copyScript(copy)}
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
    // the page had nothing left to go back from (js/main.js back): Android's back key closes FEEN, as anywhere else
    if (msg.exit === true) BackHandler.exitApp();
    // the page saved: its copy in the app's file follows (js/copia.js)
    const copy = readCopy(msg.copia);
    if (copy) saveCopy(copy);
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
  const bg = BG;
  // iOS Dynamic Type, Android font size: the page grows its text with it, up to its own maximum (js/app.js)
  const { fontScale } = useWindowDimensions();
  const [uri, setUri] = useState<string | null>(null);
  // WebView<object>: the library's default type argument (undefined) would leave no props at all once there is a ref
  const web = useRef<WebView<object>>(null);
  // the script before the page is read once: the size of the text when the app opened, and the copy of the save
  const [before] = useState(() => bridge(fontScale, loadCopy()));

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

  // Android's back key goes to the page first (CLAUDE.md §6): in a lesson it asks «Vuoi uscire?», then it closes a
  // card, leaves a room, goes back to the Percorso; only when the page has nothing left does FEEN close (onMessage)
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (!web.current) return false;
      web.current.injectJavaScript('window.feenBack ? window.feenBack() : window.ReactNativeWebView.postMessage(JSON.stringify({ exit: true })); true;');
      return true;
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
