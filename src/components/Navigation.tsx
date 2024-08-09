"use client";

import { ReactElement } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';

const Navigation = (): ReactElement => {
  const pathName = usePathname();

  const items = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Test', href: '/test' },
  ];

  const linkItems: ReactElement[] = items.map((item) => {
    const isActive = (href: string): boolean => {
      return !!(href === pathName || pathName?.startsWith(`${href}/`));
    };

    return (
      <Link
        href={item.href}
        key={item.href}
        className={classNames(
          "font-bold border-b-4 hover:border-b-blue-600",
          isActive(item.href) && "text-blue-600 border-b-blue-600"
        )}
      >
        {item.name}
      </Link>
    );
  });

  return <nav className="flex space-x-3">{linkItems}</nav>;
}

export default Navigation;
