import { create } from 'zustand';
import type { Product } from '@/types';

export interface CartItem extends Product {
  cantidad: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  add: (product: Product) => void;
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

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  setOpen: (open) => set({ isOpen: open }),

  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, cantidad: i.cantidad + 1 } : i,
          ),
          isOpen: true,
        };
      }
      return {
        items: [...state.items, { ...product, cantidad: 1 }],
        isOpen: true,
      };
    }),

  remove: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  setQty: (id, cantidad) =>
    set((state) => ({
      items:
        cantidad <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => (i.id === id ? { ...i, cantidad } : i)),
    })),

  clear: () => set({ items: [] }),

  getTotal: () =>
    get().items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),

  getCount: () => get().items.reduce((acc, i) => acc + i.cantidad, 0),

  getTotals: () => {
    const items = get().items;
    return {
      total: items.reduce((acc, i) => acc + i.precio * i.cantidad, 0),
      count: items.reduce((acc, i) => acc + i.cantidad, 0),
    };
  },
}));

/** Selector helpers para evitar re-renders innecesarios. */
export const selectCartItems = (s: CartStore) => s.items;
export const selectCartIsOpen = (s: CartStore) => s.isOpen;
export const selectCartCount = (s: CartStore) => s.getCount();
export const selectCartTotal = (s: CartStore) => s.getTotal();
