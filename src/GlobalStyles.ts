import { createGlobalStyle } from 'styled-components';
import { colors, mediaQueries } from './styles';
import prism from './styles/prism';
import { Theme } from './styles/theme';

type GlobalStyleProps = {
  theme: Theme;
};

const GlobalStyle = createGlobalStyle<GlobalStyleProps>`
  ${prism}

  body {
    font-family: Montserrat, -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji',
      'Segoe UI Emoji', 'Segoe UI Symbol';
    background-color: ${({ theme }) => theme.body.backgroundColor};
    color: ${({ theme }) => theme.body.color};
    font-size: 1em;
    line-height: 1.5;
    
    @media ${mediaQueries.medium} {
      font-size: 1.2em;
    }
  }

  a {
    text-decoration: none;
    border-bottom: 1px solid ${colors.blue};
    box-shadow: inset 0 -1px 0 ${colors.blue};
    color: inherit;
    
    transition: all 0.2s;
    
    &:hover {
      border-radius: 3px;
      color: ${colors.white};
      background-color: ${colors.blue};
    }

    @media ${mediaQueries.medium} {
      box-shadow: inset 0 -2px 0 ${colors.blue};
    }
  }
  
  h1 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }
  
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }
  
  h1 { font-size: 1.8rem; }
  h2 { font-size: 1.4rem; }
  h3 { font-size: 1.2rem; }
  h4 { font-size: 1.1rem; }
  h5 { font-size: 1rem; }
  h6 { font-size: 1rem; }
  
  @media ${mediaQueries.medium} {
    h1 { font-size: 2.2rem; }
    h2 { font-size: 1.8rem; }
    h3 { font-size: 1.5rem; }
    h4 { font-size: 1.25rem; }
    h5 { font-size: 1.1rem; }
    h6 { font-size: 1rem; }
  }

  blockquote {
    position: relative;
    margin: 0;
    padding: 1rem;
    box-sizing: border-box;
    border-left: 0.5rem solid ${({ theme }) =>
      theme.blockquote.borderLeftColor};
    color: ${({ theme }) => theme.blockquote.color};
    background-color: ${({ theme }) => theme.blockquote.backgroundColor};
    box-shadow: 0 2px 6px rgba(0, 0, 0, .08);
    
    p:first-child {
      margin-top: 0;
    }
    
    p:last-child {
      margin-bottom: 0;
    }
    
    cite {
      color: ${colors.gray[800]};
      font-style: normal;
      font-weight: bold;
      margin-top: 1rem;
    }
    
    @media ${mediaQueries.medium} {
      padding: 2rem 2rem 2rem 5rem;
    
      &::before {
        font-family: Helvetica, Arial, sans-serif;
        content: "\\201C";
        color: ${({ theme }) => theme.blockquote.beforeColor};
        font-size: 6rem;
        position: absolute;
        left: 1.5rem;
        top: 0;
      }
      
      &::after{
        content: '';
      }
    }
  }
  
  // Remove margin of lists with multiple levels
  ul > li {
    margin-bottom: 0.25rem;
    
    & > ul > li {
      margin-bottom: 0;
    }
  }

  li p {
    margin: 0;
  }
  
  // Fix for not applying custom link style on images in posts
  .gatsby-resp-image-link {
    border: none;
    box-shadow: none;
    
    &:hover {
      border-radius: unset;
      background-color: transparent;
    }
  }
`;

export default GlobalStyle;
