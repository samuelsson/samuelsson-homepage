import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { toUrlSafePath } from '../helpers';

interface CategoryProps {
  pathContext: {
    categories: string[];
  };
}

const Categories: React.FC<CategoryProps> = ({ pathContext }) => {
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
