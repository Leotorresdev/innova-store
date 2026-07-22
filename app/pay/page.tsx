'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Phone, 
  CreditCard, 
  Wallet,
  CheckCircle2,
  Building2,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { processCheckout } from '@/app/actions/checkout';
import {
  useCartStore,
  selectCartItems,
  selectCartTotal,
} from '@/store/useCartStore';

export default function PayPage() {
  const router = useRouter();
  const items = useCartStore(selectCartItems);
  const total = useCartStore(selectCartTotal);
  const finalTotal = total;

  const clearCart = useCartStore((s) => s.clear);
  const [paymentMethod, setPaymentMethod] = useState<'binance' | 'pagomovil' | null>(null);
  const [shippingAgency, setShippingAgency] = useState<'zoom' | 'mrw' | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [exchangeRateVES, setExchangeRateVES] = useState<number | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');

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
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Tu carrito está vacío.');
      return;
    }
    if (!shippingAgency) {
      alert('Por favor selecciona una agencia de envío.');
      return;
    }
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago.');
      return;
    }

    const formData = new FormData(e.currentTarget);
    const file = formData.get('paymentProof') as File;
    if (!file || file.size === 0) {
      alert('Por favor sube el capture de tu pago.');
      return;
    }

    // Agregar datos adicionales que no son inputs directos
    formData.append('shippingAgency', shippingAgency);
    formData.append('paymentMethod', paymentMethod);
    formData.append('total', finalTotal.toString());
    if (exchangeRateVES) {
      formData.append('totalBs', (finalTotal * exchangeRateVES).toString());
    }
    formData.append('items', JSON.stringify(
      items.map(i => ({ id: i.id, cantidad: i.cantidad, nombre: i.nombre, precio: i.precio }))
    ));

    setIsSubmitting(true);
    
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

  // Redirigir al inicio si no hay productos (opcional, pero buena práctica)
  // useEffect(() => { if (items.length === 0) router.push('/'); }, [items]);

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="glass-card p-10 rounded-3xl max-w-lg shadow-elegant border border-white/20"
        >
          <div className="size-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-10" />
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">¡Pago Exitoso!</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Muchas gracias por tu compra <span className="font-semibold text-foreground">{customerName}</span>, te contactaremos en breve por whatsapp para enviarte el traking del envio.
          </p>
          <div className="mt-8 flex flex-col gap-4">
            <a 
              href="https://wa.me/584141234567" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold shadow-glow transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="size-5" />
              Si necesitas ayuda contáctanos al WhatsApp
            </a>
            <Button onClick={() => router.push('/')} variant="outline" className="w-full h-12 rounded-xl border-white/20 bg-transparent text-foreground hover:bg-white/5">
              Volver al Inicio
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-8"
        >
          <ArrowLeft className="size-4" />
          Volver al carrito
        </button>
        
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8 text-foreground">
          Finalizar Compra
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Columna Izquierda - Formulario */}
          <div className="lg:col-span-7 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Sección 1: Datos de Envío */}
              <section className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                    <MapPin className="size-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Datos de Envío</h2>
                </div>

                <div className="space-y-2 mb-5">
                  <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                  <input 
                    required
                    name="customerName"
                    type="text" 
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-surface border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Cédula de Identidad (V/E)</label>
                    <input 
                      required
                      name="customerIdDoc"
                      type="text" 
                      placeholder="Ej. V-12345678"
                      className="w-full bg-surface border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Teléfono Celular</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                      <input 
                        required
                        name="customerPhone"
                        type="tel" 
                        placeholder="Ej. 0414-1234567"
                        className="w-full bg-surface border border-border/60 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/40">
                  <label className="text-sm font-medium text-muted-foreground">Selecciona la Agencia de Envío</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setShippingAgency('zoom')}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        shippingAgency === 'zoom' 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-border/60 bg-surface text-muted-foreground hover:border-border'
                      }`}
                    >
                      <Building2 className="size-6" />
                      <span className="font-semibold text-sm">Grupo ZOOM</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setShippingAgency('mrw')}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                        shippingAgency === 'mrw' 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-border/60 bg-surface text-muted-foreground hover:border-border'
                      }`}
                    >
                      <Building2 className="size-6" />
                      <span className="font-semibold text-sm">MRW</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Ubicación exacta de la Sucursal</label>
                  <input 
                    required
                    name="shippingAddress"
                    type="text" 
                    placeholder="Estado, Ciudad, Nombre de la sucursal..."
                    className="w-full bg-surface border border-border/60 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
              </section>

              {/* Sección 2: Método de Pago */}
              <section className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                    <Wallet className="size-5" />
                  </div>
                  <h2 className="text-xl font-semibold">Método de Pago</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('binance')}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                      paymentMethod === 'binance' 
                        ? 'border-[#FCD535] bg-[#FCD535]/10 text-foreground' 
                        : 'border-border/60 bg-surface text-muted-foreground hover:border-border'
                    }`}
                  >
                    <CreditCard className="size-5" />
                    <span className="font-semibold">Binance Pay</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pagomovil')}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-center gap-3 ${
                      paymentMethod === 'pagomovil' 
                        ? 'border-primary bg-primary/5 text-primary' 
                        : 'border-border/60 bg-surface text-muted-foreground hover:border-border'
                    }`}
                  >
                    <CreditCard className="size-5" />
                    <span className="font-semibold">Pago Móvil</span>
                  </button>
                </div>

                {/* Detalles del Pago */}
                <AnimatePresence mode="wait">
                  {paymentMethod === 'binance' && (
                    <motion.div
                      key="binance"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-surface border border-border/60 rounded-2xl text-sm space-y-3 mt-4">
                        <p className="font-medium">Datos de Binance Pay:</p>
                        <p className="text-muted-foreground flex justify-between">
                          <span>Pay ID:</span>
                          <span className="font-mono text-foreground font-semibold">123456789</span>
                        </p>
                        <p className="text-muted-foreground flex justify-between">
                          <span>Correo:</span>
                          <span className="font-mono text-foreground font-semibold">pagos@innova.com</span>
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
                      className="overflow-hidden"
                    >
                      <div className="p-5 bg-surface border border-border/60 rounded-2xl text-sm space-y-3 mt-4">
                        <p className="font-medium">Datos de Pago Móvil:</p>
                        <p className="text-muted-foreground flex justify-between">
                          <span>Banco:</span>
                          <span className="font-semibold text-foreground">Banesco (0134)</span>
                        </p>
                        <p className="text-muted-foreground flex justify-between">
                          <span>Teléfono:</span>
                          <span className="font-mono text-foreground font-semibold">0414-1234567</span>
                        </p>
                        <p className="text-muted-foreground flex justify-between">
                          <span>Cédula:</span>
                          <span className="font-mono text-foreground font-semibold">V-12345678</span>
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subir Comprobante */}
                {paymentMethod && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4 border-t border-border/40"
                  >
                    <label className="text-sm font-medium text-muted-foreground mb-3 block">
                      Sube el capture de tu pago
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
                      <div className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-colors ${
                        fileName ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-border/60 bg-surface hover:bg-muted/50'
                      }`}>
                        {fileName ? (
                          <>
                            <CheckCircle2 className="size-8 text-emerald-500" />
                            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                              {fileName}
                            </span>
                            <span className="text-xs text-muted-foreground">Toca para cambiar de archivo</span>
                          </>
                        ) : (
                          <>
                            <div className="p-3 bg-muted rounded-full">
                              <Upload className="size-6 text-muted-foreground" />
                            </div>
                            <span className="text-sm font-medium">Haz clic o arrastra tu capture aquí</span>
                            <span className="text-xs text-muted-foreground">Formatos soportados: JPG, PNG</span>
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </section>
            </form>
          </div>

          {/* Columna Derecha - Resumen del Pedido */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 scrollbar-thin">
                {items.length > 0 ? (
                  items.map(item => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="relative size-16 rounded-xl overflow-hidden bg-surface shrink-0 border border-border/40">
                        <img src={item.imagen} alt={item.nombre} className="object-cover w-full h-full" />
                        <span className="absolute -top-2 -right-2 size-5 bg-ink text-ink-foreground text-[10px] rounded-full flex items-center justify-center font-bold">
                          {item.cantidad}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.nombre}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">${item.precio.toLocaleString()}</p>
                      </div>
                      <p className="text-sm font-semibold">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Tu carrito está vacío
                  </p>
                )}
              </div>

              <div className="space-y-3 pt-6 border-t border-border/60 text-sm">
                <div className="flex justify-between items-end pt-4 border-border/60 mt-4">
                  <span className="text-base font-semibold">Total a Pagar</span>
                  <div className="text-right">
                    <span className="text-2xl font-display font-bold text-gradient block">
                      ${finalTotal.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground mt-1 block">
                      {exchangeRateVES 
                        ? `~ Bs. ${(finalTotal * exchangeRateVES).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (BCV)`
                        : 'Calculando tasa BCV...'}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                form="checkout-form"
                disabled={!paymentMethod || items.length === 0 || isSubmitting}
                className="w-full mt-8 rounded-xl py-4 h-auto text-base font-semibold shadow-glow"
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Pedido'}
              </Button>
              
              {!paymentMethod && (
                <p className="text-xs text-center text-muted-foreground mt-3">
                  Selecciona un método de pago para continuar
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
