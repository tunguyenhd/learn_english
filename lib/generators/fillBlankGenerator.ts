import type { VocabularyItem } from '@/lib/types';

export interface GeneratedFillBlank {
  id: number;
  sentence: string;
  answer: string;
  options: string[];
  word: string;
  definitionVi: string;
}

/**
 * Auto-generate fill-in-the-blank questions from vocabulary items.
 * Each question replaces the target word in its example sentence with a blank,
 * and creates distractor options from other words with the same part of speech.
 */
export function generateFillBlanks(
  words: VocabularyItem[],
  allWords: VocabularyItem[],
  count: number = 10
): GeneratedFillBlank[] {
  if (words.length === 0) return [];

  // Shuffle and pick up to `count` words
  const shuffled = [...words].sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((item, idx) => {
    // Replace the word in the example with _____
    const regex = new RegExp(`\\b${escapeRegex(item.word)}\\b`, 'gi');
    let sentence = item.example.replace(regex, '_____');

    // If exact match didn't work (e.g. multi-word terms), try simple replace
    if (!sentence.includes('_____')) {
      sentence = item.example.replace(
        new RegExp(escapeRegex(item.word), 'gi'),
        '_____'
      );
    }

    // If still no blank, create a definition-based question
    if (!sentence.includes('_____')) {
      sentence = `The word meaning "${item.definitionVi}" is _____.`;
    }

    // Generate distractors: prefer same POS, fallback to random
    const samePosWords = allWords.filter(
      w => w.pos === item.pos && w.id !== item.id
    );
    const otherWords = samePosWords.length >= 3
      ? samePosWords
      : allWords.filter(w => w.id !== item.id);

    const distractors = [...otherWords]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(w => w.word);

    // Build options array and shuffle
    const options = [item.word, ...distractors].sort(() => Math.random() - 0.5);

    return {
      id: idx + 1,
      sentence,
      answer: item.word,
      options,
      word: item.word,
      definitionVi: item.definitionVi,
    };
  });
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
