-- =================================================================
-- MISE À JOUR DES POLITIQUES DE SÉCURITÉ (RLS) POUR LE RÔLE ADMIN
-- Cette migration renforce la sécurité et donne les permissions nécessaires
-- aux administrateurs pour gérer les données de l'application.
-- =================================================================

-- 1. Politique pour la table 'profiles'
--    Permet à tous les utilisateurs authentifiés de lire les informations
--    de profil, ce qui est nécessaire pour que le middleware puisse
--    vérifier le rôle d'un utilisateur.
-- =================================================================

-- On s'assure de supprimer les anciennes politiques avant de créer les nouvelles.
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;

create policy "Authenticated users can view profiles." on public.profiles
  for select to authenticated using (true);


-- 2. Politiques pour la table 'quotes'
--    Donne un accès complet aux administrateurs sur les devis.
--    Les utilisateurs normaux (clients) peuvent uniquement insérer des devis.
-- =================================================================

drop policy if exists "Les administrateurs peuvent tout voir." on public.quotes;
drop policy if exists "Les utilisateurs peuvent créer des devis." on public.quotes;

-- Les admins peuvent effectuer toutes les opérations (SELECT, INSERT, UPDATE, DELETE)
create policy "Admins can perform all actions on quotes." on public.quotes
  for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Les utilisateurs authentifiés peuvent créer des devis.
create policy "Authenticated users can create quotes." on public.quotes
  for insert to authenticated with check (true);


-- 3. Politiques pour la table 'projects'
--    Donne un accès complet aux administrateurs sur les projets.
--    Les clients peuvent uniquement voir les projets qui leur sont assignés.
-- =================================================================

drop policy if exists "Les administrateurs peuvent tout voir." on public.projects;
drop policy if exists "Les clients peuvent voir leurs propres projets." on public.projects;

-- Les admins peuvent effectuer toutes les opérations.
create policy "Admins can perform all actions on projects." on public.projects
  for all
  using ((select role from public.profiles where id = auth.uid()) = 'admin')
  with check ((select role from public.profiles where id = auth.uid()) = 'admin');

-- Les clients peuvent uniquement voir leurs projets.
create policy "Clients can view their own projects." on public.projects
  for select to authenticated
  using (client_id = auth.uid());
