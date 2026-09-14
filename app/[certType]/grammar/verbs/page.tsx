'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { irregularVerbsData, regularVerbsData } from '@/lib/data/grammar';
import { BackButton } from '@/components/layout/BackButton';
import type { CertType } from '@/lib/types';

type Tab = 'irregular' | 'regular';

export default function VerbsPage() {
  const params = useParams<{ certType: string }>();
  const certType = params.certType as CertType;
  const brandColor = certType === 'ielts' ? 'var(--brand-ielts)' : 'var(--brand-toeic)';

  const [activeTab, setActiveTab] = useState<Tab>('irregular');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIrregular = useMemo(() => {
    if (!searchTerm) return irregularVerbsData;
    const lower = searchTerm.toLowerCase();
    return irregularVerbsData.filter(v =>
      v.v1.toLowerCase().includes(lower) ||
      v.v2.toLowerCase().includes(lower) ||
      v.v3.toLowerCase().includes(lower) ||
      v.meaning.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  const filteredRegular = useMemo(() => {
    if (!searchTerm) return regularVerbsData;
    const lower = searchTerm.toLowerCase();
    return regularVerbsData.filter(v =>
      v.verb.toLowerCase().includes(lower) ||
      v.ed.toLowerCase().includes(lower) ||
      v.meaning.toLowerCase().includes(lower)
    );
  }, [searchTerm]);

  return (
    <div className="animate-fade-in" style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '4rem' }}>
      <BackButton href={`/${certType}/grammar`} label="Back to Grammar" />

      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ color: brandColor }}>Verbs Reference</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Bảng tra cứu động từ bất quy tắc và quy tắc phát âm -ED.</p>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search verb..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 3rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--glass-border)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              outline: 'none',
              fontSize: '1rem'
            }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
        <button
          onClick={() => setActiveTab('irregular')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'irregular' ? `2px solid ${brandColor}` : '2px solid transparent',
            color: activeTab === 'irregular' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'irregular' ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '1rem'
          }}
        >
          Irregular Verbs
        </button>
        <button
          onClick={() => setActiveTab('regular')}
          style={{
            padding: '0.75rem 1.5rem',
            background: 'none',
            border: 'none',
            borderBottom: activeTab === 'regular' ? `2px solid ${brandColor}` : '2px solid transparent',
            color: activeTab === 'regular' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeTab === 'regular' ? 600 : 400,
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '1rem'
          }}
        >
          Regular Verbs (-ED)
        </button>
      </div>

      <div className="card glass-panel" style={{ padding: '0', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--glass-border)' }}>
              {activeTab === 'irregular' ? (
                <>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">V1 (Nguyên thể)</th>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">V2 (Quá khứ)</th>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">V3 (Phân từ II)</th>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">Nghĩa</th>
                </>
              ) : (
                <>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">Verb (V1)</th>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">Past (-ED)</th>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">Phát âm đuôi</th>
                  <th className="p-2 md:p-4 font-semibold text-sm md:text-base">Nghĩa</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {activeTab === 'irregular' ? (
              filteredIrregular.length > 0 ? (
                filteredIrregular.map((verb, idx) => (
                  <tr key={`irreg-${idx}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    <td className="p-2 md:p-4 text-sm md:text-base font-medium" style={{ color: brandColor }}>{verb.v1}</td>
                    <td className="p-2 md:p-4 text-sm md:text-base">{verb.v2}</td>
                    <td className="p-2 md:p-4 text-sm md:text-base">{verb.v3}</td>
                    <td className="p-2 md:p-4 text-sm md:text-base text-[var(--text-secondary)]">{verb.meaning}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No results found for &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )
            ) : (
              filteredRegular.length > 0 ? (
                filteredRegular.map((verb, idx) => (
                  <tr key={`reg-${idx}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    <td className="p-2 md:p-4 text-sm md:text-base font-medium" style={{ color: brandColor }}>{verb.verb}</td>
                    <td className="p-2 md:p-4 text-sm md:text-base">{verb.ed}</td>
                    <td className="p-2 md:p-4 text-sm md:text-base font-semibold" style={{ color: 'var(--accent-warning)' }}>{verb.pronunciation}</td>
                    <td className="p-2 md:p-4 text-sm md:text-base text-[var(--text-secondary)]">{verb.meaning}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No results found for &quot;{searchTerm}&quot;
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
