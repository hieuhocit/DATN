// react-router
import { Outlet } from 'react-router-dom';

// components
import Header from '@/components/Header';

export default function RootLayout() {
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}