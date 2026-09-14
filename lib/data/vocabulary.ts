import vocabularyJson from './vocabulary.json';
import type { TopicData, VocabularyJsonPayload, QuizQuestion, VocabularyItem } from '@/lib/types';

const data = vocabularyJson as unknown as {
  metadata: any;
  questions: QuizQuestion[];
  topics: {
    id: number;
    certType: string;
    title: string;
    description: string;
    level?: 'beginner' | 'intermediate' | 'advanced';
    words: any[];
  }[];
};

// Map compressed Array of Arrays back to Object structure
export const topicsData: TopicData[] = data.topics.map(t => ({
  ...t,
  words: t.words.map(w => {
    // Nếu nó đã là mảng (đã nén), bung nó ra
    if (Array.isArray(w)) {
      return {
        id: w[0],
        word: w[1],
        pos: w[2],
        phonetic: w[3],
        definitionVi: w[4],
        example: w[5] || ''
      };
    }
    // Fallback nếu vẫn là object (chưa nén)
    return w;
  })
}));

export const mockQuestionsData: QuizQuestion[] = data.questions;
export const vocabularyMetadata = data.metadata;

/**
 * Get all topics merged with user's custom vocabulary from localStorage.
 * Custom vocab is stored under key `custom_vocab_{certType}`.
 */
export function getTopicsWithCustom(certType: string): TopicData[] {
  if (typeof window === 'undefined') return topicsData;

  const key = `custom_vocab_${certType}`;
  const stored = localStorage.getItem(key);
  if (!stored) return topicsData;

  try {
    const customTopics: TopicData[] = JSON.parse(stored);
    // Merge: append custom topics after built-in topics
    // If a custom topic has the same ID as a built-in one, merge words
    const merged = [...topicsData.map(t => ({ ...t, words: [...t.words] }))];

    for (const custom of customTopics) {
      const existing = merged.find(t => t.id === custom.id);
      if (existing) {
        // Merge words, avoiding duplicates by word text
        const existingWords = new Set(existing.words.map(w => w.word.toLowerCase()));
        const newWords = custom.words.filter(w => !existingWords.has(w.word.toLowerCase()));
        existing.words.push(...newWords);
      } else {
        merged.push(custom);
      }
    }

    return merged;
  } catch {
    return topicsData;
  }
}

/**
 * Save custom vocabulary topics to localStorage.
 */
export function saveCustomVocab(certType: string, topics: TopicData[]): void {
  if (typeof window === 'undefined') return;
  const key = `custom_vocab_${certType}`;
  localStorage.setItem(key, JSON.stringify(topics));
}

/**
 * Parse CSV string into VocabularyItem[].
 * Expected format: word,pos,phonetic,definitionVi,example
 */
export function parseCSV(csv: string): VocabularyItem[] {
  const lines = csv.trim().split('\n');
  const items: VocabularyItem[] = [];
  const startIdx = lines[0]?.toLowerCase().includes('word') ? 1 : 0; // skip header

  for (let i = startIdx; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    if (cols.length >= 4) {
      items.push({
        id: 90000 + i,
        word: cols[0]?.trim() || '',
        pos: cols[1]?.trim() || 'noun',
        phonetic: cols[2]?.trim() || '',
        definitionVi: cols[3]?.trim() || '',
        example: cols[4]?.trim() || '',
      });
    }
  }
  return items;
}

/**
 * Parse a single CSV line, handling quoted fields.
 */
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}
