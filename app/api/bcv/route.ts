import { NextResponse } from 'next/server';
import { storeConfig } from '@/config/storeConfig';

export const revalidate = 3600; // Revalidación en el servidor

let cachedRate: { promedio: number; fechaActualizacion: string } = {
  promedio: storeConfig.DEFAULT_BCV_RATE,
  fechaActualizacion: new Date().toISOString(),
};

export async function GET() {
  if (!storeConfig.AUTO_FETCH_BCV) {
    return NextResponse.json(cachedRate);
  }

  try {
    const res = await fetch(storeConfig.BCV_API_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && typeof data.promedio === 'number' && data.promedio > 0) {
        cachedRate = {
          promedio: data.promedio,
          fechaActualizacion: data.fechaActualizacion || new Date().toISOString(),
        };
      }
    }
  } catch (error) {
    console.warn('Usando tasa BCV de respaldo en el servidor debido a timeout/error:', error);
  }

  return NextResponse.json(cachedRate, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=21600',
    },
  });
}
