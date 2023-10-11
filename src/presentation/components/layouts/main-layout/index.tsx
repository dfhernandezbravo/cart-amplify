import store, { persistor } from '@store/index'
import { QueryClientProvider, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

type Props = {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  const queryClient = useQueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </QueryClientProvider>

  )
}

export default MainLayout