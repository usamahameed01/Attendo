import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import {
  fontFamily,
  typeScale,
  useTheme,
  type ColorTokens,
  type FontWeight,
  type TypeVariant,
} from '@/theme';

export type TextProps = RNTextProps & {
  variant?: TypeVariant;
  weight?: FontWeight;
  color?: keyof ColorTokens;
  uppercase?: boolean;
  tabular?: boolean;
  center?: boolean;
};

export function Text({
  variant = 'body',
  weight,
  color = 'textPrimary',
  uppercase,
  tabular,
  center,
  style,
  ...rest
}: TextProps) {
  const { colors } = useTheme();
  const { fontSize, lineHeight, letterSpacing, weight: defaultWeight } = typeScale[variant];

  return (
    <RNText
      style={[
        {
          fontFamily: fontFamily[weight ?? defaultWeight],
          fontSize,
          lineHeight,
          letterSpacing,
          color: colors[color],
        },
        uppercase && { textTransform: 'uppercase' },
        tabular && { fontVariant: ['tabular-nums'] },
        center && { textAlign: 'center' },
        style,
      ]}
      {...rest}
    />
  );
}
