'use server';

import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { revalidatePath } from 'next/cache';
import { novu } from '@/lib/novu';

/**
 * Action serveur pour convertir un devis en projet.
 * Gère la création en base de données et l'envoi d'une notification email.
 */
export async function createProjectAction(formData: FormData) {
  const quoteId = formData.get('quoteId');

  if (!quoteId) {
    return { success: false, error: 'ID du devis manquant.' };
  }

  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  try {
    // Étape 1: Appeler la fonction PostgreSQL pour une transaction atomique
    const { data: newProjectId, error: rpcError } = await supabase.rpc('create_project_from_quote', {
      quote_id_to_process: Number(quoteId),
    });

    if (rpcError) throw rpcError;

    // Étape 2: Récupérer les détails du projet et du client pour la notification
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

    // Étape 3: Déclencher la notification de bienvenue via Novu
    await novu.trigger('new-project-welcome', { // 'new-project-welcome' est l'ID de votre template de notification sur Novu
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

    // Étape 4: Invalider le cache et retourner le succès
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
