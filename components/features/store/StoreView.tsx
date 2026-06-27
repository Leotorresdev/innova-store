'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '@/lib/data/products';
import { ProductGrid } from '@/components/features/products/ProductGrid';
import { Search, SlidersHorizontal, Sparkles, Package, Star, TrendingUp } from 'lucide-react';

export function StoreView() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Todos');
  const [sort, setSort] = useState<'default' | 'price-asc' | 'price-desc' | 'rating'>('default');

  const categories = useMemo(
    () => ['Todos', ...Array.from(new Set(products.map((p) => p.categoria)))],
    [],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let list = products.filter(
      (p) =>
        (category === 'Todos' || p.categoria === category) &&
        (p.nombre.toLowerCase().includes(q) ||
          (p.tagline ?? p.descripcion).toLowerCase().includes(q)),
    );
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.precio - b.precio);
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.precio - a.precio);
    if (sort === 'rating') list = [...list].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return list;
  }, [query, category, sort]);

  const stats = [
    { icon: Package,    label: 'Productos',       value: `${products.length}+` },
    { icon: Star,       label: 'Rating promedio',  value: '4.8★'               },
    { icon: TrendingUp, label: 'Ventas este mes',  value: '11K+'               },
    { icon: Sparkles,   label: 'Categorías',       value: `${categories.length - 1}` },
  ];

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-primary/4 pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-150 h-100 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-100 h-75 bg-secondary/20 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 pt-8 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 text-xs font-semibold mb-5">
              <Sparkles className="size-3.5" />
              Catálogo oficial Innova — Temporada 2025
            </span>
            <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05] mb-4">
              Tienda <span className="text-gradient">Innova</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              Tecnología de élite. Diseño sin concesiones. Cada producto, una declaración.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="font-display text-xl font-bold leading-none">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Sticky Search + Filters ── */}
      <section className="sticky top-20 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-3 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search input */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <input
              type="search"
              id="store-search"
              placeholder="Buscar productos…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-full pl-10 pr-4 py-2.5 text-sm bg-muted/60 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition placeholder:text-muted-foreground/60"
            />
          </div>

          {/* Sort select */}
          <div className="relative shrink-0">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <select
              id="store-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="appearance-none rounded-full pl-9 pr-8 py-2.5 text-sm bg-muted/60 border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: Menor</option>
              <option value="price-desc">Precio: Mayor</option>
              <option value="rating">Mejor valorado</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── Catalog Header + Product Grid ── */}
      <section className="mx-auto max-w-7xl px-6 pt-10 pb-16">

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary/70 shrink-0">
              ◆ Colección 2025
            </span>
            <div className="h-px flex-1 bg-linear-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="text-center">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Explora nuestro{' '}
              <span className="text-gradient">catálogo</span>{' '}
              de productos
            </h2>
            <p className="mt-3 text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Cada pieza seleccionada para redefinir tu experiencia tecnológica.
              Innovación que puedes ver, tocar y sentir.
            </p>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${category}-${sort}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="size-20 rounded-3xl bg-muted flex items-center justify-center mb-5">
                  <Search className="size-8 text-muted-foreground/40" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Sin resultados</h3>
                <p className="text-muted-foreground text-sm max-w-xs">
                  Prueba con otra búsqueda o categoría diferente.
                </p>
                <button
                  type="button"
                  onClick={() => { setQuery(''); setCategory('Todos'); }}
                  className="mt-5 px-5 py-2.5 rounded-full bg-ink text-ink-foreground text-sm font-medium hover:opacity-90 transition"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  <span className="font-semibold text-foreground">{filtered.length}</span>{' '}
                  producto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                </p>
                <ProductGrid products={filtered} cols={3} />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  );
}
