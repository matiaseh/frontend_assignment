import React from 'react';

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
    <div>
      <input
        type='text'
        placeholder='Filter by name, email, phone or address'
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <select
        value={sortField}
        onChange={e => setSortField(e.target.value as 'name' | 'email')}
      >
        <option value='name'>Sort by Name</option>
        <option value='email'>Sort by Email</option>
      </select>

      <button
        onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
      >
        Sort {sortOrder === 'asc' ? 'Descending' : 'Ascending'}
      </button>
    </div>
  );
};

export default UserFilters;
