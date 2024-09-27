import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './navigation.module.scss';

const Navigation: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className={styles.nav}>
      <button onClick={() => navigate('/')}>Home</button>
      <button onClick={() => navigate('/dashboard')}>Dashboard</button>
    </nav>
  );
};

export default Navigation;
