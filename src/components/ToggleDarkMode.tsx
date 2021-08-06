import React from 'react';
import { useStyledDarkMode } from 'gatsby-styled-components-dark-mode';
import styled from 'styled-components';

import Emoji from './Emoji';

const StyledButton = styled.button`
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
`;

const ToggleDarkMode = (): JSX.Element => {
  const { isDark, toggleDark } = useStyledDarkMode();
  const currentEmoji = isDark ? '🌙' : '🌞';

  return (
    <StyledButton type="button" onClick={() => toggleDark()}>
      <Emoji emoji={currentEmoji} label="Toggle dark mode" />
    </StyledButton>
  );
};

export default ToggleDarkMode;
