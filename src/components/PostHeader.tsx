import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles';
import PostMeta from './PostMeta';
import { toUrlSafePath } from '../helpers';
import { Link } from "gatsby";

type PostHeaderProps = {
  title: string;
  date: string;
  tags?: string[];
  categories?: string[];
  thumbnail: React.ReactNode;
};

const StyledPostHeader = styled.header`
  text-align: center;
  margin: 0 auto;

  // Centering the thumbnail coming from gatsby-plugin-image
  > .gatsby-image-wrapper {
    margin: 0 auto;
  }

  @media ${mediaQueries.medium} {
    width: 80%;
  }
`;

const StyledTitle = styled.h1`
  margin: 1rem 0 0;
`;

const StyledTag = styled(Link)`
  display: inline-block;
  padding: 0.2rem 0.5rem;
  margin: 0.5rem;
  border-radius: 5px;
  border: none;
  color: ${({ theme }) => theme.PostHeader.StyledTag.color};
  text-decoration: none;
  background-color: ${({ theme }) =>
    theme.PostHeader.StyledTag.backgroundColor};
  box-shadow: ${({ theme }) => theme.PostHeader.StyledTag.boxShadow};
  font-size: 0.8rem;

  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.PostHeader.StyledTag.hoverColor};
    background-color: ${({ theme }) =>
      theme.PostHeader.StyledTag.hoverBackgroundColor};
    box-shadow: ${({ theme }) => theme.PostHeader.StyledTag.hoverBoxShadow};
  }
`;

const PostHeader = ({
  title,
  date,
  tags = [],
  categories,
  thumbnail,
}: PostHeaderProps): JSX.Element => (
  <StyledPostHeader>
    {thumbnail}
    <StyledTitle>{title}</StyledTitle>
    <PostMeta date={date} categories={categories} categoryLink />
    {tags.map((tag) => (
      <StyledTag to={`/tags/${toUrlSafePath(tag)}`} key={tag}>
        {tag}
      </StyledTag>
    ))}
  </StyledPostHeader>
);

export default PostHeader;
