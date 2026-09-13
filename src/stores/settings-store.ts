import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { persistStorage } from './persist-storage';

export type ThemeMode = 'system' | 'light' | 'dark';
export type CheckinMethod = 'face' | 'manual';

type SettingsState = {
  themeMode: ThemeMode;
  checkinMethod: CheckinMethod;
  notificationsEnabled: boolean;
  devForceOffline: boolean;
  devForceOutsideGeofence: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setCheckinMethod: (method: CheckinMethod) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setDevForceOffline: (value: boolean) => void;
  setDevForceOutsideGeofence: (value: boolean) => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      themeMode: 'system',
      checkinMethod: 'face',
      notificationsEnabled: true,
      devForceOffline: false,
      devForceOutsideGeofence: false,
      setThemeMode: (themeMode) => set({ themeMode }),
      setCheckinMethod: (checkinMethod) => set({ checkinMethod }),
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
      setDevForceOffline: (devForceOffline) => set({ devForceOffline }),
      setDevForceOutsideGeofence: (devForceOutsideGeofence) => set({ devForceOutsideGeofence }),
    }),
    {
      name: 'attendo.settings',
      storage: createJSONStorage(() => persistStorage),
      partialize: ({ themeMode, checkinMethod, notificationsEnabled }) => ({
        themeMode,
        checkinMethod,
        notificationsEnabled,
      }),
    },
  ),
);
