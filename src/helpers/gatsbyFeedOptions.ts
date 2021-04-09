import AllMdx from '../types/AllMdx';
import SiteMetadata from '../types/SiteMetadata';

type FeedProps = {
  query: {
    site: {
      siteMetadata: SiteMetadata;
    };
    allMdx: AllMdx;
  };
};

interface SerializedNode {
  title: string;
  description: string;
  date: string;
  url: string;
  guid: string;
  // eslint-disable-next-line camelcase
  custom_elements: [{ 'content:encoded': string }];
}

export default {
  query: `
    {
      site {
        siteMetadata {
          title
          description
          siteUrl
          site_url: siteUrl
        }
      }
    }
  `,
  feeds: [
    {
      serialize: ({ query: { site, allMdx } }: FeedProps): SerializedNode[] => {
        return allMdx.nodes.map((node) => {
          const { frontmatter, excerpt, fields, html } = node;
          const {
            siteMetadata: { siteUrl },
          } = site;

          return {
            title: frontmatter.title,
            description: excerpt,
            date: frontmatter.date,
            url: siteUrl + fields.slug,
            guid: siteUrl + fields.slug,
            custom_elements: [{ 'content:encoded': html }],
          };
        });
      },
      query: `
              {
                allMdx(
                  filter: { fileAbsolutePath: { regex: "/content/posts/" } }
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt(pruneLength: 240)
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
      output: '/feed.xml',
      title: 'Samuelsson',
    },
  ],
};
