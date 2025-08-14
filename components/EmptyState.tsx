import { Button } from './Button';
import Link from 'next/link';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  message: string;
  cta?: {
    text: string;
    href: string;
  };
}

/**
 * Un composant réutilisable pour afficher un "état vide" de manière élégante
 * dans les tableaux de bord ou les listes.
 */
export function EmptyState({ icon, title, message, cta }: EmptyStateProps) {
  return (
    <div className="text-center bg-deep-space-blue/30 border-2 border-dashed border-slate-700/50 rounded-lg p-12">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-kinetic-cyan">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-slate-dark">{message}</p>
      {cta && (
        <div className="mt-6">
          <Link href={cta.href}>
            <Button>{cta.text}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
