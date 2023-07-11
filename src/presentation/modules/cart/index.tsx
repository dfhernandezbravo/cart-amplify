import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@store/index";
import CartDesktop from "@modules/cart/layouts/desktop";
import CartMobile from "@modules/cart/layouts/mobile";

const Cart = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartDesktop />
        <CartMobile />
      </PersistGate>
    </Provider>
  );
};
export default Cart;
