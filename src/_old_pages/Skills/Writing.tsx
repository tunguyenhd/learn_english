import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { writingPromptsList } from '../../data/skills';

export default function Writing() {
  const { certType } = useParams<{ certType: 'ielts' | 'toeic' }>();
  const navigate = useNavigate();
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const availablePrompts = writingPromptsList.filter(p => p.cert === certType).length > 0
    ? writingPromptsList.filter(p => p.cert === certType)
    : writingPromptsList;

  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const currentPrompt = availablePrompts[selectedPromptIndex] || writingPromptsList[0];

  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(2400); // 40 minutes default
  const [showSample, setShowSample] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSelectPrompt = (idx: number) => {
    setSelectedPromptIndex(idx);
    setText('');
    setShowSample(false);
    setSubmitted(false);
    setTimeLeft(2400);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const targetWordCount = currentPrompt.cert === 'toeic' ? 100 : 250;

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1050px', margin: '0 auto', paddingBottom: '4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }} onClick={() => navigate(`/${certType}/dashboard`)}>
          &larr; Back to Dashboard
        </button>
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: timeLeft < 300 ? 'var(--accent)' : 'var(--text-primary)', background: 'var(--bg-tertiary)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-sm)' }}>
          Thời gian còn lại: {formatTime(timeLeft)}
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: brandColor }}>Writing Practice Lab</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Luyện viết luận IELTS và viết phản hồi email công việc TOEIC.</p>
      </div>

      {/* Prompt Selector */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Chọn đề bài:</span>
        {availablePrompts.map((item, idx) => (
          <button
            key={item.id}
            className="btn"
            style={{
              background: selectedPromptIndex === idx ? brandColor : 'var(--bg-tertiary)',
              color: selectedPromptIndex === idx ? '#fff' : 'var(--text-primary)',
              border: selectedPromptIndex === idx ? 'none' : '1px solid var(--glass-border)',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-sm)'
            }}
            onClick={() => handleSelectPrompt(idx)}
          >
            Đề {idx + 1}: {item.category}
          </button>
        ))}
      </div>

      {/* Prompt Card */}
      <div className="card glass-panel" style={{ marginBottom: '1.5rem', background: 'var(--bg-tertiary)' }}>
        <div style={{ fontSize: '0.85rem', color: brandColor, textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
          {currentPrompt.category}
        </div>
        <h3 style={{ marginBottom: '0.75rem' }}>{currentPrompt.title}</h3>
        <p style={{ lineHeight: '1.8', fontSize: '1.05rem', color: 'var(--text-primary)' }}>{currentPrompt.prompt}</p>
      </div>

      {/* Editor Card */}
      <div className="card glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <textarea 
          style={{ 
            width: '100%', 
            height: '350px', 
            background: 'var(--bg-primary)', 
            border: '1px solid var(--glass-border)', 
            borderRadius: 'var(--radius-sm)',
            padding: '1.25rem',
            color: 'var(--text-primary)',
            fontSize: '1.05rem',
            lineHeight: '1.7',
            resize: 'vertical',
            outline: 'none',
            fontFamily: 'inherit'
          }}
          placeholder="Bắt đầu viết bài luận hoặc thư của bạn tại đây bằng tiếng Anh..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ color: wordCount < targetWordCount ? 'var(--warning)' : 'var(--success)', fontWeight: 600 }}>
            Số từ đã viết: <strong>{wordCount}</strong> / mục tiêu {targetWordCount} từ
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button 
              className="btn btn-outline" 
              style={{ gap: '0.5rem' }}
              onClick={() => setShowSample(!showSample)}
            >
              <BookOpen size={18} /> {showSample ? 'Ẩn bài mẫu' : 'Xem bài mẫu Band 8.0+'}
            </button>
            <button 
              className="btn btn-primary" 
              style={{ background: brandColor }}
              onClick={() => setSubmitted(true)}
            >
              Nộp bài viết
            </button>
          </div>
        </div>

        {submitted && (
          <div style={{ padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid var(--success)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 color="var(--success)" size={22} />
            <div>
              <strong>Đã lưu bài viết thành công!</strong> Bài viết đạt {wordCount} từ. Hãy đối chiếu với bài mẫu bên dưới để cải thiện từ vựng và cấu trúc ngữ pháp.
            </div>
          </div>
        )}

        {/* Sample Answer Accordion */}
        {showSample && (
          <div style={{ marginTop: '1rem', background: 'rgba(0,0,0,0.25)', padding: '1.5rem', borderRadius: 'var(--radius-sm)', borderLeft: `4px solid ${brandColor}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h4 style={{ color: brandColor, fontSize: '1.2rem' }}>Bài Viết Mẫu Chuẩn (High-Band Sample Answer)</h4>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Band 8.0+ / TOEIC 190+</span>
            </div>
            <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}>
              {currentPrompt.sampleAnswer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
