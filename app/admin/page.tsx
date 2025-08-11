import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import QuoteList from './QuoteList'; // Importation du nouveau composant client

/**
 * Page principale du tableau de bord administrateur.
 * Ce composant reste un Server Component, responsable de la récupération des données.
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
        {/* Le rendu de la liste est délégué au composant client */}
        <QuoteList quotes={quotes || []} />
      </div>
    </div>
  );
}
