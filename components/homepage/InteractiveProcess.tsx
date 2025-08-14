'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '@/components/animations/FadeIn';

const steps = [
  {
    name: 'Devis Instantané',
    description: 'Décrivez votre projet et recevez une estimation budgétaire en quelques minutes.',
    details: 'Notre algorithme analyse vos réponses pour vous fournir une fourchette de prix et de délais, vous permettant de prendre une décision éclairée sans attendre.'
  },
  {
    name: 'Consultation & Planification',
    description: 'Nous affinons ensemble les détails. Un chef de projet vous est dédié et un planning est établi.',
    details: 'Cette étape cruciale nous permet de définir le périmètre exact, de prioriser les fonctionnalités et de vous présenter une proposition commerciale et technique détaillée.'
  },
  {
    name: 'Développement & Suivi',
    description: 'Suivez l\'avancement en temps réel sur votre tableau de bord et participez aux sprints.',
    details: 'Vous avez un accès complet à notre outil de gestion de projet. Vous pouvez voir les tâches en cours, celles à venir, et communiquer directement avec l\'équipe.'
  },
  {
    name: 'Validation & Tests',
    description: 'Nous testons rigoureusement l\'application et vous validez chaque fonctionnalité.',
    details: 'Nos tests couvrent tous les aspects : fonctionnalité, performance, sécurité. Votre validation finale garantit que le produit correspond parfaitement à vos attentes.'
  },
  {
    name: 'Déploiement & Maintenance',
    description: 'Votre application est mise en ligne et nous assurons sa maintenance.',
    details: 'Nous gérons le déploiement sur une infrastructure cloud robuste et évolutive. Des contrats de maintenance sont disponibles pour assurer la pérennité de votre application.'
  },
];

export function InteractiveProcess() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32">
      <FadeIn>
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
        </div>
      </FadeIn>
      <div className="container mx-auto max-w-7xl px-6 lg:px-8 mt-16">
        <div
          className="grid grid-cols-1 md:grid-cols-5 gap-x-8"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {steps.map((step, index) => (
            <div
              key={step.name}
              className="relative text-center"
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <FadeIn delay={0.2 * index}>
                <div className="flex flex-col items-center gap-y-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-kinetic-cyan/30 bg-deep-space-blue text-kinetic-cyan font-bold text-lg">
                    {index + 1}
                  </span>
                  <h3 className="text-base font-semibold leading-7 text-white">{step.name}</h3>
                </div>
                <p className="mt-2 text-base leading-7 text-slate-dark">{step.description}</p>

                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-64 p-4 bg-slate-800 border border-slate-700 rounded-lg mt-4 z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      layoutId="hovered-step"
                    >
                      <p className="text-sm text-slate-light text-left">{step.details}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
