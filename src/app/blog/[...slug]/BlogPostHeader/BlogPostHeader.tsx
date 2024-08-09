import { ReactElement } from 'react';

import styles from './BlogPostHeader.module.scss';

type BlogPostHeaderProps = {
  title: string;
  publishedDate: string | null;
  category?: string;
  summary?: string;
};

const BlogPostHeader = ({
  title,
  publishedDate,
  category,
  summary,
}: BlogPostHeaderProps): ReactElement => {
  const date = publishedDate ? new Date(publishedDate) : null;
  const humanReadableDate = date?.toDateString();
  const isoDate = date?.toISOString().split('T')[0];

  return (
    <header className={styles.BlogPostHeader}>
      <div className={styles.ContentWrapper}>
        {category ? <span className={styles.Category}>{category}</span> : null}
        <h1 className={styles.Heading}>{title}</h1>
        <time className={styles.PublishedDate} dateTime={isoDate}>
          {humanReadableDate}
        </time>
        {summary ? <p className={styles.Summary}>{summary}</p> : null}
      </div>
    </header>
  );
};

export default BlogPostHeader;
