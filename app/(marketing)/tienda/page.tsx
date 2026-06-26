'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { products } from '@/lib/data/products';
import { ProductSearch } from '@/components/features/products/ProductSearch';
import { CategoryFilter } from '@/components/features/products/CategoryFilter';
import { ProductGrid } from '@/components/features/products/ProductGrid';

export default function TiendaPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Todos');

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((p) => p.categoria)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        (category === 'Todos' || p.categoria === category) &&
        (p.nombre.toLowerCase().includes(q) ||
          (p.tagline ?? p.descripcion).toLowerCase().includes(q)),
    );
  }, [query, category]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <p className="font-mono text-xs uppercase tracking-wider text-primary mb-2">
          ◆ Catálogo completo
        </p>
        <h1 className="font-display text-5xl sm:text-6xl font-bold">
          Tienda <span className="text-gradient">Innova</span>
        </h1>
        <p className="mt-4 text-muted-foreground max-w-xl">
          Todo el software profesional que tu empresa necesita, en un solo lugar.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <ProductSearch value={query} onChange={setQuery} />
        <CategoryFilter
          categories={categories}
          active={category}
          onChange={setCategory}
        />
      </div>

      <ProductGrid products={filtered} cols={3} />
    </div>
  );
}