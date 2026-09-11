import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, type StyleProp, type ViewProps, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { space, useTheme } from '@/theme';

export type ScreenProps = ViewProps & {
  padded?: boolean;
  scroll?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  padded = true,
  scroll = false,
  children,
  style,
  contentContainerStyle,
  ...rest
}: ScreenProps) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const content = padded ? { paddingHorizontal: space.screen } : null;

  return (
    <View
      style={[{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top }, style]}
      {...rest}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {scroll ? (
        <ScrollView
          contentContainerStyle={[content, { paddingBottom: insets.bottom + space.xxl }, contentContainerStyle]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1 }, content, contentContainerStyle]}>{children}</View>
      )}
    </View>
  );
}
