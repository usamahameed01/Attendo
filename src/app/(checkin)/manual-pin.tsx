import * as Haptics from 'expo-haptics';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Delete } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';

import { NavBackButton } from '@/components/nav-back-button';
import { Card, Screen, Text } from '@/components/ui';
import { seedPin, seedUser } from '@/data/seed';
import { radius, space, useTheme } from '@/theme';

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'face', '0', 'back'] as const;

export default function ManualPinScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { action = 'check_in', forced } = useLocalSearchParams<{
    action?: 'check_in' | 'check_out';
    forced?: string;
  }>();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (pin.length < 4) return;
    const id = setTimeout(() => {
      if (pin === seedPin) {
        setPin('');
        router.push({ pathname: '/(checkin)/confirm', params: { action } });
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        setError(true);
        setPin('');
        setTimeout(() => setError(false), 600);
      }
    }, 150);
    return () => clearTimeout(id);
  }, [pin, action, router]);

  function press(key: (typeof KEYS)[number]) {
    if (key === 'back') {
      setPin((p) => p.slice(0, -1));
    } else if (key === 'face') {
      if (!forced) router.replace({ pathname: '/(checkin)/face-scan', params: { action } });
    } else if (pin.length < 4) {
      setPin((p) => p + key);
    }
  }

  return (
    <Screen contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, paddingTop: space.sm }}>
        <NavBackButton />
        <Text variant="h3" style={{ fontSize: 16 }}>
          {action === 'check_out' ? 'Manual check-out' : 'Manual check-in'}
        </Text>
      </View>

      <View style={{ alignItems: 'center', gap: space.xl, paddingTop: space.xxl }}>
        <Card
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ gap: 4 }}>
            <Text variant="overlineSm" color="textTertiary" uppercase>
              Employee ID
            </Text>
            <Text variant="h3" style={{ letterSpacing: 0.4 }}>
              {seedUser.id}
            </Text>
          </View>
          <Text variant="bodySm" weight={600} color="accentText">
            Change
          </Text>
        </Card>

        <View style={{ alignItems: 'center', gap: 14, paddingTop: 6 }}>
          <Text color="textSecondary">Enter your 4-digit PIN</Text>
          <View style={{ flexDirection: 'row', gap: 18 }}>
            {[0, 1, 2, 3].map((i) => (
              <View
                key={i}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: i < pin.length ? (error ? colors.danger : colors.accent) : colors.surface,
                  borderWidth: i < pin.length ? 0 : 1.5,
                  borderColor: colors.border,
                }}
              />
            ))}
          </View>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 14,
          paddingBottom: space.xxl,
        }}>
        {KEYS.map((key) => (
          <Pressable
            key={key}
            onPress={() => press(key)}
            style={{
              width: '31%',
              height: 66,
              borderRadius: radius.button,
              backgroundColor: key === 'face' || key === 'back' ? 'transparent' : colors.surface,
              borderWidth: key === 'face' || key === 'back' ? 0 : 1,
              borderColor: colors.borderSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {key === 'back' ? (
              <Delete size={26} color={colors.textSecondary} strokeWidth={1.9} />
            ) : key === 'face' ? (
              !forced && (
                <Text variant="body" weight={600} color="textSecondary">
                  Face ID
                </Text>
              )
            ) : (
              <Text weight={600} style={{ fontSize: 27 }}>
                {key}
              </Text>
            )}
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}
