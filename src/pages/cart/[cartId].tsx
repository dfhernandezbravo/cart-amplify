import Cart from '@modules/cart';
import { QueryClient, QueryClientProvider } from 'react-query';

export default function Main() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Cart />
    </QueryClientProvider>
  );
}
