import React, { ReactNode } from 'react';
import MainNavigation from './MainNavigation';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

export default Layout;
