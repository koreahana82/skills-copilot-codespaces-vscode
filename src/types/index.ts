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

export type ChecklistStatus = 'todo' | 'in_progress' | 'done';

export type ChecklistCategory = 'travel' | 'english' | 'ib_content' | 'on_site';

export interface ChecklistItem {
  id: number;
  title: string;
  description: string;
  category: ChecklistCategory;
  status: ChecklistStatus;
  due?: string;
  tags?: string[];
}

export interface IBConcept {
  id: number;
  title: string;
  category: string;
  summary: string;
  keyPoints: string[];
  sampleQuestions: string[];
  takeaway?: string;
}

export interface Contact {
  id: number;
  name: string;
  role: string;
  organization: string;
  country?: string;
  tags: string[];
  meetingContext: string;
  contactMethod: string;
  notes: string;
  followUp?: string;
}

export interface QuickStat {
  label: string;
  value: string;
  hint?: string;
}
