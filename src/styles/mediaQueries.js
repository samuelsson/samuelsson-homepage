const breakpoints = {
  small: '600px',
  medium: '850px',
  large: '1200px',
};

export default {
  small: `(min-width: ${breakpoints.small})`,
  medium: `(min-width: ${breakpoints.medium})`,
  large: `(min-width: ${breakpoints.large})`,
};
