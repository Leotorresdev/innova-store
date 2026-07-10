'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, Check } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);

  const isNewProduct =
    product.badge?.toLowerCase() === 'nuevo' ||
    product.etiqueta?.toLowerCase() === 'nuevo';

  function handleAdd() {
    if (product.stock !== undefined && product.stock <= 0) return;
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative flex flex-col
        rounded-3xl overflow-hidden
        bg-gradient-to-b from-card to-primary/5 border border-border/50
        shadow-card
        transition-all duration-500
        hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12),0_0_30px_rgba(var(--primary),0.15)]
        hover:border-primary/40
      `}
    >
      {/* ── Glow ring on hover ── */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 0 1.5px oklch(0.62 0.21 245 / 25%)' }}
      />

    
      <div className="relative aspect-square overflow-hidden bg-surface">
        {product.imagen && (
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
          />
        )}

        {/* Dark scrim — only visible on hover for the CTA */}
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent
          opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        {/* Quick-add CTA that slides up */}
        <div className="absolute inset-x-4 bottom-4
          translate-y-3 opacity-0
          group-hover:translate-y-0 group-hover:opacity-100
          transition-all duration-350 ease-out"
        >
          <button
            type="button"
            id={`quick-add-${product.id}`}
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`w-full flex items-center justify-center gap-2
              bg-white/95 backdrop-blur-sm text-ink
              text-sm font-semibold py-3 rounded-2xl
              transition-all duration-200 shadow-lg
              ${isOutOfStock 
                ? 'opacity-70 cursor-not-allowed bg-neutral-200 text-neutral-500' 
                : 'hover:bg-primary hover:text-primary-foreground active:scale-[0.97]'
              }`}
          >
            <ShoppingBag className="size-4" />
            {isOutOfStock ? 'Agotado' : 'Agregar al carrito'}
          </button>
        </div>

        {/* ── Top-left badge ── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {isOutOfStock ? (
            <span className="inline-flex items-center gap-1
              text-[10px] font-semibold uppercase tracking-widest
              px-2.5 py-1 rounded-lg
              bg-red-500/90 text-white backdrop-blur-md shadow-lg"
            >
              Agotado
            </span>
          ) : isNewProduct ? (
            <span className="inline-flex items-center gap-1
              text-[10px] font-semibold uppercase tracking-widest
              px-2.5 py-1 rounded-lg
              bg-ink/85 text-ink-foreground backdrop-blur-md"
            >
              Nuevo
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">

        {/* Title + Description */}
        <div>
          <h3 className="font-display text-[1.05rem] font-bold leading-tight
            group-hover:text-primary transition-colors duration-200"
          >
            {product.nombre}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
            {product.tagline ?? product.descripcion}
          </p>
        </div>

        {/* Stock warning / Available units */}
        {product.stock !== undefined && product.stock > 0 && (
          <div className={`flex items-center gap-1.5 text-xs font-medium ${product.stock <= 20 ? 'text-amber-500' : 'text-emerald-500'}`}>
            <span className={`size-1.5 rounded-full shrink-0 ${product.stock <= 20 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`} />
            {product.stock} unidades disponibles
          </div>
        )}

        {isOutOfStock && (
          <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium">
            <span className="size-1.5 rounded-full bg-red-500 shrink-0" />
            No hay unidades disponibles
          </div>
        )}

        {/* Preorder */}
        {product.preorder && product.fechaLanzamiento && (
          <p className="text-xs text-primary font-mono">◆ Lanza {product.fechaLanzamiento}</p>
        )}

        {/* ── Divider ── */}
        <div className="border-t border-border/50 mt-auto" />

        {/* Price row + Add button */}
        <div className="flex items-end justify-between gap-3 pt-0.5">
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-[1.6rem] font-bold leading-none tracking-tight">
              ${product.precio.toLocaleString()}
            </span>
          </div>

          {/* Add-to-cart button with confirmation state */}
          <button
            type="button"
            id={`add-cart-${product.id}`}
            onClick={handleAdd}
            disabled={isOutOfStock}
            aria-label={`Añadir ${product.nombre} al carrito`}
            className={`
              shrink-0 size-12 rounded-2xl flex items-center justify-center
              font-semibold text-sm
              transition-all duration-300
              shadow-sm
              ${isOutOfStock
                ? 'bg-neutral-200/50 text-neutral-400 cursor-not-allowed'
                : added
                  ? 'bg-emerald-500 text-white scale-110 active:scale-95'
                  : 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] hover:bg-primary/90 hover:scale-105 active:scale-95'
              }
            `}
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <Check className="size-5" strokeWidth={2.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="bag"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  <ShoppingBag className="size-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.article>
  );
}