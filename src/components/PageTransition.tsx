'use client';
import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -200 }}     // מתחיל גבוה ובלתי נראה
      animate={{ opacity: 1, y: 0 }}        // “נופל” למקום
      exit={{ opacity: 0, y: 100 }}         // יוצא למטה כשעוברים דף
      transition={{
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],        // אנימציה רכה
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
