import { Lock } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { getGlobalSettings } from '@/app/actions/settings';
import { PreventasClient } from './PreventasClient';

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

  // Map to the expected WholesaleItem format for PreorderCard
  const mappedProducts = dbProducts.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
      // Some product records don't have a regularPrice field in the DB schema.
      // Use the actual price as the regular price fallback and compute discount safely.
      regular: (p.regularPrice ?? p.price),
      off: (p.regularPrice && p.regularPrice > p.price)
        ? Math.round(((p.regularPrice - p.price) / p.regularPrice) * 100)
        : 0,
    stock: p.stock,
    low: p.stock < 10,
    image: p.imageUrl
  }));

  // Configura aquí manualmente la fecha de finalización de la preventa
  // Formato recomendado: 'YYYY-MM-DDTHH:mm:ss' (ej. '2026-12-31T23:59:59')
  const PREVENTA_END_DATE = '2026-07-24T23:59:59';

  return (
    <PreventasClient products={mappedProducts} preventaEndDate={PREVENTA_END_DATE} />
  );
}
