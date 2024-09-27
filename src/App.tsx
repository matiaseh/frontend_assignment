import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation';
import './index.css';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Add some home page content */}
      <Route path='' element={<div>Home</div>} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Catch all unknown routes and redirect */}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <div className='app-container'>
    <Router>
      <Navigation />
      <AppRoutes />
    </Router>
  </div>
);

export default App;
