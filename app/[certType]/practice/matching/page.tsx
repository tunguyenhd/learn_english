'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { topicsData } from '@/lib/data/vocabulary';
import { generateMatchingPairs, type MatchingPair } from '@/lib/generators/matchingGenerator';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType } from '@/lib/types';

export default function MatchingGamePage() {
  const params = useParams<{ certType: string }>();
  const router = useRouter();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [terms, setTerms] = useState<MatchingPair[]>([]);
  const [definitions, setDefinitions] = useState<MatchingPair[]>([]);
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedDef, setSelectedDef] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<{ term: number; def: number } | null>(null);
  const [pairsCount, setPairsCount] = useState(0);

  const allWords = topicsData.flatMap(t => t.words);

  const startGame = (topicId: number | 'all') => {
    const words = topicId === 'all'
      ? allWords
      : topicsData.find(t => t.id === topicId)?.words || [];
    const { terms: t, definitions: d } = generateMatchingPairs(words, 6);
    setTerms(t);
    setDefinitions(d);
    setPairsCount(t.length);
    setSelectedTopicId(topicId === 'all' ? -1 : topicId);
    setMatched([]);
    setSelectedTerm(null);
    setSelectedDef(null);
    setWrongPair(null);
  };

  const handleTermClick = (id: number) => {
    if (matched.includes(id)) return;
    setSelectedTerm(id);
    setWrongPair(null);
    checkMatch(id, selectedDef);
  };

  const handleDefClick = (id: number) => {
    if (matched.includes(id)) return;
    setSelectedDef(id);
    setWrongPair(null);
    checkMatch(selectedTerm, id);
  };

  const checkMatch = (termId: number | null, defId: number | null) => {
    if (termId !== null && defId !== null) {
      if (termId === defId) {
        setMatched(prev => [...prev, termId]);
        setTimeout(() => {
          setSelectedTerm(null);
          setSelectedDef(null);
        }, 300);
      } else {
        setWrongPair({ term: termId, def: defId });
        setTimeout(() => {
          setSelectedTerm(null);
          setSelectedDef(null);
          setWrongPair(null);
        }, 800);
      }
    }
  };

  // Topic selection screen
  if (selectedTopicId === null) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />
        <h2 style={{ marginBottom: '0.5rem' }}>Match the Words</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Choose a topic, then connect each word with its meaning.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          <button
            className="card glass-panel"
            style={{ cursor: 'pointer', padding: '1.25rem', textAlign: 'center', border: `1px solid ${brandColor}` }}
            onClick={() => startGame('all')}
          >
            <h3 style={{ color: brandColor, margin: '0 0 0.5rem 0' }}>🎲 All Topics</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{allWords.length} words</p>
          </button>

          {topicsData.map(topic => (
            <button
              key={topic.id}
              className="card glass-panel"
              style={{ cursor: 'pointer', padding: '1.25rem', textAlign: 'center' }}
              onClick={() => startGame(topic.id)}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{topic.title}</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{topic.words.length} words</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const getTermStyle = (id: number) => {
    const isMatched = matched.includes(id);
    const isSelected = selectedTerm === id;
    const isWrong = wrongPair?.term === id;

    let bg = 'var(--bg-secondary)';
    let border = '1px solid var(--glass-border)';
    if (isMatched) { bg = 'rgba(34, 197, 94, 0.1)'; border = '1px solid var(--success)'; }
    else if (isWrong) { bg = 'rgba(244, 63, 94, 0.1)'; border = '1px solid var(--accent)'; }
    else if (isSelected) { border = `1px solid ${brandColor}`; }
    return { bg, border, opacity: isMatched ? 0.5 : 1 };
  };

  const getDefStyle = (id: number) => {
    const isMatched = matched.includes(id);
    const isSelected = selectedDef === id;
    const isWrong = wrongPair?.def === id;

    let bg = 'var(--bg-secondary)';
    let border = '1px solid var(--glass-border)';
    if (isMatched) { bg = 'rgba(34, 197, 94, 0.1)'; border = '1px solid var(--success)'; }
    else if (isWrong) { bg = 'rgba(244, 63, 94, 0.1)'; border = '1px solid var(--accent)'; }
    else if (isSelected) { border = `1px solid ${brandColor}`; }
    return { bg, border, opacity: isMatched ? 0.5 : 1 };
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Match the Words</h2>
        <span style={{ color: 'var(--text-muted)' }}>{matched.length}/{pairsCount} matched</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Terms Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', color: brandColor, marginBottom: '0.5rem' }}>English</div>
          {terms.map((item) => {
            const s = getTermStyle(item.id);
            return (
              <button
                key={`term-${item.id}`}
                className="card glass-panel"
                style={{ background: s.bg, border: s.border, cursor: matched.includes(item.id) ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center', opacity: s.opacity, padding: '1rem' }}
                onClick={() => handleTermClick(item.id)}
              >
                <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{item.word}</h3>
              </button>
            );
          })}
        </div>

        {/* Definitions Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold', color: brandColor, marginBottom: '0.5rem' }}>Tiếng Việt</div>
          {definitions.map((item) => {
            const s = getDefStyle(item.id);
            return (
              <button
                key={`def-${item.id}`}
                className="card glass-panel"
                style={{ background: s.bg, border: s.border, cursor: matched.includes(item.id) ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center', opacity: s.opacity, padding: '1rem' }}
                onClick={() => handleDefClick(item.id)}
              >
                <p style={{ fontSize: '0.95rem', margin: 0 }}>{item.definitionVi}</p>
              </button>
            );
          })}
        </div>
      </div>

      {matched.length === pairsCount && pairsCount > 0 && (
        <div style={{ marginTop: '3rem', textAlign: 'center' }} className="animate-fade-in">
          <h2 style={{ color: 'var(--success)', marginBottom: '1rem' }}>🎉 Excellent!</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-outline" onClick={() => startGame(selectedTopicId === -1 ? 'all' : selectedTopicId)}>
              Play Again
            </button>
            <button className="btn btn-outline" onClick={() => setSelectedTopicId(null)}>
              Choose Another Topic
            </button>
            <button className="btn btn-primary" style={{ background: brandColor }} onClick={() => router.push(`/${certType}/practice/flashcard`)}>
              Try Flashcards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
