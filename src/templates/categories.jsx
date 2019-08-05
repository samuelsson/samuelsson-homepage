import React from 'react';
import { Link } from 'gatsby';
import * as PropTypes from 'prop-types';
import Seo from '../components/Seo';
import Layout from '../components/Layout';

const Categories = ({ pathContext }) => {
  const { categories } = pathContext;

  return (
    <Layout>
      <Seo pageTitle="Categories" />
      <section>
        <h1>Categories</h1>
        <ul>
          {categories.sort().map(category => {
            const urlSafeTag = category.toLowerCase().replace(/\s/g, '-');

            return (
              <li key={category}>
                <Link to={`/categories/${urlSafeTag}`}>{category}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

Categories.propTypes = {
  pathContext: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Categories;
