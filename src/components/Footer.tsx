import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { colors, mediaQueries, variables } from '../styles';

const StyledFooterContainer = styled.div`
  border-top: 2px solid ${colors.gray[300]};
  background-color: ${colors.gray[200]};
`;

const StyledFooter = styled.footer`
  max-width: ${variables.maxWidth};
  padding: 2rem;
  margin: 0 auto;
  text-align: center;

  img {
    display: block;
    height: 40px;
    margin: 0 auto 1rem;
  }

  a {
    font-size: 0.8rem;
    border-bottom: 0;
    box-shadow: none;

    @media ${mediaQueries.medium} {
      font-size: 1rem;
    }
  }
`;

const Footer = (): JSX.Element => (
  <StyledFooterContainer>
    <StyledFooter>
      <img src="/logo.svg" alt="Logo of homepage" />
      <Link to="/privacy">privacy</Link>
    </StyledFooter>
  </StyledFooterContainer>
);

export default Footer;
