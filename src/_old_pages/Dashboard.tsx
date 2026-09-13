
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, Headphones, Mic, BookA, Edit3, ArrowRight, Activity } from 'lucide-react';

export default function Dashboard() {
  const { certType } = useParams<{ certType: 'ielts' | 'toeic' }>();
  const navigate = useNavigate();
  
  const isIELTS = certType === 'ielts';
  const brandColor = isIELTS ? 'var(--brand-ielts)' : 'var(--brand-toeic)';
  const title = isIELTS ? 'IELTS Dashboard' : 'TOEIC Dashboard';

  const modules = [
    { title: 'Vocabulary', icon: <BookOpen size={24} />, path: `/${certType}/vocabulary`, color: '#8b5cf6' },
    { title: 'Grammar', icon: <BookA size={24} />, path: `/${certType}/grammar`, color: '#ec4899' },
    { title: 'Listening', icon: <Headphones size={24} />, path: `/${certType}/listening`, color: '#f59e0b' },
    { title: 'Reading', icon: <BookA size={24} />, path: `/${certType}/reading`, color: '#10b981' },
    { title: 'Speaking', icon: <Mic size={24} />, path: `/${certType}/speaking`, color: '#f43f5e', hidden: !isIELTS },
    { title: 'Writing', icon: <Edit3 size={24} />, path: `/${certType}/writing`, color: '#3b82f6', hidden: !isIELTS },
  ].filter(m => !m.hidden);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>
          <span className={`text-gradient ${certType}`}>{title}</span>
        </h1>
        <div className="card glass-panel" style={{ padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Activity color={brandColor} />
          <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Daily Streak</div>
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>3 Days</div>
          </div>
        </div>
      </div>

      <div className="card glass-panel" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Overall Progress</h3>
        <div className="progress-bg" style={{ marginBottom: '0.5rem' }}>
          <div className="progress-fill" style={{ width: '25%', background: brandColor }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <span>25% Completed</span>
          <span>Target: {isIELTS ? '7.5' : '850'}</span>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Learning Modules</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {modules.map((mod, idx) => (
          <div key={idx} className="card glass-panel" style={{ cursor: 'pointer' }} onClick={() => navigate(mod.path)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: `${mod.color}20`, padding: '0.75rem', borderRadius: '0.5rem', color: mod.color }}>
                {mod.icon}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{mod.title}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
              <span>0 / 10 Topics</span>
              <ArrowRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
