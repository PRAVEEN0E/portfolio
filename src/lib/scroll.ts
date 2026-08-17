import type Lenis from 'lenis';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function scrollToHash(hash: string) {
  const lenis = window.__lenis;
  if (lenis) {
    lenis.scrollTo(hash, { offset: -72 });
  } else {
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  }
}

export function scrollToTop() {
  const lenis = window.__lenis;
  if (lenis) lenis.scrollTo(0);
  else window.scrollTo({ top: 0, behavior: 'smooth' });
}