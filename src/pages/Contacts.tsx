import React, { FormEvent, useMemo, useState } from 'react';
import { ContactCard } from '../components/ContactCard';
import { useAppData } from '../context/AppContext';

export const ContactsPage: React.FC = () => {
  const { contacts, addContact } = useAppData();
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [organization, setOrganization] = useState('');
  const [country, setCountry] = useState('');
  const [tags, setTags] = useState('');
  const [meetingContext, setMeetingContext] = useState('');
  const [contactMethod, setContactMethod] = useState('Email');
  const [notes, setNotes] = useState('');
  const [followUp, setFollowUp] = useState('');

  const filtered = useMemo(() => {
    const lower = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        !filter ||
        contact.name.toLowerCase().includes(lower) ||
        contact.organization.toLowerCase().includes(lower) ||
        contact.tags.some((tag) => tag.toLowerCase().includes(lower))
    );
  }, [contacts, filter]);

  const resetForm = () => {
    setName('');
    setRole('');
    setOrganization('');
    setCountry('');
    setTags('');
    setMeetingContext('');
    setContactMethod('Email');
    setNotes('');
    setFollowUp('');
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name || !role || !organization) return;
    addContact({
      name,
      role,
      organization,
      country,
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      meetingContext,
      contactMethod,
      notes,
      followUp,
    });
    resetForm();
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Networking Contacts</h2>
        <p>Track who you meet and what to follow up on.</p>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <form onSubmit={onSubmit} className="grid" style={{ gap: '0.75rem' }}>
          <div className="form-grid">
            <div>
              <label className="label" htmlFor="name">
                Name*
              </label>
              <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="role">
                Role*
              </label>
              <input id="role" className="input" value={role} onChange={(e) => setRole(e.target.value)} required />
            </div>
            <div>
              <label className="label" htmlFor="organization">
                Organization*
              </label>
              <input
                id="organization"
                className="input"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="label" htmlFor="country">
                Country/Region
              </label>
              <input id="country" className="input" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="contactMethod">
                Contact method
              </label>
              <select
                id="contactMethod"
                className="select"
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
              >
                <option>Email</option>
                <option>Phone</option>
                <option>LinkedIn</option>
                <option>WhatsApp</option>
              </select>
            </div>
            <div>
              <label className="label" htmlFor="tags">
                Tags (comma separated)
              </label>
              <input
                id="tags"
                className="input"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="PYP, assessment"
              />
            </div>
          </div>
          <div className="form-grid">
            <div>
              <label className="label" htmlFor="meetingContext">
                Where did you meet?
              </label>
              <input
                id="meetingContext"
                className="input"
                value={meetingContext}
                onChange={(e) => setMeetingContext(e.target.value)}
                placeholder="Session, lunch, expo booth"
              />
            </div>
            <div>
              <label className="label" htmlFor="notes">
                Notes
              </label>
              <textarea id="notes" className="textarea" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <div>
              <label className="label" htmlFor="followUp">
                Follow-up plan
              </label>
              <textarea
                id="followUp"
                className="textarea"
                rows={3}
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                placeholder="Send slides, schedule virtual call"
              />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="button primary">
              Save contact
            </button>
          </div>
        </form>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <label className="label" htmlFor="contact-filter">
          Filter contacts
        </label>
        <input
          id="contact-filter"
          className="input"
          placeholder="Search name, organization, or tag"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="list">
        {filtered.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
};
