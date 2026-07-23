'use client';

import { motion } from 'framer-motion';
import { Target, Users, Zap } from 'lucide-react';
import Image from 'next/image';

const VALUES = [
  {
    icon: Zap,
    title: 'Innovación',
    desc: 'Empujamos los límites de la tecnología actual.',
  },
  {
    icon: Target,
    title: 'Precisión',
    desc: 'Diseño meticuloso en cada milímetro de producto.',
  },
  {
    icon: Users,
    title: 'Comunidad',
    desc: 'Una red global de creadores y pioneros.',
  },
];

export function AboutSection() {
  return (
    <section id="nosotros" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-gradient-innova rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/4 pointer-events-none opacity-20" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Redefiniendo el <span className="text-gradient">estándar</span> de la industria.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              En Innova no nos conformamos con seguir tendencias; las creamos. Desde nuestros inicios, nuestra misión ha sido proporcionar herramientas de hardware y software que potencien la creatividad humana, eliminando la fricción entre la idea y la ejecución.
            </p>
            
            <div className="space-y-6">
              {VALUES.map((val, i) => (
                <motion.div 
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-5 group p-4 rounded-3xl hover:bg-white transition-all duration-500 hover:shadow-card cursor-pointer"
                >
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm border border-primary/20 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <val.icon className="size-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-ink">{val.title}</h4>
                    <p className="text-sm text-ink/70 mt-1 leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-4/5 rounded-[3rem] overflow-hidden shadow-elegant border border-border">
              {/* Fallback pattern if no image */}
              <div className="absolute inset-0 bg-ink" />
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
              
              <Image 
                src="/images/innova.jpg" 
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Equipo Innova" 
                fill 
                
                className="" 
              />
              
              <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-dark rounded-3xl border border-white/10 shadow-glow">
                <p className="text-white/70 text-sm">Innovación global. Construido para el futuro.</p>
              </div>
            </div>
            

          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
