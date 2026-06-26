'use client';

import { Clock } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  hours?: number;
  label?: string;
}

export function CountdownTimer({ hours = 24, label = 'Vence en' }: CountdownTimerProps) {
  const { h, m, s } = useCountdown(hours);

  const units = [
    { v: h, l: 'Horas' },
    { v: m, l: 'Min' },
    { v: s, l: 'Seg' },
  ];

  return (
    <div className="relative rounded-3xl bg-card border border-border p-8 flex flex-col items-center justify-center text-center shadow-card overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-primary to-primary/40" />
      <div className="size-12 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center mb-3">
        <Clock className="size-6" />
      </div>
      <p className="font-display text-xl font-semibold">{label}</p>
      <div className="mt-5 flex items-end gap-3 font-display">
        {units.map((u, i) => (
          <div key={u.l} className="flex items-end gap-3">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold tabular-nums">{u.v}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                {u.l}
              </div>
            </div>
            {i < units.length - 1 && <div className="text-3xl text-muted-foreground pb-6">:</div>}
          </div>
        ))}
      </div>
      <div className="mt-6 w-full rounded-xl bg-destructive/10 text-destructive text-sm font-medium py-2.5 px-3 flex items-center justify-center gap-2">
        <span className="size-1.5 rounded-full bg-destructive" />
        Acción Requerida: 48 Horas
      </div>
    </div>
  );
}