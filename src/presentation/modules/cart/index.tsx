import { useEffect } from 'react'

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@store/index";
import CartDesktop from "@modules/cart/layouts/desktop";
import CartMobile from "@modules/cart/layouts/mobile";
import ToastContainerCustom from "@components/atoms/ToastContainer";
import { useRouter } from "next/router";


const Cart = () => {

const { query } = useRouter()

  useEffect(() => {
    console.log({query})
  })


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartDesktop />
        <CartMobile />
        <ToastContainerCustom/>
      </PersistGate>
    </Provider>
  );
};
export default Cart;
