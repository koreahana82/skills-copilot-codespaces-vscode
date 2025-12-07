import React from 'react';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home' },
  { to: '/sentences', label: 'English Sentences' },
  { to: '/checklist', label: 'Preparation Checklist' },
  { to: '/ib-concepts', label: 'IB Concepts' },
  { to: '/contacts', label: 'Networking Contacts' },
];

export const Sidebar: React.FC = () => {
  return (
    <aside className="sidebar">
      <h1>IB Conference Prep</h1>
      <div className="nav-links">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            end={link.to === '/'}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};
