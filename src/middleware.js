import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  console.log('Middleware triggered for:', pathname);
  
  // Protect all admin routes except login
  if (pathname.startsWith('/admin') && !pathname.includes('/login')) {
    const token = request.cookies.get('admin_token')?.value;
    
    console.log('Token found:', !!token);
    
    if (!token) {
      console.log('No token, redirecting to login');
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      console.log('Token valid, user:', payload.email);
      // Allow the request to continue
      return NextResponse.next();
    } catch (err) {
      console.log('Token invalid, error:', err.message);
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};