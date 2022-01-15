import React, { ReactNode } from 'react';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

type MDXWrapperProps = {
  children: JSX.Element;
};

type CustomLinkProps = {
  href: string;
  children: ReactNode;
};

const CustomLink = ({
  href,
  children: linkChildren,
}: CustomLinkProps): JSX.Element => {
  if (href.startsWith('/')) {
    return <Link to={href}>{linkChildren}</Link>;
  }

  return (
    <a href={href} rel="noreferrer noopener">
      {linkChildren}
    </a>
  );
};

const MDXWrapper = ({ children }: MDXWrapperProps): JSX.Element => {
  const components = {
    a: CustomLink,
  };

  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXWrapper;
