'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const password = formData.get('password') as string;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    // Set cookie for 7 days
    cookies().set('admin_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    
    return { success: true };
  }

  return { success: false, error: 'Невірний пароль' };
}

export async function logout() {
  cookies().delete('admin_token');
  redirect('/login');
}
