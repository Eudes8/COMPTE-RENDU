/**
 * Page de vue détaillée pour un projet spécifique.
 * Ceci est une page dynamique qui utilise l'ID du projet depuis l'URL.
 * Pour l'instant, c'est une page de remplacement (placeholder).
 */
export default function ProjectPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="container mx-auto max-w-7xl p-6 sm:p-8">
      <h1 className="text-3xl font-bold font-poppins text-white">
        Détails du Projet
      </h1>
      <div className="mt-8 bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 p-6">
        <p className="text-lg text-slate-light">
          Vous consultez le projet avec l'ID : <span className="font-mono text-kinetic-cyan">{params.projectId}</span>
        </p>
        <p className="mt-4 text-slate-dark">
          Ceci est la page dédiée à votre projet. Les détails, les tâches, les factures et les outils de communication pour ce projet seront affichés ici prochainement.
        </p>
      </div>
    </div>
  );
}
