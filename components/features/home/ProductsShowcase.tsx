'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, MessageCircle } from 'lucide-react';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import type { Product } from '@/types';

type FilterType = 'ALL' | 'AVAILABLE' | 'OUT_OF_STOCK';

export function ProductsShowcase() {
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('AVAILABLE');

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
            precioOriginal: p.regularPrice || p.price,
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

  const filteredAndSortedProducts = useMemo(() => {
    let result = dbProducts;

    // Filtro de búsqueda en tiempo real
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          (p.descripcion && p.descripcion.toLowerCase().includes(q))
      );
    }

    // Filtro de disponibilidad
    if (filter === 'AVAILABLE') {
      result = result.filter((p) => p.stock > 0);
    } else if (filter === 'OUT_OF_STOCK') {
      result = result.filter((p) => p.stock === 0);
    }

    // Ordenar: Disponibles primero, agotados al final
    return [...result].sort((a, b) => {
      const aStock = a.stock > 0 ? 1 : 0;
      const bStock = b.stock > 0 ? 1 : 0;
      return bStock - aStock;
    });
  }, [dbProducts, searchQuery, filter]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      id="tienda"
      className="relative mx-auto max-w-7xl px-6 pt-24 pb-12"
    >
      <div className="text-center mb-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 rounded-full glass-dark border border-primary/20 text-primary-foreground px-5 py-2 text-sm font-semibold mb-6 shadow-glow"
        >
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          Catálogo Oficial INNOVA
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-ink"
        >
          Equipos y Accesorios <span className="text-gradient">Premium</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base sm:text-lg text-ink/70 max-w-2xl mx-auto leading-relaxed"
        >
          Precios duales en USD y Bolívares a tasa oficial BCV. Envíos asegurados por MRW y Zoom a toda Venezuela.
        </motion.p>
      </div>

      {/* Buscador en tiempo real y Filtros */}
      <div className="max-w-2xl mx-auto mb-10 space-y-4 relative z-10">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o modelo (ej. Reloj, Audífonos, Cargador...)"
            className="w-full bg-white dark:bg-card border border-zinc-200 dark:border-white/10 rounded-2xl pl-12 pr-11 py-3.5 text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
              aria-label="Limpiar búsqueda"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2.5">
          <button
            onClick={() => setFilter('AVAILABLE')}
            className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 ${
              filter === 'AVAILABLE'
                ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                : 'bg-white/80 dark:bg-card border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
            }`}
          >
            En Stock Inmediato
          </button>

          <button
            onClick={() => setFilter('ALL')}
            className={`px-5 py-2 rounded-full border text-xs sm:text-sm font-semibold transition-all duration-300 ${
              filter === 'ALL'
                ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                : 'bg-white/80 dark:bg-card border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
            }`}
          >
            Todos los productos
          </button>

          <button
            onClick={() => setFilter('OUT_OF_STOCK')}
            className={`px-4 py-2 rounded-full border text-xs sm:text-sm font-medium transition-all duration-300 ${
              filter === 'OUT_OF_STOCK'
                ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                : 'bg-transparent border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
            }`}
          >
            Bajo Pedido / Agotados
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-innova rounded-full blur-[150px] pointer-events-none opacity-10" />

        {filteredAndSortedProducts.length === 0 && !isLoading ? (
          <div className="text-center py-16 px-4 bg-white/50 dark:bg-card/50 rounded-3xl border border-dashed border-zinc-200 dark:border-white/10 max-w-lg mx-auto">
            <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
              No encontramos productos que coincidan con &quot;{searchQuery}&quot;
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 mb-6">
              ¿Buscas algún equipo específico o preventa? Consulta directo con un asesor por WhatsApp.
            </p>
            <a
              href={`https://wa.me/584262663234?text=${encodeURIComponent(
                `¡Hola INNOVA! Estaba buscando en la web el producto "${searchQuery}" y no lo encontré. ¿Lo tienen disponible o pueden encargarlo?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all"
            >
              <MessageCircle className="size-4" />
              Consultar por WhatsApp
            </a>
          </div>
        ) : (
          <ProductGrid products={filteredAndSortedProducts} cols={3} isLoading={isLoading} />
        )}
      </div>
    </motion.section>
  );
}