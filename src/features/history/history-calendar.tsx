import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subDays,
} from 'date-fns';
import { View } from 'react-native';

import { Text } from '@/components/ui';
import type { DaySummary } from '@/data/types';
import { useTheme } from '@/theme';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const statusDotColor = (theme: ReturnType<typeof useTheme>, status: DaySummary['status']) => {
  switch (status) {
    case 'present':
      return theme.colors.success;
    case 'late':
      return theme.colors.warning;
    case 'absent':
      return theme.colors.danger;
    case 'leave':
      return theme.colors.neutral;
    default:
      return undefined;
  }
};

export function HistoryCalendar({ month, history }: { month: Date; history: DaySummary[] }) {
  const theme = useTheme();
  const { colors } = theme;
  const byDate = new Map(history.map((d) => [d.date, d]));
  const today = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');

  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const leading = (getDay(start) + 6) % 7;
  const days = eachDayOfInterval({ start, end });
  const leadDays = Array.from({ length: leading }, (_, i) => subDays(start, leading - i));
  const totalCells = leadDays.length + days.length;
  const trailingCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
  const trailDays = Array.from({ length: trailingCount }, (_, i) => addDays(end, i + 1));

  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: 20, padding: 16, gap: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        {WEEKDAYS.map((d, i) => (
          <Text key={i} variant="caption" weight={600} color="textTertiary" center style={{ flex: 1 }}>
            {d}
          </Text>
        ))}
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {[...leadDays, ...days, ...trailDays].map((day, i) => {
          const dateStr = format(day, 'yyyy-MM-dd');
          const inMonth = day >= start && day <= end;
          const entry = inMonth ? byDate.get(dateStr) : undefined;
          const isToday = dateStr === todayStr;
          const dot = entry ? statusDotColor(theme, entry.status) : undefined;
          return (
            <View
              key={i}
              style={{
                width: `${100 / 7}%`,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                borderRadius: 12,
                backgroundColor: isToday ? colors.accent : 'transparent',
              }}>
              <Text
                variant="bodySm"
                weight={isToday ? 700 : inMonth ? 600 : 500}
                color={isToday ? 'onAccent' : inMonth ? 'textPrimary' : 'textDim'}>
                {format(day, 'd')}
              </Text>
              <View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 2.5,
                  backgroundColor: isToday ? colors.onAccent : dot,
                }}
              />
            </View>
          );
        })}
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 14,
          paddingTop: 6,
          borderTopWidth: 1,
          borderTopColor: colors.divider,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
        <Legend color={colors.success} label="Present" />
        <Legend color={colors.warning} label="Late" />
        <Legend color={colors.danger} label="Absent" />
        <Legend color={colors.neutral} label="Leave" />
      </View>
    </View>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
      <Text variant="caption" color="textSecondary">
        {label}
      </Text>
    </View>
  );
}
