import { Contact } from '../types';

export const initialContacts: Contact[] = [
  {
    id: 1,
    name: 'Priya Nair',
    role: 'PYP Coordinator',
    organization: 'Mumbai International School',
    country: 'India',
    tags: ['PYP', 'assessment'],
    meetingContext: 'Met during assessment breakout.',
    contactMethod: 'Email',
    notes: 'Interested in co-designing a formative assessment checklist.',
    followUp: 'Send sample checklist and invite to virtual coffee.',
  },
  {
    id: 2,
    name: 'Daniel Lee',
    role: 'MYP Science Teacher',
    organization: 'Singapore Global Academy',
    country: 'Singapore',
    tags: ['ATL', 'science'],
    meetingContext: 'Lunch table networking.',
    contactMethod: 'LinkedIn',
    notes: 'Shared strategies for lab journals and reflective prompts.',
    followUp: 'Connect on LinkedIn and exchange journal templates.',
  },
];
