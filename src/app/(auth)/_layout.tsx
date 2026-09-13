import { Stack } from 'expo-router';

import { statusBarScreenOptions, useTheme } from '@/theme';

export const unstable_settings = {
  initialRouteName: 'splash',
};

export default function AuthLayout() {
  const { isDark } = useTheme();

  return (
    <Stack
      initialRouteName="splash"
      screenOptions={{
        headerShown: false,
        animation: 'fade',
        ...statusBarScreenOptions(isDark ? 'light' : 'dark'),
      }}
    />
  );
}
