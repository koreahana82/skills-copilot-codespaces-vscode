import { useMemo, useState } from 'react';
import { checklistItems as seedItems } from '../data/checklist';
import { ChecklistArea, ChecklistItem } from '../types';

const statusOrder: ChecklistItem['status'][] = ['todo', 'in_progress', 'done'];

function nextStatus(current: ChecklistItem['status']) {
  const idx = statusOrder.indexOf(current);
  return statusOrder[(idx + 1) % statusOrder.length];
}

function areaLabel(area: ChecklistArea) {
  return area.replace('_', ' ');
}

export default function ChecklistPage() {
  const [items, setItems] = useState<ChecklistItem[]>(() =>
    [...seedItems].sort((a, b) => new Date(a.due).getTime() - new Date(b.due).getTime())
  );

  const grouped = useMemo(() => {
    return items.reduce<Record<ChecklistArea, ChecklistItem[]>>((acc, item) => {
      const area = item.area;
      acc[area] = acc[area] || [];
      acc[area].push(item);
      return acc;
    }, { travel: [], english: [], ib_preparation: [], onsite: [] });
  }, [items]);

  const toggleStatus = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus(item.status) } : item))
    );
  };

  return (
    <div className="grid" style={{ gap: 16 }}>
      <div className="section-header">
        <h2>Preparation Checklist</h2>
        <span style={{ color: '#6b7280' }}>Tap status to cycle todo → in progress → done</span>
      </div>
      {Object.entries(grouped).map(([area, areaItems]) => (
        <div key={area} className="card">
          <div className="section-header">
            <h3>{areaLabel(area as ChecklistArea)}</h3>
            <span className="tag">{areaItems.length} items</span>
          </div>
          <div className="grid" style={{ gap: 10 }}>
            {areaItems.map((item) => (
              <div
                key={item.id}
                style={{
                  border: '1px solid #e5f3f1',
                  padding: 12,
                  borderRadius: 10,
                  background: item.status === 'done' ? '#f0fdf4' : 'white',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>{item.title}</strong>
                  <button
                    onClick={() => toggleStatus(item.id)}
                    style={{
                      border: '1px solid #9de8d3',
                      background: '#e6faf5',
                      padding: '6px 10px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      color: '#0b6b4c',
                    }}
                  >
                    {item.status}
                  </button>
                </div>
                <p style={{ color: '#4b5563', margin: '6px 0' }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tag">Due {item.due}</span>
                  {item.isRequired && <span className="tag">Required</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
