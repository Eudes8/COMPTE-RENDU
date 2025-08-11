import { Novu } from '@novu/node';

// Vérification de la présence de la clé d'API Novu dans les variables d'environnement.
// C'est une bonne pratique pour s'assurer que le service peut démarrer correctement.
if (!process.env.NOVU_API_KEY) {
  console.error("NOVU_API_KEY is not defined in environment variables. Novu notifications will fail.");
}

/**
 * Instance unique (singleton) du client Novu.
 *
 * L'initialisation est faite ici pour être réutilisée dans toute la partie
 * serveur de l'application (Server Actions, Route Handlers, etc.).
 * Le '!' après NOVU_API_KEY indique à TypeScript que nous sommes certains
 * que la variable existe à ce point (même si elle est vide, ce qui lèvera une erreur à l'exécution).
 */
export const novu = new Novu(process.env.NOVU_API_KEY!);
