import React from 'react';
import styled from 'styled-components';
import { colors, mediaQueries } from '../styles';
import PostMeta from './PostMeta';
import { toUrlSafePath } from '../helpers';

interface PostHeaderProps {
  title: string;
  date: string;
  tags?: string[];
  categories?: string[];
  thumbnail: React.ReactNode;
}

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

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  date,
  tags = [],
  categories,
  thumbnail,
}): JSX.Element => (
  <StyledPostHeader>
    {thumbnail}
    <StyledTitle>{title}</StyledTitle>
    <PostMeta date={date} categories={categories} categoryLink />
    {tags.map((tag) => (
      <StyledTag href={`/tags/${toUrlSafePath(tag)}`} key={tag}>
        {tag}
      </StyledTag>
    ))}
  </StyledPostHeader>
);

export default PostHeader;
