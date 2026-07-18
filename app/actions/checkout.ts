'use server';

import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { sendOrderNotificationToTelegram } from '@/lib/telegram';

export async function processCheckout(formData: FormData) {
  try {
    const itemsJson = formData.get('items') as string;
    const items = JSON.parse(itemsJson);
    
    const customerName = formData.get('customerName') as string;
    const customerIdDoc = formData.get('customerIdDoc') as string;
    const customerPhone = formData.get('customerPhone') as string;
    const shippingAgency = formData.get('shippingAgency') as string;
    const shippingAddress = formData.get('shippingAddress') as string;
    const paymentMethod = formData.get('paymentMethod') as string;
    const total = parseFloat(formData.get('total') as string);
    const file = formData.get('paymentProof') as File | null;

    if (!file) {
      throw new Error('Falta el capture de pago.');
    }

    // Subir imagen a Supabase (usamos el bucket de products o payments si existe)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `payments/${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
    
    const { error: uploadError } = await supabase.storage
      .from('products') // Usamos 'products' como base de almacenamiento general por ahora
      .upload(filename, buffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(filename);

    const paymentProofUrl = publicUrlData.publicUrl;

    // Usamos una transacción para asegurar la consistencia
    const order = await prisma.$transaction(async (tx) => {
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

      // Crear la orden
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerIdDoc,
          customerPhone,
          shippingAgency,
          shippingAddress,
          paymentMethod,
          paymentProofUrl,
          total,
          status: 'PROCESSING',
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.cantidad,
              price: item.precio
            }))
          }
        }
      });

      return newOrder;
    });

    // Enviar notificación a Telegram (en segundo plano, sin bloquear la respuesta)
    // Extraemos los nombres de los productos para que el mensaje sea más legible
    const itemsWithNames = await Promise.all(items.map(async (item: any) => {
      const product = await prisma.product.findUnique({ where: { id: item.id }, select: { name: true } });
      return { ...item, productName: product?.name || 'Producto' };
    }));
    
    sendOrderNotificationToTelegram({
      id: order.id,
      customerName,
      customerIdDoc,
      customerPhone,
      shippingAgency,
      shippingAddress,
      paymentMethod,
      total,
      paymentProofUrl,
      items: itemsWithNames
    });

    // Revalidar rutas
    revalidatePath('/');
    revalidatePath('/preventas');
    revalidatePath('/admin');
    revalidatePath('/admin/orders');

    return { success: true, message: 'Pedido procesado y stock actualizado correctamente.', orderId: order.id };
  } catch (error: any) {
    console.error('Error en checkout:', error);
    return { success: false, message: error.message || 'Error procesando el pedido.' };
  }
}
