// /lib/docuseal.ts
// Ce fichier contient un client API simple pour interagir avec l'instance auto-hébergée de DocuSeal.

// Définition des types pour une meilleure sécurité et auto-complétion
interface Submitter {
  email: string;
  // On pourrait ajouter d'autres champs comme 'name' si le template le requiert.
}

interface CreateSubmissionPayload {
  template_id: number;
  submitters: Submitter[];
  send_email?: boolean; // Permet d'envoyer l'email de demande de signature
}

interface DocuSealSubmissionResponse {
  id: number;
  // Ajoutez d'autres champs de la réponse API si nécessaire
}

/**
 * Crée une "submission" (demande de signature) à partir d'un modèle
 * et l'envoie à l'email du client.
 *
 * @param {string} clientEmail - L'email du client qui doit signer.
 * @param {number} templateId - L'ID du modèle de contrat sur DocuSeal.
 * @returns {Promise<DocuSealSubmissionResponse>} La réponse de l'API DocuSeal contenant les détails de la soumission.
 */
export async function sendContractForSignature(
  clientEmail: string,
  templateId: number
): Promise<DocuSealSubmissionResponse> {
  const DOCUSEAL_API_URL = process.env.DOCUSEAL_URL;
  const DOCUSEAL_API_KEY = process.env.DOCUSEAL_API_KEY;

  if (!DOCUSEAL_API_URL || !DOCUSEAL_API_KEY) {
    throw new Error("Les variables d'environnement pour DocuSeal (URL et API_KEY) ne sont pas configurées.");
  }

  const payload: CreateSubmissionPayload = {
    template_id: templateId,
    submitters: [{ email: clientEmail }],
    send_email: true, // S'assurer que l'email est bien envoyé
  };

  const response = await fetch(`${DOCUSEAL_API_URL}/api/submissions`, {
    method: 'POST',
    headers: {
      'X-Auth-Token': DOCUSEAL_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Erreur de l'API DocuSeal:", errorBody);
    throw new Error(`Erreur de l'API DocuSeal: ${response.status} - ${errorBody}`);
  }

  // La réponse de l'API pour une création de submission retourne un tableau de "submitters"
  // On s'attend à n'en avoir qu'un seul ici.
  const responseData = await response.json();

  // On retourne le premier "submitter" qui contient l'ID de la soumission globale.
  if (Array.isArray(responseData) && responseData.length > 0) {
    return responseData[0];
  }

  throw new Error("La réponse de l'API DocuSeal était inattendue.");
}
