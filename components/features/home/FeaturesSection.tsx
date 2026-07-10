'use client';

import { motion } from 'framer-motion';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    Icon: Truck,
    title: 'Envío Global Ultra-Rápido',
    description:
      'Logística premium para asegurar que tu equipo llegue en perfectas condiciones, donde sea que estés, en tiempo récord.',
    className: 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-card/80 to-primary/5',
  },
  {
    Icon: Headphones,
    title: 'Soporte Elite 24/7',
    description:
      'Acceso directo a especialistas. Resolución inmediata para tu flujo de trabajo.',
    className: 'md:col-span-2 bg-card/80',
  },
  {
    Icon: ShieldCheck,
    title: 'Garantía Total',
    description:
      'Protección extendida. Materiales seleccionados para durar toda la vida.',
    className: 'md:col-span-2 bg-card/80',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-surface rounded-[3rem] mx-4 sm:mx-6 mt-4 mb-12 overflow-hidden shadow-elegant border border-border/50">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-28 z-10">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight"
          >
            Excelencia en cada <span className="text-gradient">detalle</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Diseñado para los creadores más exigentes. No comprometemos el rendimiento ni la estética.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-4 grid-rows-none md:grid-rows-2 auto-rows-fr">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6, type: "spring", stiffness: 100 }}
              className={`group relative backdrop-blur-2xl rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 border border-white/10 overflow-hidden ${f.className}`}
            >
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="absolute -top-20 -right-20 size-64 rounded-full bg-primary/10 group-hover:scale-110 transition-transform duration-700 blur-3xl pointer-events-none" />
              
              <div className="size-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 relative border border-primary/20 group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 shadow-inner">
                <f.Icon className="size-8 text-primary drop-shadow-md" />
              </div>
              <h3 className="relative font-display text-2xl font-bold mb-4 group-hover:text-primary transition-colors tracking-tight">{f.title}</h3>
              <p className="relative text-base text-muted-foreground leading-relaxed font-light">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}