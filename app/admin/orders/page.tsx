import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronLeft, LogOut } from 'lucide-react';
import { OrdersClient } from './OrdersClient';
import { logoutAction } from '@/app/actions/auth';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: {
          product: {
            select: { name: true, imageUrl: true }
          }
        }
      }
    }
  });

  return (
    <div className="min-h-screen bg-background pb-20 pt-24 md:pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver al Panel Principal
            </Link>
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-3xl font-bold text-foreground">Control de Envíos</h1>
              <p className="text-muted-foreground">Gestiona las compras, verifica los pagos y confirma los envíos.</p>
            </div>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </form>
        </div>

        <OrdersClient initialOrders={orders} />
      </div>
    </div>
  );
}
