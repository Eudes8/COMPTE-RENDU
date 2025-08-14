'use server';

import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { revalidatePath } from 'next/cache';
import { novu } from '@/lib/novu';
import { sendContractForSignature } from '@/lib/docuseal';

/**
 * Action serveur pour convertir un devis en projet.
 * Gère la création en base de données et l'envoi d'une notification email.
 * Cette action est maintenant appelée par le webhook Lago, pas directement par l'UI.
 */
export async function createProjectAction(formData: FormData) {
  const quoteId = formData.get('quoteId');

  if (!quoteId) {
    return { success: false, error: 'ID du devis manquant.' };
  }

  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  try {
    const { data: newProjectId, error: rpcError } = await supabase.rpc('create_project_from_quote', {
      quote_id_to_process: Number(quoteId),
    });

    if (rpcError) throw rpcError;

    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .select('name, client:profiles(id, email, full_name)')
      .eq('id', newProjectId)
      .single();

    if (projectError || !projectData || !projectData.client) {
      throw new Error("Impossible de récupérer les détails du projet ou du client après sa création.");
    }
    // @ts-ignore
    const client = projectData.client;

    await novu.trigger('new-project-welcome', {
      to: {
        subscriberId: client.id,
        email: client.email,
        firstName: client.full_name || 'Client',
      },
      payload: {
        projectName: projectData.name,
        projectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/projects/${newProjectId}`,
      },
    });

    revalidatePath('/admin');
    revalidatePath('/dashboard');

    return { success: true, newProjectId };

  } catch (error: any) {
    console.error('Erreur lors de la création du projet:', error);
    if (error.message.includes("Le client doit d'abord s'inscrire")) {
      return { success: false, error: `Action impossible : le client associé à ce devis n'a pas encore de compte utilisateur.` };
    }
    return { success: false, error: `Une erreur est survenue: ${error.message}` };
  }
}


/**
 * Action serveur pour initier le processus d'onboarding : enregistrement du prix et envoi du contrat.
 */
export async function initiateOnboardingAction(formData: FormData) {
  const quoteId = formData.get('quoteId');
  const price = formData.get('price');
  const templateId = process.env.DOCUSEAL_TEMPLATE_ID;

  if (!quoteId) return { success: false, error: 'ID du devis manquant.' };
  if (!price || Number(price) <= 0) return { success: false, error: 'Le prix fourni est invalide.' };
  if (!templateId) return { success: false, error: "L'ID du modèle de contrat DocuSeal (DOCUSEAL_TEMPLATE_ID) n'est pas configuré." };

  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  try {
    // 1. Mettre à jour le prix du devis (en centimes)
    const { data: quote, error: priceUpdateError } = await supabase
      .from('quotes')
      .update({ price: Number(price) * 100 })
      .eq('id', Number(quoteId))
      .select('client_email')
      .single();

    if (priceUpdateError) throw priceUpdateError;
    if (!quote) throw new Error('Devis non trouvé après la mise à jour du prix.');

    // 2. Appeler l'API DocuSeal pour envoyer le contrat
    const docusealResponse = await sendContractForSignature(quote.client_email, Number(templateId));

    // 3. Mettre à jour notre base de données avec l'ID de la soumission et le nouveau statut
    const { error: statusUpdateError } = await supabase
      .from('quotes')
      .update({
        status: 'contrat_envoye',
        docuseal_document_id: docusealResponse.id.toString(),
      })
      .eq('id', Number(quoteId));

    if (statusUpdateError) throw statusUpdateError;

    revalidatePath('/admin');
    return { success: true, message: 'Le contrat a été envoyé au client avec succès.' };

  } catch (error: any) {
    console.error("Erreur lors de l'initiation de l'onboarding:", error);
    return { success: false, error: error.message };
  }
}
