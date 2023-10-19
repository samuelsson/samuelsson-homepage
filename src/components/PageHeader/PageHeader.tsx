import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';

import styles from './PageHeader.module.scss';
import Logo from '../../assets/images/logo.svg';

const PageHeader = (): ReactElement => {
  return (
    <header className={styles.PageHeader}>
      <div className={styles.PageHeaderContainer}>
        <Link className={styles.Logo} href="/" aria-label="Home">
          <Image src={Logo} alt="Logo of Samuelsson's homepage" fill />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default PageHeader;
