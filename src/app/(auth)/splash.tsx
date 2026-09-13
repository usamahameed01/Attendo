import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

import { Logo } from '@/components/logo';
import { Screen, Text } from '@/components/ui';
import { radius, shadow, space, useTheme } from '@/theme';

export default function SplashScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => router.replace('/login'), 1400);
    return () => clearTimeout(id);
  }, [router]);

  return (
    <Screen contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: space.xxl }}>
        <View
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: radius.cardSm,
              backgroundColor: colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            },
            shadow.card,
          ]}>
          <Logo size={64} />
        </View>
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Text variant="display" style={{ fontSize: 40, lineHeight: 40 }}>
            Attendo
          </Text>
          <Text color="textSecondary" center>
            Attendance that takes one look.
          </Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', gap: space.lg, paddingBottom: space.xxl * 2 }}>
        <ActivityIndicator color={colors.accent} />
        <Text variant="bodySm" color="textTertiary">
          Nexora Labs · v2.4.0
        </Text>
      </View>
    </Screen>
  );
}
