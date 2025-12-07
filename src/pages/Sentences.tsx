import React, { useMemo, useState } from 'react';
import { useAppData } from '../context/AppContext';
import { SentenceCard } from '../components/SentenceCard';
import { Sentence } from '../types';

export const SentencesPage: React.FC = () => {
  const { sentences } = useAppData();
  const [setFilter, setSetFilter] = useState<number | 'all'>('all');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');

  const categories = useMemo(
    () => Array.from(new Set(sentences.map((s) => s.category))),
    [sentences]
  );

  const filtered = useMemo(() => {
    return sentences.filter((sentence) => {
      const matchesSet = setFilter === 'all' || sentence.set === setFilter;
      const matchesCategory = !category || sentence.category === category;
      const lowered = query.toLowerCase();
      const matchesQuery =
        !query ||
        sentence.english.toLowerCase().includes(lowered) ||
        sentence.korean.toLowerCase().includes(lowered) ||
        sentence.tags.some((tag) => tag.toLowerCase().includes(lowered));
      return matchesSet && matchesCategory && matchesQuery;
    });
  }, [sentences, setFilter, category, query]);

  const onSetChange = (value: string) => {
    if (value === 'all') {
      setSetFilter('all');
    } else {
      setSetFilter(Number(value));
    }
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>English Sentences</h2>
        <p>Core and extra phrases in English and Korean for the conference.</p>
      </div>
      <div className="grid stat-grid">
        <div className="card">
          <label className="label" htmlFor="set-filter">
            Set
          </label>
          <select id="set-filter" className="select" value={setFilter} onChange={(e) => onSetChange(e.target.value)}>
            <option value="all">All sets</option>
            {[...new Set(sentences.map((s) => s.set))].map((setNumber) => (
              <option key={setNumber} value={setNumber}>
                Set {setNumber}
              </option>
            ))}
          </select>
        </div>
        <div className="card">
          <label className="label" htmlFor="category-filter">
            Category
          </label>
          <select
            id="category-filter"
            className="select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="card">
          <label className="label" htmlFor="search">
            Search English/Korean/Tags
          </label>
          <input
            id="search"
            className="input"
            placeholder="Type a keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <h3 className="section-title">Results ({filtered.length})</h3>
      <div className="list">
        {filtered.map((sentence: Sentence) => (
          <SentenceCard key={sentence.id} sentence={sentence} />
        ))}
      </div>
    </div>
  );
};
