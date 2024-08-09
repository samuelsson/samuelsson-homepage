import { Data, getFetchParams, Response } from '@/utils/apiHelper';
import { Content } from '../../../components/DynamicContent';

type Category = {
  name: string;
  slug: string;
};

type BlogPostAttributes = {
  title: string;
  slug: string;
  categories: {
    data: Data<Category>[];
  };
  summary: string;
  content: Content[];
};

export const getBlogPostData = async (
  slug: string
): Promise<Data<BlogPostAttributes> | null> => {
  const path = '/posts';
  const urlParams = {
    filters: {
      slug,
    },
    populate: ['content', 'categories'],
  };

  const { requestUrl, options } = getFetchParams(path, urlParams);

  try {
    const response = await fetch(requestUrl, options);
    const data = (await response.json()) as Response<BlogPostAttributes>;

    if (data?.error || !data?.data?.length) {
      return null;
    }

    return data.data[0];
  } catch {
    return null;
  }
};
