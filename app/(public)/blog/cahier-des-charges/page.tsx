import { FadeIn } from '@/components/animations/FadeIn';
import { Button } from '@/components/Button';

export default function BlogPost5() {
  return (
    <article className="py-24 sm:py-32">
      <FadeIn>
        <header className="container mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-base font-semibold leading-7 text-kinetic-cyan">Planification</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Le Guide du Parfait Cahier des Charges pour un Projet Réussi
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-dark">
            Un bon cahier des charges est la fondation de votre projet. Il aligne toutes les parties prenantes et garantit que nous construisons le bon produit. Voici les sections clés à ne pas oublier.
          </p>
        </header>
      </FadeIn>

      <div className="container mx-auto max-w-3xl px-6 lg:px-8 mt-16 prose prose-invert prose-lg prose-p:text-slate-dark prose-headings:text-white prose-headings:font-poppins prose-strong:text-slate-light">
        <FadeIn>
          <h2>1. Le Contexte et l'Objectif ("Le Pourquoi")</h2>
          <p>Avant toute chose, expliquez le contexte de votre projet. Qui êtes-vous ? Quel est votre marché ? Quel problème cherchez-vous à résoudre ? Quel est l'objectif business principal de cette application ? Un objectif S.M.A.R.T (Spécifique, Mesurable, Atteignable, Réaliste, Temporellement défini) est idéal. (ex: "réduire le temps de traitement des commandes de 30% en 6 mois", "atteindre 1000 utilisateurs actifs le premier trimestre").</p>
        </FadeIn>

        <FadeIn>
            <h2>2. La Cible ("Le Pour Qui")</h2>
            <p>Décrivez précisément vos utilisateurs finaux. Qui sont-ils ? Quelles sont leurs habitudes numériques ? Leurs frustrations actuelles ? Créez 1 à 3 "personas" types pour donner vie à votre cible. Par exemple : "Claire, 35 ans, manager logistique, peu à l'aise avec les outils complexes, a besoin d'une vue d'ensemble rapide sur mobile."</p>
        </FadeIn>

        <FadeIn>
            <h2>3. Le Périmètre Fonctionnel ("Le Quoi")</h2>
            <p>C'est le cœur du document. Listez les fonctionnalités majeures de votre application. La meilleure méthode est d'utiliser les "User Stories" pour rester centré sur la valeur pour l'utilisateur :</p>
            <p><strong>"En tant que [type d'utilisateur], je veux [faire une action] afin de [bénéfice]."</strong></p>
            <p>Exemple : "En tant que client, je veux pouvoir suivre ma commande en temps réel afin de savoir où elle se trouve."</p>
            <p>Priorisez ensuite ces fonctionnalités avec la méthode MoSCoW :</p>
            <ul>
                <li><strong>Must-have:</strong> Essentiel pour la V1.</li>
                <li><strong>Should-have:</strong> Important, mais pas bloquant pour le lancement.</li>
                <li><strong>Could-have:</strong> Souhaitable si le temps et le budget le permettent.</li>
                <li><strong>Won't-have:</strong> Explicitement hors périmètre pour cette version.</li>
            </ul>
        </FadeIn>

        <FadeIn>
            <h2>4. Les Contraintes Techniques et Non-Fonctionnelles</h2>
            <p>Y a-t-il des contraintes à respecter qui ne sont pas des fonctionnalités directes ?</p>
            <ul>
                <li><strong>Technique :</strong> Doit s'intégrer avec une API existante ? Doit être compatible avec un certain navigateur ou appareil ?</li>
                <li><strong>Performance :</strong> Le temps de chargement doit être inférieur à 2 secondes ? L'application doit supporter 10 000 utilisateurs simultanés ?</li>
                <li><strong>Sécurité & Légal :</strong> L'application gérera-t-elle des données sensibles (RGPD) ? Doit-elle respecter des normes spécifiques ?</li>
            </ul>
        </FadeIn>

        <FadeIn>
            <h2>5. Le Budget et les Délais</h2>
            <p>Soyez aussi transparent que possible sur vos attentes. Avez-vous une enveloppe budgétaire indicative ? Une date de lancement impérative liée à un événement ou une saison ? Cela permet d'aligner la proposition technique et fonctionnelle avec vos réalités business dès le départ.</p>
            <div className="not-prose my-8 p-6 border border-kinetic-cyan/30 rounded-lg bg-slate-800/50">
                <h3 className="text-xl font-poppins text-kinetic-cyan">Notre Outil de Devis : Votre Assistant Cahier des Charges</h3>
                <p className="mt-2 text-slate-light">Notre outil de devis instantané est conçu pour vous guider à travers ces questions. En y répondant, vous construisez déjà les fondations d'un excellent cahier des charges, et vous nous donnez les informations nécessaires pour vous fournir une estimation précise.</p>
                <div className="mt-4">
                    <a href="/devis"><Button>Commencer mon devis</Button></a>
                </div>
            </div>
        </FadeIn>
      </div>
    </article>
  );
}
