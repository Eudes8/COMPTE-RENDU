-- =================================================================
-- FONCTION DB: CRÉER UN PROJET À PARTIR D'UN DEVIS
-- =================================================================
-- Cette fonction PostgreSQL gère la conversion d'un devis en projet
-- de manière atomique pour garantir la cohérence des données.
-- Elle est conçue pour être appelée par un administrateur via une RPC.

create or replace function public.create_project_from_quote(quote_id_to_process bigint)
returns bigint -- Retourne l'ID du nouveau projet
language plpgsql
-- SECURITY DEFINER permet à la fonction de s'exécuter avec les droits du créateur (super-admin),
-- contournant les politiques RLS pour cette transaction spécifique, ce qui est nécessaire ici.
security definer
as $$
declare
  quote_email text;
  quote_details jsonb;
  client_profile_id uuid;
  new_project_id bigint;
begin
  -- Étape 1: Récupérer les informations du devis
  select client_email, project_details
  into quote_email, quote_details
  from public.quotes
  where id = quote_id_to_process;

  if not found then
    raise exception 'Devis non trouvé avec l''ID: %', quote_id_to_process;
  end if;

  -- Étape 2: Trouver le profil du client basé sur l'email dans la table auth.users
  select u.id
  into client_profile_id
  from auth.users as u
  where u.email = quote_email;

  if client_profile_id is null then
    raise exception 'Aucun utilisateur ou profil trouvé pour l''email: %. Le client doit d''abord s''inscrire.', quote_email;
  end if;

  -- Étape 3: Créer le nouveau projet
  insert into public.projects (client_id, name, status)
  values (client_profile_id, 'Nouveau Projet pour ' || quote_email, 'actif')
  returning id into new_project_id;

  -- Étape 4: Mettre à jour le statut du devis à 'accepté'
  update public.quotes
  set status = 'accepté'
  where id = quote_id_to_process;

  -- Étape 5: Retourner l'ID du nouveau projet pour confirmation
  return new_project_id;
end;
$$;
