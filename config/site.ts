export const siteConfig = {
  name: 'INNOVA',
  tagline: 'Company',
  description:
    'Tienda digital Innova: software profesional, ERP, CRM, analítica e IA. Compra y reserva en preventa productos tecnológicos de vanguardia.',
  url: 'https://innova.store',
  locale: 'es',
  ogImage: '/assets/innova/hero.jpg',
  author: 'Innova Company',
  links: {
    instagram: 'https://www.instagram.com/innova.ven?igsh=aGNxYzZsZHFyZHlo',
    whatsapp: 'https://wa.me/584262663234',
    mail: 'mailto:contacto@innova.store',
  },
} as const;

export type SiteConfig = typeof siteConfig;

