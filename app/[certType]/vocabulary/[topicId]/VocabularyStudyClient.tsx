'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { BackButton } from '@/components/layout/BackButton';
import { AudioButton } from '@/components/ui/AudioButton';
import type { TopicData } from '@/lib/types';

const BATCH_SIZE = 50;

interface Props {
  certType: string;
  topicData: TopicData;
}

export default function VocabularyStudyClient({ certType, topicData }: Props) {
  const router = useRouter();
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const visibleWords = topicData.words.slice(0, visibleCount);
  const hasMore = visibleCount < topicData.words.length;

  // IntersectionObserver for infinite scroll
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelCallback = useCallback((node: HTMLDivElement | null) => {
    if (observerRef.current) observerRef.current.disconnect();
    if (!node) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + BATCH_SIZE);
        }
      },
      { rootMargin: '300px' }
    );
    observerRef.current.observe(node);
  }, []);

  return (
    <div className="animate-fade-in flex flex-col md:flex-row gap-8 max-w-[1100px] mx-auto pb-16 items-start">
      <div className="w-full flex-1 max-w-[800px]">
        <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />

        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <span style={{ fontSize: '0.9rem', color: brandColor, textTransform: 'uppercase', fontWeight: 700 }}>
              {topicData.title}
            </span>
            <h2 style={{ margin: '0.25rem 0' }}>Study Words ({topicData.words.length} words)</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Review the vocabulary and pronunciation before practicing.</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {visibleWords.map((item) => (
            <div key={item.id} className="card glass-panel flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-baseline gap-4">
                    <h3 style={{ fontSize: '1.5rem', margin: 0, color: brandColor }}>{item.word}</h3>
                    <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>({item.pos})</span>
                  </div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem', fontFamily: 'monospace' }}>
                    {item.phonetic}
                  </div>
                </div>
                <AudioButton word={item.word} brandColor={brandColor} />
              </div>

              <div>
                <div style={{ fontWeight: 600, marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                  {item.definitionVi}
                </div>
                <div style={{ padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.5rem', fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: `3px solid ${brandColor}`, lineHeight: '1.6' }}>
                  &quot;{item.example}&quot;
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sentinel for infinite scroll */}
        {hasMore && (
          <div
            ref={sentinelCallback}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '2rem',
              color: 'var(--text-muted)',
              fontSize: '0.9rem',
              gap: '0.5rem',
            }}
          >
            <div style={{
              width: '1.25rem',
              height: '1.25rem',
              border: `2px solid ${brandColor}`,
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }} />
            Loading more...
          </div>
        )}

        {!hasMore && visibleWords.length > 0 && (
          <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Hiển thị {visibleWords.length}/{topicData.words.length} từ vựng
          </div>
        )}
      </div>

      {/* Sticky Sidebar */}
      <div className="flex flex-col gap-4 w-full md:w-[250px] shrink-0 md:sticky md:top-24">
        <div className="card glass-panel p-6 text-center">
          <h3 style={{ margin: '0 0 0.5rem 0', color: brandColor }}>Practice Mode</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Ready to test your memory? Choose a game to practice these words.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              className="btn btn-primary"
              style={{ background: brandColor, width: '100%', padding: '0.85rem' }}
              onClick={() => router.push(`/${certType}/practice/matching`)}
            >
              Nối từ (Matching)
            </button>
            <button
              className="btn btn-outline"
              style={{ width: '100%', padding: '0.85rem' }}
              onClick={() => router.push(`/${certType}/practice/fill-blank`)}
            >
              Điền từ (Fill Blank)
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
