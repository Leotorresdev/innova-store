import { MapPin, Phone, Building2 } from 'lucide-react';
import React from 'react';

interface ShippingFormProps {
  customerNameInput: string;
  setCustomerNameInput: (v: string) => void;
  docType: string;
  setDocType: (v: string) => void;
  customerIdDocInput: string;
  setCustomerIdDocInput: (v: string) => void;
  phonePrefix: string;
  setPhonePrefix: (v: string) => void;
  customerPhoneInput: string;
  setCustomerPhoneInput: (v: string) => void;
  shippingAgency: 'zoom' | 'mrw' | null;
  setShippingAgency: (v: 'zoom' | 'mrw' | null) => void;
  shippingStateInput: string;
  setShippingStateInput: (v: string) => void;
  shippingCityInput: string;
  setShippingCityInput: (v: string) => void;
  shippingBranchInput: string;
  setShippingBranchInput: (v: string) => void;
}

export function ShippingForm({
  customerNameInput,
  setCustomerNameInput,
  docType,
  setDocType,
  customerIdDocInput,
  setCustomerIdDocInput,
  phonePrefix,
  setPhonePrefix,
  customerPhoneInput,
  setCustomerPhoneInput,
  shippingAgency,
  setShippingAgency,
  shippingStateInput,
  setShippingStateInput,
  shippingCityInput,
  setShippingCityInput,
  shippingBranchInput,
  setShippingBranchInput,
}: ShippingFormProps) {
  const handleNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g, '');
  };

  return (
    <section className="bg-white dark:bg-card border border-zinc-200/60 dark:border-white/10 rounded-[2rem] p-6 md:p-8 space-y-7 shadow-sm">
      <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-white/5 pb-5">
        <div className="size-10 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
          <MapPin className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-white">Datos de Envío Nacional</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Retiro seguro en sucursal oficial MRW o Zoom</p>
        </div>
      </div>

      <div className="space-y-5 pt-1">
        {/* Nombre completo de quien retira */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
            Nombre y Apellido (Quien retira en la agencia) *
          </label>
          <input
            required
            name="customerName"
            type="text"
            placeholder="Ej. Carlos Mendoza"
            value={customerNameInput}
            onChange={(e) => setCustomerNameInput(e.target.value)}
            className="w-full bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          />
        </div>

        {/* Cédula y Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Cédula de Identidad *
            </label>
            <div className="flex gap-2">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer font-medium"
              >
                <option value="V">V</option>
                <option value="E">E</option>
                <option value="J">J</option>
                <option value="G">G</option>
              </select>
              <input
                required
                name="customerIdDocNumber"
                type="text"
                inputMode="numeric"
                maxLength={8}
                value={customerIdDocInput}
                onChange={(e) => {
                  handleNumberInput(e);
                  setCustomerIdDocInput(e.target.value);
                }}
                placeholder="Ej. 18234567"
                className="w-full bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700 font-mono tracking-wider"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Teléfono WhatsApp *
            </label>
            <div className="flex gap-2">
              <select
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                className="bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-2.5 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer font-medium"
              >
                <option value="0414">0414</option>
                <option value="0424">0424</option>
                <option value="0412">0412</option>
                <option value="0416">0416</option>
                <option value="0426">0426</option>
              </select>
              <div className="relative w-full">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                  required
                  name="customerPhoneNumber"
                  type="text"
                  inputMode="numeric"
                  maxLength={7}
                  value={customerPhoneInput}
                  onChange={(e) => {
                    handleNumberInput(e);
                    setCustomerPhoneInput(e.target.value);
                  }}
                  placeholder="5551234"
                  className="w-full bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700 font-mono tracking-wider"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Selección de Empresa de Encomienda */}
        <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-white/5">
          <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
            Empresa de Encomienda *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setShippingAgency('mrw')}
              className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${
                shippingAgency === 'mrw'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                  : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
              }`}
            >
              <Building2 className="size-5" />
              <span className="text-sm font-semibold">MRW</span>
              <span className="text-[10px] text-zinc-400">Recomendado</span>
            </button>

            <button
              type="button"
              onClick={() => setShippingAgency('zoom')}
              className={`p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${
                shippingAgency === 'zoom'
                  ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                  : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
              }`}
            >
              <Building2 className="size-5" />
              <span className="text-sm font-semibold">Grupo ZOOM</span>
              <span className="text-[10px] text-zinc-400">Nacional</span>
            </button>
          </div>
        </div>

        {/* Ubicación de la Agencia: Estado, Ciudad, Sucursal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Estado *
            </label>
            <input
              required
              name="shippingState"
              type="text"
              value={shippingStateInput}
              onChange={(e) => setShippingStateInput(e.target.value)}
              placeholder="Ej. Carabobo"
              className="w-full bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Ciudad *
            </label>
            <input
              required
              name="shippingCity"
              type="text"
              value={shippingCityInput}
              onChange={(e) => setShippingCityInput(e.target.value)}
              placeholder="Ej. Valencia"
              className="w-full bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block">
              Agencia / Sucursal *
            </label>
            <input
              required
              name="shippingBranch"
              type="text"
              value={shippingBranchInput}
              onChange={(e) => setShippingBranchInput(e.target.value)}
              placeholder="Ej. El Viñedo o Cód. 1204"
              className="w-full bg-zinc-50/70 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-base focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
