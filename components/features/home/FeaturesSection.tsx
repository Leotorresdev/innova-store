'use client';

import { motion } from 'framer-motion';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    Icon: Truck,
    title: 'Envío Global',
    description:
      'Logística premium para asegurar que tu equipo llegue en perfectas condiciones, donde sea que estés.',
  },
  {
    Icon: Headphones,
    title: 'Soporte Elite',
    description:
      'Acceso directo a especialistas de producto. Resolución inmediata para que no detengas tu flujo de trabajo.',
  },
  {
    Icon: ShieldCheck,
    title: 'Garantía Total',
    description:
      'Protección extendida en todos nuestros dispositivos. Materiales seleccionados para durar toda la vida.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-surface rounded-[3rem] mx-4 sm:mx-6 my-12 overflow-hidden shadow-elegant border border-border/50">
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

        <div className="grid gap-8 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative bg-card/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-card hover:shadow-glow transition-all duration-300 border border-white/5 overflow-hidden"
            >
              {/* Card glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute -top-10 -right-10 size-40 rounded-full bg-primary/5 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="size-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-8 relative border border-primary/10 group-hover:border-primary/30 transition-colors">
                <f.Icon className="size-6 text-primary" />
              </div>
              <h3 className="relative font-display text-2xl font-semibold mb-4 group-hover:text-primary transition-colors">{f.title}</h3>
              <p className="relative text-base text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}