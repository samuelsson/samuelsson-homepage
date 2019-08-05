import React from 'react';
import * as PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

const Category = ({ pathContext, data }) => {
  const { category } = pathContext;
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <Seo pageTitle={`Posts in the category ${category}`} />
      <h1>Posts categorized as {category}</h1>
      <PostList posts={posts} />
      <p>
        <Link to="/categories">All categories</Link>
      </p>
    </Layout>
  );
};

export const query = graphql`
  query CategoryPageQuery($category: String) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      ...PostListItem
    }
  }
`;

Category.propTypes = {
  pathContext: PropTypes.objectOf(PropTypes.any).isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Category;
