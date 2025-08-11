import type { Metadata } from "next";
import { Inter, Poppins } from 'next/font/google';
import "../styles/globals.css";

// Configuration des polices d'écriture via next/font
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter', // Nom de la variable CSS pour la police Inter
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins', // Nom de la variable CSS pour la police Poppins
  display: 'swap',
});


export const metadata: Metadata = {
  title: "AUTOMATIC | Le Développement sur-mesure, Réinventé.",
  description: "AUTOMATIC transforme le développement de logiciels sur-mesure en une expérience numérique, transparente et automatisée.",
};

/**
 * Ceci est le Layout racine (Root Layout) de l'application.
 * Il est obligatoire et enveloppe toutes les pages.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans bg-deep-space-blue text-slate-light selection:bg-kinetic-cyan selection:text-deep-space-blue">
        {/* Contenu des pages enfants sera injecté ici */}
        <main>{children}</main>
      </body>
    </html>
  );
}
