import { Content } from '../../components/DynamicContent';
import { Data, getFetchParams, Response } from '@/utils/apiHelper';

type GenericPageAttributes = {
  title: string;
  slug: string;
  content: Content[];
};

export const getGenericPageData = async (
  slug: string
): Promise<Data<GenericPageAttributes> | null> => {
  const path = '/pages';
  const urlParams = {
    filters: {
      slug,
    },
    populate: ['content'],
  };

  const { requestUrl, options } = getFetchParams(path, urlParams);

  try {
    const response = await fetch(requestUrl, options);
    const data = (await response.json()) as Response<GenericPageAttributes>;

    if (data?.error || !data?.data?.length) {
      return null;
    }

    return data.data[0];
  } catch {
    return null;
  }
};
