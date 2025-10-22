'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MatrixMode from '@/components/MatrixMode';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [matrixMode, setMatrixMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleToggle = () => {
    if (!matrixMode) {
      setTransitioning(true);
      setTimeout(() => {
        setMatrixMode(true);
        setTransitioning(false);
      }, 1200);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setMatrixMode(false);
    }
  };

  // 🎶 ניגון מוזיקה במצב מטריקס
  useEffect(() => {
    if (matrixMode) {
      const audio = new Audio('/sounds/matrix-enter.mp3');
      audio.volume = 0.4;
      audio.loop = true;
      audio.play();
      audioRef.current = audio;
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [matrixMode]);

  // 🔇 השתקה
  const handleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
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

      {/* מצב מטריקס */}
      <AnimatePresence>{matrixMode && <MatrixMode />}</AnimatePresence>

      {/* אנימציית מעבר */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-green-400 tracking-widest"
            >
              Initializing Matrix Mode...
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎛️ כפתורי שליטה במובייל */}
      <div
        className="fixed top-[14px] left-[120px] flex gap-2 items-center md:hidden z-[9999]"
      >
        {/* כפתור מטריקס קטן */}
        <button
          onClick={handleToggle}
          className={`w-7 h-7 flex items-center justify-center rounded-md text-[10px] font-semibold transition-all duration-300 shadow-md
            ${
              matrixMode
                ? 'bg-green-500/10 border border-green-400 text-green-300 hover:bg-green-500/20'
                : 'bg-cyan-500/10 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30'
            }`}
        >
          {matrixMode ? '☠' : '🟩'}
        </button>

        {/* כפתור השתקה קטן */}
        {matrixMode && (
          <button
            onClick={handleMute}
            className="w-7 h-7 flex items-center justify-center rounded-md text-[10px] font-semibold bg-green-500/10 border border-green-400 text-green-300 hover:bg-green-500/20"
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        )}
      </div>

      {/* כפתורי דסקטופ */}
      <button
        onClick={handleToggle}
        className={`hidden md:flex fixed top-4 right-5 z-[9999] px-3 py-2 rounded-md text-xs font-semibold items-center gap-2 transition-all duration-500 shadow-md
          ${
            matrixMode
              ? 'bg-green-500/10 border border-green-400 text-green-300 hover:bg-green-500/20'
              : 'bg-cyan-500/10 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30'
          }`}
      >
        {matrixMode ? (
          <>
            <span className="animate-pulse text-green-400">☠</span>
            Exit
          </>
        ) : (
          <>
            <span className="animate-pulse">🟩</span>
            Matrix
          </>
        )}
      </button>

      {matrixMode && (
        <button
          onClick={handleMute}
          className="hidden md:flex fixed top-4 left-5 z-[9999] px-3 py-2 rounded-md text-xs font-semibold transition-all duration-500 shadow-md bg-green-500/10 border border-green-400 text-green-300 hover:bg-green-500/20"
        >
          {isMuted ? '🔇 Unmute' : '🔊 Mute'}
        </button>
      )}

      {/* תוכן האתר */}
      <div
        className={`relative z-10 transition-all duration-700 ${
          matrixMode ? 'text-green-400' : ''
        }`}
      >
        {children}
      </div>
    </>
  );
}
