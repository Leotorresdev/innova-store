'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ShoppingBag, Star, Check, Zap } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);

  const hasDiscount =
    typeof product.descuento === 'number' && product.descuento > 0;

  const savings =
    product.precioOriginal
      ? product.precioOriginal - product.precio
      : null;

  function handleAdd() {
    add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative flex flex-col
        rounded-3xl overflow-hidden
        bg-card border border-border/50
        shadow-card
        transition-all duration-500
        hover:-translate-y-2 hover:shadow-elegant
        hover:border-primary/20
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
            className="w-full flex items-center justify-center gap-2
              bg-white/95 backdrop-blur-sm text-ink
              text-sm font-semibold py-3 rounded-2xl
              hover:bg-primary hover:text-primary-foreground
              active:scale-[0.97]
              transition-all duration-200 shadow-lg"
          >
            <ShoppingBag className="size-4" />
            Agregar al carrito
          </button>
        </div>

        {/* ── Top-left badges ── */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center gap-1
              text-[10px] font-semibold uppercase tracking-widest
              px-2.5 py-1 rounded-lg
              bg-ink/85 text-ink-foreground backdrop-blur-md"
            >
              {product.badge === 'Destacado' && <Zap className="size-2.5 fill-current" />}
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg
              bg-primary text-primary-foreground shadow-glow"
            >
              -{product.descuento}%
            </span>
          )}
        </div>

        {/* ── Top-right rating pill ── */}
        {product.rating && (
          <div className="absolute top-3 right-3 z-10
            flex items-center gap-1
            rounded-full bg-black/40 backdrop-blur-md
            border border-white/10
            px-2.5 py-1 text-xs font-semibold text-white"
          >
            <Star className="size-3 fill-amber-400 text-amber-400" />
            {product.rating}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">

        {/* Category + Title */}
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-primary/70 mb-1.5 block">
            {product.categoria}
          </span>
          <h3 className="font-display text-[1.05rem] font-bold leading-tight
            group-hover:text-primary transition-colors duration-200"
          >
            {product.nombre}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
            {product.tagline ?? product.descripcion}
          </p>
        </div>

        {/* Stock warning */}
        {product.stock && product.stock <= 20 && (
          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-medium">
            <span className="size-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
            Solo {product.stock} unidades disponibles
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
            {product.precioOriginal && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">
                  ${product.precioOriginal.toLocaleString()}
                </span>
                {savings && savings > 0 && (
                  <span className="text-[10px] font-semibold text-emerald-500">
                    Ahorras ${savings.toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Add-to-cart button with confirmation state */}
          <button
            type="button"
            id={`add-cart-${product.id}`}
            onClick={handleAdd}
            aria-label={`Añadir ${product.nombre} al carrito`}
            className={`
              shrink-0 size-12 rounded-2xl flex items-center justify-center
              font-semibold text-sm
              active:scale-95 transition-all duration-300
              shadow-sm
              ${added
                ? 'bg-emerald-500 text-white scale-110'
                : 'bg-ink text-ink-foreground hover:bg-primary hover:scale-105 hover:shadow-glow'
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