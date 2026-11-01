import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { BuyBox } from './BuyBox';
import type { Product } from '@/types';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Try to find the product in the database
  const dbProduct = await prisma.product.findUnique({
    where: { id: resolvedParams.id },
  });

  if (!dbProduct) {
    notFound();
  }
  
  const now = new Date();
  const isPresale = dbProduct.type === 'PRESALE';
  const isPresaleEnded = isPresale && Boolean(dbProduct.presaleEndDate && dbProduct.presaleEndDate <= now);
  
  // Calculate price based on whether it's an active presale, ended presale (wholesale), or normal product
  let currentPrice = dbProduct.price;
  let currentRegular = dbProduct.regularPrice || Math.round(dbProduct.price * 1.25);
  
  if (isPresale && isPresaleEnded && dbProduct.wholesalePrice) {
    currentPrice = dbProduct.wholesalePrice;
    if (dbProduct.wholesaleRegularPrice) {
      currentRegular = dbProduct.wholesaleRegularPrice;
    }
  }

  // Número de ventas determinista y estable para evitar advertencias de hidratación
  const stableSales = 60 + (((dbProduct.id.charCodeAt(0) || 0) + dbProduct.name.length * 7) % 140);

  // Map DB product to the UI Product type
  const product: Product = {
    id: dbProduct.id,
    nombre: dbProduct.name,
    precio: currentPrice,
    precioOriginal: currentRegular,
    categoria: isPresale ? (isPresaleEnded ? 'Mayorista' : 'Preventa') : (dbProduct.isNew ? 'Novedad' : 'Tecnología'),
    imagen: dbProduct.imageUrl,
    rating: 5,
    ventas: stableSales,
    etiqueta: isPresale ? (isPresaleEnded ? 'Al Mayor' : 'Preventa') : (dbProduct.isNew ? 'Nuevo' : undefined),
    descuento: currentRegular > currentPrice ? Math.round(((currentRegular - currentPrice) / currentRegular) * 100) : undefined,
    stock: dbProduct.stock,
    descripcion: dbProduct.description,
    descripcionLarga: dbProduct.description, // Fallback since DB only has one description
  };

  return (
    <div className="min-h-screen pt-28 sm:pt-32 pb-32 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Barra de Navegación de Retorno */}
        <div className="mb-5 sm:mb-7 flex items-center justify-between gap-4">
          <Link
            href="/#tienda"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/80 bg-surface/90 hover:bg-surface text-foreground text-xs sm:text-sm font-semibold transition-all shadow-sm active:scale-95 group backdrop-blur-md cursor-pointer"
            aria-label="Volver a todos los productos"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 text-primary shrink-0" />
            <span>Volver a productos</span>
          </Link>

          {/* Breadcrumb sutil en pantallas medianas y grandes */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/#tienda" className="hover:text-foreground transition-colors">
              Catálogo
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[240px]">
              {product.nombre}
            </span>
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          
          {/* Left Column: Image Gallery & Description */}
          <div className="w-full lg:w-3/5 space-y-12">
            
            {/* Main Image */}
            <div className="glass-card rounded-3xl overflow-hidden aspect-[4/3] relative flex items-center justify-center bg-surface">
              <Image
                src={product.imagen}
                alt={product.nombre}
                fill
                priority
                fetchPriority="high"
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>

            {/* Extended Description */}
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-border pb-4">
                <h2 className="text-2xl font-display font-bold">Descripción del producto</h2>
              </div>
              
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <div className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                  {product.descripcionLarga || product.descripcion}
                </div>
              </div>

              {/* Botón secundario para seguir explorando el catálogo */}
              <div className="pt-6 border-t border-border/60 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">¿Buscas otros modelos o accesorios?</p>
                  <p className="text-xs text-muted-foreground">Explora todos los productos disponibles con entrega inmediata.</p>
                </div>
                <Link
                  href="/#tienda"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface hover:bg-muted text-foreground text-xs sm:text-sm font-semibold transition-all active:scale-95 group cursor-pointer"
                >
                  <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 text-primary" />
                  <span>Explorar más productos</span>
                </Link>
              </div>
            </div>
            
          </div>

          {/* Right Column: Buy Box */}
          <div className="w-full lg:w-2/5">
            <BuyBox product={product} />
          </div>

        </div>
      </div>
    </div>
  );
}
