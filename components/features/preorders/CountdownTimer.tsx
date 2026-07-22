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
    <div className="relative rounded-3xl glass-card border border-neutral-200/60 p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-card overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-primary via-primary to-primary/40" />
      <div className="flex items-center gap-2 mb-2">
        <Clock className="size-5 text-primary" />
        <p className="font-display text-base font-semibold">{getLabel()}</p>
      </div>
      
      {status !== 'ENDED' ? (
        <div className="mt-3 flex items-end gap-3 font-display">
          {units.map((u, i) => (
            <div key={u.l} className="flex items-end gap-2">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold tabular-nums">{u.v}</div>
                <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mt-0.5">
                  {u.l}
                </div>
              </div>
              {i < units.length - 1 && <div className="text-xl text-muted-foreground pb-4">:</div>}
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