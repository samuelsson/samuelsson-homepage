import React from 'react';
import { Link } from 'gatsby';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import { TagPageContext } from '../types/PageContext';

type TagProps = {
  pageContext: TagPageContext;
};

const Tag = ({ pageContext }: TagProps): JSX.Element => {
  const { tag } = pageContext;

  return (
    <Layout>
      <Seo pageTitle={`Posts tagged as ${tag}`} />
      <h1>{`Posts tagged as ${tag}`}</h1>
      <PostList tag={tag} />
      <p>
        <Link to="/tags">All tags</Link>
      </p>
    </Layout>
  );
};

export default Tag;
