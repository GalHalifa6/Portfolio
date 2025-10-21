'use client';
import { useEffect, useRef } from 'react';

export default function MatrixRain({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const columns = Math.floor(w / 16);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = '#00FF80';
      ctx.font = '15px monospace';

      drops.forEach((y, i) => {
        const text = String.fromCharCode(0x30A0 + Math.random() * 96);
        ctx.fillText(text, i * 16, y * 16);
        if (y * 16 > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    let animationFrame: number;
    const animate = () => {
      draw();
      if (active) animationFrame = requestAnimationFrame(animate);
    };

    if (active) animate();

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full z-[9998] transition-opacity duration-700 pointer-events-none ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}
