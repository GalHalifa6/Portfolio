'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function IntroAnimation({ children }: { children: React.ReactNode }) {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // אחרי 2.8 שניות — נסתיר את האפקט
    const timer = setTimeout(() => setShowIntro(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* שכבת האנימציה הראשית */}
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, delay: 2.0, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]"
        >
          <motion.img
            src="/images/hello-world.png" // ← שים כאן את התמונה שלך
            alt="Hello World"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1.05, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="w-72 h-auto md:w-96"
          />
        </motion.div>
      )}

      {/* Reveal effect - כמו בסרטון */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.2, delay: 2.0, ease: [0.77, 0, 0.175, 1] }}
        className="fixed top-0 left-0 w-full h-full origin-top bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] z-[999]"
      />

      {/* תוכן האתר בפועל */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2.2, ease: 'easeOut' }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
