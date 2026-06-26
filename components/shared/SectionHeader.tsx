import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'left' | 'center';
  cta?: { label: string; href: string };
  className?: string;
}

/**
 * Encabezado reutilizable para secciones (eyebrow mono + título display + descripción + opcional CTA).
 */
export function SectionHeader({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
  cta,
  className,
}: SectionHeaderProps) {
  const isCenter = align === 'center';
  return (
    <div
      className={cn(
        'flex flex-wrap items-end justify-between gap-4',
        isCenter && 'flex-col items-center text-center',
        className,
      )}
    >
      <div className={cn(isCenter && 'text-center')}>
        {eyebrow && (
          <p className="font-mono text-xs uppercase tracking-wider text-primary mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          {title}{' '}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </h2>
        {description && (
          <p
            className={cn(
              'mt-3 text-muted-foreground',
              isCenter ? 'max-w-2xl' : 'max-w-lg',
            )}
          >
            {description}
          </p>
        )}
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="inline-flex items-center gap-2 bg-white border border-border text-sm font-medium px-5 py-2.5 rounded-full hover:bg-surface transition"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}