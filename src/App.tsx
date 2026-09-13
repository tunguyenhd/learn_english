import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { GraduationCap, Loader2 } from 'lucide-react';

// Route-based Code Splitting with React.lazy
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const TopicList = lazy(() => import('./pages/Vocabulary/TopicList'));
const VocabularyStudy = lazy(() => import('./pages/Vocabulary/VocabularyStudy'));
const MatchingGame = lazy(() => import('./pages/Practice/MatchingGame'));
const FillBlankGame = lazy(() => import('./pages/Practice/FillBlankGame'));
const Listening = lazy(() => import('./pages/Skills/Listening'));
const Reading = lazy(() => import('./pages/Skills/Reading'));
const Speaking = lazy(() => import('./pages/Skills/Speaking'));
const Writing = lazy(() => import('./pages/Skills/Writing'));
const GrammarList = lazy(() => import('./pages/Grammar/GrammarList'));
const Tenses = lazy(() => import('./pages/Grammar/Tenses'));
const IrregularVerbs = lazy(() => import('./pages/Grammar/IrregularVerbs'));

function LoadingFallback() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '1rem', color: 'var(--text-secondary)' }}>
      <Loader2 size={36} className="animate-spin" color="var(--brand-primary)" style={{ animation: 'spin 1s linear infinite' }} />
      <span style={{ fontSize: '0.95rem' }}>Đang tải dữ liệu học tập...</span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className="app-container animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => navigate('/')}>
          <GraduationCap size={32} color="var(--brand-primary)" />
          <h2>EngMastery</h2>
        </div>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => navigate('/')}>Home</button>
        </nav>
      </header>
      <main>
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/:certType/dashboard" element={<Layout><Dashboard /></Layout>} />
        
        <Route path="/:certType/vocabulary" element={<Layout><TopicList /></Layout>} />
        <Route path="/:certType/vocabulary/:topicId" element={<Layout><VocabularyStudy /></Layout>} />
        <Route path="/:certType/practice/matching" element={<Layout><MatchingGame /></Layout>} />
        <Route path="/:certType/practice/fill-blank" element={<Layout><FillBlankGame /></Layout>} />
        
        <Route path="/:certType/listening" element={<Layout><Listening /></Layout>} />
        <Route path="/:certType/reading" element={<Layout><Reading /></Layout>} />
        <Route path="/:certType/speaking" element={<Layout><Speaking /></Layout>} />
        <Route path="/:certType/writing" element={<Layout><Writing /></Layout>} />
        
        <Route path="/:certType/grammar" element={<Layout><GrammarList /></Layout>} />
        <Route path="/:certType/grammar/tenses" element={<Layout><Tenses /></Layout>} />
        <Route path="/:certType/grammar/verbs" element={<Layout><IrregularVerbs /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
