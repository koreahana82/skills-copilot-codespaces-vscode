import React, { createContext, useContext, useMemo, useState } from 'react';
import { ChecklistItem, Contact, IBConcept, Sentence } from '../types';
import { sentences as sentenceData } from '../data/sentences';
import { checklist as checklistData } from '../data/checklist';
import { ibConcepts as conceptData } from '../data/ibConcepts';
import { initialContacts } from '../data/contacts';

interface AppContextValue {
  sentences: Sentence[];
  checklist: ChecklistItem[];
  concepts: IBConcept[];
  contacts: Contact[];
  updateChecklistStatus: (id: number, status: ChecklistItem['status']) => void;
  addContact: (contact: Omit<Contact, 'id'>) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(checklistData);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);

  const updateChecklistStatus = (id: number, status: ChecklistItem['status']) => {
    setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const addContact = (contact: Omit<Contact, 'id'>) => {
    setContacts((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((c) => c.id)) + 1 : 1;
      return [...prev, { ...contact, id: nextId }];
    });
  };

  const value = useMemo(
    () => ({
      sentences: sentenceData,
      checklist,
      concepts: conceptData,
      contacts,
      updateChecklistStatus,
      addContact,
    }),
    [checklist, contacts]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppData = (): AppContextValue => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppData must be used within AppProvider');
  }
  return context;
};
