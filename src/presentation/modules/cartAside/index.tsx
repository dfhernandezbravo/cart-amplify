import { Provider } from "react-redux";
import CartAsideDesktop from "@modules/cartAside/layouts/desktop";
// import CartAsideMobile from "@modules/cartAside/layouts/mobile";
import store from "@store/index";

const CartAside = () => {
  return (
    <Provider store={store}>
      {/* <CartAsideMobile /> */}
      <CartAsideDesktop />
    </Provider>
  );
};
export default CartAside;
