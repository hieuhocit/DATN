// react-router
import { Outlet } from 'react-router-dom';

// components
import Header from '@/components/header/Header';

// Notification
import { ToastContainer, Bounce } from 'react-toastify';

// Hooks
import { useTheme } from '@/hooks/useTheme';

export default function RootLayout() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        transition={Bounce}
      />
    </>
  );
}
