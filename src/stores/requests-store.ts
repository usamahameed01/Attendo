import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { seedLeaveRequests, seedManagerPendingRequest } from '@/data/seed';
import type { LeaveRequest, RequestKind } from '@/data/types';

import { persistStorage } from './persist-storage';

type NewRequestInput = {
  kind: RequestKind;
  type: string;
  from: string;
  to: string;
  days: number;
  reason?: string;
  managerName: string;
};

type RequestsState = {
  requests: LeaveRequest[];
  managerApprovals: LeaveRequest[];
  addRequest: (input: NewRequestInput) => void;
  approve: (id: string) => void;
  reject: (id: string) => void;
};

export const useRequestsStore = create<RequestsState>()(
  persist(
    (set) => ({
      requests: seedLeaveRequests,
      managerApprovals: [seedManagerPendingRequest],

      addRequest: (input) => {
        const request: LeaveRequest = {
          id: `req-${Date.now()}`,
          status: 'pending',
          submittedAt: new Date().toISOString(),
          ...input,
        };
        set((s) => ({ requests: [request, ...s.requests] }));
      },

      approve: (id) => {
        set((s) => ({
          managerApprovals: s.managerApprovals.map((r) =>
            r.id === id ? { ...r, status: 'approved' } : r,
          ),
        }));
      },

      reject: (id) => {
        set((s) => ({
          managerApprovals: s.managerApprovals.map((r) =>
            r.id === id ? { ...r, status: 'rejected' } : r,
          ),
        }));
      },
    }),
    {
      name: 'attendo.requests',
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);
