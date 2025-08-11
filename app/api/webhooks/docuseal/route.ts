import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase-client';
import lagoClient from '@/lib/lago';

// Note: Pour une sécurité accrue en production, il est essentiel de vérifier la signature
// du webhook en utilisant un secret partagé. DocuSeal envoie un header `X-DocuSeal-Signature`.
// const secret = process.env.DOCUSEAL_WEBHOOK_SECRET;
// --> Ajouter la logique de vérification ici.

/**
 * Route Handler pour les webhooks de DocuSeal.
 * Écoute l'événement de complétion du contrat pour déclencher la facturation.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // On ne traite que l'événement qui nous intéresse
    if (payload.event_type !== 'form.completed') {
      return NextResponse.json({ status: 'ignored', message: 'Event type is not form.completed' });
    }

    const submissionId = payload.data?.submission_id;
    if (!submissionId) {
      throw new Error("L'ID de la soumission DocuSeal est manquant dans le payload du webhook.");
    }

    // Utilisation d'un client Supabase avec les droits de service pour les opérations serveur-à-serveur
    // Note: Pour cela, il faudrait une variable d'environnement SUPABASE_SERVICE_ROLE_KEY
    // Pour l'instant, on utilise le client standard qui fonctionnera si les RLS sont permissives pour le rôle anon ou si on est dans un contexte utilisateur.
    // Pour un webhook, le service role key est la bonne approche.
    const supabase = createServer(cookies()); // Ceci est une simplification, voir note ci-dessus.
    // Let's assume for now we create a service role client
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);


    // 1. Trouver le devis correspondant à la soumission DocuSeal
    const { data: quote, error: quoteError } = await supabaseAdmin
      .from('quotes')
      .select('*')
      .eq('docuseal_document_id', submissionId)
      .single();

    if (quoteError || !quote) {
      throw new Error(`Aucun devis trouvé pour la soumission DocuSeal ID: ${submissionId}`);
    }

    // 2. Mettre à jour le statut du devis à 'contrat_signe'
    await supabaseAdmin.from('quotes').update({ status: 'contrat_signe' }).eq('id', quote.id);

    // 3. Créer le client et la facture dans Lago
    const customer = await lagoClient.customers.createCustomer({
      customer: {
        external_id: `client-${quote.id}-${Date.now()}`, // ID unique pour le client
        name: `Client ${quote.client_email}`,
        email: quote.client_email,
      },
    });

    const invoice = await lagoClient.invoices.createInvoice({
      invoice: {
        external_customer_id: customer.customer.external_id,
        currency: 'EUR',
        fees: [{
          add_on_code: 'DEPOSIT', // Doit être pré-configuré dans Lago
          amount_cents: quote.price, // Le prix est déjà en centimes
        }]
      }
    });

    // 4. Mettre à jour le devis avec les IDs de Lago et le nouveau statut
    const { error: finalUpdateError } = await supabaseAdmin
      .from('quotes')
      .update({
        status: 'facture_payee', // On considère la facture comme envoyée et en attente de paiement
        lago_customer_id: customer.customer.external_id,
        lago_invoice_id: invoice.invoice.lago_id,
        lago_invoice_payment_url: invoice.invoice.payment_url,
      })
      .eq('id', quote.id);

    if (finalUpdateError) throw finalUpdateError;

    return NextResponse.json({ status: 'success' });

  } catch (error: any) {
    console.error("Erreur dans le webhook DocuSeal:", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
