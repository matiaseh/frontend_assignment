import styles from './dashboard.module.scss';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';

const fetchUsers = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/users`);
  return data;
};

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.header}>Users</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Dashboard;
