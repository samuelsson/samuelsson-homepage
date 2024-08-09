import React, { ReactElement, ReactNode } from 'react';
import { Metadata } from 'next';

import '../styles/globals.scss';
import PageHeader from '@/components/PageHeader';
import PageFooter from '@/components/PageFooter';
import SkipToLink from '@/components/SkipToLink/SkipToLink';
import { fontMontserrat } from '@/utils/fontHelper';

type RootLayoutProps = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Samuelsson',
  description: 'Blog and homepage of web developer Erik Samuelsson',
};

const RootLayout = ({ children }: RootLayoutProps): ReactElement => {
  return (
    <html lang="en">
      <body className={fontMontserrat.className}>
        <div className="flex flex-col min-h-screen" id="root-layout">
          <SkipToLink skipToId="#main" text="Skip to main content" />
          <PageHeader />
          <div className="grow">
            <main
              id="main"
              className="container-md py-8"
            >
              {children}
            </main>
          </div>
          <PageFooter />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
