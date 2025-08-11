'use client';

import { toast } from 'sonner';
import { initiateOnboardingAction } from './actions';
import { SubmitButton } from '@/components/SubmitButton';
import { Input } from '@/components/Input';
import { useState } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { IconQuote } from '@/components/icons/IconQuote';

type Quote = {
  id: number;
  created_at: string;
  client_email: string;
  project_details: any;
  price: number | null;
  status: string;
};

function QuoteItem({ quote }: { quote: Quote }) {
  const [price, setPrice] = useState(quote.price || '');

  const handleFormAction = async (formData: FormData) => {
    formData.append('price', price.toString());

    const result = await initiateOnboardingAction(formData);
    if (result?.error) {
      toast.error("Erreur", { description: result.error });
    } else {
      toast.success("Succès", { description: result.message });
    }
  };

  const isOnboardingStarted = quote.status !== 'nouveau';

  return (
    <li className="p-4 bg-deep-space-blue rounded-md border border-slate-dark/30 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex-grow">
        <p className="font-semibold text-slate-light">{quote.client_email}</p>
        <p className="text-sm text-slate-dark">
          Reçu le: {new Date(quote.created_at).toLocaleDateString('fr-FR')} | Statut: <span className="font-semibold text-kinetic-cyan">{quote.status}</span>
        </p>
        <details className="mt-2 text-xs">
          <summary className="cursor-pointer text-kinetic-cyan hover:underline">Voir les détails</summary>
          <pre className="mt-2 p-3 bg-black/30 rounded text-slate-light whitespace-pre-wrap text-xs">
            {JSON.stringify(quote.project_details, null, 2)}
          </pre>
        </details>
      </div>

      {!isOnboardingStarted && (
        <form action={handleFormAction} className="flex items-center gap-2 self-end sm:self-center">
          <input type="hidden" name="quoteId" value={quote.id} />
          <Input
            type="number"
            name="priceInput"
            placeholder="Prix (en €)"
            className="w-32 h-9"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <SubmitButton size="sm" loadingText="Envoi...">
            Lancer l'Onboarding
          </SubmitButton>
        </form>
      )}
    </li>
  );
}

export default function QuoteList({ quotes }: { quotes: Quote[] }) {
  if (!quotes || quotes.length === 0) {
    return (
        <EmptyState
            icon={<IconQuote className="h-8 w-8" />}
            title="Aucun nouveau devis"
            message="Dès qu'un nouveau devis est soumis via le site public, il apparaîtra ici prêt à être traité."
        />
    );
  }

  return (
    <ul className="space-y-4">
      {quotes.map((quote) => (
        <QuoteItem key={quote.id} quote={quote} />
      ))}
    </ul>
  );
}
