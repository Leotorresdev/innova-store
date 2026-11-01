'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  Truck,
  MessageCircle,
  Smartphone,
  Wallet,
  Building2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  User,
  Phone,
} from 'lucide-react';
import { useCartStore, selectCartItems } from '@/store/useCartStore';
import { useBCV } from '@/hooks/useBCV';
import { storeConfig, buildWhatsAppUrl } from '@/config/storeConfig';
import { PriceDisplay } from '@/components/ui/PriceDisplay';
import { createExpressOrder } from '@/app/actions/checkout';

const EXPRESS_DRAFT_KEY = 'innova_express_checkout_draft_v1';

const VENEZUELAN_PREFIXES = ['0412', '0414', '0424', '0416', '0426'] as const;

const PAYMENT_OPTIONS = [
  {
    id: 'Pago Móvil (Bs - Tasa BCV)',
    label: 'Pago Móvil',
    sublabel: 'Bs - Tasa BCV',
    icon: Smartphone,
    accent: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'Binance Pay (USDT)',
    label: 'Binance',
    sublabel: 'USDT / Pay ID',
    icon: Wallet,
    accent: 'text-amber-500',
  },
] as const;

export function ExpressCheckoutModal() {
  const isOpen = useCartStore((s) => s.expressCheckoutOpen);
  const directItems = useCartStore((s) => s.expressItems);
  const cartItems = useCartStore(selectCartItems);
  const closeExpressCheckout = useCartStore((s) => s.closeExpressCheckout);
  const clearCart = useCartStore((s) => s.clear);

  const { calcBs, formatBsNumber } = useBCV();

  // Determinar si estamos comprando directo un bundle/producto o todo el carrito
  const activeItems = useMemo(() => {
    if (directItems && directItems.length > 0) return directItems;
    return cartItems;
  }, [directItems, cartItems]);

  const totalUSD = useMemo(() => {
    return Number(
      activeItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0).toFixed(2)
    );
  }, [activeItems]);

  const totalQuantity = useMemo(() => {
    return activeItems.reduce((sum, item) => sum + item.cantidad, 0);
  }, [activeItems]);

  const qualifiesForFreeShipping = totalQuantity >= storeConfig.FREE_SHIPPING_MIN_ITEMS;

  // Estados del formulario ultra-corto
  const [customerName, setCustomerName] = useState('');
  const [phonePrefix, setPhonePrefix] = useState<string>('0414');
  const [phoneBody, setPhoneBody] = useState('');
  const [stateAndCity, setStateAndCity] = useState('');
  const [shippingAgency, setShippingAgency] = useState<string>(storeConfig.SHIPPING_AGENCIES[0]);
  const [officeOrAddress, setOfficeOrAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string>(storeConfig.PAYMENT_METHODS[0]);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [readyWhatsAppUrl, setReadyWhatsAppUrl] = useState<string | null>(null);

  // Resetear estado al abrir/cerrar
  useEffect(() => {
    if (!isOpen) {
      setReadyWhatsAppUrl(null);
      setErrorMsg(null);
    }
  }, [isOpen]);

  // Cargar datos previos de localStorage para eliminar fricción en compras repetidas
  useEffect(() => {
    try {
      const saved = localStorage.getItem(EXPRESS_DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.customerName) setCustomerName(parsed.customerName);
        if (parsed.phonePrefix) setPhonePrefix(parsed.phonePrefix);
        if (parsed.phoneBody) setPhoneBody(parsed.phoneBody);
        if (parsed.stateAndCity) setStateAndCity(parsed.stateAndCity);
        if (parsed.shippingAgency) setShippingAgency(parsed.shippingAgency);
        if (parsed.officeOrAddress) setOfficeOrAddress(parsed.officeOrAddress);
        if (
          parsed.paymentMethod &&
          PAYMENT_OPTIONS.some((opt) => opt.id === parsed.paymentMethod)
        ) {
          setPaymentMethod(parsed.paymentMethod);
        }
      }
    } catch {
      // Ignorar errores de localStorage
    }
  }, []);

  // Guardar borrador automáticamente
  useEffect(() => {
    try {
      localStorage.setItem(
        EXPRESS_DRAFT_KEY,
        JSON.stringify({
          customerName,
          phonePrefix,
          phoneBody,
          stateAndCity,
          shippingAgency,
          officeOrAddress,
          paymentMethod,
        })
      );
    } catch {
      // Ignorar
    }
  }, [
    customerName,
    phonePrefix,
    phoneBody,
    stateAndCity,
    shippingAgency,
    officeOrAddress,
    paymentMethod,
  ]);

  // Permitir pegar el número completo (ej. 04141234567) o escribir los 7 dígitos
  const handlePhoneChange = (raw: string) => {
    const digits = raw.replace(/\D/g, '');
    if (digits.length === 11 && VENEZUELAN_PREFIXES.some((p) => digits.startsWith(p))) {
      setPhonePrefix(digits.slice(0, 4));
      setPhoneBody(digits.slice(4, 11));
    } else {
      setPhoneBody(digits.slice(0, 7));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    if (activeItems.length === 0) {
      setErrorMsg('No hay productos seleccionados para procesar.');
      return;
    }

    if (customerName.trim().length < 3) {
      setErrorMsg('Por favor ingresa tu Nombre y Apellido.');
      return;
    }

    const cleanPhoneBody = phoneBody.replace(/\D/g, '');
    if (cleanPhoneBody.length !== 7 || !(VENEZUELAN_PREFIXES as readonly string[]).includes(phonePrefix)) {
      setErrorMsg(
        'Ingresa un número de WhatsApp venezolano válido (ej. 0412/0414/0424/0416/0426 + 7 dígitos).'
      );
      return;
    }

    if (stateAndCity.trim().length < 3) {
      setErrorMsg('Por favor indica tu Estado y Ciudad.');
      return;
    }

    setIsSubmitting(true);

    const formattedPhone = `${phonePrefix}-${cleanPhoneBody}`;
    const shippingDestination = officeOrAddress.trim()
      ? `${stateAndCity.trim()} / ${officeOrAddress.trim()}`
      : stateAndCity.trim();

    const productsSummaryLine = activeItems
      .map(
        (item) =>
          `${item.nombre} x ${item.cantidad}${item.bundleLabel ? ` (${item.bundleLabel})` : ''}`
      )
      .join(', ');

    const totalUSDFormatted = totalUSD.toFixed(2);
    const totalBsFormatted = formatBsNumber(totalUSD);

    // 1. Construir el mensaje exacto requerido para WhatsApp
    const whatsappMessage = `¡Hola Innova Company! 👋 Quiero confirmar mi pedido:

📦 *Producto(s):* ${productsSummaryLine}
💵 *Total a Pagar:* $${totalUSDFormatted} (Bs. ${totalBsFormatted} a tasa BCV)
🚚 *Envío:* ${shippingAgency}${qualifiesForFreeShipping ? ' (ENVÍO GRATIS)' : ''} - ${shippingDestination}
💳 *Método de Pago:* ${paymentMethod}

👤 *Mis Datos:*
- Nombre: ${customerName.trim()}
- WhatsApp: ${formattedPhone}

¿Me envían los datos para realizar el pago y coordinar el envío?`;

    const whatsappRedirectUrl = buildWhatsAppUrl(whatsappMessage);

    // 2. Guardar orden en Base de Datos como "Pendiente de Pago"
    try {
      await createExpressOrder({
        customerName: customerName.trim(),
        customerPhone: formattedPhone,
        shippingAgency,
        shippingAddress: `${shippingDestination}${qualifiesForFreeShipping ? ' [ENVÍO GRATIS]' : ''}`,
        paymentMethod,
        total: totalUSD,
        totalBs: calcBs(totalUSD),
        items: activeItems.map((item) => ({
          id: String(item.id),
          nombre: item.nombre,
          cantidad: item.cantidad,
          precio: item.precio,
        })),
      });

      if (typeof window !== 'undefined') {
        import('@vercel/analytics')
          .then(({ track }) => {
            track('express_checkout_whatsapp', {
              value: totalUSD,
              currency: 'USD',
              payment_method: paymentMethod,
              agency: shippingAgency,
              items_count: totalQuantity,
            });
          })
          .catch(() => null);
      }
    } catch (err) {
      console.warn('Continuando redirección a WhatsApp tras registro:', err);
    } finally {
      setIsSubmitting(false);
    }

    // Si venía del carrito general, limpiamos el carrito
    if (!directItems) {
      clearCart();
    }

    // 3. Apertura dual blindada:
    // Guardar URL para botón de rescate visible por si el navegador de Instagram retiene la página
    setReadyWhatsAppUrl(whatsappRedirectUrl);

    // Intentar redirección automática
    try {
      window.location.href = whatsappRedirectUrl;
    } catch (e) {
      console.warn('Redirección automática hacia WhatsApp prevenida:', e);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-80 flex items-end sm:items-center justify-center p-0 sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="express-checkout-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeExpressCheckout}
            className="fixed inset-0 bg-zinc-950/65 backdrop-blur-sm"
          />

          {/* Modal Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320, mass: 0.8 }}
            className="relative z-10 w-full sm:max-w-lg max-h-[92dvh] bg-white dark:bg-zinc-950 rounded-t-3xl sm:rounded-3xl border border-zinc-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* ── Encabezado Compacto con Resumen Visual ── */}
            <div className="px-5 pt-4 pb-4 border-b border-zinc-100 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/60 shrink-0">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="size-3.5" />
                    Pedido Express en 1-Paso
                  </span>
                  {qualifiesForFreeShipping && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300">
                      <Truck className="size-3.5" />
                      ¡Envío Gratis!
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={closeExpressCheckout}
                  aria-label="Cerrar modal"
                  className="size-9 rounded-full bg-zinc-200/70 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                >
                  <X className="size-4.5" />
                </button>
              </div>

              {/* Resumen de Producto(s) y Total Dual */}
              <div className="flex items-center justify-between gap-3 bg-white dark:bg-zinc-900 p-3 rounded-2xl border border-zinc-200/80 dark:border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  {activeItems[0]?.imagen && (
                    <div className="relative size-14 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200 dark:border-zinc-700">
                      <Image
                        src={activeItems[0].imagen}
                        alt={activeItems[0].nombre}
                        fill
                        sizes="56px"
                        loading="lazy"
                        decoding="async"
                        className="object-cover"
                      />
                      <span className="absolute bottom-0 right-0 px-1.5 py-0.5 text-[10px] font-extrabold bg-primary text-primary-foreground rounded-tl-lg">
                        x{totalQuantity}
                      </span>
                    </div>
                  )}

                  <div className="min-w-0">
                    <h2
                      id="express-checkout-title"
                      className="font-display font-bold text-sm text-zinc-900 dark:text-white truncate"
                    >
                      {activeItems.length === 1
                        ? activeItems[0].nombre
                        : `${activeItems.length} productos seleccionados`}
                    </h2>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                      {activeItems.length === 1 && activeItems[0].bundleLabel
                        ? activeItems[0].bundleLabel
                        : `${totalQuantity} ${totalQuantity === 1 ? 'unidad' : 'unidades'} · ${
                            qualifiesForFreeShipping
                              ? 'Envío Gratis MRW/Zoom'
                              : 'Envío por MRW / Zoom'
                          }`}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <PriceDisplay
                    amountUSD={totalUSD}
                    size="sm"
                    align="right"
                    showOriginalPrice={false}
                  />
                </div>
              </div>
            </div>

            {/* ── Vista de Redirección Dual Blindada o Formulario ── */}
            {readyWhatsAppUrl ? (
              <div className="p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-6 flex-1">
                <div className="size-20 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="size-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold text-zinc-900 dark:text-white">
                    ¡Pedido Registrado con Éxito!
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                    Estamos abriendo tu WhatsApp con los datos listos. Si tu navegador no lo abrió automáticamente, presiona el botón verde:
                  </p>
                </div>

                <div className="w-full space-y-3 pt-2">
                  <a
                    href={readyWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-14 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-display font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/30 transition-all active:scale-[0.98] text-center"
                  >
                    <MessageCircle className="size-5 shrink-0" />
                    <span>👉 Tocar aquí para abrir WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setReadyWhatsAppUrl(null);
                      closeExpressCheckout();
                    }}
                    className="w-full py-3 text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    Volver a la tienda
                  </button>
                </div>
              </div>
            ) : (
              /* ── Formulario Ultra-Corto ── */
              <form
                onSubmit={handleSubmit}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-hide"
              >
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-600 dark:text-red-400 text-xs font-semibold">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1. Nombre y Apellido */}
              <div className="space-y-1.5">
                <label
                  htmlFor="express-name"
                  className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5"
                >
                  <User className="size-3.5 text-primary" />
                  1. Nombre y Apellido *
                </label>
                <input
                  id="express-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej. María Fernanda Pérez"
                  className="w-full min-h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm sm:text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
              </div>

              {/* 2. Teléfono con WhatsApp */}
              <div className="space-y-1.5">
                <label
                  htmlFor="express-phone"
                  className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5"
                >
                  <Phone className="size-3.5 text-primary" />
                  2. Teléfono con WhatsApp *
                </label>
                <div className="flex gap-2">
                  <select
                    aria-label="Prefijo de operadora"
                    value={phonePrefix}
                    onChange={(e) => setPhonePrefix(e.target.value)}
                    className="min-h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 py-3 text-sm sm:text-base font-bold text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary cursor-pointer"
                  >
                    {VENEZUELAN_PREFIXES.map((prefix) => (
                      <option key={prefix} value={prefix}>
                        {prefix}
                      </option>
                    ))}
                  </select>
                  <input
                    id="express-phone"
                    type="tel"
                    inputMode="numeric"
                    required
                    value={phoneBody}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="1234567"
                    className="flex-1 min-h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm sm:text-base font-mono tracking-wider text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                  />
                </div>
              </div>

              {/* 3. Estado y Ciudad */}
              <div className="space-y-1.5">
                <label
                  htmlFor="express-location"
                  className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5"
                >
                  <MapPin className="size-3.5 text-primary" />
                  3. Estado y Ciudad *
                </label>
                <input
                  id="express-location"
                  type="text"
                  required
                  value={stateAndCity}
                  onChange={(e) => setStateAndCity(e.target.value)}
                  placeholder="Ej. Distrito Capital, Caracas (o Trujillo, Boconó)"
                  className="w-full min-h-12 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm sm:text-base text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
              </div>

              {/* 4. Agencia de Envío Preferida + Oficina opcional */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                  <Building2 className="size-3.5 text-primary" />
                  4. Agencia de Envío Preferida *
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  {storeConfig.SHIPPING_AGENCIES.map((agency) => {
                    const isSelected = shippingAgency === agency;
                    return (
                      <button
                        key={agency}
                        type="button"
                        onClick={() => setShippingAgency(agency)}
                        className={`min-h-12 px-4 py-3 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/10 text-primary shadow-xs'
                            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                        }`}
                      >
                        <Truck className="size-4 shrink-0" />
                        <span>{agency}</span>
                        {isSelected && <CheckCircle2 className="size-4 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <input
                  type="text"
                  value={officeOrAddress}
                  onChange={(e) => setOfficeOrAddress(e.target.value)}
                  placeholder="Opcional: Nombre o código de agencia / dirección local..."
                  className="w-full min-h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
              </div>

              {/* 5. Método de Pago Preferido */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 block">
                  5. Método de Pago Preferido *
                </label>

                <div className="grid grid-cols-2 gap-2.5">
                  {PAYMENT_OPTIONS.map((option) => {
                    const Icon = option.icon;
                    const isSelected = paymentMethod === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setPaymentMethod(option.id)}
                        className={`min-h-14 p-3 rounded-xl border-2 text-left flex items-start gap-2.5 transition-all cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-xs'
                            : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/50 hover:border-zinc-300'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700 shrink-0">
                          <Icon className={`size-4 ${option.accent}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                              {option.label}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                            )}
                          </div>
                          <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight mt-0.5 line-clamp-2">
                            {option.sublabel}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Nota aclaratoria anti-fricción */}
                <div className="p-3 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  💡{' '}
                  <em>
                    &quot;No necesitas subir comprobantes aquí. Al hacer clic abajo se abrirá
                    nuestro WhatsApp con tu pedido listo para enviarte los datos de pago y tu guía
                    de envío.&quot;
                  </em>
                </div>
              </div>

              {/* Botón de Acción de Cierre (Submit) >= 48px */}
              <div className="pt-2 pb-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-14 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-display font-bold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-600/25 transition-all disabled:opacity-60 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      <span>Generando tu pedido...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="size-5 shrink-0" />
                      <span>Confirmar Pedido por WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
