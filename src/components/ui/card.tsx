import { View, type ViewProps } from 'react-native';

import { radius as radii, shadow, useTheme, type ShadowName } from '@/theme';

export type CardProps = ViewProps & {
  padding?: number;
  radius?: number;
  elevation?: ShadowName;
};

export function Card({
  padding = 20,
  radius = radii.card,
  elevation = 'soft',
  style,
  ...rest
}: CardProps) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderRadius: radius,
          padding,
        },
        isDark ? { borderWidth: 1, borderColor: colors.border } : shadow[elevation],
        style,
      ]}
      {...rest}
    />
  );
}
