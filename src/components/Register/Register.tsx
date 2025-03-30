'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const res = await fetch('https://h1-1lck.onrender.com/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Registration failed');
      return;
    }

    // Redirect to login
    router.push('/login');
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>
        Username:
        <input value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>

      <label>
        Email:
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>

      <button type="submit">Create Account</button>
    </form>
  );
}
