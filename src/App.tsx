import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import './index.css';

const App: React.FC = () => {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route path='' element={<Dashboard />} />

          {/* Catch all unknown routes and redirect */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
