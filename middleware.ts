import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

/**
 * Middleware d'authentification pour Next.js.
 * Ce middleware s'exécute avant le rendu des pages et protège les routes.
 * Il utilise le client Supabase pour vérifier l'état de la session de l'utilisateur.
 */
export async function middleware(request: NextRequest) {
  // Crée une réponse de base pour pouvoir y attacher les cookies de session mis à jour.
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Crée un client Supabase spécifique au contexte du middleware.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // Si une fonction cookie est appelée, elle met à jour les cookies dans la requête
          // et la réponse pour que la session reste synchronisée.
          request.cookies.set({ name, value, ...options })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // Récupère les informations de l'utilisateur. La session est rafraîchie si nécessaire.
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Règle 1: Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée.
  if (!user && pathname.startsWith('/dashboard')) {
    // Redirige vers la page de connexion.
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Règle 2: Si l'utilisateur est connecté et essaie d'accéder aux pages publiques (connexion/inscription).
  if (user && (pathname === '/login' || pathname === '/signup')) {
    // Redirige vers le tableau de bord.
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Si aucune règle de redirection ne s'applique, continue vers la page demandée.
  return response
}

// Configuration du matcher pour spécifier sur quelles routes le middleware doit s'exécuter.
export const config = {
  matcher: [
    /*
     * Fait correspondre tous les chemins de requête, à l'exception de ceux qui commencent par :
     * - api (appels API)
     * - _next/static (fichiers statiques)
     * - _next/image (optimisation d'images)
     * - favicon.ico (fichier favicon)
     * Cela évite que le middleware ne s'exécute sur des ressources non pertinentes.
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/dashboard/:path*',
    '/login',
    '/signup',
  ],
}
