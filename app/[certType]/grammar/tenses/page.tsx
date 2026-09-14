'use client';

import { useParams } from 'next/navigation';
import { tensesData } from '@/lib/data/grammar';
import { BackButton } from '@/components/layout/BackButton';
import { Star, Target, Trophy } from 'lucide-react';
import type { CertType } from '@/lib/types';

export default function TensesPage() {
  const params = useParams<{ certType: string }>();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';
  const isIELTS = certType === 'ielts';

  const groupedTenses = {
    beginner: tensesData.filter(t => t.level === 'beginner'),
    intermediate: tensesData.filter(t => t.level === 'intermediate'),
    advanced: tensesData.filter(t => t.level === 'advanced'),
  };

  const levelConfigs = {
    beginner: {
      title: 'Beginner Level',
      desc: isIELTS ? 'Band 0 - 4.5' : 'Toeic 0 - 350',
      icon: <Star size={24} color="var(--brand-toeic)" />
    },
    intermediate: {
      title: 'Intermediate Level',
      desc: isIELTS ? 'Band 5.0 - 6.0' : 'Toeic 350 - 650',
      icon: <Target size={24} color="var(--brand-ielts)" />
    },
    advanced: {
      title: 'Advanced Level',
      desc: isIELTS ? 'Band 6.5 - 8.0+' : 'Toeic 650 - 990',
      icon: <Trophy size={24} color="var(--accent-warning)" />
    }
  };

  const renderTenseCard = (tense: any) => (
    <div key={tense.id} className="card glass-panel" style={{ padding: '2rem' }}>
      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: brandColor }}>{tense.name}</h3>

      <div style={{ marginBottom: '1.25rem' }}>
        <strong style={{ color: 'var(--text-primary)' }}>Cách dùng:</strong>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: '1.6' }}>{tense.usage}</p>
      </div>

      {tense.signalWords && (
        <div style={{ marginBottom: '1.25rem', padding: '0.75rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--brand-toeic)' }}>
          <strong>Dấu hiệu nhận biết:</strong> <span style={{ color: 'var(--text-secondary)' }}>{tense.signalWords}</span>
        </div>
      )}

      <div style={{ marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <strong>Công thức:</strong>
        {tense.formulas.map((f: any, i: number) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
            <span style={{ fontWeight: 600 }}>{f.type}</span>
            <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{f.formula}</span>
          </div>
        ))}
      </div>

      <div>
        <strong>Ví dụ minh họa:</strong>
        <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: `3px solid ${brandColor}`, marginTop: '0.5rem' }}>
          &quot;{tense.example}&quot;
        </div>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <BackButton href={`/${certType}/grammar`} label="Back to Grammar" />

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: brandColor }}>12 English Tenses</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Nắm vững 12 thì Tiếng Anh được chia theo từng cấp độ học.</p>
      </div>

      {(['beginner', 'intermediate', 'advanced'] as const).map(level => {
        const tenses = groupedTenses[level];
        if (tenses.length === 0) return null;

        const config = levelConfigs[level];

        return (
          <div key={level} style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                {config.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{config.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{config.desc}</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {tenses.map(renderTenseCard)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
