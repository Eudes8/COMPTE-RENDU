'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { toast } from 'sonner';
import clsx from 'clsx';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({ email: false, password: false });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const emailIsValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
  const passwordIsValid = useMemo(() => password.length >= 6, [password]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error('Erreur de connexion', { description: 'Email ou mot de passe invalide.' });
    } else {
      toast.success('Connexion réussie !', { description: 'Vous allez être redirigé vers votre tableau de bord.' });
      router.push('/dashboard');
      router.refresh();
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
          Se connecter
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-light">Adresse Email</label>
            <Input
              type="email" id="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              required
              className={clsx(
                'transition-all',
                touched.email && (emailIsValid ? 'border-green-500/50 focus-visible:border-green-500' : 'border-red-500/50 focus-visible:border-red-500')
              )}
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
              className={clsx(
                'transition-all',
                touched.password && (passwordIsValid ? 'border-green-500/50 focus-visible:border-green-500' : 'border-red-500/50 focus-visible:border-red-500')
              )}
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" disabled={loading || !emailIsValid || !passwordIsValid} className="w-full">
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-dark">
          Pas encore de compte ?{' '}
          <a href="/signup" className="font-medium text-kinetic-cyan hover:underline">
            Inscrivez-vous ici
          </a>
        </p>
      </div>
    </div>
  );
}
