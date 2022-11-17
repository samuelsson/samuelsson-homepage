'use client';

import { JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './Navigation.module.scss';

const Navigation = (): JSX.Element => {
  const pathName = usePathname();

  const items = [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    { name: 'Test', href: '/test' },
  ];

  const linkItems: JSX.Element[] = items.map((item) => {
    const isActive = (href: string): boolean => {
      return !!(href === pathName || pathName?.startsWith(`${href}/`));
    };

    return (
      <Link
        href={item.href}
        key={item.href}
        className={isActive(item.href) ? 'link-is-active' : undefined}
      >
        {item.name}
      </Link>
    );
  });

  return <nav className={styles.InlineNavigation}>{linkItems}</nav>;
};

export default Navigation;
