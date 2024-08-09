import { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import Logo from '../assets/images/logo.svg';
import Navigation from '@/components/Navigation';

const PageHeader = (): ReactElement => {
  return (
    <header>
      <div className="container-xl py-3 flex justify-between items-center">
        <Link
          className="relative size-8 aspect-square"
          href="/"
          aria-label="Home"
        >
          <Image src={Logo} alt="Logo of Samuelsson's homepage" fill />
        </Link>
        <Navigation />
      </div>
    </header>
  );
};

export default PageHeader;
