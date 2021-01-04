import React from 'react';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import Seo from '../components/Seo';

const IndexPage = (): JSX.Element => (
  <Layout>
    <Seo />
    <section className="intro">
      <h1>Hej!</h1>
      <p>
        I&apos;m Erik, a web developer from Sweden who has a huge interest in
        software development, IT and technology. I try to document the new stuff
        I learn in this fast paced industry as I go along. High, low and
        everything in between.
      </p>

      <p>Hopefully you&apos;ll find something of interest.</p>
    </section>
    <section className="latest-posts">
      <h2>Latest posts</h2>
      <PostList limit={5} />
    </section>
  </Layout>
);

export default IndexPage;
