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
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useAuthStore } from '@/stores/auth-store';
import { useStoresHydrated } from '@/stores/use-stores-hydrated';
import { statusBarScreenOptions, ThemeProvider, useTheme } from '@/theme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });
  const storesHydrated = useStoresHydrated();
  const ready = (fontsLoaded || !!fontError) && storesHydrated;

  useEffect(() => {
    if (ready) SplashScreen.hideAsync();
  }, [ready]);

  if (!ready) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationStack />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function NavigationStack() {
  const { colors, isDark } = useTheme();
  const onboarded = useAuthStore((s) => s.onboarded);
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
      <Stack
        screenOptions={{ headerShown: false, ...statusBarScreenOptions(isDark ? 'light' : 'dark') }}>
        <Stack.Protected guard={!onboarded}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
        <Stack.Protected guard={onboarded}>
          <Stack.Screen name="(app)" />
          <Stack.Screen name="(checkin)" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="(enroll)" options={{ presentation: 'fullScreenModal' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack.Protected>
        <Stack.Screen name="dev/components" />
      </Stack>
    </NavThemeProvider>
  );
}
