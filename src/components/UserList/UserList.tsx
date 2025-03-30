'use client';

import { useState, useEffect } from 'react';
import { QuestionsApi } from '@/api';
import { User, UiState } from '@/types';
import Link from 'next/link';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');
  const api = new QuestionsApi();

  useEffect(() => {
    async function fetchUsers() {
      setUiState('loading');
      const response = await api.getAllUsers();

      if (!response) {
        setUiState('error');
        return;
      }

      setUsers(response);
      setUiState('data');
    }

    fetchUsers();
  }, []);

  if (uiState === 'loading') {
    return <p>Loading users...</p>;
  }

  if (uiState === 'error') {
    return <p>Error loading users. Please try again later.</p>;
  }

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
