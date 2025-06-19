import Footer from '@/components/Footer.tsx';
import Header from '@/components/Header.tsx';
import { type PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};