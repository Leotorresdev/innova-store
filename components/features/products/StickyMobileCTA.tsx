'use client';

import { MessageCircle } from 'lucide-react';
import { useBCV } from '@/hooks/useBCV';

interface StickyMobileCTAProps {
  totalUSD: number;
  originalTotalUSD?: number;
  quantity: number;
  isOutOfStock: boolean;
  onOrderNow: () => void;
}

export function StickyMobileCTA({
  totalUSD,
  originalTotalUSD,
  quantity,
  isOutOfStock,
  onOrderNow,
}: StickyMobileCTAProps) {
  const { formatBsNumber } = useBCV();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.14)] px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-3 max-w-lg mx-auto">
        {/* Left: Price in USD & Bs */}
        <div className="min-w-0">
          <div className="flex items-baseline gap-1.5">
            {originalTotalUSD && originalTotalUSD > totalUSD && (
              <span className="text-[11px] text-muted-foreground line-through decoration-red-500/60">
                ${originalTotalUSD.toFixed(2)}
              </span>
            )}
            <span className="font-display text-xl font-extrabold text-zinc-900 dark:text-white leading-none">
              ${totalUSD.toFixed(2)}
            </span>
            {quantity > 1 && (
              <span className="text-[11px] font-bold text-primary">
                ({quantity}x)
              </span>
            )}
          </div>
          <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 truncate mt-0.5">
            Ref. Bs. {formatBsNumber(totalUSD)} <span className="text-[10px] opacity-75">(BCV)</span>
          </p>
        </div>

        {/* Right: Main CTA Button (min-h 48px) */}
        <button
          type="button"
          onClick={onOrderNow}
          disabled={isOutOfStock}
          className={`min-h-12 px-5 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-[0.97] shadow-md cursor-pointer ${
            isOutOfStock
              ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/25'
          }`}
        >
          <MessageCircle className="size-4.5 shrink-0" />
          <span>{isOutOfStock ? 'Agotado' : 'Pedir Ahora (WhatsApp)'}</span>
        </button>
      </div>
    </div>
  );
}
