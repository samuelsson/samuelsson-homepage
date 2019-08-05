import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { mediaQueries, variables } from '../styles';

import Header from './Header';
import Footer from './Footer';

// Used for sticky footer
const StyledLayout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

// Used for sticky footer
const StyledMainContainer = styled.div`
  flex-grow: 1;
`;

const StyledMain = styled.main`
  max-width: ${variables.maxWidth};
  padding: 1rem;
  margin: 0 auto;

  @media ${mediaQueries.medium} {
    padding: 2rem;
  }
`;

const Layout = ({ children }) => (
  <StyledLayout>
    <Header />
    <StyledMainContainer>
      <StyledMain role="main">{children}</StyledMain>
    </StyledMainContainer>
    <Footer />
  </StyledLayout>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
