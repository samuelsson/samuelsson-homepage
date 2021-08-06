import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import AllMdx, { Node } from '../types/AllMdx';
import { mediaQueries } from '../styles';
import PostMeta from './PostMeta';
import { htmlToText } from '../helpers';

type PostListProps = {
  limit?: number;
  category?: string;
  tag?: string;
};

type PostData = {
  allMdx: AllMdx;
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
  border-bottom: ${({ theme }) => theme.PostList.StyledLink.borderBottom};
  box-shadow: none;
  text-decoration: none;
  color: inherit;

  &:last-child {
    border: none;
  }

  &:hover {
    background-color: ${({ theme }) =>
      theme.PostList.StyledLink.hoverBackgroundColor};
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

const PostList = ({ limit, category, tag }: PostListProps): JSX.Element => {
  const data: PostData = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { fileAbsolutePath: { regex: "/content/posts/" } }
        sort: { order: DESC, fields: [frontmatter___date] }
      ) {
        ...PostListItem
      }
    }
  `);

  /*  useStaticQuery doesn't support variables so we fetch all and loop through
      them. If you have a lot of posts you need to separate the queries into
      page-level queries on each page (e.g. one query on the category page).

      Otherwise something like this would be nice:

      ```
      allMdx(
        filter: { frontmatter: { categories: { in: [$category] } } }
        limit: $limit
      ) { ... }
      ```
   */
  const filteredPosts = (): Node[] => {
    return data.allMdx.nodes
      .filter((post) => {
        if (category) {
          return post.frontmatter.categories?.includes(category);
        }
        if (tag) {
          return post.frontmatter.tags?.includes(tag);
        }
        return true;
      })
      .slice(0, limit);
  };

  return (
    <StyledPostList className="posts">
      {filteredPosts().map((post) => {
        const {
          frontmatter: { title, date, thumbnail, categories },
          excerpt,
          fields: { slug },
        } = post;

        const thumbnailImage =
          thumbnail && thumbnail.childImageSharp.gatsbyImageData;

        return (
          <StyledLink to={slug} key={slug}>
            {thumbnailImage && (
              <ThumbnailWrapper>
                <GatsbyImage image={thumbnailImage} alt="Post thumbnail" />
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
};

export default PostList;
