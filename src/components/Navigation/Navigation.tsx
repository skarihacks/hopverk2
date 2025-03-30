'use client'

import Link from "next/link";
import styles from './Navigation.module.css'
import { useEffect, useState } from 'react';


export default function Navigation() {
  const [username, setUsername] = useState<string | null>(null);
  

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user = JSON.parse(userJson);
      setUsername(user.username);
    }
  }, []);

  function handleLogout() {
    // Remove both the token and user from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  
    // Update the state to reflect the logout
    setUsername(null);
  
    // Optionally trigger a custom event to update UI
    window.dispatchEvent(new Event('userLoggedOut'));
  
    // Redirect to home or login
    window.location.href = '/';
  }

  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">Forsíða</Link></li>
        <li><Link href="/articles">Articles</Link></li>
        <li><Link href="/browse">Categories</Link></li>
        <li><Link href="/users">Users</Link></li>
        <li><Link href="/write">Write a new article</Link></li>
        {username ? (
          <>
         <li><Link href="/dashboard">👤 {username}</Link></li>
         <li className={styles.logoutbutton}><button onClick={handleLogout}>Logout</button></li>
         </>
        ) : (
          <>
          <li><Link href="/login">🔐 Login</Link></li>
          </>
        )}
        

      </ul>
    </nav>
  );
}