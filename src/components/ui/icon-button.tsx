import type { ReactNode } from 'react';
import { Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme';

export type IconButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  children: ReactNode;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function IconButton({ children, size = 42, style, ...rest }: IconButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.borderSoft,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        },
        style,
      ]}
      {...rest}>
      {children}
    </Pressable>
  );
}
