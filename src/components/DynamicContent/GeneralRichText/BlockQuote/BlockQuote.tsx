import { ReactMarkdownProps } from 'react-markdown/lib/complex-types';

import styles from './BlockQuote.module.scss';

const BlockQuote = ({ children }: ReactMarkdownProps): JSX.Element => {
  return (
    <div className={styles.BlockQuoteWrapper}>
      <blockquote className={styles.BlockQuote}>{children}</blockquote>
    </div>
  );
};

export default BlockQuote;
