import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';

/**
 * Tableau de bord principal pour les clients authentifiés.
 * Affiche la liste de leurs projets.
 */
export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  // Récupérer les projets pour l'utilisateur connecté
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, name, status')
    .eq('client_id', session.user.id)
    .order('created_at', { ascending: false });

  // Gérer l'erreur de récupération des projets sans bloquer la page
  if (error) {
    console.error("Erreur lors de la récupération des projets:", error);
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'actif':
        return 'bg-green-500/20 text-green-400';
      case 'en_pause':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'terminé':
        return 'bg-slate-500/20 text-slate-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-white">
            Mon Tableau de Bord
          </h1>
          <p className="text-sm text-slate-dark mt-1">
            Connecté en tant que {session.user.email}
          </p>
        </div>
        <Link href="/devis">
            <Button>Démarrer un nouveau projet</Button>
        </Link>
      </div>

      {/* Section Mes Projets */}
      <div className="bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 p-6">
        <h2 className="text-xl font-semibold text-kinetic-cyan mb-4">
          Mes Projets
        </h2>
        {error && <p className="text-red-500">Impossible de charger vos projets pour le moment.</p>}
        {!error && projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="group block p-6 bg-deep-space-blue rounded-md border border-slate-dark/30 hover:border-kinetic-cyan/50 transition-all duration-300">
                <h3 className="font-bold text-slate-light font-poppins group-hover:text-kinetic-cyan transition-colors">
                  {project.name}
                </h3>
                <p className="mt-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        ) : (
          !error && <p className="text-slate-dark">Vous n'avez aucun projet pour le moment.</p>
        )}
      </div>
    </div>
  );
}
