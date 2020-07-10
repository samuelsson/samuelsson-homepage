import React from 'react';
import { graphql, Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import AllMdx from '../types/AllMdx';

interface TagProps {
  pathContext: {
    tag: string;
  };
  data: {
    allMdx: AllMdx;
  };
}

const Tag: React.FC<TagProps> = ({ pathContext, data }) => {
  const { tag } = pathContext;
  const { nodes } = data.allMdx;

  return (
    <Layout>
      <Seo pageTitle={`Posts tagged as ${tag}`} />
      <h1>{`Posts tagged as ${tag}`}</h1>
      <PostList posts={nodes} />
      <p>
        <Link to="/tags">All tags</Link>
      </p>
    </Layout>
  );
};

export const query = graphql`
  query TagPageQuery($tag: String) {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      ...PostListItem
    }
  }
`;

export default Tag;
