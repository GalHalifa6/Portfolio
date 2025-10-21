'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixMode from '@/components/MatrixMode';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [matrixMode, setMatrixMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const handleToggle = () => {
    if (!matrixMode) {
      setTransitioning(true);
      setTimeout(() => {
        setMatrixMode(true);
        setTransitioning(false);
      }, 1500);
    } else {
      setMatrixMode(false);
    }
  };

  return (
    <>
      {/* רקע רגיל */}
      {!matrixMode && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 animate-gradientFlow bg-[length:200%_200%] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
        </div>
      )}

      {/* אפקט מטריקס */}
      <AnimatePresence>{matrixMode && <MatrixMode />}</AnimatePresence>

      {/* אפקט פתיחה קולנועי */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-4xl md:text-6xl font-bold text-green-400 tracking-widest"
            >
              Initializing Matrix Mode...
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* כפתור הפעלה */}
      <button
        onClick={handleToggle}
        className={`fixed top-4 right-6 z-[9999] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 shadow-lg ${
          matrixMode
            ? 'bg-green-500/20 border border-green-400 text-green-300 hover:bg-green-500/40'
            : 'bg-cyan-500/10 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30'
        }`}
      >
        {matrixMode ? 'Exit Matrix Mode' : '🟩 Enter Matrix Mode'}
      </button>

      {/* תוכן האתר */}
      <div className={`relative z-10 transition-all duration-700 ${matrixMode ? 'text-green-400' : ''}`}>
        {children}
      </div>
    </>
  );
}
