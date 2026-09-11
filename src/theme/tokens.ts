import type { ViewStyle } from 'react-native';

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  screen: 24,
} as const;

export const radius = {
  pill: 999,
  card: 22,
  cardSm: 20,
  tile: 18,
  button: 18,
  buttonMd: 16,
  buttonSm: 14,
  input: 14,
  sheet: 24,
} as const;

export const control = {
  lg: { height: 58, radius: radius.button, fontSize: 17 },
  md: { height: 52, radius: radius.buttonMd, fontSize: 15 },
  sm: { height: 44, radius: radius.buttonSm, fontSize: 14 },
} as const;

type Shadow = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

export const shadow = {
  soft: {
    shadowColor: '#12121A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 22,
    elevation: 3,
  },
  card: {
    shadowColor: '#12121A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.06,
    shadowRadius: 30,
    elevation: 4,
  },
  accent: {
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.28,
    shadowRadius: 24,
    elevation: 8,
  },
  toast: {
    shadowColor: '#12121A',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.22,
    shadowRadius: 30,
    elevation: 10,
  },
  sheet: {
    shadowColor: '#12121A',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 12,
  },
} satisfies Record<string, Shadow>;

export type ShadowName = keyof typeof shadow;
