/**
 * Skeleton Loader pour le tableau de bord administrateur.
 */
export default function AdminLoading() {
  return (
    <div className="container mx-auto max-w-7xl p-6 sm:p-8">
      {/* Header Placeholder */}
      <div className="h-9 w-96 bg-slate-dark/30 rounded-md animate-pulse mb-8"></div>

      {/* Quotes Section Placeholder */}
      <div className="bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 p-6">
        <div className="h-6 w-64 bg-kinetic-cyan/20 rounded-md mb-4 animate-pulse"></div>
        <div className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-4 bg-deep-space-blue rounded-md border border-slate-dark/30 flex justify-between items-center gap-4">
              <div className="flex-grow space-y-2">
                <div className="h-5 w-1/2 bg-slate-dark/50 rounded-md animate-pulse"></div>
                <div className="h-4 w-1/3 bg-slate-dark/50 rounded-md animate-pulse"></div>
              </div>
              <div className="h-9 w-32 bg-slate-dark/50 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
