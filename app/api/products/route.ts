import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = formData.get('price') as string;
    const stock = formData.get('stock') as string;
    const isNew = formData.get('isNew') === 'true';
    const type = formData.get('type') as 'PRODUCT' | 'PRESALE';
    const regularPriceStr = formData.get('regularPrice') as string;
    const file = formData.get('image') as File | null;
    
    // Nuevos campos
    const presaleStartDateStr = formData.get('presaleStartDate') as string;
    const presaleEndDateStr = formData.get('presaleEndDate') as string;
    const wholesalePriceStr = formData.get('wholesalePrice') as string;
    const wholesaleRegularPriceStr = formData.get('wholesaleRegularPrice') as string;

    if (!file) {
      return NextResponse.json({ error: 'La imagen es requerida' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${uuidv4()}-${file.name.replace(/\s+/g, '-')}`;
    const { error: uploadError } = await supabase.storage
      .from('products')
      .upload(filename, buffer, { contentType: file.type });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from('products')
      .getPublicUrl(filename);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        regularPrice: regularPriceStr ? parseFloat(regularPriceStr) : null,
        stock: parseInt(stock) || 0,
        isNew,
        imageUrl: publicUrlData.publicUrl,
        type,
        presaleStartDate: presaleStartDateStr ? new Date(presaleStartDateStr) : null,
        presaleEndDate: presaleEndDateStr ? new Date(presaleEndDateStr) : null,
        wholesalePrice: wholesalePriceStr ? parseFloat(wholesalePriceStr) : null,
        wholesaleRegularPrice: wholesaleRegularPriceStr ? parseFloat(wholesaleRegularPriceStr) : null,
      },
    });

    return NextResponse.json(product, { status: 201 });

  } catch (error) {
    console.error('Error POST /api/products:', error);
    return NextResponse.json({ error: 'Error creando el producto' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error GET /api/products:', error);
    return NextResponse.json({ error: 'Error obteniendo productos' }, { status: 500 });
  }
}
