import { NextResponse } from 'next/server';

export const revalidate = 900; // 15 minutos de revalidación en el servidor

let cachedRate: { promedio: number; fechaActualizacion: string } = {
  promedio: 879.12,
  fechaActualizacion: new Date().toISOString(),
};

export async function GET() {
  try {
    const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial', {
      next: { revalidate: 900 },
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
    console.warn('Usando tasa BCV en caché del servidor debido a timeout/error:', error);
  }

  return NextResponse.json(cachedRate, {
    headers: {
      'Cache-Control': 'public, s-maxage=900, stale-while-revalidate=3600',
    },
  });
}
