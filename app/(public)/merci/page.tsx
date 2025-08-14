import Link from 'next/link';
import { Button } from '@/components/Button';

/**
 * Page de remerciement affichée après la soumission réussie d'un devis.
 */
export default function MerciPage() {
  return (
    <div className="container mx-auto flex max-w-4xl flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
      <h1 className="font-poppins text-4xl font-bold tracking-tight text-kinetic-cyan sm:text-5xl">
        Merci !
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-light">
        Nous avons bien reçu votre demande de devis. Notre équipe va l'étudier et
        vous contactera très prochainement par email avec une proposition détaillée.
      </p>
      <div className="mt-10">
        <Link href="/">
          <Button variant="secondary">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}
