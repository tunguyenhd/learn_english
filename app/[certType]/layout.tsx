import type { Metadata } from 'next';

export function generateStaticParams() {
  return [
    { certType: 'ielts' },
    { certType: 'toeic' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ certType: string }> }): Promise<Metadata> {
  const { certType } = await params;
  const title = certType === 'ielts' ? 'IELTS Mastery' : 'TOEIC Mastery';
  return {
    title: `${title} | EngMastery`,
    description: `Học ${certType.toUpperCase()} hiệu quả với từ vựng, ngữ pháp và bài tập thực hành.`,
  };
}

export default function CertLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
