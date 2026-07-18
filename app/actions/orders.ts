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
