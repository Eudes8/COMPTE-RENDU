import Link from 'next/link';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

const caseStudies = [
  {
    slug: 'finconnect',
    client: 'FinConnect (Fintech)',
    title: 'Comment FinConnect a multiplié par 3 l\'engagement de ses utilisateurs',
    description: 'Une plateforme d\'investissement B2C repensée pour être plus intuitive, rapide et sécurisée.',
  },
  {
    slug: 'logisync',
    client: 'LogiSync (Logistique)',
    title: 'Optimisation des tournées et réduction des coûts de 25% pour LogiSync',
    description: 'Création d\'un SaaS sur-mesure pour la gestion de flotte et l\'optimisation des itinéraires en temps réel.',
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="py-24 sm:py-32">
      <FadeIn>
        <section className="container mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Nos Études de Cas
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-dark">
            Découvrez comment nous avons transformé les défis de nos clients en succès mesurables grâce à notre approche automatisée et notre expertise technique.
          </p>
        </section>
      </FadeIn>

      <div className="container mx-auto max-w-5xl px-6 lg:px-8 mt-16">
        <ul className="space-y-16">
          {caseStudies.map((study, index) => (
            <FadeIn key={study.slug} delay={0.2 * (index + 1)}>
              <li className="p-8 bg-slate-800/30 rounded-lg border border-slate-700/50 transition-all duration-300 hover:border-kinetic-cyan/50">
                <p className="text-base font-semibold text-kinetic-cyan">{study.client}</p>
                <h2 className="mt-2 text-2xl font-bold text-white font-poppins">{study.title}</h2>
                <p className="mt-4 text-lg text-slate-dark">{study.description}</p>
                <div className="mt-6">
                    <Link href={`/etudes-de-cas/${study.slug}`}>
                        <Button variant="secondary">Lire l'étude de cas &rarr;</Button>
                    </Link>
                </div>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </div>
  );
}
