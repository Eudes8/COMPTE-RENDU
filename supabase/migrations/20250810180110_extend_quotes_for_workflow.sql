-- =================================================================
-- MIGRATION: EXTENSION DU SCHÉMA POUR LE WORKFLOW DE BUSINESS
-- =================================================================
-- Ajoute de nouvelles colonnes et statuts à la table `quotes` pour
-- gérer le processus d'onboarding (signature, paiement).

-- 1. Ajout de nouveaux statuts à l'énumération `quote_status`
--    NOTE: L'ajout de valeurs à un type ENUM doit se faire en dehors
--    d'une transaction dans certaines versions de PostgreSQL, mais Supabase
--    gère bien cela dans ses migrations.
-- =================================================================

ALTER TYPE public.quote_status ADD VALUE 'contrat_envoye';
ALTER TYPE public.quote_status ADD VALUE 'contrat_signe';
ALTER TYPE public.quote_status ADD VALUE 'facture_payee';

-- Renommer 'accepté' est complexe. On va simplement le déprécier mentalement
-- et utiliser un nouveau statut pour la fin du cycle de vie du devis.
-- Le statut 'terminé' est plus approprié pour un devis qui a abouti à un projet.
ALTER TYPE public.quote_status ADD VALUE 'termine';


-- 2. Ajout de nouvelles colonnes à la table `quotes`
--    Ces colonnes suivront l'état de l'onboarding.
-- =================================================================

ALTER TABLE public.quotes
  -- Le prix du devis en centimes pour éviter les problèmes de virgule flottante
  ADD COLUMN IF NOT EXISTS price integer,
  -- ID du document de contrat généré par DocuSeal
  ADD COLUMN IF NOT EXISTS docuseal_document_id text,
  -- ID du client correspondant dans le système de paiement Lago
  ADD COLUMN IF NOT EXISTS lago_customer_id text,
  -- ID de la facture d'acompte générée par Lago
  ADD COLUMN IF NOT EXISTS lago_invoice_id text,
  -- URL de la page de paiement hébergée par Lago pour la facture
  ADD COLUMN IF NOT EXISTS lago_invoice_payment_url text;

-- La politique de sécurité RLS `Admins can perform all actions on quotes`
-- existante couvre déjà l'accès à ces nouvelles colonnes pour les administrateurs.
-- Aucune mise à jour de politique n'est nécessaire pour cette table.
