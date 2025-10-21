'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function MatrixTransition() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // כל מעבר עמוד מפעיל את האנימציה
    setIsActive(true);

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = Array(300).fill(0);
    const fontSize = 14;

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff9f';
      ctx.font = `${fontSize}px monospace`;

      letters.forEach((y, i) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        const x = i * fontSize;
        ctx.fillText(text, x, y);
        letters[i] = y > canvas.height + Math.random() * 10000 ? 0 : y + fontSize;
      });
    };

    const interval = setInterval(draw, 50);

    // עצירה חלקה אחרי 2.5 שניות
    const stop = setTimeout(() => {
      clearInterval(interval);
      setIsActive(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(stop);
    };
  }, [pathname]); // ← כל שינוי נתיב יפעיל מחדש

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-[9999] pointer-events-none transition-opacity duration-700 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
