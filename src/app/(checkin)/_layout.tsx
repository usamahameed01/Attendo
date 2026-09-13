import { Stack } from 'expo-router';

import { statusBarScreenOptions, useTheme } from '@/theme';

export default function CheckinLayout() {
  const { isDark } = useTheme();
  const adaptive = statusBarScreenOptions(isDark ? 'light' : 'dark');
  // face-scan, verifying and result always render on a black camera/outcome
  // background regardless of app theme, so their status bar icons stay light.
  const forcedDark = statusBarScreenOptions('light');

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="face-scan" options={forcedDark} />
      <Stack.Screen name="verifying" options={forcedDark} />
      <Stack.Screen name="result" options={forcedDark} />
      <Stack.Screen name="manual-pin" options={adaptive} />
      <Stack.Screen
        name="confirm"
        options={{ ...adaptive, presentation: 'formSheet', animation: 'slide_from_bottom' }}
      />
    </Stack>
  );
}
