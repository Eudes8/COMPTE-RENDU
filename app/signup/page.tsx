'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'

// Page d'inscription pour les nouveaux utilisateurs
export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // L'email de confirmation sera envoyé à l'utilisateur.
        // Il contiendra un lien qui redirigera l'utilisateur vers cette URL.
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Erreur d'inscription:", error)
      setError("Une erreur est survenue. L'utilisateur existe peut-être déjà ou le mot de passe est trop faible.")
    } else {
      setMessage('Inscription réussie ! Veuillez vérifier votre boîte de réception pour confirmer votre adresse email.')
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Créer un compte
        </h2>
        {error && (
          <div className="mb-4 rounded-md bg-red-100 p-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 rounded-md bg-green-100 p-3 text-center text-sm text-green-700">
            {message}
          </div>
        )}
        <form onSubmit={handleSignup} className={message ? 'hidden' : 'block'}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="votre@email.com"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="•••••••• (minimum 6 caractères)"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? 'Inscription en cours...' : "S'inscrire"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Déjà un compte ?{' '}
          <a href="/login" className="font-medium text-indigo-600 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  )
}
