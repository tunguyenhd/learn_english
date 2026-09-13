import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tensesData, grammarTopicsData } from '../../data/grammar';

export default function Tenses() {
  const { certType } = useParams<{ certType: 'ielts' | 'toeic' }>();
  const navigate = useNavigate();
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [activeTab, setActiveTab] = useState<'tenses' | 'topics'>('tenses');

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }} onClick={() => navigate(`/${certType}/grammar`)}>
        &larr; Back to Grammar
      </button>
      
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: brandColor }}>English Grammar Masterclass</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Tổng hợp đầy đủ 12 thì Tiếng Anh và các chuyên đề ngữ pháp trọng tâm.</p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
        <button
          className="btn"
          style={{
            background: activeTab === 'tenses' ? brandColor : 'transparent',
            color: activeTab === 'tenses' ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600
          }}
          onClick={() => setActiveTab('tenses')}
        >
          12 Thì Tiếng Anh ({tensesData.length})
        </button>
        <button
          className="btn"
          style={{
            background: activeTab === 'topics' ? brandColor : 'transparent',
            color: activeTab === 'topics' ? '#fff' : 'var(--text-secondary)',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600
          }}
          onClick={() => setActiveTab('topics')}
        >
          Chuyên Đề Ngữ Pháp ({grammarTopicsData.length})
        </button>
      </div>

      {/* Tab 1: 12 Tenses */}
      {activeTab === 'tenses' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {tensesData.map(tense => (
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
                {tense.formulas.map((f, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', background: 'var(--bg-tertiary)', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontWeight: 600 }}>{f.type}</span>
                    <span style={{ color: 'var(--text-primary)', fontFamily: 'monospace' }}>{f.formula}</span>
                  </div>
                ))}
              </div>

              <div>
                <strong>Ví dụ minh họa:</strong>
                <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', fontStyle: 'italic', color: 'var(--text-secondary)', borderLeft: `3px solid ${brandColor}`, marginTop: '0.5rem' }}>
                  "{tense.example}"
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Grammar Topics */}
      {activeTab === 'topics' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {grammarTopicsData.map(topic => (
            <div key={topic.id} className="card glass-panel" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: brandColor }}>{topic.title} ({topic.titleVi})</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6' }}>{topic.desc}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {topic.rules.map((rule, idx) => (
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
          ))}
        </div>
      )}
    </div>
  );
}
