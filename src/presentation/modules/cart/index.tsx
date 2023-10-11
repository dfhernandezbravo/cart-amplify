import CartDesktop from "@modules/cart/layouts/desktop";
import CartMobile from "@modules/cart/layouts/mobile";
import ToastContainerCustom from "@components/atoms/ToastContainer";
import MainLayout from "@components/layouts/main-layout";

const Cart = () => {
  return (
    <MainLayout>
      <CartDesktop />
      <CartMobile />
      <ToastContainerCustom />
    </MainLayout>
  );
};
export default Cart;
