// React-router
import { RouterProvider } from 'react-router/dom';

// router
import router from '@routes/routes';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

// Redux store
import { store } from '@store/store';

// Google OAuth
import { GoogleOAuthProvider } from '@react-oauth/google';

// Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={router} />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
