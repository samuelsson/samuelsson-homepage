import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles';

type Appearance = 'info' | 'warning';

type InfoBoxProps = {
  children: React.ReactNode;
  appearance: Appearance;
};

const StyledInfoBox = styled.div<{
  appearance: Appearance;
}>`
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 3px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);

  p:last-child {
    margin-bottom: 0;
  }

  ${({ appearance }): string => {
    switch (appearance) {
      case 'warning':
        return `background-color: ${colors.lightYellow};`;
      default:
        return `background-color: ${colors.gray[400]};`;
    }
  }}
`;

const InfoBox = ({
  children,
  appearance = 'info',
}: InfoBoxProps): JSX.Element => (
  <StyledInfoBox appearance={appearance}>{children}</StyledInfoBox>
);

export default InfoBox;
