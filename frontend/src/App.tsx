// React-router
import { RouterProvider } from 'react-router/dom';

// router
import router from '@routes/routes';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

// Redux store
import { store } from '@store/store';

// Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
