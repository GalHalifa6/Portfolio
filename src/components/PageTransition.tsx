'use client';
import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -800, scale: 0.8, rotateX: 15 }}   // נופל ומוטה קדימה
      animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}          // נוחת ומתיישר
    exit={{ opacity: 0, y: 300, scale: 0.95, rotateX: -15 }}
      transition={{
        duration: 1.4,                 // זמן כולל לאנימציה
        ease: [0.16, 1, 0.3, 1],       // תנועה חלקה מאוד (cubic-bezier)
      }}
      className="w-full min-h-screen origin-top"
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200,
      }}
    >
      {children}
    </motion.div>
  );
}
