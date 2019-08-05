import React from 'react';
import { graphql } from 'gatsby';
import * as propTypes from 'prop-types';
import Layout from '../components/Layout';
import PostList from '../components/PostList';

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;

  return (
    <Layout>
      <section className="intro">
        <h1>Hej!</h1>
        <p>
          I&apos;m Erik, a web developer from Sweden who has a huge interest in
          software development, IT and technology. I try to document the new
          stuff I learn in this fast paced industry as I go along. High, low and
          everything in between.
        </p>

        <p>Hopefully you&apos;ll find something of interest.</p>
      </section>
      <section className="latest-posts">
        <h2>Latest posts</h2>
        <PostList posts={posts} />
      </section>
    </Layout>
  );
};

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark(
      limit: 5
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      ...PostListItem
    }
  }
`;

IndexPage.propTypes = {
  data: propTypes.objectOf(propTypes.any).isRequired,
};

export default IndexPage;
