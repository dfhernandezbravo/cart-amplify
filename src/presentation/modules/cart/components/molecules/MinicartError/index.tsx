import { useEffect } from 'react';
import Image from 'next/image';
import { selectError, setError } from '@store/error';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import {
  ErrorContainer,
  MainContainer,
  IconAndTextContainer,
  TextContainer,
  Content,
  Title,
  CloseButton,
} from './styles';
import cartSlice from '@store/cart';
import { getCartFromLocalStorage } from '@utils/getCartFromLocalStorage';

const MinicartError = () => {
  const { error } = useAppSelector(selectError);
  const { cartBFF, isHeadless } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const { addProductInCart } = cartSlice.actions;

  const handleOnClose = () => {
    dispatch(setError(null));
  };

  // wait 4sec and disappear
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        if (!isHeadless) {
          dispatch(addProductInCart(getCartFromLocalStorage(cartBFF)));
        }
        dispatch(setError(null));
      }, 4000);
    }
  }, [dispatch, error]);

  if (!error) return null;

  const ErrorIcon = () => {
    if (error.errorType === 'payload' && error.status === 'error') {
      return (
        <Image
          src={`/icons/cart/error-icon.svg`}
          alt="error-icon"
          width={24}
          height={24}
          priority
        />
      );
    }
    return (
      <Image
        src={`/icons/cart/warning.svg`}
        alt="warning-icon"
        width={24}
        height={24}
        priority
      />
    );
  };

  return (
    <MainContainer className="minicart__error">
      <ErrorContainer errorType={error.errorType} status={error.status}>
        <IconAndTextContainer>
          {ErrorIcon()}

          <TextContainer>
            {error.title ? <Title>{error.title}</Title> : null}
            {error.content ? <Content>{error.content}</Content> : null}
          </TextContainer>
        </IconAndTextContainer>
        <CloseButton onClick={handleOnClose}>
          <Image
            src={`/icons/cart/close-icon.svg`}
            alt="close-icon"
            width={18}
            height={18}
            priority
          />
        </CloseButton>
      </ErrorContainer>
    </MainContainer>
  );
};

export default MinicartError;
