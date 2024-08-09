import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
    // sitemap: 'https://acme.com/sitemap.xml',
  };
};

export default robots;
