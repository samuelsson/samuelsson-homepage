import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { colors, mediaQueries, variables } from '../styles';

const siteMetadataQuery = graphql`
  query {
    site {
      siteMetadata {
        sourceCodeUrl
      }
    }
  }
`;

const StyledFooterContainer = styled.div`
  border-top: 2px solid ${colors.gray[300]};
  background-color: ${colors.gray[200]};
`;

const LinkSeparator = styled.span`
  padding: 0 0.25rem;

  @media ${mediaQueries.medium} {
    padding: 0 0.5rem;
  }

  &:before {
    content: '|';
  }
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

const Footer = (): JSX.Element => {
  const {
    site: {
      siteMetadata: { sourceCodeUrl },
    },
  } = useStaticQuery(siteMetadataQuery);

  return (
    <StyledFooterContainer>
      <StyledFooter>
        <img src="/logo.svg" alt="Logo of homepage" />
        <Link to="/privacy">privacy</Link>
        <LinkSeparator />
        <Link to="/feed.xml">rss feed</Link>
        <LinkSeparator />
        <a href={sourceCodeUrl}>source code</a>
      </StyledFooter>
    </StyledFooterContainer>
  );
};

export default Footer;
