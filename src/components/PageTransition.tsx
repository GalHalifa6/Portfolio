'use client';
import { motion, easeOut } from 'framer-motion'; // 👈 נייבא את פונקציית easing הנכונה

const lineVariants = {
  hidden: (i: number) => ({
    y: -100 * (i + 1),
    opacity: 0,
  }),
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: easeOut, // 👈 שימוש נכון בפונקציה ולא במחרוזת
    },
  }),
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const lines = Array.from({ length: 12 });

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      {/* שכבות הגשם */}
      {lines.map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="absolute w-full h-[8.5%] bg-gradient-to-b from-transparent via-[rgba(0,200,255,0.08)] to-transparent backdrop-blur-[2px]"
          style={{ top: `${i * 8.5}%` }}
        />
      ))}

      {/* תוכן האתר נבנה בהדרגה אחרי הגשם */}
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          delay: 0.8,
          ease: easeOut, // 👈 גם כאן מעודכן
        }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 1.4,
            ease: easeOut, // 👈 וגם כאן
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
