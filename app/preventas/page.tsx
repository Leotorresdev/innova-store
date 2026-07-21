import { Lock } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getGlobalSettings } from '@/app/actions/settings';
import { PreventasClient } from './PreventasClient';

export const dynamic = 'force-dynamic';

export default async function PreventasPage() {
  const settings = await getGlobalSettings();
  
  if (!settings.preventasEnabled) {
    return (
      <div className="mx-auto max-w-3xl px-6 pt-32 pb-24 text-center h-[70vh] flex flex-col justify-center items-center">
        <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center mb-6 border border-neutral-800">
          <Lock className="w-10 h-10 text-neutral-500" />
        </div>
        <h1 className="text-3xl font-display font-bold text-white mb-4">Módulo de Preventas Cerrado</h1>
        <p className="text-neutral-400">Actualmente no hay ninguna preventa activa o la temporada de preventas ha finalizado. Mantente atento a nuestras redes sociales para próximas aperturas de importación.</p>
      </div>
    );
  }

  // Fetch real presale products
  const dbProducts = await prisma.product.findMany({
    where: { type: 'PRESALE' },
    orderBy: { createdAt: 'desc' }
  });

  const now = new Date();

  // Active or upcoming presale (latest one that hasn't ended)
  const activePresaleDb = dbProducts.find(p => !p.presaleEndDate || p.presaleEndDate > now);
  
  // Past presales with stock (wholesale)
  const wholesaleDb = dbProducts.filter(p => p.presaleEndDate && p.presaleEndDate <= now && p.stock > 0);

  const mapToWholesaleItem = (p: any, isWholesaleMode: boolean) => {
    const currentPrice = isWholesaleMode && p.wholesalePrice ? p.wholesalePrice : p.price;
    const currentRegular = isWholesaleMode && p.wholesaleRegularPrice 
        ? p.wholesaleRegularPrice 
        : (p.regularPrice ?? currentPrice);
    
    return {
      id: p.id,
      name: p.name,
      description: p.description,
      price: currentPrice,
      regular: currentRegular,
      off: (currentRegular > currentPrice)
        ? Math.round(((currentRegular - currentPrice) / currentRegular) * 100)
        : 0,
      stock: p.stock,
      low: p.stock < 10,
      image: p.imageUrl,
      // Pass dates for the active presale card/timer
      presaleStartDate: p.presaleStartDate,
      presaleEndDate: p.presaleEndDate,
    };
  };

  const activePresale = activePresaleDb ? mapToWholesaleItem(activePresaleDb, false) : null;
  const wholesaleProducts = wholesaleDb.map(p => mapToWholesaleItem(p, true));

  return (
    <PreventasClient activePresale={activePresale} wholesaleProducts={wholesaleProducts} />
  );
}
