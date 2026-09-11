import { Check } from 'lucide-react-native';
import { Pressable, View, type StyleProp, type ViewStyle } from 'react-native';

import { radius, shadow, useTheme } from '@/theme';

import { Text } from './text';

export function Toast({
  message,
  actionLabel,
  onAction,
  style,
}: {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: colors.toastBg,
          borderRadius: radius.button,
          paddingVertical: 15,
          paddingHorizontal: 18,
        },
        shadow.toast,
        style,
      ]}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: colors.success,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Check size={14} color={colors.onAccent} strokeWidth={3} />
      </View>
      <Text variant="body" weight={600} color="toastText" style={{ flex: 1 }}>
        {message}
      </Text>
      {actionLabel ? (
        <Pressable accessibilityRole="button" onPress={onAction}>
          <Text variant="bodySm" weight={600} color="toastAction">
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
