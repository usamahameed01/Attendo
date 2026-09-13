import { useRouter } from 'expo-router';
import { IdCard, ScanFace } from 'lucide-react-native';
import { View } from 'react-native';

import { Button, Screen, Text } from '@/components/ui';
import { seedUser } from '@/data/seed';
import { useSettingsStore, type CheckinMethod } from '@/stores/settings-store';
import { radius, shadow, space, useTheme } from '@/theme';

export default function MethodScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const setCheckinMethod = useSettingsStore((s) => s.setCheckinMethod);

  function choose(method: CheckinMethod) {
    setCheckinMethod(method);
    router.push('/permissions');
  }

  return (
    <Screen contentContainerStyle={{ paddingTop: space.lg, flexGrow: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: colors.accentSoft,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text weight={700} color="accentText">
            {seedUser.initials}
          </Text>
        </View>
        <View>
          <Text variant="h3">{seedUser.name}</Text>
          <Text variant="bodySm" color="textSecondary">
            {seedUser.id} · {seedUser.department}
          </Text>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <View style={{ gap: space.lg, paddingBottom: space.xxl }}>
        <View style={{ gap: 6 }}>
          <Text variant="h1" style={{ fontSize: 27, lineHeight: 32 }}>
            How do you want to check in?
          </Text>
          <Text color="textSecondary">You can change this any time in Profile.</Text>
        </View>

        <View
          style={[
            {
              borderRadius: radius.card,
              padding: space.xxl,
              backgroundColor: colors.accent,
              gap: space.lg,
            },
            shadow.accent,
          ]}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: radius.buttonSm,
              backgroundColor: 'rgba(255,255,255,0.18)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <ScanFace size={26} color="#fff" strokeWidth={1.9} />
          </View>
          <View style={{ gap: 5 }}>
            <Text variant="h3" style={{ fontSize: 20 }} color="onAccent">
              Face recognition
            </Text>
            <Text variant="body" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Fastest. Roughly two seconds, hands free.
            </Text>
          </View>
          <Button label="Use face" variant="secondary" onPress={() => choose('face')} />
        </View>

        <View
          style={{
            borderRadius: radius.card,
            padding: space.xxl,
            backgroundColor: colors.surface,
            borderWidth: 1.5,
            borderColor: colors.border,
            gap: space.lg,
          }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: radius.buttonSm,
              backgroundColor: colors.surfaceAlt,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <IdCard size={26} color={colors.textPrimary} strokeWidth={1.9} />
          </View>
          <View style={{ gap: 5 }}>
            <Text variant="h3" style={{ fontSize: 20 }}>
              Manual ID entry
            </Text>
            <Text color="textSecondary">Employee ID and 4-digit PIN.</Text>
          </View>
          <Button label="Enter ID" variant="secondary" onPress={() => choose('manual')} />
        </View>
      </View>
    </Screen>
  );
}
