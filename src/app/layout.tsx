'use client';
import { useState } from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MatrixMode from '@/components/MatrixMode';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gal Halifa — Software Engineer',
  description: 'Portfolio & Projects',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [matrixMode, setMatrixMode] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased relative transition-all duration-700 ${
          matrixMode ? 'bg-black text-green-400' : ''
        }`}
      >
        {/* רקע דינמי רגיל */}
        {!matrixMode && (
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 animate-gradientFlow bg-[length:200%_200%] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
          </div>
        )}

        {/* מצב מטריקס */}
        {matrixMode && <MatrixMode />}

        {/* כפתור החלפה */}
        <button
          onClick={() => setMatrixMode(!matrixMode)}
          className={`fixed top-4 right-6 z-[9999] px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-500 shadow-lg ${
            matrixMode
              ? 'bg-green-500/20 border border-green-400 text-green-300 hover:bg-green-500/40'
              : 'bg-cyan-500/10 border border-cyan-400 text-cyan-300 hover:bg-cyan-500/30'
          }`}
        >
          {matrixMode ? 'Exit Matrix Mode' : '🟩 Enter Matrix Mode'}
        </button>

        {/* תוכן האתר */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
