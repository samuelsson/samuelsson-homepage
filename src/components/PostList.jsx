import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import * as propTypes from 'prop-types';
import styled from 'styled-components';
import { colors, mediaQueries } from '../styles';
import PostMeta from './PostMeta';

const StyledPostList = styled.div`
  margin: 0 -1rem;
`;

const StyledLink = styled(Link)`
  display: flex;
  padding: 1rem;
  border-bottom: 1px solid ${colors.gray[400]};
  box-shadow: none;
  text-decoration: none;
  color: inherit;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: ${colors.gray[200]};
    color: inherit;
  }

  @media ${mediaQueries.medium} {
    padding: 2rem 1rem;
  }
`;

const StyledExcerpt = styled.div`
  font-size: 0.8rem;

  @media ${mediaQueries.medium} {
    font-size: 1rem;
  }
`;

const StyledImg = styled(Img)`
  flex-shrink: 0;
  margin-right: 1rem;
`;

const PostList = ({ posts }) => (
  <StyledPostList className="posts">
    {posts.map(({ node: post }) => {
      const {
        frontmatter: { title, date, thumbnail, categories },
        excerpt,
        fields: { slug },
      } = post;

      const thumbnailImage = thumbnail && thumbnail.childImageSharp.fixed;

      return (
        <StyledLink to={slug} key={slug}>
          {thumbnailImage && <StyledImg fixed={thumbnailImage} />}
          <div>
            <b>{title}</b>
            <PostMeta date={date} categories={categories} />
            <StyledExcerpt>{excerpt}</StyledExcerpt>
          </div>
        </StyledLink>
      );
    })}
  </StyledPostList>
);

PostList.propTypes = {
  posts: propTypes.arrayOf(
    propTypes.objectOf(
      propTypes.shape({
        excerpt: propTypes.string,
        fields: propTypes.shape({
          slug: propTypes.string.isRequired,
        }).isRequired,
        frontmatter: propTypes.shape({
          title: propTypes.string.isRequired,
          date: propTypes.string.isRequired,
          thumbnail: propTypes.any,
          categories: propTypes.arrayOf(propTypes.string.isRequired),
        }).isRequired,
      })
    )
  ).isRequired,
};

export default PostList;
