import styles from './dashboard.module.scss';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants';
import { useState } from 'react';
import UserFilters from '../UserFilter/UserFilter';
import { User } from '../../types/api';

const fetchUsers = async (): Promise<User[]> => {
  const { data } = await axios.get(`${API_BASE_URL}/users`);
  return data;
};

const Dashboard: React.FC = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'name' | 'email'>('name');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data || data.length === 0) {
    return <div>No users found.</div>;
  }

  const filteredUsers = data.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.toLowerCase().includes(searchLower) ||
      user.address.street.toLowerCase().includes(searchLower) ||
      user.address.city.toLowerCase().includes(searchLower)
    );
  });

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const fieldA = sortField === 'name' ? a.name : a.email;
    const fieldB = sortField === 'name' ? b.name : b.email;

    return sortOrder === 'asc'
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  return (
    <div className={styles.dashboard}>
      <h1>User Dashboard</h1>
      <UserFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortField={sortField}
        setSortField={setSortField}
      />
      <div className={styles.userCards}>
        {sortedUsers.map(user => (
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
