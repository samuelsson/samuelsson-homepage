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

interface SerializedNode {
  url: string;
  changefreq?: string;
  lastmod?: string;
  priority?: number;
}

const generateSerializedNode = (
  site: Site,
  siteNode: SiteNode,
  mdxNodes: MdxNode[]
) => {
  const { path } = siteNode;
  const baseNode = {
    url: site.siteMetadata.siteUrl + path,
    changefreq: `monthly`,
    priority: 1.0,
  };

  // Blog post pages
  const post = mdxNodes.find((node) => node.fields.slug === path);
  if (post) {
    return {
      ...baseNode,
      lastmod: post.frontmatter.date,
      priority: 0.8,
    };
  }

  // The rest, base pages
  return baseNode;
};

export default {
  query: `
    {
      site {
        siteMetadata {
          siteUrl
          site_url: siteUrl
        }
      }
      allSitePage {
        nodes {
          path,
          componentPath,
          id,
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
  `,
  exclude: ['/categories/*', '/tags/*'],
  serialize: ({ site, allSitePage, allMdx }: SitemapProps): SerializedNode[] =>
    allSitePage.nodes.map((node) => {
      return generateSerializedNode(site, node, allMdx.nodes);
    }),
};
