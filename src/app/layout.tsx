import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import IntroAnimation from '@/components/IntroAnimation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gal Halifa — Software Engineer',
  description: 'Portfolio & Projects',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased relative`}>
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 animate-gradientFlow bg-[length:200%_200%] bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
        </div>

        {/* אפקט פתיחה קולנועי */}
        <IntroAnimation>{children}</IntroAnimation>
      </body>
    </html>
  );
}
