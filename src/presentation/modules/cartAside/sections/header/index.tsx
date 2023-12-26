import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { useAppSelector } from '@hooks/storeHooks';
import cartSlice, { selectTotalProductsInCart } from '@store/cart';
import { Title } from './styles';

const Header = () => {
  const { hasHybridation, isHeadless } = useAppSelector((state) => state.cart);
  const totalProducts = useAppSelector(selectTotalProductsInCart);

  const { setCartAsideIsOpen } = cartSlice.actions;

  // Hybridation
  const closeCartHybridation = () => {
    window.parent.postMessage({ HYBRIDATION_CLOSE_MINICART: true }, '*');
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
          hasHybridation && !isHeadless
            ? () => closeCartHybridation()
            : () => setCartAsideIsOpen(false)
        }
      />
    </Title>
  );
};

export default Header;
