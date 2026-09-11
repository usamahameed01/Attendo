import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from '@expo-google-fonts/inter';
import { DarkTheme, DefaultTheme, Stack, ThemeProvider as NavThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { useSettingsHydrated } from '@/stores/settings-store';
import { ThemeProvider, useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  const hydrated = useSettingsHydrated();
  const ready = (fontsLoaded || !!fontError) && hydrated;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <ThemeProvider>
      <NavigationStack />
    </ThemeProvider>
  );
}

function NavigationStack() {
  const { colors, isDark } = useTheme();
  const base = isDark ? DarkTheme : DefaultTheme;

  return (
    <NavThemeProvider
      value={{
        ...base,
        colors: {
          ...base.colors,
          background: colors.bg,
          card: colors.surface,
          text: colors.textPrimary,
          border: colors.border,
          primary: colors.accent,
        },
      }}>
      <Stack screenOptions={{ headerShown: false }} />
    </NavThemeProvider>
  );
}
