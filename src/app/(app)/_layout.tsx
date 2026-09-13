import { Stack } from 'expo-router';

import { statusBarScreenOptions, useTheme } from '@/theme';

export default function AppLayout() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{ headerShown: false, ...statusBarScreenOptions(isDark ? 'light' : 'dark') }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="manager" options={{ animation: 'slide_from_right' }} />
    </Stack>
  );
}
