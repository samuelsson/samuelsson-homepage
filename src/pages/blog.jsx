import React from 'react';
import { graphql } from 'gatsby';
import * as propTypes from 'prop-types';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Seo from '../components/Seo';

const Blog = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <Seo pageTitle="Blog posts" />
      <h1>Blog posts</h1>
      <PostList posts={posts} />
    </Layout>
  );
};

export const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      ...PostListItem
    }
  }
`;

Blog.propTypes = {
  data: propTypes.objectOf(propTypes.any).isRequired,
};

export default Blog;
