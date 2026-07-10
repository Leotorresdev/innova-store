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
  }
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground mt-20">
      <div className="mx-auto max-w-7xl px-6 py-7 flex flex-col md:flex-row justify-between gap-10">
        <div className="max-w-sm">
          <div className="mb-4">
            <Logo size="md" />
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            Redefiniendo el estándar de la tecnología personal mediante diseño puro y materiales excepcionales.
          </p>
          <div className="flex gap-2 mt-6">
            {SOCIAL.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Red social"
                className="size-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex gap-16">
          {NAV_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-semibold mb-4 text-xs uppercase tracking-wider text-white/50">
                {col.title}
              </h4>
              <ul className="space-y-2 text-sm text-white/80">
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
        </div>
      </div>
      <div className="border-t border-white/10 py-5 px-6 max-w-7xl mx-auto flex flex-wrap gap-4 justify-between text-xs text-white/50">
        <p>© {new Date().getFullYear()} {siteConfig.name}. Diseñado con precisión.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition">Términos Legales</a>
          <a href="#" className="hover:text-white transition">Privacidad</a>
        </div>
      </div>
    </footer>
  );
}