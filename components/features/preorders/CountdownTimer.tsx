'use client';

import { Clock } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';

interface CountdownTimerProps {
  startDate: string | Date | null;
  endDate: string | Date | null;
}

export function CountdownTimer({ startDate, endDate }: CountdownTimerProps) {
  const { d, h, m, s, status } = useCountdown(startDate, endDate);

  const getLabel = () => {
    if (status === 'BEFORE') return 'Comienza en:';
    if (status === 'DURING') return 'Finaliza en:';
    return 'Preventa Terminada';
  };

  const units = [
    { v: d, l: 'Días' },
    { v: h, l: 'Horas' },
    { v: m, l: 'Min' },
    { v: s, l: 'Seg' },
  ];

  return (
    <div className="relative rounded-3xl glass-card border border-neutral-200/60 p-8 flex flex-col items-center justify-center text-center shadow-card overflow-hidden h-full">
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary via-primary to-primary/40" />
      <div className="size-12 rounded-full border-2 border-primary/30 text-primary flex items-center justify-center mb-3">
        <Clock className="size-6" />
      </div>
      <p className="font-display text-xl font-semibold">{getLabel()}</p>
      
      {status !== 'ENDED' ? (
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
      ) : (
        <div className="mt-5 text-muted-foreground font-medium py-6">
          Esta preventa ha concluido.
        </div>
      )}

      {status !== 'ENDED' && (
        <div className="mt-6 w-full rounded-xl bg-destructive/10 text-destructive text-sm font-medium py-2.5 px-3 flex items-center justify-center gap-2">
          <span className="size-1.5 rounded-full bg-destructive animate-pulse" />
          Precios sujetos a disponibilidad
        </div>
      )}
    </div>
  );
}