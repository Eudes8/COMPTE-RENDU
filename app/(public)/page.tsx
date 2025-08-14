import Link from 'next/link';
import { Button } from '@/components/Button';
import { FadeIn } from '@/components/animations/FadeIn';
import { IconTechCrunch } from '@/components/icons/IconTechCrunch';
import { IconForbes } from '@/components/icons/IconForbes';
import { InteractiveProcess } from '@/components/homepage/InteractiveProcess';
import { Accordion } from '@/components/Accordion';
// Fictional logo placeholder
const IconLeMondeInformatique = () => <p className="text-xl font-bold text-slate-500 font-serif">Le Monde Informatique</p>;

/**
 * Page d'accueil du site AUTOMATIC.
 * Présente la proposition de valeur et les principaux appels à l'action.
 */
export default function HomePage() {
  return (
    <>
      {/* Section Héros */}
      <FadeIn>
        <section className="container mx-auto flex max-w-5xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center sm:pt-32 sm:pb-20">
          <h1 className="font-poppins text-4xl font-bold tracking-tight text-slate-light sm:text-5xl md:text-6xl">
            Le Développement sur-mesure,
            <span className="mt-2 block text-kinetic-cyan sm:mt-4">Réinventé.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-dark">
            AUTOMATIC transforme la création de logiciels personnalisés en une expérience 100% numérique.
            Obtenez un devis instantané, suivez votre projet en temps réel et centralisez toute votre communication.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link href="/devis">
              <Button size="lg">Obtenir mon devis gratuit</Button>
            </Link>
            <Link href="/processus">
              <Button variant="secondary" size="lg">
                Découvrir le processus &rarr;
              </Button>
            </Link>
          </div>
        </section>
      </FadeIn>

      {/* Barre de Logos "Ils parlent de nous" */}
      <FadeIn delay={0.4}>
        <section className="container mx-auto text-center pb-24 sm:pb-32">
            <p className="font-poppins text-sm font-semibold text-slate-dark tracking-widest">
              ILS PARLENT DE NOUS
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
                <IconTechCrunch className="h-7 text-slate-500" />
                <IconForbes className="h-7 text-slate-500" />
                <IconLeMondeInformatique />
            </div>
        </section>
      </FadeIn>

      {/* Section Processus Interactif */}
      <InteractiveProcess />

      {/* Section FAQ */}
      <FadeIn>
        <section className="container mx-auto max-w-3xl px-6 py-24 sm:py-32">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins text-center">
                Questions Fréquentes
            </h2>
            <div className="mt-12">
                <Accordion title="Quel est le délai moyen pour un projet ?">
                    <p>Le délai dépend de la complexité du projet. Un projet simple (site vitrine, petite application interne) peut prendre 4 à 6 semaines. Une application complexe avec de nombreuses fonctionnalités peut nécessiter plusieurs mois. Notre processus de devis initial vous donnera une estimation de temps précise basée sur vos besoins.</p>
                </Accordion>
                <Accordion title="Suis-je propriétaire du code source ?">
                    <p>Oui, absolument. C'est un de nos engagements fondamentaux. À la fin du projet et après le règlement final de toutes les factures, nous vous transférons l'intégralité du code source et des droits de propriété intellectuelle. Vous êtes 100% propriétaire de votre application.</p>
                </Accordion>
                <Accordion title="Comment fonctionne le paiement ?">
                    <p>Nous fonctionnons généralement avec un acompte au début du projet (après signature du contrat), puis des paiements échelonnés à la livraison de jalons clés (ex: fin du design, développement de fonctionnalités majeures, etc.). Tout est clairement défini et validé avec vous dans le contrat initial pour une transparence totale.</p>
                </Accordion>
                <Accordion title="Puis-je apporter des modifications en cours de projet ?">
                    <p>Oui. Notre approche agile est conçue pour être flexible. Les demandes de modification sont évaluées pour leur impact sur le délai et le budget. Nous vous soumettons un avenant clair et transparent, et n'engageons le développement de la modification qu'après votre validation. La communication est constante.</p>
                </Accordion>
            </div>
        </section>
      </FadeIn>

      {/* Teaser Étude de Cas */}
      <div className="bg-slate-800/30">
        <FadeIn>
          <section className="container mx-auto max-w-7xl px-6 py-24 sm:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                  <h2 className="text-base font-semibold leading-7 text-kinetic-cyan font-poppins">Étude de Cas</h2>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins">
                      Fintech Innovante : +300% d'engagement
                  </p>
                  <p className="mt-6 text-lg leading-8 text-slate-dark">
                      Découvrez comment nous avons aidé une startup de la finance à construire une plateforme d'investissement intuitive, sécurisée et ultra-performante, multipliant par trois l'engagement de leurs utilisateurs en six mois.
                  </p>
                  <figure className="mt-10 border-l-2 border-kinetic-cyan pl-6">
                      <blockquote className="text-slate-light">
                          <p>“L'équipe d'AUTOMATIC n'est pas un simple prestataire, c'est un véritable partenaire technique. Leur processus automatisé nous a donné une visibilité sans précédent.”</p>
                      </blockquote>
                      <figcaption className="mt-6 flex gap-x-4">
                          <div className="text-sm leading-6">
                              <div className="font-semibold text-white">Sophie Dubois</div>
                              <div className="text-slate-dark">CEO, FinConnect (client fictif)</div>
                          </div>
                      </figcaption>
                  </figure>
                  <div className="mt-8">
                      <Link href="/etudes-de-cas/finconnect">
                          <Button>Lire l'étude de cas complète</Button>
                      </Link>
                  </div>
              </div>
              <div className="flex justify-center items-center">
                  <div className="w-full h-80 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <p className="text-slate-500">[Placeholder pour Graphique de Croissance]</p>
                  </div>
              </div>
          </section>
        </FadeIn>
      </div>

      {/* Section Stack Technique */}
      <FadeIn>
          <section className="py-24 sm:py-32">
              <div className="container mx-auto max-w-7xl px-6 lg:px-8 text-center">
                  <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins">
                      Une Stack Technique Moderne et Robuste
                  </h2>
                  <p className="mt-4 text-lg leading-8 text-slate-dark">
                      Nous utilisons les meilleures technologies open-source pour construire des produits fiables, performants et évolutifs.
                  </p>
                  <div className="mt-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
                      <IconNextjs className="h-12 text-slate-400" />
                      <IconSupabase className="h-12 text-slate-400" />
                      <p className="text-3xl font-mono text-slate-400">Docker</p>
                      <p className="text-3xl font-mono text-slate-400">Tailwind</p>
                  </div>
              </div>
          </section>
      </FadeIn>
    </>
  );
}
