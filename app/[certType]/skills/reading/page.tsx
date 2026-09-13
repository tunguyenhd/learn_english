'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { readingPassages } from '@/lib/data/skills';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType } from '@/lib/types';

export default function ReadingPage() {
  const params = useParams<{ certType: string }>();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const availablePassages = readingPassages.filter(p => p.cert === certType).length > 0
    ? readingPassages.filter(p => p.cert === certType)
    : readingPassages;

  const [selectedPassageIndex, setSelectedPassageIndex] = useState(0);
  const currentPassage = availablePassages[selectedPassageIndex] || readingPassages[0];

  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectPassage = (idx: number) => {
    setSelectedPassageIndex(idx);
    setAnswers({});
    setSubmitted(false);
  };

  const handleSelect = (qId: number, option: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const calculateScore = () => {
    let score = 0;
    currentPassage.questions.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '3rem' }}>
      <BackButton href={`/${certType}/dashboard`} label="Back to Dashboard" />

      {/* Passage Selector Bar */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Chọn bài đọc:</span>
        {availablePassages.map((p, idx) => (
          <button
            key={p.id}
            className="btn"
            style={{
              background: selectedPassageIndex === idx ? brandColor : 'var(--bg-tertiary)',
              color: selectedPassageIndex === idx ? '#fff' : 'var(--text-primary)',
              border: selectedPassageIndex === idx ? 'none' : '1px solid var(--glass-border)',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-sm)'
            }}
            onClick={() => handleSelectPassage(idx)}
          >
            Bài {idx + 1}: {p.category}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Left Side: Passage */}
        <div className="card glass-panel" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.85rem', color: brandColor, textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
            {currentPassage.category}
          </div>
          <h2 style={{ marginBottom: '1rem', color: 'var(--text-primary)' }}>{currentPassage.title}</h2>
          <div style={{ lineHeight: '1.8', fontSize: '1.05rem', whiteSpace: 'pre-line', color: 'var(--text-secondary)' }}>
            {currentPassage.passage}
          </div>
        </div>

        {/* Right Side: Questions */}
        <div className="card glass-panel" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Câu hỏi trắc nghiệm ({currentPassage.questions.length} câu)</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {currentPassage.questions.map((q, idx) => (
              <div key={q.id}>
                <p style={{ fontWeight: 600, marginBottom: '1rem' }}>{idx + 1}. {q.question}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {q.options.map(opt => {
                    const isSelected = answers[q.id] === opt;
                    const isCorrect = opt === q.answer;

                    let bg = 'var(--bg-secondary)';
                    let border = '1px solid var(--glass-border)';

                    if (submitted) {
                      if (isCorrect) {
                        bg = 'rgba(34, 197, 94, 0.15)';
                        border = '1px solid var(--success)';
                      } else if (isSelected && !isCorrect) {
                        bg = 'rgba(244, 63, 94, 0.15)';
                        border = '1px solid var(--accent)';
                      }
                    } else if (isSelected) {
                      border = `1px solid ${brandColor}`;
                      bg = `${brandColor}20`;
                    }

                    return (
                      <button
                        key={opt}
                        className="btn btn-outline"
                        style={{ background: bg, border, textAlign: 'left', padding: '0.85rem 1rem', justifyContent: 'flex-start', height: 'auto', lineHeight: '1.5' }}
                        onClick={() => handleSelect(q.id, opt)}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {!submitted ? (
            <button
              className="btn btn-primary"
              style={{ background: brandColor, width: '100%', marginTop: '2rem' }}
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length !== currentPassage.questions.length}
            >
              Nộp bài ({Object.keys(answers).length}/{currentPassage.questions.length})
            </button>
          ) : (
            <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Kết quả: {calculateScore()} / {currentPassage.questions.length}</h3>
              <p style={{ color: calculateScore() === currentPassage.questions.length ? 'var(--success)' : 'var(--text-secondary)', marginBottom: '1rem' }}>
                {calculateScore() === currentPassage.questions.length ? 'Xuất sắc! Bạn đã trả lời đúng tất cả các câu.' : 'Hãy xem lại các câu sai được tô đỏ để rút kinh nghiệm.'}
              </p>
              <button className="btn btn-outline" onClick={() => { setSubmitted(false); setAnswers({}); }}>Làm lại bài này</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
