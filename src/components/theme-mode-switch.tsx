import { Pressable, View } from 'react-native';

import { radius, useTheme, useThemeMode } from '@/theme';
import type { ThemeMode } from '@/stores/settings-store';

import { Text } from './ui';

const MODES: ThemeMode[] = ['system', 'light', 'dark'];

export function ThemeModeSwitch() {
  const { colors } = useTheme();
  const { mode, setMode } = useThemeMode();

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        padding: 6,
        borderRadius: radius.pill,
        backgroundColor: colors.surfaceAlt,
      }}>
      {MODES.map((option) => {
        const active = option === mode;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            onPress={() => setMode(option)}
            style={{
              flex: 1,
              paddingVertical: 9,
              borderRadius: radius.pill,
              alignItems: 'center',
              backgroundColor: active ? colors.accent : 'transparent',
            }}>
            <Text variant="caption" weight={600} color={active ? 'onAccent' : 'textSecondary'} uppercase>
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
