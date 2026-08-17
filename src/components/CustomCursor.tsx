import { useEffect, useRef, useState } from 'react';

const DOT = 8;
const RING = 28;
const PILL_OFFSET = 12;

export default function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (media.matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const pill = pillRef.current;
    if (!root || !dot || !ring || !pill) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let dx = tx;
    let dy = ty;
    let rx = tx;
    let ry = ty;
    let px = tx;
    let py = ty;
    let lastMove = performance.now();
    let rafId = 0;
    let state = 'default';

    const applyState = (next: string) => {
      if (next === state) return;
      state = next;
      root.dataset.state = next;
    };

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      lastMove = performance.now();
      const target = e.target as Element | null;
      const interactive = target?.closest('a, button, [data-cursor]');
      applyState(interactive ? (interactive as HTMLElement).dataset.cursor ?? 'link' : 'default');
    };

    const onLeave = () => root.dataset.visible = 'false';
    const onEnter = () => root.dataset.visible = 'true';

    const loop = () => {
      const now = performance.now();
      dx += (tx - dx) * 0.55;
      dy += (ty - dy) * 0.55;
      rx += (tx - rx) * 0.22;
      ry += (ty - ry) * 0.22;
      px += (tx - px) * 0.45;
      py += (ty - py) * 0.45;
      dot.style.setProperty('--dx', `${dx - DOT / 2}px`);
      dot.style.setProperty('--dy', `${dy - DOT / 2}px`);
      ring.style.setProperty('--rx', `${rx - RING / 2}px`);
      ring.style.setProperty('--ry', `${ry - RING / 2}px`);
      pill.style.setProperty('--px', `${px + PILL_OFFSET}px`);
      pill.style.setProperty('--py', `${py + PILL_OFFSET}px`);
      ring.classList.toggle('is-idle', now - lastMove > 1000);
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
    };
  }, [enabled]);

  return (
    <div
      ref={rootRef}
      aria-hidden
      data-cursor-root
      data-state="default"
      data-visible="true"
      className="pointer-events-none fixed left-0 top-0 z-[99999]"
      style={{ opacity: enabled ? 1 : 0 }}
    >
      <div ref={ringRef} data-cursor-ring />
      <div ref={pillRef} data-cursor-pill>
        VIEW
        <span className="cursor-pill-arrow" aria-hidden>↗</span>
      </div>
      <div ref={dotRef} data-cursor-dot />
    </div>
  );
}