import { OrderedListComponent } from 'react-markdown/lib/ast-to-react';

import styles from './OrderedList.module.scss';

const OrderedList: OrderedListComponent = ({ children }) => {
  return <ol className={styles.OrderedList}>{children}</ol>;
};

export default OrderedList;
