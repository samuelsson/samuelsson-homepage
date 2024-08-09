import { ReactElement } from 'react';
import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

import styles from './BlockQuote.module.scss';

const BlockQuote = ({ children }: ReactMarkdownProps): ReactElement => {
  return <blockquote className={styles.BlockQuote}>{children}</blockquote>;
};

export default BlockQuote;
