import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import type { Database } from '@/types/database';

const PROTECTED_ROUTES = ['/dashboard', '/brand', '/admin', '/coordinator', '/onboarding'];
const AUTH_ROUTES = ['/login', '/register', '/signup', '/forgot-password'];

export async function middleware(req: NextRequest) {
  let res = NextResponse.next({ request: req });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value));
          res = NextResponse.next({ request: req });
          cookiesToSet.forEach(({ name, value, options }) =>
            res.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // getUser() revalidates the token with the Supabase Auth server (safer than getSession()).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = req.nextUrl.pathname;

  if (user && AUTH_ROUTES.some((r) => path.startsWith(r))) {
    const redirect = NextResponse.redirect(new URL('/dashboard', req.url));
    res.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  if (!user && PROTECTED_ROUTES.some((r) => path.startsWith(r))) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('next', path);
    const redirect = NextResponse.redirect(loginUrl);
    res.cookies.getAll().forEach((c) => redirect.cookies.set(c));
    return redirect;
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|p/|api/webhook).*)'],
};
