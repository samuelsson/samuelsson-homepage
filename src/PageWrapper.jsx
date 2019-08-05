import React from 'react';
import * as PropTypes from 'prop-types';
import { Normalize } from 'styled-normalize';
import 'typeface-montserrat';
import Seo from './components/Seo';
import GlobalStyles from './GlobalStyles';

const PageWrapper = ({ element }) => (
  <React.Fragment>
    <Normalize />
    <GlobalStyles />
    <Seo />
    {element}
  </React.Fragment>
);

PageWrapper.propTypes = {
  element: PropTypes.element.isRequired,
};

export default PageWrapper;
