'use client';

import { useState, useEffect } from 'react';
import { storeConfig } from '@/config/storeConfig';

const STORAGE_KEY = 'innova_bcv_rate_cache_v2';
const CACHE_TTL_MS = storeConfig.BCV_CACHE_TTL_HOURS * 60 * 60 * 1000; // 6 horas en ms

interface CachedBCVData {
  rate: number;
  timestamp: number;
}

export function useBCV() {
  const [rate, setRate] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: CachedBCVData = JSON.parse(stored);
          if (typeof parsed.rate === 'number' && parsed.rate > 0) {
            return parsed.rate;
          }
        }
      } catch {
        // Ignorar errores de lectura de localStorage
      }
    }
    return storeConfig.DEFAULT_BCV_RATE;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(storeConfig.AUTO_FETCH_BCV);

  useEffect(() => {
    if (!storeConfig.AUTO_FETCH_BCV) {
      setIsSyncing(false);
      return;
    }

    let isCancelled = false;

    async function syncRate() {
      try {
        // 1. Verificar caché en localStorage (válido por 6 horas)
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: CachedBCVData = JSON.parse(stored);
          const isFresh = Date.now() - parsed.timestamp < CACHE_TTL_MS;
          if (isFresh && typeof parsed.rate === 'number' && parsed.rate > 0) {
            if (!isCancelled) {
              setRate(parsed.rate);
              setIsSyncing(false);
            }
            return;
          }
        }
      } catch {
        // Continuar al fetch si falla localStorage
      }

      try {
        // 2. Consultar primero DolarAPI oficial o nuestro endpoint /api/bcv
        let res = await fetch(storeConfig.BCV_API_URL).catch(() => null);

        if (!res || !res.ok) {
          res = await fetch('/api/bcv').catch(() => null);
        }

        if (res && res.ok) {
          const data = await res.json();
          const newRate = typeof data.promedio === 'number' ? data.promedio : null;
          if (newRate && newRate > 0 && !isCancelled) {
            setRate(newRate);
            try {
              const cachePayload: CachedBCVData = {
                rate: newRate,
                timestamp: Date.now(),
              };
              localStorage.setItem(STORAGE_KEY, JSON.stringify(cachePayload));
            } catch {
              // Ignorar errores de cuota/modo privado
            }
          }
        }
      } catch (err) {
        console.warn('Error sincronizando tasa BCV, usando tasa de respaldo:', err);
      } finally {
        if (!isCancelled) {
          setIsSyncing(false);
        }
      }
    }

    syncRate();

    return () => {
      isCancelled = true;
    };
  }, []);

  const calcBs = (usd: number): number => {
    return Number((usd * rate).toFixed(2));
  };

  const formatBsNumber = (usd: number): string => {
    const totalBs = usd * rate;
    return totalBs.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatBs = (usd: number): string => {
    return `Bs. ${formatBsNumber(usd)}`;
  };

  return {
    rate,
    isSyncing,
    formatBs,
    formatBsNumber,
    calcBs,
  };
}
