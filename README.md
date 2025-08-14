# AUTOMATIC

<p align="center">
  <img src="https://example.com/logo.svg" alt="Logo AUTOMATIC" width="150"/>
</p>

<h2 align="center">Le Développement sur-mesure, Réinventé.</h2>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen" alt="Build Status"/>
  <img src="https://img.shields.io/badge/version-v0.1.0--alpha-blue" alt="Version"/>
  <img src="https://img.shields.io/badge/licence-MIT-lightgrey" alt="Licence"/>
</p>

---

## Description du Projet

AUTOMATIC est une plateforme web qui a pour ambition de transformer le service de développement de logiciels sur-mesure en une expérience entièrement numérique et automatisée. Notre vision est de rendre le développement personnalisé plus accessible, transparent et efficace pour les entreprises de toutes tailles.

### Objectifs Clés
- **Automatisation des Devis** : Fournir des estimations instantanées et précises basées sur les besoins du client.
- **Centralisation de la Communication** : Offrir un espace unique pour tous les échanges entre le client et l'équipe de développement.
- **Transparence Totale** : Permettre un suivi en temps réel de l'avancement du projet, des tâches en cours et des jalons à venir.
- **Productivité Optimisée** : Intégrer des outils qui automatisent les tâches répétitives pour permettre aux développeurs de se concentrer sur l'essentiel : le code.

## Stack Technique 100% Open Source

Nous croyons en la puissance de l'open source. AUTOMATIC est construit sur une stack entièrement auto-hébergeable, garantissant une maîtrise totale des données et une flexibilité maximale.

- **Framework Frontend** : [Next.js](https://nextjs.org/) 14+ (avec App Router)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Backend & Base de Données** : [Supabase](https://supabase.io/) (auto-hébergé)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Gestion des Paiements** : [Lago](https://www.getlago.com/) (auto-hébergé)
- **Signatures Électroniques** : [DocuSeal](https://www.docuseal.co/) (auto-hébergé)
- **Infrastructure de Notifications** : [Novu](https://novu.co/) (auto-hébergé)
- **Déploiement** : [Docker](https://www.docker.com/) avec un PaaS open-source (ex: [Coolify](https://coolify.io/))

## Guide d'Installation

### Prérequis
- [Node.js](https://nodejs.org/) (v18 ou supérieure)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Docker Compose](https://docs.docker.com/compose/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### Installation Locale
1.  **Clonez le dépôt** :
    ```bash
    git clone https://github.com/votre-utilisateur/automatic.git
    cd automatic
    ```
2.  **Installez les dépendances** :
    ```bash
    npm install
    ```
3.  **Configurez les variables d'environnement** :
    Créez un fichier `.env.local` à partir de l'exemple `.env.example` et remplissez toutes les clés nécessaires pour les services locaux.
    ```bash
    cp .env.example .env.local
    ```
4.  **Lancez l'environnement backend** :
    Le projet utilise une approche modulaire pour les services Docker. Chaque service (Supabase, Lago, etc.) a sa propre configuration dans un sous-dossier de `/docker`. Pour simplifier le lancement, des scripts de contrôle sont fournis.

    Rendez les scripts exécutables (à faire une seule fois) :
    ```bash
    chmod +x docker/start-all.sh
    chmod +x docker/stop-all.sh
    ```

    Puis, lancez tous les services en arrière-plan :
    ```bash
    ./docker/start-all.sh
    ```
    Cette commande va parcourir chaque service et lancer son `docker-compose up -d`. Pour tout arrêter, utilisez `./docker/stop-all.sh`.

5.  **Démarrez le serveur de développement Next.js** :
    Une fois les services backend en cours d'exécution, lancez l'application web :
    ```bash
    npm run dev
    ```
    L'application sera accessible sur `http://localhost:3000`.

## Structure des Dossiers

Le projet suit une structure de dossiers standard pour une application Next.js :
- `/app` : Contient les routes, pages et layouts de l'application (App Router).
- `/components` : Contient les composants React réutilisables.
- `/lib` : Contient les fonctions utilitaires, les clients API, etc.
- `/styles` : Contient les fichiers de styles globaux.
- `/docker` : Contient les configurations `docker-compose.yml` pour les services tiers.

## Workflow de Contribution

Nous accueillons avec plaisir les contributions de la communauté !

1.  **Créez une branche** :
    Le nom de la branche doit suivre le format `feature/nom-de-la-feature` ou `fix/nom-du-bug`.
    ```bash
    git checkout -b feature/ma-nouvelle-feature
    ```
2.  **Codez** : Apportez vos modifications en respectant les conventions de style du projet.
3.  **Formatez votre code** : Assurez-vous que le code est bien formaté avant de commit.
    ```bash
    npm run lint
    ```
4.  **Soumettez une Pull Request** : Poussez votre branche et ouvrez une Pull Request vers la branche `main`.

## Licence

Ce projet est distribué sous la **Licence MIT**. Consultez le fichier `LICENSE` pour plus de détails.
