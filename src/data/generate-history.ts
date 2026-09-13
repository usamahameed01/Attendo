import { format, isWeekend, subDays } from 'date-fns';

import type { DaySummary } from './types';

// mulberry32-style integer mix: unlike a naive string hash, this decorrelates
// inputs that differ by only 1 (consecutive calendar days), avoiding runs of
// identical statuses across a week.
function seededRandom(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 2654435761);
  }
  h = Math.imul(h ^ (h >>> 15), 1 | h);
  h ^= h + Math.imul(h ^ (h >>> 7), 61 | h);
  return ((h ^ (h >>> 14)) >>> 0) / 4294967296;
}

export function generateHistory(days: number, from: Date = new Date()): DaySummary[] {
  const summaries: DaySummary[] = [];

  for (let i = 1; i <= days; i++) {
    const date = subDays(from, i);
    const dateStr = format(date, 'yyyy-MM-dd');

    if (isWeekend(date)) {
      summaries.push({ date: dateStr, status: 'weekend' });
      continue;
    }

    const roll = seededRandom(dateStr);
    if (roll < 0.06) {
      summaries.push({ date: dateStr, status: 'absent' });
    } else if (roll < 0.1) {
      summaries.push({ date: dateStr, status: 'leave' });
    } else if (roll < 0.25) {
      const lateMinutes = 15 + Math.round(roll * 100);
      summaries.push({
        date: dateStr,
        status: 'late',
        checkIn: `09:${(30 + Math.round(roll * 20)).toString().padStart(2, '0')}`,
        checkOut: '18:12',
        totalMinutes: 480 - lateMinutes,
        lateMinutes,
      });
    } else {
      summaries.push({
        date: dateStr,
        status: 'present',
        checkIn: `08:${(50 + Math.round(roll * 9)).toString().padStart(2, '0')}`,
        checkOut: `18:${Math.round(roll * 15).toString().padStart(2, '0')}`,
        totalMinutes: 480 + Math.round(roll * 40),
      });
    }
  }

  return summaries.reverse();
}
