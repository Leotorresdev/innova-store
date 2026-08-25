'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Truck,
  ShieldCheck,
} from 'lucide-react';
import {
  useCartStore,
  selectCartItems,
  selectCartIsOpen,
  selectCartTotal,
} from '@/store/useCartStore';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
  const open = useCartStore(selectCartIsOpen);
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const setOpen = useCartStore((s) => s.setOpen);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const router = useRouter();

  const handleCheckout = () => {
    const productoExcedido = items.find(item => item.cantidad > item.stock);
    if (productoExcedido) {
      alert(`⚠️ Lo sentimos, no puedes llevar ${productoExcedido.cantidad} unidades de "${productoExcedido.nombre}". Solo quedan ${productoExcedido.stock} en el inventario.`);
      return;
    }
    setOpen(false);
    router.push('/pay');
  };

  const count = items.reduce((acc, i) => acc + i.cantidad, 0);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop (Darker and blurrier for premium feel) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md z-60"
          />

          {/* Drawer (Tesla/Apple Physics) */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.9 }}
            role="dialog"
            aria-label="Carrito de compras"
            className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-white dark:bg-zinc-950 border-l border-zinc-200/60 dark:border-white/10 z-70 flex flex-col shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-zinc-100 dark:border-white/5">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center">
                  <ShoppingBag className="size-4.5 text-zinc-900 dark:text-white" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-semibold text-zinc-900 dark:text-white leading-none">Tu carrito</h2>
                  <p className="text-sm text-zinc-500 mt-0.5 font-medium">
                    {count} {count === 1 ? 'artículo' : 'artículos'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="cart-close-btn"
                onClick={() => setOpen(false)}
                className="size-10 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 flex items-center justify-center transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                aria-label="Cerrar carrito"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* ── Items list ── */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 scrollbar-hide">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center h-full py-24 text-center"
                  >
                    <div className="size-24 rounded-[2rem] bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center mb-6">
                      <ShoppingBag className="size-10 text-zinc-300 dark:text-zinc-700" />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2 text-zinc-900 dark:text-white">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-sm text-zinc-500 max-w-[220px] mx-auto leading-relaxed">
                      Añade productos de tecnología premium para comenzar tu pedido.
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-8 px-6 py-3 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:scale-105 transition-transform"
                    >
                      Explorar tienda
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                      className="rounded-[1.5rem] bg-zinc-50 dark:bg-zinc-900/50 p-4 flex gap-4 group"
                    >
                      {/* Thumbnail */}
                      <div className="relative size-20 rounded-2xl overflow-hidden bg-white dark:bg-zinc-950 shrink-0 border border-zinc-100 dark:border-zinc-800">
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 pr-2">
                            <p className="font-semibold text-sm leading-snug text-zinc-900 dark:text-white truncate">
                              {item.nombre}
                            </p>
                            <p className="text-xs text-zinc-500 truncate mt-0.5">
                              {item.categoria}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="size-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors shrink-0"
                            aria-label={`Eliminar ${item.nombre}`}
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        <div className="flex items-end justify-between mt-2">
                          {/* Qty controls */}
                          <div className="flex items-center rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                            <button
                              type="button"
                              onClick={() => setQty(item.id, item.cantidad - 1)}
                              className="size-7 flex items-center justify-center transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                              aria-label="Restar cantidad"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-7 text-center text-xs font-semibold text-zinc-900 dark:text-white">
                              {item.cantidad}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(item.id, item.cantidad + 1)}
                              className="size-7 flex items-center justify-center transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                              aria-label="Sumar cantidad"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>

                          {/* Line total */}
                          <div className="text-right">
                            <p className="font-display font-semibold text-sm text-zinc-900 dark:text-white">
                              ${(item.precio * item.cantidad).toLocaleString('en-US')}
                            </p>
                            {item.cantidad > 1 && (
                              <p className="text-[10px] text-zinc-400 font-medium mt-0.5">
                                ${item.precio.toLocaleString('en-US')} c/u
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* ── Footer / Checkout ── */}
            {items.length > 0 && (
              <div className="border-t border-zinc-100 dark:border-white/5 px-6 pt-5 pb-6 space-y-5 bg-white dark:bg-zinc-950">
                {/* Summary */}
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">Subtotal</span>
                  <span className="font-display text-2xl font-bold text-zinc-900 dark:text-white leading-none">
                    ${total.toLocaleString('en-US')}
                  </span>
                </div>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="size-4 text-zinc-900 dark:text-white" />
                    Pago seguro
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Truck className="size-4 text-zinc-900 dark:text-white" />
                    Envío nacional
                  </span>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button
                    id="checkout-btn"
                    onClick={handleCheckout}
                    className="w-full rounded-2xl py-6 h-auto text-base font-semibold gap-2 shadow-sm transition-transform active:scale-[0.98]"
                  >
                    Proceder al pago
                    <ArrowRight className="size-4" />
                  </Button>

                  <button
                    type="button"
                    onClick={clear}
                    className="w-full text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors py-2"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}