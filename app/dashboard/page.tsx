import { cookies } from 'next/headers'
import { createServer } from '@/lib/supabase-client'
import { redirect } from 'next/navigation'

/**
 * Page du tableau de bord, protégée par authentification.
 * Cette page est un Server Component, elle s'exécute côté serveur.
 */
export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createServer(cookieStore)

  // Récupérer la session utilisateur
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Si aucune session n'est active, rediriger vers la page de connexion.
  // Bien que le middleware gère cela, c'est une double sécurité.
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="text-3xl font-bold text-gray-900">
          Tableau de Bord
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Bienvenue sur votre tableau de bord.
        </p>
        {session.user && (
          <p className="mt-2 text-md text-gray-500">
            Connecté en tant que : <span className="font-semibold">{session.user.email}</span>
          </p>
        )}
        <p className="mt-8 text-sm text-gray-600">
          Ceci est une zone protégée. Seuls les utilisateurs connectés peuvent y accéder.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          (La fonctionnalité de déconnexion sera ajoutée prochainement.)
        </p>
      </div>
    </div>
  )
}
