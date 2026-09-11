import type { TextStyle } from 'react-native';

export const fontFamily = {
  400: 'Inter_400Regular',
  500: 'Inter_500Medium',
  600: 'Inter_600SemiBold',
  700: 'Inter_700Bold',
  800: 'Inter_800ExtraBold',
} as const;

export type FontWeight = keyof typeof fontFamily;

export const typeScale = {
  display: { fontSize: 56, lineHeight: 56, letterSpacing: -2.24, weight: 700 },
  timer: { fontSize: 52, lineHeight: 52, letterSpacing: -2.08, weight: 700 },
  stat: { fontSize: 34, lineHeight: 34, letterSpacing: -1.02, weight: 700 },
  h1: { fontSize: 24, lineHeight: 30, letterSpacing: -0.72, weight: 800 },
  h2: { fontSize: 20, lineHeight: 26, letterSpacing: -0.5, weight: 800 },
  h3: { fontSize: 17, lineHeight: 22, letterSpacing: -0.26, weight: 700 },
  bodyLg: { fontSize: 15, lineHeight: 21, letterSpacing: 0, weight: 500 },
  body: { fontSize: 14, lineHeight: 20, letterSpacing: 0, weight: 500 },
  bodySm: { fontSize: 13, lineHeight: 18, letterSpacing: 0, weight: 500 },
  caption: { fontSize: 12, lineHeight: 16, letterSpacing: 0, weight: 500 },
  overline: { fontSize: 12, lineHeight: 14, letterSpacing: 1.2, weight: 600 },
  overlineSm: { fontSize: 11, lineHeight: 13, letterSpacing: 1.1, weight: 600 },
  sectionLabel: { fontSize: 12, lineHeight: 14, letterSpacing: 1.44, weight: 700 },
} satisfies Record<string, TextStyle & { weight: FontWeight }>;

export type TypeVariant = keyof typeof typeScale;
