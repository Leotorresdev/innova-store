'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Clock,
  Package,
  Eye,
  Trash2,
  MapPin,
  Phone,
  User,
  CreditCard,
  MessageCircle,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';
import { markOrderAsCompleted, deleteOrder, cancelOrderAndRestoreStock } from '@/app/actions/orders';

type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  product: { name: string; imageUrl: string };
};

type Order = {
  id: string;
  customerName: string;
  customerIdDoc: string;
  customerPhone: string;
  shippingAgency: string;
  shippingAddress: string;
  paymentMethod: string;
  paymentProofUrl: string;
  total: number;
  status: 'PROCESSING' | 'COMPLETED' | 'REJECTED';
  createdAt: Date;
  items: OrderItem[];
};

export function OrdersClient({ initialOrders }: { initialOrders: Order[] }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleComplete = async (id: string) => {
    setLoadingId(id);
    const res = await markOrderAsCompleted(id);
    if (res.success) {
      setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'COMPLETED' } : o)));
    } else {
      alert(res.message);
    }
    setLoadingId(null);
  };

  const handleCancelAndRestore = async (id: string) => {
    if (!confirm('¿Deseas cancelar esta orden pendiente y devolver las unidades al inventario?')) return;
    setLoadingId(id);
    const res = await cancelOrderAndRestoreStock(id);
    if (res.success) {
      setOrders(orders.filter((o) => o.id !== id));
    } else {
      alert(res.message);
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este registro? Esta acción no se puede deshacer.')) return;
    setLoadingId(id);
    const res = await deleteOrder(id);
    if (res.success) {
      setOrders(orders.filter((o) => o.id !== id));
    } else {
      alert(res.message);
    }
    setLoadingId(null);
  };

  const generateReminderUrl = (order: Order) => {
    const cleanPhone = order.customerPhone.replace(/\D/g, '').replace(/^0/, '');
    const firstName = order.customerName.trim().split(' ')[0] || 'amig@';
    const itemsList = order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ');
    const text = `¡Hola ${firstName}! 👋 Te escribimos de Innova Company respecto a tu pedido de: ${itemsList}.\n\nNotamos que quedó pendiente la confirmación de tu pago. ¿Tienes alguna duda con el pago móvil o los datos de tu agencia para apartar tus unidades antes de que se agoten? Estamos a tu orden 😊`;
    return `https://wa.me/58${cleanPhone}?text=${encodeURIComponent(text)}`;
  };

  const isOrderOlderThanHours = (date: Date, hours: number) => {
    return Date.now() - new Date(date).getTime() > hours * 60 * 60 * 1000;
  };

  const processingOrders = orders.filter((o) => o.status === 'PROCESSING');
  const completedOrders = orders.filter((o) => o.status === 'COMPLETED');

  const OrderCard = ({ order }: { order: Order }) => {
    const isPending = order.status === 'PROCESSING';
    const isExpiredCandidate = isPending && isOrderOlderThanHours(order.createdAt, 4);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-card border border-border/60 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row gap-6 relative overflow-hidden"
      >
        {/* Decorative status bar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1.5 ${
            isPending ? (isExpiredCandidate ? 'bg-red-500' : 'bg-amber-500') : 'bg-emerald-500'
          }`}
        />

        {/* Info Column */}
        <div className="flex-1 space-y-4 pl-2">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <User className="size-4 text-muted-foreground" />
                  {order.customerName}
                  <span className="text-xs font-mono text-muted-foreground px-2 py-0.5 bg-surface rounded-md border border-border/50">
                    {order.customerIdDoc}
                  </span>
                </h3>

                {isExpiredCandidate && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-500 border border-red-500/20">
                    <AlertTriangle className="size-3" />
                    +4h sin concretar
                  </span>
                )}
              </div>

              <p className="text-sm text-muted-foreground mt-1">
                {mounted ? new Date(order.createdAt).toLocaleString('es-VE') : ''}
              </p>
            </div>

            <div className="text-right">
              <span className="text-xl font-display font-bold">${order.total.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-surface p-4 rounded-2xl border border-border/50">
            <div>
              <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
                <Phone className="size-3.5" /> Teléfono
              </span>
              <span className="font-medium font-mono">{order.customerPhone}</span>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
                <MapPin className="size-3.5" /> Envío ({order.shippingAgency.toUpperCase()})
              </span>
              <span className="font-medium">{order.shippingAddress}</span>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
                <CreditCard className="size-3.5" /> Pago
              </span>
              <span className="font-medium capitalize">{order.paymentMethod}</span>
            </div>
            <div>
              <span className="text-muted-foreground flex items-center gap-1.5 mb-1">
                <Package className="size-3.5" /> Items
              </span>
              <span className="font-medium">
                {order.items.reduce((acc, i) => acc + i.quantity, 0)} productos
              </span>
            </div>
          </div>

          {/* Items Preview */}
          <div className="flex gap-2 flex-wrap pt-2">
            {order.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 bg-surface border border-border/40 px-3 py-1.5 rounded-full text-xs"
              >
                <span className="font-semibold text-primary">{item.quantity}x</span>
                <span className="text-muted-foreground truncate max-w-[120px]">
                  {item.product.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions Column */}
        <div className="flex flex-col gap-2.5 justify-center border-t md:border-t-0 md:border-l border-border/40 pt-4 md:pt-0 md:pl-6 min-w-[160px]">
          {/* Si tiene capture (flujo tradicional) o si es express */}
          {order.paymentProofUrl && order.paymentProofUrl.startsWith('http') && (
            <a
              href={order.paymentProofUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-3.5 py-2 bg-surface hover:bg-muted border border-border/60 rounded-xl text-xs font-semibold transition"
            >
              <Eye className="size-3.5" /> Ver Capture
            </a>
          )}

          {/* Botón de 1-clic: Recordar por WhatsApp (para recuperar ventas en proceso) */}
          {isPending && (
            <a
              href={generateReminderUrl(order)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition text-center shadow-xs"
              title="Abrir chat para enviar mensaje de seguimiento amigable"
            >
              <MessageCircle className="size-4 shrink-0" />
              <span>Recordar por WA</span>
            </a>
          )}

          {/* Botón para marcar completado */}
          {isPending ? (
            <button
              onClick={() => handleComplete(order.id)}
              disabled={loadingId === order.id}
              className="flex items-center justify-center gap-2 px-3.5 py-2.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl text-xs font-bold transition disabled:opacity-50 shadow-xs cursor-pointer"
            >
              <Check className="size-4 shrink-0" />
              <span>{loadingId === order.id ? 'Cargando...' : 'Completar Envío'}</span>
            </button>
          ) : (
            <div className="flex items-center justify-center gap-1.5 px-3 py-2 bg-emerald-500/10 text-emerald-600 rounded-xl text-xs font-bold">
              <Check className="size-4 shrink-0" />
              <span>Enviado</span>
            </div>
          )}

          {/* Botón de 1-clic: Cancelar y Devolver Stock (solo para órdenes en proceso) */}
          {isPending && (
            <button
              onClick={() => handleCancelAndRestore(order.id)}
              disabled={loadingId === order.id}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
              title="Devolver stock al inventario y cancelar orden"
            >
              <RotateCcw className="size-3.5 shrink-0" />
              <span>Devolver Stock</span>
            </button>
          )}

          {/* Botón de eliminar definitivo */}
          <button
            onClick={() => handleDelete(order.id)}
            disabled={loadingId === order.id}
            className="flex items-center justify-center gap-1.5 px-3 py-1.5 text-red-500 hover:bg-red-500/10 rounded-xl text-xs font-medium transition disabled:opacity-50 mt-1 cursor-pointer"
          >
            <Trash2 className="size-3.5 shrink-0" />
            <span>Eliminar</span>
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-12">
      {/* Pendientes */}
      <section>
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500">
              <Clock className="size-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">En Proceso ({processingOrders.length})</h2>
              <p className="text-xs text-muted-foreground">
                Órdenes iniciadas por WhatsApp esperando verificación bancaria o seguimiento.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {processingOrders.length > 0 ? (
              processingOrders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 text-muted-foreground bg-surface rounded-3xl border border-dashed border-border"
              >
                No hay envíos en proceso.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Completados */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
            <Check className="size-5" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Completados ({completedOrders.length})</h2>
            <p className="text-xs text-muted-foreground">Envíos verificados y despachados con éxito.</p>
          </div>
        </div>

        <div className="grid gap-6 opacity-75">
          <AnimatePresence mode="popLayout">
            {completedOrders.length > 0 ? (
              completedOrders.map((order) => <OrderCard key={order.id} order={order} />)
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground bg-surface rounded-3xl border border-dashed border-border"
              >
                Aún no hay envíos completados.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
