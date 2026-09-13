import { View } from 'react-native';

import { Card, Text } from '@/components/ui';
import { useTheme } from '@/theme';

import type { WeekDay } from './week-strip';

export function WeekStripChart({ days }: { days: WeekDay[] }) {
  const { colors } = useTheme();
  const maxMinutes = Math.max(480, ...days.map((d) => d.minutes));

  return (
    <Card
      padding={0}
      radius={20}
      style={{
        paddingTop: 20,
        paddingHorizontal: 18,
        paddingBottom: 14,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 132,
      }}>
      {days.map((day, i) => {
        const height = day.minutes > 0 ? Math.max(8, (day.minutes / maxMinutes) * 66) : 8;
        return (
          <View key={i} style={{ flex: 1, alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 20,
                height,
                borderRadius: 6,
                backgroundColor: day.isToday ? colors.accentSoft : colors.surfaceAlt,
              }}
            />
            <Text
              variant="caption"
              weight={600}
              color={day.isToday ? 'accentText' : 'textTertiary'}>
              {day.label}
            </Text>
          </View>
        );
      })}
    </Card>
  );
}
