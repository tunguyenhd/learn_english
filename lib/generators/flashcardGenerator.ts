import type { VocabularyItem } from '@/lib/types';

export interface FlashcardItem {
  id: number;
  front: {
    word: string;
    phonetic: string;
    pos: string;
  };
  back: {
    definitionVi: string;
    example: string;
  };
}

/**
 * Auto-generate flashcard data from vocabulary items.
 */
export function generateFlashcards(
  words: VocabularyItem[],
  shuffle: boolean = true
): FlashcardItem[] {
  const cards: FlashcardItem[] = words.map(w => ({
    id: w.id,
    front: {
      word: w.word,
      phonetic: w.phonetic,
      pos: w.pos,
    },
    back: {
      definitionVi: w.definitionVi,
      example: w.example,
    },
  }));

  if (shuffle) {
    return cards.sort(() => Math.random() - 0.5);
  }
  return cards;
}

/**
 * Simple Spaced Repetition scoring.
 * Tracks "known" and "unknown" counts per word in localStorage.
 */
export interface FlashcardProgress {
  [wordId: number]: {
    known: number;
    unknown: number;
    lastSeen: string;
  };
}

export function loadFlashcardProgress(certType: string): FlashcardProgress {
  if (typeof window === 'undefined') return {};
  const key = `engmastery_flashcard_${certType}`;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : {};
}

export function saveFlashcardProgress(certType: string, progress: FlashcardProgress): void {
  if (typeof window === 'undefined') return;
  const key = `engmastery_flashcard_${certType}`;
  localStorage.setItem(key, JSON.stringify(progress));
}

export function markFlashcard(
  certType: string,
  wordId: number,
  known: boolean
): FlashcardProgress {
  const progress = loadFlashcardProgress(certType);
  const current = progress[wordId] || { known: 0, unknown: 0, lastSeen: '' };

  if (known) {
    current.known += 1;
  } else {
    current.unknown += 1;
  }
  current.lastSeen = new Date().toISOString();
  progress[wordId] = current;

  saveFlashcardProgress(certType, progress);
  return progress;
}

/**
 * Sort flashcards to prioritize words the user struggles with.
 * Words with higher unknown/known ratio appear first.
 */
export function prioritizeFlashcards(
  cards: FlashcardItem[],
  progress: FlashcardProgress
): FlashcardItem[] {
  return [...cards].sort((a, b) => {
    const pa = progress[a.id];
    const pb = progress[b.id];

    // Unseen words first
    if (!pa && pb) return -1;
    if (pa && !pb) return 1;
    if (!pa && !pb) return 0;

    // Higher unknown ratio = higher priority
    const ratioA = pa.unknown / (pa.known + pa.unknown + 1);
    const ratioB = pb.unknown / (pb.known + pb.unknown + 1);
    return ratioB - ratioA;
  });
}
