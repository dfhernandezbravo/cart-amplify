import CartAsideDesktop from '@modules/cartAside/layouts/desktop';
import CartAsideMobile from '@modules/cartAside/layouts/mobile';
import MainLayout from '@components/layouts/provider/main-layout';
import CartAsideProvider from './layouts/provider';

const CartAside = () => {
  return (
    <MainLayout>
      <CartAsideProvider>
        <CartAsideMobile />
        <CartAsideDesktop />
      </CartAsideProvider>
    </MainLayout>
  );
};
export default CartAside;
