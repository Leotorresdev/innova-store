import Image from 'next/image';
import { ASSETS, BRAND } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showVersion?: boolean;
  className?: string;
  textClassName?: string;
}

/**
 * Logo de marca. En light usa ink como fondo (logo claro dentro).
 * En dark usa ink invertida (logo oscuro) — por defecto siempre ink.
 */
export function Logo({
  variant = 'light',
  size = 'md',
  showVersion = false,
  className,
  textClassName,
}: LogoProps) {
  const dim = size === 'sm' ? 'size-8' : size === 'lg' ? 'size-12' : 'size-10';
  const text =
    size === 'sm'
      ? 'text-base'
      : size === 'lg'
        ? 'text-2xl'
        : 'text-xl';

  return (
    <div className={cn('flex items-center gap-2.5 group', className)}>
      <div
        className={cn(
          dim,
          'rounded-lg p-1',
          variant === 'light' ? 'bg-white' : 'bg-ink',
        )}
      >
        <Image
          src={ASSETS.logo}
          alt={BRAND.name}
          width={64}
          height={64}
          className="size-full object-contain"
        />
      </div>
      <span className={cn('font-display font-bold tracking-tight', text, textClassName)}>
        {BRAND.name}
      </span>
      {showVersion && (
        <span className="hidden sm:inline text-[10px] font-mono uppercase text-muted-foreground border border-border rounded-full px-2 py-0.5">
          {BRAND.version}
        </span>
      )}
    </div>
  );
}