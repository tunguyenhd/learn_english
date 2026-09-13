'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { topicsData } from '@/lib/data/vocabulary';
import { generateFillBlanks, type GeneratedFillBlank } from '@/lib/generators/fillBlankGenerator';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType } from '@/lib/types';

export default function FillBlankPage() {
  const params = useParams<{ certType: string }>();
  const router = useRouter();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [questions, setQuestions] = useState<GeneratedFillBlank[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const allWords = topicsData.flatMap(t => t.words);

  const startQuiz = (topicId: number | 'all') => {
    const words = topicId === 'all'
      ? allWords
      : topicsData.find(t => t.id === topicId)?.words || [];
    const generated = generateFillBlanks(words, allWords, 10);
    setQuestions(generated);
    setSelectedTopicId(topicId === 'all' ? -1 : topicId);
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setIsFinished(false);
  };

  const handleSelect = (option: string) => {
    if (isCorrect !== null) return;
    setSelectedAnswer(option);
    const correct = option === questions[currentQIndex].answer;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true);
    }
  };

  // Topic selection screen
  if (selectedTopicId === null) {
    return (
      <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />
        <h2 style={{ marginBottom: '0.5rem' }}>Fill in the Blanks</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Choose a topic to practice, or quiz all words at once.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
          <button
            className="card glass-panel"
            style={{ cursor: 'pointer', padding: '1.25rem', textAlign: 'center', border: `1px solid ${brandColor}` }}
            onClick={() => startQuiz('all')}
          >
            <h3 style={{ color: brandColor, margin: '0 0 0.5rem 0' }}>🎲 All Topics</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{allWords.length} words</p>
          </button>

          {topicsData.map(topic => (
            <button
              key={topic.id}
              className="card glass-panel"
              style={{ cursor: 'pointer', padding: '1.25rem', textAlign: 'center' }}
              onClick={() => startQuiz(topic.id)}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{topic.title}</h3>
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>{topic.words.length} words</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Finished screen
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', paddingTop: '3rem' }}>
        <h2 style={{ color: percentage >= 70 ? 'var(--success)' : 'var(--accent)', marginBottom: '1rem' }}>
          {percentage >= 70 ? '🎉 Great Job!' : '📚 Keep Practicing!'}
        </h2>
        <div className="card glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: brandColor }}>{score}/{questions.length}</div>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{percentage}% correct</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" onClick={() => setSelectedTopicId(null)}>
            Choose Another Topic
          </button>
          <button className="btn btn-primary" style={{ background: brandColor }} onClick={() => startQuiz(selectedTopicId === -1 ? 'all' : selectedTopicId)}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (questions.length === 0) return null;
  const q = questions[currentQIndex];

  const renderSentence = () => {
    const parts = q.sentence.split('_____');
    return (
      <span style={{ fontSize: '1.25rem', lineHeight: '2' }}>
        {parts[0]}
        <span
          style={{
            display: 'inline-block',
            minWidth: '100px',
            borderBottom: `2px solid ${isCorrect === true ? 'var(--success)' : isCorrect === false ? 'var(--accent)' : brandColor}`,
            margin: '0 0.5rem',
            textAlign: 'center',
            color: isCorrect === true ? 'var(--success)' : isCorrect === false ? 'var(--accent)' : brandColor,
            fontWeight: 'bold'
          }}
        >
          {selectedAnswer || ' '}
        </span>
        {parts[1]}
      </span>
    );
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Fill in the Blanks</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Score: {score}/{currentQIndex + (isCorrect !== null ? 1 : 0)}</span>
          <span style={{ color: 'var(--text-muted)' }}>Q {currentQIndex + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="card glass-panel" style={{ marginBottom: '2rem', padding: '2rem' }}>
        <p style={{ marginBottom: '2rem' }}>{renderSentence()}</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {q.options.map((opt, idx) => {
            let bg = 'var(--bg-secondary)';
            let border = '1px solid var(--glass-border)';
            let color = 'var(--text-primary)';

            if (selectedAnswer === opt) {
              if (isCorrect) {
                bg = 'rgba(34, 197, 94, 0.1)';
                border = '1px solid var(--success)';
                color = 'var(--success)';
              } else {
                bg = 'rgba(244, 63, 94, 0.1)';
                border = '1px solid var(--accent)';
                color = 'var(--accent)';
              }
            } else if (isCorrect !== null && opt === q.answer) {
              border = '1px solid var(--success)';
              color = 'var(--success)';
            }

            return (
              <button
                key={idx}
                className="btn btn-outline"
                style={{ background: bg, border, color, padding: '1rem', fontSize: '1.1rem' }}
                onClick={() => handleSelect(opt)}
                disabled={isCorrect !== null}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {isCorrect !== null && (
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <h3 style={{ color: isCorrect ? 'var(--success)' : 'var(--accent)', marginBottom: '0.5rem' }}>
            {isCorrect ? '✅ Correct!' : `❌ Incorrect. Answer: ${q.answer}`}
          </h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {q.definitionVi}
          </p>
          <button className="btn btn-primary" style={{ background: brandColor }} onClick={handleNext}>
            {currentQIndex < questions.length - 1 ? 'Next Question' : 'View Results'}
          </button>
        </div>
      )}
    </div>
  );
}
