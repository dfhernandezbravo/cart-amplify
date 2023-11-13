import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
// import { HeaderProps } from './types';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { selectTotalProductsInCart } from '@store/cart';
import { Title } from './styles';
import cartSlice from '@store/cart';

const Header = () => {
  const dispatch = useAppDispatch();
  const { hasHybridation } = useAppSelector((state) => state.cart);
  const { setCartAsideIsOpen } = cartSlice.actions;

  // const totalProducts = useMemo(
  //   () => totalProductInCart(cartBFF as Cart),
  //   [cartBFF],
  // );

  const totalProducts = useAppSelector(selectTotalProductsInCart);

  // Hybridation
  const closeCartHybridation = () => {
    window.parent.postMessage({ HYBRIDATION_CLOSE_MINICART: true }, '*');
    dispatch(setCartAsideIsOpen(false));
  };

  useEffect(() => {
    window.parent.postMessage(
      { HYBRIDATION_UPDATE_QUANTITY: totalProducts },
      '*',
    );
  }, [totalProducts]);

  return (
    <Title>
      <div>
        Mi carro
        {totalProducts > 0 && (
          <span className="count">
            ({totalProducts} {totalProducts > 1 ? 'productos' : 'producto'})
          </span>
        )}
      </div>
      <GrClose
        onClick={
          hasHybridation
            ? () => closeCartHybridation()
            : () => dispatch(setCartAsideIsOpen(false))
        }
      />
    </Title>
  );
};

export default Header;
