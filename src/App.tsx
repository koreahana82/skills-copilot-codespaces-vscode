import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import SentencesPage from './pages/SentencesPage';
import ChecklistPage from './pages/ChecklistPage';
import IBConceptPage from './pages/IBConceptPage';
import ContactsPage from './pages/ContactsPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sentences" element={<SentencesPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/ib-concepts" element={<IBConceptPage />} />
        <Route path="/contacts/*" element={<ContactsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
