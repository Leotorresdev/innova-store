'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 sm:py-32 overflow-hidden bg-ink text-ink-foreground rounded-[3rem] mx-4 sm:mx-6 my-12 shadow-elegant border border-white/5">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/3 pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-cyan-500/10 rounded-full blur-[150px] translate-y-1/3 -translate-x-1/3 pointer-events-none mix-blend-screen" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs font-medium mb-6 text-white border border-white/10 shadow-glow"
          >
            <Mail className="size-4 text-primary" />
            Conecta con nosotros
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight mb-6"
          >
            ¿Listo para dar el <span className="text-gradient">siguiente paso?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed"
          >
            Ya sea que busques equipar a toda tu empresa o tengas preguntas sobre un producto específico, nuestro equipo de expertos está aquí para ayudarte.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="glass-dark p-8 rounded-[2rem] border border-white/10">
              <h3 className="font-display text-2xl font-semibold text-white mb-6">Información de Contacto</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Soporte y Ventas</p>
                    <a href="mailto:contacto@innova.store" className="text-sm text-white/60 hover:text-primary transition-colors">contacto@innova.store</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Atención Telefónica</p>
                    <a href="tel:+1800INNOVA" className="text-sm text-white/60 hover:text-primary transition-colors">+1 (800) 123-4567</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Oficinas Centrales</p>
                    <p className="text-sm text-white/60">Silicon Valley, CA<br/>Estados Unidos</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 h-full"
          >
            <div className="glass-dark p-8 sm:p-12 rounded-[2.5rem] border border-white/10 shadow-glow relative overflow-hidden group h-full flex flex-col justify-center items-center text-center hover:border-green-500/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-linear-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="size-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mb-6">
                <MessageCircle className="size-10 text-green-400" />
              </div>
              
              <h3 className="font-display text-2xl font-bold text-white mb-3">Atención Inmediata</h3>
              <p className="text-white/60 max-w-md mb-8">
                Nuestro equipo está disponible en WhatsApp para brindarte atención personalizada, resolver tus dudas y ayudarte a concretar tu compra al instante.
              </p>
              
              <a 
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 text-white font-bold px-10 py-5 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_30px_rgba(16,185,129,0.3)] relative group/btn"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10 flex items-center gap-2">
                  <MessageCircle className="size-5" />
                  Escríbenos al WhatsApp
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
