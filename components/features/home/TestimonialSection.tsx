'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'María Hernández',
    quote: 'Innova cambió por completo la forma en que trabajamos. Cada detalle se siente intencional y la calidad de construcción es simplemente de otro mundo.',
  },
  {
    name: 'Carlos Rivera',
    quote: 'La precisión en cada producto es lo que nos hizo migrar todo nuestro equipo de ingeniería. No hay nada igual en el mercado.',
  },
  {
    name: 'Sarah Jenkins',
    quote: 'El nivel de inmersión y la latencia ultra-baja en sus equipos de audio me permite producir con una fidelidad asombrosa. Increíble.',
  },
];

export function TestimonialSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-1/2 left-1/2 w-full h-75 bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-primary mb-4 font-semibold">
            Prueba Social
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6"
          >
            Voces de la <span className="text-gradient">innovación</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground">
            Descubre por qué los creadores y líderes de la industria confían en nosotros para potenciar su flujo de trabajo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.25, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="relative p-8 rounded-[2rem] glass-card flex flex-col h-full border border-neutral-200/50 hover:border-primary/20 cursor-pointer"
            >
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base text-foreground/80 leading-relaxed mb-8 italic text-center">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex flex-col items-center justify-center mt-auto">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-primary shrink-0 border border-primary/20 mb-2 shadow-sm">
                  {t.name.charAt(0)}
                </div>
                <h4 className="font-semibold text-base text-ink text-center">{t.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}