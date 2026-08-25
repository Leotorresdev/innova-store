import { CartItem } from '@/store/useCartStore';
import React from 'react';

interface OrderSummaryProps {
  items: CartItem[];
  finalTotal: number;
  exchangeRateVES: number | null;
}

export function OrderSummary({ items, finalTotal, exchangeRateVES }: OrderSummaryProps) {
  return (
    <div className="bg-white dark:bg-card border border-zinc-200/60 dark:border-white/10 rounded-[2rem] p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-white mb-6">Resumen del Pedido</h2>
      
      <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
        {items.length > 0 ? (
          items.map(item => (
            <div key={item.id} className="flex gap-4 items-center">
              <div className="relative size-16 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-900 shrink-0 border border-zinc-100 dark:border-zinc-800">
                <img src={item.imagen} alt={item.nombre} className="object-cover w-full h-full" />
                <span className="absolute -top-1.5 -right-1.5 size-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] rounded-full flex items-center justify-center font-bold shadow-sm">
                  {item.cantidad}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-zinc-900 dark:text-white truncate">{item.nombre}</p>
                <p className="text-xs text-zinc-500 mt-0.5">${item.precio.toLocaleString('en-US')}</p>
              </div>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                ${(item.precio * item.cantidad).toLocaleString('en-US')}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500 text-center py-4">
            Tu carrito está vacío
          </p>
        )}
      </div>

      <div className="pt-6 border-t border-zinc-100 dark:border-white/5">
        <div className="flex justify-between items-end">
          <span className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Total a Pagar</span>
          <div className="text-right">
            <span className="text-2xl font-display font-bold text-zinc-900 dark:text-white block">
              ${finalTotal.toLocaleString('en-US')}
            </span>
            <span className="text-sm font-medium text-zinc-500 mt-1 block">
              {exchangeRateVES 
                ? `~ Bs. ${(finalTotal * exchangeRateVES).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (BCV)`
                : 'Calculando tasa BCV...'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
