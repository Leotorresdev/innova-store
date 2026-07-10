'use client';

import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';

export function ContactSection() {
  return (
    <section id="contacto" className="relative py-24 sm:py-32 overflow-hidden bg-ink text-ink-foreground rounded-[3rem] mx-4 sm:mx-6 my-12 shadow-elegant border border-white/5">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
      
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

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form className="glass-dark p-8 sm:p-10 rounded-[2.5rem] border border-white/10 shadow-glow relative overflow-hidden group hover:border-primary/30 transition-colors duration-500">
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-white/80 ml-1">Nombre completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="Ej. Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-white/80 ml-1">Correo electrónico</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    placeholder="ejemplo@empresa.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2 mb-8">
                <label htmlFor="message" className="text-sm font-medium text-white/80 ml-1">Mensaje</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                ></textarea>
              </div>
              
              <button 
                type="button" 
                className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98] shadow-glow relative"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Enviar Mensaje
                  <Send className="size-4" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
