import Link from 'next/link';
import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

// Ces métadonnées pourraient idéalement provenir d'un CMS ou être générées au build.
const blogPosts = [
  {
    slug: 'erreurs-a-eviter',
    title: 'Les 5 Erreurs à Éviter Avant de Lancer Votre Application',
    description: 'Les pièges les plus courants et comment notre approche vous aide à les contourner.',
    category: "Conseils d'Expert",
  },
  {
    slug: 'combien-coute-un-logiciel',
    title: 'Guide Complet : Combien Coûte un Logiciel Sur-Mesure en 2025 ?',
    description: 'Démystifions les facteurs qui influencent le prix d\'un développement.',
    category: 'Analyse de Coûts',
  },
  {
    slug: 'processus-vs-agence',
    title: 'Processus Automatisé vs. Agence Traditionnelle',
    description: 'Pourquoi notre modèle change radicalement la donne pour les porteurs de projet.',
    category: 'Comparatif',
  },
  {
    slug: 'stack-open-source',
    title: 'Pourquoi une Stack Open-Source est un Avantage Stratégique',
    description: 'Plus qu\'un choix technique, c\'est une décision business qui garantit votre liberté.',
    category: 'Technologie',
  },
  {
    slug: 'cahier-des-charges',
    title: 'Le Guide du Parfait Cahier des Charges pour un Projet Réussi',
    description: 'Un bon cahier des charges est la fondation de votre projet.',
    category: 'Planification',
  },
];

const ResourceCard = () => (
    <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/50">
        <h3 className="text-xl font-bold text-kinetic-cyan font-poppins">Guide à Télécharger</h3>
        <p className="mt-2 text-slate-dark">Recevez notre guide complet pour rédiger un cahier des charges parfait et lancez votre projet sur des bases solides.</p>
        <div className="mt-4">
            <a href="mailto:contact@automatic.com?subject=Demande%20de%20guide%20cahier%20des%20charges">
                <Button>Obtenir le guide</Button>
            </a>
        </div>
    </div>
)

export default function BlogIndexPage() {
  return (
    <div className="py-24 sm:py-32">
      <FadeIn>
        <header className="container mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Blog & Ressources
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-dark">
            Nos analyses, conseils et retours d'expérience pour vous aider à réussir votre projet de développement sur-mesure.
          </p>
        </header>
      </FadeIn>

      <div className="container mx-auto max-w-7xl px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-16">
            <main className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white font-poppins border-b border-slate-700 pb-4 mb-8">Derniers Articles</h2>
                <ul className="space-y-12">
                    {blogPosts.map((post, index) => (
                        <FadeIn key={post.slug} delay={0.1 * (index + 1)}>
                        <li className="group">
                            <p className="text-sm font-semibold text-kinetic-cyan">{post.category}</p>
                            <h3 className="mt-2 text-xl font-semibold text-slate-light group-hover:text-kinetic-cyan transition-colors">
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <p className="mt-2 text-base text-slate-dark">{post.description}</p>
                            <div className="mt-4">
                                <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-kinetic-cyan hover:underline">
                                    Lire la suite &rarr;
                                </Link>
                            </div>
                        </li>
                        </FadeIn>
                    ))}
                </ul>
            </main>
            <aside className="lg:col-span-1">
                <div className="sticky top-28">
                    <h2 className="text-2xl font-bold text-white font-poppins border-b border-slate-700 pb-4 mb-8">Ressources</h2>
                    <FadeIn delay={0.3}>
                        <ResourceCard />
                    </FadeIn>
                </div>
            </aside>
        </div>
      </div>
    </div>
  );
}
