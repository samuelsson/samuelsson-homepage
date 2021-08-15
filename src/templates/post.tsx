import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostHeader from '../components/PostHeader';
import { colors } from '../styles';
import { htmlToText } from '../helpers';
import { Node } from '../types/AllMdx';
import MDXWrapper from '../components/MDXWrapper';

type PostProps = {
  data: {
    mdx: Node;
  };
};

const StyledArticle = styled.article`
  h2 {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid ${colors.gray[500]};
  }
`;

const Post = ({ data }: PostProps): JSX.Element => {
  const { mdx } = data;
  const {
    frontmatter,
    body,
    excerpt,
    fields: { slug },
  } = mdx;
  const { title, date, tags, categories, thumbnail } = frontmatter;
  const thumbnailImage = thumbnail && thumbnail.childImageSharp.gatsbyImageData;

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
              <GatsbyImage image={thumbnailImage} alt="Post thumbnail" />
            )
          }
        />
        <MDXWrapper>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXWrapper>
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
            gatsbyImageData(layout: FIXED, width: 80)
          }
        }
      }
    }
  }
`;

export default Post;
