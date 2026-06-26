'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { preorders } from '@/lib/data/preorders';

export function PreordersSection() {
  return (
    <section className="relative bg-ink text-ink-foreground rounded-[3rem] mx-4 sm:mx-6 my-12 overflow-hidden shadow-elegant border border-white/5">
      {/* Dynamic Glow Background */}
      <div className="absolute top-0 left-1/4 w-full h-full bg-primary/10 rounded-full blur-[100px] opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] opacity-30 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 z-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-2 text-xs font-medium mb-6 text-white border border-white/10 shadow-glow">
              <Sparkles className="size-4 text-primary" />
              Acceso VIP Anticipado
            </div>
            <h2 className="font-display text-5xl sm:text-6xl font-bold tracking-tight">
              Preventas <span className="text-gradient">Exclusivas</span>
            </h2>
            <p className="mt-6 text-lg text-white/60 leading-relaxed">
              Reserva el futuro antes que nadie. Productos de edición limitada con acceso
              prioritario y beneficios únicos para verdaderos pioneros.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/preventas"
              className="group inline-flex items-center gap-2 bg-white text-ink font-semibold px-6 py-3.5 rounded-full hover:scale-105 transition-all duration-300 shadow-glow"
            >
              Ver Colección Completa
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {preorders.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative flex flex-col rounded-[2rem] glass-dark border border-white/10 p-4 hover:border-primary/40 transition-all duration-500 hover:shadow-glow cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
              
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black/40 mb-5">
                {p.imagen && (
                  <Image
                    src={p.imagen}
                    alt={p.nombre}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                {/* Image overlay glow on hover */}
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {p.badge && (
                  <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg bg-primary text-primary-foreground shadow-glow backdrop-blur-md">
                    {p.badge}
                  </span>
                )}
              </div>
              
              <div className="px-2 pb-2 relative z-10">
                <p className="text-xs text-primary font-mono uppercase tracking-widest">{p.categoria}</p>
                <h3 className="font-display text-2xl font-bold mt-2 text-white group-hover:text-primary transition-colors">{p.nombre}</h3>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">{p.tagline}</p>
                {p.fechaLanzamiento && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
                    <div className="size-1.5 rounded-full bg-primary animate-glow-pulse" />
                    <p className="text-xs text-white/80 font-mono">Lanza {p.fechaLanzamiento}</p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}