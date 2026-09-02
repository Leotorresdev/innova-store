import { notFound } from 'next/navigation';
import Image from 'next/image';
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

  // Map DB product to the UI Product type
  const product: Product = {
    id: dbProduct.id,
    nombre: dbProduct.name,
    precio: currentPrice,
    precioOriginal: currentRegular,
    categoria: isPresale ? (isPresaleEnded ? 'Mayorista' : 'Preventa') : (dbProduct.isNew ? 'Novedad' : 'Tecnología'),
    imagen: dbProduct.imageUrl,
    rating: 5,
    ventas: Math.floor(Math.random() * 200) + 50,
    etiqueta: isPresale ? (isPresaleEnded ? 'Al Mayor' : 'Preventa') : (dbProduct.isNew ? 'Nuevo' : undefined),
    descuento: currentRegular > currentPrice ? Math.round(((currentRegular - currentPrice) / currentRegular) * 100) : undefined,
    stock: dbProduct.stock,
    descripcion: dbProduct.description,
    descripcionLarga: dbProduct.description, // Fallback since DB only has one description
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
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
