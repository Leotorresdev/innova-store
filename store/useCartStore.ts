import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/types';

export interface CartItem extends Product {
  cantidad: number;
  bundleLabel?: string;
}

export interface ExpressCheckoutItem {
  id: string | number;
  nombre: string;
  precio: number;
  precioOriginal?: number;
  cantidad: number;
  imagen: string;
  categoria?: string;
  bundleLabel?: string;
  stock?: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  hasHydrated: boolean;
  expressCheckoutOpen: boolean;
  expressItems: ExpressCheckoutItem[] | null; // null = usar items del carrito
  setHasHydrated: (state: boolean) => void;
  setOpen: (open: boolean) => void;
  openExpressCheckout: (directItems?: ExpressCheckoutItem[]) => void;
  closeExpressCheckout: () => void;
  add: (product: Product, qty?: number, customUnitPrice?: number, bundleLabel?: string) => void;
  remove: (id: string | number) => void;
  setQty: (id: string | number, cantidad: number) => void;
  clear: () => void;
}

interface CartComputed {
  total: number;
  count: number;
}

interface CartStore extends CartState {
  getTotal: () => number;
  getCount: () => number;
  getTotals: () => CartComputed;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      expressCheckoutOpen: false,
      expressItems: null,

      setHasHydrated: (state) => set({ hasHydrated: state }),
      setOpen: (open) => set({ isOpen: open }),

      openExpressCheckout: (directItems) =>
        set({
          isOpen: false,
          expressCheckoutOpen: true,
          expressItems: directItems && directItems.length > 0 ? directItems : null,
        }),

      closeExpressCheckout: () =>
        set({
          expressCheckoutOpen: false,
          expressItems: null,
        }),

      add: (product, qty, customUnitPrice, bundleLabel) =>
        set((state) => {
          const isWholesale = product.categoria === 'Mayorista';
          const initialQty = qty ?? (isWholesale ? 5 : 1);
          const effectivePrice = customUnitPrice ?? product.precio;

          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id
                  ? {
                      ...i,
                      cantidad: qty ? qty : i.cantidad + 1,
                      precio: effectivePrice,
                      bundleLabel: bundleLabel ?? i.bundleLabel,
                    }
                  : i
              ),
              isOpen: true,
            };
          }
          return {
            items: [
              ...state.items,
              {
                ...product,
                precio: effectivePrice,
                cantidad: initialQty,
                bundleLabel,
              },
            ],
            isOpen: true,
          };
        }),

      remove: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      setQty: (id, cantidad) =>
        set((state) => {
          const item = state.items.find((i) => i.id === id);
          if (!item) return state;

          const isWholesale = item.categoria === 'Mayorista';
          const minQty = isWholesale ? 5 : 1;

          // Si baja de 1 o si es mayorista y baja de 5, lo eliminamos
          if (cantidad <= 0 || (isWholesale && cantidad < minQty)) {
            return { items: state.items.filter((i) => i.id !== id) };
          }

          return {
            items: state.items.map((i) => (i.id === id ? { ...i, cantidad } : i)),
          };
        }),

      clear: () => set({ items: [] }),

      getTotal: () =>
        Number(
          get()
            .items.reduce((acc, i) => acc + i.precio * i.cantidad, 0)
            .toFixed(2)
        ),

      getCount: () => get().items.reduce((acc, i) => acc + i.cantidad, 0),

      getTotals: () => {
        const items = get().items;
        return {
          total: Number(
            items.reduce((acc, i) => acc + i.precio * i.cantidad, 0).toFixed(2)
          ),
          count: items.reduce((acc, i) => acc + i.cantidad, 0),
        };
      },
    }),
    {
      name: 'innova-cart-v1',
      storage: createJSONStorage(() => localStorage),
      // Solo persistimos items, evitamos abrir el modal automáticamente tras recargas
      partialize: (state) => ({ items: state.items }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

/** Selector helpers para evitar re-renders innecesarios. */
export const selectCartItems = (s: CartStore) => s.items;
export const selectCartIsOpen = (s: CartStore) => s.isOpen;
export const selectCartCount = (s: CartStore) => s.getCount();
export const selectCartTotal = (s: CartStore) => s.getTotal();
export const selectCartHasHydrated = (s: CartStore) => s.hasHydrated;
