import React from 'react';
import { WrapPageElementBrowserArgs } from 'gatsby';
import { Normalize } from 'styled-normalize';
import 'typeface-montserrat';
import Seo from './components/Seo';
import GlobalStyles from './GlobalStyles';

const PageWrapper = ({ element }: WrapPageElementBrowserArgs): JSX.Element => (
  <>
    <Normalize />
    <GlobalStyles />
    <Seo />
    {element}
  </>
);

export default PageWrapper;
