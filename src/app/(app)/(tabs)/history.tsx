import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { CalendarDays, ChevronDown } from 'lucide-react-native';
import { View } from 'react-native';

import { EmptyState, Screen, Text } from '@/components/ui';
import { DayRow } from '@/features/history/day-row';
import { HistoryCalendar } from '@/features/history/history-calendar';
import { useAttendanceStore } from '@/stores/attendance-store';
import { useSettingsStore } from '@/stores/settings-store';
import { space, useTheme } from '@/theme';

export default function HistoryScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const history = useAttendanceStore((s) => s.history);
  const checkinMethod = useSettingsStore((s) => s.checkinMethod);
  const now = new Date();

  const recentDays = [...history]
    .filter((d) => d.status !== 'weekend')
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 12);

  if (history.length === 0) {
    return (
      <Screen contentContainerStyle={{ flexGrow: 1 }}>
        <Header now={now} />
        <EmptyState
          icon={<CalendarDays size={34} color={colors.textDim} strokeWidth={1.8} />}
          title="Nothing recorded yet"
          description="Your punches appear here from your first check-in."
          actionLabel="Check in now"
          onAction={() =>
            router.push(checkinMethod === 'face' ? '/(checkin)/face-scan' : '/(checkin)/manual-pin')
          }
        />
      </Screen>
    );
  }

  return (
    <Screen scroll contentContainerStyle={{ gap: space.lg }}>
      <Header now={now} />
      <HistoryCalendar month={now} history={history} />
      <View style={{ gap: space.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="h3" style={{ fontSize: 15 }}>
            Recent days
          </Text>
          <Text variant="bodySm" weight={600} color="accentText">
            Export
          </Text>
        </View>
        <View style={{ gap: space.md }}>
          {recentDays.map((day) => (
            <DayRow key={day.date} day={day} />
          ))}
        </View>
      </View>
    </Screen>
  );
}

function Header({ now }: { now: Date }) {
  const { colors } = useTheme();
  return (
    <View
      style={{
        paddingTop: space.sm,
        paddingBottom: space.sm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text variant="h1">History</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingVertical: 8,
          paddingHorizontal: 13,
          borderRadius: 12,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.borderSoft,
        }}>
        <Text variant="bodySm" weight={600}>
          {format(now, 'MMMM')}
        </Text>
        <ChevronDown size={14} color={colors.textSecondary} strokeWidth={2.4} />
      </View>
    </View>
  );
}
