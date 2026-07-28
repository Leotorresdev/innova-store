import { ShieldCheck, Truck, Headset } from 'lucide-react';

const BENEFITS = [
  {
    Icon: Truck,
    title: 'Envío Prioritario',
    description:
      'Los pedidos de preventa se despachan en las primeras 24 horas después de cerrar la oferta.',
  },
  {
    Icon: Headset,
    title: 'Soporte VIP',
    description:
      'Asignación de un ejecutivo de cuenta dedicado para todas tus compras al por mayor.',
  },
];

export function PreorderBenefits() {
  return (
    <div className="mt-12 rounded-3xl bg-muted/60 border border-border p-8 sm:p-10 flex flex-col md:flex-row justify-center gap-8">
      {BENEFITS.map((b) => (
        <div key={b.title} className="text-center flex flex-col items-center">
          <div className="size-12 rounded-xl bg-ink text-ink-foreground flex items-center justify-center mb-4">
            <b.Icon className="size-5" />
          </div>
          <p className="font-display font-bold">{b.title}</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-xs leading-relaxed">
            {b.description}
          </p>
        </div>
      ))}
    </div>
  );
}