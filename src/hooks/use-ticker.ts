import { useEffect, useState } from 'react';

/** Re-renders the calling component every `intervalMs` while `active` is true. */
export function useTicker(active: boolean, intervalMs = 1000) {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [active, intervalMs]);
}

export function formatElapsed(fromISO: string, now: Date = new Date()): string {
  const totalSeconds = Math.max(0, Math.floor((now.getTime() - new Date(fromISO).getTime()) / 1000));
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export function elapsedMinutes(fromISO: string, now: Date = new Date()): number {
  return Math.max(0, Math.floor((now.getTime() - new Date(fromISO).getTime()) / 60000));
}
