'use client';

import { useBCV } from '@/hooks/useBCV';

interface PriceDisplayProps {
  amountUSD: number;
  originalAmountUSD?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  layout?: 'stacked' | 'inline';
  align?: 'left' | 'right';
  className?: string;
  usdClassName?: string;
  bsClassName?: string;
  showOriginalPrice?: boolean;
}

export function PriceDisplay({
  amountUSD,
  originalAmountUSD,
  size = 'md',
  layout = 'stacked',
  align = 'left',
  className = '',
  usdClassName = '',
  bsClassName = '',
  showOriginalPrice = true,
}: PriceDisplayProps) {
  const { formatBsNumber } = useBCV();

  const formattedUSD = amountUSD.toLocaleString('en-US', {
    minimumFractionDigits: Number.isInteger(amountUSD) ? 0 : 2,
    maximumFractionDigits: 2,
  });

  const formattedOriginalUSD =
    originalAmountUSD && originalAmountUSD > amountUSD
      ? originalAmountUSD.toLocaleString('en-US', {
          minimumFractionDigits: Number.isInteger(originalAmountUSD) ? 0 : 2,
          maximumFractionDigits: 2,
        })
      : null;

  const sizeStyles = {
    sm: {
      usd: 'text-base sm:text-lg font-bold',
      original: 'text-[11px]',
      bs: 'text-[11px] px-2 py-0.5',
    },
    md: {
      usd: 'text-2xl sm:text-[1.6rem] font-bold',
      original: 'text-xs',
      bs: 'text-xs px-2.5 py-0.5',
    },
    lg: {
      usd: 'text-3xl sm:text-4xl font-extrabold',
      original: 'text-sm',
      bs: 'text-xs sm:text-sm px-2.5 py-1',
    },
    xl: {
      usd: 'text-4xl sm:text-5xl font-extrabold',
      original: 'text-base',
      bs: 'text-sm px-3 py-1',
    },
  }[size];

  const alignStyles = align === 'right' ? 'items-end text-right' : 'items-start text-left';

  return (
    <div
      className={`flex ${
        layout === 'inline' ? 'flex-wrap items-baseline gap-2' : `flex-col gap-1 ${alignStyles}`
      } ${className}`}
    >
      <div className="flex items-baseline gap-2 flex-wrap">
        {showOriginalPrice && formattedOriginalUSD && (
          <span
            className={`${sizeStyles.original} text-muted-foreground line-through decoration-red-500/60 decoration-2 font-medium`}
          >
            ${formattedOriginalUSD}
          </span>
        )}
        <span
          className={`font-display leading-none tracking-tight text-foreground ${sizeStyles.usd} ${usdClassName}`}
        >
          ${formattedUSD}
        </span>
      </div>

      <span
        className={`inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-semibold leading-snug ${sizeStyles.bs} ${bsClassName}`}
      >
        <span>Ref. Bs. {formatBsNumber(amountUSD)}</span>
        <span className="text-[10px] opacity-80 font-medium">(Tasa BCV)</span>
      </span>
    </div>
  );
}
