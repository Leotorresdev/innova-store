'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { products } from '@/lib/data/products';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { SectionHeader } from '@/components/shared/SectionHeader';

export function ProductsShowcase() {
  const featured = products.slice(0, 4);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      id="tienda" 
      className="relative mx-auto max-w-7xl px-6 py-32"
    >
      <SectionHeader
        eyebrow="Colección Actual"
        title="Novedades"
        highlight="Destacadas"
        description="Descubre el futuro de la interacción digital con nuestros productos más innovadores."
        cta={{ label: 'Ver catálogo completo', href: '/tienda' }}
        className="mb-16"
      />
      
      <div className="relative">
        {/* Subtle glow behind products */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <ProductGrid products={featured} cols={4} />
      </div>
      
      <div className="mt-12 text-center md:hidden">
        <Link
          href="/tienda"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface shadow-sm border border-border text-sm font-medium text-primary hover:shadow-md transition-all"
        >
          Ver catálogo completo <ArrowRight className="size-4" />
        </Link>
      </div>
    </motion.section>
  );
}