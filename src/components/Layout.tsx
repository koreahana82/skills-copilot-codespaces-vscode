import { NavLink } from 'react-router-dom';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive ? 'active' : '';

export function Layout({ children }: Props) {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>IB Conference Prep</h1>
        <nav className="nav-links">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/sentences" className={navLinkClass}>
            English Sentences
          </NavLink>
          <NavLink to="/checklist" className={navLinkClass}>
            Checklist
          </NavLink>
          <NavLink to="/ib-concepts" className={navLinkClass}>
            IB Concepts
          </NavLink>
          <NavLink to="/contacts" className={navLinkClass}>
            Contacts
          </NavLink>
        </nav>
      </aside>
      <main className="main-content">{children}</main>
    </div>
  );
}
