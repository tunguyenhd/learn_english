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
