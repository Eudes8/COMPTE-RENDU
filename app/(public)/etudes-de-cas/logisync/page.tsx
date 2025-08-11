import { FadeIn } from '@/components/animations/FadeIn';

// Un simple composant pour un KPI (Key Performance Indicator)
const KpiCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-slate-800/50 p-6 rounded-lg text-center">
    <p className="text-4xl font-bold text-kinetic-cyan font-poppins">{value}</p>
    <p className="mt-2 text-sm text-slate-dark">{label}</p>
  </div>
);

export default function LogiSyncCaseStudyPage() {
  return (
    <article className="py-24 sm:py-32">
      <FadeIn>
        <header className="container mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-base font-semibold leading-7 text-kinetic-cyan">Étude de Cas : LogiSync</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Réduction de 25% des coûts opérationnels grâce à un SaaS de logistique
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-dark">
            Création d'une plateforme SaaS sur-mesure pour la gestion de flotte et l'optimisation des itinéraires en temps réel.
          </p>
        </header>
      </FadeIn>

      <div className="container mx-auto max-w-3xl px-6 lg:px-8 mt-16 prose prose-invert prose-lg prose-p:text-slate-dark prose-headings:text-white prose-headings:font-poppins prose-strong:text-slate-light">
        <FadeIn>
          <h2>Le Défi</h2>
          <p><strong>LogiSync</strong>, une entreprise de transport régional, gérait sa flotte de 50 camions avec des tableurs Excel et des appels téléphoniques. Ce manque d'outils centralisés entraînait des itinéraires non optimisés, des retards fréquents et des coûts de carburant élevés. Ils avaient besoin d'une solution centralisée pour suivre leur flotte en temps réel et optimiser les tournées de livraison.</p>
        </FadeIn>

        <FadeIn>
          <h2>Notre Approche</h2>
          <p>La clé était de comprendre les opérations quotidiennes des dispatchers et des chauffeurs. Nous avons organisé des ateliers pour cartographier leurs processus. Le développement s'est fait par sprints de deux semaines, avec une nouvelle fonctionnalité livrée et testée en conditions réelles à la fin de chaque sprint. Cette méthode a permis d'ajuster le logiciel aux besoins réels du terrain, garantissant une adoption rapide par les équipes.</p>
        </FadeIn>

        <FadeIn>
            <h2>La Solution Technique</h2>
            <p>Nous avons développé une application web SaaS accessible aux dispatchers et une application mobile simple pour les chauffeurs :</p>
            <ul>
                <li><strong>Application Web (SaaS):</strong> Une interface riche construite avec Next.js, affichant une carte en temps réel (avec l'API Mapbox) et des tableaux de bord pour la planification des tournées.</li>
                <li><strong>Application Mobile:</strong> Une PWA (Progressive Web App) pour une installation facile sur les terminaux des chauffeurs, leur permettant de recevoir leurs missions et de mettre à jour le statut des livraisons en un clic.</li>
                <li><strong>Backend:</strong> Supabase a géré la géolocalisation en temps réel via sa fonctionnalité Realtime et a servi de base de données pour toutes les données opérationnelles (clients, livraisons, véhicules).</li>
            </ul>
        </FadeIn>

        <FadeIn>
            <h2>Les Résultats</h2>
            <p>L'impact de la solution a été immédiat et significatif, mesuré sur les trois premiers mois d'utilisation :</p>
            <div className="my-12 grid grid-cols-1 sm:grid-cols-3 gap-8 not-prose">
              <KpiCard value="-25%" label="Coûts de Carburant" />
              <KpiCard value="+40%" label="Livraisons à l'heure" />
              <KpiCard value="-90%" label="Temps de Planification" />
            </div>
            <p>LogiSync a pu non seulement réduire drastiquement ses coûts, mais aussi améliorer la satisfaction de ses clients et la qualité de vie de ses employés. La plateforme leur a ouvert de nouvelles opportunités commerciales en leur permettant de proposer un suivi en temps réel à leurs propres clients, un avantage concurrentiel majeur.</p>
        </FadeIn>
      </div>
    </article>
  );
}
