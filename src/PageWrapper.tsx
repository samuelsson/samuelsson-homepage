import React from 'react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import { Normalize } from 'styled-normalize';
import '@fontsource/montserrat/latin.css';
import GlobalStyles from './GlobalStyles';

const PageWrapper = ({ element }: WrapPageElementBrowserArgs): JSX.Element => (
  <>
    <Normalize />
    <GlobalStyles />
    {element}
  </>
);

export default PageWrapper;
