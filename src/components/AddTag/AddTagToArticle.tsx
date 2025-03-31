'use client';
import { useEffect, useState } from 'react';
import { QuestionsApi } from '@/api';
import { Tag } from '@/types'; // Make sure this is correctly imported

export default function AddTagToArticle({ articleId }: { articleId: number }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedTagName, setSelectedTagName] = useState('');
  const [message, setMessage] = useState('');

  const api = new QuestionsApi();

  useEffect(() => {
    async function fetchTags() {
      const tagList = await api.getTags();
      if (tagList) setTags(tagList);
    }
    fetchTags();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in.');
      return;
    }

    const res = await fetch(`https://h1-1lck.onrender.com/tags/${selectedTagName}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ articleId }),
    });

    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || 'Failed to add tag');
    } else {
      setMessage('Tag added to article!');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Add Tag:
        <select value={selectedTagName} onChange={(e) => setSelectedTagName(e.target.value)}>
          <option value="">Select tag</option>
          {tags.map((tag) => (
            <option key={tag.id} value={tag.name}>
              {tag.name}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Tag</button>
      {message && <p>{message}</p>}
    </form>
  );
}
