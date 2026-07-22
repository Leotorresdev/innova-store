'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-[1rem] mx-2 sm:mx-4 mt-2">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-60"
        >
          <source src="/innova.mp4" type="video/mp4" />
        </video>
        {/* Dark elegant overlay for deep contrast */}
        <div className="absolute inset-0 bg-ink/50 mix-blend-multiply" />
        {/* Glowing gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/90" />
      </div>


      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full flex flex-col items-center text-center pt-20">
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-dark border-primary/30 mb-8 shadow-glow"
        >
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-primary-foreground">Bienvenido a la revolución tecnológica</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight text-white drop-shadow-2xl max-w-5xl"
        >
          Experimenta la <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-primary bg-[length:200%_auto] animate-gradient-x relative inline-block">
            Innovación
            <div className="absolute -inset-2 bg-primary/20 blur-2xl -z-10 rounded-full" />
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 text-lg sm:text-2xl text-neutral-300 max-w-2xl leading-relaxed font-light drop-shadow-lg"
        >
          Tecnología premium de importación. Descubre equipos vanguardistas con los precios y márgenes más competitivos del mercado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-12 flex flex-col sm:flex-row gap-6 items-center justify-center"
        >
          <Link
            href="/#tienda"
            className="group relative inline-flex items-center justify-center gap-2 bg-gradient-primary text-white font-bold px-10 py-5 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] shadow-glow"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2 text-lg">
              Explorar Catálogo
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/preventas"
            className="group inline-flex items-center gap-2 glass-dark text-white font-medium px-10 py-5 rounded-2xl hover:bg-white/10 transition-all hover:scale-[1.02] border border-white/20 shadow-elegant"
          >
            <Play className="size-5 fill-current text-primary" />
            Ver Preventas Exclusivas
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative floating elements (Premium Auroras) */}
      <motion.div 
        animate={{ y: [0, -40, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} 
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-[40rem] h-[20rem] rounded-full bg-primary/40 blur-[150px] pointer-events-none mix-blend-screen" 
      />
      <motion.div 
        animate={{ y: [0, 50, 0], scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }} 
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 2 }}
        className="absolute top-0 right-0 w-[40rem] h-[30rem] rounded-full bg-cyan-500/30 blur-[150px] pointer-events-none mix-blend-screen" 
      />
    </section>
  );
}