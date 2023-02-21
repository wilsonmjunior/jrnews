import styles from './styles.module.scss';
import { ActiveLink } from '../ActiveLink';
import { SignInButton } from '../SignInButton';

export function Header() {
  return(
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news"/>
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <p>Home</p>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <p>Posts</p>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
