'use client';

import { useParams, useRouter } from 'next/navigation';
import { BookOpen, Headphones, Mic, BookA, Edit3, ArrowRight, Activity } from 'lucide-react';
import type { CertType } from '@/lib/types';
import { useProgress } from '@/lib/hooks/useProgress';
import { topicsData } from '@/lib/data/vocabulary';

export default function DashboardPage() {
  const params = useParams<{ certType: string }>();
  const router = useRouter();
  const certType = params.certType as CertType;

  const isIELTS = certType === 'ielts';
  const brandColor = isIELTS ? 'var(--brand-ielts)' : 'var(--brand-toeic)';
  const title = isIELTS ? 'IELTS Dashboard' : 'TOEIC Dashboard';
  
  const { progress, isLoaded } = useProgress(certType);

  const totalVocab = topicsData.length;
  const completedVocab = progress.vocabulary.length;
  const totalGrammar = 13; // 12 tenses + irregular verbs
  const completedGrammar = progress.grammar.length;

  const getModuleStatus = (key: string) => {
    switch (key) {
      case 'Vocabulary':
        return `${completedVocab} / ${totalVocab} Topics`;
      case 'Grammar':
        return `${completedGrammar} / ${totalGrammar} Topics`;
      case 'Listening':
        return `${progress.listening}% Completed`;
      case 'Reading':
        return `${progress.reading}% Completed`;
      case 'Speaking':
        return `${progress.speaking}% Completed`;
      case 'Writing':
        return `${progress.writing}% Completed`;
      default:
        return '0% Completed';
    }
  };

  const calculateOverallProgress = () => {
    if (!isLoaded) return 0;
    let totalWeight = 0;
    let completedWeight = 0;

    // Vocab (30%)
    totalWeight += 30;
    completedWeight += (completedVocab / totalVocab) * 30;
    
    // Grammar (30%)
    totalWeight += 30;
    completedWeight += (completedGrammar / totalGrammar) * 30;

    // Skills (40% total)
    const skillsCount = isIELTS ? 4 : 2;
    const skillWeight = 40 / skillsCount;
    
    totalWeight += skillWeight * skillsCount;
    completedWeight += (progress.listening / 100) * skillWeight;
    completedWeight += (progress.reading / 100) * skillWeight;
    if (isIELTS) {
      completedWeight += (progress.speaking / 100) * skillWeight;
      completedWeight += (progress.writing / 100) * skillWeight;
    }

    return Math.round((completedWeight / totalWeight) * 100) || 0;
  };

  const overallPercent = calculateOverallProgress();

  const modules = [
    { title: 'Vocabulary', icon: <BookOpen size={24} />, path: `/${certType}/vocabulary`, color: '#8b5cf6' },
    { title: 'Grammar', icon: <BookA size={24} />, path: `/${certType}/grammar`, color: '#ec4899' },
    { title: 'Listening', icon: <Headphones size={24} />, path: `/${certType}/skills/listening`, color: '#f59e0b' },
    { title: 'Reading', icon: <BookA size={24} />, path: `/${certType}/skills/reading`, color: '#10b981' },
    { title: 'Speaking', icon: <Mic size={24} />, path: `/${certType}/skills/speaking`, color: '#f43f5e', hidden: !isIELTS },
    { title: 'Writing', icon: <Edit3 size={24} />, path: `/${certType}/skills/writing`, color: '#3b82f6', hidden: !isIELTS },
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
            <div style={{ fontWeight: 'bold', fontSize: '1.25rem' }}>{progress.streak} Days</div>
          </div>
        </div>
      </div>

      <div className="card glass-panel" style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '1rem' }}>Overall Progress</h3>
        <div className="progress-bg" style={{ marginBottom: '0.5rem' }}>
          <div className="progress-fill" style={{ width: `${overallPercent}%`, background: brandColor }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <span>{overallPercent}% Completed</span>
          <span>Target: {isIELTS ? '7.5' : '850'}</span>
        </div>
      </div>

      <h3 style={{ marginBottom: '1rem' }}>Learning Modules</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {modules.map((mod, idx) => (
          <div key={idx} className="card glass-panel" style={{ cursor: 'pointer' }} onClick={() => router.push(mod.path)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ background: `${mod.color}20`, padding: '0.75rem', borderRadius: '0.5rem', color: mod.color }}>
                {mod.icon}
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{mod.title}</h3>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
              <span>{getModuleStatus(mod.title)}</span>
              <ArrowRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
