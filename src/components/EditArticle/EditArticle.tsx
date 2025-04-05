'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/types';
import { QuestionsApi } from '@/api';

type Props = {
  articleId: number;
};

export default function EditArticleForm({ articleId }: Props) {
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [articlename, setArticlename] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      const api = new QuestionsApi();
      const data = await api.getArticleById(articleId);
      if (data) {
        setArticle(data);
        setArticlename(data.articlename);
        setContent(data.content);
      }
      setLoading(false);
    }

    fetchArticle();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Unauthorized');
      return;
    }

    const formData = new FormData();
    formData.append('articlename', articlename);
    formData.append('content', content);

    try {
      const res = await fetch(`https://h1-1lck.onrender.com/articles/${articleId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Update failed');
      } else {
        setMessage('Article updated!');
        router.push(`/articles/${articleId}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Article</h2>
      {message && <p>{message}</p>}

      <label>
        Title:
        <input
          type="text"
          value={articlename}
          onChange={(e) => setArticlename(e.target.value)}
          required
        />
      </label>

      <label>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </label>

      <button type="submit">Update</button>
    </form>
  );
}
