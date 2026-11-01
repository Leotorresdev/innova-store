import { getWhatsAppInternationalNumber } from './storeConfig';

export const siteConfig = {
  name: 'INNOVA',
  tagline: 'Company',
  description:
    'Tienda digital Innova: Compra y reserva en preventa productos tecnológicos de vanguardia.',
  url: 'https://innovacompanyven.com',
  locale: 'es',
  ogImage: '/assets/innova/hero.jpg',
  author: 'Innova Company',
  links: {
    instagram: 'https://www.instagram.com/innova.ven?igsh=aGNxYzZsZHFyZHlo',
    whatsapp: `https://wa.me/${getWhatsAppInternationalNumber()}`,
    mail: 'mailto:innovacompanyven@gmail.com',
  },
} as const;

export type SiteConfig = typeof siteConfig;

