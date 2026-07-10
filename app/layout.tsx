import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { siteConfig } from '@/config/site';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { NoiseBackground } from '@/components/ui/NoiseBackground';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  keywords: [
    'Innova',
    'tienda digital',
    'software profesional',
    'ERP',
    'CRM',
    'analítica',
    'IA',
    'preventas',
    'tecnología',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteConfig.url,
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1280, height: 720, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} · ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0c10' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="antialiased font-sans relative">
        <NoiseBackground />
        <Navbar />
        <main className="pt-24">{children}</main>
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}