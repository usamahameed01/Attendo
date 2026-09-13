import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Camera, MapPin } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Card, Screen, Text } from '@/components/ui';
import { useAuthStore } from '@/stores/auth-store';
import { radius, space, useTheme } from '@/theme';

export default function PermissionsScreen() {
  const { colors } = useTheme();
  const completeOnboarding = useAuthStore((s) => s.completeOnboarding);
  const [, requestCamera] = useCameraPermissions();

  async function allowBoth() {
    try {
      await requestCamera();
      await Location.requestForegroundPermissionsAsync();
    } finally {
      completeOnboarding();
    }
  }

  return (
    <Screen contentContainerStyle={{ paddingTop: space.xxl, flexGrow: 1 }}>
      <View style={{ gap: 12 }}>
        <Text variant="h1" style={{ fontSize: 28, lineHeight: 34, maxWidth: 280 }}>
          Two permissions and you&apos;re set
        </Text>
        <Text color="textSecondary" style={{ lineHeight: 24 }}>
          Attendo only uses these while you are punching in or out. Nothing runs in the background.
        </Text>
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ gap: space.md, paddingBottom: space.xxl }}>
        <Card style={{ flexDirection: 'row', gap: space.lg, alignItems: 'flex-start' }}>
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: radius.buttonSm,
              backgroundColor: colors.accentSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Camera size={23} color={colors.accent} strokeWidth={1.9} />
          </View>
          <View style={{ flex: 1, gap: 5 }}>
            <Text variant="h3">Camera</Text>
            <Text variant="body" color="textSecondary">
              To match your face at check-in. Images never leave your device.
            </Text>
          </View>
        </Card>
        <Card style={{ flexDirection: 'row', gap: space.lg, alignItems: 'flex-start' }}>
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: radius.buttonSm,
              backgroundColor: colors.accentSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <MapPin size={23} color={colors.accent} strokeWidth={1.9} />
          </View>
          <View style={{ flex: 1, gap: 5 }}>
            <Text variant="h3">Location</Text>
            <Text variant="body" color="textSecondary">
              To confirm you are inside the office geofence.
            </Text>
          </View>
        </Card>
        <Button label="Allow both" onPress={allowBoth} style={{ marginTop: 6 }} />
        <Button
          label="Not now"
          variant="ghost"
          textColor="textSecondary"
          onPress={completeOnboarding}
        />
      </View>
    </Screen>
  );
}
