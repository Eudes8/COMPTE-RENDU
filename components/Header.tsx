import Link from 'next/link';
import { Button } from './Button';

/**
 * Composant Header (en-tête) pour la navigation principale du site.
 * Il est fixe en haut de la page et contient le logo, les liens de navigation
 * et les boutons d'appel à l'action.
 */
export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-deep-space-blue/80 shadow-lg backdrop-blur-sm">
      <nav className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold font-poppins text-kinetic-cyan transition-transform hover:scale-105">
          AUTOMATIC
        </Link>

        {/* Liens de navigation pour le bureau */}
        <div className="hidden items-center space-x-8 md:flex">
          <Link href="/" className="font-medium text-slate-light transition-colors hover:text-kinetic-cyan">
            Accueil
          </Link>
          <Link href="/processus" className="font-medium text-slate-light transition-colors hover:text-kinetic-cyan">
            Processus
          </Link>
        </div>

        {/* Boutons d'action */}
        <div className="flex items-center space-x-4">
          <Link href="/devis" className="hidden sm:block">
            <Button variant="primary" size="sm">
              Démarrer un Devis
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="sm">
              Espace Client
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
