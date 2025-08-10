#!/bin/bash
# Script pour démarrer tous les services de l'environnement de développement AUTOMATIC.
# Ce script doit être exécuté depuis la racine du projet ou depuis le dossier /docker.

# Se déplace au répertoire du script pour que les chemins relatifs fonctionnent correctement.
cd "$(dirname "$0")" || exit

echo "=================================================="
echo "  DÉMARRAGE DE L'ENVIRONNEMENT DE DÉVELOPPEMENT   "
echo "=================================================="

# Liste des services à démarrer, dans l'ordre de priorité si nécessaire.
# Pour l'instant, l'ordre n'est pas critique car ils sont isolés.
SERVICES=("docuseal" "novu" "lago" "supabase")

for SERVICE in "${SERVICES[@]}"; do
    if [ -d "$SERVICE" ] && [ -f "$SERVICE/docker-compose.yml" ]; then
        echo ""
        echo "--------------------------------------------------"
        echo "--> Démarrage de : ${SERVICE}"
        echo "--------------------------------------------------"
        # Se déplace dans le dossier du service et lance docker-compose
        (cd "$SERVICE" && docker-compose up -d)
        echo "--> ${SERVICE} démarré."
    else
        echo "Attention : Le service ${SERVICE} ou son fichier docker-compose.yml est introuvable."
    fi
done

echo ""
echo "--------------------------------------------------"
echo "✅ Tous les services ont été démarrés."
echo "Utilisez 'docker ps -a' pour voir l'état des conteneurs."
echo "=================================================="
