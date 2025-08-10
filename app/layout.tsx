import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "AUTOMATIC",
  description: "Le Développement sur-mesure, Réinventé.",
};

/**
 * Ceci est le Layout racine (Root Layout) de l'application.
 * Il est obligatoire et enveloppe toutes les pages.
 * @param {object} props - Les propriétés du composant.
 * @param {React.ReactNode} props.children - Les composants enfants qui seront rendus ici.
 * @returns {JSX.Element} Le layout racine de l'application.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
