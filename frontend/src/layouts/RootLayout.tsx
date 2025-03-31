// react-router
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <>
      <h1>Root Layout</h1>
      <p>This is the root layout of the application.</p>
      <Outlet />
    </>
  );
}
