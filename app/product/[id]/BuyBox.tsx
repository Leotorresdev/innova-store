'use client';

import { useState, useMemo } from 'react';
import { Check, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import {
  BundleSelector,
  getBundleOptions,
  type BundleOption,
} from '@/components/features/products/BundleSelector';
import { LocalTrustBadges } from '@/components/features/products/LocalTrustBadges';
import { StickyMobileCTA } from '@/components/features/products/StickyMobileCTA';
import { buildWhatsAppUrl } from '@/config/storeConfig';
import type { Product } from '@/types';

export function BuyBox({ product }: { product: Product }) {
  const add = useCartStore((s) => s.add);
  const openExpressCheckout = useCartStore((s) => s.openExpressCheckout);

  const bundleOptions = useMemo(() => getBundleOptions(product.precio), [product.precio]);
  const [selectedBundle, setSelectedBundle] = useState<BundleOption>(bundleOptions[0]);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  // Calcular precio original comparativo (si el producto base tiene precio original con oferta)
  const displayOriginalUSD = useMemo(() => {
    if (product.precioOriginal && product.precioOriginal > product.precio) {
      return Number((product.precioOriginal * selectedBundle.quantity).toFixed(2));
    }
    return undefined;
  }, [selectedBundle.quantity, product.precioOriginal, product.precio]);

  const handleOrderNowExpress = () => {
    if (isOutOfStock) return;

    openExpressCheckout([
      {
        id: product.id,
        nombre: product.nombre,
        precio: selectedBundle.unitPriceUSD,
        precioOriginal: product.precio,
        cantidad: selectedBundle.quantity,
        imagen: product.imagen,
        categoria: product.categoria,
        bundleLabel:
          selectedBundle.quantity === 1
            ? '1 Unidad'
            : selectedBundle.freeShipping
              ? `${selectedBundle.quantity} Unidades (Envío Gratis)`
              : `${selectedBundle.quantity} Unidades`,
        stock: product.stock,
      },
    ]);
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    add(
      product,
      selectedBundle.quantity,
      selectedBundle.unitPriceUSD,
      selectedBundle.freeShipping
        ? `Pack ${selectedBundle.quantity}x (Envío Gratis)`
        : selectedBundle.quantity > 1
          ? `Pack ${selectedBundle.quantity}x`
          : undefined
    );
    setAdded(true);

    if (typeof window !== 'undefined') {
      import('@vercel/analytics')
        .then(({ track }) => {
          track('add_to_cart', {
            product_name: product.nombre,
            product_price: selectedBundle.totalUSD,
            quantity: selectedBundle.quantity,
          });
        })
        .catch(() => null);
    }

    setTimeout(() => setAdded(false), 1800);
  };

  const outOfStockWhatsAppUrl = buildWhatsAppUrl(
    `¡Hola Innova Company! 👋 Me interesa encargar o consultar disponibilidad del producto: ${product.nombre} ($${product.precio.toFixed(2)})`
  );

  return (
    <>
      <div className="glass-card p-5 sm:p-7 md:p-8 flex flex-col gap-5 sticky top-24">
        {/* Header: Badge + Title + Rating */}
        <div>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              <Sparkles className="size-3.5 text-primary" />
              {product.badge || (isOutOfStock ? 'Agotado' : 'Disponible en Venezuela')} · +
              {Math.max(50, Math.floor(product.ventas / 10) * 10)} entregados
            </span>

            {product.stock !== undefined && (
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isOutOfStock
                    ? 'bg-red-500/10 text-red-500'
                    : product.stock <= 10
                      ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400'
                      : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                }`}
              >
                {isOutOfStock ? 'Sin Stock' : `${product.stock} en stock`}
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-bold leading-tight mt-2 text-foreground">
            {product.nombre}
          </h1>

          {/* Estrellas de Valoración */}
          <div className="flex items-center gap-2 mt-2.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`size-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : 'text-neutral-300 fill-current'
                  }`}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-xs sm:text-sm text-muted-foreground font-medium">
              5.0 ({product.ventas} clientes verificados)
            </span>
          </div>
        </div>

        {/* Sistema de Doble Moneda (USD + Bolívares BCV) */}
        <div className="pt-1 pb-2 border-b border-border/60">
          <PriceDisplay
            amountUSD={selectedBundle.totalUSD}
            originalAmountUSD={displayOriginalUSD}
            size="lg"
          />
          {selectedBundle.freeShipping ? (
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1.5">
              <span>🚚</span> ¡Felicidades! Este pedido incluye <strong>ENVÍO GRATIS</strong> por MRW o Zoom a toda Venezuela.
            </p>
          ) : (
            <p className="text-xs text-muted-foreground mt-2">
              💡 Compra más de 4 unidades y obtén <strong className="text-emerald-600 dark:text-emerald-400">ENVÍO GRATIS</strong> nacional por MRW / Zoom.
            </p>
          )}
        </div>

        {/* Selector de Ofertas por Volumen (Bundles) */}
        {!isOutOfStock && (
          <BundleSelector
            basePriceUSD={product.precio}
            selectedQuantity={selectedBundle.id}
            onSelect={setSelectedBundle}
            availableStock={product.stock}
          />
        )}

        {/* Botones de Acción Principal (min-h 48px+) */}
        <div className="flex flex-col gap-3 pt-1">
          {isOutOfStock ? (
            <a
              href={outOfStockWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-14 py-4 px-6 rounded-2xl font-display font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all text-base flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98]"
            >
              <MessageCircle className="size-5 shrink-0" />
              <span>Encargar por WhatsApp</span>
            </a>
          ) : (
            <>
              <button
                type="button"
                id="pdp-express-buy-btn"
                onClick={handleOrderNowExpress}
                className="w-full min-h-14 py-4 px-6 rounded-2xl font-display font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/25 transition-all text-base flex items-center justify-center gap-2.5 active:scale-[0.98] cursor-pointer"
              >
                <MessageCircle className="size-5 shrink-0" />
                <span>Pedir Ahora / Pagar al Confirmar</span>
              </button>

              <button
                type="button"
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className={`w-full min-h-12 py-3 px-5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all active:scale-[0.98] cursor-pointer ${
                  added
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                    : 'bg-surface hover:bg-muted border-border text-foreground'
                }`}
              >
                {added ? (
                  <>
                    <Check className="size-4 stroke-[2.5]" />
                    <span>¡Agregado al carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    <span>Añadir al carrito ({selectedBundle.quantity}x)</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>

        {/* Bloque de Confianza Local (Trust & Social Proof Venezolano) */}
        <LocalTrustBadges />
      </div>

      {/* Barra Inferior Fija para Móviles (Sticky Mobile CTA) */}
      <StickyMobileCTA
        totalUSD={selectedBundle.totalUSD}
        originalTotalUSD={displayOriginalUSD}
        quantity={selectedBundle.quantity}
        isOutOfStock={isOutOfStock}
        onOrderNow={handleOrderNowExpress}
      />
    </>
  );
}
