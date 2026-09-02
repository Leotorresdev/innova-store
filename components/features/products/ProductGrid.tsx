'use client';

import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cols?: 2 | 3 | 4;
  emptyMessage?: string;
  isLoading?: boolean;
}

/**
 * Grid responsive de ProductCard. cols default = 3.
 */
export function ProductGrid({ products, cols = 3, emptyMessage = 'Sin resultados.', isLoading = false }: ProductGridProps) {
  const colClass =
    cols === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr'
      : cols === 2
        ? 'sm:grid-cols-2 auto-rows-fr'
        : 'sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(350px,auto)]';

  if (isLoading) {
    return (
      <div className={`grid gap-5 ${colClass}`}>
        {[...Array(3)].map((_, i) => (
          <div key={i} className="glass-card animate-pulse h-[400px] flex flex-col">
            <div className="w-full aspect-[4/3] bg-neutral-200 dark:bg-neutral-800" />
            <div className="flex flex-col flex-1 p-5 gap-3">
              <div className="h-6 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-3/4" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-full" />
              <div className="h-4 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-2/3" />
              <div className="mt-auto border-t border-border/50 pt-3 flex justify-between items-end">
                <div className="h-8 bg-neutral-200 dark:bg-neutral-800 rounded-lg w-20" />
                <div className="size-12 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-20">{emptyMessage}</p>
    );
  }

  return (
    <div className={`grid gap-5 ${colClass}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}