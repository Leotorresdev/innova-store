'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const add = useCartStore((s) => s.add);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col"
    >
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-surface shadow-card">
        {product.imagen && (
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        )}
        {product.badge && (
          <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-ink text-ink-foreground">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Favorito"
          className="absolute top-4 right-4 size-9 rounded-full glass flex items-center justify-center hover:scale-110 transition"
        >
          <Heart className="size-4" />
        </button>
      </div>

      <div className="px-1 pt-5">
        <h3 className="font-display text-lg font-semibold">{product.nombre}</h3>
        <p className="text-sm text-muted-foreground mt-1">{product.tagline ?? product.descripcion}</p>
        {product.preorder && product.fechaLanzamiento && (
          <p className="text-xs text-primary font-mono mt-2">◆ Lanza {product.fechaLanzamiento}</p>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-display text-2xl font-bold">${product.precio.toLocaleString()}</p>
          <button
            type="button"
            onClick={() => add(product)}
            className="inline-flex items-center gap-2 bg-ink text-ink-foreground text-sm font-medium px-4 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition"
          >
            <ShoppingBag className="size-4" />
            Añadir
          </button>
        </div>
      </div>
    </motion.article>
  );
}