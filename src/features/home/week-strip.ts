import { format, startOfWeek, addDays } from 'date-fns';

import type { DaySummary } from '@/data/types';

export type WeekDay = {
  label: string;
  minutes: number;
  isToday: boolean;
};

export function buildWeekStrip(history: DaySummary[], todayMinutes: number, now: Date = new Date()) {
  const start = startOfWeek(now, { weekStartsOn: 1 });
  const todayStr = format(now, 'yyyy-MM-dd');
  const byDate = new Map(history.map((d) => [d.date, d]));

  const days: WeekDay[] = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(start, i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const label = format(date, 'EEEEE');
    const isToday = dateStr === todayStr;
    if (isToday) return { label, minutes: todayMinutes, isToday };
    const entry = byDate.get(dateStr);
    return { label, minutes: entry?.totalMinutes ?? 0, isToday };
  });

  const totalMinutes = days.reduce((sum, d) => sum + d.minutes, 0);

  return { days, totalMinutes };
}

export function formatHoursMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}
