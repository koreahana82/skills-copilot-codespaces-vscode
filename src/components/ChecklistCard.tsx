import React from 'react';
import { ChecklistItem } from '../types';

interface Props {
  item: ChecklistItem;
  onStatusChange: (status: ChecklistItem['status']) => void;
}

const statusLabel: Record<ChecklistItem['status'], string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const ChecklistCard: React.FC<Props> = ({ item, onStatusChange }) => {
  return (
    <div className="card">
      <div className="flex-between">
        <div>
          <h3 style={{ margin: '0 0 0.35rem' }}>{item.title}</h3>
          <p style={{ margin: 0, color: 'var(--gray)' }}>{item.description}</p>
        </div>
        <select
          aria-label="Update status"
          className="select"
          value={item.status}
          onChange={(e) => onStatusChange(e.target.value as ChecklistItem['status'])}
          style={{ maxWidth: '160px' }}
        >
          <option value="todo">To do</option>
          <option value="in_progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="chip-row" style={{ marginTop: '0.5rem' }}>
        <span className={`status-pill ${item.status === 'todo' ? 'todo' : item.status === 'done' ? 'done' : 'progress'}`}>
          {statusLabel[item.status]}
        </span>
        <span className="badge">{item.category.replace('_', ' ')}</span>
        {item.tags?.map((tag) => (
          <span key={tag} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      {item.due && (
        <p style={{ margin: '0.5rem 0 0', color: 'var(--gray)' }}>Due: {item.due}</p>
      )}
    </div>
  );
};
