import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { redirect } from 'next/navigation';
import ChatComponent from '@/components/workspace/ChatComponent';
import FilesComponent from '@/components/workspace/FilesComponent';

// Helper pour le statut, similaire à celui du dashboard client
const getStatusClass = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-500/20 text-green-400';
      case 'en_pause': return 'bg-yellow-500/20 text-yellow-400';
      case 'terminé': return 'bg-slate-500/20 text-slate-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
};

/**
 * Page de l'espace de travail pour un projet spécifique.
 * Récupère les données du projet côté serveur et vérifie les permissions.
 */
export default async function ProjectWorkspacePage({ params }: { params: { projectId: string } }) {
  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  // 1. Récupérer l'utilisateur actuel et son profil (pour le rôle)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login'); // Devrait être géré par le middleware, mais c'est une double sécurité
  }
  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();

  // 2. Récupérer les détails du projet
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
        id,
        name,
        status,
        client:profiles ( email )
    `)
    .eq('id', params.projectId)
    .single();

  // 3. Vérifier les permissions et rediriger si nécessaire
  if (error || !project) {
    redirect('/dashboard');
  }

  // @ts-ignore - La jointure crée un objet client, mais TS peut ne pas le savoir sans types générés
  const clientEmail = project.client?.email || 'Non assigné';

  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Colonne de Contenu Principal */}
        <main className="lg:col-span-8 space-y-8">
          <section id="messages">
            <h2 className="text-2xl font-semibold font-poppins text-white mb-4">Messagerie du Projet</h2>
            <ChatComponent projectId={project.id} user={user} />
          </section>
        </main>

        {/* Colonne de la Sidebar */}
        <aside className="lg:col-span-4">
          <div className="p-6 bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 sticky top-28">
            <h2 className="text-xl font-bold font-poppins text-kinetic-cyan mb-4 break-words">
              {project.name}
            </h2>
            <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                    <span className="text-slate-dark">Statut:</span>
                    <span className={`font-semibold px-2 py-1 rounded-full text-xs ${getStatusClass(project.status)}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-dark">Client:</span>
                    <span className="font-semibold text-white">{clientEmail}</span>
                </div>
            </div>
            <div className="mt-6 border-t border-slate-dark/20 pt-6">
                <h3 className="text-lg font-semibold font-poppins text-white mb-4">Fichiers du Projet</h3>
                <FilesComponent projectId={project.id} user={user} userRole={profile?.role || null} />
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
