'use server';

import { cookies } from 'next/headers';
import { createServer } from '@/lib/supabase-client';
import { novu } from '@/lib/novu';
import { revalidatePath } from 'next/cache';

/**
 * Action serveur pour envoyer un message dans un projet et notifier l'autre partie.
 */
export async function sendMessageAction(formData: FormData) {
  const content = formData.get('content') as string;
  const projectId = Number(formData.get('projectId'));

  if (!content?.trim() || !projectId) {
    return { success: false, error: "Le contenu du message ou l'ID du projet est manquant." };
  }

  const cookieStore = cookies();
  const supabase = createServer(cookieStore);

  try {
    // 1. Récupérer l'utilisateur actuel et son profil
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Utilisateur non authentifié.");

    const { data: senderProfile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single();
    if (!senderProfile) throw new Error("Profil de l'expéditeur introuvable.");

    // 2. Insérer le message dans la base de données
    const { error: insertError } = await supabase
      .from('messages')
      .insert({ content: content.trim(), project_id: projectId, sender_id: user.id });

    if (insertError) throw insertError;

    // 3. Récupérer les détails du projet et du client pour la notification
    const { data: projectData } = await supabase
      .from('projects')
      .select('name, client:profiles(id, email, full_name)')
      .eq('id', projectId)
      .single();

    if (!projectData || !projectData.client) throw new Error("Détails du projet ou du client introuvables.");

    // 4. Déterminer le destinataire et déclencher la notification
    // @ts-ignore
    const client = projectData.client;
    const isAdminSender = senderProfile.role === 'admin';
    const recipient = isAdminSender ? client : { id: 'admin-user-id', email: 'admin@example.com', full_name: 'Admin AUTOMATIC' }; // Placeholder pour l'admin

    // Note: A real implementation would fetch admin details from a config or DB
    if (recipient.id !== user.id) { // Ne pas s'envoyer de notification à soi-même
      await novu.trigger('new-message', {
        to: {
          subscriberId: recipient.id,
          email: recipient.email,
        },
        payload: {
          projectName: projectData.name,
          senderName: senderProfile.full_name || 'Un utilisateur',
          messageContent: content.trim().substring(0, 50) + '...',
          projectUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/projects/${projectId}`,
        },
      });
    }

    // 5. Revalider le chemin (bien que Realtime gère l'UI, c'est une bonne pratique)
    revalidatePath(`/projects/${projectId}`);
    return { success: true };

  } catch (error: any) {
    console.error("Erreur lors de l'envoi du message:", error);
    return { success: false, error: error.message };
  }
}
