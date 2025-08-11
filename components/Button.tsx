import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { clsx } from 'clsx';

// Définition des variantes de style pour le bouton en utilisant CVA (Class Variance Authority)
const buttonVariants = cva(
  // Styles de base communs à tous les boutons
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-poppins font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kinetic-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space-blue disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Variante principale, couleur vive et pleine
        primary:
          'bg-kinetic-cyan text-deep-space-blue shadow-md hover:bg-white hover:text-deep-space-blue',
        // Variante secondaire, avec une bordure
        secondary:
          'border border-kinetic-cyan bg-transparent text-kinetic-cyan hover:bg-kinetic-cyan/10',
        // Variante "fantôme", pour les actions moins importantes
        ghost: 'text-slate-light hover:bg-slate-dark/20 hover:text-white',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 rounded-md px-4',
        lg: 'h-12 rounded-md px-8 text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

// Définition des props du composant, en étendant les props HTML standard
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// Implémentation du composant Button en utilisant React.forwardRef pour passer la ref
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={clsx(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
