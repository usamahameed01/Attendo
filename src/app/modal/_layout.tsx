import { Stack } from 'expo-router';

import { statusBarScreenOptions, useTheme } from '@/theme';

export default function ModalLayout() {
  const { isDark } = useTheme();

  return (
    <Stack
      screenOptions={{ headerShown: false, ...statusBarScreenOptions(isDark ? 'light' : 'dark') }}>
      <Stack.Screen
        name="new-request"
        options={{ presentation: 'formSheet', animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="geofence" />
      <Stack.Screen name="offline" />
    </Stack>
  );
}
