import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from './Reveal';

interface RevealMediaProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function RevealMedia({ children, className, delay = 0 }: RevealMediaProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ clipPath: reduce ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)' }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 1, delay, ease: EASE }}
    >
      <motion.div
        initial={{ scale: reduce ? 1 : 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: '-70px' }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}