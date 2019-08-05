import React from 'react';
import styled from 'styled-components';
import { colors, variables } from '../styles';

const StyledFooterContainer = styled.div`
  border-top: 2px solid ${colors.gray[300]};
  background-color: ${colors.gray[200]};
`;

const StyledFooter = styled.footer`
  max-width: ${variables.maxWidth};
  padding: 2rem;
  margin: 0 auto;

  img {
    display: block;
    height: 40px;
    margin: 0 auto;
  }
`;

const Footer = () => (
  <StyledFooterContainer>
    <StyledFooter>
      <img src="/logo.svg" alt="Logo of homepage" />
    </StyledFooter>
  </StyledFooterContainer>
);

export default Footer;
