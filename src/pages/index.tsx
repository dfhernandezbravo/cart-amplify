import CartAside from '@/components/layouts/cartAside'
import store from '@/store'
import Head from 'next/head'
import { Provider } from 'react-redux'

export default function Home() {
  return (
    <Provider store={store}>
      <Head><></></Head>
      <CartAside />
    </Provider>
  )
}
