/**
 * Skeleton Loader pour la page de l'espace de travail d'un projet.
 */
export default function ProjectWorkspaceLoading() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-pulse">

        {/* Main Content Placeholder */}
        <main className="lg:col-span-8 space-y-8">
          <section id="messages">
            <div className="h-8 w-48 bg-slate-dark/30 rounded-md mb-4"></div>
            <div className="rounded-lg bg-deep-space-blue/30 border border-slate-dark/20 p-6 h-[40rem]">
              {/* Placeholder for messages */}
            </div>
          </section>
        </main>

        {/* Sidebar Placeholder */}
        <aside className="lg:col-span-4">
          <div className="p-6 bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 sticky top-28">
            <div className="h-8 w-3/4 bg-kinetic-cyan/20 rounded-md mb-4"></div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 w-16 bg-slate-dark/30 rounded"></div>
                <div className="h-6 w-20 bg-slate-dark/30 rounded-full"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-12 bg-slate-dark/30 rounded"></div>
                <div className="h-4 w-32 bg-slate-dark/30 rounded"></div>
              </div>
            </div>
            <div className="mt-6 border-t border-slate-dark/20 pt-6">
              <div className="h-6 w-24 bg-slate-dark/30 rounded-md mb-4"></div>
              <div className="rounded-lg bg-deep-space-blue/30 border border-slate-dark/20 p-6 h-[15rem]">
                {/* Placeholder for files */}
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
}
