import { Stack } from 'expo-router';

import { statusBarScreenOptions, useTheme } from '@/theme';

export default function EnrollLayout() {
  const { isDark } = useTheme();

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      {/* capture is always a dark camera screen regardless of app theme */}
      <Stack.Screen name="capture" options={statusBarScreenOptions('light')} />
      <Stack.Screen name="confirm" options={statusBarScreenOptions(isDark ? 'light' : 'dark')} />
    </Stack>
  );
}
