import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { API_BASE_URL } from '../../constants/apiConstants';
import { User } from '../../types/api';
import UserFilters from '../UserFilter/UserFilter';
import styles from './dashboard.module.scss';

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

  const renderContent = () => {
    if (isLoading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error loading data</div>;
    if (!data || data.length === 0) {
      return <div className={styles.noUsers}>No users found.</div>;
    }

    // Filter the users data based on user input
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

    // Sort the filtered users either by name/email in ascending or descending order
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      const fieldA = sortField === 'name' ? a.name : a.email;
      const fieldB = sortField === 'name' ? b.name : b.email;

      return sortOrder === 'asc'
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    });

    return (
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
    );
  };

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
      {renderContent()}
    </div>
  );
};

export default Dashboard;
