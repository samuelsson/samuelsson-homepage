import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { mediaQueries, variables } from '../styles';
import GlobalStyles from '../GlobalStyles';

import Header from './Header';
import Footer from './Footer';

type FooterProps = {
  children: React.ReactNode;
};

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

const Layout = ({ children }: FooterProps): JSX.Element => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <GlobalStyles theme={theme} />
      <StyledLayout>
        <Header />
        <StyledMainContainer>
          <StyledMain role="main">{children}</StyledMain>
        </StyledMainContainer>
        <Footer />
      </StyledLayout>
    </>
  );
};

export default Layout;
