import React from 'react';
import { graphql, Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import AllMarkdownRemark from '../types/AllMarkdownRemark';

interface CategoryProps {
  pathContext: {
    category: string;
  };
  data: {
    allMarkdownRemark: AllMarkdownRemark;
  };
}

const Category: React.FC<CategoryProps> = ({ pathContext, data }) => {
  const { category } = pathContext;
  const { nodes } = data.allMarkdownRemark;

  return (
    <Layout>
      <Seo pageTitle={`Posts in the category ${category}`} />
      <h1>{`Posts categorized as ${category}`}</h1>
      <PostList posts={nodes} />
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

export default Category;
