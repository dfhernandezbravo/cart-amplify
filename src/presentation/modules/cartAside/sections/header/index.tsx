import { useEffect } from 'react';
import { GrClose } from 'react-icons/gr';
import { HeaderProps } from './types';
import { useAppSelector } from '@hooks/storeHooks';
import { selectTotalProductsInCart } from '@store/cart';
import { Title } from './styles';

const Header = (props: HeaderProps) => {
  const { hasHybridation, isHeadless } = useAppSelector((state) => state.cart);
  const { setIsOpen } = props;

  const totalProducts = useAppSelector(selectTotalProductsInCart);

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
            : () => setIsOpen(false)
        }
      />
    </Title>
  );
};

export default Header;
