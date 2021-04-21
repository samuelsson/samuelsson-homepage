import { IGatsbyImageData } from 'gatsby-plugin-image';

interface ChildImage {
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
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
