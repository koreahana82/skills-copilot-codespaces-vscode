import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from '../context/AppContext';
import { StatCard } from '../components/StatCard';

export const Home: React.FC = () => {
  const { checklist, sentences, contacts, concepts } = useAppData();

  const stats = useMemo(() => {
    const done = checklist.filter((item) => item.status === 'done').length;
    const total = checklist.length;
    const coreSentences = sentences.filter((s) => s.level === 'core').length;
    const extraSentences = sentences.length - coreSentences;
    return [
      { label: 'Checklist progress', value: `${done}/${total} done`, hint: 'Keep moving forward!' },
      { label: 'Core English sentences', value: `${coreSentences}`, hint: `${extraSentences} extra for stretch` },
      { label: 'IB concept cards', value: `${concepts.length}`, hint: 'Ready-to-use reflection prompts' },
      { label: 'Networking contacts', value: `${contacts.length}`, hint: 'Add follow-ups quickly' },
    ];
  }, [checklist, sentences, contacts, concepts]);

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Welcome, Hana ✨</h2>
        <p>Your concise hub for IB Global Conference, Mumbai 2026.</p>
      </div>
      <div className="grid stat-grid">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      <h3 className="section-title">Quick actions</h3>
      <div className="grid stat-grid">
        <Link to="/sentences" className="card" style={{ textDecoration: 'none' }}>
          <p className="badge">English</p>
          <h3>Review travel & networking phrases</h3>
          <p style={{ color: 'var(--gray)' }}>Short bilingual sentences curated for the conference.</p>
        </Link>
        <Link to="/checklist" className="card" style={{ textDecoration: 'none' }}>
          <p className="badge">Checklist</p>
          <h3>Track travel, IB content, and on-site items</h3>
          <p style={{ color: 'var(--gray)' }}>Tap status and stay organized at a glance.</p>
        </Link>
        <Link to="/ib-concepts" className="card" style={{ textDecoration: 'none' }}>
          <p className="badge">IB Concepts</p>
          <h3>Refresh learner profile and ATL ideas</h3>
          <p style={{ color: 'var(--gray)' }}>Key points plus sample discussion questions.</p>
        </Link>
        <Link to="/contacts" className="card" style={{ textDecoration: 'none' }}>
          <p className="badge">Networking</p>
          <h3>Log new contacts quickly</h3>
          <p style={{ color: 'var(--gray)' }}>Keep follow-up notes tidy during the event.</p>
        </Link>
      </div>
    </div>
  );
};
