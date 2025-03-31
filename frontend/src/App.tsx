// React-router
import { RouterProvider } from 'react-router/dom';

// router
import router from '@routes/routes';

// react query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Query Client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
