'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import type { Product } from '@/types';

export function BuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const add = useCartStore((s) => s.add);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock !== undefined && product.stock <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    add(product);
    setAdded(true);
    
    if (typeof window !== 'undefined') {
      import('@vercel/analytics').then(({ track }) => {
        track('add_to_cart', { 
          product_name: product.nombre, 
          product_price: product.precio
        });
      });
    }

    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    add(product);
    router.push('/pay');
  };

  return (
    <div className="glass-card p-6 md:p-8 flex flex-col gap-6 sticky top-24">
      <div>
        <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
          {product.badge || (isOutOfStock ? 'Agotado' : 'Nuevo')} | +{Math.floor(product.ventas / 100) * 100} vendidos
        </p>
        <h1 className="text-3xl font-display font-bold leading-tight mt-2">{product.nombre}</h1>
        
        {/* Rating Mock */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex text-primary">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`size-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-neutral-300 fill-current'}`} viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-muted-foreground font-medium">({product.ventas})</span>
        </div>
      </div>

      <div className="mt-2">
        <div className="flex items-end gap-3">
          <span className="text-4xl font-display font-bold tracking-tight">
            ${product.precio.toLocaleString('en-US')}
          </span>
        </div>
        {product.descuento && (
          <p className="text-emerald-500 font-semibold mt-1 flex items-center gap-1.5">
            OFERTA ESPECIAL <span className="px-2 py-0.5 bg-emerald-500/10 rounded text-xs">{product.descuento}% OFF</span>
          </p>
        )}
      </div>

      <div className="space-y-5 my-2">
        <div className="flex items-start gap-4">
          <Truck className="size-6 text-emerald-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-emerald-500 font-medium">Envío gratis si llevas más de 5 unidades</p>
            <p className="text-xs text-muted-foreground mt-0.5">Conoce los tiempos y las formas de envío</p>
          </div>
        </div>
      </div>

      {product.stock !== undefined && (
        <div className="flex items-center gap-2 text-sm bg-surface p-3 rounded-xl border border-border">
          <span className="font-medium">Stock disponible:</span>
          <span className={isOutOfStock ? 'text-red-500 font-bold' : 'text-foreground font-semibold'}>
            {isOutOfStock ? 'Agotado' : `${product.stock} unidades`}
          </span>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-2">
        <button
          onClick={handleBuyNow}
          disabled={isOutOfStock}
          className={`w-full py-4 rounded-xl font-bold text-white transition-all text-base
            ${isOutOfStock 
              ? 'bg-neutral-400 cursor-not-allowed' 
              : 'bg-primary hover:bg-primary/90 shadow-glow active:scale-[0.98]'
            }
          `}
        >
          {isOutOfStock ? 'Sin stock' : 'Comprar ahora'}
        </button>

      </div>
      
      {/* Instructions for Payment */}
      <div className="mt-4 pt-6 border-t border-border">
        <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-muted-foreground">Instrucciones de compra</h3>
        <ul className="space-y-5">
          <li className="flex items-start gap-4">
            <div className="flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">1</div>
            <p className="text-sm text-foreground/80 leading-snug">Presiona <strong>Comprar ahora</strong> para ir directo a la página segura de pagos.</p>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">2</div>
            <p className="text-sm text-foreground/80 leading-snug">En la <strong>página de pagos</strong>, completa tus datos de envío y selecciona tu método de pago favorito.</p>
          </li>
          <li className="flex items-start gap-4">
            <div className="flex items-center justify-center size-7 rounded-full bg-primary/10 text-primary text-xs font-bold shrink-0 mt-0.5">3</div>
            <p className="text-sm text-foreground/80 leading-snug">¡Listo! Te enviaremos un sms al WhatsApp para que rastrees tu pedido.</p>
          </li>
        </ul>
      </div>

    </div>
  );
}
