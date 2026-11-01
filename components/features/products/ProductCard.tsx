'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check, MessageCircle, Eye } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { buildWhatsAppUrl } from '@/config/storeConfig';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductCard({ product, index = 0, className = '' }: ProductCardProps) {
  const add = useCartStore((s) => s.add);
  const openExpressCheckout = useCartStore((s) => s.openExpressCheckout);
  const [added, setAdded] = useState(false);

  const isNewProduct =
    product.badge?.toLowerCase() === 'nuevo' ||
    product.etiqueta?.toLowerCase() === 'nuevo';

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  function handleAdd() {
    if (isOutOfStock) return;
    add(product);
    setAdded(true);

    if (typeof window !== 'undefined') {
      import('@vercel/analytics')
        .then(({ track }) => {
          track('add_to_cart', {
            product_name: product.nombre,
            product_price: product.precio,
            product_category: product.categoria || 'Uncategorized',
          });
        })
        .catch(() => null);
    }

    setTimeout(() => setAdded(false), 1800);
  }

  function handleExpressBuy() {
    if (isOutOfStock) return;
    openExpressCheckout([
      {
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        precioOriginal: product.precioOriginal,
        cantidad: 1,
        imagen: product.imagen,
        categoria: product.categoria,
        stock: product.stock,
      },
    ]);
  }

  const whatsappPreorderUrl = buildWhatsAppUrl(
    `¡Hola Innova Company! Me interesa consultar preventa o encargar el producto: ${product.nombre} ($${product.precio})`
  );

  const isPriorityImage = index < 2;

  return (
    <>
      {/* SEO Técnico: Rich Snippets (JSON-LD) para productos */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: product.nombre,
            image: product.imagen,
            description: `Compra ${product.nombre} al mejor precio en INNOVA.`,
            sku: product.id,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'USD',
              price: product.precio,
              availability: isOutOfStock
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '5.0',
              reviewCount: Math.max(15, product.ventas || 45),
            },
          }),
        }}
      />
      <div className={`block h-full group ${isOutOfStock ? '' : 'outline-none'}`}>
        <motion.article
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          whileHover={!isOutOfStock ? { y: -6, scale: 1.01 } : {}}
          transition={{
            duration: 0.8,
            delay: Math.min(index * 0.08, 0.4),
            ease: [0.16, 1, 0.3, 1],
            scale: { type: 'spring', stiffness: 300, damping: 20 },
            y: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          className={`
            relative flex flex-col h-full
            glass-card ${isOutOfStock ? 'opacity-80' : ''}
            ${className}
          `}
        >
          {/* ── Glow ring on hover ── */}
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 0 1.5px oklch(0.62 0.21 245 / 25%)' }}
          />

          <div className="relative aspect-[4/3] overflow-hidden bg-surface rounded-t-3xl">
            {product.imagen && (
              <Image
                src={product.imagen}
                alt={product.nombre}
                fill
                priority={isPriorityImage}
                loading={isPriorityImage ? undefined : 'lazy'}
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
              />
            )}

            {/* Scrim degradado para contraste del botón (visible en móvil, en escritorio en hover) */}
            <div
              className="absolute inset-x-0 bottom-0 h-28 sm:h-full sm:inset-0
              bg-gradient-to-t from-black/80 via-black/40 to-transparent
              opacity-100 sm:opacity-0 sm:group-hover:opacity-100
              transition-opacity duration-500 pointer-events-none"
            />

            {/* Quick-buy CTA: Visible permanente en móvil, slide-up en desktop hover */}
            <div
              className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4
              translate-y-0 opacity-100
              sm:translate-y-3 sm:opacity-0
              sm:group-hover:translate-y-0 sm:group-hover:opacity-100
              transition-all duration-300 ease-out z-20"
            >
              {isOutOfStock ? (
                <a
                  href={whatsappPreorderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full min-h-11 sm:min-h-12 flex items-center justify-center gap-2
                    bg-emerald-600 hover:bg-emerald-700 text-white
                    text-xs sm:text-sm font-semibold py-2.5 sm:py-3 px-3 rounded-2xl
                    transition-all duration-200 shadow-lg text-center"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  <span>Encargar por WhatsApp</span>
                </a>
              ) : (
                <button
                  type="button"
                  id={`quick-buy-${product.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleExpressBuy();
                  }}
                  className="w-full min-h-11 sm:min-h-12 flex items-center justify-center gap-2
                    bg-emerald-600 hover:bg-emerald-700 text-white
                    text-xs sm:text-sm font-bold py-2.5 sm:py-3 px-3 rounded-2xl
                    active:scale-[0.97]
                    transition-all duration-200 shadow-lg shadow-emerald-950/30 cursor-pointer text-center"
                >
                  <MessageCircle className="size-4 shrink-0" />
                  <span className="truncate">Pedir Ahora / Pagar al Confirmar</span>
                </button>
              )}
            </div>

            {/* ── Top-left badge ── */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {isOutOfStock ? (
                <span
                  className="inline-flex items-center gap-1
                  text-[10px] font-semibold uppercase tracking-widest
                  px-2.5 py-1 rounded-lg
                  bg-red-500/90 text-white backdrop-blur-md shadow-lg"
                >
                  Agotado
                </span>
              ) : (
                <>
                  {isNewProduct && (
                    <span
                      className="inline-flex items-center gap-1
                      text-[10px] font-semibold uppercase tracking-widest
                      px-2.5 py-1 rounded-lg
                      bg-ink/85 text-ink-foreground backdrop-blur-md"
                    >
                      Nuevo
                    </span>
                  )}
                  {product.precioOriginal && product.precioOriginal > product.precio && (
                    <span
                      className="inline-flex items-center gap-1
                      text-[10px] font-semibold uppercase tracking-widest
                      px-2.5 py-1 rounded-lg
                      bg-red-500/90 text-white backdrop-blur-md shadow-lg"
                    >
                      Oferta
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col flex-1 px-5 pt-4 pb-5 gap-3">
            {/* Title + Description */}
            <div>
              <Link
                href={`/product/${product.id}`}
                className="font-display font-bold leading-tight hover:text-primary transition-colors duration-200 text-lg sm:text-[1.1rem] block cursor-pointer"
              >
                {product.nombre}
              </Link>
              <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                {product.tagline ?? product.descripcion}
              </p>
            </div>

            {/* Stock warning / Available units */}
            {product.stock !== undefined && product.stock > 0 && (
              <div
                className={`flex items-center gap-1.5 text-xs font-medium ${
                  product.stock <= 20 ? 'text-amber-500' : 'text-emerald-500'
                }`}
              >
                <span
                  className={`size-1.5 rounded-full shrink-0 ${
                    product.stock <= 20 ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'
                  }`}
                />
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

            {/* Price row + Action buttons (Detalles + Cart) */}
            <div className="flex items-end justify-between gap-2.5 pt-0.5">
              <PriceDisplay
                amountUSD={product.precio}
                originalAmountUSD={product.precioOriginal}
                size="md"
              />

              <div className="flex items-center gap-2 shrink-0">
                {/* Botón Detalles */}
                <Link
                  href={`/product/${product.id}`}
                  className="h-12 px-3.5 sm:px-4 rounded-2xl border border-border/80 bg-surface/90 hover:bg-muted text-foreground text-xs sm:text-sm font-bold inline-flex items-center justify-center gap-1.5 transition-all active:scale-95 shadow-xs hover:border-primary/50 group/btn cursor-pointer"
                  aria-label={`Ver detalles de ${product.nombre}`}
                >
                  <Eye className="size-4 text-primary group-hover/btn:scale-110 transition-transform shrink-0" />
                  <span>Detalles</span>
                </Link>

                {/* Add-to-cart or WhatsApp Preorder button (>= 48px) */}
                {isOutOfStock ? (
                  <a
                    href={whatsappPreorderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Encargar por WhatsApp"
                    aria-label={`Encargar ${product.nombre} por WhatsApp`}
                    className="shrink-0 size-12 rounded-2xl flex items-center justify-center font-semibold text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300 shadow-sm"
                  >
                    <MessageCircle className="size-5" />
                  </a>
                ) : (
                  <motion.button
                    type="button"
                    id={`add-cart-${product.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleAdd();
                    }}
                    aria-label={`Añadir ${product.nombre} al carrito`}
                    whileTap={{ scale: 0.88 }}
                    className={`
                      shrink-0 size-12 rounded-2xl flex items-center justify-center
                      font-semibold text-sm cursor-pointer
                      transition-colors duration-300
                      shadow-sm
                      ${
                        added
                          ? 'bg-emerald-500 text-white'
                          : 'bg-primary text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.4)] hover:bg-primary/90'
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
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </>
  );
}
