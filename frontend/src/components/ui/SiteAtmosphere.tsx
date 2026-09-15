'use client';

import { MotionConfig, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { type ReactNode } from 'react';

export default function SiteAtmosphere({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 25, restDelta: 0.001 });
  const y = useTransform(progress, [0, 1], ['0%', '-30%']);

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-atmosphere" aria-hidden="true">
        <motion.div className="atmosphere-light" style={{ y: reduced ? 0 : y }} />
        <div className="atmosphere-grain" />
      </div>
      <motion.div className="reading-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true" />
      {children}
    </MotionConfig>
  );
}
