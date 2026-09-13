import { Bell, ChevronDown, LogOut } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Logo } from '@/components/logo';
import { ThemeModeSwitch } from '@/components/theme-mode-switch';
import {
  Button,
  Card,
  Divider,
  IconButton,
  Pill,
  Screen,
  Sheet,
  StatTile,
  StatusChip,
  Text,
  Toast,
} from '@/components/ui';
import { radius, space, useTheme } from '@/theme';

export default function ComponentsScreen() {
  const { colors } = useTheme();

  return (
    <Screen scroll contentContainerStyle={{ gap: space.xxl, paddingTop: space.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: radius.buttonSm,
            backgroundColor: colors.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Logo size={30} />
        </View>
        <Text variant="h1" style={{ flex: 1 }}>
          Components
        </Text>
        <IconButton>
          <Bell size={20} color={colors.textPrimary} strokeWidth={1.9} />
        </IconButton>
      </View>

      <ThemeModeSwitch />

      <Section title="Buttons">
        <Button label="Primary" />
        <Button label="Secondary" variant="secondary" />
        <Button label="Disabled" variant="secondary" disabled />
        <Button label="Check out" icon={<LogOut size={20} color={colors.onAccent} strokeWidth={2.2} />} />
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <Button label="Approve" variant="approve" style={{ flex: 1 }} />
          <Button label="Reject" variant="reject" style={{ flex: 1 }} />
        </View>
        <Button label="Use manual entry instead" variant="ghost" />
      </Section>

      <Section title="Status chips">
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
          <StatusChip status="checked-in" />
          <StatusChip status="on-break" />
          <StatusChip status="late" label="Late 34m" />
          <StatusChip status="absent" />
          <StatusChip status="checked-out" />
          <StatusChip status="pending" />
          <Pill label="Inside HQ · Bengaluru" tone="accent" dot />
        </View>
      </Section>

      <Section title="Stat tiles">
        <View style={{ flexDirection: 'row', gap: space.md }}>
          <StatTile label="Present" value={11} tone="success" style={{ flex: 1 }} />
          <StatTile label="Late" value={3} tone="warning" style={{ flex: 1 }} />
        </View>
      </Section>

      <Section title="Live-timer hero card">
        <Card padding={24} style={{ gap: space.xl }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <StatusChip status="checked-in" />
            <Text variant="bodySm" color="textTertiary">
              Since 09:02 AM
            </Text>
          </View>
          <View style={{ gap: 6 }}>
            <Text variant="timer" tabular>
              06:12:44
            </Text>
            <Text color="textSecondary">Hours worked today</Text>
          </View>
          <Divider />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, gap: 5 }}>
              <Text variant="overlineSm" color="textTertiary" uppercase>
                Shift
              </Text>
              <Text variant="bodyLg" weight={700} tabular>
                09:00 – 18:00
              </Text>
            </View>
            <View style={{ flex: 1, gap: 5 }}>
              <Text variant="overlineSm" color="textTertiary" uppercase>
                Break used
              </Text>
              <Text variant="bodyLg" weight={700} tabular>
                42m of 60m
              </Text>
            </View>
          </View>
        </Card>
      </Section>

      <Section title="List card">
        <Card
          padding={18}
          radius={radius.cardSm}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space.md }}>
            <View
              style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success }}
            />
            <View style={{ gap: 3 }}>
              <Text variant="bodyLg" weight={700}>
                Mon, 17 Aug
              </Text>
              <Text variant="caption" color="textSecondary" tabular>
                08:58 in · 18:04 out
              </Text>
            </View>
          </View>
          <Text variant="bodyLg" weight={700} tabular>
            8h 24m
          </Text>
        </Card>
      </Section>

      <Section title="Success toast">
        <Toast message="Checked in at 09:02" actionLabel="Undo" />
      </Section>

      <Section title="Bottom sheet">
        <Sheet title="Sheet title">
          <View
            style={{
              height: 52,
              borderRadius: radius.input,
              backgroundColor: colors.surface,
              borderWidth: 1.5,
              borderColor: colors.border,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: space.lg,
            }}>
            <Text variant="bodyLg" weight={600}>
              Dropdown value
            </Text>
            <ChevronDown size={16} color={colors.textSecondary} strokeWidth={2.4} />
          </View>
          <Button label="Confirm" size="md" />
        </Sheet>
      </Section>
    </Screen>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={{ gap: space.md }}>
      <Text variant="sectionLabel" color="textSecondary" uppercase>
        {title}
      </Text>
      {children}
    </View>
  );
}
