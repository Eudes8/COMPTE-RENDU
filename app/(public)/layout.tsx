import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * Layout pour toutes les pages publiques du site.
 * Utilise un Route Group `(public)` pour ne pas affecter l'URL.
 * Applique l'en-tête (Header) et le pied de page (Footer) à toutes les pages enfants.
 */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* pt-20 compense la hauteur du header fixe (h-20) */}
      <div className="flex-grow pt-20">
        {children}
      </div>
      <Footer />
    </div>
  );
}
