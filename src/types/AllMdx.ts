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
  body: string;
  fields: {
    slug: string;
  };
  excerpt: string;
  html: string;
  frontmatter: Frontmatter;
}

export default interface AllMdx {
  totalCount: number;
  nodes: Node[];
}
