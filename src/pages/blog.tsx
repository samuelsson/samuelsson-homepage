import React from 'react';
import { graphql } from 'gatsby';
import AllMarkdownRemark from '../types/AllMarkdownRemark';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Seo from '../components/Seo';

interface BlogPageProps {
  data: {
    allMarkdownRemark: AllMarkdownRemark;
  };
}

const BlogPage: React.FC<BlogPageProps> = ({ data }) => (
  <Layout>
    <Seo pageTitle="Blog posts" />
    <h1>Blog posts</h1>
    <PostList posts={data.allMarkdownRemark.nodes} />
  </Layout>
);

export const query = graphql`
  query BlogPageQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      ...PostListItem
    }
  }
`;

export default BlogPage;
