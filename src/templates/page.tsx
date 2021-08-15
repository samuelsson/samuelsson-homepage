import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Layout from '../components/Layout';
import { Node } from '../types/AllMdx';
import MDXWrapper from '../components/MDXWrapper';

type PostProps = {
  data: {
    mdx: Node;
  };
};

const Post = ({ data }: PostProps): JSX.Element => {
  const { body } = data.mdx;

  return (
    <Layout>
      <MDXWrapper>
        <MDXRenderer>{body}</MDXRenderer>
      </MDXWrapper>
    </Layout>
  );
};

export const pageQuery = graphql`
  query PageQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
    }
  }
`;

export default Post;
