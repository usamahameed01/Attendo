export type EmployeeRole = 'employee' | 'manager';

export type User = {
  id: string;
  name: string;
  initials: string;
  email: string;
  department: string;
  title: string;
  orgCode: string;
  orgName: string;
  managerName: string;
  shiftLabel: string;
  shiftStart: string;
  shiftEnd: string;
  role: EmployeeRole;
};

export type PunchType = 'check_in' | 'break_start' | 'break_end' | 'check_out';
export type PunchMethod = 'face' | 'manual';

export type Punch = {
  id: string;
  type: PunchType;
  method: PunchMethod;
  at: string;
  queued?: boolean;
};

export type AttendanceStatusValue = 'checked_out' | 'checked_in' | 'on_break';

export type DayAttendanceStatus = 'present' | 'late' | 'absent' | 'leave' | 'weekend';

export type DaySummary = {
  date: string;
  status: DayAttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  totalMinutes?: number;
  lateMinutes?: number;
};

export type RequestKind = 'leave' | 'regularization';
export type RequestStatus = 'pending' | 'approved' | 'rejected';

export type LeaveRequest = {
  id: string;
  kind: RequestKind;
  type: string;
  from: string;
  to: string;
  days: number;
  reason?: string;
  status: RequestStatus;
  managerName: string;
  submittedAt: string;
};

export type TeamMemberStatus = 'in' | 'break' | 'late' | 'leave' | 'absent';

export type TeamMember = {
  id: string;
  name: string;
  initials: string;
  status: TeamMemberStatus;
  detail: string;
};
