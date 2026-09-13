'use client';

import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { BackButton } from '@/components/layout/BackButton';
import { AudioButton } from '@/components/ui/AudioButton';
import type { TopicData } from '@/lib/types';

interface Props {
  certType: string;
  topicData: TopicData;
}

export default function VocabularyStudyClient({ certType, topicData }: Props) {
  const router = useRouter();
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  return (
    <div className="animate-fade-in" style={{ display: 'flex', gap: '2rem', maxWidth: '1100px', margin: '0 auto', paddingBottom: '4rem', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, maxWidth: '800px', width: '100%' }}>
        <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.9rem', color: brandColor, textTransform: 'uppercase', fontWeight: 700 }}>
              {topicData.title}
            </span>
            <h2 style={{ margin: '0.25rem 0' }}>Study Words ({topicData.words.length} words)</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Review the vocabulary and pronunciation before practicing.</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {topicData.words.map((item) => (
            <div key={item.id} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
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

        {/* Mobile fallback buttons (hidden on md and up if we had full tailwind class control, but here we just show it at bottom for smaller screens) */}
        <div className="md:hidden" style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            style={{ background: brandColor, padding: '1rem 2rem', fontSize: '1.1rem' }}
            onClick={() => router.push(`/${certType}/practice/matching`)}
          >
            Nối từ (Matching Game)
          </button>
          <button
            className="btn btn-outline"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
            onClick={() => router.push(`/${certType}/practice/fill-blank`)}
          >
            Điền từ (Fill in the Blanks)
          </button>
        </div>
      </div>

      {/* Sticky Sidebar for Desktop */}
      <div className="hidden md:flex" style={{ position: 'sticky', top: '6rem', width: '280px', flexDirection: 'column', gap: '1rem', flexShrink: 0 }}>
        <div className="card glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
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
    </div>
  );
}
