import { useParams, useNavigate } from 'react-router-dom';
import { Layers, CheckCircle2, Database } from 'lucide-react';
import { topicsData, vocabularyMetadata } from '../../data/vocabulary';

export default function TopicList() {
  const { certType } = useParams<{ certType: 'ielts' | 'toeic' }>();
  const navigate = useNavigate();

  const isIELTS = certType === 'ielts';
  const brandColor = isIELTS ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const topics = topicsData.map((t, idx) => ({
    id: t.id,
    title: t.title,
    words: t.words.length,
    progress: idx === 0 ? 100 : idx === 1 ? 40 : 0
  }));

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }} onClick={() => navigate(`/${certType}/dashboard`)}>
          &larr; Back to Dashboard
        </button>
        <h1>
          Vocabulary <span className={`text-gradient ${certType}`}>Topics</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>Master essential words grouped by common themes.</p>
        
        {/* JSON Database Badge */}
        {vocabularyMetadata && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-tertiary)', padding: '0.35rem 0.85rem', borderRadius: '1rem', fontSize: '0.85rem', color: brandColor, border: '1px solid var(--glass-border)' }}>
            <Database size={15} />
            <span>Nạp từ <strong>vocabulary.json</strong>: {vocabularyMetadata.totalWords} từ vựng ({vocabularyMetadata.totalTopics} chủ đề)</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {topics.map(topic => (
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
                onClick={() => navigate(`/${certType}/vocabulary/${topic.id}`)}
              >
                Study Words
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
