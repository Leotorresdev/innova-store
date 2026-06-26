import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';
import { siteConfig } from '@/config/site';

const SOCIAL = [Twitter, Github, Linkedin, Mail];

const NAV_COLUMNS = [
  {
    title: 'Navegación',
    links: [
      { label: 'Colección V2', href: '/tienda' },
      { label: 'Novedades', href: '/tienda' },
      { label: 'Preventas', href: '/preventas' },
      { label: 'Acerca de', href: '#' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Centro de Ayuda', href: '#' },
      { label: 'Estado de Pedido', href: '#' },
      { label: 'Devoluciones', href: '#' },
      { label: 'Contacto', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground mt-24 rounded-t-[2.5rem]">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="mb-5">
            <Logo size="md" />
          </div>
          <p className="text-sm text-white/70 max-w-md leading-relaxed">
            Redefiniendo el estándar de la tecnología personal mediante diseño
            puro y materiales excepcionales.
          </p>
          <div className="flex gap-2 mt-6">
            {SOCIAL.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Red social"
                className="size-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {NAV_COLUMNS.map((col) => (
          <div key={col.title} className="md:col-span-2">
            <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-wider text-white/50">
              {col.title}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a className="hover:text-white transition" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-4">
          <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-wider text-white/50">
            Mantente al día
          </h4>
          <p className="text-sm text-white/70 mb-4">
            Acceso prioritario a lanzamientos y ediciones limitadas.
          </p>
          <form className="flex gap-2 bg-white/5 rounded-full p-1.5 border border-white/10">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              aria-label="Correo electrónico"
              className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-white/40"
            />
            <button
              type="submit"
              className="bg-white text-ink text-sm font-semibold px-5 py-2 rounded-full hover:opacity-90 transition"
            >
              Unirme
            </button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 px-6 max-w-7xl mx-auto flex flex-wrap gap-4 justify-between text-xs text-white/50">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Diseñado con precisión.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Términos Legales</a>
          <a href="#" className="hover:text-white transition">Política de Privacidad</a>
          <a href="#" className="hover:text-white transition">Cookies</a>
        </div>
      </div>
    </footer>
  );
}