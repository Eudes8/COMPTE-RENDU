import Link from 'next/link';
import { Button } from '@/components/Button';

/**
 * Page d'accueil du site AUTOMATIC.
 * Présente la proposition de valeur et les principaux appels à l'action.
 */
export default function HomePage() {
  return (
    <section className="container mx-auto flex max-w-5xl flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
      <h1 className="font-poppins text-4xl font-bold tracking-tight text-slate-light sm:text-5xl md:text-6xl">
        Le Développement sur-mesure,
        <span className="mt-2 block text-kinetic-cyan sm:mt-4">Réinventé.</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-dark">
        AUTOMATIC transforme la création de logiciels personnalisés en une expérience 100% numérique.
        Obtenez un devis instantané, suivez votre projet en temps réel et centralisez toute votre communication.
      </p>
      <div className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <Link href="/devis">
          <Button size="lg">Obtenir mon devis gratuit</Button>
        </Link>
        <Link href="/processus">
          <Button variant="ghost" size="lg">
            Découvrir le processus &rarr;
          </Button>
        </Link>
      </div>
    </section>
  );
}
