import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { Check } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Card, Divider, Screen, Text } from '@/components/ui';
import { useAuthStore } from '@/stores/auth-store';
import { radius, space, useTheme } from '@/theme';

export default function EnrollConfirmScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const setFaceEnrolled = useAuthStore((s) => s.setFaceEnrolled);

  function finish() {
    setFaceEnrolled(true);
    router.back();
  }

  return (
    <Screen contentContainerStyle={{ paddingTop: space.xxl, flexGrow: 1 }}>
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: radius.buttonSm,
          backgroundColor: colors.successSoft,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Check size={26} color={colors.success} strokeWidth={2.4} />
      </View>
      <Text variant="h1" style={{ fontSize: 27, marginTop: space.md }}>
        All three captures look good
      </Text>
      <Text color="textSecondary" style={{ marginTop: 6, lineHeight: 23 }}>
        Your face template is stored encrypted on this device. Photos are not uploaded.
      </Text>

      <View style={{ flexDirection: 'row', gap: space.md, marginTop: space.xxl }}>
        {['Front', 'Left', 'Right'].map((label) => (
          <View key={label} style={{ flex: 1, alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: '100%',
                aspectRatio: 1,
                borderRadius: radius.buttonSm,
                backgroundColor: colors.surfaceAlt,
                borderWidth: 1.5,
                borderColor: colors.border,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text variant="caption" weight={600} color="textTertiary">
                {label}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.success }} />
              <Text variant="caption" weight={600} color="successText">
                Sharp
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Card style={{ marginTop: space.xxl, gap: space.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="body" weight={600} color="textSecondary">
            Stored on device
          </Text>
          <Text variant="body" weight={700}>
            3 templates
          </Text>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text variant="body" weight={600} color="textSecondary">
            Enrolled by
          </Text>
          <Text variant="body" weight={700}>
            You · {format(new Date(), 'd MMM')}
          </Text>
        </View>
      </Card>

      <View style={{ flex: 1 }} />

      <View style={{ gap: space.md, paddingBottom: space.xxl }}>
        <Button label="Finish enrollment" onPress={finish} />
        <Button
          label="Retake all"
          variant="secondary"
          onPress={() => router.replace('/(enroll)/capture')}
        />
      </View>
    </Screen>
  );
}
