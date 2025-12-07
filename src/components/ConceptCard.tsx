import React from 'react';
import { IBConcept } from '../types';

export const ConceptCard: React.FC<{ concept: IBConcept }> = ({ concept }) => {
  return (
    <div className="card">
      <div className="flex-between">
        <h3 style={{ margin: 0 }}>{concept.title}</h3>
        <span className="badge">{concept.category}</span>
      </div>
      <p style={{ color: 'var(--gray)' }}>{concept.summary}</p>
      <p className="section-title">Key points</p>
      <ul style={{ margin: '0 0 0.5rem 1rem', color: 'var(--ink)', paddingLeft: '1rem' }}>
        {concept.keyPoints.map((point) => (
          <li key={point} style={{ marginBottom: '0.3rem' }}>
            {point}
          </li>
        ))}
      </ul>
      <p className="section-title">Sample questions</p>
      <ul style={{ margin: '0 0 0.5rem 1rem', color: 'var(--ink)', paddingLeft: '1rem' }}>
        {concept.sampleQuestions.map((question) => (
          <li key={question} style={{ marginBottom: '0.3rem' }}>
            {question}
          </li>
        ))}
      </ul>
      {concept.takeaway && <p style={{ fontWeight: 700 }}>Takeaway: {concept.takeaway}</p>}
    </div>
  );
};
