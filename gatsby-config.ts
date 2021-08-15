import { GatsbyConfig } from 'gatsby';
import { gatsbyFeedOptions, gatsbySitemapOptions } from './src/helpers';
import siteMetadata from './content/siteMetadata';
import { light, dark } from './src/styles/theme';

export { siteMetadata };

// `gatsby-remark-images` needs to be in both in `gatsbyRemarkPlugins` and root
// plugins array to work correctly.
const defaultRemarkImages = {
  resolve: 'gatsby-remark-images',
  options: {
    backgroundColor: 'transparent',
    linkImagesToOriginal: false,
    disableBgImageOnAlpha: true,
    maxWidth: 800,
  },
};

// Source these locations with the provided names into Gatsby GraphQL.
const sourcedContent = ['posts', 'thumbnails', 'images', 'pages'].map(
  (name) => ({
    resolve: 'gatsby-source-filesystem',
    options: {
      path: `${__dirname}/content/${name}/`,
      name,
    },
  })
);

export const plugins: GatsbyConfig['plugins'] = [
  'gatsby-plugin-image',
  'gatsby-plugin-sharp',
  'gatsby-transformer-sharp',
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-styled-components',
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
    resolve: `gatsby-styled-components-dark-mode`,
    options: { light, dark },
  },
  {
    resolve: 'gatsby-plugin-sitemap',
    options: gatsbySitemapOptions,
  },
  {
    resolve: `gatsby-plugin-feed-mdx`,
    options: gatsbyFeedOptions,
  },
];
