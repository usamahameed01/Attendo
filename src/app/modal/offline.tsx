import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { WifiOff } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Pill, Screen, Text } from '@/components/ui';
import { useAttendanceStore } from '@/stores/attendance-store';
import { useSettingsStore } from '@/stores/settings-store';
import { radius, space, useTheme } from '@/theme';

export default function OfflineScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const todayPunches = useAttendanceStore((s) => s.todayPunches);
  const flushQueuedPunches = useAttendanceStore((s) => s.flushQueuedPunches);
  const devForceOffline = useSettingsStore((s) => s.devForceOffline);

  const queued = todayPunches.filter((p) => p.queued);
  const latest = queued[queued.length - 1];

  function tryAgain() {
    if (!devForceOffline) {
      flushQueuedPunches();
      router.replace('/(app)/(tabs)');
    }
  }

  return (
    <Screen contentContainerStyle={{ flexGrow: 1 }}>
      <Pill
        label="Offline · punches will sync later"
        tone="warning"
        dot
        style={{ marginTop: space.sm, alignSelf: 'stretch', paddingVertical: 12, paddingHorizontal: 16 }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: space.xl,
          paddingHorizontal: space.md,
        }}>
        <View
          style={{
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: colors.surfaceAlt,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <WifiOff size={42} color={colors.textSecondary} strokeWidth={1.9} />
        </View>
        <View style={{ alignItems: 'center', gap: 12 }}>
          <Text variant="h1" style={{ fontSize: 27 }} center>
            No internet connection
          </Text>
          <Text color="textSecondary" center style={{ maxWidth: 280, lineHeight: 22 }}>
            {latest
              ? `Your ${format(new Date(latest.at), 'HH:mm')} punch is saved on this device and will upload when you're back online.`
              : 'Punches taken while offline are saved on this device and upload automatically.'}
          </Text>
        </View>
        {latest ? (
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              gap: space.lg,
              backgroundColor: colors.surface,
              borderRadius: 20,
              padding: 18,
            }}>
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: radius.buttonSm - 4,
                backgroundColor: colors.warningSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text variant="bodySm" weight={700} color="warningText">
                {queued.length}
              </Text>
            </View>
            <View style={{ gap: 3 }}>
              <Text variant="body" weight={600}>
                {latest.type.replace('_', ' ')} · {format(new Date(latest.at), 'HH:mm')}
              </Text>
              <Text variant="caption" color="textTertiary">
                Queued for sync
              </Text>
            </View>
          </View>
        ) : null}
      </View>
      <View style={{ paddingBottom: space.xxl }}>
        <Button label="Try again" onPress={tryAgain} />
      </View>
    </Screen>
  );
}
