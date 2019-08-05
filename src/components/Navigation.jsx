import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors, mediaQueries } from '../styles';

const StyledNavigation = styled.nav`
  margin-left: auto;

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      padding-right: 1rem;

      &:last-child {
        padding-right: 0;
      }

      a {
        text-decoration: none;
        color: ${colors.gray[700]};
        border: none;
        box-shadow: none;
        
        &:hover {
          border: none;
          background-color: transparent;
          color: ${colors.black};
        }
      }
      
      .active {
        color: ${colors.black};
      }
    }
  }
  
  @media ${mediaQueries.medium} {
    ul li {
        padding-right: 2rem;
      }
    }
  }
`;

const Navigation = () => (
  <StyledNavigation>
    <ul>
      <li>
        <Link to="/about" activeClassName="active">
          About
        </Link>
      </li>
      <li>
        <Link to="/blog" activeClassName="active">
          Blog
        </Link>
      </li>
      <li>
        <Link to="/contact" activeClassName="active">
          Contact
        </Link>
      </li>
    </ul>
  </StyledNavigation>
);

export default Navigation;
