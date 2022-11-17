import styles from './PageFooter.module.scss';

const PageFooter = (): JSX.Element => {
  return (
    <footer className={styles.PageFooter}>
      <div className={styles.PageFooterContainer}>Footer</div>
    </footer>
  );
};

export default PageFooter;
