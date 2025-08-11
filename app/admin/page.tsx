import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { Button } from '@/components/Button';
import { createProjectAction } from './actions'; // L'action serveur sera dans un fichier séparé

/**
 * Page principale du tableau de bord administrateur.
 * Affiche les nouveaux devis et permet de les convertir en projets.
 */
export default async function AdminDashboard() {
  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  // Récupérer tous les devis avec le statut 'nouveau'
  const { data: quotes, error } = await supabase
    .from('quotes')
    .select('*')
    .eq('status', 'nouveau')
    .order('created_at', { ascending: false });

  if (error) {
    return <p className="p-8 text-red-500">Erreur lors du chargement des devis: {error.message}</p>;
  }

  return (
    <div className="container mx-auto max-w-7xl p-6 sm:p-8">
      <h1 className="text-3xl font-bold font-poppins mb-8 text-white">
        Tableau de bord Administrateur
      </h1>
      <div className="bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 p-6">
        <h2 className="text-xl font-semibold text-kinetic-cyan mb-4">
          Nouveaux Devis en Attente
        </h2>
        {quotes.length === 0 ? (
          <p className="text-slate-dark">Aucun nouveau devis pour le moment.</p>
        ) : (
          <ul className="space-y-4">
            {quotes.map((quote) => (
              <li key={quote.id} className="p-4 bg-deep-space-blue rounded-md border border-slate-dark/30 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="flex-grow">
                  <p className="font-semibold text-slate-light">{quote.client_email}</p>
                  <p className="text-sm text-slate-dark">
                    Reçu le: {new Date(quote.created_at).toLocaleDateString('fr-FR')}
                  </p>
                  <details className="mt-2 text-xs">
                    <summary className="cursor-pointer text-kinetic-cyan hover:underline">
                      Voir les détails du projet
                    </summary>
                    <pre className="mt-2 p-3 bg-black/30 rounded text-slate-light whitespace-pre-wrap text-xs">
                      {JSON.stringify(quote.project_details, null, 2)}
                    </pre>
                  </details>
                </div>
                <form action={createProjectAction} className="self-end sm:self-center">
                  <input type="hidden" name="quoteId" value={quote.id} />
                  <Button type="submit" size="sm">
                    Créer le Projet
                  </Button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
