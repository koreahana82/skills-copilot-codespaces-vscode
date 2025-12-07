import { FormEvent, useMemo, useState } from 'react';
import { Link, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useContacts } from '../context/ContactContext';

function ContactList() {
  const { contacts } = useContacts();
  const sorted = useMemo(
    () => [...contacts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [contacts]
  );

  return (
    <div className="card">
      <div className="section-header">
        <h3>Contacts</h3>
        <span className="tag">{sorted.length} saved</span>
      </div>
      <div className="grid" style={{ gap: 10 }}>
        {sorted.map((contact) => (
          <Link key={contact.id} to={`/contacts/${contact.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid #e5f3f1', padding: 12, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>{contact.name}</strong>
                <span className="tag">{contact.role}</span>
              </div>
              <p style={{ margin: '4px 0', color: '#4b5563' }}>
                {contact.country} • {contact.school}
              </p>
              <p style={{ margin: '4px 0', color: '#6b7280' }}>{contact.email}</p>
              <p style={{ margin: '4px 0', color: '#6b7280', fontSize: '0.9rem' }}>
                Follow-up: {contact.followUp}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function ContactDetail() {
  const { getContact } = useContacts();
  const params = useParams();
  const id = Number(params.contactId);
  const contact = getContact(id);
  if (!contact) return <p>Select a contact to view details.</p>;

  return (
    <div className="card">
      <div className="section-header">
        <h3>{contact.name}</h3>
        <span className="tag">{contact.role}</span>
      </div>
      <p style={{ margin: '6px 0' }}>
        {contact.country} • {contact.school}
      </p>
      <p style={{ margin: '6px 0', color: '#4b5563' }}>Email: {contact.email}</p>
      <p style={{ margin: '6px 0', color: '#4b5563' }}>Notes: {contact.notes}</p>
      <p style={{ margin: '6px 0', color: '#6b7280' }}>Follow-up: {contact.followUp}</p>
      <span className="tag">Added: {contact.createdAt}</span>
    </div>
  );
}

function ContactForm() {
  const { addContact } = useContacts();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    country: '',
    school: '',
    role: '',
    email: '',
    notes: '',
    followUp: '',
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    addContact(form);
    setForm({ name: '', country: '', school: '', role: '', email: '', notes: '', followUp: '' });
    navigate('/contacts');
  };

  return (
    <form className="card" onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
      <div className="section-header">
        <h3>Add Contact</h3>
        <span className="tag">Quick note</span>
      </div>
      {['name', 'country', 'school', 'role', 'email', 'followUp'].map((field) => (
        <input
          key={field}
          required={field === 'name' || field === 'email'}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={(form as Record<string, string>)[field]}
          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
          style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #c7efe3' }}
        />
      ))}
      <textarea
        placeholder="Notes"
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #c7efe3', minHeight: 80 }}
      />
      <button
        type="submit"
        style={{
          padding: '10px 12px',
          borderRadius: 10,
          border: 'none',
          background: '#0b6b4c',
          color: 'white',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        Save contact
      </button>
    </form>
  );
}

export default function ContactsPage() {
  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="section-header">
        <h2>Networking Contacts</h2>
        <span style={{ color: '#6b7280' }}>Track new connections from the conference</span>
      </div>
      <div className="grid" style={{ gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        <ContactForm />
        <ContactList />
      </div>
      <Routes>
        <Route path=":contactId" element={<ContactDetail />} />
        <Route
          index
          element={<p style={{ color: '#6b7280' }}>Select a contact to view details.</p>}
        />
      </Routes>
    </div>
  );
}
