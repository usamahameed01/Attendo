import { createContext, use, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { useSettingsStore, type ThemeMode } from '@/stores/settings-store';

import { palettes, type ColorTokens } from './colors';

export type Theme = {
  scheme: 'light' | 'dark';
  isDark: boolean;
  colors: ColorTokens;
};

const ThemeContext = createContext<Theme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const mode = useSettingsStore((s) => s.themeMode);

  const scheme: 'light' | 'dark' =
    mode === 'system' ? (systemScheme === 'dark' ? 'dark' : 'light') : mode;

  const theme = useMemo<Theme>(
    () => ({ scheme, isDark: scheme === 'dark', colors: palettes[scheme] }),
    [scheme],
  );

  return <ThemeContext value={theme}>{children}</ThemeContext>;
}

export function useTheme(): Theme {
  const theme = use(ThemeContext);
  if (!theme) throw new Error('useTheme must be used inside <ThemeProvider>');
  return theme;
}

export function useThemeMode(): { mode: ThemeMode; setMode: (mode: ThemeMode) => void } {
  const mode = useSettingsStore((s) => s.themeMode);
  const setMode = useSettingsStore((s) => s.setThemeMode);
  return { mode, setMode };
}
