// IntroAnimation.tsx
'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { profile } from '@/data/profile';

const INTRO_MS = 1400;

export default function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), INTRO_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6 bg-bg"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="w-14 h-14 rounded-2xl border border-line-strong bg-fg/5 flex items-center justify-center font-mono text-lg font-bold text-fg"
            >
              {profile.initials}
            </motion.span>
            <div className="w-36 h-px bg-line overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: INTRO_MS / 1000 - 0.2, ease: 'easeInOut' }}
                className="h-full origin-left bg-accent-strong"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* תוכן האתר */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </>
  );
}
