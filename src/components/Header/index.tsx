import Link from 'next/link';
import styles from './header.module.scss';

export function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Link href="/">
          <a>
            <img src="/images/logo.svg" alt="logo" />
            <h2>spacetraveling</h2>
            <span>.</span>
          </a>
        </Link>
      </div>
    </header>
  );
}
