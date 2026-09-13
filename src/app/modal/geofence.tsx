import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPinOff } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Card, Divider, Screen, Text } from '@/components/ui';
import { useAttendanceStore } from '@/stores/attendance-store';
import { useSettingsStore } from '@/stores/settings-store';
import { space, useTheme } from '@/theme';

export default function GeofenceScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { action = 'check_in', method = 'face' } = useLocalSearchParams<{
    action?: 'check_in' | 'check_out';
    method?: 'face' | 'manual';
  }>();
  const checkIn = useAttendanceStore((s) => s.checkIn);
  const checkOut = useAttendanceStore((s) => s.checkOut);
  const devForceOutsideGeofence = useSettingsStore((s) => s.devForceOutsideGeofence);

  function record() {
    if (action === 'check_out') checkOut(method);
    else checkIn(method);
    router.replace({ pathname: '/(checkin)/result', params: { outcome: 'success', action } });
  }

  function retryLocation() {
    if (!devForceOutsideGeofence) record();
  }

  return (
    <Screen contentContainerStyle={{ flexGrow: 1 }}>
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
            backgroundColor: colors.dangerSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MapPinOff size={42} color={colors.danger} strokeWidth={1.9} />
        </View>
        <View style={{ alignItems: 'center', gap: 12 }}>
          <Text variant="h1" style={{ fontSize: 27 }} center>
            You&apos;re outside the office zone
          </Text>
          <Text color="textSecondary" center style={{ maxWidth: 290, lineHeight: 22 }}>
            Attendo can only record a punch inside the HQ geofence. You are about 2.4 km away.
          </Text>
        </View>
        <Card style={{ width: '100%', gap: space.md }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="bodySm" weight={600} color="textSecondary">
              Your location
            </Text>
            <Text variant="bodySm" weight={700}>
              Indiranagar
            </Text>
          </View>
          <Divider />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text variant="bodySm" weight={600} color="textSecondary">
              Nearest zone
            </Text>
            <Text variant="bodySm" weight={700}>
              HQ · Koramangala
            </Text>
          </View>
        </Card>
      </View>
      <View style={{ gap: space.md, paddingBottom: space.xxl }}>
        <Button label="Retry location" onPress={retryLocation} />
        <Button label="Request remote check-in" variant="secondary" onPress={record} />
      </View>
    </Screen>
  );
}
