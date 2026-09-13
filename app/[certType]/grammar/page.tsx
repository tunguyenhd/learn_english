'use client';

import { useParams, useRouter } from 'next/navigation';
import { BookMarked, AlignLeft, ArrowRight } from 'lucide-react';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType } from '@/lib/types';

export default function GrammarListPage() {
  const params = useParams<{ certType: string }>();
  const router = useRouter();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const modules = [
    {
      id: 'tenses',
      title: 'English Tenses',
      desc: 'Công thức và cách dùng 12 thì cơ bản trong tiếng Anh.',
      icon: <AlignLeft size={32} color={brandColor} />,
      path: `/${certType}/grammar/tenses`
    },
    {
      id: 'verbs',
      title: 'Irregular Verbs',
      desc: 'Bảng tra cứu động từ bất quy tắc có công cụ tìm kiếm thông minh.',
      icon: <BookMarked size={32} color={brandColor} />,
      path: `/${certType}/grammar/verbs`
    }
  ];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <BackButton href={`/${certType}/dashboard`} label="Back to Dashboard" />

      <div style={{ marginBottom: '2rem' }}>
        <h2>Grammar <span className={`text-gradient ${certType}`}>Library</span></h2>
        <p style={{ color: 'var(--text-secondary)' }}>Nắm vững ngữ pháp để nâng cao điểm số của bạn.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {modules.map(mod => (
          <div key={mod.id} className="card glass-panel" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => router.push(mod.path)}>
            <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: '50%', width: 'fit-content', marginBottom: '1rem' }}>
              {mod.icon}
            </div>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>{mod.title}</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>{mod.desc}</p>
            <button className="btn btn-primary" style={{ background: brandColor, marginTop: 'auto', width: '100%' }}>
              Explore <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
