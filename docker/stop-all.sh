#!/bin/bash
# Script pour arrêter tous les services de l'environnement de développement AUTOMATIC.
# Ce script doit être exécuté depuis la racine du projet ou depuis le dossier /docker.

# Se déplace au répertoire du script pour que les chemins relatifs fonctionnent correctement.
cd "$(dirname "$0")" || exit

echo "=================================================="
echo "      ARRÊT DE L'ENVIRONNEMENT DE DÉVELOPPEMENT     "
echo "=================================================="

# Liste des services à arrêter. L'ordre est moins critique ici.
SERVICES=("supabase" "lago" "novu" "docuseal")

for SERVICE in "${SERVICES[@]}"; do
    if [ -d "$SERVICE" ] && [ -f "$SERVICE/docker-compose.yml" ]; then
        echo ""
        echo "--------------------------------------------------"
        echo "--> Arrêt de : ${SERVICE}"
        echo "--------------------------------------------------"
        # Se déplace dans le dossier du service et arrête docker-compose
        # L'option -v supprime les volumes anonymes, mais nous utilisons des volumes nommés
        # qui ne sont pas supprimés par défaut.
        (cd "$SERVICE" && docker-compose down)
        echo "--> ${SERVICE} arrêté."
    else
        echo "Attention : Le service ${SERVICE} ou son fichier docker-compose.yml est introuvable."
    fi
done

echo ""
echo "--------------------------------------------------"
echo "✅ Tous les services ont été arrêtés."
echo "=================================================="
