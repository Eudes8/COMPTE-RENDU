# Guide de l'Administrateur - Plateforme AUTOMATIC

Ce guide vous explique comment utiliser le tableau de bord administrateur pour gérer les devis, lancer l'onboarding des clients et interagir avec eux dans l'espace de travail du projet.

## 1. Connexion et Accès au Tableau de Bord

Pour accéder à l'interface d'administration, vous devez d'abord vous connecter à la plateforme en utilisant vos identifiants d'administrateur.

-   **URL de connexion :** `/login`
-   Une fois connecté, vous serez redirigé vers votre tableau de bord principal. Si vous avez le rôle `admin`, vous verrez un lien ou une section vous permettant d'accéder au **Tableau de Bord Administrateur**.

## 2. Examen des Nouveaux Devis

Le tableau de bord administrateur affiche par défaut la liste des **Nouveaux Devis en Attente**.

Chaque élément de la liste représente un devis soumis par un client et contient les informations suivantes :
-   **Email du client :** L'adresse email fournie par le client.
-   **Date de réception :** La date à laquelle le devis a été soumis.
-   **Statut :** Le statut actuel du devis (par exemple, `nouveau`, `contrat_envoye`).
-   **Détails du projet :** Cliquez sur "Voir les détails" pour afficher un aperçu complet des spécifications du projet fournies par le client (format JSON).

## 3. Lancement du Processus d'Onboarding

Pour les devis ayant le statut `nouveau`, vous pouvez initier le processus d'onboarding. Cette action officialise votre proposition commerciale et la transforme en un début de projet.

**Étapes à suivre :**
1.  **Fixer le prix :** Dans le champ de saisie à côté du devis, entrez le montant final de la prestation (en euros).
2.  **Lancer l'onboarding :** Cliquez sur le bouton **"Lancer l'Onboarding"**.

**Que se passe-t-il après avoir cliqué ?**
-   Le système enregistre le prix que vous avez fixé.
-   Un **contrat de service** est automatiquement généré et envoyé par email au client pour signature électronique via notre partenaire DocuSeal.
-   Le statut du devis passe à `contrat_envoye`. Le devis disparaîtra de la liste des "Nouveaux Devis" et suivra son cours dans le pipeline de vente.

## 4. Suivi et Interaction dans l'Espace de Travail

Une fois que le client a signé le contrat et réglé la facture d'acompte, un **projet** est automatiquement créé. Vous pouvez suivre et interagir avec ce projet depuis votre propre tableau de bord ou en accédant directement à l'espace de travail du projet.

L'espace de travail est l'interface centralisée pour la collaboration avec le client.

### Messagerie du Projet
-   La section principale de l'espace de travail est une **messagerie instantanée**.
-   Utilisez-la pour toute la communication avec le client : poser des questions, donner des mises à jour, etc.
-   Les messages sont persistants et visibles par vous et le client assigné au projet.

### Gestion des Fichiers
-   La barre latérale de l'espace de travail contient une section **"Fichiers du Projet"**.
-   **Télécharger des fichiers :** Vous pouvez y déposer des documents importants (maquettes, spécifications techniques, livrables, etc.).
-   **Accès aux fichiers :** Le client peut également télécharger des fichiers de son côté et voir ceux que vous avez partagés.

Ce guide couvre les fonctionnalités principales de l'interface d'administration. Pour toute question, n'hésitez pas à contacter le support technique.
