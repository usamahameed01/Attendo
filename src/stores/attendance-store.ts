import { differenceInMinutes, format, isSameDay, parseISO } from 'date-fns';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { generateHistory } from '@/data/generate-history';
import type { AttendanceStatusValue, DaySummary, Punch, PunchMethod } from '@/data/types';

import { persistStorage } from './persist-storage';

export const BREAK_ALLOWANCE_MIN = 60;

type AttendanceState = {
  status: AttendanceStatusValue;
  todayDate: string;
  todayPunches: Punch[];
  checkedInAt: string | null;
  breakStartedAt: string | null;
  breakAccumulatedMin: number;
  history: DaySummary[];
  checkIn: (method: PunchMethod, queued?: boolean) => void;
  startBreak: (queued?: boolean) => void;
  endBreak: (queued?: boolean) => void;
  checkOut: (method: PunchMethod, queued?: boolean) => void;
  ensureToday: () => void;
  flushQueuedPunches: () => void;
  undoLastPunch: () => void;
};

function recomputeFromPunches(punches: Punch[]) {
  let status: AttendanceStatusValue = 'checked_out';
  let checkedInAt: string | null = null;
  let breakStartedAt: string | null = null;
  let breakAccumulatedMin = 0;
  let pendingBreakStart: string | null = null;

  for (const punch of punches) {
    if (punch.type === 'check_in') {
      status = 'checked_in';
      checkedInAt = punch.at;
      breakAccumulatedMin = 0;
    } else if (punch.type === 'break_start') {
      status = 'on_break';
      pendingBreakStart = punch.at;
    } else if (punch.type === 'break_end') {
      status = 'checked_in';
      if (pendingBreakStart) {
        breakAccumulatedMin += Math.max(1, differenceInMinutes(parseISO(punch.at), parseISO(pendingBreakStart)));
        pendingBreakStart = null;
      }
    } else if (punch.type === 'check_out') {
      status = 'checked_out';
      checkedInAt = null;
    }
  }

  if (status === 'on_break') breakStartedAt = pendingBreakStart;

  return { status, checkedInAt, breakStartedAt, breakAccumulatedMin };
}

function todayKey(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

function makePunch(type: Punch['type'], method: PunchMethod, queued = false): Punch {
  return { id: `${type}-${Date.now()}`, type, method, at: new Date().toISOString(), queued };
}

export const useAttendanceStore = create<AttendanceState>()(
  persist(
    (set, get) => ({
      status: 'checked_out',
      todayDate: todayKey(),
      todayPunches: [],
      checkedInAt: null,
      breakStartedAt: null,
      breakAccumulatedMin: 0,
      history: generateHistory(45),

      ensureToday: () => {
        const key = todayKey();
        if (get().todayDate !== key) {
          const prev = get();
          const closedOutHistory: DaySummary[] = [...prev.history];
          if (prev.todayPunches.length > 0) {
            const checkInPunch = prev.todayPunches.find((p) => p.type === 'check_in');
            const checkOutPunch = [...prev.todayPunches].reverse().find((p) => p.type === 'check_out');
            closedOutHistory.push({
              date: prev.todayDate,
              status: 'present',
              checkIn: checkInPunch ? format(parseISO(checkInPunch.at), 'HH:mm') : undefined,
              checkOut: checkOutPunch ? format(parseISO(checkOutPunch.at), 'HH:mm') : undefined,
              totalMinutes:
                checkInPunch && checkOutPunch
                  ? differenceInMinutes(parseISO(checkOutPunch.at), parseISO(checkInPunch.at)) -
                    prev.breakAccumulatedMin
                  : undefined,
            });
          }
          set({
            todayDate: key,
            todayPunches: [],
            status: 'checked_out',
            checkedInAt: null,
            breakStartedAt: null,
            breakAccumulatedMin: 0,
            history: closedOutHistory,
          });
        }
      },

      checkIn: (method, queued = false) => {
        get().ensureToday();
        const punch = makePunch('check_in', method, queued);
        set((s) => ({
          status: 'checked_in',
          checkedInAt: punch.at,
          todayPunches: [...s.todayPunches, punch],
        }));
      },

      startBreak: (queued = false) => {
        const punch = makePunch('break_start', 'manual', queued);
        set((s) => ({
          status: 'on_break',
          breakStartedAt: punch.at,
          todayPunches: [...s.todayPunches, punch],
        }));
      },

      endBreak: (queued = false) => {
        const { breakStartedAt } = get();
        const durationMin = breakStartedAt
          ? Math.max(1, differenceInMinutes(new Date(), parseISO(breakStartedAt)))
          : 0;
        const punch = makePunch('break_end', 'manual', queued);
        set((s) => ({
          status: 'checked_in',
          breakStartedAt: null,
          breakAccumulatedMin: s.breakAccumulatedMin + durationMin,
          todayPunches: [...s.todayPunches, punch],
        }));
      },

      checkOut: (method, queued = false) => {
        const punch = makePunch('check_out', method, queued);
        set((s) => ({
          status: 'checked_out',
          checkedInAt: null,
          todayPunches: [...s.todayPunches, punch],
        }));
      },

      flushQueuedPunches: () => {
        set((s) => ({
          todayPunches: s.todayPunches.map((p) => (p.queued ? { ...p, queued: false } : p)),
        }));
      },

      undoLastPunch: () => {
        set((s) => {
          const todayPunches = s.todayPunches.slice(0, -1);
          return { todayPunches, ...recomputeFromPunches(todayPunches) };
        });
      },
    }),
    {
      name: 'attendo.attendance',
      storage: createJSONStorage(() => persistStorage),
    },
  ),
);

export function isToday(dateStr: string): boolean {
  return isSameDay(parseISO(dateStr), new Date());
}
