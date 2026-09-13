import type { ReactNode } from 'react';
import { View } from 'react-native';

import { useTheme } from '@/theme';

import { Button, type ButtonVariant } from './button';
import { Text } from './text';

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  actionVariant = 'primary',
}: {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  actionVariant?: ButtonVariant;
}) {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 22, paddingHorizontal: 40 }}>
      <View
        style={{
          width: 80,
          height: 80,
          borderRadius: 24,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.divider,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon}
      </View>
      <View style={{ alignItems: 'center', gap: 10 }}>
        <Text variant="h2" style={{ fontSize: 20 }} center>
          {title}
        </Text>
        <Text color="textSecondary" center style={{ lineHeight: 22 }}>
          {description}
        </Text>
      </View>
      <Button label={actionLabel} variant={actionVariant} size="sm" onPress={onAction} />
    </View>
  );
}
