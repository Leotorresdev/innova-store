'use client';

import { useEffect, useState } from 'react';

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export interface Countdown {
  h: string;
  m: string;
  s: string;
  total: number;
}

export function useCountdown(hours: number): Countdown {
  const [total, setTotal] = useState(hours * 3600);

  useEffect(() => {
    const id = setInterval(() => {
      setTotal((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;

  return { h: pad(h), m: pad(m), s: pad(s), total };
}
//!Hook que se usa para crear un contador regresivo en segundos desde un número de horas especificado hasta 0. Devuelve los componentes de tiempo formateados con dos dígitos y el total de segundos restantes.