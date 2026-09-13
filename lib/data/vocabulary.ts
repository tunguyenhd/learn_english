import vocabularyJson from './vocabulary.json';
import type { TopicData, VocabularyJsonPayload, QuizQuestion } from '@/lib/types';

const data = vocabularyJson as VocabularyJsonPayload;

// Loaded and rendered directly from vocabulary.json
export const topicsData: TopicData[] = data.topics;
export const mockQuestionsData: QuizQuestion[] = data.questions;
export const vocabularyMetadata = data.metadata;
