import type { ReactNode } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, shadow, space, useTheme } from '@/theme';

import { Text } from './text';

export function Sheet({
  title,
  children,
  style,
}: {
  title?: string;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: colors.sheetBg,
          borderTopLeftRadius: radius.sheet,
          borderTopRightRadius: radius.sheet,
          borderBottomLeftRadius: radius.buttonMd,
          borderBottomRightRadius: radius.buttonMd,
          borderWidth: 1,
          borderColor: colors.divider,
          paddingTop: 14,
          paddingHorizontal: space.xl,
          paddingBottom: 22,
          gap: space.lg,
        },
        shadow.sheet,
        style,
      ]}>
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: 2,
          backgroundColor: colors.sheetHandle,
          alignSelf: 'center',
        }}
      />
      {title ? <Text variant="h2">{title}</Text> : null}
      {children}
    </View>
  );
}
