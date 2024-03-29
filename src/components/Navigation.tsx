import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { mediaQueries } from '../styles';

interface NavLink {
  to: string;
  name: string;
}

const StyledNavigation = styled.nav`
  margin-left: auto;

  ul {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;

    li {
      padding-right: 1rem;

      &:last-child {
        padding-right: 0;
      }

      a {
        text-decoration: none;
        color: ${({ theme }) => theme.Navigation.a.color};
        border: none;
        box-shadow: none;
        
        &:hover {
          border: none;
          background-color: transparent;
          color: ${({ theme }) => theme.Navigation.a.hoverColor};
        }
      }
      
      .active {
        color: ${({ theme }) => theme.Navigation.a.activeColor};
      }
    }
  }
  
  @media ${mediaQueries.medium} {
    ul li {
        padding-right: 2rem;
      }
    }
  }
`;

const navLinks: NavLink[] = [
  { to: '/about', name: 'About' },
  { to: '/blog', name: 'Blog' },
  { to: '/contact', name: 'Contact' },
];

const Navigation = (): JSX.Element => (
  <StyledNavigation>
    <ul>
      {navLinks.map((navLink) => {
        const { to, name } = navLink;

        return (
          <li key={name}>
            <Link to={to} activeClassName="active">
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  </StyledNavigation>
);

export default Navigation;
