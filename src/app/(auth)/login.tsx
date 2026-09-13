import { useRouter } from 'expo-router';
import { QrCode } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { Logo } from '@/components/logo';
import { Button, Card, Screen, Text } from '@/components/ui';
import { seedUser } from '@/data/seed';
import { radius, shadow, space, useTheme } from '@/theme';

export default function LoginScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const [orgCode] = useState(seedUser.orgCode);
  const [email] = useState(seedUser.email);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <Screen scroll contentContainerStyle={{ paddingTop: space.lg, gap: space.xxl, flexGrow: 1 }}>
      <View style={{ gap: 10 }}>
        <View
          style={[
            {
              width: 56,
              height: 56,
              borderRadius: radius.buttonSm,
              backgroundColor: colors.surface,
              alignItems: 'center',
              justifyContent: 'center',
            },
            shadow.soft,
          ]}>
          <Logo size={36} />
        </View>
        <Text variant="h1" style={{ fontSize: 30, lineHeight: 36, marginTop: 14 }}>
          Sign in
        </Text>
        <Text color="textSecondary">Use the organization code your admin shared with you.</Text>
      </View>

      <Card style={{ gap: space.lg }}>
        <Field label="Organization code" value={orgCode} letterSpacing={2.5} />
        <Field label="Work email" value={email} focused />
        <View style={{ gap: 8 }}>
          <Text variant="overline" color="textSecondary" uppercase>
            Password
          </Text>
          <View
            style={{
              height: 52,
              borderRadius: radius.input,
              borderWidth: 1.5,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 16,
            }}>
            <Text weight={600} style={{ fontSize: 18, letterSpacing: 3.5 }}>
              {showPassword ? 'nexora123' : '••••••••'}
            </Text>
            <Pressable onPress={() => setShowPassword((v) => !v)}>
              <Text variant="bodySm" weight={600} color="accentText">
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Pressable
            onPress={() => setRememberMe((v) => !v)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 6,
                backgroundColor: rememberMe ? colors.accent : colors.surface,
                borderWidth: rememberMe ? 0 : 1.5,
                borderColor: colors.border,
              }}
            />
            <Text variant="bodySm" weight={500}>
              Remember me
            </Text>
          </Pressable>
          <Text variant="bodySm" weight={600} color="accentText">
            Forgot password?
          </Text>
        </View>
      </Card>

      <View style={{ flex: 1 }} />

      <View style={{ gap: space.md, paddingBottom: space.xxl }}>
        <Button label="Sign in" onPress={() => router.push('/method')} />
        <Button
          label="Scan org QR code"
          variant="secondary"
          icon={<QrCode size={18} color={colors.accent} strokeWidth={2} />}
        />
      </View>
    </Screen>
  );
}

function Field({
  label,
  value,
  focused,
  letterSpacing,
}: {
  label: string;
  value: string;
  focused?: boolean;
  letterSpacing?: number;
}) {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <Text variant="overline" color="textSecondary" uppercase>
        {label}
      </Text>
      <View
        style={{
          height: 52,
          borderRadius: radius.input,
          borderWidth: 1.5,
          borderColor: focused ? colors.accent : colors.border,
          justifyContent: 'center',
          paddingHorizontal: 16,
        }}>
        <Text weight={600} style={{ fontSize: 16, letterSpacing }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
