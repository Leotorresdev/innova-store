'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import type { Product } from '@/types';

export function ProductsShowcase() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        
        const mappedProducts: Product[] = data
          .filter((p: any) => p.type === 'PRODUCT')
          .map((p: any) => ({
            id: p.id,
            nombre: p.name,
            precio: p.price,
            precioOriginal: p.regularPrice || Math.round(p.price * 1.25),
            categoria: p.isNew ? 'Novedad' : 'Tecnología',
            imagen: p.imageUrl,
            rating: 5,
            ventas: Math.floor(Math.random() * 200) + 50,
            etiqueta: p.isNew ? 'Nuevo' : undefined,
            stock: p.stock,
            descripcion: p.description,
          }));
        
        setDbProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  type FilterType = 'ALL' | 'AVAILABLE' | 'OUT_OF_STOCK';
  const [filter, setFilter] = useState<FilterType>('AVAILABLE');

  const filteredProducts = dbProducts.filter((p) => {
    if (filter === 'AVAILABLE') return p.stock > 0;
    if (filter === 'OUT_OF_STOCK') return p.stock === 0;
    return true;
  });

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      id="tienda" 
      className="relative mx-auto max-w-7xl px-6 pt-28 pb-10"
    >
      <div className="text-center mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full glass-dark border border-primary/20 text-primary-foreground px-5 py-2 text-sm font-semibold mb-6 shadow-glow cursor-pointer"
        >
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          Colección Oficial
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-ink"
        >
          Catálogo <span className="text-gradient">Premium</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-ink/70 max-w-2xl mx-auto leading-relaxed"
        >
          Explora nuestra selección de productos de alta gama. 
        </motion.p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
        <button 
          onClick={() => setFilter('AVAILABLE')}
          className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${filter === 'AVAILABLE' ? 'bg-primary text-primary-foreground border-primary shadow-glow' : 'bg-transparent border-primary/20 text-ink/70 hover:border-primary/50 hover:text-ink'}`}
        >
          Disponibles
        </button>
        <button 
          onClick={() => setFilter('OUT_OF_STOCK')}
          className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${filter === 'OUT_OF_STOCK' ? 'bg-primary text-primary-foreground border-primary shadow-glow' : 'bg-transparent border-primary/20 text-ink/70 hover:border-primary/50 hover:text-ink'}`}
        >
          Agotados
        </button>
        <button 
          onClick={() => setFilter('ALL')}
          className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-all duration-300 ${filter === 'ALL' ? 'bg-primary text-primary-foreground border-primary shadow-glow' : 'bg-transparent border-primary/20 text-ink/70 hover:border-primary/50 hover:text-ink'}`}
        >
          Todos
        </button>
      </div>
      
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-innova rounded-full blur-[150px] pointer-events-none opacity-10" />       
        <ProductGrid products={filteredProducts} cols={3} isLoading={isLoading} />
      </div>
    </motion.section>
  );
}