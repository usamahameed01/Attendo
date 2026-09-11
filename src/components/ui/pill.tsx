import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, useTheme, type ColorTokens } from '@/theme';

import { Text } from './text';

export type Tone = 'success' | 'warning' | 'danger' | 'neutral' | 'accent' | 'surface';

type ToneTokens = { bg: keyof ColorTokens; dot: keyof ColorTokens; text: keyof ColorTokens };

export const toneTokens: Record<Tone, ToneTokens> = {
  success: { bg: 'successSoft', dot: 'success', text: 'successText' },
  warning: { bg: 'warningSoft', dot: 'warning', text: 'warningText' },
  danger: { bg: 'dangerSoft', dot: 'danger', text: 'dangerText' },
  neutral: { bg: 'neutralSoft', dot: 'neutral', text: 'neutralText' },
  accent: { bg: 'accentSoft', dot: 'accent', text: 'accentText' },
  surface: { bg: 'surfaceAlt', dot: 'textSecondary', text: 'textSecondary' },
};

export type PillProps = {
  label: string;
  tone?: Tone;
  dot?: boolean;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Pill({ label, tone = 'neutral', dot = false, icon, style }: PillProps) {
  const { colors } = useTheme();
  const tokens = toneTokens[tone];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 7,
          paddingVertical: 7,
          paddingHorizontal: 13,
          borderRadius: radius.pill,
          backgroundColor: colors[tokens.bg],
          alignSelf: 'flex-start',
        },
        style,
      ]}>
      {dot ? (
        <View
          style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: colors[tokens.dot] }}
        />
      ) : null}
      {icon}
      <Text variant="caption" weight={600} color={tokens.text}>
        {label}
      </Text>
    </View>
  );
}
