import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware d'authentification et d'autorisation pour Next.js.
 * Ce middleware protège les routes en fonction de l'état de connexion
 * et du rôle de l'utilisateur.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Récupère la session de l'utilisateur
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Règle 1: Protéger /dashboard pour les utilisateurs non connectés
  if (!user && pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Règle 2: Rediriger les utilisateurs connectés depuis les pages d'auth
  if (user && (pathname === '/login' || pathname === '/signup')) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Règle 3: Protéger /admin pour les non-admins
  if (pathname.startsWith('/admin')) {
    // Si l'utilisateur n'est pas connecté, le rediriger vers la page de connexion
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    // Si l'utilisateur est connecté, vérifier son rôle dans la base de données
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // Si le profil n'existe pas ou si le rôle n'est pas 'admin', rediriger
    if (!profile || profile.role !== 'admin') {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard' // Redirige vers le tableau de bord client
      return NextResponse.redirect(url)
    }
  }

  return response
}

// Mettre à jour le matcher pour inclure /admin
export const config = {
  matcher: [
    /*
     * Fait correspondre tous les chemins de requête, à l'exception des ressources statiques
     * et des appels API pour des raisons de performance.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/signup',
  ],
}
