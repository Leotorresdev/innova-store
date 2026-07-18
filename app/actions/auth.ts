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
    cookieStore.set('innova_admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 día
    });
    
    return { success: true };
  }

  return { success: false, error: 'Credenciales incorrectas' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('innova_admin_session');
  redirect('/login');
}
