import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/admin'];
const MAIN_DOMAIN = 'innovacompanyven.com';
const ADMIN_DOMAIN = 'admin.innovacompanyven.com';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';
  const { pathname } = request.nextUrl;

  const isLocalhost = hostname.includes('localhost');
  const isAdminDomain = hostname.includes(ADMIN_DOMAIN);

  // 1. Redirecciones y Rewrites del Subdominio
  if (isAdminDomain) {
    // Si estamos en admin.innovacompanyven.com y la ruta NO empieza con /admin
    // reescribimos internamente para que Next.js cargue la carpeta /admin
    if (!pathname.startsWith('/admin')) {
      url.pathname = `/admin${pathname === '/' ? '' : pathname}`;
    }
  } else if (pathname.startsWith('/admin') && !isLocalhost) {
    // Si entran a innovacompanyven.com/admin desde el dominio normal en producción
    // Redirigir limpiamente al subdominio
    const newUrl = new URL(`https://${ADMIN_DOMAIN}${pathname.replace('/admin', '') || '/'}`);
    return NextResponse.redirect(newUrl);
  }

  // 2. Lógica de Autenticación
  // Verificamos si la ruta actual es protegida (o si estamos navegando en el subdominio admin)
  const isProtectedRoute = isAdminDomain || protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get('innova_admin_session');

    if (!sessionCookie || sessionCookie.value !== 'authenticated') {
      // Redirigimos siempre al dominio principal para iniciar sesión
      const loginUrl = new URL(`https://${MAIN_DOMAIN}/login`);
      // En local, usamos el request.url base
      return NextResponse.redirect(isLocalhost ? new URL('/login', request.url) : loginUrl);
    }
  }

  // Si estamos en el subdominio admin y modificamos la URL arriba, aplicamos el rewrite
  if (isAdminDomain && !pathname.startsWith('/admin')) {
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // Ignorar _next (archivos estáticos, imágenes, etc.) para mejorar rendimiento
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
