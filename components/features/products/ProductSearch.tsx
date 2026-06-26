'use client';

import { Search } from 'lucide-react';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function ProductSearch({
  value,
  onChange,
  placeholder = 'Buscar producto...',
}: ProductSearchProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="search"
        aria-label="Buscar"
        className="w-full glass rounded-xl pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 ring-primary/40"
      />
    </div>
  );
}