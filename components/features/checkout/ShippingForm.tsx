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
    <section className="bg-white dark:bg-card border border-zinc-200/60 dark:border-white/10 rounded-[2rem] p-6 md:p-8 space-y-8 shadow-sm">
      <div className="flex items-center gap-4 border-b border-zinc-100 dark:border-white/5 pb-5">
        <div className="size-10 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-900 dark:text-zinc-100">
          <MapPin className="size-5" />
        </div>
        <div>
          <h2 className="text-xl font-display font-semibold text-zinc-900 dark:text-white">Datos de Envío</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Ingresa los detalles para tu entrega</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Nombre Completo *</label>
          <input
            required
            name="customerName"
            type="text"
            placeholder="Ej. Juan Pérez"
            value={customerNameInput}
            onChange={(e) => setCustomerNameInput(e.target.value)}
            className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Cédula de Identidad *</label>
            <div className="flex gap-2">
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer font-medium"
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
                maxLength={8}
                value={customerIdDocInput}
                onChange={(e) => {
                  handleNumberInput(e);
                  setCustomerIdDocInput(e.target.value);
                }}
                placeholder="Ej. 12345678"
                className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Teléfono Celular *</label>
            <div className="flex gap-2">
              <select
                value={phonePrefix}
                onChange={(e) => setPhonePrefix(e.target.value)}
                className="bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-2 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 cursor-pointer font-medium"
              >
                <option value="0414">0414</option>
                <option value="0424">0424</option>
                <option value="0412">0412</option>
                <option value="0416">0416</option>
                <option value="0426">0426</option>
              </select>
              <div className="relative w-full">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-400" />
                <input
                  required
                  name="customerPhoneNumber"
                  type="text"
                  maxLength={7}
                  value={customerPhoneInput}
                  onChange={(e) => {
                    handleNumberInput(e);
                    setCustomerPhoneInput(e.target.value);
                  }}
                  placeholder="1234567"
                  className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl pl-10 pr-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-white/5">
        <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Agencia de Envío *</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setShippingAgency('zoom')}
            className={`p-5 rounded-[1.25rem] border transition-all flex flex-col items-center gap-3 ${
              shippingAgency === 'zoom'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Building2 className={`size-6 ${shippingAgency === 'zoom' ? 'text-primary' : 'text-zinc-400'}`} />
            <span className="font-medium text-sm">Grupo ZOOM</span>
          </button>
          <button
            type="button"
            onClick={() => setShippingAgency('mrw')}
            className={`p-5 rounded-[1.25rem] border transition-all flex flex-col items-center gap-3 ${
              shippingAgency === 'mrw'
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900'
            }`}
          >
            <Building2 className={`size-6 ${shippingAgency === 'mrw' ? 'text-primary' : 'text-zinc-400'}`} />
            <span className="font-medium text-sm">MRW</span>
          </button>
        </div>
      </div>

      <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-white/5">
        <label className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block mb-2">Ubicación de la Sucursal</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500">Estado</label>
            <input
              name="shippingState"
              type="text"
              value={shippingStateInput}
              onChange={(e) => setShippingStateInput(e.target.value)}
              placeholder="Ej. Miranda"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500">Ciudad *</label>
            <input
              required
              name="shippingCity"
              type="text"
              value={shippingCityInput}
              onChange={(e) => setShippingCityInput(e.target.value)}
              placeholder="Ej. Caracas"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500">Sucursal</label>
            <input
              name="shippingBranch"
              type="text"
              value={shippingBranchInput}
              onChange={(e) => setShippingBranchInput(e.target.value)}
              placeholder="Ej. Las Mercedes"
              className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all hover:border-zinc-300 dark:hover:border-zinc-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
