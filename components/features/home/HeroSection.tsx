'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden rounded-b-[3rem] mx-2 sm:mx-4 mt-2">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload='auto'
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src="/innova.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/30 " />
        {/* Gradient overlay for blending */}
        <div className="absolute inset-0  from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="glass-dark inline-flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-white mb-8 shadow-glow"
        >
          <span className="size-2 rounded-full bg-primary animate-glow-pulse " />
          <span>¡Novedades en preventa! Descubre lo último en tecnología.</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-display text-5xl sm:text-4xl lg:text-[96px] font-bold leading-[1.05] tracking-tight text-white drop-shadow-2xl max-w-5xl"
        >
          <span className="text-lg sm:text-6xl">Conoce la nueva era de </span><span className="text-gradient drop-shadow-none text-lg sm:text-6xl">Innovación</span>
          <br />
          <span className="text-white/90 text-lg sm:text-5xl">Descubre lo último en tecnología.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed font-light drop-shadow-md"
        >
          Explora nuestra tienda digital y descubre productos innovadores que transformarán tu vida. Desde tecnología de vanguardia hasta soluciones inteligentes, tenemos todo lo que necesitas para estar a la vanguardia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="mt-12 flex flex-col sm:flex-row gap-5 items-center justify-center"
        >
          <Link
            href="/tienda"
            className="group relative inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full overflow-hidden transition-all hover:scale-105 shadow-glow"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center gap-2">
              Explorar Catálogo
              <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link
            href="/preventas"
            className="group inline-flex items-center gap-2 glass text-white font-medium px-8 py-4 rounded-full hover:bg-white/20 transition-all hover:scale-105 border-white/20 shadow-elegant"
          >
            <Play className="size-5 fill-current" />
            Ver Preventas Exclusivas
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative floating elements */}
      <motion.div 
        animate={{ y: [0, -15, 0] }} 
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-primary/20 blur-3xl" 
      />
      <motion.div 
        animate={{ y: [0, 20, 0] }} 
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-20 w-48 h-48 rounded-full bg-secondary/20 blur-3xl" 
      />
    </section>
  );
}