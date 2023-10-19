import React, { ReactElement, ReactNode } from 'react';
import 'normalize.css/normalize.css';
import { Metadata } from 'next';

import '../styles/globals.scss';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';
import SkipToLink from '../components/SkipToLink/SkipToLink';
import styles from './layout.module.scss';
import { fontMontserrat } from '../lib/fontHelper';

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
        <div className={styles.Layout} id="root-layout">
          <SkipToLink skipToId="#main" text="Skip to main content" />
          <PageHeader />
          <div className={styles.LayoutContent}>
            <main className={styles.Main} id="main">
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
