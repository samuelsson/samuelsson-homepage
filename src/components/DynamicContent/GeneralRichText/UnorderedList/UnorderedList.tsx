import { UnorderedListComponent } from 'react-markdown/lib/ast-to-react';

import styles from './UnorderedList.module.scss';

const UnorderedList: UnorderedListComponent = ({ children }) => {
  return <ul className={styles.UnorderedList}>{children}</ul>;
};

export default UnorderedList;
