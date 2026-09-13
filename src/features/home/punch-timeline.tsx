import { format, parseISO } from 'date-fns';
import { View } from 'react-native';

import { Card, Text } from '@/components/ui';
import type { Punch } from '@/data/types';
import { useTheme } from '@/theme';

type Row = {
  key: string;
  dotColor: string;
  title: string;
  subtitle: string;
  time: string;
  muted?: boolean;
};

function punchLabel(punch: Punch, durationMin?: number): { title: string; subtitle: string } {
  switch (punch.type) {
    case 'check_in':
      return { title: 'Checked in', subtitle: punch.method === 'face' ? 'Face recognition' : 'Manual ID' };
    case 'break_start':
      return { title: 'Break started', subtitle: format(parseISO(punch.at), 'HH:mm') };
    case 'break_end':
      return {
        title: `Break${durationMin ? ` · ${durationMin}m` : ''}`,
        subtitle: format(parseISO(punch.at), 'HH:mm'),
      };
    case 'check_out':
      return { title: 'Checked out', subtitle: punch.method === 'face' ? 'Face recognition' : 'Manual ID' };
  }
}

export function PunchTimeline({
  punches,
  pendingCheckoutTime,
}: {
  punches: Punch[];
  pendingCheckoutTime?: string;
}) {
  const { colors } = useTheme();

  const rows: Row[] = [];
  let breakStartAt: string | null = null;

  for (const punch of punches) {
    if (punch.type === 'break_start') {
      breakStartAt = punch.at;
      continue;
    }
    if (punch.type === 'break_end') {
      const durationMin = breakStartAt
        ? Math.round((parseISO(punch.at).getTime() - parseISO(breakStartAt).getTime()) / 60000)
        : undefined;
      const { title, subtitle } = punchLabel(punch, durationMin);
      rows.push({
        key: punch.id,
        dotColor: colors.warning,
        title,
        subtitle,
        time: format(parseISO(punch.at), 'HH:mm'),
      });
      breakStartAt = null;
      continue;
    }
    const { title, subtitle } = punchLabel(punch);
    rows.push({
      key: punch.id,
      dotColor: punch.type === 'check_in' ? colors.success : colors.neutral,
      title,
      subtitle,
      time: format(parseISO(punch.at), 'HH:mm'),
    });
  }

  if (breakStartAt) {
    rows.push({
      key: `${breakStartAt}-ongoing`,
      dotColor: colors.warning,
      title: 'Break',
      subtitle: format(parseISO(breakStartAt), 'HH:mm'),
      time: format(parseISO(breakStartAt), 'HH:mm'),
    });
  }

  if (pendingCheckoutTime) {
    rows.push({
      key: 'pending-checkout',
      dotColor: 'transparent',
      title: 'Check out',
      subtitle: 'Pending',
      time: pendingCheckoutTime,
      muted: true,
    });
  }

  return (
    <Card padding={0} radius={20} style={{ paddingVertical: 20, paddingHorizontal: 22, gap: 2 }}>
      {rows.map((row, i) => (
        <View key={row.key} style={{ flexDirection: 'row', gap: 14 }}>
          <View style={{ alignItems: 'center', width: 14 }}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: row.muted ? colors.surface : row.dotColor,
                borderWidth: row.muted ? 2 : 0,
                borderColor: colors.borderSoft,
              }}
            />
            {i < rows.length - 1 ? (
              <View style={{ flex: 1, width: 2, backgroundColor: colors.surfaceAlt, marginTop: 2 }} />
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingBottom: i < rows.length - 1 ? 20 : 0,
            }}>
            <View style={{ gap: 3 }}>
              <Text variant="body" weight={600} color={row.muted ? 'textTertiary' : 'textPrimary'}>
                {row.title}
              </Text>
              <Text variant="caption" color={row.muted ? 'textDim' : 'textTertiary'}>
                {row.subtitle}
              </Text>
            </View>
            <Text
              variant="body"
              weight={700}
              tabular
              color={row.muted ? 'textDim' : 'textPrimary'}>
              {row.time}
            </Text>
          </View>
        </View>
      ))}
    </Card>
  );
}
