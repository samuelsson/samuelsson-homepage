import React from 'react';
import * as PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Tag = ({ pathContext, data }) => {
  const { tag } = pathContext;
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <Seo pageTitle={`Posts tagged as ${tag}`} />
      <h1>Posts tagged as {tag}</h1>
      <PostList posts={posts} />
      <p>
        <Link to="/tags">All tags</Link>
      </p>
    </Layout>
  );
};

export const query = graphql`
  query TagPageQuery($tag: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      ...PostListItem
    }
  }
`;

Tag.propTypes = {
  pathContext: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Tag;
