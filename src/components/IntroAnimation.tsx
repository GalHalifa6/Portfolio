// IntroAnimation.tsx
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.2, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
        >
          {/* 👇 פה מחליפים את ה-h1 */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0.8, 1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.3, 0.8, 1],
              ease: 'easeInOut',
            }}
            className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.5)]"
          >
            Hello, World
          </motion.h1>
        </motion.div>
      )}

      {/* אפקט וילון */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.1, delay: 2.0, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 left-0 w-full h-full origin-top bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] z-[999]"
      />

      {/* תוכן האתר */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.4, ease: 'easeOut' }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
