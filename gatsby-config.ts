import { GatsbyConfig } from 'gatsby';

export const siteMetadata: GatsbyConfig['siteMetadata'] = {
  title: 'Erik Samuelsson',
  author: 'Erik Samuelsson',
  description:
    'Erik is a web developer from Sweden who has a huge interest in software development, IT and technology. He documents the new stuff he learns in this fast paced industry as he goes along.',
  tagLine: 'Blog and homepage of web developer Erik Samuelsson',
  siteUrl: 'https://eriksamuelsson.com',
  social: {
    twitter: '@ErikSamuelsson',
    gitHub: 'samuelsson',
    linkedIn: 'eriksamuelsson',
  },
  baseUrl: 'https://eriksamuelsson.com',
};

// `gatsby-remark-images` needs to be in both in `gatsbyRemarkPlugins` and root
// plugins array to work correctly.
const defaultRemarkImages = {
  resolve: 'gatsby-remark-images',
  options: {
    backgroundColor: 'transparent',
    maxWidth: 800,
  },
};

// Source these locations with the provided names into Gatsby GraphQL.
const sourcedContent = ['posts', 'thumbnails', 'images'].map((name) => ({
  resolve: 'gatsby-source-filesystem',
  options: {
    path: `${__dirname}/content/${name}/`,
    name,
  },
}));

export const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-styled-components',
  'gatsby-plugin-feed-mdx',
  defaultRemarkImages,
  ...sourcedContent,
  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      extensions: [`.mdx`, `.md`],
      defaultLayouts: {
        default: require.resolve('./src/components/Layout.tsx'),
      },
      gatsbyRemarkPlugins: ['gatsby-remark-prismjs', defaultRemarkImages],
    },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
    options: {
      exclude: ['/404', 'dev-404-page'],
    },
  },
];
