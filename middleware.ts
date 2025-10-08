import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const url = req.nextUrl.clone();

  const privateRoutes = [
    '/',
    '/configuracion',
    '/dashboard',
    '/productos',
    '/usuarios',
  ];

  const isPrivate = privateRoutes.some(
    (route) => url.pathname === route || url.pathname.startsWith(`${route}/`)
  );

  if (!session && isPrivate) {
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (session && url.pathname.startsWith('/auth')) {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return res;
}

export const config = {
  matcher: [
    '/',
    '/productos/:path*',
    '/categorias/:path*',
    '/crear-producto/:path*',
    '/configuracion/:path*',
    '/auth/:path*',
    '/login',
  ],
};
