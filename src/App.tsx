import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { RepaxioPage } from './pages/RepaxioPage';

function App() {
  return (
    <Router basename="/CompanyPage">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repaxio" element={<RepaxioPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
