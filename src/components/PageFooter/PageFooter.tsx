import { ReactElement } from 'react';

import styles from './PageFooter.module.scss';

const PageFooter = (): ReactElement => {
  return (
    <footer className={styles.PageFooter}>
      <div className={styles.PageFooterContainer}>Footer</div>
    </footer>
  );
};

export default PageFooter;
