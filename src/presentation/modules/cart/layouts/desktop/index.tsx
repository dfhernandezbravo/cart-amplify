import Desktop from '@components/layouts/desktop';
import Aside from '@modules/cart/sections/aside';
import Main from '@modules/cart/sections/main';
import { Container } from './styles';

const CartDesktop = () => {
  return (
    <Desktop>
      <Container>
        <Main />
        <Aside />
      </Container>
    </Desktop>
  );
};

export default CartDesktop;
