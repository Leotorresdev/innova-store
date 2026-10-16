'use client';

import { useState, useEffect } from 'react';

const DEFAULT_BCV_RATE = 879.12;
const STORAGE_KEY = 'innova_bcv_rate_v1';

export function useBCV() {
  const [rate, setRate] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = parseFloat(stored);
          if (!isNaN(parsed) && parsed > 0) return parsed;
        }
      } catch (e) {
        // Ignorar error de lectura de localStorage
      }
    }
    return DEFAULT_BCV_RATE;
  });

  const [isSyncing, setIsSyncing] = useState<boolean>(true);

  useEffect(() => {
    let isCancelled = false;

    async function syncRate() {
      try {
        // Intentar primero nuestro endpoint optimizado con ISR
        let res = await fetch('/api/bcv').catch(() => null);
        
        // Fallback a DolarAPI directo si falló el endpoint local
        if (!res || !res.ok) {
          res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial').catch(() => null);
        }

        if (res && res.ok) {
          const data = await res.json();
          const newRate = typeof data.promedio === 'number' ? data.promedio : null;
          if (newRate && newRate > 0 && !isCancelled) {
            setRate(newRate);
            try {
              localStorage.setItem(STORAGE_KEY, newRate.toString());
            } catch (e) {
              // Ignore localStorage quota/private mode errors
            }
          }
        }
      } catch (err) {
        console.warn('Error sincronizando tasa BCV:', err);
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

  const formatBs = (usd: number): string => {
    const totalBs = usd * rate;
    return `Bs. ${totalBs.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const calcBs = (usd: number): number => {
    return usd * rate;
  };

  return {
    rate,
    isSyncing,
    formatBs,
    calcBs,
  };
}
