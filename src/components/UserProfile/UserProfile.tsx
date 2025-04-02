'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { QuestionsApi } from '@/api';
import { Article, Comment, User, UiState } from '@/types';

export default function UserProfilePage() {
  const { userId } = useParams();
  const api = new QuestionsApi();

  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');

  // Check if current user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      if (parsed?.admin) {
        setIsAdmin(true);
      }
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      if (!userId) return;

      const userRes = await api.getUserById(Number(userId));
      const articlesRes = await api.getUserArticles(Number(userId));
      const commentsRes = await api.getUserComments(Number(userId));

      if (!userRes) {
        setUiState('error');
        return;
      }

      setUser(userRes);
      setArticles(articlesRes || []);
      setComments(commentsRes || []);
      setUiState('data');
    }

    fetchData();
  }, [userId]);

  const handleDelete = async () => {
    const confirmed = confirm(`Are you sure you want to delete ${user?.username}'s account?`);
    if (!confirmed) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`https://h1-1lck.onrender.com/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || 'Failed to delete user.');
        return;
      }

      alert('User deleted successfully.');
      window.location.href = '/users';
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Error deleting user.');
    }
  };

  if (uiState === 'loading') return <p>Loading...</p>;
  if (uiState === 'error') return <p>Error loading user</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div>
      <h1>{user.username}</h1>
      <p>Email: {user.email}</p>
      <p style={{marginBottom: '1rem'}}>Admin: {user.admin ? 'Yes' : 'No'}</p>

      {isAdmin && (
        <button onClick={handleDelete} style={{ marginTop: '1rem', marginBottom: '1rem' }}>
          Delete User Account
        </button>
      )}

      <h2>Articles</h2>
      <ul>
        {articles.map((a) => (
          <li key={a.id}>
            <Link href={`/articles/${a.id}`}>{a.articlename}</Link>
          </li>
        ))}
        {articles.length === 0 && <li>No articles found.</li>}
      </ul>

      <h2>Comments</h2>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            "{c.content}"" on{' '}
            <Link href={`/articles/${c.articleId}` } style={{fontWeight: 'bold'}}>
              {c.article?.articlename || `Article #${c.articleId}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
