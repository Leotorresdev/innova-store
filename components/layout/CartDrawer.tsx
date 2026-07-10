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
  Tag,
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

  const count = items.reduce((acc, i) => acc + i.cantidad, 0);
  const SHIPPING_COST = 5; // Costo de envío configurable

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-ink/50 backdrop-blur-md z-60"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            role="dialog"
            aria-label="Carrito de compras"
            className="fixed right-0 top-0 h-full w-full sm:w-115 bg-background border-l border-border z-70 flex flex-col"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/60">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShoppingBag className="size-4 text-primary" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold leading-none">Tu carrito</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {count} {count === 1 ? 'artículo' : 'artículos'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                id="cart-close-btn"
                onClick={() => setOpen(false)}
                className="size-9 rounded-xl hover:bg-muted flex items-center justify-center transition"
                aria-label="Cerrar carrito"
              >
                <X className="size-5" />
              </button>
            </div>



            {/* ── Items list ── */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full py-24 text-center"
                  >
                    <div className="size-20 rounded-3xl bg-muted flex items-center justify-center mb-5">
                      <ShoppingBag className="size-9 text-muted-foreground/40" />
                    </div>
                    <h3 className="font-display text-lg font-semibold mb-2">
                      Tu carrito está vacío
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-50">
                      Añade productos para comenzar tu pedido.
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="mt-6 px-5 py-2.5 rounded-full bg-ink text-ink-foreground text-sm font-medium hover:opacity-90 transition"
                    >
                      Ver productos
                    </button>
                  </motion.div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 60, scale: 0.95 }}
                      transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                      className="rounded-2xl bg-card border border-border/60 p-4 flex gap-4 group"
                    >
                      {/* Thumbnail */}
                      <div className="relative size-20 rounded-xl overflow-hidden bg-surface shrink-0">
                        <Image
                          src={item.imagen}
                          alt={item.nombre}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="font-semibold text-sm leading-snug truncate">
                              {item.nombre}
                            </p>
                            <p className="text-xs text-muted-foreground truncate mt-0.5">
                              {item.categoria}
                            </p>
                            {item.preorder && item.fechaLanzamiento && (
                              <span className="text-[10px] text-primary font-mono mt-1 inline-block">
                                PREVENTA · {item.fechaLanzamiento}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="size-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition shrink-0"
                            aria-label={`Eliminar ${item.nombre}`}
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Qty controls */}
                          <div className="flex items-center rounded-xl border border-border/60 overflow-hidden">
                            <button
                              type="button"
                              onClick={() => setQty(item.id, item.cantidad - 1)}
                              className="size-8 flex items-center justify-center hover:bg-muted transition text-muted-foreground hover:text-foreground"
                              aria-label="Restar cantidad"
                            >
                              <Minus className="size-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-semibold">
                              {item.cantidad}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(item.id, item.cantidad + 1)}
                              className="size-8 flex items-center justify-center hover:bg-muted transition text-muted-foreground hover:text-foreground"
                              aria-label="Sumar cantidad"
                            >
                              <Plus className="size-3" />
                            </button>
                          </div>

                          {/* Line total */}
                          <div className="text-right">
                            <p className="font-display font-bold text-base">
                              ${(item.precio * item.cantidad).toLocaleString()}
                            </p>
                            {item.cantidad > 1 && (
                              <p className="text-[10px] text-muted-foreground">
                                ${item.precio.toLocaleString()} c/u
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
              <div className="border-t border-border/60 px-6 pt-5 pb-6 space-y-4 bg-surface">
                {/* Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Productos</span>
                    <span className="font-mono">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-mono">${SHIPPING_COST.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-display text-lg font-bold pt-2 border-t border-border/60">
                    <span>Total</span>
                    <span className="text-gradient">
                      ${(total + SHIPPING_COST).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="size-3.5 text-emerald-500" />
                    Pago seguro
                  </span>
                  <span className="flex items-center gap-1">
                    <Truck className="size-3.5 text-primary" />
                    Envío rápido
                  </span>
                </div>

                {/* CTA */}
                <Button
                  id="checkout-btn"
                  onClick={() => {
                    setOpen(false);
                    router.push('/pay');
                  }}
                  className="w-full rounded-xl py-3.5 h-auto text-sm font-semibold gap-2 shadow-glow"
                >
                  Comprar
                  <ArrowRight className="size-4" />
                </Button>

                <button
                  type="button"
                  onClick={clear}
                  className="w-full text-xs text-muted-foreground hover:text-foreground transition py-1"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}