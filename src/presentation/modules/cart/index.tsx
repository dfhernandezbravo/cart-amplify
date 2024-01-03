import ToastContainerCustom from '@components/atoms/ToastContainer';
import AnalyticsProvider from '@components/layouts/provider/analytics';
import CartContainerProvider from '@components/layouts/provider/container';
import MainLayout from '@components/layouts/provider/main-layout';
import CartDesktop from '@modules/cart/layouts/desktop';
import CartMobile from '@modules/cart/layouts/mobile';

const Cart = () => {
  return (
    <MainLayout>
      <CartContainerProvider>
        <AnalyticsProvider>
          <CartDesktop />
          <CartMobile />
          <ToastContainerCustom />
        </AnalyticsProvider>
      </CartContainerProvider>
    </MainLayout>
  );
};
export default Cart;
