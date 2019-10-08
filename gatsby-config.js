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
    aboutMeTimeLine: [
      { year: 1988, text: 'Yaay! I was born.' },
      { year: 1994, text: 'My dad buys our first computer and I am hooked.' },
      {
        year: 2001,
        text: 'I start building my own homepages, a lot of table elements.',
      },
      { year: 2007, text: 'Buy my first Mac before even using one ever.' },
      { year: 2008, text: 'Start working in an electronic retail store.' },
      {
        year: 2010,
        text: 'I launch a quite popular iPhone blog built on WordPress.',
      },
      { year: 2011, text: 'I start my own company, doing web design.' },
      { year: 2012, text: 'I join Mensa Sweden.' },
      { year: 2015, text: 'I graduate from the University.' },
      {
        year: 2016,
        text: 'I start working professionally as a web developer.',
      },
    ],
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
