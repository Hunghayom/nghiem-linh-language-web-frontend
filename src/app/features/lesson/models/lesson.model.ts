export enum LessonType {
  WARM_UP = 'WARM_UP',
  VOCABULARY = 'VOCABULARY',
  FLASHCARD = 'FLASHCARD',
  GRAMMAR = 'GRAMMAR',
  CONVERSATION = 'CONVERSATION',
  FILL_BLANK = 'FILL_BLANK',
  ARRANGING = 'ARRANGING',
  MATCHING = 'MATCHING',
  QUIZ = 'QUIZ',
  SPEAKING = 'SPEAKING',
  FUN_FACTS = 'FUN_FACTS',
  FINAL_TEST = 'FINAL_TEST',
}

export interface LessonModuleInfo {
  id: string;
  type: LessonType;
  title: string;
  shortName: string;
  cnName: string;
  icon?: string;
  isActive: boolean;
  progress: number; // 0 to 100
  isLocked: boolean;
}

