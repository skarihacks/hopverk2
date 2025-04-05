'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/types';

type Props = {
  article: Article;
};

export default function EditArticleForm({ article }: Props) {
  const router = useRouter();
  const [articlename, setArticlename] = useState(article.articlename);
  const [content, setContent] = useState(article.content);
  const [message, setMessage] = useState('');

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
      const res = await fetch(`https://h1-1lck.onrender.com/articles/${article.id}`, {
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
        router.push(`/articles/${article.id}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
  };

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
