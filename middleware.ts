import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas protegidas que requieren autenticación
const protectedRoutes = ['/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Verificar si la ruta actual es una ruta protegida o hija de una ruta protegida
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isProtectedRoute) {
    // Buscar la cookie de sesión
    const sessionCookie = request.cookies.get('innova_admin_session');

    // Si no hay cookie o su valor no es el correcto, redirigir a /login
    if (!sessionCookie || sessionCookie.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Permitir la petición si no es ruta protegida o si tiene la cookie correcta
  return NextResponse.next();
}

export const config = {
  // Ignorar _next (archivos estáticos, imágenes, etc.) para mejorar rendimiento
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
