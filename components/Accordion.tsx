'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type AccordionProps = {
  title: string;
  children: React.ReactNode;
};

/**
 * Un composant "accordéon" réutilisable pour les sections de type FAQ.
 * Gère son propre état d'ouverture/fermeture et anime la transition.
 */
export function Accordion({ title, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-dark/20 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-slate-light">{title}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          {/* Plus Icon SVG that transforms into a cross */}
          <svg
            className="h-6 w-6 text-kinetic-cyan"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.section
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-4 text-base leading-7 text-slate-dark">{children}</div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
