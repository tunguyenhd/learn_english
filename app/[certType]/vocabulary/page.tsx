'use client';

import { useParams, useRouter } from 'react';
import { Layers, CheckCircle2, Database, Trophy, Target, Star } from 'lucide-react';
import { topicsData, vocabularyMetadata } from '@/lib/data/vocabulary';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType, TopicData } from '@/lib/types';

export default function TopicListPage() {
  const params = useParams<{ certType: string }>();
  const router = useRouter();
  const certType = params.certType as CertType;

  const isIELTS = certType === 'ielts';
  const brandColor = isIELTS ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  // Enrich topics with progress
  const topics = topicsData.map((t, idx) => ({
    id: t.id,
    title: t.title,
    level: t.level || 'beginner',
    words: t.words.length,
    progress: idx === 0 ? 100 : idx === 1 ? 40 : 0
  }));

  // Group by level
  const groupedTopics = {
    beginner: topics.filter(t => t.level === 'beginner'),
    intermediate: topics.filter(t => t.level === 'intermediate'),
    advanced: topics.filter(t => t.level === 'advanced'),
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
    <div key={topic.id} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: '0.5rem' }}>
          <Layers size={20} color={brandColor} />
        </div>
        {topic.progress === 100 && <CheckCircle2 size={24} color="var(--success)" />}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>{topic.title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>{topic.words} words</p>

      <div className="progress-bg" style={{ marginBottom: '1rem', height: '6px' }}>
        <div className="progress-fill" style={{ width: `${topic.progress}%`, background: brandColor }}></div>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button
          className="btn btn-primary"
          style={{ background: brandColor, width: '100%' }}
          onClick={() => router.push(`/${certType}/vocabulary/${topic.id}`)}
        >
          Study Words
        </button>
      </div>
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ paddingBottom: '4rem' }}>
      <BackButton href={`/${certType}/dashboard`} label="Back to Dashboard" />

      <div style={{ marginBottom: '3rem' }}>
        <h1>
          Vocabulary <span className={`text-gradient ${certType}`}>Topics</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Master essential words grouped by proficiency levels.</p>

        {/* JSON Database Badge */}
        {vocabularyMetadata && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.35rem 0.85rem', borderRadius: '1rem', fontSize: '0.85rem', color: brandColor, border: '1px solid var(--glass-border)' }}>
            <Database size={15} />
            <span>Nạp từ <strong>vocabulary.json</strong>: {vocabularyMetadata.totalWords} từ vựng ({vocabularyMetadata.totalTopics} chủ đề)</span>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" style={{ fontSize: '0.9rem' }} onClick={() => router.push(`/${certType}/vocabulary/import`)}>
            📥 Import Từ Vựng
          </button>
          <button className="btn btn-outline" style={{ fontSize: '0.9rem' }} onClick={() => router.push(`/${certType}/practice/flashcard`)}>
            📇 Flashcards
          </button>
          <button className="btn btn-outline" style={{ fontSize: '0.9rem' }} onClick={() => router.push(`/${certType}/practice/fill-blank`)}>
            ✏️ Điền từ
          </button>
          <button className="btn btn-outline" style={{ fontSize: '0.9rem' }} onClick={() => router.push(`/${certType}/practice/matching`)}>
            🔗 Nối từ
          </button>
        </div>
      </div>

      {/* Render Topics Grouped by Level */}
      {(['beginner', 'intermediate', 'advanced'] as const).map(level => {
        const topicsInLevel = groupedTopics[level];
        if (topicsInLevel.length === 0) return null;

        const config = levelConfigs[level];

        return (
          <div key={level} style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ padding: '0.5rem', background: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
                {config.icon}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{config.title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>{config.desc}</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
              {topicsInLevel.map(renderTopicCard)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
