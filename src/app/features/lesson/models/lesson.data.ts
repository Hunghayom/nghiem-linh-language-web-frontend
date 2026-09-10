export interface VocabItem {
  id: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  sinoVietnamese?: string;
  audioUrl?: string;
  examples: {
    hanzi: string;
    pinyin: string;
    meaning: string;
    audioUrl?: string;
  }[];
  imageUrl?: string;
}

export interface WarmUpItem {
  id: string;
  meaning: string; // The blank meaning
  expectedVocabId: string; // The correct vocab to fill in
}

export interface WarmUpData {
  title: string;
  description: string;
  items: WarmUpItem[];
  choices: VocabItem[]; // A-F choices
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
  usage: string;
  note?: string;
  examples: {
    hanzi: string;
    pinyin: string;
    meaning: string;
    audioUrl?: string;
  }[];
  practice: {
    questionText: string;
    wordsToOrder: { id: string; text: string; }[];
    correctOrderIds: string[];
  };
}

export interface GrammarData {
  title: string;
  rules: GrammarRule[];
}

export interface ConversationTurn {
  id: string;
  role: string;
  avatar?: string;
  hanzi: string;
  pinyin: string;
  meaning: string;
  audioUrl?: string;
}

export interface ConversationData {
  title: string;
  turns: ConversationTurn[];
}

export interface FillBlankChoice {
  id: string;
  text: string;
  pinyin: string;
  meaning?: string;
}

export interface FillBlankQuestion {
  id: string;
  speaker?: string;
  parts: { type: 'text' | 'blank', content?: string }[];
  expectedChoiceId: string;
  hint?: string;
}

export interface FillBlankData {
  title: string;
  questions: FillBlankQuestion[];
  choices: FillBlankChoice[];
}

export interface LessonData {
  lessonId: string;
  warmUp?: WarmUpData;
  vocabulary?: VocabularyData;
  flashcards?: FlashcardData;
  grammar?: GrammarData;
  conversation?: ConversationData;
  fillBlank?: FillBlankData;
}
