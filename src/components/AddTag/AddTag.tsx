'use client';

import { useState } from 'react';

export default function AddTag() {
  const [tagName, setTagName] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in as admin to create a tag.');
      return;
    }

    try {
      const res = await fetch('https://h1-1lck.onrender.com/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: tagName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Failed to create tag');
      } else {
        setMessage('Tag created!');
        setTagName('');
        window.location.reload();
      }
    } catch (err) {
      console.error('Failed to create category.', err);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Tag</h3>
      {message && <p>{message}</p>}

      <label>
        Tag Name:
        <input value={tagName} onChange={(e) => setTagName(e.target.value)} required />
      </label>

      <button type="submit">Create Tag</button>
    </form>
  );
}
