import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { EmptyState } from '@/components/EmptyState';

const IconProject = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
);

const getProjectStatusClass = (status: string) => {
    switch (status) {
      case 'actif': return 'bg-green-500/20 text-green-400';
      case 'en_pause': return 'bg-yellow-500/20 text-yellow-400';
      case 'terminé': return 'bg-slate-500/20 text-slate-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
};

const OnboardingStatus = ({ quotes }: { quotes: any[] }) => {
  if (!quotes || quotes.length === 0) return null;
  return (
    <div className="mb-8 bg-yellow-900/50 border border-yellow-500/50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-yellow-300 mb-4">Onboarding en cours</h2>
      <ul className="space-y-4">
        {quotes.map(quote => (
          <li key={quote.id} className="p-4 bg-deep-space-blue/50 rounded-md">
            <p className="font-semibold text-white">Projet (Devis #{quote.id})</p>
            {quote.status === 'contrat_envoye' && <p className="text-yellow-300 mt-1">Action requise : Un contrat vous a été envoyé par email. Veuillez le signer pour continuer.</p>}
            {(quote.status === 'contrat_signe' || quote.status === 'facture_payee') && quote.lago_invoice_payment_url && (
              <div className="mt-2">
                <p className="text-yellow-300 mt-1">Action requise : Veuillez régler la facture d'acompte pour démarrer le projet.</p>
                <a href={quote.lago_invoice_payment_url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                  <Button variant="primary">Payer la facture</Button>
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const [projectsResult, quotesResult] = await Promise.all([
    supabase.from('projects').select('id, name, status').eq('client_id', session.user.id).order('created_at', { ascending: false }),
    supabase.from('quotes').select('id, status, lago_invoice_payment_url').in('status', ['contrat_envoye', 'contrat_signe', 'facture_payee']).eq('client_email', session.user.email!).order('created_at', { ascending: false })
  ]);

  const { data: projects, error: projectsError } = projectsResult;
  const { data: quotes, error: quotesError } = quotesResult;

  if (projectsError) console.error("Erreur de chargement des projets:", projectsError.message);
  if (quotesError) console.error("Erreur de chargement des devis:", quotesError.message);

  return (
    <div className="container mx-auto max-w-7xl p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold font-poppins text-white">Mon Tableau de Bord</h1>
          <p className="text-sm text-slate-dark mt-1">Connecté en tant que {session.user.email}</p>
        </div>
        <Link href="/devis"><Button>Démarrer un nouveau projet</Button></Link>
      </div>

      <OnboardingStatus quotes={quotes || []} />

      <div className="bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 p-6">
        <h2 className="text-xl font-semibold text-kinetic-cyan mb-4">Mes Projets Actifs</h2>
        {projects && projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link href={`/projects/${project.id}`} key={project.id} className="group block p-6 bg-deep-space-blue rounded-md border border-slate-dark/30 hover:border-kinetic-cyan/50 transition-all duration-300">
                <h3 className="font-bold text-slate-light font-poppins group-hover:text-kinetic-cyan transition-colors">{project.name}</h3>
                <p className="mt-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getProjectStatusClass(project.status)}`}>
                    {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                  </span>
                </p>
              </Link>
            ))}
          </div>
        ) : (
          !projectsError && <EmptyState
            icon={<IconProject />}
            title="Aucun projet actif"
            message="Vos projets apparaîtront ici une fois que le processus d'onboarding sera terminé."
            cta={{ text: "Lancer un nouveau devis", href: "/devis" }}
          />
        )}
         {projectsError && <p className="text-red-500 text-center py-8">Impossible de charger vos projets pour le moment.</p>}
      </div>
    </div>
  );
}
