'use client';

import { Flame, Truck, Check } from 'lucide-react';
import { useBCV } from '@/hooks/useBCV';

export interface BundleOption {
  id: 1 | 2 | 3;
  quantity: number;
  title: string;
  subtitle: string;
  discountPercent: number;
  badge?: string;
  badgeType?: 'popular' | 'best-value';
  freeShipping: boolean;
  totalUSD: number;
  originalTotalUSD: number;
  unitPriceUSD: number;
  savingsUSD: number;
}

export function getBundleOptions(basePriceUSD: number): BundleOption[] {
  const p1Total = Number(basePriceUSD.toFixed(2));
  const p2Total = Number((basePriceUSD * 2).toFixed(2));
  const p5Total = Number((basePriceUSD * 5).toFixed(2));

  return [
    {
      id: 1,
      quantity: 1,
      title: '1 Unidad',
      subtitle: 'Precio estándar individual',
      discountPercent: 0,
      freeShipping: false,
      totalUSD: p1Total,
      originalTotalUSD: p1Total,
      unitPriceUSD: p1Total,
      savingsUSD: 0,
    },
    {
      id: 2,
      quantity: 2,
      title: '2 Unidades',
      subtitle: 'Envío por MRW o Zoom',
      discountPercent: 0,
      freeShipping: false,
      totalUSD: p2Total,
      originalTotalUSD: p2Total,
      unitPriceUSD: p1Total,
      savingsUSD: 0,
    },
    {
      id: 3,
      quantity: 5,
      title: 'Pack 5 Unidades (Envío Gratis)',
      subtitle: '¡Envío Gratis por MRW/Zoom a toda Venezuela!',
      discountPercent: 0,
      badge: 'MÁS POPULAR 🔥 + ENVÍO GRATIS',
      badgeType: 'popular',
      freeShipping: true,
      totalUSD: p5Total,
      originalTotalUSD: p5Total,
      unitPriceUSD: p1Total,
      savingsUSD: 0,
    },
  ];
}

interface BundleSelectorProps {
  basePriceUSD: number;
  selectedQuantity: 1 | 2 | 3;
  onSelect: (option: BundleOption) => void;
  availableStock?: number;
}

export function BundleSelector({
  basePriceUSD,
  selectedQuantity,
  onSelect,
  availableStock = 99,
}: BundleSelectorProps) {
  const { formatBsNumber } = useBCV();
  const options = getBundleOptions(basePriceUSD);

  return (
    <div className="space-y-3" role="radiogroup" aria-label="Selecciona la cantidad de unidades">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Selecciona la cantidad:
        </span>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
          <Truck className="size-3.5" />
          Envío Gratis con más de 4 unidades
        </span>
      </div>

      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedQuantity === option.id;
          const isDisabled = availableStock < option.quantity;

          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(option)}
              className={`relative w-full text-left rounded-2xl p-4 transition-all duration-200 border-2 min-h-14 cursor-pointer ${
                isDisabled
                  ? 'opacity-45 cursor-not-allowed border-border bg-surface/40'
                  : isSelected
                    ? 'border-primary bg-primary/8 dark:bg-primary/12 shadow-[0_0_24px_rgba(37,99,235,0.15)]'
                    : 'border-border/80 hover:border-primary/50 bg-surface/60 hover:bg-surface'
              }`}
            >
              {/* Top floating badge si tiene envío gratis */}
              {option.badge && (
                <div
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider mb-2 shadow-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                >
                  <Flame className="size-3 fill-current" />
                  <span>{option.badge}</span>
                </div>
              )}

              <div className="flex items-center justify-between gap-3">
                {/* Left: Radio indicator + Texts */}
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`mt-0.5 size-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-zinc-400 dark:border-zinc-600 bg-transparent'
                    }`}
                  >
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-bold text-sm sm:text-base text-foreground leading-snug">
                        {option.title}
                      </span>
                      {option.freeShipping && (
                        <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                          ENVÍO GRATIS
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      {option.freeShipping && (
                        <Truck className="size-3.5 text-emerald-500 shrink-0" />
                      )}
                      <span
                        className={
                          option.freeShipping
                            ? 'font-semibold text-emerald-600 dark:text-emerald-400'
                            : ''
                        }
                      >
                        {isDisabled
                          ? `Solo quedan ${availableStock} en stock`
                          : option.subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Price in USD + Ref Bs (sin tachados de descuento falso) */}
                <div className="text-right shrink-0">
                  <span className="font-display text-lg sm:text-xl font-extrabold text-foreground leading-none">
                    ${option.totalUSD.toFixed(2)}
                  </span>
                  <span className="block text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                    Ref. Bs. {formatBsNumber(option.totalUSD)}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
