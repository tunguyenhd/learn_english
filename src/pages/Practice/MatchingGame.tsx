import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { topicsData } from '../../data/vocabulary';
import type { VocabularyItem } from '../../data/vocabulary';

export default function MatchingGame() {
  const { certType } = useParams<{ certType: 'ielts' | 'toeic' }>();
  const navigate = useNavigate();
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);
  const [selectedDef, setSelectedDef] = useState<number | null>(null);
  const [matched, setMatched] = useState<number[]>([]);
  
  const [terms, setTerms] = useState<VocabularyItem[]>([]);
  const [defs, setDefs] = useState<VocabularyItem[]>([]);
  const [pairsCount, setPairsCount] = useState(0);

  useEffect(() => {
    // Select 4 random items from all topics
    const allWords = topicsData.flatMap(t => t.words);
    const shuffled = [...allWords].sort(() => 0.5 - Math.random()).slice(0, 4);
    setPairsCount(shuffled.length);
    setTerms([...shuffled].sort(() => 0.5 - Math.random()));
    setDefs([...shuffled].sort(() => 0.5 - Math.random()));
  }, []);

  const handleTermClick = (id: number) => {
    if (matched.includes(id)) return;
    setSelectedTerm(id);
    checkMatch(id, selectedDef);
  };

  const handleDefClick = (id: number) => {
    if (matched.includes(id)) return;
    setSelectedDef(id);
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
        setTimeout(() => {
          setSelectedTerm(null);
          setSelectedDef(null);
        }, 600);
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }} onClick={() => navigate(`/${certType}/vocabulary`)}>
        &larr; Back to Topics
      </button>
      <h2 style={{ marginBottom: '0.5rem' }}>Match the Words</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Connect the vocabulary word with its correct Vietnamese meaning.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Terms Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {terms.map((item) => {
            const isMatched = matched.includes(item.id);
            const isSelected = selectedTerm === item.id;
            
            let bg = 'var(--bg-secondary)';
            let border = '1px solid var(--glass-border)';
            if (isMatched) {
              bg = `${brandColor}20`;
              border = `1px solid ${brandColor}`;
            } else if (isSelected) {
              border = `1px solid ${brandColor}`;
            }

            return (
              <button 
                key={`term-${item.id}`}
                className="card glass-panel"
                style={{ background: bg, border, cursor: isMatched ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center', opacity: isMatched ? 0.5 : 1, padding: '1rem' }}
                onClick={() => handleTermClick(item.id)}
              >
                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>{item.word}</h3>
              </button>
            )
          })}
        </div>

        {/* Definitions Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {defs.map((item) => {
            const isMatched = matched.includes(item.id);
            const isSelected = selectedDef === item.id;
            
            let bg = 'var(--bg-secondary)';
            let border = '1px solid var(--glass-border)';
            if (isMatched) {
              bg = `${brandColor}20`;
              border = `1px solid ${brandColor}`;
            } else if (isSelected) {
              border = `1px solid ${brandColor}`;
            }

            return (
              <button 
                key={`def-${item.id}`}
                className="card glass-panel"
                style={{ background: bg, border, cursor: isMatched ? 'default' : 'pointer', transition: 'all 0.2s', textAlign: 'center', opacity: isMatched ? 0.5 : 1, padding: '1rem' }}
                onClick={() => handleDefClick(item.id)}
              >
                <p style={{ fontSize: '1rem', margin: 0 }}>{item.definitionVi}</p>
              </button>
            )
          })}
        </div>
      </div>

      {matched.length === pairsCount && pairsCount > 0 && (
        <div style={{ marginTop: '3rem', textAlign: 'center' }} className="animate-fade-in">
          <h2 style={{ color: 'var(--success)', marginBottom: '1rem' }}>Excellent!</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={() => window.location.reload()}>
              Play Again
            </button>
            <button className="btn btn-primary" style={{ background: brandColor }} onClick={() => navigate(`/${certType}/vocabulary`)}>
              Next Topic
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
