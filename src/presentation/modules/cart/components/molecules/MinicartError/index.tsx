import { useEffect } from 'react';
import Image from 'next/image';
import { GrClose } from 'react-icons/gr';
import { setError } from '@store/error';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import { MinicartErrorProps } from './types';
import {
  ErrorContainer,
  MainContainer,
  IconAndTextContainer,
  TextContainer,
  Content,
  Title,
} from './styles';
import cartSlice from '@store/cart';
import { getCartFromLocalStorage } from '@utils/getCartFromLocalStorage';

const MinicartError = (props: MinicartErrorProps) => {
  console.log('MinicartError props ', props);
  const { title, content = 'Intenta nuevamente' } = props;
  const { addProductInCart } = cartSlice.actions;

  const { cartBFF } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(setError(null));
  };

  // wait 4sec and disappear
  useEffect(() => {
    setTimeout(() => {
      dispatch(addProductInCart(getCartFromLocalStorage(cartBFF)));
      dispatch(setError(null));
    }, 4000);
  }, [dispatch]);

  return (
    <MainContainer className="minicart__error">
      <ErrorContainer>
        <IconAndTextContainer>
          <Image
            src={`/icons/cart/warning.svg`}
            alt="warning-icon"
            width={24}
            height={24}
          />
          <TextContainer>
            <Title>{title}</Title>
            <Content>{content}</Content>
          </TextContainer>
        </IconAndTextContainer>
        <GrClose onClick={handleOnClose} />
      </ErrorContainer>
    </MainContainer>
  );
};

export default MinicartError;
