import React from 'react';
import { QuickStat } from '../types';

export const StatCard: React.FC<QuickStat> = ({ label, value, hint }) => {
  return (
    <div className="card">
      <p className="section-title" style={{ margin: 0, textTransform: 'none', fontSize: '0.9rem' }}>
        {label}
      </p>
      <h3 style={{ fontSize: '1.8rem', margin: '0.2rem 0' }}>{value}</h3>
      {hint && <p style={{ margin: 0, color: 'var(--gray)' }}>{hint}</p>}
    </div>
  );
};
