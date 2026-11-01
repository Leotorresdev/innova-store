'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Check, MessageCircle } from 'lucide-react';
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
  const router = useRouter();
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
          onClick={() => {
            if (!isOutOfStock) {
              router.push(`/product/${product.id}`);
            }
          }}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          whileHover={!isOutOfStock ? { y: -8, scale: 1.015 } : {}}
          transition={{
            duration: 0.8,
            delay: Math.min(index * 0.08, 0.4),
            ease: [0.16, 1, 0.3, 1],
            scale: { type: 'spring', stiffness: 300, damping: 20 },
            y: { type: 'spring', stiffness: 300, damping: 20 },
          }}
          className={`
            relative flex flex-col h-full
            glass-card ${isOutOfStock ? 'cursor-default opacity-80' : 'cursor-pointer'}
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

            {/* Dark scrim — only visible on hover for the CTA */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Quick-buy CTA that slides up */}
            <div
              className="absolute inset-x-4 bottom-4
              translate-y-3 opacity-0
              group-hover:translate-y-0 group-hover:opacity-100
              transition-all duration-300 ease-out z-20"
            >
              {isOutOfStock ? (
                <a
                  href={whatsappPreorderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-full min-h-12 flex items-center justify-center gap-2
                    bg-emerald-600 hover:bg-emerald-700 text-white
                    text-xs font-semibold py-3 rounded-2xl
                    transition-all duration-200 shadow-lg"
                >
                  <MessageCircle className="size-4" />
                  Encargar por WhatsApp
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
                  className="w-full min-h-12 flex items-center justify-center gap-2
                    bg-emerald-600 hover:bg-emerald-700 text-white
                    text-sm font-bold py-3 rounded-2xl
                    active:scale-[0.97]
                    transition-all duration-200 shadow-lg cursor-pointer"
                >
                  <MessageCircle className="size-4" />
                  Pedir Ahora / Pagar al Confirmar
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
              <h3
                className="font-display font-bold leading-tight
                group-hover:text-primary transition-colors duration-200
                text-lg sm:text-[1.1rem]"
              >
                {product.nombre}
              </h3>
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

            {/* Price row + Add button */}
            <div className="flex items-end justify-between gap-3 pt-0.5">
              <PriceDisplay
                amountUSD={product.precio}
                originalAmountUSD={product.precioOriginal}
                size="md"
              />

              {/* Add-to-cart or WhatsApp Preorder button (>= 48px) */}
              {isOutOfStock ? (
                <a
                  href={whatsappPreorderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
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
                    e.stopPropagation();
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
        </motion.article>
      </div>
    </>
  );
}
