# Guide de Déploiement pour AUTOMATIC

Ce document fournit les instructions pour déployer l'application frontend (Next.js) et les services backend auto-hébergés (Docker) du projet AUTOMATIC en production.

Il est divisé en deux parties principales :
1.  **Déploiement du Frontend** : Instructions pour déployer l'application Next.js sur Vercel.
2.  **Déploiement du Backend** : Instructions pour déployer la stack de services Docker sur un serveur dédié (VPS).

Il est crucial de suivre attentivement les étapes de sécurité pour garantir la stabilité et la confidentialité de votre instance.

---

## Partie 1 : Déploiement du Frontend (Vercel)

Vercel est la plateforme recommandée pour déployer des applications Next.js en raison de son intégration transparente et de ses performances optimisées.

### Étape 1: Création du projet sur Vercel

1.  **Créez un compte** sur [Vercel](https://vercel.com) si vous n'en avez pas déjà un.
2.  **Connectez votre compte GitHub** à Vercel.
3.  Depuis votre tableau de bord Vercel, cliquez sur "**Add New...**" -> "**Project**".
4.  **Importez votre dépôt GitHub** `automatic`. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js et préconfigurera les bons paramètres de build.
5.  Cliquez sur "**Deploy**". Vercel va maintenant construire et déployer votre application.

### Étape 2: Configuration des Variables d'Environnement

Votre application a besoin de connaître les URLs de votre backend pour fonctionner. Ces variables doivent être configurées dans les paramètres de votre projet Vercel.

1.  Dans votre projet Vercel, allez dans l'onglet "**Settings**" -> "**Environment Variables**".
2.  Ajoutez les variables suivantes, en utilisant les URLs de production de votre backend (configuré dans la Partie 2) :
    *   `NEXT_PUBLIC_SUPABASE_URL`: `https://supabase.votre-domaine.com`
    *   `NEXT_PUBLIC_SUPABASE_ANON_KEY`: La clé `anon` de votre instance Supabase de production.
    *   `LAGO_API_URL`: `https://lago.votre-domaine.com`
    *   `LAGO_API_KEY`: La clé API secrète de votre instance Lago.
    *   `DOCUSEAL_URL`: `https://docuseal.votre-domaine.com`
    *   `NOVU_API_KEY`: La clé API secrète de votre instance Novu.
    *   `NOVU_APPLICATION_IDENTIFIER`: L'ID de votre application Novu.

3.  Vercel redéploiera automatiquement votre application avec les nouvelles variables d'environnement.

### Étape 3: Configuration du Domaine Personnalisé

1.  Dans votre projet Vercel, allez dans l'onglet "**Settings**" -> "**Domains**".
2.  Entrez le nom de domaine que vous souhaitez utiliser (ex: `app.automatic.com`).
3.  Suivez les instructions de Vercel pour mettre à jour les enregistrements DNS chez votre registraire de domaine (généralement un enregistrement `CNAME` ou `A`).
4.  Une fois les DNS propagés, Vercel provisionnera automatiquement un certificat SSL/TLS pour votre domaine, le rendant accessible via HTTPS.

---

## Partie 2 : Déploiement du Backend (Serveur Dédié)

Cette section explique comment déployer la stack de services auto-hébergés sur un serveur dédié (VPS, machine bare-metal, etc.).

### Étape 1: Prérequis du Serveur

-   **Un serveur Linux** (ex: Ubuntu 22.04 LTS) avec un accès `sudo`.
-   **Docker et Docker Compose** installés. Suivez les [instructions officielles de Docker](https://docs.docker.com/engine/install/ubuntu/) pour les installer.
-   **Git** installé (`sudo apt update && sudo apt install git`).
-   **Un nom de domaine** que vous contrôlez, avec la possibilité de configurer des sous-domaines.

### Étape 2: Installation et Lancement

1.  **Connectez-vous à votre serveur** en SSH.
2.  **Clonez le dépôt** du projet :
    ```bash
    git clone https://github.com/votre-utilisateur/automatic.git
    cd automatic
    ```
3.  **Rendez les scripts exécutables** :
    ```bash
    chmod +x docker/start-all.sh
    chmod +x docker/stop-all.sh
    ```
4.  **Configuration des secrets (TRÈS IMPORTANT)**:
    Avant de lancer les services, vous devez configurer les secrets pour chaque service. Les fichiers `docker-compose.yml` de ce projet utilisent des mots de passe par défaut pour simplifier le développement local. **Vous devez impérativement les modifier avant toute mise en production.** Parcourez chaque fichier `docker-compose.yml` dans les sous-dossiers de `/docker` et remplacez tous les mots de passe et secrets par des valeurs longues, aléatoires et sécurisées.
5.  **Lancez tous les services** :
    ```bash
    ./docker/start-all.sh
    ```
    Les services vont maintenant démarrer en arrière-plan. Vous pouvez vérifier leur état avec `docker ps -a`.

### Étape 3: Sécurité et Configuration du Reverse Proxy

Il est **fortement déconseillé** d'exposer les ports des services Docker directement sur Internet. Un reverse proxy est nécessaire pour sécuriser les connexions avec HTTPS/TLS et gérer les noms de domaine.

**Exemple avec NGINX:**

1.  **Installez NGINX** sur votre serveur : `sudo apt install nginx`.
2.  **Configurez les DNS** : Faites pointer les sous-domaines vers l'adresse IP de votre serveur. Par exemple :
    *   `supabase.votre-domaine.com` -> `IP_DU_SERVEUR`
    *   `lago.votre-domaine.com` -> `IP_DU_SERVEUR`
    *   `docuseal.votre-domaine.com` -> `IP_DU_SERVEUR`
    *   etc.
3.  **Créez un fichier de configuration NGINX** pour un service, par exemple Supabase, dans `/etc/nginx/sites-available/supabase.votre-domaine.com`:
    ```nginx
    server {
        listen 80;
        server_name supabase.votre-domaine.com;

        location / {
            proxy_pass http://localhost:8000; # Port exposé par le Docker Compose de Supabase
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
        }
    }
    ```
4.  **Activez le site** : `sudo ln -s /etc/nginx/sites-available/supabase.votre-domaine.com /etc/nginx/sites-enabled/`.
5.  **Répétez** les étapes 3 et 4 pour chaque service, en adaptant le `server_name` et le port `proxy_pass` (ex: `localhost:3001` pour Lago, etc.).
6.  **Obtenez des certificats SSL/TLS** avec Certbot (Let's Encrypt) pour activer le HTTPS. C'est un outil gratuit et simple.
    ```bash
    sudo apt install certbot python3-certbot-nginx
    sudo certbot --nginx
    ```
    Suivez les instructions de Certbot. Il modifiera automatiquement vos configurations NGINX pour utiliser HTTPS.

Une fois ces étapes terminées, votre backend auto-hébergé sera accessible de manière sécurisée via vos sous-domaines, et vous pourrez utiliser ces URLs dans la configuration de votre projet Vercel (Partie 1).
