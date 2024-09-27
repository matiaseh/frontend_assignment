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
      <h1>User List</h1>
      <div className={styles.userCards}>
        {data.map((user: any) => (
          <div key={user.id} className={styles.userCard}>
            <h2>{user.name}</h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Phone:</strong> {user.phone}
            </p>
            <p>
              <strong>Website:</strong> {user.website}
            </p>
            <p>
              <strong>Address:</strong> {user.address.street},{' '}
              {user.address.suite}, {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
