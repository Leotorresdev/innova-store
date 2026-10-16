'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle2 } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Alejandro Morales',
    city: 'Caracas, Dto. Capital',
    quote: 'Hice el pedido un martes y el miércoles en la mañana ya estaba retirando en la agencia MRW de Las Mercedes. Producto 100% original, sellado y la atención por WhatsApp fue rápida y transparente.',
    delivery: 'Retiro en Agencia MRW',
  },
  {
    name: 'Valentina Castillo',
    city: 'Valencia, Carabobo',
    quote: 'Pagué en bolívares por Pago Móvil a la tasa oficial del BCV sin complicaciones. Me enviaron el número de guía de Zoom el mismo día. Excelente servicio para comprar tecnología en Venezuela.',
    delivery: 'Envío asegurado por Zoom',
  },
  {
    name: 'Ricardo Gómez',
    city: 'Barquisimeto, Lara',
    quote: 'Tenía dudas al inicio por comprar tecnología en línea, pero el asesor por WhatsApp me envió fotos reales del equipo y me acompañó hasta que tuve el paquete en mis manos. Recomendadísimos.',
    delivery: 'Retiro en Agencia Zoom',
  },
];

export function TestimonialSection() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-1/2 w-full h-75 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3 font-semibold">
            Confianza y Experiencia
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-ink"
          >
            Clientes que confían en <span className="text-gradient">INNOVA</span>
          </motion.h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Compradores en toda Venezuela respaldan la rapidez de nuestros envíos por MRW y Zoom y la seriedad de nuestra garantía.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              className="relative p-7 sm:p-8 rounded-[2rem] glass-card flex flex-col h-full border border-neutral-200/60 dark:border-white/10 hover:border-primary/30 transition-all shadow-sm"
            >
              {/* Estrellas */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Testimonio */}
              <p className="text-sm sm:text-base text-foreground/85 leading-relaxed mb-6 italic">
                &quot;{t.quote}&quot;
              </p>

              {/* Footer con datos del cliente y verificación */}
              <div className="mt-auto pt-4 border-t border-border/40 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary text-sm shrink-0 border border-primary/20">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-ink leading-tight">{t.name}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{t.city}</p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
                  <CheckCircle2 className="size-3.5 shrink-0" />
                  <span>Compra Verificada · {t.delivery}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}