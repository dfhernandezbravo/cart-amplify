import MinicartError from '@modules/cart/components/molecules/MinicartError';
import { EmptyBodyContainer, Container, Title, Description } from './styles';
import Image from 'next/image';
import { useAppDispatch } from '@hooks/storeHooks';
import cartSlice from '@store/cart';
import Button from '@components/atoms/BitButton';

const EmptyBody = () => {
  const dispatch = useAppDispatch();
  const { setCartAsideIsOpen } = cartSlice.actions;

  const handleClose = () => {
    dispatch(setCartAsideIsOpen(false));
  };

  return (
    <EmptyBodyContainer>
      <MinicartError />
      <Container>
        <Image
          src={`/images/empty-cart.svg`}
          width={98}
          height={94}
          alt="empty-cart"
          priority
        />
        <Title>Tu carro está vacío</Title>
        <Description>
          Miles de productos y ofertas te están esperando
        </Description>
        <Button label="Cerrar" onClick={handleClose} />
      </Container>
    </EmptyBodyContainer>
  );
};

export default EmptyBody;
