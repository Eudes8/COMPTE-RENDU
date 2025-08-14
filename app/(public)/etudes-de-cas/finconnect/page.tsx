import { FadeIn } from '@/components/animations/FadeIn';

// Un simple composant pour un KPI (Key Performance Indicator)
const KpiCard = ({ value, label }: { value: string; label: string }) => (
  <div className="bg-slate-800/50 p-6 rounded-lg text-center">
    <p className="text-4xl font-bold text-kinetic-cyan font-poppins">{value}</p>
    <p className="mt-2 text-sm text-slate-dark">{label}</p>
  </div>
);

export default function FinConnectCaseStudyPage() {
  return (
    <article className="py-24 sm:py-32">
      <FadeIn>
        <header className="container mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <p className="text-base font-semibold leading-7 text-kinetic-cyan">Étude de Cas : FinConnect</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Comment une expérience utilisateur repensée a multiplié l'engagement par 3
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-dark">
            Une plateforme d'investissement B2C transformée pour être plus intuitive, rapide et sécurisée.
          </p>
        </header>
      </FadeIn>

      <div className="container mx-auto max-w-3xl px-6 lg:px-8 mt-16 prose prose-invert prose-lg prose-p:text-slate-dark prose-headings:text-white prose-headings:font-poppins prose-strong:text-slate-light">
        <FadeIn>
          <h2>Le Défi</h2>
          <p><strong>FinConnect</strong>, une startup ambitieuse de la Fintech, avait une vision claire : démocratiser l'investissement pour les millénials. Cependant, leur première version de l'application, développée rapidement, souffrait d'une interface confuse, de lenteurs et d'un parcours utilisateur frustrant. Le taux d'abandon après inscription était de 70%, et l'engagement des utilisateurs restants était quasi inexistant.</p>
        </FadeIn>

        <FadeIn>
          <h2>Notre Approche</h2>
          <p>Nous avons collaboré étroitement avec FinConnect en utilisant notre processus automatisé. La phase de planification a permis de redéfinir les parcours utilisateurs clés en se basant sur les retours des premiers clients. Grâce à notre tableau de bord partagé, l'équipe de FinConnect a pu suivre chaque étape du développement, du design UX/UI jusqu'aux tests de performance, en donnant leur feedback en temps réel. Cette transparence a éliminé les allers-retours et a permis de rester aligné sur les objectifs business.</p>
        </FadeIn>

        <FadeIn>
            <h2>La Solution Technique</h2>
            <p>Nous avons reconstruit la plateforme de A à Z en utilisant une stack moderne et performante, choisie pour sa robustesse et sa flexibilité :</p>
            <ul>
                <li><strong>Frontend:</strong> Next.js avec TypeScript pour une interface rapide, optimisée pour le SEO et entièrement typée.</li>
                <li><strong>Backend & Base de Données:</strong> Supabase a été choisi pour sa gestion intégrée de l'authentification, sa base de données PostgreSQL puissante et ses capacités temps-réel que nous avons utilisées pour les notifications de portefeuille.</li>
                <li><strong>Déploiement:</strong> L'ensemble de la stack a été conteneurisé avec Docker, permettant un déploiement fiable et reproductible sur l'infrastructure cloud de leur choix.</li>
            </ul>
            <p>L'accent a été mis sur des temps de chargement quasi-instantanés grâce au rendu côté serveur de Next.js, et sur une interface épurée qui guide l'utilisateur sans effort vers l'investissement.</p>
        </FadeIn>

        <FadeIn>
            <h2>Les Résultats</h2>
            <p>En moins de six mois après le lancement de la nouvelle plateforme développée par AUTOMATIC, FinConnect a observé des résultats spectaculaires :</p>
            <div className="my-12 grid grid-cols-1 sm:grid-cols-3 gap-8 not-prose">
              <KpiCard value="+320%" label="Engagement Utilisateur" />
              <KpiCard value="-75%" label="Temps de Chargement" />
              <KpiCard value="-40%" label="Coûts d'Infrastructure" />
            </div>
            <p>Le taux d'abandon a chuté à moins de 20%, et la plateforme est maintenant citée comme une référence en matière d'expérience utilisateur dans son secteur. La stack open-source a également permis à FinConnect de maîtriser ses coûts tout en ayant une base technique prête à évoluer.</p>
        </FadeIn>
      </div>
    </article>
  );
}
