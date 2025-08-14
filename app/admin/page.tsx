import QuotesTable from './QuotesTable';

/**
 * Page principale du tableau de bord administrateur.
 */
export default function AdminDashboard() {
  return (
    <div className="container mx-auto max-w-7xl p-6 sm:p-8">
      <h1 className="text-3xl font-bold font-poppins mb-8 text-white">
        Tableau de Bord Administrateur
      </h1>
      <div className="bg-deep-space-blue/50 rounded-lg border border-slate-dark/20 p-6">
        <h2 className="text-xl font-semibold text-kinetic-cyan mb-4">
          Nouvelles Demandes de Devis
        </h2>
        <QuotesTable />
      </div>
    </div>
  );
}
