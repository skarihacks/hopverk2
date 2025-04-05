import styles from './Footer.module.css'


export default function Footer() {
    return (
      <nav className={styles.footer}>
        <ul>
          <li>Sævar Breki Snorrason</li>
          <li>Hópverkefni 2</li>
          <li>Óskar Víkingur Davíðsson</li>
        </ul>
      </nav>
    );
  }