import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { CategoryPageContext } from '../types/PageContext';

type CategoryProps = {
  pageContext: CategoryPageContext;
};

const Category = ({ pageContext }: CategoryProps): JSX.Element => {
  const { category } = pageContext;

  return (
    <Layout>
      <Seo pageTitle={`Posts in the category ${category}`} />
      <h1>{`Posts categorized as ${category}`}</h1>
      <PostList category={category} />
      <p>
        <Link to="/categories">All categories</Link>
      </p>
    </Layout>
  );
};

export default Category;
