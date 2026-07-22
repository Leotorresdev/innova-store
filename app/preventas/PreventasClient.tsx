'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PreorderCard } from '@/components/features/preorders/PreorderCard';
import { CountdownTimer } from '@/components/features/preorders/CountdownTimer';
import { PreorderBenefits } from '@/components/features/preorders/PreorderBenefits';

interface PreventasClientProps {
  activePresale: any | null;
  wholesaleProducts: any[];
}

export function PreventasClient({ activePresale, wholesaleProducts }: PreventasClientProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-8 pb-16">
      {/* Top: hero + timer */}
      <div className="grid lg:grid-cols-[1.7fr_1fr] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] glass-dark text-white p-8 sm:p-12 min-h-90 flex flex-col justify-center shadow-elegant border border-white/10"
        >
          <Image
            src="/images/hero-bg.png"
            alt="Fondo Preventas"
            fill
            className="object-cover opacity-60 mix-blend-screen"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
          <div className="absolute inset-0 bg-ink/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />

          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center rounded-full bg-primary/20 text-primary-foreground px-4 py-1.5 text-xs font-bold border border-primary/30 shadow-glow backdrop-blur-md mb-6 tracking-wide">
              <span className="size-1.5 rounded-full bg-primary animate-pulse mr-2" />
              Oportunidad Limitada
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-black tracking-tight text-white mb-6 leading-[1.05]">
              Preventas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-400">Exclusivas</span>
            </h1>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-light drop-shadow-md">
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
          {activePresale ? (
            <div className="flex flex-col h-full gap-4">
              <CountdownTimer 
                startDate={activePresale.presaleStartDate} 
                endDate={activePresale.presaleEndDate} 
              />
              <div className="flex-1 bg-card border border-border shadow-card rounded-3xl overflow-hidden">
                <PreorderCard item={activePresale} index={0} />
              </div>
            </div>
          ) : (
             <div className="relative rounded-3xl bg-card border border-border p-8 flex flex-col items-center justify-center text-center shadow-card overflow-hidden h-full">
               <p className="font-display text-xl text-muted-foreground">Próximamente nuevas preventas</p>
             </div>
          )}
        </motion.div>
      </div>

      {/* Catalog header for Wholesale */}
      <div className="mt-20 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
            Catálogo <span className="text-primary/90">Mayorista</span>
          </h2>
          <p className="mt-3 text-base text-muted-foreground max-w-lg">
            Unidades limitadas reservadas para distribuidores autorizados y pioneros tecnológicos.
          </p>
        </div>
      </div>

      {/* Cards Wholesale */}
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {wholesaleProducts.length > 0 ? (
          wholesaleProducts.map((item, i) => (
            <PreorderCard key={item.id} item={item} index={i} />
          ))
        ) : (
          <div className="col-span-full py-20 text-center text-neutral-500 border border-dashed border-neutral-800 rounded-3xl">
            No hay productos disponibles al mayor en este momento.
          </div>
        )}
      </div>

      <div className="mt-24">
        <PreorderBenefits />
      </div>
    </div>
  );
}
