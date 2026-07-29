'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-b-[1.5rem] mx-2 sm:mx-4 mt-2 bg-white">

      {/* Auroras de fondo */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ repeat: Infinity, duration: 14, ease: 'easeInOut' }}
        className="hidden md:block absolute -top-20 -left-20 w-[40rem] h-[40rem] rounded-full bg-blue-300/20 blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.08, 0.18, 0.08] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut', delay: 4 }}
        className="hidden md:block absolute bottom-0 right-0 w-[45rem] h-[35rem] rounded-full bg-blue-200/30 blur-[150px] pointer-events-none"
      />

      {/* ════════════════════════════════════════
          DESKTOP (lg+): layout lado a lado
      ════════════════════════════════════════ */}

      {/* Video desktop: absoluto en la mitad derecha */}
      <div className="absolute inset-y-0 right-0 w-[65%] hidden lg:block overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="w-full h-full"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover object-center"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 18%, black 32%), ' +
                  'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 18%, black 32%), ' +
                  'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)',
                WebkitMaskComposite: 'source-in',
              }}
            >
              <source src="/innova.mp4" type="video/mp4" />
            </video>
          </motion.div>
        </motion.div>
      </div>

      {/* Contenido desktop */}
      <div className="relative z-10 hidden lg:grid w-full max-w-[1400px] mx-auto px-8 lg:px-16 py-20 grid-cols-2 items-center min-h-[88vh]">
        <TextContent />
        <div /> {/* espacio — el video está en absolute */}
      </div>


      {/* ════════════════════════════════════════
          MOBILE (< lg): stack vertical
      ════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col">

        {/* Texto centrado arriba */}
        <div className="relative z-10 px-6 pt-14 pb-4 flex flex-col items-center text-center gap-6">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 shadow-sm"
          >
            <Sparkles className="size-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700 tracking-wide">
              Revolución tecnológica
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl font-black leading-[1.08] tracking-tight text-slate-900"
          >
            Experimenta
            <br />
            <span className="relative inline-block mt-1">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500">
                la Innovación
              </span>
              <span
                aria-hidden
                className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 blur-[14px] opacity-30 select-none"
              >
                la Innovación
              </span>
            </span>
          </motion.h1>

          {/* Separador */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="h-px w-16 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-500 text-base leading-relaxed max-w-xs"
          >
            Accesorios y equipos premium.{' '}
            <span className="text-slate-800 font-semibold">Descubre equipos vanguardistas</span>{' '}
            con los precios más competitivos.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs"
          >
            <Link
              href="/#tienda"
              className="group relative w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-6 py-3.5 rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.97] shadow-[0_4px_20px_rgba(59,130,246,0.35)]"
            >
              <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2 text-base font-bold">
                Explorar Catálogo
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <Link
              href="/preventas"
              className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-medium px-6 py-3.5 rounded-xl border border-slate-200 text-base active:scale-[0.97] transition-all"
            >
              <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
              Ver Preventas
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="flex gap-8 justify-center pb-2"
          >
            {[
              { value: '99%', label: 'Satisfacción' },
              { value: '24/7', label: 'Soporte' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-0.5">
                <span className="text-xl font-black text-slate-900 font-display">{stat.value}</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Video mobile: full-width debajo, fusionado arriba */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative w-full"
          style={{ aspectRatio: '16/9' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              maskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 22%, black 42%), ' +
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              maskComposite: 'intersect',
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 22%, black 42%), ' +
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskComposite: 'source-in',
            }}
          >
            <source src="/innova.mp4" type="video/mp4" />
          </video>

          {/* Sombra blanca inferior — solo mobile */}
          <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-white via-white/50 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Línea decorativa inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />
    </section>
  );
}

/* Componente de texto reutilizado en desktop */
function TextContent() {
  return (
    <div className="flex flex-col items-start gap-7">

      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 shadow-sm"
      >
        <Sparkles className="size-4 text-blue-500" />
        <span className="text-sm font-medium text-blue-700 tracking-wide">
          Revolución tecnológica
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-5xl sm:text-6xl xl:text-7xl font-black leading-[1.06] tracking-tight text-slate-900"
      >
        Experimenta
        <br />
        <span className="relative inline-block mt-1">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500">
            la Innovación
          </span>
          <span
            aria-hidden
            className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 blur-[18px] opacity-30 select-none"
          >
            la Innovación
          </span>
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="origin-left h-px w-24 bg-gradient-to-r from-blue-500 to-transparent"
      />

      <motion.p
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-sm"
      >
        Accesorios y equipos premium de Innovación.{' '}
        <span className="text-slate-800 font-semibold">
          Descubre equipos vanguardistas
        </span>{' '}
        con los precios más competitivos del mercado.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row gap-3 items-start"
      >
        <Link
          href="/#tienda"
          className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold px-8 py-4 rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.04] hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]"
        >
          <div className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2 text-base font-bold">
            Explorar Catálogo
            <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </Link>
        <Link
          href="/preventas"
          className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-medium px-8 py-4 rounded-xl hover:bg-slate-200 hover:text-slate-900 transition-all duration-300 hover:scale-[1.02] border border-slate-200 text-base"
        >
          <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
          Ver Preventas
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-8 pt-2"
      >
        {[
          { value: '99%', label: 'Satisfacción' },
          { value: '24/7', label: 'Soporte' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-0.5">
            <span className="text-2xl font-black text-slate-900 font-display">{stat.value}</span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}