import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';
import { Platform } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist, type StateStorage } from 'zustand/middleware';

export type ThemeMode = 'system' | 'light' | 'dark';

type SettingsState = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
};

// Static web rendering runs this module in Node, where AsyncStorage's web backend has no window.
const hasBrowserStorage = Platform.OS !== 'web' || typeof window !== 'undefined';

const storage: StateStorage = hasBrowserStorage
  ? AsyncStorage
  : { getItem: async () => null, setItem: async () => {}, removeItem: async () => {} };

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      setThemeMode: (themeMode) => set({ themeMode }),
    }),
    {
      name: 'attendo.settings',
      storage: createJSONStorage(() => storage),
      partialize: ({ themeMode }) => ({ themeMode }),
    },
  ),
);

export function useSettingsHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => useSettingsStore.persist.onFinishHydration(onChange),
    () => useSettingsStore.persist.hasHydrated(),
    () => false,
  );
}
