import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { mediaQueries, variables } from '../styles';
import Navigation from './Navigation';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  height: 35px;
  max-width: ${variables.maxWidth};
  padding: 1rem;
  margin: 0 auto;

  @media ${mediaQueries.medium} {
    height: 50px;
    padding: 2rem;
  }
`;

const StyledLogo = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0;
  box-sizing: border-box;
  font-weight: bold;

  a {
    text-decoration: none;
    color: inherit;
    border: none;
    box-shadow: none;

    &:hover {
      background-color: transparent;
      color: inherit;
    }
  }

  .textLinkWrapper {
    display: none;
  }

  .logoLinkWrapper,
  img {
    height: 100%;
  }

  @media ${mediaQueries.medium} {
    .textLinkWrapper {
      padding-left: 1rem;
      display: block;
    }
  }
`;

const Header = () => (
  <div className="header-container">
    <StyledHeader>
      <StyledLogo>
        <Link to="/" className="logoLinkWrapper">
          <img src="/logo.svg" alt="Logo of homepage" />
        </Link>
        <Link to="/" className="textLinkWrapper">
          <span>Erik Samuelsson</span>
        </Link>
      </StyledLogo>
      <Navigation />
    </StyledHeader>
  </div>
);

export default Header;
