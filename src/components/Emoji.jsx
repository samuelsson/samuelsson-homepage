import React from 'react';
import * as propTypes from 'prop-types';

const Emoji = ({ emoji, label }) => (
  <span className="emoji" role="img" aria-label={label}>
    {emoji}
  </span>
);

Emoji.propTypes = {
  emoji: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
};

export default Emoji;
