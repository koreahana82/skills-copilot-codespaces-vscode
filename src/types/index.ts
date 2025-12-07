export interface Sentence {
  id: number;
  set: number;
  category: string;
  english: string;
  korean: string;
  note: string;
  tags: string[];
  level: 'core' | 'extra';
}

export type ChecklistArea = 'travel' | 'english' | 'ib_preparation' | 'onsite';

export interface ChecklistItem {
  id: string;
  area: ChecklistArea;
  title: string;
  description: string;
  due: string;
  status: 'todo' | 'in_progress' | 'done';
  isRequired: boolean;
  order: number;
}

export interface IBConcept {
  id: string;
  category: string;
  key: string;
  titleEn: string;
  titleKo: string;
  descriptionEn: string;
  descriptionKo: string;
  exampleQuestionEn: string;
  exampleQuestionKo: string;
  tags: string[];
}

export interface Contact {
  id: number;
  name: string;
  country: string;
  school: string;
  role: string;
  email: string;
  notes: string;
  followUp: string;
  createdAt: string;
}
