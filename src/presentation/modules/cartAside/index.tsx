import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@store/index";
import CartAsideDesktop from "@modules/cartAside/layouts/desktop";
import CartAsideMobile from "@modules/cartAside/layouts/mobile";

const CartAside = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CartAsideMobile />
        <CartAsideDesktop />
      </PersistGate>
    </Provider>
  );
};
export default CartAside;
