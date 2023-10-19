import { ReactElement } from 'react';
import { notFound } from 'next/navigation';

import DynamicContent from '../../components/DynamicContent';
import { getGenericPageData } from './data';

type PageProps = {
  params: {
    slug: string;
  };
};

const GenericPage = async ({
  params: { slug },
}: PageProps): Promise<ReactElement> => {
  const pageData = await getGenericPageData(slug);

  if (!pageData) {
    notFound();
  }

  const { title, content } = pageData.attributes;

  return (
    <>
      <h1>{title}</h1>
      <DynamicContent content={content} />
    </>
  );
};

export default GenericPage;
