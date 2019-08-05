import React from 'react';
import styled from 'styled-components';
import { mediaQueries } from '../styles';

const StyledImageContainer = styled.div`
  text-align: center;

  img {
    outline: 3px solid #fff;
    outline-offset: -8px;

    @media ${mediaQueries.medium} {
      width: 60%;
    }
  }
`;

const ProfilePicture = () => (
  <StyledImageContainer>
    <img src="../../content/images/erik-samuelsson.jpg" alt="Erik Samuelsson" />
  </StyledImageContainer>
);

export default ProfilePicture;
