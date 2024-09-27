import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='' element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
