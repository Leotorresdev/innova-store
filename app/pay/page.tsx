'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MessageCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import imageCompression from 'browser-image-compression';
import { processCheckout } from '@/app/actions/checkout';
import { useCartStore, selectCartItems, selectCartTotal, selectCartHasHydrated } from '@/store/useCartStore';
import { useBCV } from '@/hooks/useBCV';

// Módulos de Checkout
import { ShippingForm } from '@/components/features/checkout/ShippingForm';
import { PaymentMethod } from '@/components/features/checkout/PaymentMethod';
import { OrderSummary } from '@/components/features/checkout/OrderSummary';

const CHECKOUT_DRAFT_KEY = 'innova_checkout_draft_v1';

export default function PayPage() {
  const router = useRouter();
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const clearCart = useCartStore((s) => s.clear);
  const cartHydrated = useCartStore(selectCartHasHydrated);

  const { rate: exchangeRateVES } = useBCV();

  const [hasMounted, setHasMounted] = useState(false);

  // States del formulario (Exclusivamente Retiro en Agencia MRW / Zoom)
  const [shippingAgency, setShippingAgency] = useState<'zoom' | 'mrw' | null>('mrw');
  const [paymentMethod, setPaymentMethod] = useState<'binance' | 'pagomovil' | null>('pagomovil');
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [docType, setDocType] = useState('V');
  const [customerIdDocInput, setCustomerIdDocInput] = useState('');
  const [phonePrefix, setPhonePrefix] = useState('0414');
  const [customerPhoneInput, setCustomerPhoneInput] = useState('');
  const [shippingStateInput, setShippingStateInput] = useState('');
  const [shippingCityInput, setShippingCityInput] = useState('');
  const [shippingBranchInput, setShippingBranchInput] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');

  // 1. Cargar borrador de localStorage al montar para resistir recargas del WebView de Instagram
  useEffect(() => {
    setHasMounted(true);

    try {
      const savedDraft = localStorage.getItem(CHECKOUT_DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        if (parsed.customerNameInput) setCustomerNameInput(parsed.customerNameInput);
        if (parsed.docType) setDocType(parsed.docType);
        if (parsed.customerIdDocInput) setCustomerIdDocInput(parsed.customerIdDocInput);
        if (parsed.phonePrefix) setPhonePrefix(parsed.phonePrefix);
        if (parsed.customerPhoneInput) setCustomerPhoneInput(parsed.customerPhoneInput);
        if (parsed.shippingAgency) setShippingAgency(parsed.shippingAgency);
        if (parsed.shippingStateInput) setShippingStateInput(parsed.shippingStateInput);
        if (parsed.shippingCityInput) setShippingCityInput(parsed.shippingCityInput);
        if (parsed.shippingBranchInput) setShippingBranchInput(parsed.shippingBranchInput);
        if (parsed.paymentMethod) setPaymentMethod(parsed.paymentMethod);
        if (parsed.paymentRef) setPaymentRef(parsed.paymentRef);
      }
    } catch (e) {
      console.warn('Error cargando borrador de checkout:', e);
    }
  }, []);

  // 1b. Guardar borrador automáticamente ante cualquier cambio
  useEffect(() => {
    if (!hasMounted || isSuccess) return;

    try {
      const draftData = {
        customerNameInput,
        docType,
        customerIdDocInput,
        phonePrefix,
        customerPhoneInput,
        shippingAgency,
        shippingStateInput,
        shippingCityInput,
        shippingBranchInput,
        paymentMethod,
        paymentRef,
      };
      localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draftData));
    } catch (e) {
      // Ignorar errores de cuota en modo incógnito
    }
  }, [
    hasMounted,
    isSuccess,
    customerNameInput,
    docType,
    customerIdDocInput,
    phonePrefix,
    customerPhoneInput,
    shippingAgency,
    shippingStateInput,
    shippingCityInput,
    shippingBranchInput,
    paymentMethod,
    paymentRef,
  ]);

  // Analítica del embudo
  useEffect(() => {
    if (typeof window !== 'undefined' && items.length > 0) {
      import('@vercel/analytics').then(({ track }) => {
        track('checkout_started', {
          value: total,
          item_count: items.length,
        });
      });
    }
  }, []);

  // Prevenir cierre accidental si hay items
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSuccess || items.length === 0) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSuccess, items.length]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  // 2. Generador del enlace salvavidas de WhatsApp
  const generateWhatsappOrderUrl = () => {
    const itemsList = items
      .map((i) => `• ${i.nombre} (x${i.cantidad}) - $${i.precio * i.cantidad} USD`)
      .join('\n');

    const totalBsFormatted = (total * exchangeRateVES).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    let customerDetails = '';
    if (customerNameInput.trim() || customerPhoneInput.trim() || shippingCityInput.trim()) {
      customerDetails = `\n\n📌 *Mis datos para el retiro:*\n• Cliente: ${customerNameInput || 'No indicado'} (CI: ${docType}-${customerIdDocInput || 'Sin especificar'})\n• WhatsApp: ${phonePrefix}-${customerPhoneInput || 'Sin especificar'}\n• Retiro en Agencia: ${shippingAgency?.toUpperCase() || 'MRW'} (${shippingBranchInput || 'Principal'}, ${shippingCityInput || ''}, ${shippingStateInput || ''})\n• Pago preferido: ${paymentMethod === 'pagomovil' ? 'Pago Móvil BCV' : paymentMethod === 'binance' ? 'Binance Pay' : 'Por definir'}${paymentRef ? `\n• Ref. de pago: ${paymentRef}` : ''}`;
    }

    const message = `¡Hola INNOVA! Quisiera concretar mi pedido con un asesor:\n\n🛒 *Productos en mi carrito:*\n${itemsList}\n\n💵 *Total:* $${total} USD (~ Bs. ${totalBsFormatted} a tasa BCV)${customerDetails}\n\n¿Me confirman para realizar el pago? ¡Muchas gracias!`;

    return `https://wa.me/584262663234?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return alert('Tu carrito está vacío.');
    if (!shippingAgency) return alert('Por favor selecciona una empresa de encomienda (MRW o Zoom).');
    if (!paymentMethod) return alert('Por favor selecciona un método de pago.');

    const formData = new FormData(e.currentTarget);
    const file = formData.get('paymentProof') as File;
    if (!file || file.size === 0) return alert('Por favor sube el capture de tu pago.');

    setIsSubmitting(true);

    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true };
      const compressedBlob = await imageCompression(file, options);
      formData.set('paymentProof', new File([compressedBlob], file.name, { type: file.type }));
    } catch (error) {
      console.warn('Error comprimiendo la imagen', error);
    }

    const docNumber = formData.get('customerIdDocNumber') || customerIdDocInput;
    const phoneNumber = formData.get('customerPhoneNumber') || customerPhoneInput;
    const state = (formData.get('shippingState') as string) || shippingStateInput;
    const city = (formData.get('shippingCity') as string) || shippingCityInput;

    const finalAgency = shippingAgency || 'mrw';
    const finalAddress = `[Agencia ${finalAgency.toUpperCase()} - ${shippingBranchInput || 'Principal'}] Estado: ${state}, Ciudad: ${city}${paymentRef ? ` | Ref: ${paymentRef}` : ''}`;

    formData.append('customerIdDoc', `${docType}-${docNumber}`);
    formData.append('customerPhone', `${phonePrefix}-${phoneNumber}`);
    formData.append('shippingAddress', finalAddress);
    formData.append('shippingAgency', finalAgency);
    formData.append('paymentMethod', paymentMethod);
    formData.append('total', total.toString());

    if (exchangeRateVES) {
      formData.append('totalBs', (total * exchangeRateVES).toString());
    }

    formData.append(
      'items',
      JSON.stringify(
        items.map((i) => ({
          id: i.id,
          cantidad: i.cantidad,
          nombre: i.nombre,
          precio: i.precio,
        }))
      )
    );

    try {
      const result = await processCheckout(formData);
      if (result.success) {
        if (typeof window !== 'undefined') {
          import('@vercel/analytics').then(({ track }) => {
            track('purchase', {
              value: total,
              currency: 'USD',
              payment_method: paymentMethod,
            });
          });
        }

        // Limpiar borrador de localStorage
        try {
          localStorage.removeItem(CHECKOUT_DRAFT_KEY);
        } catch (e) {}

        setCustomerName(customerNameInput || (formData.get('customerName') as string));
        setIsSuccess(true);
        clearCart();
      } else {
        alert(`Hubo un error: ${result.message}`);
      }
    } catch (error) {
      alert('Error al procesar el pedido. Intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pantalla de éxito
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-white dark:bg-card p-8 sm:p-10 rounded-[2.5rem] max-w-lg shadow-sm border border-zinc-200/60 dark:border-white/10"
        >
          <div className="size-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="font-display text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            ¡Pedido Confirmado!
          </h1>
          <p className="text-zinc-500 leading-relaxed text-sm sm:text-base">
            Gracias por tu compra{' '}
            <span className="font-semibold text-zinc-900 dark:text-white">
              {customerName}
            </span>
            . Tu pago ha sido recibido y te contactaremos en breve por WhatsApp para entregarte la guía de envío por{' '}
            <span className="font-semibold text-zinc-900 dark:text-white uppercase">
              {shippingAgency || 'MRW'}
            </span>.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://wa.me/584262663234"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-sm"
            >
              <MessageCircle className="size-5" />
              Escribir a Soporte WhatsApp
            </a>
            <Button
              onClick={() => router.push('/')}
              variant="outline"
              className="w-full h-14 rounded-2xl border-zinc-200 dark:border-white/10 bg-transparent text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-white/5 font-medium"
            >
              Volver al Inicio
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Esperar a que el cliente monte para evaluar el estado real del carrito
  if (!hasMounted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center pt-28">
        <div className="size-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // 1c. Estado vacío amigable en /pay si no hay items
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-20 pt-28 md:pt-36">
        <div className="max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-card border border-zinc-200/60 dark:border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-sm flex flex-col items-center"
          >
            <div className="size-20 rounded-3xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 mb-6">
              <ShoppingBag className="size-9" />
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
              Tu carrito está vacío
            </h1>

            <p className="text-zinc-500 text-sm sm:text-base leading-relaxed max-w-sm mb-8">
              Aún no has seleccionado ningún producto. Explora nuestro catálogo oficial para agregar equipos con garantía y envíos nacionales por MRW y Zoom.
            </p>

            <Link
              href="/#tienda"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-glow active:scale-[0.98]"
            >
              <span>Explorar catálogo disponible</span>
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Comprobación de campos requeridos para retiro en agencia
  const isShippingDetailsValid =
    customerNameInput.trim() !== '' &&
    customerIdDocInput.trim() !== '' &&
    customerPhoneInput.trim() !== '' &&
    shippingCityInput.trim() !== '' &&
    shippingStateInput.trim() !== '' &&
    shippingBranchInput.trim() !== '' &&
    shippingAgency !== null;

  const isFormComplete =
    isShippingDetailsValid && paymentMethod !== null && fileName !== null;

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <button
          onClick={() => router.push('/#tienda')}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition mb-6 font-medium cursor-pointer"
        >
          <ArrowLeft className="size-4" />
          Continuar viendo la tienda
        </button>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Finalizar Compra
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Envíos nacionales por MRW y Zoom · O completa directo con un asesor por WhatsApp
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleSubmit} className="w-full">
              <ShippingForm
                customerNameInput={customerNameInput}
                setCustomerNameInput={setCustomerNameInput}
                docType={docType}
                setDocType={setDocType}
                customerIdDocInput={customerIdDocInput}
                setCustomerIdDocInput={setCustomerIdDocInput}
                phonePrefix={phonePrefix}
                setPhonePrefix={setPhonePrefix}
                customerPhoneInput={customerPhoneInput}
                setCustomerPhoneInput={setCustomerPhoneInput}
                shippingAgency={shippingAgency}
                setShippingAgency={setShippingAgency}
                shippingStateInput={shippingStateInput}
                setShippingStateInput={setShippingStateInput}
                shippingCityInput={shippingCityInput}
                setShippingCityInput={setShippingCityInput}
                shippingBranchInput={shippingBranchInput}
                setShippingBranchInput={setShippingBranchInput}
              />

              <PaymentMethod
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                fileName={fileName}
                handleFileChange={handleFileChange}
                totalUSD={total}
                exchangeRateVES={exchangeRateVES}
                paymentRef={paymentRef}
                setPaymentRef={setPaymentRef}
              />
            </form>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-28 space-y-6">
              <OrderSummary
                items={items}
                finalTotal={total}
                exchangeRateVES={exchangeRateVES}
              />

              {/* Botón principal de compra web */}
              <div className="space-y-3">
                <Button
                  type="submit"
                  form="checkout-form"
                  disabled={!isFormComplete || isSubmitting}
                  className="w-full rounded-2xl py-6 sm:py-7 h-auto text-base font-semibold transition-all disabled:opacity-50 shadow-sm active:scale-[0.98]"
                >
                  {isSubmitting ? 'Procesando seguro...' : 'Confirmar Pedido'}
                </Button>

                {/* Botón "Salvavidas de Conversión" por WhatsApp */}
                <a
                  href={generateWhatsappOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-4 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-sm active:scale-[0.98] text-center"
                >
                  <MessageCircle className="size-5 shrink-0" />
                  <span>¿Prefieres ayuda o pagar directo por WhatsApp? Enviar mi pedido a un asesor</span>
                </a>

                {/* Mensajes auxiliares de validación clara */}
                {!isShippingDetailsValid ? (
                  <p className="text-xs text-center text-zinc-500 pt-1">
                    Completa los datos de la agencia para habilitar la confirmación
                  </p>
                ) : !paymentMethod ? (
                  <p className="text-xs text-center text-zinc-500 pt-1">
                    Selecciona tu método de pago
                  </p>
                ) : !fileName ? (
                  <p className="text-xs text-center text-primary font-medium pt-1">
                    Adjunta la captura de tu comprobante de pago
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
