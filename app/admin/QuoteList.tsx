'use client';

import { toast } from 'sonner';
import { onboardQuoteAction, rejectQuoteAction } from './actions';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { useState, useTransition } from 'react';
import { EmptyState } from '@/components/EmptyState';
import { IconQuote } from '@/components/icons/IconQuote';
import { SubmitButton } from '@/components/SubmitButton';

type Quote = {
  id: number;
  created_at: string;
  client_email: string;
  project_details: any;
  price: number | null;
  status: string;
};

function QuoteItem({ quote }: { quote: Quote }) {
  const [isRejecting, startRejectTransition] = useTransition();
  // Price is in Euros for the input, converted from cents
  const [price, setPrice] = useState(quote.price ? (quote.price / 100).toString() : '');

  const handleReject = () => {
    startRejectTransition(async () => {
      const result = await rejectQuoteAction(quote.id);
      if (result?.error) {
        toast.error("Erreur", { description: result.error });
      } else {
        toast.success("Succès", { description: "Devis rejeté." });
      }
    });
  };

  // Wrapper for form action to handle transition
  const handleOnboardSubmit = async (formData: FormData) => {
    const priceValue = parseFloat(formData.get('price') as string);
    const result = await onboardQuoteAction(quote.id, priceValue);
    if (result?.error) {
      toast.error("Erreur", { description: result.error });
    } else {
      toast.success("Succès", { description: "Processus d'onboarding lancé." });
    }
  };

  return (
    <li className="p-4 bg-deep-space-blue rounded-md border border-slate-dark/30 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div className="flex-grow">
        <p className="font-semibold text-slate-light">{quote.client_email}</p>
        <p className="text-sm text-slate-dark">
          Reçu le: {new Date(quote.created_at).toLocaleDateString('fr-FR')}
        </p>
        <details className="mt-2 text-xs">
          <summary className="cursor-pointer text-kinetic-cyan hover:underline">Voir les détails</summary>
          <pre className="mt-2 p-3 bg-black/30 rounded text-slate-light whitespace-pre-wrap text-xs">
            {JSON.stringify(quote.project_details, null, 2)}
          </pre>
        </details>
      </div>

      <div className="flex items-center gap-2 self-end sm:self-center">
        <form action={handleOnboardSubmit} className="flex items-center gap-2">
            <Input
                type="number"
                name="price"
                placeholder="Prix (€)"
                className="w-32 h-9"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                step="0.01"
                required
            />
            <SubmitButton size="sm" loadingText="Lancement...">
                Lancer l'Onboarding
            </SubmitButton>
        </form>
        <Button
          onClick={handleReject}
          disabled={isRejecting}
          size="sm"
          variant="destructive"
        >
          {isRejecting ? "Rejet..." : "Rejeter"}
        </Button>
      </div>
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
