import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { colors, mediaQueries } from '../styles';
import Emoji from './Emoji';

const StyledPostMeta = styled.div`
  padding: 0.5rem 0;
  font-size: 0.8rem;
  color: ${colors.gray[700]};

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

const PostMeta = ({ date, categories, categoryLink }) => (
  <StyledPostMeta>
    <span>
      <Emoji emoji="📆" label="Date published" />
      {date}
    </span>
    {categories && (
      <span>
        <Emoji emoji="🍱" label="Category" />
        {categories.map(category => {
          const urlSafeCategory = category.toLowerCase().replace(/\s/g, '-');

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

PostMeta.propTypes = {
  date: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired),
  categoryLink: PropTypes.bool,
};

PostMeta.defaultProps = {
  categories: undefined,
  categoryLink: false,
};

export default PostMeta;
