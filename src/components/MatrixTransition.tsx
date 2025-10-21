'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MatrixTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const w = (canvas.width = window.innerWidth);
    const h = (canvas.height = window.innerHeight);

    const columns = Math.floor(w / 15); // מספר העמודות
    const drops: number[] = Array(columns).fill(0);

    // פונקציית ציור
    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = '#00ff9f';
      ctx.font = '14px monospace';
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 15, drops[i] * 15);

        // אפקט נפילה מהיר
        if (drops[i] * 15 > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // הפעל אפקט ברגע שהנתיב משתנה
    setVisible(true);

    let frame = 0;
    const animate = () => {
      if (frame < 60) { // ~1 שניה של גשם
        draw();
        frame++;
        requestAnimationFrame(animate);
      } else {
        // העלם את האפקט בהדרגה
        setTimeout(() => setVisible(false), 200);
      }
    };
    animate();

    // ניקוי
    return () => {
      ctx.clearRect(0, 0, w, h);
      setVisible(false);
    };
  }, [pathname]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
