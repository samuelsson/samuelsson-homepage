import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import { toUrlSafePath } from '../helpers';

interface TagsProps {
  pathContext: {
    tags: string[];
  };
}

const Tags: React.FC<TagsProps> = ({ pathContext }) => {
  const { tags } = pathContext;

  return (
    <Layout>
      <Seo pageTitle="Tags" />
      <section>
        <h1>Tags</h1>
        <ul>
          {tags.sort().map((tag) => (
            <li key={tag}>
              <Link to={`/tags/${toUrlSafePath(tag)}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Tags;
