import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Home } from './pages/Home';
import { SentencesPage } from './pages/Sentences';
import { ChecklistPage } from './pages/Checklist';
import { IBConceptsPage } from './pages/IBConcepts';
import { ContactsPage } from './pages/Contacts';
import { AppProvider } from './context/AppContext';
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="app-shell">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sentences" element={<SentencesPage />} />
            <Route path="/checklist" element={<ChecklistPage />} />
            <Route path="/ib-concepts" element={<IBConceptsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
          </Routes>
        </div>
      </AppProvider>
    </BrowserRouter>
  );
};

export default App;
