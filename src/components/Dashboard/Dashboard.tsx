'use client';

import { useEffect, useState } from 'react';
import { QuestionsApi } from '@/api';
import { Article, Comment, User, UiState } from '@/types';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/footer';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [uiState, setUiState] = useState<UiState>('initial');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const api = new QuestionsApi();

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      router.push('/login');
      return;
    }

    const currentUser = JSON.parse(userJson);
    setUser(currentUser);

    async function fetchData() {
      setUiState('loading');

      const [userArticles, userComments] = await Promise.all([
        api.getUserArticles(currentUser.id),
        api.getUserComments(currentUser.id),
      ]);

      setArticles(userArticles || []);
      setComments(userComments || []);
      setUiState('data');
    }

    fetchData();
  }, [router]);

  async function handleDeleteAccount() {
    if (!user) return;

    const confirmed = window.confirm('Are you sure you want to delete your account? This cannot be undone.');
    if (!confirmed) return;

    const token = localStorage.getItem('token');
    const res = await fetch(`https://h1-1lck.onrender.com/users/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (res.ok) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/');
    } else {
      setMessage('Failed to delete account');
    }
  }

  if (uiState === 'loading') return <p>Loading dashboard...</p>;

  return (
    <div className="page">
      <Navigation />
      <h1>Welcome, {user?.username}</h1>
      {message && <p>{message}</p>}

      <h2>Your Articles</h2>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <Link href={`/articles/${article.id}`}>{article.articlename}</Link>
          </li>
        ))}
        {articles.length === 0 && <li>No articles found.</li>}
      </ul>

      <h2>Your Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
          "{comment.content}"" on{' '}
          <Link href={`/articles/${comment.articleId}` } style={{fontWeight: 'bold'}}>
            {comment.article?.articlename || `Article #${comment.articleId}`}
          </Link>
        </li>
        ))}
        {comments.length === 0 && <li>No comments found.</li>}
      </ul>

      <button onClick={handleDeleteAccount} style={{ marginTop: '2rem', color: 'red' }}>
        Delete My Account
      </button>
      <Footer />
    </div>
  );
}
