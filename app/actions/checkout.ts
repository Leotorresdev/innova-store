'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { sendOrderNotificationToTelegram } from '@/lib/telegram';

export interface ExpressOrderInput {
  customerName: string;
  customerPhone: string;
  shippingAgency: string;
  shippingAddress: string;
  paymentMethod: string;
  total: number;
  totalBs: number;
  items: {
    id: string;
    nombre: string;
    cantidad: number;
    precio: number;
  }[];
}

/**
 * Registra un pedido del Modal de Checkout Express en 1-Paso como "Pendiente de Pago"
 * antes de redirigir al usuario a WhatsApp.
 */
export async function createExpressOrder(input: ExpressOrderInput) {
  try {
    const {
      customerName,
      customerPhone,
      shippingAgency,
      shippingAddress,
      paymentMethod,
      total,
      totalBs,
      items,
    } = input;

    if (!items || items.length === 0) {
      return { success: false, message: 'No hay productos en el pedido.' };
    }

    const order = await prisma.$transaction(async (tx) => {
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: String(item.id) },
          select: { stock: true, name: true },
        });

        if (product) {
          const decrementQty = Math.min(product.stock, item.cantidad);
          if (decrementQty > 0) {
            await tx.product.update({
              where: { id: String(item.id) },
              data: {
                stock: {
                  decrement: decrementQty,
                },
              },
            });
          }
        }
      }

      const newOrder = await tx.order.create({
        data: {
          customerName: customerName.trim(),
          customerIdDoc: 'PENDIENTE-WA',
          customerPhone: customerPhone.trim(),
          shippingAgency,
          shippingAddress: shippingAddress.trim(),
          paymentMethod: `Pendiente de Pago (${paymentMethod})`,
          paymentProofUrl: 'WHATSAPP_EXPRESS_PENDING',
          total: Number(total.toFixed(2)),
          status: 'PROCESSING',
          items: {
            create: items.map((item) => ({
              productId: String(item.id),
              quantity: item.cantidad,
              price: Number(item.precio.toFixed(2)),
            })),
          },
        },
      });

      return newOrder;
    });

    // Notificar a Telegram sin bloquear el flujo
    sendOrderNotificationToTelegram({
      id: order.id,
      customerName,
      customerIdDoc: 'Pendiente por WhatsApp',
      customerPhone,
      shippingAgency,
      shippingAddress,
      paymentMethod: `Pendiente de Pago (${paymentMethod})`,
      total,
      totalBs,
      paymentProofUrl: 'WHATSAPP_EXPRESS_PENDING',
      items: items.map((i) => ({
        ...i,
        productName: i.nombre,
      })),
    }).catch((err) => console.warn('Aviso Telegram no enviado:', err));

    revalidatePath('/');
    revalidatePath('/preventas');
    revalidatePath('/admin');
    revalidatePath('/admin/orders');

    return {
      success: true,
      orderId: order.id,
      message: 'Pedido registrado como Pendiente de Pago.',
    };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Error desconocido';
    console.error('Error registrando orden express:', error);
    return {
      success: false,
      message: errMessage || 'No se pudo registrar en base de datos, redirigiendo a WhatsApp.',
    };
  }
}
