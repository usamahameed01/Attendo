import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { seedUser } from '@/data/seed';
import type { User } from '@/data/types';

import { persistStorage } from './persist-storage';

type AuthState = {
  onboarded: boolean;
  faceEnrolled: boolean;
  user: User;
  completeOnboarding: () => void;
  setFaceEnrolled: (enrolled: boolean) => void;
  logOut: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      onboarded: false,
      faceEnrolled: false,
      user: seedUser,
      completeOnboarding: () => set({ onboarded: true }),
      setFaceEnrolled: (faceEnrolled) => set({ faceEnrolled }),
      logOut: () => set({ onboarded: false }),
    }),
    {
      name: 'attendo.auth',
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);
