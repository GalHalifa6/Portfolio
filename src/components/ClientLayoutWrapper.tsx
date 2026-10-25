'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import MatrixMode from '@/components/MatrixMode';
import { MatrixContext } from '@/components/MatrixContext';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-0.5 origin-left bg-accent-strong z-[60]"
    />
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-xl border border-line bg-card/90 backdrop-blur text-fg flex items-center justify-center hover:border-line-strong transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [matrixMode, setMatrixMode] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMatrix = () => {
    if (transitioning) return;
    if (!matrixMode) {
      setTransitioning(true);
      setTimeout(() => {
        setIsMuted(false);
        setMatrixMode(true);
        setTransitioning(false);
      }, 1200);
    } else {
      setMatrixMode(false);
    }
  };

  // 🎶 ניגון מוזיקה במצב מטריקס
  useEffect(() => {
    document.documentElement.classList.toggle('matrix', matrixMode);
    if (!matrixMode) return;

    const audio = new Audio('/sounds/matrix-enter.mp3');
    audio.volume = 0.4;
    audio.loop = true;
    audio.play().catch(() => {});
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.currentTime = 0;
      audioRef.current = null;
    };
  }, [matrixMode]);

  // 🔇 השתקה
  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  return (
    <MatrixContext.Provider value={{ matrixMode, isMuted, toggleMatrix, toggleMute }}>
      <MotionConfig reducedMotion="user">
        {/* רקע רגיל */}
        {!matrixMode && (
          <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 dot-grid" />
            <div className="absolute left-1/2 -top-48 h-[640px] w-[min(1000px,140vw)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--glow),transparent)]" />
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
              transition={{ duration: 0.6 }}
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black px-6"
            >
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-lg md:text-2xl text-[#00ff9f] tracking-wide"
              >
                &gt; initializing matrix mode<span className="animate-blink">_</span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        <ScrollProgress />

        {/* תוכן האתר */}
        <div className="relative z-10 flex min-h-screen flex-col">
          <NavBar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        <BackToTop />
      </MotionConfig>
    </MatrixContext.Provider>
  );
}
