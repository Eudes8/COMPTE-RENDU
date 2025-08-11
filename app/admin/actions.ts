'use server';

import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { revalidatePath } from 'next/cache';

/**
 * Action serveur pour convertir un devis en projet.
 * Cette fonction est appelée depuis le formulaire du tableau de bord administrateur.
 * @param {FormData} formData - Les données du formulaire, contenant l'ID du devis.
 * @returns Un objet indiquant le succès ou l'échec de l'opération.
 */
export async function createProjectAction(formData: FormData) {
  const quoteId = formData.get('quoteId');

  // Validation simple des données d'entrée
  if (!quoteId) {
    return { success: false, error: 'ID du devis manquant.' };
  }

  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  // Appel de la fonction PostgreSQL pour une transaction atomique
  const { data, error } = await supabase.rpc('create_project_from_quote', {
    quote_id_to_process: Number(quoteId),
  });

  if (error) {
    console.error('Erreur RPC lors de la création du projet:', error);

    // Rendre le message d'erreur plus convivial pour l'administrateur
    if (error.message.includes("Le client doit d'abord s'inscrire")) {
      return {
        success: false,
        error: `Action impossible : le client associé à ce devis n'a pas encore de compte utilisateur.`
      };
    }
    return { success: false, error: `Une erreur de base de données est survenue: ${error.message}` };
  }

  // En cas de succès, invalider le cache de la page admin pour forcer une mise à jour de l'UI
  revalidatePath('/admin');
  revalidatePath('/dashboard'); // Invalider aussi le dashboard client au cas où il est ouvert

  console.log(`Projet ${data} créé avec succès à partir du devis ${quoteId}.`);
  return { success: true, newProjectId: data };
}
