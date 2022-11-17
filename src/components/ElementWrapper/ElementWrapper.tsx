import classNames from 'classnames';

import { ReactNode } from 'react';
import styles from './ElementWrapper.module.scss';

type ElementWrapperProps = {
  children: ReactNode;
  width?: 's' | 'm' | 'l' | 'xl' | 'none';
};

const ElementWrapper = ({
  children,
  width = 'none',
}: ElementWrapperProps): JSX.Element => {
  return (
    <div className={classNames(styles.ElementWrapper, [styles[width]])}>
      {children}
    </div>
  );
};

export default ElementWrapper;
