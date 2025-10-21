'use client';
import { motion } from 'framer-motion';

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
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  // מפרקים את הדף ל"שורות גשם"
  const lines = Array.from({ length: 12 });

  return (
    <div className="w-full min-h-screen overflow-hidden relative">
      {lines.map((_, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={lineVariants}
          initial="hidden"
          animate="visible"
          className="absolute w-full h-[8.5%] bg-gradient-to-b from-[#0f172a]/0 via-[#1e293b]/30 to-[#0f172a]/0 backdrop-blur-[2px]"
          style={{ top: `${i * 8.5}%` }}
        />
      ))}
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
