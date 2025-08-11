'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { createClient } from '@/lib/supabase-client';

// Définition des types pour les données du formulaire
interface FormData {
  projectType: string;
  features: string[];
  contactEmail: string;
}

// --- Composants pour chaque étape ---

const Step1 = ({ data, setData, nextStep }: { data: FormData, setData: Function, nextStep: () => void }) => {
  const projectTypes = ["Application Web sur-mesure", "Site E-commerce", "Application Mobile", "Plateforme SaaS", "Autre"];
  return (
    <div>
      <h2 className="text-2xl font-bold font-poppins text-white mb-6">Quel type de projet envisagez-vous ?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projectTypes.map(type => (
          <button
            key={type}
            onClick={() => setData({ ...data, projectType: type })}
            className={`p-6 rounded-lg border-2 transition-all ${data.projectType === type ? 'border-kinetic-cyan bg-kinetic-cyan/10' : 'border-slate-dark/30 hover:border-kinetic-cyan/50'}`}
          >
            <span className={`text-lg font-semibold ${data.projectType === type ? 'text-kinetic-cyan' : 'text-slate-light'}`}>{type}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 text-right">
        <Button onClick={nextStep} disabled={!data.projectType}>Suivant</Button>
      </div>
    </div>
  );
};

const Step2 = ({ data, setData, nextStep, prevStep }: { data: FormData, setData: Function, nextStep: () => void, prevStep: () => void }) => {
  const allFeatures = ["Authentification des utilisateurs", "Tableau de bord administrateur", "Paiements en ligne (Stripe, etc.)", "Blog / Contenu dynamique", "API externe"];
  const handleFeatureToggle = (feature: string) => {
    const features = data.features.includes(feature)
      ? data.features.filter(f => f !== feature)
      : [...data.features, feature];
    setData({ ...data, features });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-poppins text-white mb-6">Quelles sont les fonctionnalités clés ?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {allFeatures.map(feature => (
          <button
            key={feature}
            onClick={() => handleFeatureToggle(feature)}
            className={`p-4 rounded-lg border-2 text-left transition-all ${data.features.includes(feature) ? 'border-kinetic-cyan bg-kinetic-cyan/10' : 'border-slate-dark/30 hover:border-kinetic-cyan/50'}`}
          >
            <span className={`font-semibold ${data.features.includes(feature) ? 'text-kinetic-cyan' : 'text-slate-light'}`}>{feature}</span>
          </button>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Précédent</Button>
        <Button onClick={nextStep} disabled={data.features.length === 0}>Suivant</Button>
      </div>
    </div>
  );
};

const Step3 = ({ data, setData, prevStep, handleSubmit }: { data: FormData, setData: Function, prevStep: () => void, handleSubmit: () => void }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold font-poppins text-white mb-6">Presque terminé ! Comment pouvons-nous vous contacter ?</h2>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-light">Votre adresse email</label>
        <Input
          type="email"
          id="email"
          placeholder="nom@exemple.com"
          value={data.contactEmail}
          onChange={(e) => setData({ ...data, contactEmail: e.target.value })}
          required
        />
        <p className="mt-2 text-xs text-slate-dark">Nous utiliserons cet email pour vous envoyer votre devis et discuter de votre projet.</p>
      </div>
      <div className="mt-8 flex justify-between">
        <Button variant="secondary" onClick={prevStep}>Précédent</Button>
        <Button onClick={handleSubmit} disabled={!data.contactEmail}>Soumettre ma demande</Button>
      </div>
    </div>
  );
};

// --- Composant principal de la page ---

export default function QuotePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    features: [],
    contactEmail: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { projectType, features, contactEmail } = formData;
    const project_details = { projectType, features };

    const { error } = await supabase
      .from('quotes')
      .insert({ client_email: contactEmail, project_details });

    if (error) {
      console.error("Erreur lors de la soumission du devis:", error);
      setError("Une erreur est survenue. Veuillez réessayer.");
      setLoading(false);
    } else {
      router.push('/merci');
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 data={formData} setData={setFormData} nextStep={nextStep} />;
      case 2:
        return <Step2 data={formData} setData={setFormData} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Step3 data={formData} setData={setFormData} prevStep={prevStep} handleSubmit={handleSubmit} />;
      default:
        return <Step1 data={formData} setData={setFormData} nextStep={nextStep} />;
    }
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl font-poppins">
            Devis Instantané
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-dark">
            Répondez à quelques questions pour nous aider à comprendre votre besoin.
          </p>
        </div>

        {/* Barre de progression */}
        <div className="w-full bg-slate-dark/20 rounded-full h-2.5 mb-12">
            <div className="bg-kinetic-cyan h-2.5 rounded-full" style={{ width: `${(step / 3) * 100}%`, transition: 'width 0.3s ease-in-out' }}></div>
        </div>

        <div className="p-8 border-2 border-slate-dark/20 rounded-lg bg-deep-space-blue/30">
          {loading ? <p className="text-center text-white">Envoi en cours...</p> : renderStep()}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}
