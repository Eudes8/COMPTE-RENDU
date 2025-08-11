'use client';

import { toast } from 'sonner';
import { createProjectAction } from './actions';
import { SubmitButton } from '@/components/SubmitButton';

// Définition du type pour un devis pour plus de sécurité
type Quote = {
  id: number;
  created_at: string;
  client_email: string;
  project_details: any;
};

/**
 * Composant côté client qui affiche la liste des devis et gère les interactions
 * (soumission du formulaire, affichage des notifications toast).
 */
export default function QuoteList({ quotes }: { quotes: Quote[] }) {

  // Fonction qui enveloppe l'action serveur pour gérer la réponse
  const handleFormAction = async (formData: FormData) => {
    const result = await createProjectAction(formData);
    if (result?.error) {
      toast.error("Erreur", { description: result.error });
    } else {
      toast.success("Succès", { description: `Le projet a été créé avec succès (ID: ${result.newProjectId}).` });
    }
  };

  if (!quotes || quotes.length === 0) {
    return <p className="text-slate-dark">Aucun nouveau devis pour le moment.</p>;
  }

  return (
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
          <form action={handleFormAction} className="self-end sm:self-center">
            <input type="hidden" name="quoteId" value={quote.id} />
            <SubmitButton size="sm" loadingText="Création...">
              Créer le Projet
            </SubmitButton>
          </form>
        </li>
      ))}
    </ul>
  );
}
