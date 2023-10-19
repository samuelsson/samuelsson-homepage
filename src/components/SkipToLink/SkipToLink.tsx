import { ReactElement } from 'react';

import styles from './SkipToLink.module.scss';

type SkipToLinkProps = {
  skipToId: string;
  text: string;
};

const SkipToLink = ({ skipToId, text }: SkipToLinkProps): ReactElement => {
  return (
    <a className={styles.SkipToLink} href={skipToId}>
      {text}
    </a>
  );
};

export default SkipToLink;
