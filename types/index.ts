export interface Product {
  id: string | number;
  nombre: string;
  precio: number;
  precioOriginal: number;
  categoria: string;
  imagen: string;
  rating: number;
  ventas: number;
  etiqueta?: string;
  descuento?: number;
  stock: number;
  descripcion: string;
  tagline?: string;
  fechaLanzamiento?: string;
  badge?: string;
  preorder?: boolean;
}

export interface Testimonial {
  id: number;
  nombre: string;
  precioPreventas: number;
  avatar: string;
  rating: number;
  comentario: string;
  fechaLanzamiento: string;
  producto: string;
  fecha: string;
}

export type EstadoPreVenta = 'proxima' | 'activa' | 'agotada' | 'finalizada';

export interface PreVenta {
  id: number;
  nombre: string;
  slug: string;
  imagen: string;
  categoria: string;
  precioPreventas: number;     // precio de reserva (con descuento)
  precioEstimado: number;      // precio público al lanzar
  cuponDisponible: number;     // cupos totales
  cuponReservados: number;     // ya reservados
  fechaLimite: string;         // ISO → dispara countdown
  fechaLanzamiento: string;    // ISO
  descripcion: string;
  beneficios: string[];        // ["Envío gratis", "Edición numerada", "Soporte prioritario"]
  rating: number;
  vendidos: number;
  estado: EstadoPreVenta;
  destacado?: boolean;
}

export interface WholesaleItem {
  id: string;
  name: string;
  description: string;
  price: number;
  regular: number;
  off: number;
  stock: number;
  low?: boolean;
  image: string;
}
