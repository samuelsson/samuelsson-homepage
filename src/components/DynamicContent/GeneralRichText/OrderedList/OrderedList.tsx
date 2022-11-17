import { OrderedListComponent } from 'react-markdown/lib/ast-to-react';

import styles from './OrderedList.module.scss';

const OrderedList: OrderedListComponent = ({ depth, children }) => {
  if (depth === 0) {
    return (
      <div className={styles.OrderedListWrapper}>
        <ol className={styles.OrderedList}>{children}</ol>
      </div>
    );
  }

  return <ol className={styles.OrderedList}>{children}</ol>;
};

export default OrderedList;
