import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="logo" />
        <h2>spacetraveling</h2>
        <span>.</span>
      </div>
    </header>
  );
}
