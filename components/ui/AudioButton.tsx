'use client';

import { Volume2 } from 'lucide-react';

interface AudioButtonProps {
  word: string;
  brandColor: string;
}

export function AudioButton({ word, brandColor }: AudioButtonProps) {
  const playAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      className="btn btn-outline"
      style={{ padding: '0.6rem', borderRadius: '50%', color: brandColor }}
      onClick={playAudio}
      title="Phát âm từ này (Audio)"
    >
      <Volume2 size={20} />
    </button>
  );
}
