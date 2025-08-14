/**
 * Page "Processus"
 * Décrit les 5 étapes clés du processus de développement d'AUTOMATIC.
 */
const steps = [
  {
    name: 'Devis Instantané',
    description: 'Utilisez notre outil en ligne pour décrire votre projet et recevez une estimation budgétaire en quelques minutes.',
  },
  {
    name: 'Consultation & Planification',
    description: 'Nous affinons ensemble les détails de votre projet. Un chef de projet vous est dédié et un planning clair est établi.',
  },
  {
    name: 'Développement & Suivi',
    description: 'Suivez l\'avancement en temps réel sur votre tableau de bord. Participez aux sprints et donnez votre feedback à chaque étape.',
  },
  {
    name: 'Validation & Tests',
    description: 'Nous testons rigoureusement l\'application sur tous les fronts. Vous validez chaque fonctionnalité avant le déploiement final.',
  },
  {
    name: 'Déploiement & Maintenance',
    description: 'Votre application est mise en ligne sur une infrastructure robuste. Nous assurons la maintenance et proposons des évolutions futures.',
  },
];

export default function ProcessPage() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-base font-semibold leading-7 text-kinetic-cyan font-poppins">Notre méthode</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-poppins">
            Un processus simple et transparent
          </p>
          <p className="mt-6 text-lg leading-8 text-slate-dark">
            De l'idée à la mise en production, chaque étape est conçue pour être efficace, collaborative et entièrement visible pour vous.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-5">
            {steps.map((step, index) => (
              <div key={step.name} className="flex flex-col">
                <dt className="flex flex-col items-center gap-y-3 text-base font-semibold leading-7 text-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-kinetic-cyan/30 bg-deep-space-blue text-kinetic-cyan font-bold text-lg">
                    {index + 1}
                  </span>
                  {step.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-slate-dark">
                  {step.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
