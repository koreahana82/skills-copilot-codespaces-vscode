import { useMemo, useState } from 'react';
import { ibConcepts } from '../data/ibConcepts';

export default function IBConceptPage() {
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    ibConcepts.forEach((c) => set.add(c.category));
    return ['all', ...Array.from(set)];
  }, []);

  const visible = useMemo(
    () => (category === 'all' ? ibConcepts : ibConcepts.filter((c) => c.category === category)),
    [category]
  );

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="section-header">
        <h2>IB Concepts</h2>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '8px 10px', borderRadius: 10, border: '1px solid #c7efe3' }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === 'all' ? 'All categories' : c}
            </option>
          ))}
        </select>
      </div>
      <div className="grid" style={{ gap: 12 }}>
        {visible.map((concept) => (
          <div key={concept.id} className="card">
            <div className="section-header">
              <div>
                <h3 style={{ margin: 0 }}>{concept.titleEn}</h3>
                <p style={{ margin: '4px 0', color: '#4b5563' }}>{concept.titleKo}</p>
              </div>
              <span className="tag">{concept.category}</span>
            </div>
            <p style={{ margin: '6px 0' }}>{concept.descriptionEn}</p>
            <p style={{ margin: '6px 0', color: '#4b5563' }}>{concept.descriptionKo}</p>
            <div style={{ background: '#f8fbfb', padding: 12, borderRadius: 10, border: '1px solid #e5f3f1' }}>
              <strong>Sample Question</strong>
              <p style={{ margin: '4px 0' }}>{concept.exampleQuestionEn}</p>
              <p style={{ margin: '4px 0', color: '#4b5563' }}>{concept.exampleQuestionKo}</p>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
              {concept.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
