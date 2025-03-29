import Link from "next/link";

import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">Forsíða</Link></li>
        <li><Link href="/articles">Articles</Link></li>
        <li><Link href="/browse">Categories</Link></li>
        <li><Link href="/">Write a new article</Link></li>
        <li><Link href="/Login">Login</Link></li>
      </ul>
    </nav>
  );
}