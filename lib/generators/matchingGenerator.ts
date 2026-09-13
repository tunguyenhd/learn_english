import type { VocabularyItem } from '@/lib/types';

export interface MatchingPair {
  id: number;
  word: string;
  definitionVi: string;
}

/**
 * Auto-generate matching pairs from vocabulary items.
 * Returns shuffled terms and definitions arrays for the matching game.
 */
export function generateMatchingPairs(
  words: VocabularyItem[],
  pairsCount: number = 6
): { terms: MatchingPair[]; definitions: MatchingPair[] } {
  if (words.length === 0) return { terms: [], definitions: [] };

  const count = Math.min(pairsCount, words.length);
  const selected = [...words].sort(() => Math.random() - 0.5).slice(0, count);

  const pairs: MatchingPair[] = selected.map(w => ({
    id: w.id,
    word: w.word,
    definitionVi: w.definitionVi,
  }));

  // Shuffle independently for terms and definitions
  const terms = [...pairs].sort(() => Math.random() - 0.5);
  const definitions = [...pairs].sort(() => Math.random() - 0.5);

  return { terms, definitions };
}
