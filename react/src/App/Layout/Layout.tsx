import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { type PropsWithChildren } from 'react';

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
