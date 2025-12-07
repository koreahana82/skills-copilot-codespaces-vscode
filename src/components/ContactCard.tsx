import React from 'react';
import { Contact } from '../types';

export const ContactCard: React.FC<{ contact: Contact }> = ({ contact }) => {
  return (
    <div className="card">
      <div className="flex-between">
        <div>
          <h3 style={{ margin: '0 0 0.35rem' }}>{contact.name}</h3>
          <p style={{ margin: 0, color: 'var(--gray)' }}>
            {contact.role} · {contact.organization}
          </p>
        </div>
        <span className="badge">{contact.contactMethod}</span>
      </div>
      <p style={{ margin: '0.5rem 0', color: 'var(--gray)' }}>{contact.meetingContext}</p>
      <div className="chip-row">
        {contact.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <p style={{ margin: '0.75rem 0 0', color: 'var(--ink)' }}>Notes: {contact.notes}</p>
      {contact.followUp && (
        <p style={{ margin: '0.35rem 0 0', color: 'var(--ink)', fontWeight: 700 }}>
          Follow-up: {contact.followUp}
        </p>
      )}
    </div>
  );
};
