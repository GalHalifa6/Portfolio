import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import PageTransition from '@/components/PageTransition'; // ← זה הקובץ שלך

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gal Halifa — Software Engineer',
  description: 'Portfolio & Projects',
  openGraph: {
    title: 'Gal Halifa — Software Engineer',
    description: 'Portfolio & Projects',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased relative`}>
        {/* רקע דינמי עם גרדיאנטים */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 animate-gradientFlow bg-[length:200%_200%] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]"></div>
          <div className="absolute top-[10%] left-[15%] w-[600px] h-[600px] bg-fuchsia-500/20 blur-[120px] rounded-full animate-pulse-slow"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-cyan-500/20 blur-[150px] rounded-full animate-pulse-slow delay-1000"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none"></div>
        </div>

        {/* עוטף את התוכן באפקט הנפילה */}
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}

