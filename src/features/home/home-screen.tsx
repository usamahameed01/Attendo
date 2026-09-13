import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Bell, LogIn, Pause, Play } from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { View } from 'react-native';

import { Button, Card, Divider, Screen, StatusChip, Text, Toast } from '@/components/ui';
import { elapsedMinutes, formatElapsed, useTicker } from '@/hooks/use-ticker';
import {
  BREAK_ALLOWANCE_MIN,
  useAttendanceStore,
} from '@/stores/attendance-store';
import { useAuthStore } from '@/stores/auth-store';
import { useSettingsStore } from '@/stores/settings-store';
import { radius, space, useTheme } from '@/theme';

import { PunchTimeline } from './punch-timeline';
import { buildWeekStrip, formatHoursMinutes } from './week-strip';
import { WeekStripChart } from './week-strip-chart';

function greeting(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const checkinMethod = useSettingsStore((s) => s.checkinMethod);
  const status = useAttendanceStore((s) => s.status);
  const checkedInAt = useAttendanceStore((s) => s.checkedInAt);
  const breakStartedAt = useAttendanceStore((s) => s.breakStartedAt);
  const breakAccumulatedMin = useAttendanceStore((s) => s.breakAccumulatedMin);
  const todayPunches = useAttendanceStore((s) => s.todayPunches);
  const history = useAttendanceStore((s) => s.history);
  const startBreak = useAttendanceStore((s) => s.startBreak);
  const endBreak = useAttendanceStore((s) => s.endBreak);
  const undoLastPunch = useAttendanceStore((s) => s.undoLastPunch);

  const [toast, setToast] = useState<string | null>(null);

  useTicker(status !== 'checked_out');
  const now = new Date();

  const workSeconds =
    status === 'checked_out' || !checkedInAt
      ? 0
      : status === 'on_break' && breakStartedAt
        ? Math.max(
            0,
            Math.floor((new Date(breakStartedAt).getTime() - new Date(checkedInAt).getTime()) / 1000) -
              breakAccumulatedMin * 60,
          )
        : Math.max(
            0,
            Math.floor((now.getTime() - new Date(checkedInAt).getTime()) / 1000) - breakAccumulatedMin * 60,
          );

  const workTimer = useMemo(() => {
    const h = Math.floor(workSeconds / 3600);
    const m = Math.floor((workSeconds % 3600) / 60);
    const s = workSeconds % 60;
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${pad(h)}:${pad(m)}:${pad(s)}`;
  }, [workSeconds]);

  const breakMinutesNow = breakStartedAt ? elapsedMinutes(breakStartedAt, now) : 0;
  const breakUsedMin = breakAccumulatedMin + (status === 'on_break' ? breakMinutesNow : 0);

  const { days: weekDays, totalMinutes: weekMinutes } = buildWeekStrip(
    history,
    Math.round(workSeconds / 60),
    now,
  );

  function flash(message: string) {
    setToast(message);
    setTimeout(() => setToast((m) => (m === message ? null : m)), 4000);
  }

  function handleCheckIn() {
    router.push({
      pathname: checkinMethod === 'face' ? '/(checkin)/face-scan' : '/(checkin)/manual-pin',
      params: { action: 'check_in' },
    });
  }

  function handleCheckOut() {
    router.push({
      pathname: checkinMethod === 'face' ? '/(checkin)/face-scan' : '/(checkin)/manual-pin',
      params: { action: 'check_out' },
    });
  }

  function handleStartBreak() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    startBreak();
    flash(`Break started at ${format(now, 'HH:mm')}`);
  }

  function handleEndBreak() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    endBreak();
    flash(`Break ended · ${breakUsedMin}m used`);
  }

  return (
    <Screen scroll contentContainerStyle={{ paddingTop: space.lg, gap: space.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 13 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: colors.accentSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text weight={700} color="accentText">
              {user.initials}
            </Text>
          </View>
          <View style={{ gap: 3 }}>
            <Text variant="bodySm" color="textSecondary">
              {greeting(now)}
            </Text>
            <Text variant="h3">{user.name.split(' ')[0]}</Text>
          </View>
        </View>
        <View
          style={{
            width: 42,
            height: 42,
            borderRadius: 21,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.borderSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Bell size={20} color={colors.textPrimary} strokeWidth={1.9} />
          <View
            style={{
              position: 'absolute',
              top: 9,
              right: 10,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.danger,
              borderWidth: 1.5,
              borderColor: colors.surface,
            }}
          />
        </View>
      </View>

      {toast ? <Toast message={toast} actionLabel="Undo" onAction={() => { undoLastPunch(); setToast(null); }} /> : null}

      <Card padding={24} radius={radius.card} style={{ gap: space.xl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <StatusChip status={status === 'checked_out' ? 'checked-out' : status === 'on_break' ? 'on-break' : 'checked-in'} />
          <Text variant="bodySm" color="textTertiary">
            {status === 'checked_out'
              ? format(now, 'EEE, d MMM')
              : `Since ${format(new Date(status === 'on_break' && breakStartedAt ? breakStartedAt : checkedInAt!), 'hh:mm a')}`}
          </Text>
        </View>
        <View style={{ gap: 6 }}>
          <Text
            variant="timer"
            tabular
            color={status === 'checked_out' ? 'textDim' : status === 'on_break' ? 'warning' : 'textPrimary'}>
            {status === 'on_break' ? formatElapsed(breakStartedAt!, now) : workTimer}
          </Text>
          <Text color="textSecondary">
            {status === 'on_break'
              ? `Break time · work clock paused at ${workTimer}`
              : 'Hours worked today'}
          </Text>
        </View>
        <Divider />
        {status === 'on_break' ? (
          <View style={{ gap: 9 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text variant="caption" weight={600} color="textSecondary">
                Break allowance
              </Text>
              <Text variant="caption" weight={700} tabular>
                {breakUsedMin}m of {BREAK_ALLOWANCE_MIN}m
              </Text>
            </View>
            <View style={{ height: 8, borderRadius: 4, backgroundColor: colors.surfaceAlt, overflow: 'hidden' }}>
              <View
                style={{
                  width: `${Math.min(100, (breakUsedMin / BREAK_ALLOWANCE_MIN) * 100)}%`,
                  height: '100%',
                  backgroundColor: colors.warning,
                }}
              />
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text variant="overlineSm" color="textTertiary" uppercase>
                Shift
              </Text>
              <Text variant="bodyLg" weight={700} tabular>
                {user.shiftStart} – {user.shiftEnd}
              </Text>
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text variant="overlineSm" color="textTertiary" uppercase>
                Break used
              </Text>
              <Text variant="bodyLg" weight={700} tabular>
                {breakUsedMin}m of {BREAK_ALLOWANCE_MIN}m
              </Text>
            </View>
          </View>
        )}
      </Card>

      {status === 'checked_out' ? (
        <Button
          label="Check in"
          icon={<LogIn size={20} color={colors.onAccent} strokeWidth={2.2} />}
          onPress={handleCheckIn}
        />
      ) : status === 'checked_in' ? (
        <View style={{ gap: space.md }}>
          <Button
            label="Start break"
            icon={<Pause size={20} color={colors.onAccent} strokeWidth={2.2} />}
            onPress={handleStartBreak}
          />
          <Button label="Check out" variant="secondary" size="md" onPress={handleCheckOut} />
        </View>
      ) : (
        <View style={{ gap: space.md }}>
          <Button
            label="End break"
            icon={<Play size={20} color={colors.onAccent} strokeWidth={2.2} />}
            onPress={handleEndBreak}
          />
          <Button label="Check out · available after break" variant="secondary" disabled />
        </View>
      )}

      {status === 'checked_in' ? (
        <View style={{ gap: space.md }}>
          <Text variant="h3" style={{ fontSize: 15 }}>
            Today&apos;s punches
          </Text>
          <PunchTimeline punches={todayPunches} pendingCheckoutTime={user.shiftEnd} />
        </View>
      ) : status === 'checked_out' ? (
        <View style={{ gap: space.md }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text variant="h3" style={{ fontSize: 15 }}>
              This week
            </Text>
            <Text variant="bodySm" weight={600} color="textSecondary" tabular>
              {formatHoursMinutes(weekMinutes)}
            </Text>
          </View>
          <WeekStripChart days={weekDays} />
        </View>
      ) : null}
    </Screen>
  );
}
