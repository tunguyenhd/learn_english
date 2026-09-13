// ==========================================
// Vocabulary Types
// ==========================================

export interface VocabularyItem {
  id: number;
  word: string;
  pos: string;
  phonetic: string;
  definitionVi: string;
  example: string;
}

export interface TopicData {
  id: number;
  title: string;
  words: VocabularyItem[];
}

export interface VocabularyJsonPayload {
  metadata: {
    totalTopics: number;
    totalWords: number;
    totalQuestions: number;
    version: string;
    generatedAt: string;
  };
  topics: TopicData[];
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: number;
  sentence: string;
  answer: string;
  options: string[];
}

// ==========================================
// Grammar Types
// ==========================================

export interface TenseItem {
  id: number;
  name: string;
  usage: string;
  formulas: { type: string; formula: string }[];
  example: string;
  signalWords?: string;
}

export interface GrammarTopicItem {
  id: string;
  title: string;
  titleVi: string;
  desc: string;
  rules: { heading: string; detail: string; example: string }[];
}

export interface IrregularVerb {
  v1: string;
  v2: string;
  v3: string;
  meaning: string;
}

export interface RegularVerb {
  verb: string;
  ed: string;
  pronunciation: '/t/' | '/d/' | '/id/';
  meaning: string;
}

// ==========================================
// Skills Types
// ==========================================

export interface ReadingPassage {
  id: number;
  cert: 'ielts' | 'toeic';
  category: string;
  title: string;
  passage: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    answer: string;
  }[];
}

export interface ListeningExercise {
  id: number;
  cert: 'ielts' | 'toeic';
  category: string;
  title: string;
  transcript: string;
  questions: {
    id: number;
    question: string;
    options: string[];
    answer: string;
  }[];
}

export interface SpeakingTopic {
  id: number;
  cert: 'ielts' | 'toeic';
  category: string;
  title: string;
  prompts: string[];
  tips: string;
}

export interface WritingPrompt {
  id: number;
  cert: 'ielts' | 'toeic';
  category: string;
  title: string;
  prompt: string;
  sampleAnswer: string;
}

// ==========================================
// Cert Type
// ==========================================

export type CertType = 'ielts' | 'toeic';
