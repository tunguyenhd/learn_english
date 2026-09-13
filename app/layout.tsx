import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'EngMastery - Nền tảng học tiếng Anh cá nhân hóa',
  description: 'Học IELTS và TOEIC hiệu quả với 1,000+ từ vựng, ngữ pháp, bài tập thực hành và theo dõi tiến độ.',
  keywords: ['IELTS', 'TOEIC', 'English learning', 'vocabulary', 'grammar'],
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
