import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if we are trying to access any route under /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check for the admin auth cookie
    const authCookie = request.cookies.get('admin_token');

    // If no cookie, redirect to /login
    if (!authCookie || authCookie.value !== 'authenticated') {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
