import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostHeader from '../components/PostHeader';
import { colors } from '../styles';
import { htmlToText } from '../helpers';
import { Node } from '../types/AllMdx';

interface PostProps {
  data: {
    mdx: Node;
  };
}

const StyledArticle = styled.article`
  h2 {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid ${colors.gray[500]};
  }
`;

const Post: React.FC<PostProps> = ({ data }) => {
  const { mdx } = data;
  const {
    frontmatter,
    body,
    excerpt,
    fields: { slug },
  } = mdx;
  const { title, date, tags, categories, thumbnail } = frontmatter;
  const thumbnailImage = thumbnail && thumbnail.childImageSharp.fixed;

  const postSEO = {
    published: date,
    updated: undefined,
    tags,
  };

  return (
    <Layout>
      <Seo
        pageTitle={title}
        pageDescription={htmlToText(excerpt)}
        path={slug}
        postSEO={postSEO}
      />
      <StyledArticle>
        <PostHeader
          date={date}
          title={title}
          tags={tags}
          categories={categories}
          thumbnail={
            thumbnailImage && (
              <Img fixed={thumbnailImage} alt="Post thumbnail" />
            )
          }
        />
        <MDXRenderer>{body}</MDXRenderer>
      </StyledArticle>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt(pruneLength: 250)
      fields {
        slug
      }
      frontmatter {
        date(formatString: "YYYY-MM-DD")
        title
        tags
        categories
        thumbnail {
          childImageSharp {
            fixed(width: 80) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;

export default Post;
