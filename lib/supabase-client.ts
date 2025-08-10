// /lib/supabase-client.ts
// Ce fichier centralise la création des clients Supabase pour les différents contextes de Next.js.
// Il utilise le package @supabase/ssr pour gérer l'authentification côté serveur et client.

import { createBrowserClient, createServerClient, type CookieOptions } from '@supabase/ssr'
import { type ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

/**
 * Crée un client Supabase pour une utilisation côté client (dans les composants 'use client').
 * Ce client est un singleton et ne sera créé qu'une seule fois.
 * @returns Le client Supabase pour le navigateur.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

/**
 * Crée un client Supabase pour une utilisation côté serveur (Server Components, Route Handlers, Server Actions).
 * @param {ReadonlyRequestCookies} cookieStore - Le store de cookies de la requête Next.js.
 * @returns Le client Supabase pour le serveur.
 */
export function createServer(cookieStore: ReadonlyRequestCookies) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
