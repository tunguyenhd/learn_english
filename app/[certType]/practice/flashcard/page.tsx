'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { topicsData } from '@/lib/data/vocabulary';
import {
  generateFlashcards,
  prioritizeFlashcards,
  markFlashcard,
  loadFlashcardProgress,
  type FlashcardItem,
  type FlashcardProgress,
} from '@/lib/generators/flashcardGenerator';
import { AudioButton } from '@/components/ui/AudioButton';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType } from '@/lib/types';

export default function FlashcardPage() {
  const params = useParams<{ certType: string }>();
  const router = useRouter();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [cards, setCards] = useState<FlashcardItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState<FlashcardProgress>({});
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  const allWords = topicsData.flatMap(t => t.words);

  const startSession = (topicId: number | 'all') => {
    const words = topicId === 'all'
      ? allWords
      : topicsData.find(t => t.id === topicId)?.words || [];

    const generated = generateFlashcards(words, true);
    const savedProgress = loadFlashcardProgress(certType);
    const sorted = prioritizeFlashcards(generated, savedProgress);

    setCards(sorted);
    setProgress(savedProgress);
    setSelectedTopicId(topicId === 'all' ? -1 : topicId);
    setCurrentIndex(0);
    setIsFlipped(false);
    setKnownCount(0);
    setUnknownCount(0);
  };

  const handleMark = (known: boolean) => {
    const card = cards[currentIndex];
    const updated = markFlashcard(certType, card.id, known);
    setProgress(updated);
    if (known) setKnownCount(k => k + 1);
    else setUnknownCount(u => u + 1);

    // Move to next card
    setIsFlipped(false);
    setTimeout(() => {
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(-1); // finished
      }
    }, 200);
  };

  // Topic selection
  if (selectedTopicId === null) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />
        <h2 style={{ marginBottom: '0.5rem' }}>📇 Flashcards</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Choose a topic to review with flashcards. Words you struggle with will appear first.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          <button
            className="card glass-panel"
            style={{ cursor: 'pointer', padding: '1.25rem', textAlign: 'center', border: `1px solid ${brandColor}` }}
            onClick={() => startSession('all')}
          >
            <h3 style={{ color: brandColor, margin: '0 0 0.5rem 0' }}>🎲 All Topics</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{allWords.length} words</p>
          </button>

          {topicsData.map(topic => (
            <button
              key={topic.id}
              className="card glass-panel"
              style={{ cursor: 'pointer', padding: '1.25rem', textAlign: 'center' }}
              onClick={() => startSession(topic.id)}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{topic.title}</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{topic.words.length} words</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Session complete
  if (currentIndex === -1) {
    const total = knownCount + unknownCount;
    const pct = total > 0 ? Math.round((knownCount / total) * 100) : 0;
    return (
      <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '3rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>📇 Session Complete!</h2>
        <div className="card glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '1.5rem' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{knownCount}</div>
              <div style={{ color: 'var(--text-muted)' }}>Known ✅</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>{unknownCount}</div>
              <div style={{ color: 'var(--text-muted)' }}>Review ❌</div>
            </div>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: `${pct}%`, background: brandColor }}></div>
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>{pct}% mastered</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" onClick={() => setSelectedTopicId(null)}>
            Choose Another Topic
          </button>
          <button className="btn btn-primary" style={{ background: brandColor }} onClick={() => startSession(selectedTopicId === -1 ? 'all' : selectedTopicId)}>
            Review Again
          </button>
        </div>
      </div>
    );
  }

  // Active flashcard
  if (cards.length === 0) return null;
  const card = cards[currentIndex];

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>📇 Flashcards</h2>
        <span style={{ color: 'var(--text-muted)' }}>{currentIndex + 1} / {cards.length}</span>
      </div>

      {/* Progress bar */}
      <div className="progress-bg" style={{ marginBottom: '1.5rem' }}>
        <div className="progress-fill" style={{ width: `${((currentIndex) / cards.length) * 100}%`, background: brandColor, transition: 'width 0.3s' }}></div>
      </div>

      {/* Flashcard */}
      <div
        className="card glass-panel"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          cursor: 'pointer',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5rem',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(0deg)',
          borderLeft: `4px solid ${brandColor}`,
        }}
      >
        {!isFlipped ? (
          // Front - English
          <>
            <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: brandColor }}>{card.front.word}</h2>
            <p style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', margin: '0 0 0.25rem 0' }}>{card.front.phonetic}</p>
            <span style={{ color: 'var(--text-muted)', fontStyle: 'italic', fontSize: '0.9rem' }}>({card.front.pos})</span>
            <div style={{ marginTop: '1rem' }}>
              <AudioButton word={card.front.word} brandColor={brandColor} />
            </div>
            <p style={{ color: 'var(--text-muted)', marginTop: '1.5rem', fontSize: '0.85rem' }}>Tap to reveal meaning</p>
          </>
        ) : (
          // Back - Vietnamese
          <>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>{card.back.definitionVi}</h3>
            <div style={{ padding: '0.85rem 1rem', background: 'rgba(255,255,255,0.04)', borderRadius: '0.5rem', fontStyle: 'italic', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '100%' }}>
              &quot;{card.back.example}&quot;
            </div>
          </>
        )}
      </div>

      {/* Action buttons (only visible when flipped) */}
      {isFlipped && (
        <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem' }}>
          <button
            className="btn btn-outline"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}
            onClick={() => handleMark(false)}
          >
            ❌ Still Learning
          </button>
          <button
            className="btn btn-primary"
            style={{ padding: '1rem 2rem', fontSize: '1.1rem', background: 'var(--success)' }}
            onClick={() => handleMark(true)}
          >
            ✅ Got It!
          </button>
        </div>
      )}
    </div>
  );
}
