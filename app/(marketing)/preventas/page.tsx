'use client';

import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { wholesale } from '@/lib/data/preorders';
import { PreorderCard } from '@/components/features/preorders/PreorderCard';
import { CountdownTimer } from '@/components/features/preorders/CountdownTimer';
import { PreorderBenefits } from '@/components/features/preorders/PreorderBenefits';

export default function PreventasPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-16">
      {/* Top: hero + timer */}
      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] glass-dark text-ink-foreground p-8 sm:p-12 min-h-[360px] flex flex-col justify-center shadow-elegant border border-white/10"
        >
          {/* Dynamic background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/10 opacity-60" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />
          
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full bg-primary/20 text-primary px-4 py-1.5 text-xs font-semibold border border-primary/30 shadow-glow backdrop-blur-md mb-6">
              <span className="size-1.5 rounded-full bg-primary animate-glow-pulse mr-2" />
              Oportunidad Limitada
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
              Preventas <span className="text-gradient">Exclusivas</span>
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-white/70 leading-relaxed font-light">
              Acceso directo a inventario premium. Precios al por mayor por tiempo limitado.
              Aprovecha el margen de ganancia más alto del mercado y lidera con tecnología de punta.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="h-full"
        >
          <CountdownTimer hours={24} />
        </motion.div>
      </div>

      {/* Catalog header */}
      <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Catálogo <span className="text-primary/90">Mayorista</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-lg">
            Unidades limitadas reservadas para distribuidores autorizados y pioneros tecnológicos.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border/50 glass px-6 py-3 text-sm font-medium hover:bg-white/5 hover:border-primary/30 transition-all shadow-sm hover:shadow-md"
        >
          <SlidersHorizontal className="size-4" />
          Filtrar por Categoría
        </button>
      </div>

      {/* Cards */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wholesale.map((item, i) => (
          <PreorderCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <div className="mt-24">
        <PreorderBenefits />
      </div>
    </div>
  );
}