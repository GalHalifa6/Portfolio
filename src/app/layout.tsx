import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gal Halifa — Software Engineer',
  description: 'Projects, case studies, and contact.',
  openGraph: {
    title: 'Gal Halifa — Software Engineer',
    description: 'Projects, case studies, and contact.',
    type: 'website',
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased relative`}>
        {/* 🌈 Dynamic gradient background for the entire site */}
        <div className="fixed inset-0 -z-10 animate-gradientMove bg-[length:400%_400%] bg-gradient-to-br from-indigo-700 via-purple-700 to-teal-600 opacity-30"></div>
        
        {/* ✨ Soft glowing blobs for depth */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-10%] left-[5%] w-[40vw] h-[40vw] bg-purple-500/20 rounded-full blur-[120px] animate-pulse-slow"></div>
          <div className="absolute bottom-[-10%] right-[5%] w-[35vw] h-[35vw] bg-teal-400/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
        </div>

        {children}
      </body>
    </html>
  );
}
