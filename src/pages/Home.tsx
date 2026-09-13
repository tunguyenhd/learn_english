
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, ArrowRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }} className="animate-fade-in">
      <h1 style={{ marginBottom: '1rem' }}>
        Select your <span className="text-gradient">Goal</span>
      </h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>
        Choose the certificate you want to master. We provide tailored vocabulary and practice for both.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {/* IELTS Card */}
        <div className="card glass-panel" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => navigate('/ielts/dashboard')}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <BookOpen size={48} color="var(--brand-ielts)" />
          </div>
          <h2 className="text-gradient ielts" style={{ marginBottom: '0.5rem' }}>IELTS Mastery</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Academic vocabulary, rigorous practice for all 4 skills. Target band 7.0+.
          </p>
          <button className="btn" style={{ backgroundColor: 'var(--brand-ielts)', color: 'white', marginTop: 'auto', width: '100%' }}>
            Start IELTS <ArrowRight size={18} />
          </button>
        </div>

        {/* TOEIC Card */}
        <div className="card glass-panel" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center' }} onClick={() => navigate('/toeic/dashboard')}>
          <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1.5rem', borderRadius: '50%', marginBottom: '1.5rem' }}>
            <Target size={48} color="var(--brand-toeic)" />
          </div>
          <h2 className="text-gradient toeic" style={{ marginBottom: '0.5rem' }}>TOEIC Mastery</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', textAlign: 'center' }}>
            Business English, listening and reading comprehension. Target 800+.
          </p>
          <button className="btn" style={{ backgroundColor: 'var(--brand-toeic)', color: 'white', marginTop: 'auto', width: '100%' }}>
            Start TOEIC <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
