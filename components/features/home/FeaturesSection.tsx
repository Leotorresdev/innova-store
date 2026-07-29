'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Headphones, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const FEATURES = [
  {
    Icon: Truck,
    title: 'Envíos Nacionales Seguros',
    description:
      'Trabajamos con MRW, Zoom y Menssajero para asegurar que tu equipo llegue en perfectas condiciones, donde sea que estés, en tiempo récord.',
  },
  {
    Icon: Headphones,
    title: 'Soporte Elite 24/7',
    description:
      'Acceso directo a especialistas. Resolución inmediata para tu flujo de trabajo y asesoría personalizada en todo momento.',
  },
  {
    Icon: ShieldCheck,
    title: 'Garantía Total',
    description:
      'Protección extendida en todos nuestros productos. Materiales seleccionados y marcas certificadas para brindarte la máxima confianza.',
  },
];

const IMAGES = [
  '/images/beneficios1.jpg',
  '/images/beneficios2.jpg',
  '/images/beneficios3.jpg',
  '/images/beneficios4.jpg',
  '/images/beneficios5.jpg',
];

export function FeaturesSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // Cambia la foto cada 4 segundos
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="features" className="relative bg-gradient-to-b from-blue-50/50 via-white to-blue-50/30 rounded-[3rem] mx-4 sm:mx-6 mt-4 mb-12 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-blue-100/50">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-cyan-400/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink"
          >
            Logística y <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-500">Beneficios</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-ink/60 max-w-2xl mx-auto font-medium"
          >
            Nuestra prioridad es que recibas tus productos con la mayor seguridad y rapidez. Documentamos cada despacho para tu tranquilidad.
          </motion.p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Left: Image Carousel */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white bg-neutral-100"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={IMAGES[currentImage]} 
                  alt="Envíos seguros a nivel nacional"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            
            <div className="absolute bottom-8 left-8 right-8 text-white">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="font-semibold text-xs tracking-wider uppercase text-green-400">Despachos Verificados</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
                Confianza absoluta en cada entrega
              </h3>
            </div>

            {/* Indicators */}
            <div className="absolute top-6 right-6 flex gap-2">
              {IMAGES.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentImage ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} 
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Features List */}
          <div className="space-y-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative group bg-white/60 backdrop-blur-xl border border-blue-100 hover:border-blue-300 rounded-[2rem] p-6 sm:p-8 transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0 size-14 rounded-2xl bg-blue-50 flex items-center justify-center border border-blue-100 group-hover:bg-primary group-hover:text-white transition-colors duration-500 shadow-sm text-primary">
                    <f.Icon className="size-6" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-ink group-hover:text-primary transition-colors">{f.title}</h3>
                    <p className="text-ink/70 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}