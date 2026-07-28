import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const formData = await request.formData();
    
    const name = formData.get('name') as string | null;
    const description = formData.get('description') as string | null;
    const price = formData.get('price') as string | null;
    const isNew = formData.get('isNew');
    const type = formData.get('type') as 'PRODUCT' | 'PRESALE' | null;
    const file = formData.get('image') as File | null;

    let imageUrl: string | undefined;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
      
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filename, buffer, { contentType: file.type });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('products').getPublicUrl(filename);
      imageUrl = data.publicUrl;
    }

    const regularPriceStr = formData.get('regularPrice') as string | null;
    const stockStr = formData.get('stock') as string | null;
    const presaleStartDateStr = formData.get('presaleStartDate') as string | null;
    const presaleEndDateStr = formData.get('presaleEndDate') as string | null;
    const wholesalePriceStr = formData.get('wholesalePrice') as string | null;
    const wholesaleRegularPriceStr = formData.get('wholesaleRegularPrice') as string | null;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (regularPriceStr !== null) updateData.regularPrice = regularPriceStr ? parseFloat(regularPriceStr) : null;
    if (stockStr !== null) updateData.stock = parseInt(stockStr) || 0;
    if (isNew !== null) updateData.isNew = isNew === 'true';
    if (type) updateData.type = type;
    if (imageUrl) updateData.imageUrl = imageUrl;
    if (presaleStartDateStr !== null) updateData.presaleStartDate = presaleStartDateStr ? new Date(presaleStartDateStr) : null;
    if (presaleEndDateStr !== null) updateData.presaleEndDate = presaleEndDateStr ? new Date(presaleEndDateStr) : null;
    if (wholesalePriceStr !== null) updateData.wholesalePrice = wholesalePriceStr ? parseFloat(wholesalePriceStr) : null;
    if (wholesaleRegularPriceStr !== null) updateData.wholesaleRegularPrice = wholesaleRegularPriceStr ? parseFloat(wholesaleRegularPriceStr) : null;

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    const { revalidatePath } = await import('next/cache');
    revalidatePath('/preventas');
    revalidatePath('/');
    revalidatePath('/admin');

    return NextResponse.json(product, { status: 200 });

  } catch (error) {
    console.error('Error PUT /api/products/[id]:', error);
    return NextResponse.json({ error: 'Error actualizando producto' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id }
    });
    
    // Clear cache
    const { revalidatePath } = await import('next/cache');
    revalidatePath('/preventas');
    revalidatePath('/admin');
    
    return NextResponse.json({ message: 'Producto eliminado exitosamente' }, { status: 200 });
  } catch (error) {
    console.error('Error DELETE /api/products/[id]:', error);
    return NextResponse.json({ error: 'Error eliminando producto' }, { status: 500 });
  }
}
