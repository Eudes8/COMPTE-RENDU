import { FadeIn } from '@/components/animations/FadeIn';

// Placeholder for team member portraits
const TeamMemberPlaceholder = () => (
  <div className="h-48 w-48 rounded-full bg-slate-700 mx-auto"></div>
);

export default function AboutPage() {
  return (
    <div className="py-24 sm:py-32">
      {/* Section Mission */}
      <FadeIn>
        <section className="container mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Notre Mission
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-dark">
            AUTOMATIC est né d'une conviction simple : le développement de logiciels sur-mesure est trop souvent un processus opaque, lent et frustrant. Nous avons décidé de changer cela. Notre mission est de transformer cette expérience en un parcours digital, transparent et ultra-efficace, en s'appuyant sur une stack technique 100% open-source et des processus automatisés. Nous voulons redonner le pouvoir aux créateurs de projets, en leur offrant une visibilité totale et un contrôle absolu, de la première ligne de code à la mise en production.
          </p>
        </section>
      </FadeIn>

      {/* Section Valeurs */}
      <FadeIn delay={0.4}>
        <section className="container mx-auto max-w-7xl px-6 py-24 sm:py-32">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins text-center">
            Nos Valeurs
          </h2>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="text-xl font-semibold text-kinetic-cyan font-poppins">Transparence Radicale</h3>
              <p className="mt-4 text-slate-dark">Chaque ligne de code, chaque tâche, chaque décision est visible sur votre tableau de bord. Pas de surprises, juste une collaboration honnête.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-kinetic-cyan font-poppins">Partenariat Client</h3>
              <p className="mt-4 text-slate-dark">Nous ne sommes pas un simple prestataire. Nous sommes votre partenaire technique, investi dans le succès de votre projet comme si c'était le nôtre.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-kinetic-cyan font-poppins">Excellence Technique</h3>
              <p className="mt-4 text-slate-dark">Nous utilisons une stack moderne et open-source pour construire des produits robustes, performants et pérennes. La qualité n'est pas une option.</p>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Section Équipe */}
      <div className="bg-slate-800/30">
        <FadeIn>
          <section className="container mx-auto max-w-7xl px-6 py-24 sm:py-32">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins text-center">
              L'Équipe Fondatrice
            </h2>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="text-center">
                <TeamMemberPlaceholder />
                <h3 className="mt-6 text-xl font-semibold text-white">Jean Dupont</h3>
                <p className="text-base text-kinetic-cyan">Fondateur & Architecte Principal</p>
                <p className="mt-4 text-slate-dark">Avec 15 ans d'expérience dans la construction de logiciels complexes, Jean est obsédé par l'efficacité et la qualité du code. Il a créé AUTOMATIC pour en finir avec les gaspillages de temps et d'argent qu'il a trop souvent observés dans l'industrie.</p>
              </div>
              <div className="text-center">
                <TeamMemberPlaceholder />
                <h3 className="mt-6 text-xl font-semibold text-white">Sophie Martin</h3>
                <p className="text-base text-kinetic-cyan">Cheffe de Projet & Stratégie Client</p>
                <p className="mt-4 text-slate-dark">Sophie est le pont entre la technique et le métier. Experte en méthodologies agiles, elle s'assure que chaque projet répond parfaitement aux besoins du client et que la communication est toujours fluide et proactive.</p>
              </div>
            </div>
          </section>
        </FadeIn>
      </div>
    </div>
  );
}
