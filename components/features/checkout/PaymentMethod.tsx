import { Wallet, CreditCard, CheckCircle2, Copy, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface PaymentMethodProps {
  paymentMethod: 'binance' | 'pagomovil' | null;
  setPaymentMethod: (v: 'binance' | 'pagomovil' | null) => void;
  fileName: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  copiedType: string | null;
  handleCopy: (text: string, type: string) => void;
}

export function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  fileName,
  handleFileChange,
  copiedType,
  handleCopy
}: PaymentMethodProps) {
  return (
    <section className="bg-white dark:bg-card border border-zinc-200/60 dark:border-white/10 rounded-[2rem] p-6 md:p-8 space-y-8 shadow-sm mt-8">
      <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-white/5 pb-5">
        <div className="size-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <Wallet className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-white">Método de Pago</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Selecciona cómo deseas pagar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setPaymentMethod('binance')}
          className={`p-5 rounded-[1.25rem] border transition-all flex items-center justify-center gap-3 ${
            paymentMethod === 'binance'
              ? 'border-[#FCD535] bg-[#FCD535]/10 text-zinc-900 dark:text-white'
              : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900'
          }`}
        >
          <CreditCard className={`size-5 ${paymentMethod === 'binance' ? 'text-[#FCD535]' : 'text-zinc-400'}`} />
          <span className="font-medium text-sm">Binance Pay</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod('pagomovil')}
          className={`p-5 rounded-[1.25rem] border transition-all flex items-center justify-center gap-3 ${
            paymentMethod === 'pagomovil'
              ? 'border-primary bg-primary/5 text-primary'
              : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900'
          }`}
        >
          <CreditCard className={`size-5 ${paymentMethod === 'pagomovil' ? 'text-primary' : 'text-zinc-400'}`} />
          <span className="font-medium text-sm">Pago Móvil</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {paymentMethod === 'binance' && (
          <motion.div
            key="binance"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[1.25rem] text-sm space-y-4 mt-2">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-zinc-900 dark:text-white">Datos de Binance Pay:</p>
                <button
                  type="button"
                  onClick={() => handleCopy('Binance Pay ID: 549852461\nCorreo: chacaomuralla1972@gmail.com', 'binance')}
                  className="text-xs flex items-center gap-1.5 text-primary hover:text-primary/80 transition font-medium bg-primary/10 px-3 py-1.5 rounded-lg"
                >
                  {copiedType === 'binance' ? <CheckCircle2 className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copiedType === 'binance' ? 'Copiado' : 'Copiar todo'}
                </button>
              </div>
              <p className="text-zinc-500 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <span>Pay ID:</span>
                <span className="font-mono text-zinc-900 dark:text-white font-medium">549852461</span>
              </p>
              <p className="text-zinc-500 flex justify-between items-center pt-1">
                <span>Correo:</span>
                <span className="font-mono text-zinc-900 dark:text-white font-medium">chacaomuralla1972@gmail.com</span>
              </p>
            </div>
          </motion.div>
        )}
        {paymentMethod === 'pagomovil' && (
          <motion.div
            key="pagomovil"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-[1.25rem] text-sm space-y-4 mt-2">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-zinc-900 dark:text-white">Datos de Pago Móvil:</p>
                <button
                  type="button"
                  onClick={() => handleCopy('Banco: Banesco (0134)\nTeléfono: 0426-2663234\nCédula: V-11134482', 'pagomovil')}
                  className="text-xs flex items-center gap-1.5 text-primary hover:text-primary/80 transition font-medium bg-primary/10 px-3 py-1.5 rounded-lg"
                >
                  {copiedType === 'pagomovil' ? <CheckCircle2 className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copiedType === 'pagomovil' ? 'Copiado' : 'Copiar todo'}
                </button>
              </div>
              <p className="text-zinc-500 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <span>Banco:</span>
                <span className="font-medium text-zinc-900 dark:text-white">Banesco (0134)</span>
              </p>
              <p className="text-zinc-500 flex justify-between items-center border-b border-zinc-200 dark:border-zinc-800 pb-3">
                <span>Teléfono:</span>
                <span className="font-mono text-zinc-900 dark:text-white font-medium">0426-2663234</span>
              </p>
              <p className="text-zinc-500 flex justify-between items-center pt-1">
                <span>Cédula:</span>
                <span className="font-mono text-zinc-900 dark:text-white font-medium">V-11134482</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentMethod && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pt-6 border-t border-zinc-100 dark:border-white/5"
          >
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-4 block">
              Comprobante de Pago *
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
              <div className={`w-full border-2 border-dashed rounded-[1.25rem] p-10 flex flex-col items-center justify-center gap-4 transition-colors ${
                fileName ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/80'
              }`}>
                {fileName ? (
                  <>
                    <div className="size-12 bg-emerald-500/10 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="size-6 text-emerald-500" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 block">
                        {fileName}
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 block">Toca para cambiar de archivo</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-white dark:bg-card border border-zinc-200 dark:border-zinc-800 shadow-sm rounded-full">
                      <Upload className="size-5 text-zinc-400" />
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-zinc-900 dark:text-white block">Haz clic o arrastra tu capture aquí</span>
                      <span className="text-xs text-zinc-500 mt-1 block">Formatos soportados: JPG, PNG</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
