import Mobile from '@components/layouts/mobile';
import MainMobile from '@modules/cart/sections/main/main-mobile';
import AsideMobile from '@modules/cart/sections/aside/asideMobile';

//Hooks
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import { selectTotalProductsInCart } from '@store/cart';
import cartSlice from '@store/cart';

//Styles
import { Shade } from './styles';
import EmptyBody from '@modules/cart/sections/emptyBody';

const CartMobile = () => {
  const { openDetailsMobile } = useAppSelector((state) => state.cart);
  const { setOpenDetailsMobile } = cartSlice.actions;
  const dispatch = useAppDispatch();

  const totalProducts = useAppSelector(selectTotalProductsInCart);

  const closeAsideMobile = () => {
    dispatch(setOpenDetailsMobile(false));
  };

  return (
    <Mobile>
      {totalProducts > 0 ? (
        <div className="container">
          <MainMobile />
          <AsideMobile />
          {openDetailsMobile && <Shade onClick={() => closeAsideMobile()} />}
        </div>
      ) : (
        <EmptyBody />
      )}
    </Mobile>
  );
};

export default CartMobile;
