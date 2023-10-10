import Header from "@modules/cart/sections/header";
import Main from "@modules/cart/sections/main";
import Aside from "@modules/cart/sections/aside";
import { Container } from "./styles";
import { useAppSelector } from "@hooks/storeHooks";
import { selectTotalProductsInCart } from "@store/cart";
import EmptyBody from "@modules/cart/sections/emptyBody";

const CartContainer = () => {
  
  const cart = useAppSelector(state => state.cart);
  const hasItemsInCart = cart?.cartBFF?.items?.length !== undefined && cart.cartBFF.items.length > 0

  return (
    <>
      {/* <Header /> */}
      { hasItemsInCart ? (
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
