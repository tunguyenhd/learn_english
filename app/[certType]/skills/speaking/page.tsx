'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Mic, Square, Lightbulb } from 'lucide-react';
import { speakingTopicsList } from '@/lib/data/skills';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType } from '@/lib/types';

export default function SpeakingPage() {
  const params = useParams<{ certType: string }>();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const availableTopics = speakingTopicsList.filter(t => t.cert === certType).length > 0
    ? speakingTopicsList.filter(t => t.cert === certType)
    : speakingTopicsList;

  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const currentTopic = availableTopics[selectedTopicIndex] || speakingTopicsList[0];

  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRecording && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRecording(false);
    }
    return () => clearInterval(timer);
  }, [isRecording, timeLeft]);

  const handleSelectTopic = (idx: number) => {
    setSelectedTopicIndex(idx);
    setIsRecording(false);
    setTimeLeft(120);
  };

  const toggleRecord = () => {
    if (!isRecording && timeLeft === 0) {
      setTimeLeft(120);
    }
    setIsRecording(!isRecording);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '850px', margin: '0 auto', paddingBottom: '3rem' }}>
      <BackButton href={`/${certType}/dashboard`} label="Back to Dashboard" />

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: brandColor }}>Speaking Simulator</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Luyện phản xạ nói tiếng Anh theo cấu trúc bài thi chuẩn.</p>
      </div>

      {/* Topic Selector Grouped by Level */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {(['beginner', 'intermediate', 'advanced'] as const).map(level => {
          const topicsInLevel = availableTopics.filter(t => (t.level || 'beginner') === level);
          if (topicsInLevel.length === 0) return null;

          return (
            <div key={level} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--text-secondary)', width: '120px', textTransform: 'capitalize' }}>{level} Level:</span>
              {topicsInLevel.map((item) => {
                const globalIdx = availableTopics.findIndex(at => at.id === item.id);
                return (
                  <button
                    key={item.id}
                    className="btn"
                    style={{
                      background: selectedTopicIndex === globalIdx ? brandColor : 'var(--bg-tertiary)',
                      color: selectedTopicIndex === globalIdx ? '#fff' : 'var(--text-primary)',
                      border: selectedTopicIndex === globalIdx ? 'none' : '1px solid var(--glass-border)',
                      padding: '0.5rem 1rem',
                      fontSize: '0.9rem',
                      borderRadius: 'var(--radius-sm)'
                    }}
                    onClick={() => handleSelectTopic(globalIdx)}
                  >
                    {item.category}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Cue Card Prompt */}
      <div className="card glass-panel" style={{ marginBottom: '2rem', background: 'var(--bg-tertiary)' }}>
        <div style={{ fontSize: '0.85rem', color: brandColor, textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
          {currentTopic.category}
        </div>
        <h3 style={{ marginBottom: '1rem' }}>{currentTopic.title}</h3>
        <p style={{ marginBottom: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Gợi ý nội dung cần nói (Prompts):</p>
        <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-primary)', lineHeight: '1.8', marginBottom: '1.25rem' }}>
          {currentTopic.prompts.map((p, idx) => (
            <li key={idx}>{p}</li>
          ))}
        </ul>

        {currentTopic.tips && (
          <div style={{ padding: '0.85rem 1rem', background: 'rgba(255, 255, 255, 0.04)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${brandColor}`, display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
            <Lightbulb size={20} color={brandColor} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--text-primary)' }}>Mẹo ghi điểm: </strong>
              {currentTopic.tips}
            </div>
          </div>
        )}
      </div>

      {/* Recording Studio */}
      <div className="card glass-panel" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <div style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '1.5rem', fontFamily: 'monospace', color: isRecording ? 'var(--accent)' : 'var(--text-primary)' }}>
          {formatTime(timeLeft)}
        </div>

        <button
          className="btn"
          style={{
            background: isRecording ? 'transparent' : brandColor,
            border: isRecording ? '2px solid var(--accent)' : 'none',
            color: isRecording ? 'var(--accent)' : '#fff',
            borderRadius: '2rem',
            padding: '1rem 2.5rem',
            fontSize: '1.15rem',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: isRecording ? '0 0 20px rgba(244, 63, 94, 0.4)' : 'none',
            transition: 'all 0.3s ease'
          }}
          onClick={toggleRecord}
        >
          {isRecording ? (
            <><Square size={20} fill="currentColor" /> Dừng thu âm</>
          ) : (
            <><Mic size={20} /> Bắt đầu ghi âm</>
          )}
        </button>

        <p style={{ marginTop: '1.25rem', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          {isRecording ? 'Đang ghi âm câu trả lời của bạn... Hãy nói to và tự tin!' : 'Bạn có 1 phút chuẩn bị và tối đa 2 phút để hoàn thành câu trả lời.'}
        </p>
      </div>
    </div>
  );
}
