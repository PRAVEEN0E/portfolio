import type { Variants } from 'framer-motion';

export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DUR = {
  fast: 0.18,
  standard: 0.3,
  reveal: 0.6,
  hero: 0.8,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.reveal, ease: EASE } },
};

export const maskLine: Variants = {
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: DUR.hero, ease: EASE } },
};

export const fadeUpAt = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.reveal, delay, ease: EASE } },
});

export const lineAt = (delay: number): Variants => ({
  hidden: { y: '115%' },
  visible: { y: '0%', transition: { duration: DUR.hero, delay, ease: EASE } },
});

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.35 } },
};
