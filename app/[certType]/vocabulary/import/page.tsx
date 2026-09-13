'use client';

import { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { parseCSV, saveCustomVocab, getTopicsWithCustom } from '@/lib/data/vocabulary';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType, VocabularyItem, TopicData } from '@/lib/types';

export default function ImportVocabularyPage() {
  const params = useParams<{ certType: string }>();
  const router = useRouter();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [inputText, setInputText] = useState('');
  const [topicName, setTopicName] = useState('');
  const [parsedWords, setParsedWords] = useState<VocabularyItem[]>([]);
  const [importMode, setImportMode] = useState<'csv' | 'json'>('csv');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleParse = () => {
    setError('');
    setParsedWords([]);

    if (!inputText.trim()) {
      setError('Please paste or upload some data first.');
      return;
    }

    try {
      if (importMode === 'csv') {
        const words = parseCSV(inputText);
        if (words.length === 0) {
          setError('No valid words found. Make sure each line has at least 4 comma-separated fields: word, pos, phonetic, definitionVi');
          return;
        }
        setParsedWords(words);
      } else {
        const parsed = JSON.parse(inputText);
        let words: VocabularyItem[];
        if (Array.isArray(parsed)) {
          words = parsed.map((w: Record<string, string>, i: number) => ({
            id: 90000 + i,
            word: w.word || '',
            pos: w.pos || 'noun',
            phonetic: w.phonetic || '',
            definitionVi: w.definitionVi || w.definition || '',
            example: w.example || '',
          }));
        } else if (parsed.words) {
          words = parsed.words;
        } else {
          setError('JSON must be an array of words or an object with a "words" property.');
          return;
        }
        setParsedWords(words);
      }
    } catch (e) {
      setError(`Parse error: ${e instanceof Error ? e.message : 'Invalid data format'}`);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      setInputText(text);
      if (file.name.endsWith('.json')) setImportMode('json');
      else setImportMode('csv');
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (parsedWords.length === 0) return;
    if (!topicName.trim()) {
      setError('Please enter a topic name.');
      return;
    }

    const existingTopics = getTopicsWithCustom(certType);
    const maxId = Math.max(...existingTopics.map(t => t.id), 0);

    // Check if a custom topic with same name exists
    const key = `custom_vocab_${certType}`;
    const stored = localStorage.getItem(key);
    let customTopics: TopicData[] = stored ? JSON.parse(stored) : [];

    const existingCustom = customTopics.find(t => t.title.toLowerCase() === topicName.trim().toLowerCase());
    if (existingCustom) {
      // Merge into existing custom topic
      const existingWords = new Set(existingCustom.words.map(w => w.word.toLowerCase()));
      const newWords = parsedWords.filter(w => !existingWords.has(w.word.toLowerCase()));
      existingCustom.words.push(...newWords);
    } else {
      // Create new custom topic
      customTopics.push({
        id: maxId + 1,
        title: topicName.trim(),
        words: parsedWords,
      });
    }

    saveCustomVocab(certType, customTopics);
    setSuccess(`Successfully imported ${parsedWords.length} words into "${topicName}"!`);
    setParsedWords([]);
    setInputText('');
    setTopicName('');
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto' }}>
      <BackButton href={`/${certType}/vocabulary`} label="Back to Topics" />

      <h2 style={{ marginBottom: '0.5rem' }}>📥 Import Vocabulary</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Add your own vocabulary words by pasting CSV/JSON data or uploading a file.
      </p>

      {success && (
        <div className="card" style={{ padding: '1rem', marginBottom: '1.5rem', background: 'rgba(34,197,94,0.1)', border: '1px solid var(--success)', borderRadius: '0.5rem' }}>
          <p style={{ margin: 0, color: 'var(--success)' }}>✅ {success}</p>
          <button className="btn btn-outline" style={{ marginTop: '0.75rem' }} onClick={() => router.push(`/${certType}/vocabulary`)}>
            View Vocabulary
          </button>
        </div>
      )}

      {/* Mode selector */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${importMode === 'csv' ? 'btn-primary' : 'btn-outline'}`}
          style={importMode === 'csv' ? { background: brandColor } : {}}
          onClick={() => setImportMode('csv')}
        >
          CSV Format
        </button>
        <button
          className={`btn ${importMode === 'json' ? 'btn-primary' : 'btn-outline'}`}
          style={importMode === 'json' ? { background: brandColor } : {}}
          onClick={() => setImportMode('json')}
        >
          JSON Format
        </button>
        <button className="btn btn-outline" onClick={() => fileInputRef.current?.click()}>
          📁 Upload File
        </button>
        <input ref={fileInputRef} type="file" accept=".csv,.json,.txt" onChange={handleFileUpload} style={{ display: 'none' }} />
      </div>

      {/* Format hint */}
      <div className="card glass-panel" style={{ padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        {importMode === 'csv' ? (
          <>
            <strong>CSV Format:</strong> Each line = one word. Fields separated by commas.<br />
            <code style={{ color: brandColor }}>word, pos, phonetic, definitionVi, example</code><br />
            Example: <code>Abundant, adjective, /əˈbʌndənt/, Phong phú dồi dào, The region has abundant resources.</code>
          </>
        ) : (
          <>
            <strong>JSON Format:</strong> An array of objects.<br />
            <code style={{ color: brandColor }}>{`[{"word":"...", "pos":"...", "phonetic":"...", "definitionVi":"...", "example":"..."}]`}</code>
          </>
        )}
      </div>

      {/* Topic name */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>Topic Name</label>
        <input
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          placeholder="e.g. My Custom IELTS Vocab"
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--glass-border)',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Text area */}
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder={importMode === 'csv'
          ? 'Abundant, adjective, /əˈbʌndənt/, Phong phú dồi dào, The region has abundant resources.\nInnovate, verb, /ˈɪnəveɪt/, Đổi mới công nghệ, Tech giants innovate relentlessly.'
          : '[{"word":"Abundant","pos":"adjective","phonetic":"/əˈbʌndənt/","definitionVi":"Phong phú dồi dào","example":"The region has abundant resources."}]'
        }
        style={{
          width: '100%',
          minHeight: '200px',
          padding: '1rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--glass-border)',
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          fontSize: '0.95rem',
          fontFamily: 'monospace',
          resize: 'vertical',
        }}
      />

      {error && (
        <p style={{ color: 'var(--accent)', marginTop: '0.75rem' }}>⚠️ {error}</p>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button className="btn btn-outline" onClick={handleParse}>
          Preview ({importMode.toUpperCase()})
        </button>
        {parsedWords.length > 0 && (
          <button className="btn btn-primary" style={{ background: brandColor }} onClick={handleImport}>
            Import {parsedWords.length} Words
          </button>
        )}
      </div>

      {/* Preview */}
      {parsedWords.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Preview ({parsedWords.length} words)</h3>
          <div style={{ maxHeight: '400px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {parsedWords.map((w, idx) => (
              <div key={idx} className="card glass-panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <strong style={{ color: brandColor }}>{w.word}</strong>
                  <span style={{ color: 'var(--text-muted)', marginLeft: '0.5rem', fontStyle: 'italic' }}>({w.pos})</span>
                  <span style={{ color: 'var(--text-secondary)', marginLeft: '0.5rem', fontFamily: 'monospace', fontSize: '0.85rem' }}>{w.phonetic}</span>
                </div>
                <div style={{ flex: 1, color: 'var(--text-secondary)' }}>{w.definitionVi}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
