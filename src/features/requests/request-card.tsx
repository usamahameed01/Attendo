import { format, parseISO } from 'date-fns';
import { View } from 'react-native';

import { Card, Pill, Text } from '@/components/ui';
import type { LeaveRequest } from '@/data/types';
import type { Tone } from '@/components/ui/pill';

const statusTone: Record<LeaveRequest['status'], Tone> = {
  pending: 'warning',
  approved: 'success',
  rejected: 'danger',
};

const statusLabel: Record<LeaveRequest['status'], string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

function dateRangeLabel(req: LeaveRequest): string {
  const from = parseISO(req.from);
  const to = parseISO(req.to);
  if (req.from === req.to) return `${format(from, 'd MMM')} · ${req.days} day`;
  return `${format(from, 'd')} – ${format(to, 'd MMM')} · ${req.days} days`;
}

export function RequestCard({ request }: { request: LeaveRequest }) {
  return (
    <Card style={{ gap: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <View style={{ gap: 5, flex: 1 }}>
          <Text variant="h3" style={{ fontSize: 16 }}>
            {request.type}
          </Text>
          <Text variant="bodySm" color="textSecondary" tabular>
            {dateRangeLabel(request)}
          </Text>
        </View>
        <Pill label={statusLabel[request.status]} tone={statusTone[request.status]} dot />
      </View>
      {request.reason ? (
        <Text variant="bodySm" color="textSecondary" style={{ lineHeight: 20 }}>
          {request.reason}
        </Text>
      ) : null}
      {request.status === 'pending' ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 2 }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor: '#F0F0F4',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text variant="caption" weight={700} color="textSecondary" style={{ fontSize: 10 }}>
              {request.managerName
                .split(' ')
                .map((p) => p[0])
                .join('')}
            </Text>
          </View>
          <Text variant="caption" color="textTertiary">
            With {request.managerName} · sent {format(parseISO(request.submittedAt), 'd MMM')}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}
