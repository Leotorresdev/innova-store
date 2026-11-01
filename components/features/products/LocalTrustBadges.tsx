import { Truck, CreditCard, ShieldCheck } from 'lucide-react';

export function LocalTrustBadges() {
  const badges = [
    {
      icon: Truck,
      emoji: '🚚',
      text: 'Envíos Seguros a toda Venezuela por MRW y Zoom.',
    },
    {
      icon: CreditCard,
      emoji: '💳',
      text: 'Pagos fáciles en Bolívares (Pago Móvil BCV) o Binance Pay (USDT).',
    },
    {
      icon: ShieldCheck,
      emoji: '✅',
      text: 'Garantía Local: Probamos y revisamos tu producto antes de despacharlo.',
    },
  ];

  return (
    <div className="rounded-2xl bg-surface/80 border border-border/80 p-4 space-y-3">
      {badges.map((badge, index) => (
        <div key={index} className="flex items-start gap-3">
          <div className="size-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-sm">
            <span aria-hidden="true">{badge.emoji}</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-snug pt-1">
            {badge.text}
          </p>
        </div>
      ))}
    </div>
  );
}
