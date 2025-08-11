import Link from 'next/link';

/**
 * Composant Footer (pied de page) du site.
 * Affiche les informations de copyright et les liens de navigation secondaires.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-dark/20 bg-deep-space-blue">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-8 sm:flex-row">
        <div className="text-sm text-slate-dark">
          &copy; {currentYear} AUTOMATIC. Tous droits réservés.
        </div>
        <div className="mt-4 flex space-x-6 sm:mt-0">
          <Link href="/processus" className="text-sm text-slate-dark transition-colors hover:text-kinetic-cyan">
            Processus
          </Link>
          <Link href="/devis" className="text-sm text-slate-dark transition-colors hover:text-kinetic-cyan">
            Devis Instantané
          </Link>
          <Link href="/login" className="text-sm text-slate-dark transition-colors hover:text-kinetic-cyan">
            Espace Client
          </Link>
        </div>
      </div>
    </footer>
  );
}
