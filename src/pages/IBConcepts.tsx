import React from 'react';
import { ConceptCard } from '../components/ConceptCard';
import { useAppData } from '../context/AppContext';

export const IBConceptsPage: React.FC = () => {
  const { concepts } = useAppData();

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>IB Concepts</h2>
        <p>Key ideas, talking points, and sample questions to reference quickly.</p>
      </div>
      <div className="list">
        {concepts.map((concept) => (
          <ConceptCard key={concept.id} concept={concept} />
        ))}
      </div>
    </div>
  );
};
