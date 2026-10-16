import { Wallet, CreditCard, CheckCircle2, Copy, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

interface PaymentMethodProps {
  paymentMethod: 'binance' | 'pagomovil' | null;
  setPaymentMethod: (v: 'binance' | 'pagomovil' | null) => void;
  fileName: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  totalUSD: number;
  exchangeRateVES: number;
  paymentRef: string;
  setPaymentRef: (v: string) => void;
}

export function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  fileName,
  handleFileChange,
  totalUSD,
  exchangeRateVES,
  paymentRef,
  setPaymentRef,
}: PaymentMethodProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
    }
  };

  const calculatedTotalBs = (totalUSD * exchangeRateVES).toLocaleString('es-VE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const rawTotalBsForCopy = (totalUSD * exchangeRateVES).toFixed(2);

  return (
    <section className="bg-white dark:bg-card border border-zinc-200/60 dark:border-white/10 rounded-[2rem] p-6 md:p-8 space-y-7 shadow-sm mt-8">
      <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-white/5 pb-5">
        <div className="size-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <Wallet className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-white">Método de Pago</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Pagos directos en 1 Clic con copia rápida de datos</p>
        </div>
      </div>

      {/* Selector de Método de Pago */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setPaymentMethod('pagomovil')}
          className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-left ${
            paymentMethod === 'pagomovil'
              ? 'border-primary bg-primary/5 text-primary shadow-sm ring-1 ring-primary/20'
              : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${paymentMethod === 'pagomovil' ? 'bg-primary text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
              <CreditCard className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-zinc-900 dark:text-white">Pago Móvil (Tasa BCV)</p>
              <p className="text-xs text-zinc-500 mt-0.5">Banesco · Instantáneo en Bs</p>
            </div>
          </div>
          {paymentMethod === 'pagomovil' && <CheckCircle2 className="size-5 text-primary shrink-0" />}
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('binance')}
          className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 text-left ${
            paymentMethod === 'binance'
              ? 'border-[#FCD535] bg-[#FCD535]/10 text-zinc-900 dark:text-white shadow-sm ring-1 ring-[#FCD535]/30'
              : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${paymentMethod === 'binance' ? 'bg-[#FCD535] text-zinc-950' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}>
              <CreditCard className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-sm text-zinc-900 dark:text-white">Binance Pay (USDT)</p>
              <p className="text-xs text-zinc-500 mt-0.5">Pay ID y Correo directo</p>
            </div>
          </div>
          {paymentMethod === 'binance' && <CheckCircle2 className="size-5 text-[#FCD535] shrink-0" />}
        </button>
      </div>

      {/* Datos de Pago Móvil */}
      <AnimatePresence mode="wait">
        {paymentMethod === 'pagomovil' && (
          <motion.div
            key="pagomovil"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3.5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                Datos para tu Pago Móvil:
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    `Banco: Banesco (0134)\nTeléfono: 0426-2663234\nCédula: V-11134482\nMonto: Bs. ${calculatedTotalBs}`,
                    'pm-all'
                  )
                }
                className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary font-medium hover:bg-primary/20 transition-colors"
              >
                {copiedKey === 'pm-all' ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copiedKey === 'pm-all' ? '¡Copiado!' : 'Copiar todo'}
              </button>
            </div>

            {/* Monto exacto a pagar en Bs */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">Monto Exacto a Transferir:</p>
                <p className="text-base sm:text-lg font-bold text-emerald-800 dark:text-emerald-300 font-mono">
                  Bs. {calculatedTotalBs}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(rawTotalBsForCopy, 'pm-amount')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-all active:scale-95"
              >
                {copiedKey === 'pm-amount' ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copiedKey === 'pm-amount' ? '¡Monto Copiado!' : 'Copiar Monto'}
              </button>
            </div>

            <div className="space-y-2.5 text-sm pt-1">
              {/* Banco */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition">
                <span className="text-zinc-500 text-xs sm:text-sm">Banco Destino:</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-900 dark:text-white">Banesco (0134)</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('0134', 'pm-banco')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    title="Copiar código de banco"
                  >
                    {copiedKey === 'pm-banco' ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </div>

              {/* Teléfono */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition">
                <span className="text-zinc-500 text-xs sm:text-sm">Teléfono Pago Móvil:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">04262663234</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('04262663234', 'pm-phone')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    title="Copiar teléfono"
                  >
                    {copiedKey === 'pm-phone' ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </div>

              {/* Cédula */}
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition">
                <span className="text-zinc-500 text-xs sm:text-sm">Cédula / RIF:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">11134482</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('11134482', 'pm-id')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    title="Copiar cédula"
                  >
                    {copiedKey === 'pm-id' ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Datos de Binance Pay */}
        {paymentMethod === 'binance' && (
          <motion.div
            key="binance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-5 sm:p-6 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-3.5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                Datos de Binance Pay:
              </span>
              <button
                type="button"
                onClick={() =>
                  handleCopy(
                    'Binance Pay ID: 549852461\nCorreo: chacaomuralla1972@gmail.com',
                    'binance-all'
                  )
                }
                className="text-xs inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FCD535]/20 text-zinc-900 dark:text-[#FCD535] font-medium hover:bg-[#FCD535]/30 transition-colors"
              >
                {copiedKey === 'binance-all' ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copiedKey === 'binance-all' ? '¡Copiado!' : 'Copiar todo'}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">Monto en USDT a Enviar:</p>
                <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white font-mono">
                  ${totalUSD.toLocaleString('en-US')} USDT
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(totalUSD.toString(), 'binance-amount')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold shadow-sm transition-all active:scale-95"
              >
                {copiedKey === 'binance-amount' ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copiedKey === 'binance-amount' ? '¡Monto Copiado!' : 'Copiar Monto'}
              </button>
            </div>

            <div className="space-y-2.5 text-sm pt-1">
              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition">
                <span className="text-zinc-500 text-xs sm:text-sm">Binance Pay ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-zinc-900 dark:text-white">549852461</span>
                  <button
                    type="button"
                    onClick={() => handleCopy('549852461', 'binance-id')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    title="Copiar Pay ID"
                  >
                    {copiedKey === 'binance-id' ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition">
                <span className="text-zinc-500 text-xs sm:text-sm">Correo Binance:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white truncate max-w-[180px] sm:max-w-none">
                    chacaomuralla1972@gmail.com
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy('chacaomuralla1972@gmail.com', 'binance-email')}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
                    title="Copiar Correo"
                  >
                    {copiedKey === 'binance-email' ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Referencia y Comprobante de Pago */}
      {paymentMethod && (
        <div className="space-y-5 pt-4 border-t border-zinc-100 dark:border-white/5">
          {/* Referencia bancaria opcional/complementaria */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Número de Referencia (Últimos 4 a 6 dígitos)
            </label>
            <input
              name="paymentReference"
              type="text"
              inputMode="numeric"
              maxLength={12}
              value={paymentRef}
              onChange={(e) => setPaymentRef(e.target.value.replace(/\D/g, ''))}
              placeholder="Ej. 654321"
              className="w-full bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700 font-mono tracking-wider"
            />
            <p className="text-[11px] text-zinc-500">
              Facilita la verificación inmediata de tu pago en la banca.
            </p>
          </div>

          {/* Subida del Comprobante */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Captura del Comprobante de Pago *
            </label>
            <div className="relative">
              <input
                required
                name="paymentProof"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className={`w-full border-2 border-dashed rounded-2xl p-7 sm:p-9 flex flex-col items-center justify-center gap-3 transition-colors ${
                  fileName
                    ? 'border-emerald-500/50 bg-emerald-500/5'
                    : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80'
                }`}
              >
                {fileName ? (
                  <>
                    <div className="size-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="size-6 text-emerald-500" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 block truncate max-w-xs sm:max-w-md">
                        {fileName}
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 block">Comprobante adjuntado con éxito · Toca para cambiar</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3.5 bg-white dark:bg-card border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-full">
                      <Upload className="size-5 text-primary" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white block">
                        Adjuntar comprobante de pago
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 block">
                        Sube una captura de tu transferencia o pago móvil (JPG, PNG)
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
