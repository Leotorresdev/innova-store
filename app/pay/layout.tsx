import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Finalizar Compra | Innova',
  description: 'Completa tu pedido de forma segura en Innova Store. Métodos de pago adaptados a ti.',
  openGraph: {
    title: 'Finalizar Compra | Innova',
    description: 'Completa tu pedido de forma segura en Innova Store.',
  },
};

export default function PayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
