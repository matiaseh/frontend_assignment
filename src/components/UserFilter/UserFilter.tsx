import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';
import styles from './userfilter.module.scss';

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (search: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  sortField: 'name' | 'email';
  setSortField: (field: 'name' | 'email') => void;
}

const UserFilters: React.FC<UserFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  sortField,
  setSortField,
}) => {
  return (
    <div className={styles.filtersContainer}>
      <input
        type='text'
        placeholder='Filter by name, email, phone or address'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      {/* TODO: Store filter selection to localStorage for example */}
      <select
        value={sortField}
        onChange={e => setSortField(e.target.value as 'name' | 'email')}
        className={styles.sortSelect}
      >
        <option value='name'>Sort by Name</option>
        <option value='email'>Sort by Email</option>
      </select>

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        className={styles.sortButton}
      >
        {sortOrder === 'asc' ? <FaArrowUp /> : <FaArrowDown />}
      </button>
    </div>
  );
};

export default UserFilters;
