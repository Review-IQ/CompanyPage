import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { RepXPage } from './pages/RepXPage';

function App() {
  return (
    <Router basename="/">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/repx" element={<RepXPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
