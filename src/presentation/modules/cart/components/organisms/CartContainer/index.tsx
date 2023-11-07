import { useAppSelector } from '@hooks/storeHooks';
import Aside from '@modules/cart/sections/aside';
import EmptyBody from '@modules/cart/sections/emptyBody';
import Main from '@modules/cart/sections/main';
import { Container } from './styles';

const CartContainer = () => {
  return (
    <Container>
      <Main />
      <Aside />
    </Container>
  );
};

export default CartContainer;
