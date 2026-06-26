'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X, Search, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, selectCartCount } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { Logo } from '@/components/shared/Logo';
import { NAV_LINKS, BRAND } from '@/lib/constants';

export function Navbar() {
  const count = useCartStore(selectCartCount);
  const setCartOpen = useCartStore((s) => s.setOpen);
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const setMobileMenuOpen = useUIStore((s) => s.setIsMobileMenuOpen);
  const setSearchOpen = useUIStore((s) => s.setIsSearchOpen);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-4">
        <nav className="glass rounded-full pl-4 pr-2 sm:pl-6 sm:pr-3 py-2 flex items-center justify-between shadow-card">
          <Link href="/" className="flex items-center gap-2.5 group" aria-label={BRAND.name}>
            <Logo size="sm" />
            <span className="hidden sm:inline text-[10px] font-mono uppercase text-muted-foreground border border-border rounded-full px-2 py-0.5">
              {BRAND.version}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 rounded-full text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex size-10 rounded-full items-center justify-center hover:bg-muted transition"
            >
              <Search className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Favoritos"
              className="hidden sm:flex size-10 rounded-full items-center justify-center hover:bg-muted transition"
            >
              <Heart className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative size-10 rounded-full bg-ink text-ink-foreground flex items-center justify-center hover:opacity-90 transition"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="size-4" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold size-5 rounded-full flex items-center justify-center border-2 border-background"
                >
                  {count}
                </motion.span>
              )}
            </button>
            <button
              type="button"
              className="md:hidden size-10 rounded-full flex items-center justify-center hover:bg-muted"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden glass rounded-3xl mt-2 p-2 flex flex-col"
            >
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl text-sm font-medium hover:bg-muted"
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}