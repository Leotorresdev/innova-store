'use client';

import { useEffect, useState } from 'react';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export interface Countdown {
  d: string;
  h: string;
  m: string;
  s: string;
  total: number;
  status: 'BEFORE' | 'DURING' | 'ENDED';
}

export function useCountdown(startDateStr: string | Date | null, endDateStr: string | Date | null): Countdown {
  const computeState = () => {
    if (!startDateStr && !endDateStr) {
      return { currentStatus: 'DURING' as const, currentLeft: 0 };
    }

    const startDate = startDateStr ? new Date(startDateStr).getTime() : 0;
    const endDate = endDateStr ? new Date(endDateStr).getTime() : Infinity;
    const now = new Date().getTime();
    
    if (now < startDate) {
      return { currentStatus: 'BEFORE' as const, currentLeft: Math.max(0, Math.floor((startDate - now) / 1000)) };
    } else if (now < endDate) {
      return { 
        currentStatus: 'DURING' as const, 
        currentLeft: endDate !== Infinity ? Math.max(0, Math.floor((endDate - now) / 1000)) : 0 
      };
    } else {
      return { currentStatus: 'ENDED' as const, currentLeft: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState<number>(() => computeState().currentLeft);
  const [status, setStatus] = useState<'BEFORE' | 'DURING' | 'ENDED'>(() => computeState().currentStatus);

  useEffect(() => {
    const update = () => {
      const { currentStatus, currentLeft } = computeState();
      setStatus(currentStatus);
      setTimeLeft(currentLeft);
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [startDateStr, endDateStr]);

  const d = Math.floor(timeLeft / (3600 * 24));
  const h = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;

  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s), total: timeLeft, status };
}