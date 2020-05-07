import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import PostHeader from '../components/PostHeader';
import { colors } from '../styles';
import { htmlToText } from '../helpers';

const StyledArticle = styled.article`
  h2 {
    padding-bottom: 0.3rem;
    border-bottom: 1px solid ${colors.gray[500]};
  }
`;

const Post = ({ data }) => {
  const { markdownRemark } = data;
  const {
    frontmatter,
    html,
    excerpt,
    fields: { slug },
  } = markdownRemark;
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
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </StyledArticle>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 250, format: HTML)
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

Post.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Post;
