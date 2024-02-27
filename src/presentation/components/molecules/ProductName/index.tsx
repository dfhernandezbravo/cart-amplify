import { ProductNameProps } from './types';
import { Container } from './styles';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import cartSlice from '@store/cart';
import { environments } from '../../../../configs/env';

const ProductName = (props: ProductNameProps) => {
  const dispatch = useAppDispatch();
  const { isHeadless } = useAppSelector((state) => state.cart);

  const { setCartAsideIsOpen } = cartSlice.actions;
  const { productName, productUrl } = props;

  return (
    <Container className="product-name--container">
      <Link
        href={
          productUrl
            ? isHeadless
              ? productUrl
              : `${environments.hybridDomain}/${productUrl}`
            : ''
        }
        target={isHeadless ? '_self' : '_parent'}
        onClick={() => dispatch(setCartAsideIsOpen(false))}
      >
        {productName?.slice(0, 50)}
      </Link>
    </Container>
  );
};

export default ProductName;
