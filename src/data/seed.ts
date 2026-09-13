import type { LeaveRequest, TeamMember, User } from './types';

export const seedUser: User = {
  id: 'EMP-2481',
  name: 'Priya Nair',
  initials: 'PN',
  email: 'priya.n@nexora.com',
  department: 'Product Design',
  title: 'Product Designer',
  orgCode: 'NXR-4821',
  orgName: 'Nexora Labs',
  managerName: 'R. Menon',
  shiftLabel: 'General',
  shiftStart: '09:00',
  shiftEnd: '18:00',
  role: 'manager',
};

export const seedPin = '1234';

export const seedLeaveRequests: LeaveRequest[] = [
  {
    id: 'req-1',
    kind: 'leave',
    type: 'Casual leave',
    from: '2026-09-02',
    to: '2026-09-03',
    days: 2,
    reason: 'Family function out of town. Handover shared with Arjun.',
    status: 'pending',
    managerName: 'Rahul Menon',
    submittedAt: '2026-08-31T10:00:00.000Z',
  },
  {
    id: 'req-2',
    kind: 'leave',
    type: 'Sick leave',
    from: '2026-08-13',
    to: '2026-08-13',
    days: 1,
    status: 'approved',
    managerName: 'Rahul Menon',
    submittedAt: '2026-08-12T09:00:00.000Z',
  },
  {
    id: 'req-3',
    kind: 'leave',
    type: 'Earned leave',
    from: '2026-07-21',
    to: '2026-07-25',
    days: 5,
    status: 'rejected',
    managerName: 'Rahul Menon',
    submittedAt: '2026-07-10T09:00:00.000Z',
  },
];

export const seedTeam: TeamMember[] = [
  { id: 'EMP-2481', name: 'Priya Nair', initials: 'PN', status: 'in', detail: 'In 09:02 · 6h 12m' },
  { id: 'EMP-3310', name: 'Arjun Kamath', initials: 'AK', status: 'break', detail: 'Break since 13:40' },
  { id: 'EMP-3117', name: 'Sneha Varma', initials: 'SV', status: 'late', detail: 'In 09:48 · late 48m' },
  { id: 'EMP-2984', name: 'Dev Malhotra', initials: 'DM', status: 'leave', detail: 'Casual leave' },
];

export const seedManagerPendingRequest: LeaveRequest = {
  id: 'mgr-req-1',
  kind: 'leave',
  type: 'Casual leave',
  from: '2026-09-02',
  to: '2026-09-03',
  days: 2,
  status: 'pending',
  managerName: 'Rahul Menon',
  submittedAt: '2026-08-31T10:00:00.000Z',
};

export const teamHeadcount = 14;
export const teamStats = { present: 11, absent: 1, onLeave: 2, late: 3 };
