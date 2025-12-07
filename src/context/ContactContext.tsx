import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { Contact } from '../types';
import { contacts as seedContacts } from '../data/contacts';

interface ContactContextValue {
  contacts: Contact[];
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void;
  getContact: (id: number) => Contact | undefined;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [contactList, setContactList] = useState<Contact[]>(seedContacts);

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const nextId = Math.max(...contactList.map((c) => c.id), 0) + 1;
    const createdAt = new Date().toISOString().slice(0, 10);
    setContactList((prev) => [...prev, { ...contact, id: nextId, createdAt }]);
  };

  const getContact = (id: number) => contactList.find((c) => c.id === id);

  const value = useMemo(() => ({ contacts: contactList, addContact, getContact }), [
    contactList,
  ]);

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContacts() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error('useContacts must be used within ContactProvider');
  return ctx;
}
