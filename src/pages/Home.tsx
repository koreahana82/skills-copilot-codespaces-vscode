import { useEffect, useMemo, useState } from 'react';
import { sentences } from '../data/sentences';
import { checklistItems } from '../data/checklist';
import { ChecklistItem } from '../types';

const targetDate = new Date('2026-03-26T00:00:00Z');

function formatCountdown(diffMs: number) {
  const days = Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((diffMs / (1000 * 60 * 60)) % 24));
  return `${days} days ${hours} hours`;
}

function getStatusEmoji(status: ChecklistItem['status']) {
  if (status === 'done') return '✅';
  if (status === 'in_progress') return '⏳';
  return '📝';
}

export default function Home() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000 * 60 * 15);
    return () => clearInterval(timer);
  }, []);

  const randomSentence = useMemo(() => {
    const idx = Math.floor(Math.random() * sentences.length);
    return sentences[idx];
  }, []);

  const upcomingChecklist = useMemo(
    () =>
      [...checklistItems]
        .sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
        .slice(0, 3),
    []
  );

  const countdown = formatCountdown(targetDate.getTime() - now.getTime());

  return (
    <div className="grid" style={{ gap: '18px' }}>
      <div className="card">
        <div className="section-header">
          <h2>Countdown to IB Global Conference, Mumbai 2026</h2>
          <span className="tag">D-day: 2026-03-26</span>
        </div>
        <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0b6b4c' }}>{countdown}</p>
        <p style={{ marginTop: -8, color: '#4b5563' }}>Stay steady and small-step every week.</p>
      </div>

      <div className="card">
        <div className="section-header">
          <h3>Random English Sentence</h3>
          <span className="tag">Set {randomSentence.set}</span>
        </div>
        <p style={{ fontWeight: 700 }}>{randomSentence.english}</p>
        <p style={{ color: '#4b5563' }}>{randomSentence.korean}</p>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>{randomSentence.note}</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {randomSentence.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="section-header">
          <h3>Next Checklist Items</h3>
          <span style={{ color: '#6b7280' }}>Sorted by due date</span>
        </div>
        <div className="grid" style={{ gap: 12 }}>
          {upcomingChecklist.map((item) => (
            <div key={item.id} style={{ border: '1px solid #e5f3f1', padding: 12, borderRadius: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong>
                  {getStatusEmoji(item.status)} {item.title}
                </strong>
                <span className="tag">Due {item.due}</span>
              </div>
              <p style={{ margin: '6px 0', color: '#4b5563' }}>{item.description}</p>
              <span className="tag">Area: {item.area.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
