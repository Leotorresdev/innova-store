'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

interface CheckoutItem {
  id: string;
  cantidad: number;
  nombre: string;
}

export async function processCheckout(items: CheckoutItem[]) {
  try {
    // Usamos una transacción para asegurar la consistencia
    await prisma.$transaction(async (tx) => {
      for (const item of items) {
        // Verificar stock actual
        const product = await tx.product.findUnique({
          where: { id: item.id },
          select: { stock: true, name: true }
        });

        if (!product) {
          throw new Error(`Producto ${item.nombre} no encontrado en la base de datos.`);
        }

        if (product.stock < item.cantidad) {
          throw new Error(`No hay suficiente stock para el producto: ${product.name || item.nombre}. Disponibles: ${product.stock}`);
        }

        // Descontar stock
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.cantidad
            }
          }
        });
      }
    });

    // Revalidar las rutas donde se muestran los productos para actualizar el UI
    revalidatePath('/');
    revalidatePath('/preventas');

    return { success: true, message: 'Pedido procesado y stock actualizado correctamente.' };
  } catch (error: any) {
    console.error('Error en checkout:', error);
    return { success: false, message: error.message || 'Error procesando el pedido.' };
  }
}
