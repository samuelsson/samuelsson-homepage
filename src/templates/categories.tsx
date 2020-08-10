import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { toUrlSafePath } from '../helpers';

type CategoryProps = {
  pathContext: {
    categories: string[];
  };
};

const Categories = ({ pathContext }: CategoryProps): JSX.Element => {
  const { categories } = pathContext;

  return (
    <Layout>
      <Seo pageTitle="Categories" />
      <section>
        <h1>Categories</h1>
        <ul>
          {categories.sort().map((category) => (
            <li key={category}>
              <Link to={`/categories/${toUrlSafePath(category)}`}>
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Categories;
