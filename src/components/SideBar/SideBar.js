import Link from 'next/link';
import clsx from 'clsx';

import sidebarLogo from '@assets/images/Kitsumon-Sidebar-Logo.png';

import styles from './SideBar.module.scss';

const SideBar = () => {
  return (
    <nav className={clsx(styles.sidebar, 'mobile-hide')}>
      <div className={styles.sidebarLogo}>
        <Link href="/marketplace" passHref>
          <a aria-label="Kitsumon marketplace Home">
            <img
              src={sidebarLogo.src}
              width="38"
              height="40"
              alt="Kitsumon sidebar logo"
            />
          </a>
        </Link>
      </div>

      <ul className={styles.navMenu}>
        <li className={styles.navItem}>
          <a
            href="/"
            rel="noopener noreferrer"
            className={styles.navItem}
            aria-label="Kitsumon homepage">
            HOME
          </a>
        </li>
        <li className={styles.navItem}>
          <Link href="/" passHref>
            <a className={styles.navItem} aria-label="Kitsumon marketplace">
              MARKET
            </a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <a
            href="/"
            rel="noopener noreferrer"
            className={styles.navItem}
            aria-label="Kitsumon github whitepaper">
            WHITE PAPER
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
