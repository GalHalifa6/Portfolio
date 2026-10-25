import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientLayoutWrapper from '@/components/ClientLayoutWrapper';
import IntroAnimation from '@/components/IntroAnimation';
import { Analytics } from '@vercel/analytics/react'; // ✅ שים לב: react במקום next

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' });

export const metadata: Metadata = {
  title: 'Gal Halifa — Software Engineer',
  description:
    'Software Engineer building production backend services, RAG pipelines, and full-stack applications with Python, Java, Spring Boot, and AWS.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
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
