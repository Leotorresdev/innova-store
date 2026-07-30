'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(formData: FormData) {
  const user = formData.get('user') as string;
  const password = formData.get('password') as string;

  const validUser = process.env.ADMIN_USER;
  const validPassword = process.env.ADMIN_PASSWORD;

  if (user === validUser && password === validPassword) {
    // Establecer cookie con duración de 24 horas
    const cookieStore = await cookies();
    const isProduction = process.env.NODE_ENV === 'production';
    cookieStore.set('innova_admin_session', 'authenticated', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      ...(isProduction ? { domain: '.innovacompanyven.com' } : {}),
      maxAge: 60 * 60 * 24 // 1 día
    });
    
    return { success: true };
  }

  return { success: false, error: 'Credenciales incorrectas' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const isProduction = process.env.NODE_ENV === 'production';
  cookieStore.delete({
    name: 'innova_admin_session',
    ...(isProduction ? { domain: '.innovacompanyven.com' } : {})
  });
  redirect('/login');
}
