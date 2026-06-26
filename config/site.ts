export const siteConfig = {
  name: 'Innova',
  tagline: 'Software profesional que impulsa tu empresa',
  description:
    'Tienda digital Innova: software profesional, ERP, CRM, analítica e IA. Compra y reserva en preventa productos tecnológicos de vanguardia.',
  url: 'https://innova.store',
  locale: 'es',
  ogImage: '/assets/innova/hero.jpg',
  author: 'Innova Company',
  links: {
    twitter: '#',
    github: '#',
    linkedin: '#',
    mail: 'mailto:contacto@innova.store',
  },
} as const;

export type SiteConfig = typeof siteConfig;
