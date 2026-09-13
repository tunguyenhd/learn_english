import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
});

import type { Viewport } from 'next';

export const viewport: Viewport = {
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  title: 'EngMastery - Nền tảng học tiếng Anh cá nhân hóa',
  description: 'Website học tiếng Anh IELTS và TOEIC với từ vựng, ngữ pháp và bài tập thực hành.',
  keywords: ['IELTS', 'TOEIC', 'English learning', 'vocabulary', 'grammar'],
  manifest: '/learn_english/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'EngMastery',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.variable} ${inter.className}`}>
        <div className="app-container animate-fade-in">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
