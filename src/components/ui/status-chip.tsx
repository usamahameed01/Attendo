import type { StyleProp, ViewStyle } from 'react-native';

import { Pill, type Tone } from './pill';

export type AttendanceStatus =
  | 'checked-in'
  | 'on-break'
  | 'late'
  | 'absent'
  | 'checked-out'
  | 'pending'
  | 'approved'
  | 'rejected';

const statusPresets: Record<AttendanceStatus, { tone: Tone; label: string }> = {
  'checked-in': { tone: 'success', label: 'Checked in' },
  'on-break': { tone: 'warning', label: 'On break' },
  late: { tone: 'warning', label: 'Late' },
  absent: { tone: 'danger', label: 'Absent' },
  'checked-out': { tone: 'neutral', label: 'Checked out' },
  pending: { tone: 'warning', label: 'Pending' },
  approved: { tone: 'success', label: 'Approved' },
  rejected: { tone: 'danger', label: 'Rejected' },
};

export function StatusChip({
  status,
  label,
  style,
}: {
  status: AttendanceStatus;
  label?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const preset = statusPresets[status];
  return <Pill label={label ?? preset.label} tone={preset.tone} dot style={style} />;
}
