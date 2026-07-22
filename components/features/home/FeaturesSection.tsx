'use client';

import { motion } from 'framer-motion';
import { Truck, Headphones, ShieldCheck } from 'lucide-react';

const FEATURES = [
  {
    Icon: Truck,
    title: 'Envío Global Ultra-Rápido',
    description:
      'Logística premium para asegurar que tu equipo llegue en perfectas condiciones, donde sea que estés, en tiempo récord.',
    className: 'bg-gradient-to-br from-blue-100/90 to-blue-200/50 hover:from-blue-200/90 hover:to-blue-300/50 border-blue-200 shadow-sm',
  },
  {
    Icon: Headphones,
    title: 'Soporte Elite 24/7',
    description:
      'Acceso directo a especialistas. Resolución inmediata para tu flujo de trabajo.',
    className: 'bg-gradient-to-br from-blue-100/90 to-blue-200/50 hover:from-blue-200/90 hover:to-blue-300/50 border-blue-200 shadow-sm',
  },
  {
    Icon: ShieldCheck,
    title: 'Garantía Total',
    description:
      'Protección extendida. Materiales seleccionados para durar toda la vida.',
    className: 'bg-gradient-to-br from-blue-100/90 to-blue-200/50 hover:from-blue-200/90 hover:to-blue-300/50 border-blue-200 shadow-sm',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 rounded-[3rem] mx-4 sm:mx-6 mt-4 mb-12 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-100/50">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-cyan-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink"
          >
            Excelencia en cada <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">detalle</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-ink/60 max-w-2xl mx-auto font-medium"
          >
            Diseñado para los creadores más exigentes. No comprometemos el rendimiento ni la estética.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`group relative backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 transition-all duration-500 border overflow-hidden flex flex-col items-center text-center ${f.className}`}
            >
              {/* Glass reflection */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="absolute top-1/2 left-1/2 size-64 rounded-full bg-primary/10 group-hover:bg-primary/20 group-hover:scale-125 transition-all duration-700 blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
              
              <div className="size-16 rounded-2xl bg-white flex items-center justify-center mb-6 relative border border-blue-200 group-hover:border-blue-300 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-md">
                <f.Icon className="size-6 text-primary" strokeWidth={2.5} />
              </div>
              <h3 className="relative font-display text-xl sm:text-2xl font-bold mb-3 text-ink tracking-tight">{f.title}</h3>
              <p className="relative text-sm sm:text-base text-ink/60 leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}