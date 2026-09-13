import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockQuestionsData } from '../../data/vocabulary';

export default function FillBlankGame() {
  const { certType } = useParams<{ certType: 'ielts' | 'toeic' }>();
  const navigate = useNavigate();
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const questions = mockQuestionsData;

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const q = questions[currentQIndex];

  const handleSelect = (option: string) => {
    if (isCorrect !== null) return;
    setSelectedAnswer(option);
    if (option === q.answer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // Finished
      navigate(`/${certType}/vocabulary`);
    }
  };

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
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }} onClick={() => navigate(`/${certType}/vocabulary`)}>
        &larr; Back to Topics
      </button>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Fill in the Blanks</h2>
        <span style={{ color: 'var(--text-muted)' }}>Question {currentQIndex + 1} of {questions.length}</span>
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
              // Highlight correct answer if wrong was selected
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
            )
          })}
        </div>
      </div>

      {isCorrect !== null && (
        <div className="animate-fade-in" style={{ textAlign: 'center' }}>
          <h3 style={{ color: isCorrect ? 'var(--success)' : 'var(--accent)', marginBottom: '1rem' }}>
            {isCorrect ? 'Correct!' : `Incorrect. The answer is ${q.answer}.`}
          </h3>
          <button className="btn btn-primary" style={{ background: brandColor }} onClick={handleNext}>
            {currentQIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
          </button>
        </div>
      )}
    </div>
  );
}
