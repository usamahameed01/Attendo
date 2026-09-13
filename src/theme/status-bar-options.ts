import type { NativeStackNavigationOptions } from 'expo-router';

/**
 * Android's native-stack Screen defaults to an opaque status bar (historically
 * black) unless told to be translucent with a transparent color — the app theme's
 * own transparent statusBarColor (set by Expo's SystemBars config plugin) does not
 * apply once react-native-screens starts managing the bar per screen. iOS ignores
 * color/translucent and only reads `statusBarStyle`.
 */
export function statusBarScreenOptions(style: 'light' | 'dark'): NativeStackNavigationOptions {
  return {
    statusBarStyle: style,
    statusBarTranslucent: true,
    statusBarBackgroundColor: 'transparent',
  };
}
