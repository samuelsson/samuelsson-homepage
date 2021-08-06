import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { mediaQueries } from '../styles';
import Emoji from './Emoji';
import { toUrlSafePath } from '../helpers';

type PostMetaProps = {
  date: string;
  categories?: string[];
  categoryLink?: boolean;
};

const StyledPostMeta = styled.div`
  padding: 0.5rem 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.PostMeta.color};

  > span {
    display: inline-block;
    padding: 0 0.5rem;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }

    .emoji {
      padding-right: 0.35rem;
    }
  }

  a {
    text-decoration: none;
    border: none;
    box-shadow: none;
    color: inherit;

    &:hover {
      color: ${({ theme }) => theme.PostMeta.hoverColor};
      text-decoration: underline;
      background-color: transparent;
    }
  }

  @media ${mediaQueries.medium} {
    font-size: 1rem;

    > span {
      padding: 0 1rem;
    }
  }
`;

const PostMeta = ({
  date,
  categories,
  categoryLink,
}: PostMetaProps): JSX.Element => (
  <StyledPostMeta>
    <span>
      <Emoji emoji="📆" label="Date published" />
      {date}
    </span>
    {categories && (
      <span>
        <Emoji emoji="🍱" label="Category" />
        {categories.map((category) => {
          const urlSafeCategory = toUrlSafePath(category);

          return categoryLink ? (
            <Link to={`/categories/${urlSafeCategory}`} key={urlSafeCategory}>
              {category}
            </Link>
          ) : (
            <React.Fragment key={urlSafeCategory}>{category}</React.Fragment>
          );
        })}
      </span>
    )}
  </StyledPostMeta>
);

export default PostMeta;
