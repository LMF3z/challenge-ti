import { ReactNode } from 'react';
import Navbar from '../navbars/Navbar';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <main className='px-3 md:px-10 py-5 min-h-[90vh]'>{children}</main>
    </>
  );
};

export default MainLayout;
