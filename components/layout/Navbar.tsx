'use client';

import Link from 'next/link';
import { ShoppingBag, Menu, X } from 'lucide-react';
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

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 mt-4">
        {/* Transparent dark blue ink capsule navbar */}
        <nav className="glass-dark rounded-full pl-4 pr-2 sm:pl-6 sm:pr-3 py-2 flex items-center justify-between shadow-elegant border border-white/10">
          
          <Link href="/" className="flex items-center gap-2.5 group" aria-label={BRAND.name}>
            {/* White-themed or matching logo */}
            <Logo size="sm" textClassName="text-primary" />
            <span className="hidden sm:inline text-[10px] font-mono uppercase text-white/50 border border-white/10 rounded-full px-2 py-0.5">
              {BRAND.version}
            </span>
          </Link>

          {/* Links for desktop */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((l) => {
              if (!l) return null;

              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all text-white/70 hover:text-white hover:bg-white/5"
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1">
            {/* Cart Button: Stylized in White to pop out of the dark navbar */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative size-10 rounded-full bg-white text-ink flex items-center justify-center hover:bg-white/90 active:scale-95 transition-all"
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="size-4" />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold size-5 rounded-full flex items-center justify-center border-2 border-ink"
                >
                  {count}
                </motion.span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden size-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menú"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu dropdown in matching dark glass */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden glass-dark rounded-3xl mt-2 p-2 flex flex-col border border-white/10 shadow-elegant"
            >
              {NAV_LINKS.map((l) => {
                if (!l) return null;

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-2xl text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {l.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}