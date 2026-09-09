export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  audioUrl?: string;
  exampleHanzi?: string;
  examplePinyin?: string;
  exampleMeaning?: string;
  imageUrl?: string;
}

export interface WarmUpData {
  title: string;
  description: string;
  imageUrls: string[];
  keywords: {
    hanzi: string;
    pinyin: string;
    meaning: string;
  }[];
}

export interface VocabularyData {
  title: string;
  description?: string;
  words: VocabItem[];
}

export interface FlashcardData {
  title: string;
  words: VocabItem[]; 
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  structure: string;
  examples: {
    hanzi: string;
    pinyin: string;
    meaning: string;
    highlights?: string[]; // Từ cần highlight
  }[];
}

export interface GrammarData {
  title: string;
  rules: GrammarRule[];
}

// Master interface for a full Lesson
export interface LessonData {
  lessonId: string; 
  warmUp?: WarmUpData;
  vocabulary?: VocabularyData;
  flashcards?: FlashcardData;
  grammar?: GrammarData;
  // TODO: Add other 8 modules later
}
