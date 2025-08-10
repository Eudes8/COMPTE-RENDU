/**
 * Page d'accueil de l'application AUTOMATIC.
 * C'est le point d'entrée principal pour les utilisateurs.
 *
 * @returns {JSX.Element} La page d'accueil.
 */
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-center">
      <div className="p-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Bienvenue sur AUTOMATIC
        </h1>
        <p className="mt-6 text-xl text-gray-600">
          Le Développement sur-mesure, Réinventé.
        </p>
        <div className="mt-8">
          <p className="text-gray-500">
            Le projet est en cours d'initialisation.
          </p>
        </div>
      </div>
    </main>
  );
}
