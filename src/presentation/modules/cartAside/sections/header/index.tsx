import { useMemo } from "react";
import { GrClose } from "react-icons/gr";
import { HeaderProps } from "./types";
import { useAppSelector } from "@hooks/storeHooks";
import totalProductInCart from "@utils/totalProduct";
import { Cart } from "@entities/cart/cart.entity";
import { Title } from "./styles";

const Header = (props: HeaderProps) => {

  // const totalProducts = useAppSelector(selectTotalProductsInCart);
  const { cartBFF } = useAppSelector(state => state.cart)

  const totalProducts = useMemo(() => totalProductInCart(cartBFF as Cart), [cartBFF])

  const { setIsOpen } = props;

  return (
    <Title>
      <div>
        Mi carro
        {totalProducts > 0 && (
          <span className="count">
            ({totalProducts} {totalProducts > 1 ? "productos" : "producto"})
          </span>
        )}
      </div>
      <GrClose onClick={() => setIsOpen(false)} />
    </Title>
  );
};

export default Header;
