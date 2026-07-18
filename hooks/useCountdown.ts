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
}

export function useCountdown(targetDate: string | Date): Countdown {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      return Math.max(0, Math.floor(difference / 1000));
    };

    setTotal(calculateTimeLeft());

    const id = setInterval(() => {
      setTotal(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const d = Math.floor(total / (3600 * 24));
  const h = Math.floor((total % (3600 * 24)) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return { d: pad(d), h: pad(h), m: pad(m), s: pad(s), total };
}