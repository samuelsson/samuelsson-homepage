import SiteMetadata from '../types/SiteMetadata';
import { Node as MdxNode } from '../types/AllMdx';

interface Site {
  siteMetadata: SiteMetadata;
}

interface SiteNode {
  path: string;
}

type SitemapProps = {
  site: Site;
  allSitePage: {
    nodes: SiteNode[];
  };
  allMdx: {
    nodes: MdxNode[];
  };
};

interface Page {
  path: string;
  lastmod: string;
  changefreq?: string;
  priority?: number;
}

interface SerializedPage {
  url: string;
  lastmod: string;
  changefreq?: string;
  priority?: number;
}

const query = `
    {
      site {
        siteMetadata {
          siteUrl
          site_url: siteUrl
        }
      }
      allSitePage {
        nodes {
          path
        }
      }
      allMdx(filter: { fileAbsolutePath: { regex: "/content/posts/" } }) {
        nodes {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  `;

const resolvePages = ({ allSitePage, allMdx }: SitemapProps): Page[] => {
  const buildDate = new Date();

  return allSitePage.nodes.map((page) => {
    const { path } = page;
    const post = allMdx.nodes.find((node) => node.fields.slug === path);
    const lastModDate = post ? new Date(post.frontmatter.date) : buildDate;

    return { path, lastmod: lastModDate.toISOString() };
  });
};

export default {
  query,
  output: '/',
  excludes: ['/categories', '/categories/*', '/tags', '/tags/*'],
  resolvePages,
  serialize: ({ path, lastmod }: Page): SerializedPage => ({
    url: path,
    lastmod,
  }),
};
