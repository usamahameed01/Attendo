import { format } from 'date-fns';
import * as Haptics from 'expo-haptics';
import { View } from 'react-native';

import { NavBackButton } from '@/components/nav-back-button';
import { Button, Card, Pill, Screen, StatTile, Text } from '@/components/ui';
import { teamHeadcount } from '@/data/seed';
import type { TeamMemberStatus } from '@/data/types';
import { useRequestsStore } from '@/stores/requests-store';
import { useTeamStore } from '@/stores/team-store';
import { space, useTheme } from '@/theme';

const statusPill: Record<TeamMemberStatus, { label: string; tone: 'success' | 'warning' | 'neutral' }> = {
  in: { label: 'In', tone: 'success' },
  break: { label: 'Break', tone: 'warning' },
  late: { label: 'Late', tone: 'warning' },
  leave: { label: 'Leave', tone: 'neutral' },
  absent: { label: 'Absent', tone: 'neutral' },
};

export default function ManagerScreen() {
  const { colors } = useTheme();
  const { roster, stats } = useTeamStore();
  const managerApprovals = useRequestsStore((s) => s.managerApprovals);
  const approve = useRequestsStore((s) => s.approve);
  const reject = useRequestsStore((s) => s.reject);

  const pending = managerApprovals.filter((r) => r.status === 'pending');

  function handleApprove(id: string) {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    approve(id);
  }

  function handleReject(id: string) {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    reject(id);
  }

  return (
    <Screen scroll contentContainerStyle={{ gap: space.lg }}>
      <View style={{ paddingTop: space.sm }}>
        <NavBackButton />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ gap: 4 }}>
          <Text variant="h1">Design team</Text>
          <Text variant="bodySm" color="textSecondary">
            {format(new Date(), 'EEE, d MMM')} · {teamHeadcount} people
          </Text>
        </View>
        <Pill label="Manager" tone="accent" />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space.md }}>
        <StatTile label="Present" value={stats.present} tone="success" style={{ width: '47%' }} />
        <StatTile label="Absent" value={stats.absent} tone="danger" style={{ width: '47%' }} />
        <StatTile label="On leave" value={stats.onLeave} tone="neutral" style={{ width: '47%' }} />
        <StatTile label="Late" value={stats.late} tone="warning" style={{ width: '47%' }} />
      </View>

      <View style={{ gap: space.md }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text variant="h3" style={{ fontSize: 15 }}>
            Who&apos;s in
          </Text>
          <Text variant="bodySm" weight={600} color="accentText">
            See all
          </Text>
        </View>
        <Card padding={0} radius={20} style={{ overflow: 'hidden' }}>
          {roster.map((member, i) => (
            <View key={member.id}>
              {i > 0 ? (
                <View style={{ height: 1, backgroundColor: colors.divider, marginLeft: 69 }} />
              ) : null}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 13,
                  paddingVertical: 14,
                  paddingHorizontal: 18,
                }}>
                <View
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 19,
                    backgroundColor: colors.surfaceAlt,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text variant="bodySm" weight={700} color="textSecondary">
                    {member.initials}
                  </Text>
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text variant="body" weight={600}>
                    {member.name}
                  </Text>
                  <Text variant="caption" color="textTertiary" tabular>
                    {member.detail}
                  </Text>
                </View>
                <Pill
                  label={statusPill[member.status].label}
                  tone={statusPill[member.status].tone}
                />
              </View>
            </View>
          ))}
        </Card>
      </View>

      {pending.length > 0 ? (
        <View style={{ gap: space.md }}>
          <Text variant="h3" style={{ fontSize: 15 }}>
            Pending approvals · {pending.length}
          </Text>
          {pending.map((req) => (
            <Card key={req.id} style={{ gap: space.md }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <View
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: colors.accentSoft,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text variant="caption" weight={700} color="accentText">
                    PN
                  </Text>
                </View>
                <View style={{ flex: 1, gap: 2 }}>
                  <Text variant="body" weight={600}>
                    Priya · {req.type}
                  </Text>
                  <Text variant="caption" color="textTertiary" tabular>
                    {req.from === req.to ? req.from : `${req.from} – ${req.to}`} · {req.days} days
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: 'row', gap: 10 }}>
                <Button label="Approve" variant="approve" style={{ flex: 1 }} onPress={() => handleApprove(req.id)} />
                <Button label="Reject" variant="reject" style={{ flex: 1 }} onPress={() => handleReject(req.id)} />
              </View>
            </Card>
          ))}
        </View>
      ) : null}
    </Screen>
  );
}
