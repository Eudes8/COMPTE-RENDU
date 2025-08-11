'use client';

import { useFormStatus } from 'react-dom';
import { Button, type ButtonProps } from '@/components/Button';

interface SubmitButtonProps extends ButtonProps {
  loadingText?: string;
}

/**
 * Un composant Bouton qui est conscient de l'état de soumission du formulaire parent.
 * Utilise le hook `useFormStatus` pour afficher un état de chargement.
 * Doit être utilisé à l'intérieur d'un <form>.
 */
export function SubmitButton({ children, loadingText = 'En cours...', ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? loadingText : children}
    </Button>
  );
}
