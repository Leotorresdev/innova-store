'use client';

import { useBCV } from '@/hooks/useBCV';
import { Truck } from 'lucide-react';

export function TopBar() {
  const { rate } = useBCV();

  const formattedRate = rate.toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="w-full bg-zinc-950 text-white text-[11px] sm:text-xs py-1.5 px-4 font-medium border-b border-white/10 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap text-center tracking-wide">
        <div className="inline-flex items-center gap-1.5 text-zinc-300">
          <span className="size-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span>
            Tasa BCV del día:{' '}
            <strong className="text-white font-semibold">
              Bs. {formattedRate}
            </strong>
          </span>
        </div>

        <span className="hidden sm:inline text-zinc-600 font-light">•</span>

        <div className="inline-flex items-center gap-1.5 text-zinc-300">
          <Truck className="size-3.5 text-primary shrink-0" />
          <span>
            Envíos Nacionales seguros por{' '}
            <strong className="text-white font-semibold">MRW</strong> y{' '}
            <strong className="text-white font-semibold">Zoom</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
