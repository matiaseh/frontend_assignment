import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Navigation/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* Add some home page content */}
        <Route path='' element={<div>Home</div>} />
        <Route path='/dashboard' element={<Dashboard />} />

        {/* Catch all unknown routes and redirect */}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
