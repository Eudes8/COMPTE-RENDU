import { FadeIn } from '@/components/animations/FadeIn';

export default function BlogPost3() {
  return (
    <article className="py-24 sm:py-32">
      <FadeIn>
        <header className="container mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <p className="text-base font-semibold leading-7 text-kinetic-cyan">Comparatif</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Processus Automatisé vs. Agence Traditionnelle
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-dark">
            Pourquoi notre modèle change radicalement la donne pour les porteurs de projet.
          </p>
        </header>
      </FadeIn>

      <div className="container mx-auto max-w-3xl px-6 lg:px-8 mt-16 prose prose-invert prose-lg prose-p:text-slate-dark prose-headings:text-white prose-headings:font-poppins prose-strong:text-slate-light">
        <FadeIn>
          <h2>Le modèle de l'agence traditionnelle : un mal nécessaire ?</h2>
          <p>Le modèle classique a ses mérites, mais aussi ses faiblesses bien connues qui génèrent de la friction et de l'incertitude :</p>
          <ul>
            <li><strong>Opacité :</strong> Des réunions interminables, des emails dans tous les sens, et une visibilité limitée sur l'avancement réel. Le client est souvent dans le flou, dépendant de la bonne volonté du chef de projet pour avoir des nouvelles.</li>
            <li><strong>Lenteur :</strong> Les processus manuels et la multiplication des intermédiaires (commerciaux, chefs de projet, designers, développeurs) ralentissent considérablement le cycle de développement. Chaque décision doit passer par plusieurs couches de validation.</li>
            <li><strong>Coûts cachés :</strong> Le temps passé en réunions, en gestion de projet et en "ajustements" est souvent facturé, gonflant la note finale sans apporter de valeur directe au produit.</li>
          </ul>
        </FadeIn>

        <FadeIn>
            <h2>L'approche AUTOMATIC : la transparence comme système d'exploitation</h2>
            <p>Nous ne cherchons pas à remplacer les humains, mais à augmenter leur efficacité en automatisant tout ce qui peut l'être. Notre plateforme n'est pas juste un outil, c'est un nouveau système d'exploitation pour la création de logiciels.</p>

            <div className="not-prose my-8 p-6 border border-slate-700 rounded-lg">
                <div className="grid grid-cols-[1fr,1fr,1fr] gap-4 font-semibold text-center items-center">
                    <div className="p-2 text-white text-left">Critère</div>
                    <div className="p-2 text-kinetic-cyan border-b-2 border-kinetic-cyan">AUTOMATIC</div>
                    <div className="p-2 text-slate-dark">Agence Trad.</div>
                </div>
                <div className="grid grid-cols-[1fr,1fr,1fr] gap-4 text-center text-sm border-t border-slate-700 mt-4 pt-4 items-center">
                    <div className="p-2 text-left font-semibold">Visibilité</div>
                    <div className="p-2">Tableau de bord centralisé, 100% temps réel</div>
                    <div className="p-2">Rapports hebdomadaires, emails</div>
                </div>
                <div className="grid grid-cols-[1fr,1fr,1fr] gap-4 text-center text-sm border-t border-slate-700 mt-2 pt-2 items-center">
                    <div className="p-2 text-left font-semibold">Communication</div>
                    <div className="p-2">Messagerie intégrée au projet</div>
                    <div className="p-2">Emails, appels, Slack</div>
                </div>
                <div className="grid grid-cols-[1fr,1fr,1fr] gap-4 text-center text-sm border-t border-slate-700 mt-2 pt-2 items-center">
                    <div className="p-2 text-left font-semibold">Devis</div>
                    <div className="p-2">Instantané et automatisé</div>
                    <div className="p-2">2 à 4 semaines</div>
                </div>
                <div className="grid grid-cols-[1fr,1fr,1fr] gap-4 text-center text-sm border-t border-slate-700 mt-2 pt-2 items-center">
                    <div className="p-2 text-left font-semibold">Facturation</div>
                    <div className="p-2">Automatisée et liée aux jalons</div>
                    <div className="p-2">Manuelle, mensuelle</div>
                </div>
            </div>

            <p>Le résultat ? Moins de temps perdu en gestion, plus de temps consacré à la qualité du code et à la réflexion stratégique. Vous obtenez un meilleur produit, plus rapidement, et avec une tranquillité d'esprit inégalée.</p>
        </FadeIn>
      </div>
    </article>
  );
}
