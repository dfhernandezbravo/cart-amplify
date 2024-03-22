import store, { persistor } from '@store/index';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProvider from '@components/atoms/theme-provider';

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
