import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import IntroAnimation from '@/components/IntroAnimation';
import { Analytics } from '@vercel/analytics/react'; // ✅ שים לב: react במקום next

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
        {/* אפקט פתיחה */}
        <IntroAnimation>
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </IntroAnimation>

        {/* ✅ כאן מוסיפים את אנליטיקס */}
        <Analytics />
      </body>
    </html>
  );
}
