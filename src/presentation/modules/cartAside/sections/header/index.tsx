import { GrClose } from "react-icons/gr";
import { useAppSelector } from "@hooks/storeHooks";
import { CartItemModel } from "@store/cart/types";
import { HeaderProps } from "./types";
import { Title } from "./styles";

const Header = (props: HeaderProps) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { setIsOpen } = props;

  const totalProductsInCart = cartItems?.reduce(
    (acc: number, cur: CartItemModel) => acc + (cur?.quantity ?? 0) ?? 0,
    0
  );

  return (
    <Title>
      <div>
        Mi carro
        {totalProductsInCart > 0 && (
          <span className="count">
            ({totalProductsInCart}{" "}
            {totalProductsInCart > 1 ? "productos" : "producto"})
          </span>
        )}
      </div>
      <GrClose onClick={() => setIsOpen(false)} />
    </Title>
  );
};

export default Header;
