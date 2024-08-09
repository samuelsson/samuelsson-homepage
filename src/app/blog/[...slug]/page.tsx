import { ReactElement } from 'react';
import { notFound } from 'next/navigation';

import BlogPostHeader from './BlogPostHeader';
import DynamicContent from '../../../components/DynamicContent';
import { getBlogPostData } from './data';

type BlogPostPageProps = {
  params: {
    slug: string;
  };
};

const BlogPostPage = async ({
  params: { slug },
}: BlogPostPageProps): Promise<ReactElement> => {
  const blogPostData = await getBlogPostData(slug);

  if (!blogPostData) {
    notFound();
  }

  const { title, content, publishedAt, categories, createdAt, summary } =
    blogPostData.attributes;

  const category = categories.data
    .map((cat) => cat.attributes.name)
    .filter(Boolean)
    .join(' • ');

  return (
    <article>
      <BlogPostHeader
        title={title}
        publishedDate={publishedAt || createdAt}
        category={category}
        summary={summary}
      />
      <DynamicContent content={content} />
      {/* <BlogPostFooter /> */}
    </article>
  );
};

export default BlogPostPage;
