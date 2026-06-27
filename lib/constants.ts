export const BRAND = {
  name: 'INNOVA',
  version: 'v2.0',
} as const;

export const ASSETS = {
  logo: '/assets/innova/logo.jpg',
  hero: '/assets/innova/hero.jpg',
  products: {
    headphones: '/assets/innova/products/headphones.jpg',
    watch: '/assets/innova/products/watch.jpg',
    keyboard: '/assets/innova/products/keyboard.jpg',
    laptop: '/assets/innova/products/laptop.jpg',
    charger: '/assets/innova/products/charger.jpg',
    glasses: '/assets/innova/products/glasses.jpg',
    speaker: '/assets/innova/products/speaker.jpg',
    mouse: '/assets/innova/products/mouse.jpg',
  },
} as const;

export const NAV_LINKS = [
  { href: '/#inicio', label: 'Inicio' },,
  { href: '/#tienda', label: 'Productos' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#features', label: 'Beneficios' },
  { href: '/#contacto', label: 'Contacto' },
  { href: '/preventas', label: 'Preventas' },
] as const;
