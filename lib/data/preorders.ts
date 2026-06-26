import type { Product, WholesaleItem } from '@/types';
import { ASSETS } from '@/lib/constants';

const imgGlasses = ASSETS.products.glasses;
const imgCharger = ASSETS.products.charger;
const imgWatch = ASSETS.products.watch;
const imgHeadphones = ASSETS.products.headphones;
const imgSpeaker = ASSETS.products.speaker;

export const preorders: Product[] = [
  {
    id: 101,
    nombre: 'Innova Vision',
    precio: 1499,
    precioOriginal: 1799,
    categoria: 'AR / VR',
    imagen: imgGlasses,
    rating: 4.9,
    ventas: 312,
    etiqueta: '-15% Preventa',
    descuento: 15,
    stock: 50,
    descripcion: 'Gafas de realidad mixta de próxima generación',
    tagline: 'Gafas de realidad mixta de próxima generación',
    badge: '-15% Preventa',
    preorder: true,
    fechaLanzamiento: '30 Oct 2026',
  },
  {
    id: 102,
    nombre: 'Halo Charge',
    precio: 79,
    precioOriginal: 99,
    categoria: 'Energía',
    imagen: imgCharger,
    rating: 4.7,
    ventas: 980,
    etiqueta: 'Early Access',
    descuento: 20,
    stock: 120,
    descripcion: 'Carga inalámbrica magnética 30W',
    tagline: 'Carga inalámbrica magnética 30W',
    badge: 'Early Access',
    preorder: true,
    fechaLanzamiento: '15 Sep 2026',
  },
  {
    id: 103,
    nombre: 'Time V2 · Edición Pro',
    precio: 599,
    precioOriginal: 799,
    categoria: 'Wearables',
    imagen: imgWatch,
    rating: 4.9,
    ventas: 156,
    etiqueta: 'Edición Limitada',
    descuento: 25,
    stock: 25,
    descripcion: 'Titanio cepillado y correa premium',
    tagline: 'Titanio cepillado y correa premium',
    badge: 'Edición Limitada',
    preorder: true,
    fechaLanzamiento: '20 Nov 2026',
  },
];

export const wholesale: WholesaleItem[] = [
  {
    id: 'ws-sound-pro',
    name: 'Innova Sound Pro X-1',
    description: 'Cancelación de ruido activa, 40h de batería. Pack de 10 unidades para distribución.',
    price: 899,
    regular: 1490,
    off: 40,
    stock: 12,
    image: imgHeadphones,
  },
  {
    id: 'ws-watch-s2',
    name: 'Innova Watch Elite S2',
    description: 'Pantalla AMOLED, sensor de salud avanzado. Lote de 20 unidades para reventa premium.',
    price: 1250,
    regular: 2100,
    off: 35,
    stock: 5,
    low: true,
    image: imgWatch,
  },
  {
    id: 'ws-vision-cam',
    name: 'Vision Tech Cam VR',
    description: 'Cámara 360 grados, resolución 8K. Pack corporativo de 5 unidades exclusivas.',
    price: 2100,
    regular: 3200,
    off: 45,
    stock: 8,
    image: imgSpeaker,
  },
];
