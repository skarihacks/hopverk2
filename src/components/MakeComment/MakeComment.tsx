'use client';

import { useEffect, useState } from 'react';

type Props = {
  articleId: number;
  onCommentPosted: () => void;
};

export default function MakeComment({ articleId, onCommentPosted }: Props) {
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUsername(user?.username || null);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to comment.');
      return;
    }

    try {
      const res = await fetch('https://h1-1lck.onrender.com/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ articleId, content }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Failed to post comment.');
        return;
      }

      setMessage('Comment posted!');
      setContent('');
      onCommentPosted(); // Notify parent to refresh comments
    } catch (err) {
      setMessage('Something went wrong.');
    }
  };

  if (!username) return null;

  return (
    <div>
      <h3>Write a Comment</h3>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your comment..."
          required
          style={{ width: '100%', minHeight: '80px' }}
        />
        <br />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}
