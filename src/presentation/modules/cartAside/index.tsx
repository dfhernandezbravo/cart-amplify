import CartAsideDesktop from '@modules/cartAside/layouts/desktop';
import CartAsideMobile from '@modules/cartAside/layouts/mobile';
import MainLayout from '@components/layouts/provider/main-layout';

const CartAside = () => {
  return (
    <MainLayout>
      <CartAsideMobile />
      <CartAsideDesktop />
    </MainLayout>
  );
};
export default CartAside;
