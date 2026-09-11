import type { ReactNode } from 'react';
import { Pressable, View, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { control, shadow, useTheme, type ColorTokens } from '@/theme';

import { Text } from './text';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'approve' | 'reject';
export type ButtonSize = 'lg' | 'md' | 'sm';

export type ButtonProps = Omit<PressableProps, 'style' | 'children'> & {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const defaultSize: Record<ButtonVariant, ButtonSize> = {
  primary: 'lg',
  secondary: 'md',
  ghost: 'md',
  approve: 'sm',
  reject: 'sm',
};

export function Button({
  label,
  variant = 'primary',
  size,
  icon,
  disabled,
  style,
  ...rest
}: ButtonProps) {
  const { colors } = useTheme();
  const { height, radius, fontSize } = control[size ?? defaultSize[variant]];

  const filled = variant === 'primary' || variant === 'approve';
  const outlined = variant === 'secondary' || variant === 'reject';

  let background = 'transparent';
  let textColor: keyof ColorTokens = 'accentText';

  if (filled) {
    background = colors.accent;
    textColor = 'onAccent';
  } else if (outlined) {
    background = colors.surface;
    textColor = 'textPrimary';
  }

  if (disabled) {
    background = colors.disabledBg;
    textColor = 'disabledText';
  }

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        {
          height,
          borderRadius: radius,
          backgroundColor: background,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          paddingHorizontal: 18,
          opacity: pressed ? 0.85 : 1,
        },
        outlined && !disabled && { borderWidth: 1.5, borderColor: colors.border },
        variant === 'primary' && !disabled && shadow.accent,
        style,
      ]}
      {...rest}>
      {icon ? <View>{icon}</View> : null}
      <Text color={textColor} weight={600} style={{ fontSize, lineHeight: fontSize * 1.2 }}>
        {label}
      </Text>
    </Pressable>
  );
}
