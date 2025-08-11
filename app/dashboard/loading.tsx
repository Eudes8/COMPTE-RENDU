/**
 * Skeleton Loader pour le tableau de bord client.
 * Affiche une version simplifiée de l'interface pendant le chargement des données.
 */
export default function DashboardLoading() {
  return (
    <div className="container mx-auto max-w-7xl p-6 sm:p-8">
      {/* Header Placeholder */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
        <div>
          <div className="h-8 w-64 bg-slate-dark/30 rounded-md animate-pulse"></div>
          <div className="h-4 w-80 bg-slate-dark/30 rounded-md mt-2 animate-pulse"></div>
        </div>
        <div className="h-11 w-48 bg-slate-dark/30 rounded-md animate-pulse"></div>
      </div>

      {/* Projects Section Placeholder */}
      <div className="bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 p-6">
        <div className="h-6 w-40 bg-kinetic-cyan/20 rounded-md mb-4 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 bg-deep-space-blue rounded-md border border-slate-dark/30">
              <div className="h-6 w-3/4 bg-slate-dark/50 rounded-md animate-pulse"></div>
              <div className="mt-4 h-6 w-20 bg-slate-dark/50 rounded-full animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
