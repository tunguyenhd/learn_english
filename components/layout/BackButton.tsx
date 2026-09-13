'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href: string;
  label?: string;
}

export function BackButton({ href, label = 'Back' }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      className="btn btn-outline"
      style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
      onClick={() => router.push(href)}
    >
      &larr; {label}
    </button>
  );
}
