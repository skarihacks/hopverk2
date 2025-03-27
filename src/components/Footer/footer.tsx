import Link from "next/link";

import styles from './Footer.module.css'


export default function Footer() {
    return (
      <nav className={styles.footer}>
        <ul>
          <li><Link href="https://www.youtube.com/watch?v=xvFZjo5PgG0">Check out my other work!</Link></li>
          
        </ul>
      </nav>
    );
  }