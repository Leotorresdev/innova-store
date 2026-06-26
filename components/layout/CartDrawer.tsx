'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore, selectCartItems, selectCartIsOpen, selectCartTotal } from '@/store/useCartStore';
import { Button } from '@/components/ui/button';

export function CartDrawer() {
  const open = useCartStore(selectCartIsOpen);
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const setOpen = useCartStore((s) => s.setOpen);
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-background/70 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 280 }}
            role="dialog"
            aria-label="Carrito de compras"
            className="fixed right-0 top-0 h-full w-full sm:w-[440px] bg-surface border-l border-border z-[70] flex flex-col shadow-elegant"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-display text-xl font-bold flex items-center gap-2">
                <ShoppingBag className="size-5 text-primary" /> Tu carrito
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10"
                aria-label="Cerrar carrito"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-3">
              {items.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <ShoppingBag className="size-12 mx-auto mb-4 opacity-40" />
                  <p>Tu carrito está vacío</p>
                </div>
              ) : (
                items.map((i) => (
                  <motion.div
                    key={i.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    className="glass rounded-xl p-4 flex gap-3"
                  >
                    <div className="relative size-16 rounded-lg overflow-hidden bg-card shrink-0">
                      <Image
                        src={i.imagen}
                        alt={i.nombre}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{i.nombre}</p>
                          <p className="text-xs text-muted-foreground truncate">{i.descripcion}</p>
                          {i.preorder && i.fechaLanzamiento && (
                            <span className="text-[10px] text-primary font-mono mt-1 inline-block">
                              PREVENTA · {i.fechaLanzamiento}
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(i.id)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-1 glass rounded-lg p-1">
                          <button
                            type="button"
                            onClick={() => setQty(i.id, i.cantidad - 1)}
                            className="p-1 hover:bg-white/10 rounded"
                            aria-label="Restar"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-7 text-center text-sm font-medium">
                            {i.cantidad}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(i.id, i.cantidad + 1)}
                            className="p-1 hover:bg-white/10 rounded"
                            aria-label="Sumar"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <p className="font-display font-bold">
                          ${(i.precio * i.cantidad).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4 bg-surface-elevated">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-mono">${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-display text-lg font-bold">
                  <span>Total</span>
                  <span className="text-gradient">${total.toLocaleString()}</span>
                </div>
                <Button className="w-full rounded-xl py-3.5 h-auto text-sm font-semibold gap-2">
                  Finalizar compra <ArrowRight className="size-4" />
                </Button>
                <button
                  type="button"
                  onClick={clear}
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
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