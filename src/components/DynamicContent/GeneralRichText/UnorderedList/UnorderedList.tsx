import { UnorderedListComponent } from 'react-markdown/lib/ast-to-react';

import styles from './UnorderedList.module.scss';

const UnorderedList: UnorderedListComponent = ({ depth, children }) => {
  if (depth === 0) {
    return (
      <div className={styles.UnorderedListWrapper}>
        <ul className={styles.UnorderedList}>{children}</ul>
      </div>
    );
  }

  return <ul className={styles.UnorderedList}>{children}</ul>;
};

export default UnorderedList;
