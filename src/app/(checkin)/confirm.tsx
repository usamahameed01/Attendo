import { format } from 'date-fns';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Card, Divider, Pill, Screen, Text } from '@/components/ui';
import { useAttendanceStore } from '@/stores/attendance-store';
import { useAuthStore } from '@/stores/auth-store';
import { useSettingsStore } from '@/stores/settings-store';
import { space, useTheme } from '@/theme';

export default function ConfirmScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { action = 'check_in' } = useLocalSearchParams<{ action?: 'check_in' | 'check_out' }>();
  const user = useAuthStore((s) => s.user);
  const checkIn = useAttendanceStore((s) => s.checkIn);
  const checkOut = useAttendanceStore((s) => s.checkOut);
  const devForceOffline = useSettingsStore((s) => s.devForceOffline);
  const devForceOutsideGeofence = useSettingsStore((s) => s.devForceOutsideGeofence);

  const isCheckOut = action === 'check_out';

  function confirm() {
    if (devForceOutsideGeofence) {
      router.replace({ pathname: '/modal/geofence', params: { action, method: 'manual' } });
      return;
    }
    if (devForceOffline) {
      if (isCheckOut) checkOut('manual', true);
      else checkIn('manual', true);
      router.replace({ pathname: '/modal/offline', params: { action, method: 'manual' } });
      return;
    }
    if (isCheckOut) checkOut('manual');
    else checkIn('manual');
    router.replace({ pathname: '/(checkin)/result', params: { outcome: 'success', action } });
  }

  return (
    <Screen padded={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
      <View style={{ paddingHorizontal: space.screen, paddingBottom: space.xxl, gap: space.xl }}>
        <View
          style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.sheetHandle, alignSelf: 'center' }}
        />
        <View style={{ gap: 6 }}>
          <Text variant="h1" style={{ fontSize: 24 }}>
            Confirm and {isCheckOut ? 'check out' : 'check in'}
          </Text>
          <Text color="textSecondary">Verify this is you before we record the punch.</Text>
        </View>

        <Card style={{ gap: space.xl }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: colors.accentSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text variant="h3" style={{ fontSize: 20 }} color="accentText">
                {user.initials}
              </Text>
            </View>
            <View style={{ gap: 5 }}>
              <Text variant="h3" style={{ fontSize: 20 }}>
                {user.name}
              </Text>
              <Text variant="bodySm" color="textSecondary">
                {user.id} · {user.department}
              </Text>
            </View>
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', gap: space.md }}>
            <View style={{ flex: 1, gap: 6 }}>
              <Text variant="overlineSm" color="textTertiary" uppercase>
                Shift
              </Text>
              <Text variant="bodyLg" weight={700} tabular>
                {user.shiftStart} – {user.shiftEnd}
              </Text>
            </View>
            <View style={{ width: 1, backgroundColor: colors.divider }} />
            <View style={{ flex: 1, gap: 6 }}>
              <Text variant="overlineSm" color="textTertiary" uppercase>
                Action
              </Text>
              <Text variant="bodyLg" weight={700} color="success">
                {isCheckOut ? 'Check out' : 'Check in'} · {format(new Date(), 'HH:mm')}
              </Text>
            </View>
          </View>
        </Card>

        <Pill
          label="Inside office geofence · HQ Bengaluru"
          tone="success"
          icon={<MapPin size={17} color={colors.success} strokeWidth={2} />}
          style={{ paddingVertical: 12, paddingHorizontal: 14, alignSelf: 'stretch', justifyContent: 'center' }}
        />

        <View style={{ gap: space.md }}>
          <Button label={`Confirm ${isCheckOut ? 'check out' : 'check in'}`} onPress={confirm} />
          <Button label="Not me" variant="secondary" onPress={() => router.back()} />
        </View>
      </View>
    </Screen>
  );
}
