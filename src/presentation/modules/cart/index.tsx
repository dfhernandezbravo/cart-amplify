import ToastContainerCustom from '@components/atoms/ToastContainer';
import CartContainerProvider from '@components/layouts/container';
import MainLayout from '@components/layouts/main-layout';
import CartDesktop from '@modules/cart/layouts/desktop';
import CartMobile from '@modules/cart/layouts/mobile';

const Cart = () => {
  return (
    <MainLayout>
      <CartContainerProvider>
        <CartDesktop />
        <CartMobile />
        <ToastContainerCustom />
      </CartContainerProvider>
    </MainLayout>
  );
};
export default Cart;
