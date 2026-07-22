'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { AlertTriangle } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import type { WholesaleItem } from '@/types';
import { useCountdown } from '@/hooks/useCountdown';

interface PreorderCardProps {
  item: WholesaleItem;
  index?: number;
}

export function PreorderCard({ item, index = 0 }: PreorderCardProps) {
  const add = useCartStore((s) => s.add);
  const setOpen = useCartStore((s) => s.setOpen);
  
  // Use dates to determine status if it's the active presale. If not passed, it's wholesale.
  const { status } = useCountdown(item.presaleStartDate || null, item.presaleEndDate || null);
  
  const isWholesaleMode = !item.presaleEndDate || status === 'ENDED';
  const isBefore = status === 'BEFORE';
  const isDuring = status === 'DURING';
  
  let buttonLabel = 'Comprar Al Mayor';
  if (isBefore) buttonLabel = 'Próximamente';
  if (isDuring) buttonLabel = 'Comprar Preventa';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className={`rounded-3xl glass-card overflow-hidden flex flex-col h-full`}
    >
      <div className="relative p-4">
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
          <span className="rounded-md bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2.5 py-1">
            {isWholesaleMode ? 'Venta al por mayor' : 'Preventa Exclusiva'}
          </span>
          <span
            className={`inline-flex items-center gap-1 rounded-md text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${
              item.low
                ? 'bg-destructive text-destructive-foreground'
                : 'bg-destructive/90 text-destructive-foreground'
            }`}
          >
            {item.low && <AlertTriangle className="size-3" />}
            Solo quedan {item.stock} unidades
          </span>
        </div>
        <div className="relative aspect-square rounded-2xl bg-ink overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
        <h3 className="font-display text-xl font-bold">{item.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {item.description}
        </p>

        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground line-through">
              Regular: ${item.regular.toLocaleString()}.00
            </p>
            <p className="font-display text-2xl font-bold mt-0.5">
              ${item.price.toLocaleString()}.00
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
              Ahorro
            </p>
            <span className="inline-block mt-1 rounded-md bg-primary text-primary-foreground text-xs font-bold px-2 py-1">
              {item.off}% OFF
            </span>
          </div>
        </div>

        <button
          type="button"
          disabled={isBefore || item.stock === 0}
          onClick={() => {
            add({
              id: item.id, // ID real de la base de datos
              nombre: item.name,
              descripcion: item.description,
              precio: item.price,
              precioOriginal: item.regular,
              categoria: isWholesaleMode ? 'Mayorista' : 'Preventa',
              imagen: item.image,
              rating: 5,
              ventas: 0,
              stock: item.stock,
              tagline: item.description,
              preorder: !isWholesaleMode,
              fechaLanzamiento: 'Pronto',
            });
            setOpen(true);
          }}
          className={`mt-6 w-full rounded-2xl py-3.5 text-sm font-semibold transition-all duration-300 shadow-sm
            ${
              isBefore || item.stock === 0
                ? 'bg-neutral-200/50 text-neutral-400 cursor-not-allowed'
                : 'bg-ink text-ink-foreground hover:bg-ink/90 active:scale-[0.98]'
            }
          `}
        >
          {item.stock === 0 ? 'Agotado' : buttonLabel}
        </button>
      </div>
    </motion.article>
  );
}