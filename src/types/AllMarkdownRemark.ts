import { FixedObject } from 'gatsby-image';

interface ChildImage {
  childImageSharp: {
    fixed: FixedObject;
  };
}

export interface Frontmatter {
  title: string;
  date: string;
  tags?: string[];
  categories?: string[];
  thumbnail: ChildImage;
}

export interface Node {
  html: string;
  fields: {
    slug: string;
  };
  excerpt: string;
  frontmatter: Frontmatter;
}

export default interface AllMarkdownRemark {
  totalCount: number;
  nodes: Node[];
}
