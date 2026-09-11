const light = {
  bg: '#FAFAF8',
  surface: '#FFFFFF',
  surfaceAlt: '#F2F2F5',
  border: '#E4E4EC',
  borderSoft: '#EAEAE3',
  divider: '#EDEDE6',

  textPrimary: '#12121A',
  textSecondary: '#8A8A94',
  textTertiary: '#A8A8B2',
  textDim: '#C9C9D2',

  accent: '#4F46E5',
  accentSoft: '#E8E7FB',
  accentText: '#4F46E5',
  onAccent: '#FFFFFF',

  success: '#16A34A',
  successSoft: '#E7F6EC',
  successText: '#15803D',

  warning: '#D97706',
  warningSoft: '#FDF3E3',
  warningText: '#B45309',

  danger: '#DC2626',
  dangerSoft: '#FDECEC',
  dangerText: '#B91C1C',

  neutral: '#9CA3AF',
  neutralSoft: '#F2F2F5',
  neutralText: '#6B7280',

  disabledBg: '#EDEDF0',
  disabledText: '#A9A9B4',

  toastBg: '#12121A',
  toastText: '#FFFFFF',
  toastAction: '#A9A3FF',

  sheetBg: '#FAFAF8',
  sheetHandle: '#DEDEE6',
} as const;

export type ColorTokens = Record<keyof typeof light, string>;

const dark: ColorTokens = {
  bg: '#0B0B0F',
  surface: '#16161C',
  surfaceAlt: '#1E1E26',
  border: '#24242C',
  borderSoft: '#26262F',
  divider: '#24242C',

  textPrimary: '#F4F4F7',
  textSecondary: '#8A8A9A',
  textTertiary: '#6B6B7C',
  textDim: '#54545F',

  accent: '#4F46E5',
  accentSoft: '#241F52',
  accentText: '#A9A3FF',
  onAccent: '#FFFFFF',

  success: '#4ADE80',
  successSoft: 'rgba(22,163,74,0.16)',
  successText: '#7CE0A5',

  warning: '#FBBF24',
  warningSoft: 'rgba(217,119,6,0.16)',
  warningText: '#F5C471',

  danger: '#F87171',
  dangerSoft: 'rgba(220,38,38,0.16)',
  dangerText: '#F1A2A2',

  neutral: '#6B6B7C',
  neutralSoft: 'rgba(255,255,255,0.06)',
  neutralText: '#8A8A9A',

  disabledBg: '#1E1E26',
  disabledText: '#54545F',

  toastBg: '#24242C',
  toastText: '#F4F4F7',
  toastAction: '#A9A3FF',

  sheetBg: '#16161C',
  sheetHandle: '#33333D',
};

export const palettes: Record<'light' | 'dark', ColorTokens> = { light, dark };
