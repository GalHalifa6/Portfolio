'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MatrixRain from './MatrixRain';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [showRain, setShowRain] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowRain(false), 1800); // הגשם נגמר אחרי ~1.8 שניות
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <MatrixRain active={showRain} />

      <motion.div
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: showRain ? 0 : 1, y: showRain ? -200 : 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
        className="w-full min-h-screen"
      >
        {children}
      </motion.div>
    </>
  );
}
