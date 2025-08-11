import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createProjectAction } from '@/app/admin/actions';

// Note: Pour une sécurité accrue en production, il est essentiel de vérifier
// la signature du webhook de Lago.

/**
 * Route Handler pour les webhooks de Lago.
 * Écoute l'événement de paiement de la facture pour finaliser la création du projet.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // L'événement de Lago pour un paiement réussi est `invoice.payment_succeeded`
    if (payload.webhook_type !== 'invoice.payment_succeeded') {
      return NextResponse.json({ status: 'ignored', message: 'Event type is not invoice.payment_succeeded' });
    }

    const lagoInvoiceId = payload.data?.lago_id;
    if (!lagoInvoiceId) {
      throw new Error("L'ID de la facture Lago est manquant dans le payload du webhook.");
    }

    // Création d'un client Supabase avec les droits de service (admin) pour les opérations serveur-à-serveur
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Trouver le devis correspondant à la facture Lago
    const { data: quote, error: quoteError } = await supabaseAdmin
      .from('quotes')
      .select('id, status')
      .eq('lago_invoice_id', lagoInvoiceId)
      .single();

    if (quoteError || !quote) {
      throw new Error(`Aucun devis trouvé pour la facture Lago ID: ${lagoInvoiceId}`);
    }

    // Éviter de recréer un projet si le webhook est reçu plusieurs fois
    if (quote.status === 'termine' || quote.status === 'projet_cree') {
        return NextResponse.json({ status: 'already_processed', message: 'This quote has already been converted to a project.' });
    }

    // 2. Appeler l'action serveur existante pour créer le projet et notifier le client.
    const formData = new FormData();
    formData.append('quoteId', quote.id.toString());

    const result = await createProjectAction(formData);

    if (!result.success) {
        throw new Error(result.error || "L'action de création de projet a échoué.");
    }

    // 3. Mettre à jour le statut final du devis à 'terminé'.
    await supabaseAdmin
        .from('quotes')
        .update({ status: 'termine' })
        .eq('id', quote.id);

    return NextResponse.json({ status: 'success', projectId: result.newProjectId });

  } catch (error: any) {
    console.error("Erreur dans le webhook Lago:", error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
}
