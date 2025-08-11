'use client';

import { useState, useMemo } from 'react';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { toast } from 'sonner';
import clsx from 'clsx';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const supabase = createClient();

  const emailIsValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const passwordIsValid = useMemo(() => password.length >= 6, [password]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Erreur d'inscription", { description: "L'utilisateur existe peut-être déjà ou le mot de passe est trop faible." });
    } else {
      toast.info("Vérifiez vos emails", { description: `Un lien de confirmation a été envoyé à ${email}.` });
      setIsSubmitted(true);
    }
    setLoading(false);
  };

  const handleBlur = (field: 'email' | 'password') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-deep-space-blue p-4">
      <div className="w-full max-w-md rounded-lg bg-slate-800/50 border border-slate-700 p-8">
        <h2 className="mb-6 text-center text-3xl font-bold text-white font-poppins">
          Créer un compte
        </h2>

        {isSubmitted ? (
            <div className="text-center text-slate-light p-4 bg-deep-space-blue rounded-md">
                <h3 className="text-xl text-kinetic-cyan font-semibold">Inscription presque terminée !</h3>
                <p className="mt-4">Un lien de confirmation a été envoyé à <strong>{email}</strong>. Veuillez cliquer sur ce lien pour activer votre compte.</p>
            </div>
        ) : (
            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-light">Adresse Email</label>
                <Input
                  type="email" id="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                  required
                  className={clsx('transition-all', touched.email && (emailIsValid ? 'border-green-500/50 focus-visible:border-green-500' : 'border-red-500/50 focus-visible:border-red-500'))}
                  placeholder="votre@email.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-light">Mot de passe</label>
                <Input
                  type="password" id="password" value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  required
                  className={clsx('transition-all', touched.password && (passwordIsValid ? 'border-green-500/50 focus-visible:border-green-500' : 'border-red-500/50 focus-visible:border-red-500'))}
                  placeholder="6 caractères minimum"
                />
              </div>
              <Button type="submit" disabled={loading || !emailIsValid || !passwordIsValid} className="w-full">
                {loading ? 'Inscription en cours...' : "S'inscrire"}
              </Button>
            </form>
        )}

        <p className="mt-6 text-center text-sm text-slate-dark">
          Déjà un compte ?{' '}
          <a href="/login" className="font-medium text-kinetic-cyan hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}
