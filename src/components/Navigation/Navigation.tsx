import Link from "next/link";

import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">Forsíða</Link></li>
        <li><Link href="/flokkar">Flokkar</Link></li>
        <li><Link href="/insert">Bæta við spurningu</Link></li>
        <li><Link href="/changeQuestion">Breyta spurningu</Link></li>
        <li><Link href="/createChangeDelete">Bæta við, breyta eða eyða flokk.</Link></li>
      </ul>
    </nav>
  );
}