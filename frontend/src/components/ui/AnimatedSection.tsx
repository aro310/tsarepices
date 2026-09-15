'use client';
import { useEffect, useRef, type ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/** Observe a stationary wrapper so the reveal cannot retrigger its own observer. */
export default function AnimatedSection({ children, className = '', delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const content = contentRef.current;
    if (!element || !content) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation: Animation | undefined;
    let lastStarted = -Infinity;
    let wasVisible = false;
    const observer = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting;
      const entering = visible && !wasVisible;
      wasVisible = visible;
      // Finish the current transition, and ignore quick boundary oscillations.
      if (!entering || preference.matches || performance.now() - lastStarted < 2200) return;
      lastStarted = performance.now();
      animation?.cancel();
      animation = content.animate(
        [{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: 1500, delay: Math.min(Math.max(delay, 0), 0.3) * 1000, easing: 'cubic-bezier(.25,.46,.45,.94)', fill: 'backwards' },
      );
    }, { threshold: 0, rootMargin: '0px' });
    const stop = () => { if (preference.matches) animation?.cancel(); };
    preference.addEventListener('change', stop);
    observer.observe(element);
    return () => { observer.disconnect(); animation?.cancel(); preference.removeEventListener('change', stop); };
  }, [delay]);

  return <div ref={ref} className={className}><div ref={contentRef} className="h-full">{children}</div></div>;
}
