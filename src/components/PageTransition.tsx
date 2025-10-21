'use client';
import { motion } from 'framer-motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -600, scale: 0.95 }}   // מתחיל רחוק מלמעלה
      animate={{ opacity: 1, y: 0, scale: 1 }}         // “נופל” פנימה ומתרכך
      exit={{ opacity: 0, y: 300, scale: 0.98 }}       // יוצא למטה בעדינות
      transition={{
        duration: 1.2,                // איטי יותר (1.2 שניות)
        ease: [0.16, 1, 0.3, 1],      // cubic-bezier חלק כמו נפילה אמיתית
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
