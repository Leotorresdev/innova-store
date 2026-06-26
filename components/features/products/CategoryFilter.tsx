'use client';

import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({ categories, active, onChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          className={cn(
            'px-4 py-2 rounded-xl text-sm font-medium transition',
            active === c
              ? 'bg-gradient-primary text-primary-foreground shadow-glow'
              : 'glass hover:bg-white/10',
          )}
        >
          {c}
        </button>
      ))}
    </div>
  );
}