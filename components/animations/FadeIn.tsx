'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

type FadeInProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
};

/**
 * Un composant wrapper qui applique une animation de fondu et de translation
 * vers le haut lorsque l'élément entre dans le viewport.
 * Utilise framer-motion pour l'animation.
 */
export function FadeIn({
  children,
  className,
  delay = 0.2,
  duration = 0.5,
  yOffset = 20,
}: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{
        delay,
        duration,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
