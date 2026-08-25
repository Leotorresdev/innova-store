'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import imageCompression from 'browser-image-compression';
import { processCheckout } from '@/app/actions/checkout';
import { useCartStore, selectCartItems, selectCartTotal } from '@/store/useCartStore';

// Módulos de Checkout
import { ShippingForm } from '@/components/features/checkout/ShippingForm';
import { PaymentMethod } from '@/components/features/checkout/PaymentMethod';
import { OrderSummary } from '@/components/features/checkout/OrderSummary';

export default function PayPage() {
  const router = useRouter();
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const clearCart = useCartStore((s) => s.clear);

  // States compartidos
  const [paymentMethod, setPaymentMethod] = useState<'binance' | 'pagomovil' | null>(null);
  const [shippingAgency, setShippingAgency] = useState<'zoom' | 'mrw' | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [customerNameInput, setCustomerNameInput] = useState('');
  const [customerIdDocInput, setCustomerIdDocInput] = useState('');
  const [customerPhoneInput, setCustomerPhoneInput] = useState('');
  const [shippingStateInput, setShippingStateInput] = useState('');
  const [shippingCityInput, setShippingCityInput] = useState('');
  const [shippingBranchInput, setShippingBranchInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exchangeRateVES, setExchangeRateVES] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [docType, setDocType] = useState('V');
  const [phonePrefix, setPhonePrefix] = useState('0414');

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isSuccess || items.length === 0) return;
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSuccess, items.length]);

  useEffect(() => {
    async function fetchRate() {
      try {
        const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
        const data = await res.json();
        if (data && data.promedio) {
          setExchangeRateVES(data.promedio);
        }
      } catch (error) {
        console.error('Error fetching BCV rate:', error);
      }
    }
    fetchRate();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) return alert('Tu carrito está vacío.');
    if (!shippingAgency) return alert('Por favor selecciona una agencia de envío.');
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

    const docNumber = formData.get('customerIdDocNumber');
    const phoneNumber = formData.get('customerPhoneNumber');
    const state = formData.get('shippingState') || '';
    const city = formData.get('shippingCity') || '';
    const branch = formData.get('shippingBranch') || '';

    formData.append('customerIdDoc', `${docType}-${docNumber}`);
    formData.append('customerPhone', `${phonePrefix}-${phoneNumber}`);
    formData.append('shippingAddress', [state, city, branch].filter(Boolean).join(', '));
    formData.append('shippingAgency', shippingAgency);
    formData.append('paymentMethod', paymentMethod);
    formData.append('total', total.toString());
    
    if (exchangeRateVES) formData.append('totalBs', (total * exchangeRateVES).toString());
    
    formData.append('items', JSON.stringify(
      items.map(i => ({ id: i.id, cantidad: i.cantidad, nombre: i.nombre, precio: i.precio }))
    ));
    
    try {
      const result = await processCheckout(formData);
      if (result.success) {
        setCustomerName(formData.get('customerName') as string);
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

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 10 }} 
          animate={{ opacity: 1, scale: 1, y: 0 }} 
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="bg-white dark:bg-card p-10 rounded-[2.5rem] max-w-lg shadow-sm border border-zinc-200/60 dark:border-white/10"
        >
          <div className="size-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="font-display text-3xl font-bold text-zinc-900 dark:text-white mb-4">¡Pedido Confirmado!</h1>
          <p className="text-zinc-500 leading-relaxed">
            Gracias por tu compra <span className="font-semibold text-zinc-900 dark:text-white">{customerName}</span>. Te contactaremos en breve por WhatsApp con los detalles de tu envío.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <a 
              href="https://wa.me/584262663234" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-all"
            >
              <MessageCircle className="size-5" />
              Escríbenos al WhatsApp
            </a>
            <Button onClick={() => router.push('/')} variant="outline" className="w-full h-14 rounded-2xl border-zinc-200 dark:border-white/10 bg-transparent text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-white/5 font-medium">
              Volver al Inicio
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const isFormComplete = 
    customerNameInput.trim() !== '' &&
    customerIdDocInput.trim() !== '' &&
    customerPhoneInput.trim() !== '' &&
    shippingCityInput.trim() !== '' &&
    shippingAgency !== null &&
    paymentMethod !== null &&
    fileName !== null;

  const isMissingDetails = 
    customerNameInput.trim() === '' ||
    customerIdDocInput.trim() === '' ||
    customerPhoneInput.trim() === '' ||
    shippingCityInput.trim() === '';

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto px-6">
        <button 
          onClick={() => {
            if (window.confirm('¿Estás seguro que deseas cancelar tu proceso de pago?')) {
              router.back();
            }
          }}
          className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition mb-8 font-medium"
        >
          <ArrowLeft className="size-4" />
          Volver al carrito
        </button>
        
        <h1 className="font-display text-4xl font-bold mb-10 text-zinc-900 dark:text-white tracking-tight">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <form id="checkout-form" onSubmit={handleSubmit} className="w-full">
              <ShippingForm 
                customerNameInput={customerNameInput} setCustomerNameInput={setCustomerNameInput}
                docType={docType} setDocType={setDocType}
                customerIdDocInput={customerIdDocInput} setCustomerIdDocInput={setCustomerIdDocInput}
                phonePrefix={phonePrefix} setPhonePrefix={setPhonePrefix}
                customerPhoneInput={customerPhoneInput} setCustomerPhoneInput={setCustomerPhoneInput}
                shippingAgency={shippingAgency} setShippingAgency={setShippingAgency}
                shippingStateInput={shippingStateInput} setShippingStateInput={setShippingStateInput}
                shippingCityInput={shippingCityInput} setShippingCityInput={setShippingCityInput}
                shippingBranchInput={shippingBranchInput} setShippingBranchInput={setShippingBranchInput}
              />
              <PaymentMethod 
                paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}
                fileName={fileName} handleFileChange={handleFileChange}
                copiedType={copiedType} handleCopy={handleCopy}
              />
            </form>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-28">
              <OrderSummary items={items} finalTotal={total} exchangeRateVES={exchangeRateVES} />
              
              <div className="mt-8">
                <Button
                  type="submit"
                  form="checkout-form"
                  disabled={!isFormComplete || items.length === 0 || isSubmitting}
                  className="w-full rounded-2xl py-7 h-auto text-base font-semibold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Procesando seguro...' : 'Confirmar Pedido'}
                </Button>
                
                {isMissingDetails ? (
                  <p className="text-xs text-center text-zinc-500 mt-4">
                    Completa todos tus datos de envío para continuar
                  </p>
                ) : !shippingAgency ? (
                  <p className="text-xs text-center text-zinc-500 mt-4">
                    Selecciona una agencia de envío
                  </p>
                ) : !paymentMethod ? (
                  <p className="text-xs text-center text-zinc-500 mt-4">
                    Selecciona un método de pago
                  </p>
                ) : !fileName ? (
                  <p className="text-xs text-center text-primary font-medium mt-4">
                    Sube el comprobante de tu pago
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
