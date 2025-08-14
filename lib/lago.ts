import { Client } from 'lago-javascript-client';

const LAGO_API_KEY = process.env.LAGO_API_KEY;
const LAGO_API_URL = process.env.LAGO_API_URL;

// Vérification de la présence des variables d'environnement.
if (!LAGO_API_KEY || !LAGO_API_URL) {
  console.error("LAGO_API_KEY or LAGO_API_URL is not defined in environment variables. Lago API calls will fail.");
}

/**
 * Instance unique (singleton) du client Lago.
 *
 * L'initialisation est faite ici pour être réutilisée dans toute la partie
 * serveur de l'application pour interagir avec l'API de Lago.
 */
const lagoClient = Client(LAGO_API_KEY!, {
  baseUrl: LAGO_API_URL!,
});

export default lagoClient;
