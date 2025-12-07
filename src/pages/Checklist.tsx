import React, { useMemo, useState } from 'react';
import { ChecklistCard } from '../components/ChecklistCard';
import { useAppData } from '../context/AppContext';
import { ChecklistItem } from '../types';

export const ChecklistPage: React.FC = () => {
  const { checklist, updateChecklistStatus } = useAppData();
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const filtered = useMemo(() => {
    return checklist.filter((item) => {
      const categoryMatch = !category || item.category === category;
      const statusMatch = !status || item.status === status;
      return categoryMatch && statusMatch;
    });
  }, [checklist, category, status]);

  const categoryOptions = Array.from(new Set(checklist.map((item) => item.category)));

  return (
    <div className="main-content">
      <div className="page-header">
        <h2>Preparation Checklist</h2>
        <p>Travel, English, IB content, and on-site items in one place.</p>
      </div>

      <div className="grid stat-grid">
        <div className="card">
          <label className="label" htmlFor="category">
            Category
          </label>
          <select id="category" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
        <div className="card">
          <label className="label" htmlFor="status">
            Status
          </label>
          <select id="status" className="select" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All</option>
            <option value="todo">To do</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>

      <h3 className="section-title">Items ({filtered.length})</h3>
      <div className="list">
        {filtered.map((item: ChecklistItem) => (
          <ChecklistCard key={item.id} item={item} onStatusChange={(status) => updateChecklistStatus(item.id, status)} />
        ))}
      </div>
    </div>
  );
};
