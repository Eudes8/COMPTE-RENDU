import * as React from 'react';
import { clsx } from 'clsx';

// Définition des props du composant, en étendant les props HTML standard pour un input
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Implémentation du composant Input
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={clsx(
          // Styles de base pour le champ de saisie
          'flex h-11 w-full rounded-md border-2 border-slate-dark/30 bg-deep-space-blue/50 px-4 py-2 text-base text-slate-light',
          'ring-offset-deep-space-blue transition-colors duration-300 ease-in-out',
          // Styles pour les placeholders
          'placeholder:text-slate-dark',
          // Styles au focus
          'focus-visible:outline-none focus-visible:border-kinetic-cyan focus-visible:ring-2 focus-visible:ring-kinetic-cyan/50',
          // Styles pour un champ désactivé
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Permet de fusionner des classes additionnelles
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
