import Navigation from '@/components/navigation/Navigation';
import React, { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Navigation />
      <main className="bg-slate-800 w-full h-screen flex justify-center items-start p-8">{children}</main>
    </>
  );
};
