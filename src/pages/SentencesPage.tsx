import { useMemo, useState } from 'react';
import { sentences } from '../data/sentences';

export default function SentencesPage() {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const tags = useMemo(() => {
    const set = new Set<string>();
    sentences.forEach((s) => s.tags.forEach((t) => set.add(t)));
    return ['all', ...Array.from(set)];
  }, []);

  const grouped = useMemo(() => {
    const filtered = selectedTag === 'all'
      ? sentences
      : sentences.filter((s) => s.tags.includes(selectedTag));
    return filtered.reduce<Record<number, typeof sentences>>((acc, sentence) => {
      acc[sentence.set] = acc[sentence.set] || [];
      acc[sentence.set].push(sentence);
      return acc;
    }, {});
  }, [selectedTag]);

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="section-header">
        <h2>English Sentences</h2>
        <select
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          style={{ padding: '8px 10px', borderRadius: 10, border: '1px solid #c7efe3' }}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === 'all' ? 'All tags' : tag}
            </option>
          ))}
        </select>
      </div>

      {Object.entries(grouped).map(([set, group]) => (
        <div key={set} className="card">
          <div className="section-header">
            <h3>Set {set}</h3>
            <span className="tag">{group.length} sentences</span>
          </div>
          <div className="grid" style={{ gap: 10 }}>
            {group.map((sentence) => (
              <div key={sentence.id} style={{ border: '1px solid #e5f3f1', padding: 12, borderRadius: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{sentence.english}</strong>
                  <span className="tag">{sentence.level}</span>
                </div>
                <p style={{ color: '#4b5563', margin: '6px 0' }}>{sentence.korean}</p>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{sentence.note}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {sentence.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
