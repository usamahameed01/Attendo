import { format, parseISO } from 'date-fns';
import { View } from 'react-native';

import { Card, Pill, Text } from '@/components/ui';
import type { DaySummary } from '@/data/types';
import { useTheme } from '@/theme';

function statusColor(theme: ReturnType<typeof useTheme>, status: DaySummary['status']) {
  switch (status) {
    case 'present':
      return theme.colors.success;
    case 'late':
      return theme.colors.warning;
    case 'absent':
      return theme.colors.danger;
    default:
      return theme.colors.neutral;
  }
}

export function DayRow({ day }: { day: DaySummary }) {
  const theme = useTheme();
  const totalLabel = day.totalMinutes
    ? `${Math.floor(day.totalMinutes / 60)}h ${day.totalMinutes % 60}m`
    : '—';

  return (
    <Card
      padding={18}
      radius={20}
      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: statusColor(theme, day.status) }}
        />
        <View style={{ gap: 3 }}>
          <Text variant="bodyLg" weight={700}>
            {format(parseISO(day.date), 'EEE, d MMM')}
          </Text>
          <Text variant="caption" color="textSecondary" tabular>
            {day.status === 'absent' || day.status === 'leave'
              ? day.status === 'leave'
                ? 'On leave'
                : 'Absent'
              : `${day.checkIn} in · ${day.checkOut} out`}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        {day.status === 'late' && day.lateMinutes ? (
          <Pill label={`Late ${day.lateMinutes}m`} tone="warning" />
        ) : null}
        <Text variant="bodyLg" weight={700} tabular>
          {totalLabel}
        </Text>
      </View>
    </Card>
  );
}
