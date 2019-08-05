import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors, mediaQueries } from '../styles';
import PostMeta from './PostMeta';

const StyledPostHeader = styled.header`
  text-align: center;
  margin: 0 auto;

  @media ${mediaQueries.medium} {
    width: 80%;
  }
`;

const StyledTitle = styled.h1`
  margin: 1rem 0 0;
`;

const StyledTag = styled.a`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  margin: 0.5rem;
  border-radius: 5px;
  border: none;
  color: ${colors.gray[700]};
  text-decoration: none;
  background-color: ${colors.gray[300]};
  box-shadow: 0 2px 3px ${colors.gray[500]};
  font-size: 0.8rem;

  transition: all 0.2s;

  &:hover {
    background-color: ${colors.blue};
    box-shadow: 0 2px 5px ${colors.gray[600]};
    color: #fff;
  }
`;

const PostHeader = ({ title, date, tags, categories, thumbnail }) => (
  <StyledPostHeader>
    {thumbnail}
    <StyledTitle>{title}</StyledTitle>
    <PostMeta date={date} categories={categories} categoryLink />
    {tags.map(tag => {
      const urlSafeTag = tag.toLowerCase().replace(/\s/g, '-');

      return (
        <StyledTag href={`/tags/${urlSafeTag}`} key={urlSafeTag}>
          {tag}
        </StyledTag>
      );
    })}
  </StyledPostHeader>
);

PostHeader.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string),
  thumbnail: PropTypes.element,
};

PostHeader.defaultProps = {
  thumbnail: undefined,
};
PostHeader.defaultProps = {
  categories: undefined,
};

export default PostHeader;
