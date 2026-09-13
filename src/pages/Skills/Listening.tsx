import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, Pause, RotateCcw, FileText } from 'lucide-react';
import { listeningDataList } from '../../data/skills';

export default function Listening() {
  const { certType } = useParams<{ certType: 'ielts' | 'toeic' }>();
  const navigate = useNavigate();
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  // Prioritize certType or show all
  const availableExercises = listeningDataList.filter(e => e.cert === certType).length > 0
    ? listeningDataList.filter(e => e.cert === certType)
    : listeningDataList;

  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(0);
  const currentExercise = availableExercises[selectedExerciseIndex] || listeningDataList[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectExercise = (idx: number) => {
    setSelectedExerciseIndex(idx);
    setIsPlaying(false);
    setShowTranscript(false);
    setAnswers({});
    setSubmitted(false);
  };

  const handleSelect = (qId: number, opt: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const calculateScore = () => {
    let score = 0;
    currentExercise.questions.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });
    return score;
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '850px', margin: '0 auto', paddingBottom: '3rem' }}>
      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }} onClick={() => navigate(`/${certType}/dashboard`)}>
        &larr; Back to Dashboard
      </button>

      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ color: brandColor }}>Listening Practice Lab</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Luyện kỹ năng nghe thực tế theo định dạng chuẩn IELTS và TOEIC.</p>
      </div>

      {/* Exercise Selector */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Chọn bài nghe:</span>
        {availableExercises.map((item, idx) => (
          <button
            key={item.id}
            className="btn"
            style={{
              background: selectedExerciseIndex === idx ? brandColor : 'var(--bg-tertiary)',
              color: selectedExerciseIndex === idx ? '#fff' : 'var(--text-primary)',
              border: selectedExerciseIndex === idx ? 'none' : '1px solid var(--glass-border)',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--radius-sm)'
            }}
            onClick={() => handleSelectExercise(idx)}
          >
            Bài {idx + 1}: {item.category}
          </button>
        ))}
      </div>

      {/* Audio Player Card */}
      <div className="card glass-panel" style={{ marginBottom: '2rem', textAlign: 'center', padding: '2.5rem 1.5rem' }}>
        <div style={{ fontSize: '0.85rem', color: brandColor, textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
          {currentExercise.category}
        </div>
        <h3 style={{ marginBottom: '1.5rem' }}>{currentExercise.title}</h3>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <button 
            className="btn btn-primary" 
            style={{ background: brandColor, borderRadius: '50%', width: '64px', height: '64px', padding: 0 }}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={30} /> : <Play size={30} style={{ marginLeft: '4px' }} />}
          </button>
          <button
            className="btn btn-outline"
            style={{ borderRadius: '50%', width: '44px', height: '44px', padding: 0 }}
            onClick={() => setIsPlaying(false)}
            title="Reset"
          >
            <RotateCcw size={18} />
          </button>
        </div>

        <div style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.95rem' }}>
          {isPlaying ? 'Đang phát đoạn băng mô phỏng...' : 'Nhấn nút Play để nghe đoạn băng'}
        </div>

        <div className="progress-bg" style={{ width: '70%', margin: '1.5rem auto 1rem', height: '6px' }}>
          <div className="progress-fill" style={{ width: isPlaying ? '75%' : '0%', background: brandColor, transition: 'width 2s ease' }}></div>
        </div>

        <button
          className="btn btn-outline"
          style={{ marginTop: '0.5rem', fontSize: '0.85rem', gap: '0.5rem' }}
          onClick={() => setShowTranscript(!showTranscript)}
        >
          <FileText size={16} /> {showTranscript ? 'Ẩn kịch bản (Transcript)' : 'Xem kịch bản nghe (Transcript)'}
        </button>

        {showTranscript && (
          <div style={{ marginTop: '1.5rem', textAlign: 'left', background: 'rgba(0,0,0,0.25)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${brandColor}`, lineHeight: '1.7', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Kịch bản hội thoại:</strong>
            <p style={{ marginTop: '0.5rem' }}>"{currentExercise.transcript}"</p>
          </div>
        )}
      </div>

      {/* Questions Card */}
      <div className="card glass-panel">
        <h3 style={{ marginBottom: '1.5rem' }}>Trả lời câu hỏi ({currentExercise.questions.length} câu)</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {currentExercise.questions.map((q, qIdx) => (
            <div key={q.id}>
              <p style={{ fontWeight: 600, marginBottom: '1rem' }}>Câu {qIdx + 1}: {q.question}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {q.options.map(opt => {
                  const isSelected = answers[q.id] === opt;
                  const isCorrectOpt = opt === q.answer;
                  
                  let bg = 'var(--bg-secondary)';
                  let border = '1px solid var(--glass-border)';
                  
                  if (submitted) {
                    if (isCorrectOpt) {
                      bg = 'rgba(34, 197, 94, 0.15)';
                      border = '1px solid var(--success)';
                    } else if (isSelected && !isCorrectOpt) {
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
            disabled={Object.keys(answers).length !== currentExercise.questions.length}
          >
            Nộp bài ({Object.keys(answers).length}/{currentExercise.questions.length})
          </button>
        ) : (
          <div style={{ marginTop: '2rem', padding: '1.25rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '0.5rem' }}>Điểm số: {calculateScore()} / {currentExercise.questions.length}</h3>
            <p style={{ color: calculateScore() === currentExercise.questions.length ? 'var(--success)' : 'var(--text-secondary)', marginBottom: '1rem' }}>
              {calculateScore() === currentExercise.questions.length ? 'Chúc mừng! Bạn đã nghe và chọn chính xác 100%.' : 'Bạn có thể xem lại Transcript bên trên để kiểm tra những từ khóa bị bỏ lỡ.'}
            </p>
            <button className="btn btn-outline" onClick={() => { setSubmitted(false); setAnswers({}); }}>Làm lại bài nghe</button>
          </div>
        )}
      </div>
    </div>
  );
}
