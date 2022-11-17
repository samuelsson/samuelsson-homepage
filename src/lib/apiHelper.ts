import qs from 'qs';

type FetchParams = {
  requestUrl: string;
  options: RequestInit;
};

export type Data<Attributes> = {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  } & Attributes;
};

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type Error = {
  status: number;
  name: string;
  message: string;
  details: object;
};

export type Response<Attributes> = {
  data: Data<Attributes>[] | null;
  meta?: Meta;
  error?: Error;
};

export const getFetchParams = (
  path: string,
  urlParams: object
): FetchParams => {
  const options = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN || ''}`,
      'Content-Type': 'application/json',
    },
  };

  // Build request URL
  const isProduction = process.env.NODE_ENV === 'production';
  const apiUrl = process.env.STRAPI_API_URL || 'http://127.0.0.1:1337';
  const queryString = qs.stringify({
    ...urlParams,
    publicationState: isProduction ? 'live' : 'preview',
  });

  const requestUrl = `${apiUrl}${path}${queryString ? `?${queryString}` : ''}`;

  return { requestUrl, options };
};
