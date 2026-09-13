import { Home, ClipboardList, User, History } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';

import { Text } from './ui';

export type TabKey = 'home' | 'history' | 'requests' | 'profile';

const items: { key: TabKey; label: string; icon: typeof Home }[] = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'history', label: 'History', icon: History },
  { key: 'requests', label: 'Requests', icon: ClipboardList },
  { key: 'profile', label: 'Profile', icon: User },
];

export function TabBar({ active, onSelect }: { active: TabKey; onSelect: (key: TabKey) => void }) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const on = isDark ? '#8B84FF' : colors.accent;
  const off = isDark ? '#5C5C68' : colors.textTertiary;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 12,
        paddingHorizontal: 12,
        paddingBottom: insets.bottom,
        backgroundColor: isDark ? 'rgba(16,16,21,0.92)' : 'rgba(255,255,255,0.92)',
        borderTopWidth: 1,
        borderTopColor: isDark ? '#22222A' : '#EBEBE4',
      }}>
      {items.map(({ key, label, icon: Icon }) => {
        const isActive = key === active;
        const color = isActive ? on : off;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            onPress={() => onSelect(key)}
            style={{
              flex: 1,
              alignItems: 'center',
              gap: 6,
              paddingVertical: 6,
              minHeight: 48,
            }}>
            <Icon size={24} color={color} strokeWidth={1.9} />
            <Text variant="caption" weight={600} style={{ color, fontSize: 11, lineHeight: 11 }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
