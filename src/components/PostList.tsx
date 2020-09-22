import React from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'styled-components';
import { colors, mediaQueries } from '../styles';
import PostMeta from './PostMeta';
import { htmlToText } from '../helpers';
import { Node } from '../types/AllMdx';

type PostListProps = {
  posts: Node[];
};

const StyledPostList = styled.div`
  margin: 0;

  @media ${mediaQueries.medium} {
    margin: 0 -1rem;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  padding: 1rem 0;
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
    padding-top: 1rem;
    font-size: 1rem;
  }
`;

const ThumbnailWrapper = styled.div`
  flex-shrink: 0;
  margin-right: 1rem;
`;

const PostList = ({ posts }: PostListProps): JSX.Element => (
  <StyledPostList className="posts">
    {posts.map((post) => {
      const {
        frontmatter: { title, date, thumbnail, categories },
        excerpt,
        fields: { slug },
      } = post;

      const thumbnailImage = thumbnail && thumbnail.childImageSharp.fixed;

      return (
        <StyledLink to={slug} key={slug}>
          {thumbnailImage && (
            <ThumbnailWrapper>
              <Img fixed={thumbnailImage} />
            </ThumbnailWrapper>
          )}
          <div>
            <b>{title}</b>
            <PostMeta date={date} categories={categories} />
            <StyledExcerpt>{htmlToText(excerpt)}</StyledExcerpt>
          </div>
        </StyledLink>
      );
    })}
  </StyledPostList>
);

export default PostList;
