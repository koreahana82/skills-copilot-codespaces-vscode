import React from 'react';
import { Sentence } from '../types';

interface Props {
  sentence: Sentence;
}

export const SentenceCard: React.FC<Props> = ({ sentence }) => {
  const levelClass = sentence.level === 'core' ? 'progress' : 'todo';
  const levelLabel = sentence.level === 'core' ? 'Core' : 'Extra';

  return (
    <div className="card">
      <div className="flex-between">
        <div>
          <h3 style={{ margin: '0 0 0.35rem' }}>{sentence.english}</h3>
          <p style={{ margin: 0, color: 'var(--gray)' }}>{sentence.korean}</p>
        </div>
        <span className="badge">Set {sentence.set}</span>
      </div>
      <p style={{ margin: '0.5rem 0', color: 'var(--gray)' }}>{sentence.note}</p>
      <div className="chip-row">
        <span className={`status-pill ${levelClass}`}>{levelLabel}</span>
        {sentence.tags.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};
