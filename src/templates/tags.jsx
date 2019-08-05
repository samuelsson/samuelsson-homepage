import React from 'react';
import { Link } from 'gatsby';
import * as PropTypes from 'prop-types';
import Seo from '../components/Seo';
import Layout from '../components/Layout';

const Tags = ({ pathContext }) => {
  const { tags } = pathContext;

  return (
    <Layout>
      <Seo pageTitle="Tags" />
      <section>
        <h1>Tags</h1>
        <ul>
          {tags.sort().map(tag => {
            const urlSafeTag = tag.toLowerCase().replace(/\s/g, '-');

            return (
              <li key={tag}>
                <Link to={`/tags/${urlSafeTag}`}>{tag}</Link>
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
};

Tags.propTypes = {
  pathContext: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default Tags;
