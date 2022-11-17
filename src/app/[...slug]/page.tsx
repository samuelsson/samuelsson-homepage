import { notFound } from 'next/navigation';

import DynamicContent from '../../components/DynamicContent';
import ElementWrapper from '../../components/ElementWrapper';
import { getGenericPageData } from './data';

type PageProps = {
  params: {
    slug: string;
  };
};

const GenericPage = async ({
  params: { slug },
}: PageProps): Promise<JSX.Element> => {
  const pageData = await getGenericPageData(slug);

  if (!pageData) {
    notFound();
  }

  const { title, content } = pageData.attributes;

  return (
    <>
      <ElementWrapper width="m">
        <h1>{title}</h1>
      </ElementWrapper>
      <DynamicContent content={content} />
    </>
  );
};

export default GenericPage;
