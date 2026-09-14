'use client';

import { useParams } from 'next/navigation';
import { grammarTopicsData } from '@/lib/data/grammar';
import { BackButton } from '@/components/layout/BackButton';
import { Star, Target, Trophy } from 'lucide-react';
import type { CertType } from '@/lib/types';

export default function GrammarTopicsPage() {
  const params = useParams<{ certType: string }>();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';
  const isIELTS = certType === 'ielts';

  const groupedTopics = {
    beginner: grammarTopicsData.filter(t => t.level === 'beginner'),
    intermediate: grammarTopicsData.filter(t => t.level === 'intermediate'),
    advanced: grammarTopicsData.filter(t => t.level === 'advanced'),
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

  const renderTopicCard = (topic: any) => (
    <div key={topic.id} className="card glass-panel" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1.4rem', color: brandColor }}>{topic.title} ({topic.titleVi})</h3>
      </div>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{topic.desc}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {topic.rules.map((rule: any, idx: number) => (
          <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-sm)' }}>
            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>• {rule.heading}</h4>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.95rem' }}>{rule.detail}</p>
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '0.75rem', borderRadius: '4px', fontStyle: 'italic', borderLeft: `3px solid ${brandColor}`, fontSize: '0.9rem' }}>
              Ví dụ: {rule.example}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <BackButton href={`/${certType}/grammar`} label="Back to Grammar" />

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: brandColor }}>Grammar Topics</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Các chuyên đề ngữ pháp trọng điểm được chia theo cấp độ.</p>
      </div>

      {(['beginner', 'intermediate', 'advanced'] as const).map(level => {
        const topics = groupedTopics[level];
        if (topics.length === 0) return null;

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
              {topics.map(renderTopicCard)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
