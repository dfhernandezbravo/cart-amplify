import Mobile from '@components/layouts/mobile';
import MainMobile from '@modules/cart/sections/main/main-mobile';
import AsideMobile from '@modules/cart/sections/aside/asideMobile';

//Hooks
import { useAppSelector } from '@hooks/storeHooks';
import { selectTotalProductsInCart } from '@store/cart';

//Styles
import { Shade } from './styles';
import EmptyBody from '@modules/cart/sections/emptyBody';

const CartMobile = () => {
  const { openDetailsMobile } = useAppSelector((state) => state.cart);

  const totalProducts = useAppSelector(selectTotalProductsInCart);

  return (
    <Mobile>
      {totalProducts > 0 ? (
        <div className="container">
          <MainMobile />
          <AsideMobile />
          {openDetailsMobile && <Shade />}
        </div>
      ) : (
        <EmptyBody />
      )}
    </Mobile>
  );
};

export default CartMobile;
