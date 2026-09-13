import { useRouter } from 'expo-router';
import { ClipboardList, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, View } from 'react-native';

import { EmptyState, Screen, Text } from '@/components/ui';
import { RequestCard } from '@/features/requests/request-card';
import { useRequestsStore } from '@/stores/requests-store';
import { radius, shadow, space, useTheme } from '@/theme';

type Tab = 'leave' | 'regularization';

export default function RequestsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const requests = useRequestsStore((s) => s.requests);
  const [tab, setTab] = useState<Tab>('leave');

  const leaveRequests = requests.filter((r) => r.kind === 'leave');

  return (
    <Screen scroll={tab === 'leave'} contentContainerStyle={{ flexGrow: 1, gap: space.lg }}>
      <Text variant="h1" style={{ paddingTop: space.sm }}>
        Requests
      </Text>

      <View style={{ flexDirection: 'row', padding: 4, borderRadius: 14, backgroundColor: colors.surfaceAlt }}>
        <SegButton label="Leave" active={tab === 'leave'} onPress={() => setTab('leave')} />
        <SegButton
          label="Regularization"
          active={tab === 'regularization'}
          onPress={() => setTab('regularization')}
        />
      </View>

      {tab === 'leave' ? (
        <View style={{ gap: space.md, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text variant="h3" style={{ fontSize: 15 }}>
              {leaveRequests.length} this quarter
            </Text>
            <Text variant="bodySm" color="textSecondary">
              12 days balance
            </Text>
          </View>
          <View style={{ gap: space.md }}>
            {leaveRequests.map((r) => (
              <RequestCard key={r.id} request={r} />
            ))}
          </View>
        </View>
      ) : (
        <EmptyState
          icon={<ClipboardList size={34} color={colors.textDim} strokeWidth={1.8} />}
          title="No regularizations"
          description="Missed a punch? Raise a regularization and your manager can fix the record."
          actionLabel="New regularization"
          actionVariant="secondary"
          onAction={() => router.push('/modal/new-request')}
        />
      )}

      <Pressable
        onPress={() => router.push('/modal/new-request')}
        style={[
          {
            position: 'absolute',
            right: 0,
            bottom: 24,
            width: 60,
            height: 60,
            borderRadius: radius.buttonSm,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
          },
          shadow.accent,
        ]}>
        <Plus size={26} color={colors.onAccent} strokeWidth={2.4} />
      </Pressable>
    </Screen>
  );
}

function SegButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          flex: 1,
          height: 38,
          borderRadius: 11,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active ? colors.surface : 'transparent',
        },
        active && shadow.soft,
      ]}>
      <Text variant="body" weight={600} color={active ? 'textPrimary' : 'textSecondary'}>
        {label}
      </Text>
    </Pressable>
  );
}
