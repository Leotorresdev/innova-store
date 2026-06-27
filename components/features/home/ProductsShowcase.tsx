'use client';

import { motion } from 'framer-motion';
import { products } from '@/lib/data/products';
import { ProductGrid } from '@/components/features/products/ProductGrid';

export function ProductsShowcase() {
  const featured = products.slice(0, 4);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      id="tienda" 
      className="relative mx-auto max-w-7xl px-6 pt-28 pb-10"
    >
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-xs font-semibold mb-6"
        >
          ✦ Colección Destacada
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-foreground"
        >
          Explora nuestro <span className="text-gradient">catálogo</span> de productos
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Diseño sin concesiones y rendimiento de vanguardia. Encuentra los dispositivos y herramientas profesionales que llevarán tu productividad al siguiente nivel.
        </motion.p>
      </div>
      
      <div className="relative">
        {/* Subtle glow behind products */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />       
        <ProductGrid products={featured} cols={3} />
      </div>
    </motion.section>
  );
}