module.exports = {
  siteMetadata: {
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
  },
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-feed',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/thumbnails`,
        name: 'thumbnails',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/images`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              backgroundColor: 'transparent',
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/404', 'dev-404-page'],
      },
    },
  ],
};
