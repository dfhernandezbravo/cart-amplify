import Header from "@modules/cart/sections/header";
import Main from "@modules/cart/sections/main";
import Aside from "@modules/cart/sections/aside";
import { Container } from "./styles";
import { useAppSelector } from "@hooks/storeHooks";
import { selectTotalProductsInCart } from "@store/cart";
import EmptyBody from "@modules/cart/sections/emptyBody";

const CartContainer = () => {
  const totalProducts = useAppSelector(selectTotalProductsInCart);

  return (
    <>
      <Header />
      {totalProducts > 0 ? (
        <Container>
          <Main />
          <Aside />
        </Container>
      ) : (
        <EmptyBody />
      )}
    </>
  );
};

export default CartContainer;
