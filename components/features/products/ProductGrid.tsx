'use client';

import type { Product } from '@/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  cols?: 2 | 3 | 4;
  emptyMessage?: string;
}

/**
 * Grid responsive de ProductCard. cols default = 3.
 */
export function ProductGrid({ products, cols = 3, emptyMessage = 'Sin resultados.' }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-20">{emptyMessage}</p>
    );
  }

  const colClass =
    cols === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : cols === 2
        ? 'sm:grid-cols-2'
        : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-5 ${colClass}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} index={i} />
      ))}
    </div>
  );
}