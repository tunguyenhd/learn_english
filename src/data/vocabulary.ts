import vocabularyJson from './vocabulary.json';
import type { VocabularyItem, TopicData } from './vocab/types';

export type { VocabularyItem, TopicData };

export interface VocabularyJsonPayload {
  metadata: {
    totalTopics: number;
    totalWords: number;
    totalQuestions: number;
    version: string;
    generatedAt: string;
  };
  topics: TopicData[];
  questions: {
    id: number;
    sentence: string;
    answer: string;
    options: string[];
  }[];
}

const data = vocabularyJson as VocabularyJsonPayload;

// Loaded and rendered directly from vocabulary.json
export const topicsData: TopicData[] = data.topics;
export const mockQuestionsData = data.questions;
export const vocabularyMetadata = data.metadata;

export default vocabularyJson;
