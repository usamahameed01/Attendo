import { useRouter } from 'expo-router';
import {
  Bell,
  ChevronRight,
  CircleHelp,
  KeyRound,
  LogOut,
  ScanFace,
  Users,
} from 'lucide-react-native';
import { Pressable, Switch, View } from 'react-native';

import { ThemeModeSwitch } from '@/components/theme-mode-switch';
import { Card, Divider, Pill, Screen, Text } from '@/components/ui';
import { useAttendanceStore } from '@/stores/attendance-store';
import { useAuthStore } from '@/stores/auth-store';
import { useSettingsStore } from '@/stores/settings-store';
import { space, useTheme } from '@/theme';

export default function ProfileScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const faceEnrolled = useAuthStore((s) => s.faceEnrolled);
  const logOut = useAuthStore((s) => s.logOut);
  const notificationsEnabled = useSettingsStore((s) => s.notificationsEnabled);
  const setNotificationsEnabled = useSettingsStore((s) => s.setNotificationsEnabled);
  const devForceOffline = useSettingsStore((s) => s.devForceOffline);
  const setDevForceOffline = useSettingsStore((s) => s.setDevForceOffline);
  const devForceOutsideGeofence = useSettingsStore((s) => s.devForceOutsideGeofence);
  const setDevForceOutsideGeofence = useSettingsStore((s) => s.setDevForceOutsideGeofence);
  const status = useAttendanceStore((s) => s.status);

  return (
    <Screen scroll contentContainerStyle={{ gap: space.lg }}>
      <Text variant="h1" style={{ paddingTop: space.sm }}>
        Profile
      </Text>

      <Card style={{ gap: space.xl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View
            style={{
              width: 66,
              height: 66,
              borderRadius: 33,
              backgroundColor: colors.accentSoft,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text variant="h2" color="accentText">
              {user.initials}
            </Text>
          </View>
          <View style={{ gap: 5 }}>
            <Text variant="h3" style={{ fontSize: 20 }}>
              {user.name}
            </Text>
            <Text variant="bodySm" color="textSecondary">
              {user.id} · {user.title}
            </Text>
            {faceEnrolled ? (
              <Pill label="Face enrolled" tone="success" dot style={{ marginTop: 2 }} />
            ) : null}
          </View>
        </View>
        <Divider />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, gap: 5 }}>
            <Text variant="overlineSm" color="textTertiary" uppercase>
              Shift
            </Text>
            <Text variant="bodyLg" weight={700} tabular>
              {user.shiftLabel} · {user.shiftStart}–{user.shiftEnd}
            </Text>
          </View>
          <View style={{ gap: 5, alignItems: 'flex-end' }}>
            <Text variant="overlineSm" color="textTertiary" uppercase>
              Manager
            </Text>
            <Text variant="bodyLg" weight={700}>
              {user.managerName}
            </Text>
          </View>
        </View>
      </Card>

      {user.role === 'manager' ? (
        <Pressable onPress={() => router.push('/(app)/manager')}>
          <Card
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: space.md,
              backgroundColor: colors.accent,
            }}
            elevation="accent">
            <Users size={20} color={colors.onAccent} strokeWidth={1.9} />
            <Text variant="body" weight={600} color="onAccent" style={{ flex: 1 }}>
              Manager view · Design team
            </Text>
            <ChevronRight size={18} color={colors.onAccent} strokeWidth={2.2} />
          </Card>
        </Pressable>
      ) : null}

      <Card padding={0} radius={20} style={{ overflow: 'hidden' }}>
        <SettingsRow
          icon={<ScanFace size={20} color={colors.accent} strokeWidth={1.9} />}
          label="Face data"
          trailing={
            <>
              <Text variant="bodySm" color="textTertiary">
                Manage
              </Text>
              <ChevronRight size={16} color={colors.textDim} strokeWidth={2.4} />
            </>
          }
          onPress={() => router.push('/(enroll)/capture')}
        />
        <Divider style={{ marginLeft: 54 }} />
        <SettingsRow
          icon={<Bell size={20} color={colors.accent} strokeWidth={1.9} />}
          label="Notifications"
          trailing={
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ true: colors.accent, false: colors.border }}
            />
          }
        />
        <Divider style={{ marginLeft: 54 }} />
        <SettingsRow
          icon={<KeyRound size={20} color={colors.accent} strokeWidth={1.9} />}
          label="Change PIN"
          trailing={<ChevronRight size={16} color={colors.textDim} strokeWidth={2.4} />}
        />
        <Divider style={{ marginLeft: 54 }} />
        <SettingsRow
          icon={<CircleHelp size={20} color={colors.accent} strokeWidth={1.9} />}
          label="Help & support"
          trailing={<ChevronRight size={16} color={colors.textDim} strokeWidth={2.4} />}
        />
      </Card>

      <View style={{ gap: space.sm }}>
        <Text variant="overline" color="textTertiary" uppercase style={{ paddingLeft: 4 }}>
          Appearance
        </Text>
        <ThemeModeSwitch />
      </View>

      <View style={{ gap: space.sm }}>
        <Text variant="overline" color="textTertiary" uppercase style={{ paddingLeft: 4 }}>
          Developer
        </Text>
        <Card padding={0} radius={20} style={{ overflow: 'hidden' }}>
          <SettingsRow
            label="Force offline"
            trailing={
              <Switch
                value={devForceOffline}
                onValueChange={setDevForceOffline}
                trackColor={{ true: colors.warning, false: colors.border }}
              />
            }
          />
          <Divider style={{ marginLeft: 20 }} />
          <SettingsRow
            label="Force outside geofence"
            trailing={
              <Switch
                value={devForceOutsideGeofence}
                onValueChange={setDevForceOutsideGeofence}
                trackColor={{ true: colors.warning, false: colors.border }}
              />
            }
          />
        </Card>
        {status !== 'checked_out' ? (
          <Text variant="caption" color="textTertiary">
            Currently {status.replace('_', ' ')} · dev toggles apply to your next check-in attempt.
          </Text>
        ) : null}
      </View>

      <Pressable onPress={logOut}>
        <Card
          radius={20}
          style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
          <LogOut size={20} color={colors.danger} strokeWidth={1.9} />
          <Text variant="body" weight={600} color="danger">
            Log out
          </Text>
        </Card>
      </Pressable>

      <Text variant="caption" color="textDim" center>
        Attendo v2.4.0 · {user.orgName}
      </Text>
    </Screen>
  );
}

function SettingsRow({
  icon,
  label,
  trailing,
  onPress,
}: {
  icon?: React.ReactNode;
  label: string;
  trailing?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        paddingVertical: 17,
        paddingHorizontal: 20,
      }}>
      {icon}
      <Text variant="bodyLg" weight={600} style={{ flex: 1 }}>
        {label}
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>{trailing}</View>
    </Pressable>
  );
}
