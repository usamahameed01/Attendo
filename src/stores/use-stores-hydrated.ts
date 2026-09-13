import { useSyncExternalStore } from 'react';

import { useAttendanceStore } from './attendance-store';
import { useAuthStore } from './auth-store';
import { useRequestsStore } from './requests-store';
import { useSettingsStore } from './settings-store';

const stores = [useSettingsStore, useAuthStore, useAttendanceStore, useRequestsStore];

export function useStoresHydrated(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const unsubs = stores.map((store) => store.persist.onFinishHydration(onChange));
      return () => unsubs.forEach((unsub) => unsub());
    },
    () => stores.every((store) => store.persist.hasHydrated()),
    () => false,
  );
}
