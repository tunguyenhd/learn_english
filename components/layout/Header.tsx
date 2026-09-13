'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap } from 'lucide-react';

export function Header() {
  const router = useRouter();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        onClick={() => router.push('/')}
      >
        <GraduationCap size={32} color="var(--brand-primary)" />
        <h2>EngMastery</h2>
      </div>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn btn-outline" onClick={() => router.push('/')}>
          Home
        </button>
      </nav>
    </header>
  );
}
