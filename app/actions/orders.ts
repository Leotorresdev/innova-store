'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function markOrderAsCompleted(orderId: string) {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: 'COMPLETED' },
    });

    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { success: false, message: 'No se pudo actualizar el estado.' };
  }
}

export async function deleteOrder(orderId: string) {
  try {
    await prisma.order.delete({
      where: { id: orderId }
    });
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error) {
    console.error('Error deleting order:', error);
    return { success: false, message: 'No se pudo eliminar la orden.' };
  }
}

/**
 * Cancela una orden pendiente y devuelve las unidades al stock en una transacción atómica.
 */
export async function cancelOrderAndRestoreStock(orderId: string) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return { success: false, message: 'La orden no existe.' };
    }

    await prisma.$transaction(async (tx) => {
      // Devolver stock solo si la orden estaba en proceso (no completada previamente)
      if (order.status === 'PROCESSING') {
        for (const item of order.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                increment: item.quantity,
              },
            },
          });
        }
      }

      // Eliminar la orden cancelada para liberar el panel
      await tx.order.delete({
        where: { id: orderId },
      });
    });

    revalidatePath('/admin');
    revalidatePath('/admin/orders');
    revalidatePath('/');
    revalidatePath('/preventas');

    return { success: true, message: 'Orden cancelada y stock devuelto exitosamente al inventario.' };
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'No se pudo cancelar la orden.';
    console.error('Error cancelando orden y devolviendo stock:', error);
    return { success: false, message: errMessage };
  }
}

/**
 * Libera automáticamente el stock de órdenes en proceso que superen las 4 horas sin concretarse.
 */
export async function autoReleaseExpiredOrders(maxHours: number = 4) {
  try {
    const expirationThreshold = new Date(Date.now() - maxHours * 60 * 60 * 1000);

    const expiredOrders = await prisma.order.findMany({
      where: {
        status: 'PROCESSING',
        createdAt: { lte: expirationThreshold },
      },
      include: { items: true },
    });

    if (expiredOrders.length === 0) {
      return { releasedCount: 0 };
    }

    let released = 0;
    for (const order of expiredOrders) {
      try {
        await prisma.$transaction(async (tx) => {
          for (const item of order.items) {
            await tx.product.update({
              where: { id: item.productId },
              data: {
                stock: { increment: item.quantity },
              },
            });
          }
          await tx.order.delete({
            where: { id: order.id },
          });
        });
        released++;
      } catch (err) {
        console.warn(`Error liberando orden expirada ${order.id}:`, err);
      }
    }

    if (released > 0) {
      revalidatePath('/admin');
      revalidatePath('/admin/orders');
      revalidatePath('/');
    }

    return { releasedCount: released };
  } catch (error) {
    console.error('Error en autoReleaseExpiredOrders:', error);
    return { releasedCount: 0 };
  }
}
