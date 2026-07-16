'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden rounded-b-[1rem] mx-2 sm:mx-4 mt-2">
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


      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter text-white drop-shadow-2xl max-w-5xl"
        >
          La nueva era de la <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-100 to-primary bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Innovación
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-8 text-lg sm:text-2xl text-white/90 max-w-2xl leading-relaxed font-light drop-shadow-md"
        >
          Explora nuestra tienda digital. Desde tecnología de vanguardia hasta soluciones inteligentes para transformar tu vida.
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
            className="group inline-flex items-center gap-2 glass text-black font-medium px-8 py-4 rounded-full hover:bg-white/20 transition-all hover:scale-105 border-white/20 shadow-elegant"
          >
            <Play className="size-5 fill-current" />
            Ver Preventas Exclusivas
          </Link>
        </motion.div>
      </div>
      
      {/* Decorative floating elements (Premium Auroras) */}
      <motion.div 
        animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }} 
        transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        className="absolute bottom-10 left-0 w-96 h-96 rounded-full bg-primary/30 blur-[120px] pointer-events-none" 
      />
      <motion.div 
        animate={{ y: [0, 40, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }}
        className="absolute top-20 right-0 w-[30rem] h-[30rem] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none" 
      />
    </section>
  );
}