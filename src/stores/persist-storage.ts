import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import type { StateStorage } from 'zustand/middleware';

// Static web rendering runs store modules in Node, where AsyncStorage's web backend
// touches `window` synchronously and crashes. Fall back to a no-op storage there.
const hasBrowserStorage = Platform.OS !== 'web' || typeof window !== 'undefined';

export const persistStorage: StateStorage = hasBrowserStorage
  ? AsyncStorage
  : { getItem: async () => null, setItem: async () => {}, removeItem: async () => {} };
