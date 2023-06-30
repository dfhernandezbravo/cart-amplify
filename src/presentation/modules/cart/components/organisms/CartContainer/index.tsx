import Header from "@modules/cart/sections/header";
import Main from "@modules/cart/sections/main";
import Aside from "@modules/cart/sections/aside";
import { Container } from "./styles";

const CartContainer = () => {
  return (
    <>
      <Header />
      <Container>
        <Main />
        <Aside />
      </Container>
    </>
  );
};

export default CartContainer;
